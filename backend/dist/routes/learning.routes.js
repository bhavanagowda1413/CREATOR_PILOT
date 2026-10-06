"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const db_js_1 = require("../database/db.js");
const router = (0, express_1.Router)();
// GET /api/learnings
router.get('/', (req, res) => {
    try {
        const learnings = db_js_1.db.getLearnings();
        res.json({ success: true, learnings });
    }
    catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});
exports.default = router;
