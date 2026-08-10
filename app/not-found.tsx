"use client";

import React from "react";
import Link from "next/link";
import { Terminal, ArrowLeft } from "lucide-react";
import PageTransition from "@/components/layout/PageTransition";
import MagneticButton from "@/components/ui/MagneticButton";

export default function NotFound() {
  return (
    <PageTransition>
      <main className="min-h-screen flex flex-col justify-center items-center px-6 text-center bg-bg-dark font-mono relative overflow-hidden">
        {/* Grid backgrounds */}
        <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none z-0" />
        <div className="absolute inset-0 bg-grid-glow pointer-events-none z-0" />

        <div className="relative z-10 space-y-6 max-w-lg">
          <div className="flex justify-center mb-4">
            <div className="p-3 rounded-full border border-accent-secondary/35 bg-accent-secondary/5 text-accent-secondary animate-pulse">
              <Terminal size={24} />
            </div>
          </div>

          <span className="text-[10px] text-accent-secondary tracking-widest uppercase block font-bold">
            ERROR_SYS_LOG // CODE_404
          </span>

          <h1 className="font-display font-black text-3xl sm:text-5xl text-text-primary uppercase tracking-tight leading-none">
            ROUTE NOT FOUND
          </h1>

          <p className="text-xs sm:text-sm text-text-secondary leading-relaxed font-sans max-w-sm mx-auto">
            The requested memory sector or logical navigation coordinate does not exist in active system maps. 
            Check your query telemetry.
          </p>

          <div className="pt-4 flex justify-center">
            <MagneticButton>
              <Link
                href="/"
                className="flex items-center space-x-2 px-5 py-3 rounded-lg bg-text-primary hover:bg-accent-secondary text-bg-dark text-xs font-bold tracking-widest transition-all duration-300"
              >
                <ArrowLeft size={14} />
                <span>CORE ENTRYPOINT</span>
              </Link>
            </MagneticButton>
          </div>
        </div>
      </main>
    </PageTransition>
  );
}
