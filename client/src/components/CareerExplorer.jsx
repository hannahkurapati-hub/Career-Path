import React, { useState } from 'react';
import { 
  Search, 
  Briefcase, 
  TrendingUp, 
  Check, 
  ArrowRight, 
  Layers, 
  Brain, 
  BarChart3, 
  Cloud, 
  ShieldAlert, 
  Palette, 
  Smartphone 
} from 'lucide-react';

const categoryIcons = {
  'Software Engineering': Layers,
  'Artificial Intelligence': Brain,
  'Data & Analytics': BarChart3,
  'Cloud & Infrastructure': Cloud,
  'Information Security': ShieldAlert,
  'Design & Product': Palette,
  'Mobile Engineering': Smartphone,
  'Product & Strategy': Briefcase
};

export function CareerExplorer({ 
  careers, 
  activeCareer, 
  onSelectCareer, 
  onNavigate 
}) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = [
    'All',
    'Software Engineering',
    'Artificial Intelligence',
    'Data & Analytics',
    'Cloud & Infrastructure',
    'Information Security',
    'Design & Product',
    'Mobile Engineering',
    'Product & Strategy'
  ];

  const filteredCareers = careers.filter(c => {
    const matchesCategory = selectedCategory === 'All' || c.category === selectedCategory;
    const q = searchQuery.toLowerCase();
    const matchesSearch = !searchQuery || 
      c.title.toLowerCase().includes(q) || 
      c.category.toLowerCase().includes(q) ||
      c.shortDescription.toLowerCase().includes(q) ||
      c.coreSkills.some(s => s.name.toLowerCase().includes(q));
    return matchesCategory && matchesSearch;
  });

  return (
    <div id="view-career-explorer">
      {/* Explorer Header */}
      <div className="card" style={{ marginBottom: 28 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
          <span className="badge badge-indigo">Career Catalog</span>
          <span className="badge badge-emerald">{careers.length} Tech Career Roles</span>
        </div>
        <h2 style={{ fontSize: 24, marginBottom: 8 }}>Explore High-Growth Tech Careers</h2>
        <p style={{ color: 'var(--text-secondary)', maxWidth: 700, fontSize: 14 }}>
          Discover structured career pathways, industry compensation metrics, required technical competencies, and set your target career with one click.
        </p>

        {/* Search & Category Filter Toolbar */}
        <div style={{ marginTop: 24, display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div style={{ position: 'relative', maxWidth: 450 }}>
            <Search 
              size={18} 
              color="var(--text-muted)" 
              style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)' }} 
            />
            <input
              type="text"
              placeholder="Search careers, technologies, or keywords..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{ width: '100%', paddingLeft: 42 }}
              id="input-career-search"
            />
          </div>

          <div className="category-chips">
            {categories.map(cat => (
              <button
                key={cat}
                className={`chip-btn ${selectedCategory === cat ? 'active' : ''}`}
                onClick={() => setSelectedCategory(cat)}
                id={`cat-chip-${cat.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Career Cards Grid */}
      <div className="careers-grid">
        {filteredCareers.map(c => {
          const isActive = activeCareer?.id === c.id;
          const Icon = categoryIcons[c.category] || Briefcase;

          return (
            <div 
              key={c.id} 
              className="career-card"
              style={{
                borderColor: isActive ? 'var(--primary)' : undefined,
                background: isActive ? 'linear-gradient(180deg, rgba(99, 102, 241, 0.12) 0%, rgba(17, 24, 39, 0.7) 100%)' : undefined
              }}
              id={`career-card-${c.id}`}
            >
              <div className="career-card-top">
                <div style={{
                  width: 44,
                  height: 44,
                  borderRadius: 12,
                  background: 'rgba(99, 102, 241, 0.15)',
                  color: 'var(--primary-light)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <Icon size={22} />
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 4 }}>
                  <span className="badge badge-emerald">{c.marketDemand}</span>
                  {isActive && (
                    <span className="badge badge-indigo" style={{ fontSize: 11 }}>Active Target</span>
                  )}
                </div>
              </div>

              <div className="career-role-title">{c.title}</div>
              <div className="career-role-cat">{c.category} • Difficulty: {c.difficulty}</div>

              <p style={{ color: 'var(--text-secondary)', fontSize: 13, margin: '12px 0', flex: 1, lineHeight: 1.5 }}>
                {c.shortDescription}
              </p>

              {/* Salary Preview */}
              <div className="career-salary-box">
                <div>
                  <div className="salary-label">Starting</div>
                  <div className="salary-value">{c.salaryRanges.entry.split(' / ')[0]}</div>
                </div>
                <div>
                  <div className="salary-label">Senior</div>
                  <div className="salary-value">{c.salaryRanges.senior.split(' / ')[0]}</div>
                </div>
              </div>

              {/* Core Skills Preview */}
              <div style={{ marginBottom: 16 }}>
                <div style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: 6 }}>
                  Core Requirements:
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                  {c.coreSkills.slice(0, 4).map((s, idx) => (
                    <span key={idx} className="skill-tag">{s.name}</span>
                  ))}
                  {c.coreSkills.length > 4 && (
                    <span className="skill-tag" style={{ color: 'var(--primary-light)' }}>
                      +{c.coreSkills.length - 4} more
                    </span>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <div style={{ display: 'flex', gap: 10, marginTop: 'auto' }}>
                <button
                  className={isActive ? 'btn-secondary' : 'btn-primary'}
                  style={{ flex: 1, justifyContent: 'center' }}
                  onClick={() => onSelectCareer(c.id)}
                  id={`btn-select-target-${c.id}`}
                >
                  {isActive ? (
                    <>
                      <Check size={16} /> Current Target
                    </>
                  ) : (
                    'Set as Target'
                  )}
                </button>

                <button
                  className="btn-secondary"
                  onClick={() => {
                    onSelectCareer(c.id);
                    onNavigate('roadmap');
                  }}
                  title="View Full Roadmap"
                  id={`btn-view-roadmap-${c.id}`}
                >
                  <ArrowRight size={16} />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
