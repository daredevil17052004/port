'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import {
  IconArrowLeft,
  IconBrandGithub,
  IconExternalLink,
  IconArrowUpRight,
  IconCode,
} from '@tabler/icons-react';
import NavigationBar from '@/components/NavigationBar';
import Footer from '@/components/Footer';
import { useGithubProjects } from '@/hooks/useGithubProjects';

// ── Category color map ─────────────────────────────────────────────────────────
const CATEGORY_ACCENTS = {
  'Full-Stack':    'var(--accentc)',
  'AI / Automation': 'var(--accentv)',
  'DevOps':        'var(--accentp)',
  'Tooling':       'var(--accentg)',
  'All':           'var(--accentb)',
};

// ── Noise texture overlay ──────────────────────────────────────────────────────
function NoiseOverlay() {
  return (
    <div
      aria-hidden="true"
      style={{
        position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none',
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        opacity: 0.022,
        mixBlendMode: 'overlay',
      }}
    />
  );
}

// ── Grid overlay ───────────────────────────────────────────────────────────────
function GridOverlay() {
  return (
    <div
      aria-hidden="true"
      style={{
        position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none',
        backgroundImage:
          'linear-gradient(var(--bline) 1px, transparent 1px), linear-gradient(90deg, var(--bline) 1px, transparent 1px)',
        backgroundSize: '64px 64px',
        backgroundPosition: '-1px -1px',
        opacity: 0.5,
      }}
    />
  );
}

