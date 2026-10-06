# n8n Automation Workflows - CreatorPilot

This directory contains the production-ready n8n workflow blueprints for **CreatorPilot – Autonomous AI Content Growth Agent**.

## Workflows Included

1. **Content Intelligence Workflow (`/api/automation/analyze`)**
   - Webhook trigger receives creator profile + past metrics.
   - Passes context to Gemini LLM node with structured JSON output parser.
   - Returns intelligent topic recommendation & reasoning back to CreatorPilot backend.

2. **Content Creation Workflow (`/api/automation/generate`)**
   - Webhook receives content parameters (topic, tone, platform, audience, goal).
   - Generates structured package: Hook, short script, caption, hashtags, visual editing directions, and CTA.

3. **Content Scheduling Workflow (`/api/automation/schedule`)**
   - Webhook receives final content payload.
   - Pushes scheduled job into n8n queue & triggers platform notifications.

4. **Continuous Learning Loop Workflow (`/api/automation/learning`)**
   - Webhook receives performance feedback (views, saves, shares).
   - Analyzes category win/loss signals and updates future AI directives.

## How to Import into n8n

1. Start your local n8n instance:
   ```bash
   npx n8n start
   ```
2. Open your n8n canvas (usually `http://localhost:5678`).
3. Click **Workflows** → **Import from File**.
4. Select `n8n/workflows/creatorpilot-growth-loop.json`.
5. Set `N8N_WEBHOOK_URL=http://localhost:5678/webhook` in your backend `.env` file.
