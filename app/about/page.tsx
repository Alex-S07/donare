import { Metadata } from 'next';
import { Heart, Users, Target, Award, Globe, Shield } from 'lucide-react';
import { motion } from 'framer-motion';

export const metadata: Metadata = {
  title: 'About Donare - Connecting Hearts, Changing Lives',
  description: 'Learn about Donare\'s mission to connect donors with people in need. Discover our impact, team, and vision for a more compassionate world.',
  keywords: 'about donare, mission, vision, impact, team, donation platform, charity',
  openGraph: {
    title: 'About Donare - Connecting Hearts, Changing Lives',
    description: 'Learn about Donare\'s mission to connect donors with people in need.',
    url: 'https://donare.org/about',
  },
};

export default function AboutPage() {
  const stats = [
    { number: '10,000+', label: 'Lives Impacted', icon: Users },
    { number: '₹50L+', label: 'Donations Raised', icon: Heart },
    { number: '500+', label: 'Verified Recipients', icon: Shield },
    { number: '25+', label: 'Cities Covered', icon: Globe },
  ];

  const values = [
    {
      icon: Heart,
      title: 'Compassion',
      description: 'We believe in the power of human kindness and the importance of helping those in need.'
    },
    {
      icon: Shield,
      title: 'Trust',
      description: 'We maintain the highest standards of transparency and security in all our operations.'
    },
    {
      icon: Users,
      title: 'Community',
      description: 'We foster a supportive community where everyone can contribute to making a difference.'
    },
    {
      icon: Globe,
      title: 'Impact',
      description: 'We focus on creating meaningful, measurable impact in the lives of those we serve.'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 pt-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center justify-center mb-6"
          >
            <div className="p-4 bg-red-100 rounded-full">
              <Heart className="h-12 w-12 text-red-600" />
            </div>
          </motion.div>
          <h1 className="text-5xl font-heading font-bold text-slate-900 mb-6">
            About Donare
          </h1>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            We&apos;re on a mission to bridge the gap between generous hearts and people in need, 
            creating meaningful connections that transform lives and strengthen communities.
          </p>
        </div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="p-4 bg-white rounded-xl shadow-sm border border-slate-200 mb-4">
                <stat.icon className="h-8 w-8 text-red-600 mx-auto mb-2" />
                <div className="text-3xl font-bold text-slate-900 mb-1">
                  {stat.number}
                </div>
                <div className="text-sm text-slate-600">
                  {stat.label}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Mission & Vision */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="bg-white rounded-xl shadow-sm border border-slate-200 p-8"
          >
            <div className="flex items-center space-x-3 mb-6">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Target className="h-6 w-6 text-blue-600" />
              </div>
              <h2 className="text-2xl font-semibold text-slate-900">Our Mission</h2>
            </div>
            <p className="text-slate-700 leading-relaxed">
              To create a transparent, secure, and efficient platform that connects generous donors 
              with people in genuine need, ensuring that every donation makes a meaningful impact 
              in someone's life while building stronger, more compassionate communities.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="bg-white rounded-xl shadow-sm border border-slate-200 p-8"
          >
            <div className="flex items-center space-x-3 mb-6">
              <div className="p-2 bg-green-100 rounded-lg">
                <Award className="h-6 w-6 text-green-600" />
              </div>
              <h2 className="text-2xl font-semibold text-slate-900">Our Vision</h2>
            </div>
            <p className="text-slate-700 leading-relaxed">
              To become India&apos;s most trusted donation platform, where every act of kindness 
              is amplified and every person in need has access to support, creating a world 
              where compassion and generosity are the foundation of our society.
            </p>
          </motion.div>
        </div>

        {/* Values */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h2 className="text-3xl font-semibold text-slate-900 text-center mb-12">
            Our Values
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="p-4 bg-white rounded-xl shadow-sm border border-slate-200 h-full">
                  <div className="p-3 bg-red-100 rounded-full w-fit mx-auto mb-4">
                    <value.icon className="h-8 w-8 text-red-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-slate-900 mb-3">
                    {value.title}
                  </h3>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    {value.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* How It Works */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="bg-gradient-to-r from-red-50 to-pink-50 rounded-xl p-8 border border-red-200"
        >
          <h2 className="text-3xl font-semibold text-slate-900 text-center mb-8">
            How It Works
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-red-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                1
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-3">
                Register & Verify
              </h3>
              <p className="text-slate-700">
                Create an account as a donor or recipient. Complete verification to ensure platform safety.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-red-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                2
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-3">
                Connect & Donate
              </h3>
              <p className="text-slate-700">
                Browse requests or post your needs. Make secure donations or receive help from verified users.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-red-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                3
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-3">
                Track Impact
              </h3>
              <p className="text-slate-700">
                Follow the impact of your donations and see how your generosity makes a real difference.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
