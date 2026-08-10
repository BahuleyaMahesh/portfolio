"use client";

import React from "react";
import { BookOpen, Calendar, HelpCircle, ShieldAlert, Cpu } from "lucide-react";
import { researchTimeline, researchThemes } from "@/data/research";
import PageTransition from "@/components/layout/PageTransition";
import SectionHeading from "@/components/ui/SectionHeading";
import GlassPanel from "@/components/ui/GlassPanel";
import Reveal from "@/components/ui/Reveal";

export default function ResearchPage() {
  return (
    <PageTransition>
      <main className="max-w-7xl mx-auto px-6 sm:px-12 pt-32 pb-24 flex-grow w-full">
        {/* Editorial Heading */}
        <Reveal delay={0.1}>
          <SectionHeading
            number="02"
            title="Research Lab"
            subtitle="GENOMIC & COMPUTATIONAL BIOLOGY OPERATIONS"
          />
        </Reveal>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Context & Themes */}
          <div className="lg:col-span-5 space-y-8 lg:sticky lg:top-28">
            <Reveal delay={0.15}>
              <GlassPanel gridBackground className="p-6 border-border-subtle">
                <span className="font-mono text-[9px] text-accent tracking-widest uppercase block mb-3">
                  LAB IDENTIFICATION
                </span>
                <h3 className="font-display font-bold text-text-primary text-xl uppercase tracking-wide">
                  CoE for Computational Genomics
                </h3>
                <p className="text-xs text-text-secondary mt-3 leading-relaxed font-sans">
                  The Centre of Excellence for Computational Genomics (CoE-CG) at RV College of Engineering 
                  focuses on processing massive genomic sequences, modeling healthcare analytics parameters, 
                  and analyzing biological datasets. By marrying computer science algorithms (AI/ML) with 
                  molecular biology, we build reproducible pipelines that extract clinical indicators.
                </p>
              </GlassPanel>
            </Reveal>

            {/* Core Research Themes */}
            <div className="space-y-4">
              <span className="font-mono text-[9px] text-text-muted uppercase tracking-widest block pl-2">
                ACTIVE VECTORS // RESEARCH SCHEMAS
              </span>
              
              <div className="space-y-3">
                {researchThemes.map((theme, idx) => (
                  <Reveal key={theme.title} delay={0.2 + idx * 0.05}>
                    <div className="p-4 rounded-lg border border-border-subtle bg-bg-card/45 backdrop-blur-sm flex items-start space-x-3.5">
                      <div className="w-1.5 h-1.5 rounded-full bg-accent mt-2 flex-shrink-0" />
                      <div>
                        <h4 className="text-xs font-mono font-bold text-text-primary uppercase">
                          {theme.title}
                        </h4>
                        <p className="text-[11px] text-text-muted mt-1 leading-relaxed">
                          {theme.description}
                        </p>
                      </div>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Detailed Timeline */}
          <div className="lg:col-span-7 space-y-6">
            <span className="font-mono text-[9px] text-text-muted uppercase tracking-widest block pl-2 mb-4">
              CHRONOLOGICAL OPERATIONS TIMELINE
            </span>

            <div className="space-y-6 relative before:absolute before:top-2 before:bottom-2 before:left-[17px] before:w-[1px] before:bg-border-subtle">
              {researchTimeline.map((item, idx) => (
                <Reveal key={item.id} delay={0.25 + idx * 0.08}>
                  <div className="flex items-start space-x-5 relative group">
                    {/* Circle Node indicator */}
                    <div className="w-9 h-9 rounded-full border border-border-subtle bg-bg-card flex items-center justify-center flex-shrink-0 z-10 group-hover:border-accent transition-colors">
                      <Calendar size={14} className="text-text-muted group-hover:text-accent transition-colors" />
                    </div>

                    <GlassPanel glowOnHover className="p-6 flex-grow border-border-subtle">
                      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-1">
                        <div>
                          <h4 className="font-display font-bold text-text-primary text-lg tracking-wide uppercase">
                            {item.title}
                          </h4>
                          <span className="font-mono text-[10px] text-accent">
                            {item.role} · {item.institution}
                          </span>
                        </div>
                        <span className="font-mono text-[10px] px-2 py-0.5 rounded border border-border-subtle bg-bg-dark text-text-muted w-fit">
                          {item.period}
                        </span>
                      </div>

                      <p className="text-xs text-text-secondary mt-3 leading-relaxed font-sans">
                        {item.description}
                      </p>

                      {/* Technical Details bullet list */}
                      <ul className="mt-4 pt-4 border-t border-border-subtle/50 space-y-2 text-xs text-text-secondary font-sans">
                        {item.details.map((detail, dIdx) => (
                          <li key={dIdx} className="flex items-start">
                            <span className="text-accent mr-3 font-mono">▸</span>
                            <span>{detail}</span>
                          </li>
                        ))}
                      </ul>

                      {/* Overlapping theme tags */}
                      <div className="flex flex-wrap gap-1 mt-6">
                        {item.themes.map((theme) => (
                          <span key={theme} className="text-[9px] font-mono px-2 py-0.5 rounded bg-bg-dark border border-border-subtle/60 text-text-muted">
                            {theme}
                          </span>
                        ))}
                      </div>
                    </GlassPanel>
                  </div>
                </Reveal>
              ))}
            </div>
            
            {/* Warning banner regarding publications */}
            <Reveal delay={0.4}>
              <div className="p-4 rounded-lg border border-border-subtle bg-bg-card/10 text-center font-mono text-[10px] text-text-muted">
                // SYSTEM NOTE: ZERO DOCKETED PUBLICATIONS PRE-COMPILED. ALL ACTIVE OUTCOMES REMAIN INTERNAL WORKFLOWS.
              </div>
            </Reveal>
          </div>
        </div>
      </main>
    </PageTransition>
  );
}
