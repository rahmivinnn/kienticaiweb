"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

interface RecoveryJourneyCTAProps {
  onBeginJourneyClick: () => void;
}

const RecoveryJourneyCTA: React.FC<RecoveryJourneyCTAProps> = ({
  onBeginJourneyClick
}) => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl font-bold mb-4">Ready to Start Your Recovery Journey?</h2>
          <p className="text-gray-600 max-w-2xl mx-auto mb-8">
            Join thousands of patients who have successfully recovered using our platform
          </p>
          
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button 
              size="lg"
              className="bg-blue-500 hover:bg-blue-600 text-white px-8"
              onClick={onBeginJourneyClick}
            >
              Begin Your Journey
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default RecoveryJourneyCTA;
