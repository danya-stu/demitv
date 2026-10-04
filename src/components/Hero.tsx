import React, { useEffect, useRef } from 'react';
import { ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface HeroProps {
  onUnlock?: () => void;
  isLocked?: boolean;
  isLoading?: boolean;
}

export const Hero: React.FC<HeroProps> = ({ onUnlock, isLocked = false, isLoading = false }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
      let ticking = false;
      const handleMouseMove = (e: MouseEvent) => {
        if (window.innerWidth < 768) return; // Отключаем параллакс на мобильных
        if (!ticking) {
          window.requestAnimationFrame(() => {
            // Calculate deviation from center
            const centerX = window.innerWidth / 2;
            const centerY = window.innerHeight / 2;
            const deviationX = e.clientX - centerX;
            const deviationY = e.clientY - centerY;

            // Multiply by small coefficients (e.g. 0.01 for Y and -0.005 for X)
            // to dampen the speed and invert axes
            const moveX = deviationX * -0.005; 
            const moveY = deviationY * 0.01;

            // Set CSS variables on root document
            document.documentElement.style.setProperty('--move-x', `${moveX}deg`);
            document.documentElement.style.setProperty('--move-y', `${moveY}deg`);
            
            ticking = false;
          });
          ticking = true;
        }
      };

      window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <section className="relative w-full h-screen overflow-hidden bg-background">
      {/* 3D Parallax Root */}
      <div className="layers" ref={containerRef}>
        <div className="layers__container">
          
          {/* Layer 1: Background (Pushed far back, scaled up) */}
          <div 
            className="layers__item layer-1 overflow-hidden"
            style={{ 
              backgroundImage: 'url(/parallax-bg.png)',
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}
          >
            {/* Dark overlay to make text readable */}
            <div className="absolute inset-0 bg-black/40 pointer-events-none" />
          </div>

          {/* Layer 2: Deep floating elements (Particles/Stars) and Central Flares */}
          <div className="layers__item layer-2 pointer-events-none flex items-center justify-center">
             {/* Central Animated Flares for the "Black Hole" / Cosmic Object (Optimized for GPU) */}
             <motion.div 
               animate={{ opacity: [0.3, 0.8, 0.3], scale: [0.8, 1.2, 0.8] }}
               transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
               className="absolute w-[40vw] h-[40vw] rounded-full hidden md:block"
               style={{ background: 'radial-gradient(circle, rgba(6,182,212,0.3) 0%, transparent 60%)' }}
             />
             <motion.div 
               animate={{ opacity: [0.5, 0.2, 0.5], scale: [1.1, 0.9, 1.1] }}
               transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
               className="absolute w-[30vw] h-[30vw] rounded-full hidden md:block"
               style={{ background: 'radial-gradient(circle, rgba(168,85,247,0.4) 0%, transparent 60%)' }}
             />
             <motion.div 
               animate={{ opacity: [0, 0.6, 0], rotate: [0, 90, 180] }}
               transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
               className="absolute w-[50vw] h-[10vw] rounded-full hidden md:block"
               style={{ background: 'radial-gradient(ellipse, rgba(96,165,250,0.2) 0%, transparent 60%)' }}
             />

             {/* Tiny Particles */}
             <motion.div animate={{ opacity: [0.3, 0.8, 0.3], y: [0, -20, 0] }} transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }} className="absolute top-[10%] left-[20%] w-2 h-2 bg-blue-400 rounded-full blur-[1px]" />
             <motion.div animate={{ opacity: [0.2, 0.6, 0.2], y: [0, 15, 0] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }} className="absolute top-[30%] left-[70%] w-4 h-4 bg-indigo-500 rounded-full blur-[2px] hidden md:block" />
             <motion.div animate={{ opacity: [0.4, 0.9, 0.4], x: [0, -10, 0] }} transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }} className="absolute top-[50%] left-[10%] w-3 h-3 bg-cyan-400 rounded-full blur-[1px]" />
             <motion.div animate={{ opacity: [0.1, 0.5, 0.1], y: [0, -30, 0] }} transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 2 }} className="absolute top-[70%] left-[80%] w-5 h-5 bg-blue-600 rounded-full blur-[3px] hidden md:block" />
             <motion.div animate={{ opacity: [0.5, 1, 0.5], scale: [1, 1.5, 1] }} transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut", delay: 1.5 }} className="absolute top-[80%] left-[30%] w-2 h-2 bg-white rounded-full blur-[1px]" />
             <motion.div animate={{ opacity: [0.1, 0.4, 0.1], y: [0, 20, 0] }} transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 0.2 }} className="absolute top-[20%] left-[50%] w-6 h-6 bg-purple-500 rounded-full blur-[4px] hidden md:block" />
             <motion.div animate={{ opacity: [0.3, 0.7, 0.3], x: [0, 15, 0] }} transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 1.2 }} className="absolute top-[60%] left-[60%] w-3 h-3 bg-blue-300 rounded-full blur-[2px]" />

             {/* Micro-details: Hollow circles and ovals */}
             <motion.div animate={{ opacity: [0.3, 0.8, 0.3], rotate: [0, 180] }} transition={{ duration: 10, repeat: Infinity, ease: "linear" }} className="absolute top-[45%] left-[25%] w-16 h-6 border-2 border-blue-400/50 rounded-[50%] hidden md:block" />
             <motion.div animate={{ opacity: [0.2, 0.7, 0.2], scale: [1, 1.4, 1], rotate: [0, -90] }} transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 1 }} className="absolute top-[65%] left-[70%] w-24 h-24 border-2 border-cyan-400/40 rounded-full hidden md:block" />
             <motion.div animate={{ opacity: [0.4, 0.9, 0.4], x: [0, 50, 0] }} transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 2 }} className="absolute top-[35%] left-[60%] w-12 h-4 bg-purple-500/50 rounded-[50%] blur-[2px] hidden md:block" />
          </div>

          {/* Layer 3: Main Content (Text and Button) */}
          <div className="layers__item layer-3 z-10 flex flex-col justify-center items-center text-center">
            <div className="relative z-10 flex flex-col items-center max-w-[100vw] px-4 sm:px-6">
              
              <div className="mb-8 relative group">
                <div className="absolute inset-0 bg-rustore blur-xl opacity-30 group-hover:opacity-50 transition-opacity duration-500 rounded-full" />
                {!isLoading && (
                  <motion.img 
                    layoutId="hero-logo"
                    src="/logo.png" 
                    alt="Dёmi TV Logo" 
                    draggable={false}
                    className="relative w-32 h-32 md:w-48 md:h-48 object-cover rounded-3xl shadow-[0_0_40px_rgba(0,91,255,0.4)] border border-white/10 select-none pointer-events-none" 
                  />
                )}
              </div>

              <motion.h1 
                initial={{ opacity: 0, y: 30 }}
                animate={{ 
                  opacity: 1, 
                  y: 0,
                  filter: [
                    "drop-shadow(0px 0px 10px rgba(0,91,255,0.1))", 
                    "drop-shadow(0px 0px 35px rgba(0,91,255,0.7))", 
                    "drop-shadow(0px 0px 10px rgba(0,91,255,0.1))"
                  ]
                }}
                transition={{ 
                  opacity: { duration: 0.8, delay: 0.6 },
                  y: { duration: 0.8, delay: 0.6 },
                  filter: { duration: 4, repeat: Infinity, ease: "easeInOut" }
                }}
                className="text-4xl sm:text-5xl md:text-7xl font-black mb-6 tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white via-blue-50 to-gray-300 px-2"
              >
                Твое телевидение. <br/>
                <span className="text-rustore-light drop-shadow-md">В новом формате.</span>
              </motion.h1>
              
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.8 }}
                className="text-lg md:text-2xl text-gray-400 mb-8 max-w-2xl mx-auto drop-shadow-lg px-2"
              >
                Dёmi TV — современный, быстрый и невероятно красивый плеер для любимых телеканалов и радио.
              </motion.p>
              
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ 
                  opacity: 1, 
                  scale: [1, 1.03, 1],
                  boxShadow: [
                    "0px 0px 10px rgba(0,91,255,0.1)",
                    "0px 0px 25px rgba(0,91,255,0.5)",
                    "0px 0px 10px rgba(0,91,255,0.1)"
                  ]
                }}
                transition={{ 
                  opacity: { duration: 0.5, delay: 1.0 },
                  scale: { duration: 3, repeat: Infinity, ease: "easeInOut" },
                  boxShadow: { duration: 3, repeat: Infinity, ease: "easeInOut" }
                }}
                className="flex items-center text-gray-300 bg-white/5 border border-white/10 px-4 md:px-6 py-2.5 md:py-3 rounded-full backdrop-blur-sm pointer-events-none text-sm md:text-base mx-2"
              >
                <span className="font-medium tracking-wide">Уже доступно в <span className="text-rustore-light font-bold drop-shadow-md">RuStore</span></span>
              </motion.div>
            </div>
          </div>

          {/* Layer 4: Abstract floating shapes (Depth) */}
          <div className="layers__item layer-4 pointer-events-none hidden md:flex items-center justify-center">
             <motion.div 
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 0.6 }}
                transition={{ duration: 2, delay: 0.5, ease: 'easeOut' }}
                className="absolute w-[600px] h-[600px] bg-rustore/10 rounded-full blur-[100px]"
                style={{ marginLeft: '-30vw', marginTop: '-20vh' }}
             />
             <motion.div 
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 0.4 }}
                transition={{ duration: 2.5, delay: 0.8, ease: 'easeOut' }}
                className="absolute w-[400px] h-[400px] bg-purple-500/10 rounded-full blur-[80px]"
                style={{ marginLeft: '30vw', marginTop: '20vh' }}
             />
          </div>

          {/* Layer 5: Closest overlay (Particles popping out) - must be pointer-events-none */}
          <div className="layers__item layer-5 pointer-events-none hidden md:block">
            {/* Big blurred glow (Optimized for GPU) */}
            <div 
              className="absolute top-1/2 left-1/4 w-[500px] h-[500px] rounded-full"
              style={{ background: 'radial-gradient(circle, rgba(0,91,255,0.2) 0%, transparent 70%)' }}
            />
            
            {/* Out-of-focus large particles that fly in front */}
            <motion.div animate={{ opacity: [0.1, 0.4, 0.1], scale: [0.9, 1.1, 0.9] }} transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }} className="absolute top-[15%] left-[80%] w-12 h-12 bg-blue-400/30 rounded-full blur-[8px]" />
            <motion.div animate={{ opacity: [0.1, 0.3, 0.1], y: [0, -40, 0] }} transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }} className="absolute top-[85%] left-[20%] w-16 h-16 bg-purple-500/20 rounded-full blur-[12px]" />
            <motion.div animate={{ opacity: [0.2, 0.6, 0.2], x: [0, 30, 0] }} transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 2 }} className="absolute top-[40%] left-[5%] w-8 h-8 bg-cyan-400/40 rounded-full blur-[6px]" />
            <motion.div animate={{ opacity: [0.1, 0.3, 0.1], scale: [1, 1.2, 1] }} transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 0.5 }} className="absolute top-[75%] left-[85%] w-20 h-20 bg-indigo-500/20 rounded-full blur-[16px]" />
            <motion.div animate={{ opacity: [0.05, 0.2, 0.05], y: [0, 50, 0] }} transition={{ duration: 9, repeat: Infinity, ease: "easeInOut", delay: 1.5 }} className="absolute top-[25%] left-[30%] w-10 h-10 bg-white/10 rounded-full blur-[5px]" />
            <motion.div animate={{ opacity: [0.1, 0.5, 0.1], scale: [0.8, 1.1, 0.8] }} transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut", delay: 2.5 }} className="absolute top-[65%] left-[45%] w-14 h-14 bg-blue-500/20 rounded-full blur-[10px]" />

            {/* Falling Data Drops / Comets */}
            <motion.div 
              animate={{ top: ['-10%', '110%'], opacity: [0, 1, 0] }} 
              transition={{ duration: 4, repeat: Infinity, ease: "linear", delay: 2 }} 
              className="absolute left-[15%] w-[4px] h-[200px] bg-gradient-to-b from-transparent via-cyan-400 to-transparent blur-[1px]" 
            />
            <motion.div 
              animate={{ top: ['-20%', '120%'], opacity: [0, 0.9, 0] }} 
              transition={{ duration: 5.5, repeat: Infinity, ease: "linear", delay: 0.5 }} 
              className="absolute left-[85%] w-[6px] h-[300px] bg-gradient-to-b from-transparent via-purple-400 to-transparent blur-[2px]" 
            />
          </div>

          {/* Layer 6: UI Overlays (Unlock Button) */}
          <div className="layers__item layer-6 z-20 pointer-events-none flex justify-center items-center">
            <AnimatePresence>
              {isLocked && (
                <motion.button
                  style={{ position: 'absolute', top: 'calc(50% + 25vh)', left: '50%' }}
                  initial={{ opacity: 0, y: 20, x: '-50%' }}
                  animate={{ opacity: 1, y: 0, x: '-50%' }}
                  exit={{ opacity: 0, y: -20, x: '-50%', scale: 0.9 }}
                  transition={{ delay: 1.5, duration: 0.8 }}
                  onClick={onUnlock}
                  className="pointer-events-auto group cursor-pointer"
                >
                  <div className="flex items-center justify-center gap-3 md:gap-4 px-8 md:px-16 py-4 md:py-6 rounded-full border border-rustore/50 bg-rustore/10 backdrop-blur-md shadow-[0_0_40px_rgba(0,91,255,0.2)] group-hover:shadow-[0_0_100px_rgba(0,91,255,0.8)] group-hover:bg-rustore/30 group-hover:border-rustore transition-all duration-300">
                    <span className="text-lg md:text-3xl font-black uppercase tracking-widest text-white drop-shadow-lg">
                      Узнать больше
                    </span>
                    <motion.div 
                      animate={{ y: [0, 8, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                    >
                      <ChevronDown className="w-7 h-7 text-rustore-light" />
                    </motion.div>
                  </div>
                </motion.button>
              )}
            </AnimatePresence>
          </div>
          
        </div>
      </div>
    </section>
  );
};
