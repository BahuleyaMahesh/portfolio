"use client";

import React, { useEffect, useState, useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export function CustomCursor() {
  const [isVisible, setIsVisible] = useState(false);
  const [cursorType, setCursorType] = useState<"normal" | "pointer" | "explore">("normal");
  
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  
  const springConfig = { damping: 30, stiffness: 400, mass: 0.4 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);
  
  const isTouchDevice = useRef(false);

  useEffect(() => {
    // Check if it's a touch device or reduced motion is active
    const hasTouch = "ontouchstart" in window || navigator.maxTouchPoints > 0;
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    
    if (hasTouch || prefersReducedMotion) {
      isTouchDevice.current = true;
      return;
    }

    setIsVisible(true);
    document.body.classList.add("custom-cursor-active");

    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target) return;
      
      const isExplore = target.closest("[data-cursor-explore]");
      const isPointer = target.closest("a, button, select, input, [role='button'], [data-hoverable]");
      
      if (isExplore) {
        setCursorType("explore");
      } else if (isPointer) {
        setCursorType("pointer");
      } else {
        setCursorType("normal");
      }
    };

    const handleMouseLeaveWindow = () => {
      setIsVisible(false);
    };

    const handleMouseEnterWindow = () => {
      setIsVisible(true);
    };

    window.addEventListener("mousemove", moveCursor);
    window.addEventListener("mouseover", handleMouseOver);
    document.addEventListener("mouseleave", handleMouseLeaveWindow);
    document.addEventListener("mouseenter", handleMouseEnterWindow);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("mouseover", handleMouseOver);
      document.removeEventListener("mouseleave", handleMouseLeaveWindow);
      document.removeEventListener("mouseenter", handleMouseEnterWindow);
      document.body.classList.remove("custom-cursor-active");
    };
  }, [cursorX, cursorY]);

  if (isTouchDevice.current || !isVisible) return null;

  return (
    <>
      {/* Outer Ring */}
      <motion.div
        className="fixed top-0 left-0 rounded-full pointer-events-none z-[9999] mix-blend-difference flex items-center justify-center"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          translateX: "-50%",
          translateY: "-50%",
          width: cursorType === "explore" ? 72 : cursorType === "pointer" ? 44 : 20,
          height: cursorType === "explore" ? 72 : cursorType === "pointer" ? 44 : 20,
          border: cursorType === "normal" ? "1.5px solid rgba(0, 229, 255, 0.4)" : "1.5px solid rgba(0, 229, 255, 0.95)",
          backgroundColor: cursorType === "explore" ? "rgba(0, 229, 255, 0.15)" : "transparent",
        }}
        animate={{
          scale: 1,
        }}
      >
        {cursorType === "explore" && (
          <span className="text-[10px] font-mono tracking-widest font-bold text-accent uppercase select-none">
            Explore
          </span>
        )}
      </motion.div>

      {/* Inner Dot */}
      <motion.div
        className="fixed top-0 left-0 w-1.5 h-1.5 bg-accent rounded-full pointer-events-none z-[10000] mix-blend-difference"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          scale: cursorType === "normal" ? 1 : 0.4,
        }}
      />
    </>
  );
}

export default CustomCursor;
