// // 'use client';
// // import { useEffect, useState } from 'react';
// // import { motion } from 'framer-motion';
// // import React from 'react';

// // const Projects = () => {
// //     const [projects, setProjects] = useState([]);

// //     useEffect(() => {
// //         fetch("/projects.json")
// //             .then((response) => response.json())
// //             .then((data) => setProjects(data))
// //             .catch((error) => {
// //                 console.error("Error fetching projects:", error);
// //             });
// //     }, []);

// //     return (
// //         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-4 md:px-0">
// //             {projects.map((project, index) => (
// //                 <motion.div
// //                     key={index}
// //                     className="relative group h-80 rounded-xl overflow-hidden shadow-xl"
// //                     whileHover="hover"
// //                     initial="rest"
// //                     animate="rest"
// //                 >
// //                     {/* Background Image with blur on hover */}
// //                     {project.image && (
// //                         <motion.img
// //                             src={project.image}
// //                             alt={project.name}
// //                             className="absolute inset-0 w-full h-full object-cover transition-all duration-500"
// //                             variants={{
// //                                 rest: { scale: 1, filter: 'blur(0px)', opacity: 1 },
// //                                 hover: { scale: 1.05, filter: 'blur(4px)', opacity: 0.7 }
// //                             }}
// //                             transition={{ duration: 0.4 }}
// //                         />
// //                     )}

// //                     {/* Overlay content (hidden initially, shown on hover) */}
// //                     <motion.div
// //                         className="absolute inset-0 z-10 p-4 flex flex-col justify-between text-white bg-black/50"
// //                         variants={{
// //                             rest: { opacity: 0, y: 20 },
// //                             hover: { opacity: 1, y: 0 }
// //                         }}
// //                         transition={{ duration: 0.4, ease: 'easeOut' }}
// //                     >
// //                         <div>
// //                             <h3 className="text-2xl font-semibold text-cyan-400 mb-2">
// //                                 {project.name}
// //                             </h3>
// //                             <p className="text-md">{project.description}</p>

// //                             {project.technologies?.length > 0 && (
// //                                 <div className="mt-3 flex flex-wrap gap-2">
// //                                     {project.technologies.map((tech, i) => (
// //                                         <span
// //                                             key={i}
// //                                             className="bg-black/50 text-gray-100 text-xs px-2 py-1 rounded-xl border border-gray-500"
// //                                         >
// //                                             {tech}
// //                                         </span>
// //                                     ))}
// //                                 </div>
// //                             )}
// //                         </div>

// //                         <div className="mt-4 flex gap-4 items-center">
// //                             <div>
// //                                 <p>Access these sites here :</p>
// //                             </div>
// //                             {project.live_demo && (
// //                                 <a
// //                                     href={project.live_demo}
// //                                     target="_blank"
// //                                     rel="noopener noreferrer"
// //                                     title='Live Demo'
// //                                 >
// //                                     <img src="/live.png" alt="Live Demo" className="w-8 h-8" />
// //                                 </a>
// //                             )}
// //                             {project.repo && (
// //                                 <a
// //                                     href={project.repo}
// //                                     target="_blank"
// //                                     rel="noopener noreferrer"
// //                                     title='Repo'
// //                                 >
// //                                     <img src="/coding.png" alt="Repo" className="w-8 h-8" />
// //                                 </a>
// //                             )}
// //                         </div>
// //                     </motion.div>
// //                 </motion.div>
// //             ))}
// //         </div>
// //     );
// // };

// // export default Projects;


// 'use client';
// import { useEffect, useState } from 'react';
// import { motion } from 'framer-motion';
// import React from 'react';

// const Projects = () => {
//     const [projects, setProjects] = useState([]);
//     const [isMobile, setIsMobile] = useState(false);

//     useEffect(() => {
//         fetch("/projects.json")
//             .then((response) => response.json())
//             .then((data) => setProjects(data))
//             .catch((error) => {
//                 console.error("Error fetching projects:", error);
//             });

