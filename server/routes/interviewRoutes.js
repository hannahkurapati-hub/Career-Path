import express from 'express';
import { interviewQuestions } from '../data/interviewData.js';

const router = express.Router();

router.get('/', (req, res) => {
  const { role, category, search } = req.query;
  let results = interviewQuestions;

  if (role && role !== 'all') {
    results = results.filter(q => q.roleCategory === role || q.roleCategory === 'general');
  }

  if (category && category !== 'all') {
    results = results.filter(q => q.category.toLowerCase().includes(category.toLowerCase()));
  }

  if (search) {
    const s = search.toLowerCase();
    results = results.filter(q =>
      q.question.toLowerCase().includes(s) ||
      q.answer.toLowerCase().includes(s) ||
      q.category.toLowerCase().includes(s)
    );
  }

  res.json({
    total: results.length,
    questions: results
  });
});

export default router;
