'use client';

import React, { useState } from 'react';
import { AppShell } from '@/components/layout/app-shell';
import {
  Inbox,
  MessageCircle,
  Instagram,
  Facebook,
  Linkedin,
  Send,
  CheckCircle,
  Clock,
  Sparkles,
} from 'lucide-react';

export default function SocialInboxPage() {
  const [conversations, setConversations] = useState([
    {
      id: 'c-1',
      author: 'Priya Sundaram',
      handle: '@priya_blr',
      channel: 'Instagram',
      brand: 'Ramesh Jewellers',
      message: 'Namaste! Are you offering making charge discounts on diamond nosepins for Dhanteras?',
      time: '12 mins ago',
      status: 'UNREAD',
      postContext: 'Dhanteras 22K Gold Antique Collection',
    },
    {
      id: 'c-2',
      author: 'Vikram Mehta',
      handle: 'vikram.mehta@techcorp.in',
      channel: 'LinkedIn',
      brand: 'Kala Niketan Silk',
      message: 'Looking for 50 corporate Diwali gift hampers with customized silk stoles. Can you share catalog?',
      time: '1 hour ago',
      status: 'ASSIGNED',
      postContext: 'Corporate Festive Gifting 2026',
    },
  ]);

  const [activeId, setActiveId] = useState('c-1');
  const [replyText, setReplyText] = useState('');
  const [sentSuccess, setSentSuccess] = useState(false);

  const activeConv = conversations.find((c) => c.id === activeId) || conversations[0];

  const handleSendReply = () => {
    if (!replyText.trim()) return;
    setSentSuccess(true);
    setReplyText('');
    setTimeout(() => setSentSuccess(false), 3000);
  };

  return (
    <AppShell>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-3 border-b border-slate-200">
          <div>
            <h1 className="text-xl font-black text-slate-900 tracking-tight flex items-center gap-2">
              <Inbox className="w-5 h-5 text-orange-600" />
              Unified Social Inbox
            </h1>
            <p className="text-xs text-slate-500">
              Manage incoming comments and customer inquiries across Instagram and LinkedIn.
            </p>
          </div>
          <span className="text-xs font-bold text-slate-500 bg-slate-100 px-3 py-1.5 rounded-xl">
            2 Open Conversations
          </span>
        </div>

        {/* 2-Column Inbox Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-xs min-h-[500px]">
          {/* Conversation List (5 cols) */}
          <div className="md:col-span-5 border-r border-slate-200 p-4 space-y-3 bg-slate-50/50">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
              Inbound Messages
            </span>

            <div className="space-y-2">
              {conversations.map((conv) => (
                <div
                  key={conv.id}
                  onClick={() => setActiveId(conv.id)}
                  className={`p-3.5 rounded-xl border cursor-pointer transition space-y-1.5 ${
                    activeId === conv.id
                      ? 'border-orange-500 bg-white shadow-xs'
                      : 'border-slate-200 bg-white/70 hover:bg-white'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-900">{conv.author}</span>
                    <span className="text-[10px] text-slate-400">{conv.time}</span>
                  </div>

                  <p className="text-xs text-slate-600 line-clamp-2">{conv.message}</p>

                  <div className="flex items-center justify-between pt-1 text-[10px]">
                    <span className="font-semibold text-slate-500">{conv.brand}</span>
                    <span className="font-bold text-pink-700 bg-pink-50 px-1.5 py-0.5 rounded border border-pink-200">
                      {conv.channel}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Conversation Thread & Composer (7 cols) */}
          <div className="md:col-span-7 p-6 flex flex-col justify-between space-y-4">
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div>
                  <h3 className="font-bold text-slate-900 text-sm">{activeConv.author}</h3>
                  <span className="text-xs text-slate-400">
                    {activeConv.handle} • {activeConv.brand}
                  </span>
                </div>
                <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                  Live API Thread
                </span>
              </div>

              {/* Inbound Comment Bubble */}
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 space-y-1">
                <span className="text-[10px] font-bold text-slate-400 uppercase">
                  Comment on: {activeConv.postContext}
                </span>
                <p className="text-xs text-slate-800 leading-relaxed">{activeConv.message}</p>
              </div>

              {sentSuccess && (
                <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-600" />
                  Reply successfully dispatched to {activeConv.channel} via Graph API!
                </div>
              )}
            </div>

            {/* Quick Reply & Send */}
            <div className="space-y-3 pt-3 border-t border-slate-100">
              <div className="flex items-center gap-1.5">
                <span className="text-[10px] font-bold text-slate-400 uppercase">Quick Replies:</span>
                {[
                  'Namaste! Yes, flat 20% off on Dhanteras.',
                  'Kindly check your DM for catalog & pricing!',
                ].map((qr, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setReplyText(qr)}
                    className="text-[10px] font-semibold text-orange-700 bg-orange-50 hover:bg-orange-100 px-2 py-1 rounded-md border border-orange-200 transition truncate max-w-[200px]"
                  >
                    {qr}
                  </button>
                ))}
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  placeholder={`Reply to ${activeConv.author} as ${activeConv.brand}...`}
                  className="flex-1 text-xs border border-slate-200 rounded-xl px-3.5 py-2.5 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-orange-500/20"
                />
                <button
                  type="button"
                  onClick={handleSendReply}
                  className="bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs px-4 py-2.5 rounded-xl shadow-xs transition flex items-center gap-1.5"
                >
                  <Send className="w-3.5 h-3.5 text-orange-400" />
                  Reply
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
