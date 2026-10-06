"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const db_js_1 = require("../database/db.js");
const router = (0, express_1.Router)();
// GET /api/content
router.get('/', (req, res) => {
    try {
        const content = db_js_1.db.getContent();
        res.json({ success: true, content });
    }
    catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});
// POST /api/content
router.post('/', (req, res) => {
    try {
        const newContent = db_js_1.db.addContent(req.body);
        res.json({ success: true, content: newContent, message: 'Content item created successfully.' });
    }
    catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});
// PUT /api/content/:id
router.put('/:id', (req, res) => {
    try {
        const updated = db_js_1.db.updateContent(req.params.id, req.body);
        if (!updated) {
            return res.status(404).json({ success: false, error: 'Content item not found.' });
        }
        res.json({ success: true, content: updated, message: 'Content updated successfully.' });
    }
    catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});
// DELETE /api/content/:id
router.delete('/:id', (req, res) => {
    try {
        const deleted = db_js_1.db.deleteContent(req.params.id);
        res.json({ success: deleted, message: deleted ? 'Content deleted' : 'Content item not found' });
    }
    catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});
exports.default = router;
