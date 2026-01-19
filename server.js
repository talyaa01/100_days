const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

app.post('/generate', async (req, res) => {
  const { thing } = req.body;

  if (!thing) {
    return res.status(400).json({ error: 'Please provide a thing to generate' });
  }

  const prompt = `A cute funny illustration of a single ${thing} character holding up a sign that says "100 days!" in bold text. The ${thing} looks excited and celebratory. Colorful, whimsical cartoon style, confetti in the background.`;

  try {
    const response = await fetch('https://api.openai.com/v1/images/generations', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: 'dall-e-3',
        prompt: prompt,
        n: 1,
        size: '1024x1024',
        quality: 'standard'
      })
    });

    const data = await response.json();

    if (data.error) {
      console.error('OpenAI API error:', data.error);
      return res.status(500).json({ error: data.error.message || 'OpenAI API error' });
    }

    const imageUrl = data.data?.[0]?.url;
    
    if (imageUrl) {
      res.json({ imageUrl });
    } else {
      res.status(500).json({ error: 'No image generated' });
    }
  } catch (err) {
    console.error('Server error:', err);
    res.status(500).json({ error: 'Server error: ' + err.message });
  }
});

// Serve the frontend
app.use(express.static('public'));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
