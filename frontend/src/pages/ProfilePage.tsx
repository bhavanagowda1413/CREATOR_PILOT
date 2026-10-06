import React, { useState, useEffect } from 'react';
import { User, Save, CheckCircle2, Zap, RotateCcw } from 'lucide-react';
import { CreatorProfile, api } from '../services/api';

interface ProfilePageProps {
  creator: CreatorProfile | null;
  onProfileUpdated: () => void;
}

export const ProfilePage: React.FC<ProfilePageProps> = ({ creator, onProfileUpdated }) => {
  const [formData, setFormData] = useState<Partial<CreatorProfile>>({
    name: 'Bhavana',
    niche: 'Technology & AI',
    targetAudience: 'College students and beginner developers',
    mainPlatform: 'Instagram',
    contentLanguage: 'English',
    contentFormats: ['Reels', 'Carousels', 'Shorts'],
    growthGoal: 'Increase engagement and saves',
    postingFrequency: '4 times per week',
    brandTone: 'Simple, educational and energetic',
    topicsToAvoid: ['Crypto drama', 'Aggressive selling', 'Generic inspirational quotes']
  });

  const [saving, setSaving] = useState<boolean>(false);
  const [saveMessage, setSaveMessage] = useState<string | null>(null);

  useEffect(() => {
    if (creator) {
      setFormData(creator);
    }
  }, [creator]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setSaveMessage(null);
    try {
      const res = await api.updateCreator(formData);
      setSaveMessage('Profile saved to database successfully! AI engine updated.');
      onProfileUpdated();
    } catch (err: any) {
      setSaveMessage(`Error saving profile: ${err.message}`);
    } finally {
      setSaving(false);
    }
  };

  const loadDemoBhavana = () => {
    setFormData({
      name: 'Bhavana',
      niche: 'Technology & AI',
      targetAudience: 'College students and beginner developers',
      mainPlatform: 'Instagram',
      contentLanguage: 'English',
      contentFormats: ['Reels', 'Carousels', 'Shorts'],
      growthGoal: 'Increase engagement and saves',
      postingFrequency: '4 times per week',
      brandTone: 'Simple, educational and energetic',
      topicsToAvoid: ['Crypto drama', 'Aggressive selling', 'Generic inspirational quotes']
    });
  };

  return (
    <div className="p-6 space-y-6 max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div>
          <h1 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
            <User className="w-5 h-5 text-purple-400" /> Creator Strategic Profile
          </h1>
          <p className="text-xs text-slate-400">
            Define your creator persona, target audience signals, brand tone, and non-negotiables.
          </p>
        </div>

        <button
          type="button"
          onClick={loadDemoBhavana}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold border border-slate-700 transition-all"
        >
          <RotateCcw className="w-3.5 h-3.5 text-cyan-400" />
          <span>Load Bhavana Demo Preset</span>
        </button>
      </div>

      {saveMessage && (
        <div className="p-4 rounded-xl bg-purple-950/40 border border-purple-500/30 text-purple-300 text-xs flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{saveMessage}</span>
        </div>
      )}

      {/* Profile Form */}
      <form onSubmit={handleSubmit} className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div>
            <label className="block text-slate-400 font-semibold mb-1">Creator Name</label>
            <input
              type="text"
              required
              value={formData.name || ''}
              onChange={e => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white focus:outline-none focus:border-purple-500 font-semibold"
            />
          </div>

          <div>
            <label className="block text-slate-400 font-semibold mb-1">Content Niche</label>
            <input
              type="text"
              required
              value={formData.niche || ''}
              onChange={e => setFormData({ ...formData, niche: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white focus:outline-none focus:border-purple-500"
            />
          </div>

          <div>
            <label className="block text-slate-400 font-semibold mb-1">Target Audience</label>
            <input
              type="text"
              required
              value={formData.targetAudience || ''}
              onChange={e => setFormData({ ...formData, targetAudience: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white focus:outline-none focus:border-purple-500"
            />
          </div>

          <div>
            <label className="block text-slate-400 font-semibold mb-1">Main Platform</label>
            <select
              value={formData.mainPlatform || 'Instagram'}
              onChange={e => setFormData({ ...formData, mainPlatform: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white focus:outline-none focus:border-purple-500"
            >
              <option value="Instagram">Instagram</option>
              <option value="YouTube Shorts">YouTube Shorts</option>
              <option value="LinkedIn">LinkedIn</option>
              <option value="X / Twitter">X / Twitter</option>
            </select>
          </div>

          <div>
            <label className="block text-slate-400 font-semibold mb-1">Content Language</label>
            <input
              type="text"
              value={formData.contentLanguage || 'English'}
              onChange={e => setFormData({ ...formData, contentLanguage: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white focus:outline-none focus:border-purple-500"
            />
          </div>

          <div>
            <label className="block text-slate-400 font-semibold mb-1">Posting Frequency</label>
            <input
              type="text"
              value={formData.postingFrequency || '4 times per week'}
              onChange={e => setFormData({ ...formData, postingFrequency: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white focus:outline-none focus:border-purple-500"
            />
          </div>

          <div>
            <label className="block text-slate-400 font-semibold mb-1">Growth Goal</label>
            <input
              type="text"
              value={formData.growthGoal || ''}
              onChange={e => setFormData({ ...formData, growthGoal: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white focus:outline-none focus:border-purple-500 font-semibold text-purple-300"
            />
          </div>

          <div>
            <label className="block text-slate-400 font-semibold mb-1">Brand Tone</label>
            <input
              type="text"
              value={formData.brandTone || ''}
              onChange={e => setFormData({ ...formData, brandTone: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white focus:outline-none focus:border-purple-500"
            />
          </div>
        </div>

        <div>
          <label className="block text-slate-400 font-semibold mb-1 text-xs">Topics to Avoid (Comma Separated)</label>
          <input
            type="text"
            value={Array.isArray(formData.topicsToAvoid) ? formData.topicsToAvoid.join(', ') : formData.topicsToAvoid || ''}
            onChange={e => setFormData({ ...formData, topicsToAvoid: e.target.value.split(',').map(s => s.trim()) })}
            className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-slate-200 text-xs focus:outline-none focus:border-purple-500"
          />
        </div>

        <div className="pt-3 flex items-center justify-end">
          <button
            type="submit"
            disabled={saving}
            className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-cyan-500 hover:from-purple-500 hover:to-cyan-400 text-white font-bold text-xs shadow-lg shadow-purple-500/20 transition-all disabled:opacity-50"
          >
            <Save className="w-4 h-4" />
            <span>{saving ? 'Saving Profile...' : 'Save Creator Profile to DB'}</span>
          </button>
        </div>
      </form>
    </div>
  );
};
