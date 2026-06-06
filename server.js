import express from 'express';
import cors from 'cors';
import fetch from 'node-fetch';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import path from 'path';
import fs from 'fs';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3001;

function buildContextFallback(query, context) {
  if (!context) {
    return "I'm temporarily unable to reach the AI response service, and I also don't have portfolio context loaded for this question. Please try again in a bit.";
  }

  const sentences = context
    .split(/\r?\n+/)
    .flatMap((block) => block.split(/(?<=[.!?])\s+/))
    .map((sentence) => sentence.trim())
    .filter(Boolean);

  const queryTerms = query
    .toLowerCase()
    .split(/[^a-z0-9]+/i)
    .filter((term) => term.length > 2);

  const ranked = sentences
    .map((sentence) => {
      const lower = sentence.toLowerCase();
      const score = queryTerms.reduce((total, term) => total + (lower.includes(term) ? 1 : 0), 0);
      return { sentence, score };
    })
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 3)
    .map((item) => item.sentence);

  const summary = ranked.length > 0
    ? ranked.join(' ')
    : context.slice(0, 400).trim();

  return `I'm temporarily unable to reach the AI response service because the Gemini quota is exhausted. Based on Rohan's portfolio data, here's the most relevant information I found: ${summary}`;
}

function extractRetryDelay(errorBody) {
  const retryMatch = errorBody.match(/Please retry in ([\d.]+)s/i);
  if (retryMatch) {
    return Math.max(1, Math.ceil(Number(retryMatch[1])));
  }

  const delayMatch = errorBody.match(/"retryDelay"\s*:\s*"(\d+)s"/i);
  if (delayMatch) {
    return Math.max(1, Number(delayMatch[1]));
  }

  return null;
}

app.use(cors());
app.use(express.json());

// Serve static files from the dist folder (React build output) only in production
const distPath = path.join(__dirname, 'dist');
const isProduction = process.env.NODE_ENV === 'production';
if (isProduction) {
  app.use(express.static(distPath));
}

// API endpoint for Azure AI Search
app.post('/api/search', async (req, res) => {
  try {
    const { query } = req.body;
    
    if (!query) {
      return res.status(400).json({ error: 'Query is required' });
    }

    const searchKey = process.env.SEARCH_KEY;
    if (!searchKey) {
      return res.status(500).json({ error: 'SEARCH_KEY not configured' });
    }

    const endpoint = 'https://rohan-ai-search.search.windows.net/indexes/rohan-bio-index/docs/search?api-version=2021-04-30-Preview';
    
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'api-key': searchKey
      },
      body: JSON.stringify({
        search: query,
        top: 5
      })
    });

    // If Azure Search returns an error, include the body for easier debugging
    if (!response.ok) {
      const body = await response.text().catch(() => '');
      throw new Error(`Azure Search returned ${response.status}: ${body}`);
    }

    const data = await response.json();
    const results = data.value || [];
    let context = results
      .map(item => item.content || item.text || '')
      .filter(Boolean)
      .join('\n\n');

    // If context is too short, fetch ALL bio sections
    if (!context || context.length < 100) {
      const allResponse = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'api-key': searchKey
        },
        body: JSON.stringify({ search: '*', top: 7 })
      });
      const allData = await allResponse.json();
      context = (allData.value || [])
        .map(item => item.content || '')
        .filter(Boolean)
        .join('\n\n');
    }

    res.json({ context, results });
  } catch (error) {
    console.error('Search error:', error);
    res.status(500).json({ error: error.message });
  }
});

// API endpoint for Gemini chat
app.post('/api/chat', async (req, res) => {
  try {
    const { query, context } = req.body;
    
    if (!query) {
      return res.status(400).json({ error: 'Query is required' });
    }

    const geminiKey = process.env.GEMINI_KEY;
    if (!geminiKey) {
      return res.status(500).json({ error: 'GEMINI_KEY not configured' });
    }

    const prompt = `You are Rohan's personal AI assistant. You MUST answer ONLY based on the context below. 
    NEVER use outside knowledge or make up information.
    If the answer is not in the context, say "I don't have that information about Rohan."

    CONTEXT:
    ${context || 'No relevant information found.'}

    QUESTION: ${query}

    Answer conversationally and friendly, referring to Rohan in third person.`;
    const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${geminiKey}`;

    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              {
                text: prompt
              }
            ]
          }
        ]
      })
    });

    if (!response.ok) {
      const body = await response.text().catch(() => '');

      if (response.status === 429) {
        const retryAfter = extractRetryDelay(body);
        const message = buildContextFallback(query, context);
        return res.status(503).json({
          error: 'Gemini quota exceeded',
          message,
          provider: 'gemini',
          retryAfter
        });
      }

      throw new Error(`Gemini API returned ${response.status}: ${body}`);
    }

    const data = await response.json();
    const message = data.candidates?.[0]?.content?.parts?.[0]?.text || 'No response';

    res.json({ message });
  } catch (error) {
    console.error('Chat error:', error);
    res.status(500).json({
      error: 'Chat request failed',
      message: 'The assistant is temporarily unavailable. Please try again shortly.'
    });
  }
});

// Fallback to React app for client-side routing (only if dist exists)
app.get('*', (req, res) => {
  if (isProduction && fs.existsSync(distPath)) {
    return res.sendFile(path.join(distPath, 'index.html'));
  }
  // In development or when dist is missing, return a helpful message
  res.status(200).send('API server running. Frontend dev server handles the UI in development.');
});

// Start server with fallback if port is in use
const MAX_TRIES = 10;
let attempts = 0;
function startServer(port) {
  const server = app.listen(port, () => {
    console.log(`🚀 Server running on port ${port}`);
    console.log(`📱 React app: http://localhost:${port}`);
    console.log(`🔧 API proxy available at http://localhost:${port}/api`);
  });

  server.on('error', (err) => {
    if (err.code === 'EADDRINUSE' && attempts < MAX_TRIES) {
      attempts += 1;
      const nextPort = port + 1;
      console.warn(`Port ${port} in use, trying ${nextPort}...`);
      setTimeout(() => startServer(nextPort), 200);
    } else {
      console.error('Server error:', err);
      process.exit(1);
    }
  });
}

startServer(PORT);
