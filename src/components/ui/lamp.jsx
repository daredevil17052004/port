// "use client";
// import React from "react";
// import { motion } from "motion/react";
// import { cn } from "@/lib/utils";
// import NavigationBar from "../NavigationBar";
// import { useEffect, useState } from "react";
// import ShinyText from "../ShinyText/ShinyText";


// export default function LampDemo() {

//   const [yInitial, setYInitial] = useState({ opacity: 0.5, y: 100 });
//   const [whileInViewProps, setWhileInViewProps] = useState({ opacity: 1, y: 40 });
//   const [screenKey, setScreenKey] = useState("lg");

//   useEffect(() => {
//     const handleResize = () => {
//       const width = window.innerWidth;

//       if (width < 640) {
//         setYInitial({ opacity: 0.5, y: 500 });
//         setWhileInViewProps({ opacity: 1, y: 0 });
//         setScreenKey("sm");
//       } else if (width < 1024) {
//         setYInitial({ opacity: 0.5, y: 100 });
//         setWhileInViewProps({ opacity: 1, y: 40 });
//         setScreenKey("md");
//       } else {
//         setYInitial({ opacity: 0.5, y: 100 });
//         setWhileInViewProps({ opacity: 1, y: 0 });
//         setScreenKey("lg");
//       }
//     };

//     handleResize(); // Initial check
//     window.addEventListener("resize", handleResize);
//     return () => window.removeEventListener("resize", handleResize);
//   }, []);


//   return (
//     <LampContainer>
//     <motion.div
//       key={screenKey}
//       initial={yInitial}
//       whileInView={whileInViewProps}
//       transition={{
//         delay: 0.3,
//         duration: 0.8,
//         ease: "easeInOut",
//       }}
//       className="w-full  px-4 sm:px-6 md:px-8"
//     >
//       <h1 className="mt-4 sm:mt-6 md:mt-8 w-full bg-gradient-to-br from-slate-300 to-slate-500 py-2 sm:py-3 md:py-4 bg-clip-text text-center text-2xl sm:text-3xl md:text-4xl lg:text-6xl font-medium tracking-tight text-transparent">
//         <p className="mb-6 sm:mb-10 md:mb-16 lg:mb-20">
//           Hi there! I am <span className="text-cyan-500">Ansh Sharma</span>. <br className="hidden sm:block" />
//           A FullStack Developer
//         </p>
//       </h1>
  
//       <div className="w-full max-w-md mx-auto px-4 flex items-center justify-center text-center text-md sm:text-lg md:text-xl text-slate-300">
//         <p className="mb-6 sm:mb-8 md:mb-10 max-w-md">
//           Crafting responsive UIs and building robust APIs with modern tech.
//         </p>
//       </div>
  
//       <div className="flex flex-col sm:flex-row items-center justify-center sm:justify-center w-full mb-8 sm:mb-10 gap-4 sm:gap-6">
//         <div>
//           <button className="p-2 w-40 border rounded-xl border-cyan-400 hover:bg-cyan-400/10 transition-colors">
//             View Projects
//           </button>
//         </div>
  
//         <div>
//           <button className="p-2 w-40 border rounded-xl border-cyan-400 hover:bg-cyan-400/10 transition-colors">
//             Download Resume
//           </button>
//         </div>
//       </div>
  
//       <div className="flex items-center justify-center mb-6 mt-6 sm:mt-8">
//         <p className="text-sm sm:text-base md:text-lg text-slate-300">Technologies I Know</p>
//       </div>
      
//       <div className="relative w-full overflow-hidden py-4 sm:py-6 bg-[#0A0F1A]">
//         {/* Gradient overlays for visual effect */}
//         <div className="absolute left-0 top-0 h-full w-8 sm:w-12 md:w-24 bg-gradient-to-r from-[#0A0F1A] to-transparent z-10" />
//         <div className="absolute right-0 top-0 h-full w-8 sm:w-12 md:w-24 bg-gradient-to-l from-[#0A0F1A] to-transparent z-10" />
  
