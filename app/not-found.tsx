import React from 'react';
import Link from 'next/link';
import { Home, Search, Heart, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

export default function NotFound() {
  return (
    <main className="min-h-screen flex items-center justify-center p-6 bg-gradient-to-br from-blue-50 to-purple-50">
      <div className="max-w-2xl w-full text-center">
        {/* 404 Animation */}
        <div className="mb-8">
          <div className="text-8xl md:text-9xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 mb-4">
            404
          </div>
          <div className="flex justify-center mb-6">
            <Heart className="h-16 w-16 text-red-400 animate-pulse" />
          </div>
        </div>

        {/* Content */}
        <Card className="border-0 shadow-lg">
          <CardContent className="pt-8 pb-8">
            <h1 className="text-3xl md:text-4xl font-heading font-bold mb-4 text-gray-800">
              Page Not Found
            </h1>
            <p className="text-lg text-muted-foreground mb-8 max-w-md mx-auto">
              The page you're looking for doesn't exist or has been moved. 
              But don't worry, there are still many ways to help and get help!
            </p>

            {/* Quick Links */}
            <div className="grid sm:grid-cols-2 gap-4 mb-8">
              <Link href="/money" className="group">
                <div className="p-4 border rounded-lg hover:shadow-md transition-all duration-300 hover:border-green-300">
                  <div className="text-2xl mb-2">💰</div>
                  <h3 className="font-semibold group-hover:text-green-600">Financial Support</h3>
                  <p className="text-sm text-muted-foreground">Donate or request financial aid</p>
                </div>
              </Link>
              
              <Link href="/clothes" className="group">
                <div className="p-4 border rounded-lg hover:shadow-md transition-all duration-300 hover:border-purple-300">
                  <div className="text-2xl mb-2">👕</div>
                  <h3 className="font-semibold group-hover:text-purple-600">Clothing</h3>
                  <p className="text-sm text-muted-foreground">Share or request clothing items</p>
                </div>
              </Link>
              
              <Link href="/education" className="group">
                <div className="p-4 border rounded-lg hover:shadow-md transition-all duration-300 hover:border-blue-300">
                  <div className="text-2xl mb-2">📚</div>
                  <h3 className="font-semibold group-hover:text-blue-600">Education</h3>
                  <p className="text-sm text-muted-foreground">Educational resources and books</p>
                </div>
              </Link>
              
              <Link href="/medical" className="group">
                <div className="p-4 border rounded-lg hover:shadow-md transition-all duration-300 hover:border-red-300">
                  <div className="text-2xl mb-2">🏥</div>
                  <h3 className="font-semibold group-hover:text-red-600">Medical</h3>
                  <p className="text-sm text-muted-foreground">Medical assistance and supplies</p>
                </div>
              </Link>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="flex items-center space-x-2">
                <Link href="/">
                  <Home className="h-5 w-5" />
                  <span>Go Home</span>
                </Link>
              </Button>
              
              <Button asChild variant="outline" size="lg" className="flex items-center space-x-2">
                <Link href="javascript:history.back()">
                  <ArrowLeft className="h-5 w-5" />
                  <span>Go Back</span>
                </Link>
              </Button>
            </div>

            {/* Search Suggestion */}
            <div className="mt-8 p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center justify-center space-x-2 text-muted-foreground">
                <Search className="h-4 w-4" />
                <span className="text-sm">
                  Looking for something specific? Try navigating from our homepage.
                </span>
              </div>
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
