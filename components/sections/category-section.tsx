'use client';

import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowRight, Heart, Shield, Zap } from 'lucide-react';

interface CategorySectionProps {
  id: string;
  title: string;
  description: string;
  backgroundImage: string;
  icon: React.ReactNode;
  primaryCTA: string;
  secondaryCTA: string;
  primaryHref: string;
  secondaryHref: string;
  features: string[];
  stats?: {
    label: string;
    value: string;
  }[];
  colorScheme?: 'blue' | 'green' | 'orange' | 'purple' | 'red' | 'teal';
}

const colorSchemes = {
  blue: {
    gradient: 'from-blue-600/80 to-blue-800/80',
    accent: 'text-blue-400',
    button: 'bg-blue-600 hover:bg-blue-700',
    card: 'border-blue-200/20 bg-blue-50/10'
  },
  green: {
    gradient: 'from-green-600/80 to-green-800/80',
    accent: 'text-green-400',
    button: 'bg-green-600 hover:bg-green-700',
    card: 'border-green-200/20 bg-green-50/10'
  },
  orange: {
    gradient: 'from-orange-600/80 to-orange-800/80',
    accent: 'text-orange-400',
    button: 'bg-orange-600 hover:bg-orange-700',
    card: 'border-orange-200/20 bg-orange-50/10'
  },
  purple: {
    gradient: 'from-purple-600/80 to-purple-800/80',
    accent: 'text-purple-400',
    button: 'bg-purple-600 hover:bg-purple-700',
    card: 'border-purple-200/20 bg-purple-50/10'
  },
  red: {
    gradient: 'from-red-600/80 to-red-800/80',
    accent: 'text-red-400',
    button: 'bg-red-600 hover:bg-red-700',
    card: 'border-red-200/20 bg-red-50/10'
  },
  teal: {
    gradient: 'from-teal-600/80 to-teal-800/80',
    accent: 'text-teal-400',
    button: 'bg-teal-600 hover:bg-teal-700',
    card: 'border-teal-200/20 bg-teal-50/10'
  }
};

export default function CategorySection({
  id,
  title,
  description,
  backgroundImage,
  icon,
  primaryCTA,
  secondaryCTA,
  primaryHref,
  secondaryHref,
  features,
  stats,
  colorScheme = 'blue'
}: CategorySectionProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const colors = colorSchemes[colorScheme];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.8,
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  } as const;

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        bounce: 0.3,
        duration: 0.8
      }
    }
  } as const;

  return (
    <section
      id={id}
      ref={ref}
      className="relative min-h-[80vh] flex items-center py-20 overflow-hidden"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}
    >
      {/* Parallax Background Overlay */}
      <div className={`absolute inset-0 bg-gradient-to-br ${colors.gradient}`} />
      
      {/* Content */}
      <div className="relative z-10 container mx-auto px-6">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid lg:grid-cols-2 gap-12 items-center"
        >
          {/* Text Content */}
          <motion.div variants={itemVariants} className="text-white">
            <div className="flex items-center space-x-4 mb-6">
              <motion.div
                whileHover={{ scale: 1.1, rotate: 5 }}
                className={`p-3 rounded-full bg-white/20 backdrop-blur-sm ${colors.accent}`}
              >
                {icon}
              </motion.div>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold">
                {title}
              </h2>
            </div>
            
            <motion.p 
              variants={itemVariants}
              className="text-lg md:text-xl text-white/90 mb-8 leading-relaxed"
            >
              {description}
            </motion.p>

            {/* Features */}
            <motion.div variants={itemVariants} className="mb-8">
              <h3 className="text-xl font-semibold mb-4 flex items-center">
                <Shield className="h-5 w-5 mr-2" />
                Key Features
              </h3>
              <ul className="space-y-2">
                {features.map((feature, index) => (
                  <motion.li
                    key={index}
                    variants={itemVariants}
                    className="flex items-center text-white/90"
                  >
                    <Zap className="h-4 w-4 mr-3 text-yellow-400" />
                    {feature}
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            {/* CTAs */}
            <motion.div 
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Button
                size="lg"
                className={`${colors.button} text-white px-8 py-3 text-lg font-semibold btn-hover-lift group`}
                asChild
              >
                <a href={primaryHref}>
                  {primaryCTA}
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </a>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white text-black px-8 py-3 text-lg font-semibold btn-hover-lift"
                asChild
              >
                <a href={secondaryHref}>
                  {secondaryCTA}
                </a>
              </Button>
            </motion.div>
          </motion.div>

          {/* Stats/Info Card */}
          <motion.div variants={itemVariants}>
            <Card className={`${colors.card} backdrop-blur-sm border text-white`}>
              <CardContent className="p-8">
                {stats ? (
                  <>
                    <h3 className="text-2xl font-heading font-bold mb-6 flex items-center">
                      <Heart className="h-6 w-6 mr-2 text-red-400" />
                      Impact Statistics
                    </h3>
                    <div className="grid grid-cols-2 gap-6">
                      {stats.map((stat, index) => (
                        <motion.div
                          key={index}
                          variants={itemVariants}
                          className="text-center"
                        >
                          <div className="text-3xl font-bold mb-2">{stat.value}</div>
                          <div className="text-sm text-white/80">{stat.label}</div>
                        </motion.div>
                      ))}
                    </div>
                  </>
                ) : (
                  <>
                    <h3 className="text-2xl font-heading font-bold mb-4">
                      How It Works
                    </h3>
                    <div className="space-y-4">
                      <div className="flex items-start space-x-3">
                        <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-sm font-bold">
                          1
                        </div>
                        <div>
                          <h4 className="font-semibold">Submit Request</h4>
                          <p className="text-sm text-white/80">Fill out our secure form with your needs</p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-3">
                        <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-sm font-bold">
                          2
                        </div>
                        <div>
                          <h4 className="font-semibold">Verification</h4>
                          <p className="text-sm text-white/80">Our team verifies your request</p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-3">
                        <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-sm font-bold">
                          3
                        </div>
                        <div>
                          <h4 className="font-semibold">Get Help</h4>
                          <p className="text-sm text-white/80">Receive support from our community</p>
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
