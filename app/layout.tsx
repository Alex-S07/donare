import "./globals.css";
import { ReactNode } from "react";
import Navbar from "@/components/navigation/navbar";
import ErrorBoundary from "@/components/error-boundary";
import { Toaster } from "@/components/ui/sonner";

export const metadata = {
  title: "Donare - Connecting Hearts, Changing Lives",
  description: "A donation platform connecting donors with people in need. Share resources, support communities, and make a difference through the power of giving.",
  keywords: "donation, charity, community support, financial aid, clothing donation, education support, medical assistance",
  authors: [{ name: "Donare Team" }],
  creator: "Donare",
  publisher: "Donare",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
  },
  metadataBase: new URL('https://donare.org'),
  openGraph: {
    title: 'Donare - Connecting Hearts, Changing Lives',
    description: 'A donation platform connecting donors with people in need.',
    url: 'https://donare.org',
    siteName: 'Donare',
    images: [
      {
        url: '/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Donare - Donation Platform',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Donare - Connecting Hearts, Changing Lives',
    description: 'A donation platform connecting donors with people in need.',
    images: ['/images/og-image.jpg'],
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#2563eb" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body className="font-sans antialiased">
        <ErrorBoundary>
          <Navbar />
          <main role="main">
            {children}
          </main>
          <Toaster />
        </ErrorBoundary>
      </body>
    </html>
  );
}
