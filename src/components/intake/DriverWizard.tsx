'use client';

import { useMemo, useState } from 'react';
import { Check, ChevronLeft, ChevronRight, Loader2, Car } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { PhoneVerification } from './PhoneVerification';
import { KycBadge } from './KycBadge';

const vehicleTypes = ['Car', 'Van', 'Pickup Truck', 'Motorcycle', 'Bicycle', 'On Foot'];
const areas = [
  'Port of Spain', 'San Fernando', 'Chaguanas', 'Arima', 'Tunapuna',
  'Couva', 'Point Fortin', 'Princes Town', 'Sangre Grande', 'Scarborough (Tobago)',
  'Diego Martin', 'Marabella', 'Siparia', 'Penal', 'Rio Claro',
];
const availability = ['Weekday mornings', 'Weekday afternoons', 'Weekday evenings', 'Weekends', 'Full time', 'On call'];
const serviceTypes = ['Food delivery', 'Package delivery', 'Grocery runs', 'Taxi / ride service', 'Moving / hauling', 'Courier / documents'];

type DriverForm = {
  full_name: string;
  email: string;
  phone: string;
  whatsapp_number: string;
  password: string;
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
};

const initialState: DriverForm = {
  full_name: '',
  email: '',
  phone: '',
  whatsapp_number: '',
  password: '',
  date_of_birth: '',
  address: '',
  vehicle_types: [],
  vehicle_make_model: '',
  license_number: '',
  license_expiry: '',
  areas_served: [],
  availability: [],
  service_types: [],
  experience_description: '',
  has_insurance: false,
  has_police_certificate: false,
};

function toggleArray(arr: string[], val: string) {
  return arr.includes(val) ? arr.filter((v) => v !== val) : [...arr, val];
}

