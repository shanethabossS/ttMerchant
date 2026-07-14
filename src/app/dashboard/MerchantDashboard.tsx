'use client';

import Link from 'next/link';
import { FormEvent, useCallback, useEffect, useState } from 'react';
import { Loader2, Plus, Store, WalletCards } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { apiFetch } from '@/lib/api';
import { useAuth } from '@/lib/auth-context';

type CatalogItem = { id: string; title: string; description: string | null; item_type: 'product' | 'service'; price_ttd: number | string | null; active: boolean };
type Merchant = { id: string; business_name: string; category: string | null; status: string; service_area: string | null };
type Subscription = { plan_id: string; status: string; current_period_end: string | null };
type MerchantState = { merchant: Merchant | null; catalog_items: CatalogItem[]; subscription: Subscription | null; entitlements: { source_app: string }[] };

const planLabels: Record<string, string> = {
  launchtt_free: 'Free',
  launchtt_pro: 'Pro — TT$149/month',
  launchtt_business: 'Business — TT$399/month',
};

export function MerchantDashboard() {
  const { user, loading: authLoading } = useAuth();
  const [state, setState] = useState<MerchantState | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');

  const load = useCallback(async () => {
    if (!user) return;
    setLoading(true);
    const result = await apiFetch<MerchantState>('/api/merchants/me', { cache: 'no-store' });
    if (result.error) setError(result.error);
    else {
      setState(result.data);
      setError(null);
    }
    setLoading(false);
  }, [user]);

  useEffect(() => {
    queueMicrotask(() => { void load(); });
  }, [load]);

  async function addCatalogItem(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!title.trim() || saving) return;
    setSaving(true);
    const result = await apiFetch<{ catalog_item: CatalogItem }>('/api/merchants/me/catalog', {
      method: 'POST',
      body: JSON.stringify({ title: title.trim(), description: description.trim(), item_type: 'service', price_ttd: price.trim() || null }),
    });
    if (result.error) setError(result.error);
    else {
      setTitle('');
      setPrice('');
      setDescription('');
      await load();
    }
    setSaving(false);
  }

  if (authLoading || loading) {
    return <div className="mx-auto flex max-w-5xl items-center justify-center px-4 py-20 text-muted-foreground"><Loader2 className="mr-2 size-5 animate-spin" /> Loading your business...</div>;
  }

  if (!user) {
    return <div className="mx-auto max-w-3xl px-4 py-14 text-center"><h1 className="text-3xl font-black tracking-tight">Your business dashboard</h1><p className="mt-3 text-muted-foreground">Sign in to manage your business profile, services, and plan.</p><Link href="/login" className="mt-6 inline-block rounded-lg bg-primary px-4 py-2 font-semibold text-primary-foreground">Sign in</Link></div>;
  }

  if (!state?.merchant) {
    return <div className="mx-auto max-w-3xl px-4 py-14 text-center"><h1 className="text-3xl font-black tracking-tight">Finish your business intake</h1><p className="mt-3 text-muted-foreground">Submit your details once and this dashboard will manage your business from there.</p><Link href="/join/business" className="mt-6 inline-block rounded-lg bg-primary px-4 py-2 font-semibold text-primary-foreground">Continue intake</Link></div>;
  }

  const planName = state.subscription ? planLabels[state.subscription.plan_id] || state.subscription.plan_id : 'No active plan';
  return (
    <div className="mx-auto max-w-5xl space-y-8 px-4 py-10">
      <header className="flex flex-col gap-4 rounded-2xl border border-border bg-card p-6 sm:flex-row sm:items-center sm:justify-between">
        <div><p className="text-sm font-bold uppercase tracking-[0.18em] text-primary">Merchant dashboard</p><h1 className="mt-1 text-3xl font-black tracking-tight">{state.merchant.business_name}</h1><p className="mt-2 text-sm text-muted-foreground">{state.merchant.category || 'Business profile'}{state.merchant.service_area ? ` · ${state.merchant.service_area}` : ''}</p></div>
        <span className="inline-flex w-fit rounded-full bg-muted px-3 py-1 text-sm font-semibold capitalize">{state.merchant.status}</span>
      </header>

      {error ? <p className="rounded-lg border border-destructive/30 bg-destructive/10 px-3 py-2 text-sm text-destructive">{error}</p> : null}

      <div className="grid gap-4 md:grid-cols-3">
        <section className="rounded-2xl border border-border bg-card p-5"><WalletCards className="size-5 text-primary" /><p className="mt-3 text-sm text-muted-foreground">Current plan</p><p className="mt-1 font-bold">{planName}</p><p className="mt-2 text-xs text-muted-foreground">Paid plan activation will appear here after payment setup is live.</p></section>
        <section className="rounded-2xl border border-border bg-card p-5"><Store className="size-5 text-primary" /><p className="mt-3 text-sm text-muted-foreground">Catalog</p><p className="mt-1 text-2xl font-black">{state.catalog_items.length}</p><p className="mt-1 text-xs text-muted-foreground">Services or products published in your business profile.</p></section>
        <section className="rounded-2xl border border-border bg-card p-5"><p className="text-sm text-muted-foreground">SOV Invoice</p><p className="mt-1 font-bold">Ready when you are</p><p className="mt-2 text-xs text-muted-foreground">Create and track invoices from the SOV Invoice app.</p><a href="https://sov-invoice-saas.vercel.app" className="mt-3 inline-block text-sm font-semibold text-primary hover:underline">Open SOV Invoice</a></section>
      </div>

      <section className="rounded-2xl border border-border bg-card p-6">
        <div className="flex items-center justify-between gap-3"><div><h2 className="text-xl font-black">Your services and products</h2><p className="mt-1 text-sm text-muted-foreground">Add what customers can ask for through your business profile.</p></div></div>
        <form onSubmit={addCatalogItem} className="mt-5 grid gap-3 md:grid-cols-[1fr_10rem_auto]">
          <Input aria-label="Service or product name" value={title} onChange={(event) => setTitle(event.target.value)} placeholder="e.g. Catering package" maxLength={160} />
          <Input aria-label="Price in TTD" value={price} onChange={(event) => setPrice(event.target.value)} placeholder="Price (TTD)" inputMode="decimal" />
          <Button type="submit" disabled={saving}>{saving ? <Loader2 className="size-4 animate-spin" /> : <Plus className="size-4" />} Add item</Button>
          <textarea aria-label="Item description" value={description} onChange={(event) => setDescription(event.target.value)} placeholder="Short description (optional)" className="min-h-20 rounded-md border border-input bg-background px-3 py-2 text-sm md:col-span-3" maxLength={4000} />
        </form>
        <div className="mt-5 divide-y divide-border rounded-xl border border-border">
          {state.catalog_items.length ? state.catalog_items.map((item) => <div key={item.id} className="flex items-start justify-between gap-4 p-4"><div><p className="font-semibold">{item.title}</p>{item.description ? <p className="mt-1 text-sm text-muted-foreground">{item.description}</p> : null}</div><p className="whitespace-nowrap text-sm font-bold">{item.price_ttd == null ? 'Quote' : `TT$${Number(item.price_ttd).toFixed(2)}`}</p></div>) : <p className="p-4 text-sm text-muted-foreground">No services or products added yet.</p>}
        </div>
      </section>
    </div>
  );
}
