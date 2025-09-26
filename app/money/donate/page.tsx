import React from 'react';
import { Metadata } from 'next';
import DonationForm from '@/components/forms/donation-form';
import { DollarSign, Shield, Heart, Users } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export const metadata: Metadata = {
  title: 'Donate Money - Donare',
  description: 'Make a financial donation to help families in need. Secure, transparent, and tax-deductible.',
};

export default function MoneyDonatePage() {
  return (
    <main className="min-h-screen pt-24 pb-16 bg-gradient-to-br from-green-50 to-green-100">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-6">
            <div className="p-4 bg-green-600 text-white rounded-full">
              <DollarSign className="h-12 w-12" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-heading font-bold mb-4 text-green-800">
            Make a Financial Donation
          </h1>
          <p className="text-lg text-green-700 max-w-2xl mx-auto">
            Your financial contribution can make an immediate difference in someone's life. 
            Every donation is tracked transparently and goes directly to those in need.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Form */}
          <div className="lg:col-span-2">
            <DonationForm type="donate" category="money" />
          </div>

          {/* Sidebar Info */}
          <div className="space-y-6">
            <Card className="border-green-200">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-green-700">
                  <Shield className="h-5 w-5" />
                  <span>Secure & Transparent</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <p>• SSL encrypted payment processing</p>
                <p>• 100% of donations go to recipients</p>
                <p>• Real-time tracking of fund usage</p>
                <p>• Tax-deductible receipts provided</p>
                <p>• Regular impact reports sent</p>
              </CardContent>
            </Card>

            <Card className="border-green-200">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-green-700">
                  <Heart className="h-5 w-5" />
                  <span>Impact Stories</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <div className="p-3 bg-green-50 rounded-lg">
                  <p className="font-medium">Maria's Family</p>
                  <p className="text-muted-foreground">
                    "Thanks to donors like you, we were able to pay for my daughter's medical treatment. 
                    She's healthy now and back in school."
                  </p>
                </div>
                <div className="p-3 bg-green-50 rounded-lg">
                  <p className="font-medium">Ahmed's Education</p>
                  <p className="text-muted-foreground">
                    "The financial support helped me complete my engineering degree. 
                    Now I'm giving back to the community."
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="border-green-200">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-green-700">
                  <Users className="h-5 w-5" />
                  <span>Quick Stats</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span>Families Helped:</span>
                  <span className="font-semibold">2,847</span>
                </div>
                <div className="flex justify-between">
                  <span>Total Donated:</span>
                  <span className="font-semibold">$1.2M</span>
                </div>
                <div className="flex justify-between">
                  <span>Success Rate:</span>
                  <span className="font-semibold">94%</span>
                </div>
                <div className="flex justify-between">
                  <span>Avg. Response:</span>
                  <span className="font-semibold">24 hours</span>
                </div>
              </CardContent>
            </Card>

            <Card className="border-green-200 bg-green-50">
              <CardContent className="pt-6">
                <h3 className="font-semibold text-green-800 mb-2">Need Help?</h3>
                <p className="text-sm text-green-700 mb-3">
                  Our support team is here to assist you with any questions about the donation process.
                </p>
                <div className="space-y-1 text-sm">
                  <p><strong>Email:</strong> donate@donare.org</p>
                  <p><strong>Phone:</strong> 1-800-DONARE</p>
                  <p><strong>Hours:</strong> Mon-Fri 9AM-6PM</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </main>
  );
}
