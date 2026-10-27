'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { AppShell } from '@/components/layout/app-shell';
import {
  Sparkles,
  Calendar,
  Clock,
  CheckCircle,
  AlertCircle,
  TrendingUp,
  Users,
  Briefcase,
  Flame,
  ArrowRight,
  Send,
  ExternalLink,
  Copy,
  Check,
} from 'lucide-react';
import { INDIAN_FESTIVALS } from '@/lib/festivals/data';

export default function OverviewDashboard() {
  const [copiedLink, setCopiedLink] = useState<string | null>(null);

  const stats = [
    { label: 'Scheduled Queue', value: '4 Posts', change: '+2 today', icon: Clock, color: 'text-blue-600 bg-blue-50' },
    { label: 'Awaiting Client Approval', value: '2 Posts', change: 'WhatsApp Sent', icon: AlertCircle, color: 'text-amber-600 bg-amber-50' },
    { label: 'Published This Month', value: '28 Posts', change: '+18% vs last mo', icon: CheckCircle, color: 'text-emerald-600 bg-emerald-50' },
    { label: 'Active Client Brands', value: '4 Brands', change: 'Agency Pro Tier', icon: Briefcase, color: 'text-purple-600 bg-purple-50' },
  ];

  const recentPosts = [
    {
      id: 'p-1',
      client: 'Ramesh Jewellers (Indiranagar)',
      content:
        '✨ Dhanteras Dhamaka! Shubh muhurat par lakar aao Lakshmi ka aashirwaad hamare exclusive 22K Gold Antique Collection ke saath. Har purchase par flat 20% off on making charges! 🪔 #Dhanteras2026 #RameshJewellers',
      scheduledFor: 'Oct 29, 2026 • 06:30 PM',
      channels: ['Instagram', 'Facebook'],
      status: 'PENDING_APPROVAL',
      magicLink: 'http://localhost:3000/review/tok_dhanteras_demo',
    },
    {
      id: 'p-2',
      client: 'Chai Shai Cafe (Koramangala)',
      content:
        'Sham ki chai aur dosto ki mehfil. Garma-garam samosa aur adrak wali chai with free festive refills today! Tag that friend jo bina chai ke nahi jee sakta. ☕ #ChaiLovers #BangaloreFoodies',
      scheduledFor: 'Oct 30, 2026 • 05:00 PM',
      channels: ['Instagram'],
      status: 'QUEUED',
    },
    {
      id: 'p-3',
      client: 'Kala Niketan Silk Saree House',
      content:
        'Handwoven Kanjeevarams that tell a story of Indian heritage. Shandar colors for your festive family celebrations. Visit our store this weekend for exclusive festive previews. ✨',
      scheduledFor: 'Oct 27, 2026 • 10:00 AM',
      channels: ['Instagram', 'LinkedIn', 'Facebook'],
      status: 'PUBLISHED',
    },
  ];

  const copyToClipboard = (link: string) => {
    navigator.clipboard.writeText(link);
    setCopiedLink(link);
    setTimeout(() => setCopiedLink(null), 2000);
  };

  return (
    <AppShell>
      <div className="space-y-6">
        {/* Welcome Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-black text-slate-900 tracking-tight">Agency Overview</h1>
            <p className="text-sm text-slate-500 mt-0.5">
              Welcome back, Atharva. Here is what is happening across your client brands today.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Link
              href="/composer"
              className="inline-flex items-center gap-2 bg-[#FF671F] hover:bg-orange-600 text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow-xs transition"
            >
              <Sparkles className="w-4 h-4" />
              <span>Compose with AI</span>
            </Link>
          </div>
        </div>

        {/* Indian Festival Callout Banner */}
        <div className="bg-gradient-to-r from-orange-50 via-amber-50 to-emerald-50 border border-orange-200/80 rounded-2xl p-5 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-orange-500 text-white flex items-center justify-center shrink-0 shadow-sm">
              <Flame className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-slate-900 text-sm sm:text-base">
                  Upcoming: Dhanteras & Diwali Celebrations (दीपावली 2026)
                </h3>
                <span className="text-xs font-bold bg-amber-200/60 text-amber-900 px-2 py-0.5 rounded">
                  In 4 Days
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-600 mt-0.5">
                Indian retail brands experience up to 4.2x engagement during this period. Pre-schedule your client campaigns in Hinglish.
              </p>
            </div>
          </div>
          <Link
            href="/composer"
            className="inline-flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow-xs transition whitespace-nowrap"
          >
            <span>Draft Festive Campaign</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Metric Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((s, i) => {
            const Icon = s.icon;
            return (
              <div
                key={i}
                className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs flex items-center justify-between"
              >
                <div>
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
                    {s.label}
                  </span>
                  <span className="text-2xl font-black text-slate-900 mt-1 block tracking-tight">
                    {s.value}
                  </span>
                  <span className="text-[11px] font-semibold text-emerald-600 mt-0.5 block">
                    {s.change}
                  </span>
                </div>
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${s.color}`}>
                  <Icon className="w-6 h-6" />
                </div>
              </div>
            );
          })}
        </div>

        {/* Split Grid: Publishing Queue vs Quick Actions */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Main Feed: Recent Queue & Approval Items (8 cols) */}
          <div className="lg:col-span-8 bg-white border border-slate-200 rounded-2xl p-6 shadow-xs space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-slate-700" />
                <h2 className="font-bold text-slate-900 text-sm">Upcoming Publishing Queue</h2>
              </div>
              <Link href="/queue" className="text-xs font-bold text-orange-600 hover:underline flex items-center gap-1">
                View Full Queue ({recentPosts.length})
                <ArrowRight className="w-3 h-3" />
              </Link>
            </div>

            <div className="space-y-4">
              {recentPosts.map((post) => (
                <div
                  key={post.id}
                  className="border border-slate-200 rounded-xl p-4 bg-slate-50/50 hover:bg-slate-50 transition space-y-3"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <span className="text-xs font-bold text-slate-900 block">{post.client}</span>
                      <span className="text-[11px] text-slate-500 mt-0.5 flex items-center gap-1">
                        <Clock className="w-3 h-3 text-slate-400" />
                        {post.scheduledFor}
                      </span>
                    </div>

                    {post.status === 'PENDING_APPROVAL' && (
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 border border-amber-200 flex items-center gap-1">
                        <AlertCircle className="w-2.5 h-2.5" />
                        Awaiting Client Sign-Off
                      </span>
                    )}
                    {post.status === 'QUEUED' && (
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-100 text-blue-800 border border-blue-200 flex items-center gap-1">
                        <Clock className="w-2.5 h-2.5" />
                        Queued in BullMQ
                      </span>
                    )}
                    {post.status === 'PUBLISHED' && (
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200 flex items-center gap-1">
                        <CheckCircle className="w-2.5 h-2.5" />
                        Published
                      </span>
                    )}
                  </div>

                  <p className="text-xs text-slate-700 bg-white p-3 rounded-xl border border-slate-100 leading-relaxed">
                    {post.content}
                  </p>

                  <div className="flex items-center justify-between pt-1">
                    <div className="flex items-center gap-1">
                      {post.channels.map((ch) => (
                        <span key={ch} className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-200 text-slate-700">
                          {ch}
                        </span>
                      ))}
                    </div>

                    {post.magicLink && (
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => copyToClipboard(post.magicLink!)}
                          className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 px-2.5 py-1 rounded-lg border border-emerald-200 transition"
                        >
                          {copiedLink === post.magicLink ? (
                            <>
                              <Check className="w-3 h-3 text-emerald-600" />
                              Link Copied!
                            </>
                          ) : (
                            <>
                              <Copy className="w-3 h-3" />
                              WhatsApp Link
                            </>
                          )}
                        </button>
                        <a
                          href={post.magicLink}
                          target="_blank"
                          rel="noreferrer"
                          className="p-1 text-slate-400 hover:text-slate-600"
                          title="Open client review view"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Sidebar Modules: Upcoming Indian Holidays & Quick Actions (4 cols) */}
          <div className="lg:col-span-4 space-y-6">
            {/* Quick Actions */}
            <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs space-y-3">
              <h3 className="font-bold text-slate-900 text-xs uppercase tracking-wider">Quick Actions</h3>
              <div className="grid grid-cols-2 gap-2">
                <Link
                  href="/composer"
                  className="p-3 rounded-xl border border-slate-200 hover:border-orange-400 hover:bg-orange-50/50 transition flex flex-col items-center text-center gap-1.5 group"
                >
                  <Sparkles className="w-5 h-5 text-orange-600 group-hover:scale-110 transition" />
                  <span className="text-xs font-bold text-slate-800">New Post</span>
                </Link>
                <Link
                  href="/calendar"
                  className="p-3 rounded-xl border border-slate-200 hover:border-blue-400 hover:bg-blue-50/50 transition flex flex-col items-center text-center gap-1.5 group"
                >
                  <Calendar className="w-5 h-5 text-blue-600 group-hover:scale-110 transition" />
                  <span className="text-xs font-bold text-slate-800">Calendar</span>
                </Link>
                <Link
                  href="/approvals"
                  className="p-3 rounded-xl border border-slate-200 hover:border-emerald-400 hover:bg-emerald-50/50 transition flex flex-col items-center text-center gap-1.5 group"
                >
                  <CheckCircle className="w-5 h-5 text-emerald-600 group-hover:scale-110 transition" />
                  <span className="text-xs font-bold text-slate-800">Approvals</span>
                </Link>
                <Link
                  href="/ai-studio"
                  className="p-3 rounded-xl border border-slate-200 hover:border-purple-400 hover:bg-purple-50/50 transition flex flex-col items-center text-center gap-1.5 group"
                >
                  <TrendingUp className="w-5 h-5 text-purple-600 group-hover:scale-110 transition" />
                  <span className="text-xs font-bold text-slate-800">AI Studio</span>
                </Link>
              </div>
            </div>

            {/* Indian Festival Calendar Mini-Widget */}
            <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-slate-900 text-xs uppercase tracking-wider flex items-center gap-1.5">
                  <Flame className="w-4 h-4 text-orange-500" />
                  Festival Radar (India)
                </h3>
                <span className="text-[10px] font-bold text-slate-400">Panchang 2026</span>
              </div>
              <div className="space-y-2">
                {INDIAN_FESTIVALS.slice(0, 4).map((fest) => (
                  <div
                    key={fest.id}
                    className="p-2.5 rounded-xl border border-slate-100 bg-slate-50 flex items-center justify-between text-xs"
                  >
                    <div>
                      <span className="font-bold text-slate-800 block">
                        {fest.name}
                      </span>
                      <span className="text-[10px] text-slate-500">{fest.category}</span>
                    </div>
                    <Link
                      href={`/composer?festival=${encodeURIComponent(fest.name)}`}
                      className="text-[10px] font-bold text-orange-600 hover:text-orange-700 bg-white px-2 py-1 rounded-lg border border-slate-200 shadow-2xs"
                    >
                      Draft
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
