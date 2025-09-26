import React from 'react';
import Link from 'next/link';
import { Home, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

export default function NotFound() {
  return (
    <main className="min-h-screen flex items-center justify-center p-6 bg-gradient-to-br from-blue-50 to-purple-50">
      <div className="max-w-2xl w-full text-center">
        <Card className="border-0 shadow-lg">
          <CardContent className="pt-12 pb-12">
            <h1 className="text-3xl md:text-4xl font-heading font-bold mb-8 text-gray-800">
              You have entered a broken page
            </h1>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-2">
              <Button asChild variant="outline" size="lg" className="flex items-center space-x-2">
                <Link href="#" onClick={e => { e.preventDefault(); window.history.back(); }} aria-label="Go Back">
                  <ArrowLeft className="h-5 w-5" />
                  <span>Go Back</span>
                </Link>
              </Button>
              <Button asChild size="lg" className="flex items-center space-x-2">
                <Link href="/" aria-label="Go Home">
                  <Home className="h-5 w-5" />
                  <span>Home</span>
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
        {/* Footer Message */}
        <div className="mt-8 text-center">
          <p className="text-muted-foreground">
            Need help? Contact us at{' '}
            <a href="mailto:support@donare.org" className="text-blue-600 hover:underline">
              support@donare.org
            </a>
          </p>
        </div>
      </div>
    </main>
  );
}
