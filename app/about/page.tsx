import React from 'react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About Us - Donare',
  description: 'Learn about Donare\'s mission to connect generous donors with those in need through our comprehensive donation platform.',
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white my-12">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            About Donare
          </h1>
          <p className="text-xl text-gray-600 mb-12">
            Connecting hearts, sharing hope, and building stronger communities through the power of giving.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">❤️</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Our Mission</h3>
              <p className="text-gray-600">
                To create a seamless platform where generosity meets need, ensuring no one goes without basic necessities.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🤝</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Our Vision</h3>
              <p className="text-gray-600">
                A world where communities support each other through acts of kindness and shared resources.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🌟</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Our Values</h3>
              <p className="text-gray-600">
                Transparency, dignity, respect, and the belief that everyone deserves access to basic necessities.
              </p>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm border p-8 text-left">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">How Donare Works</h2>
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-sm font-bold text-primary">1</span>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Donors Share</h3>
                  <p className="text-gray-600">Generous individuals and organizations donate items they no longer need.</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-sm font-bold text-primary">2</span>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">We Verify</h3>
                  <p className="text-gray-600">Our team ensures all donations are in good condition and suitable for redistribution.</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-sm font-bold text-primary">3</span>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Recipients Benefit</h3>
                  <p className="text-gray-600">Verified individuals and families receive the items they need, completely free of cost.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
