"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const db_js_1 = require("../database/db.js");
const router = (0, express_1.Router)();
// GET /api/creator
router.get('/', (req, res) => {
    try {
        const creator = db_js_1.db.getCreator();
        res.json({ success: true, creator });
    }
    catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});
// PUT /api/creator
router.put('/', (req, res) => {
    try {
        const updated = db_js_1.db.updateCreator(req.body);
        res.json({ success: true, creator: updated, message: 'Creator profile updated successfully.' });
    }
    catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});
exports.default = router;
