'use client';

/*
  Projects — Apple Design §1, §3, §4, §7
  ────────────────────────────────────────
  §1  Action buttons give instant whileTap compression
  §3  Card hover uses spring (not CSS transition) — interruptible mid-hover
  §4  Springs everywhere: critically-damped default, slight bounce on flick release
  §7  Cards enter from below, exit back below (symmetric path)
*/

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const projects = [
  {
    name: 'Maintainer — Car Management App',
    description:
      'An app for managing car maintenance records, service history, and reminders. Features user authentication, service tracking, and analytics dashboard.',
    technologies: ['Next.js', 'Tailwind CSS', 'Node.js', 'Express.js', 'MongoDB'],
    repo: 'https://github.com/daredevil17052004/maintainer.git',
    live_demo: 'https://maintainer-next.netlify.app/',
    image: '/maintainer.png',
  },
  {
    name: 'AI Meeting Notes Bot',
    description: 'A bot that joins meetings, transcribes audio, and generates summarized notes using Whisper AI.',
    technologies: ['Python', 'Selenium', 'Whisper AI', 'Gemini API'],
    repo: 'https://github.com/Team-DSA/Notei.git',
    live_demo: 'https://main-ui-phi.vercel.app/',
    image: '/notei.png',
  },
  {
    name: 'InstruRentals',
    description:
      'An online platform for renting musical instruments with user authentication and payment integration via Razorpay.',
    technologies: ['React.js', 'MongoDB', 'Express.js', 'Node.js', 'Tailwind CSS', 'Redux', 'Razorpay'],
    repo: 'https://github.com/kalviumcommunity/S47_Ansh_Capstone_InstruRentals.git',
    live_demo: 'https://instrurentalss.netlify.app/',
    image: '/instrurentals.png',
  },
  {
    name: 'Eksodi — CI/CD Deployment Manager',
    description: 'A lightweight CI/CD deployment manager for Docker, Kubernetes, and cloud VMs.',
    technologies: ['Next.js', 'Tailwind CSS', 'Node.js', 'PostgreSQL', 'Redis', 'Docker', 'Kubernetes'],
    repo: 'https://github.com/Eksodi/Main',
    live_demo: null,
    image: '/eksodi.png',
  },
  {
    name: 'Library Management System',
    description: 'A full-stack system for managing book issuance and tracking returns, with a dashboard UI.',
    technologies: ['Next.js', 'Express.js', 'MySQL', 'Docker', 'Nginx', 'Tailwind CSS', 'AWS EC2'],
    repo: 'https://github.com/daredevil17052004/LibraryManagementSys.git',
    live_demo: null,
    image: '/lib.png',
  },
  {
    name: 'Personal Neovim Config',
    description: 'A personal Neovim configuration with plugins and themes for an enhanced coding experience.',
    technologies: ['Neovim', 'Lua', 'GitHub'],
    repo: 'https://github.com/daredevil17052004/nvim-dotfiles',
    live_demo: null,
    image: '/neovim.jpg',
  },
];

// Spring configs (§4)
const springDefault = { type: 'spring', bounce: 0,    duration: 0.4 };
const springSnappy  = { type: 'spring', bounce: 0,    duration: 0.25 };

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1 },
  },
};

const cardVariants = {
  // §7 — enters from below, exits back below (symmetric)
  hidden:   { opacity: 0, y: 40 },
  visible:  { opacity: 1, y: 0,  transition: springDefault },
};

