"use client";

import React from "react";
import { User, BookOpen, GraduationCap, Flame, Coffee, Bike, PenTool, Book } from "lucide-react";
import { educationList, experienceList } from "@/data/experience";
import SkillsMatrix from "@/components/about/SkillsMatrix";
import PageTransition from "@/components/layout/PageTransition";
import SectionHeading from "@/components/ui/SectionHeading";
import GlassPanel from "@/components/ui/GlassPanel";
import Reveal from "@/components/ui/Reveal";

export default function AboutPage() {
  return (
    <PageTransition>
      <main className="max-w-7xl mx-auto px-6 sm:px-12 pt-32 pb-24 flex-grow w-full space-y-24">
        {/* Editorial Heading */}
        <Reveal delay={0.1}>
          <SectionHeading
            number="03"
            title="Personnel File"
            subtitle="BIOGRAPHY, EXPERIENCE & INTELLECT"
          />
        </Reveal>

        {/* Section 1: Biography & Philosophy */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start">
          <div className="lg:col-span-6 space-y-6">
            <Reveal delay={0.15}>
              <div className="flex items-center space-x-2 text-accent font-mono text-[10px] tracking-widest uppercase">
                <User size={12} />
                <span>Personnel Dossier</span>
              </div>
              <h3 className="font-display font-black text-2xl sm:text-3xl text-text-primary uppercase tracking-wide mt-2">
                Bahuleya M
              </h3>
              <p className="text-sm text-text-secondary leading-relaxed font-sans mt-4">
                I am a student builder pursuing a B.E. in Computer Science (AI & ML) at RV College of Engineering.
                I treat programming not as an abstract exercise in corporate web templates, but as the construction of
                logical machines that perceive, plan, and execute.
              </p>
              <p className="text-sm text-text-secondary leading-relaxed font-sans mt-4">
                My work spans designing locally running agent memory spaces (like JARVIS), building edge assistive computer
                vision systems (like IKSHANA), and exploring AI in healthcare through hackathon problem statements. I work where
                the theoretical math of machine learning meets real-world constraints: whether it&apos;s a Raspberry Pi edge node,
                an off-road BAJA car, or a clinical triage scenario.
              </p>
            </Reveal>
          </div>

          <div className="lg:col-span-6 space-y-6">
            <Reveal delay={0.2}>
              <div className="flex items-center space-x-2 text-accent-secondary font-mono text-[10px] tracking-widest uppercase">
                <Flame size={12} />
                <span>Engineering Philosophy</span>
              </div>

              <div className="mt-4 space-y-4 text-xs font-sans text-text-secondary">
                <div className="p-4 rounded border border-border-subtle bg-bg-card/30">
                  <h4 className="font-mono font-bold text-text-primary uppercase mb-1">Content-Presentation Isolation</h4>
                  <p className="leading-relaxed">
                    Always split data from layout. Architecture should grow cleanly. A code base that cannot scale without
                    constant code rewrites is an engineering failure.
                  </p>
                </div>

                <div className="p-4 rounded border border-border-subtle bg-bg-card/30">
                  <h4 className="font-mono font-bold text-text-primary uppercase mb-1">Rigor over Hype</h4>
                  <p className="leading-relaxed">
                    Building tools from scratch forces you to understand the physics of your system. Quantizing models,
                    tuning PID loops, and inspecting memory blocks beats API-wrapper copying every time.
                  </p>
                </div>
              </div>
            </Reveal>
          </div>
        </div>

        {/* Section 2: Education & Academic History */}
        <section className="space-y-8">
          <Reveal delay={0.1}>
            <div className="flex items-center space-x-2 text-accent font-mono text-[10px] tracking-widest uppercase">
              <GraduationCap size={12} />
              <span>Institutional Telemetry Log</span>
            </div>
            <h3 className="font-display font-black text-2xl sm:text-3xl text-text-primary uppercase tracking-wide mt-2">
              Education & Roles
            </h3>
          </Reveal>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Education List */}
            <div className="space-y-4">
              <span className="font-mono text-[9px] text-text-muted uppercase tracking-widest block pl-1">
                Academic Accreditations
              </span>

              {educationList.map((edu, idx) => (
                <Reveal key={edu.institution} delay={0.15 + idx * 0.05}>
                  <GlassPanel gridBackground className="p-6 border-border-subtle">
                    <div className="flex justify-between items-start gap-1 flex-col sm:flex-row">
                      <div>
                        <h4 className="font-display font-bold text-text-primary text-lg">{edu.institution}</h4>
                        <p className="text-xs text-accent mt-0.5">{edu.degree}</p>
                      </div>
                      <span className="font-mono text-[10px] px-2 py-0.5 rounded border border-border-subtle bg-bg-dark text-text-muted w-fit">
                        {edu.period}
                      </span>
                    </div>

                    <ul className="mt-4 pt-4 border-t border-border-subtle/50 space-y-2 text-xs text-text-secondary">
                      {edu.details.map((detail, dIdx) => (
                        <li key={dIdx} className="flex items-start">
                          <span className="text-accent mr-3 font-mono">▸</span>
                          <span>{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </GlassPanel>
                </Reveal>
              ))}
            </div>

            {/* Experience / Positions */}
            <div className="space-y-4">
              <span className="font-mono text-[9px] text-text-muted uppercase tracking-widest block pl-1">
                Active Research & Engineering Roles
              </span>

              {experienceList.map((exp, idx) => (
                <Reveal key={exp.role} delay={0.2 + idx * 0.05}>
                  <GlassPanel glowOnHover className="p-6 border-border-subtle">
                    <div className="flex justify-between items-start gap-1 flex-col sm:flex-row">
                      <div>
                        <h4 className="font-display font-bold text-text-primary text-base uppercase tracking-wide">{exp.role}</h4>
                        <p className="text-xs text-accent-secondary mt-0.5">{exp.organization}</p>
                      </div>
                      <span className="font-mono text-[10px] px-2 py-0.5 rounded border border-border-subtle bg-bg-dark text-text-muted w-fit">
                        {exp.period}
                      </span>
                    </div>

                    <p className="text-xs text-text-secondary mt-3 leading-relaxed font-sans">
                      {exp.description}
                    </p>

                    <ul className="mt-4 pt-4 border-t border-border-subtle/50 space-y-2 text-xs text-text-secondary">
                      {exp.details.map((detail, dIdx) => (
                        <li key={dIdx} className="flex items-start">
                          <span className="text-accent-secondary mr-3 font-mono">▸</span>
                          <span>{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </GlassPanel>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* Section 3: Skills Matrix */}
        <section className="space-y-8">
          <Reveal delay={0.1}>
            <div className="flex items-center space-x-2 text-accent font-mono text-[10px] tracking-widest uppercase">
              <BookOpen size={12} />
              <span>Full Technology Stacks Matrix</span>
            </div>
            <h3 className="font-display font-black text-2xl sm:text-3xl text-text-primary uppercase tracking-wide mt-2">
              Capabilities Inventory
            </h3>
          </Reveal>

          <SkillsMatrix />
        </section>

        {/* Section 4: Outside the Terminal */}
        <section className="space-y-8">
          <Reveal delay={0.1}>
            <div className="flex items-center space-x-2 text-accent font-mono text-[10px] tracking-widest uppercase">
              <Coffee size={12} />
              <span>Personal Telemetry Logs</span>
            </div>
            <h3 className="font-display font-black text-2xl sm:text-3xl text-text-primary uppercase tracking-wide mt-2">
              Outside the Terminal
            </h3>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Reveal delay={0.15}>
              <GlassPanel className="p-6 border-border-subtle">
                <div className="flex items-center space-x-3 text-accent mb-4">
                  <PenTool size={16} />
                  <h4 className="font-mono text-xs font-bold uppercase tracking-wider">System Sketching</h4>
                </div>
                <p className="text-xs text-text-secondary leading-relaxed">
                  I enjoy outlining systems, plotting control paths on whiteboards, and drafting architectural block diagrams
                  before sitting down to write lines of code.
                </p>
              </GlassPanel>
            </Reveal>

            <Reveal delay={0.2}>
              <GlassPanel className="p-6 border-border-subtle">
                <div className="flex items-center space-x-3 text-accent mb-4">
                  <Book size={16} />
                  <h4 className="font-mono text-xs font-bold uppercase tracking-wider">Technical Literature</h4>
                </div>
                <p className="text-xs text-text-secondary leading-relaxed">
                  Reading deep engineering logs, research drafts, etc. to keep track of
                  novel algorithms and quantization methods.
                </p>
              </GlassPanel>
            </Reveal>

            <Reveal delay={0.25}>
              <GlassPanel className="p-6 border-border-subtle">
                <div className="flex items-center space-x-3 text-accent mb-4">
                  <Bike size={16} />
                  <h4 className="font-mono text-xs font-bold uppercase tracking-wider">Physical Coordinates</h4>
                </div>
                <p className="text-xs text-text-secondary leading-relaxed">
                  On the court for badminton and basketball, or out on the road riding motorbikes... Anything that gets my heart beating and blood pumping and a side of adrenaline makes me feel alive.
                </p>
              </GlassPanel>
            </Reveal>
          </div>
        </section>
      </main>
    </PageTransition>
  );
}
