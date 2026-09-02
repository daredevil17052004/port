'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import {
  IconArrowLeft,
  IconBrandGithub,
  IconExternalLink,
  IconCode,
  IconServer,
  IconCloud,
  IconBook,
} from '@tabler/icons-react';
import NavigationBar from '@/components/NavigationBar';
import { useGithubProjects } from '@/hooks/useGithubProjects';

// ── Single project card ───────────────────────────────────────────────────────
function ProjectCard({ project, index }) {
  const cardRef = useRef(null);

  useEffect(() => {
    import('gsap').then(mod => {
      const gsap = mod.gsap || mod.default;
      import('gsap/ScrollTrigger').then(st => {
        const { ScrollTrigger } = st;
        gsap.registerPlugin(ScrollTrigger);
        if (!cardRef.current) return;
        gsap.fromTo(cardRef.current,
          { opacity: 0, y: 40 },
          {
            opacity: 1, y: 0, duration: 0.6, ease: 'power3.out',
            delay: (index % 3) * 0.1,
            scrollTrigger: { trigger: cardRef.current, start: 'top 88%', toggleActions: 'play none none none' },
          }
        );
      });
    });
  }, [index]);

  const { Icon, accent } = project;

  return (
    <article
      ref={cardRef}
      style={{
        opacity: 0,
        background: 'var(--bgcard)',
        border: '1px solid var(--bline)',
        borderRadius: '16px',
        padding: '28px',
        display: 'flex',
        flexDirection: 'column',
        gap: '20px',
        transition: 'border-color 200ms ease, transform 200ms ease, box-shadow 200ms ease',
        cursor: 'default',
        position: 'relative',
        overflow: 'hidden',
      }}
      onMouseEnter={e => {
        e.currentTarget.style.borderColor = accent;
        e.currentTarget.style.transform = 'translateY(-4px)';
        e.currentTarget.style.boxShadow = `0 16px 40px ${accent}18`;
      }}
      onMouseLeave={e => {
        e.currentTarget.style.borderColor = 'var(--bline)';
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = 'none';
      }}
    >
      {/* Subtle grid pattern */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none', borderRadius: '16px',
        backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.02) 1px, transparent 1px)',
        backgroundSize: '20px 20px',
      }} />

      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '12px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{
            width: '44px', height: '44px', borderRadius: '12px',
            background: `${accent}18`,
            border: `1px solid ${accent}40`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            flexShrink: 0,
          }}>
            <Icon size={20} color={accent} strokeWidth={1.8} />
          </div>
          <div>
            <h3 style={{
              color: 'var(--primarytext)',
              fontFamily: 'var(--font-hanken, system-ui)',
              fontSize: '1.125rem',
              fontWeight: 700,
              letterSpacing: '-0.02em',
              marginBottom: '2px',
            }}>
              {project.name}
            </h3>
            <p style={{ color: 'var(--sectext)', fontSize: '0.8125rem', opacity: 0.6 }}>
              {project.tagline}
            </p>
          </div>
        </div>

        {/* Metric badge */}
        <span style={{
          color: project.metricColor,
          fontSize: '0.75rem',
          fontWeight: 700,
          letterSpacing: '-0.01em',
          fontFamily: 'var(--font-hanken, system-ui)',
          background: `${project.metricColor}15`,
          padding: '4px 10px',
          borderRadius: '9999px',
          border: `1px solid ${project.metricColor}30`,
          whiteSpace: 'nowrap',
          flexShrink: 0,
        }}>
          {project.metric}
        </span>
      </div>

      {/* Meta: role + duration */}
      <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
        <span style={{
          fontSize: '0.75rem', color: 'var(--sectext)', opacity: 0.5,
          fontFamily: 'var(--font-hanken, system-ui)',
        }}>
          {project.role} · {project.duration}
        </span>
      </div>

      {/* Description */}
      <p style={{
        color: 'var(--sectext)', opacity: 0.75,
        fontSize: '0.875rem', lineHeight: 1.7,
        fontFamily: 'var(--font-hanken, system-ui)',
        flex: 1,
      }}>
        {project.desc}
      </p>

      {/* Highlights */}
      <ul style={{ display: 'flex', flexDirection: 'column', gap: '6px', margin: 0, padding: 0, listStyle: 'none' }}>
        {project.highlights.map(h => (
          <li key={h} style={{
            display: 'flex', alignItems: 'center', gap: '8px',
            color: 'var(--sectext)', fontSize: '0.8125rem', opacity: 0.7,
            fontFamily: 'var(--font-hanken, system-ui)',
          }}>
            <span style={{ width: '5px', height: '5px', borderRadius: '50%', background: accent, flexShrink: 0 }} />
            {h}
          </li>
        ))}
      </ul>

      {/* Tech stack chips */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
        {project.tech.map(t => (
          <span key={t} style={{
            padding: '3px 10px', borderRadius: '9999px',
            border: '1px solid var(--bline)',
            fontSize: '0.6875rem', color: 'var(--sectext)', opacity: 0.7,
            fontFamily: 'var(--font-hanken, system-ui)',
          }}>
            {t}
          </span>
        ))}
      </div>

      {/* Actions */}
      <div style={{ display: 'flex', gap: '8px', paddingTop: '4px' }}>
        {project.href && (
          <a
            href={project.href}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'flex', alignItems: 'center', gap: '6px',
              padding: '8px 18px', borderRadius: '9999px',
              background: accent, color: 'var(--background)',
              fontSize: '0.8125rem', fontWeight: 700,
              fontFamily: 'var(--font-hanken, system-ui)',
              letterSpacing: '-0.01em', textDecoration: 'none',
              transition: 'opacity 150ms ease',
            }}
            onMouseEnter={e => { e.currentTarget.style.opacity = '0.85'; }}
            onMouseLeave={e => { e.currentTarget.style.opacity = '1'; }}
          >
            <IconExternalLink size={13} strokeWidth={2} />
            Live Demo
          </a>
        )}
        <a
          href={project.repo}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: 'flex', alignItems: 'center', gap: '6px',
            padding: '8px 18px', borderRadius: '9999px',
            border: '1px solid var(--bline)', color: 'var(--sectext)',
            fontSize: '0.8125rem', fontWeight: 500,
            fontFamily: 'var(--font-hanken, system-ui)',
            letterSpacing: '-0.01em', textDecoration: 'none',
            transition: 'border-color 150ms ease, color 150ms ease',
          }}
          onMouseEnter={e => {
            e.currentTarget.style.borderColor = 'rgba(255,255,255,0.3)';
            e.currentTarget.style.color = 'var(--primarytext)';
          }}
          onMouseLeave={e => {
            e.currentTarget.style.borderColor = 'var(--bline)';
            e.currentTarget.style.color = 'var(--sectext)';
          }}
        >
          <IconBrandGithub size={13} strokeWidth={1.8} />
          Source
        </a>
      </div>
    </article>
  );
}

