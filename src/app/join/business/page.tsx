import { IntakeWizard } from '@/components/intake/IntakeWizard';

export const metadata = {
  title: 'Business Signup - LaunchTT',
  description: 'Get your Trinidad business online in minutes. Free onboarding powered by Sovereign Digital Group.',
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
