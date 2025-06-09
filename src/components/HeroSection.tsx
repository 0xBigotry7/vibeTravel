"use client";

import { Button } from '@/components/ui/button';

export default function HeroSection() {
  return (
    <section className="relative h-[90vh] flex items-center justify-center overflow-hidden">
      <div className="container relative z-10 flex flex-col items-center text-center gap-6 px-4">
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white drop-shadow-md">
          Discover Your Perfect <span className="text-teal-400">Vibe</span>
        </h1>
        <p className="max-w-[800px] text-lg md:text-xl text-white/90 drop-shadow">
          Curated travel guides and personalized itineraries for the modern explorer
        </p>
        <div className="flex flex-col sm:flex-row gap-4 mt-6">
          <Button size="lg" className="bg-teal-500 hover:bg-teal-600 text-white">
            Explore Guides
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white/20"
          >
            Plan Your Trip
          </Button>
        </div>
      </div>
    </section>
  );
} 