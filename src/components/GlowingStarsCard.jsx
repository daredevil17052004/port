'use client';

import React, { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';

export const GlowingStarsCard = ({ title, description, icon, iconColor }) => {
  const [glowingStars, setGlowingStars] = useState([]);
  
  // A 10x6 grid of dots
  const columns = 14;
  const rows = 7;
  const totalStars = columns * rows;

  useEffect(() => {
    // Randomly select 8-12 stars to glow at any given time
    const interval = setInterval(() => {
      const newGlowing = [];
      const numGlowing = Math.floor(Math.random() * 5) + 8;
      for (let i = 0; i < numGlowing; i++) {
        newGlowing.push(Math.floor(Math.random() * totalStars));
      }
      setGlowingStars(newGlowing);
    }, 2000); // change glowing stars every 2 seconds

    return () => clearInterval(interval);
  }, [totalStars]);

  return (
    <div
      className="group"
      style={{
        background: 'rgba(25, 25, 23, 0.6)',
        border: '1px solid var(--bline)',
        borderRadius: '16px',
        overflow: 'hidden',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        minHeight: '380px',
        transition: 'border-color 300ms ease, box-shadow 300ms ease',
      }}
      onMouseEnter={e => {
        e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.15)';
        e.currentTarget.style.boxShadow = '0 8px 32px rgba(0,0,0,0.4)';
      }}
      onMouseLeave={e => {
        e.currentTarget.style.borderColor = 'var(--bline)';
        e.currentTarget.style.boxShadow = 'none';
      }}
    >
      {/* ── Dot Grid Area (Top Half) ── */}
      <div style={{
        padding: '32px',
        paddingBottom: '24px',
        display: 'grid',
        gridTemplateColumns: `repeat(${columns}, 1fr)`,
        gridTemplateRows: `repeat(${rows}, 1fr)`,
        gap: '12px',
        width: '100%',
        flex: 1,
        maskImage: 'linear-gradient(to bottom, white 20%, transparent 100%)',
        WebkitMaskImage: 'linear-gradient(to bottom, white 20%, transparent 100%)',
      }}>
        {Array.from({ length: totalStars }).map((_, i) => {
          const isGlowing = glowingStars.includes(i);
          return (
            <div key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <motion.div
                initial={false}
                animate={{
                  opacity: isGlowing ? 1 : 0.15,
                  scale: isGlowing ? 1.5 : 1,
                  boxShadow: isGlowing ? '0 0 8px 2px var(--accentv)' : 'none',
                }}
                transition={{ duration: 1.5, ease: 'easeInOut' }}
                style={{
                  width: '3px',
                  height: '3px',
                  borderRadius: '50%',
                  background: isGlowing ? '#fff' : 'var(--accentv)',
                }}
              />
            </div>
          );
        })}
      </div>

      {/* ── Content Area (Bottom Half) ── */}
      <div style={{ padding: '0 32px 32px 32px', position: 'relative', zIndex: 10 }}>
        {/* Icon */}
        <div style={{ marginBottom: '16px', color: iconColor }}>
          {icon}
        </div>
        
        {/* Title */}
        <h3 style={{
          color: iconColor, // The reference colors the title with the icon color
          fontSize: '0.9375rem',
          fontWeight: 600,
          letterSpacing: '-0.01em',
          marginBottom: '8px',
          fontFamily: 'var(--font-hanken, system-ui)',
        }}>
          {title}
        </h3>
        
        {/* Description */}
        <p style={{
          color: 'var(--sectext)',
          opacity: 0.75,
          fontSize: '0.8125rem',
          lineHeight: 1.55,
          fontFamily: 'var(--font-hanken, system-ui)',
          letterSpacing: '-0.01em',
        }}>
          {description}
        </p>
      </div>
    </div>
  );
};
