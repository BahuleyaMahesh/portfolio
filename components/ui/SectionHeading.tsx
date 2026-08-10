"use client";

import React from "react";

interface SectionHeadingProps {
  number: string;
  title: string;
  subtitle?: string;
}

export function SectionHeading({ number, title, subtitle }: SectionHeadingProps) {
  return (
    <div className="mb-12 md:mb-16 text-left border-l-2 border-accent pl-4 sm:pl-6 select-none">
      <span className="font-mono text-xs text-text-muted tracking-widest block uppercase mb-1">
        {number} // Laboratory Node
      </span>
      <h2 className="font-display font-black text-3xl sm:text-5xl text-text-primary tracking-wide uppercase leading-none">
        {title}
      </h2>
      {subtitle && (
        <span className="font-mono text-[10px] font-bold text-accent-secondary tracking-widest uppercase mt-2 block">
          {subtitle}
        </span>
      )}
    </div>
  );
}

export default SectionHeading;
