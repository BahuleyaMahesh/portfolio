"use client";

import React from "react";
import { Terminal, ArrowRight, Activity, Compass } from "lucide-react";
import { activeProject, exploringFields } from "@/data/currently-building";
import GlassPanel from "../ui/GlassPanel";
import Reveal from "../ui/Reveal";

export function CurrentlyBuilding() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
      {/* Active Development Node */}
      <Reveal delay={0.1}>
        <GlassPanel glowOnHover gridBackground className="p-6 border-border-subtle">
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center space-x-2 text-accent font-mono text-[10px] tracking-widest uppercase">
              <Terminal size={12} className="animate-pulse" />
              <span>ACTIVE SYSTEM BUILD</span>
            </div>
            <span className="font-mono text-[9px] px-2 py-0.5 rounded bg-accent/15 border border-accent/20 text-accent animate-pulse">
              {activeProject.status}
            </span>
          </div>

          <h3 className="font-display font-black text-2xl text-text-primary uppercase tracking-wide">
            {activeProject.title}
          </h3>

          <div className="mt-6 space-y-4 font-mono text-[11px]">
            <div className="p-3.5 rounded border border-border-subtle bg-bg-dark/85">
              <span className="text-text-muted uppercase block mb-1">01 / CURRENT PIPELINE</span>
              <span className="text-text-primary font-bold">{activeProject.focus}</span>
            </div>
            
            <div className="p-3.5 rounded border border-border-subtle bg-bg-dark/85 flex items-center justify-between">
              <div>
                <span className="text-text-muted uppercase block mb-1">02 / NEXT NODE</span>
                <span className="text-text-secondary">{activeProject.next}</span>
              </div>
              <ArrowRight size={14} className="text-text-muted" />
            </div>
          </div>
        </GlassPanel>
      </Reveal>

      {/* R&D Exploration Node */}
      <Reveal delay={0.2}>
        <GlassPanel glowOnHover gridBackground className="p-6 border-border-subtle h-full flex flex-col justify-between">
          <div>
            <div className="flex items-center space-x-2 text-accent-secondary font-mono text-[10px] tracking-widest uppercase mb-4">
              <Compass size={12} />
              <span>R&D EXPLORATION MATRIX</span>
            </div>

            <h3 className="font-display font-black text-2xl text-text-primary uppercase tracking-wide">
              Vectors
            </h3>
            
            <p className="text-xs text-text-secondary mt-2 leading-relaxed">
              Actively investigating and prototyping algorithms, systems, and structures across these research spheres.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-2 mt-6">
            {exploringFields.map((field) => (
              <div 
                key={field} 
                className="p-3 rounded border border-border-subtle bg-bg-dark/80 hover:border-accent-secondary/30 hover:bg-bg-dark transition-colors font-mono text-[10px] text-text-secondary text-center uppercase tracking-wider"
              >
                {field}
              </div>
            ))}
          </div>
        </GlassPanel>
      </Reveal>
    </div>
  );
}

export default CurrentlyBuilding;
