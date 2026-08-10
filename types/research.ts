export interface ResearchTheme {
  title: string;
  description: string;
  icon?: string;
}

export interface ResearchItem {
  id: string;
  title: string;
  institution: string;
  role: string;
  period: string;
  description: string;
  details: string[];
  themes: string[];
  link?: string;
}
