import React, { useState, useEffect } from 'react';
import {
  X,
  CheckCircle2,
  Loader2,
  Sparkles,
  Zap,
  ArrowRight,
  TrendingUp,
  Brain,
  Bot,
  Calendar,
  Share2
} from 'lucide-react';
import { api, GrowthCycleStep, Recommendation, ContentItem, LearningInsight } from '../services/api';

interface GrowthCycleModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCycleComplete: () => void;
}

export const GrowthCycleModal: React.FC<GrowthCycleModalProps> = ({
  isOpen,
  onClose,
  onCycleComplete
}) => {
  const [currentStepIndex, setCurrentStepIndex] = useState<number>(0);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [cycleResult, setCycleResult] = useState<{
    steps: GrowthCycleStep[];
    recommendation: Recommendation;
    generatedContent: ContentItem;
    learning: LearningInsight;
    automationLogs: any[];
  } | null>(null);
  const [error, setError] = useState<string | null>(null);

  const stepTitles = [
    'Analyzing creator profile...',
    'Analyzing previous content...',
    'Checking trends...',
    'Identifying content opportunities...',
    'AI deciding next content strategy...',
    'Generating content package...',
    'Selecting publishing time...',
    'Sending automation request to n8n...',
    'Content scheduled.',
    'Monitoring performance...',
    'AI learning from results...',
    'Next recommendation generated.'
  ];

  useEffect(() => {
    if (isOpen) {
      startCycleExecution();
    } else {
      setCurrentStepIndex(0);
      setCycleResult(null);
      setIsProcessing(false);
      setError(null);
    }
  }, [isOpen]);

  const startCycleExecution = async () => {
    setIsProcessing(true);
    setCurrentStepIndex(0);
    setError(null);

    try {
      // Trigger backend growth cycle logic
      const result = await api.runFullGrowthCycle();

      // Animate progress through all 12 steps step-by-step for full visual impact
      for (let i = 0; i < stepTitles.length; i++) {
        setCurrentStepIndex(i);
        await new Promise(res => setTimeout(res, 450)); // smooth step delay
      }

      setCycleResult({
        steps: result.steps,
        recommendation: result.recommendation,
        generatedContent: result.generatedContent,
        learning: result.learning,
        automationLogs: result.automationLogs
      });
      setIsProcessing(false);
      onCycleComplete();
    } catch (err: any) {
      setError(err.message || 'Failed to complete AI growth cycle.');
      setIsProcessing(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-3xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]">
        {/* Modal Header */}
        <div className="p-5 border-b border-slate-800 bg-gradient-to-r from-purple-900/40 via-slate-900 to-cyan-900/30 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-purple-600 to-cyan-400 flex items-center justify-center shadow-lg shadow-purple-500/20">
              <Zap className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white tracking-tight flex items-center gap-2">
                Autonomous AI Growth Cycle
                <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30">
                  Full 12-Step Growth Loop
                </span>
              </h2>
              <p className="text-xs text-slate-400">
                COLLECT → UNDERSTAND → DECIDE → CREATE → SCHEDULE → MEASURE → LEARN → IMPROVE
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white bg-slate-800/60 hover:bg-slate-800 transition-all"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1">
          {/* Active Step Progress Stepper */}
          <div className="space-y-4">
            <div className="flex items-center justify-between text-xs font-semibold text-slate-400">
              <span className="text-purple-400 font-bold">
                Step {Math.min(currentStepIndex + 1, 12)} of 12
              </span>
              <span>
                {currentStepIndex === 11 && !isProcessing
                  ? 'AI Growth Cycle Completed ✓'
                  : 'Executing AI Agent Pipeline...'}
              </span>
            </div>

            {/* Progress Bar */}
            <div className="w-full h-2.5 bg-slate-800 rounded-full overflow-hidden p-0.5 border border-slate-700/50">
              <div
                className="h-full bg-gradient-to-r from-purple-600 via-blue-500 to-cyan-400 rounded-full transition-all duration-300 shadow-md shadow-cyan-500/30"
                style={{ width: `${((currentStepIndex + 1) / 12) * 100}%` }}
              />
            </div>

            {/* Stepper Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5 pt-2">
              {stepTitles.map((title, idx) => {
                const isDone = idx < currentStepIndex || (idx === 11 && !isProcessing);
                const isCurrent = idx === currentStepIndex && isProcessing;

                return (
                  <div
                    key={idx}
                    className={`flex items-center gap-3 p-3 rounded-xl border text-xs transition-all ${
                      isDone
                        ? 'bg-purple-950/20 border-purple-500/30 text-purple-200'
                        : isCurrent
                        ? 'bg-cyan-950/40 border-cyan-500/50 text-cyan-200 shadow-lg shadow-cyan-500/10 animate-pulse'
                        : 'bg-slate-800/30 border-slate-800 text-slate-500'
                    }`}
                  >
                    {isDone ? (
                      <CheckCircle2 className="w-4 h-4 text-purple-400 shrink-0" />
                    ) : isCurrent ? (
                      <Loader2 className="w-4 h-4 text-cyan-400 animate-spin shrink-0" />
                    ) : (
                      <div className="w-4 h-4 rounded-full border border-slate-700 flex items-center justify-center text-[10px] text-slate-500 shrink-0">
                        {idx + 1}
                      </div>
                    )}
                    <span className="font-medium tracking-wide">{title}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Results Summary Box (Appears when cycle completes) */}
          {cycleResult && !isProcessing && (
            <div className="p-5 rounded-xl bg-gradient-to-br from-slate-900 via-purple-950/30 to-slate-900 border border-purple-500/30 space-y-4 animate-fadeIn">
              <div className="flex items-center justify-between border-b border-purple-500/20 pb-3">
                <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
                  <CheckCircle2 className="w-5 h-5" />
                  <span>AI Growth Cycle Completed Successfully ✓</span>
                </div>
                <span className="text-xs text-slate-400 font-mono">
                  Confidence Score: {cycleResult.recommendation.confidence}%
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {/* Decision Summary */}
                <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 space-y-1">
                  <div className="text-[11px] font-semibold text-purple-400 uppercase tracking-wider flex items-center gap-1">
                    <TrendingUp className="w-3.5 h-3.5" /> Recommended Topic
                  </div>
                  <div className="text-xs font-bold text-white line-clamp-2">
                    {cycleResult.recommendation.recommendedTopic}
                  </div>
                  <div className="text-[10px] text-slate-400 pt-1">
                    Format: <span className="text-cyan-300 font-semibold">{cycleResult.recommendation.format}</span>
                  </div>
                </div>

                {/* Content Generated */}
                <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 space-y-1">
                  <div className="text-[11px] font-semibold text-cyan-400 uppercase tracking-wider flex items-center gap-1">
                    <Sparkles className="w-3.5 h-3.5" /> Generated Hook
                  </div>
                  <div className="text-xs font-medium text-slate-200 line-clamp-2 italic">
                    "{cycleResult.generatedContent.hook}"
                  </div>
                  <div className="text-[10px] text-slate-400 pt-1">
                    Status: <span className="text-purple-300 font-semibold">{cycleResult.generatedContent.status}</span>
                  </div>
                </div>

                {/* AI Learning */}
                <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 space-y-1">
                  <div className="text-[11px] font-semibold text-emerald-400 uppercase tracking-wider flex items-center gap-1">
                    <Brain className="w-3.5 h-3.5" /> AI Insight Learned
                  </div>
                  <div className="text-xs font-medium text-slate-200 line-clamp-2">
                    {cycleResult.learning.aiLearned}
                  </div>
                  <div className="text-[10px] text-emerald-400 font-semibold pt-1">
                    Impact: {cycleResult.learning.impact}
                  </div>
                </div>
              </div>

              {/* n8n Automation Log Confirmation */}
              <div className="p-3 rounded-lg bg-slate-950/60 border border-slate-800 text-xs flex items-center justify-between text-slate-400">
                <div className="flex items-center gap-2">
                  <Bot className="w-4 h-4 text-cyan-400" />
                  <span>n8n Workflow Execution: Triggered Schedule & Performance Listeners</span>
                </div>
                <span className="font-mono text-[10px] text-purple-400 bg-purple-500/10 px-2 py-0.5 rounded-md border border-purple-500/20">
                  Status: Simulated/Live OK
                </span>
              </div>
            </div>
          )}

          {error && (
            <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs">
              Error executing growth cycle: {error}
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-4 border-t border-slate-800 bg-slate-900 flex items-center justify-between">
          <div className="text-xs text-slate-500">
            {isProcessing ? 'Processing AI models & n8n webhooks...' : 'Database & Dashboard synchronized.'}
          </div>
          <button
            onClick={onClose}
            disabled={isProcessing}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-500 hover:to-cyan-500 text-white font-semibold text-xs shadow-lg shadow-purple-500/20 transition-all disabled:opacity-50"
          >
            <span>Close & View Updated Dashboard</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
