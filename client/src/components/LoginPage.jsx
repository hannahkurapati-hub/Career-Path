import React, { useState } from 'react';
import { 
  Lock, 
  Mail, 
  User, 
  GraduationCap, 
  Compass, 
  ArrowRight, 
  Eye, 
  EyeOff, 
  CheckCircle2, 
  Sparkles, 
  ArrowLeft,
  ShieldCheck,
  Zap,
  LogIn,
  UserPlus
} from 'lucide-react';
import { Logo } from './Logo.jsx';

export function LoginPage({ 
  onNavigate, 
  onLoginSuccess, 
  onCreateProfile, 
  profiles = [], 
  careers = [], 
  showToast 
}) {
  const [isSignUp, setIsSignUp] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // Sign In Form State
  const [signInEmail, setSignInEmail] = useState('');
  const [signInPassword, setSignInPassword] = useState('');

  // Sign Up Form State
  const [signUpName, setSignUpName] = useState('');
  const [signUpEmail, setSignUpEmail] = useState('');
  const [signUpPassword, setSignUpPassword] = useState('');
  const [signUpDegree, setSignUpDegree] = useState('B.Tech in Computer Science & Engineering');
  const [signUpUniversity, setSignUpUniversity] = useState('');
  const [signUpYear, setSignUpYear] = useState('3rd Year (Junior)');
  const [signUpGpa, setSignUpGpa] = useState('3.7');
  const [signUpCareerId, setSignUpCareerId] = useState(careers[0]?.id || 'fullstack');

  // Handle standard login
  const handleSignInSubmit = (e) => {
    e.preventDefault();
    if (!signInEmail) {
      showToast?.('Please enter your email or student persona name.', 'warning');
      return;
    }

    // Check if entered email matches any existing profile name/email
    const matched = profiles.find(
      p => p.name?.toLowerCase().includes(signInEmail.toLowerCase()) ||
           signInEmail.toLowerCase().includes(p.name?.split(' ')[0]?.toLowerCase())
    );

    if (matched) {
      onLoginSuccess(matched.id);
      showToast?.(`Welcome back, ${matched.name}!`, 'success');
    } else if (profiles.length > 0) {
      // Default to first profile or active
      onLoginSuccess(profiles[0].id);
      showToast?.(`Logged in as ${profiles[0].name}!`, 'success');
    }
    onNavigate('dashboard');
  };

  // Handle sign up
  const handleSignUpSubmit = async (e) => {
    e.preventDefault();
    if (!signUpName || !signUpDegree) {
      showToast?.('Please enter your name and degree.', 'warning');
      return;
    }

    const newStudentProfile = {
      name: signUpName,
      degree: signUpDegree,
      university: signUpUniversity || 'State University',
      currentYear: signUpYear,
      gpa: signUpGpa || '3.5',
      targetCareerId: signUpCareerId,
      bio: `Enthusiastic ${signUpDegree} student working on software development and portfolio projects.`,
      skills: [
        { name: 'JavaScript', level: 'Intermediate', category: 'Frontend' },
        { name: 'Git', level: 'Intermediate', category: 'DevOps' },
        { name: 'Problem Solving', level: 'Intermediate', category: 'Core' }
      ],
      projects: [],
      certifications: [],
      completedMilestones: []
    };

    if (onCreateProfile) {
      await onCreateProfile(newStudentProfile);
      showToast?.(`Welcome to CareerPath, ${signUpName}! Account created.`, 'success');
      onNavigate('dashboard');
    }
  };

  // Quick Persona 1-Click Login
  const handleQuickPersonaLogin = (profileId) => {
    onLoginSuccess(profileId);
    const chosen = profiles.find(p => p.id === profileId);
    showToast?.(`Instant 1-Click Login as ${chosen?.name}!`, 'success');
    onNavigate('dashboard');
  };

  return (
    <div className="login-page-wrapper">
      {/* Back to Home Button */}
      <div className="login-top-bar">
        <button 
          className="btn-secondary" 
          onClick={() => onNavigate('home')}
          style={{ fontSize: 13, gap: 8, padding: '6px 14px' }}
        >
          <ArrowLeft size={16} />
          <span>Back to Home</span>
        </button>
      </div>

      <div className="login-card-container">
        {/* Brand Header */}
        <div className="login-brand-header">
          <Logo size={48} />
          <h2 style={{ fontSize: 24, fontWeight: 800, margin: '10px 0 4px' }}>CareerPath</h2>
          <p style={{ color: 'var(--text-muted)', fontSize: 13 }}>
            {isSignUp ? 'Create your student guidance account' : 'Welcome back! Sign in to your roadmap cockpit'}
          </p>
        </div>

        {/* 1-Click Quick Persona Demo Logins */}
        <div className="quick-login-card">
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 10 }}>
            <Zap size={15} color="var(--primary-light)" />
            <span style={{ fontSize: 12, fontWeight: 700, color: 'var(--primary-light)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
              Quick Demo Personas (1-Click Login)
            </span>
          </div>

          <div className="quick-personas-row">
            {profiles.map(p => (
              <button
                key={p.id}
                type="button"
                className="quick-persona-btn"
                onClick={() => handleQuickPersonaLogin(p.id)}
                title={`Log in as ${p.name}`}
              >
                <img src={p.avatar} alt={p.name} style={{ width: 26, height: 26, borderRadius: '50%' }} />
                <div style={{ textAlign: 'left', lineHeight: 1.2 }}>
                  <div style={{ fontWeight: 700, fontSize: 12 }}>{p.name.split(' ')[0]}</div>
                  <div style={{ fontSize: 10, color: 'var(--text-muted)' }}>{p.degree?.split(' ')[0]}</div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Form Mode Switcher Tab */}
        <div className="auth-tab-switch">
          <button 
            type="button"
            className={`auth-tab-btn ${!isSignUp ? 'active' : ''}`}
            onClick={() => setIsSignUp(false)}
          >
            <LogIn size={15} />
            <span>Sign In</span>
          </button>
          <button 
            type="button"
            className={`auth-tab-btn ${isSignUp ? 'active' : ''}`}
            onClick={() => setIsSignUp(true)}
          >
            <UserPlus size={15} />
            <span>Create Account</span>
          </button>
        </div>

        {/* Sign In Form */}
        {!isSignUp ? (
          <form onSubmit={handleSignInSubmit} className="auth-form">
            <div className="form-group">
              <label className="form-label">Email or Student Username</label>
              <div className="input-with-icon">
                <Mail size={17} color="var(--text-muted)" />
                <input 
                  type="text" 
                  placeholder="alex.morgan@university.edu or Alex"
                  value={signInEmail}
                  onChange={(e) => setSignInEmail(e.target.value)}
                  autoFocus
                />
              </div>
            </div>

            <div className="form-group">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <label className="form-label">Password</label>
                <button 
                  type="button" 
                  onClick={() => showToast?.('Demo login mode active. Any password works or click 1-Click Demo above!', 'info')}
                  style={{ background: 'none', color: 'var(--primary-light)', fontSize: 11, fontWeight: 600, padding: 0 }}
                >
                  Forgot Password?
                </button>
              </div>
              <div className="input-with-icon">
                <Lock size={17} color="var(--text-muted)" />
                <input 
                  type={showPassword ? "text" : "password"} 
                  placeholder="••••••••••••"
                  value={signInPassword}
                  onChange={(e) => setSignInPassword(e.target.value)}
                />
                <button 
                  type="button" 
                  onClick={() => setShowPassword(!showPassword)}
                  style={{ background: 'none', color: 'var(--text-muted)', padding: '0 8px' }}
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <button type="submit" className="btn-primary auth-submit-btn">
              <span>Sign In to Dashboard</span>
              <ArrowRight size={16} />
            </button>
          </form>
        ) : (
          /* Sign Up Form */
          <form onSubmit={handleSignUpSubmit} className="auth-form">
            <div className="form-group">
              <label className="form-label">Full Name</label>
              <div className="input-with-icon">
                <User size={17} color="var(--text-muted)" />
                <input 
                  type="text" 
                  placeholder="e.g. Jordan Lee"
                  value={signUpName}
                  onChange={(e) => setSignUpName(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Degree & Major</label>
              <div className="input-with-icon">
                <GraduationCap size={17} color="var(--text-muted)" />
                <input 
                  type="text" 
                  placeholder="e.g. B.Tech in Computer Science"
                  value={signUpDegree}
                  onChange={(e) => setSignUpDegree(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="form-row-2">
              <div className="form-group">
                <label className="form-label">Academic Year</label>
                <select 
                  value={signUpYear} 
                  onChange={(e) => setSignUpYear(e.target.value)}
                  style={{ width: '100%' }}
                >
                  <option value="1st Year (Freshman)">1st Year (Freshman)</option>
                  <option value="2nd Year (Sophomore)">2nd Year (Sophomore)</option>
                  <option value="3rd Year (Junior)">3rd Year (Junior)</option>
                  <option value="4th Year (Senior)">4th Year (Senior)</option>
                  <option value="Graduate Student (M.S.)">Graduate Student (M.S.)</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Target Career Track</label>
                <select 
                  value={signUpCareerId} 
                  onChange={(e) => setSignUpCareerId(e.target.value)}
                  style={{ width: '100%' }}
                >
                  {careers.map(c => (
                    <option key={c.id} value={c.id}>{c.title}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Email Address</label>
              <div className="input-with-icon">
                <Mail size={17} color="var(--text-muted)" />
                <input 
                  type="email" 
                  placeholder="jordan@university.edu"
                  value={signUpEmail}
                  onChange={(e) => setSignUpEmail(e.target.value)}
                />
              </div>
            </div>

            <button type="submit" className="btn-primary auth-submit-btn">
              <span>Create Account & Start Roadmap</span>
              <Sparkles size={16} />
            </button>
          </form>
        )}

        <div className="login-card-footer">
          <ShieldCheck size={14} color="var(--accent-emerald)" />
          <span>MongoDB Atlas cloud synchronization enabled</span>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
