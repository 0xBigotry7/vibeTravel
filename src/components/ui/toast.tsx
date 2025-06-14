"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, CheckCircle, AlertCircle, Info, AlertTriangle } from "lucide-react";
import { cn } from "@/lib/utils";

export interface Toast {
  id: string;
  title?: string;
  description?: string;
  variant?: "default" | "success" | "error" | "warning" | "info";
  duration?: number;
}

interface ToastProps extends Toast {
  onClose: (id: string) => void;
}

const variantStyles = {
  default: "bg-slate-800 border-slate-700 text-white",
  success: "bg-green-900/80 border-green-700 text-green-100",
  error: "bg-red-900/80 border-red-700 text-red-100",
  warning: "bg-yellow-900/80 border-yellow-700 text-yellow-100",
  info: "bg-blue-900/80 border-blue-700 text-blue-100",
};

const variantIcons = {
  default: Info,
  success: CheckCircle,
  error: AlertCircle,
  warning: AlertTriangle,
  info: Info,
};

export function Toast({ id, title, description, variant = "default", duration = 5000, onClose }: ToastProps) {
  const IconComponent = variantIcons[variant];

  React.useEffect(() => {
    const timer = setTimeout(() => {
      onClose(id);
    }, duration);

    return () => clearTimeout(timer);
  }, [id, duration, onClose]);

  return (
    <motion.div
      initial={{ opacity: 0, y: -50, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -50, scale: 0.95 }}
      transition={{ type: "spring", stiffness: 300, damping: 24 }}
      className={cn(
        "relative flex items-start gap-3 p-4 rounded-xl border backdrop-blur-md shadow-2xl max-w-md min-w-[320px]",
        variantStyles[variant]
      )}
    >
      <div className="flex-shrink-0 mt-0.5">
        <IconComponent className="h-5 w-5" />
      </div>
      <div className="flex-1 space-y-1">
        {title && (
          <p className="text-sm font-semibold leading-tight">{title}</p>
        )}
        {description && (
          <p className="text-sm opacity-90 leading-relaxed">{description}</p>
        )}
      </div>
      <button
        onClick={() => onClose(id)}
        className="flex-shrink-0 p-1 rounded-md hover:bg-white/10 transition-colors"
        aria-label="Close notification"
      >
        <X className="h-4 w-4" />
      </button>
      
      {/* Progress bar */}
      <motion.div
        initial={{ width: "100%" }}
        animate={{ width: "0%" }}
        transition={{ duration: duration / 1000, ease: "linear" }}
        className="absolute bottom-0 left-0 h-1 bg-white/20 rounded-b-xl"
      />
    </motion.div>
  );
}

interface ToastContainerProps {
  toasts: Toast[];
  onClose: (id: string) => void;
}

export function ToastContainer({ toasts, onClose }: ToastContainerProps) {
  return (
    <div className="fixed top-4 right-4 z-50 flex flex-col gap-2 max-h-screen overflow-hidden">
      <AnimatePresence mode="popLayout">
        {toasts.map((toast) => (
          <Toast key={toast.id} {...toast} onClose={onClose} />
        ))}
      </AnimatePresence>
    </div>
  );
} 