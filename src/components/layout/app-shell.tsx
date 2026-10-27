'use client';

import React, { useState } from 'react';
import { Sidebar } from './sidebar';
import { Header } from './header';

export function AppShell({ children }: { children: React.ReactNode }) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <Sidebar collapsed={collapsed} onToggleCollapse={() => setCollapsed(!collapsed)} />
      <Header collapsed={collapsed} />
      <div
        className={`pt-16 min-h-screen transition-all duration-300 ${
          collapsed ? 'pl-20' : 'pl-64'
        }`}
      >
        <main className="p-6 max-w-7xl mx-auto">{children}</main>
      </div>
    </div>
  );
}
