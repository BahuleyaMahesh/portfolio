"use client";

import React, { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Folder, FileText, ArrowRight, User, Terminal, BookOpen, ExternalLink, X } from "lucide-react";
import { projects } from "@/data/projects";
import { siteConfig } from "@/data/site";
import { scaleIn } from "@/lib/motion";

export function CommandPalette() {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  // Custom event listener for Navbar trigger
  useEffect(() => {
    const handleToggle = () => setIsOpen((prev) => !prev);
    window.addEventListener("toggle-command-palette", handleToggle);
    return () => window.removeEventListener("toggle-command-palette", handleToggle);
  }, []);

  // Shortcut key listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      }
      if (e.key === "Escape") {
        setIsOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Auto focus input on open
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
      setSearchQuery("");
      setSelectedIndex(0);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isOpen]);

  // Handle outside clicks
  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      setIsOpen(false);
    }
  };

  // Compile search items
  const filteredProjects = projects.filter((project) => {
    const q = searchQuery.toLowerCase();
    return (
      project.title.toLowerCase().includes(q) ||
      project.subtitle.toLowerCase().includes(q) ||
      project.description.toLowerCase().includes(q) ||
      project.tags.some((tag) => tag.toLowerCase().includes(q)) ||
      project.technologies.some((tech) => tech.toLowerCase().includes(q)) ||
      project.category.some((cat) => cat.toLowerCase().includes(q))
    );
  });

  const staticCommands = [
    { label: "Go to Home", action: () => router.push("/"), icon: Terminal, category: "Navigation" },
    { label: "Go to Selected Work Archive", action: () => router.push("/projects"), icon: Folder, category: "Navigation" },
    { label: "Go to Research Page", action: () => router.push("/research"), icon: BookOpen, category: "Navigation" },
    { label: "Go to About Page", action: () => router.push("/about"), icon: User, category: "Navigation" },
    { label: "Download Resume", action: () => window.open(siteConfig.resume, "_blank"), icon: FileText, category: "Quick Actions" },
    { label: "Open GitHub", action: () => window.open(siteConfig.github, "_blank"), icon: ExternalLink, category: "External" },
    { label: "Open LinkedIn", action: () => window.open(siteConfig.linkedin, "_blank"), icon: ExternalLink, category: "External" },
  ];

  const filteredCommands = staticCommands.filter((cmd) =>
    cmd.label.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalItems = filteredProjects.length + filteredCommands.length;

  // Handle keyboard navigation inside list
  useEffect(() => {
    const handleNavigation = (e: KeyboardEvent) => {
      if (!isOpen || totalItems === 0) return;

      if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelectedIndex((prev) => (prev + 1) % totalItems);
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelectedIndex((prev) => (prev - 1 + totalItems) % totalItems);
      } else if (e.key === "Enter") {
        e.preventDefault();
        triggerAction(selectedIndex);
      }
    };

    window.addEventListener("keydown", handleNavigation);
    return () => window.removeEventListener("keydown", handleNavigation);
  }, [isOpen, totalItems, selectedIndex]);

  const triggerAction = (index: number) => {
    if (index < filteredProjects.length) {
      // It's a project
      router.push(`/projects/${filteredProjects[index].slug}`);
    } else {
      // It's a static command
      const commandIndex = index - filteredProjects.length;
      filteredCommands[commandIndex].action();
    }
    setIsOpen(false);
  };

  // Scroll active item into view
  useEffect(() => {
    const activeElement = listRef.current?.querySelector("[data-active='true']");
    if (activeElement) {
      activeElement.scrollIntoView({ block: "nearest" });
    }
  }, [selectedIndex]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          onClick={handleOverlayClick}
          className="fixed inset-0 z-[9999] bg-bg-dark/85 backdrop-blur-md flex items-start justify-center pt-[15vh] px-4"
          role="dialog"
          aria-modal="true"
        >
          <motion.div
            variants={scaleIn(0.25)}
            initial="hidden"
            animate="visible"
            exit="hidden"
            className="w-full max-w-2xl bg-bg-card border border-border-subtle rounded-xl shadow-2xl overflow-hidden flex flex-col max-h-[50vh]"
          >
            {/* Search Input */}
            <div className="flex items-center px-4 border-b border-border-subtle">
              <Search className="text-text-muted mr-3" size={18} />
              <input
                ref={inputRef}
                type="text"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setSelectedIndex(0);
                }}
                placeholder="Search projects, navigation, social links..."
                className="w-full bg-transparent py-4 text-sm text-text-primary placeholder-text-muted focus:outline-none"
              />
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 rounded bg-bg-dark hover:bg-border-subtle text-text-muted hover:text-text-primary transition-colors"
              >
                <X size={14} />
              </button>
            </div>

            {/* Results List */}
            <div ref={listRef} className="flex-grow overflow-y-auto p-2 scrollbar-thin">
              {totalItems === 0 ? (
                <div className="text-center py-8 text-xs font-mono text-text-muted">
                  No matching commands or projects found.
                </div>
              ) : (
                <>
                  {/* Projects Section */}
                  {filteredProjects.length > 0 && (
                    <div>
                      <div className="px-3 py-1.5 text-[10px] font-mono tracking-widest text-text-muted uppercase">
                        Projects
                      </div>
                      <div className="space-y-0.5">
                        {filteredProjects.map((project, idx) => {
                          const isSelected = idx === selectedIndex;
                          return (
                            <div
                              key={project.slug}
                              data-active={isSelected}
                              onClick={() => triggerAction(idx)}
                              className={`flex items-center justify-between px-3 py-2.5 rounded-lg cursor-pointer transition-all duration-150 ${
                                isSelected ? "bg-accent/10 border border-accent/20 text-accent" : "text-text-secondary hover:bg-bg-dark border border-transparent"
                              }`}
                            >
                              <div className="flex items-center space-x-3 overflow-hidden">
                                <span className="font-mono text-xs text-text-muted">#{project.number}</span>
                                <div className="text-left overflow-hidden">
                                  <div className="text-sm font-semibold truncate">{project.title}</div>
                                  <div className="text-xs text-text-muted truncate">{project.subtitle}</div>
                                </div>
                              </div>
                              <ArrowRight size={14} className={isSelected ? "opacity-100" : "opacity-0"} />
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {/* Actions Section */}
                  {filteredCommands.length > 0 && (
                    <div className="mt-4">
                      <div className="px-3 py-1.5 text-[10px] font-mono tracking-widest text-text-muted uppercase">
                        System Commands
                      </div>
                      <div className="space-y-0.5">
                        {filteredCommands.map((cmd, idx) => {
                          const actualIdx = idx + filteredProjects.length;
                          const isSelected = actualIdx === selectedIndex;
                          const CmdIcon = cmd.icon;
                          return (
                            <div
                              key={cmd.label}
                              data-active={isSelected}
                              onClick={() => triggerAction(actualIdx)}
                              className={`flex items-center justify-between px-3 py-2.5 rounded-lg cursor-pointer transition-all duration-150 ${
                                isSelected ? "bg-accent/10 border border-accent/20 text-accent" : "text-text-secondary hover:bg-bg-dark border border-transparent"
                              }`}
                            >
                              <div className="flex items-center space-x-3">
                                <CmdIcon size={16} className={isSelected ? "text-accent" : "text-text-muted"} />
                                <span className="text-sm font-medium">{cmd.label}</span>
                              </div>
                              <span className="text-[9px] font-mono px-2 py-0.5 rounded bg-bg-dark text-text-muted uppercase">
                                {cmd.category}
                              </span>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>

            {/* Helper Footer */}
            <div className="px-4 py-2 border-t border-border-subtle bg-bg-dark/60 flex items-center justify-between text-[10px] font-mono text-text-muted">
              <div className="flex space-x-4">
                <span><kbd className="px-1 py-0.5 bg-bg-dark rounded border border-border-subtle">↑↓</kbd> Navigate</span>
                <span><kbd className="px-1 py-0.5 bg-bg-dark rounded border border-border-subtle">Enter</kbd> Select</span>
              </div>
              <div>Press <kbd className="px-1 py-0.5 bg-bg-dark rounded border border-border-subtle">ESC</kbd> to exit</div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

export default CommandPalette;
