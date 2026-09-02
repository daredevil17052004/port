'use client';

/**
 * page.jsx — Exact clone of thegr8binil.me layout with Ansh's details
 * Uses: Aceternity UI patterns (Spotlight, Gradient Text, Glow Border)
 *       React-bits patterns (Shiny Text, Marquee)
 *       Exact reference spacing (section-x / section-y)
 */

import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import NavigationBar from '@/components/NavigationBar';
import ContactForm from '@/components/ContactForm';
import { useGsapReveal } from '@/hooks/useGsapReveal';
import { useGithubProjects } from '@/hooks/useGithubProjects';
import {
  FaReact, FaNodeJs, FaDocker, FaLinux, FaGit,
} from 'react-icons/fa';
import {
  SiNextdotjs, SiPython, SiTypescript, SiMongodb,
  SiPostgresql, SiTailwindcss, SiRedux, SiExpress,
  SiJavascript, SiFigma, SiNginx, SiKubernetes,
} from 'react-icons/si';
import {
  IconBrandGithub,
  IconBrandLinkedin,
  IconBrandDribbble,
  IconBrandDiscord,
  IconBrandBehance,
  IconArrowRight,
  IconMail,
  IconTrendingUp,
  IconTools,
  IconRobot,
  IconRocket,
} from '@tabler/icons-react';
import { GlowingStarsCard } from '@/components/GlowingStarsCard';

// ── Letter reveal ─────────────────────────────────────────────────────────────
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

// ── Page Loader ───────────────────────────────────────────────────────────────
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

// ── Interactive grid background ───────────────────────────────────────────────
function GridBg() {
  const COLS = 22, ROWS = 16;
  return (
    <div className="fixed inset-0 z-0 pointer-events-auto overflow-hidden" aria-hidden="true" style={{ opacity: 0.5 }}>
      <div style={{
        display: 'grid',
        gridTemplateColumns: `repeat(${COLS}, 64px)`,
        gridTemplateRows: `repeat(${ROWS}, 64px)`,
        width: `${COLS * 64}px`,
        height: `${ROWS * 64}px`,
      }}>
        {Array.from({ length: COLS * ROWS }).map((_, i) => (
          <div key={i} className="grid-cell" />
        ))}
      </div>
    </div>
  );
}

// ── Marquee ───────────────────────────────────────────────────────────────────
const STACK = [
  { icon: <SiNextdotjs />, label: 'Next.js' },
  { icon: <SiTailwindcss />, label: 'Tailwind CSS' },
  { icon: <SiJavascript />, label: 'JavaScript' },
  { icon: <FaReact />, label: 'React' },
  { icon: <FaNodeJs />, label: 'Node.js' },
  { icon: <SiMongodb />, label: 'MongoDB' },
  { icon: <SiPostgresql />, label: 'PostgreSQL' },
  { icon: <FaDocker />, label: 'Docker' },
  { icon: <SiPython />, label: 'Python' },
  { icon: <SiTypescript />, label: 'TypeScript' },
  { icon: <SiFigma />, label: 'Figma' },
  { icon: <FaGit />, label: 'Git' },
  { icon: <FaLinux />, label: 'Linux' },
  { icon: <SiRedux />, label: 'Redux' },
  { icon: <SiNginx />, label: 'Nginx' },
  { icon: <SiKubernetes />, label: 'Kubernetes' },
];