// ── Page ─────────────────────────────────────────────────────────────────────
export default function ProjectsPage() {
  const { projects: PROJECTS, loading, error } = useGithubProjects('daredevil17052004');
  const [activeCategory, setActiveCategory] = useState('All');
  const headerRef = useRef(null);

  const CATEGORIES = ['All', ...new Set(PROJECTS.map(p => p.category))];

  const filtered = activeCategory === 'All'
    ? PROJECTS
    : PROJECTS.filter(p => p.category === activeCategory);

  // GSAP header entrance
  useEffect(() => {
    import('gsap').then(mod => {
      const gsap = mod.gsap || mod.default;
      if (!headerRef.current) return;
      gsap.fromTo(headerRef.current.children,
        { opacity: 0, y: 28 },
        { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out', stagger: 0.12, delay: 0.2 }
      );
    });
  }, []);

  return (
    <>
      <NavigationBar />

      <main style={{ background: 'var(--background)', minHeight: '100vh' }}>
        {/* Blueprint grid */}
        <div className="grid-overlay" aria-hidden="true" />

        {/* ── Page header ── */}
        <section style={{
          paddingTop: '120px', paddingBottom: '64px',
          paddingLeft: '1.5rem', paddingRight: '1.5rem',
          maxWidth: '1400px', margin: '0 auto',
          position: 'relative',
        }}>
          <div ref={headerRef}>
            {/* Back link */}
            <Link
              href="/"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: '6px',
                color: 'var(--sectext)', fontSize: '0.8125rem',
                fontFamily: 'var(--font-hanken, system-ui)',
                textDecoration: 'none', marginBottom: '32px',
                opacity: 0.6,
                transition: 'opacity 150ms ease',
              }}
              onMouseEnter={e => { e.currentTarget.style.opacity = '1'; }}
              onMouseLeave={e => { e.currentTarget.style.opacity = '0.6'; }}
            >
              <IconArrowLeft size={14} strokeWidth={2} />
              Back to home
            </Link>

            {/* Heading */}
            <div style={{ marginBottom: '16px' }}>
              <p className="code-comment" style={{ marginBottom: '8px' }}>// selected work</p>
              <h1
                className="text-display"
                style={{
                  background: 'linear-gradient(135deg, var(--primarytext) 0%, var(--accentv) 50%, var(--accentc) 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  fontSize: 'clamp(3rem, 8vw, 7rem)',
                  lineHeight: 0.95,
                }}
              >
                Projects.
              </h1>
            </div>

            <p style={{
              color: 'var(--sectext)', opacity: 0.65,
              fontSize: 'clamp(0.9375rem, 1.5vw, 1.0625rem)',
              lineHeight: 1.6, maxWidth: '520px',
              fontFamily: 'var(--font-hanken, system-ui)',
              letterSpacing: '-0.005em',
              marginBottom: '40px',
            }}>
              Things I've built — from full-stack products to AI tools and developer infrastructure. Each project is a problem worth solving.
            </p>

            {/* Category filter pills */}
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              {CATEGORIES.map(cat => {
                const isActive = activeCategory === cat;
                return (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    style={{
                      padding: '8px 18px', borderRadius: '9999px',
                      border: '1px solid',
                      borderColor: isActive ? 'var(--accentv)' : 'var(--bline)',
                      background: isActive ? 'var(--accentv)18' : 'transparent',
                      color: isActive ? 'var(--accentv)' : 'var(--sectext)',
                      fontSize: '0.8125rem', fontWeight: isActive ? 600 : 500,
                      fontFamily: 'var(--font-hanken, system-ui)',
                      letterSpacing: '-0.01em',
                      cursor: 'pointer',
                      transition: 'all 160ms ease',
                    }}
                  >
                    {cat}
                    {cat === 'All' && (
                      <span style={{ marginLeft: '6px', opacity: 0.5 }}>{PROJECTS.length}</span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </section>

        {/* Divider */}
        <div style={{ borderTop: '1px solid var(--bline)', marginLeft: '1.5rem', marginRight: '1.5rem' }} />

        {/* ── Project cards grid ── */}
        <section style={{
          paddingTop: '48px', paddingBottom: '96px',
          paddingLeft: '1.5rem', paddingRight: '1.5rem',
          maxWidth: '1400px', margin: '0 auto',
        }}>
          {/* Results count */}
          <p style={{
            color: 'var(--sectext)', opacity: 0.4,
            fontSize: '0.75rem',
            fontFamily: 'var(--font-hanken, system-ui)',
            marginBottom: '28px',
            letterSpacing: '0.04em',
            textTransform: 'uppercase',
          }}>
            {filtered.length} project{filtered.length !== 1 ? 's' : ''}
            {activeCategory !== 'All' ? ` · ${activeCategory}` : ''}
          </p>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
            gap: '20px',
          }}>
            {loading ? (
              <div style={{ padding: '40px', color: 'var(--sectext)', textAlign: 'center', gridColumn: '1 / -1' }}>
                Fetching from GitHub...
              </div>
            ) : error ? (
              <div style={{ padding: '40px', color: 'var(--accento)', textAlign: 'center', gridColumn: '1 / -1' }}>
                Error fetching projects: {error}
              </div>
            ) : filtered.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '80px 20px', gridColumn: '1 / -1' }}>
                <p style={{ color: 'var(--sectext)', opacity: 0.4, fontSize: '1rem' }}>
                  No projects in this category yet.
                </p>
              </div>
            ) : (
              filtered.map((project, i) => (
                <ProjectCard key={project.id} project={project} index={i} />
              ))
            )}
          </div>
        </section>

        {/* ── Footer CTA ── */}
        <section style={{
          borderTop: '1px solid var(--bline)',
          padding: '64px 1.5rem',
          textAlign: 'center',
          maxWidth: '1400px',
          margin: '0 auto',
        }}>
          <p className="code-comment" style={{ marginBottom: '12px' }}>// more on github</p>
          <h2 style={{
            color: 'var(--primarytext)',
            fontFamily: 'var(--font-hanken, system-ui)',
            fontSize: 'clamp(1.5rem, 3vw, 2.5rem)',
            fontWeight: 700,
            letterSpacing: '-0.025em',
            marginBottom: '20px',
          }}>
            See everything I've built →
          </h2>
          <p style={{
            color: 'var(--sectext)', opacity: 0.55,
            fontSize: '0.9375rem', lineHeight: 1.6,
            maxWidth: '400px', margin: '0 auto 32px',
            fontFamily: 'var(--font-hanken, system-ui)',
          }}>
            More experiments, open-source contributions, and side projects live on my GitHub profile.
          </p>
          <a
            href="https://github.com/daredevil17052004"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '8px',
              padding: '12px 28px', borderRadius: '9999px',
              background: 'var(--primarytext)', color: 'var(--background)',
              fontSize: '0.9375rem', fontWeight: 700,
              fontFamily: 'var(--font-hanken, system-ui)',
              letterSpacing: '-0.01em', textDecoration: 'none',
              transition: 'opacity 150ms ease',
            }}
            onMouseEnter={e => { e.currentTarget.style.opacity = '0.88'; }}
            onMouseLeave={e => { e.currentTarget.style.opacity = '1'; }}
          >
            <IconBrandGithub size={16} strokeWidth={1.8} />
            github.com/daredevil17052004
          </a>
        </section>
      </main>
    </>
  );
}
