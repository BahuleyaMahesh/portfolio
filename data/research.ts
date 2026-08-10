import { ResearchTheme, ResearchItem } from "@/types/research";

export const researchThemes: ResearchTheme[] = [
  {
    title: "Healthcare Analytics",
    description: "Developing models to analyze electronic health records and diagnostic datasets to uncover hidden clinical patterns."
  },
  {
    title: "Computational Genomics",
    description: "Processing high-throughput sequencing data to understand genetic mutations, expression patterns, and disease correlations."
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
    id: "cg-coe-pipeline",
    title: "Biological Data Pipelines Development",
    institution: "Centre of Excellence for Computational Genomics (RVCE)",
    role: "Research Member",
    period: "Late 2025",
    description: "Architected biological workflow pipelines for cleaning and normalization of expression profiles.",
    details: [
      "Designed Python scripts using Pandas and NumPy to clean massive microarray datasets.",
      "Built statistical verification checkpoints using R to validate clinical subgroup annotations."
    ],
    themes: ["Bioinformatics Pipelines", "Statistical Modeling & Interpretability"]
  },
  {
    id: "insilico-docking",
    title: "In-Silico Molecule Profiling with RDKit",
    institution: "Centre of Excellence for Computational Genomics (RVCE)",
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
    title: "Genomic Association Statistical Studies",
    institution: "Centre of Excellence for Computational Genomics (RVCE)",
    role: "Research Member",
    period: "Early 2025",
    description: "Aided in conducting hypothesis testing and dimensionality reduction on genomic datasets.",
    details: [
      "Utilized Principal Component Analysis (PCA) to visualize sample clusters and filter noise.",
      "Drafted statistical methodologies for evaluating biomarker selection significance."
    ],
    themes: ["Computational Genomics", "Statistical Modeling & Interpretability"]
  }
];
