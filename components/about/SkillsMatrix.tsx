"use client";

import React from "react";
import { skillCategories } from "@/data/skills";
import GlassPanel from "../ui/GlassPanel";
import Reveal from "../ui/Reveal";

export function SkillsMatrix() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {skillCategories.map((category, idx) => (
        <Reveal key={category.name} delay={idx * 0.08}>
          <GlassPanel 
            glowOnHover 
            gridBackground
            className="p-6 flex flex-col justify-between h-full border-border-subtle"
          >
            <div>
              {/* Category Name */}
              <h3 className="font-display font-semibold tracking-wider text-base text-accent mb-2">
                {category.name}
              </h3>
              
              {/* Category Description */}
              {category.description && (
                <p className="text-xs text-text-muted leading-relaxed mb-4">
                  {category.description}
                </p>
              )}
            </div>

            {/* Skills Badges */}
            <div className="flex flex-wrap gap-1.5 mt-auto">
              {category.skills.map((skill) => (
                <span
                  key={skill}
                  className="px-2.5 py-1 rounded bg-bg-dark/80 border border-border-subtle hover:border-accent/30 hover:text-accent font-mono text-[10px] text-text-secondary transition-colors"
                >
                  {skill}
                </span>
              ))}
            </div>
          </GlassPanel>
        </Reveal>
      ))}
    </div>
  );
}

export default SkillsMatrix;
