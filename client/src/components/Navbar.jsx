import { 
  Compass, 
  ChevronDown, 
  Sun, 
  Moon, 
  FileText, 
  Menu, 
  UserPlus, 
  Target, 
  Check, 
  RotateCcw,
  Home,
  LogIn
} from 'lucide-react';

import { Logo } from './Logo.jsx';

export function Navbar({
  profiles,
  activeProfile,
  onSelectProfile,
  careers,
  activeCareer,
  onSelectCareer,
  theme,
  onToggleTheme,
  onOpenExport,
  onToggleMobileMenu,
  onResetData,
  onNavigate
}) {
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [careerDropdownOpen, setCareerDropdownOpen] = useState(false);

  const profileRef = useRef(null);
  const careerRef = useRef(null);

  // Close dropdowns on outside click
  useEffect(() => {
    function handleClickOutside(event) {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setProfileDropdownOpen(false);
      }
      if (careerRef.current && !careerRef.current.contains(event.target)) {
        setCareerDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="navbar" id="app-navbar">
      <div className="navbar-left">
        <button 
          className="mobile-menu-toggle" 
          onClick={onToggleMobileMenu} 
          aria-label="Toggle Navigation Menu"
          id="btn-mobile-menu"
        >
          <Menu size={22} />
        </button>

        <div 
          className="brand-badge" 
          onClick={() => onNavigate && onNavigate('home')}
          style={{ cursor: 'pointer' }}
          title="Go to Home"
        >
          <Logo size={32} />
          <span>CareerPath</span>
          <span className="brand-pill">AI ROADMAP</span>
        </div>
      </div>

      <div className="navbar-right">
        {/* Career Target Selector */}
        <div className="profile-switcher-wrapper" ref={careerRef}>
          <button 
            className="profile-pill-btn" 
            onClick={() => setCareerDropdownOpen(!careerDropdownOpen)}
            id="btn-target-career-switcher"
          >
            <div style={{
              width: 28, 
              height: 28, 
              borderRadius: '50%', 
              background: 'rgba(88, 190, 239, 0.2)', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              color: 'var(--primary-light)'
            }}>
              <Target size={16} />
            </div>
            <div className="user-text-meta">
              <div className="user-meta-name" style={{ color: 'var(--primary-light)' }}>
                {activeCareer?.title || 'Select Target Career'}
              </div>
              <div className="user-meta-role">Target Path</div>
            </div>
            <ChevronDown size={14} style={{ color: 'var(--text-muted)' }} />
          </button>

          {careerDropdownOpen && (
            <div className="dropdown-menu" id="dropdown-careers-menu">
              <div style={{ padding: '6px 12px', fontSize: 11, fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-muted)' }}>
                Target Careers
              </div>
              {careers.map(c => (
                <button
                  key={c.id}
                  className={`dropdown-item ${activeCareer?.id === c.id ? 'active' : ''}`}
                  onClick={() => {
                    onSelectCareer(c.id);
                    setCareerDropdownOpen(false);
                  }}
                  id={`career-option-${c.id}`}
                >
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 600, fontSize: 13 }}>{c.title}</div>
                    <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>{c.category}</div>
                  </div>
                  {activeCareer?.id === c.id && <Check size={16} color="var(--primary-light)" />}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Profile Switcher */}
        <div className="profile-switcher-wrapper" ref={profileRef}>
          <button 
            className="profile-pill-btn" 
            onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
            id="btn-profile-switcher"
          >
            <img 
              src={activeProfile?.avatar} 
              alt={activeProfile?.name} 
              className="user-avatar-tiny" 
            />
            <div className="user-text-meta">
              <div className="user-meta-name">{activeProfile?.name}</div>
              <div className="user-meta-role">{activeProfile?.currentYear?.split(' ')[0]} Student</div>
            </div>
            <ChevronDown size={14} style={{ color: 'var(--text-muted)' }} />
          </button>

          {profileDropdownOpen && (
            <div className="dropdown-menu" id="dropdown-profile-menu">
              <div style={{ padding: '6px 12px', fontSize: 11, fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-muted)' }}>
                Switch Student Profile
              </div>
              {profiles.map(p => (
                <button
                  key={p.id}
                  className={`dropdown-item ${activeProfile?.id === p.id ? 'active' : ''}`}
                  onClick={() => {
                    onSelectProfile(p.id);
                    setProfileDropdownOpen(false);
                  }}
                  id={`profile-option-${p.id}`}
                >
                  <img src={p.avatar} alt={p.name} style={{ width: 28, height: 28, borderRadius: '50%' }} />
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 600, fontSize: 13 }}>{p.name}</div>
                    <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>{p.degree.split(' in ')[1] || p.degree}</div>
                  </div>
                  {activeProfile?.id === p.id && <Check size={16} color="var(--primary-light)" />}
                </button>
              ))}
              <div className="dropdown-divider" />
              <button 
                className="dropdown-item" 
                onClick={() => {
                  onNavigate && onNavigate('home');
                  setProfileDropdownOpen(false);
                }}
              >
                <Home size={15} color="var(--primary-light)" />
                <span style={{ fontSize: 12.5 }}>Landing Home Page</span>
              </button>
              <button 
                className="dropdown-item" 
                onClick={() => {
                  onNavigate && onNavigate('login');
                  setProfileDropdownOpen(false);
                }}
              >
                <LogIn size={15} color="var(--secondary-light)" />
                <span style={{ fontSize: 12.5 }}>Sign In / Switch Account</span>
              </button>
              <button 
                className="dropdown-item" 
                onClick={() => {
                  onResetData();
                  setProfileDropdownOpen(false);
                }}
                id="btn-reset-demo-data"
              >
                <RotateCcw size={15} color="var(--accent-amber)" />
                <span style={{ fontSize: 12.5, color: 'var(--accent-amber)' }}>Reset Demo Data</span>
              </button>
            </div>
          )}
        </div>

        {/* Export Report Button */}
        <button 
          className="btn-secondary" 
          onClick={onOpenExport}
          title="Export Career Guidance Strategy Report"
          id="btn-export-report"
        >
          <FileText size={16} />
          <span className="hide-on-mobile">Export Report</span>
        </button>

        {/* Theme Toggle */}
        <button 
          className="icon-btn" 
          onClick={onToggleTheme} 
          title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Mode`}
          id="btn-theme-toggle"
        >
          {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
        </button>
      </div>
    </header>
  );
}
