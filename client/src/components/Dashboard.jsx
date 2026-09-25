import React from 'react';
import { 
  Compass, 
  Target, 
  CheckCircle2, 
  Award, 
  BookOpen, 
  ArrowRight, 
  Briefcase, 
  Code, 
  TrendingUp, 
  AlertCircle, 
  FolderGit2, 
  ExternalLink 
} from 'lucide-react';

export function Dashboard({ 
  profile, 
  career, 
  gapData, 
  onNavigate, 
  onToggleMilestone 
}) {
  if (!profile || !career) return null;

  const completedMilestonesCount = (profile.completedMilestones || []).length;
  const totalMilestonesCount = career.roadmapPhases.reduce(
    (acc, phase) => acc + (phase.milestones ? phase.milestones.length : 0), 0
  );
  const milestoneProgressPct = totalMilestonesCount > 0 
    ? Math.round((completedMilestonesCount / totalMilestonesCount) * 100) 
    : 0;

  // Flatten milestones to find next upcoming incomplete ones
  const allMilestones = [];
  career.roadmapPhases.forEach(phase => {
    (phase.milestones || []).forEach(m => {
      allMilestones.push({ ...m, phaseName: phase.phaseName });
    });
  });

  const nextMilestones = allMilestones
    .filter(m => !(profile.completedMilestones || []).includes(m.id))
    .slice(0, 3);

  const topMissingSkill = gapData?.missingSkills?.[0];

  return (
    <div id="view-dashboard">
      {/* Hero Welcome Banner */}
      <section className="hero-banner">
        <div className="hero-content">
          <div className="hero-text">
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
              <span className="badge badge-indigo">
                {profile.degree}
              </span>
              <span className="badge badge-emerald">
                {profile.currentYear}
              </span>
            </div>
            <h1>Welcome back, {profile.name}!</h1>
            <p>
              Your personalized career guidance cockpit. You are tracking toward <strong>{career.title}</strong> with an active roadmap alignment of <strong>{gapData?.overallFitScore || 0}%</strong>.
            </p>
          </div>

          <div className="hero-quick-stats">
            <div className="hero-stat-box">
              <div className="hero-stat-val">{gapData?.overallFitScore || 0}%</div>
              <div className="hero-stat-label">Career Fit</div>
            </div>
            <div className="hero-stat-box">
              <div className="hero-stat-val">{completedMilestonesCount}/{totalMilestonesCount}</div>
              <div className="hero-stat-label">Milestones</div>
            </div>
            <div className="hero-stat-box">
              <div className="hero-stat-val">{(profile.skills || []).length}</div>
              <div className="hero-stat-label">Skills Logged</div>
            </div>
            <div className="hero-stat-box">
              <div className="hero-stat-val">{(profile.projects || []).length}</div>
              <div className="hero-stat-label">Projects</div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Grid */}
      <div className="dashboard-grid">
        {/* Fit Score & Readiness Meter (Col 4) */}
        <div className="card col-4" style={{ display: 'flex', flexDirection: 'column' }}>
          <div className="card-header">
            <span className="card-title">
              <Target size={18} color="var(--primary-light)" />
              Target Readiness
            </span>
            <span className="badge badge-cyan">{career.badge || 'Target'}</span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '16px 0', flex: 1, justifyContent: 'center' }}>
            <div 
              className="score-radial-visual" 
              style={{ '--score-pct': gapData?.overallFitScore || 0, width: 140, height: 140 }}
            >
              <div className="score-radial-inner" style={{ width: 112, height: 112 }}>
                <span className="score-radial-number">{gapData?.overallFitScore || 0}%</span>
                <span className="score-radial-label">Match Score</span>
              </div>
            </div>

            <div style={{ marginTop: 20, textAlign: 'center' }}>
              <div style={{ fontWeight: 700, fontSize: 16, marginBottom: 4 }}>
                {gapData?.readinessTier || 'Evaluating'}
              </div>
              <div style={{ fontSize: 12.5, color: 'var(--text-muted)' }}>
                Targeting <strong>{career.title}</strong>
              </div>
            </div>
          </div>

          <div style={{ borderTop: '1px solid var(--border-subtle)', paddingTop: 16, marginTop: 'auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, marginBottom: 8 }}>
              <span style={{ color: 'var(--text-secondary)' }}>Core Skills Match</span>
              <span style={{ fontWeight: 700 }}>{gapData?.skillMatchPercentage || 0}%</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, marginBottom: 8 }}>
              <span style={{ color: 'var(--text-secondary)' }}>Degree Alignment</span>
              <span style={{ fontWeight: 700, color: '#34D399' }}>
                {gapData?.metrics?.degreeAligned ? 'Aligned' : 'Adjacent'}
              </span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13 }}>
              <span style={{ color: 'var(--text-secondary)' }}>Relevant Projects</span>
              <span style={{ fontWeight: 700 }}>
                {gapData?.metrics?.relevantProjectsCount || 0} / {gapData?.metrics?.totalProjects || 0}
              </span>
            </div>
          </div>
        </div>

        {/* Target Career Snapshot & Next Action (Col 8) */}
        <div className="card col-8">
          <div className="card-header">
            <div>
              <span className="card-title">
                <Briefcase size={18} color="var(--primary-light)" />
                {career.title}
              </span>
              <span style={{ fontSize: 12.5, color: 'var(--text-muted)' }}>
                {career.category} • Demand: <strong style={{ color: '#34D399' }}>{career.marketDemand}</strong>
              </span>
            </div>
            <button 
              className="btn-secondary" 
              onClick={() => onNavigate('roadmap')}
              style={{ fontSize: 12.5, padding: '6px 14px' }}
              id="btn-goto-roadmap"
            >
              Full Roadmap
              <ArrowRight size={14} />
            </button>
          </div>

          <p style={{ color: 'var(--text-secondary)', fontSize: 14, marginBottom: 20 }}>
            {career.shortDescription}
          </p>

          <div className="career-salary-box" style={{ marginBottom: 20 }}>
            <div>
              <div className="salary-label">Entry Level</div>
              <div className="salary-value">{career.salaryRanges.entry}</div>
            </div>
            <div style={{ borderLeft: '1px solid var(--border-subtle)', paddingLeft: 16 }}>
              <div className="salary-label">Mid-Level</div>
              <div className="salary-value">{career.salaryRanges.mid}</div>
            </div>
            <div style={{ borderLeft: '1px solid var(--border-subtle)', paddingLeft: 16 }}>
              <div className="salary-label">Senior / Lead</div>
              <div className="salary-value">{career.salaryRanges.senior}</div>
            </div>
          </div>

          {/* High Priority Recommendation Box */}
          {topMissingSkill && (
            <div style={{
              background: 'rgba(99, 102, 241, 0.08)',
              border: '1px solid rgba(99, 102, 241, 0.3)',
              borderRadius: 'var(--radius-md)',
              padding: 18,
              display: 'flex',
              alignItems: 'flex-start',
              gap: 16
            }}>
              <div style={{
                width: 36,
                height: 36,
                borderRadius: 8,
                background: 'rgba(99, 102, 241, 0.2)',
                color: 'var(--primary-light)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0
              }}>
                <TrendingUp size={20} />
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 4 }}>
                  <span style={{ fontWeight: 700, fontSize: 14 }}>
                    Top Priority Skill to Unlock: {topMissingSkill.name}
                  </span>
                  <span className="badge badge-amber">{topMissingSkill.priority}</span>
                </div>
                <p style={{ fontSize: 13, color: 'var(--text-secondary)', margin: 0 }}>
                  Mastering this skill is estimated to boost your profile readiness by <strong>+{Math.round(topMissingSkill.weight * 0.7)}%</strong>. Check the roadmap for recommended free labs and project ideas.
                </p>
              </div>
              <button 
                className="btn-primary" 
                onClick={() => onNavigate('skillgap')}
                style={{ fontSize: 12, padding: '6px 12px', flexShrink: 0 }}
                id="btn-inspect-gap"
              >
                Inspect Gap
              </button>
            </div>
          )}
        </div>

        {/* Milestone Quick Check-off (Col 6) */}
        <div className="card col-6">
          <div className="card-header">
            <div>
              <span className="card-title">
                <CheckCircle2 size={18} color="var(--accent-emerald)" />
                Upcoming Milestones
              </span>
              <span style={{ fontSize: 12.5, color: 'var(--text-muted)' }}>
                {milestoneProgressPct}% of roadmap achieved
              </span>
            </div>
            <button 
              className="btn-secondary" 
              onClick={() => onNavigate('roadmap')}
              style={{ fontSize: 12, padding: '4px 10px' }}
              id="btn-see-all-milestones"
            >
              See All
            </button>
          </div>

          <div className="progress-bar-track" style={{ marginBottom: 18 }}>
            <div 
              className="progress-bar-fill emerald" 
              style={{ width: `${milestoneProgressPct}%` }}
            />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {nextMilestones.length === 0 ? (
              <div style={{ padding: 20, textAlign: 'center', color: 'var(--text-muted)' }}>
                🎉 Outstanding! All roadmap milestones for this path are checked off!
              </div>
            ) : (
              nextMilestones.map(m => (
                <div 
                  key={m.id}
                  style={{
                    padding: '12px 16px',
                    borderRadius: 'var(--radius-md)',
                    background: 'rgba(17, 24, 39, 0.5)',
                    border: '1px solid var(--border-subtle)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 14
                  }}
                >
                  <button
                    className="milestone-checkbox"
                    onClick={() => onToggleMilestone(m.id)}
                    title="Mark milestone complete"
                    id={`quick-check-${m.id}`}
                  />
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontWeight: 600, fontSize: 13.5, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      {m.title}
                    </div>
                    <div style={{ fontSize: 11.5, color: 'var(--text-muted)' }}>
                      {m.phaseName?.split(':')[0]} • {m.skillsCovered?.join(', ')}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Student Portfolio Summary (Col 6) */}
        <div className="card col-6">
          <div className="card-header">
            <div>
              <span className="card-title">
                <FolderGit2 size={18} color="var(--accent-cyan)" />
                Portfolio & Projects
              </span>
              <span style={{ fontSize: 12.5, color: 'var(--text-muted)' }}>
                {(profile.projects || []).length} active project showcases
              </span>
            </div>
            <button 
              className="btn-secondary" 
              onClick={() => onNavigate('profile')}
              style={{ fontSize: 12, padding: '4px 10px' }}
              id="btn-manage-portfolio"
            >
              Manage
            </button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {(profile.projects || []).slice(0, 2).map(proj => (
              <div 
                key={proj.id}
                style={{
                  padding: 14,
                  borderRadius: 'var(--radius-md)',
                  background: 'rgba(17, 24, 39, 0.5)',
                  border: '1px solid var(--border-subtle)'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
                  <div style={{ fontWeight: 700, fontSize: 14 }}>{proj.title}</div>
                  {proj.githubUrl && (
                    <a 
                      href={proj.githubUrl} 
                      target="_blank" 
                      rel="noreferrer"
                      style={{ display: 'inline-flex', alignItems: 'center', gap: 4, fontSize: 11.5 }}
                    >
                      Repo <ExternalLink size={12} />
                    </a>
                  )}
                </div>
                <p style={{ fontSize: 12.5, color: 'var(--text-secondary)', marginBottom: 8, lineHeight: 1.4 }}>
                  {proj.description}
                </p>
                <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                  {(proj.techStack || []).map((t, idx) => (
                    <span key={idx} className="skill-tag" style={{ fontSize: 10.5 }}>{t}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
