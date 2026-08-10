export interface EducationItem {
  institution: string;
  degree: string;
  period: string;
  location: string;
  details: string[];
}

export interface ExperienceItem {
  role: string;
  organization: string;
  period: string;
  location: string;
  description: string;
  details: string[];
}

export const educationList: EducationItem[] = [
  {
    institution: "RV College of Engineering (RVCE)",
    degree: "B.E. Computer Science (AI & ML)",
    period: "2024 — 2028",
    location: "Bengaluru, India",
    details: [
      "Deep focus on Core CS, AI Architectures, Machine Learning, and Intelligent Agents.",
      "Conducting research at the Centre of Excellence for Computational Genomics (CoE-CG).",
      "Engineering embedded systems and camera perception for the BAJA SAE vehicle navigation team."
    ]
  }
];

export const experienceList: ExperienceItem[] = [
  {
    role: "Research Assistant (Computational Genomics)",
    organization: "Centre of Excellence for Computational Genomics (RVCE)",
    period: "2025 — Present",
    location: "Bengaluru, India",
    description: "Working on data-driven healthcare, genomics workflows, and biological data processing pipelines.",
    details: [
      "Building bioinformatics workflows for genomics sequence alignment and statistical analysis.",
      "Utilizing Python (RDKit) and R for in-silico chemical informatics and biological pathway analysis.",
      "Designing statistical models to interpret complex biological datasets and ensure model interpretability."
    ]
  },
  {
    role: "Telemetry & Intelligence Systems Lead",
    organization: "HELIOS (BAJA SAE Team, RVCE)",
    period: "2025 — Present",
    location: "Bengaluru, India",
    description: "Designing embedded systems, sensor integration, and real-time planning algorithms for vehicle control and perception.",
    details: [
      "Developing sensor fusion pipelines combining camera feeds, ultrasonic sensors, and radar.",
      "Writing real-time control loops on ESP32 microcontrollers for actuation and state estimation.",
      "Implementing lightweight path planning and obstacle detection algorithms."
    ]
  }
];