export function DriverWizard() {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState<DriverForm>(initialState);
  const [files, setFiles] = useState<File[]>([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [done, setDone] = useState(false);
  const [phoneVerified, setPhoneVerified] = useState(false);

  const totalSteps = 6;
  const progress = useMemo(() => Math.round((step / totalSteps) * 100), [step]);

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
      const res = await fetch('/api/intake/driver-submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, uploadedFiles }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Submission failed');
      setMessage('Application submitted! We will review and contact you shortly.');
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
        <p className="max-w-md text-muted-foreground">Your driver application has been submitted. We&apos;ll review your info and reach out via WhatsApp or email within 24 hours.</p>
      </div>
    );
  }

  return (
    <div className="space-y-5">
      <header className="space-y-2">
        <div className="flex items-center gap-3">
          <div className="flex size-10 items-center justify-center rounded-lg bg-cyan-100 text-cyan-600 dark:bg-cyan-900 dark:text-cyan-300">
            <Car className="size-5" />
          </div>
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary">Driver Signup</p>
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
            <h2 className="text-lg font-bold">Personal info</h2>
            <div className="grid gap-3 md:grid-cols-2">
              <Field label="Full Name" value={form.full_name} onChange={(v) => setForm({ ...form, full_name: v })} placeholder="e.g. Jason Baptiste" />
              <Field label="Email" type="email" value={form.email} onChange={(v) => setForm({ ...form, email: v })} placeholder="you@email.com" />
              <Field label="Phone" value={form.phone} onChange={(v) => setForm({ ...form, phone: v })} placeholder="1-868-555-1234" />
              <Field label="WhatsApp Number" value={form.whatsapp_number} onChange={(v) => setForm({ ...form, whatsapp_number: v })} placeholder="1-868-555-1234" />
              <Field label="Date of Birth" type="date" value={form.date_of_birth} onChange={(v) => setForm({ ...form, date_of_birth: v })} />
              <Field label="Home Address" value={form.address} onChange={(v) => setForm({ ...form, address: v })} placeholder="Your home area" />
              <div className="md:col-span-2">
                <Field label="Create Password" type="password" value={form.password} onChange={(v) => setForm({ ...form, password: v })} placeholder="Min 8 characters" />
              </div>
            </div>
            <KycBadge />
            {(form.phone || form.whatsapp_number) && !phoneVerified && (
              <PhoneVerification phone={form.phone} whatsapp={form.whatsapp_number} onVerified={() => setPhoneVerified(true)} />
            )}
          </div>
        )}

        {step === 2 && (
          <div className="space-y-4">
            <h2 className="text-lg font-bold">Vehicle & License</h2>
            <p className="text-sm text-muted-foreground">Select your vehicle type(s)</p>
            <div className="grid gap-2 sm:grid-cols-2 md:grid-cols-3">
              {vehicleTypes.map((vt) => (
                <button key={vt} type="button" onClick={() => setForm({ ...form, vehicle_types: toggleArray(form.vehicle_types, vt) })} className={`rounded-xl border px-3 py-2.5 text-left text-sm font-medium transition ${form.vehicle_types.includes(vt) ? 'border-emerald-400 bg-emerald-50 text-emerald-900 dark:border-emerald-600 dark:bg-emerald-950 dark:text-emerald-200' : 'border-border bg-background hover:bg-muted'}`}>
                  {form.vehicle_types.includes(vt) ? <Check className="mr-1.5 inline size-4" /> : null}
                  {vt}
                </button>
              ))}
            </div>
            <div className="grid gap-3 md:grid-cols-2">
              <Field label="Vehicle Make & Model" value={form.vehicle_make_model} onChange={(v) => setForm({ ...form, vehicle_make_model: v })} placeholder="e.g. Toyota Hilux 2019" />
              <Field label="Driver's License Number" value={form.license_number} onChange={(v) => setForm({ ...form, license_number: v })} placeholder="License #" />
              <Field label="License Expiry Date" type="date" value={form.license_expiry} onChange={(v) => setForm({ ...form, license_expiry: v })} />
            </div>
            <div className="flex flex-wrap gap-4">
              <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={form.has_insurance} onChange={(e) => setForm({ ...form, has_insurance: e.target.checked })} className="size-4 rounded" /> I have vehicle insurance</label>
              <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={form.has_police_certificate} onChange={(e) => setForm({ ...form, has_police_certificate: e.target.checked })} className="size-4 rounded" /> I have a police certificate of good character</label>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-4">
            <h2 className="text-lg font-bold">Where do you operate?</h2>
            <p className="text-sm text-muted-foreground">Select all areas you can service</p>
            <div className="grid gap-2 sm:grid-cols-2 md:grid-cols-3">
              {areas.map((area) => (
                <button key={area} type="button" onClick={() => setForm({ ...form, areas_served: toggleArray(form.areas_served, area) })} className={`rounded-xl border px-3 py-2.5 text-left text-sm font-medium transition ${form.areas_served.includes(area) ? 'border-blue-400 bg-blue-50 text-blue-900 dark:border-blue-600 dark:bg-blue-950 dark:text-blue-200' : 'border-border bg-background hover:bg-muted'}`}>
                  {form.areas_served.includes(area) ? <Check className="mr-1.5 inline size-4" /> : null}
                  {area}
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 4 && (
          <div className="space-y-4">
            <h2 className="text-lg font-bold">Availability & Services</h2>
            <p className="text-sm font-semibold">When are you available?</p>
            <div className="grid gap-2 sm:grid-cols-2 md:grid-cols-3">
              {availability.map((a) => (
                <button key={a} type="button" onClick={() => setForm({ ...form, availability: toggleArray(form.availability, a) })} className={`rounded-xl border px-3 py-2.5 text-left text-sm font-medium transition ${form.availability.includes(a) ? 'border-emerald-400 bg-emerald-50 text-emerald-900 dark:border-emerald-600 dark:bg-emerald-950 dark:text-emerald-200' : 'border-border bg-background hover:bg-muted'}`}>
                  {form.availability.includes(a) ? <Check className="mr-1.5 inline size-4" /> : null}
                  {a}
                </button>
              ))}
            </div>
            <p className="mt-2 text-sm font-semibold">What type of work?</p>
            <div className="grid gap-2 sm:grid-cols-2 md:grid-cols-3">
              {serviceTypes.map((st) => (
                <button key={st} type="button" onClick={() => setForm({ ...form, service_types: toggleArray(form.service_types, st) })} className={`rounded-xl border px-3 py-2.5 text-left text-sm font-medium transition ${form.service_types.includes(st) ? 'border-cyan-400 bg-cyan-50 text-cyan-900 dark:border-cyan-600 dark:bg-cyan-950 dark:text-cyan-200' : 'border-border bg-background hover:bg-muted'}`}>
                  {form.service_types.includes(st) ? <Check className="mr-1.5 inline size-4" /> : null}
                  {st}
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 5 && (
          <div className="space-y-4">
            <h2 className="text-lg font-bold">Upload documents</h2>
            <p className="text-sm text-muted-foreground">Driver&apos;s license, police certificate, resume, insurance — whatever you have. We&apos;ll sort it out.</p>
            <Input id="driver-uploads" type="file" className="mt-2" multiple accept="image/*,.pdf,.doc,.docx" onChange={(e) => setFiles(Array.from(e.target.files || []))} />
            {files.length > 0 && (
              <p className="text-sm text-muted-foreground">{files.length} file{files.length > 1 ? 's' : ''} selected</p>
            )}
            <div className="mt-2">
              <Label htmlFor="experience-desc">Experience / Notes (optional)</Label>
              <textarea id="experience-desc" aria-label="Experience description" className="mt-1 min-h-24 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring" value={form.experience_description} onChange={(e) => setForm({ ...form, experience_description: e.target.value })} placeholder="Any driving experience, certifications, or info you want us to know..." />
            </div>
          </div>
        )}

        {step === 6 && (
          <div className="space-y-4">
            <h2 className="text-lg font-bold">Review & Submit</h2>
            <div className="rounded-lg bg-muted/50 p-4 text-sm space-y-1">
              <p><span className="font-semibold">Name:</span> {form.full_name || '—'}</p>
              <p><span className="font-semibold">Contact:</span> {form.email || '—'} / {form.whatsapp_number || '—'}</p>
              <p><span className="font-semibold">Vehicle:</span> {form.vehicle_types.join(', ') || '—'} {form.vehicle_make_model ? `(${form.vehicle_make_model})` : ''}</p>
              <p><span className="font-semibold">Areas:</span> {form.areas_served.join(', ') || '—'}</p>
              <p><span className="font-semibold">Availability:</span> {form.availability.join(', ') || '—'}</p>
              <p><span className="font-semibold">Services:</span> {form.service_types.join(', ') || '—'}</p>
              <p><span className="font-semibold">License:</span> {form.license_number || '—'}</p>
              <p><span className="font-semibold">Insurance:</span> {form.has_insurance ? 'Yes' : 'No'} | <span className="font-semibold">Police Cert:</span> {form.has_police_certificate ? 'Yes' : 'No'}</p>
            </div>
            <Button onClick={submitAll} disabled={loading} className="w-full">
              {loading ? <><Loader2 className="size-4 animate-spin" /> Submitting...</> : 'Submit driver application'}
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
