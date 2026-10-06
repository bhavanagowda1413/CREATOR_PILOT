import fs from 'fs';
import path from 'path';

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

export interface PerformanceMetric {
  id: string;
  contentId: string;
  topic: string;
  category: string;
  views: number;
  likes: number;
  comments: number;
  shares: number;
  saves: number;
  watchTime: string;
  engagementRate: number;
  recordedAt: string;
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

export interface AutomationLog {
  id: string;
  eventType: 'ANALYZE' | 'GENERATE' | 'SCHEDULE' | 'PERFORMANCE' | 'LEARNING';
  payload: any;
  response: any;
  status: 'SUCCESS' | 'SIMULATED' | 'FAILED';
  timestamp: string;
}

interface DatabaseSchema {
  creator: CreatorProfile;
  content: ContentItem[];
  performance: PerformanceMetric[];
  recommendations: Recommendation[];
  learnings: LearningInsight[];
  automationLogs: AutomationLog[];
}

const DATA_DIR = path.join(process.cwd(), 'data');
const DB_FILE = path.join(DATA_DIR, 'creatorpilot.json');

// Default initial data for Bhavana demo
const INITIAL_CREATOR: CreatorProfile = {
  id: 'c1',
  name: 'Bhavana',
  niche: 'Technology & AI',
  targetAudience: 'College students and beginner developers',
  mainPlatform: 'Instagram',
  contentLanguage: 'English',
  contentFormats: ['Reels', 'Carousels', 'Shorts'],
  growthGoal: 'Increase engagement and saves',
  postingFrequency: '4 times per week',
  brandTone: 'Simple, educational and energetic',
  topicsToAvoid: ['Crypto drama', 'Aggressive selling', 'Generic inspirational quotes'],
  updatedAt: new Date().toISOString()
};

const INITIAL_CONTENT: ContentItem[] = [
  {
    id: 'cnt-1',
    creatorId: 'c1',
    topic: '5 AI Tools Every College Student Should Know',
    platform: 'Instagram',
    format: 'REEL',
    hook: "You're wasting hours on manual study tasks AI can finish in 3 minutes.",
    script: "0-3s: Hook showing stacked textbook overload.\n3-8s: Tool 1 - Notion AI for assignment outlining.\n8-13s: Tool 2 - Perplexity for instant research citation.\n13-18s: Tool 3 - Gamma AI for slides in 60s.\n18-22s: Call to Action: Save this reel for midterms!",
    caption: "Stop grinding manually when smart tools exist! Here are 5 AI apps that saved me 15+ hours during college exam season. 🚀 Save this post before your next paper!",
    hashtags: ['#AITools', '#StudentHacks', '#CollegeTech', '#ProductivityAI', '#CreatorPilot'],
    cta: 'Save this reel for midterm season & tag a classmate!',
    visualPlan: 'Dynamic screen recording overlays with high-contrast text popups and fast cuts.',
    status: 'SCHEDULED',
    priority: 'HIGH',
    scheduledAt: new Date(Date.now() + 86400000).toISOString(),
    createdAt: new Date().toISOString()
  },
  {
    id: 'cnt-2',
    creatorId: 'c1',
    topic: 'Free AI Websites for Code Debugging',
    platform: 'Instagram',
    format: 'REEL',
    hook: 'Stop staring at red error logs for hours.',
    script: 'Show side-by-side terminal with error vs AI instant fix in 10 seconds.',
    caption: 'Debugging made easy with free AI web assistants. Check these 3 gems out! 💻',
    hashtags: ['#CodingTips', '#DevLife', '#AITools', '#WebDev'],
    cta: 'Share with a developer friend!',
    visualPlan: 'Live code terminal demonstration with green highlighting.',
    status: 'PUBLISHED',
    priority: 'HIGH',
    scheduledAt: new Date(Date.now() - 172800000).toISOString(),
    publishedAt: new Date(Date.now() - 172800000).toISOString(),
    createdAt: new Date(Date.now() - 259200000).toISOString()
  },
  {
    id: 'cnt-3',
    creatorId: 'c1',
    topic: 'Java Developer Roadmap 2026',
    platform: 'Instagram',
    format: 'CAROUSEL',
    hook: 'Want to become a Java backend dev this year? Here is your exact step-by-step roadmap.',
    script: 'Slide 1: Core Syntax\nSlide 2: Spring Boot\nSlide 3: Microservices\nSlide 4: Projects & Portfolio',
    caption: 'Save this complete step-by-step Java backend developer blueprint! ☕',
    hashtags: ['#Java', '#BackendDev', '#CodingRoadmap', '#TechCareer'],
    cta: 'Save for your learning journey.',
    visualPlan: 'Clean slide decks with infographics and step badges.',
    status: 'PUBLISHED',
    priority: 'MEDIUM',
    scheduledAt: new Date(Date.now() - 432000000).toISOString(),
    publishedAt: new Date(Date.now() - 432000000).toISOString(),
    createdAt: new Date(Date.now() - 518400000).toISOString()
  }
];

const INITIAL_PERFORMANCE: PerformanceMetric[] = [
  {
    id: 'p1',
    contentId: 'demo-1',
    topic: 'AI Tools for Students',
    category: 'AI Tools',
    views: 15000,
    likes: 1400,
    comments: 180,
    shares: 650,
    saves: 1100,
    watchTime: '84%',
    engagementRate: 22.2,
    recordedAt: new Date(Date.now() - 86400000 * 5).toISOString()
  },
  {
    id: 'p2',
    contentId: 'demo-2',
    topic: 'Coding Motivation',
    category: 'Motivation',
    views: 4200,
    likes: 300,
    comments: 40,
    shares: 60,
    saves: 90,
    watchTime: '42%',
    engagementRate: 11.6,
    recordedAt: new Date(Date.now() - 86400000 * 4).toISOString()
  },
  {
    id: 'p3',
    contentId: 'demo-3',
    topic: 'Free AI Websites',
    category: 'AI Tools',
    views: 18000,
    likes: 1700,
    comments: 220,
    shares: 800,
    saves: 1300,
    watchTime: '88%',
    engagementRate: 22.3,
    recordedAt: new Date(Date.now() - 86400000 * 3).toISOString()
  },
  {
    id: 'p4',
    contentId: 'demo-4',
    topic: 'Java Tips',
    category: 'Coding',
    views: 8500,
    likes: 650,
    comments: 80,
    shares: 240,
    saves: 420,
    watchTime: '65%',
    engagementRate: 16.3,
    recordedAt: new Date(Date.now() - 86400000 * 2).toISOString()
  }
];

const INITIAL_RECOMMENDATIONS: Recommendation[] = [
  {
    id: 'rec-1',
    creatorId: 'c1',
    recommendedTopic: '5 AI Tools Every College Student Should Know',
    format: 'REEL',
    objective: 'SAVES_AND_SHARES',
    priority: 'HIGH',
    confidence: 87,
    recommendedTime: '8:00 PM',
    reasoning: [
      'Your AI education posts generated 2.4x higher saves and shares than motivational content.',
      'Student audience signals peak engagement between 7:30 PM - 9:00 PM on weekdays.',
      'Practical utility format (top N tools) holds 86%+ average watch completion rate.',
      'Current content gap: High demand for mid-semester study workflow shortcuts.'
    ],
    contentAngle: 'Actionable productivity hacks solving assignment time-sink.',
    audience: 'College students & beginner developers',
    contentBrief: 'High energy short reel showing 3 fast tool demos with clear text callouts.',
    createdAt: new Date().toISOString()
  }
];

const INITIAL_LEARNINGS: LearningInsight[] = [
  {
    id: 'lrn-1',
    creatorId: 'c1',
    whatWorked: 'Educational AI tool showcases generated strong save-to-view ratios (7.2%).',
    whatDidntWork: 'Generic motivational content generated low shares and saves (under 2.1%).',
    audienceSignal: 'College students react 3.4x more to step-by-step practical study tools.',
    aiLearned: 'Prioritize practical AI tutorials and student-focused productivity workflows.',
    nextRecommendation: 'Double down on high-utility short reels focusing on free AI study tools.',
    impact: 'High (+42% Engagement)',
    category: 'AI Tools',
    createdAt: new Date().toISOString()
  }
];

class DatabaseManager {
  private schema: DatabaseSchema;

