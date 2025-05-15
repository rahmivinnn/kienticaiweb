"use client";

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';

interface Testimonial {
  id: number;
  name: string;
  role: string;
  avatar: string;
  content: string;
  fullContent?: string;
}

const SuccessStories: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [autoplay, setAutoplay] = useState(true);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const [expandedCard, setExpandedCard] = useState<number | null>(null);
  const carouselRef = useRef<HTMLDivElement>(null);

  // Sample testimonials data
  const testimonials: Testimonial[] = [
    {
      id: 1,
      name: "Sarah Johnson",
      role: "Knee Rehabilitation",
      avatar: "/avatars/sarah.jpg",
      content: "The AI-guided exercises and professional support helped me recover faster than I expected. I'm back to my active lifestyle!",
      fullContent: "The AI-guided exercises and professional support helped me recover faster than I expected. I'm back to my active lifestyle! The personalized feedback on my movements made a huge difference in my recovery journey. I could see my progress day by day, which kept me motivated throughout the process."
    },
    {
      id: 2,
      name: "Michael Chen",
      role: "Knee Rehabilitation",
      avatar: "/avatars/michael.jpg",
      content: "The AI-guided exercises and professional support helped me recover faster than I expected. I'm back to my active lifestyle!",
      fullContent: "The AI-guided exercises and professional support helped me recover faster than I expected. I'm back to my active lifestyle! The app's ability to track my movements and provide real-time corrections ensured I was doing my exercises correctly, even without a therapist present."
    },
    {
      id: 3,
      name: "Sarah Johnson",
      role: "Knee Rehabilitation",
      avatar: "/avatars/sarah2.jpg",
      content: "The AI-guided exercises and professional support helped me recover faster than I expected. I'm back to my active lifestyle!",
      fullContent: "The AI-guided exercises and professional support helped me recover faster than I expected. I'm back to my active lifestyle! What impressed me most was how the program adapted to my progress, increasing difficulty at just the right pace to challenge me without causing setbacks."
    }
  ];

  // Handle autoplay
  useEffect(() => {
    if (!autoplay || expandedCard !== null) return;

    const interval = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [autoplay, testimonials.length, expandedCard]);

  // Navigate to previous testimonial
  const prevTestimonial = () => {
    if (expandedCard !== null) return;
    setActiveIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length);
    setAutoplay(false);
  };

  // Navigate to next testimonial
  const nextTestimonial = () => {
    if (expandedCard !== null) return;
    setActiveIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
    setAutoplay(false);
  };

  // Handle touch events for swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    if (expandedCard !== null) return;
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (expandedCard !== null) return;
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (expandedCard !== null || !touchStart || !touchEnd) return;

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

  // Toggle expanded card
  const toggleExpandCard = (id: number) => {
    if (expandedCard === id) {
      setExpandedCard(null);
      setAutoplay(true);
    } else {
      setExpandedCard(id);
      setAutoplay(false);
    }
  };

  // Calculate visible testimonials
  const getVisibleTestimonials = () => {
    const result = [];
    const length = testimonials.length;

    // Previous testimonial
    const prevIndex = (activeIndex - 1 + length) % length;
    result.push({ ...testimonials[prevIndex], position: 'prev' });

    // Current testimonial
    result.push({ ...testimonials[activeIndex], position: 'current' });

    // Next testimonial
    const nextIndex = (activeIndex + 1) % length;
    result.push({ ...testimonials[nextIndex], position: 'next' });

    return result;
  };

  const visibleTestimonials = getVisibleTestimonials();

  return (
    <section className="py-16 bg-[#0A0E1A] text-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold mb-2">Success Stories</h2>
          <p className="text-gray-300">
            Hear from patients who transformed their recovery journey
          </p>
        </div>

        <div
          ref={carouselRef}
          className="relative max-w-5xl mx-auto overflow-hidden"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <AnimatePresence mode="wait">
            {expandedCard !== null ? (
              // Expanded testimonial view
              <motion.div
                key={`expanded-${expandedCard}`}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                className="bg-white/10 backdrop-blur-sm rounded-xl p-6 shadow-xl"
              >
                {testimonials.map(testimonial => (
                  testimonial.id === expandedCard && (
                    <div key={testimonial.id} className="flex flex-col">
                      <div className="flex items-center mb-4">
                        <Avatar className="w-16 h-16 border-2 border-blue-500">
                          <AvatarImage src={testimonial.avatar} alt={testimonial.name} />
                          <AvatarFallback className="bg-blue-500 text-white">{testimonial.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div className="ml-4">
                          <h3 className="text-xl font-bold">{testimonial.name}</h3>
                          <p className="text-blue-300">{testimonial.role}</p>
                        </div>
                      </div>

                      <div className="relative mb-4">
                        <Quote className="absolute -top-2 -left-2 w-6 h-6 text-blue-500 opacity-50 rotate-180" />
                        <p className="text-lg text-white pl-6 pr-6 leading-relaxed">
                          {testimonial.fullContent || testimonial.content}
                        </p>
                        <Quote className="absolute -bottom-2 -right-2 w-6 h-6 text-blue-500 opacity-50" />
                      </div>

                      <Button
                        variant="ghost"
                        className="self-end text-blue-300 hover:text-blue-100 hover:bg-blue-900/20"
                        onClick={() => toggleExpandCard(testimonial.id)}
                      >
                        Close
                      </Button>
                    </div>
                  )
                ))}
              </motion.div>
            ) : (
              // Carousel view
              <div className="flex justify-center">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
                  {visibleTestimonials.map((testimonial, index) => (
                    <motion.div
                      key={`${testimonial.id}-${testimonial.position}`}
                      initial={{
                        opacity: 0,
                        x: testimonial.position === 'prev' ? -50 : testimonial.position === 'next' ? 50 : 0,
                        scale: testimonial.position === 'current' ? 0.95 : 0.9
                      }}
                      animate={{
                        opacity: 1,
                        x: 0,
                        scale: testimonial.position === 'current' ? 1 : 0.95
                      }}
                      exit={{
                        opacity: 0,
                        x: testimonial.position === 'prev' ? 50 : testimonial.position === 'next' ? -50 : 0,
                        scale: 0.9
                      }}
                      transition={{ duration: 0.4 }}
                      className={`bg-white/5 backdrop-blur-sm rounded-lg p-5 shadow-md border border-white/10 cursor-pointer
                        hover:bg-white/10 transition-all duration-300 flex flex-col`}
                      onClick={() => toggleExpandCard(testimonial.id)}
                      whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(59, 130, 246, 0.1)" }}
                    >
                      <div className="flex items-center mb-3">
                        <Avatar className="w-12 h-12 border border-blue-500/50">
                          <AvatarImage src={testimonial.avatar} alt={testimonial.name} />
                          <AvatarFallback className="bg-blue-500 text-white">{testimonial.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div className="ml-3">
                          <h3 className="font-semibold">{testimonial.name}</h3>
                          <p className="text-sm text-blue-300">{testimonial.role}</p>
                        </div>
                      </div>

                      <p className="text-sm text-gray-300 flex-grow">
                        "{testimonial.content}"
                      </p>

                      <div className="mt-3 text-xs text-blue-300 self-end">
                        Click to read more
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}
          </AnimatePresence>

          {/* Navigation controls - only show when not expanded */}
          {expandedCard === null && (
            <div className="flex justify-center mt-8 gap-4">
              <Button
                variant="outline"
                size="icon"
                className="rounded-full border-white/20 text-white hover:bg-white/10"
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
                    className={`w-2 h-2 rounded-full transition-all ${
                      index === activeIndex
                        ? 'bg-blue-500 w-4'
                        : 'bg-white/30 hover:bg-white/50'
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
                className="rounded-full border-white/20 text-white hover:bg-white/10"
                onClick={nextTestimonial}
                aria-label="Next testimonial"
              >
                <ChevronRight className="h-5 w-5" />
              </Button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default SuccessStories;
