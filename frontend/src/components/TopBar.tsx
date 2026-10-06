import React from 'react';
import { PlayCircle, Bell, Search, RefreshCw } from 'lucide-react';
import { CreatorProfile } from '../services/api';

interface TopBarProps {
  creator: CreatorProfile | null;
  onRunCycle: () => void;
  onResetDemo: () => void;
  isDemoMode: boolean;
  isLoading: boolean;
}

export const TopBar: React.FC<TopBarProps> = ({
  creator,
  onRunCycle,
  onResetDemo,
  isDemoMode,
  isLoading
}) => {
  const name = creator?.name || 'Bhavana';

  return (
    <header className="h-20 bg-slate-900/80 backdrop-blur-md border-b border-slate-800 px-6 flex items-center justify-between sticky top-0 z-20">
      {/* Welcome Greeting */}
      <div>
        <h1 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
          Good evening, {name} <span className="animate-bounce">👋</span>
        </h1>
        <p className="text-xs text-slate-400 font-medium">
          Your AI growth strategist has analyzed your latest content & signals.
        </p>
      </div>

      {/* Right Controls */}
      <div className="flex items-center gap-4">
        {/* Quick Reset Demo button */}
        <button
          onClick={onResetDemo}
          title="Reset to default Bhavana demo state"
          className="p-2 rounded-xl text-slate-400 hover:text-slate-200 bg-slate-800/60 hover:bg-slate-800 border border-slate-700/50 transition-all text-xs flex items-center gap-1.5"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin' : ''}`} />
          <span className="hidden sm:inline">Reset Demo</span>
        </button>

        {/* Global Growth Cycle Trigger Button */}
        <button
          onClick={onRunCycle}
          disabled={isLoading}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-500 hover:from-purple-500 hover:to-cyan-400 text-white font-semibold text-xs shadow-lg shadow-purple-500/25 transition-all hover:scale-102 active:scale-98 disabled:opacity-50"
        >
          <PlayCircle className="w-4 h-4 text-cyan-200" />
          <span>Run AI Growth Cycle</span>
        </button>

        {/* Notifications */}
        <button className="relative p-2.5 rounded-xl bg-slate-800/80 text-slate-300 hover:text-white border border-slate-700/60 transition-all">
          <Bell className="w-4 h-4" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-purple-500 rounded-full animate-ping" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-purple-500 rounded-full" />
        </button>

        {/* Creator Avatar & Platform Tag */}
        <div className="flex items-center gap-3 pl-2 border-l border-slate-800">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-purple-500 to-cyan-400 p-0.5 shadow-md">
            <div className="w-full h-full bg-slate-900 rounded-[10px] flex items-center justify-center font-bold text-sm text-purple-300">
              {name.substring(0, 2).toUpperCase()}
            </div>
          </div>
          <div className="hidden md:block text-left">
            <div className="text-xs font-bold text-slate-200">{name}</div>
            <div className="text-[10px] font-medium text-cyan-400">{creator?.mainPlatform || 'Instagram'} Creator</div>
          </div>
        </div>
      </div>
    </header>
  );
};
