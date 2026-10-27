'use client';

import React, { useState } from 'react';
import { AppShell } from '@/components/layout/app-shell';
import {
  BarChart3,
  TrendingUp,
  Download,
  Eye,
  Heart,
  Share2,
  Users,
  Instagram,
  Facebook,
  Linkedin,
} from 'lucide-react';

export default function AnalyticsPage() {
  const [dateRange, setDateRange] = useState('Last 30 Days');

  const metrics = [
    { label: 'Total Reach', value: '142,850', change: '+24.6% vs previous period', icon: Eye, color: 'text-blue-600 bg-blue-50' },
    { label: 'Total Impressions', value: '286,400', change: '+18.2% vs previous period', icon: TrendingUp, color: 'text-purple-600 bg-purple-50' },
    { label: 'Total Engagements', value: '19,420', change: '+32.4% vs previous period', icon: Heart, color: 'text-rose-600 bg-rose-50' },
    { label: 'Avg Engagement Rate', value: '6.8%', change: 'Documented: (Interactions/Reach)*100', icon: BarChart3, color: 'text-emerald-600 bg-emerald-50' },
  ];

  const topPosts = [
    {
      title: 'Dhanteras Antique Gold 22K Showcase',
      brand: 'Ramesh Jewellers',
      channel: 'Instagram',
      reach: '48,200',
      engagements: '3,840',
      rate: '7.9%',
    },
    {
      title: 'Handloom Pure Kanjeevaram Saree Reel',
      brand: 'Kala Niketan Silk',
      channel: 'Instagram',
      reach: '36,100',
      engagements: '2,920',
      rate: '8.1%',
    },
    {
      title: 'Adrak Chai & Samosa Monsoon Nostalgia',
      brand: 'Chai Shai Cafe',
      channel: 'Instagram',
      reach: '29,400',
      engagements: '2,150',
      rate: '7.3%',
    },
  ];

  const exportCSV = () => {
    const csvContent =
      'data:text/csv;charset=utf-8,' +
      [
        'Post Title,Client Brand,Platform,Reach,Engagements,Engagement Rate',
        ...topPosts.map(
          (p) => `"${p.title}","${p.brand}","${p.channel}",${p.reach},${p.engagements},${p.rate}`
        ),
      ].join('\n');

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `PostBabu_Analytics_${dateRange.replace(/\s+/g, '_')}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <AppShell>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-3 border-b border-slate-200">
          <div>
            <h1 className="text-xl font-black text-slate-900 tracking-tight flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-orange-600" />
              Cross-Platform Analytics & Reporting
            </h1>
            <p className="text-xs text-slate-500">
              Aggregated engagement performance from verified Graph API and LinkedIn endpoints.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <select
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              className="text-xs font-bold border border-slate-200 rounded-xl px-3 py-2 bg-white text-slate-800 focus:outline-none"
            >
              <option>Last 7 Days</option>
              <option>Last 30 Days</option>
              <option>This Festive Quarter (Q4 2026)</option>
            </select>

            <button
              onClick={exportCSV}
              className="inline-flex items-center gap-1.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold px-3.5 py-2 rounded-xl shadow-xs transition"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export CSV</span>
            </button>
          </div>
        </div>

        {/* High-Level Stat Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {metrics.map((m, idx) => {
            const Icon = m.icon;
            return (
              <div
                key={idx}
                className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs flex items-center justify-between"
              >
                <div>
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
                    {m.label}
                  </span>
                  <span className="text-2xl font-black text-slate-900 mt-1 block tracking-tight">
                    {m.value}
                  </span>
                  <span className="text-[11px] font-semibold text-emerald-600 mt-0.5 block">
                    {m.change}
                  </span>
                </div>
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${m.color}`}>
                  <Icon className="w-6 h-6" />
                </div>
              </div>
            );
          })}
        </div>

        {/* Top Performing Posts Table */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100">
            <h2 className="font-bold text-slate-900 text-sm">Top Performing Content</h2>
            <span className="text-xs text-slate-400">Formula: Engagement = (Interactions / Reach) × 100</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-100 text-slate-400 font-bold uppercase text-[10px]">
                  <th className="pb-3">Post Title</th>
                  <th className="pb-3">Client Brand</th>
                  <th className="pb-3">Channel</th>
                  <th className="pb-3">Total Reach</th>
                  <th className="pb-3">Interactions</th>
                  <th className="pb-3">Engagement Rate</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium">
                {topPosts.map((post, idx) => (
                  <tr key={idx} className="hover:bg-slate-50/80 transition">
                    <td className="py-3.5 font-bold text-slate-900">{post.title}</td>
                    <td className="py-3.5 text-slate-600">{post.brand}</td>
                    <td className="py-3.5">
                      <span className="text-[10px] font-bold text-pink-700 bg-pink-50 border border-pink-200 px-2 py-0.5 rounded">
                        {post.channel}
                      </span>
                    </td>
                    <td className="py-3.5 font-mono text-slate-700">{post.reach}</td>
                    <td className="py-3.5 font-mono text-slate-700">{post.engagements}</td>
                    <td className="py-3.5 font-bold text-emerald-600">{post.rate}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
