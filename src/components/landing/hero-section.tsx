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
    <section className="relative overflow-hidden bg-blue-600 py-16 md:py-24">
      {/* Background pattern - removed for cleaner look */}

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
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-4">
                Personalized<br />
                Recovery<br />
                Powered By<br />
                Movement<br />
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

          {/* Image/Illustration - simplified to match design */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{
              opacity: imageLoaded ? 1 : 0,
              scale: imageLoaded ? 1 : 0.9
            }}
            transition={{ duration: 0.8 }}
            className="relative hidden lg:block"
          >
            <div className="relative w-full h-[400px]">
              <LazyImage
                src="/rehabilitation-scene.jpg"
                alt="Smart Rehabilitation Ecosystem"
                fill
                className="object-contain"
                onLoadingComplete={() => setImageLoaded(true)}
                onLoadingError={() => setImageLoaded(true)}
                loadingComponent={
                  <div className="flex flex-col items-center justify-center h-full">
                    <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-4"></div>
                    <p className="text-gray-400 text-sm">Loading image...</p>
                  </div>
                }
              />

              {/* Fallback if image doesn't exist */}
              {!imageLoaded && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-6xl mb-4">🏥</div>
                    <div className="text-xl font-medium text-gray-300">Rehabilitation Scene</div>
                  </div>
                </div>
              )}
            </div>
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
