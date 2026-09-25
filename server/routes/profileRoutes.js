import express from 'express';
import { store } from '../store.js';

const router = express.Router();

// Get all profiles
router.get('/', (req, res) => {
  res.json(store.getProfiles());
});

// Reset to defaults
router.post('/reset', (req, res) => {
  const profiles = store.resetToDefaults();
  res.json({ message: 'Profiles reset to default demo data', profiles });
});

// Get single profile
router.get('/:id', (req, res) => {
  const profile = store.getProfileById(req.params.id);
  if (!profile) {
    return res.status(404).json({ error: 'Profile not found' });
  }
  res.json(profile);
});

// Create new profile
router.post('/', (req, res) => {
  const { name, degree, targetCareerId } = req.body;
  if (!name || !degree) {
    return res.status(400).json({ error: 'Name and degree are required' });
  }
  const created = store.createProfile(req.body);
  res.status(201).json(created);
});

// Update profile
router.put('/:id', (req, res) => {
  const updated = store.updateProfile(req.params.id, req.body);
  if (!updated) {
    return res.status(404).json({ error: 'Profile not found' });
  }
  res.json(updated);
});

// Toggle milestone completion
router.post('/:id/toggle-milestone', (req, res) => {
  const { milestoneId } = req.body;
  if (!milestoneId) {
    return res.status(400).json({ error: 'milestoneId is required' });
  }
  const updated = store.toggleMilestone(req.params.id, milestoneId);
  if (!updated) {
    return res.status(404).json({ error: 'Profile not found' });
  }
  res.json({
    completedMilestones: updated.completedMilestones,
    profile: updated
  });
});

// Add project
router.post('/:id/projects', (req, res) => {
  const { title, description, techStack } = req.body;
  if (!title) {
    return res.status(400).json({ error: 'Project title is required' });
  }
  const updated = store.addProject(req.params.id, req.body);
  if (!updated) {
    return res.status(404).json({ error: 'Profile not found' });
  }
  res.status(201).json(updated);
});

// Delete project
router.delete('/:id/projects/:projectId', (req, res) => {
  const updated = store.deleteProject(req.params.id, req.params.projectId);
  if (!updated) {
    return res.status(404).json({ error: 'Profile not found' });
  }
  res.json(updated);
});

// Add certification
router.post('/:id/certifications', (req, res) => {
  const { name, issuer } = req.body;
  if (!name) {
    return res.status(400).json({ error: 'Certification name is required' });
  }
  const updated = store.addCertification(req.params.id, req.body);
  if (!updated) {
    return res.status(404).json({ error: 'Profile not found' });
  }
  res.status(201).json(updated);
});

// Delete certification
router.delete('/:id/certifications/:certId', (req, res) => {
  const updated = store.deleteCertification(req.params.id, req.params.certId);
  if (!updated) {
    return res.status(404).json({ error: 'Profile not found' });
  }
  res.json(updated);
});

export default router;
