"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const automationService_js_1 = require("../services/automationService.js");
const db_js_1 = require("../database/db.js");
const router = (0, express_1.Router)();
// GET /api/automation/logs
router.get('/logs', (req, res) => {
    try {
        const logs = db_js_1.db.getAutomationLogs();
        res.json({ success: true, logs });
    }
    catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});
// POST /api/automation/analyze
router.post('/analyze', async (req, res) => {
    try {
        const result = await automationService_js_1.automationService.triggerEvent('ANALYZE', req.body);
        res.json(result);
    }
    catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});
// POST /api/automation/generate
router.post('/generate', async (req, res) => {
    try {
        const result = await automationService_js_1.automationService.triggerEvent('GENERATE', req.body);
        res.json(result);
    }
    catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});
// POST /api/automation/schedule
router.post('/schedule', async (req, res) => {
    try {
        const result = await automationService_js_1.automationService.triggerEvent('SCHEDULE', req.body);
        res.json(result);
    }
    catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});
// POST /api/automation/performance
router.post('/performance', async (req, res) => {
    try {
        const result = await automationService_js_1.automationService.triggerEvent('PERFORMANCE', req.body);
        res.json(result);
    }
    catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});
// POST /api/automation/learning
router.post('/learning', async (req, res) => {
    try {
        const result = await automationService_js_1.automationService.triggerEvent('LEARNING', req.body);
        res.json(result);
    }
    catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});
exports.default = router;
