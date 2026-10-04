import React, { useState, useEffect } from 'react';
import { motion, useScroll } from 'framer-motion';
import { Download } from 'lucide-react';

export const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const { scrollYProgress } = useScroll();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled 
          ? 'bg-[#050505]/80 backdrop-blur-lg py-3 shadow-[0_4px_30px_rgba(0,0,0,0.5)]' 
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        
        {/* Logo Section */}
        <div className={`flex items-center gap-3 transition-opacity duration-300 ${scrolled ? 'opacity-100' : 'opacity-0'}`}>
          <img 
            src="/logo.png" 
            alt="Dёmi TV Logo" 
            className="w-10 h-10 rounded-xl object-cover shadow-lg shadow-rustore/20"
          />
          <span className="text-xl font-bold tracking-tight text-white">
            Dёmi
          </span>
        </div>

        {/* Download Button */}
        <a 
          href="https://www.rustore.ru/catalog/app/com.ultratv.app" 
          target="_blank" 
          rel="noopener noreferrer"
          className={`flex items-center gap-2 px-5 py-2.5 rounded-full font-bold transition-all duration-300 ${
            scrolled 
              ? 'bg-rustore hover:bg-rustore-light text-white shadow-[0_0_20px_rgba(0,91,255,0.4)] hover:scale-105' 
              : 'bg-white/10 hover:bg-white/20 text-white backdrop-blur-md border border-white/10'
          }`}
        >
          <Download className="w-4 h-4" />
          <span>Скачать <span className="hidden sm:inline">в RuStore</span></span>
        </a>
        
        
      </div>

      {/* Custom Scroll Progress Bar */}
      <motion.div 
        className={`absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-rustore-light to-rustore origin-left z-50 transition-opacity duration-300 ${scrolled ? 'opacity-100' : 'opacity-0'}`}
        style={{ scaleX: scrollYProgress }}
      />
    </motion.nav>
  );
};
