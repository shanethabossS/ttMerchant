import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    error: 'Listings API is disabled in phase 1 concierge onboarding mode.',
    active_endpoints: ['/api/intake/submit', '/api/intake/upload', '/api/intake/queues'],
  }, { status: 410 });
}
