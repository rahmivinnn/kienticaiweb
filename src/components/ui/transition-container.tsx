"use client";

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Loader2 } from 'lucide-react';

interface TransitionContainerProps {
  children: React.ReactNode;
  isTransitioning: boolean;
}

export const TransitionContainer: React.FC<TransitionContainerProps> = ({
  children,
  isTransitioning
}) => {
  const [showLoader, setShowLoader] = useState(false);
  
  // Show loader after a short delay when transitioning
  useEffect(() => {
    let timeout: NodeJS.Timeout;
    
    if (isTransitioning) {
      timeout = setTimeout(() => {
        setShowLoader(true);
      }, 300);
    } else {
      setShowLoader(false);
    }
    
    return () => {
      if (timeout) clearTimeout(timeout);
    };
  }, [isTransitioning]);
  
  return (
    <div className="relative">
      {/* Main content */}
      <motion.div
        animate={{
          opacity: isTransitioning ? 0 : 1,
          scale: isTransitioning ? 0.98 : 1,
          filter: isTransitioning ? 'blur(5px)' : 'blur(0px)'
        }}
        transition={{ duration: 0.5 }}
      >
        {children}
      </motion.div>
      
      {/* Transition overlay */}
      <AnimatePresence>
        {isTransitioning && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="fixed inset-0 bg-gradient-to-b from-blue-900 to-blue-700 z-50 flex flex-col items-center justify-center"
          >
            <AnimatePresence>
              {showLoader && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className="text-center"
                >
                  <Loader2 className="h-12 w-12 animate-spin text-white mx-auto mb-4" />
                  <h2 className="text-2xl font-bold text-white mb-2">
                    Preparing Your Experience
                  </h2>
                  <p className="text-blue-200">
                    Loading the 3D interface...
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
