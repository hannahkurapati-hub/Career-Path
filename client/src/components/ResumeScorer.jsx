import React from 'react';
import { 
  FileCheck2, 
  CheckCircle2, 
  AlertCircle, 
  Award, 
  ArrowRight, 
  TrendingUp, 
  Sparkles, 
  ShieldCheck 
} from 'lucide-react';

export function ResumeScorer({ 
  auditData, 
  profile, 
  onNavigate 
}) {
  if (!auditData) {
    return (
      <div className="card" style={{ padding: 40, textAlign: 'center' }}>
        <p>Loading ATS profile audit data...</p>
      </div>
    );
  }

  const { totalAtsScore, ratingTier, badgeColor, breakdown, strengths = [], improvements = [] } = auditData;

  return (
    <div id="view-resume-scorer">
      {/* Top Banner */}
      <div className="card" style={{ marginBottom: 28 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 24 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 24, flexWrap: 'wrap' }}>
            <div 
              className="score-radial-visual" 
              style={{ '--score-pct': totalAtsScore, width: 130, height: 130 }}
            >
              <div className="score-radial-inner" style={{ width: 104, height: 104 }}>
                <span className="score-radial-number">{totalAtsScore}</span>
                <span className="score-radial-label">ATS Score</span>
              </div>
            </div>

            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                <span className="badge badge-indigo">AI Resume & Portfolio Audit</span>
                <span className={`badge badge-${badgeColor}`}>{ratingTier}</span>
              </div>
              <h2 style={{ fontSize: 24, marginBottom: 4 }}>Profile Readiness & ATS Rubric</h2>
              <p style={{ color: 'var(--text-secondary)', fontSize: 13.5, maxWidth: 550 }}>
                Auditing <strong>{profile?.name}</strong>'s projects, technical depth, quantifiable impact, and credentials against modern tech hiring filters.
              </p>
            </div>
          </div>

          <button 
            className="btn-primary" 
            onClick={() => onNavigate('profile')}
            id="btn-audit-edit-profile"
          >
            Optimize Profile Details
            <ArrowRight size={15} />
          </button>
        </div>
      </div>

      {/* 4 Rubric Bars */}
      <div className="dashboard-grid" style={{ marginBottom: 28 }}>
        {breakdown && Object.entries(breakdown).map(([key, item]) => {
          const pct = Math.round((item.score / item.max) * 100);
          return (
            <div key={key} className="card col-6">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                <div style={{ fontWeight: 700, fontSize: 14 }}>{item.label}</div>
                <div style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, fontSize: 13, color: 'var(--primary-light)' }}>
                  {item.score} / {item.max} pts ({pct}%)
                </div>
              </div>
              <div className="progress-bar-track">
                <div 
                  className={`progress-bar-fill ${pct >= 80 ? 'emerald' : pct >= 50 ? '' : 'amber'}`}
                  style={{ width: `${pct}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>

      {/* Strengths & Recommendations Grid */}
      <div className="gap-columns-grid">
        {/* Strengths */}
        <div className="card">
          <div className="card-header">
            <div>
              <span className="card-title">
                <CheckCircle2 size={18} color="var(--accent-emerald)" />
                Detected Strengths ({strengths.length})
              </span>
              <span style={{ fontSize: 12.5, color: 'var(--text-muted)' }}>
                Competitive highlights that stand out to hiring algorithms
              </span>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {strengths.length === 0 ? (
              <p style={{ color: 'var(--text-muted)' }}>Add more detail to your profile to uncover strengths.</p>
            ) : (
              strengths.map((str, idx) => (
                <div 
                  key={idx}
                  style={{
                    padding: '12px 16px',
                    borderRadius: 'var(--radius-md)',
                    background: 'rgba(16, 185, 129, 0.05)',
                    border: '1px solid rgba(16, 185, 129, 0.2)',
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: 12,
                    fontSize: 13.5
                  }}
                >
                  <ShieldCheck size={18} color="#34D399" style={{ flexShrink: 0, marginTop: 2 }} />
                  <span>{str}</span>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Improvement Opportunities */}
        <div className="card">
          <div className="card-header">
            <div>
              <span className="card-title">
                <AlertCircle size={18} color="var(--accent-amber)" />
                Actionable ATS Optimizations ({improvements.length})
              </span>
              <span style={{ fontSize: 12.5, color: 'var(--text-muted)' }}>
                Targeted enhancements to boost your score to the next tier
              </span>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {improvements.length === 0 ? (
              <div style={{ padding: 20, textAlign: 'center', color: '#34D399' }}>
                🎉 Exceptional work! Your profile satisfies all primary ATS guidelines.
              </div>
            ) : (
              improvements.map((imp, idx) => (
                <div 
                  key={idx}
                  style={{
                    padding: '12px 16px',
                    borderRadius: 'var(--radius-md)',
                    background: 'rgba(245, 158, 11, 0.05)',
                    border: '1px solid rgba(245, 158, 11, 0.2)',
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: 12,
                    fontSize: 13.5
                  }}
                >
                  <Sparkles size={18} color="#FBBF24" style={{ flexShrink: 0, marginTop: 2 }} />
                  <span>{imp}</span>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
