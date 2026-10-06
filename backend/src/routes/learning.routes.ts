import { Router } from 'express';
import { db } from '../database/db';

const router = Router();

// GET /api/learnings
router.get('/', (req, res) => {
  try {
    const learnings = db.getLearnings();
    res.json({ success: true, learnings });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
});

export default router;
