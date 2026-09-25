import React, { useState } from 'react';
import { 
  BrainCircuit, 
  Search, 
  HelpCircle, 
  ChevronDown, 
  ChevronUp, 
  Sparkles, 
  CheckCircle2, 
  Building2, 
  Key 
} from 'lucide-react';

export function InterviewPrep({ 
  questions = [], 
  career, 
  activeRoleFilter, 
  onRoleFilterChange 
}) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [expandedAnswers, setExpandedAnswers] = useState({});
  const [masteredMap, setMasteredMap] = useState({});

  const toggleAnswer = (id) => {
    setExpandedAnswers(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const toggleMastered = (id) => {
    setMasteredMap(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const categories = ['All', 'Technical / Frontend', 'Technical / Backend', 'System Design', 'Core ML', 'Generative AI', 'Infrastructure', 'Application Security', 'Behavioral / STAR Method'];

  const filteredQuestions = questions.filter(q => {
    const matchesCat = selectedCategory === 'All' || q.category.toLowerCase().includes(selectedCategory.toLowerCase());
    const matchesSearch = !searchQuery || 
      q.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      q.answer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      q.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const masteredCount = Object.values(masteredMap).filter(Boolean).length;

  return (
    <div id="view-interview-prep">
      {/* Header */}
      <div className="card" style={{ marginBottom: 24 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 16 }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6 }}>
              <span className="badge badge-indigo">Technical & Behavioral</span>
              <span className="badge badge-emerald">FAANG & Top Tech Practice</span>
            </div>
            <h2 style={{ fontSize: 24, marginBottom: 6 }}>Industry Interview Question Bank</h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: 14, maxWidth: 650 }}>
              Master high-probability interview questions, system design discussions, and behavioral scenarios calibrated for <strong>{career?.title || 'Tech Roles'}</strong>.
            </p>
          </div>

          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: 13, color: 'var(--text-muted)' }}>Questions Mastered</div>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: 24, fontWeight: 800, color: 'var(--accent-emerald)' }}>
              {masteredCount} / {questions.length}
            </div>
          </div>
        </div>

        {/* Filters */}
        <div style={{ marginTop: 20, display: 'flex', flexDirection: 'column', gap: 14 }}>
          <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}>
            <div style={{ position: 'relative', flex: 1, minWidth: 260 }}>
              <Search size={16} color="var(--text-muted)" style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)' }} />
              <input
                type="text"
                placeholder="Search interview questions by keyword, topic, or concept..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                style={{ width: '100%', paddingLeft: 40 }}
                id="input-interview-search"
              />
            </div>
          </div>

          <div className="category-chips">
            {categories.map(cat => (
              <button
                key={cat}
                className={`chip-btn ${selectedCategory === cat ? 'active' : ''}`}
                onClick={() => setSelectedCategory(cat)}
                id={`cat-interview-${cat.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Questions Stack */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        {filteredQuestions.length === 0 ? (
          <div className="card" style={{ padding: 40, textAlign: 'center', color: 'var(--text-muted)' }}>
            No interview questions match your current filter. Try selecting 'All'.
          </div>
        ) : (
          filteredQuestions.map(q => {
            const isExpanded = !!expandedAnswers[q.id];
            const isMastered = !!masteredMap[q.id];

            return (
              <div 
                key={q.id} 
                className="card"
                style={{
                  borderColor: isMastered ? 'rgba(16, 185, 129, 0.4)' : undefined,
                  background: isMastered ? 'rgba(16, 185, 129, 0.03)' : undefined
                }}
                id={`interview-q-${q.id}`}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 16, marginBottom: 12 }}>
                  <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', alignItems: 'center' }}>
                    <span className="badge badge-indigo">{q.category}</span>
                    <span className={`badge badge-${q.difficulty === 'Hard' ? 'rose' : 'amber'}`}>
                      {q.difficulty}
                    </span>
                    <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>{q.roleName}</span>
                  </div>

                  <button
                    onClick={() => toggleMastered(q.id)}
                    style={{
                      background: isMastered ? 'rgba(16, 185, 129, 0.2)' : 'rgba(255, 255, 255, 0.05)',
                      color: isMastered ? '#34D399' : 'var(--text-muted)',
                      border: '1px solid var(--border-subtle)',
                      borderRadius: 'var(--radius-full)',
                      padding: '4px 10px',
                      fontSize: 12,
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: 6
                    }}
                    title="Mark as understood and practiced"
                    id={`btn-mastered-${q.id}`}
                  >
                    <CheckCircle2 size={14} />
                    {isMastered ? 'Mastered' : 'Mark Mastered'}
                  </button>
                </div>

                <h3 style={{ fontSize: 17, lineHeight: 1.4, margin: '8px 0 14px' }}>
                  {q.question}
                </h3>

                {/* Frequently asked at */}
                {q.frequentlyAskedAt && q.frequentlyAskedAt.length > 0 && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 14 }}>
                    <Building2 size={13} color="var(--text-muted)" />
                    <span style={{ fontSize: 11.5, color: 'var(--text-muted)' }}>Frequently tested at:</span>
                    <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                      {q.frequentlyAskedAt.map((co, cIdx) => (
                        <span key={cIdx} className="skill-tag" style={{ fontSize: 11 }}>{co}</span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Toggle Answer Button */}
                <button
                  className="btn-secondary"
                  onClick={() => toggleAnswer(q.id)}
                  style={{ width: '100%', justifyContent: 'center', padding: '9px 16px', fontSize: 13 }}
                  id={`btn-reveal-answer-${q.id}`}
                >
                  {isExpanded ? (
                    <>
                      Hide Model Answer <ChevronUp size={16} />
                    </>
                  ) : (
                    <>
                      Reveal Model Answer & Key Takeaway <ChevronDown size={16} />
                    </>
                  )}
                </button>

                {/* Expanded Model Answer */}
                {isExpanded && (
                  <div className="flashcard-answer-box">
                    <div style={{ fontWeight: 700, fontSize: 13, textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--primary-light)', marginBottom: 8, display: 'flex', alignItems: 'center', gap: 6 }}>
                      <Sparkles size={14} /> Model Answer:
                    </div>
                    <p style={{ margin: 0, fontSize: 13.5, lineHeight: 1.6 }}>
                      {q.answer}
                    </p>

                    {q.keyTakeaway && (
                      <div style={{ marginTop: 12, paddingTop: 10, borderTop: '1px solid rgba(255, 255, 255, 0.1)', display: 'flex', alignItems: 'flex-start', gap: 8 }}>
                        <Key size={14} color="#FBBF24" style={{ marginTop: 3, flexShrink: 0 }} />
                        <div style={{ fontSize: 12.5, color: '#FDE68A' }}>
                          <strong>Interviewer Key Look-for:</strong> {q.keyTakeaway}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
