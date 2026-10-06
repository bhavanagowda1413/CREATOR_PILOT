# CreatorPilot – Autonomous AI Content Growth Agent

> **"CreatorPilot doesn't just create content — it learns what works and autonomously decides what to create next."**

[![Hackathon Project](https://img.shields.io/badge/Hackathon-24hr%20AI%20%2B%20n8n-purple.svg)]()
[![Stack](https://img.shields.io/badge/Stack-React%20%7C%20Node.js%20%7C%20TypeScript%20%7C%20SQLite%20%7C%20n8n-blue.svg)]()
[![Mode](https://img.shields.io/badge/Demo%20Mode-Ready-emerald.svg)]()

---

## 1. Project Overview

**CreatorPilot** is a full-stack, autonomous AI content growth strategist built for content creators. Unlike standard AI tools that function merely as passive caption generators, CreatorPilot operates as an autonomous decision loop:

```
COLLECT → UNDERSTAND → DECIDE → CREATE → SCHEDULE → MEASURE → LEARN → IMPROVE
```

It continuously analyzes creator context, past post performance, audience retention signals, and niche trends to intelligently decide what content should be created next, generates complete structured packages, schedules publishing, monitors results, and updates its strategy continuously.

---

## 2. Problem Statement

> *"Content creators spend a lot of time manually researching trends, analyzing previous posts, understanding audience engagement, deciding what to post, writing captions and hooks, selecting hashtags, and choosing the best time to publish. This information is scattered across multiple sources, making content planning repetitive, time-consuming, and difficult to optimize consistently."*

## 3. Solution

> *"CreatorPilot is an AI-powered autonomous content growth agent built with n8n. It analyzes creator context, previous content performance, audience signals and trend information to intelligently decide what content should be created next. It then generates the content package, recommends or schedules publishing, monitors performance, and learns from the results to improve future content strategies."*

---

## 4. Architecture

```
+---------------------------------------------------------------------------------+
|                                 FRONTEND                                        |
|  React 19 + TypeScript + Vite + Tailwind CSS v4 + Lucide Icons + Recharts       |
|                                                                                 |
|  [Dashboard] [Strategy] [Studio] [Calendar] [Analytics] [AI Learning] [n8n]    |
+----------------------------------------+----------------------------------------+
                                         | REST API (/api/*)
                                         v
+---------------------------------------------------------------------------------+
|                                 BACKEND                                         |
|  Node.js + Express + TypeScript + SQLite DB Store + Gemini AI + n8n Service    |
|                                                                                 |
|  - AIService (Gemini 1.5 Flash + Intelligent DEMO_MODE Fallback)                |
|  - GrowthEngineService (Orchestrates 12-Step Hackathon Loop)                    |
|  - AutomationService (n8n Webhook Dispatcher + Simulation Fallback)             |
|  - DatabaseManager (SQLite Persistence & Seed Engine)                          |
+----------------------------------------+----------------------------------------+
                                         | Webhooks (JSON)
                                         v
+---------------------------------------------------------------------------------+
|                               AUTOMATION / n8n                                  |
|  n8n Workflow Engine (Content Intelligence, Generation, Scheduling, Learning)   |
+---------------------------------------------------------------------------------+
```

---

## 5. Tech Stack

- **Frontend**: React 19, Vite, TypeScript, Tailwind CSS v4, Lucide Icons, Recharts.
- **Backend**: Node.js, Express, TypeScript, SQLite database store.
- **AI Engine**: Google Gemini 1.5 Flash API with intelligent structured fallback.
- **Automation**: n8n workflow integration via webhooks.

---

## 6. Features & Main Dashboard Pages

1. **Dashboard**: Live stats, key metrics, **Today's AI Recommendation**, "Why AI chose this" decision factors, and 1-click AI Growth Cycle launcher.
2. **Content Strategy**: AI Strategy Summary, Content Opportunity Cards (Topic, Priority, Format, Objective, AI Reasoning, Suggested Posting Time).
3. **AI Content Studio**: Full content workspace generating structured packages (Hook, short script, caption, hashtags, CTA, visual editing plan, posting time).
4. **Content Calendar**: Weekly content calendar grid with status filters (`Draft`, `AI Recommended`, `Scheduled`, `Published`, `Analyzing`).
5. **Analytics**: Real-time Recharts visualizations (Engagement rate over time, views by category, performance by format, top posts dataset).
6. **AI Learning / Insights**: **Interactive Visual AI Growth Loop Diagram** (*Published Content → Performance → AI Analysis → Learnings → Updated Strategy*).
7. **Automation / n8n**: Interactive webhook console with live payload viewer & response logger.
8. **Creator Profile**: Customizable creator persona (Niche, audience, goal, tone, topics to avoid).
9. **Settings**: DEMO MODE toggle, API key configuration, database reset to default Bhavana dataset.

---

## 7. Folder Structure

```
creatorpilot/
├── frontend/             # React + Vite + TypeScript application
│   ├── src/
│   │   ├── components/   # Sidebar, TopBar, GrowthCycleModal
│   │   ├── pages/        # Dashboard, Strategy, Studio, Calendar, Analytics, Learning, Automation, Profile, Settings
│   │   ├── services/     # API Client (Axios)
│   │   ├── index.css     # Tailwind CSS v4 & custom glassmorphism styles
│   │   └── App.tsx       # Main router & layout container
│   ├── vite.config.ts    # Vite configuration & proxy settings
│   └── package.json
├── backend/              # Node.js + Express + TypeScript service
│   ├── src/
│   │   ├── database/     # SQLite database manager & demo seed
│   │   ├── services/     # AIService, AutomationService, GrowthEngineService
│   │   ├── routes/       # REST API endpoint handlers
│   │   └── server.ts     # Express server entry point
│   ├── .env
│   └── package.json
├── n8n/                  # n8n workflow JSON exports & setup guide
│   └── workflows/
│       └── creatorpilot-growth-loop.json
├── docs/                 # Hackathon presentation docs & architectural specs
│   ├── architecture.md
│   ├── n8n-workflow.md
│   ├── demo-script.md
│   ├── api.md
│   └── ppt-presentation.md
├── README.md
└── .env.example
```

---

## 8. Quick Start & Installation Commands

### Step 1: Install Backend Dependencies
```bash
cd backend
npm install
```

### Step 2: Install Frontend Dependencies
```bash
cd ../frontend
npm install
```

---

## 9. Running the Application Locally

### Start Backend API Server (Port 5000)
```bash
cd backend
npm run dev
```

### Start Frontend Application (Port 3000)
```bash
cd frontend
npm run dev
```

Open `http://localhost:3000` in your browser.

---

## 10. Demo Mode Configuration

CreatorPilot is built with a **Zero-Crash Guarantee** for hackathon presentations.

If no `AI_API_KEY` is provided or if `DEMO_MODE=true` is set:
- CreatorPilot automatically activates **DEMO MODE**.
- The AI Decision Engine analyzes performance statistics using high-precision heuristic decision logic.
- Structured AI outputs, content packages, and n8n webhooks run smoothly without requiring external credentials.

To enable live Gemini AI:
1. Edit `backend/.env`.
2. Add your `AI_API_KEY=your_key_here`.
3. Set `DEMO_MODE=false`.

---

## 11. n8n Setup & Integration

1. Start your local n8n instance:
   ```bash
   npx n8n start
   ```
2. Open n8n UI at `http://localhost:5678`.
3. Click **Workflows** → **Import from File**.
4. Select `n8n/workflows/creatorpilot-growth-loop.json`.
5. Set `N8N_WEBHOOK_URL=http://localhost:5678/webhook` in `backend/.env`.

---

## 12. Hackathon Presentation Walkthrough (3-Minute Demo)

1. Open Dashboard: Highlight greeting for creator **Bhavana**.
2. Click **"🚀 Run AI Growth Cycle"** button in top bar.
3. Observe live execution of all 12 progress steps:
   - Step 1: Analyzing creator profile...
   - Step 2: Analyzing previous content...
   - Step 3: Checking trends...
   - Step 4: Identifying content opportunities...
   - Step 5: AI deciding next content strategy...
   - Step 6: Generating content package...
   - Step 7: Selecting publishing time...
   - Step 8: Sending automation request to n8n...
   - Step 9: Content scheduled.
   - Step 10: Monitoring performance...
   - Step 11: AI learning from results...
   - Step 12: Next recommendation generated.
4. Show updated **Content Studio**, **Content Calendar**, and **AI Learning** feedback loop.

---

## 13. Future Scope

- **Direct API Publishing**: Automatic posting to Instagram Graph API & YouTube Data API.
- **Live Sentiment Analysis**: Audience comment sentiment clustering to detect emerging sub-niche trends.
- **Multimodal Video Generation**: Automatic script-to-video rendering using AI video engines.
