import { PrismaClient, PlatformType, PostStatus } from '@prisma/client';
import { INDIAN_FESTIVALS } from '../src/lib/festivals/data';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seeding for PostBabu...');

  // 1. Create or upsert primary Agency
  const agency = await prisma.agency.upsert({
    where: { slug: 'digital-dosti' },
    update: {},
    create: {
      id: 'agency-digital-dosti',
      name: 'Digital Dosti Media',
      slug: 'digital-dosti',
      planTier: 'AGENCY_PRO', // ₹1,299/mo plan
    },
  });
  console.log(`✅ Agency seeded: ${agency.name} (${agency.id})`);

  // 2. Create primary Agency Admin User
  const adminUser = await prisma.user.upsert({
    where: { email: 'atharva@digitaldosti.in' },
    update: {},
    create: {
      email: 'atharva@digitaldosti.in',
      name: 'Atharva Sharma',
      agencyId: agency.id,
      role: 'AGENCY_ADMIN',
    },
  });
  console.log(`✅ Admin User seeded: ${adminUser.name}`);

  // 3. Create Client Workspaces
  const clientData = [
    {
      id: 'ws-ramesh-jewellers',
      name: 'Ramesh Jewellers (Indiranagar)',
      clientPhone: '+919876543210',
      clientEmail: 'ramesh@rameshjewellers.in',
    },
    {
      id: 'ws-chai-shai',
      name: 'Chai Shai Cafe (Koramangala)',
      clientPhone: '+919876543211',
      clientEmail: 'hello@chaishai.in',
    },
    {
      id: 'ws-kala-niketan',
      name: 'Kala Niketan Silk Saree House',
      clientPhone: '+919876543212',
      clientEmail: 'sales@kalaniketan.in',
    },
    {
      id: 'ws-dr-sharma',
      name: 'Dr. Sharma Dental Clinic (HSR Layout)',
      clientPhone: '+919876543213',
      clientEmail: 'smile@drsharmaclinic.in',
    },
  ];

  const workspaces: Record<string, any> = {};
  for (const c of clientData) {
    const ws = await prisma.clientWorkspace.upsert({
      where: { id: c.id },
      update: {},
      create: {
        id: c.id,
        name: c.name,
        clientPhone: c.clientPhone,
        clientEmail: c.clientEmail,
        agencyId: agency.id,
      },
    });
    workspaces[c.id] = ws;
    console.log(`✅ Client Workspace seeded: ${ws.name}`);
  }

  // 4. Create Connected Social Accounts for Ramesh Jewellers
  const igAccount = await prisma.socialAccount.upsert({
    where: { id: 'sa-ramesh-ig' },
    update: {},
    create: {
      id: 'sa-ramesh-ig',
      platform: PlatformType.INSTAGRAM,
      accountName: '@ramesh_jewellers_blr',
      platformId: '17841405309211029',
      accessToken: 'encrypted_meta_long_lived_token_demo',
      workspaceId: workspaces['ws-ramesh-jewellers'].id,
    },
  });

  const fbAccount = await prisma.socialAccount.upsert({
    where: { id: 'sa-ramesh-fb' },
    update: {},
    create: {
      id: 'sa-ramesh-fb',
      platform: PlatformType.FACEBOOK_PAGE,
      accountName: 'Ramesh Jewellers Official Page',
      platformId: '10928374920192',
      accessToken: 'encrypted_fb_page_token_demo',
      workspaceId: workspaces['ws-ramesh-jewellers'].id,
    },
  });

  const liAccount = await prisma.socialAccount.upsert({
    where: { id: 'sa-ramesh-li' },
    update: {},
    create: {
      id: 'sa-ramesh-li',
      platform: PlatformType.LINKEDIN,
      accountName: 'Ramesh Jewellers Pvt Ltd',
      platformId: 'urn:li:organization:982341',
      accessToken: 'encrypted_li_oauth_token_demo',
      workspaceId: workspaces['ws-ramesh-jewellers'].id,
    },
  });
  console.log('✅ Social Accounts linked for Instagram, Facebook, and LinkedIn.');

  // 5. Seed Pre-loaded Indian Festivals into Database
  console.log('🇮🇳 Seeding 80+ Indian Festivals & Cultural Events...');
  for (const fest of INDIAN_FESTIVALS) {
    await prisma.indianFestivalEvent.upsert({
      where: { id: fest.id },
      update: {},
      create: {
        id: fest.id,
        title: `${fest.name} (${fest.hindiName})`,
        date: new Date(`2026-${fest.dateString}T00:00:00Z`),
        category: fest.category,
        description: fest.marketingAngle,
        suggestedPrompt: fest.defaultPrompt,
      },
    });
  }

  // 6. Seed Demo Pending Posts with Magic Tokens for Client Review
  const magicToken = 'tok_dhanteras_demo';
  await prisma.approvalToken.upsert({
    where: { token: magicToken },
    update: {
      expiresAt: new Date(Date.now() + 72 * 3600 * 1000), // Active 72h
    },
    create: {
      token: magicToken,
      workspaceId: workspaces['ws-ramesh-jewellers'].id,
      expiresAt: new Date(Date.now() + 72 * 3600 * 1000),
    },
  });

  const post1 = await prisma.post.upsert({
    where: { id: 'post-seed-dhanteras' },
    update: {},
    create: {
      id: 'post-seed-dhanteras',
      workspaceId: workspaces['ws-ramesh-jewellers'].id,
      content:
        '✨ Dhanteras Dhamaka! Shubh muhurat par lakar aao Lakshmi ka aashirwaad hamare exclusive 22K Gold Antique Collection ke saath. Har purchase par flat 20% off on making charges! 🪔 #Dhanteras2026 #RameshJewellers #HinglishVibes',
      mediaUrls: [
        'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=800&auto=format&fit=crop&q=80',
      ],
      scheduledFor: new Date('2026-10-29T13:00:00Z'),
      status: PostStatus.PENDING_APPROVAL,
      channels: {
        create: [
          { socialAccountId: igAccount.id },
          { socialAccountId: fbAccount.id },
        ],
      },
      approvalRequests: {
        create: {
          status: PostStatus.PENDING_APPROVAL,
        },
      },
    },
  });

  const post2 = await prisma.post.upsert({
    where: { id: 'post-seed-diwali' },
    update: {},
    create: {
      id: 'post-seed-diwali',
      workspaceId: workspaces['ws-ramesh-jewellers'].id,
      content:
        'Ghar ki roshni aur parivaar ka pyaar. Iss Diwali, celebrate the timeless beauty of pure handcrafted diamonds. Visit our Indiranagar showroom for special festive gift boxes. ✨🪔 #DiwaliWithRamesh #BangaloreJewellery',
      mediaUrls: [
        'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=800&auto=format&fit=crop&q=80',
      ],
      scheduledFor: new Date('2026-11-01T05:30:00Z'),
      status: PostStatus.PENDING_APPROVAL,
      channels: {
        create: [{ socialAccountId: igAccount.id }],
      },
      approvalRequests: {
        create: {
          status: PostStatus.PENDING_APPROVAL,
        },
      },
    },
  });

  console.log(`✅ Seed posts created with magic review link: http://localhost:3000/review/${magicToken}`);
  console.log('🚀 Database seeding completed successfully!');
}

main()
  .catch((e) => {
    console.error('❌ Seeding error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
