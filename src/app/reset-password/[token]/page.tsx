import ResetPasswordForm from './ResetPasswordForm';

// This URL carries a one-time reset token. If a crawler indexes it the token lands
// in a search result, and anything that caches the response holds a live credential.
export const dynamic = 'force-dynamic';
export const metadata = { robots: { index: false, follow: false } };

export default async function ResetPasswordPage({
  params,
}: {
  params: Promise<{ token: string }>;
}) {
  const { token } = await params;
  return <ResetPasswordForm token={token} />;
}
