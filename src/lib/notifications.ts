type SendEmailInput = {
  to: string | string[];
  subject: string;
  text: string;
  html?: string;
};

function asArray(value: string | string[]) {
  return Array.isArray(value) ? value : [value];
}

export async function sendEmail(input: SendEmailInput) {
  const resendKey = process.env.RESEND_API_KEY;
  const from = process.env.NOTIFY_FROM_EMAIL || process.env.RESEND_FROM_EMAIL || 'noreply@sovdigitalgroup.com';

  if (resendKey) {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${resendKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from,
        to: asArray(input.to),
        subject: input.subject,
        text: input.text,
        html: input.html,
      }),
    });

    if (!res.ok) {
      const raw = await res.text().catch(() => res.statusText);
      throw new Error(`Resend error: ${raw}`);
    }

    return { provider: 'resend' as const };
  }

  return { provider: 'none' as const, skipped: true };
}

export async function maybeSendWhatsApp(phone: string, text: string) {
  const evolutionUrl = process.env.EVOLUTION_API_URL;
  const evolutionToken = process.env.EVOLUTION_API_TOKEN;
  const evolutionInstance = process.env.EVOLUTION_INSTANCE;

  if (evolutionUrl && evolutionToken && evolutionInstance) {
    const res = await fetch(`${evolutionUrl.replace(/\/$/, '')}/message/sendText/${evolutionInstance}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        apikey: evolutionToken,
      },
      body: JSON.stringify({ number: phone, text }),
    });
    if (!res.ok) throw new Error(`Evolution WhatsApp error: ${await res.text()}`);
    return { provider: 'evolution' as const };
  }

  const chatwootUrl = process.env.CHATWOOT_URL;
  const chatwootToken = process.env.CHATWOOT_API_TOKEN;
  if (chatwootUrl && chatwootToken) {
    return { provider: 'chatwoot-hook-present' as const, skipped: true };
  }

  return { provider: 'none' as const, skipped: true };
}
