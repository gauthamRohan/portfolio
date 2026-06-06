# Rohan Sakthivel's Portfolio

A modern, interactive portfolio website built with React, Vite, and powered by AI chatbot integration using Azure AI Search and Google Gemini API.

## Features

✨ **Floating AI Chat Button** - 💬 Click the floating button to chat with Rohan's AI assistant  
🎨 **Modern Dark Theme** - Purple & cyan gradient design with smooth animations  
📱 **Fully Responsive** - Works seamlessly on desktop, tablet, and mobile  
⚡ **Fast Performance** - Built with Vite for rapid development and optimized builds  
🔒 **Secure API Integration** - Backend proxy server keeps API keys safe  
🤖 **AI-Powered Responses** - Combines Azure AI Search with Gemini API

## Tech Stack

- **Frontend**: React 18, Vite 5
- **Backend**: Express.js (Node.js)
- **AI**: Azure AI Search + Google Gemini API
- **Styling**: CSS-in-JS with inline styles
- **Icons**: React Icons (FontAwesome)

## Setup Instructions

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- API Keys:
  - Azure AI Search admin key
  - Google Gemini API key

### Installation

1. **Clone/Navigate to the project:**
   ```bash
   cd portfolio
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure API Keys:**
   Create a `.env` file in the project root:
   ```bash
   cp .env.example .env
   ```
   
   Edit `.env` and add your API keys:
   ```
   SEARCH_KEY=your_azure_search_admin_key
   GEMINI_KEY=your_gemini_api_key
   ```

### Running the Application

#### Development Mode (with hot reload)

Run **TWO** separate terminals:

**Terminal 1 - Frontend (React/Vite):**
```bash
npm run dev
```
Opens at: `http://localhost:5173`

**Terminal 2 - Backend (Express server):**
```bash
npm run server
```
Runs on: `http://localhost:3001`

The Vite dev server is configured with a proxy that routes `/api` requests to the backend server.

#### Production Mode

1. **Build the React app:**
   ```bash
   npm run build
   ```
   This creates an optimized `dist/` folder.

2. **Start the server (serves both API and static files):**
   ```bash
   npm start
   ```
   Runs on: `http://localhost:3001`
   - The server automatically serves the built React app from `dist/`
   - All `/api` routes are handled by the Express backend

## Project Structure

```
portfolio/
├── src/
│   ├── components/
│   │   ├── Header.jsx          # Navigation bar
│   │   ├── Hero.jsx            # Hero landing section
│   │   ├── About.jsx           # About section
│   │   ├── TechStack.jsx       # Skills & technologies
│   │   ├── Projects.jsx        # Project showcase
│   │   ├── Resume.jsx          # Resume section
│   │   ├── Contact.jsx         # Contact form
│   │   ├── Footer.jsx          # Footer
│   │   └── RohanChat.jsx       # Floating chat button
│   ├── App.jsx                 # Main app component
│   ├── index.css               # Global styles
│   └── main.jsx                # Entry point
├── server.js                   # Express backend server
├── vite.config.mjs             # Vite configuration with proxy
├── package.json                # Dependencies & scripts
├── .env                        # API keys (DO NOT commit)
└── .env.example                # API keys template

```

## How the Chat Works

### Backend Flow

1. **User sends message** in the floating chat widget
2. **Frontend calls** `/api/search` with the user query
3. **Backend searches** Azure AI Search for relevant context about Rohan
4. **Frontend calls** `/api/chat` with the query + search context
5. **Backend calls** Google Gemini API to generate a response
6. **Response displayed** in the chat bubble

### API Endpoints

#### POST /api/search
Searches Azure AI for context about Rohan.

**Request:**
```json
{
  "query": "What is your experience?"
}
```

**Response:**
```json
{
  "context": "Rohan is a Data Scientist with 1+ years of experience...",
  "results": [...]
}
```

#### POST /api/chat
Generates a response using Gemini API with search context.

**Request:**
```json
{
  "query": "What is your experience?",
  "context": "Rohan is a Data Scientist..."
}
```

**Response:**
```json
{
  "message": "Rohan has 1+ years of experience as a Data Scientist at TCS..."
}
```

## Environment Variables

| Variable | Description |
|----------|-------------|
| `SEARCH_KEY` | Azure AI Search admin key (server-side only) |
| `GEMINI_KEY` | Google Gemini API key (server-side only) |
| `PORT` | Server port (default: 3001) |

## Security

✅ **API Keys are server-side only** - Never exposed to the browser  
✅ **No direct API calls from frontend** - All requests go through Express proxy  
✅ **CORS configured** - Frontend and backend communicate securely  
✅ **Production-ready** - Built React app served from Express

## Scripts

```bash
npm run dev           # Start Vite dev server (frontend only)
npm run build         # Build React app for production
npm run preview       # Preview production build locally
npm run server        # Start Express backend server
npm start             # Alias for 'npm run server' (for deployments)
npm run parse-resume  # Parse resume PDF
```

## Deployment

### Option 1: Deploy to Azure App Service

1. Build the React app: `npm run build`
2. Push the project to a Git repository
3. In Azure App Service:
   - Set startup command: `npm start`
   - Add environment variables: `SEARCH_KEY` and `GEMINI_KEY`
4. Azure will automatically run the Express server on port 3001

### Option 2: Deploy to Heroku / Render / etc.

1. Build the React app: `npm run build`
2. The server will automatically serve `dist/index.html` for all non-API routes
3. Set environment variables in your hosting platform's dashboard

## Troubleshooting

### Chat not working?

1. ✅ Ensure backend server is running on port 3001
2. ✅ Check that `.env` file has valid `SEARCH_KEY` and `GEMINI_KEY`
3. ✅ Open browser console for error messages
4. ✅ Verify Azure Search index exists: `rohan-bio-index`
5. ✅ Check Gemini API is enabled in Google Cloud Console

### "Cannot GET /api" error?

- Make sure you're running `npm run server` (not just `npm run dev`)
- The backend server must be running to handle API requests

### Build errors?

- Clear node_modules and reinstall: `rm -rf node_modules && npm install`
- Clear Vite cache: `rm -rf dist/.vite`

## License

Built for Rohan Sakthivel's portfolio website.

## Support

For issues or questions, refer to the component comments in the code or check the browser console for detailed error messages.
