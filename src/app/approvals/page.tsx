'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { AppShell } from '@/components/layout/app-shell';
import {
  Users,
  ShieldCheck,
  CheckCircle,
  RotateCcw,
  Clock,
  ExternalLink,
  Copy,
  Check,
  Send,
  MessageSquare,
} from 'lucide-react';

export default function ApprovalsPage() {
  const [copiedToken, setCopiedToken] = useState<string | null>(null);

  const pendingApprovals = [
    {
      id: 'appr-1',
      brand: 'Ramesh Jewellers (Indiranagar)',
      content:
        '✨ Dhanteras Dhamaka! Shubh muhurat par lakar aao Lakshmi ka aashirwaad hamare exclusive 22K Gold Antique Collection ke saath. Har purchase par flat 20% off on making charges! 🪔 #Dhanteras2026',
      mediaUrl:
        'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=800&auto=format&fit=crop&q=80',
      clientPhone: '+91 98765 43210 (Mr. Ramesh)',
      magicLink: 'http://localhost:3000/review/tok_dhanteras_demo',
      scheduledFor: 'Oct 29, 2026 • 06:30 PM',
      status: 'PENDING_CLIENT',
      submittedBy: 'Atharva Sharma (Editor)',
    },
    {
      id: 'appr-2',
      brand: 'Ramesh Jewellers (Indiranagar)',
      content:
        'Ghar ki roshni aur parivaar ka pyaar. Iss Diwali, celebrate the timeless beauty of pure handcrafted diamonds. Visit our Indiranagar showroom for special festive gift boxes. ✨🪔',
      mediaUrl:
        'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=800&auto=format&fit=crop&q=80',
      clientPhone: '+91 98765 43210 (Mr. Ramesh)',
      magicLink: 'http://localhost:3000/review/tok_dhanteras_demo',
      scheduledFor: 'Nov 01, 2026 • 11:00 AM',
      status: 'PENDING_CLIENT',
      submittedBy: 'Neha Kulkarni (Designer)',
    },
  ];

  const reviewHistory = [
    {
      action: 'APPROVED',
      by: 'Mr. Ramesh (Client via WhatsApp Magic Link)',
      postTitle: 'Karwa Chauth Traditional Mangalsutra Reel',
      timestamp: 'Yesterday at 04:15 PM',
    },
    {
      action: 'REVISION_REQUESTED',
      by: 'Mr. Ramesh (Client via Magic Link Note)',
      postTitle: 'Diwali Gold Coins Advance Booking',
      note: 'Change making charge discount from 15% to 20%',
      timestamp: '2 days ago',
    },
  ];

  const copyToClipboard = (token: string, link: string) => {
    navigator.clipboard.writeText(link);
    setCopiedToken(token);
    setTimeout(() => setCopiedToken(null), 2000);
  };

  return (
    <AppShell>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-3 border-b border-slate-200">
          <div>
            <h1 className="text-xl font-black text-slate-900 tracking-tight flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-orange-600" />
              Client Approvals & WhatsApp Review Gateway
            </h1>
            <p className="text-xs text-slate-500">
              Indian agency clients approve posts in 1 tap without logging in or downloading apps.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-amber-700 bg-amber-50 border border-amber-200 px-3 py-1.5 rounded-xl">
              2 Posts Pending Client Sign-Off
            </span>
          </div>
        </div>

        {/* 2-Column Approvals Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Active Pending Approvals (8 cols) */}
          <div className="lg:col-span-8 space-y-4">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
              Posts Awaiting Client Sign-Off
            </span>

            <div className="space-y-4">
              {pendingApprovals.map((item, idx) => (
                <div
                  key={idx}
                  className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs space-y-4 hover:border-orange-300 transition"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <span className="text-xs font-bold text-slate-900 block">{item.brand}</span>
                      <span className="text-[11px] text-slate-500 mt-0.5">
                        Target: {item.scheduledFor} • Submitted by {item.submittedBy}
                      </span>
                    </div>

                    <span className="text-[10px] font-bold text-amber-800 bg-amber-100 border border-amber-200 px-2.5 py-1 rounded-full flex items-center gap-1">
                      <Clock className="w-3 h-3 text-amber-700" />
                      Pending WhatsApp Review
                    </span>
                  </div>

                  <p className="text-xs text-slate-700 bg-slate-50 p-3 rounded-xl border border-slate-100 leading-relaxed">
                    {item.content}
                  </p>

                  <div className="bg-emerald-50/70 border border-emerald-200 rounded-xl p-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
                    <div>
                      <span className="font-bold text-emerald-950 block">Client Contact:</span>
                      <span className="text-emerald-700 text-[11px]">{item.clientPhone}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => copyToClipboard(`t-${idx}`, item.magicLink)}
                        className="inline-flex items-center gap-1 bg-white hover:bg-emerald-100 text-emerald-800 border border-emerald-300 px-3 py-1.5 rounded-lg font-bold text-xs shadow-2xs transition"
                      >
                        {copiedToken === `t-${idx}` ? (
                          <>
                            <Check className="w-3.5 h-3.5 text-emerald-600" />
                            Link Copied!
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5" />
                            Copy Magic Link
                          </>
                        )}
                      </button>

                      <a
                        href={item.magicLink}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1 bg-emerald-700 hover:bg-emerald-800 text-white px-3 py-1.5 rounded-lg font-bold text-xs shadow-2xs transition"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                        Preview Portal
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Audit Trail & Review History (4 cols) */}
          <div className="lg:col-span-4 bg-white border border-slate-200 rounded-2xl p-5 shadow-xs space-y-4">
            <h3 className="font-bold text-slate-900 text-xs uppercase tracking-wider flex items-center gap-1.5 pb-2 border-b border-slate-100">
              <Clock className="w-4 h-4 text-slate-600" />
              Approval Audit Trail
            </h3>

            <div className="space-y-3">
              {reviewHistory.map((h, i) => (
                <div key={i} className="p-3 rounded-xl border border-slate-100 bg-slate-50 space-y-1 text-xs">
                  <div className="flex items-center justify-between">
                    <span
                      className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
                        h.action === 'APPROVED'
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-orange-100 text-orange-800'
                      }`}
                    >
                      {h.action}
                    </span>
                    <span className="text-[10px] text-slate-400">{h.timestamp}</span>
                  </div>
                  <span className="font-bold text-slate-800 block text-[11px]">{h.postTitle}</span>
                  <span className="text-[10px] text-slate-500 block">{h.by}</span>
                  {h.note && (
                    <div className="bg-amber-50 border border-amber-200 p-2 rounded text-[10px] text-amber-900 mt-1">
                      &quot;{h.note}&quot;
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
