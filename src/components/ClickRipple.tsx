import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { createPortal } from 'react-dom';

interface Ripple {
  id: number;
  x: number;
  y: number;
}

export const ClickRipple: React.FC = () => {
  const [ripples, setRipples] = useState<Ripple[]>([]);

  useEffect(() => {
    let idCounter = 0;
    
    const handleMouseDown = (e: MouseEvent) => {
      // Игнорируем правый клик
      if (e.button !== 0) return;

      const newRipple = {
        id: idCounter++,
        x: e.pageX,
        y: e.pageY
      };
      
      setRipples(prev => [...prev, newRipple]);

      // Удаляем круги из стейта после завершения анимации
      setTimeout(() => {
        setRipples(prev => prev.filter(r => r.id !== newRipple.id));
      }, 1000);
    };

    window.addEventListener('mousedown', handleMouseDown);
    return () => window.removeEventListener('mousedown', handleMouseDown);
  }, []);

  return createPortal(
    <div className="pointer-events-none absolute top-0 left-0 w-full h-full z-[99999] overflow-visible">
      <AnimatePresence>
        {ripples.map(ripple => (
          <motion.div
            key={ripple.id}
            className="absolute"
            style={{ left: ripple.x, top: ripple.y }}
          >
            {/* Первая, более яркая волна */}
            <motion.div
              initial={{ scale: 0, opacity: 0.8, borderWidth: '2px' }}
              animate={{ scale: 4, opacity: 0, borderWidth: '0px' }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="absolute -ml-6 -mt-6 w-12 h-12 rounded-full border-cyan-400"
              style={{
                boxShadow: '0 0 10px rgba(0, 229, 255, 0.4), inset 0 0 10px rgba(0, 229, 255, 0.4)'
              }}
            />
            {/* Вторая, чуть запаздывающая синяя волна (для эффекта "булька") */}
            <motion.div
              initial={{ scale: 0, opacity: 0.5, borderWidth: '2px' }}
              animate={{ scale: 3, opacity: 0, borderWidth: '0px' }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
              className="absolute -ml-6 -mt-6 w-12 h-12 rounded-full border-rustore"
              style={{
                boxShadow: '0 0 15px rgba(0, 91, 255, 0.5), inset 0 0 15px rgba(0, 91, 255, 0.5)'
              }}
            />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>,
    document.body
  );
};
