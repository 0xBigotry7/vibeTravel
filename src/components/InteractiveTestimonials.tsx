"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence, PanInfo } from "framer-motion";
import { ChevronLeft, ChevronRight, MapPin } from "lucide-react";
import { Card } from "@/components/ui/card";
import IconMotion from "@/components/IconMotion";
import AnimatedElement from "@/components/AnimatedElement";

const testimonials = [
  {
    name: "Sarah Johnson",
    location: "New York, USA",
    quote: "The personalized itinerary was absolutely perfect! Every recommendation was spot-on and I discovered hidden gems I never would have found on my own.",
    rating: 5,
    image: "/testimonials/sarah.jpg"
  },
  {
    name: "Marco Rodriguez",
    location: "Barcelona, Spain", 
    quote: "As someone who travels frequently for work, I was amazed by how unique and authentic the suggestions were. This isn't your typical tourist guide!",
    rating: 5,
    image: "/testimonials/marco.jpg"
  },
  {
    name: "Emily Chen",
    location: "Singapore",
    quote: "The level of detail in my Tokyo itinerary was incredible. From the best ramen spots to secret temples, every day was an adventure!",
    rating: 5,
    image: "/testimonials/emily.jpg"
  },
  {
    name: "James Mitchell",
    location: "London, UK",
    quote: "I've used several travel planning services, but none come close to this level of personalization. Worth every penny!",
    rating: 5,
    image: "/testimonials/james.jpg"
  },
  {
    name: "Priya Patel",
    location: "Mumbai, India",
    quote: "The cultural insights and local connections made my European trip unforgettable. I felt like I was traveling with a friend who knew every corner!",
    rating: 5,
    image: "/testimonials/priya.jpg"
  }
];

export default function InteractiveTestimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying) return;
    
    const interval = setInterval(() => {
      setDirection(1);
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const navigate = (newDirection: number) => {
    setDirection(newDirection);
    setCurrentIndex((prev) => {
      const next = prev + newDirection;
      if (next < 0) return testimonials.length - 1;
      if (next >= testimonials.length) return 0;
      return next;
    });
  };

  const handleDragEnd = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    const threshold = 50;
    if (info.offset.x > threshold) {
      navigate(-1);
    } else if (info.offset.x < -threshold) {
      navigate(1);
    }
  };

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0,
      scale: 0.8,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      scale: 1,
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 300 : -300,
      opacity: 0,
      scale: 0.8,
    }),
  };

  return (
    <div className="relative w-full max-w-4xl mx-auto">
      {/* Main carousel */}
      <div 
        className="relative h-80 md:h-64 overflow-hidden rounded-2xl"
        onMouseEnter={() => setIsAutoPlaying(false)}
        onMouseLeave={() => setIsAutoPlaying(true)}
      >
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={currentIndex}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 },
              scale: { duration: 0.2 }
            }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={1}
            onDragEnd={handleDragEnd}
            className="absolute inset-0 cursor-grab active:cursor-grabbing"
          >
            <Card className="h-full bg-gradient-to-br from-slate-800/50 to-slate-900/50 border-slate-700/50 hover:border-teal-500/30 transition-colors backdrop-blur-sm">
              <div className="p-8 h-full flex flex-col justify-between">
                {/* Stars */}
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <IconMotion key={i} variant="scale" delay={0.1 + (i * 0.05)} hover={false}>
                      <span className="text-yellow-400 text-lg">★</span>
                    </IconMotion>
                  ))}
                </div>

                {/* Quote */}
                <motion.blockquote 
                  className="text-lg italic text-white/90 flex-1 mb-6 leading-relaxed"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  &quot;{testimonials[currentIndex].quote}&quot;
                </motion.blockquote>

                {/* Author */}
                <motion.div 
                  className="flex items-center gap-4 pt-6 border-t border-slate-700"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <div className="w-12 h-12 bg-gradient-to-br from-teal-400 to-cyan-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
                    {testimonials[currentIndex].name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <p className="font-semibold text-white">{testimonials[currentIndex].name}</p>
                    <p className="text-sm text-white/70 flex items-center gap-1">
                      <MapPin className="h-3 w-3" />
                      {testimonials[currentIndex].location}
                    </p>
                  </div>
                </motion.div>
              </div>
            </Card>
          </motion.div>
        </AnimatePresence>

        {/* Navigation buttons */}
        <button
          onClick={() => navigate(-1)}
          className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/50 hover:bg-black/70 rounded-full flex items-center justify-center text-white transition-colors backdrop-blur-sm z-10"
          aria-label="Previous testimonial"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        
        <button
          onClick={() => navigate(1)}
          className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/50 hover:bg-black/70 rounded-full flex items-center justify-center text-white transition-colors backdrop-blur-sm z-10"
          aria-label="Next testimonial"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>

      {/* Dot indicators */}
      <div className="flex justify-center gap-2 mt-6">
        {testimonials.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              setDirection(index > currentIndex ? 1 : -1);
              setCurrentIndex(index);
            }}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentIndex 
                ? 'bg-teal-400 scale-125' 
                : 'bg-slate-600 hover:bg-slate-500'
            }`}
            aria-label={`Go to testimonial ${index + 1}`}
          />
        ))}
      </div>

      {/* Swipe indicator */}
      <AnimatedElement variant="fadeUp" delay={0.5}>
        <p className="text-center text-sm text-slate-400 mt-4">
          Swipe or drag to navigate • Auto-playing
        </p>
      </AnimatedElement>
    </div>
  );
} 