import fs from 'fs';
import path from 'path';

export type QueueStatus = 'new_lead' | 'awaiting_review' | 'awaiting_customer_info' | 'ready_to_publish' | 'published' | 'rejected';

type LocalUser = {
  id: string;
  full_name: string;
  business_name: string;
  email: string;
  phone: string;
  whatsapp_number: string;
  password: string;
  created_at: string;
};

type Lead = {
  id: string;
  user_id: string | null;
  business_name: string;
  category: string;
  email: string;
  phone: string;
  whatsapp_number: string;
  selected_services: string[];
  selected_plan: string;
  queue_status: QueueStatus;
  onboarding_status: string;
  payment_status: string;
  created_at: string;
  updated_at: string;
};

type DriverApplication = {
  id: string;
  full_name: string;
  email: string;
  phone: string;
  whatsapp_number: string;
  date_of_birth: string;
  address: string;
  vehicle_types: string[];
  vehicle_make_model: string;
  license_number: string;
  license_expiry: string;
  areas_served: string[];
  availability: string[];
  service_types: string[];
  experience_description: string;
  has_insurance: boolean;
  has_police_certificate: boolean;
  uploaded_files: string[];
  status: 'submitted' | 'under_review' | 'approved' | 'rejected';
  created_at: string;
  updated_at: string;
};

type Store = {
  users: LocalUser[];
  leads: Lead[];
  drivers: DriverApplication[];
  forms: Array<Record<string, unknown>>;
  media: Array<Record<string, unknown>>;
  subscriptions: Array<Record<string, unknown>>;
  notes: Array<Record<string, unknown>>;
  history: Array<Record<string, unknown>>;
};

const dataDir = path.join(process.cwd(), '.data');
const dataFile = path.join(dataDir, 'merchant-intake.json');

function defaultStore(): Store {
  return { users: [], leads: [], drivers: [], forms: [], media: [], subscriptions: [], notes: [], history: [] };
}

function ensureFile() {
  if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir, { recursive: true });
  if (!fs.existsSync(dataFile)) fs.writeFileSync(dataFile, JSON.stringify(defaultStore(), null, 2), 'utf8');
}

function readStore(): Store {
  ensureFile();
  try {
    return JSON.parse(fs.readFileSync(dataFile, 'utf8')) as Store;
  } catch {
    return defaultStore();
  }
}

function writeStore(store: Store) {
  ensureFile();
  fs.writeFileSync(dataFile, JSON.stringify(store, null, 2), 'utf8');
}

export function createLocalUser(input: Omit<LocalUser, 'id' | 'created_at'>) {
  const store = readStore();
  const existing = store.users.find((u) => u.email.toLowerCase() === input.email.toLowerCase());
  if (existing) throw new Error('Email already registered');
  const user: LocalUser = { id: `local_${crypto.randomUUID().replace(/-/g, '')}`, created_at: new Date().toISOString(), ...input };
  store.users.push(user);
  writeStore(store);
  return user;
}

export function findLocalUserByEmail(email: string) {
  const store = readStore();
  return store.users.find((u) => u.email.toLowerCase() === email.toLowerCase()) || null;
}

export function findLocalUserById(id: string) {
  const store = readStore();
  return store.users.find((u) => u.id === id) || null;
}

