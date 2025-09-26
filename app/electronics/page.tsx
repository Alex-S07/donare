import React from 'react';
import { Metadata } from 'next';
import { Laptop, Smartphone, Tablet, Monitor, Shield, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export const metadata: Metadata = {
  title: 'Digital Devices - Donare',
  description: 'Donate electronics or request digital devices. Refurbished laptops, smartphones, and tablets with technical support.',
};

export default function ElectronicsPage() {
  return (
    <main className="min-h-screen pt-24 pb-16">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-teal-600 to-teal-800 text-white">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex justify-center mb-6">
              <div className="p-4 bg-white/20 rounded-full">
                <Laptop className="h-16 w-16" />
              </div>
            </div>
            <h1 className="text-4xl md:text-6xl font-heading font-bold mb-6">
              Digital Devices
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-teal-100">
              Bridging the digital divide through refurbished technology and digital literacy
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-white text-teal-600 hover:bg-teal-50 px-8 py-3 text-lg font-semibold">
                Donate Electronics
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-teal-600 px-8 py-3 text-lg font-semibold">
                Request Digital Devices
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Device Categories */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">Available Devices</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Professionally refurbished devices with educational software and technical support
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="border-teal-200 hover:shadow-lg transition-shadow">
              <CardHeader className="text-center">
                <Laptop className="h-12 w-12 text-teal-600 mx-auto mb-4" />
                <CardTitle>Laptops</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground text-center mb-4">
                  Refurbished laptops perfect for education, work, and digital learning.
                </p>
                <div className="space-y-2">
                  <Badge variant="outline" className="w-full justify-center">Windows & Linux</Badge>
                  <Badge variant="outline" className="w-full justify-center">Educational Software</Badge>
                  <Badge variant="outline" className="w-full justify-center">6-Month Support</Badge>
                </div>
              </CardContent>
            </Card>

            <Card className="border-teal-200 hover:shadow-lg transition-shadow">
              <CardHeader className="text-center">
                <Smartphone className="h-12 w-12 text-teal-600 mx-auto mb-4" />
                <CardTitle>Smartphones</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground text-center mb-4">
                  Unlocked smartphones for communication and mobile learning access.
                </p>
                <div className="space-y-2">
                  <Badge variant="outline" className="w-full justify-center">Android & iOS</Badge>
                  <Badge variant="outline" className="w-full justify-center">Learning Apps</Badge>
                  <Badge variant="outline" className="w-full justify-center">Data Wiped</Badge>
                </div>
              </CardContent>
            </Card>

            <Card className="border-teal-200 hover:shadow-lg transition-shadow">
              <CardHeader className="text-center">
                <Tablet className="h-12 w-12 text-teal-600 mx-auto mb-4" />
                <CardTitle>Tablets</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground text-center mb-4">
                  Tablets ideal for digital reading, educational apps, and creative work.
                </p>
                <div className="space-y-2">
                  <Badge variant="outline" className="w-full justify-center">iPad & Android</Badge>
                  <Badge variant="outline" className="w-full justify-center">E-books Included</Badge>
                  <Badge variant="outline" className="w-full justify-center">Kid-Safe Setup</Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Refurbishment Process */}
      <section className="py-16 bg-teal-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">Our Refurbishment Process</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Every device undergoes comprehensive testing and preparation before distribution
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="text-center">
              <CardHeader>
                <div className="w-12 h-12 bg-teal-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                  1
                </div>
                <CardTitle>Device Inspection</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Thorough hardware inspection and functionality testing of all components.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <div className="w-12 h-12 bg-teal-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                  2
                </div>
                <CardTitle>Data Wiping</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Complete data wiping using military-grade security standards for privacy protection.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <div className="w-12 h-12 bg-teal-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                  3
                </div>
                <CardTitle>Software Installation</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Fresh OS installation with educational software and productivity tools pre-installed.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <div className="w-12 h-12 bg-teal-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                  4
                </div>
                <CardTitle>Quality Assurance</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Final testing and quality assurance before packaging and distribution to recipients.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">Program Features</h2>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="border-teal-200 hover:shadow-lg transition-shadow">
              <CardHeader>
                <Shield className="h-12 w-12 text-teal-600 mb-4" />
                <CardTitle>Complete Data Wiping</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Military-grade data wiping ensures complete privacy protection and security for all devices.
                </p>
              </CardContent>
            </Card>

            <Card className="border-teal-200 hover:shadow-lg transition-shadow">
              <CardHeader>
                <Monitor className="h-12 w-12 text-teal-600 mb-4" />
                <CardTitle>Educational Software</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Pre-installed educational software, productivity tools, and learning applications for immediate use.
                </p>
              </CardContent>
            </Card>

            <Card className="border-teal-200 hover:shadow-lg transition-shadow">
              <CardHeader>
                <Zap className="h-12 w-12 text-teal-600 mb-4" />
                <CardTitle>Technical Support</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  6-month technical support including troubleshooting, software updates, and basic training.
                </p>
              </CardContent>
            </Card>

            <Card className="border-teal-200 hover:shadow-lg transition-shadow">
              <CardHeader>
                <Laptop className="h-12 w-12 text-teal-600 mb-4" />
                <CardTitle>Digital Literacy Training</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Free digital literacy training programs to help recipients make the most of their devices.
                </p>
              </CardContent>
            </Card>

            <Card className="border-teal-200 hover:shadow-lg transition-shadow">
              <CardHeader>
                <Smartphone className="h-12 w-12 text-teal-600 mb-4" />
                <CardTitle>Warranty Coverage</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Limited warranty coverage for hardware issues and free repair services during support period.
                </p>
              </CardContent>
            </Card>

            <Card className="border-teal-200 hover:shadow-lg transition-shadow">
              <CardHeader>
                <Tablet className="h-12 w-12 text-teal-600 mb-4" />
                <CardTitle>Ongoing Updates</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Regular software updates and security patches to keep devices running smoothly and safely.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-16 bg-teal-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">Digital Impact</h2>
            <p className="text-lg text-muted-foreground">Connecting communities through technology access</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-teal-600 mb-2">3,456</div>
              <div className="text-muted-foreground">Devices Donated</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-teal-600 mb-2">2,891</div>
              <div className="text-muted-foreground">Students Connected</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-teal-600 mb-2">96%</div>
              <div className="text-muted-foreground">Success Rate</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-teal-600 mb-2">12,000+</div>
              <div className="text-muted-foreground">Support Hours</div>
            </div>
          </div>
        </div>
      </section>

      {/* Donation Guidelines */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-center mb-12">Donation Guidelines</h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              <Card>
                <CardHeader>
                  <CardTitle className="text-teal-600">What We Accept</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <Badge variant="outline" className="text-green-600 border-green-600">✓</Badge>
                    <span>Laptops less than 5 years old</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge variant="outline" className="text-green-600 border-green-600">✓</Badge>
                    <span>Smartphones in working condition</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge variant="outline" className="text-green-600 border-green-600">✓</Badge>
                    <span>Tablets with functional screens</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge variant="outline" className="text-green-600 border-green-600">✓</Badge>
                    <span>Chargers and accessories</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge variant="outline" className="text-green-600 border-green-600">✓</Badge>
                    <span>Desktop computers and monitors</span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-red-600">What We Cannot Accept</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <Badge variant="outline" className="text-red-600 border-red-600">✗</Badge>
                    <span>Devices with cracked screens</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge variant="outline" className="text-red-600 border-red-600">✗</Badge>
                    <span>Water-damaged electronics</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge variant="outline" className="text-red-600 border-red-600">✗</Badge>
                    <span>Devices older than 7 years</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge variant="outline" className="text-red-600 border-red-600">✗</Badge>
                    <span>Non-functional devices</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge variant="outline" className="text-red-600 border-red-600">✗</Badge>
                    <span>Devices without chargers</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-teal-600 text-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-heading font-bold mb-6">Bridge the Digital Divide</h2>
          <p className="text-xl mb-8 text-teal-100">Help us ensure everyone has access to technology and digital opportunities</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-white text-teal-600 hover:bg-teal-50 px-8 py-3 text-lg font-semibold">
              Donate Electronics
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-teal-600 px-8 py-3 text-lg font-semibold">
              Request Digital Devices
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}
