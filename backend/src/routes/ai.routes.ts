import { Router } from 'express';
import { db } from '../database/db';
import { aiService } from '../services/aiService';
import { growthEngineService } from '../services/growthEngineService';

const router = Router();

// POST /api/ai/analyze
router.post('/analyze', async (req, res) => {
  try {
    const creator = db.getCreator();
    const performance = db.getPerformance();
    const result = await aiService.analyzeAndDecide(creator, performance);
    res.json({ success: true, result, isDemoMode: aiService.isDemo() });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// POST /api/ai/generate-content
router.post('/generate-content', async (req, res) => {
  try {
    const { topic, platform, format, tone, audience, goal } = req.body;
    const creator = db.getCreator();

    const packageResult = await aiService.generateContentPackage(
      topic || '5 AI Tools Every College Student Should Know',
      platform || creator.mainPlatform,
      format || 'REEL',
      tone || creator.brandTone,
      audience || creator.targetAudience,
      goal || creator.growthGoal
    );

    res.json({ success: true, contentPackage: packageResult, isDemoMode: aiService.isDemo() });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// POST /api/ai/learning
router.post('/learning', async (req, res) => {
  try {
    const performance = db.getPerformance();
    const learningResult = await aiService.analyzePerformanceAndLearn(performance);
    res.json({ success: true, learning: learningResult, isDemoMode: aiService.isDemo() });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// POST /api/ai/run-growth-cycle (The complete 12-step autonomous hackathon loop)
router.post('/run-growth-cycle', async (req, res) => {
  try {
    const result = await growthEngineService.runFullGrowthCycle();
    res.json({
      success: true,
      message: 'AI Growth Cycle Completed ✓',
      isDemoMode: aiService.isDemo(),
      ...result
    });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
});

export default router;
