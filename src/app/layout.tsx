import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'PostBabu - Social Media Scheduler for Indian Agencies',
  description: 'Buffer alternative with Hinglish AI copy, Indian festival calendars, and zero-login WhatsApp client approvals.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen antialiased bg-slate-50 text-slate-900">
        {children}
      </body>
    </html>
  );
}
