"use client";
import { motion } from "framer-motion";
import type { ReactNode } from "react";

export default function IconMotion({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <motion.span
      className={className}
      whileHover={{ scale: 1.18, rotate: -8 }}
      whileTap={{ scale: 0.92, rotate: 4 }}
      transition={{ type: "spring", stiffness: 400, damping: 18 }}
      style={{ display: "inline-block" }}
    >
      {children}
    </motion.span>
  );
} 