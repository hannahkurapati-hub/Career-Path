import React, { useState } from 'react';
import { 
  Target, 
  CheckCircle, 
  AlertTriangle, 
  TrendingUp, 
  Calendar, 
  Award, 
  ArrowRight, 
  Zap, 
  ChevronRight,
  ShieldCheck
} from 'lucide-react';

export function SkillGapAnalyzer({ 
  profile, 
  career, 
  gapData, 
  careers, 
  onSelectCareer, 
  onNavigate 
}) {
  const [filterPriority, setFilterPriority] = useState('all'); // 'all', 'Critical', 'Recommended'

  if (!gapData || !profile || !career) {
    return (
      <div className="card" style={{ padding: 40, textAlign: 'center' }}>
        <p>Loading skill gap analysis...</p>
      </div>
    );
  }

  const { matchedSkills = [], missingSkills = [], actionPlan = [] } = gapData;

  const filteredMissing = filterPriority === 'all'
    ? missingSkills
    : missingSkills.filter(s => s.priority === filterPriority);

  return (
    <div id="view-skill-gap">
      {/* Hero Fit & Role Switcher Banner */}
      <div className="fit-score-hero-card">
        <div style={{ display: 'flex', alignItems: 'center', gap: 24, flexWrap: 'wrap' }}>
          <div 
            className="score-radial-visual" 
            style={{ '--score-pct': gapData.overallFitScore }}
          >
            <div className="score-radial-inner">
              <span className="score-radial-number">{gapData.overallFitScore}%</span>
              <span className="score-radial-label">Match</span>
            </div>
          </div>

          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
              <span className="badge badge-indigo">Automated Gap Engine</span>
              <span className={`badge badge-${gapData.badgeColor}`}>
                {gapData.readinessTier}
              </span>
            </div>
            <h2 style={{ fontSize: 22, marginBottom: 4 }}>
              Profile Fit for {career.title}
            </h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: 13.5, maxWidth: 500 }}>
              Based on your degree ({profile.degree}), {profile.skills?.length || 0} logged skills, and {profile.projects?.length || 0} projects.
            </p>
          </div>
        </div>

        {/* Quick Career Benchmark Switcher */}
        <div style={{ background: 'rgba(255, 255, 255, 0.04)', padding: '14px 18px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)', minWidth: 260 }}>
          <label style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-muted)', display: 'block', marginBottom: 6 }}>
            Benchmark Against Another Role:
          </label>
          <select 
            value={career.id} 
            onChange={(e) => onSelectCareer(e.target.value)}
            style={{ width: '100%', fontSize: 13 }}
            id="select-gap-career-benchmark"
          >
            {careers.map(c => (
              <option key={c.id} value={c.id}>
                {c.title} ({c.category})
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Skills Matrix: Matched vs Missing */}
      <div className="gap-columns-grid" style={{ marginBottom: 32 }}>
        {/* Left Column: Matched Skills */}
        <div className="card">
          <div className="card-header">
            <div>
              <span className="card-title">
                <CheckCircle size={18} color="var(--accent-emerald)" />
                Acquired & Matched Skills ({matchedSkills.length})
              </span>
              <span style={{ fontSize: 12.5, color: 'var(--text-muted)' }}>
                Competencies already present in your portfolio
              </span>
            </div>
          </div>

          {matchedSkills.length === 0 ? (
            <div style={{ padding: 24, textAlign: 'center', color: 'var(--text-muted)' }}>
              No overlapping skills registered yet. Add skills in your Profile tab!
            </div>
          ) : (
            <div className="skills-pill-stack">
              {matchedSkills.map((s, idx) => (
                <div key={idx} className="skill-match-row">
                  <div>
                    <div style={{ fontWeight: 600, fontSize: 14 }}>{s.name}</div>
                    <div style={{ fontSize: 11.5, color: 'var(--text-muted)' }}>
                      Category: {s.category} • Required: {s.requiredLevel}
                    </div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <span className="badge badge-indigo">Your level: {s.userLevel}</span>
                    <span className="badge badge-emerald">{s.status}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right Column: Missing Skills to Acquire */}
        <div className="card">
          <div className="card-header">
            <div>
              <span className="card-title">
                <AlertTriangle size={18} color="var(--accent-amber)" />
                Missing Core Skills ({missingSkills.length})
              </span>
              <span style={{ fontSize: 12.5, color: 'var(--text-muted)' }}>
                Required competencies to master for this role
              </span>
            </div>

            <div style={{ display: 'flex', gap: 4 }}>
              <button
                className={`chip-btn ${filterPriority === 'all' ? 'active' : ''}`}
                onClick={() => setFilterPriority('all')}
                style={{ fontSize: 11, padding: '3px 8px' }}
                id="filter-missing-all"
              >
                All
              </button>
              <button
                className={`chip-btn ${filterPriority === 'Critical' ? 'active' : ''}`}
                onClick={() => setFilterPriority('Critical')}
                style={{ fontSize: 11, padding: '3px 8px' }}
                id="filter-missing-critical"
              >
                Critical
              </button>
            </div>
          </div>

          {filteredMissing.length === 0 ? (
            <div style={{ padding: 24, textAlign: 'center', color: 'var(--accent-emerald)' }}>
              🎉 Zero missing skills in this view! You have all core skills covered!
            </div>
          ) : (
            <div className="skills-pill-stack">
              {filteredMissing.map((s, idx) => (
                <div 
                  key={idx} 
                  className="skill-match-row"
                  style={{
                    borderColor: s.priority === 'Critical' ? 'rgba(245, 158, 11, 0.4)' : undefined
                  }}
                >
                  <div>
                    <div style={{ fontWeight: 600, fontSize: 14 }}>{s.name}</div>
                    <div style={{ fontSize: 11.5, color: 'var(--text-muted)' }}>
                      Category: {s.category} • Target Level: {s.requiredLevel}
                    </div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <span className={`badge badge-${s.priority === 'Critical' ? 'amber' : 'indigo'}`}>
                      {s.priority}
                    </span>
                    <span style={{ fontSize: 12, color: 'var(--primary-light)', fontWeight: 700 }}>
                      +{Math.round(s.weight * 0.7)}%
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Prioritized Action Plan */}
      <div className="card">
        <div className="card-header">
          <div>
            <span className="card-title">
              <Zap size={18} color="var(--primary-light)" />
              Prioritized Gap Closure Sequence
            </span>
            <span style={{ fontSize: 12.5, color: 'var(--text-muted)' }}>
              Step-by-step roadmap to raise your career fit score to 90%+
            </span>
          </div>

          <button 
            className="btn-primary"
            onClick={() => onNavigate('roadmap')}
            id="btn-action-goto-roadmap"
          >
            Launch Roadmap
            <ArrowRight size={15} />
          </button>
        </div>

        {actionPlan.length === 0 ? (
          <p style={{ color: 'var(--text-muted)' }}>All core skills acquired!</p>
        ) : (
          <div className="action-plan-timeline">
            {actionPlan.map(item => (
              <div key={item.step} className="action-step-card">
                <div className="action-step-num">{item.step}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 4, flexWrap: 'wrap', gap: 8 }}>
                    <div style={{ fontWeight: 700, fontSize: 15 }}>
                      Acquire: {item.skillName}
                    </div>
                    <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                      <span className="badge badge-indigo">Est: {item.estimatedWeeks}</span>
                      <span className="badge badge-emerald">{item.scoreImpact}</span>
                    </div>
                  </div>
                  <p style={{ color: 'var(--text-secondary)', fontSize: 13.5, margin: 0 }}>
                    {item.recommendation}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
