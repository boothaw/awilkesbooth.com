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
      smooth: 1,
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

      cards.forEach((card) => {
        const rect = card.getBoundingClientRect();
        const cardX = rect.left + rect.width / 4;
        const cardY = rect.top + rect.height / 4;
        const x = (cardX - sunX) * 0.04;
        const y = (cardY - sunY) * 0.04;

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
        },
    });

    return () => ScrollTrigger.getAll().forEach(t => t.kill());
    }, []);

  useEffect(() => {
    const cards = gsap.utils.toArray<HTMLElement>('.card, .title-card');
    if (!cards.length) return;

    cards.forEach((card) => {
      // Fade in as card enters from the bottom
      gsap.fromTo(card,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          ease: 'power3.out',
          overwrite: 'auto',
          scrollTrigger: {
            trigger: card,
            start: 'top 87%',
            end: 'top 67%',
            scrub: 0.5,
          },
        }
      );

      // // Fade out as card exits at the top
      gsap.fromTo(card,
        { opacity: 1, y: 0, immediateRender: false },
        {
          opacity: 0,
          y: -30,
          duration: 0.5,
          ease: 'power3.in',
          scrollTrigger: {
            trigger: card,
            start: 'top 5%',
            end: 'top 20%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    });

    return () => ScrollTrigger.getAll().forEach(t => t.kill());
  }, []);

  return null;
}