function Marquee() {
  const items = [...STACK, ...STACK];
  return (
    <div style={{ overflow: 'hidden', borderTop: '1px solid var(--bline)', borderBottom: '1px solid var(--bline)', padding: '14px 0' }}>
      <div className="marquee-track">
        {items.map((item, i) => (
          <div
            key={i}
            style={{
              display: 'flex', alignItems: 'center', gap: '8px',
              padding: '0 20px', color: 'var(--sectext)',
              fontSize: '0.875rem', fontWeight: 500,
              whiteSpace: 'nowrap', flexShrink: 0,
              fontFamily: 'var(--font-hanken, system-ui)',
            }}
          >
            <span style={{ fontSize: '1.1rem', opacity: 0.65 }}>{item.icon}</span>
            {item.label}
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Divider ───────────────────────────────────────────────────────────────────
const Divider = () => <div style={{ borderTop: '1px solid var(--bline)' }} />;


// ════════════════════════════════════════════════════════════════════════════════
// HERO — exact layout of reference
// ════════════════════════════════════════════════════════════════════════════════
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
      // Stacked title lines — one by one
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

        {/* Giant stacked titles — GSAP line-by-line */}
        <div style={{ position: 'relative', lineHeight: 0.92, overflow: 'hidden' }}>

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
          <div data-hero="line" style={{ position: 'relative', marginBottom: '4px', opacity: 0 }}>
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
            maxWidth: '520px', margin: '28px auto 0',
            color: 'var(--primarytext)',
            fontFamily: 'var(--font-hanken, system-ui)',
            fontSize: 'clamp(0.9375rem, 1.5vw, 1.0625rem)',
            lineHeight: 1.55, letterSpacing: '-0.005em',
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
            gap: '6px', marginTop: '36px', flexWrap: 'wrap',
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
                width: '38px', height: '38px', borderRadius: '50%',
                border: '1px solid var(--bline)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: 'var(--sectext)', textDecoration: 'none',
                transition: 'color 150ms ease, border-color 150ms ease',
              }}
              onMouseEnter={e => { e.currentTarget.style.color = 'var(--accentb)'; e.currentTarget.style.borderColor = 'var(--accentb)'; }}
              onMouseLeave={e => { e.currentTarget.style.color = 'var(--sectext)'; e.currentTarget.style.borderColor = 'var(--bline)'; }}
            >
              <Icon size={17} strokeWidth={1.6} />
            </a>
          ))}
          {/* Let's Connect pill — exact reference */}
          <a
            href="#contact"
            style={{
              display: 'flex', alignItems: 'center', gap: '8px',
              padding: '8px 20px', borderRadius: '9999px',
              border: '1px solid var(--bline)',
              color: 'var(--primarytext)', fontSize: '0.8125rem',
              fontWeight: 600, textDecoration: 'none',
              fontFamily: 'var(--font-hanken, system-ui)', letterSpacing: '-0.005em',
              transition: 'border-color 150ms ease',
            }}
            onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--accentg)'}
            onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--bline)'}
          >
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--accentg)', animation: 'pulse 2s infinite', flexShrink: 0 }} />
            Let's Connect
          </a>
          <span style={{ color: 'var(--sectext)', opacity: 0.4, fontSize: '0.8125rem', fontFamily: 'var(--font-hanken, system-ui)' }}>
            ansharma.dev@gmail.com
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
    icon: <IconTrendingUp size={24} strokeWidth={2.5} />,
    color: '#9d95ff', // var(--bviolet)
    title: 'Product Management',
    desc: 'Driving product strategy, customer discovery, roadmap planning, prioritization, and cross-functional execution.'
  },
  {
    icon: <IconTools size={24} strokeWidth={2.5} />,
    color: 'var(--accentc)',
    title: 'UX & Product Design',
    desc: 'Creating user-centered experiences through research, interaction design, prototyping, and scalable design systems.'
  },
  {
    icon: <IconRobot size={24} strokeWidth={2.5} />,
    color: '#f4a6da', // soft pink
    title: 'AI & Automation',
    desc: 'Building AI-native experiences using LLMs, intelligent workflows, prompt engineering, and automation.'
  },
  {
    icon: <IconRocket size={24} strokeWidth={2.5} />,
    color: '#ff8709', // var(--accento)
    title: 'Technical Product',
    desc: 'Collaborating with engineering, leveraging modern technologies, and shipping products from Idea to launch.'
  },
];