//         <div className="flex whitespace-nowrap animate-marquee space-x-4 sm:space-x-6 md:space-x-10 px-2 sm:px-4 md:px-10 text-white">
//           {[...Array(2)].map((_, i) => (
//             <React.Fragment key={i}>
//               {/* Custom SVG Icon */}
//               <div className="my-icon flex items-center">
//                 <svg
//                   xmlns="http://www.w3.org/2000/svg"
//                   viewBox="0 0 180 180"
//                   className="h-6 w-6 sm:h-8 sm:w-8 md:h-10 md:w-10 lg:h-12 lg:w-12"
//                   aria-label="My Icon"
//                 >
//                   <mask
//                     id={`myMask-${i}`}
//                     maskUnits="userSpaceOnUse"
//                     x="0"
//                     y="0"
//                     width="200"
//                     height="180"
//                     style={{ maskType: "alpha" }}
//                   >
//                     <circle cx="90" cy="90" r="90" fill="black" />
//                   </mask>
//                   <g mask={`url(#myMask-${i})`}>
//                     <circle cx="90" cy="90" r="90" fill="black" />
//                     <path
//                       d="M149.508 157.52L69.142 54H54V125.97H66.1136V69.3836L139.999 164.845C143.333 162.614 146.509 160.165 149.508 157.52Z"
//                       fill="url(#gradient0)"
//                     />
//                     <rect x="115" y="54" width="12" height="72" fill="url(#gradient1)" />
//                   </g>
//                   <defs>
//                     <linearGradient
//                       id="gradient0"
//                       x1="109"
//                       y1="116.5"
//                       x2="144.5"
//                       y2="160.5"
//                       gradientUnits="userSpaceOnUse"
//                     >
//                       <stop stopColor="white" />
//                       <stop offset="1" stopColor="white" stopOpacity="0" />
//                     </linearGradient>
//                     <linearGradient
//                       id="gradient1"
//                       x1="121"
//                       y1="54"
//                       x2="120.799"
//                       y2="106.875"
//                       gradientUnits="userSpaceOnUse"
//                     >
//                       <stop stopColor="white" />
//                       <stop offset="1" stopColor="white" stopOpacity="0" />
//                     </linearGradient>
//                   </defs>
//                 </svg>
//               </div>
  
//               {/* Icons */}
//               {[
//                 { src: "/icons/react.png", alt: "React" },
//                 { src: "/icons/nodejs.png", alt: "Node.js" },
//                 { src: "/icons/mongodb.png", alt: "MongoDB" },
//                 { src: "/icons/tailwindcss.png", alt: "Tailwind" },
//                 { src: "/icons/javascript.png", alt: "JavaScript" },
//                 { src: "/icons/python.png", alt: "Python" },
//                 { src: "/icons/redux.png", alt: "Redux" },
//                 { src: "/icons/linux.png", alt: "Linux" },
//                 { src: "/icons/docker.png", alt: "Docker" },
//                 { src: "/icons/figma.png", alt: "Figma" },
//               ].map((icon, idx) => (
//                 <img
//                   key={`${icon.alt}-${idx}`}
//                   src={icon.src}
//                   alt={icon.alt}
//                   className="h-6 w-6 sm:h-8 sm:w-8 md:h-10 md:w-10 lg:h-12 lg:w-12"
//                 />
//               ))}
//             </React.Fragment>
//           ))}
//         </div>
//       </div>
//     </motion.div>
//   </LampContainer>
//   );
// }

// export const LampContainer = ({
//   children,
//   className
// }) => {

//   const [widths, setWidths] = useState({ initial: "20vw", animate: "40vw" });

//   useEffect(() => {
//     const handleResize = () => {
//       const width = window.innerWidth;

//       if (width < 640) {
//         setWidths({ initial: "40vw", animate: "80vw" }); // small screens
//       } else if (width < 1024) {
//         setWidths({ initial: "30vw", animate: "60vw" }); // medium
//       } else {
//         setWidths({ initial: "20vw", animate: "40vw" }); // large
//       }
//     };

//     handleResize(); // run on load
//     window.addEventListener("resize", handleResize);
//     return () => window.removeEventListener("resize", handleResize);
//   }, []);

