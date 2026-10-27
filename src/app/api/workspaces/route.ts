import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function GET() {
  try {
    const workspaces = await prisma.clientWorkspace.findMany({
      include: {
        socialAccounts: true,
        _count: {
          select: { posts: true },
        },
      },
      orderBy: { name: 'asc' },
    });

    return NextResponse.json({ success: true, workspaces });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, clientPhone, clientEmail, agencyId } = body;

    if (!name) {
      return NextResponse.json({ success: false, error: 'Workspace name is required' }, { status: 400 });
    }

    // Default to the first agency if not passed
    let targetAgencyId = agencyId;
    if (!targetAgencyId) {
      const defaultAgency = await prisma.agency.findFirst();
      targetAgencyId = defaultAgency?.id;
    }

    if (!targetAgencyId) {
      return NextResponse.json({ success: false, error: 'No agency found. Run seed script first.' }, { status: 400 });
    }

    const workspace = await prisma.clientWorkspace.create({
      data: {
        name,
        clientPhone,
        clientEmail,
        agencyId: targetAgencyId,
      },
    });

    return NextResponse.json({ success: true, workspace });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
