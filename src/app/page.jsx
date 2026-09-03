'use client';

/**
 * page.jsx â€” Exact clone of thegr8binil.me layout with Ansh's details
 * Uses: Aceternity UI patterns (Spotlight, Gradient Text, Glow Border)
 *       React-bits patterns (Shiny Text, Marquee)
 *       Exact reference spacing (section-x / section-y)
 */

import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import NavigationBar from '@/components/NavigationBar';
import ContactForm from '@/components/ContactForm';
import Footer from '@/components/Footer';
import { useGsapReveal } from '@/hooks/useGsapReveal';
import { useGithubProjects } from '@/hooks/useGithubProjects';

import {
  IconBrandGithub,
  IconBrandLinkedin,
  IconBrandDribbble,
  IconArrowRight,
  IconMail,
  IconTrendingUp,
  IconTools,
  IconRobot,
  IconRocket,
} from '@tabler/icons-react';
import { GlowingStarsCard } from '@/components/GlowingStarsCard';

// â”€â”€ Letter reveal â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
function LetterReveal({ text, color, delay = 0, className = '' }) {
  return (
    <span className={`letter-reveal ${className}`} aria-label={text}>
      {text.split('').map((ch, i) => (
        <span
          key={i}
          style={{ animationDelay: `${delay + i * 0.038}s`, color: ch === ' ' ? 'transparent' : color }}
          aria-hidden="true"
        >
          {ch === ' ' ? '\u00A0' : ch}
        </span>
      ))}
    </span>
  );
}

// â”€â”€ Page Loader â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
function PageLoader({ onDone }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let cur = 0;
    const t = setInterval(() => {
      cur += Math.random() * 9 + 5;
      if (cur >= 100) { cur = 100; clearInterval(t); setTimeout(onDone, 280); }
      setProgress(Math.min(cur, 100));
    }, 38);
    return () => clearInterval(t);
  }, [onDone]);

  return (
    <motion.div
      className="fixed inset-0 z-[200] flex flex-col items-center justify-center"
      style={{ background: 'var(--background)' }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.45 }}
    >
      <div style={{ width: '160px', marginBottom: '20px' }}>
        <div style={{ height: '2px', background: 'var(--bline)', borderRadius: '9999px', overflow: 'hidden' }}>
          <div className="loader-bar" style={{ width: `${progress}%` }} />
        </div>
      </div>
      <p
        className="tabular-nums"
        style={{
          fontFamily: 'var(--font-hanken, system-ui)',
          fontSize: 'clamp(2.5rem, 5vw, 4rem)',
          fontWeight: 900,
          letterSpacing: '-0.04em',
          color: 'var(--primarytext)',
        }}
      >
        {Math.round(progress)}
      </p>
    </motion.div>
  );
}

// ── Interactive grid background ──────────────────────────────────────────────
function GridBg({ containerRef }) {
  const [dimensions, setDimensions] = useState({ cols: 36, rows: 40 });

  useEffect(() => {
    const updateGrid = () => {
      const el = containerRef?.current;
      const w = window.innerWidth || 1920;
      const h = el ? el.offsetHeight : 1600;
      const cols = Math.ceil(w / 64) + 2;
      const rows = Math.ceil(h / 64) + 2;
      setDimensions({ cols, rows });
    };

    updateGrid();

    let resizeObserver;
    if (typeof ResizeObserver !== 'undefined' && containerRef?.current) {
      resizeObserver = new ResizeObserver(() => updateGrid());
      resizeObserver.observe(containerRef.current);
    }

    window.addEventListener('resize', updateGrid);
    return () => {
      window.removeEventListener('resize', updateGrid);
      if (resizeObserver) resizeObserver.disconnect();
    };
  }, [containerRef]);

  return (
    <div
      className="absolute inset-0 z-0 pointer-events-auto overflow-hidden blueprint-grid"
      aria-hidden="true"
      style={{
        opacity: 0.55,
        maskImage: 'linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,0.9) 70%, rgba(0,0,0,0) 98%)',
        WebkitMaskImage: 'linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,0.9) 70%, rgba(0,0,0,0) 98%)',
      }}
    >
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: `repeat(${dimensions.cols}, 64px)`,
          gridTemplateRows: `repeat(${dimensions.rows}, 64px)`,
          width: '100%',
          height: '100%',
        }}
      >
        {Array.from({ length: dimensions.cols * dimensions.rows }).map((_, i) => (
          <div key={i} className="grid-cell" />
        ))}
      </div>
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(to bottom, transparent 60%, var(--background) 98%)',
          pointerEvents: 'none',
        }}
      />
    </div>
  );
}

