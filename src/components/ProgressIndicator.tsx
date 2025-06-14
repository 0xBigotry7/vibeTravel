"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface Step {
  id: string;
  title: string;
  description?: string;
}

interface ProgressIndicatorProps {
  steps: Step[];
  currentStep: number;
  className?: string;
  variant?: "horizontal" | "vertical";
  showLabels?: boolean;
}

export default function ProgressIndicator({
  steps,
  currentStep,
  className,
  variant = "horizontal",
  showLabels = true
}: ProgressIndicatorProps) {
  const isHorizontal = variant === "horizontal";

  return (
    <div className={cn(
      "flex",
      isHorizontal ? "items-center justify-between" : "flex-col space-y-4",
      className
    )}>
      {steps.map((step, index) => {
        const isCompleted = index < currentStep;
        const isCurrent = index === currentStep;
        const isUpcoming = index > currentStep;

        return (
          <div
            key={step.id}
            className={cn(
              "flex items-center",
              isHorizontal ? "flex-1" : "w-full",
              index < steps.length - 1 && isHorizontal && "mr-4"
            )}
          >
            {/* Step Circle */}
            <motion.div
              className={cn(
                "relative flex items-center justify-center rounded-full border-2 transition-all duration-300",
                isCompleted && "bg-teal-500 border-teal-500",
                isCurrent && "bg-teal-500/20 border-teal-500",
                isUpcoming && "bg-slate-700 border-slate-600",
                isHorizontal ? "w-10 h-10" : "w-8 h-8"
              )}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ 
                scale: isCurrent ? 1.1 : 1, 
                opacity: 1 
              }}
              transition={{ 
                type: "spring", 
                stiffness: 300, 
                damping: 20,
                delay: index * 0.1 
              }}
            >
              {isCompleted ? (
                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <Check className="w-5 h-5 text-white" />
                </motion.div>
              ) : (
                <motion.span
                  className={cn(
                    "text-sm font-semibold",
                    isCurrent && "text-teal-400",
                    isUpcoming && "text-slate-400"
                  )}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: index * 0.1 + 0.2 }}
                >
                  {index + 1}
                </motion.span>
              )}

              {/* Pulse effect for current step */}
              {isCurrent && (
                <motion.div
                  className="absolute inset-0 rounded-full border-2 border-teal-400"
                  animate={{
                    scale: [1, 1.5, 1],
                    opacity: [0.5, 0, 0.5],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
              )}
            </motion.div>

            {/* Step Labels */}
            {showLabels && (
              <motion.div
                className={cn(
                  "ml-3",
                  isHorizontal ? "hidden md:block" : "flex-1"
                )}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 + 0.3 }}
              >
                <h4 className={cn(
                  "text-sm font-medium",
                  isCompleted && "text-teal-400",
                  isCurrent && "text-white",
                  isUpcoming && "text-slate-400"
                )}>
                  {step.title}
                </h4>
                {step.description && (
                  <p className="text-xs text-slate-500 mt-1">
                    {step.description}
                  </p>
                )}
              </motion.div>
            )}

            {/* Connecting Line */}
            {index < steps.length - 1 && (
              <motion.div
                className={cn(
                  "bg-slate-600",
                  isHorizontal 
                    ? "flex-1 h-0.5 mx-4" 
                    : "w-0.5 h-8 ml-4 mt-2"
                )}
                initial={{ scaleX: isHorizontal ? 0 : 1, scaleY: isHorizontal ? 1 : 0 }}
                animate={{ 
                  scaleX: 1, 
                  scaleY: 1,
                  backgroundColor: isCompleted ? "#14b8a6" : "#475569"
                }}
                transition={{ 
                  duration: 0.5, 
                  delay: index * 0.1 + 0.4 
                }}
                style={{ 
                  transformOrigin: isHorizontal ? "left" : "top" 
                }}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}

// Preset step configurations
export const itinerarySteps: Step[] = [
  {
    id: "details",
    title: "Trip Details",
    description: "Destination, dates, travelers"
  },
  {
    id: "preferences",
    title: "Preferences",
    description: "Interests, budget, style"
  },
  {
    id: "review",
    title: "Review",
    description: "Confirm your request"
  },
  {
    id: "payment",
    title: "Payment",
    description: "Secure checkout"
  }
];

export const contactSteps: Step[] = [
  {
    id: "info",
    title: "Contact Info",
    description: "Name and email"
  },
  {
    id: "message",
    title: "Message",
    description: "Tell us how we can help"
  },
  {
    id: "send",
    title: "Send",
    description: "Submit your inquiry"
  }
]; 