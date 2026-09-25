# Career-Path

# 🚀 CareerPath — AI Career Guidance & Roadmap Platform

**CareerPath** is a modern, full-stack web application designed to help university and college students plan, navigate, and accelerate their careers based on their **degree**, **technical skills**, **interests**, **portfolio projects**, and **certifications**.

---

## 🌟 Key Platform Features

### 1. 📊 Executive Student Dashboard
- **Career Fit Radial Meter**: Real-time percentage compatibility with selected target roles.
- **Academic & Career Header**: Displays degree, academic standing (e.g. 3rd Year), GPA, and active ambition.
- **Roadmap Velocity & Streak**: Tracks completion of multi-phase milestones with milestone progress bar.
- **High-Priority Gap Recommendation**: Immediately identifies the single highest-impact missing skill to acquire next.

### 2. 🗺️ Interactive Career Roadmaps
- **Multi-Phase Structured Timelines**:
  - *Phase 1: Foundations & Core Principles*
  - *Phase 2: Core Technologies & Hands-on Tools*
  - *Phase 3: Advanced Concepts & Scalable Architecture*
  - *Phase 4: Capstone Projects, Portfolio & Production Deployment*
  - *Phase 5: System Design, Interview Mastery & Career Launch*
- **Interactive Checklists**: Check off milestones as you learn (triggers celebratory confetti and persists to database).
- **Curated Learning Resources**: Direct external links to official documentation, free interactive courses, and books.
- **Capstone Project Challenges**: Hands-on project specifications for each phase with measurable deliverables.

### 3. 🎯 Skill Gap Analysis Engine
- **Automated Algorithmic Matching**: Evaluates user proficiency levels (Beginner, Intermediate, Advanced) against target role minimum standards.
- **Matched Competencies vs. Missing Skills**: Clear side-by-side breakdown with **Critical** and **Recommended** priority tagging.
- **Prioritized Gap Closure Sequence**: Step-by-step roadmap indicating estimated duration (e.g. 2-3 weeks) and overall fit score impact (e.g. `+12%`).
- **Benchmark Switcher**: Compare your current skill set against other career tracks (e.g., AI/ML, Cloud DevOps, Cybersecurity) with one click.

### 4. 🧭 Career Explorer Catalog
- Comprehensive library of 8+ high-growth tech career paths:
  - **Full Stack Web Developer** (MERN / Next.js)
  - **AI & Machine Learning Engineer** (PyTorch / LLMs / RAG)
  - **Data Scientist & Analytics Engineer** (SQL / Python / Time Series)
  - **Cloud Architect & DevOps Engineer** (AWS / Docker / Kubernetes / Terraform)
  - **Cybersecurity Analyst & Ethical Hacker** (SIEM / OWASP / Wireshark)
  - **UI/UX & Product Designer** (Figma / Design Systems)
  - **Mobile App Developer** (Flutter / React Native)
  - **AI Product Manager & Technical PM** (PRDs / Agile / AI Literacy)
- Filterable by domain category and keyword search.
- Salary bands (Entry-Level, Mid-Level, Senior/Lead) and market demand indicators.

### 5. 🎓 Student Profile & Portfolio Manager
- **Academic Info**: Degree, University, GPA, Year/Semester, Career Objective Bio.
- **Skills Matrix**: Add and manage technical and soft skills with category tagging and proficiency levels.
- **Project Showcase**: Showcase projects with tech stack tags, GitHub repositories, live demo links, and recruiter impact metrics.
- **Certifications**: Record verified credentials from AWS, Meta, DeepLearning.AI, freeCodeCamp, etc.
- **Profile Switcher**: Includes pre-seeded realistic student personas + support for creating custom student profiles.

### 6. 🧠 Interview Prep Hub
- Filterable question bank tailored for specific engineering roles.
- Covers **Frontend**, **Backend**, **System Design**, **Core ML**, **Generative AI**, **Cloud**, **Security**, and **Behavioral (STAR Method)** questions.
- Interactive flashcards with **Reveal Model Answer**, **Interviewer Key Look-for**, and frequently tested company badges (Google, Meta, Amazon, OpenAI, Stripe).

