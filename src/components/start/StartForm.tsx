'use client';

import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import {
  ArrowRight,
  Bot,
  Calendar,
  CheckCircle2,
  CreditCard,
  FileText,
  Globe,
  MessageCircle,
  Receipt,
  Rocket,
  Search,
  ShoppingBag,
  Sparkles,
  Truck,
} from 'lucide-react';
import { Button } from '@/components/ui/button';

type PlanKey = 'starter' | 'business' | 'store' | 'premium';

const PLANS: Record<PlanKey, { name: string; price: string; tagline: string; accent: string }> = {
  starter: { name: 'Starter Website', price: 'TT$1,500 setup + TT$150/month', tagline: 'Simple online presence', accent: 'border-slate-300' },
  business: { name: 'Business Website', price: 'TT$3,500 setup + TT$250/month', tagline: 'Lead generation website', accent: 'border-blue-500 ring-2 ring-blue-500/20' },
  store: { name: 'Shop868 Store', price: 'TT$2,500 setup + TT$300/month', tagline: 'Online storefront', accent: 'border-emerald-500' },
  premium: { name: 'Premium Digital Package', price: 'TT$6,500 setup + TT$500/month', tagline: 'Full digital system', accent: 'border-amber-500' },
};

const SERVICES = [
  { id: 'website',        icon: Globe,         label: 'Website' },
  { id: 'ordering',       icon: ShoppingBag,   label: 'Online Ordering' },
  { id: 'invoicing',      icon: Receipt,       label: 'Invoice System' },
  { id: 'booking',        icon: Calendar,      label: 'Booking System' },
  { id: 'ai_assistant',   icon: Bot,           label: 'AI Assistant' },
  { id: 'whatsapp',       icon: MessageCircle, label: 'WhatsApp Integration' },
  { id: 'payments',       icon: CreditCard,    label: 'Payments' },
  { id: 'seo',            icon: Search,        label: 'SEO' },
  { id: 'listings',       icon: Sparkles,      label: 'SOV Network Listings' },
  { id: 'resume',         icon: FileText,      label: 'Resume Creation' },
  { id: 'driver_hiring',  icon: Truck,         label: 'Driver Hiring' },
];

const CATEGORIES = [
  'Food / Restaurant',
  'Retail / Shop',
  'Salon / Beauty',
  'Mechanic / Auto',
  'Trades / Repair',
  'Professional Services',
  'Health / Wellness',
  'Event / Entertainment',
  'Real Estate',
  'Driver / Delivery',
  'Other',
];

function isValidPlan(p: string | null): p is PlanKey {
  return p === 'starter' || p === 'business' || p === 'store' || p === 'premium';
}

