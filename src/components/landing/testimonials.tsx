"use client";

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Star, Quote } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';

interface Testimonial {
  id: number;
  name: string;
  role: string;
  company: string;
  avatar: string;
  content: string;
  rating: number;
}

const Testimonials: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [autoplay, setAutoplay] = useState(true);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  
  // Sample testimonials data
  const testimonials: Testimonial[] = [
    {
      id: 1,
      name: "Sarah Johnson",
      role: "Physical Therapist",
      company: "Recovery Center",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop",
      content: "Kinetic AI has revolutionized how I work with patients. The real-time feedback and detailed movement analysis help me provide more personalized care, even during remote sessions.",
      rating: 5
    },
    {
      id: 2,
      name: "Michael Chen",
      role: "Rehabilitation Patient",
      company: "",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop",
      content: "After my knee surgery, Kinetic AI made home exercises so much easier. The app corrects my form in real-time and tracks my progress. My recovery has been faster than expected!",
      rating: 5
    },
    {
      id: 3,
      name: "Dr. Emily Rodriguez",
      role: "Sports Medicine Specialist",
      company: "Athletic Performance Clinic",
      avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&h=150&fit=crop",
      content: "I recommend Kinetic AI to all my athletes. The movement analysis is incredibly accurate, and the personalized feedback helps prevent injuries during training.",
      rating: 4
    },
    {
      id: 4,
      name: "James Wilson",
      role: "Fitness Coach",
      company: "Elite Training",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop",
      content: "This platform has transformed how I coach remotely. The 3D visualization and real-time feedback allow me to correct form issues instantly, even when I'm not physically present.",
      rating: 5
    }
  ];
  
  // Handle autoplay
  useEffect(() => {
    if (!autoplay) return;
    
    const interval = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, [autoplay, testimonials.length]);
  
  // Navigate to previous testimonial
  const prevTestimonial = () => {
    setActiveIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length);
    setAutoplay(false);
  };
  
  // Navigate to next testimonial
  const nextTestimonial = () => {
    setActiveIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
    setAutoplay(false);
  };
  
  // Handle touch events for swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };
  
  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };
  
  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;
    
    if (isLeftSwipe) {
      nextTestimonial();
    }
    
    if (isRightSwipe) {
      prevTestimonial();
    }
    
    setTouchStart(null);
    setTouchEnd(null);
  };
  
  return (
    <section className="py-20 bg-white dark:bg-slate-900">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 dark:text-white">
            What Our Users <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Are Saying</span>
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
            Discover how Kinetic AI is transforming rehabilitation and fitness experiences for professionals and patients alike.
          </p>
        </motion.div>
        
        <div 
          className="relative max-w-4xl mx-auto"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {/* Testimonial card */}
          <motion.div
            key={activeIndex}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.5 }}
            className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl overflow-hidden border border-slate-200 dark:border-slate-700"
          >
            <div className="p-8 md:p-12">
              <div className="flex flex-col md:flex-row gap-8">
                <div className="md:w-1/3 flex flex-col items-center md:items-start">
                  <Avatar className="w-24 h-24 border-4 border-blue-100 dark:border-blue-900">
                    <AvatarImage src={testimonials[activeIndex].avatar} alt={testimonials[activeIndex].name} />
                    <AvatarFallback>{testimonials[activeIndex].name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  
                  <h3 className="text-xl font-bold mt-4 dark:text-white">{testimonials[activeIndex].name}</h3>
                  <p className="text-slate-600 dark:text-slate-300">{testimonials[activeIndex].role}</p>
                  {testimonials[activeIndex].company && (
                    <p className="text-blue-600 dark:text-blue-400 font-medium">{testimonials[activeIndex].company}</p>
                  )}
                  
                  <div className="flex items-center mt-4">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        className={`w-5 h-5 ${i < testimonials[activeIndex].rating ? 'text-yellow-400 fill-yellow-400' : 'text-slate-300 dark:text-slate-600'}`} 
                      />
                    ))}
                  </div>
                </div>
                
                <div className="md:w-2/3">
                  <div className="relative">
                    <Quote className="absolute -top-2 -left-2 w-8 h-8 text-blue-200 dark:text-blue-900 rotate-180" />
                    <p className="text-lg text-slate-700 dark:text-slate-200 italic pl-6 pr-6">
                      {testimonials[activeIndex].content}
                    </p>
                    <Quote className="absolute -bottom-2 -right-2 w-8 h-8 text-blue-200 dark:text-blue-900" />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
          
          {/* Navigation buttons */}
          <div className="flex justify-center mt-8 gap-4">
            <Button
              variant="outline"
              size="icon"
              className="rounded-full"
              onClick={prevTestimonial}
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
            
            {/* Pagination dots */}
            <div className="flex items-center gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  className={`w-2.5 h-2.5 rounded-full transition-all ${
                    index === activeIndex
                      ? 'bg-blue-600 w-6'
                      : 'bg-slate-300 dark:bg-slate-600'
                  }`}
                  onClick={() => {
                    setActiveIndex(index);
                    setAutoplay(false);
                  }}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>
            
            <Button
              variant="outline"
              size="icon"
              className="rounded-full"
              onClick={nextTestimonial}
              aria-label="Next testimonial"
            >
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
