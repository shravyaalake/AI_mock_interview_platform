const express = require('express');
const router = express.Router();
const axios = require('axios');

const API_KEY = process.env.GOOGLE_GEMINI_API_KEY;
const GEMINI_API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${API_KEY}`;


router.get('/', (req, res) => {
  res.send('Interview API is running');
});

// POST /api/interview/generate-question

router.post('/generate-question', async (req, res) => {
  try {
    const { type, topics } = req.body;
    if (!type || !topics) {
      return res.status(400).json({ error: 'Missing type or topics in request body' });
    }
    const promptText = `Generate a ${type} interview question on topics: ${topics}.`;

    const response = await axios.post(
      GEMINI_API_URL,
      {
        contents: [
          {
            parts: [
              { text: promptText }
            ]
          }
        ],
        generationConfig: {
          temperature: 0.7,
          maxOutputTokens: 256
        }
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    const generatedText = response.data.candidates?.[0]?.content?.parts?.[0]?.text || 'No question generated';

    res.json({ question: generatedText });
  } catch (error) {
    console.error('Error calling Gemini API:', error.response?.data || error.message);
    res.status(500).json({ error: 'Failed to generate question' });
  }
});

router.post('/generate-question-from-jd', async (req, res) => {
  try {
    const { jobDescription, roundType } = req.body;
    if (!jobDescription || !roundType) {
      return res.status(400).json({ error: 'Missing jobDescription or roundType in request body' });
    }
    const prompt = `Generate a ${roundType} interview question based on this job description:\n${jobDescription}`;

    const response = await axios.post(
      GEMINI_API_URL,
      {
        contents: [
          {
            parts: [
              { text: prompt }
            ]
          }
        ],
        generationConfig: {
          temperature: 0.7,
          maxOutputTokens: 256
        }
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    const generatedText = response.data.candidates?.[0]?.content?.parts?.[0]?.text || 'No question generated';
    res.json({ question: generatedText });
  } catch (error) {
    console.error('Gemini API error:', error.response?.data || error.message);
    res.status(500).json({ error: 'Failed to generate question from job description' });
  }
});


router.post('/evaluate-answer', async (req, res) => {
  try {
    const { answer } = req.body;
    if (!answer) {
      return res.status(400).json({ error: 'Missing answer in request body' });
    }
    const prompt = `Evaluate this answer for relevance, clarity, and confidence. Provide a score out of 10 and comments:\nAnswer: ${answer}`;

    const response = await axios.post(
      GEMINI_API_URL,
      {
        contents: [
          {
            parts: [
              { text: prompt }
            ]
          }
        ],
        generationConfig: {
          temperature: 0.7,
          maxOutputTokens: 256
        }
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    let evalText = response.data.candidates?.[0]?.content?.parts?.[0]?.text;
    if (!evalText || evalText.trim() === '') {
      evalText = 'No evaluation generated. Please try again.';
    }
    res.json({ comment: evalText });
  } catch (error) {
    console.error('Gemini API error:', error.response?.data || error.message);
    res.status(500).json({ error: 'Failed to evaluate answer' });
  }
});

router.post('/generate-final-feedback', async (req, res) => {
  try {
    const { evaluations } = req.body;
    if (!evaluations) {
      return res.status(400).json({ error: 'Missing evaluations in request body' });
    }
    const prompt = `Provide an overall feedback summary based on these evaluations:\n${JSON.stringify(evaluations)}`;

    const response = await axios.post(
      GEMINI_API_URL,
      {
        contents: [
          {
            parts: [
              { text: prompt }
            ]
          }
        ],
        generationConfig: {
          temperature: 0.7,
          maxOutputTokens: 256
        }
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    const feedback = response.data.candidates?.[0]?.content?.parts?.[0]?.text || 'No feedback generated';
    res.json({ feedback });
  } catch (error) {
    console.error('Gemini API error:', error.response?.data || error.message);
    res.status(500).json({ error: 'Failed to generate feedback' });
  }
});

module.exports = router;
