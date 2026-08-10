"use client";

import React, { useState, useEffect, useRef } from "react";
import { ArrowRight, Info } from "lucide-react";
import { ProjectArchitecture, ArchitectureNode } from "@/types/project";
import { cn } from "@/lib/utils";

interface ArchitectureGraphProps {
  architecture: ProjectArchitecture;
}

export function ArchitectureGraph({ architecture }: ArchitectureGraphProps) {
  const { nodes, edges } = architecture;
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);
  const [nodePositions, setNodePositions] = useState<{ [key: string]: { x: number; y: number; w: number; h: number } }>({});
  const [isMobile, setIsMobile] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const nodeRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

  // Mobile check and position calculation
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      updateNodePositions();
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    // Trigger double check after layout shifts
    const timer = setTimeout(updateNodePositions, 500);

    return () => {
      window.removeEventListener("resize", handleResize);
      clearTimeout(timer);
    };
  }, [nodes]);

  const updateNodePositions = () => {
    if (!containerRef.current || window.innerWidth < 768) return;

    const containerRect = containerRef.current.getBoundingClientRect();
    const positions: typeof nodePositions = {};

    nodes.forEach((node) => {
      const nodeEl = nodeRefs.current[node.id];
      if (nodeEl) {
        const rect = nodeEl.getBoundingClientRect();
        positions[node.id] = {
          x: rect.left - containerRect.left,
          y: rect.top - containerRect.top,
          w: rect.width,
          h: rect.height,
        };
      }
    });

    setNodePositions(positions);
  };

  // Determine highlight state for lines and nodes
  const isNodeConnected = (nodeId: string) => {
    if (!hoveredNode) return true;
    if (hoveredNode === nodeId) return true;
    return edges.some(
      (edge) =>
        (edge.from === hoveredNode && edge.to === nodeId) ||
        (edge.from === nodeId && edge.to === hoveredNode)
    );
  };

  const isEdgeHighlighted = (from: string, to: string) => {
    if (!hoveredNode) return false;
    return from === hoveredNode || to === hoveredNode;
  };

  return (
    <div className="w-full py-8 select-none">
      {/* Active Node Detail Card */}
      <div className="min-h-[70px] mb-8 p-4 rounded-lg border border-accent/20 bg-accent/5 backdrop-blur-md transition-all duration-300">
        <div className="flex items-start space-x-3">
          <Info className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" />
          <div>
            <span className="font-mono text-[9px] text-accent tracking-widest uppercase block mb-1">
              {hoveredNode 
                ? `System Node: ${nodes.find(n => n.id === hoveredNode)?.label}`
                : "Interactive Architecture System"
              }
            </span>
            <p className="text-xs text-text-secondary leading-relaxed">
              {hoveredNode 
                ? nodes.find(n => n.id === hoveredNode)?.description 
                : "Hover over the nodes in the diagram below to inspect data flows, module tasks, and system dependencies."
              }
            </p>
          </div>
        </div>
      </div>

      <div ref={containerRef} className="relative w-full min-h-[300px] md:min-h-[220px]">
        {/* SVG Drawing Canvas (Desktop only) */}
        {!isMobile && Object.keys(nodePositions).length > 0 && (
          <svg className="absolute inset-0 w-full h-full pointer-events-none z-0">
            <defs>
              <marker
                id="arrow"
                viewBox="0 0 10 10"
                refX="8"
                refY="5"
                markerWidth="6"
                markerHeight="6"
                orient="auto-start-reverse"
              >
                <path d="M 0 1 L 10 5 L 0 9 z" fill="rgba(255, 255, 255, 0.15)" />
              </marker>
              <marker
                id="arrow-active"
                viewBox="0 0 10 10"
                refX="8"
                refY="5"
                markerWidth="6"
                markerHeight="6"
                orient="auto-start-reverse"
              >
                <path d="M 0 1 L 10 5 L 0 9 z" fill="#00e5ff" />
              </marker>
            </defs>

            {/* Draw Edges */}
            {edges.map((edge, idx) => {
              const start = nodePositions[edge.from];
              const end = nodePositions[edge.to];

              if (!start || !end) return null;

              // Connect from right side of source node to left side of target node
              // If target is to the left, connect appropriately
              const isTargetLeft = start.x > end.x;
              const isTargetAbove = Math.abs(start.x - end.x) < 50;

              let startPoint = { x: start.x + start.w, y: start.y + start.h / 2 };
              let endPoint = { x: end.x, y: end.y + end.h / 2 };

              if (isTargetLeft) {
                startPoint = { x: start.x, y: start.y + start.h / 2 };
                endPoint = { x: end.x + end.w, y: end.y + end.h / 2 };
              } else if (isTargetAbove) {
                const startAbove = start.y > end.y;
                startPoint = { x: start.x + start.w / 2, y: startAbove ? start.y : start.y + start.h };
                endPoint = { x: end.x + end.w / 2, y: startAbove ? end.y + end.h : end.y };
              }

              const isHighlighted = isEdgeHighlighted(edge.from, edge.to);
              const dx = endPoint.x - startPoint.x;
              const dy = endPoint.y - startPoint.y;

              // Cubic bezier control points
              let controlX1 = startPoint.x + dx * 0.5;
              let controlY1 = startPoint.y;
              let controlX2 = endPoint.x - dx * 0.5;
              let controlY2 = endPoint.y;

              if (isTargetAbove) {
                controlX1 = startPoint.x;
                controlY1 = startPoint.y + dy * 0.5;
                controlX2 = endPoint.x;
                controlY2 = endPoint.y - dy * 0.5;
              }

              const pathStr = `M ${startPoint.x} ${startPoint.y} C ${controlX1} ${controlY1}, ${controlX2} ${controlY2}, ${endPoint.x} ${endPoint.y}`;

              return (
                <g key={`edge-${idx}`}>
                  {/* Glowing backing */}
                  {isHighlighted && (
                    <path
                      d={pathStr}
                      fill="none"
                      stroke="#00e5ff"
                      strokeWidth={3}
                      className="opacity-20 blur-sm"
                    />
                  )}
                  {/* Solid path */}
                  <path
                    d={pathStr}
                    fill="none"
                    stroke={isHighlighted ? "#00e5ff" : "rgba(255, 255, 255, 0.08)"}
                    strokeWidth={isHighlighted ? 1.5 : 1}
                    markerEnd={isHighlighted ? "url(#arrow-active)" : "url(#arrow)"}
                    strokeDasharray={edge.animated || isHighlighted ? "5 5" : "none"}
                    className={cn(
                      (edge.animated || isHighlighted) && "animate-[scanline_25s_linear_infinite]"
                    )}
                  />
                </g>
              );
            })}
          </svg>
        )}

        {/* Nodes Grid Layout */}
        <div className={cn(
          "relative z-10 flex w-full",
          isMobile 
            ? "flex-col space-y-4" 
            : "flex-wrap items-center justify-center gap-x-12 gap-y-10 py-6"
        )}>
          {nodes.map((node) => {
            const isHighlighted = hoveredNode === node.id;
            const isConnected = isNodeConnected(node.id);
            const isDimmed = hoveredNode !== null && !isConnected;

            return (
              <div
                key={node.id}
                ref={(el) => {
                  nodeRefs.current[node.id] = el;
                }}
                onMouseEnter={() => setHoveredNode(node.id)}
                onMouseLeave={() => setHoveredNode(null)}
                tabIndex={0}
                onFocus={() => setHoveredNode(node.id)}
                onBlur={() => setHoveredNode(null)}
                className={cn(
                  "px-4 py-2.5 rounded border border-border-subtle bg-bg-card/75 md:w-[150px] text-center cursor-pointer transition-all duration-300 select-none relative focus:outline-none focus:border-accent",
                  isHighlighted ? "border-accent text-accent shadow-[0_0_15px_rgba(0,229,255,0.1)]" : "text-text-primary",
                  isDimmed ? "opacity-25" : "opacity-100"
                )}
              >
                {/* Node Label */}
                <span className="font-mono text-xs font-semibold uppercase tracking-wider block">
                  {node.label}
                </span>

                {/* Node Type Indicator */}
                <span className="text-[8px] font-mono text-text-muted mt-1 uppercase tracking-widest block">
                  {node.type}
                </span>

                {/* Mobile Connective Line Indicator */}
                {isMobile && nodes.indexOf(node) < nodes.length - 1 && (
                  <div className="flex justify-center items-center h-6 mt-4">
                    <ArrowRight size={14} className="rotate-90 text-text-muted animate-pulse" />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default ArchitectureGraph;
