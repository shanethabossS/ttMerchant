'use client';

import { useState } from 'react';
import { Send, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

const FALLBACK_EMAIL = 'info@sovdigitalgroup.com';

type Status = 'idle' | 'sending' | 'ok' | 'err';

export default function RestaurantApplyForm() {
  const [status, setStatus] = useState<Status>('idle');
  const [error, setError] = useState<string | null>(null);
  const [form, setForm] = useState({
    business: '', name: '', email: '', phone: '', location: '',
    fulfillment: 'both', cuisine: '', message: '', company: '',
  });

  const update = (k: keyof typeof form) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => setForm((f) => ({ ...f, [k]: e.target.value }));

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus('sending');
    setError(null);
    try {
      const r = await fetch('/api/food-application', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await r.json().catch(() => ({}));
      if (!r.ok) {
        setError(data?.error || 'Could not send. Please email us directly.');
        setStatus('err');
        return;
      }
      setStatus('ok');
      setForm({
        business: '', name: '', email: '', phone: '', location: '',
        fulfillment: 'both', cuisine: '', message: '', company: '',
      });
    } catch {
      setError('Network error. Please email us directly.');
      setStatus('err');
    }
  }

  if (status === 'ok') {
    return (
      <div className="rounded-2xl border border-border bg-card p-8 text-center shadow-sm">
        <div className="mx-auto flex size-14 items-center justify-center rounded-full bg-gradient-to-br from-orange-500 to-rose-500 text-white">
          <CheckCircle2 className="size-7" />
        </div>
        <h3 className="mt-5 text-2xl font-black tracking-tight">Application received.</h3>
        <p className="mt-3 text-muted-foreground">
          Our team reviews every founding restaurant by hand. We&apos;ll reply within 1 business day
          with your onboarding checklist. You can also email{' '}
          <a className="font-semibold text-orange-600 dark:text-orange-400" href={`mailto:${FALLBACK_EMAIL}`}>{FALLBACK_EMAIL}</a>.
        </p>
        <Button variant="outline" className="mt-6" onClick={() => setStatus('idle')}>Apply another restaurant</Button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4 rounded-2xl border border-border bg-card p-6 md:p-7 shadow-sm" noValidate>
      <div className="grid gap-4 md:grid-cols-2">
        <Field label="Restaurant / business name">
          <input required value={form.business} onChange={update('business')} className="input" placeholder="Doubles King" autoComplete="organization" />
        </Field>
        <Field label="Your name">
          <input required value={form.name} onChange={update('name')} className="input" placeholder="Jane Persad" autoComplete="name" />
        </Field>
        <Field label="Email">
          <input required type="email" value={form.email} onChange={update('email')} className="input" placeholder="you@business.tt" autoComplete="email" />
        </Field>
        <Field label="Phone / WhatsApp">
          <input required value={form.phone} onChange={update('phone')} className="input" placeholder="+1 868 555 0123" autoComplete="tel" />
        </Field>
        <Field label="Location / area">
          <input value={form.location} onChange={update('location')} className="input" placeholder="Chaguanas" />
        </Field>
        <Field label="How you serve customers">
          <select value={form.fulfillment} onChange={update('fulfillment')} className="input">
            <option value="both">Delivery & pickup</option>
            <option value="delivery">Delivery only</option>
            <option value="pickup">Pickup only</option>
            <option value="dinein">Dine-in / QR at table</option>
          </select>
        </Field>
      </div>
      <Field label="Cuisine / type (optional)">
        <input value={form.cuisine} onChange={update('cuisine')} className="input" placeholder="Local, roti, BBQ, bakery, vegan…" />
      </Field>
      <Field label="Anything else we should know? (optional)">
        <textarea rows={4} value={form.message} onChange={update('message')} className="input resize-y" placeholder="How many locations, roughly how many items on your menu, do you have photos ready, etc." />
      </Field>

      <input
        type="text" tabIndex={-1} autoComplete="off" value={form.company} onChange={update('company')}
        className="hidden" aria-hidden="true" name="company"
      />

      {status === 'err' && error && (
        <div className="rounded-lg border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700 dark:border-rose-900 dark:bg-rose-950/40 dark:text-rose-300">
          {error}
        </div>
      )}

      <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
        <p className="text-xs text-muted-foreground">Or email <a href={`mailto:${FALLBACK_EMAIL}`} className="font-semibold text-orange-600 dark:text-orange-400">{FALLBACK_EMAIL}</a></p>
        <Button type="submit" size="lg" disabled={status === 'sending'} className="bg-gradient-to-r from-orange-600 to-rose-500 text-white hover:from-orange-700 hover:to-rose-600">
          <Send className="mr-2 size-4" />
          {status === 'sending' ? 'Sending…' : 'Apply now'}
        </Button>
      </div>
    </form>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-2 block text-xs font-bold uppercase tracking-wider text-muted-foreground">{label}</span>
      {children}
    </label>
  );
}
