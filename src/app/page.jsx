'use client';

import React from 'react';
import { WobbleCard } from '@/components/ui/wobble-card';
import Projects from '@/components/Projects';
import { FaReact, FaCss3Alt, FaJsSquare, FaDocker, FaLinux, FaGithub, FaLinkedin, FaInstagram, FaCode, FaLaptopCode, FaPalette, FaServer } from "react-icons/fa";
import { SiRedux, SiNextdotjs, SiPython, SiTypescript, SiNodedotjs, SiMongodb, SiPostgresql, SiFigma } from "react-icons/si";
import { motion } from "framer-motion";
import ContactForm from '@/components/ContactForm';
import { StarsBackground } from '@/components/ui/stars-background';

// Mobile-friendly Hero Component
const MobileHeroSection = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden font-chakra">
      {/* Animated background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-950">
        <div className="absolute inset-0 bg-gradient-to-t from-cyan-900/20 via-transparent to-purple-900/20"></div>
      </div>

      {/* Floating elements for visual interest */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-1/4 left-1/4 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3]
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-purple-500/10 rounded-full blur-2xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.6, 0.3, 0.6]
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-teal-500/10 rounded-full blur-xl"
          animate={{
            rotate: 360,
            scale: [1, 1.1, 1]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      </div>

      {/* Main content */}
      <motion.div
        className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Main heading */}
        <motion.div variants={itemVariants}>
          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold text-white leading-tight mb-6">
            <span className="block">Hi, I'm</span>
            <span className="block bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent">
              Ansh Sharma
            </span>
          </h1>
        </motion.div>

        {/* Subtitle */}
        <motion.div variants={itemVariants}>
          <p className="text-xl sm:text-2xl lg:text-3xl text-gray-300 max-w-3xl mx-auto leading-relaxed mb-4">
            Student Developer & Creative Problem Solver
          </p>
        </motion.div>

        {/* Description */}
        <motion.div variants={itemVariants}>
          <p className="text-base sm:text-lg text-gray-400 max-w-2xl mx-auto leading-relaxed mb-8">
            Building innovative web applications with modern technologies.
            Passionate about creating user-friendly solutions that make a difference.
          </p>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12"
          variants={itemVariants}
        >
          <motion.a
            href="#contact"
            className="w-full sm:w-auto bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600 text-white px-8 py-4 rounded-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-xl"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Get In Touch
          </motion.a>
          <motion.a
            href="https://github.com/daredevil17052004"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto border border-gray-600 hover:border-cyan-500 text-white px-8 py-4 rounded-lg font-semibold transition-all duration-300 hover:bg-gray-800/50 backdrop-blur-sm"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            View My Work
          </motion.a>
        </motion.div>

        {/* Tech stack indicators */}
        <motion.div
          className="flex flex-wrap justify-center gap-3 sm:gap-4"
          variants={itemVariants}
        >
          {[
            { icon: <FaReact />, name: "React", color: "text-blue-400" },
            { icon: <SiNextdotjs />, name: "Next.js", color: "text-white" },
            { icon: <FaJsSquare />, name: "JavaScript", color: "text-yellow-400" },
            { icon: <SiPython />, name: "Python", color: "text-green-400" },
            { icon: <FaDocker />, name: "Docker", color: "text-blue-500" },
            { icon: <SiFigma />, name: "Figma", color: "text-pink-500" },
            { icon: <SiRedux />, name: "Redux", color: "text-purple-500" },
            { icon: <FaCss3Alt />, name: "TailwindCSS", color: "text-teal-300" },
            { icon: <FaLinux />, name: "Linux", color: "text-orange-400" }
          ].map((tech, index) => (
            <motion.div
              key={tech.name}
              className="flex items-center gap-2 bg-slate-800/50 backdrop-blur-sm px-3 sm:px-4 py-2 rounded-full border border-gray-700/50 hover:border-gray-600 transition-all duration-300"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1.2 + (index * 0.1) }}
              whileHover={{ scale: 1.05, y: -2 }}
            >
              <span className={`${tech.color} text-lg`}>{tech.icon}</span>
              <span className="text-gray-300 text-sm font-medium">{tech.name}</span>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      {/* <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 2 }}
      >
        <div className="flex flex-col items-center">
          <span className="text-gray-400 text-sm mb-2 font-medium">Scroll Down</span>
          <motion.div
            className="w-6 h-10 border-2 border-gray-400 rounded-full flex justify-center cursor-pointer hover:border-cyan-400 transition-colors"
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <motion.div
              className="w-1 h-3 bg-gradient-to-b from-cyan-400 to-purple-500 rounded-full mt-2"
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </motion.div>
        </div>
      </motion.div> */}
    </section>
  );
};

