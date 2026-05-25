import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    error: 'Marketplace storefront APIs are disabled in phase 1. Use merchant intake endpoints.',
    active_endpoints: ['/api/intake/submit', '/api/intake/upload', '/api/intake/queues'],
  }, { status: 410 });
}
