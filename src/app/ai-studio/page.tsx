'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { AppShell } from '@/components/layout/app-shell';
import {
  Sparkles,
  Wand2,
  RefreshCw,
  Copy,
  Check,
  Send,
  Sliders,
  Languages,
  BookOpen,
} from 'lucide-react';
import { INDIAN_FESTIVALS } from '@/lib/festivals/data';

export default function AiStudioPage() {
  const [topic, setTopic] = useState('Festive 22K Gold Jewellery collection launch for Dhanteras');
  const [brandVoice, setBrandVoice] = useState('Warm & Traditional (Indian Family Heritage)');
  const [language, setLanguage] = useState<'hinglish' | 'hindi' | 'english'>('hinglish');
  const [festival, setFestival] = useState('Diwali (Deepavali)');
  const [isLoading, setIsLoading] = useState(false);
  const [copiedIdx, setCopiedIdx] = useState<number | null>(null);

  const [generatedResults, setGeneratedResults] = useState<
    { title: string; text: string; hashtags: string }[]
  >([
    {
      title: 'Variation 1: Punchy & Festive Call-to-Action',
      text: '✨ Iss Dhanteras, lakar aao khushiyon ki roshni aur Lakshmi ji ka aashirwaad! Flat 20% off on antique gold jewellery making charges. Visit showroom today!',
      hashtags: '#Dhanteras2026 #ShubhMuhurat #GoldJewellery #RameshJewellers',
    },
    {
      title: 'Variation 2: Emotional & Family Storytelling',
      text: 'Pehle bartan, phir sikka, aur ab beti ki shaadi ka haar—Dhanteras sirf sona khareedne ka din nahi, balki teen generations ki yaadein sajane ka tyohar hai. 🪔',
      hashtags: '#FamilyTraditions #IndianFestivals #HinglishVibes #GoldInvestment',
    },
    {
      title: 'Variation 3: Urgency & Limited Period Offer',
      text: '🚨 Shubh Muhurat Alert! Only 48 hours left to claim complimentary 1gm silver coin with every gold purchase above ₹50,000. Book your slot on WhatsApp!',
      hashtags: '#FestiveDhamaka #DiwaliOffers #BangaloreShopping #LimitedDeal',
    },
  ]);

  const handleGenerate = async () => {
    setIsLoading(true);
    try {
      const res = await fetch('/api/ai/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          businessType: brandVoice,
          topic,
          festivalName: festival,
          language,
          platform: 'INSTAGRAM',
        }),
      });
      const data = await res.json();
      if (data.success && data.captions) {
        setGeneratedResults([
          {
            title: 'Punchy Social Copy',
            text: data.captions.shortAndPunchy,
            hashtags: data.captions.suggestedHashtags?.join(' ') || '#FestiveVibes',
          },
          {
            title: 'Storytelling Angle',
            text: data.captions.storytelling,
            hashtags: data.captions.suggestedHashtags?.join(' ') || '#MadeInIndia',
          },
          {
            title: 'Promotional Offer',
            text: data.captions.promotionalOffer,
            hashtags: data.captions.suggestedHashtags?.join(' ') || '#PaisaVasool',
          },
        ]);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = (idx: number, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedIdx(idx);
    setTimeout(() => setCopiedIdx(null), 2000);
  };

  return (
    <AppShell>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-3 border-b border-slate-200">
          <div>
            <h1 className="text-xl font-black text-slate-900 tracking-tight flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-orange-600" />
              AI Copy Studio & Cultural Tone Engine
            </h1>
            <p className="text-xs text-slate-500">
              Generate authentic Hinglish, Hindi, and regional copy powered by Google Gemini 2.5.
            </p>
          </div>
          <span className="text-xs font-bold text-orange-700 bg-orange-50 px-3 py-1.5 rounded-xl border border-orange-200">
            Gemini 2.5 Active
          </span>
        </div>

        {/* 2-Column Studio Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Controls Column (5 cols) */}
          <div className="lg:col-span-5 bg-white border border-slate-200 rounded-2xl p-6 shadow-xs space-y-4">
            <h2 className="font-bold text-slate-900 text-sm flex items-center gap-2 pb-2 border-b border-slate-100">
              <Sliders className="w-4 h-4 text-slate-600" />
              Creative Parameters
            </h2>

            {/* Language Selector */}
            <div>
              <label className="text-xs font-bold text-slate-600 uppercase tracking-wider block mb-1.5">
                Output Language / Dialect
              </label>
              <div className="grid grid-cols-3 gap-2">
                {(['hinglish', 'hindi', 'english'] as const).map((lang) => (
                  <button
                    key={lang}
                    type="button"
                    onClick={() => setLanguage(lang)}
                    className={`py-2 px-3 rounded-xl border text-xs font-bold capitalize transition ${
                      language === lang
                        ? 'bg-[#FF671F] text-white border-orange-600 shadow-2xs'
                        : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    {lang}
                  </button>
                ))}
              </div>
            </div>

            {/* Brand Voice Profile */}
            <div>
              <label className="text-xs font-bold text-slate-600 uppercase tracking-wider block mb-1.5">
                Brand Voice Persona
              </label>
              <select
                value={brandVoice}
                onChange={(e) => setBrandVoice(e.target.value)}
                className="w-full text-xs font-medium border border-slate-200 rounded-xl px-3 py-2 bg-slate-50 focus:bg-white focus:outline-none"
              >
                <option>Warm & Traditional (Indian Family Heritage)</option>
                <option>Trendy & Youthful (Gen-Z Hinglish Slang)</option>
                <option>Authoritative & Trustworthy (Corporate B2B)</option>
                <option>Budget-Friendly & Value-First (Paisa Vasool)</option>
              </select>
            </div>

            {/* Indian Festival Association */}
            <div>
              <label className="text-xs font-bold text-slate-600 uppercase tracking-wider block mb-1.5">
                Indian Festival / Seasonal Occasion
              </label>
              <select
                value={festival}
                onChange={(e) => setFestival(e.target.value)}
                className="w-full text-xs font-medium border border-slate-200 rounded-xl px-3 py-2 bg-slate-50 focus:bg-white focus:outline-none"
              >
                {INDIAN_FESTIVALS.map((f) => (
                  <option key={f.id} value={f.name}>
                    {f.name} ({f.hindiName})
                  </option>
                ))}
              </select>
            </div>

            {/* Campaign Prompt / Topic */}
            <div>
              <label className="text-xs font-bold text-slate-600 uppercase tracking-wider block mb-1.5">
                Campaign Idea / Brief
              </label>
              <textarea
                rows={3}
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                className="w-full text-xs border border-slate-200 rounded-xl p-3 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-orange-500/20"
              />
            </div>

            <button
              type="button"
              onClick={handleGenerate}
              disabled={isLoading}
              className="w-full bg-[#FF671F] hover:bg-orange-600 disabled:opacity-50 text-white font-bold text-xs py-3 rounded-xl shadow-xs transition flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  Generating Cultural Copy...
                </>
              ) : (
                <>
                  <Wand2 className="w-4 h-4" />
                  Generate 3 Variations
                </>
              )}
            </button>
          </div>

          {/* Results Column (7 cols) */}
          <div className="lg:col-span-7 space-y-4">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
              Generated Indian Social Copy
            </span>

            <div className="space-y-4">
              {generatedResults.map((res, idx) => (
                <div
                  key={idx}
                  className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs space-y-3 hover:border-orange-300 transition"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-900">{res.title}</span>
                    <button
                      onClick={() => handleCopy(idx, `${res.text}\n\n${res.hashtags}`)}
                      className="text-slate-400 hover:text-slate-700 transition"
                      title="Copy to clipboard"
                    >
                      {copiedIdx === idx ? (
                        <Check className="w-4 h-4 text-emerald-600" />
                      ) : (
                        <Copy className="w-4 h-4" />
                      )}
                    </button>
                  </div>

                  <p className="text-xs text-slate-700 leading-relaxed bg-slate-50 p-3.5 rounded-xl border border-slate-100 whitespace-pre-line">
                    {res.text}
                  </p>

                  <div className="flex items-center justify-between text-[11px] pt-1">
                    <span className="font-mono text-slate-400 truncate max-w-[280px]">
                      {res.hashtags}
                    </span>
                    <Link
                      href={`/composer?caption=${encodeURIComponent(res.text)}`}
                      className="font-bold text-orange-600 hover:text-orange-700 flex items-center gap-1"
                    >
                      Send to Composer →
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
