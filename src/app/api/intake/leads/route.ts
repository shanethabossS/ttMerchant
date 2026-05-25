import { NextResponse } from 'next/server';
import { listLeadsByStatus, type QueueStatus } from '@/lib/intake/store';

const statuses: QueueStatus[] = ['new_lead', 'awaiting_review', 'awaiting_customer_info', 'ready_to_publish', 'published', 'rejected'];

export async function GET() {
  const data = statuses.map((status) => ({ status, rows: listLeadsByStatus(status) }));
  return NextResponse.json({ queues: data });
}