// ── Featured project card ─────────────────────────────────────────────────────
function FeaturedCard({ project, index }) {
  const ref = useRef(null);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    import('gsap').then(mod => {
      const gsap = mod.gsap || mod.default;
      import('gsap/ScrollTrigger').then(st => {
        const { ScrollTrigger } = st;
        gsap.registerPlugin(ScrollTrigger);
        if (!ref.current) return;
        gsap.fromTo(ref.current,
          { opacity: 0, y: 60, scale: 0.97 },
          {
            opacity: 1, y: 0, scale: 1,
            duration: 0.7, ease: 'power3.out',
            delay: index * 0.15,
            scrollTrigger: { trigger: ref.current, start: 'top 90%', toggleActions: 'play none none none' },
          }
        );
      });
    });
  }, [index]);

  const { Icon, accent, metricColor } = project;

  return (
    <article
      ref={ref}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        opacity: 0,
        position: 'relative',
        borderRadius: '20px',
        border: '1px solid',
        borderColor: hovered ? accent : 'var(--bline)',
        background: 'var(--bgcard)',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        transition: 'border-color 250ms ease, transform 250ms cubic-bezier(0.34,1.56,0.64,1), box-shadow 250ms ease',
        transform: hovered ? 'translateY(-6px) scale(1.012)' : 'translateY(0) scale(1)',
        boxShadow: hovered ? `0 24px 64px ${accent}22, 0 0 0 1px ${accent}20` : '0 4px 24px rgba(0,0,0,0.3)',
        cursor: 'default',
      }}
    >
      {/* Top glow strip */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: '2px',
        background: `linear-gradient(90deg, transparent, ${accent}, transparent)`,
        opacity: hovered ? 1 : 0,
        transition: 'opacity 300ms ease',
      }} />

      {/* Radial glow */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        background: `radial-gradient(ellipse at 20% 0%, ${accent}10 0%, transparent 65%)`,
        opacity: hovered ? 1 : 0,
        transition: 'opacity 350ms ease',
      }} />

      {/* Dot grid texture */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.025) 1px, transparent 1px)',
        backgroundSize: '18px 18px',
      }} />

      <div style={{ padding: '32px', display: 'flex', flexDirection: 'column', gap: '18px', flex: 1, position: 'relative', zIndex: 1 }}>
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '12px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <div style={{
              width: '52px', height: '52px', borderRadius: '14px',
              background: `${accent}15`,
              border: `1px solid ${accent}35`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              flexShrink: 0,
              boxShadow: `0 0 20px ${accent}15`,
            }}>
              <Icon size={24} color={accent} strokeWidth={1.6} />
            </div>
            <div>
              <p style={{
                fontSize: '0.6875rem',
                color: 'var(--sectext)', opacity: 0.45,
                fontFamily: 'var(--font-geist-mono, monospace)',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                marginBottom: '4px',
              }}>
                {project.category}
              </p>
              <h3 style={{
                color: 'var(--primarytext)',
                fontFamily: 'var(--font-hanken, system-ui)',
                fontSize: '1.25rem',
                fontWeight: 700,
                letterSpacing: '-0.025em',
                lineHeight: 1.1,
              }}>
                {project.name}
              </h3>
            </div>
          </div>

          <span style={{
            color: metricColor,
            fontSize: '0.6875rem',
            fontWeight: 700,
            letterSpacing: '0.02em',
            fontFamily: 'var(--font-geist-mono, monospace)',
            background: `${metricColor}12`,
            padding: '4px 12px',
            borderRadius: '9999px',
            border: `1px solid ${metricColor}28`,
            whiteSpace: 'nowrap',
            flexShrink: 0,
            textTransform: 'uppercase',
          }}>
            {project.metric}
          </span>
        </div>

        {/* Tagline */}
        <p style={{
          color: accent,
          fontSize: '0.875rem',
          fontWeight: 600,
          fontFamily: 'var(--font-hanken, system-ui)',
          letterSpacing: '-0.01em',
          opacity: 0.9,
        }}>
          {project.tagline}
        </p>

        {/* Role + Duration */}
        <p style={{
          fontSize: '0.75rem',
          color: 'var(--sectext)', opacity: 0.4,
          fontFamily: 'var(--font-hanken, system-ui)',
          letterSpacing: '0.01em',
        }}>
          {project.role} · {project.duration}
        </p>

        {/* Description */}
        <p style={{
          color: 'var(--sectext)', opacity: 0.72,
          fontSize: '0.875rem', lineHeight: 1.75,
          fontFamily: 'var(--font-hanken, system-ui)',
          letterSpacing: '-0.005em',
          flex: 1,
        }}>
          {project.desc}
        </p>

        {/* Highlights */}
        {project.highlights && project.highlights.length > 0 && (
          <ul style={{ display: 'flex', flexDirection: 'column', gap: '8px', margin: 0, padding: 0, listStyle: 'none' }}>
            {project.highlights.map(h => (
              <li key={h} style={{
                display: 'flex', alignItems: 'center', gap: '10px',
                color: 'var(--sectext)', fontSize: '0.8125rem', opacity: 0.6,
                fontFamily: 'var(--font-hanken, system-ui)',
              }}>
                <span style={{
                  width: '5px', height: '5px', borderRadius: '50%',
                  background: accent, flexShrink: 0,
                  boxShadow: `0 0 5px ${accent}`,
                }} />
                {h}
              </li>
            ))}
          </ul>
        )}

        {/* Tech stack */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
          {project.tech.map(t => (
            <span key={t} style={{
              padding: '3px 10px', borderRadius: '9999px',
              border: `1px solid ${accent}22`,
              background: `${accent}08`,
              fontSize: '0.6875rem', color: accent, opacity: 0.75,
              fontFamily: 'var(--font-geist-mono, monospace)',
              letterSpacing: '0.02em',
            }}>
              {t}
            </span>
          ))}
        </div>

        {/* Divider */}
        <div style={{ borderTop: '1px solid var(--bline)', opacity: 0.5 }} />

        {/* Actions */}
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          {project.href && (
            <a
              href={project.href}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: '6px',
                padding: '9px 20px', borderRadius: '9999px',
                background: accent,
                color: '#0e100f',
                fontSize: '0.8125rem', fontWeight: 700,
                fontFamily: 'var(--font-hanken, system-ui)',
                letterSpacing: '-0.01em', textDecoration: 'none',
                transition: 'opacity 150ms ease, transform 150ms cubic-bezier(0.34,1.56,0.64,1)',
              }}
              onMouseEnter={e => { e.currentTarget.style.opacity = '0.85'; e.currentTarget.style.transform = 'scale(1.05)'; }}
              onMouseLeave={e => { e.currentTarget.style.opacity = '1'; e.currentTarget.style.transform = 'scale(1)'; }}
            >
              <IconExternalLink size={13} strokeWidth={2.2} />
              Live Demo
            </a>
          )}
          {project.repo && (
            <a
              href={project.repo}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: '6px',
                padding: '9px 20px', borderRadius: '9999px',
                border: `1px solid ${accent}30`,
                background: `${accent}08`,
                color: 'var(--sectext)',
                fontSize: '0.8125rem', fontWeight: 500,
                fontFamily: 'var(--font-hanken, system-ui)',
                letterSpacing: '-0.01em', textDecoration: 'none',
                transition: 'border-color 150ms ease, color 150ms ease, transform 150ms cubic-bezier(0.34,1.56,0.64,1)',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.borderColor = accent;
                e.currentTarget.style.color = 'var(--primarytext)';
                e.currentTarget.style.transform = 'scale(1.05)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = `${accent}30`;
                e.currentTarget.style.color = 'var(--sectext)';
                e.currentTarget.style.transform = 'scale(1)';
              }}
            >
              <IconBrandGithub size={13} strokeWidth={1.8} />
              Source
            </a>
          )}
        </div>
      </div>
    </article>
  );
}