export function createLeadSubmission(payload: {
  user_id: string | null;
  full_name?: string;
  business_name: string;
  category?: string;
  email: string;
  phone?: string;
  whatsapp_number?: string;
  selected_services?: string[];
  selected_plan?: string;
  onboarding_status?: string;
  payment_status?: string;
  form?: Record<string, unknown>;
  uploadedFiles?: string[];
}) {
  const store = readStore();
  const leadId = `lead_${crypto.randomUUID().replace(/-/g, '')}`;
  const now = new Date().toISOString();
  const lead: Lead = {
    id: leadId,
    user_id: payload.user_id,
    business_name: payload.business_name,
    category: payload.category || '',
    email: payload.email,
    phone: payload.phone || '',
    whatsapp_number: payload.whatsapp_number || '',
    selected_services: payload.selected_services || [],
    selected_plan: (payload.selected_plan || 'starter').toLowerCase(),
    queue_status: 'new_lead',
    onboarding_status: payload.onboarding_status || 'submitted',
    payment_status: payload.payment_status || 'pending',
    created_at: now,
    updated_at: now,
  };

  store.leads.unshift(lead);
  store.forms.push({ id: `form_${crypto.randomUUID().replace(/-/g, '')}`, lead_id: leadId, ...(payload.form || {}), created_at: now, updated_at: now });
  store.subscriptions.push({ id: `sub_${crypto.randomUUID().replace(/-/g, '')}`, lead_id: leadId, selected_plan: lead.selected_plan, status: 'pending_activation', payment_status: 'pending', created_at: now, updated_at: now });
  (payload.uploadedFiles || []).forEach((asset) => {
    store.media.push({ id: `media_${crypto.randomUUID().replace(/-/g, '')}`, lead_id: leadId, asset_url: asset, thumbnail_url: asset, created_at: now });
  });
  store.history.push({ id: `hist_${crypto.randomUUID().replace(/-/g, '')}`, lead_id: leadId, from_status: null, to_status: 'new_lead', action_type: 'application_submitted', action_by: 'system', payload: { note: 'Initial intake submission' }, created_at: now });
  writeStore(store);
  return lead;
}

export function listLeadsByStatus(status: QueueStatus) {
  return readStore().leads.filter((l) => l.queue_status === status).slice(0, 20);
}

export function getLeadById(id: string) {
  return readStore().leads.find((l) => l.id === id) || null;
}

export function updateLeadStatus(id: string, status: QueueStatus) {
  const store = readStore();
  const lead = store.leads.find((l) => l.id === id);
  if (!lead) return null;
  const from = lead.queue_status;
  lead.queue_status = status;
  lead.updated_at = new Date().toISOString();
  store.history.push({ id: `hist_${crypto.randomUUID().replace(/-/g, '')}`, lead_id: id, from_status: from, to_status: status, action_type: 'queue_update', action_by: 'admin', payload: { at: new Date().toISOString() }, created_at: new Date().toISOString() });
  writeStore(store);
  return lead;
}

export function queueCounts() {
  const counts: Record<QueueStatus, number> = {
    new_lead: 0,
    awaiting_review: 0,
    awaiting_customer_info: 0,
    ready_to_publish: 0,
    published: 0,
    rejected: 0,
  };
  for (const lead of readStore().leads) counts[lead.queue_status] += 1;
  return counts;
}

export function createDriverApplication(payload: {
  full_name: string;
  email: string;
  phone: string;
  whatsapp_number: string;
  date_of_birth: string;
  address: string;
  vehicle_types: string[];
  vehicle_make_model: string;
  license_number: string;
  license_expiry: string;
  areas_served: string[];
  availability: string[];
  service_types: string[];
  experience_description: string;
  has_insurance: boolean;
  has_police_certificate: boolean;
  uploadedFiles: string[];
}) {
  const store = readStore();
  if (!store.drivers) store.drivers = [];
  const now = new Date().toISOString();
  const app: DriverApplication = {
    id: `driver_${crypto.randomUUID().replace(/-/g, '')}`,
    full_name: payload.full_name,
    email: payload.email,
    phone: payload.phone,
    whatsapp_number: payload.whatsapp_number,
    date_of_birth: payload.date_of_birth,
    address: payload.address,
    vehicle_types: payload.vehicle_types,
    vehicle_make_model: payload.vehicle_make_model,
    license_number: payload.license_number,
    license_expiry: payload.license_expiry,
    areas_served: payload.areas_served,
    availability: payload.availability,
    service_types: payload.service_types,
    experience_description: payload.experience_description,
    has_insurance: payload.has_insurance,
    has_police_certificate: payload.has_police_certificate,
    uploaded_files: payload.uploadedFiles,
    status: 'submitted',
    created_at: now,
    updated_at: now,
  };
  store.drivers.unshift(app);
  store.history.push({
    id: `hist_${crypto.randomUUID().replace(/-/g, '')}`,
    lead_id: app.id,
    from_status: null,
    to_status: 'submitted',
    action_type: 'driver_application_submitted',
    action_by: 'system',
    payload: { note: 'Driver intake submission' },
    created_at: now,
  });
  writeStore(store);
  return app;
}

export function listDriverApplications() {
  const store = readStore();
  return (store.drivers || []).slice(0, 50);
}
