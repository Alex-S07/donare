'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';

const navigationItems = [
  { name: 'Money', href: '/money', icon: '💰' },
  { name: 'Clothes', href: '/clothes', icon: '👕' },
  { name: 'Education', href: '/education', icon: '📚' },
  { name: 'Household', href: '/household', icon: '🏠' },
  { name: 'Medical', href: '/medical', icon: '🏥' },
  { name: 'Electronics', href: '/electronics', icon: '💻' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeItem, setActiveItem] = useState('');
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // Set active item based on current path
    if (typeof window !== 'undefined') {
      const path = window.location.pathname;
      const currentItem = navigationItems.find(item => item.href === path);
      setActiveItem(currentItem?.name || '');
    }
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Escape') {
      closeMenu();
    }
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className={`fixed top-4 left-1/2 transform -translate-x-1/2 z-50 transition-all duration-300 ${
          scrolled ? 'backdrop-blur-nav bg-white/80 shadow-donare-lg' : 'backdrop-blur-nav bg-white/70'
        }`}
        style={{
          borderRadius: '12px',
          border: '1px solid rgba(255, 255, 255, 0.2)',
        }}
        onKeyDown={handleKeyDown}
      >
        <div className="px-6 py-3">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-2 group">
              <motion.div
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ type: 'spring', stiffness: 400, damping: 10 }}
              >
                <Heart className="h-8 w-8 text-primary fill-current" />
              </motion.div>
              <span className="text-xl font-heading font-bold text-foreground group-hover:text-primary transition-colors duration-300">
                Donare
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-1">
              {navigationItems.map((item) => (
                <Link key={item.name} href={item.href}>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`relative px-4 py-2 rounded-lg transition-all duration-300 ${
                      activeItem === item.name
                        ? 'bg-primary text-primary-foreground shadow-donare'
                        : 'text-foreground hover:bg-primary/10 hover:text-primary'
                    }`}
                  >
                    <span className="flex items-center space-x-2 text-sm font-medium">
                      <span className="text-base">{item.icon}</span>
                      <span>{item.name}</span>
                    </span>
                    {activeItem === item.name && (
                      <motion.div
                        layoutId="activeIndicator"
                        className="absolute inset-0 bg-primary rounded-lg -z-10"
                        initial={false}
                        transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                      />
                    )}
                  </motion.div>
                </Link>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="sm"
              className="md:hidden p-2"
              onClick={toggleMenu}
              aria-label={isOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={isOpen}
            >
              <motion.div
                animate={{ rotate: isOpen ? 180 : 0 }}
                transition={{ duration: 0.3 }}
              >
                {isOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </motion.div>
            </Button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-black/50 z-40 md:hidden"
              onClick={closeMenu}
            />

            {/* Mobile Menu */}
            <motion.div
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              className="fixed top-20 left-1/2 transform -translate-x-1/2 z-50 w-80 max-w-[90vw] md:hidden"
            >
              <div className="backdrop-blur-nav bg-white/90 rounded-xl border border-white/20 shadow-donare-lg p-6">
                <div className="space-y-2">
                  {navigationItems.map((item, index) => (
                    <motion.div
                      key={item.name}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1, duration: 0.3 }}
                    >
                      <Link href={item.href} onClick={closeMenu}>
                        <div
                          className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-300 ${
                            activeItem === item.name
                              ? 'bg-primary text-primary-foreground shadow-donare'
                              : 'text-foreground hover:bg-primary/10 hover:text-primary'
                          }`}
                        >
                          <span className="text-xl">{item.icon}</span>
                          <span className="font-medium">{item.name}</span>
                        </div>
                      </Link>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