// About Section Component
const AboutSection = () => {
  return (
    <>
      <section className="w-full bg-slate-950 py-8 sm:py-12 ">
        <StarsBackground />
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 px-4 sm:px-6 max-w-8xl mx-auto">
          <WobbleCard
            containerClassName="col-span-1 lg:col-span-3 h-auto bg-gradient-to-br from-cyan-900 to-cyan-800 min-h-[300px] sm:min-h-[400px] lg:min-h-[300px]"
            className="bg-transparent font-chakra"
          >
            <div className="p-2 sm:p-2">
              <h2 className="text-left text-balance text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold tracking-[-0.015em] text-gray-900 mb-4">
                About Myself
              </h2>
              <p className="mt-4 max-w-full lg:max-w-[30rem] text-left text-lg sm:text-xl lg:text-2xl text-gray-100 leading-relaxed">
                I'm a student developer passionate about creating innovative solutions and learning new technologies.
                Every line of code is an opportunity to solve problems and make a positive impact.
              </p>
            </div>
          </WobbleCard>

          <WobbleCard containerClassName="col-span-1 h-auto min-h-[250px] sm:min-h-[300px] bg-gradient-to-br from-emerald-800 to-emerald-700 font-chakra">
            <div className="space-y-4 sm:space-y-6 p-4 sm:p-2">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900">Developer Motto</h2>
              <p className="text-base sm:text-lg lg:text-xl text-gray-200 leading-relaxed">
                "Code is not just what I do — it's how I think. Every bug is just a puzzle waiting to be solved."
              </p>
            </div>
          </WobbleCard>

          <WobbleCard containerClassName="col-span-1 lg:col-span-1 bg-gradient-to-br from-sky-800 to-sky-700 h-auto min-h-[300px] sm:min-h-[400px] lg:min-h-[400px] xl:min-h-[500px] font-chakra">
            <div className="p-2 sm:p-2 space-y-2">
              <h3 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-4">My Journey</h3>
              <p className="text-gray-200 text-base sm:text-lg lg:text-xl leading-relaxed">
                I'm a passionate student developer at Kalvium, building a strong foundation in web development and software engineering.
              </p>
              <p className="text-gray-200 text-base sm:text-lg lg:text-xl leading-relaxed">
                I focus on creating user-friendly applications with modern technologies like React, Next.js, and Node.js, while continuously improving my problem-solving and technical skills.
              </p>
            </div>
          </WobbleCard>

          {/* Skills Card - Mobile Responsive */}
          <WobbleCard containerClassName="col-span-1 lg:col-span-3 bg-gradient-to-br from-teal-800 to-teal-700 min-h-[500px] sm:min-h-[600px] font-chakra transition-all hover:scale-[1.01] duration-300 ease-in-out">
            <div className="flex flex-col items-start h-full p-4 sm:p-6">
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6">Technical Skills</h3>
              </motion.div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 sm:gap-x-8 gap-y-6 mt-4 w-full">
                {[
                  { name: "ReactJS", icon: <FaReact />, value: 85, color: "from-cyan-400 via-blue-500 to-purple-500" },
                  { name: "TailwindCSS", icon: <FaCss3Alt />, value: 80, color: "from-cyan-400 via-blue-500 to-purple-500" },
                  { name: "JavaScript", icon: <FaJsSquare />, value: 85, color: "from-cyan-400 via-blue-500 to-purple-500" },
                  { name: "Redux", icon: <SiRedux />, value: 70, color: "from-cyan-400 via-blue-500 to-purple-500" },
                  { name: "Docker", icon: <FaDocker />, value: 75, color: "from-cyan-400 via-blue-500 to-purple-500" },
                  { name: "NextJS", icon: <SiNextdotjs />, value: 80, color: "from-cyan-400 via-blue-500 to-purple-500" },
                  { name: "Python", icon: <SiPython />, value: 75, color: "from-cyan-400 via-blue-500 to-purple-500" },
                  { name: "Linux", icon: <FaLinux />, value: 70, color: "from-cyan-400 via-blue-500 to-purple-500" }
                ].map((skill, i) => (
                  <motion.div
                    key={i}
                    className="text-white w-full"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: i * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <div className="flex justify-between mb-2 text-sm sm:text-base font-medium">
                      <div className="flex items-center gap-3">
                        <span className="text-xl sm:text-2xl text-black">{skill.icon}</span>
                        <span className="text-sm sm:text-base font-semibold">{skill.name}</span>
                      </div>
                      <span className="text-xs sm:text-sm text-gray-300 font-medium">{skill.value}%</span>
                    </div>
                    <div className="w-full bg-slate-700 rounded-full h-2 sm:h-3 overflow-hidden">
                      <motion.div
                        className={`h-full bg-gradient-to-r ${skill.color} rounded-full`}
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.value}%` }}
                        transition={{ duration: 1.5, delay: i * 0.1 }}
                        viewport={{ once: true }}
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </WobbleCard>
        </div>
      </section>
    </>
  );
};

// Projects Section Component
const ProjectsSection = () => {
  return (
    <section className="w-full bg-slate-950 text-white font-chakra py-16 sm:py-20 lg:py-28">

      <div className="container mx-auto px-4 sm:px-6 max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12 sm:mb-16 lg:mb-20"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
            Featured Projects
          </h2>
          <p className="text-gray-400 text-center max-w-3xl mx-auto text-base sm:text-lg lg:text-xl leading-relaxed">
            A selection of my recent work spanning web applications, design systems, and open source contributions.
            Each project represents a unique challenge and learning opportunity.
          </p>
        </motion.div>

        <motion.div
          className="mb-12 sm:mb-16 lg:mb-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <Projects />
        </motion.div>

        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <a
            href="https://github.com/daredevil17052004?tab=repositories&q=&type=source&sort=stargazers"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex w-full sm:w-auto border-2 border-gray-600 hover:border-cyan-500 bg-slate-900/50 hover:bg-slate-800/50 backdrop-blur-sm px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-semibold items-center gap-3 justify-center transition-all duration-300 hover:scale-105 hover:shadow-lg"
          >
            <FaGithub className="text-xl" />
            View All Projects
          </a>
        </motion.div>
      </div>
    </section>
  );
};

// Skills Categories Section Component
const SkillsCategoriesSection = () => {
  const skillCategories = [
    {
      title: "Frontend Development",
      icon: <FaLaptopCode />,
      color: "bg-gradient-to-br from-cyan-600 to-blue-600",
      skills: [
        "React & Next.js",
        "TypeScript & JavaScript",
        "Tailwind CSS ",
        "Responsive Design",
        "State Management (Redux, Context)",
        "Component Libraries"
      ]
    },
    {
      title: "Backend Development",
      icon: <FaCode />,
      color: "bg-gradient-to-br from-purple-600 to-pink-600",
      skills: [
        "Node.js & Express",
        "RESTful APIs & GraphQL",
        "MongoDB & PostgreSQL",
        "Authentication & Security",
        "Microservices Architecture",
        "API Integration"
      ]
    },
    {
      title: "DevOps & Technical Mastery",
      icon: <FaServer />,
      color: "bg-gradient-to-br from-blue-700 to-slate-600",
      skills: [
        "Docker & Containerization",
        "CI/CD with GitHub Actions",
        "Environment Management & .env Handling",
        "JWT Auth & Role-Based Access",
        "Logging with Configurable Paths",
        "Linux & Shell Scripting (zsh, CLI Tools)"
      ]

    }
  ];

  return (
    <section className="w-full bg-slate-950 text-white font-chakra py-16 sm:py-20 lg:py-28">
      <div className="container mx-auto px-4 sm:px-6 max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12 sm:mb-16 lg:mb-20"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
            Expertise Areas
          </h2>
          <p className="text-gray-400 max-w-3xl mx-auto text-base sm:text-lg lg:text-xl leading-relaxed">
            My comprehensive skill set spans across multiple domains of modern web development
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-10">
          {skillCategories.map((category, index) => (
            <motion.div
              key={category.title}
              className="bg-slate-800 p-6 sm:p-8 rounded-2xl border border-slate-700 hover:border-slate-600 transition-all duration-300 hover:transform hover:scale-105 hover:shadow-2xl"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center gap-4 mb-6">
                <div className={`w-12 h-12 sm:w-14 sm:h-14 rounded-xl ${category.color} flex items-center justify-center text-white text-xl sm:text-2xl`}>
                  {category.icon}
                </div>
                <div>
                  <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-white">
                    {category.title}
                  </h3>
                  <div className="w-12 h-1 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full mt-2"></div>
                </div>
              </div>

              <ul className="space-y-3">
                {category.skills.map((skill, skillIndex) => (
                  <motion.li
                    key={skill}
                    className="flex items-center gap-3 text-gray-300 text-sm sm:text-base hover:text-white transition-colors"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: (index * 0.2) + (skillIndex * 0.1) }}
                    viewport={{ once: true }}
                  >
                    <div className="w-2 h-2 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full flex-shrink-0"></div>
                    {skill}
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Contact Section Component
const ContactSection = () => {
  const socialLinks = [
    {
      title: "Connect on Instagram",
      subtitle: "@heyy.ansh17",
      url: "https://www.instagram.com/heyy.ansh17/",
      icon: <FaInstagram />,
      color: "from-pink-500 to-purple-500"
    },
    {
      title: "Connect on LinkedIn",
      subtitle: "ansh-sharma-44a379280",
      url: "https://www.linkedin.com/in/ansh-sharma-44a379280/",
      icon: <FaLinkedin />,
      color: "from-blue-600 to-blue-500"
    }
  ];

  return (
    <section id='contact' className="w-full bg-slate-950 text-white font-chakra py-10 sm:py-20 lg:py-28">
      <div className="container mx-auto px-4 sm:px-6 max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto text-center mb-12 sm:mb-16"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
            Let's Work Together
          </h2>
          <p className="text-gray-300 text-base sm:text-lg lg:text-xl leading-relaxed max-w-3xl mx-auto">
            I'm currently available for freelance work and open to discussing new opportunities.
            Feel free to reach out if you have a project in mind or just want to connect!
            Let's build something amazing together.
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 mb-16 sm:mb-20 max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
        >
          {socialLinks.map((link, index) => (
            <motion.a
              key={link.title}
              href={link.url}
              className="bg-slate-900 p-6 sm:p-8 rounded-2xl flex items-center gap-4 hover:bg-slate-800 transition-all duration-300 z-20 border border-slate-800 hover:border-slate-700 hover:transform hover:scale-105 hover:shadow-xl group"
              target="_blank"
              rel="noopener noreferrer"
              title={link.title}
              initial={{ opacity: 0, x: index === 0 ? -30 : 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 + (index * 0.2) }}
              viewport={{ once: true }}
            >
              <div className={`w-12 h-12 sm:w-16 sm:h-16 rounded-xl bg-gradient-to-r ${link.color} flex items-center justify-center text-white text-xl sm:text-2xl group-hover:scale-110 transition-transform`}>
                {link.icon}
              </div>
              <div className="text-left">
                <h3 className="font-bold text-base sm:text-lg text-white group-hover:text-cyan-400 transition-colors">
                  {link.title}
                </h3>
                <p className="text-gray-400 text-sm sm:text-base break-all group-hover:text-gray-300 transition-colors">
                  {link.subtitle}
                </p>
              </div>
            </motion.a>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

// Contact Form Section Component
const ContactFormSection = () => {
  return (
    <section className='w-full flex flex-col items-center justify-center bg-slate-950 py-16 sm:py-20 px-4 sm:px-6'>
      <motion.div
        className="text-center mb-12 sm:mb-16"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <h2 className='text-3xl sm:text-4xl lg:text-5xl text-white font-chakra font-bold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent'>
          Contact Form
        </h2>
        <p className="text-gray-400 mt-4 max-w-2xl mx-auto text-base sm:text-lg leading-relaxed">
          Have a project in mind? Drop me a message and let's discuss how we can bring your ideas to life.
        </p>
      </motion.div>

      <motion.div
        className="w-full max-w-3xl"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        viewport={{ once: true }}
      >
        <ContactForm />
      </motion.div>
    </section>
  );
};


const Footer = () => {
  <div className="bg-slate-950 text-gray-400 py-8 sm:py-12 z-20">
    <div className="container mx-auto px-4 sm:px-6">
      <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
        <div className="text-center md:text-left">
          <p className="font-semibold text-lg sm:text-xl text-white font-chakra">Ansh Sharma</p>
          <p className='font-chakra text-sm sm:text-base'>© 2025. All rights reserved.</p>
        </div>

        <div className="flex gap-4 sm:gap-6">
          <a href="https://github.com/daredevil17052004" aria-label="GitHub" className="hover:text-white text-sm sm:text-base">
            GitHub
          </a>
          <a href="https://www.linkedin.com/in/ansh-sharma-44a379280/" aria-label="LinkedIn" className="hover:text-white text-sm sm:text-base">
            LinkedIn
          </a>
          <a href="https://www.instagram.com/heyy.ansh17/" aria-label="Instagram" className="hover:text-white text-sm sm:text-base">
            Instagram
          </a>
        </div>
      </div>
    </div>
  </div>

};

export default function Home() {
  return (
    <main className="bg-slate-950 relative overflow-hidden">
      <div className="absolute inset-0 z-0">
        <StarsBackground />
      </div>
      <MobileHeroSection />
      <AboutSection />
      <ProjectsSection />
      <SkillsCategoriesSection />
      <ContactSection />
      <ContactFormSection />
      <div className="bg-slate-950 text-gray-400 py-8 sm:py-12 z-20">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-center md:text-left">
              <p className="font-semibold text-lg sm:text-xl text-white font-chakra">Ansh Sharma</p>
              <p className='font-chakra text-sm sm:text-base'>© 2025. All rights reserved.</p>
            </div>

            <div className="flex gap-4 sm:gap-6">
              <a href="https://github.com/daredevil17052004" aria-label="GitHub" className="hover:text-white text-sm sm:text-base z-20"
                            target="_blank"
              rel="noopener noreferrer"
>
                GitHub
              </a>
              <a href="https://www.linkedin.com/in/ansh-sharma-44a379280/" aria-label="LinkedIn" className="hover:text-white text-sm sm:text-base z-20"
                            target="_blank"
              rel="noopener noreferrer"
>
                LinkedIn
              </a>
              <a href="https://www.instagram.com/heyy.ansh17/" aria-label="Instagram" className="hover:text-white text-sm sm:text-base z-20"
                            target="_blank"
              rel="noopener noreferrer"
>        
                Instagram
              </a>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};