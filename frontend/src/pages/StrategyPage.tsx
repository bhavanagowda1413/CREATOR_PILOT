import React, { useState } from 'react';
import {
  Target,
  Sparkles,
  TrendingUp,
  Clock,
  CheckCircle2,
  AlertTriangle,
  Zap,
  Calendar,
  Layers,
  ArrowRight
} from 'lucide-react';
import { CreatorProfile, Recommendation } from '../services/api';
import { PageId } from '../components/Sidebar';

interface StrategyPageProps {
  creator: CreatorProfile | null;
  recommendations: Recommendation[];
  onGenerateNew: () => void;
  setActivePage: (page: PageId) => void;
  isLoading: boolean;
}

export const StrategyPage: React.FC<StrategyPageProps> = ({
  creator,
  recommendations,
  onGenerateNew,
  setActivePage,
  isLoading
}) => {
  const [filterPriority, setFilterPriority] = useState<string>('ALL');

  const opportunities = [
    {
      id: 'opp-1',
      topic: '3 AI tools that save students hours every week',
      audience: 'College students & beginner developers',
      format: 'REEL',
      priority: 'HIGH',
      objective: 'SAVES_AND_SHARES',
      reason: 'Similar educational AI posts showed 2.4x stronger save-to-view ratios.',
      suggestedTime: '8:00 PM',
      confidence: 89
    },
    {
      id: 'opp-2',
      topic: 'Free AI Websites for Code Debugging',
      audience: 'CS students & self-taught coders',
      format: 'REEL',
      priority: 'HIGH',
      objective: 'SHARES_AND_COMMENTS',
      reason: 'High demand for instant terminal bug fixing short-form demos.',
      suggestedTime: '7:30 PM',
      confidence: 92
    },
    {
      id: 'opp-3',
      topic: 'Java Backend Developer Roadmap 2026',
      audience: 'Beginner software engineers',
      format: 'CAROUSEL',
      priority: 'MEDIUM',
      objective: 'HIGH_INTENT_SAVES',
      reason: 'Structured multi-slide roadmaps hold 74%+ bookmark conversion.',
      suggestedTime: '6:30 PM',
      confidence: 83
    },
    {
      id: 'opp-4',
      topic: 'How to Build an AI Assistant with Node.js in 10 Mins',
      audience: 'Intermediate coders & student builders',
      format: 'REEL',
      priority: 'MEDIUM',
      objective: 'ENGAGEMENT_AND_FOLLOWS',
      reason: 'Practical coding tutorials drive strong profile click-throughs.',
      suggestedTime: '8:30 PM',
      confidence: 81
    }
  ];

  const filtered = filterPriority === 'ALL'
    ? opportunities
    : opportunities.filter(o => o.priority === filterPriority);

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div>
          <h1 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
            <Target className="w-5 h-5 text-purple-400" /> AI Content Strategy
          </h1>
          <p className="text-xs text-slate-400">
            Intelligent topic selection based on audience retention signals, save ratios, and niche trends.
          </p>
        </div>
        <button
          onClick={onGenerateNew}
          disabled={isLoading}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-cyan-500 hover:from-purple-500 hover:to-cyan-400 text-white font-semibold text-xs shadow-lg shadow-purple-500/20 transition-all"
        >
          <Sparkles className="w-4 h-4" />
          <span>{isLoading ? 'Analyzing Signals...' : 'Generate New Opportunities'}</span>
        </button>
      </div>

      {/* AI Strategy Summary Card */}
      <div className="p-6 rounded-2xl bg-gradient-to-br from-slate-900 via-purple-950/30 to-slate-900 border border-purple-500/30 space-y-5">
        <h2 className="text-sm font-bold text-purple-300 uppercase tracking-widest flex items-center gap-2">
          <Zap className="w-4 h-4 text-cyan-400" /> Executive AI Strategy Blueprint
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-xs">
          <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-1">
            <div className="text-[11px] font-semibold text-slate-400 uppercase">Growth Goal</div>
            <div className="font-bold text-white text-sm">{creator?.growthGoal || 'Increase engagement and saves'}</div>
            <div className="text-[10px] text-purple-400">Targeting High Intent Saves</div>
          </div>

          <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-1">
            <div className="text-[11px] font-semibold text-emerald-400 uppercase flex items-center gap-1">
              <TrendingUp className="w-3.5 h-3.5" /> Best Category
            </div>
            <div className="font-bold text-white text-sm">AI Tools & Student Hacks</div>
            <div className="text-[10px] text-emerald-400">22.3% Avg Engagement</div>
          </div>

          <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-1">
            <div className="text-[11px] font-semibold text-amber-400 uppercase flex items-center gap-1">
              <AlertTriangle className="w-3.5 h-3.5" /> Underperforming
            </div>
            <div className="font-bold text-white text-sm">Generic Motivation</div>
            <div className="text-[10px] text-amber-400">Low Shares & Saves (under 2%)</div>
          </div>

          <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-1">
            <div className="text-[11px] font-semibold text-cyan-400 uppercase flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5" /> Core Strategy
            </div>
            <div className="font-bold text-white text-sm">Educational AI Reels</div>
            <div className="text-[10px] text-cyan-300">4 Posts / Week Frequency</div>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-purple-950/40 border border-purple-500/20 text-xs text-slate-300 leading-relaxed flex items-start gap-3">
          <CheckCircle2 className="w-5 h-5 text-purple-400 shrink-0 mt-0.5" />
          <div>
            <strong className="text-white">Strategic Directive:</strong> "Increase short-form educational AI reels and practical student-focused tools. Shift 80% of content production toward step-by-step utility showcases and eliminate vague motivational posts."
          </div>
        </div>
      </div>

      {/* Content Opportunity Cards Section */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <h2 className="text-base font-bold text-white flex items-center gap-2">
            <Layers className="w-4 h-4 text-cyan-400" /> AI Content Opportunities ({filtered.length})
          </h2>

          {/* Priority Filters */}
          <div className="flex items-center gap-2 text-xs">
            {['ALL', 'HIGH', 'MEDIUM'].map(p => (
              <button
                key={p}
                onClick={() => setFilterPriority(p)}
                className={`px-3 py-1.5 rounded-lg font-semibold transition-all ${
                  filterPriority === p
                    ? 'bg-purple-600 text-white shadow-md'
                    : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
                }`}
              >
                {p === 'ALL' ? 'All Opportunities' : `${p} Priority`}
              </button>
            ))}
          </div>
        </div>

        {/* Grid of Opportunity Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filtered.map(opp => (
            <div
              key={opp.id}
              className="p-5 rounded-2xl bg-slate-900 border border-slate-800 hover:border-purple-500/40 transition-all glass-panel-hover flex flex-col justify-between space-y-4"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-purple-500/20 text-purple-300 border border-purple-500/30">
                      {opp.format}
                    </span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                      {opp.objective}
                    </span>
                  </div>
                  <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full ${
                    opp.priority === 'HIGH' ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30' : 'bg-slate-700 text-slate-300'
                  }`}>
                    {opp.priority} Priority
                  </span>
                </div>

                <h3 className="text-base font-bold text-white leading-snug">{opp.topic}</h3>

                <div className="text-xs text-slate-400 space-y-1">
                  <div>Target Audience: <span className="text-slate-200 font-medium">{opp.audience}</span></div>
                  <div>Suggested Time: <span className="text-cyan-300 font-semibold">{opp.suggestedTime}</span></div>
                </div>

                <div className="p-3 rounded-xl bg-slate-800/40 border border-slate-800 text-xs text-slate-300">
                  <strong className="text-purple-300">AI Reasoning:</strong> "{opp.reason}"
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-2 flex items-center justify-between border-t border-slate-800/80">
                <span className="text-[11px] font-mono text-purple-400">Confidence: {opp.confidence}%</span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setActivePage('studio')}
                    className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-gradient-to-r from-purple-600 to-cyan-500 hover:from-purple-500 hover:to-cyan-400 text-white font-semibold text-xs shadow-md transition-all"
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Generate</span>
                  </button>

                  <button
                    onClick={() => setActivePage('calendar')}
                    className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs border border-slate-700 transition-all"
                  >
                    <Calendar className="w-3.5 h-3.5 text-cyan-400" />
                    <span>Schedule</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