export function StartForm() {
  const params = useSearchParams();
  const initialPlan: PlanKey = isValidPlan(params.get('plan')) ? (params.get('plan') as PlanKey) : 'business';

  const [plan, setPlan] = useState<PlanKey>(initialPlan);
  const [fullName, setFullName] = useState('');
  const [businessName, setBusinessName] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [preferredContact, setPreferredContact] = useState<'whatsapp' | 'email' | 'phone'>('whatsapp');
  const [selectedServices, setSelectedServices] = useState<string[]>(['website', 'whatsapp', 'listings']);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Auto-fill WhatsApp from phone if empty
  useEffect(() => {
    if (!whatsapp && phone) setWhatsapp(phone);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phone]);

  const formValid = useMemo(() => {
    return (
      fullName.trim().length > 1 &&
      businessName.trim().length > 1 &&
      category.length > 0 &&
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim()) &&
      (phone.trim().length >= 7 || whatsapp.trim().length >= 7)
    );
  }, [fullName, businessName, category, email, phone, whatsapp]);

  function toggleService(id: string) {
    setSelectedServices((prev) => (prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!formValid || submitting) return;
    setSubmitting(true);
    setErrorMsg(null);
    try {
      const res = await fetch('/api/intake/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          full_name: fullName.trim(),
          business_name: businessName.trim(),
          business_category: category,
          business_description: description.trim(),
          email: email.trim(),
          phone: phone.trim(),
          whatsapp_number: whatsapp.trim() || phone.trim(),
          selected_plan: PLANS[plan].name,
          selected_services: selectedServices,
          preferred_contact_method: preferredContact,
        }),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body?.error || `Request failed (${res.status})`);
      }
      setSuccess(true);
      // Smooth scroll to top so user sees success
      if (typeof window !== 'undefined') window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (err: any) {
      setErrorMsg(err?.message || 'Something went wrong — please try again or WhatsApp us.');
    } finally {
      setSubmitting(false);
    }
  }

  // ───── Success state ─────
  if (success) {
    return (
      <div className="rounded-2xl border border-green-300 bg-green-50 p-8 text-center dark:border-green-800 dark:bg-green-950/30">
        <div className="mx-auto mb-4 flex size-16 items-center justify-center rounded-2xl bg-green-500 text-white">
          <CheckCircle2 className="size-8" />
        </div>
        <h1 className="text-3xl font-black tracking-tight">Got it — we&apos;re on it 🚀</h1>
        <p className="mx-auto mt-3 max-w-md text-base text-muted-foreground">
          We&apos;ve received your details for <strong>{businessName}</strong>. Expect a quote in your inbox within <strong>24 hours</strong>.
          If you prefer to chat, our team is on WhatsApp.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <a href={`https://wa.me/18685550199?text=${encodeURIComponent(`Hi LaunchTT — I just submitted my business "${businessName}" for the ${PLANS[plan].name} plan.`)}`} target="_blank" rel="noopener noreferrer">
            <Button size="lg" className="gap-2">
              <MessageCircle className="size-5" /> Continue on WhatsApp
            </Button>
          </a>
          <Link href="/">
            <Button size="lg" variant="outline">Back to home</Button>
          </Link>
        </div>
        <p className="mt-6 text-xs text-muted-foreground">Plan selected: <strong>{PLANS[plan].name}</strong> · {PLANS[plan].price}</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <div className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-xs font-bold text-blue-700 dark:border-blue-800 dark:bg-blue-950 dark:text-blue-300">
          <Rocket className="size-3.5" /> Free quote in 24 hours · No credit card
        </div>
        <h1 className="mt-4 text-3xl font-black tracking-tight md:text-4xl">Tell us about your business</h1>
        <p className="mt-3 text-base text-muted-foreground">
          Five-minute form. We&apos;ll come back with a tailored quote and a preview link within 24 hours.
        </p>
      </div>

      {/* Plan picker */}
      <fieldset className="space-y-3">
        <legend className="text-sm font-bold uppercase tracking-wider text-muted-foreground">1. Pick your plan</legend>
        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          {(Object.keys(PLANS) as PlanKey[]).map((key) => {
            const p = PLANS[key];
            const selected = plan === key;
            return (
              <label
                key={key}
                className={`relative flex cursor-pointer flex-col rounded-2xl border bg-card p-4 transition hover:shadow-md ${selected ? 'border-blue-500 ring-2 ring-blue-500/20' : 'border-border hover:border-blue-300'}`}
              >
                <input
                  type="radio"
                  name="plan"
                  value={key}
                  checked={selected}
                  onChange={() => setPlan(key)}
                  className="sr-only"
                />
                {selected && (
                  <span className="absolute -top-2 -right-2 flex size-6 items-center justify-center rounded-full bg-blue-500 text-white">
                    <CheckCircle2 className="size-4" />
                  </span>
                )}
                <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">{p.name}</p>
                <p className="mt-1 text-2xl font-black">{p.price}</p>
                <p className="mt-0.5 text-xs text-muted-foreground">{p.tagline}</p>
              </label>
            );
          })}
        </div>
      </fieldset>

      {/* Business info */}
      <fieldset className="space-y-4">
        <legend className="text-sm font-bold uppercase tracking-wider text-muted-foreground">2. Your business</legend>

        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Your name *">
            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
              placeholder="Jane Doe"
              className="input-base"
              autoComplete="name"
            />
          </Field>
          <Field label="Business name *">
            <input
              type="text"
              value={businessName}
              onChange={(e) => setBusinessName(e.target.value)}
              required
              placeholder="Jane's Roti Shop"
              className="input-base"
              autoComplete="organization"
            />
          </Field>
        </div>

        <Field label="Business type *">
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
            className="input-base"
          >
            <option value="">— Choose a category —</option>
            {CATEGORIES.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </Field>

        <Field label="What do you sell or offer? (optional)" hint="A sentence or two — we'll use this for your listings.">
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={3}
            placeholder="e.g. Doubles, aloo pies, and corn soup. Open evenings. Delivery within Port of Spain."
            className="input-base resize-none"
          />
        </Field>
      </fieldset>

      {/* Contact */}
      <fieldset className="space-y-4">
        <legend className="text-sm font-bold uppercase tracking-wider text-muted-foreground">3. How we reach you</legend>

        <Field label="Email *">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="you@example.com"
            className="input-base"
            autoComplete="email"
          />
        </Field>

        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Phone">
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="868-555-1234"
              className="input-base"
              autoComplete="tel"
            />
          </Field>
          <Field label="WhatsApp" hint="If different from phone.">
            <input
              type="tel"
              value={whatsapp}
              onChange={(e) => setWhatsapp(e.target.value)}
              placeholder="868-555-1234"
              className="input-base"
            />
          </Field>
        </div>

        <Field label="Best way to reach you">
          <div className="flex flex-wrap gap-2">
            {(['whatsapp', 'email', 'phone'] as const).map((m) => (
              <label
                key={m}
                className={`flex cursor-pointer items-center gap-2 rounded-full border px-4 py-2 text-sm transition ${preferredContact === m ? 'border-blue-500 bg-blue-50 font-bold text-blue-700 dark:bg-blue-950 dark:text-blue-300' : 'border-border bg-card hover:border-blue-300'}`}
              >
                <input
                  type="radio"
                  name="preferredContact"
                  value={m}
                  checked={preferredContact === m}
                  onChange={() => setPreferredContact(m)}
                  className="sr-only"
                />
                {m === 'whatsapp' && <MessageCircle className="size-4" />}
                {m === 'email' && <span>✉️</span>}
                {m === 'phone' && <span>📞</span>}
                <span className="capitalize">{m}</span>
              </label>
            ))}
          </div>
        </Field>
      </fieldset>

      {/* Services */}
      <fieldset className="space-y-3">
        <legend className="text-sm font-bold uppercase tracking-wider text-muted-foreground">4. What do you need from us?</legend>
        <p className="text-xs text-muted-foreground">Pick everything that sounds useful — we&apos;ll talk it through in the quote.</p>
        <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((s) => {
            const selected = selectedServices.includes(s.id);
            return (
              <label
                key={s.id}
                className={`flex cursor-pointer items-center gap-3 rounded-xl border p-3 text-sm transition hover:shadow-sm ${selected ? 'border-blue-500 bg-blue-50 dark:bg-blue-950/30' : 'border-border bg-card hover:border-blue-300'}`}
              >
                <input
                  type="checkbox"
                  checked={selected}
                  onChange={() => toggleService(s.id)}
                  className="sr-only"
                />
                <span className={`flex size-9 shrink-0 items-center justify-center rounded-lg ${selected ? 'bg-blue-500 text-white' : 'bg-muted text-muted-foreground'}`}>
                  <s.icon className="size-5" />
                </span>
                <span className="flex-1 font-semibold">{s.label}</span>
                {selected && <CheckCircle2 className="size-4 shrink-0 text-blue-500" />}
              </label>
            );
          })}
        </div>
      </fieldset>

      {/* Submit */}
      <div className="space-y-3">
        {errorMsg && (
          <div className="rounded-xl border border-red-300 bg-red-50 p-3 text-sm text-red-800 dark:border-red-800 dark:bg-red-950/30 dark:text-red-300">
            {errorMsg} — or <a href="https://wa.me/18685550199" className="font-bold underline">WhatsApp us</a> instead.
          </div>
        )}
        <Button
          type="submit"
          size="lg"
          disabled={!formValid || submitting}
          className="w-full gap-2 text-base"
        >
          {submitting ? 'Sending…' : (<>Send my details <ArrowRight className="size-4" /></>)}
        </Button>
        <p className="text-center text-xs text-muted-foreground">
          By submitting, you agree we&apos;ll contact you about your launch. No spam, ever.
        </p>
      </div>
    </form>
  );
}

function Field({ label, hint, children }: { label: string; hint?: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-semibold">{label}</span>
      {children}
      {hint && <span className="mt-1 block text-xs text-muted-foreground">{hint}</span>}
    </label>
  );
}
