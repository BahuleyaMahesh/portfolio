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
      "Exploring AI in healthcare — building prototypes and tackling hackathon problem statements at the intersection of ML and health.",
      "Engineering embedded systems and camera perception for the BAJA SAE vehicle navigation team."
    ]
  }
];

export const experienceList: ExperienceItem[] = [
  {
    role: "AI in Health — Independent Exploration",
    organization: "Self-directed / Hackathons",
    period: "2024 — Present",
    location: "Bengaluru, India",
    description: "Exploring the intersection of AI and healthcare through independent research and competitive hackathon problem statements.",
    details: [
      "Prototyped AI-powered solutions for healthcare problem statements across multiple hackathons.",
      "Built voice-based patient monitoring systems and clinical decision-support tools as hackathon submissions.",
      "Investigating how LLMs and computer vision can augment diagnostics, triage, and rural health access."
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