// â”€â”€ Divider â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
const Divider = () => <div style={{ borderTop: '1px solid var(--bline)' }} />;


// â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
// HERO â€” exact layout of reference
// â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
function HeroSection() {
  const heroRef = useRef(null);

  useEffect(() => {
    let gsap;
    import('gsap').then(mod => {
      gsap = mod.gsap || mod.default;
      if (!heroRef.current) return;
      const tl = gsap.timeline({ delay: 0.3 });
      // Avatar badge
      tl.fromTo('[data-hero="badge"]',
        { opacity: 0, y: 16 },
        { opacity: 1, y: 0, duration: 0.55, ease: 'power3.out' }
      )
      // Stacked title lines â€” one by one
      .fromTo('[data-hero="line"]',
        { opacity: 0, y: 56 },
        { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out', stagger: 0.15 },
        '-=0.2'
      )
      // Tagline
      .fromTo('[data-hero="tagline"]',
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' },
        '-=0.15'
      )
      // Socials row
      .fromTo('[data-hero="socials"]',
        { opacity: 0, y: 16 },
        { opacity: 1, y: 0, duration: 0.45, ease: 'power2.out' },
        '-=0.1'
      );
    });
  }, []);

  return (
    <section
      id="home"
      ref={heroRef}
      style={{
        minHeight: '100svh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden',
        paddingTop: '80px',
        paddingBottom: '80px',
      }}
    >
      {/* Aceternity Spotlight */}
      <div className="spotlight" aria-hidden="true" />

      <div style={{ position: 'relative', zIndex: 10, textAlign: 'center', padding: '0 24px', maxWidth: '900px', width: '100%', margin: '0 auto' }}>

        {/* Avatar pill */}
        <div
          data-hero="badge"
          style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px', marginBottom: '28px', opacity: 0 }}
        >
          {/* Avatar image */}
          <img
            src="/logo.jpg"
            alt="Ansh"
            style={{
              width: '40px', height: '40px', borderRadius: '50%',
              objectFit: 'cover', flexShrink: 0, display: 'block',
              border: '1px solid var(--bline)'
            }}
          />
          <span style={{
            padding: '6px 16px', borderRadius: '9999px',
            border: '1px solid var(--bline)',
            color: 'var(--sectext)', fontSize: '0.8125rem',
            background: 'rgba(255,255,255,0.03)',
            fontFamily: 'var(--font-hanken, system-ui)',
          }}>
            Hello, I'm Ansh
          </span>
        </div>

        {/* Giant stacked titles â€” GSAP line-by-line */}
        <div style={{ position: 'relative', lineHeight: 0.95, overflow: 'hidden' }}>

          {/* Line 1 */}
          <div data-hero="line" style={{ position: 'relative', marginBottom: '4px', opacity: 0 }}>
            <span className="code-comment" style={{ position: 'absolute', right: '-10px', top: '6px' }}>
              // Based in India
            </span>
            <h1 className="text-display block" style={{ color: 'var(--accentv)' }}>
              FULL-STACK
            </h1>
          </div>

          {/* Line 2 */}
          <div data-hero="line" style={{ position: 'relative', marginBottom: '4px', opacity: 0  }}>
            <h1 className="text-display block" style={{ color: 'var(--accenty)' }}>
              DEVELOPER
            </h1>
          </div>

          {/* Line 3 */}
          <div data-hero="line" style={{ position: 'relative', opacity: 0 }}>
            <span className="code-comment" style={{ position: 'absolute', left: '-10px', bottom: '0' }}>
              // Code. Build. Ship.
            </span>
            <h1 className="text-display block" style={{ color: 'var(--primarytext)' }}>
              &amp; <span style={{ color: 'var(--accentc)' }}>BUILDER</span>
            </h1>
          </div>
        </div>

        {/* Tagline */}
        <p
          data-hero="tagline"
          style={{
            maxWidth: '480px', margin: '24px auto 0',
            color: 'var(--sectext)',
            fontFamily: 'var(--font-hanken, system-ui)',
            fontSize: 'clamp(0.875rem, 1.25vw, 0.975rem)',
            lineHeight: 1.6, letterSpacing: '-0.005em',
            opacity: 0,
          }}
        >
          I create digital experiences that border on{' '}
          <span style={{ color: 'var(--accentv)' }}>efficiency</span>,{' '}
          <span style={{ color: 'var(--accenty)' }}>aesthetics</span>{' '}
          and{' '}
          <span style={{ color: 'var(--accentc)' }}>functionality</span>.
        </p>

        {/* Social row */}
        <div
          data-hero="socials"
          style={{
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            gap: '6px', marginTop: '32px', flexWrap: 'wrap',
            opacity: 0,
          }}
        >
          {[
            { href: 'https://github.com/daredevil17052004', Icon: IconBrandGithub, label: 'GitHub' },
            { href: 'https://www.linkedin.com/in/ansh-sharma-44a379280/', Icon: IconBrandLinkedin, label: 'LinkedIn' },
            { href: 'https://www.instagram.com/heyy.ansh17/', Icon: IconBrandDribbble, label: 'Instagram' },
          ].map(({ href, Icon, label }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              style={{
                width: '36px', height: '36px', borderRadius: '50%',
                border: '1px solid var(--bline)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: 'var(--sectext)', textDecoration: 'none',
                transition: 'color 150ms ease, border-color 150ms ease',
              }}
              onMouseEnter={e => { e.currentTarget.style.color = 'var(--accentb)'; e.currentTarget.style.borderColor = 'var(--accentb)'; }}
              onMouseLeave={e => { e.currentTarget.style.color = 'var(--sectext)'; e.currentTarget.style.borderColor = 'var(--bline)'; }}
            >
              <Icon size={16} strokeWidth={1.6} />
            </a>
          ))}
          {/* Let's Connect pill */}
          <a
            href="#contact"
            style={{
              display: 'flex', alignItems: 'center', gap: '8px',
              padding: '6px 18px', borderRadius: '9999px',
              border: '1px solid var(--bline)',
              color: 'var(--primarytext)', fontSize: '0.75rem',
              fontWeight: 500, textDecoration: 'none',
              fontFamily: 'var(--font-hanken, system-ui)', letterSpacing: '-0.005em',
              transition: 'border-color 150ms ease',
            }}
            onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--accentg)'}
            onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--bline)'}
          >
            <span style={{ width: '7px', height: '7px', borderRadius: '50%', background: 'var(--accentg)', animation: 'pulse 2s infinite', flexShrink: 0 }} />
            Let's Connect
          </a>
          <span style={{ color: 'var(--sectext)', opacity: 0.4, fontSize: '0.75rem', fontFamily: 'var(--font-hanken, system-ui)' }}>
            anshs052004@gmail.com
          </span>
        </div>
      </div>
    </section>
  );
}