  constructor() {
    this.ensureDirectoryExists();
    this.schema = this.loadDatabase();
  }

  private ensureDirectoryExists() {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
  }

  private loadDatabase(): DatabaseSchema {
    try {
      if (fs.existsSync(DB_FILE)) {
        const raw = fs.readFileSync(DB_FILE, 'utf-8');
        return JSON.parse(raw);
      }
    } catch (err) {
      console.warn('Could not read existing database file, re-initializing standard schema.');
    }

    const defaultSchema: DatabaseSchema = {
      creator: INITIAL_CREATOR,
      content: INITIAL_CONTENT,
      performance: INITIAL_PERFORMANCE,
      recommendations: INITIAL_RECOMMENDATIONS,
      learnings: INITIAL_LEARNINGS,
      automationLogs: []
    };
    this.saveDatabase(defaultSchema);
    return defaultSchema;
  }

  private saveDatabase(data: DatabaseSchema = this.schema) {
    try {
      fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2), 'utf-8');
    } catch (err) {
      console.error('Error persisting database:', err);
    }
  }

  public getCreator(): CreatorProfile {
    return this.schema.creator;
  }

  public updateCreator(profile: Partial<CreatorProfile>): CreatorProfile {
    this.schema.creator = {
      ...this.schema.creator,
      ...profile,
      updatedAt: new Date().toISOString()
    };
    this.saveDatabase();
    return this.schema.creator;
  }

  public getContent(): ContentItem[] {
    return this.schema.content;
  }

  public addContent(item: Omit<ContentItem, 'id' | 'createdAt'>): ContentItem {
    const newItem: ContentItem = {
      ...item,
      id: `cnt-${Date.now()}`,
      createdAt: new Date().toISOString()
    };
    this.schema.content.unshift(newItem);
    this.saveDatabase();
    return newItem;
  }

  public updateContent(id: string, update: Partial<ContentItem>): ContentItem | null {
    const index = this.schema.content.findIndex(c => c.id === id);
    if (index === -1) return null;
    this.schema.content[index] = {
      ...this.schema.content[index],
      ...update
    };
    this.saveDatabase();
    return this.schema.content[index];
  }

  public deleteContent(id: string): boolean {
    const initialLen = this.schema.content.length;
    this.schema.content = this.schema.content.filter(c => c.id !== id);
    this.saveDatabase();
    return this.schema.content.length < initialLen;
  }

  public getPerformance(): PerformanceMetric[] {
    return this.schema.performance;
  }

  public addPerformance(metric: Omit<PerformanceMetric, 'id' | 'recordedAt'>): PerformanceMetric {
    const newMetric: PerformanceMetric = {
      ...metric,
      id: `perf-${Date.now()}`,
      recordedAt: new Date().toISOString()
    };
    this.schema.performance.unshift(newMetric);
    this.saveDatabase();
    return newMetric;
  }

  public getRecommendations(): Recommendation[] {
    return this.schema.recommendations;
  }

  public addRecommendation(rec: Omit<Recommendation, 'id' | 'createdAt'>): Recommendation {
    const newRec: Recommendation = {
      ...rec,
      id: `rec-${Date.now()}`,
      createdAt: new Date().toISOString()
    };
    this.schema.recommendations.unshift(newRec);
    this.saveDatabase();
    return newRec;
  }

  public getLearnings(): LearningInsight[] {
    return this.schema.learnings;
  }

  public addLearning(insight: Omit<LearningInsight, 'id' | 'createdAt'>): LearningInsight {
    const newInsight: LearningInsight = {
      ...insight,
      id: `lrn-${Date.now()}`,
      createdAt: new Date().toISOString()
    };
    this.schema.learnings.unshift(newInsight);
    this.saveDatabase();
    return newInsight;
  }

  public addAutomationLog(log: Omit<AutomationLog, 'id' | 'timestamp'>): AutomationLog {
    const newLog: AutomationLog = {
      ...log,
      id: `log-${Date.now()}`,
      timestamp: new Date().toISOString()
    };
    this.schema.automationLogs.unshift(newLog);
    this.saveDatabase();
    return newLog;
  }

  public getAutomationLogs(): AutomationLog[] {
    return this.schema.automationLogs;
  }

  public resetToDemoDefaults() {
    this.schema = {
      creator: INITIAL_CREATOR,
      content: INITIAL_CONTENT,
      performance: INITIAL_PERFORMANCE,
      recommendations: INITIAL_RECOMMENDATIONS,
      learnings: INITIAL_LEARNINGS,
      automationLogs: []
    };
    this.saveDatabase();
  }
}

export const db = new DatabaseManager();
