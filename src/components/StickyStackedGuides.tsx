"use client";
import { Card, CardContent } from '@/components/ui/card';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

interface Guide {
  title: string;
  link: string;
  pubDate: string;
  description: string;
}

// Constants for collapsed/expanded heights
const COLLAPSED_HEIGHT = 64; // px, only title visible
const EXPANDED_HEIGHT = 260; // px, full card

export default function StickyStackedGuides({ guides }: { guides: Guide[] }) {
  // Reverse guides so latest is at the bottom/top of stack
  const reversed = [...guides].reverse();
  return (
    <div className="relative flex flex-col max-w-2xl mx-auto" style={{ minHeight: EXPANDED_HEIGHT + (reversed.length - 1) * COLLAPSED_HEIGHT }}>
      {reversed.map((guide, i) => (
        <StickyStackedCard
          key={guide.link}
          guide={guide}
          index={i}
          total={reversed.length}
        />
      ))}
    </div>
  );
}

function StickyStackedCard({ guide, index, total }: { guide: Guide; index: number; total: number }) {
  // The top offset for sticky positioning
  const top = index * COLLAPSED_HEIGHT;
  // The zIndex so the latest is always on top
  const zIndex = 100 + index;
  // Ref for inView animation (optional, for fade-in)
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-10% 0px -10% 0px' });

  // Expanded if it's the topmost (last in reversed array)
  const isExpanded = index === total - 1;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 48 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, ease: 'easeOut', delay: index * 0.08 }}
      style={{
        position: 'sticky',
        top,
        zIndex,
        height: isExpanded ? EXPANDED_HEIGHT : COLLAPSED_HEIGHT,
        overflow: 'hidden',
        boxShadow: isExpanded ? '0 8px 32px 0 rgba(20,184,166,0.18)' : '0 2px 8px 0 rgba(20,184,166,0.08)',
        transition: 'height 0.4s cubic-bezier(.4,1.2,.4,1), box-shadow 0.3s',
        background: 'rgba(17,24,39,0.85)',
        borderRadius: 18,
        marginBottom: -COLLAPSED_HEIGHT + 8, // overlap, but with a small gap
      }}
      className="w-full border border-white/10 backdrop-blur-lg"
    >
      <Card className="bg-transparent shadow-none h-full">
        <CardContent className="p-6 flex flex-col justify-center h-full">
          <h3 className="text-xl font-semibold mb-2 text-white truncate">
            <a href={guide.link} target="_blank" rel="noopener noreferrer" className="hover:text-teal-400 transition-colors">
              {guide.title}
            </a>
          </h3>
          {isExpanded && (
            <>
              <p className="text-muted-foreground mb-4 text-white/90" dangerouslySetInnerHTML={{ __html: guide.description }} />
              <span className="text-xs text-gray-300">{new Date(guide.pubDate).toLocaleDateString()}</span>
            </>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
} 