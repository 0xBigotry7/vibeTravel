"use client";
import * as React from "react"
import { motion, type HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils"
import { ReactNode } from 'react';

interface CardProps extends HTMLMotionProps<'div'> {
  glass?: boolean;
  shadow?: boolean;
  children: ReactNode;
}

export const Card = ({ className, glass, shadow = true, children, ...props }: CardProps) => {
  return (
    <motion.div
      className={cn(
        "rounded-xl border bg-card text-card-foreground",
        shadow && "shadow-xl hover:shadow-2xl transition-shadow duration-300",
        glass && "card-glass",
        className
      )}
      whileHover={shadow ? { y: -8, boxShadow: "0 12px 48px 0 rgba(20,184,166,0.18)" } : undefined}
      transition={{ type: "spring", stiffness: 300, damping: 24 }}
      {...props}
    >
      {glass && <LiquidGlassBg />}
      <div className={glass ? "relative z-10" : undefined}>{children}</div>
    </motion.div>
  );
};

// Glassmorphism background with animated SVG (liquid glass effect)
function LiquidGlassBg() {
  return (
    <svg
      className="absolute inset-0 w-full h-full z-0 pointer-events-none animate-glass-float"
      viewBox="0 0 400 240"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ filter: 'blur(12px)', opacity: 0.55 }}
      aria-hidden
    >
      <defs>
        <linearGradient id="glassGrad" x1="0" y1="0" x2="400" y2="240" gradientUnits="userSpaceOnUse">
          <stop stopColor="#38bdf8" stopOpacity="0.18" />
          <stop offset="0.5" stopColor="#14b8a6" stopOpacity="0.13" />
          <stop offset="1" stopColor="#f472b6" stopOpacity="0.18" />
        </linearGradient>
      </defs>
      <ellipse
        cx="200"
        cy="120"
        rx="180"
        ry="90"
        fill="url(#glassGrad)"
      >
        <animate
          attributeName="rx"
          values="180;200;180"
          dur="4s"
          repeatCount="indefinite"
        />
        <animate
          attributeName="ry"
          values="90;110;90"
          dur="4s"
          repeatCount="indefinite"
        />
      </ellipse>
    </svg>
  );
}

export const CardGlass = (props: CardProps) => <Card glass shadow {...props} />;
export const CardShadow = (props: CardProps) => <Card shadow {...props} />;

export const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col space-y-1.5 p-6", className)}
    {...props}
  />
));
CardHeader.displayName = "CardHeader";

export const CardTitle = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("font-semibold leading-none tracking-tight", className)}
    {...props}
  />
));
CardTitle.displayName = "CardTitle";

export const CardDescription = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
));
CardDescription.displayName = "CardDescription";

export const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
));
CardContent.displayName = "CardContent";

export const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center p-6 pt-0", className)}
    {...props}
  />
));
CardFooter.displayName = "CardFooter";
