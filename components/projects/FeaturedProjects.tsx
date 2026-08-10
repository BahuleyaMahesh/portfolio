"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { projects } from "@/data/projects";
import { Reveal } from "../ui/Reveal";
import ProjectMediaPlaceholder from "./ProjectMediaPlaceholder";

export function FeaturedProjects() {
  // Only display featured projects
  const featured = projects.filter((p) => p.featured);

  return (
    <div className="space-y-24 sm:space-y-36">
      {featured.map((project, index) => {
        const isEven = index % 2 === 0;
        
        return (
          <div
            key={project.slug}
            className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center"
          >
            {/* Project Media Container */}
            <div
              className={`lg:col-span-7 ${isEven ? "lg:order-1" : "lg:order-2"} w-full`}
            >
              <Reveal delay={0.1} direction={isEven ? "left" : "right"}>
                <Link
                  href={`/projects/${project.slug}`}
                  data-cursor-explore
                  className="block relative rounded-xl overflow-hidden border border-border-subtle hover:border-accent/40 group transition-all duration-500 bg-bg-card"
                >
                  {/* Dynamic Placeholder or Image */}
                  <div className="relative aspect-[16/10] w-full overflow-hidden">
                    {project.thumbnail && !project.thumbnail.startsWith("/images/projects/") ? (
                      <Image
                        src={project.thumbnail}
                        alt={project.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                        sizes="(max-width: 1024px) 100vw, 50vw"
                      />
                    ) : (
                      <ProjectMediaPlaceholder project={project} />
                    )}
                    
                    {/* Shadow Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-bg-dark/80 via-transparent to-transparent opacity-60 group-hover:opacity-20 transition-opacity duration-300" />
                  </div>
                </Link>
              </Reveal>
            </div>

            {/* Project Copy Container */}
            <div
              className={`lg:col-span-5 ${isEven ? "lg:order-2" : "lg:order-1"} flex flex-col justify-center`}
            >
              <Reveal delay={0.2} direction={isEven ? "right" : "left"}>
                {/* Meta details */}
                <div className="flex items-center space-x-3 mb-4">
                  <span className="font-mono text-xs font-bold text-accent">
                    #{project.number}
                  </span>
                  <span className="w-1.5 h-1.5 rounded-full bg-border-subtle" />
                  <span className="font-mono text-[10px] tracking-wider text-text-muted uppercase">
                    {project.category.join(" · ")}
                  </span>
                </div>

                {/* Title */}
                <h3 className="font-display font-black text-3xl sm:text-4xl text-text-primary tracking-wide uppercase leading-tight mb-2">
                  {project.title}
                </h3>
                
                {/* Subtitle */}
                <h4 className="font-mono text-xs font-bold text-text-secondary tracking-widest uppercase mb-4">
                  {project.subtitle}
                </h4>

                {/* Description */}
                <p className="text-sm text-text-secondary leading-relaxed mb-6 font-sans">
                  {project.description}
                </p>

                {/* Technologies List */}
                <div className="flex flex-wrap gap-2 mb-8">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-2.5 py-1 rounded bg-bg-card border border-border-subtle text-[10px] font-mono text-text-secondary"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Actions */}
                <div className="flex items-center space-x-6">
                  <Link
                    href={`/projects/${project.slug}`}
                    className="flex items-center space-x-2 text-text-primary hover:text-accent font-mono text-xs font-bold tracking-widest transition-colors group"
                  >
                    <span>EXPLORE PROJECT</span>
                    <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                  </Link>

                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-text-muted hover:text-text-primary transition-colors"
                      aria-label={`${project.title} GitHub repository`}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
                    </a>
                  )}
                </div>
              </Reveal>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default FeaturedProjects;
