"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, UserCheck, Code } from "lucide-react";
import Reveal from "../ui/Reveal";
import GlassPanel from "../ui/GlassPanel";

export function AboutSection() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center">
      {/* Bio Copy */}
      <div className="lg:col-span-6 flex flex-col justify-center">
        <Reveal delay={0.1}>
          <div className="flex items-center space-x-2 text-accent font-mono text-[10px] tracking-widest uppercase mb-4">
            <UserCheck size={12} />
            <span>Personnel Profile Node</span>
          </div>

          <h3 className="font-display font-black text-3xl sm:text-4xl text-text-primary uppercase tracking-wide leading-tight mb-4">
            Engineering Intelligences
          </h3>

          <p className="text-sm text-text-secondary leading-relaxed mb-6 font-sans">
            Currently pursuing Computer Science (AI & ML) at RV College of Engineering.
            I build systems that bridge software intelligence, hardware control, and health.
            From local cognitive planners to autonomous navigation stacks and processing pipelines,
            I thrive at the intersection of complex math and concrete implementation.
          </p>
        </Reveal>

        {/* Core Principles */}
        <div className="space-y-4 mb-8">
          <Reveal delay={0.2}>
            <div className="flex items-start space-x-3">
              <div className="p-1.5 rounded border border-accent/20 bg-accent/5 text-accent mt-0.5">
                <Code size={12} />
              </div>
              <div>
                <h4 className="text-xs font-mono font-bold text-text-primary uppercase">
                  Maintainability over Hype
                </h4>
                <p className="text-[11px] text-text-muted mt-0.5 leading-relaxed">
                  Clean separation of content and presentation. Writing code that is structured, robust, and self-documenting.
                </p>
              </div>
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.3}>
          <Link
            href="/about"
            className="inline-flex items-center space-x-2 px-5 py-3 rounded-lg border border-accent/30 hover:border-accent bg-accent/5 hover:bg-accent/15 text-accent font-mono text-xs font-bold tracking-widest transition-colors w-fit"
          >
            <span>MORE ABOUT ME</span>
            <ArrowRight size={14} />
          </Link>
        </Reveal>
      </div>

      {/* Visual Identity Block */}
      <div className="lg:col-span-6">
        <Reveal delay={0.2} direction="right">
          <GlassPanel
            glowOnHover
            gridBackground
            className="p-8 border-border-subtle relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 p-4 font-mono text-[8px] text-text-muted">
              ENG_PARAM // 2024-2028
            </div>

            <div className="space-y-6">
              <div>
                <span className="font-mono text-[9px] text-accent tracking-widest uppercase block mb-1">
                  Education Credential
                </span>
                <h4 className="font-display font-bold text-text-primary text-lg">
                  RV College of Engineering (RVCE)
                </h4>
                <p className="text-xs text-text-secondary mt-1">
                  B.E. Computer Science (AI & ML)
                </p>
                <p className="text-[10px] text-text-muted mt-1 font-mono">
                  Current Term: Undergraduate (Y2)
                </p>
              </div>

              <div className="border-t border-border-subtle/50 pt-4">
                <span className="font-mono text-[9px] text-accent tracking-widest uppercase block mb-2">
                  Primary Vector Focuses
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {["Cognitive AI", "Computer Vision", "Computational Biology", "Embedded Control"].map((f) => (
                    <span
                      key={f}
                      className="px-2.5 py-1 rounded bg-bg-dark border border-border-subtle font-mono text-[9px] text-text-secondary"
                    >
                      {f.toUpperCase()}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </GlassPanel>
        </Reveal>
      </div>
    </div>
  );
}

export default AboutSection;
