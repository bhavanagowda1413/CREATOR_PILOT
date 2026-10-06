import React, { useState } from 'react';
import {
  Calendar as CalendarIcon,
  Clock,
  Plus,
  CheckCircle2,
  AlertCircle,
  Filter,
  Trash2,
  Edit,
  Sparkles,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { ContentItem, api } from '../services/api';
import { PageId } from '../components/Sidebar';

interface CalendarPageProps {
  content: ContentItem[];
  onContentUpdated: () => void;
  setActivePage: (page: PageId) => void;
}

export const CalendarPage: React.FC<CalendarPageProps> = ({
  content,
  onContentUpdated,
  setActivePage
}) => {
  const [filterStatus, setFilterStatus] = useState<string>('ALL');

  const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  const filteredContent = filterStatus === 'ALL'
    ? content
    : content.filter(c => c.status === filterStatus);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'SCHEDULED':
        return 'bg-cyan-500/20 text-cyan-300 border-cyan-500/30';
      case 'PUBLISHED':
        return 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30';
      case 'RECOMMENDED':
        return 'bg-purple-500/20 text-purple-300 border-purple-500/30';
      case 'DRAFT':
        return 'bg-amber-500/20 text-amber-300 border-amber-500/30';
      case 'ANALYZING':
        return 'bg-blue-500/20 text-blue-300 border-blue-500/30';
      default:
        return 'bg-slate-700 text-slate-300';
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm('Delete this scheduled item?')) {
      await api.deleteContent(id);
      onContentUpdated();
    }
  };

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div>
          <h1 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
            <CalendarIcon className="w-5 h-5 text-cyan-400" /> Content Calendar
          </h1>
          <p className="text-xs text-slate-400">
            Publishing schedule & AI recommended posting windows.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setActivePage('studio')}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-cyan-500 hover:from-purple-500 hover:to-cyan-400 text-white font-semibold text-xs shadow-lg shadow-purple-500/20 transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>Create & Schedule Content</span>
          </button>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-2xl bg-slate-900 border border-slate-800">
        <div className="flex items-center gap-2 text-xs">
          <Filter className="w-4 h-4 text-slate-400" />
          <span className="text-slate-400 font-semibold">Filter Status:</span>
          {['ALL', 'SCHEDULED', 'PUBLISHED', 'RECOMMENDED', 'DRAFT'].map(st => (
            <button
              key={st}
              onClick={() => setFilterStatus(st)}
              className={`px-3 py-1.5 rounded-lg font-semibold transition-all ${
                filterStatus === st
                  ? 'bg-purple-600 text-white shadow'
                  : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
              }`}
            >
              {st}
            </button>
          ))}
        </div>

        <div className="text-xs font-semibold text-slate-400 flex items-center gap-2">
          <Clock className="w-4 h-4 text-cyan-400" />
          <span>Optimal Posting Window: <strong className="text-cyan-300">7:30 PM - 8:30 PM</strong></span>
        </div>
      </div>

      {/* Weekly Visual Grid */}
      <div className="grid grid-cols-1 md:grid-cols-7 gap-3">
        {daysOfWeek.map((day, idx) => {
          const isToday = idx === 1; // Tuesday demo current day
          return (
            <div
              key={day}
              className={`p-3 rounded-2xl border flex flex-col justify-between min-h-[140px] ${
                isToday
                  ? 'bg-purple-950/20 border-purple-500/40 shadow-lg shadow-purple-500/10'
                  : 'bg-slate-900 border-slate-800'
              }`}
            >
              <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                <span className={`text-xs font-bold ${isToday ? 'text-purple-300' : 'text-slate-400'}`}>
                  {day}
                </span>
                {isToday && (
                  <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-purple-500/20 text-purple-300">
                    Today
                  </span>
                )}
              </div>

              <div className="py-2 space-y-1.5">
                {idx === 0 && (
                  <div className="p-2 rounded-lg bg-slate-800/60 border border-slate-700 text-[11px]">
                    <div className="font-bold text-white line-clamp-1">AI Tools Showcase</div>
                    <div className="text-[9px] text-cyan-400 font-semibold">8:00 PM • Reel</div>
                  </div>
                )}
                {idx === 2 && (
                  <div className="p-2 rounded-lg bg-slate-800/60 border border-slate-700 text-[11px]">
                    <div className="font-bold text-white line-clamp-1">Code Debugging</div>
                    <div className="text-[9px] text-cyan-400 font-semibold">7:30 PM • Reel</div>
                  </div>
                )}
                {idx === 4 && (
                  <div className="p-2 rounded-lg bg-slate-800/60 border border-slate-700 text-[11px]">
                    <div className="font-bold text-white line-clamp-1">Java Developer Tips</div>
                    <div className="text-[9px] text-purple-300 font-semibold">6:30 PM • Carousel</div>
                  </div>
                )}
              </div>

              <div className="text-[10px] text-slate-500 font-mono text-center">
                AI Slot Ready
              </div>
            </div>
          );
        })}
      </div>

      {/* Content List View */}
      <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
        <h2 className="text-sm font-bold text-white flex items-center gap-2 border-b border-slate-800 pb-3">
          <CalendarIcon className="w-4 h-4 text-purple-400" /> Scheduled & Published Items ({filteredContent.length})
        </h2>

        <div className="space-y-3">
          {filteredContent.map(item => (
            <div
              key={item.id}
              className="p-4 rounded-xl bg-slate-800/40 border border-slate-800 hover:border-purple-500/30 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4"
            >
              <div className="space-y-1 max-w-2xl">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-purple-500/20 text-purple-300 border border-purple-500/30">
                    {item.format}
                  </span>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${getStatusBadge(item.status)}`}>
                    {item.status}
                  </span>
                  <span className="text-[10px] font-semibold text-cyan-300 flex items-center gap-1">
                    <Clock className="w-3 h-3" /> Scheduled: {new Date(item.scheduledAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>

                <h3 className="text-sm font-bold text-white">{item.topic}</h3>
                <p className="text-xs text-slate-400 italic line-clamp-1">"{item.hook}"</p>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={() => setActivePage('studio')}
                  className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 flex items-center gap-1"
                >
                  <Edit className="w-3.5 h-3.5 text-purple-400" />
                  <span>Edit</span>
                </button>
                <button
                  onClick={() => handleDelete(item.id)}
                  className="p-1.5 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/20 transition-all"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
