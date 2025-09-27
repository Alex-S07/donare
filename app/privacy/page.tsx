import { Metadata } from 'next';
import { Shield, Eye, Database, Lock, Users, Globe, Mail, Phone } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';

export const metadata: Metadata = {
  title: 'Privacy Policy - Donare',
  description: 'Privacy Policy for Donare donation platform. Learn how we collect, store, and protect your personal information and documents.',
  keywords: 'privacy policy, data protection, personal information, GDPR, data security, donation platform',
  openGraph: {
    title: 'Privacy Policy - Donare',
    description: 'Privacy Policy for Donare donation platform. Learn how we protect your personal information.',
    url: 'https://donare.org/privacy',
  },
};

export default function PrivacyPage() {
  const sections = [
    {
      id: 'information-collection',
      title: 'Information We Collect',
      icon: Database,
      content: [
        'We collect personal information that you provide directly to us, including name, email address, phone number, and address.',
        'For donors (Senders): We collect payment information, transaction history, and donation preferences.',
        'For recipients (Receivers): We collect verification documents, financial need documentation, and personal circumstances.',
        'We automatically collect technical information including IP address, browser type, device information, and usage patterns.',
        'We may collect information from third-party sources such as Google OAuth for authentication purposes.'
      ]
    },
    {
      id: 'data-usage',
      title: 'How We Use Your Information',
      icon: Eye,
      content: [
        'To provide and maintain our donation platform services and facilitate connections between donors and recipients.',
        'To verify user identities and ensure the legitimacy of donation requests and offers.',
        'To process payments securely and maintain transaction records for accounting and legal purposes.',
        'To communicate with you about your account, donations, platform updates, and important service changes.',
        'To improve our platform, develop new features, and conduct research to better serve our community.',
        'To comply with legal obligations and protect against fraud, abuse, or other illegal activities.'
      ]
    },
    {
      id: 'data-storage',
      title: 'Data Storage and Security',
      icon: Lock,
      content: [
        'Your personal information is stored on secure servers with industry-standard encryption and security measures.',
        'We use SSL/TLS encryption for all data transmission between your device and our servers.',
        'Sensitive documents are encrypted at rest and access is restricted to authorized personnel only.',
        'We regularly update our security measures and conduct security audits to protect your data.',
        'Data is stored in compliance with Indian data protection laws and international security standards.',
        'We maintain backup systems to ensure data availability while protecting against unauthorized access.'
      ]
    },
    {
      id: 'third-party-integrations',
      title: 'Third-Party Integrations',
      icon: Globe,
      content: [
        'Google OAuth: We use Google authentication services. Google may collect and process data according to their privacy policy.',
        'Payment Processors: We integrate with Razorpay and other payment gateways. These services handle payment data according to their privacy policies.',
        'Cloud Services: We use secure cloud infrastructure providers for data storage and processing.',
        'Analytics: We use analytics services to understand platform usage and improve user experience.',
        'We ensure all third-party integrations comply with our privacy standards and applicable laws.',
        'We do not sell or rent your personal information to third parties for marketing purposes.'
      ]
    },
    {
      id: 'cookies-tracking',
      title: 'Cookies and Tracking',
      icon: Shield,
      content: [
        'We use essential cookies to maintain your login session and ensure platform functionality.',
        'Analytics cookies help us understand how users interact with our platform to improve user experience.',
        'We use cookies to remember your preferences and settings for a personalized experience.',
        'You can control cookie settings through your browser preferences, though some features may not work without essential cookies.',
        'We do not use tracking cookies for advertising purposes or to track you across other websites.',
        'Third-party services we integrate with may use their own cookies according to their privacy policies.'
      ]
    },
    {
      id: 'user-rights',
      title: 'Your Rights and Choices',
      icon: Users,
      content: [
        'You have the right to access, update, or correct your personal information at any time through your account settings.',
        'You can request a copy of all personal data we hold about you by contacting our support team.',
        'You have the right to request deletion of your personal data, subject to legal and operational requirements.',
        'You can opt out of non-essential communications while still receiving important account and transaction notifications.',
        'You can request data portability to transfer your information to another service provider.',
        'You have the right to withdraw consent for data processing where consent is the legal basis for processing.'
      ]
    }
  ];

  const dataTypes = [
    {
      category: 'Personal Information',
      items: ['Name', 'Email Address', 'Phone Number', 'Address', 'Date of Birth'],
      purpose: 'Account creation, verification, and communication'
    },
    {
      category: 'Financial Information',
      items: ['Payment Methods', 'Transaction History', 'Bank Account Details'],
      purpose: 'Processing donations and maintaining financial records'
    },
    {
      category: 'Verification Documents',
      items: ['ID Documents', 'Proof of Address', 'Financial Statements', 'Medical Certificates'],
      purpose: 'Identity verification and eligibility assessment'
    },
    {
      category: 'Usage Data',
      items: ['IP Address', 'Browser Information', 'Device Details', 'Platform Interactions'],
      purpose: 'Security, analytics, and platform improvement'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 pt-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center justify-center mb-6"
          >
            <div className="p-3 bg-blue-100 rounded-full">
              <Shield className="h-8 w-8 text-blue-600" />
            </div>
          </motion.div>
          <h1 className="text-4xl font-heading font-bold text-slate-900 mb-4">
            Privacy Policy
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Your privacy is important to us. This policy explains how we collect, 
            use, and protect your personal information on the Donare platform.
          </p>
          <div className="mt-4 text-sm text-slate-500">
            Last updated: {new Date().toLocaleDateString('en-US', { 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}
          </div>
        </div>

        {/* Breadcrumb */}
        <nav className="mb-8" aria-label="Breadcrumb">
          <ol className="flex items-center space-x-2 text-sm text-slate-500">
            <li>
              <Link href="/" className="hover:text-slate-700 transition-colors">
                Home
              </Link>
            </li>
            <li className="flex items-center">
              <span className="mx-2">/</span>
              <span className="text-slate-700">Privacy Policy</span>
            </li>
          </ol>
        </nav>

        {/* Table of Contents */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 mb-8">
          <h2 className="text-xl font-semibold text-slate-900 mb-4">Table of Contents</h2>
          <ul className="space-y-2">
            {sections.map((section, index) => (
              <li key={section.id}>
                <a
                  href={`#${section.id}`}
                  className="text-slate-600 hover:text-blue-600 transition-colors duration-200 flex items-center space-x-2"
                >
                  <span className="text-sm font-medium">{index + 1}.</span>
                  <span>{section.title}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Data Types Overview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="bg-white rounded-xl shadow-sm border border-slate-200 p-8 mb-8"
        >
          <h2 className="text-2xl font-semibold text-slate-900 mb-6">Types of Data We Collect</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {dataTypes.map((dataType, index) => (
              <div key={index} className="border border-slate-200 rounded-lg p-4">
                <h3 className="font-semibold text-slate-900 mb-2">{dataType.category}</h3>
                <ul className="text-sm text-slate-600 mb-3">
                  {dataType.items.map((item, itemIndex) => (
                    <li key={itemIndex} className="flex items-center space-x-2">
                      <span className="w-1.5 h-1.5 bg-blue-500 rounded-full"></span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <p className="text-xs text-slate-500 italic">{dataType.purpose}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Privacy Sections */}
        <div className="space-y-8">
          {sections.map((section, index) => (
            <motion.section
              key={section.id}
              id={section.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white rounded-xl shadow-sm border border-slate-200 p-8"
            >
              <div className="flex items-start space-x-4 mb-6">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <section.icon className="h-6 w-6 text-blue-600" />
                </div>
                <h2 className="text-2xl font-semibold text-slate-900">
                  {index + 1}. {section.title}
                </h2>
              </div>
              
              <div className="space-y-4">
                {section.content.map((paragraph, pIndex) => (
                  <p key={pIndex} className="text-slate-700 leading-relaxed">
                    {paragraph}
                  </p>
                ))}
              </div>
            </motion.section>
          ))}
        </div>

        {/* Contact Information */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="mt-12 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-8 border border-blue-200"
        >
          <h3 className="text-xl font-semibold text-slate-900 mb-4">
            Privacy Contact Information
          </h3>
          <div className="space-y-4 text-slate-700">
            <p>
              If you have any questions about this Privacy Policy or how we handle your personal information, 
              please contact our Privacy Team:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-blue-600" />
                <a href="mailto:privacy@donare.org" className="text-blue-600 hover:text-blue-700 font-medium">
                  privacy@donare.org
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-blue-600" />
                <a href="tel:+919876543210" className="text-blue-600 hover:text-blue-700 font-medium">
                  +91 98765 43210
                </a>
              </div>
            </div>
            <p className="text-sm text-slate-600">
              We will respond to your privacy inquiries within 30 days of receipt.
            </p>
          </div>
        </motion.div>

        {/* Footer Actions */}
        <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/terms"
            className="px-6 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg font-medium transition-colors duration-200 text-center"
          >
            Read Terms of Service
          </Link>
          <Link
            href="/contact"
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors duration-200 text-center"
          >
            Contact Privacy Team
          </Link>
        </div>
      </div>
    </div>
  );
}
