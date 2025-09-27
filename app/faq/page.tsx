'use client';

import { HelpCircle, ChevronDown, ChevronUp, Users, CreditCard, Shield, FileText, Phone, Mail } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useState } from 'react';

function FAQItem({ question, answer, isOpen, onToggle }: { 
  question: string; 
  answer: string; 
  isOpen: boolean; 
  onToggle: () => void; 
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      viewport={{ once: true }}
      className="border border-slate-200 rounded-lg overflow-hidden"
    >
      <button
        onClick={onToggle}
        className="w-full px-6 py-4 text-left bg-white hover:bg-slate-50 transition-colors duration-200 flex items-center justify-between"
        aria-expanded={isOpen}
      >
        <span className="font-medium text-slate-900 pr-4">{question}</span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          {isOpen ? (
            <ChevronUp className="h-5 w-5 text-slate-500" />
          ) : (
            <ChevronDown className="h-5 w-5 text-slate-500" />
          )}
        </motion.div>
      </button>
      
      <motion.div
        initial={false}
        animate={{ height: isOpen ? 'auto' : 0 }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
        className="overflow-hidden"
      >
        <div className="px-6 py-4 bg-slate-50 border-t border-slate-200">
          <p className="text-slate-700 leading-relaxed">{answer}</p>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function FAQPage() {
  const [openItems, setOpenItems] = useState<number[]>([]);

  const toggleItem = (index: number) => {
    setOpenItems(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  const faqCategories = [
    {
      title: 'Getting Started',
      icon: Users,
      color: 'bg-blue-100 text-blue-600',
      questions: [
        {
          question: 'How do I create an account on Donare?',
          answer: 'You can create an account by clicking "Sign Up" in the top navigation. Choose whether you want to donate (Sender) or receive help (Receiver), then follow the registration process. Senders can sign up with Google OAuth or email, while Receivers need to provide phone number and verification documents.'
        },
        {
          question: 'What&apos;s the difference between a Sender and Receiver?',
          answer: 'Senders are donors who want to help others by making donations (money, clothes, etc.). Receivers are people in need who request help and must go through a verification process to ensure legitimacy. Both user types have different features and requirements on the platform.'
        },
        {
          question: 'Is it free to use Donare?',
          answer: 'Yes, creating an account and using the basic features of Donare is completely free. We only charge small transaction fees on successful donations to cover payment processing costs and platform maintenance.'
        },
        {
          question: 'How do I choose what type of user I am?',
          answer: 'During registration, you\'ll be asked to select your user type. Choose "Sender" if you want to donate money or items to help others. Choose "Receiver" if you need financial assistance or specific items. You can only have one account type per email/phone number.'
        }
      ]
    },
    {
      title: 'Donations & Payments',
      icon: CreditCard,
      color: 'bg-green-100 text-green-600',
      questions: [
        {
          question: 'How do I make a donation?',
          answer: 'Browse the categories (Money, Clothes, Education, etc.) or search for specific requests. Click on a request that interests you, review the details, and click "Donate Now". You\'ll be redirected to our secure payment gateway to complete the transaction.'
        },
        {
          question: 'What payment methods do you accept?',
          answer: 'We accept all major credit cards, debit cards, UPI payments, net banking, and digital wallets through our secure payment partners. All transactions are processed through PCI-compliant payment gateways to ensure your financial information is protected.'
        },
        {
          question: 'Are my donations tax-deductible?',
          answer: 'Donare is not a registered charity, so donations made through our platform are not tax-deductible. However, we recommend consulting with a tax professional about your specific situation, as some donations to verified individuals may have different tax implications.'
        },
        {
          question: 'Can I get a refund for my donation?',
          answer: 'Refunds are generally not provided for completed donations, as the funds are immediately transferred to recipients. However, we may process refunds in cases of technical errors, fraudulent transactions, or if a recipient fails to meet their stated needs. Contact our support team for assistance.'
        },
        {
          question: 'How do I know my donation reached the right person?',
          answer: 'We provide transaction confirmations and receipts for all donations. Recipients are required to provide updates on how donations were used, and you can track the impact of your contributions through your donor dashboard.'
        }
      ]
    },
    {
      title: 'Verification & Security',
      icon: Shield,
      color: 'bg-purple-100 text-purple-600',
      questions: [
        {
          question: 'How does recipient verification work?',
          answer: 'Recipients must provide valid government ID, proof of address, and documentation supporting their need (medical bills, financial statements, etc.). Our team reviews all documents and may conduct additional verification. This process typically takes 1-3 business days.'
        },
        {
          question: 'Is my personal information safe?',
          answer: 'Yes, we use industry-standard encryption and security measures to protect your data. All sensitive information is encrypted both in transit and at rest. We comply with Indian data protection laws and never sell your personal information to third parties.'
        },
        {
          question: 'What documents do I need for verification?',
          answer: 'For verification, you\'ll need: Government-issued photo ID (Aadhaar, PAN, Driver\'s License), proof of address (utility bill, bank statement), and supporting documents for your specific need (medical reports, financial statements, etc.). All documents must be clear and recent.'
        },
        {
          question: 'How long does verification take?',
          answer: 'Initial verification typically takes 1-3 business days. If additional information is needed, we\'ll contact you directly. You can check your verification status in your account dashboard. Once verified, you can start receiving donations immediately.'
        },
        {
          question: 'What happens if my verification is rejected?',
          answer: 'If verification is rejected, we\'ll provide specific reasons and guidance on how to address the issues. You can reapply with corrected or additional documentation. We\'re committed to helping legitimate users get verified while maintaining platform integrity.'
        }
      ]
    },
    {
      title: 'Platform Features',
      icon: FileText,
      color: 'bg-orange-100 text-orange-600',
      questions: [
        {
          question: 'What categories of donations are available?',
          answer: 'We support six main categories: Money (financial assistance), Clothes (clothing donations), Education (school supplies, books, fees), Household (furniture, appliances), Medical (medical expenses, equipment), and Electronics (devices, accessories). Each category has specific guidelines and requirements.'
        },
        {
          question: 'Can I request specific items instead of money?',
          answer: 'Yes! You can request specific items in any category. For physical items, you\'ll need to provide your address for delivery. For services (like education support), you can specify exactly what you need and how it will help you.'
        },
        {
          question: 'How do I update my profile information?',
          answer: 'Log into your account and go to "Account Settings" or "Profile". You can update most information directly, but changes to verification documents or user type require re-verification. Contact support if you need help with specific updates.'
        },
        {
          question: 'Can I communicate with donors/recipients?',
          answer: 'Yes, we have a secure messaging system that allows communication between donors and recipients. This helps build trust and allows you to ask questions or provide updates. All communications are monitored to ensure appropriate and safe interactions.'
        },
        {
          question: 'How do I report suspicious activity?',
          answer: 'If you encounter suspicious behavior or fraudulent requests, use the "Report" button on any profile or request. You can also contact our support team directly. We take all reports seriously and investigate promptly to maintain platform safety.'
        }
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
            <div className="p-3 bg-blue-100 rounded-full">
              <HelpCircle className="h-8 w-8 text-blue-600" />
            </div>
          </motion.div>
          <h1 className="text-4xl font-heading font-bold text-slate-900 mb-4">
            Frequently Asked Questions
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Find answers to common questions about using Donare. 
            Can&apos;t find what you&apos;re looking for? Contact our support team.
          </p>
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
              <span className="text-slate-700">FAQ</span>
            </li>
          </ol>
        </nav>

        {/* Search Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-8"
        >
          <div className="relative max-w-md mx-auto">
            <input
              type="text"
              placeholder="Search FAQ..."
              className="w-full px-4 py-3 pl-10 pr-4 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <HelpCircle className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400" />
          </div>
        </motion.div>

        {/* FAQ Categories */}
        <div className="space-y-8">
          {faqCategories.map((category, categoryIndex) => (
            <motion.section
              key={category.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: categoryIndex * 0.1 }}
              viewport={{ once: true }}
              className="bg-white rounded-xl shadow-sm border border-slate-200 p-6"
            >
              <div className="flex items-center space-x-3 mb-6">
                <div className={`p-2 rounded-lg ${category.color}`}>
                  <category.icon className="h-6 w-6" />
                </div>
                <h2 className="text-2xl font-semibold text-slate-900">
                  {category.title}
                </h2>
              </div>
              
              <div className="space-y-4">
                {category.questions.map((faq, faqIndex) => {
                  const globalIndex = categoryIndex * 10 + faqIndex;
                  return (
                    <FAQItem
                      key={faqIndex}
                      question={faq.question}
                      answer={faq.answer}
                      isOpen={openItems.includes(globalIndex)}
                      onToggle={() => toggleItem(globalIndex)}
                    />
                  );
                })}
              </div>
            </motion.section>
          ))}
        </div>

        {/* Contact Support */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="mt-12 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-8 border border-blue-200"
        >
          <h3 className="text-xl font-semibold text-slate-900 mb-4">
            Still Need Help?
          </h3>
          <p className="text-slate-700 mb-6">
            Can&apos;t find the answer you&apos;re looking for? Our support team is here to help you 24/7.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center space-x-3">
              <Mail className="h-5 w-5 text-blue-600" />
              <a href="mailto:support@donare.org" className="text-blue-600 hover:text-blue-700 font-medium">
                support@donare.org
              </a>
            </div>
            <div className="flex items-center space-x-3">
              <Phone className="h-5 w-5 text-blue-600" />
              <a href="tel:+919876543210" className="text-blue-600 hover:text-blue-700 font-medium">
                +91 98765 43210
              </a>
            </div>
          </div>
          <div className="mt-4">
            <Link
              href="/contact"
              className="inline-flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors duration-200"
            >
              Contact Support
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
