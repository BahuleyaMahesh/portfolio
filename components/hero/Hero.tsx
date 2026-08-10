"use client";

import React from "react";
import Link from "next/link";
import { ArrowDown, FileText, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { siteConfig } from "@/data/site";
import { fadeUp, staggerContainer } from "@/lib/motion";
import HeroSystemMap from "./HeroSystemMap";
import StatusPanel from "./StatusPanel";
import MagneticButton from "../ui/MagneticButton";

export function Hero() {
  const handleScrollToWork = (e: React.MouseEvent) => {
    e.preventDefault();
    const target = document.getElementById("selected-work");
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative min-h-screen flex flex-col justify-center items-center overflow-hidden pt-28 pb-16 px-6 sm:px-12 bg-bg-dark">
      {/* 2D Nodes Canvas Backdrop */}
      <HeroSystemMap />

      {/* Grid Scanline Overlay */}
      <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none z-0" />
      <div className="absolute inset-0 bg-grid-glow pointer-events-none z-0" />

      {/* Main Text Content */}
      <div className="relative z-10 max-w-5xl text-center flex flex-col items-center justify-center flex-grow">
        <motion.div
          variants={staggerContainer(0.12, 0.1)}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-center"
        >
          {/* Subtle Tagline Badge */}
          <motion.div
            variants={fadeUp(0.6)}
            className="flex items-center space-x-2 px-3 py-1.5 rounded-full border border-accent/20 bg-accent/5 backdrop-blur-md mb-6"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-accent"></span>
            </span>
            <span className="font-mono text-[9px] tracking-widest text-accent uppercase font-bold">
              AI / ML LAB ENTRYPOINT ONLINE
            </span>
          </motion.div>

          {/* Headline Display */}
          <motion.h1
            variants={fadeUp(0.8)}
            className="font-display font-black text-4xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tighter text-text-primary uppercase leading-[0.9] text-center"
          >
            Building systems <br />
            that can <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-accent-secondary">think</span>, <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent via-accent-secondary to-accent">see</span> & <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-secondary to-accent">act</span>.
          </motion.h1>

          {/* Supporting Copy */}
          <motion.p
            variants={fadeUp(0.8, 0.2)}
            className="text-sm sm:text-base md:text-lg text-text-secondary max-w-2xl mt-8 leading-relaxed font-sans"
          >
            {siteConfig.description}
          </motion.p>

          {/* Action CTAs */}
          <motion.div
            variants={fadeUp(0.8, 0.3)}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-10 w-full sm:w-auto"
          >
            <MagneticButton>
              <a
                href="#selected-work"
                onClick={handleScrollToWork}
                className="flex items-center space-x-2 px-6 py-3.5 rounded-lg bg-text-primary hover:bg-accent text-bg-dark font-mono text-xs font-bold tracking-widest transition-all duration-300 w-full sm:w-auto text-center justify-center"
              >
                <span>VIEW MY WORK</span>
                <ArrowRight size={14} />
              </a>
            </MagneticButton>

            <MagneticButton>
              <a
                href={siteConfig.resume}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 px-6 py-3.5 rounded-lg border border-border-subtle hover:border-accent/40 bg-bg-card/40 hover:bg-accent/5 text-text-secondary hover:text-accent font-mono text-xs font-bold tracking-widest transition-all duration-300 w-full sm:w-auto text-center justify-center"
              >
                <FileText size={14} />
                <span>DOWNLOAD RESUME</span>
              </a>
            </MagneticButton>
          </motion.div>
        </motion.div>
      </div>

      {/* Telemetry Status Panel */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.6 }}
        className="relative z-10 w-full mt-auto"
      >
        <StatusPanel />
      </motion.div>

      {/* Scroll Down Chevron */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.6 }}
        className="absolute bottom-4 left-1/2 -translate-x-1/2 hidden md:block text-text-muted hover:text-accent cursor-pointer"
        onClick={handleScrollToWork}
      >
        <motion.div
          animate={{ y: [0, 4, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
        >
          <ArrowDown size={18} />
        </motion.div>
      </motion.div>
    </section>
  );
}

export default Hero;
