'use client';

import { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { CheckCircle2, Loader2, MessageCircle, Phone } from 'lucide-react';

type Props = {
  phone: string;
  whatsapp: string;
  onVerified: (method: 'sms' | 'whatsapp') => void;
};

export function PhoneVerification({ phone, whatsapp, onVerified }: Props) {
  const [method, setMethod] = useState<'sms' | 'whatsapp' | null>(null);
  const [sent, setSent] = useState(false);
  const [code, setCode] = useState(['', '', '', '', '', '']);
  const [loading, setLoading] = useState(false);
  const [verified, setVerified] = useState(false);
  const [error, setError] = useState('');
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  async function sendCode(via: 'sms' | 'whatsapp') {
    setMethod(via);
    setLoading(true);
    setError('');
    // Placeholder — in production this calls a real OTP API
    await new Promise((r) => setTimeout(r, 800));
    setSent(true);
    setLoading(false);
  }

  function handleDigit(index: number, value: string) {
    if (!/^\d?$/.test(value)) return;
    const next = [...code];
    next[index] = value;
    setCode(next);
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  }

  function handleKeyDown(index: number, e: React.KeyboardEvent) {
    if (e.key === 'Backspace' && !code[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  }

  async function verifyCode() {
    setLoading(true);
    setError('');
    const otp = code.join('');
    if (otp.length < 6) {
      setError('Enter the full 6-digit code');
      setLoading(false);
      return;
    }
    // Placeholder verification — accept any 6-digit code for now
    await new Promise((r) => setTimeout(r, 600));
    setVerified(true);
    setLoading(false);
    onVerified(method!);
  }

  if (verified) {
    return (
      <div className="flex items-center gap-3 rounded-xl border border-emerald-300 bg-emerald-50 p-4 dark:border-emerald-700 dark:bg-emerald-950">
        <CheckCircle2 className="size-6 text-emerald-600 dark:text-emerald-400" />
        <div>
          <p className="font-bold text-emerald-900 dark:text-emerald-200">Phone verified</p>
          <p className="text-sm text-emerald-700 dark:text-emerald-400">via {method === 'whatsapp' ? 'WhatsApp' : 'SMS'}</p>
        </div>
      </div>
    );
  }

  if (!sent) {
    return (
      <div className="space-y-3">
        <p className="text-sm font-semibold">Verify your phone number</p>
        <p className="text-sm text-muted-foreground">We&apos;ll send a 6-digit code to confirm your number.</p>
        <div className="flex flex-wrap gap-2">
          {whatsapp && (
            <Button variant="outline" onClick={() => sendCode('whatsapp')} disabled={loading} className="gap-2">
              {loading && method === 'whatsapp' ? <Loader2 className="size-4 animate-spin" /> : <MessageCircle className="size-4" />}
              Verify via WhatsApp
            </Button>
          )}
          {phone && (
            <Button variant="outline" onClick={() => sendCode('sms')} disabled={loading} className="gap-2">
              {loading && method === 'sms' ? <Loader2 className="size-4 animate-spin" /> : <Phone className="size-4" />}
              Verify via SMS
            </Button>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <p className="text-sm font-semibold">Enter the 6-digit code</p>
      <p className="text-sm text-muted-foreground">Sent to {method === 'whatsapp' ? whatsapp : phone} via {method === 'whatsapp' ? 'WhatsApp' : 'SMS'}</p>
      <div className="flex gap-2">
        {code.map((digit, i) => (
          <Input
            key={i}
            ref={(el) => { inputRefs.current[i] = el; }}
            className="size-12 text-center text-lg font-bold"
            maxLength={1}
            inputMode="numeric"
            value={digit}
            onChange={(e) => handleDigit(i, e.target.value)}
            onKeyDown={(e) => handleKeyDown(i, e)}
          />
        ))}
      </div>
      {error && <p className="text-sm text-destructive">{error}</p>}
      <div className="flex gap-2">
        <Button onClick={verifyCode} disabled={loading}>
          {loading ? <Loader2 className="size-4 animate-spin" /> : 'Verify'}
        </Button>
        <Button variant="ghost" onClick={() => { setSent(false); setCode(['', '', '', '', '', '']); setMethod(null); }}>
          Resend code
        </Button>
      </div>
    </div>
  );
}
