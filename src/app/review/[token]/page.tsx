'use client';

import React, { useState, use } from 'react';
import {
  CheckCircle,
  MessageCircle,
  Clock,
  Sparkles,
  ShieldCheck,
  Check,
  RotateCcw,
  Send,
  ThumbsUp,
} from 'lucide-react';

interface ReviewPost {
  id: string;
  caption: string;
  mediaUrl: string;
  scheduledTime: string;
  channels: string[];
  status: 'PENDING' | 'APPROVED' | 'REVISION_REQUESTED';
  feedback?: string;
}

export default function ClientApprovalPage({
  params,
}: {
  params: Promise<{ token: string }>;
}) {
  const resolvedParams = use(params);
  const token = resolvedParams.token;

  const [posts, setPosts] = useState<ReviewPost[]>([
    {
      id: 'post-1',
      caption:
        '✨ Dhanteras Dhamaka! Shubh muhurat par lakar aao Lakshmi ka aashirwaad hamare exclusive 22K Gold Antique Collection ke saath. Har purchase par flat 20% off on making charges! 🪔 #Dhanteras2026 #RameshJewellers #HinglishVibes',
      mediaUrl:
        'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=800&auto=format&fit=crop&q=80',
      scheduledTime: 'Oct 29, 2026 - 6:30 PM (Auspicious Dhanteras Evening)',
      channels: ['Instagram', 'Facebook'],
      status: 'PENDING',
    },
    {
      id: 'post-2',
      caption:
        'Ghar ki roshni aur parivaar ka pyaar. Iss Diwali, celebrate the timeless beauty of pure handcrafted diamonds. Visit our Indiranagar showroom for special festive gift boxes. ✨🪔',
      mediaUrl:
        'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=800&auto=format&fit=crop&q=80',
      scheduledTime: 'Nov 01, 2026 - 11:00 AM (Diwali Morning)',
      channels: ['Instagram'],
      status: 'PENDING',
    },
  ]);

  const [activeFeedbackId, setActiveFeedbackId] = useState<string | null>(null);
  const [feedbackText, setFeedbackText] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleApprove = (id: string) => {
    setPosts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, status: 'APPROVED' } : p))
    );
  };

  const handleApproveAll = () => {
    setPosts((prev) => prev.map((p) => ({ ...p, status: 'APPROVED' })));
  };

  const handleSubmitFeedback = (id: string) => {
    if (!feedbackText.trim()) return;
    setPosts((prev) =>
      prev.map((p) =>
        p.id === id
          ? { ...p, status: 'REVISION_REQUESTED', feedback: feedbackText }
          : p
      )
    );
    setActiveFeedbackId(null);
    setFeedbackText('');
  };

  const allApproved = posts.every((p) => p.status === 'APPROVED');

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col items-center">
      {/* Mobile-Friendly Sticky Header */}
      <header className="w-full max-w-lg bg-white border-b border-slate-200 sticky top-0 z-20 px-4 py-3 shadow-xs">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-emerald-600 text-white flex items-center justify-center font-bold text-sm">
              RJ
            </div>
            <div>
              <h1 className="text-sm font-bold text-slate-900 leading-tight">
                Ramesh Jewellers
              </h1>
              <p className="text-[11px] text-slate-500 flex items-center gap-1">
                <ShieldCheck className="w-3 h-3 text-emerald-600" />
                Verified Agency Preview • No Login Required
              </p>
            </div>
          </div>
          <span className="text-[10px] font-bold bg-amber-50 text-amber-800 border border-amber-200 px-2 py-0.5 rounded-full">
            Token: {token.slice(0, 10)}...
          </span>
        </div>
      </header>

      {/* Main Review Stream */}
      <main className="w-full max-w-lg p-4 space-y-5 pb-24">
        {/* Banner */}
        <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-2xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-800">
              {posts.length} Posts Prepared for Your Review
            </span>
            {allApproved ? (
              <span className="text-xs font-bold text-emerald-600 flex items-center gap-1 bg-emerald-50 px-2 py-0.5 rounded-full">
                <Check className="w-3.5 h-3.5" /> All Approved
              </span>
            ) : (
              <button
                type="button"
                onClick={handleApproveAll}
                className="text-xs font-bold bg-emerald-600 hover:bg-emerald-700 text-white px-3 py-1.5 rounded-xl transition shadow-xs flex items-center gap-1"
              >
                <ThumbsUp className="w-3 h-3" />
                Approve All in 1-Tap
              </button>
            )}
          </div>
          <p className="text-xs text-slate-500">
            Tap &apos;Approve&apos; on each post or leave an edit request. Approved posts will automatically publish on schedule via PostBabu!
          </p>
        </div>

        {/* Posts Cards */}
        {posts.map((post, idx) => (
          <div
            key={post.id}
            className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm space-y-3"
          >
            {/* Post Header */}
            <div className="p-3.5 flex items-center justify-between border-b border-slate-100">
              <div className="flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-slate-900 text-white text-[11px] font-bold flex items-center justify-center">
                  {idx + 1}
                </span>
                <div className="flex items-center gap-1">
                  {post.channels.map((ch) => (
                    <span
                      key={ch}
                      className="text-[10px] font-bold bg-slate-100 text-slate-700 px-2 py-0.5 rounded"
                    >
                      {ch}
                    </span>
                  ))}
                </div>
              </div>

              {post.status === 'APPROVED' && (
                <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200 flex items-center gap-1">
                  <CheckCircle className="w-3.5 h-3.5" />
                  Approved
                </span>
              )}

              {post.status === 'REVISION_REQUESTED' && (
                <span className="text-xs font-bold text-orange-700 bg-orange-50 px-2.5 py-0.5 rounded-full border border-orange-200 flex items-center gap-1">
                  <RotateCcw className="w-3.5 h-3.5" />
                  Edit Requested
                </span>
              )}
            </div>

            {/* Media Image Preview */}
            <div className="relative aspect-square w-full bg-slate-100 overflow-hidden">
              <img
                src={post.mediaUrl}
                alt="Post Preview"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Caption & Details */}
            <div className="p-4 pt-1 space-y-3">
              <div className="text-xs text-slate-800 leading-relaxed font-normal whitespace-pre-line bg-slate-50 p-3 rounded-xl border border-slate-100">
                {post.caption}
              </div>

              <div className="text-[11px] text-slate-500 flex items-center gap-1 font-medium">
                <Clock className="w-3.5 h-3.5 text-slate-400" />
                Scheduled for: {post.scheduledTime}
              </div>

              {/* Feedback display */}
              {post.feedback && (
                <div className="bg-amber-50 border border-amber-200 p-2.5 rounded-xl text-xs text-amber-900">
                  <span className="font-bold block">Your Note to Agency:</span>
                  {post.feedback}
                </div>
              )}

              {/* Action Buttons */}
              {post.status !== 'APPROVED' && (
                <div className="pt-2 flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => handleApprove(post.id)}
                    className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs py-2.5 px-3 rounded-xl shadow-xs transition flex items-center justify-center gap-1.5"
                  >
                    <CheckCircle className="w-4 h-4" />
                    Approve Post
                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      setActiveFeedbackId(
                        activeFeedbackId === post.id ? null : post.id
                      )
                    }
                    className="bg-white hover:bg-slate-50 text-slate-700 font-semibold text-xs py-2.5 px-3 rounded-xl border border-slate-300 transition flex items-center gap-1.5"
                  >
                    <MessageCircle className="w-4 h-4 text-slate-500" />
                    Request Changes
                  </button>
                </div>
              )}

              {/* Inline Feedback Box */}
              {activeFeedbackId === post.id && (
                <div className="pt-2 space-y-2 border-t border-slate-100">
                  <textarea
                    rows={2}
                    value={feedbackText}
                    onChange={(e) => setFeedbackText(e.target.value)}
                    placeholder="e.g. Change making charge offer from 20% to 25%, and make the logo larger..."
                    className="w-full text-xs p-2.5 border border-slate-200 rounded-xl bg-slate-50 focus:bg-white focus:outline-none"
                  />
                  <div className="flex justify-end gap-2">
                    <button
                      type="button"
                      onClick={() => setActiveFeedbackId(null)}
                      className="text-xs text-slate-500 px-3 py-1"
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      onClick={() => handleSubmitFeedback(post.id)}
                      className="text-xs font-bold bg-slate-900 text-white px-3 py-1.5 rounded-lg flex items-center gap-1"
                    >
                      <Send className="w-3 h-3" />
                      Submit Note
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </main>

      {/* Footer Branding */}
      <footer className="w-full max-w-lg text-center py-4 text-[11px] text-slate-400">
        Powered by PostBabu • Social Media Automation for Indian Agencies
      </footer>
    </div>
  );
}