// ── Compact project card ───────────────────────────────────────────────────────
function CompactCard({ project, index }) {
  const ref = useRef(null);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    import('gsap').then(mod => {
      const gsap = mod.gsap || mod.default;
      import('gsap/ScrollTrigger').then(st => {
        const { ScrollTrigger } = st;
        gsap.registerPlugin(ScrollTrigger);
        if (!ref.current) return;
        gsap.fromTo(ref.current,
          { opacity: 0, x: -20 },
          {
            opacity: 1, x: 0,
            duration: 0.5, ease: 'power3.out',
            delay: (index % 5) * 0.07,
            scrollTrigger: { trigger: ref.current, start: 'top 92%', toggleActions: 'play none none none' },
          }
        );
      });
    });
  }, [index]);

  const { Icon, accent } = project;

  return (
    <article
      ref={ref}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        opacity: 0,
        display: 'flex', alignItems: 'flex-start', gap: '16px',
        padding: '20px 24px',
        borderRadius: '14px',
        border: '1px solid',
        borderColor: hovered ? `${accent}50` : 'var(--bline)',
        background: hovered ? `${accent}06` : 'var(--bgcard)',
        transition: 'border-color 220ms ease, background 220ms ease, transform 220ms cubic-bezier(0.34,1.56,0.64,1)',
        transform: hovered ? 'translateX(4px)' : 'translateX(0)',
        cursor: 'default',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Left accent bar */}
      <div style={{
        position: 'absolute', left: 0, top: '16px', bottom: '16px', width: '3px',
        borderRadius: '0 3px 3px 0',
        background: accent,
        opacity: hovered ? 0.8 : 0,
        transition: 'opacity 220ms ease',
      }} />

      {/* Icon */}
      <div style={{
        width: '40px', height: '40px', borderRadius: '10px',
        background: `${accent}15`,
        border: `1px solid ${accent}30`,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        flexShrink: 0,
        marginLeft: '4px',
      }}>
        <Icon size={18} color={accent} strokeWidth={1.7} />
      </div>

      {/* Content */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', marginBottom: '4px', flexWrap: 'wrap' }}>
          <h3 style={{
            color: 'var(--primarytext)',
            fontFamily: 'var(--font-hanken, system-ui)',
            fontSize: '0.9375rem',
            fontWeight: 700,
            letterSpacing: '-0.02em',
          }}>
            {project.name}
          </h3>
          <span style={{ color: accent, fontSize: '0.6875rem', opacity: 0.6, fontFamily: 'var(--font-geist-mono, monospace)' }}>
            {project.duration}
          </span>
        </div>

        <p style={{
          color: 'var(--sectext)', opacity: 0.55,
          fontSize: '0.8125rem', lineHeight: 1.65,
          fontFamily: 'var(--font-hanken, system-ui)',
          marginBottom: '10px',
          display: '-webkit-box',
          WebkitLineClamp: 2,
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden',
        }}>
          {project.desc}
        </p>

        <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', alignItems: 'center' }}>
          {project.tech.slice(0, 4).map(t => (
            <span key={t} style={{
              padding: '2px 8px', borderRadius: '9999px',
              border: '1px solid var(--bline)',
              fontSize: '0.625rem', color: 'var(--sectext)', opacity: 0.5,
              fontFamily: 'var(--font-geist-mono, monospace)',
              letterSpacing: '0.02em',
            }}>
              {t}
            </span>
          ))}
          {project.tech.length > 4 && (
            <span style={{ fontSize: '0.625rem', color: 'var(--sectext)', opacity: 0.3 }}>
              +{project.tech.length - 4}
            </span>
          )}
        </div>
      </div>

      {/* Right actions */}
      <div style={{ display: 'flex', gap: '6px', flexShrink: 0, marginTop: '2px' }}>
        {project.href && (
          <a
            href={project.href}
            target="_blank"
            rel="noopener noreferrer"
            title="Live demo"
            style={{
              width: '30px', height: '30px', borderRadius: '8px',
              border: `1px solid ${accent}30`,
              background: `${accent}10`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: accent, textDecoration: 'none',
              transition: 'background 150ms ease, border-color 150ms ease',
            }}
            onMouseEnter={e => { e.currentTarget.style.background = `${accent}22`; }}
            onMouseLeave={e => { e.currentTarget.style.background = `${accent}10`; }}
          >
            <IconArrowUpRight size={13} strokeWidth={2} />
          </a>
        )}
        {project.repo && (
          <a
            href={project.repo}
            target="_blank"
            rel="noopener noreferrer"
            title="View source"
            style={{
              width: '30px', height: '30px', borderRadius: '8px',
              border: '1px solid var(--bline)',
              background: 'transparent',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: 'var(--sectext)', textDecoration: 'none', opacity: 0.55,
              transition: 'opacity 150ms ease, border-color 150ms ease',
            }}
            onMouseEnter={e => { e.currentTarget.style.opacity = '1'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)'; }}
            onMouseLeave={e => { e.currentTarget.style.opacity = '0.55'; e.currentTarget.style.borderColor = 'var(--bline)'; }}
          >
            <IconBrandGithub size={13} strokeWidth={1.8} />
          </a>
        )}
      </div>
    </article>
  );
}

