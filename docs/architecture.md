# CreatorPilot Architecture & Design Specification

## System Overview

CreatorPilot is an **Autonomous AI Content Growth Agent** built for content creators. Instead of acting as a simple passive text generator, CreatorPilot operates on a continuous 8-stage feedback loop:

```
COLLECT → UNDERSTAND → DECIDE → CREATE → SCHEDULE → MEASURE → LEARN → IMPROVE
```

## System Architecture Diagram

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

## Key Architectural Principles

1. **Decoupled Fallback Engine (Zero Crash Guarantee)**: If LLM API keys or n8n instances are unreachable, the system automatically runs in `DEMO_MODE` using high-fidelity heuristic decision algorithms based on actual dataset statistics.
2. **Structured AI Decision Contracts**: All AI responses are validated against TypeScript JSON contracts before reaching UI components.
3. **Continuous AI Learning Loop**: Performance data (saves, shares, watch completion) directly influences subsequent strategy generation.
