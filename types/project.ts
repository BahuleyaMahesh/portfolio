export type ProjectCategory = 
  | "AI Systems"
  | "Computer Vision"
  | "Embedded AI"
  | "Healthcare"
  | "Research"
  | "Robotics"
  | "Embedded"
  | "Vehicle Systems"
  | "Web"
  | "Software"
  | "Cybersecurity";

export interface ArchitectureNode {
  id: string;
  label: string;
  type: 'sensor' | 'perception' | 'planner' | 'memory' | 'reasoning' | 'tool' | 'action' | 'process' | 'database' | 'user' | 'model';
  description?: string;
}

export interface ArchitectureEdge {
  from: string;
  to: string;
  label?: string;
  animated?: boolean;
}

export interface ProjectArchitecture {
  nodes: ArchitectureNode[];
  edges: ArchitectureEdge[];
}

export interface ProjectMedia {
  type: 'image' | 'video';
  url: string;
  caption: string;
}

export interface Project {
  slug: string;
  number: string; // e.g. "01"

  title: string;
  subtitle: string;
  description: string;

  category: ProjectCategory[];
  featured: boolean;

  status?: "Completed" | "In Development" | "Research Phase" | "Archived";
  year?: string;

  tags: string[];
  technologies: string[];

  github?: string;
  demo?: string;

  thumbnail?: string; // fallback if image is missing
  heroImage?: string;

  problem?: string;
  solution?: string;

  architecture?: ProjectArchitecture;

  challenges?: string[];
  results?: string[];
  learnings?: string[];
  future?: string[];

  media?: ProjectMedia[];

  relatedProjects?: string[]; // array of slugs
}
