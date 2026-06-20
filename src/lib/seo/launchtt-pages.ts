export type LaunchttServicePage = {
  slug: string;
  name: string;
  shortTitle: string;
  metaTitle: string;
  description: string;
  keywords: string[];
  hero: string;
  intro: string;
  benefits: string[];
  useCases: string[];
  faq: Array<{ q: string; a: string }>;
};

export type LaunchttLocationPage = {
  slug: string;
  name: string;
  title: string;
  description: string;
  keywords: string[];
  hero: string;
  intro: string;
  businessTypes: string[];
  faq: Array<{ q: string; a: string }>;
};

export const LAUNCHTT_SERVICE_PAGES: LaunchttServicePage[] = [
  {
    slug: 'website-design',
    name: 'Website Design',
    shortTitle: 'Website design',
    metaTitle: 'Website Design in Trinidad and Tobago',
    description:
      'Professional website design for Trinidad and Tobago businesses, with mobile-first builds, local SEO foundations, and done-for-you launch support.',
    keywords: [
      'website design Trinidad',
      'website design Trinidad and Tobago',
      'small business website Trinidad',
      'web designer Trinidad',
    ],
    hero: 'Website design that helps Trinidad businesses look credible and get found.',
    intro:
      'LaunchTT builds mobile-first websites for Trinidad and Tobago businesses that need something clean, fast, and built to convert real local traffic.',
    benefits: [
      'Mobile-first layouts that work well on the phones your customers actually use',
      'Built-in WhatsApp, call, map, and contact actions',
      'Local SEO foundations, metadata, sitemap support, and search-friendly structure',
      'Clear launch process without making you manage the technical stack yourself',
    ],
    useCases: [
      'Restaurants and food vendors',
      'Salons and barbers',
      'Mechanics and contractors',
      'Consultants, agencies, and small service businesses',
    ],
    faq: [
      {
        q: 'Do you build websites for small businesses in Trinidad?',
        a: 'Yes. LaunchTT is designed specifically for Trinidad and Tobago businesses that need a professional website without hiring a full internal web team.',
      },
      {
        q: 'Will my website work on mobile phones?',
        a: 'Yes. Mobile-first design is one of the core parts of the LaunchTT website build process.',
      },
    ],
  },
  {
    slug: 'online-ordering',
    name: 'Online Ordering',
    shortTitle: 'Online ordering',
    metaTitle: 'Online Ordering Setup in Trinidad and Tobago',
    description:
      'Online ordering setup for Trinidad and Tobago businesses, including menus, product flows, WhatsApp integration, and launch support.',
    keywords: [
      'online ordering Trinidad',
      'food ordering website Trinidad',
      'WhatsApp ordering Trinidad',
      'online store Trinidad',
    ],
    hero: 'Online ordering that feels simple for customers and manageable for local business owners.',
    intro:
      'LaunchTT helps Trinidad and Tobago businesses move from manual order-taking into cleaner digital ordering flows with better structure and clearer customer actions.',
    benefits: [
      'Menu and product presentation that is easier to browse on mobile',
      'Ordering flows connected to WhatsApp and customer contact channels',
      'Support for food businesses, retailers, and service-based ordering models',
      'Launch guidance that fits local business operations instead of generic templates',
    ],
    useCases: [
      'Restaurants and takeout spots',
      'Home-based food vendors',
      'Shops selling products by message or delivery',
      'Businesses that want cleaner WhatsApp order handling',
    ],
    faq: [
      {
        q: 'Can LaunchTT help my restaurant take orders online in Trinidad?',
        a: 'Yes. LaunchTT supports online ordering setup for restaurants, food vendors, and similar businesses in Trinidad and Tobago.',
      },
      {
        q: 'Does LaunchTT work with WhatsApp ordering?',
        a: 'Yes. WhatsApp integration is one of the main ways we help businesses handle local inquiries and orders more smoothly.',
      },
    ],
  },
  {
    slug: 'business-launch',
    name: 'Business Launch Support',
    shortTitle: 'Business launch',
    metaTitle: 'Business Launch Support in Trinidad and Tobago',
    description:
      'Done-for-you business launch support in Trinidad and Tobago, covering websites, listings, ordering, bookings, KYC guidance, and platform setup.',
    keywords: [
      'business launch Trinidad',
      'get my business online Trinidad',
      'digital setup Trinidad',
      'business setup online Trinidad',
    ],
    hero: 'A done-for-you launch path for Trinidad and Tobago businesses that want to get online properly.',
    intro:
      'LaunchTT brings together the main pieces many local businesses need: website setup, ordering, bookings, invoicing, listings, and a clearer online presence.',
    benefits: [
      'One guided onboarding path instead of juggling disconnected tools',
      'Support for websites, bookings, invoicing, and ecosystem access',
      'Trinidad-focused setup language and local business positioning',
      'Practical next steps for KYC, project status, and launch progress',
    ],
    useCases: [
      'New businesses going online for the first time',
      'Existing businesses upgrading from manual workflows',
      'Teams that need done-for-you setup rather than self-service tools',
      'Businesses that want one launch partner instead of multiple vendors',
    ],
    faq: [
      {
        q: 'What does LaunchTT include for a business launch?',
        a: 'LaunchTT can include website setup, online ordering, bookings, invoicing, listings, and guided onboarding depending on what your business needs.',
      },
      {
        q: 'Is LaunchTT only for new businesses?',
        a: 'No. It also works for existing Trinidad and Tobago businesses that want to clean up or modernize how they operate online.',
      },
    ],
  },
];

