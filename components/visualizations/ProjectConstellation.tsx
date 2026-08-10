"use client";

import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, Star } from "lucide-react";
import { projects } from "@/data/projects";
import { Project } from "@/types/project";

interface ConstellationNode {
  project: Project;
  x: number; // target relative X (0 to 1)
  y: number; // target relative Y (0 to 1)
  currentX: number; // actual pixel X for rendering
  currentY: number; // actual pixel Y for rendering
  vx: number; // velocity X
  vy: number; // velocity Y
  radius: number;
}

export function ProjectConstellation() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [hoveredNode, setHoveredNode] = useState<ConstellationNode | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const router = useRouter();
  
  const nodesRef = useRef<ConstellationNode[]>([]);
  const hoveredNodeRef = useRef<ConstellationNode | null>(null);

  // Focus only on main projects + select archives to keep constellation clean
  const constellationProjects = projects.filter(
    (p) => p.featured || ["plant-disease-aid", "cyberquest", "gemini-lifeline", "solar-analyzer"].includes(p.slug)
  );

  // Check if two projects are related (share category or tags)
  const areRelated = (p1: Project, p2: Project) => {
    const sharedCategories = p1.category.some((c) => p2.category.includes(c));
    const sharedTags = p1.tags.some((t) => p2.tags.includes(t));
    return p1.slug !== p2.slug && (sharedCategories || sharedTags);
  };

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    if (isMobile) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || 800);
    let height = (canvas.height = 500);

    // Initial position mapping (normalized coordinates)
    const positionsMap: { [key: string]: { x: number; y: number } } = {
      jarvis: { x: 0.35, y: 0.3 },
      arms: { x: 0.55, y: 0.2 },
      ikshana: { x: 0.2, y: 0.55 },
      "helios-baja": { x: 0.45, y: 0.75 },
      "healthcare-genomics": { x: 0.8, y: 0.4 },
      krishimitra: { x: 0.68, y: 0.7 },
      // Archives
      "plant-disease-aid": { x: 0.15, y: 0.28 },
      cyberquest: { x: 0.82, y: 0.15 },
      "gemini-lifeline": { x: 0.5, y: 0.48 },
      "solar-analyzer": { x: 0.22, y: 0.82 },
    };

    // Initialize nodes
    nodesRef.current = constellationProjects.map((p) => {
      const pos = positionsMap[p.slug] || { x: Math.random(), y: Math.random() };
      return {
        project: p,
        x: pos.x,
        y: pos.y,
        currentX: pos.x * width,
        currentY: pos.y * height,
        vx: 0,
        vy: 0,
        radius: p.featured ? 7 : 5,
      };
    });

    const handleResize = () => {
      width = canvas.width = canvas.parentElement?.clientWidth || 800;
      height = canvas.height = 500;
      
      // Update pixel coords
      nodesRef.current.forEach((node) => {
        node.currentX = node.x * width;
        node.currentY = node.y * height;
      });
    };

    window.addEventListener("resize", handleResize);

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;

      let found: ConstellationNode | null = null;
      for (const node of nodesRef.current) {
        const dx = mouseX - node.currentX;
        const dy = mouseY - node.currentY;
        const dist = Math.sqrt(dx * dx + dy * dy);
        
        // Match click zone (node radius + hover margin)
        if (dist < node.radius + 20) {
          found = node;
          break;
        }
      }

      setHoveredNode(found);
      hoveredNodeRef.current = found;
    };

    const handleCanvasClick = (e: MouseEvent) => {
      if (hoveredNodeRef.current) {
        router.push(`/projects/${hoveredNodeRef.current.project.slug}`);
      }
    };

    canvas.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("click", handleCanvasClick);

    // Canvas loop
    const render = () => {
      ctx.clearRect(0, 0, width, height);

      const activeNode = hoveredNodeRef.current;

      // Draw grid overlays
      ctx.strokeStyle = "rgba(255, 255, 255, 0.01)";
      ctx.lineWidth = 1;
      const gridSize = 40;
      for (let x = 0; x < width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = 0; y < height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // Physics float & drift
      nodesRef.current.forEach((node) => {
        // Subtle floating movement
        const targetX = node.x * width + Math.sin(Date.now() * 0.001 + node.radius) * 6;
        const targetY = node.y * height + Math.cos(Date.now() * 0.001 + node.radius) * 6;

        node.currentX += (targetX - node.currentX) * 0.1;
        node.currentY += (targetY - node.currentY) * 0.1;
      });

      // 1. Draw Connections (Lines)
      for (let i = 0; i < nodesRef.current.length; i++) {
        for (let j = i + 1; j < nodesRef.current.length; j++) {
          const n1 = nodesRef.current[i];
          const n2 = nodesRef.current[j];

          if (areRelated(n1.project, n2.project)) {
            const isConnectionActive = activeNode 
              ? (activeNode.project.slug === n1.project.slug || activeNode.project.slug === n2.project.slug)
              : true;

            const isRelatedHighlight = activeNode && isConnectionActive;

            ctx.beginPath();
            ctx.moveTo(n1.currentX, n1.currentY);
            ctx.lineTo(n2.currentX, n2.currentY);
            
            if (activeNode) {
              if (isRelatedHighlight) {
                ctx.strokeStyle = "rgba(0, 229, 255, 0.6)";
                ctx.lineWidth = 1.5;
                ctx.stroke();

                // Draw energy flow pulse
                const progress = (Date.now() % 1500) / 1500;
                const flowX = n1.currentX + (n2.currentX - n1.currentX) * progress;
                const flowY = n1.currentY + (n2.currentY - n1.currentY) * progress;
                ctx.beginPath();
                ctx.arc(flowX, flowY, 2.5, 0, Math.PI * 2);
                ctx.fillStyle = "#10b981";
                ctx.fill();
              } else {
                ctx.strokeStyle = "rgba(255, 255, 255, 0.02)";
                ctx.lineWidth = 0.5;
                ctx.stroke();
              }
            } else {
              ctx.strokeStyle = "rgba(255, 255, 255, 0.07)";
              ctx.lineWidth = 0.8;
              ctx.stroke();
            }
          }
        }
      }

      // 2. Draw Nodes
      nodesRef.current.forEach((node) => {
        const isSelf = activeNode?.project.slug === node.project.slug;
        const isRelatedNode = activeNode && areRelated(activeNode.project, node.project);
        const isDimmed = activeNode && !isSelf && !isRelatedNode;

        ctx.save();
        ctx.shadowBlur = (isSelf || isRelatedNode) ? 15 : 0;
        ctx.shadowColor = isSelf ? "#00e5ff" : isRelatedNode ? "#10b981" : "transparent";

        // Draw core node dot
        ctx.beginPath();
        ctx.arc(node.currentX, node.currentY, node.radius + (isSelf ? 2 : 0), 0, Math.PI * 2);
        
        if (isSelf) {
          ctx.fillStyle = "#00e5ff";
        } else if (isRelatedNode) {
          ctx.fillStyle = "#10b981";
        } else {
          ctx.fillStyle = isDimmed ? "rgba(255, 255, 255, 0.15)" : "rgba(255, 255, 255, 0.6)";
        }
        ctx.fill();
        ctx.restore();

        // Draw node rings
        if (isSelf || isRelatedNode) {
          ctx.beginPath();
          ctx.arc(node.currentX, node.currentY, node.radius + (isSelf ? 7 : 5), 0, Math.PI * 2);
          ctx.strokeStyle = isSelf ? "rgba(0, 229, 255, 0.3)" : "rgba(16, 185, 129, 0.2)";
          ctx.lineWidth = 1;
          ctx.stroke();
        }

        // Draw labels
        const shouldShowLabel = !activeNode || isSelf || isRelatedNode;
        if (shouldShowLabel) {
          ctx.fillStyle = isSelf 
            ? "#ffffff" 
            : isRelatedNode 
              ? "rgba(243, 244, 246, 0.8)" 
              : "rgba(243, 244, 246, 0.4)";
          
          ctx.font = isSelf 
            ? "bold 11px var(--font-mono)" 
            : "9px var(--font-mono)";
          
          ctx.textAlign = "center";
          
          // Draw text offset below node
          ctx.fillText(
            node.project.title.toUpperCase(),
            node.currentX,
            node.currentY + node.radius + 18
          );
        }
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      canvas.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("click", handleCanvasClick);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isMobile, constellationProjects, router]);

  // Mobile fallback rendering: list categorized by theme/relation
  if (isMobile) {
    return (
      <div className="flex flex-col space-y-4">
        {constellationProjects.filter((p) => p.featured).map((proj) => {
          // Find related project names
          const relatedNames = constellationProjects
            .filter((p) => areRelated(proj, p))
            .map((p) => p.title);

          return (
            <div
              key={proj.slug}
              onClick={() => router.push(`/projects/${proj.slug}`)}
              className="p-5 rounded-lg border border-border-subtle bg-bg-card/40 backdrop-blur-sm cursor-pointer"
            >
              <div className="flex items-center space-x-2 text-accent font-mono text-[9px] tracking-widest uppercase">
                <Star size={10} className="fill-accent" />
                <span>Featured Laboratory Node</span>
              </div>
              <h3 className="font-display font-bold text-text-primary text-base mt-2 tracking-wider">
                {proj.title}
              </h3>
              <p className="text-xs text-text-secondary mt-1">
                {proj.subtitle}
              </p>
              {relatedNames.length > 0 && (
                <div className="mt-4 pt-3 border-t border-border-subtle/40">
                  <span className="text-[9px] font-mono text-text-muted uppercase block">Related Connections:</span>
                  <div className="flex flex-wrap gap-1.5 mt-1.5">
                    {relatedNames.slice(0, 3).map((name) => (
                      <span key={name} className="text-[9px] font-mono px-2 py-0.5 rounded border border-border-subtle bg-bg-dark text-text-secondary">
                        {name}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    );
  }

  return (
    <div className="relative w-full border border-border-subtle rounded-xl bg-bg-card/20 overflow-hidden select-none">
      {/* Visual Instruction Badge */}
      <div className="absolute top-4 left-4 z-10 pointer-events-none font-mono text-[9px] text-text-muted bg-bg-dark/70 border border-border-subtle px-2 py-1 rounded">
        INTERACTIVE PROJECT CONSTELLATION
      </div>

      <canvas ref={canvasRef} className="block w-full bg-transparent" />

      {/* Floating Info Overlay for hovered node */}
      <div className="absolute bottom-4 right-4 z-10 w-64 pointer-events-none transition-all duration-300">
        {hoveredNode ? (
          <div className="p-4 rounded-lg border border-accent/20 bg-bg-dark/90 backdrop-blur-md">
            <span className="font-mono text-[9px] text-accent tracking-widest uppercase block mb-1">
              Category: {hoveredNode.project.category.join(" & ")}
            </span>
            <h4 className="font-display font-bold text-sm text-text-primary tracking-wide">
              {hoveredNode.project.title}
            </h4>
            <p className="text-[11px] text-text-secondary mt-1.5 line-clamp-3 leading-relaxed">
              {hoveredNode.project.description}
            </p>
            <div className="mt-3 flex items-center text-[10px] text-accent font-mono">
              <span>View System Specifications</span>
              <ArrowRight size={10} className="ml-1 animate-pulse" />
            </div>
          </div>
        ) : (
          <div className="p-3 rounded-lg border border-border-subtle bg-bg-dark/60 text-[10px] font-mono text-text-muted text-center leading-relaxed">
            Hover over nodes to visualize shared engineering ties and pathways.
          </div>
        )}
      </div>
    </div>
  );
}

export default ProjectConstellation;
