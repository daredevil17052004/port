'use client';

/**
 * NavigationBar — works across all pages
 * Home / Skills / Projects / About — on homepage: smooth scroll
 * On /projects page: Projects link is highlighted
 * Uses Next.js Link for page navigation
 */

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { AnimatePresence, motion } from 'framer-motion';
import {
  IconHome,
  IconBriefcase,
  IconFolder,
  IconUser,
  IconMail,
  IconX,
  IconMenu2,
} from '@tabler/icons-react';

const spring = { type: 'spring', bounce: 0, duration: 0.32 };

export default function NavigationBar() {
  const pathname   = usePathname();
  const [mobile, setMobile]     = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeHash, setActiveHash] = useState('Home');
  const headerRef = useRef(null);

  const isProjectsPage = pathname === '/projects';

  /* ── Scroll detection ── */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  /* ── Active section detection via IntersectionObserver (homepage only) ── */
  useEffect(() => {
    if (isProjectsPage) return;
    const sections = ['home', 'skills', 'projects', 'about', 'contact'];
    const observers = sections.map(id => {
      const el = document.getElementById(id);
      if (!el) return null;
      const io = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            const label = id.charAt(0).toUpperCase() + id.slice(1);
            setActiveHash(label);
          }
        },
        { threshold: 0.35 }
      );
      io.observe(el);
      return io;
    });
    return () => observers.forEach(io => io?.disconnect());
  }, [isProjectsPage]);

  /* ── GSAP entrance ── */
  useEffect(() => {
    import('gsap').then(mod => {
      const gsap = mod.gsap || mod.default;
      if (!headerRef.current) return;
      gsap.fromTo(
        headerRef.current,
        { y: -64, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out', delay: 0.15 }
      );
    });
  }, [pathname]);

  /* ── Body scroll lock on mobile drawer ── */
  useEffect(() => {
    document.body.style.overflow = mobile ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobile]);

  // Build nav items — homepage uses hash anchors, /projects gets a page link
  const NAV_ITEMS = [
    {
      label: 'Home',
      href: isProjectsPage ? '/' : '#home',
      Icon: IconHome,
      isPage: isProjectsPage,
    },
    {
      label: 'Skills',
      href: isProjectsPage ? '/#skills' : '#skills',
      Icon: IconBriefcase,
      isPage: isProjectsPage,
    },
    {
      label: 'Projects',
      href: '/projects',
      Icon: IconFolder,
      isPage: true, // always a page link
    },
    {
      label: 'About',
      href: isProjectsPage ? '/#about' : '#about',
      Icon: IconUser,
      isPage: isProjectsPage,
    },
  ];

  const isActive = (item) => {
    if (item.label === 'Projects') return isProjectsPage;
    if (isProjectsPage) return false;
    return activeHash === item.label;
  };

  return (
    <>
      {/* ── Main nav bar ── */}
      <header
        ref={headerRef}
        className="fixed top-0 left-0 right-0 z-50"
        style={{
          padding: '14px 28px',
          background: scrolled ? 'rgba(14,16,15,0.92)' : 'transparent',
          backdropFilter: scrolled ? 'blur(24px)' : 'none',
          borderBottom: scrolled ? '1px solid rgba(50,50,40,0.6)' : '1px solid transparent',
          transition: 'background 220ms ease, backdrop-filter 220ms ease, border-color 220ms ease',
          opacity: 0, /* GSAP animates in */
        }}
      >
        <div style={{
          maxWidth: '1400px', margin: '0 auto',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        }}>

          {/* ── Left: dot + brand ── */}
          <Link
            href="/"
            style={{
              display: 'flex', alignItems: 'center', gap: '10px',
              textDecoration: 'none',
              color: 'var(--primarytext)',
              fontFamily: 'var(--font-hanken, system-ui)',
              fontSize: '0.95rem', fontWeight: 600, letterSpacing: '-0.02em',
            }}
          >
            <img 
              src="/logo.jpg" 
              alt="Logo" 
              style={{
                width: '30px', height: '30px', borderRadius: '50%',
                objectFit: 'cover', flexShrink: 0, display: 'block',
              }} 
            />
            anshsharma
          </Link>

          {/* ── Center: desktop pill nav ── */}
          <nav
            aria-label="Main navigation"
            className="hidden md:flex"
            style={{
              display: 'flex', alignItems: 'center',
              background: 'rgba(255,255,255,0.04)',
              border: '1px solid var(--bline)',
              borderRadius: '9999px',
              padding: '4px', gap: '2px',
            }}
          >
            {NAV_ITEMS.map(({ label, href, Icon, isPage }) => {
              const active = isActive({ label, href });
              const linkStyle = {
                display: 'flex', alignItems: 'center', gap: '6px',
                padding: '7px 16px', borderRadius: '9999px',
                fontSize: '0.8125rem', fontWeight: active ? 600 : 500,
                fontFamily: 'var(--font-hanken, system-ui)',
                letterSpacing: '-0.01em', textDecoration: 'none',
                color: active ? 'var(--background)' : 'var(--sectext)',
                background: active ? 'var(--primarytext)' : 'transparent',
                transition: 'background 180ms ease, color 180ms ease',
                whiteSpace: 'nowrap',
              };

              return isPage ? (
                <Link
                  key={label}
                  href={href}
                  style={linkStyle}
                  onMouseEnter={e => { if (!active) e.currentTarget.style.color = 'var(--primarytext)'; }}
                  onMouseLeave={e => { if (!active) e.currentTarget.style.color = 'var(--sectext)'; }}
                  onClick={() => setMobile(false)}
                >
                  <Icon size={14} strokeWidth={1.8} aria-hidden="true" />
                  {label}
                </Link>
              ) : (
                <a
                  key={label}
                  href={href}
                  style={linkStyle}
                  onMouseEnter={e => { if (!active) e.currentTarget.style.color = 'var(--primarytext)'; }}
                  onMouseLeave={e => { if (!active) e.currentTarget.style.color = 'var(--sectext)'; }}
                  onClick={() => setActiveHash(label)}
                >
                  <Icon size={14} strokeWidth={1.8} aria-hidden="true" />
                  {label}
                </a>
              );
            })}
          </nav>

          {/* ── Right: Contact Me + hamburger ── */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <a
              href={isProjectsPage ? '/#contact' : '#contact'}
              className="hidden md:flex"
              style={{
                display: 'flex', alignItems: 'center', gap: '6px',
                padding: '7px 18px', borderRadius: '9999px',
                border: '1px solid var(--bline)',
                color: 'var(--primarytext)', fontSize: '0.8125rem', fontWeight: 500,
                fontFamily: 'var(--font-hanken, system-ui)',
                letterSpacing: '-0.01em', textDecoration: 'none', background: 'transparent',
                transition: 'border-color 180ms ease, background 180ms ease',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.borderColor = 'var(--primarytext)';
                e.currentTarget.style.background = 'rgba(255,255,227,0.06)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = 'var(--bline)';
                e.currentTarget.style.background = 'transparent';
              }}
            >
              <IconMail size={15} strokeWidth={1.8} aria-hidden="true" />
              Contact Me
            </a>

            <button
              className="md:hidden"
              onClick={() => setMobile(true)}
              aria-label="Open menu"
              style={{
                background: 'rgba(255,255,255,0.06)',
                border: '1px solid var(--bline)',
                borderRadius: '10px', cursor: 'pointer',
                color: 'var(--primarytext)', padding: '8px',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}
            >
              <IconMenu2 size={20} strokeWidth={1.8} />
            </button>
          </div>
        </div>
      </header>

      {/* ── Mobile drawer ── */}
      <AnimatePresence>
        {mobile && (
          <>
            <motion.div
              key="scrim"
              className="fixed inset-0 z-[60]"
              style={{ background: 'rgba(0,0,0,0.65)' }}
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setMobile(false)}
            />
            <motion.nav
              key="drawer"
              className="fixed top-0 right-0 bottom-0 z-[70]"
              style={{
                width: '270px', background: 'var(--bgcard)',
                borderLeft: '1px solid var(--bline)',
                display: 'flex', flexDirection: 'column',
              }}
              initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
              transition={spring}
            >
              {/* Drawer header */}
              <div style={{
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                padding: '18px 22px', borderBottom: '1px solid var(--bline)',
              }}>
                <span style={{
                  color: 'var(--primarytext)', fontWeight: 700,
                  fontSize: '1rem', letterSpacing: '-0.015em',
                  fontFamily: 'var(--font-hanken, system-ui)',
                }}>
                  Menu
                </span>
                <button
                  onClick={() => setMobile(false)} aria-label="Close"
                  style={{
                    background: 'rgba(255,255,255,0.07)', border: '1px solid var(--bline)',
                    borderRadius: '50%', width: '32px', height: '32px',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    cursor: 'pointer', color: 'var(--sectext)',
                  }}
                >
                  <IconX size={14} />
                </button>
              </div>

              {/* Drawer links */}
              <div style={{ flex: 1, padding: '14px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                {NAV_ITEMS.map(({ label, href, Icon, isPage }, i) => {
                  const active = isActive({ label, href });
                  const mobileStyle = {
                    borderRadius: '10px', padding: '13px 16px',
                    display: 'flex', alignItems: 'center', gap: '10px',
                    textDecoration: 'none',
                    color: active ? 'var(--accentv)' : 'var(--sectext)',
                    background: active ? 'rgba(163,116,255,0.08)' : 'transparent',
                    fontSize: '1rem', fontWeight: active ? 600 : 500,
                    fontFamily: 'var(--font-hanken, system-ui)',
                    letterSpacing: '-0.01em',
                  };
                  const content = (
                    <>
                      <Icon size={16} strokeWidth={1.8} aria-hidden="true" />
                      {label}
                    </>
                  );

                  return isPage ? (
                    <motion.div
                      key={label}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ type: 'spring', bounce: 0, duration: 0.3, delay: i * 0.05 }}
                    >
                      <Link href={href} style={mobileStyle} onClick={() => setMobile(false)}>
                        {content}
                      </Link>
                    </motion.div>
                  ) : (
                    <motion.a
                      key={label}
                      href={href}
                      style={mobileStyle}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ type: 'spring', bounce: 0, duration: 0.3, delay: i * 0.05 }}
                      onClick={() => { setActiveHash(label); setMobile(false); }}
                    >
                      {content}
                    </motion.a>
                  );
                })}
              </div>

              {/* Drawer CTA */}
              <div style={{ padding: '18px', borderTop: '1px solid var(--bline)' }}>
                <a
                  href={isProjectsPage ? '/#contact' : '#contact'}
                  style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    gap: '8px', padding: '13px 20px', borderRadius: '10px',
                    background: 'var(--primarytext)', color: 'var(--background)',
                    fontSize: '1rem', fontWeight: 700, textDecoration: 'none',
                    fontFamily: 'var(--font-hanken, system-ui)', letterSpacing: '-0.01em',
                  }}
                  onClick={() => setMobile(false)}
                >
                  <IconMail size={15} strokeWidth={1.8} />
                  Contact Me
                </a>
              </div>
            </motion.nav>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
