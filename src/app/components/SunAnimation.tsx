'use client'
import { useLayoutEffect } from 'react';
import gsap from 'gsap';

export function SunAnimation() {
  useLayoutEffect(() => {
    const sunEl = document.querySelector<HTMLElement>('.sun-wrapper');
    const sun = document.querySelector<HTMLElement>('.sun-wrapper .sun');
    const horizonEl = document.querySelector<HTMLElement>('.loading-horizon');
    const rootStyles = getComputedStyle(document.documentElement);
    const cssVar = (name: string) => rootStyles.getPropertyValue(name).trim();
    const night = { '--sky-top': cssVar('--night-top'), '--sky-bottom': cssVar('--night-bottom') };
    const day = { '--sky-top': cssVar('--day-top'), '--sky-bottom': cssVar('--day-bottom') };
    const glow = cssVar('--sun-glow');
    if (!sunEl) {
      gsap.set(document.body, day);
      // Nothing to animate — don't leave scroll locked waiting for a completion event that'll never fire.
      window.dispatchEvent(new Event('sun-animation-complete'));
      return;
    }

    const sunRect = sunEl.getBoundingClientRect();
    const naturalTop = sunRect.top;   // ~16px (1em)
    const naturalLeft = sunRect.left; // ~16px (1em)

    const horizonY = window.innerHeight * 0.6;

    const startX = window.innerWidth / 2 - naturalLeft - sunEl.offsetWidth / 2;
    const startY = horizonY - naturalTop;

    gsap.set(sunEl, { x: startX, y: startY });
    const tl = gsap.timeline({
      onComplete: () => {
        gsap.set(sunEl, { clearProps: 'transform' });
        window.dispatchEvent(new Event('sun-animation-complete'));
      },
    });

    tl.addLabel('rising');
    tl.fromTo(sunEl, {
      scale: 2
    },{scale: 1.25, y: 0, duration: 2.5, ease: 'power2.out' });
    tl.addLabel('moving', 2.5);
    tl.fromTo(sun,
      { boxShadow: `0px 0px 0px 0px ${glow}` },
      { boxShadow: `0px 0px 15px 2px ${glow}`, duration: 1.5, ease: "power2.out" },
      "rising+=0.5"
    )
    tl.fromTo(sunEl,{
      scale: 1.25
    }, { scale: 1.0, x: 0, duration: 2.5, ease: 'power2.inOut' }, 'moving');

    // Sky brightens as the sun breaks the horizon (~0.4s) and is fully day before the sun reaches the top (2.5s).
    tl.fromTo(document.body,
      night,
      { ...day, duration: 1.8, ease: 'power2.out' },
      'rising+=0.4'
    );

    if (horizonEl) {
      tl.to(horizonEl, { opacity: 0, duration: .2, ease: 'power2.in' }, 0.5);
    }
    return () => {
      // If we're unmounting before the timeline finished, release the scroll lock anyway.
      if (tl.progress() < 1) window.dispatchEvent(new Event('sun-animation-complete'));
      tl.kill();
      gsap.set(sunEl, { clearProps: 'transform' });
      gsap.set(document.body, day);
      if (horizonEl) gsap.set(horizonEl, { clearProps: 'opacity' });
    };
  }, []);

  return null;
}