// ════════════════════════════════════════════════════════════════════════════════
// WHAT I DO
// ════════════════════════════════════════════════════════════════════════════════
const WHAT_CARDS = [
  {
    icon: <IconTrendingUp size={22} strokeWidth={2.2} />,
    color: '#9d95ff', // var(--bviolet)
    title: 'Product Management',
    desc: 'Driving product strategy, customer discovery, roadmap planning, prioritization, and cross-functional execution.'
  },
  {
    icon: <IconTools size={22} strokeWidth={2.2} />,
    color: 'var(--accentc)',
    title: 'UX & Product Design',
    desc: 'Creating user-centered experiences through research, interaction design, prototyping, and scalable design systems.'
  },
  {
    icon: <IconRobot size={22} strokeWidth={2.2} />,
    color: '#f4a6da', // soft pink
    title: 'AI & Automation',
    desc: 'Building AI-native experiences using LLMs, intelligent workflows, prompt engineering, and automation.'
  },
  {
    icon: <IconRocket size={22} strokeWidth={2.2} />,
    color: '#ff8709', // var(--accento)
    title: 'Technical Product',
    desc: 'Collaborating with engineering, leveraging modern technologies, and shipping products from Idea to launch.'
  },
];

function WhatIDo() {
  return (
    <section id="whatido" className="section-x section-y" style={{ maxWidth: '1400px', margin: '0 auto', paddingTop: '64px', paddingBottom: '64px' }}>
      
      {/* Header row: Centered title with absolute right button */}
      <div style={{
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: '48px',
      }}>
        <h2 style={{
          color: 'var(--accentv)',
          fontSize: '1.125rem',
          fontWeight: 600,
          letterSpacing: '0.04em',
          textTransform: 'uppercase',
          fontFamily: 'var(--font-hanken, system-ui)',
        }}>
          WHAT I DO
        </h2>
        
        {/* About Me link */}
        <div style={{ position: 'absolute', right: 0 }}>
          <a
            href="#about"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '6px',
              padding: '8px 18px', borderRadius: '9999px',
              border: '1px solid var(--bline)',
              color: 'var(--primarytext)', fontSize: '0.8125rem', fontWeight: 500,
              fontFamily: 'var(--font-hanken, system-ui)',
              letterSpacing: '-0.01em', textDecoration: 'none', background: 'transparent',
              transition: 'border-color 150ms ease, background 150ms ease',
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
            About Me <IconArrowRight size={14} strokeWidth={2} />
          </a>
        </div>
      </div>

      {/* 4-card grid with Aceternity-style GlowingStarsCard */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
        gap: '20px'
      }}>
        {WHAT_CARDS.map((card, i) => (
          <GlowingStarsCard
            key={card.title}
            title={card.title}
            description={card.desc}
            icon={card.icon}
            iconColor={card.color}
          />
        ))}
      </div>
    </section>
  );
}


