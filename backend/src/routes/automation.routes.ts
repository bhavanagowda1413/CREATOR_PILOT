import { Router } from 'express';
import { automationService } from '../services/automationService';
import { db } from '../database/db';

const router = Router();

// GET /api/automation/logs
router.get('/logs', (req, res) => {
  try {
    const logs = db.getAutomationLogs();
    res.json({ success: true, logs });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// POST /api/automation/analyze
router.post('/analyze', async (req, res) => {
  try {
    const result = await automationService.triggerEvent('ANALYZE', req.body);
    res.json(result);
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// POST /api/automation/generate
router.post('/generate', async (req, res) => {
  try {
    const result = await automationService.triggerEvent('GENERATE', req.body);
    res.json(result);
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// POST /api/automation/schedule
router.post('/schedule', async (req, res) => {
  try {
    const result = await automationService.triggerEvent('SCHEDULE', req.body);
    res.json(result);
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// POST /api/automation/performance
router.post('/performance', async (req, res) => {
  try {
    const result = await automationService.triggerEvent('PERFORMANCE', req.body);
    res.json(result);
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// POST /api/automation/learning
router.post('/learning', async (req, res) => {
  try {
    const result = await automationService.triggerEvent('LEARNING', req.body);
    res.json(result);
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
});

export default router;
