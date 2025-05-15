"use client";

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowRight, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { LazyImage } from '@/components/ui/lazy-image';
import { trackEvent } from '@/lib/analytics';

export interface FeatureDetail {
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  image: string;
  benefits: string[];
  demoUrl?: string;
}

interface FeatureSpotlightProps {
  feature: FeatureDetail | null;
  onClose: () => void;
}

export const FeatureSpotlight: React.FC<FeatureSpotlightProps> = ({
  feature,
  onClose
}) => {
  if (!feature) return null;

  // Track feature spotlight view
  React.useEffect(() => {
    if (feature) {
      trackEvent('feature_spotlight_view', 'content', feature.title);
    }
  }, [feature]);

  return (
    <AnimatePresence>
      {feature && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ duration: 0.3, type: 'spring', bounce: 0.2 }}
            className="relative bg-white dark:bg-slate-900 rounded-xl shadow-2xl max-w-4xl w-full overflow-hidden"
          >
            {/* Close button */}
            <button
              className="absolute top-4 right-4 text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200 z-10"
              onClick={onClose}
            >
              <X className="h-6 w-6" />
            </button>

            <div className="grid grid-cols-1 md:grid-cols-2">
              {/* Image */}
              <div className="relative h-64 md:h-auto bg-gradient-to-br from-slate-900 to-slate-800">
                <div className="absolute inset-0 opacity-20 bg-[url('/grid-pattern.svg')] bg-repeat"></div>
                <div className="absolute inset-0 flex items-center justify-center p-8">
                  <LazyImage
                    src={feature.image}
                    alt={feature.title}
                    width={400}
                    height={300}
                    className="object-contain max-h-full rounded-lg shadow-lg"
                    loadingComponent={
                      <div className="flex flex-col items-center justify-center">
                        <Loader2 className="h-8 w-8 animate-spin text-blue-400 mb-2" />
                        <p className="text-blue-200 text-sm">Loading image...</p>
                      </div>
                    }
                    onLoadingComplete={() => {
                      // Track image load success for analytics
                      trackEvent('feature_image_loaded', 'content', feature.title);
                    }}
                    onLoadingError={() => {
                      // Track image load error for analytics
                      trackEvent('feature_image_error', 'error', feature.title);
                    }}
                  />
                </div>

                {/* Feature icon */}
                <div className={`absolute top-4 left-4 w-12 h-12 rounded-lg flex items-center justify-center bg-gradient-to-r ${feature.color} text-white shadow-lg`}>
                  {feature.icon}
                </div>
              </div>

              {/* Content */}
              <div className="p-6 md:p-8">
                <h3 className="text-2xl font-bold mb-2 dark:text-white">{feature.title}</h3>
                <p className="text-slate-600 dark:text-slate-300 mb-6">{feature.description}</p>

                <h4 className="text-lg font-semibold mb-3 dark:text-white">Key Benefits</h4>
                <ul className="space-y-2 mb-6">
                  {feature.benefits.map((benefit, index) => (
                    <motion.li
                      key={index}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-start"
                    >
                      <div className={`w-5 h-5 rounded-full flex-shrink-0 flex items-center justify-center bg-gradient-to-r ${feature.color} text-white mr-2 mt-0.5`}>
                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M10 3L4.5 8.5L2 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </div>
                      <span className="text-slate-700 dark:text-slate-200">{benefit}</span>
                    </motion.li>
                  ))}
                </ul>

                {feature.demoUrl && (
                  <Button
                    className={`bg-gradient-to-r ${feature.color} text-white hover:shadow-lg transition-shadow`}
                    onClick={() => {
                      // Track demo click for analytics
                      trackEvent('feature_demo_click', 'conversion', feature.title);
                      // Navigate to demo URL
                      window.location.href = feature.demoUrl as string;
                    }}
                  >
                    Try it now
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
