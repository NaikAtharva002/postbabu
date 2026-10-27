'use client';

import React, { useState } from 'react';
import { AppShell } from '@/components/layout/app-shell';
import {
  Plug,
  CheckCircle,
  AlertCircle,
  RefreshCw,
  ExternalLink,
  Instagram,
  Facebook,
  Linkedin,
  Twitter,
  Video,
  ShieldAlert,
} from 'lucide-react';

export default function IntegrationsPage() {
  const [sandboxMode, setSandboxMode] = useState(true);

  const [integrations, setIntegrations] = useState([
    {
      id: 'meta-ig',
      name: 'Instagram Business Accounts',
      provider: 'Meta Graph API v21.0',
      icon: Instagram,
      color: 'text-pink-600 bg-pink-50',
      connectedAccounts: ['@ramesh_jewellers_blr', '@chaishai_blr'],
      status: 'CONNECTED',
      scopes: 'instagram_basic, instagram_content_publish',
      tokenExpiry: 'Active (Long-Lived 60 Days)',
    },
    {
      id: 'meta-fb',
      name: 'Facebook Pages',
      provider: 'Meta Pages API v21.0',
      icon: Facebook,
      color: 'text-blue-600 bg-blue-50',
      connectedAccounts: ['Ramesh Jewellers Official Page'],
      status: 'CONNECTED',
      scopes: 'pages_show_list, pages_manage_posts',
      tokenExpiry: 'Active (Permanent Page Token)',
    },
    {
      id: 'linkedin',
      name: 'LinkedIn Company & Personal',
      provider: 'LinkedIn Community Management API v2',
      icon: Linkedin,
      color: 'text-sky-700 bg-sky-50',
      connectedAccounts: ['Ramesh Jewellers Pvt Ltd'],
      status: 'CONNECTED',
      scopes: 'w_member_social, rw_organization_admin',
      tokenExpiry: 'Expires in 52 days',
    },
    {
      id: 'twitter',
      name: 'X (Twitter)',
      provider: 'X API v2',
      icon: Twitter,
      color: 'text-slate-900 bg-slate-100',
      connectedAccounts: [],
      status: 'SANDBOX_READY',
      scopes: 'tweet.read, tweet.write, users.read',
      tokenExpiry: 'Simulator Active',
    },
    {
      id: 'youtube',
      name: 'YouTube Shorts',
      provider: 'YouTube Data API v3',
      icon: Video,
      color: 'text-red-600 bg-red-50',
      connectedAccounts: [],
      status: 'READY_TO_CONNECT',
      scopes: 'youtube.upload',
      tokenExpiry: 'Not connected',
    },
  ]);

  return (
    <AppShell>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-3 border-b border-slate-200">
          <div>
            <h1 className="text-xl font-black text-slate-900 tracking-tight flex items-center gap-2">
              <Plug className="w-5 h-5 text-orange-600" />
              Social Platform Integrations Hub
            </h1>
            <p className="text-xs text-slate-500">
              Manage official OAuth tokens, permissions, and sandbox publishing environments.
            </p>
          </div>

          {/* Sandbox Toggle */}
          <div className="flex items-center gap-2 bg-amber-50 border border-amber-200 px-3 py-1.5 rounded-xl">
            <span className="text-xs font-bold text-amber-900">Developer Sandbox Mode:</span>
            <button
              type="button"
              onClick={() => setSandboxMode(!sandboxMode)}
              className={`w-10 h-5 rounded-full p-0.5 transition ${
                sandboxMode ? 'bg-orange-500' : 'bg-slate-300'
              }`}
            >
              <div
                className={`w-4 h-4 rounded-full bg-white transition transform ${
                  sandboxMode ? 'translate-x-5' : 'translate-x-0'
                }`}
              />
            </button>
          </div>
        </div>

        {sandboxMode && (
          <div className="bg-amber-50/70 border border-amber-200 p-4 rounded-2xl flex items-start gap-3 text-xs text-amber-900">
            <ShieldAlert className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold block">Developer Sandbox Mode Active</span>
              <p className="text-amber-800 mt-0.5">
                Posts published in sandbox mode simulate the complete Meta Graph and LinkedIn container protocols without needing live production OAuth app credentials.
              </p>
            </div>
          </div>
        )}

        {/* Integrations Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {integrations.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.id}
                className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs space-y-4 hover:border-orange-300 transition"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${item.color}`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-900 text-sm">{item.name}</h3>
                      <span className="text-[10px] text-slate-400 font-mono block">
                        {item.provider}
                      </span>
                    </div>
                  </div>

                  {item.status === 'CONNECTED' ? (
                    <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-full flex items-center gap-1">
                      <CheckCircle className="w-3 h-3 text-emerald-600" />
                      Connected
                    </span>
                  ) : item.status === 'SANDBOX_READY' ? (
                    <span className="text-[10px] font-bold text-blue-700 bg-blue-50 border border-blue-200 px-2.5 py-1 rounded-full">
                      Sandbox Ready
                    </span>
                  ) : (
                    <span className="text-[10px] font-bold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-full">
                      Available
                    </span>
                  )}
                </div>

                <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 space-y-1.5 text-xs text-slate-600">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400 text-[10px] uppercase font-bold">
                      Connected Channels:
                    </span>
                    <span className="font-bold text-slate-800">
                      {item.connectedAccounts.length > 0
                        ? item.connectedAccounts.join(', ')
                        : 'None yet'}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400 text-[10px] uppercase font-bold">
                      Token Health:
                    </span>
                    <span className="text-[11px] font-medium text-slate-600">
                      {item.tokenExpiry}
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-xs">
                  <span className="text-[10px] font-mono text-slate-400 truncate max-w-[200px]">
                    Scopes: {item.scopes}
                  </span>

                  {item.status === 'CONNECTED' ? (
                    <button
                      type="button"
                      className="text-xs font-bold text-slate-600 hover:text-slate-900 flex items-center gap-1"
                    >
                      <RefreshCw className="w-3 h-3" />
                      Refresh Token
                    </button>
                  ) : (
                    <button
                      type="button"
                      className="text-xs font-bold text-orange-600 hover:text-orange-700 flex items-center gap-1"
                    >
                      Connect Channel →
                    </button>
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
