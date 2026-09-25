import express from 'express';
import { store } from '../store.js';
import { careersData } from '../data/careersData.js';

const router = express.Router();

function normalize(str) {
  return str.toLowerCase().replace(/[^a-z0-9]/g, '');
}

function skillMatches(userSkillName, requiredSkillName) {
  const u = normalize(userSkillName);
  const r = normalize(requiredSkillName);
  if (u === r || u.includes(r) || r.includes(u)) return true;
  // Specific common tech matches
  if ((u.includes('react') && r.includes('react')) ||
      (u.includes('js') && r.includes('javascript')) ||
      (u.includes('ts') && r.includes('typescript')) ||
      (u.includes('postgres') && r.includes('sql')) ||
      (u.includes('python') && r.includes('python')) ||
      (u.includes('docker') && r.includes('container')) ||
      (u.includes('kube') && r.includes('k8s'))) {
    return true;
  }
  return false;
}

// Calculate Gap Analysis for a given profile and career
router.get('/:profileId/:careerId', (req, res) => {
  const { profileId, careerId } = req.params;
  const profile = store.getProfileById(profileId);
  const career = careersData.find(c => c.id === careerId);

  if (!profile) {
    return res.status(404).json({ error: 'Profile not found' });
  }
  if (!career) {
    return res.status(404).json({ error: 'Career not found' });
  }

  const userSkills = profile.skills || [];
  const coreRequirements = career.coreSkills || [];
  const optionalRequirements = career.optionalSkills || [];

  const matchedSkills = [];
  const missingSkills = [];
  let earnedScore = 0;
  let maxPossibleScore = 0;

  coreRequirements.forEach(reqSkill => {
    maxPossibleScore += reqSkill.weight;
    const userMatch = userSkills.find(s => skillMatches(s.name, reqSkill.name));

    if (userMatch) {
      // Proficiency multiplier
      let multiplier = 1.0;
      if (reqSkill.minLevel === 'Advanced') {
        if (userMatch.level === 'Advanced') multiplier = 1.0;
        else if (userMatch.level === 'Intermediate') multiplier = 0.8;
        else multiplier = 0.5;
      } else if (reqSkill.minLevel === 'Intermediate') {
        if (userMatch.level === 'Advanced' || userMatch.level === 'Intermediate') multiplier = 1.0;
        else multiplier = 0.6;
      } else {
        multiplier = 1.0;
      }

      earnedScore += reqSkill.weight * multiplier;
      matchedSkills.push({
        name: reqSkill.name,
        category: reqSkill.category,
        requiredLevel: reqSkill.minLevel,
        userLevel: userMatch.level,
        weight: reqSkill.weight,
        status: multiplier >= 1.0 ? 'Mastered' : 'Needs Practice'
      });
    } else {
      missingSkills.push({
        name: reqSkill.name,
        category: reqSkill.category,
        requiredLevel: reqSkill.minLevel,
        weight: reqSkill.weight,
        priority: reqSkill.weight >= 15 ? 'Critical' : 'Recommended'
      });
    }
  });

  // Calculate percentage
  const skillMatchPercentage = maxPossibleScore > 0 ? Math.round((earnedScore / maxPossibleScore) * 100) : 0;

  // Degree alignment
  const degreeLower = (profile.degree || '').toLowerCase();
  const degreeMatch = career.typicalDegree.some(d => degreeLower.includes(d.toLowerCase()));
  const degreeScore = degreeMatch ? 15 : 10;

  // Projects relevance
  const userProjects = profile.projects || [];
  let relevantProjectsCount = 0;
  userProjects.forEach(proj => {
    const projTech = (proj.techStack || []).join(' ').toLowerCase();
    const projDesc = (proj.description || '').toLowerCase();
    const isRelevant = coreRequirements.some(reqSkill =>
      projTech.includes(normalize(reqSkill.name)) || projDesc.includes(normalize(reqSkill.name))
    );
    if (isRelevant) relevantProjectsCount++;
  });
  const projectScore = Math.min(20, relevantProjectsCount * 10);

  // Overall readiness score (weighted)
  // 65% skills, 20% projects, 15% degree
  const overallFitScore = Math.min(100, Math.round(
    (skillMatchPercentage * 0.65) + projectScore + degreeScore
  ));

  // Determine readiness level
  let readinessTier = 'Foundational Stage';
  let badgeColor = 'amber';
  if (overallFitScore >= 80) {
    readinessTier = 'Ready for Junior Roles & Interviews';
    badgeColor = 'emerald';
  } else if (overallFitScore >= 60) {
    readinessTier = 'Ready for Internships & Capstones';
    badgeColor = 'blue';
  } else if (overallFitScore >= 40) {
    readinessTier = 'Intermediate Skill Building';
    badgeColor = 'indigo';
  }

  // Generate prioritized action plan
  const actionPlan = missingSkills
    .sort((a, b) => b.weight - a.weight)
    .map((skill, idx) => ({
      step: idx + 1,
      skillName: skill.name,
      priority: skill.priority,
      estimatedWeeks: skill.priority === 'Critical' ? '2-3 weeks' : '1-2 weeks',
      recommendation: `Add '${skill.name}' to your repository by completing its dedicated roadmap milestone and building a targeted demonstration project.`,
      scoreImpact: `+${Math.round((skill.weight / maxPossibleScore) * 65)}% overall fit`
    }));

  res.json({
    profileId,
    careerId,
    careerTitle: career.title,
    overallFitScore,
    skillMatchPercentage,
    readinessTier,
    badgeColor,
    metrics: {
      matchedSkillsCount: matchedSkills.length,
      missingSkillsCount: missingSkills.length,
      totalCoreSkills: coreRequirements.length,
      relevantProjectsCount,
      totalProjects: userProjects.length,
      degreeAligned: degreeMatch
    },
    matchedSkills,
    missingSkills,
    actionPlan
  });
});

export default router;
