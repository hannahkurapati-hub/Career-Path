export const interviewQuestions = [
  {
    id: "q-1",
    roleCategory: "fullstack-developer",
    roleName: "Full Stack Web Developer",
    category: "Technical / Frontend",
    difficulty: "Medium",
    question: "Explain the Virtual DOM in React and how the reconciliation algorithm (Fiber) optimizes rendering performance.",
    answer: "The Virtual DOM is an in-memory lightweight representation of the actual browser DOM. When a component's state or props change, React generates a new Virtual DOM tree and diffs it with the previous snapshot (reconciliation). With the React Fiber engine, reconciliation is incremental: React splits rendering work into chunks and can pause, abort, or prioritize work (like user input animations) over off-screen components before flushing updates to the real DOM.",
    keyTakeaway: "Mention diffing algorithm (O(n) heuristic), batching, and Fiber scheduler prioritization.",
    frequentlyAskedAt: ["Google", "Meta", "Amazon", "Uber"]
  },
  {
    id: "q-2",
    roleCategory: "fullstack-developer",
    roleName: "Full Stack Web Developer",
    category: "Technical / Backend",
    difficulty: "Hard",
    question: "How would you design and implement JWT authentication with Refresh Tokens and mitigate XSS / CSRF vulnerabilities?",
    answer: "A secure JWT pattern uses two tokens: a short-lived Access Token (15 mins) and a long-lived Refresh Token (7 days). Store the Access Token in memory or secure context, and the Refresh Token in an HttpOnly, Secure, SameSite=Strict cookie so JavaScript cannot access it (preventing XSS theft). To guard against CSRF on state-changing endpoints, use SameSite cookies, CSRF tokens, and verify Origin headers. Rotate refresh tokens upon each use to detect token reuse attacks.",
    keyTakeaway: "Always explain HttpOnly cookie storage, short expiration, token rotation, and SameSite policies.",
    frequentlyAskedAt: ["Stripe", "Coinbase", "Shopify"]
  },
  {
    id: "q-3",
    roleCategory: "fullstack-developer",
    roleName: "Full Stack Web Developer",
    category: "System Design",
    difficulty: "Hard",
    question: "How would you scale a web application handling 50,000 concurrent WebSocket connections for a live chat feature?",
    answer: "A single Node.js process cannot easily hold 50k sockets due to single-threaded event loop and memory constraints. 1) Run multiple server instances behind a load balancer supporting sticky sessions / WebSocket upgrading. 2) Use a Redis Pub/Sub or Apache Kafka cluster as the message broker bus across instances. 3) Store chat history asynchronously in a distributed database like Cassandra or PostgreSQL with read-replicas. 4) Heartbeat/ping-pong checks to prune dead connections.",
    keyTakeaway: "Pub/Sub bus with Redis, load balancer sticky sessions, and horizontal scaling.",
    frequentlyAskedAt: ["Discord", "Slack", "Atlassian"]
  },
  {
    id: "q-4",
    roleCategory: "ai-ml-engineer",
    roleName: "AI & Machine Learning Engineer",
    category: "Core ML",
    difficulty: "Medium",
    question: "What is the Bias-Variance tradeoff, and how do techniques like Regularization and Ensemble methods address it?",
    answer: "Bias is error from erroneous assumptions in the learning algorithm (underfitting, high bias). Variance is error from sensitivity to small fluctuations in the training set (overfitting, high variance). L1 (Lasso) and L2 (Ridge) regularization add penalty terms to the loss function to constrain model complexity, lowering variance. Bagging (e.g. Random Forest) reduces variance by averaging diverse decorrelated models, while Boosting (e.g. XGBoost) incrementally reduces bias.",
    keyTakeaway: "Connect high bias to underfitting and high variance to overfitting; explain how L1 promotes sparsity.",
    frequentlyAskedAt: ["Google", "DeepMind", "Microsoft"]
  },
  {
    id: "q-5",
    roleCategory: "ai-ml-engineer",
    roleName: "AI & Machine Learning Engineer",
    category: "Generative AI",
    difficulty: "Hard",
    question: "Explain the architecture of Retrieval-Augmented Generation (RAG) and how you mitigate hallucinations in LLMs.",
    answer: "RAG combines parametric memory (LLM weights) with non-parametric external knowledge. The workflow: 1) Documents are chunked (e.g. 500 tokens with 50-token overlap) and embedded via an embedding model (e.g. text-embedding-3-small). 2) Embeddings are stored in a Vector DB with HNSW indexing. 3) When a query arrives, it is embedded and top-k semantically relevant chunks are retrieved. 4) A synthesis prompt with context and instructions is passed to the LLM. Hallucinations are reduced by enforcing strict prompt constraints ('Only answer from the provided context'), cross-encoder re-ranking, and citing source chunk IDs.",
    keyTakeaway: "Chunking, vector similarity, re-ranking, and strict context grounding with citations.",
    frequentlyAskedAt: ["OpenAI", "Anthropic", "Scale AI"]
  },
  {
    id: "q-6",
    roleCategory: "cloud-devops",
    roleName: "Cloud Architect & DevOps Engineer",
    category: "Infrastructure",
    difficulty: "Hard",
    question: "What is the difference between Blue-Green Deployment, Canary Deployment, and Rolling Updates in Kubernetes?",
    answer: "1) Rolling Update: Gradually replaces old pods with new pods one by one. Zero downtime, but two versions of the app run simultaneously. 2) Blue-Green: Two identical environments exist (Blue = active live, Green = new version). Once Green is tested and ready, router/balancer traffic switches 100% instantly to Green. Instant rollback, but requires 2x infrastructure resources. 3) Canary: Routes a tiny percentage of live user traffic (e.g. 5%) to the new version to monitor error rates and latency before gradually rolling it out to 100%.",
    keyTakeaway: "Cost vs risk tradeoff: Blue-Green needs duplicate capacity; Canary needs observability metrics.",
    frequentlyAskedAt: ["AWS", "Netflix", "Datadog"]
  },
  {
    id: "q-7",
    roleCategory: "cybersecurity-analyst",
    roleName: "Cybersecurity Analyst & Ethical Hacker",
    category: "Application Security",
    difficulty: "Medium",
    question: "Explain SQL Injection (SQLi) and describe both offensive exploitation and defensive prevention techniques.",
    answer: "SQLi occurs when untrusted user input is directly concatenated into a dynamic SQL query string, allowing an attacker to manipulate the query structure. Offensive payloads like ' OR 1=1 -- bypass logins, while UNION SELECT extracts data from other tables. Defense: 1) Always use Parameterized Queries / Prepared Statements (which treat input strictly as literals, not executable code). 2) Implement ORMs properly. 3) Apply principle of least privilege on database accounts.",
    keyTakeaway: "Never trust user input; parameterized queries are the absolute gold standard defense.",
    frequentlyAskedAt: ["CrowdStrike", "Palo Alto Networks", "Cloudflare"]
  },
  {
    id: "q-8",
    roleCategory: "general",
    roleName: "All Engineering Roles",
    category: "Behavioral / STAR Method",
    difficulty: "Medium",
    question: "Describe a situation where a software project or milestone was falling behind schedule. How did you handle it?",
    answer: "Use the STAR method: 1) Situation: In our 3rd-year semester project, our backend API was 10 days behind due to complex database normalization. 2) Task: As the lead, I needed to ensure our team delivered a working MVP on demo day without burning out team members. 3) Action: I scheduled a triage session, pruned 3 non-essential 'nice-to-have' features, drafted OpenAPI mock specs so the frontend could continue working independently, and paired with the backend member. 4) Result: Delivered the MVP 2 days early with 95% test coverage and received top marks.",
    keyTakeaway: "Demonstrate proactive communication, scope triage, technical empathy, and measurable outcomes.",
    frequentlyAskedAt: ["Amazon (Leadership Principles)", "Google", "Microsoft"]
  }
];
