import { Router } from 'express';
import { db } from '../database/db';

const router = Router();

// GET /api/creator
router.get('/', (req, res) => {
  try {
    const creator = db.getCreator();
    res.json({ success: true, creator });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// PUT /api/creator
router.put('/', (req, res) => {
  try {
    const updated = db.updateCreator(req.body);
    res.json({ success: true, creator: updated, message: 'Creator profile updated successfully.' });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
});

export default router;
