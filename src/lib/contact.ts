// Company work line, provided by Shane on 2026-10-08.
export const SUPPORT_WHATSAPP = (process.env.NEXT_PUBLIC_SUPPORT_WHATSAPP || '18682593200').replace(/\D/g, '');

export const SUPPORT_EMAIL = 'info@sovdigitalgroup.com';
export const FOUNDER_EMAIL = 'databosstt@gmail.com';

/** Build a wa.me click-to-chat URL with an optional pre-filled message. */
export function supportWhatsAppUrl(text?: string): string {
  const base = `https://wa.me/${SUPPORT_WHATSAPP}`;
  return text ? `${base}?text=${encodeURIComponent(text)}` : base;
}