//         // Check if device is mobile/touch device
//         const checkIsMobile = () => {
//             setIsMobile(window.innerWidth < 768 || 'ontouchstart' in window);
//         };

//         checkIsMobile();
//         window.addEventListener('resize', checkIsMobile);

//         return () => window.removeEventListener('resize', checkIsMobile);
//     }, []);

//     return (
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-4 md:px-0">
//             {projects.map((project, index) => (
//                 <motion.div
//                     key={index}
//                     className="relative group h-80 rounded-xl overflow-hidden shadow-xl"
//                     whileHover={!isMobile ? "hover" : undefined}
//                     initial="rest"
//                     animate="rest"
//                 >
//                     {/* Background Image */}
//                     {project.image && (
//                         <motion.img
//                             src={project.image}
//                             alt={project.name}
//                             className="absolute inset-0 w-full h-full object-cover transition-all duration-500"
//                             variants={{
//                                 rest: { 
//                                     scale: 1, 
//                                     filter: isMobile ? 'blur(2px)' : 'blur(0px)', 
//                                     opacity: isMobile ? 0.6 : 1 
//                                 },
//                                 hover: { scale: 1.05, filter: 'blur(4px)', opacity: 0.7 }
//                             }}
//                             transition={{ duration: 0.4 }}
//                         />
//                     )}

//                     {/* Overlay content */}
//                     <motion.div
//                         className="absolute inset-0 z-10 p-4 flex flex-col justify-between text-white bg-black/50"
//                         variants={{
//                             rest: { 
//                                 opacity: isMobile ? 1 : 0, 
//                                 y: isMobile ? 0 : 20 
//                             },
//                             hover: { opacity: 1, y: 0 }
//                         }}
//                         transition={{ duration: 0.4, ease: 'easeOut' }}
//                     >
//                         <div>
//                             <h3 className="text-xl sm:text-2xl font-semibold text-cyan-400 mb-2">
//                                 {project.name}
//                             </h3>
//                             <p className="text-sm sm:text-md text-gray-100 leading-relaxed">
//                                 {project.description}
//                             </p>

//                             {project.technologies?.length > 0 && (
//                                 <div className="mt-3 flex flex-wrap gap-2">
//                                     {project.technologies.map((tech, i) => (
//                                         <span
//                                             key={i}
//                                             className="bg-black/60 text-gray-100 text-xs px-2 py-1 rounded-xl border border-gray-400"
//                                         >
//                                             {tech}
//                                         </span>
//                                     ))}
//                                 </div>
//                             )}
//                         </div>

//                         <div className="mt-4 flex flex-col sm:flex-row gap-2 sm:gap-4 items-start sm:items-center">
//                             <div className="mb-2 sm:mb-0">
//                                 <p className="text-sm text-gray-200">Access these sites here:</p>
//                             </div>
//                             <div className="flex gap-3">
//                                 {project.live_demo && (
//                                     <a
//                                         href={project.live_demo}
//                                         target="_blank"
//                                         rel="noopener noreferrer"
//                                         title='Live Demo'
//                                         className="flex items-center gap-2  px-3 py-2 rounded-lg text-xs font-medium transition-colors"
//                                     >
//                                         <img src="/live.png" alt="Live Demo" className="w-4 h-4" />
//                                         <span>Live</span>
//                                     </a>
//                                 )}
//                                 {project.repo && (
//                                     <a
//                                         href={project.repo}
//                                         target="_blank"
//                                         rel="noopener noreferrer"
//                                         title='Repository'
//                                         className="flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-medium transition-colors"
//                                     >
//                                         <img src="/coding.png" alt="Repository" className="w-4 h-4" />
//                                         <span>Code</span>
//                                     </a>
//                                 )}
//                             </div>
//                         </div>
//                     </motion.div>
//                 </motion.div>
//             ))}
//         </div>
//     );
// };

// export default Projects;


// 'use client';
// import { useEffect, useState } from 'react';
// import { motion } from 'framer-motion';
// import React from 'react';

