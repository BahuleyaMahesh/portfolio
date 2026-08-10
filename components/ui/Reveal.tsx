"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { fadeUp, slideIn } from "@/lib/motion";

interface RevealProps {
  children: React.ReactNode;
  width?: "fit-content" | "100%";
  delay?: number;
  duration?: number;
  className?: string;
  direction?: "up" | "left" | "right" | "down";
}

export function Reveal({ children, width = "100%", delay = 0, duration = 0.6, className = "", direction }: RevealProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  const variants = direction ? slideIn(direction, duration, delay) : fadeUp(duration, delay);

  return (
    <div ref={ref} className={className} style={{ position: "relative", width }}>
      <motion.div
        variants={variants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        {children}
      </motion.div>
    </div>
  );
}
export default Reveal;

