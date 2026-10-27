'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  Calendar,
  PenSquare,
  FolderOpen,
  ListOrdered,
  Inbox,
  BarChart3,
  Sparkles,
  Briefcase,
  Users,
  Plug,
  CreditCard,
  Settings,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
  Compass,
} from 'lucide-react';

interface SidebarProps {
  collapsed: boolean;
  onToggleCollapse: () => void;
}

interface NavItem {
  name: string;
  href: string;
  icon: any;
  highlight?: boolean;
  badge?: string;
}

interface NavGroup {
  label: string;
  items: NavItem[];
}

export function Sidebar({ collapsed, onToggleCollapse }: SidebarProps) {
  const pathname = usePathname();

  const navigationGroups: NavGroup[] = [
    {
      label: 'Publishing',
      items: [
        { name: 'Overview', href: '/', icon: LayoutDashboard },
        { name: 'Calendar', href: '/calendar', icon: Calendar },
        { name: 'Create Post', href: '/composer', icon: PenSquare, highlight: true },
        { name: 'Content Library', href: '/library', icon: FolderOpen },
        { name: 'Publishing Queue', href: '/queue', icon: ListOrdered },
      ],
    },
    {
      label: 'Engagement & AI',
      items: [
        { name: 'Social Inbox', href: '/inbox', icon: Inbox },
        { name: 'Analytics', href: '/analytics', icon: BarChart3 },
        { name: 'AI Studio', href: '/ai-studio', icon: Sparkles },
      ],
    },
    {
      label: 'Agency Operations',
      items: [
        { name: 'Clients & Brands', href: '/brands', icon: Briefcase },
        { name: 'Team & Approvals', href: '/approvals', icon: Users, badge: '2' },
      ],
    },
    {
      label: 'Management',
      items: [
        { name: 'Integrations', href: '/integrations', icon: Plug },
        { name: 'Billing & Plans', href: '/billing', icon: CreditCard },
        { name: 'Settings', href: '/settings', icon: Settings },
      ],
    },
  ];

  return (
    <aside
      className={`fixed top-0 left-0 bottom-0 z-40 bg-slate-900 text-slate-300 flex flex-col border-r border-slate-800 transition-all duration-300 ${
        collapsed ? 'w-20' : 'w-64'
      }`}
    >
      {/* Brand Header */}
      <div className="h-16 flex items-center justify-between px-4 border-b border-slate-800">
        <Link href="/" className="flex items-center gap-3 overflow-hidden">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#FF671F] via-orange-500 to-[#046A38] flex items-center justify-center text-white font-black text-lg shadow-sm shrink-0">
            PB
          </div>
          {!collapsed && (
            <div className="flex flex-col">
              <span className="font-bold text-white tracking-tight leading-none text-base">
                PostBabu
              </span>
              <span className="text-[10px] text-orange-400 font-semibold tracking-wider uppercase mt-1">
                Agency Edition
              </span>
            </div>
          )}
        </Link>
        <button
          onClick={onToggleCollapse}
          className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
          title={collapsed ? 'Expand Sidebar' : 'Collapse Sidebar'}
        >
          {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
        </button>
      </div>

      {/* Navigation Groups */}
      <div className="flex-1 overflow-y-auto py-4 px-3 space-y-6 scrollbar-thin">
        {/* Onboarding Quick Link */}
        <Link
          href="/onboarding"
          className={`flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 hover:bg-emerald-500/20 transition ${
            collapsed ? 'justify-center' : ''
          }`}
          title="Onboarding Wizard"
        >
          <Compass className="w-4 h-4 shrink-0 text-emerald-400" />
          {!collapsed && <span>Setup Checklist (75%)</span>}
        </Link>

        {navigationGroups.map((group, idx) => (
          <div key={idx} className="space-y-1">
            {!collapsed && (
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider px-3 block mb-1">
                {group.label}
              </span>
            )}
            {group.items.map((item) => {
              const active = pathname === item.href;
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-medium transition group ${
                    active
                      ? 'bg-orange-500 text-white font-semibold shadow-sm'
                      : item.highlight
                      ? 'text-orange-400 hover:bg-orange-500/10 hover:text-orange-300'
                      : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'
                  } ${collapsed ? 'justify-center' : ''}`}
                  title={collapsed ? item.name : undefined}
                >
                  <div className="flex items-center gap-3">
                    <Icon
                      className={`w-4 h-4 shrink-0 ${
                        active
                          ? 'text-white'
                          : item.highlight
                          ? 'text-orange-400'
                          : 'text-slate-400 group-hover:text-slate-200'
                      }`}
                    />
                    {!collapsed && <span>{item.name}</span>}
                  </div>
                  {!collapsed && item.badge && (
                    <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-orange-600 text-white">
                      {item.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </div>
        ))}
      </div>

      {/* Footer Profile & Role */}
      <div className="p-3 border-t border-slate-800 bg-slate-950/50">
        <div className={`flex items-center gap-3 ${collapsed ? 'justify-center' : ''}`}>
          <div className="w-8 h-8 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center font-bold text-white text-xs shrink-0">
            AS
          </div>
          {!collapsed && (
            <div className="flex-1 min-w-0">
              <span className="text-xs font-semibold text-white block truncate">
                Atharva Sharma
              </span>
              <div className="flex items-center gap-1 text-[10px] text-emerald-400 font-medium">
                <ShieldCheck className="w-3 h-3" />
                <span>Owner (All Access)</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
}
