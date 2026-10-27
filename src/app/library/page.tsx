'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { AppShell } from '@/components/layout/app-shell';
import {
  FolderOpen,
  Search,
  Tag,
  Copy,
  Check,
  Plus,
  PenSquare,
  Sparkles,
} from 'lucide-react';

export default function ContentLibraryPage() {
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'templates' | 'hashtags' | 'media'>('templates');

  const templates = [
    {
      id: 't-1',
      title: 'Indian Festive Flash Offer (Hinglish)',
      category: 'Festive',
      content:
        '🚨 TYOHAR DHAMAKA! Iss festival season, enjoy flat discount on our latest collection. Tap link in bio or WhatsApp us directly to order. Shubh shuruat karein aaj hi! ✨',
      tags: ['Diwali', 'FlashSale', 'Hinglish'],
    },
    {
      id: 't-2',
      title: 'Weekend Customer Love & Storytelling',
      category: 'Social Proof',
      content:
        'Aapka vishwas hi hamari sabse badi taqat hai. ❤️ Thank you to all our wonderful patrons who visited our Bangalore showroom this week. Tag us in your stories to get featured!',
      tags: ['Testimonials', 'Bangalore', 'Community'],
    },
    {
      id: 't-3',
      title: 'New Product Launch Announcement',
      category: 'Product Launch',
      content:
        'Intezaar khatam! Introducing our newest lineup, crafted with love and authentic Indian craftsmanship. Early-bird bookings are now open with special introductory perks.',
      tags: ['NewArrivals', 'Launch', 'MadeInIndia'],
    },
  ];

  const hashtagGroups = [
    {
      title: 'Dhanteras & Gold Jewellery',
      tags: '#Dhanteras2026 #GoldJewelleryIndia #IndiranagarJewellers #ShubhMuhurat #FestiveGold',
    },
    {
      title: 'Bangalore Food & Cafes',
      tags: '#BangaloreFoodies #KoramangalaCafes #ChaiLovers #BangaloreEats #FilterCoffeeClub',
    },
    {
      title: 'Indian Handlooms & Sarees',
      tags: '#KanjeevaramSaree #VocalForLocal #HandloomIndia #FestiveSaree #IndianWeaves',
    },
  ];

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <AppShell>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-3 border-b border-slate-200">
          <div>
            <h1 className="text-xl font-black text-slate-900 tracking-tight flex items-center gap-2">
              <FolderOpen className="w-5 h-5 text-orange-600" />
              Content Library & Asset Vault
            </h1>
            <p className="text-xs text-slate-500">
              Reusable caption templates, curated Indian hashtag groups, and media assets.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Link
              href="/composer"
              className="inline-flex items-center gap-1.5 bg-[#FF671F] hover:bg-orange-600 text-white text-xs font-bold px-3.5 py-2 rounded-xl shadow-xs transition"
            >
              <PenSquare className="w-3.5 h-3.5" />
              <span>Use in Post</span>
            </Link>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center gap-2 border-b border-slate-200 pb-2">
          {[
            { id: 'templates', label: 'Caption Templates (3)' },
            { id: 'hashtags', label: 'Curated Hashtag Sets (3)' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`text-xs font-bold px-3 py-1.5 rounded-xl transition ${
                activeTab === tab.id
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {activeTab === 'templates' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {templates.map((tpl) => (
              <div
                key={tpl.id}
                className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs flex flex-col justify-between space-y-4 hover:border-orange-300 transition"
              >
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[10px] font-bold text-orange-700 bg-orange-50 px-2 py-0.5 rounded-md border border-orange-200">
                      {tpl.category}
                    </span>
                    <button
                      onClick={() => handleCopy(tpl.id, tpl.content)}
                      className="text-slate-400 hover:text-slate-700 transition"
                      title="Copy template"
                    >
                      {copiedId === tpl.id ? (
                        <Check className="w-4 h-4 text-emerald-600" />
                      ) : (
                        <Copy className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                  <h3 className="font-bold text-slate-900 text-sm">{tpl.title}</h3>
                  <p className="text-xs text-slate-600 mt-2 leading-relaxed bg-slate-50 p-3 rounded-xl border border-slate-100">
                    {tpl.content}
                  </p>
                </div>

                <div className="flex flex-wrap gap-1 pt-2 border-t border-slate-100">
                  {tpl.tags.map((t) => (
                    <span key={t} className="text-[10px] text-slate-500 bg-slate-100 px-1.5 py-0.5 rounded">
                      #{t}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'hashtags' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {hashtagGroups.map((grp, idx) => (
              <div
                key={idx}
                className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs space-y-3"
              >
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-slate-900 text-sm flex items-center gap-1.5">
                    <Tag className="w-4 h-4 text-orange-600" />
                    {grp.title}
                  </h3>
                  <button
                    onClick={() => handleCopy(`ht-${idx}`, grp.tags)}
                    className="text-slate-400 hover:text-slate-700 transition"
                  >
                    {copiedId === `ht-${idx}` ? (
                      <Check className="w-4 h-4 text-emerald-600" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </button>
                </div>
                <div className="text-xs font-mono text-slate-600 bg-slate-50 p-3 rounded-xl border border-slate-100 leading-relaxed">
                  {grp.tags}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </AppShell>
  );
}
