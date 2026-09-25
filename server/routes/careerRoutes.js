import express from 'express';
import { careersData } from '../data/careersData.js';

const router = express.Router();

// Get all careers with summary data
router.get('/', (req, res) => {
  const { category, search } = req.query;
  let results = careersData;

  if (category && category !== 'All') {
    results = results.filter(c => c.category.toLowerCase() === category.toLowerCase());
  }

  if (search) {
    const q = search.toLowerCase();
    results = results.filter(c =>
      c.title.toLowerCase().includes(q) ||
      c.category.toLowerCase().includes(q) ||
      c.shortDescription.toLowerCase().includes(q) ||
      c.coreSkills.some(s => s.name.toLowerCase().includes(q))
    );
  }

  res.json({
    total: results.length,
    careers: results
  });
});

// Get single career detail
router.get('/:id', (req, res) => {
  const career = careersData.find(c => c.id === req.params.id);
  if (!career) {
    return res.status(404).json({ error: 'Career path not found' });
  }
  res.json(career);
});

// Get roadmap for career
router.get('/:id/roadmap', (req, res) => {
  const career = careersData.find(c => c.id === req.params.id);
  if (!career) {
    return res.status(404).json({ error: 'Career path not found' });
  }
  res.json({
    careerId: career.id,
    careerTitle: career.title,
    phases: career.roadmapPhases
  });
});

export default router;
