'use client'
import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger} from 'gsap/all';
import { ScrollSmoother } from 'gsap/ScrollSmoother';

export function Animations() {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

    const smoother = ScrollSmoother.create({
      wrapper: '#smooth-wrapper',
      content: '#smooth-content',
      smooth: 1.2,
      effects: true,
    });

    return () => smoother.kill();
  }, []);
  useEffect(() => {
    const cards = gsap.utils.toArray<HTMLElement>('.card, .title-card');
    const sunEl = document.querySelector<HTMLElement>('.sun');

    const updateShadows = () => {
      if (!sunEl) return;
      const sunRect = sunEl.getBoundingClientRect();
      const sunX = sunRect.left + sunRect.width / 2;
      const sunY = sunRect.top + sunRect.height / 2;

      const vw = window.innerWidth;
      const vh = window.innerHeight;
      const shadowMax = 36;

      cards.forEach((card) => {
        const rect = card.getBoundingClientRect();
        const cardX = rect.left + rect.width / 4;
        const cardY = rect.top + rect.height / 4;
        const x = ((cardX - sunX) / vw) * shadowMax;
        const y = ((cardY - sunY) / vh) * shadowMax;

        const dx = sunX - cardX;
        const dy = sunY - cardY;
        const angle = Math.atan2(dx, -dy) * (180 / Math.PI) + 180;

        gsap.to(card, {
          boxShadow: `${x}px ${y}px 0px var(--foreground-opacity)`,
          background: `linear-gradient(${angle}deg, #fff 5%, #f5a62305 15%, #60a6e122 90%)`,
          duration: 0.4,
          ease: 'power2.out',
          overwrite: 'auto',
        });
      });
    };

    updateShadows();
    gsap.ticker.add(updateShadows);
    return () => gsap.ticker.remove(updateShadows);
  }, []);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const sunEl = document.querySelector<HTMLElement>('.sun-wrapper');
    const main = document.querySelector<HTMLElement>('.body main');

    if (!sunEl || !main) return;

    const mm = gsap.matchMedia();

    // Desktop only: sun travels across the page as you scroll
    mm.add('(min-width: 768px)', () => {
      gsap.fromTo(sunEl,
        { x: 0 },
        {
          x: () => window.innerWidth - sunEl.offsetWidth - 32,
          ease: 'none',
          immediateRender: false,
          scrollTrigger: {
            trigger: 'body',
            start: 'top top',
            end: () => `+=${ScrollTrigger.maxScroll(window)}`,
            scrub: true,
            invalidateOnRefresh: true,
          },
        }
      );
    });

    return () => mm.revert();
  }, []);

  useEffect(() => {
    const cards = gsap.utils.toArray<HTMLElement>('.card, .title-card');
    if (!cards.length) return;

    cards.forEach((card) => {
      const heightRatio = Math.min(card.offsetHeight / window.innerHeight, 1);

      // Fade in sooner for taller cards (push trigger zone lower on screen)
      const entryStart = Math.round(87 + heightRatio * 8);
      const entryEnd = Math.round(67 + heightRatio * 8);

      gsap.fromTo(card,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          ease: 'power3.out',
          overwrite: 'auto',
          scrollTrigger: {
            trigger: card,
            start: `top ${entryStart}%`,
            end: `top ${entryEnd}%`,
            scrub: 0.5,
            invalidateOnRefresh: true,
          },
        }
      );

      // Fade out as the card's bottom edge approaches the top of the viewport
      gsap.fromTo(card,
        { opacity: 1, y: 0 },
        {
          opacity: 0,
          y: -30,
          ease: 'power3.in',
          immediateRender: false,
          scrollTrigger: {
            trigger: card,
            start: 'bottom 25%',
            end: 'bottom 0%',
            scrub: 0.5,
            invalidateOnRefresh: true,
          },
        }
      );
    });

    return () => ScrollTrigger.getAll().forEach(t => t.kill());
  }, []);

  return null;
}
