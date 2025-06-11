"use client";

import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { useRef, useEffect, useState } from 'react';
import { useScroll, useTransform } from 'framer-motion';
import { smoothScrollTo } from '@/lib/utils';
import { ChevronDown } from 'lucide-react';

const container = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.18,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: 'easeOut' } },
};

export default function HeroSection() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();
  // Parallax: move background up as you scroll down
  const y = useTransform(scrollY, [0, 400], [0, -120]);

  // Multi-layer parallax: foreground blob
  const blobY = useTransform(scrollY, [0, 400], [0, -60]);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const [isDesktop, setIsDesktop] = useState(true);

  useEffect(() => {
    const checkDesktop = () => setIsDesktop(window.innerWidth >= 768);
    checkDesktop();
    window.addEventListener('resize', checkDesktop);
    return () => window.removeEventListener('resize', checkDesktop);
  }, []);

  useEffect(() => {
    if (!isDesktop) return;
    const handleMouseMove = (e: MouseEvent) => {
      setMouse({
        x: (e.clientX / window.innerWidth - 0.5) * 2,
        y: (e.clientY / window.innerHeight - 0.5) * 2,
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [isDesktop]);

  // Mouse parallax transforms (desktop only)
  const mouseBlob = isDesktop ? {
    x: mouse.x * 40,
    y: mouse.y * 30,
    rotate: mouse.x * 8,
  } : { x: 0, y: 0, rotate: 0 };
  const mouseHeadline = isDesktop ? {
    x: mouse.x * 10,
    y: mouse.y * 6,
  } : { x: 0, y: 0 };

  return (
    <section className="relative h-[90vh] flex items-center justify-center overflow-hidden">
      {/* Background parallax image */}
      <motion.div
        className="absolute inset-0 w-full h-full z-0"
        style={{ y }}
        aria-hidden
      >
        <Image
          src="/hero-image.jpg"
          alt="Hero background"
          fill
          className="object-cover object-center"
          priority
        />
        <div className="absolute inset-0 bg-black/40" />
      </motion.div>
      {/* Foreground animated blob/gradient */}
      <motion.div
        className="absolute left-1/2 top-1/2 z-10 pointer-events-none"
        style={{
          x: isDesktop ? `calc(-50% + ${mouse.x * 40}px)` : '-50%',
          y: isDesktop ? blobY.get() + mouse.y * 30 : blobY,
          rotate: mouseBlob.rotate,
        }}
        aria-hidden
      >
        <svg width="420" height="320" viewBox="0 0 420 320" fill="none" xmlns="http://www.w3.org/2000/svg" className="hidden md:block">
          <defs>
            <radialGradient id="blobGrad" cx="50%" cy="50%" r="70%" fx="50%" fy="50%">
              <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.7" />
              <stop offset="60%" stopColor="#14b8a6" stopOpacity="0.5" />
              <stop offset="100%" stopColor="#f472b6" stopOpacity="0.3" />
            </radialGradient>
          </defs>
          <ellipse cx="210" cy="160" rx="180" ry="120" fill="url(#blobGrad)" />
        </svg>
      </motion.div>
      {/* Hero content */}
      <motion.div
        ref={ref}
        className="container relative z-20 flex flex-col items-center text-center gap-6 px-4"
        variants={container}
        initial="hidden"
        animate="show"
        style={mouseHeadline}
      >
        <motion.h1
          className="text-4xl md:text-6xl lg:text-7xl font-bold text-white drop-shadow-md relative"
          variants={item}
        >
          Discover Your{' '}
          <span
            className="relative inline-block bg-gradient-to-r from-teal-400 via-cyan-400 via-30% via-pink-400 via-60% to-yellow-300 bg-clip-text text-transparent animate-gradient-x font-extrabold drop-shadow-[0_2px_24px_rgba(45,212,191,0.25)]"
            style={{
              backgroundSize: '350% 350%',
              WebkitBackgroundClip: 'text',
              backgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              textShadow: '0 2px 24px rgba(45,212,191,0.25), 0 1px 0 #fff',
            }}
          >
            Perfect Vibe
            <span className="shimmer-effect" aria-hidden />
          </span>
        </motion.h1>
        <motion.p
          className="max-w-[800px] text-lg md:text-xl text-white/90 drop-shadow"
          variants={item}
        >
          Curated travel guides and personalized itineraries for the modern explorer
        </motion.p>
        <motion.div
          className="flex flex-col sm:flex-row gap-4 mt-6"
          variants={item}
        >
          <Button
            size="lg"
            className="bg-teal-500 hover:bg-teal-600 text-white"
            type="button"
            onClick={() => smoothScrollTo('guides')}
          >
            Explore Guides
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white/20"
            type="button"
            onClick={() => smoothScrollTo('contact')}
          >
            Plan Your Trip
          </Button>
        </motion.div>
      </motion.div>
      {/* Scroll-down indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 0.8, ease: 'easeOut' }}
        aria-hidden
      >
        <ChevronDown className="w-8 h-8 text-white/80 animate-bounce-slow" />
        <span className="sr-only">Scroll down</span>
      </motion.div>
    </section>
  );
} 