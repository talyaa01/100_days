# 🎨 100 Things Generator

Generate 100 funny variations of anything using Gemini AI image generation!

## Quick Start

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start the server:**
   ```bash
   npm start
   ```

3. **Open in browser:**
   ```
   http://localhost:3000
   ```

That's it! Type something like "duck" or "avocado" and hit Generate.

## How it Works

- The frontend sends your input to the Express server
- The server calls Gemini's image generation API
- The generated image is returned and displayed

## Files

```
gemini-app/
├── server.js          # Express backend (calls Gemini API)
├── package.json       # Dependencies
├── public/
│   └── index.html     # Frontend UI
└── README.md
```

## API Key

Your Gemini API key is in `server.js`. To use a different key, edit this line:

```javascript
const GEMINI_API_KEY = 'your-key-here';
```

Get a key at: https://aistudio.google.com

## Troubleshooting

- **"No image generated"** - Gemini sometimes declines image requests. Try a different prompt.
- **Port already in use** - Change `PORT` in server.js to 3001 or another port.
