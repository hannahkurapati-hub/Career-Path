import React, { useState } from 'react';
import { 
  GraduationCap, 
  Code, 
  FolderGit2, 
  Award, 
  Plus, 
  Trash2, 
  Save, 
  ExternalLink, 
  UserPlus, 
  Check, 
  Sparkles 
} from 'lucide-react';

export function ProfileEditor({ 
  profile, 
  careers, 
  onUpdateProfile, 
  onAddSkill, 
  onDeleteSkill, 
  onAddProject, 
  onDeleteProject, 
  onAddCert, 
  onDeleteCert, 
  onCreateProfile, 
  showToast 
}) {
  const [activeTab, setActiveTab] = useState('academic'); // 'academic', 'skills', 'projects', 'certs', 'new_profile'

  // Profile fields state
  const [formData, setFormData] = useState({
    name: profile?.name || '',
    email: profile?.email || '',
    degree: profile?.degree || '',
    university: profile?.university || '',
    currentYear: profile?.currentYear || '',
    gpa: profile?.gpa || '',
    targetCareerId: profile?.targetCareerId || '',
    bio: profile?.bio || ''
  });

  // Sync if profile changes
  React.useEffect(() => {
    if (profile) {
      setFormData({
        name: profile.name || '',
        email: profile.email || '',
        degree: profile.degree || '',
        university: profile.university || '',
        currentYear: profile.currentYear || '',
        gpa: profile.gpa || '',
        targetCareerId: profile.targetCareerId || '',
        bio: profile.bio || ''
      });
    }
  }, [profile]);

  // New Skill form state
  const [newSkillName, setNewSkillName] = useState('');
  const [newSkillCategory, setNewSkillCategory] = useState('Language');
  const [newSkillLevel, setNewSkillLevel] = useState('Intermediate');

  // New Project form state
  const [newProject, setNewProject] = useState({
    title: '',
    description: '',
    techStack: '',
    githubUrl: '',
    liveUrl: '',
    impact: ''
  });

  // New Cert form state
  const [newCert, setNewCert] = useState({
    name: '',
    issuer: '',
    issueDate: '',
    credentialUrl: ''
  });

  // New Profile form state
  const [createProfileData, setCreateProfileData] = useState({
    name: '',
    email: '',
    degree: 'B.Tech in Computer Science',
    university: '',
    currentYear: '3rd Year',
    gpa: '3.8',
    targetCareerId: 'fullstack-developer',
    bio: ''
  });

  const handleProfileSubmit = (e) => {
    e.preventDefault();
    onUpdateProfile(formData);
    showToast('Student profile details saved successfully!', 'success');
  };

  const handleAddSkillSubmit = (e) => {
    e.preventDefault();
    if (!newSkillName.trim()) return;
    onAddSkill({
      id: `sk-${Date.now()}`,
      name: newSkillName.trim(),
      category: newSkillCategory,
      level: newSkillLevel
    });
    setNewSkillName('');
    showToast(`Added ${newSkillName} to your skill inventory!`, 'success');
  };

  const handleAddProjectSubmit = (e) => {
    e.preventDefault();
    if (!newProject.title.trim()) return;
    const techArray = newProject.techStack
      ? newProject.techStack.split(',').map(s => s.trim()).filter(Boolean)
      : [];
    onAddProject({
      title: newProject.title,
      description: newProject.description,
      techStack: techArray,
      githubUrl: newProject.githubUrl,
      liveUrl: newProject.liveUrl,
      impact: newProject.impact
    });
    setNewProject({ title: '', description: '', techStack: '', githubUrl: '', liveUrl: '', impact: '' });
    showToast(`Added project "${newProject.title}" to portfolio!`, 'success');
  };

  const handleAddCertSubmit = (e) => {
    e.preventDefault();
    if (!newCert.name.trim()) return;
    onAddCert({
      name: newCert.name,
      issuer: newCert.issuer,
      issueDate: newCert.issueDate,
      credentialUrl: newCert.credentialUrl
    });
    setNewCert({ name: '', issuer: '', issueDate: '', credentialUrl: '' });
    showToast(`Added credential "${newCert.name}"!`, 'success');
  };

  const handleCreateProfileSubmit = (e) => {
    e.preventDefault();
    if (!createProfileData.name.trim()) return;
    onCreateProfile(createProfileData);
    showToast(`Created new student profile for ${createProfileData.name}!`, 'success');
    setActiveTab('academic');
  };

  if (!profile) return null;

  return (
    <div id="view-profile-editor">
      {/* Tab Navigation */}
      <div className="card" style={{ marginBottom: 24, padding: 16 }}>
        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
          <button
            className={`chip-btn ${activeTab === 'academic' ? 'active' : ''}`}
            onClick={() => setActiveTab('academic')}
            id="tab-profile-academic"
          >
            <GraduationCap size={15} style={{ display: 'inline', marginRight: 6 }} />
            Academic & Info
          </button>
          <button
            className={`chip-btn ${activeTab === 'skills' ? 'active' : ''}`}
            onClick={() => setActiveTab('skills')}
            id="tab-profile-skills"
          >
            <Code size={15} style={{ display: 'inline', marginRight: 6 }} />
            Skills Inventory ({(profile.skills || []).length})
          </button>
          <button
            className={`chip-btn ${activeTab === 'projects' ? 'active' : ''}`}
            onClick={() => setActiveTab('projects')}
            id="tab-profile-projects"
          >
            <FolderGit2 size={15} style={{ display: 'inline', marginRight: 6 }} />
            Projects ({(profile.projects || []).length})
          </button>
          <button
            className={`chip-btn ${activeTab === 'certs' ? 'active' : ''}`}
            onClick={() => setActiveTab('certs')}
            id="tab-profile-certs"
          >
            <Award size={15} style={{ display: 'inline', marginRight: 6 }} />
            Certifications ({(profile.certifications || []).length})
          </button>
          <button
            className={`chip-btn ${activeTab === 'new_profile' ? 'active' : ''}`}
            onClick={() => setActiveTab('new_profile')}
            style={{ marginLeft: 'auto', background: activeTab === 'new_profile' ? 'var(--primary)' : 'rgba(88, 190, 239, 0.15)', color: 'var(--primary-light)' }}
            id="tab-profile-create-new"
          >
            <UserPlus size={15} style={{ display: 'inline', marginRight: 6 }} />
            Create New Profile
          </button>
        </div>
      </div>

      {/* 1. Academic & Personal Info Tab */}
      {activeTab === 'academic' && (
        <div className="card">
          <div className="card-header">
            <div>
              <span className="card-title">
                <GraduationCap size={18} color="var(--primary-light)" />
                Student Academic & Career Profile
              </span>
              <span style={{ fontSize: 12.5, color: 'var(--text-muted)' }}>
                Update your degree, current academic standing, and career ambition
              </span>
            </div>
          </div>

          <form onSubmit={handleProfileSubmit}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 20, marginBottom: 20 }}>
              <div>
                <label style={{ display: 'block', fontSize: 13, fontWeight: 600, marginBottom: 6 }}>Full Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={e => setFormData({ ...formData, name: e.target.value })}
                  required
                  style={{ width: '100%' }}
                  id="input-profile-name"
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: 13, fontWeight: 600, marginBottom: 6 }}>Email Address</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={e => setFormData({ ...formData, email: e.target.value })}
                  style={{ width: '100%' }}
                  id="input-profile-email"
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: 13, fontWeight: 600, marginBottom: 6 }}>Degree / Major</label>
                <input
                  type="text"
                  value={formData.degree}
                  onChange={e => setFormData({ ...formData, degree: e.target.value })}
                  placeholder="e.g. B.Tech in Computer Science"
                  required
                  style={{ width: '100%' }}
                  id="input-profile-degree"
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: 13, fontWeight: 600, marginBottom: 6 }}>University / College</label>
                <input
                  type="text"
                  value={formData.university}
                  onChange={e => setFormData({ ...formData, university: e.target.value })}
                  placeholder="e.g. Stanford University"
                  style={{ width: '100%' }}
                  id="input-profile-university"
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: 13, fontWeight: 600, marginBottom: 6 }}>Current Year / Semester</label>
                <input
                  type="text"
                  value={formData.currentYear}
                  onChange={e => setFormData({ ...formData, currentYear: e.target.value })}
                  placeholder="e.g. 3rd Year (Semester 6)"
                  style={{ width: '100%' }}
                  id="input-profile-year"
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: 13, fontWeight: 600, marginBottom: 6 }}>Current GPA / Percentage</label>
                <input
                  type="text"
                  value={formData.gpa}
                  onChange={e => setFormData({ ...formData, gpa: e.target.value })}
                  placeholder="e.g. 3.8 / 4.0 or 8.9 CGPA"
                  style={{ width: '100%' }}
                  id="input-profile-gpa"
                />
              </div>

              <div style={{ gridColumn: '1 / -1' }}>
                <label style={{ display: 'block', fontSize: 13, fontWeight: 600, marginBottom: 6 }}>Target Career Role</label>
                <select
                  value={formData.targetCareerId}
                  onChange={e => setFormData({ ...formData, targetCareerId: e.target.value })}
                  style={{ width: '100%' }}
                  id="select-profile-target-career"
                >
                  {careers.map(c => (
                    <option key={c.id} value={c.id}>{c.title} ({c.category})</option>
                  ))}
                </select>
              </div>

              <div style={{ gridColumn: '1 / -1' }}>
                <label style={{ display: 'block', fontSize: 13, fontWeight: 600, marginBottom: 6 }}>Professional Bio / Career Objective</label>
                <textarea
                  rows={3}
                  value={formData.bio}
                  onChange={e => setFormData({ ...formData, bio: e.target.value })}
                  placeholder="Share a short summary of your background, learning journey, and passions..."
                  style={{ width: '100%' }}
                  id="textarea-profile-bio"
                />
              </div>
            </div>

            <button type="submit" className="btn-primary" id="btn-save-profile">
              <Save size={16} /> Save Profile Changes
            </button>
          </form>
        </div>
      )}

      {/* 2. Skills Inventory Tab */}
      {activeTab === 'skills' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          {/* Add Skill Form */}
          <div className="card">
            <div className="card-header">
              <span className="card-title">
                <Plus size={18} color="var(--primary-light)" />
                Add Technical or Soft Skill
              </span>
            </div>

            <form onSubmit={handleAddSkillSubmit} style={{ display: 'flex', gap: 14, flexWrap: 'wrap', alignItems: 'flex-end' }}>
              <div style={{ flex: 2, minWidth: 200 }}>
                <label style={{ display: 'block', fontSize: 12, fontWeight: 600, marginBottom: 4 }}>Skill Name</label>
                <input
                  type="text"
                  placeholder="e.g. Docker, TypeScript, PyTorch, GraphQL..."
                  value={newSkillName}
                  onChange={e => setNewSkillName(e.target.value)}
                  style={{ width: '100%' }}
                  id="input-new-skill-name"
                />
              </div>

              <div style={{ flex: 1, minWidth: 150 }}>
                <label style={{ display: 'block', fontSize: 12, fontWeight: 600, marginBottom: 4 }}>Category</label>
                <select
                  value={newSkillCategory}
                  onChange={e => setNewSkillCategory(e.target.value)}
                  style={{ width: '100%' }}
                  id="select-new-skill-category"
                >
                  <option value="Language">Language</option>
                  <option value="Frontend">Frontend</option>
                  <option value="Backend">Backend</option>
                  <option value="Database">Database</option>
                  <option value="Cloud">Cloud / DevOps</option>
                  <option value="Deep Learning">Deep Learning / AI</option>
                  <option value="Tools">Tools & Git</option>
                  <option value="Core">Core Fundamentals</option>
                </select>
              </div>

              <div style={{ flex: 1, minWidth: 150 }}>
                <label style={{ display: 'block', fontSize: 12, fontWeight: 600, marginBottom: 4 }}>Proficiency Level</label>
                <select
                  value={newSkillLevel}
                  onChange={e => setNewSkillLevel(e.target.value)}
                  style={{ width: '100%' }}
                  id="select-new-skill-level"
                >
                  <option value="Beginner">Beginner</option>
                  <option value="Intermediate">Intermediate</option>
                  <option value="Advanced">Advanced</option>
                </select>
              </div>

              <button type="submit" className="btn-primary" style={{ height: 42 }} id="btn-add-skill-submit">
                <Plus size={16} /> Add Skill
              </button>
            </form>
          </div>

          {/* Existing Skills Matrix */}
          <div className="card">
            <div className="card-header">
              <span className="card-title">
                <Code size={18} color="var(--accent-emerald)" />
                Current Skills Logged ({(profile.skills || []).length})
              </span>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 14 }}>
              {(profile.skills || []).map(s => (
                <div 
                  key={s.id || s.name}
                  style={{
                    padding: '12px 16px',
                    borderRadius: 'var(--radius-md)',
                    background: 'rgba(17, 24, 39, 0.5)',
                    border: '1px solid var(--border-subtle)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                  }}
                  id={`skill-item-${s.id || s.name}`}
                >
                  <div>
                    <div style={{ fontWeight: 600, fontSize: 14 }}>{s.name}</div>
                    <div style={{ fontSize: 11.5, color: 'var(--text-muted)' }}>{s.category}</div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <span className="badge badge-indigo">{s.level}</span>
                    <button
                      onClick={() => onDeleteSkill(s.id || s.name)}
                      style={{ background: 'transparent', color: 'var(--text-muted)', padding: 4 }}
                      title="Remove skill"
                      id={`btn-delete-skill-${s.id || s.name}`}
                    >
                      <Trash2 size={15} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 3. Projects Showcase Tab */}
      {activeTab === 'projects' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          {/* Add Project Form */}
          <div className="card">
            <div className="card-header">
              <span className="card-title">
                <Plus size={18} color="var(--primary-light)" />
                Add Portfolio Project
              </span>
            </div>

            <form onSubmit={handleAddProjectSubmit}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 16, marginBottom: 16 }}>
                <div>
                  <label style={{ display: 'block', fontSize: 12, fontWeight: 600, marginBottom: 4 }}>Project Title</label>
                  <input
                    type="text"
                    placeholder="e.g. Distributed Task Engine"
                    value={newProject.title}
                    onChange={e => setNewProject({ ...newProject, title: e.target.value })}
                    required
                    style={{ width: '100%' }}
                    id="input-project-title"
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: 12, fontWeight: 600, marginBottom: 4 }}>Tech Stack (comma separated)</label>
                  <input
                    type="text"
                    placeholder="e.g. React, Node.js, Redis, Docker"
                    value={newProject.techStack}
                    onChange={e => setNewProject({ ...newProject, techStack: e.target.value })}
                    style={{ width: '100%' }}
                    id="input-project-tech"
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: 12, fontWeight: 600, marginBottom: 4 }}>GitHub Repository URL</label>
                  <input
                    type="url"
                    placeholder="https://github.com/..."
                    value={newProject.githubUrl}
                    onChange={e => setNewProject({ ...newProject, githubUrl: e.target.value })}
                    style={{ width: '100%' }}
                    id="input-project-github"
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: 12, fontWeight: 600, marginBottom: 4 }}>Live Demo URL (optional)</label>
                  <input
                    type="url"
                    placeholder="https://..."
                    value={newProject.liveUrl}
                    onChange={e => setNewProject({ ...newProject, liveUrl: e.target.value })}
                    style={{ width: '100%' }}
                    id="input-project-live"
                  />
                </div>

                <div style={{ gridColumn: '1 / -1' }}>
                  <label style={{ display: 'block', fontSize: 12, fontWeight: 600, marginBottom: 4 }}>Project Description</label>
                  <textarea
                    rows={2}
                    placeholder="Briefly describe what this project does and architectural decisions..."
                    value={newProject.description}
                    onChange={e => setNewProject({ ...newProject, description: e.target.value })}
                    style={{ width: '100%' }}
                    id="textarea-project-desc"
                  />
                </div>

                <div style={{ gridColumn: '1 / -1' }}>
                  <label style={{ display: 'block', fontSize: 12, fontWeight: 600, marginBottom: 4 }}>
                    Measurable Impact / Metrics (recruiter highlight)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Improved query latency by 45% using Redis caching; used by 300+ students."
                    value={newProject.impact}
                    onChange={e => setNewProject({ ...newProject, impact: e.target.value })}
                    style={{ width: '100%' }}
                    id="input-project-impact"
                  />
                </div>
              </div>

              <button type="submit" className="btn-primary" id="btn-add-project-submit">
                <Plus size={16} /> Add Project to Portfolio
              </button>
            </form>
          </div>

          {/* Existing Projects List */}
          <div className="card">
            <div className="card-header">
              <span className="card-title">
                <FolderGit2 size={18} color="var(--accent-cyan)" />
                Portfolio Projects ({(profile.projects || []).length})
              </span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              {(profile.projects || []).map(p => (
                <div 
                  key={p.id}
                  style={{
                    padding: 20,
                    borderRadius: 'var(--radius-md)',
                    background: 'rgba(17, 24, 39, 0.5)',
                    border: '1px solid var(--border-subtle)'
                  }}
                  id={`project-card-${p.id}`}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 }}>
                    <div>
                      <h4 style={{ fontSize: 16, marginBottom: 4 }}>{p.title}</h4>
                      <p style={{ color: 'var(--text-secondary)', fontSize: 13, marginBottom: 10 }}>{p.description}</p>
                    </div>
                    <button
                      onClick={() => onDeleteProject(p.id)}
                      style={{ background: 'transparent', color: 'var(--text-muted)', padding: 4 }}
                      title="Delete project"
                      id={`btn-delete-project-${p.id}`}
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>

                  <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 12 }}>
                    {(p.techStack || []).map((t, idx) => (
                      <span key={idx} className="skill-tag">{t}</span>
                    ))}
                  </div>

                  {p.impact && (
                    <div style={{ fontSize: 12.5, color: '#A7F3D0', background: 'rgba(16, 185, 129, 0.08)', padding: '6px 12px', borderRadius: 4, marginBottom: 10 }}>
                      ⚡ <strong>Impact:</strong> {p.impact}
                    </div>
                  )}

                  <div style={{ display: 'flex', gap: 16 }}>
                    {p.githubUrl && (
                      <a href={p.githubUrl} target="_blank" rel="noreferrer" style={{ fontSize: 12, display: 'inline-flex', alignItems: 'center', gap: 4 }}>
                        GitHub Repository <ExternalLink size={12} />
                      </a>
                    )}
                    {p.liveUrl && (
                      <a href={p.liveUrl} target="_blank" rel="noreferrer" style={{ fontSize: 12, display: 'inline-flex', alignItems: 'center', gap: 4, color: '#38BDF8' }}>
                        Live Demo Link <ExternalLink size={12} />
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 4. Certifications Tab */}
      {activeTab === 'certs' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          {/* Add Cert Form */}
          <div className="card">
            <div className="card-header">
              <span className="card-title">
                <Plus size={18} color="var(--primary-light)" />
                Add Certification or Professional Credential
              </span>
            </div>

            <form onSubmit={handleAddCertSubmit} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 16 }}>
              <div>
                <label style={{ display: 'block', fontSize: 12, fontWeight: 600, marginBottom: 4 }}>Certification Title</label>
                <input
                  type="text"
                  placeholder="e.g. AWS Certified Cloud Practitioner"
                  value={newCert.name}
                  onChange={e => setNewCert({ ...newCert, name: e.target.value })}
                  required
                  style={{ width: '100%' }}
                  id="input-cert-name"
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: 12, fontWeight: 600, marginBottom: 4 }}>Issuing Organization</label>
                <input
                  type="text"
                  placeholder="e.g. Amazon Web Services, Meta, Coursera"
                  value={newCert.issuer}
                  onChange={e => setNewCert({ ...newCert, issuer: e.target.value })}
                  style={{ width: '100%' }}
                  id="input-cert-issuer"
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: 12, fontWeight: 600, marginBottom: 4 }}>Issue Date / Year</label>
                <input
                  type="text"
                  placeholder="e.g. November 2024"
                  value={newCert.issueDate}
                  onChange={e => setNewCert({ ...newCert, issueDate: e.target.value })}
                  style={{ width: '100%' }}
                  id="input-cert-date"
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: 12, fontWeight: 600, marginBottom: 4 }}>Verification URL</label>
                <input
                  type="url"
                  placeholder="https://..."
                  value={newCert.credentialUrl}
                  onChange={e => setNewCert({ ...newCert, credentialUrl: e.target.value })}
                  style={{ width: '100%' }}
                  id="input-cert-url"
                />
              </div>

              <div style={{ gridColumn: '1 / -1' }}>
                <button type="submit" className="btn-primary" id="btn-add-cert-submit">
                  <Plus size={16} /> Save Certification
                </button>
              </div>
            </form>
          </div>

          {/* Certifications List */}
          <div className="card">
            <div className="card-header">
              <span className="card-title">
                <Award size={18} color="var(--accent-amber)" />
                Verified Credentials ({(profile.certifications || []).length})
              </span>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 16 }}>
              {(profile.certifications || []).map(c => (
                <div 
                  key={c.id}
                  style={{
                    padding: 16,
                    borderRadius: 'var(--radius-md)',
                    background: 'rgba(17, 24, 39, 0.5)',
                    border: '1px solid var(--border-subtle)',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start'
                  }}
                  id={`cert-item-${c.id}`}
                >
                  <div>
                    <div style={{ fontWeight: 700, fontSize: 14 }}>{c.name}</div>
                    <div style={{ fontSize: 12, color: 'var(--text-muted)', margin: '4px 0' }}>
                      {c.issuer} • {c.issueDate}
                    </div>
                    {c.credentialUrl && (
                      <a href={c.credentialUrl} target="_blank" rel="noreferrer" style={{ fontSize: 11.5, display: 'inline-flex', alignItems: 'center', gap: 4 }}>
                        View Certificate <ExternalLink size={11} />
                      </a>
                    )}
                  </div>
                  <button
                    onClick={() => onDeleteCert(c.id)}
                    style={{ background: 'transparent', color: 'var(--text-muted)', padding: 4 }}
                    title="Remove certification"
                    id={`btn-delete-cert-${c.id}`}
                  >
                    <Trash2 size={15} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 5. Create New Profile Tab */}
      {activeTab === 'new_profile' && (
        <div className="card">
          <div className="card-header">
            <div>
              <span className="card-title">
                <UserPlus size={18} color="var(--primary-light)" />
                Register a New Student Profile
              </span>
              <span style={{ fontSize: 12.5, color: 'var(--text-muted)' }}>
                Set up an entirely custom student portfolio from scratch
              </span>
            </div>
          </div>

          <form onSubmit={handleCreateProfileSubmit}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 20, marginBottom: 20 }}>
              <div>
                <label style={{ display: 'block', fontSize: 13, fontWeight: 600, marginBottom: 6 }}>Student Name</label>
                <input
                  type="text"
                  placeholder="e.g. Jordan Lee"
                  value={createProfileData.name}
                  onChange={e => setCreateProfileData({ ...createProfileData, name: e.target.value })}
                  required
                  style={{ width: '100%' }}
                  id="input-create-name"
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: 13, fontWeight: 600, marginBottom: 6 }}>Email</label>
                <input
                  type="email"
                  placeholder="jordan.lee@university.edu"
                  value={createProfileData.email}
                  onChange={e => setCreateProfileData({ ...createProfileData, email: e.target.value })}
                  style={{ width: '100%' }}
                  id="input-create-email"
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: 13, fontWeight: 600, marginBottom: 6 }}>Degree / Major</label>
                <input
                  type="text"
                  placeholder="e.g. B.S. in Computer Science"
                  value={createProfileData.degree}
                  onChange={e => setCreateProfileData({ ...createProfileData, degree: e.target.value })}
                  required
                  style={{ width: '100%' }}
                  id="input-create-degree"
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: 13, fontWeight: 600, marginBottom: 6 }}>Target Career</label>
                <select
                  value={createProfileData.targetCareerId}
                  onChange={e => setCreateProfileData({ ...createProfileData, targetCareerId: e.target.value })}
                  style={{ width: '100%' }}
                  id="select-create-career"
                >
                  {careers.map(c => (
                    <option key={c.id} value={c.id}>{c.title}</option>
                  ))}
                </select>
              </div>
            </div>

            <button type="submit" className="btn-primary" id="btn-create-profile-submit">
              <Sparkles size={16} /> Create & Switch to This Student Profile
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
