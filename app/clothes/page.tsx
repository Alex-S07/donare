import React from 'react';
import { Metadata } from 'next';
import { Shirt, Star, Users, Shield} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export const metadata: Metadata = {
  title: 'Clothing Donations - Donare',
  description: 'Donate clothes or request clothing assistance. Four quality categories with targeted distribution and anti-resale tracking.',
};

export default function ClothesPage() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section 
        className="relative h-screen flex items-center" 
        style={{ 
          backgroundImage: "url('/images/clothes-bg.jpg')", 
          backgroundSize: 'cover', 
          backgroundPosition: 'center' 
        }}
      >
        <div className="absolute inset-0 bg-black/60"></div>
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center text-white">
            <div className="flex justify-center mb-6">
              <div className="p-4 bg-white/20 rounded-full">
                <Shirt className="h-16 w-16" />
              </div>
            </div>
            <h1 className="text-4xl md:text-6xl font-heading font-bold mb-6">
              Clothing Donations
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-purple-100">
              Quality clothing for everyone with fair distribution and anti-resale protection
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-white text-purple-600 hover:bg-purple-50 px-8 py-3 text-lg font-semibold">
                Donate Clothes
              </Button>
              <Button size="lg" variant="outline" className="border-white text-black hover:bg-white hover:text-purple-600 px-8 py-3 text-lg font-semibold">
                Request Clothing
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Quality Categories Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">Quality Categories</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              We categorize all clothing donations to ensure fair and appropriate distribution
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="border-purple-200 hover:shadow-lg transition-shadow">
              <CardHeader className="text-center">
                <div className="flex justify-center mb-4">
                  <div className="flex space-x-1">
                    <Star className="h-5 w-5 text-yellow-400 fill-current" />
                    <Star className="h-5 w-5 text-yellow-400 fill-current" />
                    <Star className="h-5 w-5 text-yellow-400 fill-current" />
                    <Star className="h-5 w-5 text-yellow-400 fill-current" />
                  </div>
                </div>
                <CardTitle className="text-purple-600">Never Used</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground text-center">
                  Brand new items with original tags. Perfect condition for special occasions and formal wear.
                </p>
              </CardContent>
            </Card>

            <Card className="border-purple-200 hover:shadow-lg transition-shadow">
              <CardHeader className="text-center">
                <div className="flex justify-center mb-4">
                  <div className="flex space-x-1">
                    <Star className="h-5 w-5 text-yellow-400 fill-current" />
                    <Star className="h-5 w-5 text-yellow-400 fill-current" />
                    <Star className="h-5 w-5 text-yellow-400 fill-current" />
                    <Star className="h-5 w-5 text-gray-300" />
                  </div>
                </div>
                <CardTitle className="text-purple-600">Gently Used</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground text-center">
                  Excellent condition with minimal wear. Suitable for work, school, and daily activities.
                </p>
              </CardContent>
            </Card>

            <Card className="border-purple-200 hover:shadow-lg transition-shadow">
              <CardHeader className="text-center">
                <div className="flex justify-center mb-4">
                  <div className="flex space-x-1">
                    <Star className="h-5 w-5 text-yellow-400 fill-current" />
                    <Star className="h-5 w-5 text-yellow-400 fill-current" />
                    <Star className="h-5 w-5 text-gray-300" />
                    <Star className="h-5 w-5 text-gray-300" />
                  </div>
                </div>
                <CardTitle className="text-purple-600">Moderately Used</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground text-center">
                  Good condition with some wear. Perfect for casual use and everyday comfort.
                </p>
              </CardContent>
            </Card>

            <Card className="border-purple-200 hover:shadow-lg transition-shadow">
              <CardHeader className="text-center">
                <div className="flex justify-center mb-4">
                  <div className="flex space-x-1">
                    <Star className="h-5 w-5 text-yellow-400 fill-current" />
                    <Star className="h-5 w-5 text-gray-300" />
                    <Star className="h-5 w-5 text-gray-300" />
                    <Star className="h-5 w-5 text-gray-300" />
                  </div>
                </div>
                <CardTitle className="text-purple-600">Widely Used</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground text-center">
                  Acceptable wear for basic needs. Clean and functional for temporary assistance.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Distribution Categories */}
      <section className="py-16 bg-purple-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">Targeted Distribution</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              We ensure appropriate sizing and styles for different demographics
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="text-center">
              <CardHeader>
                <div className="text-4xl mb-4">👶</div>
                <CardTitle>Children</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Ages 0-12: School uniforms, play clothes, seasonal wear, and special occasion outfits.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <div className="text-4xl mb-4">👩</div>
                <CardTitle>Women</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Professional attire, casual wear, maternity clothes, and cultural/religious garments.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <div className="text-4xl mb-4">👨</div>
                <CardTitle>Men</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Work clothes, formal wear, casual attire, and seasonal clothing for all occasions.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <div className="text-4xl mb-4">👴</div>
                <CardTitle>Elderly</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Comfortable, easy-to-wear clothing with adaptive features and medical considerations.
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
            <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">Our Clothing Program Features</h2>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
            <Card className="border-purple-200 hover:shadow-lg transition-shadow">
              <CardHeader>
                <Shield className="h-12 w-12 text-purple-600 mb-4" />
                <CardTitle>Quality Control</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Strict no-damage policy with thorough inspection of all donated items before distribution.
                </p>
              </CardContent>
            </Card>

            {/* <Card className="border-purple-200 hover:shadow-lg transition-shadow">
              <CardHeader>
                <Recycle className="h-12 w-12 text-purple-600 mb-4" />
                <CardTitle>Anti-Resale Tracking</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Digital tracking system prevents resale and ensures donations reach those who truly need them.
                </p>
              </CardContent>
            </Card> */}

            <Card className="border-purple-200 hover:shadow-lg transition-shadow">
              <CardHeader>
                <Users className="h-12 w-12 text-purple-600 mb-4" />
                <CardTitle>Seasonal Drives</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Organized seasonal clothing drives for winter coats, summer clothes, and back-to-school items.
                </p>
              </CardContent>
            </Card>

            {/* <Card className="border-purple-200 hover:shadow-lg transition-shadow">
              <CardHeader>
                <Heart className="h-12 w-12 text-purple-600 mb-4" />
                <CardTitle>Size Matching</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Advanced size matching system ensures recipients get properly fitting clothes for comfort and dignity.
                </p>
              </CardContent>
            </Card> */}

            {/* <Card className="border-purple-200 hover:shadow-lg transition-shadow">
              <CardHeader>
                <Shirt className="h-12 w-12 text-purple-600 mb-4" />
                <CardTitle>Professional Cleaning</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  All donated clothes are professionally cleaned and sanitized before distribution to recipients.
                </p>
              </CardContent>
            </Card> */}
{/* 
            <Card className="border-purple-200 hover:shadow-lg transition-shadow">
              <CardHeader>
                <Star className="h-12 w-12 text-purple-600 mb-4" />
                <CardTitle>Special Occasions</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Special collection for formal wear, interview clothes, and celebration outfits for important life events.
                </p>
              </CardContent>
            </Card> */}
          </div>
        </div>
      </section>

      {/* Guidelines Section */}
      <section className="py-16 bg-purple-50">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-center mb-12">Donation Guidelines</h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              <Card>
                <CardHeader>
                  <CardTitle className="text-purple-600">What We Accept</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <Badge variant="outline" className="text-green-600 border-green-600">✓</Badge>
                    <span>Clean, wearable clothing in good condition</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge variant="outline" className="text-green-600 border-green-600">✓</Badge>
                    <span>Shoes in good repair with minimal wear</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge variant="outline" className="text-green-600 border-green-600">✓</Badge>
                    <span>Accessories: belts, scarves, hats, gloves</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge variant="outline" className="text-green-600 border-green-600">✓</Badge>
                    <span>Professional and formal wear</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge variant="outline" className="text-green-600 border-green-600">✓</Badge>
                    <span>Seasonal items: coats, swimwear, boots</span>
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
                    <span>Items with holes, stains, or damage</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge variant="outline" className="text-red-600 border-red-600">✗</Badge>
                    <span>Underwear and intimate apparel</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge variant="outline" className="text-red-600 border-red-600">✗</Badge>
                    <span>Items with strong odors or pet hair</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge variant="outline" className="text-red-600 border-red-600">✗</Badge>
                    <span>Heavily worn or faded clothing</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge variant="outline" className="text-red-600 border-red-600">✗</Badge>
                    <span>Items requiring significant repairs</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-purple-600 text-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-heading font-bold mb-6">Share the Warmth</h2>
          <p className="text-xl mb-8 text-purple-100">Help us provide dignity and comfort through quality clothing donations</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-white text-purple-600 hover:bg-purple-50 px-8 py-3 text-lg font-semibold">
              Donate Clothes
            </Button>
            <Button size="lg" variant="outline" className="border-white text-black hover:bg-white hover:text-purple-600 px-8 py-3 text-lg font-semibold">
              Request Clothing
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}
