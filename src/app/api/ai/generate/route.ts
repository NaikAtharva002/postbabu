import { NextResponse } from 'next/server';
import { generateIndianCaptions } from '@/lib/ai/caption-generator';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      businessType = 'Local Indian Business',
      topic,
      festivalName,
      language = 'hinglish',
      platform = 'INSTAGRAM',
      tone = 'festive',
    } = body;

    if (!topic) {
      return NextResponse.json(
        { success: false, error: 'Topic is required to generate captions' },
        { status: 400 }
      );
    }

    const captions = await generateIndianCaptions({
      businessType,
      topic,
      festivalName,
      language,
      platform,
      tone,
    });

    return NextResponse.json({ success: true, captions });
  } catch (err: any) {
    console.error('Error generating AI captions:', err);
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
