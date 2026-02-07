
import React, { useEffect, useState } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';

interface CustomCursorProps {
  theme?: 'dark' | 'light';
}

const CustomCursor: React.FC<CustomCursorProps> = ({ theme = 'dark' }) => {
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springConfig = { damping: 25, stiffness: 250 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    const handleHover = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      setIsHovering(!!target.closest('a, button, [data-cursor="pointer"]'));
    };

    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('mouseover', handleHover);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('mouseover', handleHover);
    };
  }, []);

  const cursorColor = theme === 'dark' ? '#22d3ee' : '#0891b2';

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 rounded-full border z-[9999] pointer-events-none hidden md:block"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          translateX: '-50%',
          translateY: '-50%',
          borderColor: cursorColor,
          mixBlendMode: theme === 'dark' ? 'difference' : 'normal',
        }}
        animate={{
          scale: isHovering ? 2 : isClicking ? 0.8 : 1,
          backgroundColor: isHovering ? `${cursorColor}33` : 'rgba(34, 211, 238, 0)',
        }}
      />
      <motion.div
        className="fixed top-0 left-0 w-2 h-2 rounded-full z-[10000] pointer-events-none hidden md:block"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: '-50%',
          translateY: '-50%',
          backgroundColor: cursorColor,
        }}
        animate={{
          scale: isClicking ? 1.5 : 1,
        }}
      />
    </>
  );
};

export default CustomCursor;
