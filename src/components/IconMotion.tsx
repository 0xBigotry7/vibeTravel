"use client";
import { motion, useInView } from "framer-motion";
import type { ReactNode } from "react";
import { useRef } from "react";

interface IconMotionProps {
  children: ReactNode;
  className?: string;
  variant?: 'bounce' | 'scale' | 'rotate' | 'float' | 'pulse';
  delay?: number;
  hover?: boolean;
}

const iconVariants = {
  bounce: {
    hidden: { opacity: 0, y: 20, scale: 0.8 },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 10,
        mass: 0.8
      }
    }
  },
  scale: {
    hidden: { opacity: 0, scale: 0.3 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 15
      }
    }
  },
  rotate: {
    hidden: { opacity: 0, rotate: -180, scale: 0.5 },
    visible: { 
      opacity: 1, 
      rotate: 0, 
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 12
      }
    }
  },
  float: {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.1, 0.25, 1]
      }
    }
  },
  pulse: {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  }
};

const hoverAnimations = {
  bounce: { scale: 1.2, rotate: -8, y: -2 },
  scale: { scale: 1.25, rotate: 5 },
  rotate: { scale: 1.15, rotate: 15 },
  float: { scale: 1.1, y: -5 },
  pulse: { scale: 1.2, opacity: 0.9 }
};

export default function IconMotion({ 
  children, 
  className, 
  variant = 'bounce',
  delay = 0,
  hover = true 
}: IconMotionProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { 
    once: true, 
    amount: 0.3,
    margin: "0px 0px 20px 0px"
  });

  return (
    <motion.span
      ref={ref}
      className={className}
      style={{ display: "inline-block" }}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={iconVariants[variant]}
      transition={{ delay }}
      whileHover={hover ? hoverAnimations[variant] : undefined}
      whileTap={hover ? { scale: 0.95 } : undefined}
    >
      {children}
    </motion.span>
  );
} 