### 7. 📄 ATS Readiness & Resume Audit
- Automated 100-point rubric assessing:
  1. *Academic & Contact Credentials (25 pts)*
  2. *Technical Skills Depth & Distribution (25 pts)*
  3. *Projects & Quantifiable Impact (30 pts)*
  4. *Verified Certifications & Credentials (20 pts)*
- Highlights detected portfolio strengths and delivers targeted recommendations for improvement.

### 8. 🖨️ Career Strategy Report Export
- Generate a clean, comprehensive, printable / PDF-ready Career Strategy Report summarizing the student's profile, target roadmap, skill gap status, and prioritized action plan.

---

## 🛠️ Technology Stack & Architecture

- **Backend**: Node.js & Express
  - RESTful APIs (`/api/careers`, `/api/profiles`, `/api/analysis/gap`, `/api/interviews`, `/api/resume`)
  - File-backed persistent storage (`server/data/db.json`)
  - Static asset serving for production distribution
- **Frontend**: React 18 & Vite
  - Modern Vanilla CSS Design System (Custom properties, dark obsidian & clean light themes, glassmorphism, responsive breakpoints)
  - Lucide React iconography
  - Canvas Confetti for milestone achievement feedback
- **Port Defaults**:
  - Backend API & Static Web Server: `http://localhost:5000`
  - Vite Client Dev Server (with `/api` proxy): `http://localhost:3000`

---

## 🚀 Getting Started

### 1. Installation
Install all dependencies for root, server, and client:
\`\`\`bash
npm install --prefix server
npm install --prefix client
npm install
\`\`\`

### 2. Running the Full Stack Application
You can start the backend server (which also serves the client build):
\`\`\`bash
npm run server
\`\`\`
Visit **`http://localhost:5000`** in your browser.

Or run both the server and the Vite hot-reloading dev client simultaneously:
\`\`\`bash
npm run dev
\`\`\`
Visit **`http://localhost:3000`** in your browser.

### 3. Building for Production
To re-bundle the React frontend into `client/dist`:
\`\`\`bash
npm run build
\`\`\`

---

## 📁 Project Structure

\`\`\`
Career Path/
├── package.json               # Root scripts
├── README.md                  # Project documentation
├── server/
│   ├── package.json           # Server dependencies (Express, CORS)
│   ├── server.js              # Express API server & static client handler
│   ├── store.js               # Persistence store for profiles & milestones
│   ├── data/
│   │   ├── careersData.js     # 8+ rich tech careers with phases & resources
│   │   ├── interviewData.js   # Technical & behavioral interview question bank
│   │   ├── defaultProfiles.js # Seed student profiles (CS, Data Science, IT)
│   │   └── db.json            # Persistent JSON database
│   └── routes/
│       ├── careerRoutes.js    # /api/careers catalog endpoints
│       ├── profileRoutes.js   # /api/profiles student portfolio endpoints
│       ├── gapAnalysisRoutes.js # /api/analysis/gap skill matching engine
│       ├── interviewRoutes.js # /api/interviews question bank endpoints
│       └── resumeRoutes.js    # /api/resume/audit ATS scoring rubric
└── client/
    ├── package.json           # Client dependencies (React, Vite, Lucide)
    ├── vite.config.js         # Vite configuration with /api proxy
    ├── index.html             # HTML5 template with Google Fonts (Outfit, Plus Jakarta Sans)
    ├── dist/                  # Production-optimized build assets
    └── src/
        ├── main.jsx           # React DOM bootstrap
        ├── App.jsx            # Main app shell, state management & toast engine
        ├── index.css          # Vanilla CSS design system
        └── components/
            ├── Navbar.jsx            # Brand, profile switcher, target selector, theme toggle
            ├── Sidebar.jsx           # Navigation links & fit readiness widget
            ├── Dashboard.jsx         # Executive student cockpit & quick check-off
            ├── CareerRoadmap.jsx     # Interactive multi-phase timeline with checkboxes
            ├── SkillGapAnalyzer.jsx  # Matched vs missing skills & prioritized action plan
            ├── CareerExplorer.jsx    # Searchable career catalog with salary bands
            ├── ProfileEditor.jsx     # Academic, skills, projects, and certs manager
            ├── InterviewPrep.jsx     # FAANG question flashcards & model answers
            ├── ResumeScorer.jsx      # ATS score rubric & optimization tips
            └── ExportModal.jsx       # Printable Career Strategy Report modal
\`\`\`
