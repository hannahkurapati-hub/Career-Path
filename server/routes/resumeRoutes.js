import express from 'express';
import { store } from '../store.js';

const router = express.Router();

router.get('/audit/:profileId', (req, res) => {
  const profile = store.getProfileById(req.params.profileId);
  if (!profile) {
    return res.status(404).json({ error: 'Profile not found' });
  }

  const strengths = [];
  const improvements = [];

  // 1. Basics & Education (25 pts)
  let basicsScore = 0;
  if (profile.name && profile.email) basicsScore += 10;
  if (profile.degree && profile.university) basicsScore += 10;
  if (profile.gpa) basicsScore += 5;

  if (basicsScore >= 20) {
    strengths.push('Complete academic and contact credentials formatted cleanly.');
  } else {
    improvements.push('Fill in your expected graduation year and current GPA to pass automated campus recruiting screens.');
  }

  // 2. Skills Inventory (25 pts)
  let skillsScore = 0;
  const skillsCount = (profile.skills || []).length;
  if (skillsCount >= 6) skillsScore += 15;
  else if (skillsCount >= 3) skillsScore += 10;
  else skillsScore += 5;

  const hasAdvanced = (profile.skills || []).some(s => s.level === 'Advanced');
  if (hasAdvanced) {
    skillsScore += 10;
    strengths.push('Demonstrates deep proficiency with at least one Advanced skill area.');
  } else {
    improvements.push('Highlight at least one core technology where you have advanced mastery rather than only beginner ratings.');
  }

  // 3. Projects & Proof of Work (30 pts)
  let projectScore = 0;
  const projects = profile.projects || [];
  if (projects.length >= 3) projectScore += 15;
  else if (projects.length >= 2) projectScore += 12;
  else if (projects.length >= 1) projectScore += 7;

  const hasLinks = projects.some(p => p.githubUrl || p.liveUrl);
  if (hasLinks) projectScore += 8;
  else improvements.push('Include public GitHub repository links and live URLs so hiring managers can inspect code quality.');

  const hasImpactMetrics = projects.some(p => p.impact && /\d+%|\d+\+|\bperformance\b|\blatency\b/i.test(p.impact));
  if (hasImpactMetrics) {
    projectScore += 7;
    strengths.push('Uses quantifiable metrics (e.g. latency, performance, users) in project impact descriptions.');
  } else {
    improvements.push('Enhance project bullet points with metrics (e.g., "Reduced load time by 30%", "Serving 500+ active users").');
  }

  // 4. Certifications & Credentials (20 pts)
  let certScore = 0;
  const certs = profile.certifications || [];
  if (certs.length >= 2) certScore += 20;
  else if (certs.length === 1) certScore += 12;
  else improvements.push('Pursue a recognized industry certification (AWS, Meta, DeepLearning.AI, or freeCodeCamp) to reinforce your degree.');

  if (certs.length > 0) {
    strengths.push(`Verified credentials from reputable issuers (${certs.map(c => c.issuer).join(', ')}).`);
  }

  const totalAtsScore = Math.min(100, basicsScore + skillsScore + projectScore + certScore);

  let ratingTier = 'Needs Enhancement';
  let badgeColor = 'amber';
  if (totalAtsScore >= 85) {
    ratingTier = 'Exceptional / Top 5% ATS Ready';
    badgeColor = 'emerald';
  } else if (totalAtsScore >= 70) {
    ratingTier = 'Competitive / Industry Ready';
    badgeColor = 'blue';
  } else if (totalAtsScore >= 50) {
    ratingTier = 'Good Foundation / In Progress';
    badgeColor = 'indigo';
  }

  res.json({
    profileId: profile.id,
    profileName: profile.name,
    totalAtsScore,
    ratingTier,
    badgeColor,
    breakdown: {
      basics: { score: basicsScore, max: 25, label: 'Academic & Contact Info' },
      skills: { score: skillsScore, max: 25, label: 'Technical Skills Matrix' },
      projects: { score: projectScore, max: 30, label: 'Portfolio & Quantified Impact' },
      certifications: { score: certScore, max: 20, label: 'Credentials & Certifications' }
    },
    strengths,
    improvements
  });
});

export default router;