//   return (
//     (<div
//       className={cn(
//         "relative flex  h-screen flex-col items-center justify-center overflow-hidden bg-slate-950 w-full rounded-md z-0",
//         className
//       )}>
//       <div
//         className="relative flex w-full flex-1 scale-y-125 mt-30 sm:50  md:mt-52 items-center justify-center isolate z-0 ">
//         <motion.div
//           initial={{ opacity: 0.5, width: widths.initial }}
//           whileInView={{ opacity: 1, width: widths.animate }}
//           transition={{
//             delay: 0.3,
//             duration: 0.8,
//             ease: "easeInOut",
//           }}
//           style={{
//             backgroundImage: `conic-gradient(var(--conic-position), var(--tw-gradient-stops))`,
//           }}
//           className="absolute inset-auto right-1/2 h-56  overflow-visible w-[30rem] bg-gradient-conic from-cyan-500 via-transparent to-transparent text-white [--conic-position:from_70deg_at_center_top]">
//           <div
//             className="absolute w-[100%] left-0 bg-slate-950 h-40 bottom-0 z-20 [mask-image:linear-gradient(to_top,white,transparent)]" />
//           <div
//             className="absolute w-40 h-[100%] left-0 bg-slate-950  bottom-0 z-20 [mask-image:linear-gradient(to_right,white,transparent)]" />
//         </motion.div>
//         <motion.div
//           initial={{ opacity: 0.5, width: widths.initial }}
//           whileInView={{ opacity: 1, width: widths.animate }}
//           transition={{
//             delay: 0.3,
//             duration: 0.8,
//             ease: "easeInOut",
//           }}
//           style={{
//             backgroundImage: `conic-gradient(var(--conic-position), var(--tw-gradient-stops))`,
//           }}
//           className="absolute inset-auto left-1/2  h-56 w-[30rem] bg-gradient-conic from-transparent via-transparent to-cyan-500 text-white [--conic-position:from_290deg_at_center_top]">
//           <div
//             className="absolute w-40 h-[100%] right-0 bg-slate-950  bottom-0 z-20 [mask-image:linear-gradient(to_left,white,transparent)]" />
//           <div
//             className="absolute  w-[100%] right-0 bg-slate-950 h-40 bottom-0 z-20 [mask-image:linear-gradient(to_top,white,transparent)]" />
//         </motion.div>
//         <div
//           className="absolute top-1/2 h-80 w-full translate-y-12 scale-x-150 bg-slate-950 blur-2xl"></div>
//         <div
//           className="absolute top-1/2 z-50 h-48 w-full bg-transparent opacity-10 backdrop-blur-md"></div>
//         <div
//           className="absolute inset-auto z-50 h-36 w-[28rem] -translate-y-1/2 rounded-full bg-cyan-500 opacity-50 blur-3xl"></div>
//         <motion.div
//           className="absolute inset-auto z-30 h-36 -translate-y-[6rem] rounded-full bg-cyan-500 blur-2xl"
//           initial={{ width: widths.initial }}
//           whileInView={{ width: widths.animate }}
//           transition={{
//             delay: 0.3,
//             duration: 0.8,
//             ease: "easeInOut",
//           }}
//         ></motion.div>
//         <motion.div
//           initial={{ width: widths.initial }}
//           whileInView={{ width: widths.animate }}
//           transition={{
//             delay: 0.3,
//             duration: 0.8,
//             ease: "easeInOut",
//           }}
//           className="absolute inset-auto z-50 h-0.5 -translate-y-[7rem] bg-cyan-400 "></motion.div>

//         <div
//           className="absolute inset-auto z-40 h-44 w-full -translate-y-[12.5rem] bg-slate-950 "></div>
//       </div>
//       <div className="relative z-50 flex -translate-y-[200px] md:-translate-y-[100px] lg:-translate-y-[80px] flex-col items-center justify-between px-5 ">
//         {children}
//       </div>

//     </div>)
//   );
// };



"use client";
import React from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import NavigationBar from "../NavigationBar";
import { useEffect, useState } from "react";
import ShinyText from "../ShinyText/ShinyText";