function WhatIDo() {
  return (
    <section id="whatido" className="section-x section-y" style={{ maxWidth: '1400px', margin: '0 auto', paddingTop: '80px', paddingBottom: '80px' }}>
      
      {/* Header row: Centered title with absolute right button */}
      <div style={{
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: '64px',
      }}>
        <h2 style={{
          color: 'var(--accentv)',
          fontSize: '1.5rem',
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
              display: 'inline-flex', alignItems: 'center', gap: '8px',
              padding: '10px 24px', borderRadius: '9999px',
              border: '1px solid var(--bline)',
              color: 'var(--primarytext)', fontSize: '0.9375rem', fontWeight: 600,
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
            About Me <IconArrowRight size={16} strokeWidth={2} />
          </a>
        </div>
      </div>

      {/* 4-card grid with Aceternity-style GlowingStarsCard */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
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
      <div style={{ marginBottom: '32px' }}>
        <p className="code-comment" style={{ marginBottom: '6px' }}>// expertise</p>
        <h2 className="text-headline gradient-text-yc">Experience &amp; skills.</h2>
      </div>

      <div>
        {SKILLS.map((skill, i) => (
          <div
            key={skill.title}
            className="skill-row"
          >
            {/* Number + big title */}
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '12px' }}>
              <span className="code-comment">{skill.num}</span>
              <span
                className="text-skill-title shiny-text"
                style={{ color: skill.color }}
              >
                {skill.title}
              </span>
            </div>

            {/* Description */}
            <p style={{ color: 'var(--sectext)', opacity: 0.65, fontSize: '0.9rem', lineHeight: 1.65, paddingTop: '4px' }}>
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
            <p style={{ color: 'var(--primarytext)', fontSize: '0.9375rem', fontWeight: 600, letterSpacing: '-0.01em', marginBottom: '3px', fontFamily: 'var(--font-hanken, system-ui)' }}>
              {p.name}
            </p>
            <p style={{ color: 'var(--sectext)', opacity: 0.45, fontSize: '0.75rem' }}>
              {p.role}
            </p>
          </div>

          {/* Tech — hidden on mobile */}
          <p
            className="hidden md:block"
            style={{ flex: '1 1 140px', color: 'var(--sectext)', opacity: 0.38, fontSize: '0.75rem' }}
          >
            {Array.isArray(p.tech) ? p.tech.join(' · ') : p.tech}
          </p>

          {/* Metric — Aceternity gradient */}
          <span style={{ color: p.metricColor, fontSize: '1.125rem', fontWeight: 700, letterSpacing: '-0.02em', fontFamily: 'var(--font-hanken, system-ui)', flexShrink: 0 }}>
            {p.metric}
          </span>

          {/* Links */}
          <div style={{ display: 'flex', gap: '6px', flexShrink: 0 }}>
            {p.href && (
              <a href={p.href} target="_blank" rel="noopener noreferrer" className="btn-pill" style={{ padding: '4px 14px', fontSize: '0.75rem' }}>Live →</a>
            )}
            <a href={p.repo} target="_blank" rel="noopener noreferrer" className="btn-pill" style={{ padding: '4px 14px', fontSize: '0.75rem' }}>Code</a>
          </div>
        </div>
      )))}

      <div style={{ display: 'flex', justifyContent: 'center', paddingTop: '36px' }}>
        <Link href="/projects" className="btn-pill" style={{ textDecoration: 'none' }}>
          View All Projects →
        </Link>
      </div>
    </section>
  );
}


// ════════════════════════════════════════════════════════════════════════════════
// CONTACT
// ════════════════════════════════════════════════════════════════════════════════
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


