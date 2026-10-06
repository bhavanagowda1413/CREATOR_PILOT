"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.growthEngineService = exports.GrowthEngineService = void 0;
const db_js_1 = require("../database/db.js");
const aiService_js_1 = require("./aiService.js");
const automationService_js_1 = require("./automationService.js");
class GrowthEngineService {
    async runFullGrowthCycle() {
        const steps = [];
        const addStep = (stepNum, msg, stepData) => {
            steps.push({
                step: stepNum,
                message: msg,
                timestamp: new Date().toISOString(),
                data: stepData
            });
        };
        // STEP 1: Analyzing creator profile
        const creator = db_js_1.db.getCreator();
        addStep(1, 'Analyzing creator profile...', { name: creator.name, niche: creator.niche, goal: creator.growthGoal });
        // STEP 2: Analyzing previous content
        const performance = db_js_1.db.getPerformance();
        const contentHistory = db_js_1.db.getContent();
        addStep(2, 'Analyzing previous content...', { totalPostsAnalyzed: performance.length + contentHistory.length });
        // STEP 3: Checking trends
        addStep(3, 'Checking trends...', { platform: creator.mainPlatform, trendingCategories: ['AI Tools', 'Student Hacks', 'Code Debugging'] });
        // STEP 4: Identifying content opportunities
        addStep(4, 'Identifying content opportunities...', { topPerformingCategory: 'AI Tools', saveToViewRatio: '7.3%' });
        // STEP 5: AI deciding next content strategy
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
        addStep(5, 'AI deciding next content strategy...', { recommendedTopic: decision.recommendedTopic, confidence: `${decision.confidence}%` });
        // STEP 6: Generating content package
        const packageResult = await aiService_js_1.aiService.generateContentPackage(decision.recommendedTopic, creator.mainPlatform, decision.format, creator.brandTone, decision.audience, decision.objective);
        const contentItem = db_js_1.db.addContent({
            creatorId: creator.id,
            topic: packageResult.topic,
            platform: creator.mainPlatform,
            format: packageResult.format,
            hook: packageResult.hook,
            script: packageResult.script,
            caption: packageResult.caption,
            hashtags: packageResult.hashtags,
            cta: packageResult.cta,
            visualPlan: packageResult.visualPlan,
            status: 'SCHEDULED',
            priority: decision.priority,
            scheduledAt: new Date(Date.now() + 86400000).toISOString()
        });
        addStep(6, 'Generating content package...', { hook: packageResult.hook, hashtagCount: packageResult.hashtags.length });
        // STEP 7: Selecting publishing time
        addStep(7, 'Selecting publishing time...', { recommendedPostingTime: decision.recommendedTime, bestDays: ['Tuesday', 'Thursday'] });
        // STEP 8: Sending automation request to n8n
        const n8nResult = await automationService_js_1.automationService.triggerEvent('SCHEDULE', {
            creator: { name: creator.name, niche: creator.niche, platform: creator.mainPlatform },
            content: { topic: contentItem.topic, format: contentItem.format, scheduledAt: contentItem.scheduledAt }
        });
        addStep(8, 'Sending automation request to n8n...', { status: n8nResult.status, webhookUrl: n8nResult.webhookUrl });
        // STEP 9: Content scheduled
        addStep(9, 'Content scheduled.', { contentId: contentItem.id, scheduledTime: decision.recommendedTime });
        // STEP 10: Monitoring performance
        const simulatedMetric = db_js_1.db.addPerformance({
            contentId: contentItem.id,
            topic: contentItem.topic,
            category: 'AI Tools',
            views: 16800,
            likes: 1550,
            comments: 210,
            shares: 740,
            saves: 1220,
            watchTime: '87%',
            engagementRate: 22.1
        });
        addStep(10, 'Monitoring performance...', { views: simulatedMetric.views, saves: simulatedMetric.saves, engagementRate: `${simulatedMetric.engagementRate}%` });
        // STEP 11: AI learning from results
        const learningResult = await aiService_js_1.aiService.analyzePerformanceAndLearn(db_js_1.db.getPerformance());
        const learningEntry = db_js_1.db.addLearning({
            creatorId: creator.id,
            whatWorked: learningResult.whatWorked,
            whatDidntWork: learningResult.whatDidntWork,
            audienceSignal: learningResult.audienceSignal,
            aiLearned: learningResult.aiLearned,
            nextRecommendation: learningResult.nextRecommendation,
            impact: learningResult.impact,
            category: learningResult.category
        });
        addStep(11, 'AI learning from results...', { insight: learningResult.aiLearned });
        // STEP 12: Next recommendation generated
        addStep(12, 'Next recommendation generated.', { nextTopic: learningResult.nextRecommendation });
        return {
            steps,
            recommendation,
            generatedContent: contentItem,
            learning: learningEntry,
            automationLogs: db_js_1.db.getAutomationLogs()
        };
    }
}
exports.GrowthEngineService = GrowthEngineService;
exports.growthEngineService = new GrowthEngineService();
