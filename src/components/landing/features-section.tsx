"use client";

import React, { useState, Suspense, lazy } from 'react';
import { motion } from 'framer-motion';
import {
  Camera,
  Activity,
  MessageSquare,
  BarChart2,
  Users,
  Zap,
  Shield,
  Database,
  Info,
  Loader2
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import type { FeatureDetail } from './feature-spotlight';

// Lazy load the feature spotlight component
const FeatureSpotlight = lazy(() => import('./feature-spotlight').then(mod => ({ default: mod.FeatureSpotlight })));

const FeaturesSection: React.FC = () => {
  const [activeFeature, setActiveFeature] = useState<number | null>(null);
  const [spotlightFeature, setSpotlightFeature] = useState<FeatureDetail | null>(null);

  const features: FeatureDetail[] = [
    {
      icon: <Camera className="h-6 w-6" />,
      title: "Real-time Pose Detection",
      description: "Analyze body posture and movement in real-time using advanced AI algorithms.",
      color: "from-blue-500 to-indigo-600",
      image: "/features/pose-detection.jpg",
      benefits: [
        "Instant feedback on your form and posture",
        "Works with any standard webcam or smartphone camera",
        "No special equipment or sensors required",
        "Detects 33 key body landmarks for precise analysis"
      ],
      demoUrl: "/pose-detection-v2"
    },
    {
      icon: <Activity className="h-6 w-6" />,
      title: "Movement Analysis",
      description: "Get detailed insights into your movement patterns, joint angles, and body alignment.",
      color: "from-purple-500 to-pink-600",
      image: "/features/movement-analysis.jpg",
      benefits: [
        "Comprehensive joint angle measurements",
        "Movement path visualization and tracking",
        "Comparison with optimal movement patterns",
        "Identification of potential compensation patterns"
      ],
      demoUrl: "/openpose-analyzer"
    },
    {
      icon: <MessageSquare className="h-6 w-6" />,
      title: "Personalized Feedback",
      description: "Receive customized recommendations to improve your form and prevent injuries.",
      color: "from-green-500 to-emerald-600",
      image: "/features/personalized-feedback.jpg",
      benefits: [
        "AI-generated insights tailored to your specific needs",
        "Clear, actionable recommendations for improvement",
        "Visual guides showing correct vs. current form",
        "Progress-based adaptive feedback that evolves with you"
      ]
    },
    {
      icon: <BarChart2 className="h-6 w-6" />,
      title: "Progress Tracking",
      description: "Monitor your improvement over time with detailed metrics and visualizations.",
      color: "from-orange-500 to-red-600",
      image: "/features/progress-tracking.jpg",
      benefits: [
        "Visual timeline of your recovery journey",
        "Quantifiable metrics to measure improvement",
        "Customizable goals and milestones",
        "Shareable reports for healthcare providers"
      ],
      demoUrl: "/dashboard"
    },
    {
      icon: <Users className="h-6 w-6" />,
      title: "Multi-Person Detection",
      description: "Analyze multiple people simultaneously for group training and coaching.",
      color: "from-cyan-500 to-blue-600",
      image: "/features/multi-person.jpg",
      benefits: [
        "Track up to 6 people simultaneously",
        "Perfect for group therapy sessions",
        "Compare movements between individuals",
        "Ideal for remote coaching scenarios"
      ]
    },
    {
      icon: <Zap className="h-6 w-6" />,
      title: "High Performance",
      description: "Optimized algorithms ensure smooth performance even on mobile devices.",
      color: "from-yellow-500 to-amber-600",
      image: "/features/high-performance.jpg",
      benefits: [
        "Runs at 30+ FPS on most modern devices",
        "Optimized for mobile processors",
        "Low memory footprint",
        "Works offline with no internet required"
      ]
    },
    {
      icon: <Shield className="h-6 w-6" />,
      title: "Privacy Focused",
      description: "All processing happens on your device, keeping your personal data secure.",
      color: "from-red-500 to-rose-600",
      image: "/features/privacy.jpg",
      benefits: [
        "On-device processing protects your privacy",
        "No video data sent to external servers",
        "HIPAA compliant for healthcare settings",
        "Full control over your data and sharing options"
      ]
    },
    {
      icon: <Database className="h-6 w-6" />,
      title: "Cloud Sync",
      description: "Securely sync your data across devices for seamless access anywhere.",
      color: "from-teal-500 to-green-600",
      image: "/features/cloud-sync.jpg",
      benefits: [
        "End-to-end encrypted data storage",
        "Access your exercises from any device",
        "Automatic backup of your progress",
        "Share access with your healthcare providers"
      ]
    }
  ];

  return (
    <section className="py-20 bg-slate-50 dark:bg-slate-900">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 dark:text-white">
            Powerful Features for <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Movement Analysis</span>
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
            Discover how Kinetic AI can transform your training, rehabilitation, or fitness routine with these powerful features.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="relative"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              onHoverStart={() => setActiveFeature(index)}
              onHoverEnd={() => setActiveFeature(null)}
            >
              <Card
                className={`h-full transition-all duration-300 ease-out cursor-pointer overflow-hidden group ${
                  activeFeature === index ? 'shadow-lg scale-105' : 'shadow hover:shadow-md'
                }`}
                onClick={() => setSpotlightFeature(feature)}
              >
                <CardContent className="p-6 relative z-10">
                  {/* Background gradient that appears on hover */}
                  <div
                    className={`absolute top-0 left-0 right-0 h-full bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300 -z-10`}
                  />

                  <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-4 bg-gradient-to-r ${feature.color} text-white transform group-hover:scale-110 transition-transform duration-300`}>
                    {feature.icon}
                  </div>

                  <h3 className="text-lg font-semibold mb-2 dark:text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-indigo-600 transition-colors duration-300">
                    {feature.title}
                  </h3>

                  <p className="text-slate-600 dark:text-slate-300">{feature.description}</p>

                  {/* Learn more button that appears on hover */}
                  <div className="mt-4 overflow-hidden h-0 group-hover:h-8 transition-all duration-300">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="p-0 h-auto text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300"
                    >
                      <span>Learn more</span>
                      <Info className="ml-1 h-3 w-3" />
                    </Button>
                  </div>

                  {/* Interactive indicator */}
                  {activeFeature === index && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className={`absolute top-2 right-2 w-2 h-2 rounded-full bg-gradient-to-r ${feature.color}`}
                    ></motion.div>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Feature Spotlight Modal */}
        <Suspense fallback={
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
            <div className="bg-white dark:bg-slate-900 rounded-xl p-8 flex flex-col items-center">
              <Loader2 className="h-8 w-8 animate-spin text-blue-600 mb-4" />
              <p className="text-slate-600 dark:text-slate-300">Loading feature details...</p>
            </div>
          </div>
        }>
          {spotlightFeature && (
            <FeatureSpotlight
              feature={spotlightFeature}
              onClose={() => setSpotlightFeature(null)}
            />
          )}
        </Suspense>
      </div>
    </section>
  );
};

export default FeaturesSection;
