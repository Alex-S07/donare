'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  Heart, 
  Mail, 
  Phone, 
  MapPin, 
  Facebook, 
  Twitter, 
  Instagram, 
  Linkedin,
  ExternalLink,
  Shield,
  FileText,
  HelpCircle,
  Users,
  Globe
} from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerSections = [
    {
      title: 'About Donare',
      links: [
        { name: 'Our Mission', href: '/about#mission' },
        { name: 'How It Works', href: '/about#how-it-works' },
        { name: 'Impact Stories', href: '/about#impact' },
        { name: 'Team', href: '/about#team' },
        { name: 'Careers', href: '/careers' },
      ]
    },
    {
      title: 'Quick Links',
      links: [
        { name: 'Donate Now', href: '/money/donate' },
        { name: 'Request Help', href: '/money/request' },
        { name: 'Browse Categories', href: '/#categories' },
        { name: 'Success Stories', href: '/stories' },
        { name: 'Volunteer', href: '/volunteer' },
      ]
    },
    {
      title: 'Legal',
      links: [
        { name: 'Terms of Service', href: '/terms' },
        { name: 'Privacy Policy', href: '/privacy' },
        { name: 'Cookie Policy', href: '/cookies' },
        { name: 'Refund Policy', href: '/refund' },
        { name: 'Compliance', href: '/compliance' },
      ]
    },
    {
      title: 'Support',
      links: [
        { name: 'FAQ', href: '/faq' },
        { name: 'Contact Us', href: '/contact' },
        { name: 'Help Center', href: '/help' },
        { name: 'Report Issue', href: '/report' },
        { name: 'Status Page', href: '/status' },
      ]
    }
  ];

  const socialLinks = [
    { name: 'Facebook', icon: Facebook, href: 'https://facebook.com/donare', color: 'hover:text-blue-600' },
    { name: 'Twitter', icon: Twitter, href: 'https://twitter.com/donare', color: 'hover:text-blue-400' },
    { name: 'Instagram', icon: Instagram, href: 'https://instagram.com/donare', color: 'hover:text-pink-600' },
    { name: 'LinkedIn', icon: Linkedin, href: 'https://linkedin.com/company/donare', color: 'hover:text-blue-700' },
  ];

  const contactInfo = [
    { icon: Mail, text: 'support@donare.org', href: 'mailto:support@donare.org' },
    { icon: Phone, text: '+91 98765 43210', href: 'tel:+919876543210' },
    { icon: MapPin, text: 'Mumbai, Maharashtra, India', href: '#' },
  ];

  return (
    <footer className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <Link href="/" className="flex items-center space-x-2 group mb-4">
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 10 }}
                >
                  <Heart className="h-8 w-8 text-red-500 fill-current" />
                </motion.div>
                <span className="text-2xl font-heading font-bold text-white group-hover:text-red-500 transition-colors duration-300">
                  Donare
                </span>
              </Link>
              
              <p className="text-slate-300 text-sm leading-relaxed mb-6 max-w-md">
            Connecting hearts, changing lives. Donare is India&apos;s leading donation platform 
            that bridges the gap between generous donors and people in need, creating 
            meaningful impact in communities across the country.
              </p>

              {/* Contact Information */}
              <div className="space-y-3">
                {contactInfo.map((contact) => (
                  <motion.a
                    key={contact.text}
                    href={contact.href}
                    className="flex items-center space-x-3 text-slate-300 hover:text-white transition-colors duration-300 group"
                    whileHover={{ x: 5 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                  >
                    <contact.icon className="h-4 w-4 text-red-500 group-hover:text-red-400 transition-colors duration-300" />
                    <span className="text-sm">{contact.text}</span>
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Footer Sections */}
          {footerSections.map((section, sectionIndex) => (
            <motion.div
              key={section.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: sectionIndex * 0.1 }}
              viewport={{ once: true }}
              className="lg:col-span-1"
            >
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
                {section.title === 'Legal' && <Shield className="h-5 w-5 mr-2 text-red-500" />}
                {section.title === 'Support' && <HelpCircle className="h-5 w-5 mr-2 text-red-500" />}
                {section.title === 'About Donare' && <Users className="h-5 w-5 mr-2 text-red-500" />}
                {section.title === 'Quick Links' && <Globe className="h-5 w-5 mr-2 text-red-500" />}
                {section.title}
              </h3>
              <ul className="space-y-3">
                {section.links.map((link, linkIndex) => (
                  <motion.li
                    key={link.name}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: linkIndex * 0.05 }}
                    viewport={{ once: true }}
                  >
                    <Link
                      href={link.href}
                      className="text-slate-300 hover:text-white transition-colors duration-300 text-sm flex items-center group"
                    >
                      <span className="group-hover:text-red-400 transition-colors duration-300">
                        {link.name}
                      </span>
                      {link.href.startsWith('http') && (
                        <ExternalLink className="h-3 w-3 ml-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      )}
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Social Media & Newsletter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="mt-12 pt-8 border-t border-slate-700"
        >
          <div className="flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0">
            {/* Social Media */}
            <div className="flex items-center space-x-6">
              <span className="text-sm text-slate-300 font-medium">Follow Us:</span>
              <div className="flex space-x-4">
                {socialLinks.map((social) => (
                  <motion.a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`text-slate-400 hover:text-white transition-colors duration-300 ${social.color}`}
                    whileHover={{ scale: 1.2, rotate: 5 }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                    aria-label={`Follow us on ${social.name}`}
                  >
                    <social.icon className="h-5 w-5" />
                  </motion.a>
                ))}
              </div>
            </div>

            {/* Newsletter Signup */}
            <div className="flex items-center space-x-4">
              <span className="text-sm text-slate-300 font-medium">Stay Updated:</span>
              <div className="flex space-x-2">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent text-sm w-48"
                />
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-6 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium text-sm transition-colors duration-300"
                >
                  Subscribe
                </motion.button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Bottom Bar */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        viewport={{ once: true }}
        className="bg-slate-900 border-t border-slate-700"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            {/* Copyright */}
            <div className="flex items-center space-x-2 text-slate-400 text-sm">
              <FileText className="h-4 w-4" />
              <span>
                © {currentYear} Donare. All rights reserved.
              </span>
            </div>

            {/* Additional Links */}
            <div className="flex items-center space-x-6 text-sm">
              <Link href="/accessibility" className="text-slate-400 hover:text-white transition-colors duration-300">
                Accessibility
              </Link>
              <Link href="/sitemap" className="text-slate-400 hover:text-white transition-colors duration-300">
                Sitemap
              </Link>
              <div className="flex items-center space-x-2 text-slate-400">
                <span>Version 2.1.0</span>
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              </div>
            </div>
          </div>

          {/* Trust Badges */}
          <div className="mt-4 pt-4 border-t border-slate-700">
            <div className="flex flex-wrap items-center justify-center space-x-6 text-xs text-slate-400">
              <div className="flex items-center space-x-2">
                <Shield className="h-4 w-4 text-green-500" />
                <span>SSL Secured</span>
              </div>
              <div className="flex items-center space-x-2">
                <Heart className="h-4 w-4 text-red-500" />
                <span>Trusted Platform</span>
              </div>
              <div className="flex items-center space-x-2">
                <Users className="h-4 w-4 text-blue-500" />
                <span>10,000+ Users</span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </footer>
  );
};

export default Footer;
