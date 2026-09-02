'use client';

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';

/**
 * PageTransition — GSAP-powered page entrance/exit
 * Wraps every page with a fade + slide-up on route change.
 */
export default function PageTransition({ children }) {
  const pathname  = usePathname();
  const wrapRef   = useRef(null);
  const overlayRef = useRef(null);

  useEffect(() => {
    let gsap;
    import('gsap').then(mod => {
      gsap = mod.gsap || mod.default;

      // Curtain overlay wipes out, then page content fades in
      const tl = gsap.timeline();

      // 1. Slide the curtain up (reveal)
      if (overlayRef.current) {
        tl.fromTo(
          overlayRef.current,
          { scaleY: 1, transformOrigin: 'top' },
          { scaleY: 0, duration: 0.55, ease: 'power4.inOut' }
        );
      }

      // 2. Fade + slide the page content in
      if (wrapRef.current) {
        tl.fromTo(
          wrapRef.current,
          { opacity: 0, y: 28 },
          { opacity: 1, y: 0, duration: 0.55, ease: 'power3.out' },
          '-=0.25'
        );
      }
    });
  }, [pathname]);

  return (
    <div style={{ position: 'relative', minHeight: '100vh' }}>
      {/* Curtain overlay */}
      <div
        ref={overlayRef}
        aria-hidden="true"
        style={{
          position: 'fixed',
          inset: 0,
          background: 'var(--background)',
          zIndex: 9999,
          transformOrigin: 'top',
          pointerEvents: 'none',
        }}
      />
      {/* Page content */}
      <div ref={wrapRef} style={{ opacity: 0 }}>
        {children}
      </div>
    </div>
  );
}
