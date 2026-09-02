'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  IconBrandGithub,
  IconBrandLinkedin,
  IconBrandDribbble,
  IconBrandDiscord,
  IconBrandBehance,
  IconArrowRight,
} from '@tabler/icons-react';
import {
  FaReact, FaNodeJs, FaDocker, FaLinux, FaGit,
} from 'react-icons/fa';
import {
  SiNextdotjs, SiPython, SiTypescript, SiMongodb,
  SiPostgresql, SiTailwindcss, SiRedux,
  SiJavascript, SiFigma, SiNginx, SiKubernetes,
} from 'react-icons/si';

// ── Marquee ────────────────────────────────────────────────────────────────────
const STACK = [
  { icon: <SiNextdotjs />,    label: 'Next.js' },
  { icon: <SiTailwindcss />,  label: 'Tailwind CSS' },
  { icon: <SiJavascript />,   label: 'JavaScript' },
  { icon: <FaReact />,        label: 'React' },
  { icon: <FaNodeJs />,       label: 'Node.js' },
  { icon: <SiMongodb />,      label: 'MongoDB' },
  { icon: <SiPostgresql />,   label: 'PostgreSQL' },
  { icon: <FaDocker />,       label: 'Docker' },
  { icon: <SiPython />,       label: 'Python' },
  { icon: <SiTypescript />,   label: 'TypeScript' },
  { icon: <SiFigma />,        label: 'Figma' },
  { icon: <FaGit />,          label: 'Git' },
  { icon: <FaLinux />,        label: 'Linux' },
  { icon: <SiRedux />,        label: 'Redux' },
  { icon: <SiNginx />,        label: 'Nginx' },
  { icon: <SiKubernetes />,   label: 'Kubernetes' },
];

function Marquee() {
  const items = [...STACK, ...STACK];
  return (
    <div style={{ overflow: 'hidden', borderTop: '1px solid var(--bline)', borderBottom: '1px solid var(--bline)', padding: '14px 0', width: '100%', maxWidth: '100%' }}>
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

// ── Footer ─────────────────────────────────────────────────────────────────────
export default function Footer() {
  const pathname = usePathname();
  const isProjectsPage = pathname === '/projects';

  // Nav links: on /projects, home-anchor links go back to /
  const exploreLinks = [
    { label: 'Home',     href: isProjectsPage ? '/'          : '#home'    },
    { label: 'Projects', href: '/projects'                                 },
    { label: 'About Me', href: isProjectsPage ? '/#about'    : '#about'   },
    { label: 'Contact',  href: isProjectsPage ? '/#contact'  : '#contact' },
  ];

  return (
    <footer style={{ background: 'var(--background)', borderTop: '1px solid var(--bline)', overflowX: 'hidden', width: '100%', maxWidth: '100%' }}>

      <Marquee />

      {/* ── 4-column footer grid ── */}
      <div style={{ borderTop: '1px solid var(--bline)', overflowX: 'hidden' }}>
        <div className="section-x grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10" style={{
          paddingTop: '52px', paddingBottom: '52px',
          maxWidth: '1400px', margin: '0 auto',
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
              {exploreLinks.map(l => (
                <li key={l.label}>
                  <Link
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
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3 — Follow Me */}
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
                { label: 'LinkedIn', href: 'https://www.linkedin.com/in/ansh-sharma-44a379280/', bg: '#0A66C2', Icon: IconBrandLinkedin },
                { label: 'Behance',  href: '#', bg: '#1769FF', Icon: IconBrandBehance },
                { label: 'Dribbble', href: '#', bg: '#EA4C89', Icon: IconBrandDribbble },
                { label: 'Discord',  href: '#', bg: '#5865F2', Icon: IconBrandDiscord },
                { label: 'Github',   href: 'https://github.com/daredevil17052004', bg: '#333', Icon: IconBrandGithub },
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
              { label: 'Contact Me',   sub: 'Say Hello !',     href: isProjectsPage ? '/#contact'  : '#contact',  accent: 'var(--accentg)' },
              { label: 'Case Studies', sub: 'Explore Studies', href: '/projects',                                  accent: 'var(--accentg)' },
            ].map(item => (
              <Link
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
                <span style={{
                  width: '32px', height: '32px', borderRadius: '50%',
                  border: `1px solid rgba(255,255,255,0.15)`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: item.accent, flexShrink: 0,
                  transition: 'border-color 150ms ease',
                }}>
                  <IconArrowRight size={16} strokeWidth={2} />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* ── Giant clipped name ── */}
      <div style={{
        borderTop: '1px solid var(--bline)',
        overflow: 'hidden',
        height: '0.72em',
        fontSize: 'clamp(5rem, 18vw, 22rem)',
        lineHeight: 1,
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

        {/* Center orb */}
        <div style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', width: '48px', height: '16px' }}>
          <div style={{ position: 'absolute', width: '100%', height: '1px', background: 'rgba(255,255,255,0.15)' }} />
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
