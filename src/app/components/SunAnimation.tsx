'use client'
import { useLayoutEffect } from 'react';
import gsap from 'gsap';
import { MotionPathPlugin } from 'gsap/MotionPathPlugin';

export function SunAnimation() {
  useLayoutEffect(() => {
    gsap.registerPlugin(MotionPathPlugin);

    const sunEl = document.querySelector<HTMLElement>('.sun-wrapper');
    if (!sunEl) return;

    const sunRect = sunEl.getBoundingClientRect();
    const naturalTop = sunRect.top;   // ~16px (1em)
    const naturalLeft = sunRect.left; // ~16px (1em)

    const horizonY = window.innerHeight * 0.6;

    // Start: centered horizontally, sitting on the horizon
    const startX = window.innerWidth / 2 - naturalLeft - sunEl.offsetWidth / 2;
    const startY = horizonY - naturalTop;

    // Mid: halfway up from horizon toward final, curved outward toward center-ish
    const midX = startX * 0.25;
    const midY = -naturalTop - sunEl.offsetHeight; // just above natural top

    gsap.set(sunEl, { x: startX, y: startY });

    const tl = gsap.timeline({
      onComplete: () => gsap.set(sunEl, { clearProps: 'transform' }),
    });

    tl.to(sunEl, {
      motionPath: {
        path: [
          { x: startX, y: startY },
          { x: midX,   y: midY   },
          { x: 0,      y: 0      },
        ],
        type: 'cubic',
        curviness: 1.4,
      },
      duration: 2,
      ease: 'power2.inOut',
    });

    return () => {
      tl.kill();
      gsap.set(sunEl, { clearProps: 'transform' });
    };
  }, []);

  return null;
}
