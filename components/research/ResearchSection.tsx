"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, BookOpen, Layers } from "lucide-react";
import { researchTimeline, researchThemes } from "@/data/research";
import Reveal from "../ui/Reveal";
import GlassPanel from "../ui/GlassPanel";

export function ResearchSection() {
  // Take first 2 items for the homepage preview
  const previewTimeline = researchTimeline.slice(0, 2);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16">
      {/* Description & Themes */}
      <div className="lg:col-span-5 flex flex-col justify-between">
        <div>
          <Reveal delay={0.1}>
            <div className="flex items-center space-x-2 text-accent font-mono text-[10px] tracking-widest uppercase mb-4">
              <BookOpen size={12} />
              <span>Data Science Research Node</span>
            </div>
            
            <h3 className="font-display font-black text-3xl sm:text-4xl text-text-primary uppercase tracking-wide leading-tight mb-4">
              Centre of Excellence for Biomedical Analytics
            </h3>
            
            <p className="text-sm text-text-secondary leading-relaxed mb-6 font-sans">
              Conducting data-driven biological modeling at RVCE. Working on bioinformatics pipelines,
              statistical analysis, and chemical interaction simulations (using RDKit) to bridge computer science and modern molecular medicine.
            </p>
          </Reveal>

          {/* Research Themes list */}
          <div className="space-y-3.5 mb-8">
            {researchThemes.slice(0, 3).map((theme, idx) => (
              <Reveal key={theme.title} delay={0.15 + idx * 0.05}>
                <div className="flex items-start space-x-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-accent mt-1.5 flex-shrink-0" />
                  <div>
                    <h4 className="text-xs font-mono font-bold text-text-primary uppercase">
                      {theme.title}
                    </h4>
                    <p className="text-[11px] text-text-muted mt-0.5 leading-relaxed">
                      {theme.description}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        <Reveal delay={0.3}>
          <Link
            href="/research"
            className="inline-flex items-center space-x-2 px-5 py-3 rounded-lg border border-accent/30 hover:border-accent bg-accent/5 hover:bg-accent/15 text-accent font-mono text-xs font-bold tracking-widest transition-colors w-fit"
          >
            <span>EXPLORE RESEARCH SPECIFICATIONS</span>
            <ArrowRight size={14} />
          </Link>
        </Reveal>
      </div>

      {/* Timeline Snippet */}
      <div className="lg:col-span-7 flex flex-col space-y-4">
        <span className="font-mono text-[9px] text-text-muted uppercase tracking-widest mb-1 block">
          RESEARCH MILESTONES // CURRENT LOGS
        </span>
        
        <div className="space-y-4 relative before:absolute before:top-2 before:bottom-2 before:left-[17px] before:w-[1px] before:bg-border-subtle">
          {previewTimeline.map((item, idx) => (
            <Reveal key={item.id} delay={0.2 + idx * 0.1}>
              <div className="flex items-start space-x-5 relative group">
                {/* Timeline node */}
                <div className="w-9 h-9 rounded-full border border-border-subtle bg-bg-card flex items-center justify-center flex-shrink-0 z-10 group-hover:border-accent transition-colors">
                  <Layers size={14} className="text-text-muted group-hover:text-accent transition-colors" />
                </div>
                
                <GlassPanel glowOnHover className="p-5 flex-grow border-border-subtle">
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-1">
                    <div>
                      <h4 className="font-display font-bold text-text-primary text-base tracking-wide">
                        {item.title}
                      </h4>
                      <span className="font-mono text-[10px] text-text-muted">
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
                  
                  {/* Related Tags */}
                  <div className="flex flex-wrap gap-1 mt-4">
                    {item.themes.map((t) => (
                      <span key={t} className="text-[9px] font-mono px-2 py-0.5 rounded bg-bg-dark text-text-muted">
                        {t}
                      </span>
                    ))}
                  </div>
                </GlassPanel>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ResearchSection;
