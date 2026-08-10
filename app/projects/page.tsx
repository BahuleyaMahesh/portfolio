"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { ArrowRight, Search, SlidersHorizontal } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { projects } from "@/data/projects";
import { Project } from "@/types/project";
import PageTransition from "@/components/layout/PageTransition";
import SectionHeading from "@/components/ui/SectionHeading";
import GlassPanel from "@/components/ui/GlassPanel";
import Reveal from "@/components/ui/Reveal";

// Filter titles as specified
const filterCategories = [
  "ALL",
  "AI / ML",
  "COMPUTER VISION",
  "HEALTHCARE",
  "ROBOTICS",
  "EMBEDDED",
  "RESEARCH",
  "WEB",
  "CYBERSECURITY"
];

// Helper to determine if project matches filter pill
const projectMatchesFilter = (project: Project, filter: string): boolean => {
  if (filter === "ALL") return true;

  const fUpper = filter.toUpperCase();
  const cUpper = project.category.map(c => c.toUpperCase());
  const tUpper = project.tags.map(t => t.toUpperCase());

  switch (fUpper) {
    case "AI / ML":
      return cUpper.includes("AI SYSTEMS") || cUpper.includes("EMBEDDED AI") || tUpper.some(t => t.includes("AI") || t.includes("ML"));
    case "COMPUTER VISION":
      return cUpper.includes("COMPUTER VISION") || tUpper.some(t => t.includes("VISION") || t.includes("CV"));
    case "HEALTHCARE":
      return cUpper.includes("HEALTHCARE") || cUpper.includes("RESEARCH") && project.title.toUpperCase().includes("HEALTH");
    case "ROBOTICS":
      return cUpper.includes("ROBOTICS") || tUpper.includes("ROBOTICS");
    case "EMBEDDED":
      return cUpper.includes("EMBEDDED") || cUpper.includes("EMBEDDED AI") || tUpper.includes("EMBEDDED");
    case "RESEARCH":
      return cUpper.includes("RESEARCH");
    case "WEB":
      return cUpper.includes("WEB") || cUpper.includes("SOFTWARE") || tUpper.includes("REACT") || tUpper.includes("FLASK");
    case "CYBERSECURITY":
      return cUpper.includes("CYBERSECURITY") || tUpper.includes("SECURITY");
    default:
      return false;
  }
};

