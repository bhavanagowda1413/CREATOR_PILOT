import React from 'react';
import {
  LayoutDashboard,
  Target,
  Sparkles,
  Calendar,
  BarChart3,
  BrainCircuit,
  Bot,
  User,
  Settings,
  PlayCircle,
  Zap
} from 'lucide-react';

export type PageId =
  | 'dashboard'
  | 'strategy'
  | 'studio'
  | 'calendar'
  | 'analytics'
  | 'learning'
  | 'automation'
  | 'profile'
  | 'settings';

interface SidebarProps {
  activePage: PageId;
  setActivePage: (page: PageId) => void;
  onRunCycle: () => void;
  isDemoMode: boolean;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activePage,
  setActivePage,
  onRunCycle,
  isDemoMode
}) => {
  const navItems = [
    { id: 'dashboard' as PageId, label: 'Dashboard', icon: LayoutDashboard },
    { id: 'strategy' as PageId, label: 'Content Strategy', icon: Target },
    { id: 'studio' as PageId, label: 'AI Content Studio', icon: Sparkles, badge: 'AI' },
    { id: 'calendar' as PageId, label: 'Content Calendar', icon: Calendar },
    { id: 'analytics' as PageId, label: 'Analytics', icon: BarChart3 },
    { id: 'learning' as PageId, label: 'AI Learning', icon: BrainCircuit, highlight: true },
    { id: 'automation' as PageId, label: 'Automation / n8n', icon: Bot },
    { id: 'profile' as PageId, label: 'Creator Profile', icon: User },
    { id: 'settings' as PageId, label: 'Settings', icon: Settings }
  ];

  return (
    <aside className="w-64 bg-slate-900 border-r border-slate-800 flex flex-col h-screen sticky top-0 z-30 select-none">
      {/* Brand Header */}
      <div className="p-5 border-b border-slate-800 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-purple-600 to-cyan-500 flex items-center justify-center shadow-lg shadow-purple-500/20">
            <Zap className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="font-bold text-lg text-white tracking-tight leading-tight">CreatorPilot</h1>
            <p className="text-xs text-purple-400 font-medium">Autonomous Growth Agent</p>
          </div>
        </div>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        <div className="px-3 pb-2 text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
          Strategic Suite
        </div>
        {navItems.map(item => {
          const Icon = item.icon;
          const isActive = activePage === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActivePage(item.id)}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all ${
                isActive
                  ? 'bg-gradient-to-r from-purple-600/20 to-blue-600/20 text-purple-300 border border-purple-500/30 shadow-sm'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
              }`}
            >
              <div className="flex items-center gap-3">
                <Icon className={`w-4 h-4 ${isActive ? 'text-purple-400' : 'text-slate-400'}`} />
                <span>{item.label}</span>
              </div>
              {item.badge && (
                <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-md bg-purple-500/20 text-purple-300 border border-purple-500/30">
                  {item.badge}
                </span>
              )}
              {item.highlight && !isActive && (
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
              )}
            </button>
          );
        })}
      </nav>

      {/* Autonomous Growth CTA Banner */}
      <div className="p-4 border-t border-slate-800 bg-slate-900/90">
        <div className="p-3.5 rounded-xl bg-gradient-to-br from-purple-900/40 to-slate-800 border border-purple-500/20 text-left">
          <div className="flex items-center gap-2 mb-1.5">
            <span className="text-xs font-semibold text-purple-300 uppercase tracking-wide flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" /> Autonomous Growth
            </span>
          </div>
          <p className="text-xs text-slate-300 mb-3 leading-relaxed">
            Run the complete AI-powered content growth cycle automatically.
          </p>
          <button
            onClick={onRunCycle}
            className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-lg bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-500 hover:to-cyan-500 text-white font-medium text-xs shadow-lg shadow-purple-500/25 transition-all active:scale-98"
          >
            <PlayCircle className="w-4 h-4" />
            <span>Run AI Growth Cycle</span>
          </button>
        </div>

        {/* Demo Mode Badge */}
        <div className="mt-3 text-center">
          <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold ${
            isDemoMode
              ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
              : 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
          }`}>
            <span className={`w-1.5 h-1.5 rounded-full ${isDemoMode ? 'bg-amber-400 animate-ping' : 'bg-emerald-400'}`} />
            {isDemoMode ? 'DEMO MODE ACTIVE' : 'LIVE AI MODE'}
          </span>
        </div>
      </div>
    </aside>
  );
};
