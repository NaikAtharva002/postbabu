'use client';

import React, { useState } from 'react';
import { AppShell } from '@/components/layout/app-shell';
import {
  CreditCard,
  Check,
  Sparkles,
  Zap,
  ShieldCheck,
  Building,
  HelpCircle,
} from 'lucide-react';
import { RAZORPAY_PLANS } from '@/lib/billing/razorpay';

export default function BillingPage() {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');
  const [selectedTier, setSelectedTier] = useState('GROWTH');
  const [checkoutNotice, setCheckoutNotice] = useState<string | null>(null);

  const plans = [
    {
      id: 'STARTER',
      name: 'Chota Agency',
      tagline: 'Best for solo freelancers & consultants',
      price: '₹499',
      period: '/month',
      features: [
        '3 Client Brand Workspaces',
        '9 Connected Social Channels',
        'BullMQ Slotted Scheduling',
        '50 Hinglish AI Captions/mo',
        'Community Email Support',
      ],
      popular: false,
    },
    {
      id: 'GROWTH',
      name: 'Agency Pro',
      tagline: 'Ideal for boutique Indian digital agencies',
      price: '₹1,299',
      period: '/month',
      features: [
        '10 Client Brand Workspaces',
        'Unlimited Social Channels',
        'Zero-Login WhatsApp Client Approvals',
        '80+ Pre-loaded Indian Festivals Radar',
        '500 Hinglish & Regional AI Captions',
        'CSV & Metric Exports',
        'Priority Worker Queue',
      ],
      popular: true,
      current: true,
    },
    {
      id: 'SCALE',
      name: 'Agency Scale',
      tagline: 'For full-service marketing agencies & studios',
      price: '₹2,499',
      period: '/month',
      features: [
        'Unlimited Client Workspaces',
        'Unlimited Social Channels',
        'Whitelabel Client Review Portal (Your Agency Domain)',
        'Unlimited Gemini AI Generations',
        'Custom Webhooks & Multi-user RBAC',
        'Dedicated WhatsApp Manager',
      ],
      popular: false,
    },
  ];

  const handleCheckout = (tierId: string) => {
    setSelectedTier(tierId);
    setCheckoutNotice(
      `Razorpay UPI Autopay intent initialized for ${tierId} tier. In production, this opens the Razorpay modal for 1-tap Google Pay / PhonePe / Paytm e-mandate authentication.`
    );
    setTimeout(() => setCheckoutNotice(null), 5000);
  };

  return (
    <AppShell>
      <div className="space-y-6 max-w-5xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-3 border-b border-slate-200">
          <div>
            <h1 className="text-xl font-black text-slate-900 tracking-tight flex items-center gap-2">
              <CreditCard className="w-5 h-5 text-orange-600" />
              Subscription Billing & UPI Autopay
            </h1>
            <p className="text-xs text-slate-500">
              India-first agency pricing with Razorpay UPI Autopay and GST-compliant invoicing.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-xl border border-emerald-200">
              Active Plan: Agency Pro (₹1,299/mo)
            </span>
          </div>
        </div>

        {checkoutNotice && (
          <div className="p-4 rounded-xl bg-orange-50 border border-orange-200 text-orange-900 text-xs font-medium flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-orange-600 shrink-0" />
            <span>{checkoutNotice}</span>
          </div>
        )}

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
          {plans.map((p) => (
            <div
              key={p.id}
              className={`bg-white rounded-2xl p-6 border flex flex-col justify-between transition relative ${
                p.popular
                  ? 'border-orange-500 shadow-md ring-2 ring-orange-500/20'
                  : 'border-slate-200 shadow-xs hover:border-slate-300'
              }`}
            >
              {p.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#FF671F] text-white text-[10px] font-bold uppercase tracking-wider px-3 py-0.5 rounded-full shadow-xs">
                  Most Popular for Agencies
                </div>
              )}

              <div className="space-y-4">
                <div>
                  <h3 className="text-base font-bold text-slate-900">{p.name}</h3>
                  <p className="text-xs text-slate-500 mt-0.5">{p.tagline}</p>
                </div>

                <div className="flex items-baseline gap-1">
                  <span className="text-3xl font-black text-slate-900 tracking-tight">
                    {p.price}
                  </span>
                  <span className="text-xs text-slate-400 font-semibold">{p.period}</span>
                </div>

                <div className="space-y-2.5 pt-2 border-t border-slate-100 text-xs text-slate-600">
                  {p.features.map((feat, idx) => (
                    <div key={idx} className="flex items-start gap-2">
                      <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-6">
                {p.current ? (
                  <button
                    disabled
                    className="w-full bg-slate-100 text-slate-500 font-bold text-xs py-2.5 rounded-xl cursor-default"
                  >
                    Current Plan
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={() => handleCheckout(p.id)}
                    className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs py-2.5 rounded-xl shadow-xs transition"
                  >
                    Upgrade with UPI Autopay
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* GST & Payment Information Note */}
        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs text-slate-600">
          <div className="flex items-center gap-3">
            <Building className="w-5 h-5 text-slate-400 shrink-0" />
            <div>
              <span className="font-bold text-slate-800 block">GST Invoicing Available</span>
              <span className="text-slate-500 text-[11px]">
                Enter your agency 15-digit GSTIN at checkout to claim 18% Input Tax Credit.
              </span>
            </div>
          </div>
          <span className="text-[11px] font-mono text-slate-500">
            Processed via Razorpay Subscriptions (UPI / Cards / NetBanking)
          </span>
        </div>
      </div>
    </AppShell>
  );
}
