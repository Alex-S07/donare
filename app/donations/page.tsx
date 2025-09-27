import React from 'react';
import { Metadata } from 'next';
import DonationShowcase from '@/components/donations/donation-showcase';

export const metadata: Metadata = {
  title: 'Browse Donations - Donare',
  description: 'Discover available donations including clothes, educational materials, household items, medical supplies, and electronics. All donations are completely free of cost.',
  keywords: 'donations, free items, clothes, education, household, medical, electronics, charity, help',
  openGraph: {
    title: 'Browse Donations - Donare',
    description: 'Discover available donations including clothes, educational materials, household items, medical supplies, and electronics. All donations are completely free of cost.',
    type: 'website',
  },
};

export default function DonationsPage() {
  return (
    <div className="h-full my-12">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary/10 via-primary/5 to-transparent my-12 py-12 h-full">
        <div className="container mx-auto px-4 text-center h-full">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 py-10 h-full">
            Discover Available Donations
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-6">
            Browse through thousands of donated items across multiple categories. 
            From essential clothing to educational materials, household items to electronics - 
            find what you need or donate what others require.
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-600">
            <div className="flex items-center gap-2 px-4 py-2 bg-white/80 rounded-full border">
              <span className="w-2 h-2 bg-green-500 rounded-full"></span>
              <span>100% Free of Cost</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-white/80 rounded-full border">
              <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
              <span>Quality Assured</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-white/80 rounded-full border">
              <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
              <span>Community Verified</span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Donation Showcase */}
      <DonationShowcase />

      {/* Call to Action Section */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Ready to Make a Difference?
          </h2>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            Whether you want to donate items you no longer need or request items that could help you, 
            our platform makes it easy to connect with your community.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* For Donors */}
            <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-200">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">💝</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Want to Donate?
              </h3>
              <p className="text-gray-600 mb-6">
                Share your unused items with those who need them. Every donation makes a meaningful impact 
                in someone's life.
              </p>
              <div className="space-y-2 text-sm text-gray-600 mb-6">
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-primary rounded-full"></span>
                  <span>Quick and easy donation process</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-primary rounded-full"></span>
                  <span>Free pickup and delivery coordination</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-primary rounded-full"></span>
                  <span>Track your donation impact</span>
                </div>
              </div>
              <p className="text-xs text-gray-500 italic">
                "The best way to find yourself is to lose yourself in the service of others." - Gandhi
              </p>
            </div>

            {/* For Recipients */}
            <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-200">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🤝</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Need Assistance?
              </h3>
              <p className="text-gray-600 mb-6">
                Request items you need for yourself, your family, or your organization. 
                Our community is here to support you.
              </p>
              <div className="space-y-2 text-sm text-gray-600 mb-6">
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-primary rounded-full"></span>
                  <span>Simple application process</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-primary rounded-full"></span>
                  <span>Verified and quality items</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-primary rounded-full"></span>
                  <span>Respectful and dignified process</span>
                </div>
              </div>
              <p className="text-xs text-gray-500 italic">
                "No one has ever become poor by giving." - Anne Frank
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
            Frequently Asked Questions
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="space-y-6">
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">
                  Are all donations really free?
                </h3>
                <p className="text-gray-600 text-sm">
                  Yes, absolutely! All items on our platform are donated free of cost. 
                  There are no hidden charges or fees for recipients.
                </p>
              </div>
              
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">
                  How do I know if items are in good condition?
                </h3>
                <p className="text-gray-600 text-sm">
                  Each item is clearly labeled with its condition (Never Used, Gently Used, etc.). 
                  Our community members verify item quality before listing.
                </p>
              </div>
              
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">
                  How long does it take to receive requested items?
                </h3>
                <p className="text-gray-600 text-sm">
                  Delivery times vary based on item availability and location. 
                  Most requests are fulfilled within 3-7 days.
                </p>
              </div>
            </div>
            
            <div className="space-y-6">
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">
                  Can I donate items that aren't listed?
                </h3>
                <p className="text-gray-600 text-sm">
                  Yes! If you have items in good condition that could help others, 
                  you can submit them for review and listing.
                </p>
              </div>
              
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">
                  Is there a limit to how many items I can request?
                </h3>
                <p className="text-gray-600 text-sm">
                  We encourage reasonable requests based on genuine need. 
                  Our team reviews each request to ensure fair distribution.
                </p>
              </div>
              
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">
                  How do you ensure privacy and dignity?
                </h3>
                <p className="text-gray-600 text-sm">
                  We maintain strict privacy policies and ensure all interactions 
                  are respectful and dignified for both donors and recipients.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
