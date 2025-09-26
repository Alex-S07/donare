import React from 'react';
import { Metadata } from 'next';
import { GraduationCap, BookOpen, Users, Shield, MapPin, Award } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export const metadata: Metadata = {
  title: 'Educational Resources - Donare',
  description: 'Donate books and educational materials or request learning resources. NCERT textbooks, reference materials, and stationery for students.',
};

export default function EducationPage() {
  return (
    <main className="min-h-screen pt-24 pb-16">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-blue-600 to-blue-800 text-white">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex justify-center mb-6">
              <div className="p-4 bg-white/20 rounded-full">
                <GraduationCap className="h-16 w-16" />
              </div>
            </div>
            <h1 className="text-4xl md:text-6xl font-heading font-bold mb-6">
              Educational Resources
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-blue-100">
              Empowering minds through accessible education materials and resources
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-white text-blue-600 hover:bg-blue-50 px-8 py-3 text-lg font-semibold">
                Donate Books
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600 px-8 py-3 text-lg font-semibold">
                Request Educational Materials
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Available Resources */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">Available Educational Resources</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Comprehensive collection of learning materials for students of all ages
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="border-blue-200 hover:shadow-lg transition-shadow">
              <CardHeader className="text-center">
                <BookOpen className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                <CardTitle>NCERT Textbooks</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground text-center mb-4">
                  Complete collection of NCERT textbooks for all grades and subjects.
                </p>
                <div className="space-y-2">
                  <Badge variant="outline" className="w-full justify-center">Classes 1-12</Badge>
                  <Badge variant="outline" className="w-full justify-center">All Subjects</Badge>
                  <Badge variant="outline" className="w-full justify-center">Multiple Languages</Badge>
                </div>
              </CardContent>
            </Card>

            <Card className="border-blue-200 hover:shadow-lg transition-shadow">
              <CardHeader className="text-center">
                <Award className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                <CardTitle>Reference Materials</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground text-center mb-4">
                  Study guides, practice books, and competitive exam preparation materials.
                </p>
                <div className="space-y-2">
                  <Badge variant="outline" className="w-full justify-center">Study Guides</Badge>
                  <Badge variant="outline" className="w-full justify-center">Practice Books</Badge>
                  <Badge variant="outline" className="w-full justify-center">Exam Prep</Badge>
                </div>
              </CardContent>
            </Card>

            <Card className="border-blue-200 hover:shadow-lg transition-shadow">
              <CardHeader className="text-center">
                <Users className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                <CardTitle>Stationery Supplies</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground text-center mb-4">
                  Essential stationery items including notebooks, pens, and art supplies.
                </p>
                <div className="space-y-2">
                  <Badge variant="outline" className="w-full justify-center">Notebooks</Badge>
                  <Badge variant="outline" className="w-full justify-center">Writing Materials</Badge>
                  <Badge variant="outline" className="w-full justify-center">Art Supplies</Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Grade-wise Distribution */}
      <section className="py-16 bg-blue-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">Grade-wise Resource Distribution</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Tailored educational support for different academic levels
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="text-center">
              <CardHeader>
                <div className="text-4xl mb-4">🎨</div>
                <CardTitle>Primary (1-5)</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>Basic textbooks</li>
                  <li>Activity books</li>
                  <li>Art supplies</li>
                  <li>Story books</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <div className="text-4xl mb-4">📚</div>
                <CardTitle>Middle (6-8)</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>Subject textbooks</li>
                  <li>Reference guides</li>
                  <li>Lab manuals</li>
                  <li>Workbooks</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <div className="text-4xl mb-4">🔬</div>
                <CardTitle>Secondary (9-10)</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>Board exam books</li>
                  <li>Practice papers</li>
                  <li>Science equipment</li>
                  <li>Study materials</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <div className="text-4xl mb-4">🎓</div>
                <CardTitle>Senior (11-12)</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>Stream-specific books</li>
                  <li>Competitive exam prep</li>
                  <li>Previous year papers</li>
                  <li>Career guidance</li>
                </ul>
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
            <Card className="border-blue-200 hover:shadow-lg transition-shadow">
              <CardHeader>
                <Shield className="h-12 w-12 text-blue-600 mb-4" />
                <CardTitle>Anti-Resale Tracking</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Digital tracking system prevents resale of donated educational materials, ensuring they reach genuine students.
                </p>
              </CardContent>
            </Card>

            <Card className="border-blue-200 hover:shadow-lg transition-shadow">
              <CardHeader>
                <MapPin className="h-12 w-12 text-blue-600 mb-4" />
                <CardTitle>Rural Priority</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Special focus on rural and underprivileged areas where access to educational resources is limited.
                </p>
              </CardContent>
            </Card>

            <Card className="border-blue-200 hover:shadow-lg transition-shadow">
              <CardHeader>
                <Users className="h-12 w-12 text-blue-600 mb-4" />
                <CardTitle>Student Verification</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Thorough verification process ensures resources reach genuine students with verified enrollment status.
                </p>
              </CardContent>
            </Card>

            <Card className="border-blue-200 hover:shadow-lg transition-shadow">
              <CardHeader>
                <BookOpen className="h-12 w-12 text-blue-600 mb-4" />
                <CardTitle>Condition Assessment</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  All donated books undergo quality assessment to ensure they are in usable condition for learning.
                </p>
              </CardContent>
            </Card>

            <Card className="border-blue-200 hover:shadow-lg transition-shadow">
              <CardHeader>
                <Award className="h-12 w-12 text-blue-600 mb-4" />
                <CardTitle>Academic Support</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Additional academic support and mentorship programs for students receiving educational assistance.
                </p>
              </CardContent>
            </Card>

            <Card className="border-blue-200 hover:shadow-lg transition-shadow">
              <CardHeader>
                <GraduationCap className="h-12 w-12 text-blue-600 mb-4" />
                <CardTitle>Progress Tracking</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Monitor student progress and academic improvement to measure the impact of educational support.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-16 bg-blue-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">Educational Impact</h2>
            <p className="text-lg text-muted-foreground">Measuring our success in educational empowerment</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-blue-600 mb-2">15,432</div>
              <div className="text-muted-foreground">Students Helped</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-blue-600 mb-2">89,234</div>
              <div className="text-muted-foreground">Books Donated</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-blue-600 mb-2">567</div>
              <div className="text-muted-foreground">Schools Reached</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-blue-600 mb-2">78%</div>
              <div className="text-muted-foreground">Rural Coverage</div>
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
                  <CardTitle className="text-blue-600">Acceptable Donations</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <Badge variant="outline" className="text-green-600 border-green-600">✓</Badge>
                    <span>NCERT textbooks in good condition</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge variant="outline" className="text-green-600 border-green-600">✓</Badge>
                    <span>Reference books and study guides</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge variant="outline" className="text-green-600 border-green-600">✓</Badge>
                    <span>Unused notebooks and stationery</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge variant="outline" className="text-green-600 border-green-600">✓</Badge>
                    <span>Educational games and puzzles</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge variant="outline" className="text-green-600 border-green-600">✓</Badge>
                    <span>Art and craft supplies</span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-red-600">Not Acceptable</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <Badge variant="outline" className="text-red-600 border-red-600">✗</Badge>
                    <span>Books with missing pages or damage</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge variant="outline" className="text-red-600 border-red-600">✗</Badge>
                    <span>Outdated curriculum books</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge variant="outline" className="text-red-600 border-red-600">✗</Badge>
                    <span>Used notebooks with writing</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge variant="outline" className="text-red-600 border-red-600">✗</Badge>
                    <span>Broken or dried-out stationery</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge variant="outline" className="text-red-600 border-red-600">✗</Badge>
                    <span>Adult or inappropriate content</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-blue-600 text-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-heading font-bold mb-6">Empower Through Education</h2>
          <p className="text-xl mb-8 text-blue-100">Help us build a future where every child has access to quality educational resources</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-white text-blue-600 hover:bg-blue-50 px-8 py-3 text-lg font-semibold">
              Donate Books
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600 px-8 py-3 text-lg font-semibold">
              Request Educational Materials
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}
