import { Router } from 'express';
import { aiService } from '../services/aiService';

const router = Router();

// GET /api/health
router.get('/', (req, res) => {
  res.json({
    status: 'HEALTHY',
    service: 'CreatorPilot Autonomous AI Content Growth Agent',
    timestamp: new Date().toISOString(),
    demoMode: aiService.isDemo(),
    n8nWebhookConfigured: Boolean(process.env.N8N_WEBHOOK_URL)
  });
});

export default router;
