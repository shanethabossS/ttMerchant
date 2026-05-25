import { NextResponse } from 'next/server';
import { queueCounts } from '@/lib/intake/store';

export async function GET() {
  const counts = queueCounts();
  return NextResponse.json({ queues: Object.entries(counts).map(([queue_status, count]) => ({ queue_status, count })) });
}
