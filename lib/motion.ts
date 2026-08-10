import { Variants } from "framer-motion";

export const fadeIn = (duration = 0.5, delay = 0): Variants => ({
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1, 
    transition: { duration, delay, ease: "easeOut" } 
  }
});

export const fadeUp = (duration = 0.6, delay = 0): Variants => ({
  hidden: { opacity: 0, y: 24 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration, delay, ease: [0.215, 0.61, 0.355, 1] } 
  }
});

export const fadeDown = (duration = 0.6, delay = 0): Variants => ({
  hidden: { opacity: 0, y: -20 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration, delay, ease: [0.215, 0.61, 0.355, 1] } 
  }
});

export const staggerContainer = (staggerChildren = 0.1, delayChildren = 0): Variants => ({
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren,
      delayChildren
    }
  }
});

export const scaleIn = (duration = 0.5, delay = 0): Variants => ({
  hidden: { opacity: 0, scale: 0.94 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration, delay, ease: "easeOut" }
  }
});

export const slideIn = (direction: "left" | "right" | "up" | "down", duration = 0.6, delay = 0): Variants => {
  const directions = {
    left: { x: -40, y: 0 },
    right: { x: 40, y: 0 },
    up: { x: 0, y: 40 },
    down: { x: 0, y: -40 }
  };
  
  return {
    hidden: { 
      opacity: 0, 
      ...directions[direction] 
    },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: { duration, delay, ease: [0.25, 1, 0.5, 1] }
    }
  };
};

export const pageTransition: Variants = {
  hidden: { opacity: 0, y: 8 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.5, ease: "easeOut" } 
  },
  exit: { 
    opacity: 0, 
    y: -8, 
    transition: { duration: 0.3, ease: "easeIn" } 
  }
};
