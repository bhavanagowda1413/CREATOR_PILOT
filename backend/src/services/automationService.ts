import axios from 'axios';
import { db } from '../database/db';

export class AutomationService {
  private webhookBaseUrl: string;

  constructor() {
    this.webhookBaseUrl = process.env.N8N_WEBHOOK_URL || '';
  }

  public getWebhookUrl(endpoint: string): string {
    if (!this.webhookBaseUrl) return '';
    return `${this.webhookBaseUrl.replace(/\/$/, '')}/${endpoint.replace(/^\//, '')}`;
  }

  public async triggerEvent(
    eventType: 'ANALYZE' | 'GENERATE' | 'SCHEDULE' | 'PERFORMANCE' | 'LEARNING',
    payload: any
  ) {
    const targetUrl = this.getWebhookUrl(eventType.toLowerCase());
    let responseData: any = null;
    let status: 'SUCCESS' | 'SIMULATED' | 'FAILED' = 'SIMULATED';

    if (targetUrl) {
      try {
        const response = await axios.post(targetUrl, payload, {
          timeout: 4000,
          headers: { 'Content-Type': 'application/json' }
        });
        responseData = response.data;
        status = 'SUCCESS';
      } catch (err: any) {
        console.warn(`n8n webhook call to ${targetUrl} failed: ${err.message}. Using simulation mode.`);
        responseData = {
          message: `n8n webhook call failed (${err.message}). Defaulted to CreatorPilot simulation.`,
          simulatedOutput: this.generateSimulatedOutput(eventType, payload)
        };
        status = 'SIMULATED';
      }
    } else {
      responseData = {
        message: 'No N8N_WEBHOOK_URL configured. Payload logged & simulated successfully.',
        simulatedOutput: this.generateSimulatedOutput(eventType, payload)
      };
      status = 'SIMULATED';
    }

    // Persist to database logs
    const log = db.addAutomationLog({
      eventType,
      payload,
      response: responseData,
      status
    });

    return {
      success: true,
      status,
      logId: log.id,
      webhookUrl: targetUrl || 'Not Configured (Demo Simulation Active)',
      payload,
      response: responseData
    };
  }

  private generateSimulatedOutput(eventType: string, payload: any) {
    switch (eventType) {
      case 'ANALYZE':
        return {
          status: 'ANALYSIS_COMPLETE',
          opportunityIdentified: true,
          topCategory: 'AI Tools',
          recommendedFormat: 'REEL'
        };
      case 'GENERATE':
        return {
          status: 'CONTENT_GENERATED',
          packageReady: true,
          hook: payload?.topic ? `Stop manually grinding on ${payload.topic}!` : "You're wasting hours doing tasks AI can finish in 3 minutes."
        };
      case 'SCHEDULE':
        return {
          status: 'SCHEDULED',
          scheduledAt: payload?.scheduledAt || new Date(Date.now() + 86400000).toISOString(),
          n8nQueueId: `n8n-job-${Date.now()}`
        };
      case 'PERFORMANCE':
        return {
          status: 'METRICS_COLLECTED',
          engagementRate: 22.4,
          saves: 1250,
          shares: 720
        };
      case 'LEARNING':
        return {
          status: 'STRATEGY_UPDATED',
          learningExtracted: 'Educational AI content outperforms motivation by +140%.',
          strategyUpdated: true
        };
      default:
        return { status: 'PROCESSED' };
    }
  }
}

export const automationService = new AutomationService();
