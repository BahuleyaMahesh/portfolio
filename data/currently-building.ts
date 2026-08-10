export interface ActiveProjectFocus {
  title: string;
  status: string;
  focus: string;
  next: string;
}

export const activeProject: ActiveProjectFocus = {
  title: "JARVIS",
  status: "IN DEVELOPMENT",
  focus: "Fact Memory → Planner Integration",
  next: "Decision Engine"
};

export const exploringFields: string[] = [
  "Computer Vision",
  "AI Agents",
  "Robotics",
  "Computational Biology"
];
