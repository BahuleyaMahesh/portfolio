# Bahuleya M — Premium Personal Engineering Portfolio

A production-quality personal portfolio website and interactive AI/engineering laboratory built for **Bahuleya M** (B.E. Computer Science, AI & ML at RV College of Engineering, 2024–2028).

Designed with a high-fidelity cinematic technical dark mode theme, featuring strict maintainability controls and advanced interactive animations.

---

## 🚀 Key Features

*   **Content-Presentation Isolation**: Zero hardcoded page strings. Content is housed strictly in TypeScript contracts (`/data/*`), separating structural data from React rendering views.
*   **Interactive Visualizations**:
    *   **System Map**: Glowing responsive SVG connection lines linking computer intelligence categories to active engineering projects.
    *   **Project Constellation**: High-performance 2D HTML Canvas showing projects as gravity-responsive celestial nodes sharing technical ties.
    *   **Architecture Graph**: Reusable, flow-chart builder that plots data pipelines and percept-to-actuation steps for major projects.
*   **Global Command Palette**: A keyboard-accessible overlay (`Cmd/Ctrl + K`) allowing visitors to query the project database, trigger links, and run navigation macros.
*   **Custom Micro-Interactions**: Magnetic physics-based navigation triggers, entrance reveal animations, glassmorphic card layers, and an interactive cinematic custom cursor.
*   **SEO & Accessibility Audits**: Integrated page titles, meta descriptions, semantic HTML5 structure, skip-to-content supports, and media fallback readouts.

---

## 📂 Architecture Directory Outline

```text
├── app/                      # Next.js App Router (Entry & Pages)
│   ├── globals.css           # Cinematic dark theme tokens & utility CSS
│   ├── layout.tsx            # Global Shell (Navbar, Footer, Cursor, Search Palette)
│   ├── page.tsx              # Dynamic Laboratory Home Dashboard
│   ├── projects/             # Projects Archive Routing
│   ├── research/             # Computational Genomics Research page
│   └── about/                # Personnel details & skills matrix
├── components/               # View Layers (Presentational UI)
│   ├── ui/                   # Reusable widgets (GlassPanel, MagneticButton, Reveal, Cursor)
│   ├── layout/               # Shell elements (Navbar, Footer, CommandPalette)
│   ├── hero/                 # Telemetry panels and Hero headlines
│   ├── projects/             # Portfolio media and list grids
│   └── visualizations/       # SystemMap, Constellation, and ArchitectureGraph
├── data/                     # Content Layer (Strictly Structured)
│   ├── site.ts               # Name, contact info, bio summaries
│   ├── projects.ts           # Full database of main and archived projects
│   ├── research.ts           # Academic genomics research milestones
│   └── skills.ts             # Categorized capabilities and tech stacks
├── types/                    # TypeScript System Contracts
│   ├── project.ts            # Interfaces for project structures & nodes
│   ├── site.ts               # Global configurations structure
│   └── research.ts           # Genomics data structures
└── lib/                      # Base Utilities
    ├── utils.ts              # Tailwind CSS class merging helper
    └── motion.ts             # Framer Motion animation variants
```

---

## 🛠️ Installation & Telemetry Running

Follow these instructions to run or build the system locally:

### 1. Install System Dependencies
Install package dependencies:
```bash
npm install
```

### 2. Run Local Development Server
Boot up the local engineering server:
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) inside your browser to view the active laboratory dashboard.

### 3. Run Production Compilation
Verify there are no TypeScript compiler warnings and compile the code into production-ready static outputs:
```bash
npm run build
```

---

## ⚙️ How to Update Content

Since content is cleanly decoupled, you do not need to edit any UI files under `components/` or `app/` to update project specs. Simply modify the typescript arrays under `data/`:

*   **To Add a Project**: Append a new project object to `data/projects.ts` adhering to the `Project` interface. Define its `architecture` nodes/edges to automatically trigger its layout flow in the details page.
*   **To Update Research Logs**: Append research events or details to `data/research.ts`.
*   **To Edit Skills**: Modify the `skillCategories` list in `data/skills.ts`.
