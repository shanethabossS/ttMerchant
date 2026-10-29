import { NextRequest, NextResponse } from 'next/server';
import { requireStaff } from '@/lib/intake/require-staff';
import { queueCounts } from '@/lib/intake/store';

export async function GET(req: NextRequest) {
  const denied = await requireStaff(req);
  if (denied) return denied;
  const counts = queueCounts();
  return NextResponse.json({ queues: Object.entries(counts).map(([queue_status, count]) => ({ queue_status, count })) });
}
