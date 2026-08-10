"use client";

import React, { useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

interface MagneticButtonProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  range?: number;
}

export function MagneticButton({ 
  children, 
  className = "", 
  range = 30,
  ...props
}: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement>(null);
  
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  const springConfig = { damping: 20, stiffness: 200, mass: 0.2 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);
  
  const handlePointerMove = (e: React.PointerEvent) => {
    if (!ref.current) return;
    const { clientX, clientY } = e;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    
    const distanceX = clientX - centerX;
    const distanceY = clientY - centerY;
    
    // Shift coordinate values based on distance and range limit
    x.set(distanceX * 0.4);
    y.set(distanceY * 0.4);
  };
  
  const handlePointerLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <div 
      ref={ref} 
      onPointerMove={handlePointerMove} 
      onPointerLeave={handlePointerLeave} 
      className="inline-block"
      {...props}
    >
      <motion.div 
        style={{ x: springX, y: springY }} 
        className={className}
      >
        {children}
      </motion.div>
    </div>
  );
}

export default MagneticButton;