// const Projects = () => {
//     const [projects, setProjects] = useState([]);
//     const [isMobile, setIsMobile] = useState(false);

//     useEffect(() => {
//         fetch("/projects.json")
//             .then((response) => response.json())
//             .then((data) => setProjects(data))
//             .catch((error) => {
//                 console.error("Error fetching projects:", error);
//             });

//         // Check if device is mobile/touch device
//         const checkIsMobile = () => {
//             setIsMobile(window.innerWidth < 768 || 'ontouchstart' in window);
//         };

//         checkIsMobile();
//         window.addEventListener('resize', checkIsMobile);

//         return () => window.removeEventListener('resize', checkIsMobile);
//     }, []);

//     const containerVariants = {
//         hidden: { opacity: 0 },
//         visible: {
//             opacity: 1,
//             transition: {
//                 staggerChildren: 0.2
//             }
//         }
//     };

//     const cardVariants = {
//         hidden: { opacity: 0, y: 30 },
//         visible: { opacity: 1, y: 0 }
//     };

//     return (
//         <motion.div
//             className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 px-4 md:px-0"
//             variants={containerVariants}
//             initial="hidden"
//             whileInView="visible"
//             viewport={{ once: true }}
//         >
//             {projects.map((project, index) => (
//                 <motion.div
//                     key={index}
//                     variants={cardVariants}
//                     className="relative group rounded-2xl overflow-hidden shadow-2xl bg-slate-900/40 backdrop-blur-sm border border-slate-700/50 hover:border-cyan-400/50 transition-all duration-500 h-80 sm:h-96 lg:h-80 xl:h-96"
//                     whileHover={!isMobile ? "hover" : undefined}
//                     initial="rest"
//                     animate="rest"
//                 >
//                     {/* Background Image */}
//                     {project.image && (
//                         <motion.div
//                             className="absolute inset-0 overflow-hidden"
//                             variants={{
//                                 rest: { scale: 1 },
//                                 hover: { scale: 1.05 }
//                             }}
//                             transition={{ duration: 0.6, ease: "easeOut" }}
//                         >
//                             <motion.img
//                                 src={project.image}
//                                 alt={project.name}
//                                 className="w-full h-full object-cover"
//                                 variants={{
//                                     rest: {
//                                         filter: isMobile ? 'blur(2px) brightness(0.4)' : 'blur(3px) brightness(0.6)',
//                                     },
//                                     hover: {
//                                         filter: 'blur(0px) brightness(0.8)',
//                                     }
//                                 }}
//                                 transition={{ duration: 0.5, ease: "easeOut" }}
//                             />
//                             <motion.div
//                                 className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/20 to-transparent"
//                                 variants={{
//                                     rest: { opacity: isMobile ? 1 : 0.6 },
//                                     hover: { opacity: 0.9 }
//                                 }}
//                                 transition={{ duration: 0.4 }}
//                             />
//                         </motion.div>
//                     )}

//                     {/* Content Overlay */}
//                     <motion.div
//                         className="absolute inset-0 z-10 p-4 sm:p-6 flex flex-col justify-between text-white"
//                         variants={{
//                             rest: {
//                                 opacity: isMobile ? 1 : 0.8,
//                                 y: isMobile ? 0 : 10
//                             },
//                             hover: { opacity: 1, y: 0 }
//                         }}
//                         transition={{ duration: 0.4, ease: 'easeOut' }}
//                     >
//                         {/* Header Content */}
//                         <div className="space-y-3">
//                             <motion.h3
//                                 className="text-lg sm:text-xl lg:text-2xl font-bold text-transparent bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text leading-tight"
//                                 variants={{
//                                     rest: { scale: 1 },
//                                     hover: { scale: 1.02 }
//                                 }}
//                             >
//                                 {project.name}
//                             </motion.h3>

