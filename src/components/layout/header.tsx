'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Bell,
  PenSquare,
  Briefcase,
  ChevronDown,
  Sparkles,
  ExternalLink,
  ShieldCheck,
} from 'lucide-react';

interface HeaderProps {
  collapsed: boolean;
}

export function Header({ collapsed }: HeaderProps) {
  const [selectedWorkspace, setSelectedWorkspace] = useState('ws-all');

  const clientWorkspaces = [
    { id: 'ws-all', name: 'All Agency Workspaces' },
    { id: 'ws-ramesh', name: 'Ramesh Jewellers (Indiranagar)' },
    { id: 'ws-chaishai', name: 'Chai Shai Cafe (Koramangala)' },
    { id: 'ws-kala', name: 'Kala Niketan Silk Saree House' },
    { id: 'ws-drsharma', name: 'Dr. Sharma Dental Clinic' },
  ];

  return (
    <header
      className={`fixed top-0 right-0 z-30 h-16 bg-white border-b border-slate-200 flex items-center justify-between px-6 transition-all duration-300 ${
        collapsed ? 'left-20' : 'left-64'
      }`}
    >
      {/* Workspace Switcher */}
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2 bg-slate-50 hover:bg-slate-100 border border-slate-200 px-3 py-1.5 rounded-xl transition cursor-pointer">
          <Briefcase className="w-3.5 h-3.5 text-orange-600" />
          <select
            value={selectedWorkspace}
            onChange={(e) => setSelectedWorkspace(e.target.value)}
            className="text-xs font-bold text-slate-800 bg-transparent border-none focus:outline-none cursor-pointer"
          >
            {clientWorkspaces.map((ws) => (
              <option key={ws.id} value={ws.id}>
                {ws.name}
              </option>
            ))}
          </select>
        </div>

        <span className="text-xs text-slate-400 hidden md:inline">•</span>

        <div className="hidden md:flex items-center gap-1.5 text-xs text-slate-500 font-medium">
          <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block" />
          <span>BullMQ Publishing Engine Active</span>
        </div>
      </div>

      {/* Action Controls */}
      <div className="flex items-center gap-3">
        {/* Review Portal Quick Preview */}
        <Link
          href="/review/tok_dhanteras_demo"
          target="_blank"
          className="hidden sm:inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 px-3 py-2 rounded-xl border border-emerald-200 transition"
          title="Open zero-login client WhatsApp review preview"
        >
          <ExternalLink className="w-3.5 h-3.5" />
          <span>WhatsApp Review Portal</span>
        </Link>

        {/* Notifications */}
        <Link
          href="/approvals"
          className="relative p-2 rounded-xl text-slate-600 hover:bg-slate-100 transition"
          title="2 Posts Pending Client Approval"
        >
          <Bell className="w-4 h-4" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-orange-600" />
        </Link>

        {/* Create Post Button */}
        <Link
          href="/composer"
          className="inline-flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold px-4 py-2 rounded-xl shadow-xs transition"
        >
          <PenSquare className="w-3.5 h-3.5 text-orange-400" />
          <span>Create Post</span>
        </Link>
      </div>
    </header>
  );
}
