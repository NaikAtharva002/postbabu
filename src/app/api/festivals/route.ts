import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { INDIAN_FESTIVALS } from '@/lib/festivals/data';

export async function GET() {
  try {
    // Try querying the database
    let festivals = await prisma.indianFestivalEvent.findMany({
      orderBy: { date: 'asc' },
    });

    // Fallback to static seed data if database is not yet migrated/seeded
    if (!festivals || festivals.length === 0) {
      festivals = INDIAN_FESTIVALS.map((f) => ({
        id: f.id,
        title: `${f.name} (${f.hindiName})`,
        date: new Date(`2026-${f.dateString}T00:00:00Z`),
        category: f.category,
        description: f.marketingAngle,
        suggestedPrompt: f.defaultPrompt,
      }));
    }

    return NextResponse.json({ success: true, festivals });
  } catch (err: any) {
    // Graceful fallback to static Indian festival list
    const fallback = INDIAN_FESTIVALS.map((f) => ({
      id: f.id,
      title: `${f.name} (${f.hindiName})`,
      date: new Date(`2026-${f.dateString}T00:00:00Z`),
      category: f.category,
      description: f.marketingAngle,
      suggestedPrompt: f.defaultPrompt,
    }));
    return NextResponse.json({ success: true, festivals: fallback });
  }
}
