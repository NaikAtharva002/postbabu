'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { AppShell } from '@/components/layout/app-shell';
import {
  ListOrdered,
  Clock,
  CheckCircle,
  AlertCircle,
  Plus,
  Play,
  RotateCcw,
  Sliders,
  Flame,
  ArrowRight,
} from 'lucide-react';

export default function QueuePage() {
  const [slots, setSlots] = useState([
    { day: 'Monday', time: '10:00 AM' },
    { day: 'Wednesday', time: '02:30 PM' },
    { day: 'Friday', time: '06:30 PM (Peak Indian Festive Window)' },
    { day: 'Sunday', time: '11:00 AM' },
  ]);

  const queuedPosts = [
    {
      id: 'q-1',
      brand: 'Ramesh Jewellers',
      content:
        '✨ Dhanteras 22K Antique Gold preview. Pre-book to get complimentary silver coin on orders above ₹50,000.',
      targetSlot: 'Oct 29, 2026 • 06:30 PM',
      channels: ['Instagram', 'Facebook'],
      status: 'AWAITING_CLIENT_APPROVAL',
      engine: 'BullMQ Delayed ZSET',
    },
    {
      id: 'q-2',
      brand: 'Chai Shai Cafe',
      content:
        'Sham ki cutting chai aur adrak wali chuski. Tag your tea partner!',
      targetSlot: 'Oct 30, 2026 • 05:00 PM',
      channels: ['Instagram'],
      status: 'QUEUED',
      engine: 'BullMQ Delayed ZSET',
    },
    {
      id: 'q-3',
      brand: 'Kala Niketan Silk',
      content:
        'Pure Kanjeevarams for the wedding season. Shandar color palettes inspired by South Indian temples.',
      targetSlot: 'Nov 02, 2026 • 10:00 AM',
      channels: ['Instagram', 'LinkedIn'],
      status: 'QUEUED',
      engine: 'BullMQ Delayed ZSET',
    },
  ];

  return (
    <AppShell>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-3 border-b border-slate-200">
          <div>
            <h1 className="text-xl font-black text-slate-900 tracking-tight flex items-center gap-2">
              <ListOrdered className="w-5 h-5 text-orange-600" />
              Publishing Queue & Slotted Scheduling
            </h1>
            <p className="text-xs text-slate-500">
              Buffer-style automatic time slots powered by BullMQ delayed Redis jobs.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-xl border border-emerald-200 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              BullMQ Worker Running
            </span>
          </div>
        </div>

        {/* 2-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left Column: Scheduled Queue Items (8 cols) */}
          <div className="lg:col-span-8 bg-white border border-slate-200 rounded-2xl p-6 shadow-xs space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h2 className="font-bold text-slate-900 text-sm">
                Active Queue Posts ({queuedPosts.length})
              </h2>
              <Link
                href="/composer"
                className="text-xs font-bold text-orange-600 hover:text-orange-700 flex items-center gap-1"
              >
                <Plus className="w-3.5 h-3.5" />
                Add Post to Queue
              </Link>
            </div>

            <div className="space-y-4">
              {queuedPosts.map((post) => (
                <div
                  key={post.id}
                  className="border border-slate-200 rounded-xl p-4 bg-slate-50/50 hover:bg-slate-50 transition space-y-3"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <span className="text-xs font-bold text-slate-900 block">{post.brand}</span>
                      <span className="text-[11px] text-slate-500 flex items-center gap-1 mt-0.5">
                        <Clock className="w-3 h-3 text-slate-400" />
                        Target Slot: {post.targetSlot}
                      </span>
                    </div>

                    {post.status === 'QUEUED' && (
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-100 text-blue-800 border border-blue-200 flex items-center gap-1">
                        <Clock className="w-2.5 h-2.5" />
                        Enqueued (BullMQ)
                      </span>
                    )}

                    {post.status === 'AWAITING_CLIENT_APPROVAL' && (
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 border border-amber-200 flex items-center gap-1">
                        <AlertCircle className="w-2.5 h-2.5" />
                        Awaiting Client Sign-Off
                      </span>
                    )}
                  </div>

                  <p className="text-xs text-slate-700 bg-white p-3 rounded-xl border border-slate-100 leading-relaxed">
                    {post.content}
                  </p>

                  <div className="flex items-center justify-between pt-1 text-[11px]">
                    <div className="flex items-center gap-1">
                      {post.channels.map((ch) => (
                        <span key={ch} className="font-bold text-[10px] bg-slate-200 text-slate-700 px-2 py-0.5 rounded">
                          {ch}
                        </span>
                      ))}
                    </div>

                    <span className="text-[10px] font-mono text-slate-400">{post.engine}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Recurring Slot Template (4 cols) */}
          <div className="lg:col-span-4 bg-white border border-slate-200 rounded-2xl p-6 shadow-xs space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <h3 className="font-bold text-slate-900 text-xs uppercase tracking-wider flex items-center gap-1.5">
                <Sliders className="w-4 h-4 text-orange-600" />
                Weekly Slot Cadence
              </h3>
            </div>
            <p className="text-xs text-slate-500">
              Posts scheduled with &apos;Add to Queue&apos; automatically take the next open slot in this calendar.
            </p>

            <div className="space-y-2">
              {slots.map((s, idx) => (
                <div
                  key={idx}
                  className="p-3 rounded-xl border border-slate-200 bg-slate-50 flex items-center justify-between text-xs"
                >
                  <span className="font-bold text-slate-800">{s.day}</span>
                  <span className="font-medium text-slate-500">{s.time}</span>
                </div>
              ))}
            </div>

            <button
              type="button"
              onClick={() =>
                setSlots([...slots, { day: 'Saturday', time: '07:00 PM (Weekend Spike)' }])
              }
              className="w-full text-xs font-bold text-orange-700 bg-orange-50 hover:bg-orange-100 border border-orange-200 py-2.5 rounded-xl transition flex items-center justify-center gap-1"
            >
              <Plus className="w-3.5 h-3.5" />
              Add Recurring Slot
            </button>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
