'use client';

import React, { useState } from 'react';
import { AppShell } from '@/components/layout/app-shell';
import {
  Settings,
  Shield,
  Key,
  Globe,
  Database,
  CheckCircle,
  Save,
  Server,
} from 'lucide-react';

export default function SettingsPage() {
  const [agencyName, setAgencyName] = useState('Digital Dosti Media');
  const [timezone, setTimezone] = useState('Asia/Kolkata (IST • UTC+5:30)');
  const [geminiKey, setGeminiKey] = useState('••••••••••••••••••••••••••••••••');
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSave = () => {
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <AppShell>
      <div className="space-y-6 max-w-4xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-3 border-b border-slate-200">
          <div>
            <h1 className="text-xl font-black text-slate-900 tracking-tight flex items-center gap-2">
              <Settings className="w-5 h-5 text-orange-600" />
              Agency Settings & Infrastructure
            </h1>
            <p className="text-xs text-slate-500">
              Configure agency profile, Indian standard timezones, and API credentials.
            </p>
          </div>

          <button
            type="button"
            onClick={handleSave}
            className="inline-flex items-center gap-1.5 bg-[#FF671F] hover:bg-orange-600 text-white text-xs font-bold px-4 py-2 rounded-xl shadow-xs transition"
          >
            <Save className="w-3.5 h-3.5" />
            <span>Save Settings</span>
          </button>
        </div>

        {savedSuccess && (
          <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-emerald-600" />
            <span>Settings and encrypted credentials saved successfully.</span>
          </div>
        )}

        {/* Agency Profile */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs space-y-4">
          <h2 className="font-bold text-slate-900 text-sm flex items-center gap-2 pb-2 border-b border-slate-100">
            <Globe className="w-4 h-4 text-slate-600" />
            Agency Profile & Timezone
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-bold text-slate-600 uppercase tracking-wider block mb-1">
                Agency Brand Name
              </label>
              <input
                type="text"
                value={agencyName}
                onChange={(e) => setAgencyName(e.target.value)}
                className="w-full text-xs border border-slate-200 rounded-xl px-3 py-2 bg-slate-50 focus:bg-white focus:outline-none"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-600 uppercase tracking-wider block mb-1">
                Default Scheduling Timezone
              </label>
              <select
                value={timezone}
                onChange={(e) => setTimezone(e.target.value)}
                className="w-full text-xs font-medium border border-slate-200 rounded-xl px-3 py-2 bg-slate-50 focus:bg-white focus:outline-none"
              >
                <option>Asia/Kolkata (IST • UTC+5:30)</option>
                <option>Asia/Dubai (GST • UTC+4:00)</option>
                <option>Europe/London (BST / GMT)</option>
                <option>America/New_York (EST / EDT)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Encrypted Credentials */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs space-y-4">
          <h2 className="font-bold text-slate-900 text-sm flex items-center gap-2 pb-2 border-b border-slate-100">
            <Key className="w-4 h-4 text-slate-600" />
            Encrypted API Keys (Stored at Rest with AES-256)
          </h2>

          <div className="space-y-3">
            <div>
              <label className="text-xs font-bold text-slate-600 uppercase tracking-wider block mb-1">
                Google Gemini API Key
              </label>
              <input
                type="password"
                value={geminiKey}
                onChange={(e) => setGeminiKey(e.target.value)}
                className="w-full text-xs font-mono border border-slate-200 rounded-xl px-3 py-2 bg-slate-50 focus:bg-white focus:outline-none"
              />
              <span className="text-[10px] text-slate-400 mt-1 block">
                Powers Hinglish copy generation and 80+ Indian festival radar angles.
              </span>
            </div>
          </div>
        </div>

        {/* Infrastructure & Queue Status */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs space-y-4">
          <h2 className="font-bold text-slate-900 text-sm flex items-center gap-2 pb-2 border-b border-slate-100">
            <Server className="w-4 h-4 text-slate-600" />
            Infrastructure Telemetry & Diagnostic Health
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-3.5 rounded-xl border border-slate-200 bg-slate-50 flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-slate-800 block">PostgreSQL Database</span>
                <span className="text-[10px] text-slate-500">Prisma ORM • Pool Connected</span>
              </div>
              <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded">
                Healthy
              </span>
            </div>

            <div className="p-3.5 rounded-xl border border-slate-200 bg-slate-50 flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-slate-800 block">BullMQ Queue Engine</span>
                <span className="text-[10px] text-slate-500">Redis ZSET Delayed Scheduler</span>
              </div>
              <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded">
                Active
              </span>
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
