import React, { useState } from 'react';
import { 
  Check, 
  ChevronDown, 
  ChevronUp, 
  ExternalLink, 
  BookOpen, 
  Sparkles, 
  Clock, 
  FolderPlus, 
  Layers, 
  Filter 
} from 'lucide-react';

export function CareerRoadmap({ 
  career, 
  completedMilestones = [], 
  onToggleMilestone 
}) {
  const [collapsedPhases, setCollapsedPhases] = useState({});
  const [filterMode, setFilterMode] = useState('all'); // 'all' or 'pending'

  if (!career || !career.roadmapPhases) {
    return (
      <div className="card" style={{ padding: 40, textAlign: 'center' }}>
        <p>No roadmap data found for this career path.</p>
      </div>
    );
  }

  const togglePhase = (phaseId) => {
    setCollapsedPhases(prev => ({ ...prev, [phaseId]: !prev[phaseId] }));
  };

  const totalMilestones = career.roadmapPhases.reduce(
    (acc, phase) => acc + (phase.milestones ? phase.milestones.length : 0), 0
  );
  const completedCount = completedMilestones.length;
  const progressPercent = totalMilestones > 0 
    ? Math.round((completedCount / totalMilestones) * 100) 
    : 0;

  return (
    <div id="view-career-roadmap">
      {/* Roadmap Header Summary */}
      <div className="card" style={{ marginBottom: 28 }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: 20 }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6 }}>
              <span className="badge badge-indigo">{career.category}</span>
              <span className="badge badge-emerald">Interactive Roadmap</span>
            </div>
            <h2 style={{ fontSize: 24, marginBottom: 6 }}>{career.title} Roadmap</h2>
            <p style={{ color: 'var(--text-secondary)', maxWidth: 700, fontSize: 14 }}>
              Step-by-step curriculum with recommended projects, official documentation, free interactive courses, and industry milestones. Check off milestones as you achieve them.
            </p>
          </div>

          <div style={{ textAlign: 'right', minWidth: 200 }}>
            <div style={{ fontSize: 13, color: 'var(--text-muted)', marginBottom: 4 }}>
              Roadmap Progress
            </div>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: 26, fontWeight: 800, color: 'var(--primary-light)' }}>
              {progressPercent}%
            </div>
            <div style={{ fontSize: 12, color: 'var(--text-secondary)' }}>
              {completedCount} of {totalMilestones} Milestones Completed
            </div>
          </div>
        </div>

        <div className="progress-bar-track" style={{ height: 10, marginTop: 20 }}>
          <div 
            className="progress-bar-fill" 
            style={{ width: `${progressPercent}%` }}
          />
        </div>

        {/* Filters */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 18, paddingTop: 14, borderTop: '1px solid var(--border-subtle)', flexWrap: 'wrap', gap: 12 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <Filter size={16} color="var(--text-muted)" />
            <span style={{ fontSize: 13, color: 'var(--text-muted)' }}>View Filter:</span>
            <button
              className={`chip-btn ${filterMode === 'all' ? 'active' : ''}`}
              onClick={() => setFilterMode('all')}
              id="filter-roadmap-all"
            >
              All Milestones
            </button>
            <button
              className={`chip-btn ${filterMode === 'pending' ? 'active' : ''}`}
              onClick={() => setFilterMode('pending')}
              id="filter-roadmap-pending"
            >
              Pending Only
            </button>
          </div>

          <div style={{ fontSize: 12.5, color: 'var(--text-muted)' }}>
            💡 Tip: Click any checkbox to celebrate progress and sync with your profile!
          </div>
        </div>
      </div>

      {/* Timeline Phases */}
      <div className="roadmap-timeline-container">
        {career.roadmapPhases.map((phase, pIdx) => {
          const isCollapsed = !!collapsedPhases[phase.phaseId];
          const phaseMilestones = phase.milestones || [];
          const phaseCompletedCount = phaseMilestones.filter(m => completedMilestones.includes(m.id)).length;
          const isPhaseFullyDone = phaseMilestones.length > 0 && phaseCompletedCount === phaseMilestones.length;

          // Filter for display
          const displayMilestones = filterMode === 'pending'
            ? phaseMilestones.filter(m => !completedMilestones.includes(m.id))
            : phaseMilestones;

          if (filterMode === 'pending' && displayMilestones.length === 0) {
            return null;
          }

          return (
            <div 
              key={phase.phaseId} 
              className="phase-card"
              style={{
                borderColor: isPhaseFullyDone ? 'rgba(16, 185, 129, 0.4)' : undefined
              }}
            >
              <div 
                className="phase-header" 
                onClick={() => togglePhase(phase.phaseId)}
                id={`phase-header-${phase.phaseId}`}
              >
                <div className="phase-title-group">
                  <div 
                    className="phase-number-badge"
                    style={{
                      background: isPhaseFullyDone 
                        ? 'linear-gradient(135deg, #10B981 0%, #06B6D4 100%)' 
                        : undefined
                    }}
                  >
                    {isPhaseFullyDone ? <Check size={18} /> : (pIdx + 1)}
                  </div>
                  <div>
                    <div className="phase-title">{phase.phaseName}</div>
                    <div className="phase-duration">
                      <Clock size={12} style={{ display: 'inline', marginRight: 4 }} />
                      {phase.duration} • {phaseCompletedCount}/{phaseMilestones.length} Completed
                    </div>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  {isPhaseFullyDone && (
                    <span className="badge badge-emerald">Phase Mastered</span>
                  )}
                  {isCollapsed ? <ChevronDown size={20} /> : <ChevronUp size={20} />}
                </div>
              </div>

              {!isCollapsed && (
                <div className="milestones-list">
                  <p style={{ color: 'var(--text-secondary)', fontSize: 13.5, marginBottom: 8 }}>
                    {phase.description}
                  </p>

                  {displayMilestones.map(m => {
                    const isCompleted = completedMilestones.includes(m.id);

                    return (
                      <div 
                        key={m.id} 
                        className={`milestone-item ${isCompleted ? 'completed' : ''}`}
                        id={`milestone-card-${m.id}`}
                      >
                        <button
                          className={`milestone-checkbox ${isCompleted ? 'checked' : ''}`}
                          onClick={() => onToggleMilestone(m.id)}
                          aria-label={`Toggle ${m.title}`}
                          id={`milestone-check-${m.id}`}
                        >
                          {isCompleted && <Check size={14} strokeWidth={3} />}
                        </button>

                        <div className="milestone-content">
                          <div className="milestone-title">
                            <span style={{ textDecoration: isCompleted ? 'line-through' : 'none', color: isCompleted ? 'var(--text-muted)' : 'var(--text-primary)' }}>
                              {m.title}
                            </span>
                            {isCompleted && (
                              <span className="badge badge-emerald" style={{ fontSize: 11, padding: '1px 6px' }}>
                                Done
                              </span>
                            )}
                          </div>

                          <p className="milestone-desc">
                            {m.description}
                          </p>

                          {/* Skills covered */}
                          {m.skillsCovered && m.skillsCovered.length > 0 && (
                            <div className="milestone-skills">
                              <span style={{ fontSize: 11.5, color: 'var(--text-muted)', marginRight: 4, display: 'flex', alignItems: 'center' }}>
                                Core Competencies:
                              </span>
                              {m.skillsCovered.map((s, idx) => (
                                <span key={idx} className="skill-tag">{s}</span>
                              ))}
                            </div>
                          )}

                          {/* Resources & Project Idea */}
                          <div className="milestone-meta-row">
                            <div className="resources-links">
                              <span style={{ fontSize: 11.5, color: 'var(--text-muted)', display: 'inline-flex', alignItems: 'center', gap: 4 }}>
                                <BookOpen size={13} /> Curated Resources:
                              </span>
                              {(m.resources || []).map((res, rIdx) => (
                                <a
                                  key={rIdx}
                                  href={res.url}
                                  target="_blank"
                                  rel="noreferrer"
                                  className="resource-chip"
                                  title={`Open ${res.title}`}
                                >
                                  <span>{res.title}</span>
                                  <span style={{ opacity: 0.6, fontSize: 10 }}>({res.type})</span>
                                  <ExternalLink size={12} />
                                </a>
                              ))}
                            </div>
                          </div>

                          {/* Project Idea Challenge */}
                          {m.projectIdea && (
                            <div style={{ marginTop: 12 }}>
                              <div className="project-challenge-box">
                                <Sparkles size={15} color="#22D3EE" style={{ flexShrink: 0 }} />
                                <div>
                                  <strong>Project Challenge: {m.projectIdea.title}</strong> — {m.projectIdea.brief}
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