// ── Page ───────────────────────────────────────────────────────────────────────
export default function ProjectsPage() {
  const { projects: PROJECTS, loading, error } = useGithubProjects('daredevil17052004');
  const [activeCategory, setActiveCategory] = useState('All');
  const headerRef = useRef(null);

  const CATEGORIES = ['All', ...new Set(PROJECTS.map(p => p.category))];

  const filtered = activeCategory === 'All'
    ? PROJECTS
    : PROJECTS.filter(p => p.category === activeCategory);

  // Featured = first 3, rest are compact cards
  const featured = filtered.slice(0, 3);
  const rest = filtered.slice(3);

  // Count per category
  const categoryCounts = {};
  CATEGORIES.forEach(cat => {
    categoryCounts[cat] = cat === 'All' ? PROJECTS.length : PROJECTS.filter(p => p.category === cat).length;
  });

  // GSAP header entrance
  useEffect(() => {
    import('gsap').then(mod => {
      const gsap = mod.gsap || mod.default;
      if (!headerRef.current) return;
      gsap.fromTo(
        Array.from(headerRef.current.children),
        { opacity: 0, y: 32 },
        { opacity: 1, y: 0, duration: 0.65, ease: 'power3.out', stagger: 0.1, delay: 0.2 }
      );
    });
  }, []);

  return (
    <>
      <NavigationBar />

      {/* Background layers */}
      <GridOverlay />
      <NoiseOverlay />

      {/* Ambient glow blobs */}
      <div aria-hidden="true" style={{
        position: 'fixed', top: '-20vh', left: '-10vw', width: '60vw', height: '60vh',
        background: 'radial-gradient(ellipse, rgba(163,116,255,0.06) 0%, transparent 70%)',
        pointerEvents: 'none', zIndex: 0,
      }} />
      <div aria-hidden="true" style={{
        position: 'fixed', bottom: '-10vh', right: '-10vw', width: '50vw', height: '50vh',
        background: 'radial-gradient(ellipse, rgba(23,241,209,0.04) 0%, transparent 70%)',
        pointerEvents: 'none', zIndex: 0,
      }} />

      <main style={{ background: 'var(--background)', minHeight: '100vh', position: 'relative', zIndex: 1, overflowX: 'hidden', width: '100%', maxWidth: '100%' }}>

        {/* ── Page Header ── */}
        <section style={{
          paddingTop: '120px', paddingBottom: '56px',
          paddingLeft: '1.5rem', paddingRight: '1.5rem',
          maxWidth: '1280px', margin: '0 auto',
          position: 'relative',
        }}>
          <div ref={headerRef} style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>

            {/* Back link */}
            <div>
              <Link
                href="/"
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: '6px',
                  color: 'var(--sectext)', fontSize: '0.8125rem',
                  fontFamily: 'var(--font-hanken, system-ui)',
                  textDecoration: 'none',
                  opacity: 0.5,
                  transition: 'opacity 150ms ease',
                  marginBottom: '40px',
                  letterSpacing: '-0.01em',
                }}
                onMouseEnter={e => { e.currentTarget.style.opacity = '1'; }}
                onMouseLeave={e => { e.currentTarget.style.opacity = '0.5'; }}
              >
                <IconArrowLeft size={13} strokeWidth={2} />
                back to home
              </Link>
            </div>

            {/* Eyebrow */}
            <div>
              <p className="code-comment" style={{ marginBottom: '12px' }}>
                // selected work · {loading ? '…' : PROJECTS.length} projects
              </p>
            </div>

            {/* Heading */}
            <div>
              <h1
                className="text-display"
                style={{
                  background: 'linear-gradient(135deg, var(--primarytext) 0%, var(--accentv) 45%, var(--accentc) 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  fontSize: 'clamp(3.5rem, 9vw, 8rem)',
                  lineHeight: 0.92,
                  marginBottom: '28px',
                  wordBreak: 'break-word',
                }}
              >
                Projects.
              </h1>
            </div>

            {/* Subtitle */}
            <div>
              <p style={{
                color: 'var(--sectext)', opacity: 0.6,
                fontSize: 'clamp(0.9375rem, 1.4vw, 1.0625rem)',
                lineHeight: 1.7, maxWidth: '560px',
                fontFamily: 'var(--font-hanken, system-ui)',
                letterSpacing: '-0.01em',
                marginBottom: '44px',
              }}>
                Things I&apos;ve built — from full-stack products to AI automation tools and developer infrastructure.
                Each project is a problem worth solving, shipped with intent.
              </p>
            </div>

            {/* Stats row */}
            <div>
              <div style={{
                display: 'flex', gap: '0', flexWrap: 'wrap',
                borderRadius: '14px',
                border: '1px solid var(--bline)',
                background: 'rgba(25,25,23,0.5)',
                backdropFilter: 'blur(12px)',
                WebkitBackdropFilter: 'blur(12px)',
                width: 'fit-content',
                maxWidth: '100%',
                overflow: 'hidden',
                marginBottom: '40px',
              }}>
                {[
                  { label: 'Total Projects', value: PROJECTS.length },
                  { label: 'With Live Demo', value: PROJECTS.filter(p => p.href).length },
                  { label: 'Open Source', value: PROJECTS.filter(p => p.repo).length },
                  { label: 'Categories', value: CATEGORIES.length - 1 },
                ].map((stat, i) => (
                  <div key={stat.label} style={{
                    padding: '14px 24px',
                    borderRight: i < 3 ? '1px solid var(--bline)' : 'none',
                    textAlign: 'center',
                    flex: '1 1 auto',
                  }}>
                    <div style={{
                      color: 'var(--primarytext)',
                      fontFamily: 'var(--font-hanken, system-ui)',
                      fontSize: '1.625rem',
                      fontWeight: 800,
                      letterSpacing: '-0.035em',
                      lineHeight: 1,
                      marginBottom: '4px',
                    }}>
                      {loading ? '—' : stat.value}
                    </div>
                    <div style={{
                      color: 'var(--sectext)', opacity: 0.4,
                      fontSize: '0.6875rem',
                      fontFamily: 'var(--font-geist-mono, monospace)',
                      letterSpacing: '0.04em',
                      textTransform: 'uppercase',
                    }}>
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Category filter pills */}
            <div>
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                {CATEGORIES.map(cat => {
                  const isActive = activeCategory === cat;
                  const catAccent = CATEGORY_ACCENTS[cat] || 'var(--accentb)';
                  return (
                    <button
                      key={cat}
                      onClick={() => setActiveCategory(cat)}
                      style={{
                        padding: '8px 18px', borderRadius: '9999px',
                        border: '1px solid',
                        borderColor: isActive ? catAccent : 'var(--bline)',
                        background: isActive ? `${catAccent}14` : 'transparent',
                        color: isActive ? catAccent : 'var(--sectext)',
                        fontSize: '0.8125rem',
                        fontWeight: isActive ? 600 : 500,
                        fontFamily: 'var(--font-hanken, system-ui)',
                        letterSpacing: '-0.01em',
                        cursor: 'pointer',
                        transition: 'all 180ms cubic-bezier(0.34,1.56,0.64,1)',
                        transform: isActive ? 'scale(1.04)' : 'scale(1)',
                        boxShadow: isActive ? `0 0 16px ${catAccent}18` : 'none',
                        display: 'flex', alignItems: 'center', gap: '6px',
                      }}
                    >
                      {cat}
                      <span style={{
                        fontSize: '0.6875rem',
                        opacity: isActive ? 0.65 : 0.4,
                        fontFamily: 'var(--font-geist-mono, monospace)',
                      }}>
                        {categoryCounts[cat]}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* Divider */}
        <div style={{ borderTop: '1px solid var(--bline)', margin: '0 1.5rem', opacity: 0.6 }} />

        {/* ── Projects ── */}
        <section style={{
          paddingTop: '56px', paddingBottom: '80px',
          paddingLeft: '1.5rem', paddingRight: '1.5rem',
          maxWidth: '1280px', margin: '0 auto',
        }}>

          {/* Results label */}
          <p style={{
            color: 'var(--sectext)', opacity: 0.32,
            fontSize: '0.6875rem',
            fontFamily: 'var(--font-geist-mono, monospace)',
            marginBottom: '32px',
            letterSpacing: '0.06em',
            textTransform: 'uppercase',
          }}>
            {loading ? 'loading…' : `${filtered.length} project${filtered.length !== 1 ? 's' : ''}`}
            {activeCategory !== 'All' ? ` · ${activeCategory}` : ''}
          </p>

          {loading ? (
            /* Skeleton loader */
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 340px), 1fr))',
              gap: '20px',
            }}>
              {[1, 2, 3].map(i => (
                <div key={i} style={{
                  height: '380px', borderRadius: '20px',
                  background: 'var(--bgcard)',
                  border: '1px solid var(--bline)',
                  animation: 'projects-pulse 2s ease infinite',
                }} />
              ))}
            </div>
          ) : error ? (
            <div style={{
              padding: '48px', textAlign: 'center',
              color: 'var(--accento)', opacity: 0.7,
              fontFamily: 'var(--font-hanken, system-ui)',
            }}>
              <IconCode size={32} style={{ marginBottom: '12px', opacity: 0.5, display: 'block', margin: '0 auto 12px' }} />
              <p>Couldn&apos;t fetch from GitHub — showing local data</p>
              <p style={{ fontSize: '0.8125rem', opacity: 0.5, marginTop: '8px' }}>{error}</p>
            </div>
          ) : filtered.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '80px 20px' }}>
              <p style={{ color: 'var(--sectext)', opacity: 0.35, fontSize: '1rem', fontFamily: 'var(--font-hanken, system-ui)' }}>
                No projects in this category yet.
              </p>
            </div>
          ) : (
            <>
              {/* Featured cards — responsive grid */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 340px), 1fr))',
                gap: '20px',
              }}>
                {featured.map((project, i) => (
                  <FeaturedCard key={project.id} project={project} index={i} />
                ))}
              </div>

              {/* Compact list — remaining projects */}
              {rest.length > 0 && (
                <>
                  <div style={{
                    display: 'flex', alignItems: 'center', gap: '12px',
                    margin: '48px 0 24px',
                  }}>
                    <div style={{ height: '1px', background: 'var(--bline)', flex: 1 }} />
                    <span style={{
                      color: 'var(--sectext)', opacity: 0.32,
                      fontSize: '0.6875rem',
                      fontFamily: 'var(--font-geist-mono, monospace)',
                      letterSpacing: '0.06em',
                      textTransform: 'uppercase',
                      whiteSpace: 'nowrap',
                    }}>
                      more projects
                    </span>
                    <div style={{ height: '1px', background: 'var(--bline)', flex: 1 }} />
                  </div>

                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 420px), 1fr))',
                    gap: '10px',
                  }}>
                    {rest.map((project, i) => (
                      <CompactCard key={project.id} project={project} index={i} />
                    ))}
                  </div>
                </>
              )}
            </>
          )}
        </section>

        {/* ── Footer CTA ── */}
        <section style={{
          borderTop: '1px solid var(--bline)',
          padding: '72px 1.5rem',
          textAlign: 'center',
          maxWidth: '1280px',
          margin: '0 auto',
          position: 'relative',
        }}>
          <div aria-hidden="true" style={{
            position: 'absolute', inset: 0,
            background: 'radial-gradient(ellipse at 50% 0%, rgba(163,116,255,0.06) 0%, transparent 70%)',
            pointerEvents: 'none',
          }} />

          <p className="code-comment" style={{ marginBottom: '12px' }}>// there&apos;s more on github</p>
          <h2 style={{
            color: 'var(--primarytext)',
            fontFamily: 'var(--font-hanken, system-ui)',
            fontSize: 'clamp(1.75rem, 3.5vw, 2.75rem)',
            fontWeight: 800,
            letterSpacing: '-0.03em',
            marginBottom: '16px',
          }}>
            See everything I&apos;ve built →
          </h2>
          <p style={{
            color: 'var(--sectext)', opacity: 0.5,
            fontSize: '0.9375rem', lineHeight: 1.7,
            maxWidth: '420px', margin: '0 auto 36px',
            fontFamily: 'var(--font-hanken, system-ui)',
            letterSpacing: '-0.01em',
          }}>
            More experiments, open-source contributions, and side projects live on my GitHub.
          </p>
          <a
            href="https://github.com/daredevil17052004"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '8px',
              padding: '13px 32px', borderRadius: '9999px',
              background: 'var(--primarytext)', color: 'var(--background)',
              fontSize: '0.9375rem', fontWeight: 700,
              fontFamily: 'var(--font-hanken, system-ui)',
              letterSpacing: '-0.015em', textDecoration: 'none',
              transition: 'opacity 150ms ease, transform 200ms cubic-bezier(0.34,1.56,0.64,1)',
              boxShadow: '0 4px 24px rgba(255,255,227,0.08)',
              position: 'relative', zIndex: 1,
            }}
            onMouseEnter={e => { e.currentTarget.style.opacity = '0.88'; e.currentTarget.style.transform = 'scale(1.05)'; }}
            onMouseLeave={e => { e.currentTarget.style.opacity = '1'; e.currentTarget.style.transform = 'scale(1)'; }}
          >
            <IconBrandGithub size={16} strokeWidth={1.8} />
            github.com/daredevil17052004
          </a>
        </section>
      </main>

      <Footer />

      <style jsx global>{`
        @keyframes projects-pulse {
          0%, 100% { opacity: 0.4; }
          50% { opacity: 0.7; }
        }
        @media (max-width: 640px) {
          .projects-section { padding-left: 1rem !important; padding-right: 1rem !important; }
        }
      `}</style>
    </>
  );
}