function ProjectCard({ project, isMobile }) {
  return (
    <motion.article
      variants={cardVariants}
      className="relative group rounded-2xl overflow-hidden shadow-2xl bg-slate-900/50 border border-slate-700/50 h-80 sm:h-96 motion-ready"
      // §3 — spring hover is interruptible (Framer Motion re-targets from current value)
      whileHover={!isMobile ? { y: -6, scale: 1.015 } : undefined}
      transition={springDefault}
    >
      {/* Background image with spring-based blur/scale transition (§3, §4) */}
      <motion.div
        className="absolute inset-0 overflow-hidden"
        initial={false}
      >
        <motion.img
          src={project.image}
          alt={`Screenshot of ${project.name}`}
          className="w-full h-full object-cover"
          // §3 — filter transition uses spring so hover-out reversal is smooth
          variants={{
            rest:  { filter: isMobile ? 'blur(6px) brightness(0.45)' : 'blur(3px) brightness(0.75)', scale: 1 },
            hover: { filter: 'blur(9px) brightness(0.18)', scale: 1.04 },
          }}
          initial="rest"
          animate="rest"
          whileHover={!isMobile ? 'hover' : undefined}
          transition={springDefault}
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/95 via-slate-900/30 to-transparent" />
      </motion.div>

      {/* Content layer */}
      <div className="absolute inset-0 z-10 p-5 sm:p-6 flex flex-col justify-between text-white">
        {/* Top: name + description + tags */}
        <div className="space-y-2.5">
          <h3 className="text-lg sm:text-xl font-bold leading-snug tracking-[-0.01em] bg-gradient-to-r from-cyan-400 to-violet-400 bg-clip-text text-transparent">
            {project.name}
          </h3>

          <p className="text-sm sm:text-[0.9rem] text-gray-300 leading-relaxed line-clamp-3">
            {project.description}
          </p>

          {project.technologies?.length > 0 && (
            <div className="flex flex-wrap gap-1.5 pt-1">
              {project.technologies.slice(0, isMobile ? 3 : 5).map((tech) => (
                <span
                  key={tech}
                  className="bg-slate-800/80 backdrop-blur-sm text-cyan-300 text-[0.7rem] px-2.5 py-0.5 rounded-full border border-cyan-400/25 font-medium tracking-wide"
                >
                  {tech}
                </span>
              ))}
              {project.technologies.length > (isMobile ? 3 : 5) && (
                <span className="bg-slate-800/80 text-gray-400 text-[0.7rem] px-2.5 py-0.5 rounded-full border border-gray-600/30 font-medium">
                  +{project.technologies.length - (isMobile ? 3 : 5)}
                </span>
              )}
            </div>
          )}
        </div>

        {/* Bottom: action buttons — instant press feedback (§1) */}
        <div className="flex gap-2.5 mt-3">
          {project.live_demo && (
            <motion.a
              href={project.live_demo}
              target="_blank"
              rel="noopener noreferrer"
              id={`live-demo-${project.name.replace(/\s+/g, '-').toLowerCase()}`}
              className="
                flex items-center gap-1.5
                bg-cyan-500/15 hover:bg-cyan-500/25
                border border-cyan-400/30 hover:border-cyan-400/50
                px-3 py-2 rounded-lg
                text-xs text-cyan-300 hover:text-cyan-200 font-medium
                transition-colors duration-150
              "
              // §1 — instant compression on press, spring release (§4)
              whileTap={{ scale: 0.94 }}
              transition={springSnappy}
            >
              <img src="/live.png" alt="" className="w-3.5 h-3.5" aria-hidden="true" />
              Live Demo
            </motion.a>
          )}
          {!project.live_demo && (
            <span className="
              flex items-center gap-1.5
              bg-slate-700/40 border border-slate-600/30
              px-3 py-2 rounded-lg
              text-xs text-gray-500 font-medium
            ">
              Coming Soon
            </span>
          )}
          {project.repo && (
            <motion.a
              href={project.repo}
              target="_blank"
              rel="noopener noreferrer"
              id={`repo-${project.name.replace(/\s+/g, '-').toLowerCase()}`}
              className="
                flex items-center gap-1.5
                bg-violet-500/15 hover:bg-violet-500/25
                border border-violet-400/30 hover:border-violet-400/50
                px-3 py-2 rounded-lg
                text-xs text-violet-300 hover:text-violet-200 font-medium
                transition-colors duration-150
              "
              whileTap={{ scale: 0.94 }}
              transition={springSnappy}
            >
              <img src="/coding.png" alt="" className="w-3.5 h-3.5" aria-hidden="true" />
              Code
            </motion.a>
          )}
        </div>
      </div>
    </motion.article>
  );
}

const Projects = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768 || 'ontouchstart' in window);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  return (
    <motion.div
      className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5 sm:gap-6 lg:gap-8 px-4 md:px-0"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-60px' }}
    >
      {projects.map((project) => (
        <ProjectCard key={project.name} project={project} isMobile={isMobile} />
      ))}
    </motion.div>
  );
};

export default Projects;