export default function LampDemo() {
  const [yInitial, setYInitial] = useState({ opacity: 0.5, y: 100 });
  const [whileInViewProps, setWhileInViewProps] = useState({ opacity: 1, y: 40 });
  const [screenKey, setScreenKey] = useState("lg");

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;

      if (width < 640) {
        setYInitial({ opacity: 0.5, y: 300 });
        setWhileInViewProps({ opacity: 1, y: 0 });
        setScreenKey("sm");
      } else if (width < 1024) {
        setYInitial({ opacity: 0.5, y: 150 });
        setWhileInViewProps({ opacity: 1, y: 20 });
        setScreenKey("md");
      } else {
        setYInitial({ opacity: 0.5, y: 100 });
        setWhileInViewProps({ opacity: 1, y: 0 });
        setScreenKey("lg");
      }
    };

    handleResize(); // Initial check
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <LampContainer>
      <motion.div
        key={screenKey}
        initial={yInitial}
        whileInView={whileInViewProps}
        transition={{
          delay: 0.3,
          duration: 0.8,
          ease: "easeInOut",
        }}
        className="w-full px-4 sm:px-6 md:px-8"
      >
        <h1 className="mt-4 sm:mt-6 md:mt-8 w-full bg-gradient-to-br from-slate-300 to-slate-500 py-2 sm:py-3 md:py-4 bg-clip-text text-center text-2xl sm:text-3xl md:text-4xl lg:text-6xl font-medium tracking-tight text-transparent">
          <p className="mb-6 sm:mb-10 md:mb-16 lg:mb-20">
            Hi there! I am <span className="text-cyan-500">Ansh Sharma</span>. <br className="hidden sm:block" />
            A FullStack Developer
          </p>
        </h1>

        <div className="w-full max-w-md mx-auto px-4 flex items-center justify-center text-center text-md sm:text-lg md:text-xl text-slate-300">
          <p className="mb-6 sm:mb-8 md:mb-10 max-w-md">
            Crafting responsive UIs and building robust APIs with modern tech.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center sm:justify-center w-full mb-8 sm:mb-10 gap-4 sm:gap-6">
          <div>
            <button className="p-2 w-40 border rounded-xl border-cyan-400 hover:bg-cyan-400/10 transition-colors">
              View Projects
            </button>
          </div>

          <div>
            <button className="p-2 w-40 border rounded-xl border-cyan-400 hover:bg-cyan-400/10 transition-colors">
              Download Resume
            </button>
          </div>
        </div>

        <div className="flex items-center justify-center mb-6 mt-6 sm:mt-8">
          <p className="text-sm sm:text-base md:text-lg text-slate-300">Technologies I Know</p>
        </div>
        
        <div className="relative w-full overflow-hidden py-4 sm:py-6 bg-[#0A0F1A]">
          {/* Gradient overlays for visual effect */}
          <div className="absolute left-0 top-0 h-full w-8 sm:w-12 md:w-24 bg-gradient-to-r from-[#0A0F1A] to-transparent z-10" />
          <div className="absolute right-0 top-0 h-full w-8 sm:w-12 md:w-24 bg-gradient-to-l from-[#0A0F1A] to-transparent z-10" />

          <div className="flex whitespace-nowrap animate-marquee space-x-4 sm:space-x-6 md:space-x-10 px-2 sm:px-4 md:px-10 text-white">
            {[...Array(2)].map((_, i) => (
              <React.Fragment key={i}>
                {/* Custom SVG Icon */}
                <div className="my-icon flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 180 180"
                    className="h-6 w-6 sm:h-8 sm:w-8 md:h-10 md:w-10 lg:h-12 lg:w-12"
                    aria-label="My Icon"
                  >
                    <mask
                      id={`myMask-${i}`}
                      maskUnits="userSpaceOnUse"
                      x="0"
                      y="0"
                      width="200"
                      height="180"
                      style={{ maskType: "alpha" }}
                    >
                      <circle cx="90" cy="90" r="90" fill="black" />
                    </mask>
                    <g mask={`url(#myMask-${i})`}>
                      <circle cx="90" cy="90" r="90" fill="black" />
                      <path
                        d="M149.508 157.52L69.142 54H54V125.97H66.1136V69.3836L139.999 164.845C143.333 162.614 146.509 160.165 149.508 157.52Z"
                        fill="url(#gradient0)"
                      />
                      <rect x="115" y="54" width="12" height="72" fill="url(#gradient1)" />
                    </g>
                    <defs>
                      <linearGradient
                        id="gradient0"
                        x1="109"
                        y1="116.5"
                        x2="144.5"
                        y2="160.5"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stopColor="white" />
                        <stop offset="1" stopColor="white" stopOpacity="0" />
                      </linearGradient>
                      <linearGradient
                        id="gradient1"
                        x1="121"
                        y1="54"
                        x2="120.799"
                        y2="106.875"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stopColor="white" />
                        <stop offset="1" stopColor="white" stopOpacity="0" />
                      </linearGradient>
                    </defs>
                  </svg>
                </div>

                {/* Icons */}
                {[
                  { src: "/icons/react.png", alt: "React" },
                  { src: "/icons/nodejs.png", alt: "Node.js" },
                  { src: "/icons/mongodb.png", alt: "MongoDB" },
                  { src: "/icons/tailwindcss.png", alt: "Tailwind" },
                  { src: "/icons/javascript.png", alt: "JavaScript" },
                  { src: "/icons/python.png", alt: "Python" },
                  { src: "/icons/redux.png", alt: "Redux" },
                  { src: "/icons/linux.png", alt: "Linux" },
                  { src: "/icons/docker.png", alt: "Docker" },
                  { src: "/icons/figma.png", alt: "Figma" },
                ].map((icon, idx) => (
                  <img
                    key={`${icon.alt}-${idx}`}
                    src={icon.src}
                    alt={icon.alt}
                    className="h-6 w-6 sm:h-8 sm:w-8 md:h-10 md:w-10 lg:h-12 lg:w-12"
                  />
                ))}
              </React.Fragment>
            ))}
          </div>
        </div>
      </motion.div>
    </LampContainer>
  );
}

