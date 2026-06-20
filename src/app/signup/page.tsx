'use client';

import { useState, type ComponentType, type FormEvent } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';
import { ArrowLeft, Briefcase, Building2, Handshake, HeartHandshake, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/lib/auth-context';

type AccountType = 'personal' | 'business';
type EntityType = 'personal' | 'sole_prop' | 'partnership' | 'llc' | 'ngo';

type FieldConfig = {
  key: string;
  label: string;
  type: string;
  placeholder: string;
  required?: boolean;
};

type EntityOption = {
  key: EntityType;
  title: string;
  blurb: string;
  icon: ComponentType<{ className?: string }>;
  extraFields: FieldConfig[];
};

const BUSINESS_OPTIONS: EntityOption[] = [
  {
    key: 'sole_prop',
    title: 'Sole proprietor',
    blurb: 'For one-person businesses operating under a trading name or personal name.',
    icon: Briefcase,
    extraFields: [
      { key: 'business_name', label: 'Trading name', type: 'text', placeholder: "e.g. Shane's Auto Repair", required: true },
      { key: 'bir_number', label: 'BIR number', type: 'text', placeholder: 'BIR file number' },
    ],
  },
  {
    key: 'partnership',
    title: 'Partnership',
    blurb: 'For two or more partners building together under one business agreement.',
    icon: Handshake,
    extraFields: [
      { key: 'business_name', label: 'Partnership name', type: 'text', placeholder: 'Registered partnership name', required: true },
      { key: 'bir_number', label: 'BIR number', type: 'text', placeholder: 'BIR file number' },
      { key: 'partners_count', label: 'Number of partners', type: 'number', placeholder: '2' },
    ],
  },
  {
    key: 'llc',
    title: 'LLC / Ltd company',
    blurb: 'For registered limited liability companies and incorporated businesses.',
    icon: Building2,
    extraFields: [
      { key: 'business_name', label: 'Company name', type: 'text', placeholder: 'Registered company name', required: true },
      { key: 'company_number', label: 'Company number', type: 'text', placeholder: 'Companies Registry number' },
      { key: 'bir_number', label: 'BIR number', type: 'text', placeholder: 'BIR file number' },
    ],
  },
  {
    key: 'ngo',
    title: 'NGO / Non-profit',
    blurb: 'For charities, churches, community organizations, and registered NGOs.',
    icon: HeartHandshake,
    extraFields: [
      { key: 'business_name', label: 'Organization name', type: 'text', placeholder: 'Registered organization name', required: true },
      { key: 'ngo_registration', label: 'Registration number', type: 'text', placeholder: 'Registration or charity number' },
    ],
  },
];

const PERSONAL_OPTION: EntityOption = {
  key: 'personal',
  title: 'Personal account',
  blurb: 'For browsing, basic access, and joining the ecosystem without setting up a business.',
  icon: User,
  extraFields: [],
};

const BASE_FIELDS: FieldConfig[] = [
  { key: 'full_name', label: 'Full name', type: 'text', placeholder: 'Your full name', required: true },
  { key: 'email', label: 'Email', type: 'email', placeholder: 'you@email.com', required: true },
  { key: 'phone', label: 'Phone', type: 'text', placeholder: '1-868-555-1234', required: true },
  { key: 'whatsapp_number', label: 'WhatsApp number', type: 'text', placeholder: '1-868-555-1234', required: true },
  { key: 'password', label: 'Password', type: 'password', placeholder: 'Minimum 8 characters', required: true },
];

export default function SignupPage() {
  const router = useRouter();
  const { refresh } = useAuth();
  const [accountType, setAccountType] = useState<AccountType | null>(null);
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

  const selectedEntity = entity === 'personal' ? PERSONAL_OPTION : BUSINESS_OPTIONS.find((option) => option.key === entity) || null;
  const extraFields = selectedEntity?.extraFields ?? [];

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!entity) return;

    setLoading(true);
    setMessage('');

    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, entity_type: entity }),
      });
      const data = await response.json();

      if (!response.ok) {
        setMessage(data.error || 'Registration failed');
        return;
      }

      await refresh();

      if (entity === 'personal') {
        router.push('/kyc');
        return;
      }

      router.push(`/join/business?entity=${entity}`);
    } finally {
      setLoading(false);
    }
  }

  if (!accountType) {
    return (
      <div className="mx-auto w-full max-w-4xl px-4 py-10">
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="text-3xl font-black tracking-tight md:text-4xl">Sign up</h1>
          <p className="mt-3 text-sm text-muted-foreground md:text-base">
            Start with the path that matches what you are trying to do. Personal accounts are lighter.
            Business accounts open the full LaunchTT onboarding flow.
          </p>
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-2">
          <button
            type="button"
            onClick={() => {
              setAccountType('personal');
              setEntity('personal');
            }}
            className="rounded-3xl border border-border bg-card p-6 text-left transition hover:border-blue-500/40 hover:bg-muted"
          >
            <span className="flex size-12 items-center justify-center rounded-2xl bg-blue-500/10 text-blue-600 dark:text-cyan-300">
              <User className="size-6" />
            </span>
            <h2 className="mt-5 text-xl font-black">Personal</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Create an account, complete KYC, and unlock browse-first access across the SOV ecosystem.
            </p>
          </button>

          <button
            type="button"
            onClick={() => {
              setAccountType('business');
              setEntity(null);
            }}
            className="rounded-3xl border border-border bg-card p-6 text-left transition hover:border-blue-500/40 hover:bg-muted"
          >
            <span className="flex size-12 items-center justify-center rounded-2xl bg-blue-500/10 text-blue-600 dark:text-cyan-300">
              <Building2 className="size-6" />
            </span>
            <h2 className="mt-5 text-xl font-black">Business</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Set up your business account and continue into the LaunchTT intake for websites, listings,
              ordering, payments, and support.
            </p>
          </button>
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

  if (accountType === 'business' && !entity) {
    return (
      <div className="mx-auto w-full max-w-5xl px-4 py-10">
        <button
          type="button"
          onClick={() => setAccountType(null)}
          className="mb-5 inline-flex items-center gap-1 text-sm font-semibold text-muted-foreground transition hover:text-foreground"
        >
          <ArrowLeft className="size-4" />
          Back
        </button>

        <div className="mx-auto max-w-2xl text-center">
          <h1 className="text-3xl font-black tracking-tight md:text-4xl">What kind of business are you setting up?</h1>
          <p className="mt-3 text-sm text-muted-foreground md:text-base">
            Pick the structure that best matches your paperwork so we can move you into the right onboarding flow.
          </p>
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {BUSINESS_OPTIONS.map((option) => {
            const Icon = option.icon;

            return (
              <button
                key={option.key}
                type="button"
                onClick={() => setEntity(option.key)}
                className="rounded-3xl border border-border bg-card p-6 text-left transition hover:border-blue-500/40 hover:bg-muted"
              >
                <span className="flex size-12 items-center justify-center rounded-2xl bg-blue-500/10 text-blue-600 dark:text-cyan-300">
                  <Icon className="size-6" />
                </span>
                <h2 className="mt-5 text-xl font-black">{option.title}</h2>
                <p className="mt-2 text-sm text-muted-foreground">{option.blurb}</p>
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto flex w-full max-w-lg flex-1 items-center px-4 py-10">
      <div className="w-full space-y-4 rounded-3xl border border-border bg-card p-6">
        <button
          type="button"
          onClick={() => {
            setMessage('');
            if (accountType === 'business') {
              setEntity(null);
              return;
            }
            setAccountType(null);
            setEntity(null);
          }}
          className="flex items-center gap-1 text-xs font-semibold text-muted-foreground transition hover:text-foreground"
        >
          <ArrowLeft className="size-3.5" />
          Change selection
        </button>

        <div className="text-center">
          <h1 className="text-2xl font-black tracking-tight">Create your account</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Signing up as <span className="font-semibold text-foreground">{selectedEntity?.title}</span>
          </p>
        </div>

        <Button
          variant="outline"
          className="w-full gap-2"
          onClick={() => signIn('google', { callbackUrl: entity === 'personal' ? '/kyc' : `/join/business?entity=${entity}` })}
        >
          <svg className="size-4" viewBox="0 0 24 24" aria-hidden="true">
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

          {BASE_FIELDS.map((field) => (
            <div key={field.key}>
              <Label htmlFor={field.key}>{field.label}</Label>
              <Input
                id={field.key}
                type={field.type}
                value={form[field.key] ?? ''}
                onChange={(event) => setForm((previous) => ({ ...previous, [field.key]: event.target.value }))}
                className="mt-1"
                required={field.required}
                placeholder={field.placeholder}
              />
            </div>
          ))}

          {extraFields.length > 0 ? (
            <div className="space-y-3 rounded-2xl border border-border bg-muted/40 p-3">
              <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
                Business details
              </p>
              {extraFields.map((field) => (
                <div key={field.key}>
                  <Label htmlFor={field.key}>{field.label}</Label>
                  <Input
                    id={field.key}
                    type={field.type}
                    value={form[field.key] ?? ''}
                    onChange={(event) => setForm((previous) => ({ ...previous, [field.key]: event.target.value }))}
                    className="mt-1"
                    required={field.required}
                    placeholder={field.placeholder}
                  />
                </div>
              ))}
            </div>
          ) : null}

          <Button type="submit" disabled={loading} className="w-full">
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
