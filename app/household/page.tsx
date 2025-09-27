import React from 'react';
import { Metadata } from 'next';
import { Home, Sofa, ChefHat, Bed, Tv, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export const metadata: Metadata = {
  title: 'Household Essentials - Donare',
  description: 'Donate household items or request home essentials. Furniture, kitchenware, and appliances for families in need.',
};

export default function HouseholdPage() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
 

            <section 
        className="relative h-screen flex items-center" 
        style={{ 
          backgroundImage: "url('/images/household-bg.jpg')", 
          backgroundSize: 'cover', 
          backgroundPosition: 'center' 
        }}
      >
        <div className="absolute inset-0 bg-black/60"></div>
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center text-white">
            <div className="flex justify-center mb-6">
              <div className="p-4 bg-white/20 rounded-full">
                <Home className="h-16 w-16" />
              </div>
            </div>
            <h1 className="text-4xl md:text-6xl font-heading font-bold mb-6">
                Household Essentials
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-purple-100">
             Creating comfortable homes through essential furniture and household items
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-white text-purple-600 hover:bg-purple-50 px-8 py-3 text-lg font-semibold">
       Donate Household Items
              </Button>
              <Button size="lg" variant="outline" className="border-white text-black hover:bg-white hover:text-purple-600 px-8 py-3 text-lg font-semibold">
                 Request Home Essentials
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">Essential Categories</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              We accept and distribute various household items to help families create comfortable living spaces
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="border-orange-200 hover:shadow-lg transition-shadow">
              <CardHeader className="text-center">
                <Bed className="h-12 w-12 text-orange-600 mx-auto mb-4" />
                <CardTitle>Furniture</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="text-sm text-muted-foreground space-y-2">
                  <li>• Beds and mattresses</li>
                  <li>• Sofas and chairs</li>
                  <li>• Tables and desks</li>
                  <li>• Storage solutions</li>
                  <li>• Children&aposs furniture</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-orange-200 hover:shadow-lg transition-shadow">
              <CardHeader className="text-center">
                <ChefHat className="h-12 w-12 text-orange-600 mx-auto mb-4" />
                <CardTitle>Kitchenware</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="text-sm text-muted-foreground space-y-2">
                  <li>• Cooking utensils</li>
                  <li>• Pots and pans</li>
                  <li>• Dishes and cutlery</li>
                  <li>• Small appliances</li>
                  <li>• Food storage containers</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-orange-200 hover:shadow-lg transition-shadow">
              <CardHeader className="text-center">
                <Tv className="h-12 w-12 text-orange-600 mx-auto mb-4" />
                <CardTitle>Appliances</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="text-sm text-muted-foreground space-y-2">
                  <li>• Refrigerators</li>
                  <li>• Washing machines</li>
                  <li>• Fans and heaters</li>
                  <li>• Microwaves</li>
                  <li>• Basic electronics</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-16 bg-orange-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">Our Process</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              From donation to delivery, we ensure quality and fair distribution
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="text-center">
              <CardHeader>
                <div className="w-12 h-12 bg-orange-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                  1
                </div>
                <CardTitle>Quality Inspection</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  All donated items undergo thorough quality inspection to ensure they meet our standards.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <div className="w-12 h-12 bg-orange-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                  2
                </div>
                <CardTitle>Family Assessment</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  We assess family size and specific needs to ensure appropriate item distribution.
                </p>
              </CardContent>
            </Card>

       

            <Card className="text-center">
              <CardHeader>
                <div className="w-12 h-12 bg-orange-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                  3
                </div>
                <CardTitle>Delivery & Setup</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  We provide delivery service and basic setup assistance for larger furniture items.
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
            <Card className="border-orange-200 hover:shadow-lg transition-shadow">
              <CardHeader>
                <Shield className="h-12 w-12 text-orange-600 mb-4" />
                <CardTitle>Quality Assurance</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Rigorous quality checks ensure all donated items are safe, clean, and functional before distribution.
                </p>
              </CardContent>
            </Card>

            <Card className="border-orange-200 hover:shadow-lg transition-shadow">
              <CardHeader>
                <Home className="h-12 w-12 text-orange-600 mb-4" />
                <CardTitle>Family-Based Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Items are allocated based on family size, composition, and specific household needs assessment.
                </p>
              </CardContent>
            </Card>

            <Card className="border-orange-200 hover:shadow-lg transition-shadow">
              <CardHeader>
                <Sofa className="h-12 w-12 text-orange-600 mb-4" />
                <CardTitle>Delivery Service</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Free delivery and basic setup assistance for furniture and large appliances within service areas.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Guidelines Section */}
      <section className="py-16 bg-orange-50">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-center mb-12">Donation Guidelines</h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              <Card>
                <CardHeader>
                  <CardTitle className="text-orange-600">What We Accept</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <Badge variant="outline" className="text-green-600 border-green-600">✓</Badge>
                    <span>Clean, functional furniture in good condition</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge variant="outline" className="text-green-600 border-green-600">✓</Badge>
                    <span>Working appliances with all parts</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge variant="outline" className="text-green-600 border-green-600">✓</Badge>
                    <span>Complete kitchenware sets</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge variant="outline" className="text-green-600 border-green-600">✓</Badge>
                    <span>Home decor and linens</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge variant="outline" className="text-green-600 border-green-600">✓</Badge>
                    <span>Storage and organization items</span>
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
                    <span>Broken or damaged furniture</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge variant="outline" className="text-red-600 border-red-600">✗</Badge>
                    <span>Non-working appliances</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge variant="outline" className="text-red-600 border-red-600">✗</Badge>
                    <span>Items with safety hazards</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge variant="outline" className="text-red-600 border-red-600">✗</Badge>
                    <span>Heavily stained or odorous items</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge variant="outline" className="text-red-600 border-red-600">✗</Badge>
                    <span>Items requiring major repairs</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-orange-600 text-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-heading font-bold mb-6">Help Build Comfortable Homes</h2>
          <p className="text-xl mb-8 text-orange-100">Every household item donated helps create a more comfortable and dignified living space</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-white text-orange-600 hover:bg-orange-50 px-8 py-3 text-lg font-semibold">
              Donate Household Items
            </Button>
            <Button size="lg" variant="outline" className="border-white text-black hover:bg-white hover:text-orange-600 px-8 py-3 text-lg font-semibold">
              Request Home Essentials
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}