export const LampContainer = ({ children, className }) => {
  const [lampConfig, setLampConfig] = useState({
    widths: { initial: "15vw", animate: "30vw" },
    lampHeight: "h-56",
    lampWidth: "w-[30rem]",
    blurHeight: "h-36",
    translateY: "-translate-y-[6rem]",
    lineTranslateY: "-translate-y-[7rem]",
    topMask: "-translate-y-[12.5rem]",
    contentTranslateY: "-translate-y-80",
    scaleContainer: "scale-y-125",
    lampContainer: "top-0"
  });

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;

      if (width < 640) {
        // Mobile configuration
        setLampConfig({
          widths: { initial: "40vw", animate: "80vw" },
          lampHeight: "h-40",
          lampWidth: "w-80",
          blurHeight: "h-20",
          translateY: "-translate-y-16",
          lineTranslateY: "-translate-y-20",
          topMask: "-translate-y-32",
          contentTranslateY: "-translate-y-40",
          scaleContainer: "scale-y-90",
          lampContainer: "top-16"
        });
      } else if (width < 768) {
        // Small tablet configuration
        setLampConfig({
          widths: { initial: "30vw", animate: "60vw" },
          lampHeight: "h-44",
          lampWidth: "w-96",
          blurHeight: "h-24",
          translateY: "-translate-y-20",
          lineTranslateY: "-translate-y-24",
          topMask: "-translate-y-40",
          contentTranslateY: "-translate-y-52",
          scaleContainer: "scale-y-100",
          lampContainer: "top-20"
        });
      } else if (width < 1024) {
        // Medium screens configuration
        setLampConfig({
          widths: { initial: "25vw", animate: "45vw" },
          lampHeight: "h-48",
          lampWidth: "w-[26rem]",
          blurHeight: "h-28",
          translateY: "-translate-y-24",
          lineTranslateY: "-translate-y-28",
          topMask: "-translate-y-44",
          contentTranslateY: "-translate-y-60",
          scaleContainer: "scale-y-110",
          lampContainer: "top-24"
        });
      } else {
        // Large screens configuration
        setLampConfig({
          widths: { initial: "15vw", animate: "30vw" },
          lampHeight: "h-56",
          lampWidth: "w-[30rem]",
          blurHeight: "h-36",
          translateY: "-translate-y-[6rem]",
          lineTranslateY: "-translate-y-[7rem]",
          topMask: "-translate-y-[12.5rem]",
          contentTranslateY: "-translate-y-80",
          scaleContainer: "scale-y-125",
          lampContainer: "top-0"
        });
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div
      className={cn(
        "relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden bg-slate-950 rounded-md",
        className
      )}
    >
      {/* Lamp Effects Container */}
      <div className={`absolute ${lampConfig.lampContainer} left-0 right-0 flex items-center justify-center ${lampConfig.scaleContainer}`}>
        {/* Left conic gradient */}
        <motion.div
          initial={{ opacity: 0.5, width: lampConfig.widths.initial }}
          whileInView={{ opacity: 1, width: lampConfig.widths.animate }}
          transition={{
            delay: 0.3,
            duration: 0.8,
            ease: "easeInOut",
          }}
          style={{
            backgroundImage: `conic-gradient(var(--conic-position), var(--tw-gradient-stops))`,
          }}
          className={`absolute right-1/2 ${lampConfig.lampHeight} overflow-visible ${lampConfig.lampWidth} bg-gradient-conic from-cyan-500 via-transparent to-transparent text-white [--conic-position:from_70deg_at_center_top]`}
        >
          <div className="absolute w-full left-0 bg-slate-950 h-40 bottom-0 z-20 [mask-image:linear-gradient(to_top,white,transparent)]" />
          <div className="absolute w-40 h-full left-0 bg-slate-950 bottom-0 z-20 [mask-image:linear-gradient(to_right,white,transparent)]" />
        </motion.div>

        {/* Right conic gradient */}
        <motion.div
          initial={{ opacity: 0.5, width: lampConfig.widths.initial }}
          whileInView={{ opacity: 1, width: lampConfig.widths.animate }}
          transition={{
            delay: 0.3,
            duration: 0.8,
            ease: "easeInOut",
          }}
          style={{
            backgroundImage: `conic-gradient(var(--conic-position), var(--tw-gradient-stops))`,
          }}
          className={`absolute left-1/2 ${lampConfig.lampHeight} ${lampConfig.lampWidth} bg-gradient-conic from-transparent via-transparent to-cyan-500 text-white [--conic-position:from_290deg_at_center_top]`}
        >
          <div className="absolute w-40 h-full right-0 bg-slate-950 bottom-0 z-20 [mask-image:linear-gradient(to_left,white,transparent)]" />
          <div className="absolute w-full right-0 bg-slate-950 h-40 bottom-0 z-20 [mask-image:linear-gradient(to_top,white,transparent)]" />
        </motion.div>

        {/* Background blur effect */}
        <div className="absolute top-1/2 h-80 w-full translate-y-12 scale-x-150 bg-slate-950 blur-2xl"></div>
        
        {/* Backdrop blur overlay */}
        <div className="absolute top-1/2 z-50 h-48 w-full bg-transparent opacity-10 backdrop-blur-md"></div>
        
        {/* Central glow effect */}
        <div className={`absolute inset-auto z-50 ${lampConfig.blurHeight} w-[28rem] -translate-y-1/2 rounded-full bg-cyan-500 opacity-50 blur-3xl`}></div>
        
        {/* Moving blur element */}
        <motion.div
          className={`absolute inset-auto z-30 ${lampConfig.blurHeight} ${lampConfig.translateY} rounded-full bg-cyan-500 blur-2xl`}
          initial={{ width: lampConfig.widths.initial }}
          whileInView={{ width: lampConfig.widths.animate }}
          transition={{
            delay: 0.3,
            duration: 0.8,
            ease: "easeInOut",
          }}
        ></motion.div>
        
        {/* Light line effect */}
        <motion.div
          initial={{ width: lampConfig.widths.initial }}
          whileInView={{ width: lampConfig.widths.animate }}
          transition={{
            delay: 0.3,
            duration: 0.8,
            ease: "easeInOut",
          }}
          className={`absolute inset-auto z-50 h-0.5 ${lampConfig.lineTranslateY} bg-cyan-400`}
        ></motion.div>

        {/* Top mask */}
        <div className={`absolute inset-auto z-40 h-44 w-full ${lampConfig.topMask} bg-slate-950`}></div>
      </div>
      
      {/* Content container */}
      <div className={`relative z-50 flex ${lampConfig.contentTranslateY} flex-col items-center justify-center px-5 w-full`}>
        {children}
      </div>
    </div>
  );
};