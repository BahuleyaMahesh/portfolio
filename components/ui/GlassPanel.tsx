"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface GlassPanelProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  glowOnHover?: boolean;
  gridBackground?: boolean;
}

export function GlassPanel({ 
  children, 
  className, 
  glowOnHover = false, 
  gridBackground = false, 
  ...props 
}: GlassPanelProps) {
  return (
    <div
      className={cn(
        "relative rounded-lg border border-border-subtle bg-bg-card/40 backdrop-blur-md transition-all duration-300",
        glowOnHover && "hover:border-border-glow hover:shadow-[0_0_25px_rgba(0,229,255,0.06)]",
        className
      )}
      {...props}
    >
      {gridBackground && (
        <div className="absolute inset-0 bg-grid-pattern opacity-[0.15] pointer-events-none rounded-lg" />
      )}
      <div className="relative z-10 h-full w-full">{children}</div>
    </div>
  );
}

export default GlassPanel;