// ════════════════════════════════════════════════════════════════════════════════
// SKILLS — numbered rows exactly like reference
// ════════════════════════════════════════════════════════════════════════════════
const SKILLS = [
  {
    num: '01', title: 'Frontend', color: 'var(--accentv)',
    desc: 'Pixel-perfect, responsive interfaces — components that feel alive and perform at scale.',
    tags: ['React', 'Next.js', 'TypeScript', 'JavaScript', 'Tailwind CSS', 'Redux', 'Framer Motion']
  },
  {
    num: '02', title: 'Backend', color: 'var(--accenty)',
    desc: 'RESTful APIs, authentication, databases, microservices — production-grade from day one.',
    tags: ['Node.js', 'Express', 'Python', 'MongoDB', 'PostgreSQL', 'JWT', 'GraphQL']
  },
  {
    num: '03', title: 'Engineering', color: 'var(--accentc)',
    desc: 'Containerisation, CI/CD, cloud deployment — shipping reliably and repeatedly.',
    tags: ['Docker', 'Linux', 'GitHub Actions', 'Nginx', 'AWS EC2', 'Kubernetes']
  },
  {
    num: '04', title: 'AI & Tools', color: 'var(--accentp)',
    desc: 'Figma, Git workflows, AI-assisted development — moving fast without breaking things.',
    tags: ['Figma', 'Git', 'Neovim', 'Whisper AI', 'Gemini API']
  },
];

function Skills() {
  return (
    <section id="skills" className="section-x section-y" style={{ maxWidth: '1400px', margin: '0 auto' }}>
      <div style={{ marginBottom: '28px' }}>
        <p className="code-comment" style={{ marginBottom: '6px' }}>// expertise</p>
        <h2 className="text-headline gradient-text-yc">Experience &amp; skills.</h2>
      </div>

      <div>
        {SKILLS.map((skill, i) => (
          <div
            key={skill.title}
            className="skill-row"
          >
            {/* Number + title */}
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '10px' }}>
              <span className="code-comment">{skill.num}</span>
              <span
                className="text-skill-title shiny-text"
                style={{ color: skill.color }}
              >
                {skill.title}
              </span>
            </div>

            {/* Description */}
            <p style={{ color: 'var(--sectext)', opacity: 0.65, fontSize: '0.8125rem', lineHeight: 1.6, paddingTop: '4px' }}>
              {skill.desc}
            </p>

            {/* Tag chips */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', paddingTop: '4px' }}>
              {skill.tags.map(t => <span key={t} className="tag-chip">{t}</span>)}
            </div>
          </div>
        ))}
        <Divider />
      </div>
    </section>
  );
}


