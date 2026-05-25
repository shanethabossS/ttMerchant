import { IntakeWizard } from '@/components/intake/IntakeWizard';

export const metadata = {
  title: 'Business Signup - SOV Connect',
  description: 'Get your Trinidad business online in minutes. Free onboarding powered by Sovereign Digital Group.',
};

export default function BusinessJoinPage() {
  return (
    <div className="mx-auto w-full max-w-5xl px-4 py-8 md:py-12">
      <IntakeWizard />
    </div>
  );
}
