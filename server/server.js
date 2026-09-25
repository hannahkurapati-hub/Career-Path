import express from 'express';
import cors from 'cors';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

import careerRoutes from './routes/careerRoutes.js';
import profileRoutes from './routes/profileRoutes.js';
import gapAnalysisRoutes from './routes/gapAnalysisRoutes.js';
import interviewRoutes from './routes/interviewRoutes.js';
import resumeRoutes from './routes/resumeRoutes.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// API Request Logger
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl}`);
  next();
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    platform: 'CareerPath API Server',
    version: '1.0.0',
    timestamp: new Date().toISOString()
  });
});

// Mount modular API routes
app.use('/api/careers', careerRoutes);
app.use('/api/profiles', profileRoutes);
app.use('/api/analysis/gap', gapAnalysisRoutes);
app.use('/api/interviews', interviewRoutes);
app.use('/api/resume', resumeRoutes);

// Serve static frontend if client is built
const clientDistPath = path.join(__dirname, '..', 'client', 'dist');
if (fs.existsSync(clientDistPath)) {
  app.use(express.static(clientDistPath));
  app.get('*', (req, res) => {
    if (!req.path.startsWith('/api')) {
      res.sendFile(path.join(clientDistPath, 'index.html'));
    }
  });
}

app.listen(PORT, () => {
  console.log(`🚀 CareerPath API Server running at http://localhost:${PORT}`);
});
