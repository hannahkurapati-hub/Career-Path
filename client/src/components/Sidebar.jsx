import React from 'react';
import { 
  LayoutDashboard, 
  Milestone, 
  Target, 
  Compass, 
  GraduationCap, 
  BrainCircuit, 
  FileCheck2, 
  X,
  TrendingUp,
  Award
} from 'lucide-react';

export function Sidebar({ 
  activeTab, 
  onSelectTab, 
  gapData, 
  activeProfile, 
  activeCareer,
  mobileOpen, 
  onCloseMobile 
}) {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard Overview', icon: LayoutDashboard },
    { id: 'roadmap', label: 'Interactive Roadmap', icon: Milestone, badge: 'Live' },
    { id: 'skillgap', label: 'Skill Gap Engine', icon: Target },
    { id: 'careers', label: 'Career Explorer', icon: Compass },
    { id: 'profile', label: 'Profile & Portfolio', icon: GraduationCap },
    { id: 'interviews', label: 'Interview Prep Hub', icon: BrainCircuit },
    { id: 'resume', label: 'ATS Readiness Audit', icon: FileCheck2 }
  ];

  return (
    <>
      {mobileOpen && (
        <div 
          className="modal-backdrop" 
          onClick={onCloseMobile} 
          style={{ zIndex: 45 }}
        />
      )}

      <aside className={`sidebar ${mobileOpen ? 'open' : ''}`} id="app-sidebar">
        <div className="sidebar-header" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{
              width: 32, 
              height: 32, 
              borderRadius: 8, 
              background: 'linear-gradient(135deg, var(--primary) 0%, var(--secondary) 100%)', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center', 
              color: 'white'
            }}>
              <Compass size={18} />
            </div>
            <div>
              <div style={{ fontWeight: 800, fontSize: 16, letterSpacing: '-0.02em' }}>CareerPath</div>
              <div style={{ fontSize: 10, color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>STUDENT PORTAL</div>
            </div>
          </div>
          <button 
            className="modal-close-btn hide-on-desktop" 
            onClick={onCloseMobile} 
            style={{ display: mobileOpen ? 'block' : 'none' }}
            id="btn-close-sidebar"
          >
            <X size={20} />
          </button>
        </div>

        <div className="nav-section-title">Navigation Menu</div>
        <nav style={{ flex: 1 }}>
          {navItems.map(item => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                className={`nav-item ${isActive ? 'active' : ''}`}
                onClick={() => {
                  onSelectTab(item.id);
                  if (mobileOpen) onCloseMobile();
                }}
                id={`nav-link-${item.id}`}
              >
                <Icon size={18} color={isActive ? 'var(--primary-light)' : 'var(--text-muted)'} />
                <span>{item.label}</span>
                {item.badge && <span className="nav-item-badge">{item.badge}</span>}
              </button>
            );
          })}
        </nav>

        {/* Career Readiness Footer Widget */}
        <div className="sidebar-footer">
          <div className="readiness-widget-card">
            <div className="readiness-widget-header">
              <span className="readiness-widget-title">Fit Alignment</span>
              <TrendingUp size={16} color="var(--primary-light)" />
            </div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 6, marginBottom: 8 }}>
              <span className="readiness-widget-score">
                {gapData ? `${gapData.overallFitScore}%` : '--%'}
              </span>
              <span style={{ fontSize: 11, color: 'var(--text-muted)', fontWeight: 600 }}>
                {activeCareer?.title?.split(' ')[0] || 'Target'} Role
              </span>
            </div>
            
            <div className="progress-bar-track" style={{ height: 6, marginBottom: 8 }}>
              <div 
                className="progress-bar-fill" 
                style={{ width: `${gapData?.overallFitScore || 0}%` }}
              />
            </div>
            
            <div style={{ fontSize: 11, color: 'var(--text-secondary)' }}>
              {gapData?.readinessTier || 'Evaluating your profile...'}
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
