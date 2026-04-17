'use client'
import { useLayoutEffect } from 'react';
import gsap from 'gsap';

export function SunAnimation() {
  useLayoutEffect(() => {
    const sunEl = document.querySelector<HTMLElement>('.sun-wrapper');
    if (!sunEl) return;

    const sunRect = sunEl.getBoundingClientRect();
    const naturalTop = sunRect.top;   // ~16px (1em)
    const naturalLeft = sunRect.left; // ~16px (1em)

    const horizonY = window.innerHeight * 0.6;

    const startX = window.innerWidth / 2 - naturalLeft - sunEl.offsetWidth / 2;
    const startY = horizonY - naturalTop;

    gsap.set(sunEl, { x: startX, y: startY });

    const tl = gsap.timeline({
      onComplete: () => gsap.set(sunEl, { clearProps: 'transform' }),
    });

    tl.fromTo(sunEl, {
      scale: 2
    },{scale: 1.25, y: 0, duration: 4, ease: 'power2.out' });
    tl.fromTo(sunEl,{
      scale: 1.25
    }, { scale: 1.0, x: 0, duration: 2, ease: 'power2.inOut' });

    return () => {
      tl.kill();
      gsap.set(sunEl, { clearProps: 'transform' });
    };
  }, []);

  return null;
}
