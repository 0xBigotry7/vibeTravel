"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import IconMotion from '@/components/IconMotion';
import { TreePalmIcon as PalmTree, Menu, X } from "lucide-react";
import { smoothScrollTo } from '@/lib/utils';
import { useEffect, useState, useRef } from 'react';

const NAV_LINKS = [
  { href: '#guides', label: 'Travel Guides', id: 'guides' },
  { href: '#services', label: 'Services', id: 'services' },
  { href: '#subscribe', label: 'Subscribe', id: 'subscribe' },
  { href: '#contact', label: 'Contact', id: 'contact' },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState<string>('');
  const navRef = useRef<HTMLDivElement>(null);
  const [highlightStyle, setHighlightStyle] = useState<React.CSSProperties>({});
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 8);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Scrollspy effect
  useEffect(() => {
    const sectionIds = NAV_LINKS.map(link => link.id);
    const handleScrollSpy = () => {
      let found = '';
      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const el = document.getElementById(sectionIds[i]);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 80) {
            found = sectionIds[i];
            break;
          }
        }
      }
      setActive(found);
    };
    window.addEventListener('scroll', handleScrollSpy);
    handleScrollSpy();
    return () => window.removeEventListener('scroll', handleScrollSpy);
  }, []);

  // Enhanced scrollspy effect: animated pill highlight
  useEffect(() => {
    if (!navRef.current) return;
    const activeLink = navRef.current.querySelector(
      `a[data-id='${active}']`
    ) as HTMLAnchorElement | null;
    if (activeLink) {
      const rect = activeLink.getBoundingClientRect();
      const navRect = navRef.current.getBoundingClientRect();
      setHighlightStyle({
        left: rect.left - navRect.left,
        width: rect.width,
        height: rect.height,
        top: rect.top - navRect.top,
        opacity: 1,
      });
    } else {
      setHighlightStyle({ opacity: 0 });
    }
  }, [active]);

  // Close mobile nav on route change or ESC
  useEffect(() => {
    if (!mobileOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMobileOpen(false);
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [mobileOpen]);

  return (
    <header
      className={`sticky top-0 z-40 w-full border-b transition-all duration-300
        ${scrolled ? 'shadow-lg bg-background/80 backdrop-blur-md' : 'bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60'}`}
    >
      <div className="container flex h-16 items-center justify-between">
        <button
          className="flex items-center gap-2 focus:outline-none bg-transparent border-0 p-0 m-0"
          style={{ background: 'none' }}
          type="button"
          aria-label="Scroll to top"
          onClick={() => { setMobileOpen(false); smoothScrollTo(); }}
        >
          <IconMotion>
            <PalmTree className="h-6 w-6 text-teal-500" />
          </IconMotion>
          <span className="text-xl font-bold tracking-wider">VIBETRAVEL.CLUB</span>
        </button>
        {/* Desktop nav */}
        <nav
          className="hidden md:flex gap-6 relative"
          ref={navRef}
          style={{ minHeight: 40 }}
        >
          {/* Animated highlight pill */}
          <span
            className="absolute z-0 bg-gradient-to-r from-teal-400 to-cyan-400/80 rounded-lg transition-all duration-300 ease-out shadow-md"
            style={{
              ...highlightStyle,
              position: 'absolute',
              pointerEvents: 'none',
              transition: 'all 0.32s cubic-bezier(.4,1.2,.4,1)',
              willChange: 'left, width, opacity',
              background: 'linear-gradient(90deg, #2dd4bf 60%, #38bdf8 100%)',
              boxShadow: '0 2px 16px 0 rgba(20,184,166,0.13)',
            }}
            aria-hidden
          />
          {NAV_LINKS.map(link => (
            <Link
              key={link.href}
              href={link.href}
              data-id={link.id}
              className={`relative z-10 text-sm font-medium transition-colors px-3 py-1 rounded-lg
                ${active === link.id
                  ? 'text-white font-semibold drop-shadow-[0_1px_8px_rgba(45,212,191,0.18)]'
                  : 'text-slate-300 hover:text-teal-400'}`}
            >
              {link.label}
            </Link>
          ))}
        </nav>
        {/* Mobile hamburger */}
        <button
          className="md:hidden p-2 rounded focus:outline-none focus:ring-2 focus:ring-teal-400"
          aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={mobileOpen}
          onClick={() => setMobileOpen(v => !v)}
        >
          {mobileOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
        </button>
        <div className="hidden md:block">
          <Button
            variant="default"
            className="bg-teal-500 hover:bg-teal-600"
            type="button"
            onClick={() => smoothScrollTo('contact')}
          >
            Join the Club
          </Button>
        </div>
      </div>
      {/* Mobile nav overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur flex flex-col items-center justify-center gap-8 animate-fade-in"
          tabIndex={-1}
          aria-modal="true"
          role="dialog"
        >
          <button
            className="absolute top-6 right-6 p-2 rounded focus:outline-none focus:ring-2 focus:ring-teal-400"
            aria-label="Close menu"
            onClick={() => setMobileOpen(false)}
          >
            <X className="w-7 h-7 text-white" />
          </button>
          {NAV_LINKS.map(link => (
            <button
              key={link.href}
              onClick={() => { setMobileOpen(false); smoothScrollTo(link.id); }}
              className={`text-2xl font-semibold px-6 py-3 rounded-lg transition-all duration-200 w-full text-center
                ${active === link.id ? 'bg-gradient-to-r from-teal-400 to-cyan-400 text-white shadow-lg scale-105' : 'text-slate-200 hover:text-teal-300 hover:bg-white/10'}`}
              style={{ maxWidth: 320 }}
              tabIndex={0}
              data-id={link.id}
            >
              {link.label}
            </button>
          ))}
          <Button
            variant="default"
            className="bg-teal-500 hover:bg-teal-600 w-full max-w-xs text-lg mt-4"
            type="button"
            onClick={() => { setMobileOpen(false); smoothScrollTo('contact'); }}
          >
            Join the Club
          </Button>
        </div>
      )}
    </header>
  );
} 