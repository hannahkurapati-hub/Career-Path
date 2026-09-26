import React from 'react';
import { 
  Compass, 
  Target, 
  Milestone, 
  BrainCircuit, 
  FileCheck2, 
  ArrowRight, 
  CheckCircle2, 
  Sparkles, 
  TrendingUp, 
  Award, 
  BookOpen, 
  ShieldCheck, 
  Users, 
  Star,
  Layers,
  ChevronRight,
  Sun,
  Moon,
  LogIn
} from 'lucide-react';
import { Logo } from './Logo.jsx';

export function HomePage({ 
  onNavigate, 
  onSelectCareer, 
  careers = [], 
  profiles = [], 
  onSelectProfile, 
  theme, 
  onToggleTheme 
}) {
  const defaultTrack = careers[0] || { id: 'fullstack', title: 'Full Stack Web Developer' };

  return (
    <div className="homepage-wrapper">
      {/* 1. Header Navigation Bar */}
      <header className="home-nav">
        <div className="home-nav-container">
          <div className="home-brand" onClick={() => onNavigate('home')} style={{ cursor: 'pointer' }}>
            <Logo size={36} />
            <div className="home-brand-text">
              <span className="brand-name">CareerPath</span>
              <span className="brand-tag">AI PLATFORM</span>
            </div>
          </div>

          <nav className="home-nav-links hide-on-mobile">
            <a href="#features">Features</a>
            <a href="#tracks">Career Tracks</a>
            <a href="#how-it-works">How It Works</a>
            <a href="#testimonials">Success Stories</a>
          </nav>

          <div className="home-nav-actions">
            <button 
              className="icon-btn" 
              onClick={onToggleTheme} 
              aria-label="Toggle Theme"
              style={{ width: 38, height: 38 }}
            >
              {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
            </button>

            <button 
              className="btn-secondary" 
              onClick={() => onNavigate('login')}
              style={{ padding: '8px 16px', fontSize: 13 }}
            >
              <LogIn size={15} />
              <span>Sign In</span>
            </button>

            <button 
              className="btn-primary" 
              onClick={() => onNavigate('dashboard')}
              style={{ padding: '8px 18px', fontSize: 13 }}
            >
              <span>Launch App</span>
              <ArrowRight size={15} />
            </button>
          </div>
        </div>
      </header>

      {/* 2. Hero Section */}
      <section className="home-hero-section">
        <div className="home-hero-badge">
          <Sparkles size={14} color="var(--primary-light)" />
          <span>Next-Gen Student Career Navigation Engine</span>
        </div>

        <h1 className="home-hero-headline">
          Reach For Your Dream Career With <br />
          <span className="gradient-text">AI-Guided Roadmaps</span>
        </h1>

        <p className="home-hero-subhead">
          Personalized multi-phase milestones, algorithmic skill gap matching, ATS resume audits, 
          and curated interview prep tailored to your degree, technical skills, and industry ambition.
        </p>

        <div className="home-hero-cta-group">
          <button 
            className="btn-primary hero-btn-lg" 
            onClick={() => onNavigate('login')}
          >
            <span>Get Started Free</span>
            <ArrowRight size={18} />
          </button>
          
          <button 
            className="btn-secondary hero-btn-lg" 
            onClick={() => onNavigate('dashboard')}
          >
            <span>Explore Live Demo</span>
          </button>
        </div>

        {/* Interactive Cockpit Preview Card */}
        <div className="hero-preview-container">
          <div className="hero-preview-card">
            <div className="hero-preview-header">
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <div className="preview-avatar">
                  <img 
                    src={profiles[0]?.avatar || "https://api.dicebear.com/7.x/bottts/svg?seed=Alex"} 
                    alt="Student" 
                    style={{ width: '100%', height: '100%', borderRadius: '50%' }}
                  />
                </div>
                <div>
                  <div style={{ fontWeight: 800, fontSize: 15 }}>{profiles[0]?.name || 'Alex Morgan'}</div>
                  <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>
                    {profiles[0]?.degree || 'B.Tech in Computer Science'} • 3rd Year
                  </div>
                </div>
              </div>

              <div className="badge badge-indigo">
                Target: {defaultTrack.title}
              </div>
            </div>

            <div className="hero-preview-grid">
              <div className="preview-stat-card">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
                  <span style={{ fontSize: 12, color: 'var(--text-muted)', fontWeight: 600 }}>CAREER FIT COMPATIBILITY</span>
                  <TrendingUp size={16} color="var(--primary-light)" />
                </div>
                <div style={{ fontSize: 28, fontWeight: 800, color: 'var(--primary-light)', fontFamily: 'var(--font-display)' }}>
                  82%
                </div>
                <div className="progress-bar-track" style={{ height: 6, marginTop: 8 }}>
                  <div className="progress-bar-fill" style={{ width: '82%' }}></div>
                </div>
                <div style={{ fontSize: 11, color: 'var(--text-secondary)', marginTop: 6 }}>
                  High Readiness • 3 Critical Skills to Master
                </div>
              </div>

              <div className="preview-stat-card">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
                  <span style={{ fontSize: 12, color: 'var(--text-muted)', fontWeight: 600 }}>ROADMAP MILESTONES</span>
                  <CheckCircle2 size={16} color="#34D399" />
                </div>
                <div style={{ fontSize: 28, fontWeight: 800, color: '#34D399', fontFamily: 'var(--font-display)' }}>
                  14 / 24
                </div>
                <div className="progress-bar-track" style={{ height: 6, marginTop: 8 }}>
                  <div className="progress-bar-fill emerald" style={{ width: '58%' }}></div>
                </div>
                <div style={{ fontSize: 11, color: 'var(--text-secondary)', marginTop: 6 }}>
                  Phase 3: Advanced Full Stack Architecture
                </div>
              </div>

              <div className="preview-stat-card">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
                  <span style={{ fontSize: 12, color: 'var(--text-muted)', fontWeight: 600 }}>ATS RESUME SCORE</span>
                  <FileCheck2 size={16} color="var(--secondary-light)" />
                </div>
                <div style={{ fontSize: 28, fontWeight: 800, color: 'var(--secondary-light)', fontFamily: 'var(--font-display)' }}>
                  88 / 100
                </div>
                <div className="progress-bar-track" style={{ height: 6, marginTop: 8 }}>
                  <div className="progress-bar-fill" style={{ width: '88%', background: 'linear-gradient(90deg, var(--secondary) 0%, var(--primary) 100%)' }}></div>
                </div>
                <div style={{ fontSize: 11, color: 'var(--text-secondary)', marginTop: 6 }}>
                  Top 10% Candidate Distribution
                </div>
              </div>
            </div>

            <div className="hero-preview-footer">
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span className="badge badge-emerald">Verified MongoDB Sync</span>
                <span className="badge badge-lilac">5-Phase Curricula</span>
              </div>
              <button 
                className="btn-primary" 
                onClick={() => onNavigate('roadmap')}
                style={{ padding: '6px 14px', fontSize: 12 }}
              >
                <span>Launch Interactive Roadmap</span>
                <ChevronRight size={14} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Core Pillars / Features Section */}
      <section className="home-features-section" id="features">
        <div className="section-header-centered">
          <span className="badge badge-indigo" style={{ marginBottom: 12 }}>PLATFORM PILLARS</span>
          <h2 className="section-title-lg">Everything You Need To Break Into Tech</h2>
          <p className="section-subtitle">
            From your very first line of code to technical system design and recruiter-ready portfolios.
          </p>
        </div>

        <div className="features-cards-grid">
          <div className="feature-card">
            <div className="feature-icon-box">
              <Milestone size={24} />
            </div>
            <h3>Structured 5-Phase Roadmaps</h3>
            <p>
              Step-by-step curricula covering foundations, scalable architectures, hands-on capstone builds, 
              and production deployments with persistent milestone checkboxes.
            </p>
            <ul className="feature-checklist">
              <li><CheckCircle2 size={14} color="var(--primary-light)" /> Interactive checklist progress tracking</li>
              <li><CheckCircle2 size={14} color="var(--primary-light)" /> Curated documentation & interactive labs</li>
              <li><CheckCircle2 size={14} color="var(--primary-light)" /> Real-world capstone project challenges</li>
            </ul>
          </div>

          <div className="feature-card">
            <div className="feature-icon-box" style={{ background: 'linear-gradient(135deg, var(--secondary) 0%, #38BDF8 100%)' }}>
              <Target size={24} />
            </div>
            <h3>Algorithmic Skill Gap Engine</h3>
            <p>
              Instantly benchmarks your current beginner, intermediate, and advanced proficiencies against live 
              market standards for your target role.
            </p>
            <ul className="feature-checklist">
              <li><CheckCircle2 size={14} color="var(--primary-light)" /> Critical vs Recommended gap tagging</li>
              <li><CheckCircle2 size={14} color="var(--primary-light)" /> Prioritized 2-4 week closure timelines</li>
              <li><CheckCircle2 size={14} color="var(--primary-light)" /> 1-Click career track benchmark switcher</li>
            </ul>
          </div>

          <div className="feature-card">
            <div className="feature-icon-box" style={{ background: 'linear-gradient(135deg, #10B981 0%, var(--primary) 100%)' }}>
              <FileCheck2 size={24} />
            </div>
            <h3>100-Point ATS Resume Scorer</h3>
            <p>
              Automated rubric evaluating your academic background, technical depth, project metrics, 
              and verified certifications to bypass screening bots.
            </p>
            <ul className="feature-checklist">
              <li><CheckCircle2 size={14} color="var(--primary-light)" /> 4-category rubric breakdown</li>
              <li><CheckCircle2 size={14} color="var(--primary-light)" /> Tailored portfolio strength highlights</li>
              <li><CheckCircle2 size={14} color="var(--primary-light)" /> Actionable recruiter optimization tips</li>
            </ul>
          </div>

          <div className="feature-card">
            <div className="feature-icon-box" style={{ background: 'linear-gradient(135deg, #F59E0B 0%, var(--secondary) 100%)' }}>
              <BrainCircuit size={24} />
            </div>
            <h3>FAANG Interview Prep Hub</h3>
            <p>
              Interactive question flashcards covering Frontend, Backend, ML, Cloud, Security, and 
              Behavioral (STAR method) with detailed model answers.
            </p>
            <ul className="feature-checklist">
              <li><CheckCircle2 size={14} color="var(--primary-light)" /> Interviewer key look-fors</li>
              <li><CheckCircle2 size={14} color="var(--primary-light)" /> Google, Meta, OpenAI company badges</li>
              <li><CheckCircle2 size={14} color="var(--primary-light)" /> Model technical answer reveals</li>
            </ul>
          </div>
        </div>
      </section>

      {/* 4. High-Growth Career Tracks Showcase */}
      <section className="home-tracks-section" id="tracks">
        <div className="section-header-centered">
          <span className="badge badge-lilac" style={{ marginBottom: 12 }}>IN-DEMAND SPECIALIZATIONS</span>
          <h2 className="section-title-lg">Explore 8+ Tech Career Trajectories</h2>
          <p className="section-subtitle">
            Curated salary bands, core technology stacks, and structured milestone pathways.
          </p>
        </div>

        <div className="tracks-showcase-grid">
          {careers.slice(0, 6).map(career => (
            <div key={career.id} className="track-preview-card">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 14 }}>
                <span className="badge badge-indigo">{career.category}</span>
                <span style={{ fontSize: 12, fontWeight: 700, color: '#34D399', fontFamily: 'var(--font-mono)' }}>
                  {career.salaryRanges?.entry || '$85k - $115k'}
                </span>
              </div>

              <h4 style={{ fontSize: 18, fontWeight: 700, marginBottom: 8 }}>{career.title}</h4>
              <p style={{ fontSize: 13, color: 'var(--text-secondary)', marginBottom: 16, lineHeight: 1.5, flex: 1 }}>
                {career.description}
              </p>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 16 }}>
                {(career.coreSkills || []).slice(0, 4).map(skill => (
                  <span key={skill.name} className="skill-tag" style={{ fontSize: 11 }}>
                    {skill.name}
                  </span>
                ))}
              </div>

              <button 
                className="btn-secondary" 
                onClick={() => {
                  onSelectCareer(career.id);
                  onNavigate('roadmap');
                }}
                style={{ width: '100%', justifyContent: 'center', fontSize: 13 }}
              >
                <span>View Career Roadmap</span>
                <ArrowRight size={14} />
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* 5. How It Works Section */}
      <section className="home-steps-section" id="how-it-works">
        <div className="section-header-centered">
          <span className="badge badge-indigo" style={{ marginBottom: 12 }}>STEP-BY-STEP PROCESS</span>
          <h2 className="section-title-lg">How CareerPath Accelerates Your Journey</h2>
          <p className="section-subtitle">
            Three simple steps from student profile to high-paying engineering offers.
          </p>
        </div>

        <div className="steps-container">
          <div className="step-card">
            <div className="step-num-badge">01</div>
            <h4>Input Profile & Select Target Role</h4>
            <p>
              Add your degree, GPA, technical competencies, and target career aspiration (Full Stack, AI/ML, DevOps, Cloud).
            </p>
          </div>

          <div className="step-card">
            <div className="step-num-badge">02</div>
            <h4>Follow Roadmap & Close Skill Gaps</h4>
            <p>
              Check off milestones, complete hands-on capstones, and follow tailored recommendations to boost your match fit score.
            </p>
          </div>

          <div className="step-card">
            <div className="step-num-badge">03</div>
            <h4>Audit Resume & Master Interviews</h4>
            <p>
              Generate your printable Career Strategy Report, maximize your ATS score, and practice real technical interview prompts.
            </p>
          </div>
        </div>
      </section>

      {/* 6. Persona Quick-Demo Banner */}
      <section className="home-personas-section" id="testimonials">
        <div className="personas-banner-card">
          <div style={{ maxWidth: 540 }}>
            <span className="badge badge-emerald" style={{ marginBottom: 12 }}>INSTANT DEMO PERSONAS</span>
            <h3 style={{ fontSize: 24, fontWeight: 800, marginBottom: 10 }}>
              Try CareerPath With Real Student Personas
            </h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: 14, lineHeight: 1.6, marginBottom: 20 }}>
              Experience how CareerPath dynamically adapts for Computer Science, Data Science, and IT students.
            </p>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
              {profiles.map(p => (
                <button
                  key={p.id}
                  className="persona-chip-btn"
                  onClick={() => {
                    onSelectProfile(p.id);
                    onNavigate('dashboard');
                  }}
                >
                  <img src={p.avatar} alt={p.name} style={{ width: 22, height: 22, borderRadius: '50%' }} />
                  <span>{p.name} ({p.degree?.split(' ')[0]})</span>
                  <ArrowRight size={13} />
                </button>
              ))}
            </div>
          </div>

          <div className="personas-graphic-box">
            <Logo size={90} />
            <div style={{ textAlign: 'center', marginTop: 14 }}>
              <div style={{ fontWeight: 800, fontSize: 18 }}>Ready to Launch?</div>
              <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>MongoDB Persistent Cloud Backed</div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. Call To Action Footer Banner */}
      <section className="home-cta-section">
        <div className="home-cta-card">
          <h2 style={{ fontSize: 32, fontWeight: 800, marginBottom: 12 }}>
            Start Navigating Your Career Today
          </h2>
          <p style={{ fontSize: 16, color: 'var(--text-secondary)', maxWidth: 620, margin: '0 auto 24px' }}>
            Join students worldwide leveraging AI-guided structured roadmaps and gap analysis to land their dream software engineering roles.
          </p>

          <div style={{ display: 'flex', justifyContent: 'center', gap: 14, flexWrap: 'wrap' }}>
            <button 
              className="btn-primary hero-btn-lg" 
              onClick={() => onNavigate('login')}
            >
              <span>Create Free Account</span>
              <ArrowRight size={18} />
            </button>
            <button 
              className="btn-secondary hero-btn-lg" 
              onClick={() => onNavigate('dashboard')}
            >
              <span>Launch Student Cockpit</span>
            </button>
          </div>
        </div>
      </section>

      {/* 8. Footer */}
      <footer className="home-footer">
        <div className="home-footer-container">
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <Logo size={28} />
            <span style={{ fontWeight: 800, fontSize: 16 }}>CareerPath</span>
            <span style={{ color: 'var(--text-muted)', fontSize: 13 }}>• Full-Stack AI Career Guidance Platform</span>
          </div>

          <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>
            © {new Date().getFullYear()} CareerPath. Backed by MongoDB Atlas. Open Source.
          </div>
        </div>
      </footer>
    </div>
  );
}

export default HomePage;
