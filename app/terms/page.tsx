import { Metadata } from 'next';
import { Shield, FileText, Users, CreditCard, AlertTriangle, Scale } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';

export const metadata: Metadata = {
  title: 'Terms of Service - Donare',
  description: 'Terms of Service for Donare donation platform. Learn about user responsibilities, platform guidelines, and legal terms for donors and recipients.',
  keywords: 'terms of service, legal terms, donation platform, user agreement, platform guidelines',
  openGraph: {
    title: 'Terms of Service - Donare',
    description: 'Terms of Service for Donare donation platform. Learn about user responsibilities and platform guidelines.',
    url: 'https://donare.org/terms',
  },
};

export default function TermsPage() {
  const sections = [
    {
      id: 'acceptance',
      title: 'Acceptance of Terms',
      icon: FileText,
      content: [
        'By accessing and using the Donare platform ("Platform"), you agree to be bound by these Terms of Service ("Terms"). If you do not agree to these Terms, please do not use our Platform.',
        'These Terms apply to all users of the Platform, including donors ("Senders") and recipients ("Receivers") of donations.',
        'We reserve the right to modify these Terms at any time. Continued use of the Platform after changes constitutes acceptance of the new Terms.'
      ]
    },
    {
      id: 'user-responsibilities',
      title: 'User Responsibilities',
      icon: Users,
      content: [
        'All users must provide accurate and truthful information during registration and verification processes.',
        'Senders are responsible for ensuring they have the legal right to make donations and that their payment methods are valid.',
        'Receivers must provide genuine documentation and information for verification purposes.',
        'Users must not engage in fraudulent activities, misrepresentation, or abuse of the Platform.',
        'All users must comply with applicable Indian laws and regulations regarding charitable donations and financial transactions.'
      ]
    },
    {
      id: 'platform-usage',
      title: 'Platform Usage Guidelines',
      icon: Shield,
      content: [
        'The Platform is designed to facilitate legitimate charitable donations and should not be used for illegal activities.',
        'Users must not attempt to circumvent security measures or access restricted areas of the Platform.',
        'Content posted on the Platform must be appropriate and not violate any laws or regulations.',
        'Users are prohibited from creating multiple accounts or impersonating others.',
        'The Platform reserves the right to monitor and moderate user activities to ensure compliance.'
      ]
    },
    {
      id: 'account-termination',
      title: 'Account Termination',
      icon: AlertTriangle,
      content: [
        'We reserve the right to suspend or terminate accounts that violate these Terms or engage in fraudulent activities.',
        'Users may request account deletion by contacting our support team.',
        'Upon account termination, access to the Platform will be immediately revoked.',
        'Certain information may be retained for legal and compliance purposes even after account termination.',
        'Terminated users may not create new accounts without explicit permission from Donare.'
      ]
    },
    {
      id: 'donation-processing',
      title: 'Donation Processing Terms',
      icon: CreditCard,
      content: [
        'All donations are processed through secure payment gateways and are subject to transaction fees.',
        'Donare does not guarantee that all donation requests will be fulfilled.',
        'Donation amounts are non-refundable except in cases of technical errors or fraudulent transactions.',
        'Receivers must use donations for the stated purpose and provide updates when requested.',
        'Donare may hold donations in escrow until verification is complete for new recipients.'
      ]
    },
    {
      id: 'liability-limitations',
      title: 'Liability Limitations',
      icon: Scale,
      content: [
        'Donare provides the Platform "as is" and does not guarantee uninterrupted or error-free service.',
        'We are not liable for any indirect, incidental, or consequential damages arising from Platform use.',
        'Our liability is limited to the amount of fees collected by Donare in the 12 months preceding the claim.',
        'Users are responsible for their own tax obligations related to donations made or received.',
        'Donare is not responsible for disputes between donors and recipients outside of the Platform.'
      ]
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
            <div className="p-3 bg-red-100 rounded-full">
              <Shield className="h-8 w-8 text-red-600" />
            </div>
          </motion.div>
          <h1 className="text-4xl font-heading font-bold text-slate-900 mb-4">
            Terms of Service
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Please read these terms carefully before using the Donare platform. 
            These terms govern your use of our donation platform and services.
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
              <span className="text-slate-700">Terms of Service</span>
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
                  className="text-slate-600 hover:text-red-600 transition-colors duration-200 flex items-center space-x-2"
                >
                  <span className="text-sm font-medium">{index + 1}.</span>
                  <span>{section.title}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Terms Sections */}
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
                <div className="p-2 bg-red-100 rounded-lg">
                  <section.icon className="h-6 w-6 text-red-600" />
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

        {/* Additional Information */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="mt-12 bg-gradient-to-r from-red-50 to-pink-50 rounded-xl p-8 border border-red-200"
        >
          <h3 className="text-xl font-semibold text-slate-900 mb-4">
            Important Information
          </h3>
          <div className="space-y-3 text-slate-700">
            <p>
              <strong>Governing Law:</strong> These Terms are governed by the laws of India. 
              Any disputes will be subject to the jurisdiction of courts in Kuttikanam, Idukki.
            </p>
            <p>
              <strong>Contact Information:</strong> For questions about these Terms, please contact us at{' '}
              <a href="mailto:legal@donare.org" className="text-red-600 hover:text-red-700 font-medium">
                legal@donare.org
              </a>
            </p>
            <p>
              <strong>Severability:</strong> If any provision of these Terms is found to be invalid, 
              the remaining provisions will continue to be valid and enforceable.
            </p>
          </div>
        </motion.div>

        {/* Footer Actions */}
        <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/privacy"
            className="px-6 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg font-medium transition-colors duration-200 text-center"
          >
            Read Privacy Policy
          </Link>
          <Link
            href="/contact"
            className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium transition-colors duration-200 text-center"
          >
            Contact Support
          </Link>
        </div>
      </div>
    </div>
  );
}