//                             <motion.p
//                                 className="text-sm sm:text-base text-gray-200 leading-relaxed line-clamp-3"
//                                 variants={{
//                                     rest: { opacity: isMobile ? 1 : 0.8 },
//                                     hover: { opacity: 1 }
//                                 }}
//                             >
//                                 {project.description}
//                             </motion.p>

//                             {/* Technologies */}
//                             {project.technologies?.length > 0 && (
//                                 <motion.div
//                                     className="flex flex-wrap gap-1.5 sm:gap-2 mt-3"
//                                     variants={{
//                                         rest: { opacity: isMobile ? 1 : 0.7 },
//                                         hover: { opacity: 1 }
//                                     }}
//                                 >
//                                     {project.technologies.slice(0, isMobile ? 4 : 6).map((tech, i) => (
//                                         <span
//                                             key={i}
//                                             className="bg-slate-800/80 backdrop-blur-sm text-cyan-300 text-xs px-2.5 py-1 rounded-full border border-cyan-400/30 font-medium"
//                                         >
//                                             {tech}
//                                         </span>
//                                     ))}
//                                     {project.technologies.length > (isMobile ? 4 : 6) && (
//                                         <span className="bg-slate-800/80 backdrop-blur-sm text-gray-400 text-xs px-2.5 py-1 rounded-full border border-gray-500/30 font-medium">
//                                             +{project.technologies.length - (isMobile ? 4 : 6)}
//                                         </span>
//                                     )}
//                                 </motion.div>
//                             )}
//                         </div>

//                         {/* Footer Actions */}
//                         <motion.div
//                             className="mt-4 space-y-3"
//                             variants={{
//                                 rest: { opacity: isMobile ? 1 : 0.8, y: isMobile ? 0 : 10 },
//                                 hover: { opacity: 1, y: 0 }
//                             }}
//                         >
//                             <div className="text-xs sm:text-sm text-gray-300 font-medium">
//                                 Explore this project:
//                             </div>

//                             <div className="flex flex-wrap gap-2 sm:gap-3">
//                                 {project.live_demo && (
//                                     <motion.a
//                                         href={project.live_demo}
//                                         target="_blank"
//                                         rel="noopener noreferrer"
//                                         className="flex items-center gap-2 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 hover:from-cyan-500/30 hover:to-blue-500/30 backdrop-blur-sm border border-cyan-400/30 hover:border-cyan-400/50 px-3 py-2 rounded-lg text-xs sm:text-sm text-cyan-300 hover:text-cyan-200 font-medium transition-all duration-300 hover:scale-105"
//                                         whileHover={{ scale: 1.05 }}
//                                         whileTap={{ scale: 0.95 }}
//                                     >
//                                         <img src="/live.png" alt="Live Demo" className="w-4 h-4" />
//                                         <span>Live Demo</span>
//                                     </motion.a>
//                                 )}

//                                 {project.repo && (
//                                     <motion.a
//                                         href={project.repo}
//                                         target="_blank"
//                                         rel="noopener noreferrer"
//                                         className="flex items-center gap-2 bg-gradient-to-r from-purple-500/20 to-pink-500/20 hover:from-purple-500/30 hover:to-pink-500/30 backdrop-blur-sm border border-purple-400/30 hover:border-purple-400/50 px-3 py-2 rounded-lg text-xs sm:text-sm text-purple-300 hover:text-purple-200 font-medium transition-all duration-300 hover:scale-105"
//                                         whileHover={{ scale: 1.05 }}
//                                         whileTap={{ scale: 0.95 }}
//                                     >
//                                         <img src="/coding.png" alt="Repository" className="w-4 h-4" />
//                                         <span>View Code</span>
//                                     </motion.a>
//                                 )}
//                             </div>
//                         </motion.div>
//                     </motion.div>

//                     {/* Hover glow effect */}
//                     <motion.div
//                         className="absolute inset-0 bg-gradient-to-r from-cyan-400/5 via-purple-400/5 to-pink-400/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
//                         variants={{
//                             rest: { opacity: 0 },
//                             hover: { opacity: 1 }
//                         }}
//                     />
//                 </motion.div>
//             ))}
//         </motion.div>
//     );
// };

