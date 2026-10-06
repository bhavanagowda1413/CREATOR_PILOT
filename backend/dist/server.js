"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const creator_routes_js_1 = __importDefault(require("./routes/creator.routes.js"));
const content_routes_js_1 = __importDefault(require("./routes/content.routes.js"));
const analytics_routes_js_1 = __importDefault(require("./routes/analytics.routes.js"));
const recommendations_routes_js_1 = __importDefault(require("./routes/recommendations.routes.js"));
const ai_routes_js_1 = __importDefault(require("./routes/ai.routes.js"));
const automation_routes_js_1 = __importDefault(require("./routes/automation.routes.js"));
const learning_routes_js_1 = __importDefault(require("./routes/learning.routes.js"));
const health_routes_js_1 = __importDefault(require("./routes/health.routes.js"));
const db_js_1 = require("./database/db.js");
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 5000;
app.use((0, cors_1.default)());
app.use(express_1.default.json({ limit: '10mb' }));
// Health Check
app.use('/api/health', health_routes_js_1.default);
// Feature Endpoints
app.use('/api/creator', creator_routes_js_1.default);
app.use('/api/content', content_routes_js_1.default);
app.use('/api/analytics', analytics_routes_js_1.default);
app.use('/api/recommendations', recommendations_routes_js_1.default);
app.use('/api/ai', ai_routes_js_1.default);
app.use('/api/automation', automation_routes_js_1.default);
app.use('/api/learnings', learning_routes_js_1.default);
// Reset demo state endpoint
app.post('/api/reset-demo', (req, res) => {
    db_js_1.db.resetToDemoDefaults();
    res.json({ success: true, message: 'Database reset to default Bhavana demo state.' });
});
app.listen(PORT, () => {
    console.log(`=======================================================`);
    console.log(`🤖 CreatorPilot Backend Server running on port ${PORT}`);
    console.log(`⚡ Mode: ${process.env.DEMO_MODE === 'false' ? 'LIVE AI MODE' : 'DEMO MODE'}`);
    console.log(`=======================================================`);
});
