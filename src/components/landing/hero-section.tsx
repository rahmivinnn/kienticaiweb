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
    <section className="relative overflow-hidden bg-gradient-to-b from-blue-900 to-blue-700 py-20 md:py-32">
      {/* Background pattern */}
      <div className="absolute inset-0 z-0 opacity-20">
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
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
                Personalized Recovery <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-purple-400">Powered By Movement Intelligence</span>
              </h1>
            </motion.div>

            <motion.div variants={itemVariants}>
              <p className="text-xl text-blue-100 mb-8 max-w-xl mx-auto lg:mx-0">
                Transform your rehabilitation with intelligent movement coaching and data-driven therapy. Our platform bridges home exercises with clinical expertise for a smoother, faster recovery experience.
              </p>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
            >
              <Button
                size="lg"
                className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-lg"
                onClick={onGetStartedClick}
              >
                Get Started
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>

              <Button
                size="lg"
                variant="outline"
                className="border-blue-400 text-blue-100 hover:bg-blue-900/20"
                onClick={handleWatchDemoClick}
              >
                <Play className="mr-2 h-4 w-4" />
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
            <div className="relative aspect-video max-w-lg mx-auto rounded-xl overflow-hidden shadow-2xl border border-blue-400/30">
              <LazyImage
                src="/movement-analysis-demo.jpg"
                alt="Kinetic AI Movement Analysis"
                fill
                className="object-cover"
                onLoadingComplete={() => setImageLoaded(true)}
                onLoadingError={() => setImageLoaded(true)}
                loadingComponent={
                  <div className="flex flex-col items-center justify-center">
                    <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-4"></div>
                    <p className="text-blue-100 text-sm">Loading movement analysis demo...</p>
                  </div>
                }
              />

              {/* Overlay with skeleton tracking visualization */}
              <div className="absolute inset-0 bg-gradient-to-r from-blue-900/40 to-transparent">
                <div className="absolute inset-0 bg-[url('/skeleton-overlay.svg')] bg-no-repeat bg-center bg-contain opacity-70"></div>
              </div>

              {/* Play button overlay */}
              <div
                className="absolute inset-0 flex items-center justify-center cursor-pointer group"
                onClick={handleWatchDemoClick}
              >
                <div className="w-16 h-16 rounded-full bg-blue-600/80 flex items-center justify-center transition-transform group-hover:scale-110">
                  <Play className="h-8 w-8 text-white ml-1" />
                </div>
              </div>

              {/* Fallback if image doesn't exist */}
              {!imageLoaded && (
                <div className="absolute inset-0 flex items-center justify-center bg-blue-800/50">
                  <div className="text-white text-center">
                    <div className="text-6xl mb-4">🏃</div>
                    <div className="text-xl font-medium">Movement Analysis</div>
                  </div>
                </div>
              )}
            </div>

            {/* Floating elements */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.6 }}
              className="absolute -top-4 -right-4 bg-white/10 backdrop-blur-sm p-4 rounded-lg border border-white/20 shadow-lg"
            >
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                <span className="text-white text-sm font-medium">Real-time Analysis</span>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.6 }}
              className="absolute -bottom-4 -left-4 bg-white/10 backdrop-blur-sm p-4 rounded-lg border border-white/20 shadow-lg"
            >
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-purple-400 rounded-full"></div>
                <span className="text-white text-sm font-medium">AI-Powered Feedback</span>
              </div>
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
