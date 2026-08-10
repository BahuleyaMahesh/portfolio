"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, FileText, ChevronRight } from "lucide-react";
import { siteConfig } from "@/data/site";
import { navigationLinks } from "@/data/navigation";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMac, setIsMac] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    // Detect OS for shortcut display
    if (typeof window !== "undefined") {
      setIsMac(navigator.platform.toUpperCase().indexOf("MAC") >= 0);
    }

    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const openCommandPalette = () => {
    // Dispatch a custom event to open the command palette
    const event = new CustomEvent("toggle-command-palette");
    window.dispatchEvent(event);
  };

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-6 sm:px-12 py-6",
          isScrolled ? "py-4 bg-bg-dark/85 backdrop-blur-md border-b border-border-subtle" : "bg-transparent"
        )}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Logo */}
          <Link 
            href="/" 
            className="flex items-center space-x-2 group"
          >
            <div className="relative w-8 h-8 rounded border border-accent/40 flex items-center justify-center font-mono text-sm text-accent bg-accent/5 overflow-hidden group-hover:border-accent transition-colors">
              <span className="font-bold">B</span>
              <div className="absolute inset-0 bg-accent/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
            </div>
            <span className="font-display font-semibold tracking-wider text-text-primary text-lg group-hover:text-accent transition-colors">
              {siteConfig.name.toUpperCase()}
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navigationLinks.map((link) => {
              const isActive = pathname === link.href || (link.href !== "/" && pathname.startsWith(link.href));
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className="relative text-sm tracking-widest uppercase font-mono text-text-secondary hover:text-text-primary transition-colors py-2"
                >
                  {link.label}
                  {isActive && (
                    <motion.span
                      layoutId="activeNavIndicator"
                      className="absolute bottom-0 left-0 right-0 h-[2px] bg-accent"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Actions */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Search Shortcut */}
            <button
              onClick={openCommandPalette}
              className="flex items-center space-x-2 px-3 py-1.5 rounded-lg border border-border-subtle bg-bg-card/40 hover:border-accent/40 text-text-muted hover:text-accent text-xs font-mono transition-all duration-300"
            >
              <span>Search</span>
              <kbd className="px-1.5 py-0.5 rounded bg-bg-dark border border-border-subtle text-[10px] text-text-muted">
                {isMac ? "⌘K" : "Ctrl+K"}
              </kbd>
            </button>

            {/* Resume Button */}
            <a
              href={siteConfig.resume}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2 px-4 py-2 rounded-lg border border-accent/30 hover:border-accent bg-accent/5 hover:bg-accent/15 text-accent text-xs font-mono tracking-wider transition-all duration-300"
            >
              <FileText size={14} />
              <span>RESUME</span>
            </a>
          </div>

          {/* Mobile Menu & Command Toggle */}
          <div className="flex md:hidden items-center space-x-3">
            {/* Command Trigger */}
            <button
              onClick={openCommandPalette}
              className="p-2 rounded-lg border border-border-subtle bg-bg-card/40 text-text-secondary"
            >
              <span className="font-mono text-xs text-accent">⌘K</span>
            </button>

            {/* Menu Trigger */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-lg border border-border-subtle bg-bg-card/40 text-text-secondary hover:text-text-primary"
            >
              {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-bg-dark/95 backdrop-blur-lg pt-28 px-8 flex flex-col md:hidden"
          >
            <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none" />
            <nav className="flex flex-col space-y-6 text-left">
              {navigationLinks.map((link) => {
                const isActive = pathname === link.href || (link.href !== "/" && pathname.startsWith(link.href));
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={cn(
                      "text-2xl font-display font-medium flex items-center justify-between border-b border-border-subtle pb-4",
                      isActive ? "text-accent" : "text-text-secondary"
                    )}
                  >
                    <span>{link.label}</span>
                    <ChevronRight size={20} className={isActive ? "text-accent" : "text-text-muted"} />
                  </Link>
                );
              })}
            </nav>

            <div className="mt-12 flex flex-col space-y-4">
              <a
                href={siteConfig.resume}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center justify-center space-x-2 w-full py-4 rounded-lg border border-accent/40 bg-accent/5 hover:bg-accent/15 text-accent font-mono text-sm tracking-widest transition-colors"
              >
                <FileText size={18} />
                <span>DOWNLOAD RESUME</span>
              </a>
              
              <div className="text-center text-text-muted text-xs font-mono pt-8">
                {siteConfig.university} · 2024–2028
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default Navbar;
