'use client';

import { useEffect, useState } from 'react';
import { ShieldCheck, Gift } from 'lucide-react';
import { useAuth } from '@/lib/auth-context';

export function KycBadge() {
  const { user } = useAuth();
  const [kycVerified, setKycVerified] = useState(false);
  const [checking, setChecking] = useState(false);

  useEffect(() => {
    if (!user?.email) return;
    setChecking(true);
    // Check if user is KYC verified on any SOV platform
    fetch(`/api/auth/me`, { cache: 'no-store' })
      .then((r) => r.json())
      .then((data) => {
        if (data?.kyc_status === 'verified' || data?.user?.kyc_status === 'verified') {
          setKycVerified(true);
        }
      })
      .catch(() => {})
      .finally(() => setChecking(false));
  }, [user?.email]);

  if (checking || !user) return null;

  if (kycVerified) {
    return (
      <div className="flex items-start gap-3 rounded-xl border border-emerald-300 bg-emerald-50 p-4 dark:border-emerald-700 dark:bg-emerald-950">
        <ShieldCheck className="mt-0.5 size-6 shrink-0 text-emerald-600 dark:text-emerald-400" />
        <div>
          <p className="font-bold text-emerald-900 dark:text-emerald-200">SOV Verified Member</p>
          <p className="text-sm text-emerald-700 dark:text-emerald-400">
            Your identity is already verified from another SOV platform. You&apos;re eligible for onboarding bonuses!
          </p>
          <div className="mt-2 inline-flex items-center gap-1.5 rounded-full bg-emerald-200 px-3 py-1 text-xs font-bold text-emerald-800 dark:bg-emerald-800 dark:text-emerald-200">
            <Gift className="size-3.5" />
            Bonus eligible
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-start gap-3 rounded-xl border border-blue-200 bg-blue-50 p-4 dark:border-blue-800 dark:bg-blue-950">
      <ShieldCheck className="mt-0.5 size-5 shrink-0 text-blue-500 dark:text-blue-400" />
      <div>
        <p className="text-sm font-semibold text-blue-900 dark:text-blue-200">Already verified on another SOV site?</p>
        <p className="text-sm text-blue-700 dark:text-blue-400">
          Sign in with the same email to unlock your verified status and bonus perks.
        </p>
      </div>
    </div>
  );
}
