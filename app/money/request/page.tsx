import React from 'react';
import { Metadata } from 'next';
import DonationForm from '@/components/forms/donation-form';
import { DollarSign, FileText, Clock, CheckCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export const metadata: Metadata = {
  title: 'Request Financial Aid - Donare',
  description: 'Request financial assistance for urgent needs. Transparent process with income verification.',
};

export default function MoneyRequestPage() {
  return (
    <main className="min-h-screen pt-24 pb-16 bg-gradient-to-br from-blue-50 to-blue-100">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-6">
            <div className="p-4 bg-blue-600 text-white rounded-full">
              <DollarSign className="h-12 w-12" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-heading font-bold mb-4 text-blue-800">
            Request Financial Assistance
          </h1>
          <p className="text-lg text-blue-700 max-w-2xl mx-auto">
            We're here to help during difficult times. Our transparent process ensures fair 
            distribution of financial aid to those who need it most.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Form */}
          <div className="lg:col-span-2">
            <DonationForm type="request" category="money" />
          </div>

          {/* Sidebar Info */}
          <div className="space-y-6">
            <Card className="border-blue-200">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-blue-700">
                  <FileText className="h-5 w-5" />
                  <span>Required Documents</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <div className="flex items-center space-x-2">
                  <Badge variant="outline" className="text-green-600 border-green-600">✓</Badge>
                  <span>Government-issued ID</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge variant="outline" className="text-green-600 border-green-600">✓</Badge>
                  <span>Proof of income/unemployment</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge variant="outline" className="text-green-600 border-green-600">✓</Badge>
                  <span>Proof of residence</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge variant="outline" className="text-green-600 border-green-600">✓</Badge>
                  <span>Bank account information</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge variant="outline" className="text-green-600 border-green-600">✓</Badge>
                  <span>Supporting documentation</span>
                </div>
              </CardContent>
            </Card>

            <Card className="border-blue-200">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-blue-700">
                  <Clock className="h-5 w-5" />
                  <span>Process Timeline</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-sm">
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs font-bold">
                    1
                  </div>
                  <div>
                    <p className="font-medium">Application Submission</p>
                    <p className="text-muted-foreground">Complete and submit your request form</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs font-bold">
                    2
                  </div>
                  <div>
                    <p className="font-medium">Initial Review (24-48 hours)</p>
                    <p className="text-muted-foreground">Our team reviews your application</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs font-bold">
                    3
                  </div>
                  <div>
                    <p className="font-medium">Verification (3-5 days)</p>
                    <p className="text-muted-foreground">Document verification and assessment</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs font-bold">
                    4
                  </div>
                  <div>
                    <p className="font-medium">Decision & Disbursement</p>
                    <p className="text-muted-foreground">Approval and fund transfer</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-blue-200">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-blue-700">
                  <CheckCircle className="h-5 w-5" />
                  <span>Eligibility Criteria</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <p>• Household income below poverty threshold</p>
                <p>• Valid identification and residence proof</p>
                <p>• Demonstrated financial need</p>
                <p>• No previous assistance in last 6 months</p>
                <p>• Willingness to participate in follow-up</p>
              </CardContent>
            </Card>

            <Card className="border-blue-200 bg-blue-50">
              <CardContent className="pt-6">
                <h3 className="font-semibold text-blue-800 mb-2">Emergency Assistance</h3>
                <p className="text-sm text-blue-700 mb-3">
                  For urgent medical or crisis situations, we offer expedited processing.
                </p>
                <div className="space-y-1 text-sm">
                  <p><strong>Emergency Hotline:</strong> 1-800-HELP-NOW</p>
                  <p><strong>Available:</strong> 24/7</p>
                  <p><strong>Response:</strong> Within 2 hours</p>
                </div>
              </CardContent>
            </Card>

            <Card className="border-blue-200 bg-green-50">
              <CardContent className="pt-6">
                <h3 className="font-semibold text-green-800 mb-2">Success Story</h3>
                <p className="text-sm text-green-700 italic">
                  "Donare helped me pay for my mother's surgery when I had nowhere else to turn. 
                  The process was respectful and quick. I'm forever grateful."
                </p>
                <p className="text-xs text-green-600 mt-2">- Sarah M., Recipient</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </main>
  );
}
