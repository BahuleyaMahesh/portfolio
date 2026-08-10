"use client";

import React from "react";
import { FlaskConical, Cpu, HeartPulse } from "lucide-react";
import PageTransition from "@/components/layout/PageTransition";
import SectionHeading from "@/components/ui/SectionHeading";
import GlassPanel from "@/components/ui/GlassPanel";
import Reveal from "@/components/ui/Reveal";

const workItems = [
  {
    icon: HeartPulse,
    tag: "AI IN HEALTH // HACKATHONS",
    title: "AI-Powered Health MVPs",
    period: "2024 — Present",
    description:
      "Built several minimum-viable products tackling real healthcare problem statements across competitive hackathons. Projects range from voice-based patient monitoring to early-triage decision-support tools that are  all focused on making AI genuinely useful in clinical or rural health contexts.",
    details: [
      "Designed and shipped SETU, a voice-based patient monitoring system for rural ASHA workers, using FastAPI and Web Speech API integrated with Groq LLM.",
      "Prototyped clinical decision-support interfaces that distil patient vitals and symptom data into actionable triage flags.",
      "Explored how lightweight LLMs and NLP pipelines can bridge the language and literacy gap in low-resource healthcare settings.",
    ],
    tags: ["LLM Integration", "FastAPI", "Voice AI", "Healthcare UX", "Hackathon"],
  },
  {
    icon: Cpu,
    tag: "COMPUTER VISION // BAJA SAE",
    title: "Terrain Recognition Model — BAJA SAE",
    period: "2025",
    description:
      "Trained a convolutional terrain-classification model for the HELIOS BAJA SAE off-road vehicle. The model classifies terrain types from camera input in real time, feeding into the vehicle's navigation and traction-control stack to adapt driving behaviour on mud, gravel, and packed dirt.",
    details: [
      "Collected and labelled a custom dataset of off-road terrain images across multiple surface types encountered in BAJA events.",
      "Fine-tuned a lightweight CNN (MobileNet backbone) optimised for edge inference on the on-board compute unit.",
      "Integrated classification output as a soft signal into the PID-based steering and speed-control loop.",
    ],
    tags: ["CNN", "MobileNet", "Edge Inference", "Computer Vision", "BAJA SAE", "Embedded Systems"],
  },
];

export default function ResearchPage() {
  return (
    <PageTransition>
      <main className="max-w-7xl mx-auto px-6 sm:px-12 pt-32 pb-24 flex-grow w-full space-y-16">
        {/* Heading */}
        <Reveal delay={0.1}>
          <SectionHeading
            number="02"
            title="Applied Work"
            subtitle="HACKATHONS · MODELS · REAL-WORLD PROBLEM STATEMENTS"
          />
        </Reveal>

        {/* Intro blurb */}
        <Reveal delay={0.15}>
          <div className="flex items-start space-x-3 max-w-2xl">
            <FlaskConical size={14} className="text-accent mt-0.5 flex-shrink-0" />
            <p className="text-sm text-text-secondary leading-relaxed font-sans">
              My applied work lives outside lecture halls — in hackathons, on BAJA tracks, and in late-night build sessions.
              These are the problem statements I chose to solve, the MVPs I shipped under pressure, and the models I trained
              to prove an idea works.
            </p>
          </div>
        </Reveal>

        {/* Work cards */}
        <div className="space-y-10">
          {workItems.map((item, idx) => {
            const Icon = item.icon;
            return (
              <Reveal key={item.title} delay={0.2 + idx * 0.1}>
                <GlassPanel glowOnHover gridBackground className="p-8 border-border-subtle">
                  {/* Header */}
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-6">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 rounded border border-accent/20 bg-accent/5 text-accent">
                        <Icon size={16} />
                      </div>
                      <div>
                        <span className="font-mono text-[9px] text-accent tracking-widest uppercase block">
                          {item.tag}
                        </span>
                        <h3 className="font-display font-bold text-text-primary text-xl uppercase tracking-wide mt-0.5">
                          {item.title}
                        </h3>
                      </div>
                    </div>
                    <span className="font-mono text-[10px] px-2 py-0.5 rounded border border-border-subtle bg-bg-dark text-text-muted w-fit self-start">
                      {item.period}
                    </span>
                  </div>

                  {/* Description */}
                  <p className="text-sm text-text-secondary leading-relaxed font-sans mb-6">
                    {item.description}
                  </p>

                  {/* Bullets */}
                  <ul className="space-y-2 border-t border-border-subtle/50 pt-5 mb-6">
                    {item.details.map((d, dIdx) => (
                      <li key={dIdx} className="flex items-start text-xs text-text-secondary font-sans">
                        <span className="text-accent mr-3 font-mono flex-shrink-0">▸</span>
                        <span>{d}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5">
                    {item.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[9px] font-mono px-2 py-0.5 rounded bg-bg-dark border border-border-subtle/60 text-text-muted"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </GlassPanel>
              </Reveal>
            );
          })}
        </div>

        {/* Footer note */}
        <Reveal delay={0.45}>
          <div className="p-4 rounded-lg border border-border-subtle bg-bg-card/10 text-center font-mono text-[10px] text-text-muted">
            // MORE PROBLEM STATEMENTS IN PROGRESS. OUTCOMES SHIP WHEN THEY ARE READY.
          </div>
        </Reveal>
      </main>
    </PageTransition>
  );
}
