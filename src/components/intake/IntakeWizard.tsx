'use client';

import { useMemo, useState } from 'react';
import { Check, ChevronLeft, ChevronRight, Loader2, Building2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { PhoneVerification } from './PhoneVerification';
import { KycBadge } from './KycBadge';

const services = [
  'Online Storefront',
  'Featured Listings',
  'Business Website',
  'WhatsApp Ordering',
  'Online Payments',
  'Social Media Setup',
  'Marketplace Listings',
  'Advertising',
  'SEO Setup',
];

const plans = ['Starter', 'Growth', 'Business'];

type FormState = {
  full_name: string;
  business_name: string;
  email: string;
  phone: string;
  whatsapp_number: string;
  password: string;
  selected_services: string[];
  business_category: string;
  business_description: string;
  address: string;
  service_area: string;
  opening_hours: string;
  delivery_available: boolean;
  pickup_available: boolean;
  instagram: string;
  facebook: string;
  website: string;
  preferred_contact_method: string;
  selected_plan: string;
};

const initialState: FormState = {
  full_name: '',
  business_name: '',
  email: '',
  phone: '',
  whatsapp_number: '',
  password: '',
  selected_services: [],
  business_category: '',
  business_description: '',
  address: '',
  service_area: '',
  opening_hours: '',
  delivery_available: false,
  pickup_available: true,
  instagram: '',
  facebook: '',
  website: '',
  preferred_contact_method: 'whatsapp',
  selected_plan: 'Starter',
};

export function IntakeWizard() {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState<FormState>(initialState);
  const [files, setFiles] = useState<File[]>([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [done, setDone] = useState(false);
  const [phoneVerified, setPhoneVerified] = useState(false);

  const totalSteps = 6;
  const progress = useMemo(() => Math.round((step / totalSteps) * 100), [step]);

  function toggleService(service: string) {
    setForm((prev) => ({
      ...prev,
      selected_services: prev.selected_services.includes(service)
        ? prev.selected_services.filter((s) => s !== service)
        : [...prev.selected_services, service],
    }));
  }

  async function uploadFiles() {
    if (!files.length) return [] as string[];
    const uploaded: string[] = [];
    for (const file of files) {
      const body = new FormData();
      body.append('file', file);
      const res = await fetch('/api/intake/upload', { method: 'POST', body });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Upload failed');
      uploaded.push(data.assetUrl);
    }
    return uploaded;
  }

  async function submitAll() {
    setLoading(true);
    setMessage('');
    try {
      const uploadedFiles = await uploadFiles();
      const res = await fetch('/api/intake/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, uploadedFiles }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Submission failed');
      setMessage('Application submitted! Our team will contact you shortly.');
      setDone(true);
    } catch (err) {
      setMessage(err instanceof Error ? err.message : 'Submission failed');
    } finally {
      setLoading(false);
    }
  }

  if (done) {
    return (
      <div className="flex flex-col items-center gap-4 py-12 text-center">
        <div className="flex size-16 items-center justify-center rounded-full bg-emerald-100 dark:bg-emerald-900">
          <Check className="size-8 text-emerald-600 dark:text-emerald-300" />
        </div>
        <h2 className="text-2xl font-black">You&apos;re all set!</h2>
        <p className="max-w-md text-muted-foreground">Your business application has been submitted. The SOV team will review it and reach out via WhatsApp or email within 24 hours.</p>
      </div>
    );
  }

  return (
    <div className="space-y-5">
      <header className="space-y-2">
        <div className="flex items-center gap-3">
          <div className="flex size-10 items-center justify-center rounded-lg bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-300">
            <Building2 className="size-5" />
          </div>
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary">Business Signup</p>
            <p className="text-sm text-muted-foreground">Step {step} of {totalSteps}</p>
          </div>
        </div>
        <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
          <div className="h-full bg-primary transition-all" style={{ width: `${progress}%` }} />
        </div>
      </header>

      <section className="rounded-2xl border border-border bg-card p-4 md:p-6">
        {step === 1 && (
          <div className="space-y-4">
            <h2 className="text-lg font-bold">Your details</h2>
            <div className="grid gap-3 md:grid-cols-2">
              <Field label="Full Name" value={form.full_name} onChange={(v) => setForm({ ...form, full_name: v })} placeholder="e.g. Marcus James" />
              <Field label="Business Name" value={form.business_name} onChange={(v) => setForm({ ...form, business_name: v })} placeholder="e.g. Marcus Doubles" />
              <Field label="Email" type="email" value={form.email} onChange={(v) => setForm({ ...form, email: v })} placeholder="you@email.com" />
              <Field label="Phone" value={form.phone} onChange={(v) => setForm({ ...form, phone: v })} placeholder="1-868-555-1234" />
              <Field label="WhatsApp Number" value={form.whatsapp_number} onChange={(v) => setForm({ ...form, whatsapp_number: v })} placeholder="1-868-555-1234" />
              <Field label="Create Password" type="password" value={form.password} onChange={(v) => setForm({ ...form, password: v })} placeholder="Min 8 characters" />
            </div>
            <KycBadge />
            {(form.phone || form.whatsapp_number) && !phoneVerified && (
              <PhoneVerification phone={form.phone} whatsapp={form.whatsapp_number} onVerified={() => setPhoneVerified(true)} />
            )}
          </div>
        )}

        {step === 2 && (
          <div className="space-y-4">
            <h2 className="text-lg font-bold">What services do you need?</h2>
            <p className="text-sm text-muted-foreground">Select all that apply. Not sure? We&apos;ll help you decide.</p>
            <div className="grid gap-2 sm:grid-cols-2 md:grid-cols-3">
              {services.map((service) => (
                <button key={service} type="button" onClick={() => toggleService(service)} className={`rounded-xl border px-3 py-2.5 text-left text-sm font-medium transition ${form.selected_services.includes(service) ? 'border-emerald-400 bg-emerald-50 text-emerald-900 dark:border-emerald-600 dark:bg-emerald-950 dark:text-emerald-200' : 'border-border bg-background hover:bg-muted'}`}>
                  {form.selected_services.includes(service) ? <Check className="mr-1.5 inline size-4" /> : null}
                  {service}
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-4">
            <h2 className="text-lg font-bold">Tell us about your business</h2>
            <div className="grid gap-3 md:grid-cols-2">
              <Field label="Business Category" value={form.business_category} onChange={(v) => setForm({ ...form, business_category: v })} placeholder="e.g. Food, Salon, Mechanic" />
              <Field label="Service Area" value={form.service_area} onChange={(v) => setForm({ ...form, service_area: v })} placeholder="e.g. San Fernando, South Trinidad" />
              <Field label="Address" value={form.address} onChange={(v) => setForm({ ...form, address: v })} placeholder="Street address" />
              <Field label="Opening Hours" value={form.opening_hours} onChange={(v) => setForm({ ...form, opening_hours: v })} placeholder="e.g. Mon-Sat 8am-6pm" />
              <Field label="Instagram" value={form.instagram} onChange={(v) => setForm({ ...form, instagram: v })} placeholder="@yourbusiness" />
              <Field label="Facebook" value={form.facebook} onChange={(v) => setForm({ ...form, facebook: v })} placeholder="facebook.com/yourbusiness" />
              <Field label="Website (if any)" value={form.website} onChange={(v) => setForm({ ...form, website: v })} placeholder="www.yourbusiness.com" />
              <Field label="Best way to reach you" value={form.preferred_contact_method} onChange={(v) => setForm({ ...form, preferred_contact_method: v })} placeholder="whatsapp / phone / email" />
              <div className="md:col-span-2">
                <Label htmlFor="business-description">Business Description</Label>
                <textarea id="business-description" aria-label="Business Description" className="mt-1 min-h-28 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring" value={form.business_description} onChange={(e) => setForm({ ...form, business_description: e.target.value })} placeholder="Tell us what you sell or offer..." />
              </div>
              <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={form.delivery_available} onChange={(e) => setForm({ ...form, delivery_available: e.target.checked })} className="size-4 rounded" /> Delivery available</label>
              <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={form.pickup_available} onChange={(e) => setForm({ ...form, pickup_available: e.target.checked })} className="size-4 rounded" /> Pickup available</label>
            </div>
          </div>
        )}

        {step === 4 && (
          <div className="space-y-4">
            <h2 className="text-lg font-bold">Upload your files</h2>
            <p className="text-sm text-muted-foreground">Logo, banner, product photos, menus, business docs — whatever you have.</p>
            <Input id="uploads" type="file" className="mt-2" multiple accept="image/*,.pdf,.doc,.docx" onChange={(e) => setFiles(Array.from(e.target.files || []))} />
            {files.length > 0 && (
              <p className="text-sm text-muted-foreground">{files.length} file{files.length > 1 ? 's' : ''} selected</p>
            )}
          </div>
        )}

        {step === 5 && (
          <div className="space-y-4">
            <h2 className="text-lg font-bold">Choose your plan</h2>
            <div className="grid gap-3 md:grid-cols-3">
              {plans.map((plan) => (
                <button key={plan} type="button" onClick={() => setForm({ ...form, selected_plan: plan })} className={`rounded-xl border p-4 text-left transition ${form.selected_plan === plan ? 'border-primary bg-primary/10 ring-2 ring-primary/30' : 'border-border bg-background hover:bg-muted'}`}>
                  <p className="text-sm font-bold">{plan}</p>
                  <p className="mt-1 text-xs text-muted-foreground">{plan === 'Starter' ? 'Launch essentials — free' : plan === 'Growth' ? 'More visibility + support' : 'Complete business onboarding'}</p>
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 6 && (
          <div className="space-y-4">
            <h2 className="text-lg font-bold">Review & Submit</h2>
            <div className="rounded-lg bg-muted/50 p-4 text-sm">
              <p><span className="font-semibold">Business:</span> {form.business_name || '—'}</p>
              <p><span className="font-semibold">Contact:</span> {form.full_name || '—'} ({form.email || '—'})</p>
              <p><span className="font-semibold">WhatsApp:</span> {form.whatsapp_number || '—'}</p>
              <p><span className="font-semibold">Plan:</span> {form.selected_plan}</p>
              <p><span className="font-semibold">Services:</span> {form.selected_services.join(', ') || 'None selected'}</p>
            </div>
            <Button onClick={submitAll} disabled={loading} className="w-full">
              {loading ? <><Loader2 className="size-4 animate-spin" /> Submitting...</> : 'Submit application'}
            </Button>
          </div>
        )}
      </section>

      {message && !done ? <p className="rounded-lg bg-destructive/10 px-3 py-2 text-sm font-medium text-destructive">{message}</p> : null}

      <div className="flex items-center justify-between">
        <Button variant="outline" onClick={() => setStep(Math.max(1, step - 1))} disabled={step === 1 || loading}>
          <ChevronLeft className="size-4" /> Back
        </Button>
        {step < totalSteps && (
          <Button onClick={() => setStep(Math.min(totalSteps, step + 1))} disabled={loading}>
            Next <ChevronRight className="size-4" />
          </Button>
        )}
      </div>
    </div>
  );
}

function Field({ label, value, onChange, type = 'text', placeholder }: { label: string; value: string; onChange: (value: string) => void; type?: string; placeholder?: string }) {
  const id = label.toLowerCase().replace(/[^a-z0-9]+/g, '-');
  return (
    <div>
      <Label htmlFor={id}>{label}</Label>
      <Input id={id} aria-label={label} type={type} value={value} onChange={(e) => onChange(e.target.value)} className="mt-1" placeholder={placeholder} />
    </div>
  );
}
