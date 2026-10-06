import { Router } from 'express';
import { db } from '../database/db';

const router = Router();

// GET /api/analytics
router.get('/', (req, res) => {
  try {
    const performance = db.getPerformance();
    const totalViews = performance.reduce((sum, p) => sum + p.views, 0);
    const totalLikes = performance.reduce((sum, p) => sum + p.likes, 0);
    const totalComments = performance.reduce((sum, p) => sum + p.comments, 0);
    const totalShares = performance.reduce((sum, p) => sum + p.shares, 0);
    const totalSaves = performance.reduce((sum, p) => sum + p.saves, 0);
    const avgEngagement = performance.length
      ? Number((performance.reduce((sum, p) => sum + p.engagementRate, 0) / performance.length).toFixed(1))
      : 0;

    // Category distribution breakdown
    const categoryMap: { [key: string]: { views: number; saves: number; count: number } } = {};
    performance.forEach(p => {
      if (!categoryMap[p.category]) {
        categoryMap[p.category] = { views: 0, saves: 0, count: 0 };
      }
      categoryMap[p.category].views += p.views;
      categoryMap[p.category].saves += p.saves;
      categoryMap[p.category].count += 1;
    });

    const categoryBreakdown = Object.keys(categoryMap).map(cat => ({
      category: cat,
      views: categoryMap[cat].views,
      saves: categoryMap[cat].saves,
      avgEngagement: Number((categoryMap[cat].views / (categoryMap[cat].count * 1000)).toFixed(1))
    }));

    // Performance over time
    const performanceOverTime = performance.map(p => ({
      date: new Date(p.recordedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      topic: p.topic,
      views: p.views,
      saves: p.saves,
      engagementRate: p.engagementRate
    }));

    res.json({
      success: true,
      summary: {
        totalViews,
        totalLikes,
        totalComments,
        totalShares,
        totalSaves,
        avgEngagement,
        totalPostsPublished: performance.length,
        isDemoData: true
      },
      categoryBreakdown,
      performanceOverTime,
      rawMetrics: performance
    });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
});

export default router;
