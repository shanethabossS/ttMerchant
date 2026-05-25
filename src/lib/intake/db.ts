import { prisma } from '@/lib/prisma';

export async function ensureIntakeTables() {
  await prisma.$executeRawUnsafe(`
    CREATE TABLE IF NOT EXISTS merchant_leads (
      id TEXT PRIMARY KEY,
      user_id TEXT,
      business_name TEXT NOT NULL,
      category TEXT,
      email TEXT NOT NULL,
      phone TEXT,
      whatsapp_number TEXT,
      selected_services JSONB NOT NULL DEFAULT '[]'::jsonb,
      selected_plan TEXT NOT NULL DEFAULT 'starter',
      queue_status TEXT NOT NULL DEFAULT 'new_lead',
      onboarding_status TEXT NOT NULL DEFAULT 'submitted',
      payment_status TEXT NOT NULL DEFAULT 'pending',
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    );

    CREATE TABLE IF NOT EXISTS merchant_intake_forms (
      id TEXT PRIMARY KEY,
      lead_id TEXT NOT NULL REFERENCES merchant_leads(id) ON DELETE CASCADE,
      business_category TEXT,
      business_description TEXT,
      address TEXT,
      service_area TEXT,
      opening_hours TEXT,
      delivery_available BOOLEAN NOT NULL DEFAULT false,
      pickup_available BOOLEAN NOT NULL DEFAULT true,
      instagram TEXT,
      facebook TEXT,
      website TEXT,
      preferred_contact_method TEXT,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    );

    CREATE TABLE IF NOT EXISTS merchant_media_uploads (
      id TEXT PRIMARY KEY,
      lead_id TEXT NOT NULL REFERENCES merchant_leads(id) ON DELETE CASCADE,
      file_name TEXT NOT NULL,
      file_type TEXT NOT NULL,
      file_size INTEGER NOT NULL,
      asset_url TEXT NOT NULL,
      thumbnail_url TEXT,
      uploaded_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    );

    CREATE TABLE IF NOT EXISTS merchant_subscriptions (
      id TEXT PRIMARY KEY,
      lead_id TEXT NOT NULL REFERENCES merchant_leads(id) ON DELETE CASCADE,
      selected_plan TEXT NOT NULL,
      status TEXT NOT NULL DEFAULT 'pending',
      payment_status TEXT NOT NULL DEFAULT 'pending',
      starts_at TIMESTAMPTZ,
      ends_at TIMESTAMPTZ,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    );

    CREATE TABLE IF NOT EXISTS merchant_notes (
      id TEXT PRIMARY KEY,
      lead_id TEXT NOT NULL REFERENCES merchant_leads(id) ON DELETE CASCADE,
      admin_user_id TEXT,
      note TEXT NOT NULL,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    );

    CREATE TABLE IF NOT EXISTS merchant_queue_history (
      id TEXT PRIMARY KEY,
      lead_id TEXT NOT NULL REFERENCES merchant_leads(id) ON DELETE CASCADE,
      from_status TEXT,
      to_status TEXT NOT NULL,
      action_type TEXT NOT NULL,
      action_by TEXT,
      payload JSONB NOT NULL DEFAULT '{}'::jsonb,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    );
  `);
}

export function makeId(prefix: string) {
  return `${prefix}_${crypto.randomUUID().replace(/-/g, '')}`;
}
