import { DriverWizard } from '@/components/intake/DriverWizard';

export const metadata = {
  title: 'Delivery Driver Signup in Trinidad and Tobago',
  description: 'Apply to drive with LaunchTT and the SOV delivery network in Trinidad and Tobago. Grouped deliveries, safer routes, and flexible work.',
};

export default function DriverJoinPage() {
  return (
    <div className="mx-auto w-full max-w-5xl px-4 py-8 md:py-12">
      <DriverWizard />
    </div>
  );
}
