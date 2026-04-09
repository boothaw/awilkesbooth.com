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
      smooth: .75,
      effects: true,
    });

    return () => smoother.kill();
  }, []);
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
        const cardX = rect.left + rect.width / 4;
        const cardY = rect.top + rect.height / 4;
        const x = (cardX - sunX) * 0.04;
        const y = (cardY - sunY) * 0.04;
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

      // CHANGE: make sure sun path lenght is equal to the entire scroll

    useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const sunEl = document.querySelector<HTMLElement>('.sun');
    const main = document.querySelector<HTMLElement>('.body main');

    if (!sunEl || !main) return;

    gsap.to(sunEl, {
        x: () => window.innerWidth - sunEl.offsetWidth - 32, // 16 = 1em right margin
        ease: 'none',
        scrollTrigger: {
        trigger: 'body',
        start: 'top top',
        end: () => `+=${ScrollTrigger.maxScroll(window)}`,
        scrub: true,
        invalidateOnRefresh: true,
        // markers: true, // remove once fixed
        },
    });

    return () => ScrollTrigger.getAll().forEach(t => t.kill());
    }, []);

    // NEXT: scroll snap trigger on cards 

  return null;
}