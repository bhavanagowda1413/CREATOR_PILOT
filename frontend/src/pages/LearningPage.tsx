import React from 'react';
import {
  BrainCircuit,
  CheckCircle2,
  XCircle,
  Radio,
  Sparkles,
  ArrowRight,
  TrendingUp,
  RotateCcw,
  Zap,
  Layers
} from 'lucide-react';
import { LearningInsight } from '../services/api';

interface LearningPageProps {
  learnings: LearningInsight[];
  onTriggerLearning: () => void;
  isLoading: boolean;
}

export const LearningPage: React.FC<LearningPageProps> = ({
  learnings,
  onTriggerLearning,
  isLoading
}) => {
  const latestLearning = learnings.length > 0 ? learnings[0] : {
    whatWorked: 'Educational AI content is currently your strongest content category.',
    whatDidntWork: 'Generic motivational posts generated lower saves and shares.',
    audienceSignal: 'Your audience interacts more with practical, actionable content.',
    aiLearned: 'Prioritize practical AI tutorials and student-focused tools.',
    nextRecommendation: 'Create more short-form educational AI content.',
    impact: 'High (+42% Saves)',
    category: 'AI Tools'
  };

  const loopSteps = [
    { title: '1. Published Content', desc: '4 posts tracked on Instagram & YouTube', color: 'from-purple-600 to-blue-600' },
    { title: '2. Performance Data', desc: 'Views, saves, shares, watch time collected', color: 'from-blue-600 to-cyan-500' },
    { title: '3. AI Signal Analysis', desc: 'Pattern extraction on save-to-view ratios', color: 'from-cyan-500 to-teal-500' },
    { title: '4. Extract Learnings', desc: 'Educational AI outperforming motivation by 2.4x', color: 'from-teal-500 to-emerald-500' },
    { title: '5. Updated Strategy', desc: 'Focus 80% capacity on tool tutorials', color: 'from-emerald-500 to-purple-600' },
    { title: '6. Next Content Created', desc: '5 AI Tools Reel generated & scheduled', color: 'from-purple-600 to-cyan-500' }
  ];

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div>
          <h1 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
            <BrainCircuit className="w-5 h-5 text-purple-400" /> AI Learning Engine & Feedback Loop
          </h1>
          <p className="text-xs text-slate-400">
            CreatorPilot continuously learns from content performance signals to evolve future strategies.
          </p>
        </div>

        <button
          onClick={onTriggerLearning}
          disabled={isLoading}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-cyan-500 hover:from-purple-500 hover:to-cyan-400 text-white font-semibold text-xs shadow-lg shadow-purple-500/20 transition-all"
        >
          <RotateCcw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
          <span>Re-Analyze Signals & Learn</span>
        </button>
      </div>

      {/* Interactive Visual AI Growth Loop Diagram */}
      <div className="p-6 rounded-2xl bg-gradient-to-br from-slate-900 via-purple-950/40 to-slate-900 border border-purple-500/40 shadow-xl space-y-5">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-bold text-purple-300 uppercase tracking-widest flex items-center gap-2">
            <Zap className="w-4 h-4 text-cyan-400" /> Autonomous Growth Cycle (Continuous Improvement Loop)
          </h2>
          <span className="text-xs text-cyan-300 font-semibold px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30">
            Self-Correcting Strategy
          </span>
        </div>

        {/* Visual Stepper Loop */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-3">
          {loopSteps.map((step, idx) => (
            <div
              key={idx}
              className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 space-y-2 relative flex flex-col justify-between"
            >
              <div>
                <div className="text-[10px] font-bold text-purple-400 uppercase tracking-wider mb-1">
                  Step {idx + 1}
                </div>
                <div className="text-xs font-bold text-white leading-tight">{step.title}</div>
                <p className="text-[11px] text-slate-400 mt-1 leading-relaxed">{step.desc}</p>
              </div>

              <div className="pt-2 flex items-center justify-end">
                <ArrowRight className="w-4 h-4 text-purple-400" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Structured Learnings Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* What Worked? */}
        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-3 glass-panel-hover">
          <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm border-b border-slate-800 pb-2">
            <CheckCircle2 className="w-5 h-5" /> What Worked?
          </div>
          <div className="text-xs font-semibold text-white leading-relaxed">
            "{latestLearning.whatWorked}"
          </div>
          <p className="text-[11px] text-slate-400">
            High-intent save actions indicate audience bookmarking for midterms.
          </p>
        </div>

        {/* What Didn't Work? */}
        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-3 glass-panel-hover">
          <div className="flex items-center gap-2 text-rose-400 font-bold text-sm border-b border-slate-800 pb-2">
            <XCircle className="w-5 h-5" /> What Didn't Work?
          </div>
          <div className="text-xs font-semibold text-white leading-relaxed">
            "{latestLearning.whatDidntWork}"
          </div>
          <p className="text-[11px] text-slate-400">
            Generic motivational quotes lack clear utility and get passed over in feed.
          </p>
        </div>

        {/* Audience Signal */}
        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-3 glass-panel-hover">
          <div className="flex items-center gap-2 text-cyan-400 font-bold text-sm border-b border-slate-800 pb-2">
            <Radio className="w-5 h-5" /> Audience Signal
          </div>
          <div className="text-xs font-semibold text-white leading-relaxed">
            "{latestLearning.audienceSignal}"
          </div>
          <p className="text-[11px] text-slate-400">
            Strong engagement spike observed on step-by-step tool walkthroughs.
          </p>
        </div>

        {/* AI Learned */}
        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-3 glass-panel-hover">
          <div className="flex items-center gap-2 text-purple-400 font-bold text-sm border-b border-slate-800 pb-2">
            <BrainCircuit className="w-5 h-5" /> AI Learned Strategy
          </div>
          <div className="text-xs font-semibold text-white leading-relaxed">
            "{latestLearning.aiLearned}"
          </div>
          <div className="text-[10px] font-bold text-purple-300 bg-purple-500/10 px-2 py-1 rounded inline-block">
            Impact: {latestLearning.impact}
          </div>
        </div>

        {/* Next Autonomous Recommendation */}
        <div className="lg:col-span-2 p-5 rounded-2xl bg-gradient-to-r from-purple-900/30 to-cyan-900/30 border border-purple-500/30 space-y-3">
          <div className="flex items-center justify-between border-b border-purple-500/20 pb-2">
            <span className="flex items-center gap-2 text-amber-300 font-bold text-sm">
              <Sparkles className="w-5 h-5 text-cyan-400" /> Next Autonomous Recommendation
            </span>
            <span className="text-[10px] font-mono text-purple-300">Confidence: 89%</span>
          </div>

          <div className="text-base font-bold text-white">
            "{latestLearning.nextRecommendation}"
          </div>

          <p className="text-xs text-slate-300 leading-relaxed">
            The AI strategy engine has automatically updated your next content queue to focus exclusively on high-conversion educational tool showcases.
          </p>
        </div>
      </div>
    </div>
  );
};
