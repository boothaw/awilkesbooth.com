'use client'
import { useEffect } from 'react';
import gsap from 'gsap';

export function Animations() {
  useEffect(() => {
    const cards = gsap.utils.toArray<HTMLElement>('.card');

    console.log('cards', cards)

    const onMove = (e: MouseEvent) => {
      cards.forEach((card) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        gsap.to(card, {
          boxShadow: `${x * 0.02}px ${y * 0.02}px 0px var(--foreground-opacity)`,
          duration: 0.4,
          ease: 'power2.out',
        });
      });
    };

    window.addEventListener('mousemove', onMove);
    return () => window.removeEventListener('mousemove', onMove);
  }, []);

  return null;
}