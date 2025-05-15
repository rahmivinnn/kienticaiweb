"use client";

import React from 'react';
import { motion } from 'framer-motion';

interface StepProps {
  number: number;
  title: string;
  description: string;
}

const Step: React.FC<StepProps> = ({ number, title, description }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: number * 0.1 }}
      className="flex flex-col items-center"
    >
      <div className="w-12 h-12 rounded-full bg-blue-500 text-white flex items-center justify-center text-xl font-bold mb-4">
        {number}
      </div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-600 text-center max-w-xs text-sm">
        {description}
      </p>
    </motion.div>
  );
};

const HowItWorks = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <Step 
            number={1} 
            title="Initial Assessment" 
            description="Complete a comprehensive evaluation of your condition and goals" 
          />
          <Step 
            number={2} 
            title="Personalized Plan" 
            description="Receive a customized therapy program tailored to your needs" 
          />
          <Step 
            number={3} 
            title="Track Progress" 
            description="Monitor your improvements with detailed analytics and feedback" 
          />
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
