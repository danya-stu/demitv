import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence, useMotionValue } from 'framer-motion';

const CursorArrow = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="drop-shadow-[0_5px_10px_rgba(0,91,255,0.6)]">
    <path d="M1 1 L9.5 22 L13 14 L21 10.5 L1 1Z" fill="url(#arrowGrad)" stroke="white" strokeWidth="1.5" strokeLinejoin="round"/>
    <defs>
      <linearGradient id="arrowGrad" x1="1" y1="1" x2="21" y2="22" gradientUnits="userSpaceOnUse">
        <stop stopColor="#2B7CFF" />
        <stop offset="1" stopColor="#00E5FF" />
      </linearGradient>
    </defs>
  </svg>
);

const CursorHand = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="drop-shadow-[0_5px_15px_rgba(34,211,238,0.8)]">
    <g transform="translate(-8, 0)">
      <path d="M9 1v7H6a2 2 0 0 0-2 2v2l2 8h8l3-8v-3a2 2 0 0 0-2-2h-3V3a2 2 0 0 0-4 0z" fill="url(#handGrad)" stroke="white" strokeWidth="1.5" strokeLinejoin="round" />
    </g>
    <defs>
      <linearGradient id="handGrad" x1="4" y1="1" x2="17" y2="20" gradientUnits="userSpaceOnUse">
        <stop stopColor="#00E5FF" />
        <stop offset="1" stopColor="#2B7CFF" />
      </linearGradient>
    </defs>
  </svg>
);

export const CustomCursor: React.FC = () => {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.tagName.toLowerCase() === 'a' || target.closest('a') || 
          target.tagName.toLowerCase() === 'button' || target.closest('button')) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('mouseover', handleMouseOver);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    
    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mouseover', handleMouseOver);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [cursorX, cursorY]);

  // If on mobile, don't show custom cursor
  if (typeof window !== 'undefined' && window.innerWidth < 768) {
    return null;
  }

  return (
    <motion.div
      className="fixed top-0 left-0 pointer-events-none z-[10000]"
      style={{
        x: cursorX,
        y: cursorY,
        // Offset slightly to perfectly align the visual tip of the SVG with the actual hardware click coordinate (0,0)
        translateX: '-1px',
        translateY: '-1px'
      }}
      animate={{
        scale: isClicking ? 0.8 : 1,
        rotate: isClicking ? -5 : 0
      }}
      transition={{ duration: 0.15 }}
    >
      <AnimatePresence mode="wait">
        {isHovering ? (
          <motion.div
            key="hand"
            initial={{ opacity: 0, scale: 0.8, rotate: 10 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            exit={{ opacity: 0, scale: 0.8, rotate: -10 }}
            transition={{ duration: 0.15 }}
          >
            <CursorHand />
          </motion.div>
        ) : (
          <motion.div
            key="arrow"
            initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            exit={{ opacity: 0, scale: 0.8, rotate: 10 }}
            transition={{ duration: 0.15 }}
          >
            <CursorArrow />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};
