"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const db_js_1 = require("../database/db.js");
const aiService_js_1 = require("../services/aiService.js");
const router = (0, express_1.Router)();
// GET /api/recommendations
router.get('/', (req, res) => {
    try {
        const recommendations = db_js_1.db.getRecommendations();
        res.json({ success: true, recommendations });
    }
    catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});
// POST /api/recommendations/generate
router.post('/generate', async (req, res) => {
    try {
        const creator = db_js_1.db.getCreator();
        const performance = db_js_1.db.getPerformance();
        const decision = await aiService_js_1.aiService.analyzeAndDecide(creator, performance);
        const recommendation = db_js_1.db.addRecommendation({
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
            isDemoMode: aiService_js_1.aiService.isDemo(),
            message: 'New AI content decision generated successfully.'
        });
    }
    catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});
exports.default = router;
