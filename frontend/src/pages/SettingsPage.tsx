import React, { useState } from 'react';
import { Settings as SettingsIcon, ShieldCheck, Key, Bot, RefreshCw, PlayCircle, CheckCircle2 } from 'lucide-react';
import { api } from '../services/api';

interface SettingsPageProps {
  isDemoMode: boolean;
  onResetDemo: () => void;
  onRunCycle: () => void;
}

export const SettingsPage: React.FC<SettingsPageProps> = ({
  isDemoMode,
  onResetDemo,
  onRunCycle
}) => {
  const [apiKey, setApiKey] = useState<string>('');
  const [model, setModel] = useState<string>('gemini-1.5-flash');
  const [n8nUrl, setN8nUrl] = useState<string>('http://localhost:5678/webhook');
  const [demoToggle, setDemoToggle] = useState<boolean>(isDemoMode);
  const [saveStatus, setSaveStatus] = useState<string | null>(null);

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    setSaveStatus('Settings updated for local session.');
    setTimeout(() => setSaveStatus(null), 3000);
  };

  return (
    <div className="p-6 space-y-6 max-w-4xl mx-auto">
      {/* Header */}
      <div className="border-b border-slate-800 pb-5">
        <h1 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
          <SettingsIcon className="w-5 h-5 text-purple-400" /> Platform Settings
        </h1>
        <p className="text-xs text-slate-400">
          Configure AI API keys, n8n webhook triggers, and demonstration modes.
        </p>
      </div>

      {saveStatus && (
        <div className="p-4 rounded-xl bg-purple-950/40 border border-purple-500/30 text-purple-300 text-xs flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{saveStatus}</span>
        </div>
      )}

      {/* Demo Mode & Growth Cycle Launcher Box */}
      <div className="p-6 rounded-2xl bg-gradient-to-br from-purple-950/40 via-slate-900 to-slate-900 border border-purple-500/30 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-sm font-bold text-white flex items-center gap-2">
              <PlayCircle className="w-4 h-4 text-cyan-400" /> Growth Cycle Presentation Mode
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Launch the complete 12-step autonomous AI growth cycle for presentation judges.
            </p>
          </div>

          <button
            onClick={onRunCycle}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-cyan-500 hover:from-purple-500 hover:to-cyan-400 text-white font-bold text-xs shadow-lg shadow-purple-500/20 transition-all"
          >
            <PlayCircle className="w-4 h-4" />
            <span>Launch Full Demo Cycle</span>
          </button>
        </div>

        <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <RefreshCw className="w-4 h-4 text-slate-400" />
            <span className="text-xs text-slate-300">Reset database back to initial Bhavana demo state:</span>
          </div>
          <button
            onClick={onResetDemo}
            className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 transition-all"
          >
            Reset Database Demo Data
          </button>
        </div>
      </div>

      {/* API Configuration Form */}
      <form onSubmit={handleSaveSettings} className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-5">
        <h2 className="text-sm font-bold text-white flex items-center gap-2 border-b border-slate-800 pb-3">
          <Key className="w-4 h-4 text-purple-400" /> API Keys & Provider Settings
        </h2>

        <div className="space-y-4 text-xs">
          <div className="flex items-center justify-between p-3.5 rounded-xl bg-slate-800/40 border border-slate-800">
            <div>
              <div className="font-bold text-white">Enable DEMO_MODE</div>
              <div className="text-[11px] text-slate-400">
                When enabled or if no API key is set, CreatorPilot uses realistic simulated AI responses.
              </div>
            </div>
            <input
              type="checkbox"
              checked={demoToggle}
              onChange={e => setDemoToggle(e.target.checked)}
              className="w-5 h-5 accent-purple-600 rounded cursor-pointer"
            />
          </div>

          <div>
            <label className="block text-slate-400 font-semibold mb-1">AI Provider Model</label>
            <select
              value={model}
              onChange={e => setModel(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white focus:outline-none focus:border-purple-500 font-mono text-xs"
            >
              <option value="gemini-1.5-flash">Google Gemini 1.5 Flash (Recommended)</option>
              <option value="gemini-1.5-pro">Google Gemini 1.5 Pro</option>
              <option value="gpt-4o">OpenAI GPT-4o Compatible</option>
            </select>
          </div>

          <div>
            <label className="block text-slate-400 font-semibold mb-1">AI API Key (Stored in Backend .env)</label>
            <input
              type="password"
              placeholder="Paste your AI_API_KEY here..."
              value={apiKey}
              onChange={e => setApiKey(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white focus:outline-none focus:border-purple-500 font-mono text-xs"
            />
            <p className="text-[10px] text-slate-500 mt-1">
              API Keys are handled strictly by the backend Node service and never exposed to the frontend browser.
            </p>
          </div>

          <div>
            <label className="block text-slate-400 font-semibold mb-1">n8n Webhook URL (N8N_WEBHOOK_URL)</label>
            <input
              type="text"
              value={n8nUrl}
              onChange={e => setN8nUrl(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white focus:outline-none focus:border-purple-500 font-mono text-xs"
            />
          </div>
        </div>

        <div className="pt-3 flex items-center justify-end">
          <button
            type="submit"
            className="px-6 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs shadow-md transition-all"
          >
            Save Settings
          </button>
        </div>
      </form>
    </div>
  );
};
