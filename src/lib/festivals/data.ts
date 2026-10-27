export interface IndianFestival {
  id: string;
  name: string;
  hindiName: string;
  category: 'Festival' | 'National' | 'Shopping' | 'Cultural';
  dateString: string; // MM-DD or approximate
  marketingAngle: string;
  defaultPrompt: string;
}

export const INDIAN_FESTIVALS: IndianFestival[] = [
  {
    id: 'diwali',
    name: 'Diwali (Deepavali)',
    hindiName: 'दीपावली',
    category: 'Festival',
    dateString: '11-01',
    marketingAngle: 'New beginnings, festive gifting, lighting up homes, special discounts, festive fashion',
    defaultPrompt: 'Create a warm festive greeting for Diwali highlighting prosperity, light, and special festive offers. Include cheerful Hinglish phrasing with #ShubhDeepavali.',
  },
  {
    id: 'dhanteras',
    name: 'Dhanteras',
    hindiName: 'धनतेरस',
    category: 'Shopping',
    dateString: '10-29',
    marketingAngle: 'Buying gold, jewelry, electronics, vehicles, auspicious investments',
    defaultPrompt: 'Write an auspicious Dhanteras announcement focused on bringing home Lakshmi and prosperity through trusted purchases.',
  },
  {
    id: 'independence-day',
    name: 'Independence Day',
    hindiName: 'स्वतंत्रता दिवस',
    category: 'National',
    dateString: '08-15',
    marketingAngle: 'Patriotism, freedom sales, honoring the armed forces, Made in India pride',
    defaultPrompt: 'Draft an inspiring Independence Day tribute emphasizing Indian innovation, progress, and festive pride with #HarGharTiranga.',
  },
  {
    id: 'republic-day',
    name: 'Republic Day',
    hindiName: 'गणतंत्र दिवस',
    category: 'National',
    dateString: '01-26',
    marketingAngle: 'Constitution, unity in diversity, Republic Day weekend mega offers',
    defaultPrompt: 'Celebrate Republic Day with patriotic gratitude and special weekend deals for Indian consumers.',
  },
  {
    id: 'holi',
    name: 'Holi',
    hindiName: 'होली',
    category: 'Festival',
    dateString: '03-14',
    marketingAngle: 'Colors, sweets (gujiya), organic colors, joyful gatherings, spring vibes',
    defaultPrompt: 'Create a vibrant, playful Holi greeting full of color and joy. Use lively Hinglish expressions like "Rang Barse" and festive energy.',
  },
  {
    id: 'raksha-bandhan',
    name: 'Raksha Bandhan',
    hindiName: 'रक्षाबंधन',
    category: 'Festival',
    dateString: '08-09',
    marketingAngle: 'Sibling love, gifting for sisters, sweet boxes, personalized hampers',
    defaultPrompt: 'Craft a heartwarming Raksha Bandhan post about sibling banter, protection, and the perfect gift for your sister.',
  },
  {
    id: 'ganesh-chaturthi',
    name: 'Ganesh Chaturthi',
    hindiName: 'गणेश चतुर्थी',
    category: 'Festival',
    dateString: '08-27',
    marketingAngle: 'Modaks, welcome Bappa home, eco-friendly celebrations, auspicious beginnings',
    defaultPrompt: 'Write a devotional and celebratory post welcoming Lord Ganesha. Include chants like "Ganpati Bappa Morya" and blessing wishes.',
  },
  {
    id: 'eid-ul-fitr',
    name: 'Eid-ul-Fitr',
    hindiName: 'ईद-उल-फ़ितर',
    category: 'Festival',
    dateString: '03-31',
    marketingAngle: 'Sheer khurma, festive gifting, family reunions, Eid collection launches',
    defaultPrompt: 'Create a gracious and warm Eid Mubarak greeting with messages of peace, brotherhood, and festive happiness.',
  },
  {
    id: 'navratri-dussehra',
    name: 'Navratri & Dussehra',
    hindiName: 'नवरात्रि एवं दशहरा',
    category: 'Festival',
    dateString: '10-02',
    marketingAngle: 'Garba nights, 9 festive colors, victory of good over evil, vehicle & home purchases',
    defaultPrompt: 'Compose energetic Navratri & Dussehra social captions celebrating the 9 divine nights of dance, devotion, and festive victory.',
  },
  {
    id: 'ipl-season',
    name: 'IPL Cricket Season Launch',
    hindiName: 'आईपीएल सीज़न',
    category: 'Cultural',
    dateString: '03-22',
    marketingAngle: 'Match day specials, cricket fever, food delivery promos, fan contests',
    defaultPrompt: 'Draft high-energy cricket fever captions with matchday excitement, team rivalry banter, and game-time offers.',
  },
];
