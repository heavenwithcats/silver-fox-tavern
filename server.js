import express from 'express';
import cors from 'cors';
import db from './db.js';
const app = express();
app.use(cors());
app.use(express.json());

// Test route to verify server works
app.get('/api/health', (req, res) => {
  res.json({ status: 'Whiskers & Warmth backend is live! 🐱✨' });
});

// Route to fetch recipes from PostgreSQL
app.get('/api/recipes', async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM recipes ORDER BY id ASC');
    res.json(result.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Database query failed' });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🐾 Whiskers 'n Warmth backend running on http://localhost:${PORT}`);
});
