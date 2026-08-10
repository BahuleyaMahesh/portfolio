"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { ArrowRight, Cpu, Activity, Zap, Code } from "lucide-react";
import { projects } from "@/data/projects";
import { cn } from "@/lib/utils";

interface Category {
  id: string;
  name: string;
  subcategories: string[];
  icon: React.ComponentType<{ className?: string }>;
  projectSlugs: string[];
}

const categories: Category[] = [
  {
    id: "ai-systems",
    name: "AI Systems",
    subcategories: ["Computer Vision", "AI Agents", "Knowledge Systems"],
    icon: Cpu,
    projectSlugs: ["jarvis", "ikshana", "arms", "krishimitra"],
  },
  {
    id: "healthcare",
    name: "Healthcare",
    subcategories: ["Computational Genomics", "Healthcare Analytics", "Bioinformatics"],
    icon: Activity,
    projectSlugs: ["healthcare-genomics"],
  },
  {
    id: "physical-systems",
    name: "Physical Systems",
    subcategories: ["Robotics", "Embedded Systems", "Vehicle Intelligence"],
    icon: Zap,
    projectSlugs: ["ikshana", "helios-baja"],
  },
  {
    id: "web-software",
    name: "Web & Software",
    subcategories: ["Full Stack", "APIs", "Developer Systems"],
    icon: Code,
    projectSlugs: ["arms", "krishimitra"],
  },
];

