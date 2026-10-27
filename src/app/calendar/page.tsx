'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { AppShell } from '@/components/layout/app-shell';
import {
  Calendar as CalendarIcon,
  ChevronLeft,
  ChevronRight,
  Plus,
  Flame,
  Clock,
  Instagram,
  Facebook,
  Linkedin,
} from 'lucide-react';
import { INDIAN_FESTIVALS } from '@/lib/festivals/data';

export default function CalendarPage() {
  const [currentMonth, setCurrentMonth] = useState('October 2026');

  const calendarDays = [
    { day: 25, posts: [] },
    { day: 26, posts: [] },
    {
      day: 27,
      isToday: true,
      posts: [
        {
          id: 'p-3',
          time: '10:00 AM',
          brand: 'Kala Niketan',
          caption: 'Handwoven Kanjeevarams Saree Showcase',
          channel: 'Instagram',
          status: 'PUBLISHED',
        },
      ],
    },
    { day: 28, posts: [] },
    {
      day: 29,
      festival: 'Dhanteras (धनतेरस)',
      posts: [
        {
          id: 'p-1',
          time: '06:30 PM',
          brand: 'Ramesh Jewellers',
          caption: 'Dhanteras 22K Gold Antique Collection',
          channel: 'Instagram',
          status: 'PENDING_APPROVAL',
        },
      ],
    },
    {
      day: 30,
      posts: [
        {
          id: 'p-2',
          time: '05:00 PM',
          brand: 'Chai Shai Cafe',
          caption: 'Sham ki chai and adrak wali cutting',
          channel: 'Instagram',
          status: 'QUEUED',
        },
      ],
    },
    {
      day: 31,
      festival: 'Choti Diwali (नरक चतुर्दशी)',
      posts: [],
    },
    {
      day: 1,
      isNextMonth: true,
      festival: 'Diwali (दीपावली 2026)',
      posts: [
        {
          id: 'p-4',
          time: '11:00 AM',
          brand: 'Ramesh Jewellers',
          caption: 'Diwali Festive Gifting & Diamond Sparkles',
          channel: 'Facebook',
          status: 'PENDING_APPROVAL',
        },
      ],
    },
  ];

  return (
    <AppShell>
      <div className="space-y-6">
        {/* Calendar Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-3 border-b border-slate-200">
          <div>
            <h1 className="text-xl font-black text-slate-900 tracking-tight flex items-center gap-2">
              <CalendarIcon className="w-5 h-5 text-orange-600" />
              Content Calendar & Indian Festival Radar
            </h1>
            <p className="text-xs text-slate-500">
              Interactive visual schedule across all 4 client workspaces.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1 bg-white border border-slate-200 rounded-xl p-1 shadow-2xs">
              <button className="p-1 rounded-lg text-slate-500 hover:bg-slate-100">
                <ChevronLeft className="w-4 h-4" />
              </button>
              <span className="text-xs font-bold text-slate-800 px-3">{currentMonth}</span>
              <button className="p-1 rounded-lg text-slate-500 hover:bg-slate-100">
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            <Link
              href="/composer"
              className="inline-flex items-center gap-1.5 bg-[#FF671F] hover:bg-orange-600 text-white text-xs font-bold px-3.5 py-2 rounded-xl shadow-xs transition"
            >
              <Plus className="w-4 h-4" />
              <span>Schedule Post</span>
            </Link>
          </div>
        </div>

        {/* Days of Week Header */}
        <div className="grid grid-cols-7 gap-px bg-slate-200 rounded-2xl overflow-hidden border border-slate-200 shadow-xs">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((d) => (
            <div key={d} className="bg-slate-100 p-2 text-center text-xs font-bold text-slate-600">
              {d}
            </div>
          ))}

          {/* Calendar Grid Cells */}
          {calendarDays.map((item, idx) => (
            <div
              key={idx}
              className={`min-h-[140px] bg-white p-2.5 flex flex-col justify-between transition hover:bg-slate-50/80 ${
                item.isToday ? 'bg-orange-50/30' : ''
              }`}
            >
              <div className="flex items-start justify-between">
                <span
                  className={`text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center ${
                    item.isToday ? 'bg-[#FF671F] text-white shadow-xs' : 'text-slate-700'
                  }`}
                >
                  {item.day}
                </span>

                {item.festival && (
                  <span className="text-[10px] font-bold text-orange-700 bg-orange-100/70 border border-orange-200 px-1.5 py-0.5 rounded flex items-center gap-0.5 max-w-[110px] truncate">
                    <Flame className="w-2.5 h-2.5 text-orange-600 shrink-0" />
                    <span className="truncate">{item.festival}</span>
                  </span>
                )}
              </div>

              {/* Scheduled Posts in Cell */}
              <div className="space-y-1.5 mt-2 flex-1">
                {item.posts.map((p) => (
                  <Link
                    key={p.id}
                    href="/queue"
                    className="block p-1.5 rounded-lg border border-slate-200 bg-white hover:border-orange-400 text-[11px] shadow-2xs transition group"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-slate-900 truncate max-w-[90px]">
                        {p.brand}
                      </span>
                      <span className="text-[9px] text-slate-400">{p.time}</span>
                    </div>
                    <p className="text-[10px] text-slate-500 truncate mt-0.5">{p.caption}</p>
                  </Link>
                ))}
              </div>

              {/* Add Slot Trigger on Hover */}
              <Link
                href={`/composer?date=2026-10-${item.day}`}
                className="opacity-0 hover:opacity-100 text-[10px] font-bold text-slate-400 hover:text-orange-600 flex items-center justify-center gap-1 py-1 transition"
              >
                <Plus className="w-3 h-3" /> Add Slot
              </Link>
            </div>
          ))}
        </div>
      </div>
    </AppShell>
  );
}
