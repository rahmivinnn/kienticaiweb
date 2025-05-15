"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Activity, Brain, BarChart2, Shield } from 'lucide-react';

const RehabilitationEcosystem = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Smart Rehabilitation Ecosystem</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Comprehensive tools designed by rehabilitation specialists and AI engineers
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {/* Movement Intelligence */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="bg-white p-6 rounded-lg shadow-md border border-gray-100 hover:shadow-lg transition-shadow"
          >
            <div className="flex justify-center mb-4">
              <div className="w-12 h-12 flex items-center justify-center">
                <Brain className="h-6 w-6 text-black" />
              </div>
            </div>
            <h3 className="text-xl font-semibold text-center mb-3">Movement Intelligence</h3>
            <p className="text-gray-600 text-center text-sm">
              Computer vision technology that analyzes each movement to ensure therapeutic effectiveness
            </p>
          </motion.div>

          {/* Responsive Therapy Plans */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="bg-white p-6 rounded-lg shadow-md border border-gray-100 hover:shadow-lg transition-shadow"
          >
            <div className="flex justify-center mb-4">
              <div className="w-12 h-12 flex items-center justify-center">
                <Activity className="h-6 w-6 text-black" />
              </div>
            </div>
            <h3 className="text-xl font-semibold text-center mb-3">Responsive Therapy Plans</h3>
            <p className="text-gray-600 text-center text-sm">
              Dynamic rehabilitation protocols that evolve based on your performance and recovery indicators
            </p>
          </motion.div>

          {/* Recovery Analytics */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-white p-6 rounded-lg shadow-md border border-gray-100 hover:shadow-lg transition-shadow"
          >
            <div className="flex justify-center mb-4">
              <div className="w-12 h-12 flex items-center justify-center">
                <BarChart2 className="h-6 w-6 text-black" />
              </div>
            </div>
            <h3 className="text-xl font-semibold text-center mb-3">Recovery Analytics</h3>
            <p className="text-gray-600 text-center text-sm">
              Visual progress reports with actionable insights to keep your recovery on track
            </p>
          </motion.div>

          {/* Clinical-Grade Privacy */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="bg-white p-6 rounded-lg shadow-md border border-gray-100 hover:shadow-lg transition-shadow"
          >
            <div className="flex justify-center mb-4">
              <div className="w-12 h-12 flex items-center justify-center">
                <Shield className="h-6 w-6 text-black" />
              </div>
            </div>
            <h3 className="text-xl font-semibold text-center mb-3">Clinical-Grade Privacy</h3>
            <p className="text-gray-600 text-center text-sm">
              Enterprise-level security ensuring your medical information meets healthcare compliance standards
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default RehabilitationEcosystem;
