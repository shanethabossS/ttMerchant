import { NextRequest, NextResponse } from 'next/server';
import { putFileViaSignedUrl } from '@/lib/r2';

const MAX_FILE_BYTES = 10 * 1024 * 1024;
const allowedMime = new Set([
  'image/jpeg',
  'image/png',
  'image/webp',
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
]);

export async function POST(req: NextRequest) {
  const data = await req.formData().catch(() => null);
  const file = data?.get('file');

  if (!(file instanceof File)) {
    return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
  }

  if (file.size > MAX_FILE_BYTES) {
    return NextResponse.json({ error: 'File exceeds 10MB limit' }, { status: 400 });
  }

  if (!allowedMime.has(file.type)) {
    return NextResponse.json({ error: 'Unsupported file type' }, { status: 400 });
  }

  const safeName = file.name.toLowerCase().replace(/[^a-z0-9.-]/g, '-');
  const key = `merchant-intake/${Date.now()}-${crypto.randomUUID()}-${safeName}`;

  try {
    const { assetUrl, signedUrl } = await putFileViaSignedUrl(file, key);
    return NextResponse.json({ ok: true, assetUrl, thumbnailUrl: assetUrl, signedUrl });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Upload failed';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
