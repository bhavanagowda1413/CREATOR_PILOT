import { Router } from 'express';
import { db } from '../database/db';
import { aiService } from '../services/aiService';

const router = Router();

// GET /api/recommendations
router.get('/', (req, res) => {
  try {
    const recommendations = db.getRecommendations();
    res.json({ success: true, recommendations });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// POST /api/recommendations/generate
router.post('/generate', async (req, res) => {
  try {
    const creator = db.getCreator();
    const performance = db.getPerformance();
    const decision = await aiService.analyzeAndDecide(creator, performance);

    const recommendation = db.addRecommendation({
      creatorId: creator.id,
      recommendedTopic: decision.recommendedTopic,
      format: decision.format,
      objective: decision.objective,
      priority: decision.priority,
      confidence: decision.confidence,
      recommendedTime: decision.recommendedTime,
      reasoning: decision.reasoning,
      contentAngle: decision.contentAngle,
      audience: decision.audience,
      contentBrief: decision.contentBrief
    });

    res.json({
      success: true,
      recommendation,
      isDemoMode: aiService.isDemo(),
      message: 'New AI content decision generated successfully.'
    });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
});

export default router;
