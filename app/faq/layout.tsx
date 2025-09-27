import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Frequently Asked Questions - Donare',
  description: 'Find answers to common questions about Donare donation platform. Learn about donations, authentication, verification, and platform features.',
  keywords: 'FAQ, frequently asked questions, donation help, platform support, user guide, troubleshooting',
  openGraph: {
    title: 'Frequently Asked Questions - Donare',
    description: 'Find answers to common questions about Donare donation platform.',
    url: 'https://donare.org/faq',
  },
};

export default function FAQLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
