import { DriverWizard } from '@/components/intake/DriverWizard';

export const metadata = {
  title: 'Driver Signup - SOV Connect',
  description: 'Join the SOV delivery and driver network in Trinidad & Tobago. Fast signup, flexible hours.',
};

export default function DriverJoinPage() {
  return (
    <div className="mx-auto w-full max-w-5xl px-4 py-8 md:py-12">
      <DriverWizard />
    </div>
  );
}
