'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { AppShell } from '@/components/layout/app-shell';
import {
  Compass,
  CheckCircle,
  ArrowRight,
  Briefcase,
  Users,
  Plug,
  PenSquare,
  Sparkles,
} from 'lucide-react';

export default function OnboardingPage() {
  const [currentStep, setCurrentStep] = useState(1);

  const steps = [
    {
      num: 1,
      title: 'Create Your First Client Brand',
      desc: 'Set up an isolated workspace for a client (e.g. Ramesh Jewellers) with their WhatsApp contact for approvals.',
      icon: Briefcase,
      completed: true,
    },
    {
      num: 2,
      title: 'Connect Social Accounts or Sandbox',
      desc: 'Link Instagram Business, LinkedIn, or toggle the Developer Sandbox simulator for instant testing.',
      icon: Plug,
      completed: true,
    },
    {
      num: 3,
      title: 'Generate Hinglish Copy with Gemini AI',
      desc: 'Pick an upcoming Indian festival (Diwali, Dhanteras) and test the cultural copy generation.',
      icon: Sparkles,
      completed: true,
    },
    {
      num: 4,
      title: 'Test WhatsApp Zero-Login Approval',
      desc: 'Experience the 1-tap mobile review link that clients receive on their phones.',
      icon: CheckCircle,
      completed: false,
    },
  ];

  return (
    <AppShell>
      <div className="space-y-6 max-w-4xl mx-auto">
        <div className="pb-3 border-b border-slate-200">
          <div className="flex items-center gap-2">
            <Compass className="w-5 h-5 text-orange-600" />
            <h1 className="text-xl font-black text-slate-900 tracking-tight">
              Agency Setup & Onboarding Checklist
            </h1>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Follow this 4-step guide to get your Indian agency fully operational on PostBabu in under 5 minutes.
          </p>
        </div>

        {/* Progress Bar */}
        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs space-y-2">
          <div className="flex items-center justify-between text-xs font-bold">
            <span className="text-slate-800">Setup Progress: 3 of 4 Steps Complete (75%)</span>
            <span className="text-emerald-600">Almost Ready</span>
          </div>
          <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
            <div className="bg-gradient-to-r from-orange-500 to-emerald-500 h-full w-3/4 rounded-full transition-all duration-500" />
          </div>
        </div>

        {/* Steps List */}
        <div className="space-y-4">
          {steps.map((st) => {
            const Icon = st.icon;
            return (
              <div
                key={st.num}
                className={`bg-white border rounded-2xl p-5 shadow-xs flex items-start justify-between gap-4 transition ${
                  st.completed
                    ? 'border-emerald-200 bg-emerald-50/20'
                    : 'border-orange-300 bg-white ring-2 ring-orange-500/10'
                }`}
              >
                <div className="flex items-start gap-3.5">
                  <div
                    className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 font-bold text-sm ${
                      st.completed
                        ? 'bg-emerald-600 text-white'
                        : 'bg-orange-500 text-white shadow-xs'
                    }`}
                  >
                    {st.completed ? <CheckCircle className="w-5 h-5" /> : st.num}
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-slate-900">{st.title}</h3>
                    <p className="text-xs text-slate-600 mt-1 leading-relaxed">{st.desc}</p>
                  </div>
                </div>

                <div className="shrink-0 pt-1">
                  {st.num === 1 && (
                    <Link
                      href="/brands"
                      className="text-xs font-bold text-slate-700 hover:text-slate-900 bg-slate-100 px-3 py-1.5 rounded-lg"
                    >
                      View Brands
                    </Link>
                  )}
                  {st.num === 2 && (
                    <Link
                      href="/integrations"
                      className="text-xs font-bold text-slate-700 hover:text-slate-900 bg-slate-100 px-3 py-1.5 rounded-lg"
                    >
                      Integrations
                    </Link>
                  )}
                  {st.num === 3 && (
                    <Link
                      href="/ai-studio"
                      className="text-xs font-bold text-slate-700 hover:text-slate-900 bg-slate-100 px-3 py-1.5 rounded-lg"
                    >
                      Open AI Studio
                    </Link>
                  )}
                  {st.num === 4 && (
                    <Link
                      href="/review/tok_dhanteras_demo"
                      target="_blank"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-white bg-orange-600 hover:bg-orange-700 px-4 py-2 rounded-xl shadow-xs transition"
                    >
                      <span>Test WhatsApp Portal</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </AppShell>
  );
}
