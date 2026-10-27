'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { AppShell } from '@/components/layout/app-shell';
import {
  Briefcase,
  Plus,
  Users,
  Instagram,
  Facebook,
  Linkedin,
  Phone,
  Mail,
  Calendar,
  ExternalLink,
} from 'lucide-react';

export default function BrandsPage() {
  const [brands, setBrands] = useState([
    {
      id: 'ws-ramesh',
      name: 'Ramesh Jewellers (Indiranagar)',
      category: 'Luxury Jewellery & Retail',
      phone: '+91 98765 43210',
      email: 'ramesh@rameshjewellers.in',
      channels: ['Instagram', 'Facebook', 'LinkedIn'],
      scheduledCount: 2,
      activeCampaign: 'Dhanteras & Diwali Mega Sale',
    },
    {
      id: 'ws-chaishai',
      name: 'Chai Shai Cafe (Koramangala)',
      category: 'Food & Beverage / Cafe',
      phone: '+91 98765 43211',
      email: 'hello@chaishai.in',
      channels: ['Instagram'],
      scheduledCount: 1,
      activeCampaign: 'Bangalore Monsoon Chai Season',
    },
    {
      id: 'ws-kalaniketan',
      name: 'Kala Niketan Silk Saree House',
      category: 'Fashion & Handlooms',
      phone: '+91 98765 43212',
      email: 'sales@kalaniketan.in',
      channels: ['Instagram', 'Facebook'],
      scheduledCount: 1,
      activeCampaign: 'South Indian Wedding & Kanjeevarams',
    },
    {
      id: 'ws-drsharma',
      name: 'Dr. Sharma Dental Clinic (HSR Layout)',
      category: 'Healthcare & Aesthetics',
      phone: '+91 98765 43213',
      email: 'care@drsharmaclinic.in',
      channels: ['Instagram', 'Facebook', 'LinkedIn'],
      scheduledCount: 0,
      activeCampaign: 'Festive Smile Makeover 2026',
    },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newBrandName, setNewBrandName] = useState('');
  const [newBrandPhone, setNewBrandPhone] = useState('');

  const handleAddBrand = () => {
    if (!newBrandName) return;
    const newWs = {
      id: `ws-${Date.now()}`,
      name: newBrandName,
      category: 'General Indian SME',
      phone: newBrandPhone || '+91 99999 88888',
      email: 'client@agency.in',
      channels: ['Instagram'],
      scheduledCount: 0,
      activeCampaign: 'Default Welcome Campaign',
    };
    setBrands([...brands, newWs]);
    setNewBrandName('');
    setNewBrandPhone('');
    setIsModalOpen(false);
  };

  return (
    <AppShell>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-3 border-b border-slate-200">
          <div>
            <h1 className="text-xl font-black text-slate-900 tracking-tight flex items-center gap-2">
              <Briefcase className="w-5 h-5 text-orange-600" />
              Clients & Brand Workspaces
            </h1>
            <p className="text-xs text-slate-500">
              Manage multi-tenant client brands, isolated calendars, and WhatsApp approval contacts.
            </p>
          </div>

          <button
            onClick={() => setIsModalOpen(true)}
            className="inline-flex items-center gap-1.5 bg-[#FF671F] hover:bg-orange-600 text-white text-xs font-bold px-3.5 py-2 rounded-xl shadow-xs transition"
          >
            <Plus className="w-4 h-4" />
            <span>Add Client Brand</span>
          </button>
        </div>

        {/* Brand Workspaces Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {brands.map((b) => (
            <div
              key={b.id}
              className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs space-y-4 hover:border-orange-300 transition"
            >
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-bold text-slate-900 text-sm">{b.name}</h3>
                  <span className="text-[11px] text-slate-500 block mt-0.5">{b.category}</span>
                </div>
                <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                  {b.scheduledCount} Queued
                </span>
              </div>

              <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 space-y-1.5 text-xs text-slate-600">
                <div className="flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5 text-slate-400" />
                  <span>WhatsApp: {b.phone}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="w-3.5 h-3.5 text-slate-400" />
                  <span>{b.email}</span>
                </div>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-xs">
                <div className="flex items-center gap-1">
                  {b.channels.map((ch) => (
                    <span
                      key={ch}
                      className="text-[10px] font-bold bg-slate-200 text-slate-700 px-2 py-0.5 rounded"
                    >
                      {ch}
                    </span>
                  ))}
                </div>

                <Link
                  href={`/composer?brand=${encodeURIComponent(b.name)}`}
                  className="font-bold text-orange-600 hover:text-orange-700 flex items-center gap-1"
                >
                  Schedule Post →
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Add Brand Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl p-6 max-w-md w-full shadow-xl space-y-4">
              <h3 className="font-bold text-slate-900 text-base">Add New Client Brand Workspace</h3>
              <div className="space-y-3">
                <div>
                  <label className="text-xs font-bold text-slate-600 uppercase block mb-1">
                    Brand / Business Name
                  </label>
                  <input
                    type="text"
                    value={newBrandName}
                    onChange={(e) => setNewBrandName(e.target.value)}
                    placeholder="e.g. Samosa Party Indiranagar"
                    className="w-full text-xs border border-slate-200 rounded-xl px-3 py-2 bg-slate-50 focus:bg-white focus:outline-none"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-600 uppercase block mb-1">
                    Client WhatsApp Contact
                  </label>
                  <input
                    type="text"
                    value={newBrandPhone}
                    onChange={(e) => setNewBrandPhone(e.target.value)}
                    placeholder="+91 98765 00000"
                    className="w-full text-xs border border-slate-200 rounded-xl px-3 py-2 bg-slate-50 focus:bg-white focus:outline-none"
                  />
                </div>
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="text-xs text-slate-600 px-3 py-2 rounded-lg hover:bg-slate-100"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleAddBrand}
                  className="bg-slate-900 text-white text-xs font-bold px-4 py-2 rounded-xl shadow-xs"
                >
                  Create Brand
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </AppShell>
  );
}