// export default Projects;


'use client';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import React from 'react';

const Projects = () => {
    const [projects, setProjects] = useState([]);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        fetch("/projects.json")
            .then((response) => response.json())
            .then((data) => setProjects(data))
            .catch((error) => {
                console.error("Error fetching projects:", error);
            });

        // Check if device is mobile/touch device
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
            transition: {
                staggerChildren: 0.2
            }
        }
    };

    const cardVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0 }
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
                    whileHover={!isMobile ? "hover" : undefined}
                    initial="rest"
                    animate="rest"
                >
                    {/* Background Image */}
                    {project.image && (
                        <motion.div
                            className="absolute inset-0 overflow-hidden"
                            variants={{
                                rest: { scale: 1 },
                                hover: { scale: 1.05 }
                            }}
                            transition={{ duration: 0.6, ease: "easeOut" }}
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
                                    }
                                }}
                                transition={{ duration: 0.5, ease: "easeOut" }}
                            />
                            <motion.div
                                className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/20 to-transparent"
                                variants={{
                                    rest: { opacity: isMobile ? 1 : 0.6 },
                                    hover: { opacity: 0.9 }
                                }}
                                transition={{ duration: 0.4 }}
                            />
                        </motion.div>
                    )}

                    {/* Content Overlay */}
                    <motion.div
                        className="absolute inset-0 z-10 p-4 sm:p-6 flex flex-col justify-between text-white"
                        variants={{
                            rest: { 
                                opacity: isMobile ? 1 : 0.8, 
                                y: isMobile ? 0 : 10 
                            },
                            hover: { opacity: 1, y: 0 }
                        }}
                        transition={{ duration: 0.4, ease: 'easeOut' }}
                    >
                        {/* Header Content */}
                        <div className="space-y-3">
                            <motion.h3 
                                className="text-lg sm:text-xl lg:text-2xl font-bold text-transparent bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text leading-tight"
                                variants={{
                                    rest: { scale: 1 },
                                    hover: { scale: 1.02 }
                                }}
                            >
                                {project.name}
                            </motion.h3>
                            
                            <motion.p 
                                className="text-sm sm:text-base text-gray-200 leading-relaxed line-clamp-3"
                                variants={{
                                    rest: { opacity: isMobile ? 1 : 0.8 },
                                    hover: { opacity: 1 }
                                }}
                            >
                                {project.description}
                            </motion.p>

                            {/* Technologies */}
                            {project.technologies?.length > 0 && (
                                <motion.div 
                                    className="flex flex-wrap gap-1.5 sm:gap-2 mt-3"
                                    variants={{
                                        rest: { opacity: isMobile ? 1 : 0.7 },
                                        hover: { opacity: 1 }
                                    }}
                                >
                                    {project.technologies.slice(0, isMobile ? 4 : 6).map((tech, i) => (
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

                        {/* Footer Actions */}
                        <motion.div 
                            className="mt-4 space-y-3"
                            variants={{
                                rest: { opacity: isMobile ? 1 : 0.8, y: isMobile ? 0 : 10 },
                                hover: { opacity: 1, y: 0 }
                            }}
                        >
                            <div className="text-xs sm:text-sm text-gray-300 font-medium">
                                Explore this project:
                            </div>
                            
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
                                        <span>
                                            {project.live_demo == "/" ? "Coming Soon" : "Live Demo"}
                                        </span>
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
                                        <img src="/coding.png" alt="Repository" className="w-4 h-4" />
                                        <span>View Code</span>
                                    </motion.a>
                                )}
                            </div>
                        </motion.div>
                    </motion.div>

                    {/* Hover glow effect */}
                    <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-cyan-400/5 via-purple-400/5 to-pink-400/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                        variants={{
                            rest: { opacity: 0 },
                            hover: { opacity: 1 }
                        }}
                    />
                </motion.div>
            ))}
        </motion.div>
    );
};

export default Projects;