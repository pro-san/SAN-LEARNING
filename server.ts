import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Gemini AI Client
  const getGeminiClient = () => {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error("GEMINI_API_KEY environment variable is not configured.");
    }
    return new GoogleGenAI({ apiKey });
  };

  // API Route: AI Tutor Chat & Explanation in Khmer
  app.post('/api/ai/tutor', async (req, res) => {
    try {
      const { question, lessonContext, language = 'km' } = req.body;
      if (!question) {
        return res.status(400).json({ error: 'Question is required' });
      }

      const ai = getGeminiClient();
      const prompt = `You are a helpful, warm, and highly knowledgeable Cambodian Online Learning AI Assistant ("គ្រូបង្រៀន AI - PRO LEARNING").
You assist Cambodian students studying online courses on the PRO LEARNING platform.

${lessonContext ? `Current Lesson Context: ${lessonContext}` : ''}
Language Preference: ${language === 'km' ? 'Khmer (ភាសាខ្មែរ)' : 'English'}

User Question: ${question}

Instructions:
1. Provide a clear, encouraging, structured, and polite answer in ${language === 'km' ? 'Khmer' : 'English'}.
2. Use clear formatting with bullet points or bold headers when explaining concepts.
3. If the user asks about a topic related to study, programming, language, mathematics, or general knowledge, give detailed steps and examples.
4. Always sign off with a brief encouraging Khmer phrase like "សូមជូនពរឱ្យអ្នកសិក្សាទទួលបានជោគជ័យ!" if answering in Khmer.`;

      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
      });

      return res.json({ reply: response.text });
    } catch (error: any) {
      console.error('AI Tutor API Error:', error);
      return res.status(500).json({ 
        error: error.message || 'Failed to generate answer from AI Tutor'
      });
    }
  });

  // API Route: Generate Quiz Questions for a Lesson
  app.post('/api/ai/generate-quiz', async (req, res) => {
    try {
      const { lessonTitle, lessonContent, language = 'km' } = req.body;
      const ai = getGeminiClient();

      const prompt = `Generate a 3-question multiple choice quiz in JSON format based on this lesson:
Title: ${lessonTitle}
Content summary: ${lessonContent || 'General knowledge on ' + lessonTitle}
Language: ${language === 'km' ? 'Khmer' : 'English'}

Output STRICT JSON in this array format:
[
  {
    "id": 1,
    "question": "Question text in ${language === 'km' ? 'Khmer' : 'English'}",
    "options": ["Option A", "Option B", "Option C", "Option D"],
    "correctIndex": 0,
    "explanation": "Brief explanation in ${language === 'km' ? 'Khmer' : 'English'}"
  }
]`;

      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
        config: {
          responseMimeType: 'application/json'
        }
      });

      let quizData = [];
      try {
        quizData = JSON.parse(response.text || '[]');
      } catch (pErr) {
        console.error('Quiz JSON parse error:', pErr);
      }

      return res.json({ quiz: quizData });
    } catch (error: any) {
      console.error('Quiz generation error:', error);
      return res.status(500).json({ error: error.message || 'Failed to generate quiz' });
    }
  });

  // Health check endpoint
  app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', time: new Date().toISOString() });
  });

  // Vite middleware for dev or Static serve for prod
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`🚀 E-Learning App Server listening on http://0.0.0.0:${PORT}`);
  });
}

startServer();
