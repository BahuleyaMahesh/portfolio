"use client";

import React from "react";
import { Terminal, Cpu, Settings, Activity, Shield } from "lucide-react";
import { Project } from "@/types/project";

interface ProjectMediaPlaceholderProps {
  project: Project;
  className?: string;
}

export function ProjectMediaPlaceholder({ project, className = "" }: ProjectMediaPlaceholderProps) {
  const Icon = project.category.includes("Healthcare") 
    ? Activity 
    : project.category.includes("Cybersecurity")
      ? Shield
      : project.category.includes("Robotics") || project.category.includes("Embedded")
        ? Settings
        : Cpu;

  return (
    <div className={`relative w-full h-full min-h-[300px] bg-bg-dark border border-border-subtle rounded-lg overflow-hidden flex flex-col justify-between p-6 select-none font-mono ${className}`}>
      {/* Grid background */}
      <div className="absolute inset-0 bg-grid-pattern opacity-20" />
      
      {/* Technical scanning overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-accent/5 to-transparent pointer-events-none animate-scanline" style={{ backgroundSize: "100% 200px" }} />
      
      {/* Corner brackets */}
      <div className="absolute top-3 left-3 w-3 h-3 border-t border-l border-text-muted" />
      <div className="absolute top-3 right-3 w-3 h-3 border-t border-r border-text-muted" />
      <div className="absolute bottom-3 left-3 w-3 h-3 border-b border-l border-text-muted" />
      <div className="absolute bottom-3 right-3 w-3 h-3 border-b border-r border-text-muted" />

      {/* Header telemetry info */}
      <div className="flex justify-between items-start text-[9px] text-text-muted z-10">
        <div className="flex items-center space-x-2">
          <Terminal size={10} className="text-accent animate-pulse" />
          <span>SPEC_SYS_LOG // NODE_{project.number}</span>
        </div>
        <div>
          <span>STATUS: {project.status?.toUpperCase() || "READY"}</span>
        </div>
      </div>

      {/* Center diagram graphic */}
      <div className="flex flex-col items-center justify-center z-10 flex-grow py-8">
        <div className="relative w-16 h-16 rounded-full border border-accent/25 flex items-center justify-center bg-accent/5 mb-4 shadow-[0_0_20px_rgba(0,229,255,0.05)]">
          <Icon className="w-8 h-8 text-accent animate-pulse" />
          <div className="absolute inset-0 rounded-full border border-dashed border-accent-secondary/30 animate-[spin_40s_linear_infinite]" />
        </div>
        <span className="text-sm font-display font-semibold tracking-widest text-text-primary uppercase mb-1">
          {project.title}
        </span>
        <span className="text-[10px] text-text-muted tracking-wider text-center max-w-[80%] line-clamp-1">
          {project.subtitle}
        </span>
      </div>

      {/* Footer metadata printout */}
      <div className="border-t border-border-subtle/50 pt-3 z-10 flex flex-col space-y-1.5 text-[9px] text-text-muted">
        <div className="flex justify-between">
          <span>CATEGORIES:</span>
          <span className="text-text-secondary">{project.category.join(" / ")}</span>
        </div>
        <div className="flex justify-between">
          <span>HARDWARE/SOFTWARE STACK:</span>
          <span className="text-accent truncate max-w-[70%]">{project.technologies.join(" · ")}</span>
        </div>
        {project.architecture && (
          <div className="flex justify-between">
            <span>PIPELINE DEPTH:</span>
            <span className="text-text-secondary font-bold">{project.architecture.nodes.length} SEQUENTIAL NODES</span>
          </div>
        )}
      </div>
    </div>
  );
}

export default ProjectMediaPlaceholder;
