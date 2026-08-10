export interface SkillCategory {
  name: string;
  skills: string[];
  description?: string;
}

export const skillCategories: SkillCategory[] = [
  {
    name: "Languages",
    skills: ["Python", "C", "C++", "JavaScript", "R"],
    description: "Core languages used for systems engineering, scientific computing, and full-stack development."
  },
  {
    name: "AI / ML",
    skills: ["PyTorch", "TensorFlow", "YOLO", "Scikit-learn", "OpenCV"],
    description: "Deep learning models, classic machine learning, computer vision, and framework integration."
  },
  {
    name: "AI Systems",
    skills: ["LLMs", "AI Agents", "Memory Systems", "Knowledge Systems"],
    description: "Designing intelligent cognitive architectures, local models, reasoning frameworks, and state systems."
  },
  {
    name: "Web & Software",
    skills: ["Next.js", "React", "Flask", "REST APIs"],
    description: "Building modern responsive user interfaces and robust web APIs to serve intelligent backends."
  },
  {
    name: "Embedded Systems",
    skills: ["ESP32", "Arduino", "Raspberry Pi"],
    description: "Edge computation, microcontrollers, sensor integration, and real-time physical systems control."
  },
  
];