export default function ProjectsPage() {
  const [activeFilter, setActiveFilter] = useState("ALL");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      // 1. Category Filter Match
      const matchesFilter = projectMatchesFilter(project, activeFilter);
      if (!matchesFilter) return false;

      // 2. Search Query Match
      if (!searchQuery) return true;
      const q = searchQuery.toLowerCase();
      return (
        project.title.toLowerCase().includes(q) ||
        project.subtitle.toLowerCase().includes(q) ||
        project.description.toLowerCase().includes(q) ||
        project.tags.some(t => t.toLowerCase().includes(q)) ||
        project.technologies.some(t => t.toLowerCase().includes(q)) ||
        project.category.some(c => c.toLowerCase().includes(q))
      );
    });
  }, [activeFilter, searchQuery]);

  return (
    <PageTransition>
      <main className="max-w-7xl mx-auto px-6 sm:px-12 pt-32 pb-24 flex-grow w-full">
        {/* Editorial Heading */}
        <Reveal delay={0.1}>
          <SectionHeading
            number="01"
            title="Systems Archive"
            subtitle="THE ENTIRE LOGICAL PROTOTYPE INVENTORY"
          />
        </Reveal>

        {/* Filters and Search Bar Row */}
        <div className="flex flex-col lg:flex-row gap-6 items-stretch lg:items-center justify-between border-y border-border-subtle/50 py-6 mb-12 relative z-20">
          {/* Category Filters Grid */}
          <Reveal delay={0.15} className="flex-grow">
            <div className="flex flex-wrap gap-2 max-w-4xl">
              {filterCategories.map((filter) => {
                const isActive = activeFilter === filter;
                return (
                  <button
                    key={filter}
                    onClick={() => setActiveFilter(filter)}
                    className={`px-3.5 py-1.5 rounded-lg border font-mono text-[9px] font-bold tracking-widest transition-all duration-300 ${
                      isActive
                        ? "bg-accent border-accent text-bg-dark"
                        : "bg-bg-card/45 border-border-subtle text-text-secondary hover:text-text-primary hover:border-accent/40"
                    }`}
                  >
                    {filter}
                  </button>
                );
              })}
            </div>
          </Reveal>

          {/* Search Box */}
          <Reveal delay={0.2} className="min-w-0 lg:w-80">
            <div className="relative flex items-center w-full">
              <Search className="absolute left-3 text-text-muted w-4 h-4" />
              <input
                type="text"
                placeholder="Query parameters..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-bg-card/40 border border-border-subtle rounded-lg py-2.5 pl-10 pr-4 text-xs font-mono text-text-primary placeholder-text-muted focus:outline-none focus:border-accent transition-colors"
              />
            </div>
          </Reveal>
        </div>

        {/* Projects Grid Display */}
        <div className="relative min-h-[300px]">
          {filteredProjects.length === 0 ? (
            <Reveal delay={0.1}>
              <div className="text-center py-20 font-mono text-xs text-text-muted border border-dashed border-border-subtle rounded-lg bg-bg-card/10">
                // SYSTEM LOG: ZERO PROJECT RECORDS MATCHING ACTIVE RETRIEVAL PARAMETERS.
              </div>
            </Reveal>
          ) : (
            <motion.div
              layout
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              <AnimatePresence mode="popLayout">
                {filteredProjects.map((project, idx) => (
                  <motion.div
                    key={project.slug}
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.3 }}
                    className="h-full"
                  >
                    <Link
                      href={`/projects/${project.slug}`}
                      data-cursor-explore
                      className="block h-full"
                    >
                      <GlassPanel
                        glowOnHover
                        gridBackground={project.featured}
                        className={`p-6 flex flex-col justify-between h-full border-border-subtle relative ${
                          project.featured ? "border-accent/25" : ""
                        }`}
                      >
                        <div>
                          {/* Card Header Telemetry */}
                          <div className="flex justify-between items-center mb-4">
                            <span className="font-mono text-xs text-accent">
                              #{project.number}
                            </span>
                            <span className="font-mono text-[9px] px-2 py-0.5 rounded border border-border-subtle bg-bg-dark text-text-muted">
                              {project.year || "2024"}
                            </span>
                          </div>

                          {/* Title & Sub */}
                          <h3 className="font-display font-bold text-lg text-text-primary uppercase tracking-wide group-hover:text-accent transition-colors">
                            {project.title}
                          </h3>
                          <h4 className="font-mono text-[10px] text-text-muted uppercase tracking-widest mt-1 mb-3">
                            {project.subtitle}
                          </h4>

                          {/* Description */}
                          <p className="text-xs text-text-secondary leading-relaxed mb-6 font-sans line-clamp-3">
                            {project.description}
                          </p>
                        </div>

                        {/* Card Footer */}
                        <div className="mt-auto border-t border-border-subtle/50 pt-4 flex items-center justify-between">
                          <div className="flex flex-wrap gap-1 max-w-[80%]">
                            {project.technologies.slice(0, 2).map((tech) => (
                              <span
                                key={tech}
                                className="px-2 py-0.5 rounded bg-bg-dark border border-border-subtle/60 text-[8px] font-mono text-text-muted"
                              >
                                {tech}
                              </span>
                            ))}
                          </div>
                          
                          <div className="flex items-center space-x-1 font-mono text-[9px] text-text-muted group-hover:text-accent transition-colors">
                            <span>Explore</span>
                            <ArrowRight size={10} className="group-hover:translate-x-0.5 transition-transform" />
                          </div>
                        </div>
                      </GlassPanel>
                    </Link>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          )}
        </div>
      </main>
    </PageTransition>
  );
}
