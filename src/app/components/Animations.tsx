'use client'
import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/all';

export function Animations() {
  useEffect(() => {
    const cards = gsap.utils.toArray<HTMLElement>('.card');
    const sunEl = document.querySelector<HTMLElement>('.sun');

    const updateShadows = () => {
      if (!sunEl) return;
      const sunRect = sunEl.getBoundingClientRect();
      const sunX = sunRect.left + sunRect.width / 2;
      const sunY = sunRect.top + sunRect.height / 2;

      cards.forEach((card) => {
        const rect = card.getBoundingClientRect();
        const cardX = rect.left + rect.width / 2;
        const cardY = rect.top + rect.height / 2;
        const x = (cardX - sunX) * 0.02;
        const y = (cardY - sunY) * 0.02;
        gsap.to(card, {
          boxShadow: `${x}px ${y}px 0px var(--foreground-opacity)`,
          duration: 0.4,
          ease: 'power2.out',
        });
      });
    };

    updateShadows();
    window.addEventListener('scroll', updateShadows);
    window.addEventListener('resize', updateShadows);
    return () => {
      window.removeEventListener('scroll', updateShadows);
      window.removeEventListener('resize', updateShadows);
    };
  }, []);

    useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const sunEl = document.querySelector<HTMLElement>('.sun');
    const container = document.querySelector<HTMLElement>('.body');
    if (!sunEl || !container) return;

    gsap.to(sunEl, {
        x: () => container.offsetWidth - sunEl.offsetWidth - 32,
        ease: 'power2.out',  // <-- here
        scrollTrigger: {
        trigger: '.body',
        start: 'top top',
        end: '+=100%',
        scrub: true,
        },
    });

    return () => ScrollTrigger.getAll().forEach(t => t.kill());
    }, []);

  return (
    <>
    <div className="sun"></div>
    </>
  )
}