// ════════════════════════════════════════════════════════════════════════════════
// PROJECTS — stat row layout
// ════════════════════════════════════════════════════════════════════════════════
function Projects() {
  const { projects, loading, error } = useGithubProjects('daredevil17052004');
  const featuredProjects = projects.slice(0, 4);

  return (
    <section id="projects" className="section-x section-y" style={{ maxWidth: '1400px', margin: '0 auto' }}>
      <div style={{ marginBottom: '12px' }}>
        <p className="code-comment" style={{ marginBottom: '6px' }}>// selected work</p>
        <h2 className="text-headline gradient-text-vp">My Projects</h2>
      </div>

      <Divider />

      {loading ? (
        <div style={{ padding: '40px', color: 'var(--sectext)', textAlign: 'center' }}>
          Fetching from GitHub...
        </div>
      ) : error ? (
        <div style={{ padding: '40px', color: 'var(--accento)', textAlign: 'center' }}>
          Error fetching projects: {error}
        </div>
      ) : (
        featuredProjects.map((p, i) => (
        <div
          key={p.name}
          className="stat-row"
        >
          {/* Left */}
          <div style={{ flex: '1 1 160px', minWidth: 0 }}>
            <p style={{ color: 'var(--primarytext)', fontSize: '0.875rem', fontWeight: 600, letterSpacing: '-0.01em', marginBottom: '3px', fontFamily: 'var(--font-hanken, system-ui)' }}>
              {p.name}
            </p>
            <p style={{ color: 'var(--sectext)', opacity: 0.45, fontSize: '0.75rem' }}>
              {p.role}
            </p>
          </div>

          {/* Tech â€” hidden on mobile */}
          <p
            className="hidden md:block"
            style={{ flex: '1 1 140px', color: 'var(--sectext)', opacity: 0.38, fontSize: '0.75rem' }}
          >
            {Array.isArray(p.tech) ? p.tech.join(' Â· ') : p.tech}
          </p>

          {/* Metric â€” Aceternity gradient */}
          <span style={{ color: p.metricColor, fontSize: '1.125rem', fontWeight: 700, letterSpacing: '-0.02em', fontFamily: 'var(--font-hanken, system-ui)', flexShrink: 0 }}>
            {p.metric}
          </span>

          {/* Links */}
          <div style={{ display: 'flex', gap: '6px', flexShrink: 0 }}>
            {p.href && (
              <a href={p.href} target="_blank" rel="noopener noreferrer" className="btn-pill" style={{ padding: '4px 14px', fontSize: '0.75rem' }}>Live â†’</a>
            )}
            <a href={p.repo} target="_blank" rel="noopener noreferrer" className="btn-pill" style={{ padding: '4px 14px', fontSize: '0.75rem' }}>Code</a>
          </div>
        </div>
      )))}

      <div style={{ display: 'flex', justifyContent: 'center', paddingTop: '36px' }}>
        <Link href="/projects" className="btn-pill" style={{ textDecoration: 'none' }}>
          View All Projects â†’
        </Link>
      </div>
    </section>
  );
}


// â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
// CONTACT
// â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
function Contact() {
  return (
    <section id="contact" className="section-x section-y" style={{ maxWidth: '1400px', margin: '0 auto' }}>
      <div style={{ marginBottom: '32px' }}>
        <p className="code-comment" style={{ marginBottom: '6px' }}>// get in touch</p>
        <h2 className="text-headline gradient-text-cv">Let's Work Together</h2>
        <p style={{ color: 'var(--sectext)', opacity: 0.65, fontSize: '0.875rem', marginTop: '10px', maxWidth: '400px', lineHeight: 1.65 }}>
          Available for freelance work and new opportunities. Have a project in mind? Let's talk.
        </p>
      </div>
      <div className="scroll-reveal">
        <ContactForm />
      </div>
    </section>
  );
}


// â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
// FOOTER â€” imported from @/components/Footer
// â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•



// â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
// ROOT
// â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
export default function Home() {
  const [loaded, setLoaded] = useState(false);
  const heroAndWhatIDoRef = useRef(null);
  useGsapReveal();

  return (
    <>
      <AnimatePresence>
        {!loaded && <PageLoader key="loader" onDone={() => setLoaded(true)} />}
      </AnimatePresence>

      <main style={{ background: 'var(--background)', minHeight: '100vh', position: 'relative' }}>
        <NavigationBar />

        {/* Hero + What I Do section with Grid Background */}
        <div ref={heroAndWhatIDoRef} style={{ position: 'relative' }}>
          <GridBg containerRef={heroAndWhatIDoRef} />
          <div style={{ position: 'relative', zIndex: 10 }}>
            <HeroSection />
            <Divider />
            <WhatIDo />
          </div>
        </div>

        {/* Subsequent sections without background grid */}
        <div style={{ position: 'relative', zIndex: 10 }}>
          <Divider />
          <Skills />
          <Divider />
          <Projects />
          <Divider />
          <Contact />
          <Footer />
        </div>
      </main>
    </>
  );
}
