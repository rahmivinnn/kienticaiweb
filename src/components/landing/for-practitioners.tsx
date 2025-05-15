"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Users, BarChart, UserPlus } from 'lucide-react';

const ForPractitioners = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">For Practitioners</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Enhance your practice with AI-powered rehabilitation tools
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {/* Clinical Integration */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="bg-white p-6 rounded-lg shadow-md border border-gray-100 hover:shadow-lg transition-shadow"
          >
            <div className="flex justify-center mb-4">
              <div className="w-12 h-12 flex items-center justify-center">
                <Users className="h-6 w-6 text-black" />
              </div>
            </div>
            <h3 className="text-xl font-semibold text-center mb-3">Clinical Integration</h3>
            <p className="text-gray-600 text-center text-sm">
              Seamlessly integrate with your existing clinical workflow and EMR systems
            </p>
          </motion.div>

          {/* Patient Monitoring */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="bg-white p-6 rounded-lg shadow-md border border-gray-100 hover:shadow-lg transition-shadow"
          >
            <div className="flex justify-center mb-4">
              <div className="w-12 h-12 flex items-center justify-center">
                <BarChart className="h-6 w-6 text-black" />
              </div>
            </div>
            <h3 className="text-xl font-semibold text-center mb-3">Patient Monitoring</h3>
            <p className="text-gray-600 text-center text-sm">
              Track patient progress remotely with detailed analytics and compliance metrics
            </p>
          </motion.div>

          {/* Practice Growth */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-white p-6 rounded-lg shadow-md border border-gray-100 hover:shadow-lg transition-shadow"
          >
            <div className="flex justify-center mb-4">
              <div className="w-12 h-12 flex items-center justify-center">
                <UserPlus className="h-6 w-6 text-black" />
              </div>
            </div>
            <h3 className="text-xl font-semibold text-center mb-3">Practice Growth</h3>
            <p className="text-gray-600 text-center text-sm">
              Expand your practice with innovative technology that attracts and retains patients
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ForPractitioners;
