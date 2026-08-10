import { ResearchTheme, ResearchItem } from "@/types/research";

export const researchThemes: ResearchTheme[] = [
  {
    title: "Healthcare Analytics",
    description: "Developing models to analyze electronic health records and diagnostic datasets to uncover hidden clinical patterns."
  },
  {
    title: "Bioinformatics Pipelines",
    description: "Building automated workflows for genome alignment, processing fasta/fastq files, and pathway mapping."
  },
  {
    title: "In-silico Analysis & RDKit",
    description: "Using chemical informatics algorithms to simulate molecule-target bindings and drug-disease interaction paths."
  },
  {
    title: "Statistical Modeling & Interpretability",
    description: "Applying robust statistical testing (ANOVA, PCA, clustering) and explainable AI models to high-dimensional biology datasets."
  }
];

export const researchTimeline: ResearchItem[] = [
  
  {
    id: "insilico-docking",
    title: "In-Silico Molecule Profiling with RDKit",
    institution: "Centre of Excellence for Biomedical Analytics (RVCE)",
    role: "Research Member",
    period: "Mid 2025",
    description: "Investigated computational molecular fingerprint mapping techniques using RDKit libraries.",
    details: [
      "Computed SMILES representation fingerprints and calculated similarity matrices.",
      "Mapped structural properties of molecules against known receptor docking targets."
    ],
    themes: ["In-silico Analysis & RDKit", "Healthcare Analytics"]
  },
  {
    id: "genomic-stats",
    title: "Biomedical Statistical Studies",
    institution: "Centre of Excellence for Biomedical Analytics (RVCE)",
    role: "Research Member",
    period: "Early 2025",
    description: "Aided in conducting hypothesis testing and dimensionality reduction on biological datasets.",
    details: [
      "Utilized Principal Component Analysis (PCA) to visualize sample clusters and filter noise.",
      "Drafted statistical methodologies for evaluating biomarker selection significance."
    ],
    themes: ["Statistical Modeling & Interpretability"]
  }
];
