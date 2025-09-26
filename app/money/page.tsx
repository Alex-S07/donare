import React from 'react';
import Link from 'next/link';
import { Metadata } from 'next';
import { DollarSign, Shield, TrendingUp, Users, Clock, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export const metadata: Metadata = {
  title: 'Financial Support - Donare',
  description: 'Request financial assistance or donate money to help families in need. Transparent process with income verification and public auditing.',
};

export default function MoneyPage() {
  return (
    <main className="min-h-screen pt-24 pb-16">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-green-600 to-green-800 text-white">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex justify-center mb-6">
              <div className="p-4 bg-white/20 rounded-full">
                <DollarSign className="h-16 w-16" />
              </div>
            </div>
            <h1 className="text-4xl md:text-6xl font-heading font-bold mb-6">
              Financial Support
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-green-100">
              Transparent financial assistance with verified need assessment and public accountability
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-white text-green-600 hover:bg-green-50 px-8 py-3 text-lg font-semibold">
                <Link href="/money/request">Request Financial Aid</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-green-600 px-8 py-3 text-lg font-semibold">
                <Link href="/money/donate">Donate Money</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">How Our Financial Support Works</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Our transparent system ensures fair distribution and accountability for every donation
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="border-green-200 hover:shadow-lg transition-shadow">
              <CardHeader>
                <Shield className="h-12 w-12 text-green-600 mb-4" />
                <CardTitle>Verified Applications</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  All applications undergo thorough verification including income assessment, family size evaluation, and need documentation.
                </p>
              </CardContent>
            </Card>

            <Card className="border-green-200 hover:shadow-lg transition-shadow">
              <CardHeader>
                <TrendingUp className="h-12 w-12 text-green-600 mb-4" />
                <CardTitle>Transparent Tracking</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Every transaction is tracked and publicly auditable. Donors can see exactly how their contributions are being used.
                </p>
              </CardContent>
            </Card>

            <Card className="border-green-200 hover:shadow-lg transition-shadow">
              <CardHeader>
                <Users className="h-12 w-12 text-green-600 mb-4" />
                <CardTitle>Family-Based Limits</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Assistance limits are calculated based on family size and local cost of living to ensure fair distribution.
                </p>
              </CardContent>
            </Card>

            <Card className="border-green-200 hover:shadow-lg transition-shadow">
              <CardHeader>
                <Clock className="h-12 w-12 text-green-600 mb-4" />
                <CardTitle>Emergency Fund</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Dedicated emergency fund for urgent medical needs and crisis situations with expedited approval process.
                </p>
              </CardContent>
            </Card>

            <Card className="border-green-200 hover:shadow-lg transition-shadow">
              <CardHeader>
                <CheckCircle className="h-12 w-12 text-green-600 mb-4" />
                <CardTitle>Follow-up Support</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Recipients receive follow-up support and resources to help achieve long-term financial stability.
                </p>
              </CardContent>
            </Card>

            <Card className="border-green-200 hover:shadow-lg transition-shadow">
              <CardHeader>
                <DollarSign className="h-12 w-12 text-green-600 mb-4" />
                <CardTitle>Multiple Channels</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Support for education fees, medical bills, housing assistance, and emergency financial needs.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Eligibility Section */}
      <section className="py-16 bg-green-50">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-center mb-12">Eligibility Criteria</h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              <Card>
                <CardHeader>
                  <CardTitle className="text-green-600">For Financial Assistance</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <Badge variant="outline" className="mt-1">1</Badge>
                    <div>
                      <h4 className="font-semibold">Income Verification</h4>
                      <p className="text-sm text-muted-foreground">Household income below local poverty threshold</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <Badge variant="outline" className="mt-1">2</Badge>
                    <div>
                      <h4 className="font-semibold">Documentation</h4>
                      <p className="text-sm text-muted-foreground">Valid ID, proof of residence, and need documentation</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <Badge variant="outline" className="mt-1">3</Badge>
                    <div>
                      <h4 className="font-semibold">Family Assessment</h4>
                      <p className="text-sm text-muted-foreground">Family size and dependent evaluation</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <Badge variant="outline" className="mt-1">4</Badge>
                    <div>
                      <h4 className="font-semibold">Previous Assistance</h4>
                      <p className="text-sm text-muted-foreground">History of previous aid to ensure fair distribution</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-green-600">For Donors</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <Badge variant="outline" className="mt-1">1</Badge>
                    <div>
                      <h4 className="font-semibold">Verified Account</h4>
                      <p className="text-sm text-muted-foreground">Complete account verification with valid payment method</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <Badge variant="outline" className="mt-1">2</Badge>
                    <div>
                      <h4 className="font-semibold">Minimum Donation</h4>
                      <p className="text-sm text-muted-foreground">$10 minimum to cover processing fees</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <Badge variant="outline" className="mt-1">3</Badge>
                    <div>
                      <h4 className="font-semibold">Tax Documentation</h4>
                      <p className="text-sm text-muted-foreground">Receive tax-deductible donation receipts</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <Badge variant="outline" className="mt-1">4</Badge>
                    <div>
                      <h4 className="font-semibold">Impact Reports</h4>
                      <p className="text-sm text-muted-foreground">Regular updates on how donations are being used</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">Our Impact</h2>
            <p className="text-lg text-muted-foreground">Real numbers showing the difference we're making together</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-green-600 mb-2">2,847</div>
              <div className="text-muted-foreground">Families Helped</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-green-600 mb-2">$1.2M</div>
              <div className="text-muted-foreground">Total Donated</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-green-600 mb-2">94%</div>
              <div className="text-muted-foreground">Success Rate</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-green-600 mb-2">24hrs</div>
              <div className="text-muted-foreground">Avg. Response</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-green-600 text-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-heading font-bold mb-6">Ready to Make a Difference?</h2>
          <p className="text-xl mb-8 text-green-100">Join our community of donors and recipients working together for positive change</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-white text-green-600 hover:bg-green-50 px-8 py-3 text-lg font-semibold">
              Request Financial Aid
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-green-600 px-8 py-3 text-lg font-semibold">
              Donate Money
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}
