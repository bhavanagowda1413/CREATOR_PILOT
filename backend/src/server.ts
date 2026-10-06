import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import creatorRoutes from './routes/creator.routes';
import contentRoutes from './routes/content.routes';
import analyticsRoutes from './routes/analytics.routes';
import recommendationsRoutes from './routes/recommendations.routes';
import aiRoutes from './routes/ai.routes';
import automationRoutes from './routes/automation.routes';
import learningRoutes from './routes/learning.routes';
import healthRoutes from './routes/health.routes';
import { db } from './database/db';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json({ limit: '10mb' }));

// Health Check
app.use('/api/health', healthRoutes);

// Feature Endpoints
app.use('/api/creator', creatorRoutes);
app.use('/api/content', contentRoutes);
app.use('/api/analytics', analyticsRoutes);
app.use('/api/recommendations', recommendationsRoutes);
app.use('/api/ai', aiRoutes);
app.use('/api/automation', automationRoutes);
app.use('/api/learnings', learningRoutes);

// Reset demo state endpoint
app.post('/api/reset-demo', (req, res) => {
  db.resetToDemoDefaults();
  res.json({ success: true, message: 'Database reset to default Bhavana demo state.' });
});

app.listen(PORT, () => {
  console.log(`=======================================================`);
  console.log(`🤖 CreatorPilot Backend Server running on port ${PORT}`);
  console.log(`⚡ Mode: ${process.env.DEMO_MODE === 'false' ? 'LIVE AI MODE' : 'DEMO MODE'}`);
  console.log(`=======================================================`);
});
