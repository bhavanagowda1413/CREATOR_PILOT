"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const db_js_1 = require("../database/db.js");
const aiService_js_1 = require("../services/aiService.js");
const growthEngineService_js_1 = require("../services/growthEngineService.js");
const router = (0, express_1.Router)();
// POST /api/ai/analyze
router.post('/analyze', async (req, res) => {
    try {
        const creator = db_js_1.db.getCreator();
        const performance = db_js_1.db.getPerformance();
        const result = await aiService_js_1.aiService.analyzeAndDecide(creator, performance);
        res.json({ success: true, result, isDemoMode: aiService_js_1.aiService.isDemo() });
    }
    catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});
// POST /api/ai/generate-content
router.post('/generate-content', async (req, res) => {
    try {
        const { topic, platform, format, tone, audience, goal } = req.body;
        const creator = db_js_1.db.getCreator();
        const packageResult = await aiService_js_1.aiService.generateContentPackage(topic || '5 AI Tools Every College Student Should Know', platform || creator.mainPlatform, format || 'REEL', tone || creator.brandTone, audience || creator.targetAudience, goal || creator.growthGoal);
        res.json({ success: true, contentPackage: packageResult, isDemoMode: aiService_js_1.aiService.isDemo() });
    }
    catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});
// POST /api/ai/learning
router.post('/learning', async (req, res) => {
    try {
        const performance = db_js_1.db.getPerformance();
        const learningResult = await aiService_js_1.aiService.analyzePerformanceAndLearn(performance);
        res.json({ success: true, learning: learningResult, isDemoMode: aiService_js_1.aiService.isDemo() });
    }
    catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});
// POST /api/ai/run-growth-cycle (The complete 12-step autonomous hackathon loop)
router.post('/run-growth-cycle', async (req, res) => {
    try {
        const result = await growthEngineService_js_1.growthEngineService.runFullGrowthCycle();
        res.json({
            success: true,
            message: 'AI Growth Cycle Completed ✓',
            isDemoMode: aiService_js_1.aiService.isDemo(),
            ...result
        });
    }
    catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});
exports.default = router;
