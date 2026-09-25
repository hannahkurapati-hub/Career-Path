import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';

import { Navbar } from './components/Navbar.jsx';
import { Sidebar } from './components/Sidebar.jsx';
import { Dashboard } from './components/Dashboard.jsx';
import { CareerRoadmap } from './components/CareerRoadmap.jsx';
import { SkillGapAnalyzer } from './components/SkillGapAnalyzer.jsx';
import { CareerExplorer } from './components/CareerExplorer.jsx';
import { ProfileEditor } from './components/ProfileEditor.jsx';
import { InterviewPrep } from './components/InterviewPrep.jsx';
import { ResumeScorer } from './components/ResumeScorer.jsx';
import { ExportModal } from './components/ExportModal.jsx';

export default function App() {
  const [profiles, setProfiles] = useState([]);
  const [activeProfileId, setActiveProfileId] = useState(null);
  const [careers, setCareers] = useState([]);
  const [activeCareerId, setActiveCareerId] = useState(null);
  const [gapData, setGapData] = useState(null);
  const [auditData, setAuditData] = useState(null);
  const [interviewQuestions, setInterviewQuestions] = useState([]);
  
  const [activeTab, setActiveTab] = useState('dashboard');
  const [theme, setTheme] = useState('dark');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [exportModalOpen, setExportModalOpen] = useState(false);
  const [toasts, setToasts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Trigger celebration confetti
  const triggerConfetti = () => {
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 }
    });
  };

  // Toast Notification System
  const showToast = (message, type = 'info') => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 4000);
  };

  // Initial Data Fetch
  useEffect(() => {
    async function loadInitialData() {
      try {
        setLoading(true);
        const [profRes, carRes, intRes] = await Promise.all([
          fetch('/api/profiles').then(r => r.json()),
          fetch('/api/careers').then(r => r.json()),
          fetch('/api/interviews').then(r => r.json())
        ]);

        const loadedProfiles = Array.isArray(profRes) ? profRes : [];
        const loadedCareers = carRes.careers || [];

        setProfiles(loadedProfiles);
        setCareers(loadedCareers);
        setInterviewQuestions(intRes.questions || []);

        if (loadedProfiles.length > 0) {
          const firstProfile = loadedProfiles[0];
          setActiveProfileId(firstProfile.id);
          setActiveCareerId(firstProfile.targetCareerId || loadedCareers[0]?.id);
        }
      } catch (err) {
        console.error('Failed to load initial data:', err);
        showToast('Error connecting to backend server. Make sure server is running on port 5000.', 'warning');
      } finally {
        setLoading(false);
      }
    }

    loadInitialData();
  }, []);

  // Fetch Gap Analysis and ATS Audit whenever active profile or career changes
  useEffect(() => {
    if (!activeProfileId || !activeCareerId) return;

    async function loadAnalysis() {
      try {
        const [gapRes, auditRes] = await Promise.all([
          fetch(`/api/analysis/gap/${activeProfileId}/${activeCareerId}`).then(r => r.json()),
          fetch(`/api/resume/audit/${activeProfileId}`).then(r => r.json())
        ]);

        setGapData(gapRes);
        setAuditData(auditRes);
      } catch (err) {
        console.error('Error fetching gap analysis:', err);
      }
    }

    loadAnalysis();
  }, [activeProfileId, activeCareerId, profiles]);

  // Derived current items
  const activeProfile = profiles.find(p => p.id === activeProfileId) || profiles[0];
  const activeCareer = careers.find(c => c.id === activeCareerId) || careers[0];

  // Theme Toggle
  const handleToggleTheme = () => {
    const nextTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(nextTheme);
    document.body.className = `theme-${nextTheme}`;
  };

  // Switch Active Profile
  const handleSelectProfile = (profileId) => {
    setActiveProfileId(profileId);
    const chosen = profiles.find(p => p.id === profileId);
    if (chosen?.targetCareerId) {
      setActiveCareerId(chosen.targetCareerId);
    }
    showToast(`Switched student profile to ${chosen?.name}`, 'info');
  };

  // Switch Active Career Target
  const handleSelectCareer = async (careerId) => {
    setActiveCareerId(careerId);
    // Also update target in active profile
    if (activeProfileId) {
      try {
        const updated = await fetch(`/api/profiles/${activeProfileId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ targetCareerId: careerId })
        }).then(r => r.json());

        setProfiles(prev => prev.map(p => p.id === activeProfileId ? updated : p));
      } catch (e) {
        console.error('Failed to sync career to profile:', e);
      }
    }
    const c = careers.find(car => car.id === careerId);
    showToast(`Target career set to ${c?.title}!`, 'success');
  };

  // Toggle Milestone Checkbox
  const handleToggleMilestone = async (milestoneId) => {
    if (!activeProfileId) return;
    try {
      const res = await fetch(`/api/profiles/${activeProfileId}/toggle-milestone`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ milestoneId })
      }).then(r => r.json());

      const isCompletedNow = res.completedMilestones.includes(milestoneId);
      if (isCompletedNow) {
        triggerConfetti();
        showToast('Milestone achieved! Progress updated! 🎉', 'success');
      } else {
        showToast('Milestone unmarked.', 'info');
      }

      setProfiles(prev => prev.map(p => p.id === activeProfileId ? res.profile : p));
    } catch (err) {
      console.error('Error toggling milestone:', err);
      showToast('Could not update milestone status.', 'warning');
    }
  };

  // Update Profile Info
  const handleUpdateProfile = async (formData) => {
    if (!activeProfileId) return;
    try {
      const res = await fetch(`/api/profiles/${activeProfileId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      }).then(r => r.json());

      setProfiles(prev => prev.map(p => p.id === activeProfileId ? res : p));
      if (formData.targetCareerId) {
        setActiveCareerId(formData.targetCareerId);
      }
    } catch (err) {
      console.error('Error updating profile:', err);
    }
  };

  // Add Skill
  const handleAddSkill = async (newSkill) => {
    if (!activeProfile) return;
    const updatedSkills = [...(activeProfile.skills || []), newSkill];
    await handleUpdateProfile({ skills: updatedSkills });
  };

  // Delete Skill
  const handleDeleteSkill = async (skillIdOrName) => {
    if (!activeProfile) return;
    const updatedSkills = (activeProfile.skills || []).filter(
      s => s.id !== skillIdOrName && s.name !== skillIdOrName
    );
    await handleUpdateProfile({ skills: updatedSkills });
    showToast('Skill removed.', 'info');
  };

  // Add Project
  const handleAddProject = async (projectData) => {
    if (!activeProfileId) return;
    try {
      const res = await fetch(`/api/profiles/${activeProfileId}/projects`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(projectData)
      }).then(r => r.json());

      setProfiles(prev => prev.map(p => p.id === activeProfileId ? res : p));
    } catch (err) {
      console.error('Error adding project:', err);
    }
  };

  // Delete Project
  const handleDeleteProject = async (projectId) => {
    if (!activeProfileId) return;
    try {
      const res = await fetch(`/api/profiles/${activeProfileId}/projects/${projectId}`, {
        method: 'DELETE'
      }).then(r => r.json());

      setProfiles(prev => prev.map(p => p.id === activeProfileId ? res : p));
      showToast('Project removed.', 'info');
    } catch (err) {
      console.error('Error deleting project:', err);
    }
  };

  // Add Certification
  const handleAddCert = async (certData) => {
    if (!activeProfileId) return;
    try {
      const res = await fetch(`/api/profiles/${activeProfileId}/certifications`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(certData)
      }).then(r => r.json());

      setProfiles(prev => prev.map(p => p.id === activeProfileId ? res : p));
    } catch (err) {
      console.error('Error adding cert:', err);
    }
  };

  // Delete Certification
  const handleDeleteCert = async (certId) => {
    if (!activeProfileId) return;
    try {
      const res = await fetch(`/api/profiles/${activeProfileId}/certifications/${certId}`, {
        method: 'DELETE'
      }).then(r => r.json());

      setProfiles(prev => prev.map(p => p.id === activeProfileId ? res : p));
      showToast('Certification removed.', 'info');
    } catch (err) {
      console.error('Error deleting cert:', err);
    }
  };

  // Create Brand New Profile
  const handleCreateProfile = async (newProfileData) => {
    try {
      const res = await fetch('/api/profiles', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newProfileData)
      }).then(r => r.json());

      setProfiles(prev => [...prev, res]);
      setActiveProfileId(res.id);
      setActiveCareerId(res.targetCareerId || careers[0]?.id);
      triggerConfetti();
    } catch (err) {
      console.error('Error creating profile:', err);
    }
  };

  // Reset to default demo data
  const handleResetData = async () => {
    try {
      const res = await fetch('/api/profiles/reset', { method: 'POST' }).then(r => r.json());
      setProfiles(res.profiles || []);
      if (res.profiles?.[0]) {
        setActiveProfileId(res.profiles[0].id);
        setActiveCareerId(res.profiles[0].targetCareerId);
      }
      showToast('Reset to default student demo profiles!', 'info');
    } catch (err) {
      console.error('Error resetting data:', err);
    }
  };

  if (loading) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--bg-main)', color: 'var(--text-primary)' }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: 24, fontWeight: 800, fontFamily: 'var(--font-display)', marginBottom: 8 }}>
            CareerPath
          </div>
          <div style={{ color: 'var(--text-muted)', fontSize: 14 }}>
            Initializing full-stack guidance engine...
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="app-container">
      {/* Sidebar Navigation */}
      <Sidebar
        activeTab={activeTab}
        onSelectTab={setActiveTab}
        gapData={gapData}
        activeProfile={activeProfile}
        activeCareer={activeCareer}
        mobileOpen={mobileMenuOpen}
        onCloseMobile={() => setMobileMenuOpen(false)}
      />

      <div className="main-wrapper">
        {/* Top Navbar */}
        <Navbar
          profiles={profiles}
          activeProfile={activeProfile}
          onSelectProfile={handleSelectProfile}
          careers={careers}
          activeCareer={activeCareer}
          onSelectCareer={handleSelectCareer}
          theme={theme}
          onToggleTheme={handleToggleTheme}
          onOpenExport={() => setExportModalOpen(true)}
          onToggleMobileMenu={() => setMobileMenuOpen(!mobileMenuOpen)}
          onResetData={handleResetData}
        />

        {/* Dynamic Content View */}
        <main className="content-area">
          {activeTab === 'dashboard' && (
            <Dashboard
              profile={activeProfile}
              career={activeCareer}
              gapData={gapData}
              onNavigate={setActiveTab}
              onToggleMilestone={handleToggleMilestone}
            />
          )}

          {activeTab === 'roadmap' && (
            <CareerRoadmap
              career={activeCareer}
              completedMilestones={activeProfile?.completedMilestones || []}
              onToggleMilestone={handleToggleMilestone}
            />
          )}

          {activeTab === 'skillgap' && (
            <SkillGapAnalyzer
              profile={activeProfile}
              career={activeCareer}
              gapData={gapData}
              careers={careers}
              onSelectCareer={handleSelectCareer}
              onNavigate={setActiveTab}
            />
          )}

          {activeTab === 'careers' && (
            <CareerExplorer
              careers={careers}
              activeCareer={activeCareer}
              onSelectCareer={handleSelectCareer}
              onNavigate={setActiveTab}
            />
          )}

          {activeTab === 'profile' && (
            <ProfileEditor
              profile={activeProfile}
              careers={careers}
              onUpdateProfile={handleUpdateProfile}
              onAddSkill={handleAddSkill}
              onDeleteSkill={handleDeleteSkill}
              onAddProject={handleAddProject}
              onDeleteProject={handleDeleteProject}
              onAddCert={handleAddCert}
              onDeleteCert={handleDeleteCert}
              onCreateProfile={handleCreateProfile}
              showToast={showToast}
            />
          )}

          {activeTab === 'interviews' && (
            <InterviewPrep
              questions={interviewQuestions}
              career={activeCareer}
            />
          )}

          {activeTab === 'resume' && (
            <ResumeScorer
              auditData={auditData}
              profile={activeProfile}
              onNavigate={setActiveTab}
            />
          )}
        </main>
      </div>

      {/* Export Report Modal */}
      <ExportModal
        isOpen={exportModalOpen}
        onClose={() => setExportModalOpen(false)}
        profile={activeProfile}
        career={activeCareer}
        gapData={gapData}
        auditData={auditData}
      />

      {/* Floating Toast Alerts */}
      <div className="toast-container" id="toast-alerts-container">
        {toasts.map(t => (
          <div key={t.id} className={`toast ${t.type}`}>
            <span>{t.message}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
