"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowRight, CheckCircle2 } from 'lucide-react';

interface CTASectionProps {
  onSignUpClick: () => void;
}

const CTASection: React.FC<CTASectionProps> = ({ onSignUpClick }) => {
  // Benefits list
  const benefits = [
    "Personalized recovery plans",
    "Real-time movement analysis",
    "Expert feedback on your form",
    "Progress tracking and insights",
    "Connect with physiotherapists",
    "Access from any device"
  ];
  
  return (
    <section className="py-20 bg-gradient-to-b from-blue-900 to-blue-700 relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 z-0 opacity-10">
        <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] bg-repeat"></div>
      </div>
      
      {/* Animated circles */}
      <motion.div
        className="absolute top-20 right-20 w-64 h-64 rounded-full bg-blue-500/20 blur-3xl"
        animate={{
          x: [0, 30, 0],
          y: [0, -30, 0],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          repeatType: "reverse"
        }}
      />
      
      <motion.div
        className="absolute bottom-20 left-20 w-80 h-80 rounded-full bg-indigo-500/20 blur-3xl"
        animate={{
          x: [0, -40, 0],
          y: [0, 40, 0],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          repeatType: "reverse"
        }}
      />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Text content */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">
                Start Your Recovery Journey <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-purple-400">Today</span>
              </h2>
              
              <p className="text-xl text-blue-100 mb-8">
                Join thousands of patients and healthcare professionals who are already experiencing the benefits of AI-powered movement analysis.
              </p>
              
              <ul className="space-y-3 mb-8">
                {benefits.map((benefit, index) => (
                  <motion.li
                    key={index}
                    className="flex items-start text-blue-100"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <CheckCircle2 className="h-5 w-5 text-green-400 mr-2 mt-0.5 flex-shrink-0" />
                    <span>{benefit}</span>
                  </motion.li>
                ))}
              </ul>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                <Button 
                  size="lg" 
                  className="bg-white text-blue-700 hover:bg-blue-50"
                  onClick={onSignUpClick}
                >
                  Sign Up Now
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                
                <p className="text-sm text-blue-200 mt-4">
                  No credit card required. Start with a free account.
                </p>
              </motion.div>
            </motion.div>
            
            {/* Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 shadow-xl"
            >
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-white mb-2">Premium Plan</h3>
                <div className="flex items-center justify-center">
                  <span className="text-4xl font-bold text-white">$29</span>
                  <span className="text-blue-200 ml-2">/month</span>
                </div>
                <p className="text-blue-200 mt-2">Billed annually or $39 monthly</p>
              </div>
              
              <ul className="space-y-4 mb-8">
                {[
                  "Unlimited movement analysis",
                  "Advanced progress tracking",
                  "Custom exercise programs",
                  "Video consultations",
                  "Priority support",
                  "Export and share reports"
                ].map((feature, index) => (
                  <motion.li
                    key={index}
                    className="flex items-start text-blue-100"
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <CheckCircle2 className="h-5 w-5 text-green-400 mr-2 mt-0.5 flex-shrink-0" />
                    <span>{feature}</span>
                  </motion.li>
                ))}
              </ul>
              
              <Button 
                size="lg" 
                className="w-full bg-white text-blue-700 hover:bg-blue-50"
                onClick={onSignUpClick}
              >
                Start 14-Day Free Trial
              </Button>
              
              <p className="text-sm text-blue-200 mt-4 text-center">
                Cancel anytime. No obligations.
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
