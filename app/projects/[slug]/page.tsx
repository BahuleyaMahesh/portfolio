import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, ExternalLink, ShieldCheck, HelpCircle, Lightbulb, Compass, Award } from "lucide-react";
import { projects } from "@/data/projects";
import PageTransition from "@/components/layout/PageTransition";
import ArchitectureGraph from "@/components/visualizations/ArchitectureGraph";
import GlassPanel from "@/components/ui/GlassPanel";

interface PageProps {
  params: Promise<{ slug: string }>;
}

// Generate static routes for build compilation
export async function generateStaticParams() {
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

// Dynamic page metadata
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  
  if (!project) return { title: "Project Not Found" };
  
  return {
    title: `${project.title} — Bahuleya M Project Log`,
    description: project.description,
  };
}

export default async function ProjectDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const projectIndex = projects.findIndex((p) => p.slug === slug);
  
  if (projectIndex === -1) {
    notFound();
  }

  const project = projects[projectIndex];

  // Cyclic navigation mapping
  const prevProject = projects[(projectIndex - 1 + projects.length) % projects.length];
  const nextProject = projects[(projectIndex + 1) % projects.length];

  // Map related projects
  const relatedList = project.relatedProjects
    ? projects.filter((p) => project.relatedProjects?.includes(p.slug))
    : [];

  return (
    <PageTransition>
      <main className="max-w-6xl mx-auto px-6 sm:px-12 pt-32 pb-24 flex-grow w-full">
        {/* Back navigation */}
        <div className="mb-10">
          <Link
            href="/projects"
            className="inline-flex items-center space-x-2 text-text-muted hover:text-accent font-mono text-[10px] tracking-widest uppercase transition-colors"
          >
            <ArrowLeft size={12} />
            <span>Back to archive inventory</span>
          </Link>
        </div>

        {/* Project Header Spec */}
        <div className="border-b border-border-subtle/50 pb-10 mb-12">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
            <div className="md:col-span-8">
              <div className="flex items-center space-x-3 mb-4">
                <span className="font-mono text-xs font-bold text-accent">
                  SPEC_NODE_{project.number}
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-border-subtle" />
                <span className="font-mono text-[9px] px-2 py-0.5 rounded bg-bg-card border border-border-subtle text-text-secondary uppercase">
                  {project.status || "COMPLETED"}
                </span>
              </div>
              <h1 className="font-display font-black text-4xl sm:text-5xl md:text-6xl text-text-primary tracking-wide uppercase leading-none">
                {project.title}
              </h1>
              <p className="font-mono text-xs sm:text-sm font-bold text-text-secondary tracking-widest uppercase mt-3 mb-6">
                {project.subtitle}
              </p>
              
              {/* Tech tag list */}
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="px-2.5 py-1 rounded bg-bg-card border border-border-subtle font-mono text-[10px] text-text-secondary"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Sidebar Details Block */}
            <div className="md:col-span-4 flex flex-col md:items-end justify-between h-full gap-4">
              <div className="text-left md:text-right font-mono text-[10px] text-text-muted space-y-1">
                <div>RECORD YEAR: <span className="text-text-primary">{project.year || "2024"}</span></div>
                <div>DOMAIN: <span className="text-text-primary">{project.category.join(", ")}</span></div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-3 w-full sm:w-auto">
                {project.demo && (
                  <a
                    href={project.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center space-x-2 px-4 py-2.5 rounded-lg bg-text-primary hover:bg-accent text-bg-dark font-mono text-xs font-bold transition-all w-full sm:w-auto"
                  >
                    <ExternalLink size={14} />
                    <span>LIVE DEMO</span>
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Editorial Sections Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Main Details Panel */}
          <div className="lg:col-span-7 space-y-12">
            
            {/* The Problem */}
            {project.problem && (
              <section className="space-y-4">
                <div className="flex items-center space-x-2 font-mono text-[10px] text-accent uppercase tracking-widest">
                  <HelpCircle size={12} />
                  <span>The Problem Vector</span>
                </div>
                <h2 className="font-display font-bold text-xl text-text-primary tracking-wide uppercase">
                  Statement
                </h2>
                <p className="text-sm text-text-secondary leading-relaxed font-sans">
                  {project.problem}
                </p>
              </section>
            )}

            {/* The Solution */}
            {project.solution && (
              <section className="space-y-4">
                <div className="flex items-center space-x-2 font-mono text-[10px] text-accent uppercase tracking-widest">
                  <Lightbulb size={12} />
                  <span>The Solution Architecture</span>
                </div>
                <h2 className="font-display font-bold text-xl text-text-primary tracking-wide uppercase">
                  Proposed Concept
                </h2>
                <p className="text-sm text-text-secondary leading-relaxed font-sans">
                  {project.solution}
                </p>
              </section>
            )}

            {/* Challenges */}
            {project.challenges && project.challenges.length > 0 && (
              <section className="space-y-4">
                <div className="flex items-center space-x-2 font-mono text-[10px] text-accent uppercase tracking-widest">
                  <ShieldCheck size={12} />
                  <span>Technical Constraints</span>
                </div>
                <h2 className="font-display font-bold text-xl text-text-primary tracking-wide uppercase">
                  Obstacles & Complications
                </h2>
                <ul className="space-y-2 font-sans text-sm text-text-secondary">
                  {project.challenges.map((challenge, idx) => (
                    <li key={idx} className="flex items-start">
                      <span className="font-mono text-accent mr-3">[{idx + 1}]</span>
                      <span>{challenge}</span>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {/* Results / Learnings */}
            {((project.results && project.results.length > 0) || (project.learnings && project.learnings.length > 0)) && (
              <section className="space-y-6">
                <div className="flex items-center space-x-2 font-mono text-[10px] text-accent-secondary uppercase tracking-widest">
                  <Award size={12} />
                  <span>Telemetry Outputs</span>
                </div>
                <h2 className="font-display font-bold text-xl text-text-primary tracking-wide uppercase">
                  Outcomes & Key Learnings
                </h2>
                
                <div className="space-y-4 font-sans text-sm text-text-secondary">
                  {project.results && project.results.map((res, idx) => (
                    <div key={`res-${idx}`} className="p-4 rounded border border-border-subtle bg-bg-card/25">
                      <span className="font-mono text-[9px] text-accent-secondary uppercase block mb-1">Metrics Outcome #{idx + 1}</span>
                      <p>{res}</p>
                    </div>
                  ))}

                  {project.learnings && project.learnings.map((learning, idx) => (
                    <div key={`learn-${idx}`} className="p-4 rounded border border-border-subtle bg-bg-card/25">
                      <span className="font-mono text-[9px] text-text-muted uppercase block mb-1">Knowledge Gained #{idx + 1}</span>
                      <p>{learning}</p>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Future Scope */}
            {project.future && project.future.length > 0 && (
              <section className="space-y-4">
                <div className="flex items-center space-x-2 font-mono text-[10px] text-accent uppercase tracking-widest">
                  <Compass size={12} />
                  <span>Development Roadmap</span>
                </div>
                <h2 className="font-display font-bold text-xl text-text-primary tracking-wide uppercase">
                  Next Milestones
                </h2>
                <ul className="space-y-2.5 font-sans text-sm text-text-secondary">
                  {project.future.map((fut, idx) => (
                    <li key={idx} className="flex items-center space-x-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-accent" />
                      <span>{fut}</span>
                    </li>
                  ))}
                </ul>
              </section>
            )}
          </div>

          {/* Sidebar / Visualizations column */}
          <div className="lg:col-span-5 space-y-8 lg:sticky lg:top-28">
            {/* Embedded Architecture Diagram Graph */}
            {project.architecture && (
              <GlassPanel gridBackground className="p-6 border-border-subtle">
                <span className="font-mono text-[9px] text-text-muted uppercase tracking-widest block mb-4">
                  SYSTEM DESIGN FLOW LOGIC
                </span>
                <ArchitectureGraph architecture={project.architecture} />
              </GlassPanel>
            )}

            {/* Project Synopsis card */}
            <GlassPanel className="p-6 border-border-subtle font-mono text-[10px] text-text-secondary space-y-4">
              <span className="text-text-muted uppercase block">NODE METRICS</span>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <span className="text-text-muted block">INDEX IDENT</span>
                  <span className="text-text-primary font-bold">NODE_{project.number}</span>
                </div>
                <div>
                  <span className="text-text-muted block">BUILD TIMELINE</span>
                  <span className="text-text-primary font-bold">{project.year || "2024"}</span>
                </div>
                <div>
                  <span className="text-text-muted block">STATUS LOG</span>
                  <span className="text-accent uppercase font-bold">{project.status || "READY"}</span>
                </div>
                <div>
                  <span className="text-text-muted block">REPOS AUTH</span>
                  <span className="text-text-primary font-bold">VERIFIED</span>
                </div>
              </div>
            </GlassPanel>
          </div>
        </div>

        {/* Related Projects Section */}
        {relatedList.length > 0 && (
          <section className="border-t border-border-subtle/50 pt-16 mt-20">
            <span className="font-mono text-[9px] text-text-muted uppercase tracking-widest mb-6 block">
              RELATED COGNITIVE ENTITIES
            </span>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {relatedList.map((rel) => (
                <Link
                  key={rel.slug}
                  href={`/projects/${rel.slug}`}
                  data-cursor-explore
                  className="block"
                >
                  <GlassPanel glowOnHover className="p-5 border-border-subtle">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-mono text-[10px] text-accent">#{rel.number}</span>
                      <span className="font-mono text-[9px] text-text-muted">{rel.year}</span>
                    </div>
                    <h4 className="font-display font-bold text-text-primary text-base tracking-wide">
                      {rel.title}
                    </h4>
                    <p className="text-xs text-text-secondary mt-1 line-clamp-2">
                      {rel.description}
                    </p>
                  </GlassPanel>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Cyclic Project Navigation Footer */}
        <div className="grid grid-cols-2 gap-4 border-t border-border-subtle/50 pt-10 mt-16">
          <Link
            href={`/projects/${prevProject.slug}`}
            className="p-5 rounded-lg border border-border-subtle bg-bg-card/20 hover:border-accent/40 flex flex-col items-start transition-all"
          >
            <span className="font-mono text-[9px] text-text-muted uppercase mb-1">PREVIOUS NODE</span>
            <span className="font-display font-bold text-text-primary text-sm sm:text-base flex items-center gap-1 uppercase truncate max-w-full">
              <ArrowLeft size={14} className="flex-shrink-0" />
              <span className="truncate">{prevProject.title}</span>
            </span>
          </Link>

          <Link
            href={`/projects/${nextProject.slug}`}
            className="p-5 rounded-lg border border-border-subtle bg-bg-card/20 hover:border-accent/40 flex flex-col items-end transition-all text-right"
          >
            <span className="font-mono text-[9px] text-text-muted uppercase mb-1">NEXT NODE</span>
            <span className="font-display font-bold text-text-primary text-sm sm:text-base flex items-center gap-1 uppercase truncate max-w-full justify-end">
              <span className="truncate">{nextProject.title}</span>
              <ArrowRight size={14} className="flex-shrink-0" />
            </span>
          </Link>
        </div>
      </main>
    </PageTransition>
  );
}
