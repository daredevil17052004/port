'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const spring = { type: 'spring', bounce: 0, duration: 0.35 };

export default function ContactForm() {
  const [loading, setLoading] = useState(false);
  const [status,  setStatus]  = useState(null);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus(null);

    const data = {
      name:    e.target.name.value,
      email:   e.target.email.value,
      message: e.target.message.value,
    };

    try {
      const res = await fetch('https://portfolio-backend-fjiu.onrender.com/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (res.ok) {
        setStatus('success');
        setMessage("Message sent! I'll get back to you soon.");
        e.target.reset();
      } else {
        const err = await res.json();
        setStatus('error');
        setMessage(err.message || 'Something went wrong. Please try again.');
      }
    } catch {
      setStatus('error');
      setMessage('Could not reach the server. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const base = {
    width: '100%',
    padding: '0.875rem 1.125rem',
    background: 'rgba(255,255,227,0.03)',
    border: '1px solid var(--bline)',
    borderRadius: '0.5rem',
    color: 'var(--primarytext)',
    fontSize: '0.9rem',
    letterSpacing: '-0.005em',
    fontFamily: 'var(--font-hanken, system-ui)',
    outline: 'none',
    transition: 'border-color 150ms ease',
    caretColor: 'var(--accentc)',
  };

  const focus = (e) => { e.target.style.borderColor = 'var(--accentc)'; };
  const blur  = (e) => { e.target.style.borderColor = 'var(--bline)'; };

  return (
    <div className="w-full max-w-xl">
      <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '1rem' }}>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
          <input
            id="contact-name"
            name="name"
            type="text"
            placeholder="Your Name"
            required
            style={base}
            onFocus={focus}
            onBlur={blur}
          />
          <input
            id="contact-email"
            name="email"
            type="email"
            placeholder="Email Address"
            required
            style={base}
            onFocus={focus}
            onBlur={blur}
          />
        </div>

        <textarea
          id="contact-message"
          name="message"
          placeholder="Tell me about your project..."
          rows={5}
          required
          style={{ ...base, resize: 'none' }}
          onFocus={focus}
          onBlur={blur}
        />

        <motion.button
          id="contact-submit"
          type="submit"
          disabled={loading}
          style={{
            padding: '0.875rem 2rem',
            borderRadius: '9999px',
            border: '1px solid var(--bline)',
            background: 'transparent',
            color: 'var(--sectext)',
            fontSize: '0.875rem',
            fontWeight: 600,
            letterSpacing: '-0.005em',
            cursor: loading ? 'not-allowed' : 'pointer',
            opacity: loading ? 0.5 : 1,
            fontFamily: 'var(--font-hanken, system-ui)',
            width: 'fit-content',
            transition: 'all 150ms ease',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
          }}
          whileTap={!loading ? { scale: 0.97 } : undefined}
          transition={{ type: 'spring', bounce: 0, duration: 0.2 }}
          onMouseEnter={(e) => {
            if (!loading) {
              e.currentTarget.style.borderColor = 'var(--accentc)';
              e.currentTarget.style.color = 'var(--accentc)';
              e.currentTarget.style.transform = 'translateX(4px)';
            }
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = 'var(--bline)';
            e.currentTarget.style.color = 'var(--sectext)';
            e.currentTarget.style.transform = 'translateX(0)';
          }}
        >
          {loading ? 'Sending...' : 'Send Message →'}
        </motion.button>

        <AnimatePresence>
          {status && (
            <motion.p
              role={status === 'error' ? 'alert' : 'status'}
              aria-live="polite"
              style={{
                fontSize: '0.8125rem',
                color: status === 'success' ? 'var(--accentc)' : '#f87171',
                letterSpacing: '0',
                fontFamily: 'var(--font-hanken, system-ui)',
              }}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={spring}
            >
              {status === 'success' ? '✓ ' : '✕ '}{message}
            </motion.p>
          )}
        </AnimatePresence>
      </form>
    </div>
  );
}
