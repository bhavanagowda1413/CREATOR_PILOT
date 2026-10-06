"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const aiService_js_1 = require("../services/aiService.js");
const router = (0, express_1.Router)();
// GET /api/health
router.get('/', (req, res) => {
    res.json({
        status: 'HEALTHY',
        service: 'CreatorPilot Autonomous AI Content Growth Agent',
        timestamp: new Date().toISOString(),
        demoMode: aiService_js_1.aiService.isDemo(),
        n8nWebhookConfigured: Boolean(process.env.N8N_WEBHOOK_URL)
    });
});
exports.default = router;
