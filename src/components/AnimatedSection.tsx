"use client";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import type { ReactNode } from "react";
import { useRef } from "react";

interface AnimatedSectionProps {
  children: ReactNode;
  className?: string;
  variant?: 'fadeUp' | 'fadeLeft' | 'fadeRight' | 'fadeDown' | 'scale' | 'parallax';
  delay?: number;
  stagger?: boolean;
  parallaxOffset?: number;
  [key: string]: unknown;
}

const variants = {
  fadeUp: {
    hidden: { opacity: 0, y: 60 },
    visible: { opacity: 1, y: 0 }
  },
  fadeLeft: {
    hidden: { opacity: 0, x: -60 },
    visible: { opacity: 1, x: 0 }
  },
  fadeRight: {
    hidden: { opacity: 0, x: 60 },
    visible: { opacity: 1, x: 0 }
  },
  fadeDown: {
    hidden: { opacity: 0, y: -60 },
    visible: { opacity: 1, y: 0 }
  },
  scale: {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1 }
  },
  parallax: {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0 }
  }
};

const staggerContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1
    }
  }
};

export default function AnimatedSection({ 
  children, 
  className, 
  variant = 'fadeUp',
  delay = 0,
  stagger = false,
  parallaxOffset = 50,
  ...props 
}: AnimatedSectionProps) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  
  const isInView = useInView(ref, { 
    once: true, 
    amount: 0.1,
    margin: "0px 0px -5% 0px" // Trigger much earlier - only 5% buffer
  });

  // Parallax transform for subtle background movement
  const y = useTransform(scrollYProgress, [0, 1], [0, -parallaxOffset]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.8, 1, 1, 0.8]);

  const motionProps = variant === 'parallax' 
    ? {
        style: { y, opacity },
        initial: "hidden",
        animate: isInView ? "visible" : "hidden",
        variants: variants[variant],
        transition: { 
          duration: 0.6, 
          delay: delay,
          ease: [0.25, 0.1, 0.25, 1] // Faster duration
        }
      }
    : {
        initial: "hidden",
        animate: isInView ? "visible" : "hidden",
        variants: stagger ? staggerContainer : variants[variant],
        transition: { 
          duration: 0.6, 
          delay: delay,
          ease: [0.25, 0.1, 0.25, 1] // Faster duration
        }
      };

  return (
    <motion.section
      ref={ref}
      className={className}
      {...motionProps}
      {...props}
    >
      {children}
    </motion.section>
  );
} 