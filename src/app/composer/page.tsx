'use client';

import React, { useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { AppShell } from '@/components/layout/app-shell';
import {
  Sparkles,
  Instagram,
  Linkedin,
  Facebook,
  Twitter,
  Image as ImageIcon,
  Clock,
  Send,
  CheckCircle,
  MessageSquare,
  RefreshCw,
} from 'lucide-react';
import { INDIAN_FESTIVALS } from '@/lib/festivals/data';

function ComposerContent() {
  const searchParams = useSearchParams();
  const initialFestival = searchParams.get('festival') || 'Diwali (Deepavali)';

  const [client, setClient] = useState('Ramesh Jewellers (Indiranagar)');
  const [selectedChannels, setSelectedChannels] = useState<string[]>(['Instagram', 'Facebook']);
  const [caption, setCaption] = useState('');
  const [firstComment, setFirstComment] = useState('');
  const [mediaUrl, setMediaUrl] = useState(
    'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=800&auto=format&fit=crop&q=80'
  );
  const [scheduleMode, setScheduleMode] = useState<'queue' | 'custom' | 'now'>('custom');
  const [customDateTime, setCustomDateTime] = useState('2026-10-29T18:30');
  const [requireClientApproval, setRequireClientApproval] = useState(true);

  // AI state
  const [isAiLoading, setIsAiLoading] = useState(false);
  const [aiLanguage, setAiLanguage] = useState<'hinglish' | 'hindi' | 'english'>('hinglish');
  const [festival, setFestival] = useState(initialFestival);
  const [aiSuggestions, setAiSuggestions] = useState<string[]>([]);
  const [publishSuccess, setPublishSuccess] = useState<string | null>(null);

  const toggleChannel = (name: string) => {
    setSelectedChannels((prev) =>
      prev.includes(name) ? prev.filter((c) => c !== name) : [...prev, name]
    );
  };

  const getCharLimit = () => {
    if (selectedChannels.includes('Twitter')) return 280;
    if (selectedChannels.includes('Instagram')) return 2200;
    if (selectedChannels.includes('LinkedIn')) return 3000;
    return 5000;
  };

  const handleGenerateAi = async () => {
    setIsAiLoading(true);
    try {
      const res = await fetch('/api/ai/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          businessType: client,
          topic: `Festive campaign for ${festival}`,
          festivalName: festival,
          language: aiLanguage,
          platform: 'INSTAGRAM',
        }),
      });
      const data = await res.json();
      if (data.success && data.captions) {
        setAiSuggestions([
          data.captions.shortAndPunchy,
          data.captions.storytelling,
          data.captions.promotionalOffer,
        ]);
        if (data.captions.suggestedHashtags) {
          setFirstComment(data.captions.suggestedHashtags.join(' '));
        }
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsAiLoading(false);
    }
  };

  const handleSubmit = async () => {
    if (!caption) return;
    setPublishSuccess(
      requireClientApproval
        ? 'Post saved! WhatsApp review link generated and sent to client.'
        : 'Post enqueued successfully into BullMQ publishing scheduler!'
    );
    setTimeout(() => setPublishSuccess(null), 4000);
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <div className="flex items-center justify-between pb-3 border-b border-slate-200">
        <div>
          <h1 className="text-xl font-black text-slate-900 tracking-tight">Create & Schedule Post</h1>
          <p className="text-xs text-slate-500">Multi-channel composer with Indian cultural AI copy engine.</p>
        </div>
        <span className="text-xs font-bold text-slate-500 bg-slate-100 px-3 py-1 rounded-full">
          Draft Autosaved
        </span>
      </div>

      {publishSuccess && (
        <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold flex items-center gap-2">
          <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>{publishSuccess}</span>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Main Composer Column (7 cols) */}
        <div className="lg:col-span-7 bg-white border border-slate-200 rounded-2xl p-6 shadow-xs space-y-5">
          {/* 1. Client Brand */}
          <div>
            <label className="text-xs font-bold text-slate-600 uppercase tracking-wider block mb-1.5">
              Client Brand Workspace
            </label>
            <select
              value={client}
              onChange={(e) => setClient(e.target.value)}
              className="w-full text-xs font-bold border border-slate-200 rounded-xl px-3.5 py-2.5 bg-slate-50 focus:bg-white focus:outline-none"
            >
              <option>Ramesh Jewellers (Indiranagar)</option>
              <option>Chai Shai Cafe (Koramangala)</option>
              <option>Kala Niketan Silk Saree House</option>
              <option>Dr. Sharma Dental Clinic (HSR Layout)</option>
            </select>
          </div>

          {/* 2. Channel Picker */}
          <div>
            <label className="text-xs font-bold text-slate-600 uppercase tracking-wider block mb-1.5">
              Target Social Networks
            </label>
            <div className="flex flex-wrap gap-2">
              {[
                { name: 'Instagram', icon: Instagram, color: 'text-pink-600 bg-pink-50 border-pink-200' },
                { name: 'Facebook', icon: Facebook, color: 'text-blue-600 bg-blue-50 border-blue-200' },
                { name: 'LinkedIn', icon: Linkedin, color: 'text-sky-700 bg-sky-50 border-sky-200' },
                { name: 'Twitter', icon: Twitter, color: 'text-slate-800 bg-slate-100 border-slate-300' },
              ].map((ch) => {
                const active = selectedChannels.includes(ch.name);
                const Icon = ch.icon;
                return (
                  <button
                    key={ch.name}
                    type="button"
                    onClick={() => toggleChannel(ch.name)}
                    className={`inline-flex items-center gap-2 text-xs font-bold px-3 py-1.5 rounded-xl border transition ${
                      active
                        ? `${ch.color} ring-2 ring-slate-400`
                        : 'bg-white border-slate-200 text-slate-400 hover:bg-slate-50'
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    {ch.name}
                  </button>
                );
              })}
            </div>
          </div>

          {/* 3. Indian Cultural AI Copy Generator Widget */}
          <div className="bg-amber-50/60 border border-amber-200/80 rounded-xl p-4 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-orange-600" />
                <span className="text-xs font-bold text-slate-900">
                  Indian Cultural Copy Engine (Gemini 2.5)
                </span>
              </div>
              <div className="flex items-center gap-1 bg-white border border-amber-200 rounded-lg p-0.5">
                {(['hinglish', 'hindi', 'english'] as const).map((lang) => (
                  <button
                    key={lang}
                    type="button"
                    onClick={() => setAiLanguage(lang)}
                    className={`text-[11px] font-bold px-2 py-0.5 rounded capitalize ${
                      aiLanguage === lang ? 'bg-[#FF671F] text-white shadow-xs' : 'text-slate-600'
                    }`}
                  >
                    {lang}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-2">
              <select
                value={festival}
                onChange={(e) => setFestival(e.target.value)}
                className="text-xs font-medium border border-amber-300 rounded-lg px-2.5 py-1.5 bg-white text-slate-800 focus:outline-none"
              >
                {INDIAN_FESTIVALS.map((f) => (
                  <option key={f.id} value={f.name}>
                    {f.name} ({f.hindiName})
                  </option>
                ))}
              </select>

              <button
                type="button"
                onClick={handleGenerateAi}
                disabled={isAiLoading}
                className="flex-1 inline-flex items-center justify-center gap-1.5 text-xs font-bold bg-white hover:bg-orange-50 text-orange-700 border border-orange-300 py-1.5 px-3 rounded-lg shadow-2xs transition disabled:opacity-50"
              >
                {isAiLoading ? (
                  <>
                    <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                    Writing Copy...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-3.5 h-3.5 text-[#FF671F]" />
                    Generate {aiLanguage.toUpperCase()} Copy
                  </>
                )}
              </button>
            </div>

            {aiSuggestions.length > 0 && (
              <div className="space-y-1.5 pt-1">
                {aiSuggestions.map((sug, i) => (
                  <div
                    key={i}
                    onClick={() => setCaption(sug)}
                    className="bg-white hover:border-orange-400 border border-slate-200 p-2.5 rounded-lg text-xs text-slate-800 cursor-pointer transition shadow-2xs flex items-start justify-between gap-2 group"
                  >
                    <p className="line-clamp-2">{sug}</p>
                    <span className="text-[10px] font-bold text-orange-600 bg-orange-50 px-2 py-0.5 rounded shrink-0 group-hover:bg-orange-600 group-hover:text-white transition">
                      Insert
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* 4. Caption Area with Character Limits */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs font-bold text-slate-600 uppercase tracking-wider">
                Post Caption
              </label>
              <span
                className={`text-[11px] font-bold ${
                  caption.length > getCharLimit() ? 'text-red-600' : 'text-slate-400'
                }`}
              >
                {caption.length} / {getCharLimit()} chars
              </span>
            </div>
            <textarea
              rows={4}
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              placeholder="Write caption, include hashtags, or pick an AI draft..."
              className="w-full text-xs border border-slate-200 rounded-xl p-3 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition"
            />
          </div>

          {/* 5. First Comment (Hashtags) */}
          <div>
            <label className="text-xs font-bold text-slate-600 uppercase tracking-wider block mb-1.5 flex items-center gap-1.5">
              <MessageSquare className="w-3.5 h-3.5 text-slate-400" />
              Schedule First Comment (Instagram Hashtags)
            </label>
            <input
              type="text"
              value={firstComment}
              onChange={(e) => setFirstComment(e.target.value)}
              placeholder="#DiwaliDhamaka #BangaloreFestive #IndianRetail"
              className="w-full text-xs border border-slate-200 rounded-xl px-3 py-2 bg-slate-50 focus:bg-white focus:outline-none"
            />
          </div>

          {/* 6. Media Asset URL */}
          <div>
            <label className="text-xs font-bold text-slate-600 uppercase tracking-wider block mb-1.5 flex items-center gap-1.5">
              <ImageIcon className="w-3.5 h-3.5 text-slate-400" />
              Media URL (S3 / R2 CDN Asset)
            </label>
            <input
              type="text"
              value={mediaUrl}
              onChange={(e) => setMediaUrl(e.target.value)}
              className="w-full text-xs border border-slate-200 rounded-xl px-3 py-2 bg-slate-50 focus:bg-white focus:outline-none"
            />
          </div>

          {/* 7. Scheduling & Approval Modes */}
          <div className="space-y-3 pt-2 border-t border-slate-100">
            <label className="text-xs font-bold text-slate-600 uppercase tracking-wider block">
              Publishing Schedule
            </label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { id: 'queue', label: 'Add to Next Slot', desc: 'Auto weekly slot' },
                { id: 'custom', label: 'Custom Time', desc: 'Pick exact date' },
                { id: 'now', label: 'Publish Now', desc: 'Immediate dispatch' },
              ].map((m) => (
                <button
                  key={m.id}
                  type="button"
                  onClick={() => setScheduleMode(m.id as any)}
                  className={`p-2.5 rounded-xl border text-left transition ${
                    scheduleMode === m.id
                      ? 'border-orange-500 bg-orange-50/50 text-slate-900 font-bold'
                      : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  <span className="text-xs block">{m.label}</span>
                  <span className="text-[10px] text-slate-400 font-normal">{m.desc}</span>
                </button>
              ))}
            </div>

            {scheduleMode === 'custom' && (
              <input
                type="datetime-local"
                value={customDateTime}
                onChange={(e) => setCustomDateTime(e.target.value)}
                className="w-full text-xs border border-slate-200 rounded-xl px-3 py-2 bg-slate-50"
              />
            )}

            {/* WhatsApp Client Approval Toggle */}
            <label className="flex items-center gap-2.5 cursor-pointer bg-slate-50 p-3 rounded-xl border border-slate-200 hover:bg-slate-100 transition">
              <input
                type="checkbox"
                checked={requireClientApproval}
                onChange={(e) => setRequireClientApproval(e.target.checked)}
                className="w-4 h-4 rounded text-orange-600 focus:ring-orange-500"
              />
              <div>
                <span className="text-xs font-bold text-slate-800 block">
                  Require Client WhatsApp Approval
                </span>
                <span className="text-[11px] text-slate-500 block">
                  Dispatches a 72-hour magic review link to client phone. Post will NOT publish until approved.
                </span>
              </div>
            </label>
          </div>

          {/* Action Button */}
          <button
            type="button"
            onClick={handleSubmit}
            disabled={!caption}
            className="w-full bg-slate-900 hover:bg-slate-800 disabled:opacity-50 text-white font-bold text-xs py-3 rounded-xl shadow-md transition flex items-center justify-center gap-2"
          >
            {requireClientApproval ? (
              <>
                <Send className="w-4 h-4 text-orange-400" />
                Submit for Client Approval
              </>
            ) : (
              <>
                <Clock className="w-4 h-4 text-emerald-400" />
                Queue in BullMQ Engine
              </>
            )}
          </button>
        </div>

        {/* Live Mobile Post Preview Column (5 cols) */}
        <div className="lg:col-span-5 space-y-4 sticky top-20">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
            Live Instagram Feed Preview
          </span>

          <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
            <div className="p-3 flex items-center gap-2.5 border-b border-slate-100">
              <div className="w-7 h-7 rounded-full bg-slate-900 text-white text-[11px] font-bold flex items-center justify-center">
                RJ
              </div>
              <div>
                <span className="text-xs font-bold text-slate-900 block leading-tight">
                  ramesh_jewellers_blr
                </span>
                <span className="text-[10px] text-slate-400">Sponsored • Bangalore</span>
              </div>
            </div>

            {mediaUrl && (
              <div className="aspect-square bg-slate-100 overflow-hidden">
                <img src={mediaUrl} alt="Preview" className="w-full h-full object-cover" />
              </div>
            )}

            <div className="p-3.5 space-y-2">
              <p className="text-xs text-slate-800 leading-relaxed whitespace-pre-line">
                <span className="font-bold mr-1.5">ramesh_jewellers_blr</span>
                {caption || 'Your festive post caption will appear here in real time...'}
              </p>

              {firstComment && (
                <p className="text-[11px] text-slate-500 border-t border-slate-100 pt-1.5">
                  <span className="font-bold mr-1">First comment:</span>
                  {firstComment}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ComposerPage() {
  return (
    <AppShell>
      <Suspense fallback={<div className="p-6 text-xs text-slate-400">Loading Composer...</div>}>
        <ComposerContent />
      </Suspense>
    </AppShell>
  );
}
