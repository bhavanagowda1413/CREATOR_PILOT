import React from 'react';
import {
  BarChart3,
  TrendingUp,
  Eye,
  Bookmark,
  Share2,
  ThumbsUp,
  MessageSquare,
  Clock,
  Users
} from 'lucide-react';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend
} from 'recharts';
import { AnalyticsSummary } from '../services/api';

interface AnalyticsPageProps {
  analytics: AnalyticsSummary | null;
}

export const AnalyticsPage: React.FC<AnalyticsPageProps> = ({ analytics }) => {
  const summary = analytics?.summary || {
    totalViews: 45700,
    totalLikes: 4050,
    totalComments: 520,
    totalShares: 1750,
    totalSaves: 2910,
    avgEngagement: 18.1,
    totalPostsPublished: 4,
    isDemoData: true
  };

  // Sample Recharts dataset for engagement over time
  const timeData = [
    { date: 'Oct 1', views: 4200, saves: 90, engagement: 11.6, category: 'Motivation' },
    { date: 'Oct 2', views: 8500, saves: 420, engagement: 16.3, category: 'Coding' },
    { date: 'Oct 3', views: 15000, saves: 1100, engagement: 22.2, category: 'AI Tools' },
    { date: 'Oct 4', views: 18000, saves: 1300, engagement: 22.3, category: 'AI Tools' }
  ];

  // Category breakdown data
  const categoryData = [
    { name: 'AI Tools', views: 33000, saves: 2400, engagement: 22.3 },
    { name: 'Coding', views: 8500, saves: 420, engagement: 16.3 },
    { name: 'Productivity', views: 6200, saves: 380, engagement: 14.8 },
    { name: 'Motivation', views: 4200, saves: 90, engagement: 11.6 }
  ];

  // Format breakdown data
  const formatData = [
    { format: 'Reels', views: 37200, saves: 2490 },
    { format: 'Carousels', views: 8500, saves: 420 },
    { format: 'Single Posts', views: 2100, saves: 60 }
  ];

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div>
          <h1 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-purple-400" /> Performance Analytics
          </h1>
          <p className="text-xs text-slate-400">
            Real-time engagement signals, category watch time, and save-to-share conversions.
          </p>
        </div>

        <span className="px-3 py-1 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20 text-xs font-semibold self-start sm:self-auto">
          DEMO ANALYTICS DATASET
        </span>
      </div>

      {/* KPI Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-3">
        {[
          { label: 'Views', val: summary.totalViews.toLocaleString(), icon: Eye, color: 'text-cyan-400' },
          { label: 'Likes', val: summary.totalLikes.toLocaleString(), icon: ThumbsUp, color: 'text-blue-400' },
          { label: 'Comments', val: summary.totalComments.toLocaleString(), icon: MessageSquare, color: 'text-purple-400' },
          { label: 'Shares', val: summary.totalShares.toLocaleString(), icon: Share2, color: 'text-indigo-400' },
          { label: 'Saves', val: summary.totalSaves.toLocaleString(), icon: Bookmark, color: 'text-emerald-400' },
          { label: 'Avg Engagement', val: `${summary.avgEngagement}%`, icon: TrendingUp, color: 'text-purple-300' },
          { label: 'Avg Watch Time', val: '82%', icon: Clock, color: 'text-amber-400' },
          { label: 'Follower Growth', val: '+420/wk', icon: Users, color: 'text-teal-400' }
        ].map((kpi, idx) => {
          const Icon = kpi.icon;
          return (
            <div key={idx} className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
              <div className="flex items-center justify-between text-[11px] text-slate-400">
                <span>{kpi.label}</span>
                <Icon className={`w-3.5 h-3.5 ${kpi.color}`} />
              </div>
              <div className="text-base font-bold text-white tracking-tight">{kpi.val}</div>
            </div>
          );
        })}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Chart 1: Engagement Over Time */}
        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <h3 className="font-bold text-white text-sm flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-purple-400" /> Engagement Rate & Saves Over Time
            </h3>
            <span className="text-[10px] text-emerald-400 font-bold bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
              AI Tools Spike (+140%)
            </span>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={timeData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                <XAxis dataKey="date" stroke="#64748b" fontSize={11} />
                <YAxis stroke="#64748b" fontSize={11} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '0.75rem', fontSize: '12px' }}
                />
                <Legend wrapperStyle={{ fontSize: '11px' }} />
                <Line type="monotone" dataKey="engagement" name="Engagement Rate (%)" stroke="#8b5cf6" strokeWidth={3} dot={{ r: 4 }} />
                <Line type="monotone" dataKey="saves" name="Saves Count" stroke="#06b6d4" strokeWidth={2} dot={{ r: 4 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Chart 2: Views & Saves by Content Category */}
        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <h3 className="font-bold text-white text-sm flex items-center gap-2">
              <BarChart3 className="w-4 h-4 text-cyan-400" /> Performance by Content Category
            </h3>
            <span className="text-[10px] text-purple-400 font-bold bg-purple-500/10 px-2 py-0.5 rounded border border-purple-500/20">
              AI Tools Dominates
            </span>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={categoryData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                <XAxis dataKey="name" stroke="#64748b" fontSize={11} />
                <YAxis stroke="#64748b" fontSize={11} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '0.75rem', fontSize: '12px' }}
                />
                <Legend wrapperStyle={{ fontSize: '11px' }} />
                <Bar dataKey="views" name="Total Views" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                <Bar dataKey="saves" name="High Intent Saves" fill="#10b981" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Top Performing Content Posts Table */}
      <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
        <h3 className="font-bold text-white text-sm flex items-center gap-2 border-b border-slate-800 pb-3">
          <Bookmark className="w-4 h-4 text-emerald-400" /> Top-Performing Posts Dataset (AI Signal Inputs)
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400 uppercase tracking-wider text-[10px]">
                <th className="py-2.5 px-3">Topic</th>
                <th className="py-2.5 px-3">Category</th>
                <th className="py-2.5 px-3">Views</th>
                <th className="py-2.5 px-3">Likes</th>
                <th className="py-2.5 px-3">Shares</th>
                <th className="py-2.5 px-3">Saves</th>
                <th className="py-2.5 px-3">Engagement</th>
                <th className="py-2.5 px-3">AI Recommendation Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              <tr className="hover:bg-slate-800/30">
                <td className="py-3 px-3 font-bold text-white">Free AI Websites</td>
                <td className="py-3 px-3 text-cyan-300">AI Tools</td>
                <td className="py-3 px-3 font-mono text-slate-200">18,000</td>
                <td className="py-3 px-3 text-slate-300">1,700</td>
                <td className="py-3 px-3 text-slate-300">800</td>
                <td className="py-3 px-3 font-bold text-emerald-400">1,300</td>
                <td className="py-3 px-3 font-bold text-purple-300">22.3%</td>
                <td className="py-3 px-3"><span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300">Double Down</span></td>
              </tr>
              <tr className="hover:bg-slate-800/30">
                <td className="py-3 px-3 font-bold text-white">AI Tools for Students</td>
                <td className="py-3 px-3 text-cyan-300">AI Tools</td>
                <td className="py-3 px-3 font-mono text-slate-200">15,000</td>
                <td className="py-3 px-3 text-slate-300">1,400</td>
                <td className="py-3 px-3 text-slate-300">650</td>
                <td className="py-3 px-3 font-bold text-emerald-400">1,100</td>
                <td className="py-3 px-3 font-bold text-purple-300">22.2%</td>
                <td className="py-3 px-3"><span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300">Scale Reel Format</span></td>
              </tr>
              <tr className="hover:bg-slate-800/30">
                <td className="py-3 px-3 font-bold text-white">Java Tips</td>
                <td className="py-3 px-3 text-blue-300">Coding</td>
                <td className="py-3 px-3 font-mono text-slate-200">8,500</td>
                <td className="py-3 px-3 text-slate-300">650</td>
                <td className="py-3 px-3 text-slate-300">240</td>
                <td className="py-3 px-3 text-slate-300">420</td>
                <td className="py-3 px-3 text-slate-300">16.3%</td>
                <td className="py-3 px-3"><span className="text-[10px] font-bold px-2 py-0.5 rounded bg-blue-500/20 text-blue-300">Maintain Weekly</span></td>
              </tr>
              <tr className="hover:bg-slate-800/30">
                <td className="py-3 px-3 font-bold text-white">Coding Motivation</td>
                <td className="py-3 px-3 text-amber-300">Motivation</td>
                <td className="py-3 px-3 font-mono text-slate-200">4,200</td>
                <td className="py-3 px-3 text-slate-300">300</td>
                <td className="py-3 px-3 text-slate-300">60</td>
                <td className="py-3 px-3 text-amber-400">90</td>
                <td className="py-3 px-3 text-amber-400">11.6%</td>
                <td className="py-3 px-3"><span className="text-[10px] font-bold px-2 py-0.5 rounded bg-rose-500/20 text-rose-300">Reduce Frequency</span></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
