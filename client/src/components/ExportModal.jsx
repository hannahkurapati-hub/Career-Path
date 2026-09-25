import React from 'react';
import { X, Printer, Download, CheckCircle2, AlertTriangle, Compass, Award } from 'lucide-react';

export function ExportModal({ 
  isOpen, 
  onClose, 
  profile, 
  career, 
  gapData, 
  auditData 
}) {
  if (!isOpen || !profile || !career) return null;

  const handlePrint = () => {
    window.print();
  };

  const completedCount = (profile.completedMilestones || []).length;
  const totalMilestones = (career.roadmapPhases || []).reduce(
    (acc, phase) => acc + (phase.milestones ? phase.milestones.length : 0), 0
  );

  return (
    <div className="modal-backdrop" id="modal-export-report">
      <div className="modal-dialog" style={{ maxWidth: 800 }}>
        <div className="modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <Compass size={22} color="var(--primary-light)" />
            <span className="modal-title">Career Strategy & Roadmap Report</span>
          </div>
          <button className="modal-close-btn" onClick={onClose} id="btn-close-export-modal">
            <X size={20} />
          </button>
        </div>

        {/* Printable Document Body */}
        <div id="printable-career-report" style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          {/* Header Card */}
          <div style={{ padding: 20, background: 'rgba(255, 255, 255, 0.03)', borderRadius: 12, border: '1px solid var(--border-subtle)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 12 }}>
              <div>
                <h2 style={{ fontSize: 22, margin: '0 0 4px' }}>{profile.name}</h2>
                <div style={{ fontSize: 13, color: 'var(--text-secondary)' }}>
                  {profile.degree} • {profile.university || 'Undergraduate'}
                </div>
                <div style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 2 }}>
                  Academic Standing: {profile.currentYear} • GPA: {profile.gpa}
                </div>
              </div>

              <div style={{ textAlign: 'right' }}>
                <span className="badge badge-indigo" style={{ fontSize: 13, padding: '4px 12px' }}>
                  Target: {career.title}
                </span>
                <div style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 4 }}>
                  Report Generated: {new Date().toLocaleDateString()}
                </div>
              </div>
            </div>
          </div>

          {/* Key Metrics Overview */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12 }}>
            <div style={{ padding: 14, textAlign: 'center', background: 'rgba(17, 24, 39, 0.6)', borderRadius: 8, border: '1px solid var(--border-subtle)' }}>
              <div style={{ fontSize: 11, textTransform: 'uppercase', color: 'var(--text-muted)' }}>Career Fit</div>
              <div style={{ fontSize: 22, fontWeight: 800, color: 'var(--primary-light)' }}>{gapData?.overallFitScore || 0}%</div>
            </div>
            <div style={{ padding: 14, textAlign: 'center', background: 'rgba(17, 24, 39, 0.6)', borderRadius: 8, border: '1px solid var(--border-subtle)' }}>
              <div style={{ fontSize: 11, textTransform: 'uppercase', color: 'var(--text-muted)' }}>Roadmap Progress</div>
              <div style={{ fontSize: 22, fontWeight: 800, color: '#34D399' }}>{completedCount} / {totalMilestones}</div>
            </div>
            <div style={{ padding: 14, textAlign: 'center', background: 'rgba(17, 24, 39, 0.6)', borderRadius: 8, border: '1px solid var(--border-subtle)' }}>
              <div style={{ fontSize: 11, textTransform: 'uppercase', color: 'var(--text-muted)' }}>ATS Score</div>
              <div style={{ fontSize: 22, fontWeight: 800, color: '#38BDF8' }}>{auditData?.totalAtsScore || 0}/100</div>
            </div>
            <div style={{ padding: 14, textAlign: 'center', background: 'rgba(17, 24, 39, 0.6)', borderRadius: 8, border: '1px solid var(--border-subtle)' }}>
              <div style={{ fontSize: 11, textTransform: 'uppercase', color: 'var(--text-muted)' }}>Projects Logged</div>
              <div style={{ fontSize: 22, fontWeight: 800, color: '#FBBF24' }}>{(profile.projects || []).length}</div>
            </div>
          </div>

          {/* Skill Gap Analysis Section */}
          <div>
            <h4 style={{ fontSize: 15, marginBottom: 10, display: 'flex', alignItems: 'center', gap: 6 }}>
              <CheckCircle2 size={16} color="var(--accent-emerald)" /> Matched Competencies
            </h4>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 16 }}>
              {(gapData?.matchedSkills || []).map((s, idx) => (
                <span key={idx} className="badge badge-emerald" style={{ fontSize: 12 }}>
                  {s.name} ({s.userLevel})
                </span>
              ))}
            </div>

            <h4 style={{ fontSize: 15, marginBottom: 10, display: 'flex', alignItems: 'center', gap: 6 }}>
              <AlertTriangle size={16} color="var(--accent-amber)" /> High-Priority Skills to Acquire
            </h4>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
              {(gapData?.missingSkills || []).map((s, idx) => (
                <span key={idx} className="badge badge-amber" style={{ fontSize: 12 }}>
                  {s.name} • {s.priority}
                </span>
              ))}
            </div>
          </div>

          {/* Action Plan Sequence */}
          {gapData?.actionPlan && gapData.actionPlan.length > 0 && (
            <div>
              <h4 style={{ fontSize: 15, marginBottom: 10 }}>Recommended Next Steps</h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {gapData.actionPlan.slice(0, 3).map(item => (
                  <div key={item.step} style={{ padding: 10, borderRadius: 6, background: 'rgba(255, 255, 255, 0.03)', fontSize: 13, borderLeft: '3px solid var(--primary)' }}>
                    <strong>Step {item.step}: Master {item.skillName}</strong> ({item.estimatedWeeks}) — {item.recommendation}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Projects Snapshot */}
          {(profile.projects || []).length > 0 && (
            <div>
              <h4 style={{ fontSize: 15, marginBottom: 8 }}>Portfolio Project Highlights</h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {profile.projects.slice(0, 2).map(p => (
                  <div key={p.id} style={{ fontSize: 13, padding: 8, background: 'rgba(255, 255, 255, 0.02)', borderRadius: 6 }}>
                    <strong>{p.title}</strong> — {p.description}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer actions */}
        <div style={{ marginTop: 24, paddingTop: 16, borderTop: '1px solid var(--border-subtle)', display: 'flex', justifyContent: 'flex-end', gap: 12 }}>
          <button className="btn-secondary" onClick={onClose} id="btn-export-cancel">
            Close
          </button>
          <button className="btn-primary" onClick={handlePrint} id="btn-export-print">
            <Printer size={16} /> Print / Save as PDF
          </button>
        </div>
      </div>
    </div>
  );
}
