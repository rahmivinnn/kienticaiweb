"use client";

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { VideoModal } from '@/components/ui/video-modal';
import { LazyImage } from '@/components/ui/lazy-image';
import { ArrowRight, Play } from 'lucide-react';

interface HeroSectionProps {
  onGetStartedClick: () => void;
  onWatchDemoClick?: () => void; // Made optional since we'll handle it internally
}

const HeroSection: React.FC<HeroSectionProps> = ({
  onGetStartedClick,
  onWatchDemoClick
}) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [videoModalOpen, setVideoModalOpen] = useState(false);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  // Handle watch demo click
  const handleWatchDemoClick = () => {
    setVideoModalOpen(true);
    if (onWatchDemoClick) {
      onWatchDemoClick();
    }
  };

  return (
    <section className="relative overflow-hidden bg-[#0A0E1A] py-20 md:py-32">
      {/* Background pattern */}
      <div className="absolute inset-0 z-0 opacity-10">
        <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] bg-repeat"></div>
      </div>

      {/* Content container */}
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Text content */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="text-center lg:text-left"
          >
            <motion.div variants={itemVariants}>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight mb-4">
                Personalized Recovery<br />
                Powered By Movement<br />
                Intelligence
              </h1>
            </motion.div>

            <motion.div variants={itemVariants}>
              <p className="text-base md:text-lg text-gray-300 mb-8 max-w-xl mx-auto lg:mx-0">
                Transform your rehabilitation with intelligent movement coaching and data-driven therapy. Our platform bridges home exercises with clinical expertise for a smoother, faster recovery experience.
              </p>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
            >
              <Button
                size="lg"
                className="bg-blue-500 hover:bg-blue-600 text-white"
                onClick={onGetStartedClick}
              >
                Start Your Journey
              </Button>

              <Button
                size="lg"
                variant="outline"
                className="border-white/30 text-white hover:bg-white/10"
                onClick={handleWatchDemoClick}
              >
                Watch Demo
              </Button>
            </motion.div>
          </motion.div>

          {/* Image/Illustration */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{
              opacity: imageLoaded ? 1 : 0,
              scale: imageLoaded ? 1 : 0.9
            }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="relative aspect-[4/3] max-w-lg mx-auto rounded-xl overflow-hidden shadow-2xl bg-[#F0E7FF]">
              <LazyImage
                src="/rehabilitation-scene.jpg"
                alt="Smart Rehabilitation Ecosystem"
                fill
                className="object-cover"
                onLoadingComplete={() => setImageLoaded(true)}
                onLoadingError={() => setImageLoaded(true)}
                loadingComponent={
                  <div className="flex flex-col items-center justify-center h-full">
                    <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-4"></div>
                    <p className="text-gray-600 text-sm">Loading image...</p>
                  </div>
                }
              />

              {/* Fallback if image doesn't exist */}
              {!imageLoaded && (
                <div className="absolute inset-0 flex items-center justify-center bg-[#F0E7FF]">
                  <div className="text-center">
                    <div className="text-6xl mb-4">🏥</div>
                    <div className="text-xl font-medium text-gray-700">Rehabilitation Scene</div>
                  </div>
                </div>
              )}
            </div>

            {/* Second image below */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: imageLoaded ? 1 : 0, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="relative mt-4 aspect-[16/5] max-w-lg mx-auto rounded-xl overflow-hidden shadow-lg bg-gray-200"
            >
              <LazyImage
                src="/medical-equipment.jpg"
                alt="Medical Equipment"
                fill
                className="object-cover"
                onLoadingComplete={() => setImageLoaded(true)}
                onLoadingError={() => setImageLoaded(true)}
              />
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Video Modal */}
      <VideoModal
        isOpen={videoModalOpen}
        onClose={() => setVideoModalOpen(false)}
        videoSrc="/kinetic-demo.mp4"
        title="Kinetic AI Movement Analysis Demo"
        description="See how our AI-powered platform analyzes movement patterns in real-time to provide personalized feedback and improve recovery outcomes."
      />
    </section>
  );
};

export default HeroSection;
