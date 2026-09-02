'use client';

/**
 * useGsapReveal — shared GSAP scroll-triggered animation hook
 * Works with data-gsap="line" or data-gsap="fade" attributes on elements
 */

import { useEffect } from 'react';

export function useGsapReveal() {
  useEffect(() => {
    let gsap, ScrollTrigger;

    import('gsap').then(mod => {
      gsap = mod.gsap || mod.default;

      return import('gsap/ScrollTrigger').then(st => {
        ScrollTrigger = st.ScrollTrigger;
        gsap.registerPlugin(ScrollTrigger);

        // ── Fade-up elements ──────────────────────────────────
        const fadeEls = document.querySelectorAll('[data-gsap="fade"]');
        fadeEls.forEach((el, i) => {
          gsap.fromTo(el,
            { opacity: 0, y: 32 },
            {
              opacity: 1, y: 0,
              duration: 0.65,
              ease: 'power3.out',
              delay: parseFloat(el.dataset.gsapDelay || 0),
              scrollTrigger: {
                trigger: el,
                start: 'top 88%',
                toggleActions: 'play none none none',
              },
            }
          );
        });

        // ── Line-by-line elements ─────────────────────────────
        const lineEls = document.querySelectorAll('[data-gsap="lines"]');
        lineEls.forEach(container => {
          const lines = container.querySelectorAll('[data-line]');
          gsap.fromTo(lines,
            { opacity: 0, y: 24 },
            {
              opacity: 1, y: 0,
              duration: 0.55,
              ease: 'power3.out',
              stagger: 0.09,
              scrollTrigger: {
                trigger: container,
                start: 'top 86%',
                toggleActions: 'play none none none',
              },
            }
          );
        });

        // ── Stat / project rows ───────────────────────────────
        const rowEls = document.querySelectorAll('[data-gsap="row"]');
        if (rowEls.length) {
          gsap.fromTo(rowEls,
            { opacity: 0, x: -20 },
            {
              opacity: 1, x: 0,
              duration: 0.5,
              ease: 'power3.out',
              stagger: 0.07,
              scrollTrigger: {
                trigger: rowEls[0],
                start: 'top 88%',
                toggleActions: 'play none none none',
              },
            }
          );
        }

        // ── Cards (about / what-i-do) ─────────────────────────
        const cardEls = document.querySelectorAll('[data-gsap="card"]');
        if (cardEls.length) {
          gsap.fromTo(cardEls,
            { opacity: 0, y: 36, scale: 0.97 },
            {
              opacity: 1, y: 0, scale: 1,
              duration: 0.6,
              ease: 'power3.out',
              stagger: 0.1,
              scrollTrigger: {
                trigger: cardEls[0],
                start: 'top 87%',
                toggleActions: 'play none none none',
              },
            }
          );
        }

        // ── Skill title big text ──────────────────────────────
        const skillTitles = document.querySelectorAll('[data-gsap="skill-title"]');
        skillTitles.forEach((el, i) => {
          gsap.fromTo(el,
            { opacity: 0, x: -40 },
            {
              opacity: 1, x: 0,
              duration: 0.6,
              ease: 'power3.out',
              delay: i * 0.05,
              scrollTrigger: {
                trigger: el,
                start: 'top 90%',
                toggleActions: 'play none none none',
              },
            }
          );
        });
      });
    });

    return () => {
      // Cleanup ScrollTriggers on unmount
      import('gsap/ScrollTrigger').then(st => {
        st.ScrollTrigger?.getAll().forEach(t => t.kill());
      }).catch(() => {});
    };
  }, []);
}
