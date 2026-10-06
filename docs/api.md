# CreatorPilot REST API Documentation

Base URL: `http://localhost:5000/api`

## Endpoints Summary

### Health Check
- `GET /health` - System health, mode status (DEMO_MODE vs LIVE), n8n connection.

### Creator Profile
- `GET /creator` - Retrieve active creator profile.
- `PUT /creator` - Update creator profile.

### Content Items
- `GET /content` - List all content items (Draft, Recommended, Scheduled, Published).
- `POST /content` - Create a new content item.
- `PUT /content/:id` - Update content item.
- `DELETE /content/:id` - Delete content item.

### Analytics
- `GET /analytics` - Aggregate analytics summaries, category breakdowns, and performance over time.

### Recommendations & AI Decision Engine
- `GET /recommendations` - Get active AI recommendations.
- `POST /recommendations/generate` - Trigger AI Decision Engine.

### AI Studio & Growth Cycle
- `POST /ai/analyze` - Trigger strategy analysis.
- `POST /ai/generate-content` - Generate structured content package (hook, script, caption, hashtags, CTA, visual plan).
- `POST /ai/learning` - Extract performance learnings.
- `POST /ai/run-growth-cycle` - Execute full 12-step autonomous hackathon growth loop.

### Automation / n8n
- `GET /automation/logs` - Retrieve webhook log history.
- `POST /automation/analyze` - Dispatch analysis payload to n8n.
- `POST /automation/generate` - Dispatch content generation payload to n8n.
- `POST /automation/schedule` - Dispatch scheduling payload to n8n.
- `POST /automation/performance` - Dispatch metrics payload to n8n.
- `POST /automation/learning` - Dispatch learning payload to n8n.
