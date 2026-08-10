"use client";

import React from "react";
import { motion } from "framer-motion";
import { pageTransition } from "@/lib/motion";

interface PageTransitionProps {
  children: React.ReactNode;
}

export function PageTransition({ children }: PageTransitionProps) {
  return (
    <motion.div
      variants={pageTransition}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="w-full flex flex-col flex-grow"
    >
      {children}
    </motion.div>
  );
}

export default PageTransition;
