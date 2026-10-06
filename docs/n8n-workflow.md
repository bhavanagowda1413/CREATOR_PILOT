# n8n Workflow Architecture - CreatorPilot

## Overview

CreatorPilot uses n8n as its automation execution engine. The backend communicates with n8n via structured JSON webhooks.

## Workflow 1: Content Intelligence Workflow (`POST /api/automation/analyze`)

```
Webhook Trigger
    ↓
Get Creator Profile (SQLite DB)
    ↓
Get Previous Content & Performance History
    ↓
Get Trend Signals
    ↓
Google Gemini AI Agent Node
    ↓
Structured JSON Decision Parser
    ↓
Store Recommendation
    ↓
Notify Creator Dashboard
```

## Workflow 2: Content Creation Workflow (`POST /api/automation/generate`)

```
Trigger Webhook
    ↓
AI Content Generator (Gemini)
    ↓
Generate Opening Hook (Under 15 words)
    ↓
Generate Scene-by-Scene Script (Timing cues)
    ↓
Generate Caption, Hashtags, CTA & Visual Directions
    ↓
Save Draft Content to Database
    ↓
Notify Creator
```

## Workflow 3: Learning Workflow (`POST /api/automation/learning`)

```
Performance Webhook Trigger
    ↓
Get Published Content Performance Metrics
    ↓
Calculate Engagement & Save Ratios
    ↓
AI Performance Analysis Node
    ↓
Extract Learnings & Category Winners/Losses
    ↓
Update Creator Strategy Matrix
    ↓
Generate Next Recommendation
```
