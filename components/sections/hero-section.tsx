'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Play, Pause } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

interface CarouselItem {
  id: number;
  type: 'video' | 'image';
  src: string;
  poster?: string;
  alt: string;
  title: string;
  subtitle: string;
}

const carouselItems: CarouselItem[] = [
  {
    id: 1,
    type: 'image',
    src: '/images/hero-poster.jpg',
    alt: 'Donare community helping each other',
    title: 'Building Bridges of Hope',
    subtitle: 'Connecting hearts, changing lives through the power of giving'
  },
  {
    id: 2,
    type: 'image',
    src: '/images/hero-1.jpg',
    alt: 'People sharing resources',
    title: 'Share What Matters',
    subtitle: 'Every donation creates a ripple of positive change'
  },
  {
    id: 3,
    type: 'image',
    src: '/images/hero-2.jpg',
    alt: 'Education support',
    title: 'Empowering Through Education',
    subtitle: 'Knowledge shared is knowledge multiplied'
  },
  {
    id: 4,
    type: 'image',
    src: '/images/hero-3.jpg',
    alt: 'Medical assistance',
    title: 'Healthcare for All',
    subtitle: 'Because everyone deserves access to medical care'
  },
  {
    id: 5,
    type: 'image',
    src: '/images/hero-4.jpg',
    alt: 'Community support',
    title: 'Stronger Together',
    subtitle: 'Building resilient communities through mutual support'
  }
];

export default function HeroSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isVideoPlaying, setIsVideoPlaying] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const router = useRouter();

  const currentItem = carouselItems[currentIndex];

  // Auto-rotation functionality
  useEffect(() => {
    if (isPlaying) {
      intervalRef.current = setInterval(() => {
        setCurrentIndex((prevIndex) => 
          prevIndex === carouselItems.length - 1 ? 0 : prevIndex + 1
        );
      }, 5000);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isPlaying]);

  // Handle video play/pause
  useEffect(() => {
    if (currentItem.type === 'video' && videoRef.current) {
      if (isVideoPlaying) {
        videoRef.current.play().catch(console.error);
      } else {
        videoRef.current.pause();
      }
    }
  }, [currentItem.type, isVideoPlaying, currentIndex]);

  const goToPrevious = () => {
    setCurrentIndex(currentIndex === 0 ? carouselItems.length - 1 : currentIndex - 1);
  };

  const goToNext = () => {
    setCurrentIndex(currentIndex === carouselItems.length - 1 ? 0 : currentIndex + 1);
  };

  const toggleAutoPlay = () => {
    setIsPlaying(!isPlaying);
  };

  const toggleVideoPlay = () => {
    setIsVideoPlaying(!isVideoPlaying);
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'ArrowLeft') {
      goToPrevious();
    } else if (event.key === 'ArrowRight') {
      goToNext();
    } else if (event.key === ' ') {
      event.preventDefault();
      if (currentItem.type === 'video') {
        toggleVideoPlay();
      } else {
        toggleAutoPlay();
      }
    }
  };

  return (
    
    <section 
      className="relative h-screen w-full overflow-hidden bg-black"
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="region"
      aria-label="Hero carousel"
    >
      {/* <div className="absolute inset-0 bg-black/80"></div> */}
      {/* Carousel Content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: 'easeInOut' }}
          className="absolute inset-0"
        >
          {currentItem.type === 'video' ? (
            <video
              ref={videoRef}
              className="w-full h-full object-cover"
              muted
              loop
              playsInline
              poster={currentItem.poster}
              aria-label={currentItem.alt}
            >
              <source src={currentItem.src} type="video/mp4" />
              <source src={currentItem.src.replace('.mp4', '.webm')} type="video/webm" />
              Your browser does not support the video tag.
            </video>
          ) : (
            <img
              src={currentItem.src}
              alt={currentItem.alt}
              className="w-full h-full object-cover"
              loading="lazy"
            />
          )}
        </motion.div>
      </AnimatePresence>

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/70" />

      {/* Content */}
      <div className="absolute inset-0 flex items-center justify-center text-center text-white z-10">
        <motion.div
          key={`content-${currentIndex}`}
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -50, opacity: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="max-w-4xl mx-auto px-6"
        >
          <motion.h1 
            className="text-4xl md:text-6xl lg:text-7xl font-heading font-bold mb-6"
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            {currentItem.title}
          </motion.h1>
          <motion.p 
            className="text-lg md:text-xl lg:text-2xl mb-8 text-white/90"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            {currentItem.subtitle}
          </motion.p>
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Button 
              size="lg" 
              className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-3 text-lg font-semibold btn-hover-lift"
              onClick={() => router.push('/donations')}
            >
              Start Donating
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-white text-black px-8 py-3 text-lg font-semibold btn-hover-lift"
              onClick={() => router.push('/donations')}
            >
              Request Help
            </Button>
          </motion.div>
        </motion.div>
      </div>

      {/* Navigation Arrows */}
      <Button
        variant="ghost"
        size="icon"
        className="absolute left-5 top-1/2 transform -translate-y-1/2 z-20 text-white hover:bg-white/20 opacity-70 hover:opacity-100 transition-all duration-300"
        onClick={goToPrevious}
        aria-label="Previous slide"
      >
        <ChevronLeft className="h-8 w-8" />
      </Button>

      <Button
        variant="ghost"
        size="icon"
        className="absolute right-5 top-1/2 transform -translate-y-1/2 z-20 text-white hover:bg-white/20 opacity-70 hover:opacity-100 transition-all duration-300"
        onClick={goToNext}
        aria-label="Next slide"
      >
        <ChevronRight className="h-8 w-8" />
      </Button>

      {/* Video Controls */}
      {currentItem.type === 'video' && (
        <Button
          variant="ghost"
          size="icon"
          className="absolute bottom-20 right-5 z-20 text-white hover:bg-white/20 opacity-70 hover:opacity-100 transition-all duration-300"
          onClick={toggleVideoPlay}
          aria-label={isVideoPlaying ? 'Pause video' : 'Play video'}
        >
          {isVideoPlaying ? <Pause className="h-6 w-6" /> : <Play className="h-6 w-6" />}
        </Button>
      )}

      {/* Indicators */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 flex space-x-2">
        {carouselItems.map((_, index) => (
          <button
            key={index}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentIndex ? 'bg-white' : 'bg-white/50 hover:bg-white/70'
            }`}
            onClick={() => setCurrentIndex(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Auto-play Toggle */}
      <Button
        variant="ghost"
        size="sm"
        className="absolute bottom-20 left-5 z-20 text-white hover:bg-white/20 opacity-70 hover:opacity-100 transition-all duration-300"
        onClick={toggleAutoPlay}
        aria-label={isPlaying ? 'Pause auto-play' : 'Resume auto-play'}
      >
        {isPlaying ? 'Pause' : 'Play'}
      </Button>
    </section>
  );
}
