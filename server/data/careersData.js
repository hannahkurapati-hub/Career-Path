export const careersData = [
  {
    id: "fullstack-developer",
    title: "Full Stack Web Developer",
    category: "Software Engineering",
    icon: "Layers",
    badge: "Most In-Demand",
    shortDescription: "Architect, build, and deploy modern web applications covering frontend, backend APIs, databases, and cloud infrastructure.",
    marketDemand: "Extremely High",
    difficulty: "Moderate",
    typicalDegree: ["Computer Science", "Information Technology", "Software Engineering", "BCA / MCA"],
    salaryRanges: {
      entry: "$85,000 / ₹7 - 12 LPA",
      mid: "$125,000 / ₹16 - 28 LPA",
      senior: "$175,000+ / ₹35 - 55+ LPA"
    },
    topCompanies: ["Google", "Amazon", "Meta", "Stripe", "Vercel", "Shopify", "Atlassian"],
    coreSkills: [
      { name: "JavaScript / TypeScript", weight: 20, minLevel: "Intermediate", category: "Language" },
      { name: "React.js", weight: 15, minLevel: "Intermediate", category: "Frontend" },
      { name: "Node.js / Express", weight: 15, minLevel: "Intermediate", category: "Backend" },
      { name: "HTML5 / Modern CSS", weight: 10, minLevel: "Advanced", category: "Frontend" },
      { name: "PostgreSQL / MongoDB", weight: 15, minLevel: "Intermediate", category: "Database" },
      { name: "REST & GraphQL APIs", weight: 10, minLevel: "Intermediate", category: "Backend" },
      { name: "Git & GitHub", weight: 10, minLevel: "Intermediate", category: "Tools" },
      { name: "Docker & CI/CD", weight: 5, minLevel: "Beginner", category: "DevOps" }
    ],
    optionalSkills: [
      { name: "Next.js", category: "Frontend" },
      { name: "Redis", category: "Database" },
      { name: "Tailwind CSS", category: "Frontend" },
      { name: "AWS Basics", category: "Cloud" },
      { name: "Jest / Cypress", category: "Testing" }
    ],
    roadmapPhases: [
      {
        phaseId: 1,
        phaseName: "Phase 1: Web Foundations & Core Programming",
        duration: "Weeks 1 - 6",
        description: "Master the building blocks of the web: semantic HTML, responsive CSS, modern JavaScript ES6+, and version control.",
        milestones: [
          {
            id: "fs-1-1",
            title: "Semantic HTML5 & Accessible Web Architecture",
            description: "Understand accessibility (a11y), SEO meta tags, semantic markup, and DOM tree structures.",
            skillsCovered: ["HTML5", "Accessibility", "SEO"],
            resources: [
              { title: "MDN Web Docs: HTML Foundations", type: "Documentation", url: "https://developer.mozilla.org/en-US/docs/Learn/HTML" },
              { title: "Web.dev Learn HTML", type: "Free Course", url: "https://web.dev/learn/html" }
            ],
            projectIdea: {
              title: "Accessible Developer Portfolio Site",
              brief: "Build a multi-page semantic portfolio with semantic tags, dark/light theme, and 100% Lighthouse accessibility score."
            }
          },
          {
            id: "fs-1-2",
            title: "Modern CSS, Flexbox, Grid & Responsive Design",
            description: "Master layout engines, media queries, CSS variables, mobile-first design patterns, and CSS animations.",
            skillsCovered: ["Modern CSS", "Flexbox", "CSS Grid", "Responsive Design"],
            resources: [
              { title: "Flexbox Froggy & Grid Garden", type: "Interactive Practice", url: "https://flexboxfroggy.com" },
              { title: "CSS Tricks Complete Guide to Grid", type: "Guide", url: "https://css-tricks.com/snippets/css/complete-guide-grid/" }
            ],
            projectIdea: {
              title: "E-Commerce Product Showcase & Filter UI",
              brief: "Create an adaptive shopping catalog layout using CSS Grid with animated hover effects and responsive drawers."
            }
          },
          {
            id: "fs-1-3",
            title: "Deep JavaScript (ES6+, Async/Await, DOM manipulation)",
            description: "Deep dive into closures, prototypes, event loop, Promises, Fetch API, and modular code organization.",
            skillsCovered: ["JavaScript", "Async JS", "DOM API"],
            resources: [
              { title: "JavaScript.info Modern Tutorial", type: "Tutorial", url: "https://javascript.info/" },
              { title: "You Don't Know JS (Kyle Simpson)", type: "Book", url: "https://github.com/getify/You-Dont-Know-JS" }
            ],
            projectIdea: {
              title: "Interactive Task & Kanban Board",
              brief: "Pure JS Drag-and-Drop Kanban board storing tasks in localStorage with search, tag filtering, and history undo."
            }
          }
        ]
      },
      {
        phaseId: 2,
        phaseName: "Phase 2: Frontend Engineering with React & State",
        duration: "Weeks 7 - 14",
        description: "Develop interactive, component-driven client applications using React, custom hooks, state management, and modern toolchains.",
        milestones: [
          {
            id: "fs-2-1",
            title: "React Fundamentals, Hooks & Component Lifecycle",
            description: "Master JSX, Props, useState, useEffect, useMemo, useCallback, and controlled form inputs.",
            skillsCovered: ["React.js", "Component Architecture", "Hooks"],
            resources: [
              { title: "React.dev Official Documentation", type: "Documentation", url: "https://react.dev/" }
            ],
            projectIdea: {
              title: "Financial Expense Tracker & Analytics Dashboard",
              brief: "Build a responsive budget planner with chart visualizations, recurring expenses, and dynamic categorization."
            }
          },
          {
            id: "fs-2-2",
            title: "Client-Side Routing, State Management & API Integration",
            description: "Handle complex state with Context API / Zustand / Redux Toolkit, client-side routing, and caching queries.",
            skillsCovered: ["React Router", "Zustand / Redux", "TanStack Query"],
            resources: [
              { title: "TanStack Query Guides", type: "Documentation", url: "https://tanstack.com/query" }
            ],
            projectIdea: {
              title: "Movie & Streaming Discovery Hub",
              brief: "Connect with TMDB API to showcase trending movies, infinite scroll, trailer previews, and user watchlist."
            }
          }
        ]
      },
      {
        phaseId: 3,
        phaseName: "Phase 3: Backend Systems, REST APIs & Databases",
        duration: "Weeks 15 - 22",
        description: "Construct scalable server architectures, robust REST APIs, authentication security, and persistent relational & NoSQL databases.",
        milestones: [
          {
            id: "fs-3-1",
            title: "Node.js Architecture & Express API Engineering",
            description: "Understand asynchronous event loops, Express middlewares, error handling, rate limiting, and CORS.",
            skillsCovered: ["Node.js", "Express", "REST APIs"],
            resources: [
              { title: "Node.js Official Documentation", type: "Documentation", url: "https://nodejs.org/en/docs" }
            ],
            projectIdea: {
              title: "Community Blogging & Discussion REST API",
              brief: "CRUD endpoints for posts, comments, nested replies, tagging, and role-based permissions."
            }
          },
          {
            id: "fs-3-2",
            title: "Database Modeling: PostgreSQL (Relational) & MongoDB (Document)",
            description: "Design relational schemas, SQL joins, indexing, migrations with Prisma/TypeORM, and MongoDB aggregation pipelines.",
            skillsCovered: ["PostgreSQL", "MongoDB", "Prisma ORM", "Database Indexing"],
            resources: [
              { title: "PostgreSQL Tutorial for Beginners", type: "Documentation", url: "https://www.postgresqltutorial.com/" }
            ],
            projectIdea: {
              title: "Multi-tenant SaaS Workspace Database",
              brief: "Normalized PostgreSQL database with users, organizations, team roles, audit logs, and optimized indexing."
            }
          },
          {
            id: "fs-3-3",
            title: "Authentication, Authorization & Security Best Practices",
            description: "Implement JWT tokens, secure HTTP-only cookies, OAuth 2.0 (Google/GitHub), password hashing (bcrypt), and CSRF/XSS protection.",
            skillsCovered: ["JWT", "OAuth 2.0", "Web Security", "Bcrypt"],
            resources: [
              { title: "OWASP Top 10 Web Application Security Risks", type: "Guide", url: "https://owasp.org/www-project-top-ten/" }
            ],
            projectIdea: {
              title: "Zero-Trust Auth Microservice",
              brief: "Secure authentication service with email verification, MFA OTP, refresh token rotation, and rate-limiting."
            }
          }
        ]
      },
      {
        phaseId: 4,
        phaseName: "Phase 4: Full Stack Integration, DevOps & Cloud Deployment",
        duration: "Weeks 23 - 28",
        description: "Connect frontend and backend, containerize using Docker, setup CI/CD pipelines, and deploy to modern cloud platforms.",
        milestones: [
          {
            id: "fs-4-1",
            title: "Docker Containerization & Multi-Container Orchestration",
            description: "Write Dockerfiles for React and Node, configure docker-compose for app, database, and Redis caching.",
            skillsCovered: ["Docker", "Docker Compose", "Containerization"],
            resources: [
              { title: "Docker Getting Started Guide", type: "Documentation", url: "https://docs.docker.com/get-started/" }
            ],
            projectIdea: {
              title: "Dockerized Full-Stack Microservices Sandbox",
              brief: "Deploy a frontend, backend API, PostgreSQL database, and Redis cache running smoothly via single docker-compose up."
            }
          },
          {
            id: "fs-4-2",
            title: "Automated CI/CD with GitHub Actions & Production Deployment",
            description: "Automate linting, unit testing, automated staging deployment to Vercel/Render/Railway, and production SSL management.",
            skillsCovered: ["GitHub Actions", "CI/CD", "Vercel / AWS"],
            resources: [
              { title: "GitHub Actions Documentation", type: "Documentation", url: "https://docs.github.com/en/actions" }
            ],
            projectIdea: {
              title: "Production Ready Collaborative Document Platform",
              brief: "Real-time collaborative notes (WebSockets/Socket.io) with auto-save, PDF export, fully deployed with CI/CD pipeline."
            }
          }
        ]
      },
      {
        phaseId: 5,
        phaseName: "Phase 5: System Design, Interview Prep & Career Launch",
        duration: "Weeks 29 - 32",
        description: "Prepare for technical coding interviews, system design rounds, polish resume, and build an exceptional capstone project.",
        milestones: [
          {
            id: "fs-5-1",
            title: "System Design Essentials (Caching, Load Balancers, Sharding)",
            description: "Master horizontal scaling, Redis caching strategies, CDN asset distribution, and database read replicas.",
            skillsCovered: ["System Design", "Scalability", "Redis Caching"],
            resources: [
              { title: "System Design Primer by Donne Martin", type: "Free Course", url: "https://github.com/donnemartin/system-design-primer" }
            ],
            projectIdea: {
              title: "Distributed URL Shortener & Analytics System",
              brief: "High-throughput URL shortener with Base62 encoding, Redis caching, click analytics, and rate-limiting."
            }
          },
          {
            id: "fs-5-2",
            title: "Full Stack Capstone & Technical Mock Interviews",
            description: "Complete an industry-grade portfolio capstone project, refine GitHub repositories, and practice 50+ SDE interview questions.",
            skillsCovered: ["Portfolio Capstone", "DSA in JS", "Interview Readiness"],
            resources: [
              { title: "NeetCode Roadmap", type: "Practice", url: "https://neetcode.io/roadmap" }
            ],
            projectIdea: {
              title: "E-Learning / LMS Platform with Video Streaming",
              brief: "Full-scale platform with user roles, stripe subscription payments, video upload/streaming, course progress tracking."
            }
          }
        ]
      }
    ]
  },
  {
    id: "ai-ml-engineer",
    title: "AI & Machine Learning Engineer",
    category: "Artificial Intelligence",
    icon: "Brain",
    badge: "Fastest Growing",
    shortDescription: "Design, train, fine-tune, and deploy machine learning and generative AI models to solve complex real-world challenges.",
    marketDemand: "Extremely High",
    difficulty: "Advanced",
    typicalDegree: ["Computer Science", "Data Science", "Artificial Intelligence", "Mathematics & Computing"],
    salaryRanges: {
      entry: "$95,000 / ₹10 - 15 LPA",
      mid: "$145,000 / ₹22 - 38 LPA",
      senior: "$210,000+ / ₹45 - 80+ LPA"
    },
    topCompanies: ["OpenAI", "Google DeepMind", "Microsoft", "NVIDIA", "Meta AI", "Anthropic", "Scale AI"],
    coreSkills: [
      { name: "Python", weight: 20, minLevel: "Advanced", category: "Language" },
      { name: "Linear Algebra & Statistics", weight: 15, minLevel: "Intermediate", category: "Math" },
      { name: "Machine Learning (Scikit-Learn)", weight: 15, minLevel: "Intermediate", category: "Core ML" },
      { name: "Deep Learning (PyTorch / TensorFlow)", weight: 15, minLevel: "Intermediate", category: "Deep Learning" },
      { name: "Data Processing (NumPy, Pandas)", weight: 15, minLevel: "Advanced", category: "Data" },
      { name: "LLMs, RAG & LangChain", weight: 10, minLevel: "Intermediate", category: "Generative AI" },
      { name: "Model Deployment & MLOps (FastAPI, Docker)", weight: 10, minLevel: "Beginner", category: "MLOps" }
    ],
    optionalSkills: [
      { name: "Computer Vision (OpenCV)", category: "AI Domain" },
      { name: "NLP & Transformers", category: "AI Domain" },
      { name: "Vector Databases (Pinecone/Chroma)", category: "AI Tools" },
      { name: "MLflow / Weights & Biases", category: "MLOps" }
    ],
    roadmapPhases: [
      {
        phaseId: 1,
        phaseName: "Phase 1: Math Foundations & Advanced Python",
        duration: "Weeks 1 - 6",
        description: "Master linear algebra, multivariate calculus, probability distributions, hypothesis testing, and object-oriented Python.",
        milestones: [
          {
            id: "ai-1-1",
            title: "Linear Algebra, Matrix Calculus & Probability for ML",
            description: "Eigenvalues, Singular Value Decomposition (SVD), Gradient descent mathematics, Bayes Theorem, and distributions.",
            skillsCovered: ["Linear Algebra", "Calculus", "Probability & Statistics"],
            resources: [
              { title: "3Blue1Brown: Essence of Linear Algebra", type: "Video Course", url: "https://www.youtube.com/playlist?list=PLZHQObOWTQDPD3MizzM2xVFitgF8hE_ab" },
              { title: "Mathematics for Machine Learning (Deisenroth)", type: "Book", url: "https://mml-book.github.io/" }
            ],
            projectIdea: {
              title: "From-Scratch Matrix Operations & Regression Engine",
              brief: "Implement matrix inversion, dot products, and ordinary least squares gradient descent without numpy or external libraries."
            }
          },
          {
            id: "ai-1-2",
            title: "Data Wrangling & Exploratory Data Analysis (EDA)",
            description: "Data cleaning, vectorization with NumPy, complex manipulations with Pandas, and data visualization with Seaborn/Plotly.",
            skillsCovered: ["Python", "NumPy", "Pandas", "Matplotlib", "Seaborn"],
            resources: [
              { title: "Python for Data Analysis (Wes McKinney)", type: "Book", url: "https://wesmckinney.com/book/" }
            ],
            projectIdea: {
              title: "Global Tech Industry Salary & Trends Explorer",
              brief: "Clean 50k+ raw developer survey rows, analyze salary correlation across skills, and build an interactive Plotly dashboard."
            }
          }
        ]
      },
      {
        phaseId: 2,
        phaseName: "Phase 2: Classical Machine Learning & Scikit-Learn",
        duration: "Weeks 7 - 14",
        description: "Understand supervised & unsupervised algorithms, feature engineering, cross-validation, and performance metrics.",
        milestones: [
          {
            id: "ai-2-1",
            title: "Supervised Learning: Regression & Classification",
            description: "Linear & Logistic Regression, Decision Trees, Random Forests, XGBoost, and hyperparameter tuning with GridSearchCV.",
            skillsCovered: ["Scikit-Learn", "Regression", "Random Forest", "XGBoost"],
            resources: [
              { title: "Hands-On Machine Learning with Scikit-Learn & PyTorch", type: "Book", url: "https://www.oreilly.com/library/view/hands-on-machine-learning/9781098125967/" }
            ],
            projectIdea: {
              title: "End-to-End Customer Churn Prediction Engine",
              brief: "Engineer behavioral features, handle class imbalance via SMOTE, train XGBoost model achieving 88%+ ROC-AUC."
            }
          },
          {
            id: "ai-2-2",
            title: "Unsupervised Learning, Clustering & Dimensionality Reduction",
            description: "K-Means, Hierarchical Clustering, DBSCAN, Principal Component Analysis (PCA), and t-SNE embeddings.",
            skillsCovered: ["Unsupervised Learning", "PCA", "K-Means Clustering"],
            resources: [
              { title: "Scikit-Learn Clustering Documentation", type: "Documentation", url: "https://scikit-learn.org/stable/modules/clustering.html" }
            ],
            projectIdea: {
              title: "Spotify Music Feature Clustering & Recommendation System",
              brief: "Cluster songs by tempo, acousticness, and danceability using K-Means and visualize high-dimensional clusters with PCA."
            }
          }
        ]
      },
      {
        phaseId: 3,
        phaseName: "Phase 3: Deep Learning & Neural Networks (PyTorch)",
        duration: "Weeks 15 - 22",
        description: "Delve into backpropagation, Convolutional Neural Networks (CNNs), Recurrent Networks, and PyTorch tensors.",
        milestones: [
          {
            id: "ai-3-1",
            title: "Neural Network Fundamentals & PyTorch Framework",
            description: "Feedforward architectures, activation functions, loss functions, optimizers (Adam, SGD), and autograd mechanics.",
            skillsCovered: ["PyTorch", "Neural Networks", "Backpropagation"],
            resources: [
              { title: "DeepLearning.AI Deep Learning Specialization", type: "Course", url: "https://www.deeplearning.ai/courses/deep-learning-specialization/" },
              { title: "PyTorch Official Tutorials", type: "Tutorial", url: "https://pytorch.org/tutorials/" }
            ],
            projectIdea: {
              title: "Handwritten Math Equation Solver",
              brief: "Train custom neural network on handwritten symbols with data augmentation and real-time canvas inference."
            }
          },
          {
            id: "ai-3-2",
            title: "Computer Vision & Transfer Learning (ResNet, EfficientNet)",
            description: "Convolutions, pooling, transfer learning with pre-trained vision backbones, and object detection.",
            skillsCovered: ["Computer Vision", "CNNs", "Transfer Learning"],
            resources: [
              { title: "CS231n: Deep Learning for Computer Vision", type: "Course", url: "http://cs231n.stanford.edu/" }
            ],
            projectIdea: {
              title: "Medical Chest X-Ray Diagnostic Classifier",
              brief: "Fine-tune ResNet-50 with Grad-CAM heatmaps showing exact image regions driving diagnosis decisions."
            }
          }
        ]
      },
      {
        phaseId: 4,
        phaseName: "Phase 4: Modern NLP, Transformers & Generative AI",
        duration: "Weeks 23 - 28",
        description: "Master Transformer architecture, Hugging Face ecosystem, Large Language Models (LLMs), RAG pipelines, and Vector DBs.",
        milestones: [
          {
            id: "ai-4-1",
            title: "Self-Attention, Transformer Architecture & Hugging Face",
            description: "Encoder-Decoder models, tokenization, positional embeddings, BERT, GPT, and fine-tuning with LoRA/PEFT.",
            skillsCovered: ["Transformers", "Hugging Face", "NLP", "Fine-Tuning"],
            resources: [
              { title: "Hugging Face NLP Course", type: "Free Course", url: "https://huggingface.co/learn/nlp-course" }
            ],
            projectIdea: {
              title: "Domain-Specific Sentiment & Entity Extraction API",
              brief: "Fine-tune a DistilBERT model for financial news analysis, extracting sentiment and ticker symbols."
            }
          },
          {
            id: "ai-4-2",
            title: "Retrieval-Augmented Generation (RAG) & Vector Search",
            description: "Chunking strategies, embedding generation, Pinecone/Chroma vector databases, LangChain/LlamaIndex agents.",
            skillsCovered: ["RAG", "Vector Databases", "LangChain", "LLMs"],
            resources: [
              { title: "LangChain Documentation & Conceptual Guides", type: "Documentation", url: "https://python.langchain.com/" }
            ],
            projectIdea: {
              title: "Enterprise Multi-Document Q&A Copilot",
              brief: "Build an AI research assistant capable of parsing PDFs, generating semantic embeddings, and answering user queries with citations."
            }
          }
        ]
      },
      {
        phaseId: 5,
        phaseName: "Phase 5: MLOps, Model Serving & Production Deployment",
        duration: "Weeks 29 - 32",
        description: "Deploy machine learning models via FastAPI microservices, containerize with Docker, track experiments, and scale inference.",
        milestones: [
          {
            id: "ai-5-1",
            title: "High-Throughput Model Serving with FastAPI & Docker",
            description: "Asynchronous inference endpoints, batch processing, ONNX runtime acceleration, and model containerization.",
            skillsCovered: ["FastAPI", "Docker", "ONNX Runtime", "Model Serving"],
            resources: [
              { title: "FastAPI Official Documentation", type: "Documentation", url: "https://fastapi.tiangolo.com/" }
            ],
            projectIdea: {
              title: "Production Real-Time AI Inference Gateway",
              brief: "Deploy quantized LLM/Vision model behind FastAPI with streaming responses, token counts, and Prometheus monitoring."
            }
          }
        ]
      }
    ]
  },
  {
    id: "data-scientist",
    title: "Data Scientist & Analytics Engineer",
    category: "Data & Analytics",
    icon: "BarChart3",
    badge: "High Growth",
    shortDescription: "Transform messy business data into actionable strategic insights, predictive statistical models, and executive dashboards.",
    marketDemand: "High",
    difficulty: "Moderate to Advanced",
    typicalDegree: ["Data Science", "Statistics", "Computer Science", "Economics / Mathematics", "B.Tech / B.E."],
    salaryRanges: {
      entry: "$88,000 / ₹8 - 13 LPA",
      mid: "$130,000 / ₹18 - 30 LPA",
      senior: "$180,000+ / ₹38 - 65+ LPA"
    },
    topCompanies: ["Netflix", "Spotify", "Airbnb", "Uber", "Amazon", "McKinsey QuantumBlack", "JPMorgan Chase"],
    coreSkills: [
      { name: "Python", weight: 20, minLevel: "Advanced", category: "Language" },
      { name: "SQL (Advanced Window Functions, CTEs)", weight: 20, minLevel: "Advanced", category: "Database" },
      { name: "Statistical Hypothesis Testing & A/B Testing", weight: 15, minLevel: "Intermediate", category: "Statistics" },
      { name: "Pandas & Data Wrangling", weight: 15, minLevel: "Advanced", category: "Data" },
      { name: "Machine Learning Modeling", weight: 15, minLevel: "Intermediate", category: "ML" },
      { name: "Tableau / PowerBI / Streamlit", weight: 15, minLevel: "Intermediate", category: "Visualization" }
    ],
    optionalSkills: [
      { name: "dbt (data build tool)", category: "Analytics Eng" },
      { name: "Snowflake / BigQuery", category: "Data Warehouse" },
      { name: "Spark / PySpark", category: "Big Data" },
      { name: "R Programming", category: "Statistics" }
    ],
    roadmapPhases: [
      {
        phaseId: 1,
        phaseName: "Phase 1: Advanced SQL & Data Extraction",
        duration: "Weeks 1 - 6",
        description: "Master relational querying, subqueries, common table expressions (CTEs), window functions, and database design.",
        milestones: [
          {
            id: "ds-1-1",
            title: "Expert SQL Mastery & Analytical Querying",
            description: "Window functions (ROW_NUMBER, DENSE_RANK, LAG/LEAD), self-joins, pivots, and query execution plan optimization.",
            skillsCovered: ["SQL", "PostgreSQL", "Database Optimization"],
            resources: [
              { title: "Mode Analytics Advanced SQL Tutorial", type: "Tutorial", url: "https://mode.com/sql-tutorial/" }
            ],
            projectIdea: {
              title: "SaaS Subscription Cohort Retention Engine",
              brief: "Write complex SQL CTEs to analyze monthly recurring revenue (MRR), user churn rates, and LTV cohort curves."
            }
          }
        ]
      },
      {
        phaseId: 2,
        phaseName: "Phase 2: Applied Statistics, Probability & A/B Testing",
        duration: "Weeks 7 - 14",
        description: "Formulate hypotheses, calculate statistical significance (p-values, t-tests, ANOVA), and evaluate product experiments.",
        milestones: [
          {
            id: "ds-2-1",
            title: "Statistical Inference & Experimentation Design",
            description: "Sample size calculation, power analysis, Type I & II errors, confidence intervals, and multivariate experimentation.",
            skillsCovered: ["A/B Testing", "Hypothesis Testing", "Statistics"],
            resources: [
              { title: "Practical Statistics for Data Scientists (Bruce & Bruce)", type: "Book", url: "https://www.oreilly.com/library/view/practical-statistics-for/9781492072935/" }
            ],
            projectIdea: {
              title: "E-Commerce Checkout Flow A/B Test Simulator",
              brief: "Simulate web conversion data, calculate Z-score and p-values, and generate an executive executive summary recommendation."
            }
          }
        ]
      },
      {
        phaseId: 3,
        phaseName: "Phase 3: Machine Learning & Predictive Modeling",
        duration: "Weeks 15 - 22",
        description: "Build production predictive models for classification, regression, time series forecasting, and customer segmentation.",
        milestones: [
          {
            id: "ds-3-1",
            title: "Predictive Analytics & Time Series Forecasting",
            description: "ARIMA, Prophet, Random Forests, XGBoost, and model evaluation metrics (MAE, RMSE, F1-Score).",
            skillsCovered: ["Predictive Modeling", "Time Series", "XGBoost"],
            resources: [
              { title: "Forecasting: Principles and Practice", type: "Book", url: "https://otexts.com/fpp3/" }
            ],
            projectIdea: {
              title: "Retail Demand & Inventory Forecasting Engine",
              brief: "Predict product sales demand 30 days ahead factoring in seasonality, holidays, and promotional discounts."
            }
          }
        ]
      },
      {
        phaseId: 4,
        phaseName: "Phase 4: BI Dashboards & Business Storytelling",
        duration: "Weeks 23 - 28",
        description: "Build interactive visual apps with Streamlit and Tableau to communicate analytical insights to C-suite executives.",
        milestones: [
          {
            id: "ds-4-1",
            title: "Interactive Web Dashboards with Streamlit & Tableau",
            description: "Convert models into user-friendly interactive web apps with parameter sliders and real-time charts.",
            skillsCovered: ["Streamlit", "Tableau", "Data Storytelling"],
            resources: [
              { title: "Streamlit Documentation", type: "Documentation", url: "https://docs.streamlit.io/" }
            ],
            projectIdea: {
              title: "Executive Revenue & Churn Intelligence Hub",
              brief: "Interactive Streamlit app with dynamic scenario planning, what-if revenue simulations, and downloadable PDF reports."
            }
          }
        ]
      }
    ]
  },
  {
    id: "cloud-devops",
    title: "Cloud Architect & DevOps Engineer",
    category: "Cloud & Infrastructure",
    icon: "Cloud",
    badge: "High Salary",
    shortDescription: "Build resilient, automated cloud infrastructure, CI/CD automation pipelines, Kubernetes clusters, and observability systems.",
    marketDemand: "Extremely High",
    difficulty: "Advanced",
    typicalDegree: ["Computer Science", "Information Technology", "Cloud Computing", "Computer Engineering"],
    salaryRanges: {
      entry: "$90,000 / ₹8 - 14 LPA",
      mid: "$140,000 / ₹20 - 35 LPA",
      senior: "$195,000+ / ₹40 - 70+ LPA"
    },
    topCompanies: ["Amazon Web Services", "Microsoft Azure", "Google Cloud", "Red Hat", "HashiCorp", "Datadog", "CrowdStrike"],
    coreSkills: [
      { name: "Linux Administration & Bash Scripting", weight: 20, minLevel: "Advanced", category: "OS" },
      { name: "Docker & Containerization", weight: 20, minLevel: "Advanced", category: "Containers" },
      { name: "Kubernetes (K8s)", weight: 15, minLevel: "Intermediate", category: "Orchestration" },
      { name: "Terraform (Infrastructure as Code)", weight: 15, minLevel: "Intermediate", category: "IaC" },
      { name: "AWS / Azure Cloud Services", weight: 15, minLevel: "Intermediate", category: "Cloud" },
      { name: "CI/CD (GitHub Actions / GitLab CI)", weight: 15, minLevel: "Intermediate", category: "Automation" }
    ],
    optionalSkills: [
      { name: "Prometheus & Grafana", category: "Monitoring" },
      { name: "Ansible", category: "Config Management" },
      { name: "ArgoCD (GitOps)", category: "GitOps" },
      { name: "Python / Go for DevOps", category: "Scripting" }
    ],
    roadmapPhases: [
      {
        phaseId: 1,
        phaseName: "Phase 1: Linux Kernel, Networking & Bash Automation",
        duration: "Weeks 1 - 6",
        description: "Master command line mastery, process management, permissions, TCP/IP, DNS, SSL/TLS, and shell scripting.",
        milestones: [
          {
            id: "cd-1-1",
            title: "Linux System Administration & Shell Scripting",
            description: "Systemd services, crontabs, user groups, file permissions, resource monitoring (top, htop), and bash automation.",
            skillsCovered: ["Linux", "Bash Scripting", "Networking"],
            resources: [
              { title: "The Linux Command Line (William Shotts)", type: "Book", url: "https://linuxcommand.org/tlcl.php" }
            ],
            projectIdea: {
              title: "Automated Linux Server Hardening & Backup Script",
              brief: "Bash script that disables root login, configures UFW firewall, monitors disk threshold, and schedules encrypted S3 backups."
            }
          }
        ]
      },
      {
        phaseId: 2,
        phaseName: "Phase 2: Containerization & Cloud Foundations (AWS)",
        duration: "Weeks 7 - 14",
        description: "Multi-stage Docker builds, networking, persistent volumes, and essential AWS services (VPC, EC2, S3, IAM, RDS).",
        milestones: [
          {
            id: "cd-2-1",
            title: "Advanced Docker & AWS Cloud Architecture",
            description: "Custom VPC subnets, route tables, security groups, EC2 autoscaling, S3 bucket policies, and least-privilege IAM.",
            skillsCovered: ["Docker", "AWS", "IAM", "VPC Networking"],
            resources: [
              { title: "AWS Skill Builder Cloud Practitioner", type: "Free Course", url: "https://explore.skillbuilder.aws/" }
            ],
            projectIdea: {
              title: "Multi-Tier Web App on High-Availability AWS Architecture",
              brief: "Deploy an Application Load Balancer routed to auto-scaled EC2 instances across 2 availability zones with RDS Multi-AZ."
            }
          }
        ]
      },
      {
        phaseId: 3,
        phaseName: "Phase 3: Infrastructure as Code (Terraform) & CI/CD",
        duration: "Weeks 15 - 22",
        description: "Declare repeatable cloud infrastructure with Terraform modules and build automated deployment pipelines.",
        milestones: [
          {
            id: "cd-3-1",
            title: "Terraform IaC & GitHub Actions Deployment Automation",
            description: "State management, remote backends in S3, reusable modules, variables, and automated plan/apply CI workflows.",
            skillsCovered: ["Terraform", "GitHub Actions", "CI/CD"],
            resources: [
              { title: "HashiCorp Terraform Associate Tutorials", type: "Tutorial", url: "https://developer.hashicorp.com/terraform/tutorials" }
            ],
            projectIdea: {
              title: "Complete IaC Pipeline for Cloud Infrastructure",
              brief: "Provision entire production VPC, ECS cluster, and RDS database via modular Terraform scripts validated via PR checks."
            }
          }
        ]
      },
      {
        phaseId: 4,
        phaseName: "Phase 4: Kubernetes Orchestration & Observability",
        duration: "Weeks 23 - 30",
        description: "Deploy and manage containerized microservices at scale with Kubernetes, Prometheus metrics, and Grafana dashboards.",
        milestones: [
          {
            id: "cd-4-1",
            title: "Kubernetes Deployments, Ingress, Services & Helm Charts",
            description: "Pods, Deployments, StatefulSets, ClusterIP, Ingress controllers, ConfigMaps, Secrets, and Helm package packaging.",
            skillsCovered: ["Kubernetes", "Helm", "Container Orchestration"],
            resources: [
              { title: "Kubernetes The Hard Way (Kelsey Hightower)", type: "Hands-on Guide", url: "https://github.com/kelseyhightower/kubernetes-the-hard-way" }
            ],
            projectIdea: {
              title: "Production Kubernetes Microservices Cluster with Grafana",
              brief: "Deploy multi-service app with Helm, zero-downtime rolling updates, Horizontal Pod Autoscaling (HPA), and Grafana alerts."
            }
          }
        ]
      }
    ]
  },
  {
    id: "cybersecurity-analyst",
    title: "Cybersecurity Analyst & Ethical Hacker",
    category: "Information Security",
    icon: "ShieldAlert",
    badge: "Mission Critical",
    shortDescription: "Protect critical enterprise digital assets, detect intrusions, conduct penetration testing, and enforce zero-trust security.",
    marketDemand: "Very High",
    difficulty: "Advanced",
    typicalDegree: ["Cybersecurity", "Computer Science", "Information Security", "Network Engineering"],
    salaryRanges: {
      entry: "$82,000 / ₹7 - 12 LPA",
      mid: "$128,000 / ₹17 - 28 LPA",
      senior: "$175,000+ / ₹35 - 60+ LPA"
    },
    topCompanies: ["Palo Alto Networks", "CrowdStrike", "Mandiant / Google", "Cisco", "Cloudflare", "Rapid7", "Defense Agencies"],
    coreSkills: [
      { name: "Computer Networking (TCP/IP, Wireshark)", weight: 20, minLevel: "Advanced", category: "Networking" },
      { name: "Operating Systems Security (Linux/Windows)", weight: 15, minLevel: "Intermediate", category: "OS" },
      { name: "Web Application Security (OWASP Top 10)", weight: 20, minLevel: "Intermediate", category: "AppSec" },
      { name: "SIEM & Log Analysis (Splunk / Elastic)", weight: 15, minLevel: "Intermediate", category: "SOC" },
      { name: "Python / Bash for Security Scripting", weight: 15, minLevel: "Intermediate", category: "Scripting" },
      { name: "Penetration Testing Tools (Burp Suite, Nmap)", weight: 15, minLevel: "Intermediate", category: "Tools" }
    ],
    optionalSkills: [
      { name: "Cryptography & PKI", category: "Security" },
      { name: "Cloud Security (AWS Security Hub)", category: "Cloud" },
      { name: "Reverse Engineering (Ghidra)", category: "Malware" },
      { name: "CompTIA Security+ / CEH", category: "Cert" }
    ],
    roadmapPhases: [
      {
        phaseId: 1,
        phaseName: "Phase 1: Networking Protocols & Packet Inspection",
        duration: "Weeks 1 - 6",
        description: "Master OSI model, TCP handshakes, subnetting, DNS spoofing, Wireshark packet capture analysis, and firewalls.",
        milestones: [
          {
            id: "sec-1-1",
            title: "Network Protocol Analysis & Packet Sniffing",
            description: "Analyze pcap captures, diagnose man-in-the-middle attacks, analyze DNS tunneling, and understand ARP poisoning.",
            skillsCovered: ["Wireshark", "TCP/IP", "Network Analysis"],
            resources: [
              { title: "Wireshark Official Documentation & Tutorials", type: "Tutorial", url: "https://www.wireshark.org/docs/" }
            ],
            projectIdea: {
              title: "Network Traffic Anomaly & Port Scan Detector",
              brief: "Python script using Scapy that sniffs live network packets and triggers alerts upon detecting SYN flood or port scan attempts."
            }
          }
        ]
      },
      {
        phaseId: 2,
        phaseName: "Phase 2: Web App Penetration Testing (OWASP Top 10)",
        duration: "Weeks 7 - 14",
        description: "Perform vulnerability assessments for SQL Injection, Cross-Site Scripting (XSS), CSRF, IDOR, and SSRF.",
        milestones: [
          {
            id: "sec-2-1",
            title: "Burp Suite & Web Exploit Methodology",
            description: "Intercept HTTP traffic, automate fuzzing, exploit broken access controls, and craft secure remediation patches.",
            skillsCovered: ["Burp Suite", "OWASP Top 10", "Web Pentesting"],
            resources: [
              { title: "PortSwigger Web Security Academy", type: "Free Interactive Labs", url: "https://portswigger.net/web-security" }
            ],
            projectIdea: {
              title: "Vulnerability Assessment & Audit Report on Vulnerable App",
              brief: "Audit an intentional vulnerable web app (DVWA/Juice Shop), document findings with CVSS scores, proof-of-concept exploits, and fixes."
            }
          }
        ]
      },
      {
        phaseId: 3,
        phaseName: "Phase 3: SOC Operations, SIEM & Incident Response",
        duration: "Weeks 15 - 22",
        description: "Deploy SIEM tools (Splunk, Wazuh, ELK), ingest endpoint logs, detect brute-force attacks, and execute incident response playbooks.",
        milestones: [
          {
            id: "sec-3-1",
            title: "SIEM Ingestion, Threat Hunting & Alert Rules",
            description: "Write Splunk SPL / Elastic KQL queries, configure alert triggers for privilege escalation, and map threats to MITRE ATT&CK.",
            skillsCovered: ["SIEM", "Splunk", "Incident Response", "MITRE ATT&CK"],
            resources: [
              { title: "TryHackMe: SOC Level 1 Pathway", type: "Interactive Labs", url: "https://tryhackme.com/path/outline/soclevel1" }
            ],
            projectIdea: {
              title: "Home Security Lab with Wazuh SIEM & Active Response",
              brief: "Set up Wazuh SIEM agent on Ubuntu/Windows VMs, simulate attack vectors, and trigger automated IP blocking upon detection."
            }
          }
        ]
      }
    ]
  },
  {
    id: "ui-ux-designer",
    title: "UI/UX Designer & Product Designer",
    category: "Design & Product",
    icon: "Palette",
    badge: "Creative Tech",
    shortDescription: "Design intuitive digital experiences, design systems, interactive prototypes, and lead user research to solve product problems.",
    marketDemand: "High",
    difficulty: "Moderate",
    typicalDegree: ["Design / HCI", "Computer Science", "Media & Arts", "Information Systems"],
    salaryRanges: {
      entry: "$78,000 / ₹6 - 11 LPA",
      mid: "$115,000 / ₹15 - 25 LPA",
      senior: "$165,000+ / ₹30 - 50+ LPA"
    },
    topCompanies: ["Apple", "Airbnb", "Figma", "Spotify", "Linear", "Notion", "Uber"],
    coreSkills: [
      { name: "Figma (Auto Layout, Variants, Variables)", weight: 25, minLevel: "Advanced", category: "Design Tool" },
      { name: "User Research & Usability Testing", weight: 20, minLevel: "Intermediate", category: "Research" },
      { name: "Wireframing & Prototyping", weight: 20, minLevel: "Advanced", category: "UX" },
      { name: "Design Systems & Token Architecture", weight: 15, minLevel: "Intermediate", category: "UI" },
      { name: "Information Architecture & User Journeys", weight: 10, minLevel: "Intermediate", category: "UX" },
      { name: "HTML/CSS Basics for Designers", weight: 10, minLevel: "Beginner", category: "Code" }
    ],
    optionalSkills: [
      { name: "Micro-interactions & Framer Motion", category: "Interaction" },
      { name: "Accessibility (WCAG 2.2)", category: "Compliance" },
      { name: "Storyboarding & Personas", category: "Research" }
    ],
    roadmapPhases: [
      {
        phaseId: 1,
        phaseName: "Phase 1: UX Principles & User Research Foundations",
        duration: "Weeks 1 - 6",
        description: "User interviews, surveys, persona creation, journey mapping, and usability heuristics (Nielsen Norman).",
        milestones: [
          {
            id: "ux-1-1",
            title: "User Empathy, Problem Discovery & Research Synthesis",
            description: "Conduct 5+ user interviews, synthesize affinity maps, define problem statements (How Might We), and map user flows.",
            skillsCovered: ["User Research", "Affinity Mapping", "User Flows"],
            resources: [
              { title: "Nielsen Norman Group UX Articles", type: "Articles", url: "https://www.nngroup.com/articles/" }
            ],
            projectIdea: {
              title: "Mental Wellness & Habit Tracking Case Study",
              brief: "Identify habit formation pain points via user surveys, synthesize findings into personas, and document end-to-end journey maps."
            }
          }
        ]
      },
      {
        phaseId: 2,
        phaseName: "Phase 2: Figma Mastery, Wireframing & UI Aesthetics",
        duration: "Weeks 7 - 14",
        description: "Master Auto Layout 5.0, typography scales, color theory, component properties, and high-fidelity wireframing.",
        milestones: [
          {
            id: "ux-2-1",
            title: "Advanced Figma Component Architecture & Variables",
            description: "Build adaptive components, nested variants, interactive button states, and scalable design token modes (Light/Dark).",
            skillsCovered: ["Figma", "Design Tokens", "Typography", "Color Theory"],
            resources: [
              { title: "Figma Community & Official Tutorials", type: "Tutorial", url: "https://www.figma.com/resources/learn-figma/" }
            ],
            projectIdea: {
              title: "FinTech Mobile Banking High-Fidelity UI",
              brief: "Craft a 20+ screen mobile app interface with micro-interactions, dark mode toggle, and clickable interactive prototype."
            }
          }
        ]
      },
      {
        phaseId: 3,
        phaseName: "Phase 3: Design Systems & Portfolio Showcase",
        duration: "Weeks 15 - 20",
        description: "Create a complete multi-brand design system with accessible contrast guidelines and publish a case-study portfolio.",
        milestones: [
          {
            id: "ux-3-1",
            title: "Complete Design System & Comprehensive Case Study",
            description: "Document component specifications, spacing guidelines, accessible color tokens, and publish a compelling Notion/Web portfolio.",
            skillsCovered: ["Design System", "Case Study Writing", "Portfolio"],
            resources: [
              { title: "Design Systems Repo", type: "Inspiration", url: "https://designsystemsrepo.com/" }
            ],
            projectIdea: {
              title: "Cross-Platform SaaS Design System (Nebula UI)",
              brief: "Document 40+ components with WCAG AAA accessibility, auto-layout responsiveness, and interactive playground."
            }
          }
        ]
      }
    ]
  },
  {
    id: "mobile-developer",
    title: "Mobile App Developer (Flutter / React Native / iOS)",
    category: "Mobile Engineering",
    icon: "Smartphone",
    badge: "High Consumer Reach",
    shortDescription: "Build blazing-fast, cross-platform or native mobile applications with intuitive gestures, offline storage, and push notifications.",
    marketDemand: "High",
    difficulty: "Moderate",
    typicalDegree: ["Computer Science", "Information Technology", "Software Engineering"],
    salaryRanges: {
      entry: "$80,000 / ₹7 - 12 LPA",
      mid: "$122,000 / ₹16 - 27 LPA",
      senior: "$170,000+ / ₹34 - 55+ LPA"
    },
    topCompanies: ["Uber", "Instagram", "Airbnb", "DoorDash", "Duolingo", "Robinhood", "Spotify"],
    coreSkills: [
      { name: "Flutter & Dart OR React Native", weight: 25, minLevel: "Intermediate", category: "Framework" },
      { name: "Mobile UI State Management (Bloc / Redux)", weight: 15, minLevel: "Intermediate", category: "State" },
      { name: "REST APIs & Offline Caching (SQLite / Hive)", weight: 15, minLevel: "Intermediate", category: "Data" },
      { name: "App Store & Play Store Deployment", weight: 15, minLevel: "Intermediate", category: "Publishing" },
      { name: "Mobile Device Hardware APIs (GPS, Camera, Push)", weight: 15, minLevel: "Intermediate", category: "APIs" },
      { name: "Git & Version Control", weight: 15, minLevel: "Intermediate", category: "Tools" }
    ],
    optionalSkills: [
      { name: "Swift / SwiftUI (iOS Native)", category: "Native iOS" },
      { name: "Kotlin (Android Native)", category: "Native Android" },
      { name: "Firebase (Auth, Firestore, Cloud Messaging)", category: "Backend" }
    ],
    roadmapPhases: [
      {
        phaseId: 1,
        phaseName: "Phase 1: Mobile UI Architecture & Framework Core",
        duration: "Weeks 1 - 8",
        description: "Widget trees or React Native flexbox, screen navigation, touch events, and local device state.",
        milestones: [
          {
            id: "mob-1-1",
            title: "Cross-Platform Screen Layouts & State Fundamentals",
            description: "Build fluid responsive views for phones and tablets, implement custom animations, and handle orientation changes.",
            skillsCovered: ["React Native / Flutter", "Mobile UI", "Navigation"],
            resources: [
              { title: "React Native Official Getting Started", type: "Documentation", url: "https://reactnative.dev/docs/getting-started" }
            ],
            projectIdea: {
              title: "Fitness & Workout Routine Tracker App",
              brief: "Log daily exercise sets, track timer intervals with audio cues, and display weekly streaks using local storage."
            }
          }
        ]
      },
      {
        phaseId: 2,
        phaseName: "Phase 2: Hardware Integrations, Offline Sync & Store Release",
        duration: "Weeks 9 - 18",
        description: "Integrate camera feeds, GPS geolocation, push notifications, offline SQLite sync, and compile APK/IPA bundles.",
        milestones: [
          {
            id: "mob-2-1",
            title: "Hardware Features, Background Services & App Release",
            description: "Implement biometric FaceID/Fingerprint authentication, background location tracking, and store release checklists.",
            skillsCovered: ["Push Notifications", "SQLite Offline Storage", "App Store Publishing"],
            resources: [
              { title: "Google Play Console Launch Guide", type: "Guide", url: "https://developer.android.com/distribute" }
            ],
            projectIdea: {
              title: "Local Travel & Food Discovery Guide",
              brief: "Map-based restaurant explorer with GPS radius search, offline bookmarks, camera review uploads, and push notifications."
            }
          }
        ]
      }
    ]
  },
  {
    id: "ai-product-manager",
    title: "AI Product Manager & Technical PM",
    category: "Product & Strategy",
    icon: "Briefcase",
    badge: "Leadership Track",
    shortDescription: "Bridge cutting-edge artificial intelligence capabilities with customer needs, market strategy, and engineering execution.",
    marketDemand: "Very High",
    difficulty: "Moderate to Advanced",
    typicalDegree: ["Engineering + MBA", "Computer Science", "Information Systems", "Business Technology"],
    salaryRanges: {
      entry: "$95,000 / ₹10 - 16 LPA",
      mid: "$145,000 / ₹22 - 38 LPA",
      senior: "$210,000+ / ₹45 - 75+ LPA"
    },
    topCompanies: ["Microsoft", "Google", "Salesforce", "Atlassian", "Adobe", "Amazon", "OpenAI"],
    coreSkills: [
      { name: "Product Roadmap & PRD Writing", weight: 20, minLevel: "Advanced", category: "Product" },
      { name: "AI/ML Literacy & LLM Capabilities", weight: 20, minLevel: "Intermediate", category: "Technical" },
      { name: "Agile, Scrum & Sprint Management", weight: 15, minLevel: "Advanced", category: "Process" },
      { name: "Customer Discovery & User Interviews", weight: 15, minLevel: "Intermediate", category: "Strategy" },
      { name: "Product Analytics (Mixpanel, Amplitude)", weight: 15, minLevel: "Intermediate", category: "Analytics" },
      { name: "Financial Modeling & Unit Economics", weight: 15, minLevel: "Beginner", category: "Business" }
    ],
    optionalSkills: [
      { name: "Figma Prototyping", category: "Design" },
      { name: "SQL for Product Managers", category: "Data" },
      { name: "A/B Testing Frameworks", category: "Growth" }
    ],
    roadmapPhases: [
      {
        phaseId: 1,
        phaseName: "Phase 1: PRDs, Market Sizing & Problem Discovery",
        duration: "Weeks 1 - 6",
        description: "Write rigorous Product Requirements Documents (PRDs), calculate Total Addressable Market (TAM), and build user personas.",
        milestones: [
          {
            id: "pm-1-1",
            title: "Comprehensive PRD & Feature Prioritization Matrix",
            description: "Apply RICE and MoSCoW prioritization frameworks, map user journeys, write acceptance criteria, and define success metrics.",
            skillsCovered: ["PRD Writing", "RICE Prioritization", "OKRs"],
            resources: [
              { title: "Lenny's Newsletter Product Management Guides", type: "Articles", url: "https://www.lennysnewsletter.com/" }
            ],
            projectIdea: {
              title: "AI Customer Support Copilot PRD & Spec",
              brief: "Comprehensive PRD specifying AI deflection rate, escalation thresholds, fallback logic, latency SLAs, and sprint epics."
            }
          }
        ]
      }
    ]
  }
];
