import { Router } from 'express';
import { db } from '../database/db';

const router = Router();

// GET /api/content
router.get('/', (req, res) => {
  try {
    const content = db.getContent();
    res.json({ success: true, content });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// POST /api/content
router.post('/', (req, res) => {
  try {
    const newContent = db.addContent(req.body);
    res.json({ success: true, content: newContent, message: 'Content item created successfully.' });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// PUT /api/content/:id
router.put('/:id', (req, res) => {
  try {
    const updated = db.updateContent(req.params.id, req.body);
    if (!updated) {
      return res.status(404).json({ success: false, error: 'Content item not found.' });
    }
    res.json({ success: true, content: updated, message: 'Content updated successfully.' });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// DELETE /api/content/:id
router.delete('/:id', (req, res) => {
  try {
    const deleted = db.deleteContent(req.params.id);
    res.json({ success: deleted, message: deleted ? 'Content deleted' : 'Content item not found' });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
});

export default router;
