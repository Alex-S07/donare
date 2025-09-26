import React from 'react';
import { Metadata } from 'next';
import { Heart, Pill, Stethoscope, Shield, Clock, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export const metadata: Metadata = {
  title: 'Medical Assistance - Donare',
  description: 'Access medical supplies and healthcare assistance. Prescription verification required with pharmaceutical compliance.',
};

export default function MedicalPage() {
  return (
    <main className="min-h-screen pt-24 pb-16">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-red-600 to-red-800 text-white">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex justify-center mb-6">
              <div className="p-4 bg-white/20 rounded-full">
                <Heart className="h-16 w-16" />
              </div>
            </div>
            <h1 className="text-4xl md:text-6xl font-heading font-bold mb-6">
              Medical Assistance
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-red-100">
              Providing essential medical support with safety, compliance, and compassion
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-white text-red-600 hover:bg-red-50 px-8 py-3 text-lg font-semibold">
                Donate Medical Supplies
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-red-600 px-8 py-3 text-lg font-semibold">
                Request Medical Aid
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">Medical Support Services</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Comprehensive medical assistance with strict safety protocols and regulatory compliance
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="border-red-200 hover:shadow-lg transition-shadow">
              <CardHeader className="text-center">
                <Pill className="h-12 w-12 text-red-600 mx-auto mb-4" />
                <CardTitle>Prescription Medicines</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground text-center mb-4">
                  Common prescription medications at subsidized costs with proper verification.
                </p>
                <div className="space-y-2">
                  <Badge variant="outline" className="w-full justify-center">Prescription Required</Badge>
                  <Badge variant="outline" className="w-full justify-center">Licensed Pharmacies</Badge>
                  <Badge variant="outline" className="w-full justify-center">Safety Verified</Badge>
                </div>
              </CardContent>
            </Card>

            <Card className="border-red-200 hover:shadow-lg transition-shadow">
              <CardHeader className="text-center">
                <Stethoscope className="h-12 w-12 text-red-600 mx-auto mb-4" />
                <CardTitle>Medical Equipment</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground text-center mb-4">
                  Basic medical equipment and supplies for home healthcare needs.
                </p>
                <div className="space-y-2">
                  <Badge variant="outline" className="w-full justify-center">Blood Pressure Monitors</Badge>
                  <Badge variant="outline" className="w-full justify-center">Thermometers</Badge>
                  <Badge variant="outline" className="w-full justify-center">First Aid Supplies</Badge>
                </div>
              </CardContent>
            </Card>

            <Card className="border-red-200 hover:shadow-lg transition-shadow">
              <CardHeader className="text-center">
                <Clock className="h-12 w-12 text-red-600 mx-auto mb-4" />
                <CardTitle>Emergency Fund</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground text-center mb-4">
                  Rapid financial assistance for urgent medical emergencies and treatments.
                </p>
                <div className="space-y-2">
                  <Badge variant="outline" className="w-full justify-center">24/7 Emergency</Badge>
                  <Badge variant="outline" className="w-full justify-center">Fast Approval</Badge>
                  <Badge variant="outline" className="w-full justify-center">Direct Payment</Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Safety & Compliance */}
      <section className="py-16 bg-red-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">Safety & Compliance</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              We maintain the highest standards of pharmaceutical safety and regulatory compliance
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="text-center">
              <CardHeader>
                <Shield className="h-12 w-12 text-red-600 mx-auto mb-4" />
                <CardTitle>FDA Compliance</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  All medications and medical supplies comply with FDA regulations and safety standards.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <Users className="h-12 w-12 text-red-600 mx-auto mb-4" />
                <CardTitle>Licensed Partners</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  We work exclusively with licensed pharmacies and certified medical suppliers.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <Pill className="h-12 w-12 text-red-600 mx-auto mb-4" />
                <CardTitle>Prescription Verification</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  All prescription requests are verified by licensed healthcare professionals.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <Clock className="h-12 w-12 text-red-600 mx-auto mb-4" />
                <CardTitle>Expiry Monitoring</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Strict monitoring of expiration dates and proper storage conditions for all supplies.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Emergency Process */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">Emergency Medical Process</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Streamlined process for urgent medical assistance with rapid response
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="text-center">
              <CardHeader>
                <div className="w-12 h-12 bg-red-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                  1
                </div>
                <CardTitle>Emergency Contact</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Contact our 24/7 emergency hotline with medical documentation and urgent need details.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <div className="w-12 h-12 bg-red-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                  2
                </div>
                <CardTitle>Rapid Assessment</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Medical team reviews case urgency and verifies documentation within 2 hours.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <div className="w-12 h-12 bg-red-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                  3
                </div>
                <CardTitle>Approval & Funding</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Emergency fund approval and direct payment to healthcare providers or pharmacies.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <div className="w-12 h-12 bg-red-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                  4
                </div>
                <CardTitle>Follow-up Care</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Continued support and monitoring to ensure proper treatment and recovery.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-16 bg-red-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">Medical Impact</h2>
            <p className="text-lg text-muted-foreground">Lives saved and health improved through medical assistance</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-red-600 mb-2">8,921</div>
              <div className="text-muted-foreground">Patients Helped</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-red-600 mb-2">45,678</div>
              <div className="text-muted-foreground">Medicines Provided</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-red-600 mb-2">1,234</div>
              <div className="text-muted-foreground">Emergency Cases</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-red-600 mb-2">156</div>
              <div className="text-muted-foreground">Partner Pharmacies</div>
            </div>
          </div>
        </div>
      </section>

      {/* Eligibility Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-center mb-12">Eligibility & Requirements</h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              <Card>
                <CardHeader>
                  <CardTitle className="text-red-600">Required Documentation</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <Badge variant="outline" className="text-green-600 border-green-600">✓</Badge>
                    <span>Valid prescription from licensed doctor</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge variant="outline" className="text-green-600 border-green-600">✓</Badge>
                    <span>Medical records and diagnosis</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge variant="outline" className="text-green-600 border-green-600">✓</Badge>
                    <span>Income verification documents</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge variant="outline" className="text-green-600 border-green-600">✓</Badge>
                    <span>Government-issued identification</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge variant="outline" className="text-green-600 border-green-600">✓</Badge>
                    <span>Insurance information (if applicable)</span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-red-600">Safety Guidelines</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <Badge variant="outline" className="text-blue-600 border-blue-600">!</Badge>
                    <span>Never share prescription medications</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge variant="outline" className="text-blue-600 border-blue-600">!</Badge>
                    <span>Follow dosage instructions exactly</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge variant="outline" className="text-blue-600 border-blue-600">!</Badge>
                    <span>Report any adverse reactions immediately</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge variant="outline" className="text-blue-600 border-blue-600">!</Badge>
                    <span>Store medications properly</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge variant="outline" className="text-blue-600 border-blue-600">!</Badge>
                    <span>Dispose of expired medications safely</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-red-600 text-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-heading font-bold mb-6">Healthcare for Everyone</h2>
          <p className="text-xl mb-8 text-red-100">Join us in ensuring that quality healthcare is accessible to all who need it</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-white text-red-600 hover:bg-red-50 px-8 py-3 text-lg font-semibold">
              Donate Medical Supplies
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-red-600 px-8 py-3 text-lg font-semibold">
              Request Medical Aid
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}
