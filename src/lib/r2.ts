import crypto from 'crypto';

const R2_ACCOUNT_ID = process.env.R2_ACCOUNT_ID || '';
const R2_ACCESS_KEY_ID = process.env.R2_ACCESS_KEY_ID || '';
const R2_SECRET_ACCESS_KEY = process.env.R2_SECRET_ACCESS_KEY || '';
const R2_BUCKET = process.env.R2_BUCKET || process.env.R2_BUCKET_NAME || '';
const R2_PUBLIC_BASE_URL = (process.env.R2_PUBLIC_BASE_URL || 'https://assets.sovdigitalgroup.com').replace(/\/$/, '');

function hmac(key: crypto.BinaryLike, value: string) {
  return crypto.createHmac('sha256', key).update(value, 'utf8').digest();
}

function sha256(value: string) {
  return crypto.createHash('sha256').update(value, 'utf8').digest('hex');
}

function formatAmzDate(date: Date) {
  const yyyy = date.getUTCFullYear();
  const mm = String(date.getUTCMonth() + 1).padStart(2, '0');
  const dd = String(date.getUTCDate()).padStart(2, '0');
  const hh = String(date.getUTCHours()).padStart(2, '0');
  const mi = String(date.getUTCMinutes()).padStart(2, '0');
  const ss = String(date.getUTCSeconds()).padStart(2, '0');
  return { dateStamp: `${yyyy}${mm}${dd}`, amzDate: `${yyyy}${mm}${dd}T${hh}${mi}${ss}Z` };
}

function encodePathKey(key: string) {
  return key.split('/').map((segment) => encodeURIComponent(segment)).join('/');
}

function assertR2Config() {
  if (!R2_ACCOUNT_ID || !R2_ACCESS_KEY_ID || !R2_SECRET_ACCESS_KEY || !R2_BUCKET) {
    throw new Error('Missing R2 config. Set R2_ACCOUNT_ID, R2_ACCESS_KEY_ID, R2_SECRET_ACCESS_KEY, and R2_BUCKET.');
  }
}

function createSignedPutUrl(key: string, expiresInSeconds = 60) {
  assertR2Config();

  const now = new Date();
  const { dateStamp, amzDate } = formatAmzDate(now);
  const region = 'auto';
  const service = 's3';
  const algorithm = 'AWS4-HMAC-SHA256';
  const host = `${R2_ACCOUNT_ID}.r2.cloudflarestorage.com`;
  const canonicalUri = `/${R2_BUCKET}/${encodePathKey(key)}`;
  const credentialScope = `${dateStamp}/${region}/${service}/aws4_request`;

  const query = new URLSearchParams({
    'X-Amz-Algorithm': algorithm,
    'X-Amz-Credential': `${R2_ACCESS_KEY_ID}/${credentialScope}`,
    'X-Amz-Date': amzDate,
    'X-Amz-Expires': String(expiresInSeconds),
    'X-Amz-SignedHeaders': 'host',
  });

  const canonicalQuery = query
    .toString()
    .split('&')
    .sort()
    .join('&');

  const canonicalRequest = ['PUT', canonicalUri, canonicalQuery, `host:${host}\n`, 'host', 'UNSIGNED-PAYLOAD'].join('\n');

  const stringToSign = [algorithm, amzDate, credentialScope, sha256(canonicalRequest)].join('\n');

  const kDate = hmac(`AWS4${R2_SECRET_ACCESS_KEY}`, dateStamp);
  const kRegion = hmac(kDate, region);
  const kService = hmac(kRegion, service);
  const kSigning = hmac(kService, 'aws4_request');
  const signature = crypto.createHmac('sha256', kSigning).update(stringToSign, 'utf8').digest('hex');

  query.set('X-Amz-Signature', signature);
  return `https://${host}${canonicalUri}?${query.toString()}`;
}

export async function putFileViaSignedUrl(file: File, key: string): Promise<{ assetUrl: string; signedUrl: string }> {
  const signedUrl = createSignedPutUrl(key);
  const upload = await fetch(signedUrl, {
    method: 'PUT',
    headers: {
      'Content-Type': file.type || 'application/octet-stream',
      'Content-Length': String(file.size),
      'x-amz-content-sha256': 'UNSIGNED-PAYLOAD',
    },
    body: Buffer.from(await file.arrayBuffer()),
  });

  if (!upload.ok) {
    const reason = await upload.text().catch(() => upload.statusText);
    throw new Error(`R2 upload failed: ${reason || upload.status}`);
  }

  return {
    signedUrl,
    assetUrl: `${R2_PUBLIC_BASE_URL}/${key}`,
  };
}
