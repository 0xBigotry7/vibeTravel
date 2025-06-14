"use client";

import { useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";

interface Enhanced3DCardProps {
  children: React.ReactNode;
  className?: string;
  intensity?: number;
  glowColor?: string;
  perspective?: number;
}

export default function Enhanced3DCard({ 
  children, 
  className, 
  intensity = 15,
  glowColor = "rgba(20, 184, 166, 0.3)",
  perspective = 1000
}: Enhanced3DCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 500, damping: 100 });
  const mouseYSpring = useSpring(y, { stiffness: 500, damping: 100 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], [intensity, -intensity]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], [-intensity, intensity]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;

    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;

    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateY: rotateY,
        rotateX: rotateX,
        transformStyle: "preserve-3d",
        perspective: perspective,
      }}
      className={cn(
        "relative transition-all duration-200 ease-out",
        className
      )}
      whileHover={{
        scale: 1.05,
        boxShadow: `0 25px 50px -12px ${glowColor}`,
      }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
    >
      {/* Glow effect */}
      <motion.div
        className="absolute inset-0 rounded-xl opacity-0 pointer-events-none"
        style={{
          background: `radial-gradient(circle at center, ${glowColor}, transparent 70%)`,
          filter: "blur(20px)",
        }}
        animate={{
          opacity: isHovered ? 1 : 0,
        }}
        transition={{ duration: 0.3 }}
      />

      {/* Shine effect */}
      <motion.div
        className="absolute inset-0 rounded-xl pointer-events-none overflow-hidden"
        style={{
          background: `linear-gradient(135deg, transparent 40%, rgba(255,255,255,0.1) 50%, transparent 60%)`,
          transform: "translateZ(1px)",
        }}
        animate={{
          opacity: isHovered ? 1 : 0,
          x: isHovered ? "100%" : "-100%",
        }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
      />

      {/* Content */}
      <motion.div
        style={{
          transform: "translateZ(20px)",
        }}
        className="relative z-10"
      >
        {children}
      </motion.div>

      {/* Floating elements */}
      {isHovered && (
        <motion.div
          className="absolute top-4 right-4 w-2 h-2 bg-teal-400 rounded-full pointer-events-none"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ 
            opacity: [0, 1, 0], 
            scale: [0, 1, 0],
            y: [-10, -30, -50],
          }}
          transition={{ 
            duration: 2, 
            repeat: Infinity,
            delay: 0.2 
          }}
        />
      )}
      
      {isHovered && (
        <motion.div
          className="absolute bottom-6 left-6 w-1 h-1 bg-cyan-400 rounded-full pointer-events-none"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ 
            opacity: [0, 1, 0], 
            scale: [0, 1, 0],
            x: [10, 30, 50],
          }}
          transition={{ 
            duration: 2.5, 
            repeat: Infinity,
            delay: 0.8 
          }}
        />
      )}
    </motion.div>
  );
} 