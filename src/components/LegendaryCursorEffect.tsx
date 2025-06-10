'use client';

import { useEffect } from 'react';

export default function LegendaryCursorEffect() {
  useEffect(() => {
    import('legendary-cursor').then((module) => {
      module.default.init({
        lineSize: 0.15,
        opacityDecrement: 0.55,
        speedExpFactor: 0.8,
        lineExpFactor: 0.6,
        sparklesCount: 65,
        maxOpacity: 0.99,
      });
    });
  }, []);

  return null;
} 