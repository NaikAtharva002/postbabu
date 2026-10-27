import { GoogleGenAI } from '@google/genai';

export interface CaptionRequest {
  businessType: string;
  topic: string;
  festivalName?: string;
  language: 'hinglish' | 'hindi' | 'english';
  platform: 'INSTAGRAM' | 'LINKEDIN' | 'FACEBOOK_PAGE' | 'TWITTER_X';
  tone?: 'festive' | 'casual' | 'professional' | 'promotional';
}

export interface GeneratedCaptions {
  shortAndPunchy: string;
  storytelling: string;
  promotionalOffer: string;
  suggestedHashtags: string[];
}

export async function generateIndianCaptions(req: CaptionRequest): Promise<GeneratedCaptions> {
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey || apiKey === 'your-gemini-api-key') {
    // Provide realistic fallback responses if GEMINI_API_KEY is not configured yet
    return getFallbackCaptions(req);
  }

  const ai = new GoogleGenAI({});

  const systemInstruction = `
You are the #1 social media copywriter for Indian digital marketing agencies and small businesses.
Your specialty:
- Natural, high-converting Hinglish (blending Hindi idioms like 'fatafat', 'dhamaka', 'shandar', 'khushiyon ka tyohar', 'josh' seamlessly with English).
- Indian cultural nuance: deep respect for festivals, family emotions, value-for-money ('paisa vasool'), and celebratory joy.
- Never write robotic corporate English. Avoid cringe cliches. Keep it snappy, authentic, and modern.

Return your response strictly as valid JSON with keys:
{
  "shortAndPunchy": "...",
  "storytelling": "...",
  "promotionalOffer": "...",
  "suggestedHashtags": ["#tag1", "#tag2", ...]
}
`;

  const prompt = `
Create social media captions for:
- Client Industry / Business: ${req.businessType}
- Post Topic / Idea: ${req.topic}
- Occasion / Festival: ${req.festivalName || 'General campaign'}
- Preferred Language: ${req.language.toUpperCase()}
- Social Platform: ${req.platform}
- Desired Tone: ${req.tone || 'festive'}
`;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        systemInstruction,
        responseMimeType: 'application/json',
        temperature: 0.7,
      },
    });

    const parsed = JSON.parse(response.text || '{}');
    return {
      shortAndPunchy: parsed.shortAndPunchy || 'Shandar festive offers start now!',
      storytelling: parsed.storytelling || 'Iss tyohar, apno ke saath baantein khushiyan.',
      promotionalOffer: parsed.promotionalOffer || 'Flat 20% off on all festive bookings today!',
      suggestedHashtags: parsed.suggestedHashtags || ['#FestiveVibes', '#IndiaCelebrates'],
    };
  } catch (err) {
    console.warn('[Gemini AI] Call failed or API key error, using fallback:', err);
    return getFallbackCaptions(req);
  }
}

function getFallbackCaptions(req: CaptionRequest): GeneratedCaptions {
  if (req.language === 'hinglish') {
    return {
      shortAndPunchy: `Iss ${req.festivalName || 'saal'} ki sabse badi khushkhabri! ✨ Ready ho jaao ek shandar surprise ke liye.`,
      storytelling: `Ghar ki safai, mithai ki khushboo aur apno ki muskaan—tyohar ka maza tabhi hai jab celebration poora ho! ${req.businessType} ki taraf se aap sabhi ko dher saari shubhkamnayein.`,
      promotionalOffer: `🚨 FESTIVE DHAMAKA ALERT! Enjoy flat discount on all ${req.topic} orders this week. Call ya DM karein fatafat!`,
      suggestedHashtags: ['#FestiveDhamaka', '#HinglishVibes', '#IndianFestival', '#PaisaVasool', '#DesiBusiness'],
    };
  }

  if (req.language === 'hindi') {
    return {
      shortAndPunchy: `शुभकामनाएं और नई शुरुआत! इस पावन पर्व पर हमारे साथ जुड़ें।`,
      storytelling: `त्योहारों की रौनक, अपनों का साथ और खुशियों की सौगात। ${req.businessType} लेकर आया है आपके लिए विशेष उपहार।`,
      promotionalOffer: `विशेष पर्व ऑफर: आज ही ऑर्डर करें और पाएं विशेष छूट। सीमित समय के लिए!`,
      suggestedHashtags: ['#शुभपर्व', '#भारतीयत्योहार', '#त्योहारकीतैयारी'],
    };
  }

  return {
    shortAndPunchy: `Celebrate the spirit of ${req.festivalName || 'the season'} with moments that truly matter. ✨`,
    storytelling: `From bustling markets to shared family meals, the magic of the festival season is finally here. We are proud to serve you every step of the way.`,
    promotionalOffer: `Exclusive festive discount active now. Upgrade your experience today with ${req.businessType}!`,
    suggestedHashtags: ['#FestiveSeason', '#CelebrateTogether', '#AgencyLife', '#MadeInIndia'],
  };
}
