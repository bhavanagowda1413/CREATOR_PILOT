import React, { useState } from 'react';
import {
  Bot,
  Zap,
  PlayCircle,
  CheckCircle2,
  AlertCircle,
  Terminal,
  Layers,
  ArrowRight,
  Code2,
  Send,
  RefreshCw
} from 'lucide-react';
import { api } from '../services/api';

export const AutomationPage: React.FC = () => {
  const [selectedEndpoint, setSelectedEndpoint] = useState<'analyze' | 'generate' | 'schedule' | 'performance' | 'learning'>('analyze');
  const [payloadInput, setPayloadInput] = useState<string>(
    JSON.stringify(
      {
        creator: { name: 'Bhavana', niche: 'Technology & AI', platform: 'Instagram' },
        content: { topic: '5 AI Tools Every College Student Should Know', format: 'REEL' },
        performance: { views: 15000, likes: 1400, shares: 650, saves: 1100 }
      },
      null,
      2
    )
  );

  const [testResult, setTestResult] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleTestTrigger = async () => {
    setIsLoading(true);
    setTestResult(null);
    try {
      const parsed = JSON.parse(payloadInput);
      const res = await api.triggerAutomationEvent(selectedEndpoint, parsed);
      setTestResult(res);
    } catch (err: any) {
      setTestResult({ error: `Invalid JSON or execution error: ${err.message}` });
    } finally {
      setIsLoading(false);
    }
  };

  const workflows = [
    {
      id: 'wf-1',
      title: 'Workflow 1: Content Intelligence Workflow',
      desc: 'Webhook → Get Creator Profile → Get Performance Data → AI Agent → Decision Parser → Store Recommendation',
      status: 'Active / Webhook Ready'
    },
    {
      id: 'wf-2',
      title: 'Workflow 2: Content Creation Workflow',
      desc: 'Trigger → AI Content Generator → Hook & Script → Caption & Hashtags → Save Content → Notify Creator',
      status: 'Active / Webhook Ready'
    },
    {
      id: 'wf-3',
      title: 'Workflow 3: Continuous Learning Workflow',
      desc: 'Performance Webhook → Calculate Engagement → AI Analysis → Extract Learnings → Update Strategy → Next Recommendation',
      status: 'Active / Webhook Ready'
    }
  ];

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div>
          <h1 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
            <Bot className="w-5 h-5 text-cyan-400" /> n8n Workflow Automation & Integration
          </h1>
          <p className="text-xs text-slate-400">
            Decoupled backend automation service triggering multi-step n8n webhook pipelines.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-3 py-1.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-semibold flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            n8n Dispatcher Ready
          </span>
        </div>
      </div>

      {/* Workflow Architecture Visual Cards */}
      <div className="space-y-4">
        <h2 className="text-sm font-bold text-white flex items-center gap-2">
          <Layers className="w-4 h-4 text-purple-400" /> Configured n8n Automation Workflows
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {workflows.map(wf => (
            <div
              key={wf.id}
              className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-3 glass-panel-hover"
            >
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-purple-500/20 text-purple-300 border border-purple-500/30">
                  n8n Pipeline
                </span>
                <span className="text-[10px] font-semibold text-emerald-400">
                  {wf.status}
                </span>
              </div>

              <h3 className="text-xs font-bold text-white leading-tight">{wf.title}</h3>

              <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 text-[11px] font-mono text-cyan-300 leading-relaxed">
                {wf.desc}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Interactive Webhook Test Console */}
      <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
          <h2 className="text-sm font-bold text-white flex items-center gap-2">
            <Terminal className="w-4 h-4 text-cyan-400" /> Interactive n8n Webhook Test Console
          </h2>

          <div className="flex items-center gap-2">
            <label className="text-xs font-semibold text-slate-400">Endpoint:</label>
            <select
              value={selectedEndpoint}
              onChange={e => setSelectedEndpoint(e.target.value as any)}
              className="px-3 py-1.5 rounded-lg bg-slate-800 border border-slate-700 text-xs font-mono text-purple-300 focus:outline-none"
            >
              <option value="analyze">POST /api/automation/analyze</option>
              <option value="generate">POST /api/automation/generate</option>
              <option value="schedule">POST /api/automation/schedule</option>
              <option value="performance">POST /api/automation/performance</option>
              <option value="learning">POST /api/automation/learning</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left: Payload JSON Editor */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs text-slate-400 font-semibold">
              <span className="flex items-center gap-1.5"><Code2 className="w-3.5 h-3.5 text-purple-400" /> Webhook Payload (JSON)</span>
            </div>
            <textarea
              rows={10}
              value={payloadInput}
              onChange={e => setPayloadInput(e.target.value)}
              className="w-full p-4 rounded-xl bg-slate-950/80 border border-slate-800 font-mono text-xs text-purple-200 focus:outline-none focus:border-purple-500/60 leading-relaxed"
            />
            <button
              onClick={handleTestTrigger}
              disabled={isLoading}
              className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-cyan-500 hover:from-purple-500 hover:to-cyan-400 text-white font-bold text-xs shadow-lg shadow-purple-500/20 transition-all disabled:opacity-50"
            >
              <Send className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
              <span>{isLoading ? 'Dispatching Webhook...' : `Trigger /api/automation/${selectedEndpoint}`}</span>
            </button>
          </div>

          {/* Right: Response Output Viewer */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs text-slate-400 font-semibold">
              <span className="flex items-center gap-1.5"><Terminal className="w-3.5 h-3.5 text-cyan-400" /> n8n / Backend Response Output</span>
              {testResult?.status && (
                <span className="text-[10px] font-mono font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                  Status: {testResult.status}
                </span>
              )}
            </div>
            <div className="w-full h-[250px] p-4 rounded-xl bg-slate-950/80 border border-slate-800 font-mono text-xs text-cyan-300 overflow-y-auto whitespace-pre-wrap leading-relaxed">
              {testResult ? (
                JSON.stringify(testResult, null, 2)
              ) : (
                <span className="text-slate-600 italic">// Click trigger to send payload to backend automation service & inspect response logs...</span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
