const express = require('express');
const router = express.Router();
const axios = require('axios');

const API_KEY = process.env.GOOGLE_GEMINI_API_KEY;
const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=' + API_KEY;

// router.post('/generate-question', async (req, res) => {
//   try {
//     const { type, topics } = req.body;
//     const prompt = `Generate a ${type} interview question on topics: ${topics}.`;

//     const response = await axios.post(
//       GEMINI_API_URL,
//       {
//         contents: [prompt],
//       },
//       {
//         headers: {
//           'Content-Type': 'application/json',
//         },
//       }
//     );

//     const generatedText = response.data.candidates?.[0]?.content || 'No question generated';
//     res.json({ question: generatedText });
//   } catch (error) {
//     console.error('Gemini API error:', error.response?.data || error.message);
//     res.status(500).json({ error: 'Failed to generate question' });
//   }
// });
router.post('/generate-question', async (req, res) => {
  try {
    const { type, topics } = req.body;
    const prompt = `Generate a ${type} interview question on topics: ${topics}.`;

    const response = await axios.post(
      GEMINI_API_URL,
      {
        contents: [
          {
            parts: [
              { text: prompt }
            ]
          }
        ]
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
    res.status(500).json({ error: 'Failed to generate question' });
  }
});

// router.post('/evaluate-answer', async (req, res) => {
//   try {
//     const { answer } = req.body;
//     const prompt = `Evaluate this answer for relevance, clarity, and confidence. Provide a score out of 10 and comments:\nAnswer: ${answer}`;

//     const response = await axios.post(
//       GEMINI_API_URL,
//       {
//         contents: [prompt],
//       },
//       {
//         headers: {
//           Authorization: `Bearer ${API_KEY}`,
//           'Content-Type': 'application/json',
//         },
//       }
//     );

//     const evalText = response.data.candidates?.[0]?.content || '';
//     // Parse evalText to extract score, relevance, confidence, comment (simple example)
//     res.json({
//       score: 8,
//       relevance: 'Good',
//       confidence: 'High',
//       comment: evalText,
//     });
//   } catch (error) {
//     console.error('Gemini API error:', error.response?.data || error.message);
//     res.status(500).json({ error: 'Failed to evaluate answer' });
//   }
// });

router.post('/evaluate-answer', async (req, res) => {
  try {
    const { answer } = req.body;
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
        ]
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

 const evalText = response.data.candidates?.[0]?.content?.parts?.[0]?.text || '';
    res.json({
      comment: evalText,
    });
  } catch (error) {
    console.error('Gemini API error:', error.response?.data || error.message);
    res.status(500).json({ error: 'Failed to evaluate answer' });
  }
});

// router.post('/generate-final-feedback', async (req, res) => {
//   try {
//     const { evaluations } = req.body;
//     const prompt = `Provide an overall feedback summary based on these evaluations:\n${JSON.stringify(evaluations)}`;

//     const response = await axios.post(
//       GEMINI_API_URL,
//       {
//         contents: [prompt],
//       },
//       {
//         headers: {
//           Authorization: `Bearer ${API_KEY}`,
//           'Content-Type': 'application/json',
//         },
//       }
//     );

//     const feedback = response.data.candidates?.[0]?.content || 'No feedback generated';
//     res.json({ feedback });
//   } catch (error) {
//     console.error('Gemini API error:', error.response?.data || error.message);
//     res.status(500).json({ error: 'Failed to generate feedback' });
//   }
// });

router.post('/generate-final-feedback', async (req, res) => {
  try {
    const { evaluations } = req.body;
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
        ]
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
