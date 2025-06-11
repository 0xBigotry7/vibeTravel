"use client";

import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { motion } from 'framer-motion'
import { useRef } from 'react'

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground shadow hover:bg-primary/90",
        destructive:
          "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
        outline:
          "border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground",
        secondary:
          "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-10 rounded-md px-8",
        icon: "h-9 w-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const omitDragProps = (props: Record<string, unknown>) => {
  const rest = { ...props };
  delete rest.onDrag;
  delete rest.onDragEnd;
  delete rest.onDragStart;
  delete rest.onDragEnter;
  delete rest.onDragExit;
  delete rest.onDragLeave;
  delete rest.onDragOver;
  delete rest.onDrop;
  return rest;
};

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const rippleRef = useRef<HTMLSpanElement>(null);
    // Ripple effect handler
    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      if (variant !== 'default') return;
      const button = e.currentTarget;
      const ripple = rippleRef.current;
      if (!ripple) return;
      const rect = button.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      const x = e.clientX - rect.left - size / 2;
      const y = e.clientY - rect.top - size / 2;
      ripple.style.width = ripple.style.height = `${size}px`;
      ripple.style.left = `${x}px`;
      ripple.style.top = `${y}px`;
      ripple.classList.remove('ripple-animate');
      // Force reflow
      void ripple.offsetWidth;
      ripple.classList.add('ripple-animate');
    };
    if (asChild) {
      return (
        <Slot
          className={cn(buttonVariants({ variant, size, className }))}
          ref={ref}
          {...props}
        />
      );
    }
    return (
      <motion.button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        whileHover={{ scale: 1.055, boxShadow: variant === 'default' ? '0 4px 32px 0 rgba(20,184,166,0.22)' : undefined }}
        whileTap={{ scale: 0.97 }}
        transition={{ type: 'spring', stiffness: 400, damping: 22 }}
        {...omitDragProps(props)}
        onClick={e => {
          handleClick(e);
          props.onClick?.(e);
        }}
        style={{ position: 'relative', overflow: 'hidden' }}
      >
        {props.children}
        {/* Ripple effect for primary buttons */}
        {variant === 'default' && (
          <span
            ref={rippleRef}
            className="button-ripple"
            aria-hidden
          />
        )}
      </motion.button>
    );
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