export function SystemMap() {
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);
  const [hoveredProject, setHoveredProject] = useState<string | null>(null);
  const [connections, setConnections] = useState<{ from: { x: number; y: number }; to: { x: number; y: number }; active: boolean }[]>([]);
  const [isMobile, setIsMobile] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const categoryRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});
  const projectRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

  // Featured projects for the display grid
  const featured = projects.filter((p) => p.featured);

  // Resize handler & Mobile check
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
      updateConnections();
    };

    window.addEventListener("resize", handleResize);
    // Initial call
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, [hoveredCategory, hoveredProject]);

  // Update SVG connection paths coordinates
  const updateConnections = () => {
    if (!containerRef.current || isMobile) return;

    const containerRect = containerRef.current.getBoundingClientRect();
    const newConnections: typeof connections = [];

    categories.forEach((cat) => {
      const catEl = categoryRefs.current[cat.id];
      if (!catEl) return;

      const catRect = catEl.getBoundingClientRect();
      const fromPoint = {
        x: catRect.right - containerRect.left,
        y: catRect.top + catRect.height / 2 - containerRect.top,
      };

      cat.projectSlugs.forEach((slug) => {
        const projEl = projectRefs.current[slug];
        if (!projEl) return;

        const projRect = projEl.getBoundingClientRect();
        const toPoint = {
          x: projRect.left - containerRect.left,
          y: projRect.top + projRect.height / 2 - containerRect.top,
        };

        // Determine if this connection is currently highlighted
        const isConnectionActive =
          hoveredCategory === cat.id ||
          hoveredProject === slug ||
          (hoveredCategory === null && hoveredProject === null);

        newConnections.push({
          from: fromPoint,
          to: toPoint,
          active: isConnectionActive && (hoveredCategory === cat.id || hoveredProject === slug),
        });
      });
    });

    setConnections(newConnections);
  };

  useEffect(() => {
    updateConnections();
  }, [hoveredCategory, hoveredProject, isMobile]);

  // Handle active states for highlighting/dimming
  const activeCategory = hoveredCategory || (hoveredProject ? categories.find(c => c.projectSlugs.includes(hoveredProject))?.id || null : null);
  const activeProjects = hoveredCategory ? categories.find(c => c.id === hoveredCategory)?.projectSlugs || [] : (hoveredProject ? [hoveredProject] : []);

  return (
    <div ref={containerRef} className="relative w-full py-12 select-none">
      {/* SVG Canvas for Connections (Desktop only) */}
      {!isMobile && (
        <svg className="absolute inset-0 w-full h-full pointer-events-none z-0">
          <defs>
            <linearGradient id="gradient-active" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#00e5ff" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#10b981" stopOpacity="0.8" />
            </linearGradient>
            <linearGradient id="gradient-inactive" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0.03" />
              <stop offset="100%" stopColor="#ffffff" stopOpacity="0.03" />
            </linearGradient>
          </defs>
          
          {/* Static / Inactive Lines */}
          {connections
            .filter((conn) => !conn.active)
            .map((conn, idx) => {
              const dx = conn.to.x - conn.from.x;
              const pathStr = `M ${conn.from.x} ${conn.from.y} C ${conn.from.x + dx * 0.4} ${conn.from.y}, ${conn.to.x - dx * 0.4} ${conn.to.y}, ${conn.to.x} ${conn.to.y}`;
              return (
                <path
                  key={`inactive-${idx}`}
                  d={pathStr}
                  fill="none"
                  stroke="url(#gradient-inactive)"
                  strokeWidth={1.5}
                />
              );
            })}

          {/* Active / Glowing Lines */}
          {connections
            .filter((conn) => conn.active)
            .map((conn, idx) => {
              const dx = conn.to.x - conn.from.x;
              const pathStr = `M ${conn.from.x} ${conn.from.y} C ${conn.from.x + dx * 0.4} ${conn.from.y}, ${conn.to.x - dx * 0.4} ${conn.to.y}, ${conn.to.x} ${conn.to.y}`;
              return (
                <g key={`active-${idx}`}>
                  <path
                    d={pathStr}
                    fill="none"
                    stroke="#00e5ff"
                    strokeWidth={3}
                    className="opacity-20 blur-sm"
                  />
                  <path
                    d={pathStr}
                    fill="none"
                    stroke="url(#gradient-active)"
                    strokeWidth={1.5}
                    strokeDasharray="8 6"
                    className="animate-[scanline_20s_linear_infinite]"
                  />
                </g>
              );
            })}
        </svg>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 relative z-10">
        {/* Left Side: System Categories */}
        <div className="lg:col-span-5 flex flex-col space-y-4">
          <div className="text-[10px] font-mono tracking-widest text-text-muted uppercase mb-2">
            01 / System Domain Matrix
          </div>
          {categories.map((cat) => {
            const Icon = cat.icon;
            const isDimmed = activeCategory !== null && activeCategory !== cat.id;
            const isHighlighted = activeCategory === cat.id;

            return (
              <div
                key={cat.id}
                ref={(el) => {
                  categoryRefs.current[cat.id] = el;
                }}
                onMouseEnter={() => setHoveredCategory(cat.id)}
                onMouseLeave={() => setHoveredCategory(null)}
                className={cn(
                  "p-5 rounded-lg border border-border-subtle bg-bg-card/40 backdrop-blur-sm cursor-pointer transition-all duration-300 relative overflow-hidden group",
                  isHighlighted ? "border-accent bg-bg-card/75 shadow-[0_0_20px_rgba(0,229,255,0.05)]" : "",
                  isDimmed ? "opacity-35" : "opacity-100"
                )}
              >
                <div className="flex items-start space-x-4">
                  <div className={cn(
                    "p-3 rounded-lg border transition-colors",
                    isHighlighted ? "bg-accent/15 border-accent text-accent" : "bg-bg-dark border-border-subtle text-text-muted group-hover:text-text-primary"
                  )}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className={cn(
                      "font-display font-semibold tracking-wider text-base transition-colors",
                      isHighlighted ? "text-accent" : "text-text-primary"
                    )}>
                      {cat.name}
                    </h3>
                    <div className="flex flex-wrap gap-x-3 gap-y-1 mt-2">
                      {cat.subcategories.map((sub, idx) => (
                        <span key={idx} className="text-[10px] font-mono text-text-secondary">
                          {sub}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Animated Edge Glow */}
                {isHighlighted && (
                  <div className="absolute top-0 right-0 h-full w-[2px] bg-gradient-to-b from-accent to-accent-secondary animate-pulse" />
                )}
              </div>
            );
          })}
        </div>

        {/* Right Side: Selected Projects */}
        <div className="lg:col-span-7 flex flex-col space-y-4">
          <div className="text-[10px] font-mono tracking-widest text-text-muted uppercase mb-2">
            02 / Engineering Laboratory Outputs
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {featured.map((proj) => {
              const isDimmed = activeProjects.length > 0 && !activeProjects.includes(proj.slug);
              const isHighlighted = activeProjects.includes(proj.slug);

              return (
                <Link
                  key={proj.slug}
                  href={`/projects/${proj.slug}`}
                  data-cursor-explore
                  className="block h-full"
                >
                  <div
                    ref={(el) => {
                      projectRefs.current[proj.slug] = el;
                    }}
                    onMouseEnter={() => setHoveredProject(proj.slug)}
                    onMouseLeave={() => setHoveredProject(null)}
                    className={cn(
                      "p-5 rounded-lg border border-border-subtle bg-bg-card/40 backdrop-blur-sm h-full flex flex-col justify-between transition-all duration-300 relative group cursor-pointer",
                      isHighlighted ? "border-accent-secondary bg-bg-card/70 shadow-[0_0_20px_rgba(16,185,129,0.05)]" : "",
                      isDimmed ? "opacity-30" : "opacity-100"
                    )}
                  >
                    <div>
                      <div className="flex justify-between items-center mb-3">
                        <span className="font-mono text-[10px] text-text-muted group-hover:text-accent transition-colors">
                          #{proj.number}
                        </span>
                        <span className="font-mono text-[9px] px-2 py-0.5 rounded border border-border-subtle bg-bg-dark text-text-muted">
                          {proj.year}
                        </span>
                      </div>
                      <h4 className="font-display font-bold text-text-primary text-base tracking-wider group-hover:text-accent-secondary transition-colors">
                        {proj.title}
                      </h4>
                      <p className="text-xs text-text-secondary mt-2 line-clamp-2">
                        {proj.description}
                      </p>
                    </div>

                    <div className="mt-4 pt-3 border-t border-border-subtle/50 flex items-center justify-between">
                      <span className="text-[9px] font-mono text-text-muted truncate max-w-[80%]">
                        {proj.technologies.slice(0, 2).join(" · ")}
                      </span>
                      <ArrowRight size={12} className="text-text-muted group-hover:text-accent-secondary group-hover:translate-x-1 transition-all" />
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default SystemMap;