// ════════════════════════════════════════════════════════════════════════════════
// FOOTER — exact reference layout
// ════════════════════════════════════════════════════════════════════════════════
function Footer() {
  return (
    <footer style={{ background: 'var(--background)', borderTop: '1px solid var(--bline)' }}>

      <Marquee />

      {/* ── 4-column footer grid ── */}
      <div style={{ borderTop: '1px solid var(--bline)' }}>
        <div className="section-x" style={{
          paddingTop: '52px', paddingBottom: '52px',
          maxWidth: '1400px', margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: '1.2fr 1fr 1.4fr 1.1fr',
          gap: '40px',
          alignItems: 'start',
        }}>

          {/* Col 1 — Tagline */}
          <div>
            <p style={{
              color: 'var(--primarytext)',
              fontSize: '1.45rem',
              fontWeight: 700,
              letterSpacing: '-0.02em',
              lineHeight: 1.3,
              fontFamily: 'var(--font-hanken, system-ui)',
              maxWidth: '220px',
            }}>
              Where <span style={{ color: 'var(--accentp)' }}>aesthetics</span> &amp;{' '}
              <span style={{ color: 'var(--accentc)' }}>functionality</span> meet
            </p>
          </div>

          {/* Col 2 — Explore */}
          <div>
            <p style={{
              fontSize: '0.8rem', fontWeight: 700, letterSpacing: '0.02em',
              color: 'var(--accento)', marginBottom: '18px',
              fontFamily: 'var(--font-hanken, system-ui)',
            }}>
              Explore
            </p>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {[
                { label: 'Home', href: '#home' },
                { label: 'Projects', href: '/projects' },
                { label: 'About Me', href: '#about' },
                { label: 'Contact', href: '#contact' },
              ].map(l => (
                <li key={l.label}>
                  <a
                    href={l.href}
                    style={{
                      color: 'var(--primarytext)', fontSize: '0.875rem',
                      fontWeight: 600, opacity: 0.9,
                      textDecoration: 'none', fontFamily: 'var(--font-hanken, system-ui)',
                      transition: 'opacity 150ms ease',
                    }}
                    onMouseEnter={e => { e.currentTarget.style.opacity = '1'; e.currentTarget.style.color = 'var(--accentv)'; }}
                    onMouseLeave={e => { e.currentTarget.style.opacity = '0.9'; e.currentTarget.style.color = 'var(--primarytext)'; }}
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3 — Follow Me (2-column sub-grid with icons) */}
          <div>
            <p style={{
              fontSize: '0.8rem', fontWeight: 700, letterSpacing: '0.02em',
              color: 'var(--accentc)', marginBottom: '18px',
              fontFamily: 'var(--font-hanken, system-ui)',
            }}>
              Follow Me
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px 24px' }}>
              {[
                { label: 'LinkedIn',  href: 'https://www.linkedin.com/in/ansh-sharma-44a379280/', bg: '#0A66C2', Icon: IconBrandLinkedin },
                { label: 'Behance',   href: '#', bg: '#1769FF', Icon: IconBrandBehance },
                { label: 'Dribbble',  href: '#', bg: '#EA4C89', Icon: IconBrandDribbble },
                { label: 'Discord',   href: '#', bg: '#5865F2', Icon: IconBrandDiscord },
                { label: 'Github',    href: 'https://github.com/daredevil17052004', bg: '#333', Icon: IconBrandGithub },
              ].map(s => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'flex', alignItems: 'center', gap: '8px',
                    textDecoration: 'none',
                    transition: 'opacity 150ms ease',
                  }}
                  onMouseEnter={e => { e.currentTarget.style.opacity = '0.75'; }}
                  onMouseLeave={e => { e.currentTarget.style.opacity = '1'; }}
                >
                  <span style={{
                    width: '24px', height: '24px', borderRadius: '50%',
                    background: s.bg,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: '#fff',
                    flexShrink: 0,
                  }}>
                    <s.Icon size={14} strokeWidth={2.5} />
                  </span>
                  <span style={{
                    color: 'var(--primarytext)', fontSize: '0.875rem',
                    fontWeight: 600, opacity: 0.9,
                    fontFamily: 'var(--font-hanken, system-ui)',
                  }}>
                    {s.label}
                  </span>
                </a>
              ))}
            </div>
          </div>

          {/* Col 4 — CTA boxes */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
            {[
              { label: 'Contact Me',    sub: 'Say Hello !',      href: '#contact',  accent: 'var(--accentg)' },
              { label: 'Case Studies',  sub: 'Explore Studies',  href: '/projects', accent: 'var(--accentg)' },
            ].map(item => (
              <a
                key={item.label}
                href={item.href}
                style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                  padding: '16px 4px',
                  borderBottom: '1px solid var(--bline)',
                  textDecoration: 'none',
                  transition: 'background 150ms ease',
                }}
                onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.03)'; }}
                onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; }}
              >
                <div>
                  <p style={{
                    color: 'var(--primarytext)', fontSize: '0.9375rem',
                    fontWeight: 700, letterSpacing: '-0.01em', marginBottom: '2px',
                    fontFamily: 'var(--font-hanken, system-ui)',
                  }}>
                    {item.label}
                  </p>
                  <p style={{
                    color: 'var(--sectext)', opacity: 0.45, fontSize: '0.75rem',
                    fontFamily: 'var(--font-hanken, system-ui)',
                  }}>
                    {item.sub}
                  </p>
                </div>
                {/* Arrow in circle */}
                <span style={{
                  width: '32px', height: '32px', borderRadius: '50%',
                  border: `1px solid rgba(255,255,255,0.15)`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: item.accent, flexShrink: 0,
                  transition: 'border-color 150ms ease',
                }}>
                  <IconArrowRight size={16} strokeWidth={2} />
                </span>
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* ── Giant clipped name ── */}
      <div style={{
        borderTop: '1px solid var(--bline)',
        overflow: 'hidden',
        /* Clip to ~72% of text height so letters are cut at the bottom */
        height: '0.72em',
        fontSize: 'clamp(5rem, 18vw, 22rem)',
        lineHeight: 1,
        /* Push down so the top portion (72%) is visible */
        display: 'flex',
        alignItems: 'flex-start',
      }}>
        <p style={{
          fontFamily: 'var(--font-hanken, system-ui)',
          fontSize: '1em',
          fontWeight: 900,
          letterSpacing: '-0.04em',
          color: 'var(--primarytext)',
          lineHeight: 1,
          whiteSpace: 'nowrap',
          width: '100%',
          textAlign: 'center',
          margin: 0,
          padding: '0 0.5rem',
          paddingTop: '0.05em',
        }}>
          anshsharma
        </p>
      </div>

      {/* ── Bottom bar ── */}
      <div style={{
        borderTop: '1px solid var(--bline)',
        padding: '12px 24px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        gap: '8px',
      }}>
        <p style={{
          color: 'var(--sectext)', opacity: 0.4, fontSize: '0.75rem',
          fontFamily: 'var(--font-hanken, system-ui)',
        }}>
          anshsharma ©2026 - Privacy Policy
        </p>

        {/* Center orb (toggle-style) */}
        <div style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', width: '48px', height: '16px' }}>
          {/* Horizontal line */}
          <div style={{ position: 'absolute', width: '100%', height: '1px', background: 'rgba(255,255,255,0.15)' }} />
          {/* Pill */}
          <div style={{
            width: '26px', height: '12px', borderRadius: '9999px',
            background: 'var(--bgcard)', border: '1px solid rgba(255,255,255,0.1)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            position: 'relative', zIndex: 1,
          }}>
            <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--bviolet)' }} />
          </div>
        </div>

        <p style={{
          color: 'var(--sectext)', opacity: 0.4, fontSize: '0.75rem',
          fontFamily: 'var(--font-hanken, system-ui)',
        }}>
          Bangalore, India
        </p>
      </div>
    </footer>
  );
}


// ════════════════════════════════════════════════════════════════════════════════
// ROOT
// ════════════════════════════════════════════════════════════════════════════════
export default function Home() {
  const [loaded, setLoaded] = useState(false);
  useGsapReveal();

  return (
    <>
      <AnimatePresence>
        {!loaded && <PageLoader key="loader" onDone={() => setLoaded(true)} />}
      </AnimatePresence>

      <main style={{ background: 'var(--background)', minHeight: '100vh', position: 'relative' }}>
        <GridBg />
        <div style={{ position: 'relative', zIndex: 10 }}>
          <NavigationBar />
          <HeroSection />
          <Divider />
          <WhatIDo />
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