import React, { useState } from 'react';
import {
  Sparkles,
  Play,
  Copy,
  Check,
  Send,
  Calendar,
  Save,
  RotateCw,
  Edit3,
  Bot,
  Video,
  Hash,
  MessageSquare,
  Clock,
  Target
} from 'lucide-react';
import { api, CreatorProfile, ContentItem } from '../services/api';
import { PageId } from '../components/Sidebar';

interface StudioPageProps {
  creator: CreatorProfile | null;
  setActivePage: (page: PageId) => void;
  onContentSaved: () => void;
}

export const StudioPage: React.FC<StudioPageProps> = ({
  creator,
  setActivePage,
  onContentSaved
}) => {
  // Input states
  const [topic, setTopic] = useState<string>('5 AI Tools Every College Student Should Know');
  const [platform, setPlatform] = useState<string>(creator?.mainPlatform || 'Instagram');
  const [format, setFormat] = useState<'REEL' | 'CAROUSEL' | 'STORY' | 'POST'>('REEL');
  const [tone, setTone] = useState<string>(creator?.brandTone || 'Simple, educational and energetic');
  const [audience, setAudience] = useState<string>(creator?.targetAudience || 'College students and beginner developers');
  const [goal, setGoal] = useState<string>(creator?.growthGoal || 'Increase engagement and saves');

  // Generation state
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [n8nStatus, setN8nStatus] = useState<string | null>(null);

  // Generated Package State
  const [contentPackage, setContentPackage] = useState<{
    topic: string;
    format: 'REEL' | 'CAROUSEL' | 'STORY' | 'POST';
    hook: string;
    script: string;
    caption: string;
    hashtags: string[];
    cta: string;
    visualPlan: string;
    recommendedTime: string;
    objective: string;
    reasoning: string[];
  }>({
    topic: '5 AI Tools Every College Student Should Know',
    format: 'REEL',
    hook: "You're wasting hours doing tasks AI can finish in 3 minutes.",
    script: "0-3s: Hook showing heavy textbook stack & frustrated student overlay.\n3-8s: Tool 1 - Perplexity AI for instant academic paper citations.\n8-13s: Tool 2 - Gamma App for generating slide decks in 60 seconds.\n13-18s: Tool 3 - Notion AI for summarizing lecture recordings.\n18-22s: Call to Action: Save this reel before midterms start!",
    caption: "Stop grinding manually when smart tools exist! 🚀 Here are 3 game-changing AI tools every student and developer needs in their toolkit right now.\n\nWhich one are you trying first? Drop a comment below! 👇",
    hashtags: ['#AITools', '#StudentHacks', '#CollegeTech', '#ProductivityAI', '#CreatorPilot'],
    cta: 'Save this reel for your next project & share with a classmate!',
    visualPlan: 'Fast-paced screen recording cutaways, bold yellow text overlays, energetic background beat.',
    recommendedTime: '8:00 PM',
    objective: 'SAVES_AND_SHARES',
    reasoning: [
      'Hook directly targets student pain point (manual assignment grind).',
      'Scene-by-scene timing holds 86%+ watch completion retention.',
      'Call to action specifically optimizes save algorithm signals.'
    ]
  });

  const handleGenerate = async () => {
    setIsGenerating(true);
    setN8nStatus(null);
    try {
      const res = await api.generateAIContent({
        topic,
        platform,
        format,
        tone,
        audience,
        goal
      });
      if (res.contentPackage) {
        setContentPackage(res.contentPackage);
      }
    } catch (err) {
      console.error('Error generating content package:', err);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSaveDraft = async () => {
    try {
      await api.createContent({
        topic: contentPackage.topic,
        platform,
        format: contentPackage.format,
        hook: contentPackage.hook,
        script: contentPackage.script,
        caption: contentPackage.caption,
        hashtags: contentPackage.hashtags,
        cta: contentPackage.cta,
        visualPlan: contentPackage.visualPlan,
        status: 'DRAFT',
        priority: 'HIGH',
        scheduledAt: new Date(Date.now() + 86400000).toISOString()
      });
      onContentSaved();
      alert('Content saved as Draft in SQLite database!');
    } catch (err) {
      alert('Failed to save content draft.');
    }
  };

  const handleSchedulePost = async () => {
    try {
      await api.createContent({
        topic: contentPackage.topic,
        platform,
        format: contentPackage.format,
        hook: contentPackage.hook,
        script: contentPackage.script,
        caption: contentPackage.caption,
        hashtags: contentPackage.hashtags,
        cta: contentPackage.cta,
        visualPlan: contentPackage.visualPlan,
        status: 'SCHEDULED',
        priority: 'HIGH',
        scheduledAt: new Date(Date.now() + 86400000).toISOString()
      });
      onContentSaved();
      setActivePage('calendar');
    } catch (err) {
      alert('Failed to schedule post.');
    }
  };

  const handleSendToN8n = async () => {
    setN8nStatus('Sending payload to n8n webhook...');
    try {
      const result = await api.triggerAutomationEvent('generate', {
        creator: { name: creator?.name, niche: creator?.niche, platform },
        content: contentPackage
      });
      setN8nStatus(`n8n Triggered! Status: ${result.status} (Log ID: ${result.logId})`);
    } catch (err: any) {
      setN8nStatus(`n8n Trigger failed: ${err.message}`);
    }
  };

  const copyToClipboard = (text: string, fieldName: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(fieldName);
    setTimeout(() => setCopiedField(null), 2000);
  };

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="border-b border-slate-800 pb-5">
        <h1 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-purple-400" /> AI Content Studio
        </h1>
        <p className="text-xs text-slate-400">
          Transform AI strategy decisions into complete, production-ready content packages.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Form Controls */}
        <div className="lg:col-span-4 p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
          <h2 className="text-sm font-bold text-white flex items-center gap-2 border-b border-slate-800 pb-3">
            <Target className="w-4 h-4 text-cyan-400" /> Content Parameters
          </h2>

          <div className="space-y-3 text-xs">
            <div>
              <label className="block text-slate-400 font-semibold mb-1">Content Topic</label>
              <input
                type="text"
                value={topic}
                onChange={e => setTopic(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white focus:outline-none focus:border-purple-500"
                placeholder="Topic..."
              />
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-slate-400 font-semibold mb-1">Platform</label>
                <select
                  value={platform}
                  onChange={e => setPlatform(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white focus:outline-none focus:border-purple-500"
                >
                  <option value="Instagram">Instagram</option>
                  <option value="YouTube Shorts">YouTube Shorts</option>
                  <option value="LinkedIn">LinkedIn</option>
                  <option value="X / Twitter">X / Twitter</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-400 font-semibold mb-1">Format</label>
                <select
                  value={format}
                  onChange={e => setFormat(e.target.value as any)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white focus:outline-none focus:border-purple-500"
                >
                  <option value="REEL">Reel / Video</option>
                  <option value="CAROUSEL">Carousel Deck</option>
                  <option value="POST">Single Post</option>
                  <option value="STORY">Story</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-slate-400 font-semibold mb-1">Brand Tone</label>
              <input
                type="text"
                value={tone}
                onChange={e => setTone(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white focus:outline-none focus:border-purple-500"
              />
            </div>

            <div>
              <label className="block text-slate-400 font-semibold mb-1">Target Audience</label>
              <input
                type="text"
                value={audience}
                onChange={e => setAudience(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white focus:outline-none focus:border-purple-500"
              />
            </div>

            <div>
              <label className="block text-slate-400 font-semibold mb-1">Strategic Goal</label>
              <input
                type="text"
                value={goal}
                onChange={e => setGoal(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white focus:outline-none focus:border-purple-500"
              />
            </div>
          </div>

          <button
            onClick={handleGenerate}
            disabled={isGenerating}
            className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-cyan-500 hover:from-purple-500 hover:to-cyan-400 text-white font-bold text-xs shadow-lg shadow-purple-500/25 transition-all disabled:opacity-50"
          >
            <Sparkles className={`w-4 h-4 ${isGenerating ? 'animate-spin' : ''}`} />
            <span>{isGenerating ? 'Generating Content Package...' : 'Generate with CreatorPilot'}</span>
          </button>
        </div>

        {/* Right Column: Structured Output Package Workspace */}
        <div className="lg:col-span-8 space-y-4">
          {/* Header Bar */}
          <div className="p-4 rounded-2xl bg-gradient-to-r from-slate-900 via-purple-950/30 to-slate-900 border border-purple-500/30 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <span className="text-xs font-bold px-3 py-1 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30">
                {contentPackage.format}
              </span>
              <div>
                <h3 className="text-sm font-bold text-white line-clamp-1">{contentPackage.topic}</h3>
                <span className="text-[10px] text-cyan-300">Recommended Time: {contentPackage.recommendedTime}</span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleSaveDraft}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 transition-all"
              >
                <Save className="w-3.5 h-3.5 text-purple-400" />
                <span>Save Draft</span>
              </button>

              <button
                onClick={handleSchedulePost}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 transition-all"
              >
                <Calendar className="w-3.5 h-3.5 text-cyan-400" />
                <span>Schedule</span>
              </button>

              <button
                onClick={handleSendToN8n}
                className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white text-xs font-semibold shadow-md transition-all"
              >
                <Bot className="w-3.5 h-3.5" />
                <span>Send to n8n</span>
              </button>
            </div>
          </div>

          {n8nStatus && (
            <div className="p-3 rounded-xl bg-purple-950/40 border border-purple-500/30 text-xs text-purple-300 flex items-center justify-between">
              <span>{n8nStatus}</span>
            </div>
          )}

          {/* Structured Output Grid */}
          <div className="grid grid-cols-1 gap-4">
            {/* Hook */}
            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
              <div className="flex items-center justify-between text-xs font-bold text-purple-400 uppercase">
                <span className="flex items-center gap-1.5">⚡ The Opening Hook</span>
                <button
                  onClick={() => copyToClipboard(contentPackage.hook, 'hook')}
                  className="text-slate-400 hover:text-white flex items-center gap-1 text-[11px]"
                >
                  {copiedField === 'hook' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedField === 'hook' ? 'Copied' : 'Copy'}</span>
                </button>
              </div>
              <div className="text-sm font-bold text-white italic bg-slate-800/40 p-3 rounded-lg border border-slate-800">
                "{contentPackage.hook}"
              </div>
            </div>

            {/* Script / Structure */}
            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
              <div className="flex items-center justify-between text-xs font-bold text-cyan-400 uppercase">
                <span className="flex items-center gap-1.5"><Video className="w-4 h-4" /> Short-Form Scene-by-Scene Script</span>
                <button
                  onClick={() => copyToClipboard(contentPackage.script, 'script')}
                  className="text-slate-400 hover:text-white flex items-center gap-1 text-[11px]"
                >
                  {copiedField === 'script' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedField === 'script' ? 'Copied' : 'Copy'}</span>
                </button>
              </div>
              <pre className="text-xs text-slate-200 font-mono bg-slate-950/60 p-3.5 rounded-lg border border-slate-800 whitespace-pre-wrap leading-relaxed">
                {contentPackage.script}
              </pre>
            </div>

            {/* Caption & Hashtags */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
                <div className="flex items-center justify-between text-xs font-bold text-emerald-400 uppercase">
                  <span className="flex items-center gap-1.5"><MessageSquare className="w-4 h-4" /> Polished Caption</span>
                  <button
                    onClick={() => copyToClipboard(contentPackage.caption, 'caption')}
                    className="text-slate-400 hover:text-white flex items-center gap-1 text-[11px]"
                  >
                    {copiedField === 'caption' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedField === 'caption' ? 'Copied' : 'Copy'}</span>
                  </button>
                </div>
                <div className="text-xs text-slate-300 bg-slate-800/40 p-3 rounded-lg border border-slate-800 leading-relaxed whitespace-pre-wrap">
                  {contentPackage.caption}
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-3">
                <div className="text-xs font-bold text-amber-400 uppercase flex items-center gap-1.5">
                  <Hash className="w-4 h-4" /> Targeted Hashtags & CTA
                </div>

                <div>
                  <div className="text-[11px] font-semibold text-slate-400 mb-1">Optimized Hashtags</div>
                  <div className="flex flex-wrap gap-1.5">
                    {contentPackage.hashtags.map((tag, idx) => (
                      <span key={idx} className="text-xs font-medium px-2.5 py-1 rounded-md bg-slate-800 text-purple-300 border border-slate-700">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-800">
                  <div className="text-[11px] font-semibold text-slate-400 mb-1">Call to Action (CTA)</div>
                  <div className="text-xs font-bold text-white bg-slate-800/40 p-2.5 rounded-lg border border-slate-800">
                    "{contentPackage.cta}"
                  </div>
                </div>
              </div>
            </div>

            {/* Visual Direction Plan */}
            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
              <div className="text-xs font-bold text-indigo-400 uppercase">
                Visual Editing Direction & Plan
              </div>
              <div className="text-xs text-slate-300 bg-slate-800/30 p-3 rounded-lg border border-slate-800">
                {contentPackage.visualPlan}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
