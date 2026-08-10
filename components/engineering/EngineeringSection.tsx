"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, Cpu, HardDrive } from "lucide-react";
import { projects } from "@/data/projects";
import ArchitectureGraph from "../visualizations/ArchitectureGraph";
import Reveal from "../ui/Reveal";

export function EngineeringSection() {
  // Retrieve HELIOS project data to render its architecture dynamically
  const heliosProject = projects.find((p) => p.slug === "helios-baja");

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center">
      {/* Visual Architecture Column */}
      <div className="lg:col-span-7 order-2 lg:order-1">
        <Reveal delay={0.1}>
          <div className="border border-border-subtle rounded-xl bg-bg-card/20 p-5 md:p-8">
            <span className="font-mono text-[9px] text-text-muted uppercase tracking-widest block mb-4">
              PERCEPTION-ACTUATION SYSTEM DIAGRAM
            </span>
            {heliosProject?.architecture ? (
              <ArchitectureGraph architecture={heliosProject.architecture} />
            ) : (
              <div className="h-48 flex items-center justify-center font-mono text-xs text-text-muted">
                Failed to load system architecture coordinates.
              </div>
            )}
          </div>
        </Reveal>
      </div>

      {/* Description Column */}
      <div className="lg:col-span-5 order-1 lg:order-2 flex flex-col justify-center">
        <Reveal delay={0.2}>
          <div className="flex items-center space-x-2 text-accent font-mono text-[10px] tracking-widest uppercase mb-4">
            <Cpu size={12} />
            <span>Physical Systems Integration</span>
          </div>

          <h3 className="font-display font-black text-3xl sm:text-4xl text-text-primary uppercase tracking-wide leading-tight mb-4">
            Vehicle Intelligence & Embedded Control
          </h3>

          <p className="text-sm text-text-secondary leading-relaxed mb-6 font-sans">
            Designing low-latency physical systems for the HELIOS BAJA SAE vehicle. 
            Integrating steer-by-wire controls, sensor-fusion nodes (camera + radar + IMU), 
            and rugged edge estimation algorithms on ESP32/Arduino microcontrollers.
          </p>

          {/* Key metrics / specs */}
          <div className="grid grid-cols-2 gap-4 mb-8 font-mono text-[10px]">
            <div className="p-3.5 rounded border border-border-subtle bg-bg-card/30">
              <span className="text-text-muted block uppercase mb-1">EDGE COMPUTING</span>
              <span className="text-text-primary font-bold">ESP32 / RTOS LOOPS</span>
            </div>
            <div className="p-3.5 rounded border border-border-subtle bg-bg-card/30">
              <span className="text-text-muted block uppercase mb-1">SENSOR FUSION</span>
              <span className="text-text-primary font-bold">RADAR + VISION IMU</span>
            </div>
          </div>

          <div className="flex items-center space-x-6">
            <Link
              href="/projects/helios-baja"
              className="flex items-center space-x-2 text-text-primary hover:text-accent font-mono text-xs font-bold tracking-widest transition-colors group"
            >
              <span>VIEW SYSTEM DETAILS</span>
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </Reveal>
      </div>
    </div>
  );
}

export default EngineeringSection;
