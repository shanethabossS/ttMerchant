// Central contact config for LaunchTT.
//
// The support WhatsApp number is a PLACEHOLDER until Shane provisions a dedicated
// (non-personal) line. To go live: set NEXT_PUBLIC_SUPPORT_WHATSAPP in the Vercel
// project (digits only, e.g. 18681234567) and redeploy — NO code change needed.
// Every "WhatsApp us" button reads from here, so it's a single switch.
export const SUPPORT_WHATSAPP = (process.env.NEXT_PUBLIC_SUPPORT_WHATSAPP || '18680000000').replace(/\D/g, '');

export const SUPPORT_EMAIL = 'info@sovdigitalgroup.com';
export const FOUNDER_EMAIL = 'databosstt@gmail.com';

/** Build a wa.me click-to-chat URL with an optional pre-filled message. */
export function supportWhatsAppUrl(text?: string): string {
  const base = `https://wa.me/${SUPPORT_WHATSAPP}`;
  return text ? `${base}?text=${encodeURIComponent(text)}` : base;
}
