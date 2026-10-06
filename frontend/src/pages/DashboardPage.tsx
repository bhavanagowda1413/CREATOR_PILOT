import React from 'react';
import {
  TrendingUp,
  Eye,
  Bookmark,
  Share2,
  CheckCircle2,
  Sparkles,
  Calendar,
  Clock,
  ArrowUpRight,
  ShieldCheck,
  BrainCircuit,
  PlayCircle
} from 'lucide-react';
import { CreatorProfile, Recommendation, ContentItem, AnalyticsSummary } from '../services/api';
import { PageId } from '../components/Sidebar';

interface DashboardPageProps {
  creator: CreatorProfile | null;
  recommendations: Recommendation[];
  content: ContentItem[];
  analytics: AnalyticsSummary | null;
  setActivePage: (page: PageId) => void;
  onRunCycle: () => void;
}

export const DashboardPage: React.FC<DashboardPageProps> = ({
  creator,
  recommendations,
  content,
  analytics,
  setActivePage,
  onRunCycle
}) => {
  const latestRec = recommendations.length > 0 ? recommendations[0] : {
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
    contentBrief: 'High energy short reel showing 3 fast tool demos with clear text callouts.'
  };

  const summary = analytics?.summary || {
    totalViews: 45700,
    totalLikes: 4050,
    totalComments: 520,
    totalShares: 1750,
    totalSaves: 2910,
    avgEngagement: 18.1,
    totalPostsPublished: 4
  };

  const stats = [
    {
      label: 'Avg Engagement Rate',
      value: `${summary.avgEngagement}%`,
      change: '+3.4%',
      isPositive: true,
      icon: TrendingUp,
      color: 'from-purple-500/20 to-blue-500/20 text-purple-400 border-purple-500/30'
    },
    {
      label: 'Total Views',
      value: summary.totalViews.toLocaleString(),
      change: '+18.2%',
      isPositive: true,
      icon: Eye,
      color: 'from-blue-500/20 to-cyan-500/20 text-blue-400 border-blue-500/30'
    },
    {
      label: 'Saves (High Intent)',
      value: summary.totalSaves.toLocaleString(),
      change: '+42.5%',
      isPositive: true,
      icon: Bookmark,
      color: 'from-emerald-500/20 to-teal-500/20 text-emerald-400 border-emerald-500/30'
    },
    {
      label: 'Shares & Virality',
      value: summary.totalShares.toLocaleString(),
      change: '+25.0%',
      isPositive: true,
      icon: Share2,
      color: 'from-cyan-500/20 to-indigo-500/20 text-cyan-400 border-cyan-500/30'
    },
    {
      label: 'Content Published',
      value: content.length.toString(),
      change: 'Active',
      isPositive: true,
      icon: CheckCircle2,
      color: 'from-indigo-500/20 to-purple-500/20 text-indigo-400 border-indigo-500/30'
    },
    {
      label: 'AI Strategy Recommendations',
      value: recommendations.length.toString(),
      change: 'Learned',
      isPositive: true,
      icon: Sparkles,
      color: 'from-amber-500/20 to-orange-500/20 text-amber-400 border-amber-500/30'
    }
  ];

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      {/* Header Notification Banner */}
      <div className="p-4 rounded-2xl bg-gradient-to-r from-purple-900/40 via-slate-900 to-cyan-900/30 border border-purple-500/30 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-purple-500/20 border border-purple-500/40 flex items-center justify-center shrink-0">
            <BrainCircuit className="w-5 h-5 text-purple-300" />
          </div>
          <div>
            <h2 className="text-sm font-bold text-white flex items-center gap-2">
              Autonomous Growth Agent Online
              <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                Continuous Learning Active
              </span>
            </h2>
            <p className="text-xs text-slate-400">
              CreatorPilot has analyzed performance data for <span className="text-purple-300 font-semibold">{creator?.name || 'Bhavana'}</span> and optimized your next publishing roadmap.
            </p>
          </div>
        </div>
        <button
          onClick={onRunCycle}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-purple-600 to-cyan-500 hover:from-purple-500 hover:to-cyan-400 text-white font-medium text-xs shadow-lg shadow-purple-500/20 transition-all shrink-0"
        >
          <PlayCircle className="w-4 h-4" />
          <span>Run AI Growth Cycle</span>
        </button>
      </div>

      {/* Key Metric Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-6 gap-4">
        {stats.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <div
              key={idx}
              className={`p-4 rounded-2xl bg-gradient-to-b ${stat.color} border glass-panel-hover flex flex-col justify-between`}
            >
              <div className="flex items-center justify-between text-xs text-slate-400">
                <span>{stat.label}</span>
                <Icon className="w-4 h-4" />
              </div>
              <div className="mt-3">
                <div className="text-xl font-bold text-white tracking-tight">{stat.value}</div>
                <div className="text-[11px] font-semibold text-emerald-400 flex items-center gap-0.5 mt-1">
                  <span>{stat.change}</span>
                  <ArrowUpRight className="w-3 h-3" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Today's AI Recommendation Card (Hero Feature) */}
      <div className="p-6 rounded-2xl bg-gradient-to-br from-slate-900 via-purple-950/40 to-slate-900 border border-purple-500/40 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl -z-10 pointer-events-none" />

        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-slate-800">
          <div className="space-y-2 max-w-2xl">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-purple-300 uppercase tracking-widest flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-500/20 border border-purple-500/30">
                <Sparkles className="w-3.5 h-3.5 text-cyan-400" /> Today's AI Recommendation
              </span>
              <span className="text-xs font-semibold text-amber-300 px-2.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/30">
                Priority: {latestRec.priority}
              </span>
              <span className="text-xs font-semibold text-cyan-300 px-2.5 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30">
                Confidence: {latestRec.confidence}%
              </span>
            </div>

            <h2 className="text-2xl font-extrabold text-white tracking-tight pt-1">
              "{latestRec.recommendedTopic}"
            </h2>

            <p className="text-xs text-slate-300 leading-relaxed">
              <strong className="text-purple-300">AI Reason:</strong> "Your AI education posts have generated stronger saves and shares than motivational content."
            </p>
          </div>

          {/* Quick Details Badge Box */}
          <div className="flex flex-wrap lg:flex-col gap-3 justify-end min-w-[200px]">
            <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 text-xs flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-purple-400" />
              <div>
                <div className="text-[10px] text-slate-400">Format</div>
                <div className="font-bold text-white">{latestRec.format}</div>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 text-xs flex items-center gap-2">
              <Clock className="w-4 h-4 text-cyan-400" />
              <div>
                <div className="text-[10px] text-slate-400">Best Time</div>
                <div className="font-bold text-cyan-300">{latestRec.recommendedTime}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="pt-6 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setActivePage('studio')}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-cyan-500 hover:from-purple-500 hover:to-cyan-400 text-white font-semibold text-xs shadow-lg shadow-purple-500/25 transition-all"
            >
              <Sparkles className="w-4 h-4" />
              <span>Generate Content Package</span>
            </button>

            <button
              onClick={() => setActivePage('strategy')}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs border border-slate-700 transition-all"
            >
              <TrendingUp className="w-4 h-4 text-purple-400" />
              <span>View Strategy</span>
            </button>

            <button
              onClick={() => setActivePage('calendar')}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs border border-slate-700 transition-all"
            >
              <Calendar className="w-4 h-4 text-cyan-400" />
              <span>Schedule</span>
            </button>
          </div>
        </div>

        {/* Why AI Chose This (Decisive Factors section) */}
        <div className="mt-6 pt-5 border-t border-slate-800/80">
          <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-3 flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-purple-400" /> Why CreatorPilot Chose This (AI Decision Factors)
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
            {latestRec.reasoning.map((reason, idx) => (
              <div
                key={idx}
                className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-900/60 border border-slate-800 text-xs text-slate-300"
              >
                <CheckCircle2 className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
                <span>{reason}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Content Roadmap & Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Scheduled Content List */}
        <div className="lg:col-span-2 p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <h3 className="font-bold text-white text-sm flex items-center gap-2">
              <Calendar className="w-4 h-4 text-cyan-400" /> Upcoming Content Queue
            </h3>
            <button
              onClick={() => setActivePage('calendar')}
              className="text-xs text-purple-400 hover:text-purple-300 font-semibold flex items-center gap-1"
            >
              View Full Calendar →
            </button>
          </div>

          <div className="space-y-3">
            {content.map(item => (
              <div
                key={item.id}
                className="p-3.5 rounded-xl bg-slate-800/40 border border-slate-800 hover:border-purple-500/30 transition-all flex items-center justify-between gap-4"
              >
                <div className="space-y-1 max-w-lg">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-purple-500/20 text-purple-300 border border-purple-500/30">
                      {item.format}
                    </span>
                    <span className="text-[10px] font-semibold text-slate-400">
                      {item.platform}
                    </span>
                    <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                      item.status === 'SCHEDULED' ? 'bg-cyan-500/20 text-cyan-300' : 'bg-emerald-500/20 text-emerald-300'
                    }`}>
                      {item.status}
                    </span>
                  </div>
                  <h4 className="text-xs font-bold text-white line-clamp-1">{item.topic}</h4>
                  <p className="text-[11px] text-slate-400 italic line-clamp-1">"{item.hook}"</p>
                </div>
                <button
                  onClick={() => setActivePage('studio')}
                  className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-purple-600/30 text-purple-300 border border-slate-700 text-xs font-medium transition-all shrink-0"
                >
                  Edit Package
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* AI Learning Quick Snapshot */}
        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <h3 className="font-bold text-white text-sm flex items-center gap-2">
              <BrainCircuit className="w-4 h-4 text-purple-400" /> Continuous AI Learning
            </h3>
            <button
              onClick={() => setActivePage('learning')}
              className="text-xs text-purple-400 hover:text-purple-300 font-semibold"
            >
              Full Loop →
            </button>
          </div>

          <div className="space-y-3 text-xs">
            <div className="p-3 rounded-xl bg-purple-950/20 border border-purple-500/20">
              <div className="font-bold text-purple-300 mb-1">What Worked Best</div>
              <p className="text-slate-300">Educational AI tool showcases generated 2.4x higher save-to-view ratios (7.2%).</p>
            </div>

            <div className="p-3 rounded-xl bg-slate-800/40 border border-slate-800">
              <div className="font-bold text-amber-300 mb-1">What Underperformed</div>
              <p className="text-slate-400">Generic motivational posts generated lower saves & shares (under 2.1%).</p>
            </div>

            <div className="p-3 rounded-xl bg-cyan-950/20 border border-cyan-500/20">
              <div className="font-bold text-cyan-300 mb-1">Audience Signal</div>
              <p className="text-slate-300">College students react 3.4x more to step-by-step practical study tools.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
