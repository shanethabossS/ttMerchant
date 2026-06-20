'use client';

import { useState } from 'react';
import { Send, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

const FALLBACK_EMAIL = 'info@sovdigitalgroup.com';

type Status = 'idle' | 'sending' | 'ok' | 'err';

export default function ContactForm() {
  const [status, setStatus] = useState<Status>('idle');
  const [error, setError] = useState<string | null>(null);
  const [form, setForm] = useState({
    name: '', email: '', phone: '', kind: 'build', message: '', company: '',
  });

  const update = (k: keyof typeof form) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => setForm((f) => ({ ...f, [k]: e.target.value }));

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus('sending');
    setError(null);
    try {
      const r = await fetch('/api/web-design-contact', {
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
      setForm({ name: '', email: '', phone: '', kind: 'build', message: '', company: '' });
    } catch {
      setError('Network error. Please email us directly.');
      setStatus('err');
    }
  }

  if (status === 'ok') {
    return (
      <div className="rounded-2xl border border-border bg-card p-8 text-center shadow-sm">
        <div className="mx-auto flex size-14 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 text-white">
          <CheckCircle2 className="size-7" />
        </div>
        <h3 className="mt-5 text-2xl font-black tracking-tight">We&apos;ll reply within 1 business day.</h3>
        <p className="mt-3 text-muted-foreground">Meanwhile, you can also email <a className="font-semibold text-blue-600 dark:text-blue-400" href={`mailto:${FALLBACK_EMAIL}`}>{FALLBACK_EMAIL}</a>.</p>
        <Button variant="outline" className="mt-6" onClick={() => setStatus('idle')}>Send another</Button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4 rounded-2xl border border-border bg-card p-6 md:p-7 shadow-sm" noValidate>
      <div className="grid gap-4 md:grid-cols-2">
        <Field label="Your name">
          <input required value={form.name} onChange={update('name')} className="input" placeholder="Jane Persad" autoComplete="name" />
        </Field>
        <Field label="Email">
          <input required type="email" value={form.email} onChange={update('email')} className="input" placeholder="you@business.tt" autoComplete="email" />
        </Field>
        <Field label="Phone / WhatsApp (optional)">
          <input value={form.phone} onChange={update('phone')} className="input" placeholder="+1 868 555 0123" autoComplete="tel" />
        </Field>
        <Field label="I need">
          <select value={form.kind} onChange={update('kind')} className="input">
            <option value="build">A new website</option>
            <option value="repair">Repair / tune-up of my current site</option>
            <option value="rebuild">A full rebuild</option>
            <option value="mobile">A mobile-ready app (PWA)</option>
            <option value="other">Something else</option>
          </select>
        </Field>
      </div>
      <Field label="Tell us about your business">
        <textarea required rows={5} value={form.message} onChange={update('message')} className="input resize-y" placeholder="A few sentences about what you do, your current site (if any), and what you'd like." />
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
        <p className="text-xs text-muted-foreground">Or email <a href={`mailto:${FALLBACK_EMAIL}`} className="font-semibold text-blue-600 dark:text-blue-400">{FALLBACK_EMAIL}</a></p>
        <Button type="submit" size="lg" disabled={status === 'sending'} className="bg-gradient-to-r from-blue-600 to-cyan-500 text-white hover:from-blue-700 hover:to-cyan-600">
          <Send className="mr-2 size-4" />
          {status === 'sending' ? 'Sending…' : 'Send enquiry'}
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
