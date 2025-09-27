import { Metadata } from 'next';
import { Mail, Phone, MapPin, Clock, MessageCircle, Send } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export const metadata: Metadata = {
  title: 'Contact Us - Donare',
  description: 'Get in touch with Donare support team. We\'re here to help with any questions about donations, verification, or platform features.',
  keywords: 'contact, support, help, customer service, donation platform, assistance',
  openGraph: {
    title: 'Contact Us - Donare',
    description: 'Get in touch with Donare support team for assistance.',
    url: 'https://donare.org/contact',
  },
};

export default function ContactPage() {
  const contactMethods = [
    {
      icon: Mail,
      title: 'Email Support',
      description: 'Get help via email',
      contact: 'support@donare.org',
      href: 'mailto:support@donare.org',
      responseTime: 'Within 24 hours'
    },
    {
      icon: Phone,
      title: 'Phone Support',
      description: 'Call us directly',
      contact: '+91 98765 43210',
      href: 'tel:+919876543210',
      responseTime: 'Mon-Fri, 9 AM - 6 PM'
    },
    {
      icon: MessageCircle,
      title: 'Live Chat',
      description: 'Chat with our team',
      contact: 'Available on platform',
      href: '#',
      responseTime: 'Real-time support'
    },
    {
      icon: MapPin,
      title: 'Office Address',
      description: 'Visit our office',
      contact: 'Mumbai, Maharashtra, India',
      href: '#',
      responseTime: 'By appointment only'
    }
  ];

  const faqTopics = [
    'Account Issues',
    'Donation Problems',
    'Verification Help',
    'Payment Questions',
    'Technical Support',
    'General Inquiry'
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 pt-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center justify-center mb-6"
          >
            <div className="p-3 bg-blue-100 rounded-full">
              <MessageCircle className="h-8 w-8 text-blue-600" />
            </div>
          </motion.div>
          <h1 className="text-4xl font-heading font-bold text-slate-900 mb-4">
            Contact Us
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            We&apos;re here to help! Get in touch with our support team for any questions 
            about donations, verification, or platform features.
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
              <span className="text-slate-700">Contact</span>
            </li>
          </ol>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Contact Methods */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl font-semibold text-slate-900 mb-6">
              Get in Touch
            </h2>
            <div className="space-y-4">
              {contactMethods.map((method, index) => (
                <motion.div
                  key={method.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card className="hover:shadow-md transition-shadow duration-300">
                    <CardContent className="p-6">
                      <div className="flex items-start space-x-4">
                        <div className="p-2 bg-blue-100 rounded-lg">
                          <method.icon className="h-6 w-6 text-blue-600" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-slate-900 mb-1">
                            {method.title}
                          </h3>
                          <p className="text-slate-600 text-sm mb-2">
                            {method.description}
                          </p>
                          <a
                            href={method.href}
                            className="text-blue-600 hover:text-blue-700 font-medium text-sm"
                          >
                            {method.contact}
                          </a>
                          <p className="text-xs text-slate-500 mt-1">
                            {method.responseTime}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl font-semibold text-slate-900">
                  Send us a Message
                </CardTitle>
                <p className="text-slate-600">
                  Fill out the form below and we&apos;ll get back to you as soon as possible.
                </p>
              </CardHeader>
              <CardContent>
                <form className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="firstName" className="block text-sm font-medium text-slate-700 mb-2">
                        First Name
                      </label>
                      <Input
                        id="firstName"
                        type="text"
                        placeholder="Enter your first name"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="lastName" className="block text-sm font-medium text-slate-700 mb-2">
                        Last Name
                      </label>
                      <Input
                        id="lastName"
                        type="text"
                        placeholder="Enter your last name"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-2">
                      Email Address
                    </label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="Enter your email address"
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-slate-700 mb-2">
                      Phone Number
                    </label>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="Enter your phone number"
                    />
                  </div>

                  <div>
                    <label htmlFor="topic" className="block text-sm font-medium text-slate-700 mb-2">
                      Topic
                    </label>
                    <select
                      id="topic"
                      className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    >
                      <option value="">Select a topic</option>
                      {faqTopics.map((topic) => (
                        <option key={topic} value={topic}>
                          {topic}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-slate-700 mb-2">
                      Message
                    </label>
                    <Textarea
                      id="message"
                      placeholder="Describe your issue or question in detail..."
                      rows={5}
                      required
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                  >
                    <Send className="h-4 w-4 mr-2" />
                    Send Message
                  </Button>
                </form>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Additional Information */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="mt-12 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-8 border border-blue-200"
        >
          <div className="text-center">
            <h3 className="text-xl font-semibold text-slate-900 mb-4">
              Need Immediate Help?
            </h3>
            <p className="text-slate-700 mb-6">
              For urgent matters or technical issues, please call our support line or use the live chat feature.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="tel:+919876543210"
                className="inline-flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors duration-200"
              >
                <Phone className="h-4 w-4 mr-2" />
                Call Now
              </a>
              <a
                href="/faq"
                className="inline-flex items-center px-6 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg font-medium transition-colors duration-200"
              >
                <MessageCircle className="h-4 w-4 mr-2" />
                Browse FAQ
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
