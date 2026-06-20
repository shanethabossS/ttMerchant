import { IntakeWizard } from '@/components/intake/IntakeWizard';

export const metadata = {
  title: 'Business Signup for Trinidad and Tobago',
  description: 'Create your LaunchTT business account and start onboarding for website design, ordering, bookings, and launch support in Trinidad and Tobago.',
};

export default async function BusinessJoinPage({
  searchParams,
}: {
  searchParams: Promise<{ entity?: string | string[] }>;
}) {
  const params = await searchParams;
  const entity = Array.isArray(params.entity) ? params.entity[0] : params.entity;

  return (
    <div className="mx-auto w-full max-w-5xl px-4 py-8 md:py-12">
      <IntakeWizard initialEntity={entity} />
    </div>
  );
}
