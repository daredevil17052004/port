'use client';
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const Projects = () => {
  const projects = [
    {
      name: 'Maintainer - A Car Management App',
      description:
        'An app for managing car maintenance records, service history, and reminders. Features include user authentication, service tracking, and analytics dashboard.',
      technologies: ['Next.js', 'Tailwind CSS', 'Node.js', 'Express.js', 'MongoDB'],
      repo: 'https://github.com/daredevil17052004/maintainer.git',
      live_demo: 'https://maintainer-next.netlify.app/',
      image: '/maintainer.png',
    },
    {
      name: 'AI Meeting Notes Bot',
      description: 'A bot that joins meetings, transcribes audio, and generates summarized notes.',
      technologies: ['Python', 'Selenium', 'Whisper AI', 'Gemini API'],
      repo: 'https://github.com/Team-DSA/Notei.git',
      live_demo: 'https://main-ui-phi.vercel.app/',
      image: '/notei.png',
    },
    {
      name: 'InstruRentals',
      description:
        'An online platform for renting musical instruments with user authentication and payment integration.',
      technologies: ['React.js', 'MongoDB', 'Express.js', 'Node.js', 'Tailwind CSS', 'Redux', 'Razorpay'],
      repo: 'https://github.com/kalviumcommunity/S47_Ansh_Capstone_InstruRentals.git',
      live_demo: 'https://instrurentalss.netlify.app/',
      image: '/instrurentals.png',
    },
    {
      name: 'Eksodi - CI/CD Deployment Manager',
      description: 'A lightweight CI/CD deployment manager for Docker, Kubernetes, and cloud VMs.',
      technologies: ['Next.js', 'Tailwind CSS', 'Node.js', 'PostgreSQL', 'Redis', 'Docker', 'Kubernetes', 'GitHub Actions', 'Prometheus', 'Grafana'],
      repo: 'https://github.com/Eksodi/Main',
      live_demo: '/',
      image: '/eksodi.png',
    },
    {
      name: 'Library Management System',
      description: 'A full-stack system for managing book issuance and tracking returns, with a dashboard UI.',
      technologies: ['Next.js', 'Express.js', 'MySQL', 'Docker', 'Nginx', 'Tailwind CSS', 'AWS EC2', 'Github Actions'],
      repo: 'https://github.com/daredevil17052004/LibraryManagementSys.git',
      live_demo: '/',
      image: '/lib.png',
    },
    {
      name: 'Personal Neovim',
      description: 'A personal Neovim configuration with plugins and themes for enhanced coding experience.',
      technologies: ['Neovim', 'Lua', 'GitHub'],
      repo: 'https://github.com/daredevil17052004/nvim-dotfiles',
      live_demo: '',
      image: '/neovim.jpg',
    },
  ];

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768 || 'ontouchstart' in window);
    };
    checkIsMobile();
    window.addEventListener('resize', checkIsMobile);
    return () => window.removeEventListener('resize', checkIsMobile);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.div
      className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 px-4 md:px-0"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      {projects.map((project, index) => (
        <motion.div
          key={index}
          variants={cardVariants}
          className="relative group rounded-2xl overflow-hidden shadow-2xl bg-slate-900/40 backdrop-blur-sm border border-slate-700/50 hover:border-cyan-400/50 transition-all duration-500 h-80 sm:h-96 lg:h-80 xl:h-96"
          initial="rest"
          animate="rest"
          whileHover={!isMobile ? 'hover' : undefined}
        >
          <motion.div
            className="absolute inset-0 overflow-hidden"
            variants={{
              rest: { scale: 1 },
              hover: { scale: 1.05 },
            }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          >
            <motion.img
              src={project.image}
              alt={project.name}
              className="w-full h-full object-cover"
              variants={{
                rest: {
                  filter: isMobile ? 'blur(8px) brightness(0.5)' : 'blur(4px) brightness(0.8)',
                },
                hover: {
                  filter: isMobile ? 'blur(8px) brightness(0.5)' : 'blur(8px) brightness(0.2)',
                },
              }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
            />
            <motion.div
              className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/20 to-transparent"
              variants={{
                rest: { opacity: isMobile ? 1 : 0.6 },
                hover: { opacity: 0.9 },
              }}
              transition={{ duration: 0.4 }}
            />
          </motion.div>

          <motion.div
            className="absolute inset-0 z-10 p-4 sm:p-6 flex flex-col justify-between text-white"
            variants={{
              rest: { opacity: isMobile ? 1 : 0.8, y: isMobile ? 0 : 10 },
              hover: { opacity: 1, y: 0 },
            }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
          >
            <div className="space-y-3">
              <motion.h3
                className="text-lg sm:text-xl lg:text-2xl font-bold text-transparent bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text leading-tight"
                variants={{
                  rest: { scale: 1 },
                  hover: { scale: 1.02 },
                }}
              >
                {project.name}
              </motion.h3>

              <motion.p
                className="text-sm sm:text-base text-gray-200 leading-relaxed line-clamp-3"
                variants={{
                  rest: { opacity: isMobile ? 1 : 0.8 },
                  hover: { opacity: 1 },
                }}
              >
                {project.description}
              </motion.p>

              {project.technologies && project.technologies.length > 0 && (
                <motion.div
                  className="flex flex-wrap gap-1.5 sm:gap-2 mt-3"
                  variants={{
                    rest: { opacity: isMobile ? 1 : 0.7 },
                    hover: { opacity: 1 },
                  }}
                >
                  {project.technologies
                    .slice(0, isMobile ? 4 : 6)
                    .map((tech, i) => (
                      <span
                        key={i}
                        className="bg-slate-800/80 backdrop-blur-sm text-cyan-300 text-xs px-2.5 py-1 rounded-full border border-cyan-400/30 font-medium"
                      >
                        {tech}
                      </span>
                    ))}
                  {project.technologies.length > (isMobile ? 4 : 6) && (
                    <span className="bg-slate-800/80 backdrop-blur-sm text-gray-400 text-xs px-2.5 py-1 rounded-full border border-gray-500/30 font-medium">
                      +{project.technologies.length - (isMobile ? 4 : 6)}
                    </span>
                  )}
                </motion.div>
              )}
            </div>

            <motion.div
              className="mt-4 space-y-3"
              variants={{
                rest: { opacity: isMobile ? 1 : 0.8, y: isMobile ? 0 : 10 },
                hover: { opacity: 1, y: 0 },
              }}
            >
              <div className="text-xs sm:text-sm text-gray-300 font-medium">Explore this project:</div>
              <div className="flex flex-wrap gap-2 sm:gap-3">
                {project.live_demo && (
                  <motion.a
                    href={project.live_demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 hover:from-cyan-500/30 hover:to-blue-500/30 backdrop-blur-sm border border-cyan-400/30 hover:border-cyan-400/50 px-3 py-2 rounded-lg text-xs sm:text-sm text-cyan-300 hover:text-cyan-200 font-medium transition-all duration-300 hover:scale-105"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <img src="/live.png" alt="Live Demo" className="w-4 h-4" />
                    <span>{project.live_demo === '/' ? 'Coming Soon' : 'Live Demo'}</span>
                  </motion.a>
                )}
                {project.repo && (
                  <motion.a
                    href={project.repo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 bg-gradient-to-r from-purple-500/20 to-pink-500/20 hover:from-purple-500/30 hover:to-pink-500/30 backdrop-blur-sm border border-purple-400/30 hover:border-purple-400/50 px-3 py-2 rounded-lg text-xs sm:text-sm text-purple-300 hover:text-purple-200 font-medium transition-all duration-300 hover:scale-105"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <img src="/coding.png" alt="Code Repo" className="w-4 h-4" />
                    <span>Code</span>
                  </motion.a>
                )}
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      ))}
    </motion.div>
  );
};

export default Projects;
