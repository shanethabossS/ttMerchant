'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/lib/auth-context';
import { signIn } from 'next-auth/react';
import { ArrowLeft, Briefcase, Building2, Handshake, HeartHandshake, User } from 'lucide-react';

type EntityType = 'personal' | 'sole_prop' | 'partnership' | 'llc' | 'ngo';

const ENTITY_OPTIONS: {
  key: EntityType;
  title: string;
  blurb: string;
  icon: React.ComponentType<{ className?: string }>;
  extraFields: { key: string; label: string; type: string; placeholder: string; required?: boolean }[];
}[] = [
  {
    key: 'personal',
    title: 'Personal account',
    blurb: 'Browse, post a few listings, donate, hire help. No business setup.',
    icon: User,
    extraFields: [],
  },
  {
    key: 'sole_prop',
    title: 'Sole proprietor',
    blurb: 'You run the business in your own name — one person, one BIR file.',
    icon: Briefcase,
    extraFields: [
      { key: 'business_name', label: 'Trading name', type: 'text', placeholder: 'e.g. Shane’s Auto Repair', required: true },
      { key: 'bir_number', label: 'BIR number', type: 'text', placeholder: 'BIR file number', required: false },
    ],
  },
  {
    key: 'partnership',
    title: 'Partnership',
    blurb: 'Two or more people running the business together under a partnership agreement.',
    icon: Handshake,
    extraFields: [
      { key: 'business_name', label: 'Partnership name', type: 'text', placeholder: 'Registered partnership name', required: true },
      { key: 'bir_number', label: 'BIR number', type: 'text', placeholder: 'BIR file number', required: false },
      { key: 'partners_count', label: 'Number of partners', type: 'number', placeholder: '2', required: false },
    ],
  },
  {
    key: 'llc',
    title: 'Limited liability (Ltd / LLC)',
    blurb: 'Registered limited company with the Registrar — separate legal entity.',
    icon: Building2,
    extraFields: [
      { key: 'business_name', label: 'Company name', type: 'text', placeholder: 'e.g. Sovereign Digital Group Ltd', required: true },
      { key: 'company_number', label: 'Company / registrar number', type: 'text', placeholder: 'Companies Registry number', required: false },
      { key: 'bir_number', label: 'BIR number', type: 'text', placeholder: 'BIR file number', required: false },
    ],
  },
  {
    key: 'ngo',
    title: 'NGO / Non-profit',
    blurb: 'Registered NGO, church, charity, or community organisation.',
    icon: HeartHandshake,
    extraFields: [
      { key: 'business_name', label: 'Organisation name', type: 'text', placeholder: 'Registered NGO name', required: true },
      { key: 'ngo_registration', label: 'Registration / charity number', type: 'text', placeholder: 'Registration number', required: false },
    ],
  },
];

