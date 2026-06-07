import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import path from 'path';
import fs from 'fs';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3001;

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

// API endpoint for chat
app.post('/api/chat', async (req, res) => {
  try {
    const { query, context } = req.body;

    if (!query) {
      return res.status(400).json({ error: 'Query is required' });
    }

    const githubToken = process.env.GITHUB_TOKEN;
    if (!githubToken) {
      return res.status(500).json({ error: 'GITHUB_TOKEN not configured' });
    }

    const endpoint = 'https://models.inference.ai.azure.com/chat/completions';

    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${githubToken}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'gpt-4o',
        messages: [
          {
            role: 'system',
            content: "You are Rohan Sakthivel P's personal AI assistant. Answer ONLY based on the context provided. Never use outside knowledge or make up information. If the answer is not in the context, say I don't have that information about Rohan. Be conversational and friendly."
          },
          {
            role: 'user',
            content: `Context: ${context}\n\nQuestion: ${query}`
          }
        ],
        temperature: 0.7,
        max_tokens: 500
      })
    });

    if (!response.ok) {
      const body = await response.text().catch(() => '');
      throw new Error(`GitHub Models API returned ${response.status}: ${body}`);
    }

    const data = await response.json();
    const responseText = data.choices?.[0]?.message?.content || 'No response';

    res.json({ message: responseText });
  } catch (error) {
    console.error('Chat error:', error);
    res.status(500).json({ error: 'Chat failed', message: 'Assistant temporarily unavailable.' });
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
