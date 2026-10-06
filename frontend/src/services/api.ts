import axios from 'axios';

const API_BASE = '/api';

export interface CreatorProfile {
  id: string;
  name: string;
  niche: string;
  targetAudience: string;
  mainPlatform: string;
  contentLanguage: string;
  contentFormats: string[];
  growthGoal: string;
  postingFrequency: string;
  brandTone: string;
  topicsToAvoid: string[];
  updatedAt: string;
}

export interface ContentItem {
  id: string;
  creatorId: string;
  topic: string;
  platform: string;
  format: 'REEL' | 'CAROUSEL' | 'STORY' | 'POST';
  hook: string;
  script: string;
  caption: string;
  hashtags: string[];
  cta: string;
  visualPlan: string;
  status: 'DRAFT' | 'RECOMMENDED' | 'SCHEDULED' | 'PUBLISHED' | 'ANALYZING';
  priority: 'HIGH' | 'MEDIUM' | 'LOW';
  scheduledAt: string;
  publishedAt?: string;
  createdAt: string;
}

export interface Recommendation {
  id: string;
  creatorId: string;
  recommendedTopic: string;
  format: 'REEL' | 'CAROUSEL' | 'STORY' | 'POST';
  objective: string;
  priority: 'HIGH' | 'MEDIUM' | 'LOW';
  confidence: number;
  recommendedTime: string;
  reasoning: string[];
  contentAngle: string;
  audience: string;
  contentBrief: string;
  createdAt: string;
}

export interface LearningInsight {
  id: string;
  creatorId: string;
  whatWorked: string;
  whatDidntWork: string;
  audienceSignal: string;
  aiLearned: string;
  nextRecommendation: string;
  impact: string;
  category: string;
  createdAt: string;
}

export interface AnalyticsSummary {
  summary: {
    totalViews: number;
    totalLikes: number;
    totalComments: number;
    totalShares: number;
    totalSaves: number;
    avgEngagement: number;
    totalPostsPublished: number;
    isDemoData: boolean;
  };
  categoryBreakdown: Array<{
    category: string;
    views: number;
    saves: number;
    avgEngagement: number;
  }>;
  performanceOverTime: Array<{
    date: string;
    topic: string;
    views: number;
    saves: number;
    engagementRate: number;
  }>;
}

export interface GrowthCycleStep {
  step: number;
  message: string;
  timestamp: string;
  data?: any;
}

export const api = {
  // Health & System
  getHealth: async () => {
    const res = await axios.get(`${API_BASE}/health`);
    return res.data;
  },

  resetDemo: async () => {
    const res = await axios.post(`${API_BASE}/reset-demo`);
    return res.data;
  },

  // Creator Profile
  getCreator: async () => {
    const res = await axios.get<{ success: boolean; creator: CreatorProfile }>(`${API_BASE}/creator`);
    return res.data.creator;
  },

  updateCreator: async (profile: Partial<CreatorProfile>) => {
    const res = await axios.put<{ success: boolean; creator: CreatorProfile; message: string }>(`${API_BASE}/creator`, profile);
    return res.data;
  },

  // Content Items
  getContent: async () => {
    const res = await axios.get<{ success: boolean; content: ContentItem[] }>(`${API_BASE}/content`);
    return res.data.content;
  },

  createContent: async (item: Partial<ContentItem>) => {
    const res = await axios.post<{ success: boolean; content: ContentItem; message: string }>(`${API_BASE}/content`, item);
    return res.data;
  },

  updateContent: async (id: string, update: Partial<ContentItem>) => {
    const res = await axios.put<{ success: boolean; content: ContentItem; message: string }>(`${API_BASE}/content/${id}`, update);
    return res.data;
  },

  deleteContent: async (id: string) => {
    const res = await axios.delete<{ success: boolean; message: string }>(`${API_BASE}/content/${id}`);
    return res.data;
  },

  // Analytics
  getAnalytics: async () => {
    const res = await axios.get<AnalyticsSummary>(`${API_BASE}/analytics`);
    return res.data;
  },

  // Recommendations
  getRecommendations: async () => {
    const res = await axios.get<{ success: boolean; recommendations: Recommendation[] }>(`${API_BASE}/recommendations`);
    return res.data.recommendations;
  },

  generateRecommendation: async () => {
    const res = await axios.post<{ success: boolean; recommendation: Recommendation; isDemoMode: boolean }>(`${API_BASE}/recommendations/generate`);
    return res.data;
  },

  // AI Content Studio & Decision
  analyzeAI: async () => {
    const res = await axios.post(`${API_BASE}/ai/analyze`);
    return res.data;
  },

  generateAIContent: async (params: {
    topic?: string;
    platform?: string;
    format?: string;
    tone?: string;
    audience?: string;
    goal?: string;
  }) => {
    const res = await axios.post(`${API_BASE}/ai/generate-content`, params);
    return res.data;
  },

  getAILearning: async () => {
    const res = await axios.post(`${API_BASE}/ai/learning`);
    return res.data;
  },

  runFullGrowthCycle: async () => {
    const res = await axios.post<{
      success: boolean;
      message: string;
      isDemoMode: boolean;
      steps: GrowthCycleStep[];
      recommendation: Recommendation;
      generatedContent: ContentItem;
      learning: LearningInsight;
      automationLogs: any[];
    }>(`${API_BASE}/ai/run-growth-cycle`);
    return res.data;
  },

  // Learnings History
  getLearnings: async () => {
    const res = await axios.get<{ success: boolean; learnings: LearningInsight[] }>(`${API_BASE}/learnings`);
    return res.data.learnings;
  },

  // Automation / n8n
  getAutomationLogs: async () => {
    const res = await axios.get(`${API_BASE}/automation/logs`);
    return res.data;
  },

  triggerAutomationEvent: async (endpoint: 'analyze' | 'generate' | 'schedule' | 'performance' | 'learning', payload: any) => {
    const res = await axios.post(`${API_BASE}/automation/${endpoint}`, payload);
    return res.data;
  }
};
