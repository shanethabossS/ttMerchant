import { NextRequest, NextResponse } from 'next/server';
import { maybeSendWhatsApp, sendEmail } from '@/lib/notifications';
import { getLeadById, updateLeadStatus, type QueueStatus } from '@/lib/intake/store';

const VALID_QUEUE = new Set<QueueStatus>([
  'new_lead',
  'awaiting_review',
  'awaiting_customer_info',
  'ready_to_publish',
  'published',
  'rejected',
]);

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const body = await req.json().catch(() => null);
  const toStatus = String(body?.queue_status || '').trim() as QueueStatus;
  if (!VALID_QUEUE.has(toStatus)) {
    return NextResponse.json({ error: 'Invalid queue_status' }, { status: 400 });
  }

  const leadBefore = getLeadById(id);
  if (!leadBefore) return NextResponse.json({ error: 'Lead not found' }, { status: 404 });

  const updated = updateLeadStatus(id, toStatus);
  if (!updated) return NextResponse.json({ error: 'Lead not found' }, { status: 404 });

  if (toStatus === 'awaiting_customer_info') {
    const details = String(body?.message || 'Please upload missing photos/details or update payment info.');
    await Promise.allSettled([
      sendEmail({
        to: leadBefore.email,
        subject: 'More Information Needed - SOV Merchant Intake',
        text: `Hi, we need more information for ${leadBefore.business_name}: ${details}`,
      }),
      leadBefore.whatsapp_number ? maybeSendWhatsApp(leadBefore.whatsapp_number, `SOV update: ${details}`) : Promise.resolve({ skipped: true }),
    ]);
  }

  return NextResponse.json({ ok: true });
}
