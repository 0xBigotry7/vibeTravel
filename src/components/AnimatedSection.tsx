"use client";
import { motion } from "framer-motion";
import type { ReactNode } from "react";

export default function AnimatedSection({ children, className, ...props }: { children: ReactNode; className?: string; [key: string]: unknown }) {
  return (
    <motion.section
      className={className}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.7, ease: 'easeOut' }}
      {...props}
    >
      {children}
    </motion.section>
  );
} 