export const LAUNCHTT_LOCATION_PAGES: LaunchttLocationPage[] = [
  {
    slug: 'port-of-spain',
    name: 'Port of Spain',
    title: 'LaunchTT for Port of Spain Businesses',
    description:
      'Website design, online ordering, and business launch support for businesses in Port of Spain, Trinidad.',
    keywords: [
      'website design Port of Spain',
      'online ordering Port of Spain',
      'business website Port of Spain',
    ],
    hero: 'LaunchTT helps Port of Spain businesses get online with clearer digital systems.',
    intro:
      'From small shops to service providers, LaunchTT supports Port of Spain businesses that want a better website, cleaner ordering, and a stronger online presence.',
    businessTypes: ['Restaurants', 'Retail shops', 'Consultants', 'Salons'],
    faq: [
      {
        q: 'Do you work with businesses in Port of Spain?',
        a: 'Yes. LaunchTT supports Port of Spain businesses with websites, ordering, launch support, and local-friendly onboarding.',
      },
    ],
  },
  {
    slug: 'san-fernando',
    name: 'San Fernando',
    title: 'LaunchTT for San Fernando Businesses',
    description:
      'Website design, online ordering, and business launch support for businesses in San Fernando, Trinidad.',
    keywords: [
      'website design San Fernando',
      'online ordering San Fernando',
      'business website San Fernando',
    ],
    hero: 'LaunchTT helps San Fernando businesses modernize how they show up online.',
    intro:
      'If your San Fernando business needs a website, WhatsApp-friendly ordering flow, or clearer digital setup, LaunchTT is built for that transition.',
    businessTypes: ['Food businesses', 'Mechanics', 'Contractors', 'Service providers'],
    faq: [
      {
        q: 'Can LaunchTT help businesses in South Trinidad?',
        a: 'Yes. San Fernando and the wider South Trinidad area are part of the regions LaunchTT is designed to support.',
      },
    ],
  },
  {
    slug: 'chaguanas',
    name: 'Chaguanas',
    title: 'LaunchTT for Chaguanas Businesses',
    description:
      'Website design, online ordering, and business launch support for businesses in Chaguanas, Trinidad.',
    keywords: [
      'website design Chaguanas',
      'online ordering Chaguanas',
      'business website Chaguanas',
    ],
    hero: 'LaunchTT helps Chaguanas businesses move faster online with less technical friction.',
    intro:
      'For businesses in Chaguanas that need a website, ordering, and launch support without building a full digital team, LaunchTT offers a more guided path.',
    businessTypes: ['Shops', 'Food vendors', 'Consultants', 'Growing local businesses'],
    faq: [
      {
        q: 'Do you offer website support for businesses in Chaguanas?',
        a: 'Yes. LaunchTT supports Chaguanas businesses with websites, launch support, and search-friendly digital setup.',
      },
    ],
  },
  {
    slug: 'arima',
    name: 'Arima',
    title: 'LaunchTT for Arima Businesses',
    description:
      'Website design, online ordering, and business launch support for businesses in Arima, Trinidad.',
    keywords: [
      'website design Arima',
      'online ordering Arima',
      'business website Arima',
    ],
    hero: 'LaunchTT gives Arima businesses a cleaner online launch path.',
    intro:
      'Arima businesses can use LaunchTT to get online with better structure, whether the goal is a stronger website, bookings, or more organized digital inquiries.',
    businessTypes: ['Trades', 'Retail', 'Local services', 'Independent businesses'],
    faq: [
      {
        q: 'Can Arima businesses use LaunchTT?',
        a: 'Yes. LaunchTT supports businesses across Trinidad and Tobago, including Arima and East Trinidad.',
      },
    ],
  },
  {
    slug: 'tobago',
    name: 'Tobago',
    title: 'LaunchTT for Tobago Businesses',
    description:
      'Website design, online ordering, and business launch support for businesses in Tobago.',
    keywords: [
      'website design Tobago',
      'online ordering Tobago',
      'business website Tobago',
    ],
    hero: 'LaunchTT helps Tobago businesses build a stronger digital presence.',
    intro:
      'From hospitality to services and small retail operations, LaunchTT can help Tobago businesses improve their online setup with a more guided and practical launch path.',
    businessTypes: ['Hospitality', 'Tours', 'Food businesses', 'Retail and services'],
    faq: [
      {
        q: 'Do you support businesses in Tobago?',
        a: 'Yes. Tobago is part of the service area for LaunchTT business launch and digital setup support.',
      },
    ],
  },
];

export function buildFaqJsonLd(faq: Array<{ q: string; a: string }>) {
  return {
    '@type': 'FAQPage',
    mainEntity: faq.map((item) => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.a,
      },
    })),
  };
}
