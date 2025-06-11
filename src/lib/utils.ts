import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Smoothly scrolls to an element by id or to the top if id is not provided.
 * @param id The id of the element to scroll to (without #), or undefined for top.
 */
export function smoothScrollTo(id?: string) {
  if (typeof window === 'undefined') return;
  if (!id) {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    return;
  }
  const el = document.getElementById(id);
  if (el) {
    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    // Optionally set focus for accessibility
    el.tabIndex = -1;
    el.focus({ preventScroll: true });
  }
}