export default function SignupPage() {
  const router = useRouter();
  const { refresh } = useAuth();

  const [entity, setEntity] = useState<EntityType | null>(null);
  const [form, setForm] = useState<Record<string, string>>({
    full_name: '',
    email: '',
    phone: '',
    whatsapp_number: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const baseFields: { key: string; label: string; type: string; placeholder: string }[] = [
    { key: 'full_name', label: 'Full name', type: 'text', placeholder: 'Your full name' },
    { key: 'email', label: 'Email', type: 'email', placeholder: 'you@email.com' },
    { key: 'phone', label: 'Phone', type: 'text', placeholder: '1-868-555-1234' },
    { key: 'whatsapp_number', label: 'WhatsApp number', type: 'text', placeholder: '1-868-555-1234' },
    { key: 'password', label: 'Password', type: 'password', placeholder: 'Min 8 characters' },
  ];

  const chosen = ENTITY_OPTIONS.find((o) => o.key === entity);
  const extraFields = chosen?.extraFields ?? [];

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    const payload = { ...form, entity_type: entity };
    const res = await fetch('/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    const data = await res.json();
    setLoading(false);
    if (!res.ok) return setMessage(data.error || 'Registration failed');
    await refresh();
    router.push('/');
  }

  // Step 1 — entity chooser
  if (!entity) {
    return (
      <div className="mx-auto w-full max-w-3xl px-4 py-10">
        <div className="mb-7 text-center">
          <h1 className="text-3xl font-black tracking-tight md:text-4xl">Sign up</h1>
          <p className="mx-auto mt-2 max-w-xl text-sm text-muted-foreground">
            Tell us how you’re setting up. We’ll show you the right form — and the right paperwork
            to keep handy.
          </p>
        </div>

        <div className="grid gap-3 md:grid-cols-2">
          {ENTITY_OPTIONS.map((o) => {
            const Icon = o.icon;
            return (
              <button
                key={o.key}
                type="button"
                onClick={() => setEntity(o.key)}
                className="group flex items-start gap-4 rounded-2xl border border-border bg-card p-5 text-left transition hover:border-blue-500/50 hover:bg-muted"
              >
                <span className="flex size-11 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500/15 to-cyan-500/15 text-blue-600 dark:text-cyan-300">
                  <Icon className="size-5" />
                </span>
                <span className="min-w-0">
                  <span className="block text-base font-bold group-hover:text-foreground">{o.title}</span>
                  <span className="mt-1 block text-sm text-muted-foreground">{o.blurb}</span>
                </span>
              </button>
            );
          })}
        </div>

        <p className="mt-6 text-center text-sm text-muted-foreground">
          Already have an account?{' '}
          <Link href="/login" className="text-primary underline">
            Sign in
          </Link>
        </p>
      </div>
    );
  }

  // Step 2 — form
  return (
    <div className="mx-auto flex w-full max-w-lg flex-1 items-center px-4 py-10">
      <div className="w-full space-y-4 rounded-2xl border border-border bg-card p-6">
        <button
          type="button"
          onClick={() => setEntity(null)}
          className="flex items-center gap-1 text-xs font-semibold text-muted-foreground transition hover:text-foreground"
        >
          <ArrowLeft className="size-3.5" /> Change account type
        </button>

        <div className="text-center">
          <h1 className="text-2xl font-black tracking-tight">Create your account</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Signing up as <span className="font-semibold text-foreground">{chosen?.title}</span>
          </p>
        </div>

        <Button
          variant="outline"
          className="w-full gap-2"
          onClick={() => signIn('google', { callbackUrl: '/' })}
        >
          <svg className="size-4" viewBox="0 0 24 24">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4" />
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
          </svg>
          Continue with Google
        </Button>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t border-border" />
          </div>
          <div className="relative flex justify-center">
            <span className="bg-card px-3 text-xs text-muted-foreground">or sign up with email</span>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3">
          {message ? (
            <p className="rounded bg-destructive/10 px-3 py-2 text-sm text-destructive">{message}</p>
          ) : null}

          {baseFields.map((f) => (
            <div key={f.key}>
              <Label>{f.label}</Label>
              <Input
                type={f.type}
                value={form[f.key] ?? ''}
                onChange={(e) => setForm((prev) => ({ ...prev, [f.key]: e.target.value }))}
                className="mt-1"
                required
                placeholder={f.placeholder}
              />
            </div>
          ))}

          {extraFields.length > 0 ? (
            <div className="space-y-3 rounded-lg border border-border bg-muted/40 p-3">
              <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
                {chosen?.title} details
              </p>
              {extraFields.map((f) => (
                <div key={f.key}>
                  <Label>{f.label}</Label>
                  <Input
                    type={f.type}
                    value={form[f.key] ?? ''}
                    onChange={(e) => setForm((prev) => ({ ...prev, [f.key]: e.target.value }))}
                    className="mt-1"
                    required={f.required}
                    placeholder={f.placeholder}
                  />
                </div>
              ))}
            </div>
          ) : null}

          <Button disabled={loading} className="w-full">
            {loading ? 'Creating account...' : 'Create account'}
          </Button>
        </form>

        <p className="text-center text-sm text-muted-foreground">
          Already have an account?{' '}
          <Link href="/login" className="text-primary underline">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
