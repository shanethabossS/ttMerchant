export const metadata = {
  title: 'About LaunchTT',
  description: 'Learn about LaunchTT, the Trinidad and Tobago business launch platform from Sovereign Digital Group.',
};

export default function AboutPage() {
  return (
    <div className="container mx-auto max-w-3xl px-4 py-12">
      <h1 className="text-4xl font-black tracking-tight">About LaunchTT</h1>
      <div className="mt-6 space-y-4 leading-7 text-muted-foreground">
        <p>
          LaunchTT is a Trinidad and Tobago business launch platform built for small businesses that need
          a professional online presence without piecing everything together themselves.
        </p>
        <p>
          We help neighborhood shops, food vendors, mechanics, salons, contractors, consultants, and
          service providers get online with websites, ordering flows, listings, KYC-backed trust, and
          practical launch support.
        </p>
        <p>
          Powered by Sovereign Digital Group Limited, LaunchTT shares trust infrastructure, KYC verification,
          and ecosystem access across the wider SOV network of Trinidad and Tobago digital products.
        </p>
      </div>
    </div>
  );
}
