import { Project } from "@/types/project";

export const projects: Project[] = [
  {
    slug: "jarvis",
    number: "01",
    title: "JARVIS",
    subtitle: "Local Cognitive AI Assistant",
    description: "A locally running AI assistant designed around memory, planning, reasoning, and tool use.",
    category: ["AI Systems"],
    featured: true,
    status: "In Development",
    year: "2025 - 2026",
    tags: ["Cognitive Architecture", "AI Agents", "Local LLM", "Memory Systems"],
    technologies: ["Python", "Local LLM", "Memory Systems", "Planner Architecture", "AI Agents"],
    github: "YOUR_GITHUB_URL/jarvis",
    demo: "",
    thumbnail: "/images/projects/jarvis/thumbnail.jpg",
    heroImage: "/images/projects/jarvis/hero.jpg",
    problem: "Most AI assistants rely on heavy cloud services, compromising privacy and introducing high latency. Furthermore, standard conversational models lack persistent episodic memory, precise task-planning engines, and direct tool execution loops, limiting their effectiveness for localized workflows.",
    solution: "A local cognitive AI assistant with a dedicated planner and multi-tiered memory architecture. It routes user requests through a local perception layer, generates step-by-step plans, consults semantic and episodic memory stores, executes local tools via a sandboxed interpreter, and reasons over results before responding.",
    architecture: {
      nodes: [
        { id: "user", label: "User Input", type: "user", description: "Natural language query or voice input." },
        { id: "perception", label: "Perception & Understanding", type: "perception", description: "Tokenizes inputs and detects intention/sentiment." },
        { id: "planner", label: "Planner Engine", type: "planner", description: "Deconstructs complex tasks into structured, sequential steps." },
        { id: "memory", label: "Memory Stores", type: "memory", description: "Contains Short-term (context), Semantic (facts), and Episodic (past logs) memory." },
        { id: "reasoning", label: "Reasoning Loop (LLM)", type: "reasoning", description: "Evaluates goals, formulates tool arguments, and synthesizes final answers." },
        { id: "tools", label: "Tool Executer", type: "tool", description: "Interacts with filesystem, runs local scripts, and fetches web APIs." },
        { id: "response", label: "System Response", type: "action", description: "Structured output delivered back to the user." }
      ],
      edges: [
        { from: "user", to: "perception", animated: true },
        { from: "perception", to: "planner", animated: true },
        { from: "planner", to: "memory", animated: false },
        { from: "memory", to: "reasoning", animated: false },
        { from: "reasoning", to: "tools", animated: true },
        { from: "tools", to: "reasoning", animated: true },
        { from: "reasoning", to: "response", animated: true }
      ]
    },
    challenges: [
      "Optimizing response latency on local hardware for quantization-level LLMs.",
      "Developing a stable planner that does not loop infinitely or deviate during complex tools execution."
    ],
    results: [
      "Successful local execution of custom scripts and context retrieval from semantic stores.",
      "Reliable step-by-step planning for workflows involving multiple filesystem queries."
    ],
    learnings: [
      "Structured JSON schemas are essential for stable tool calling on smaller, locally-hosted LLMs.",
      "Context pruning is critical to keep the model context window lightweight."
    ],
    future: [
      "Integrating visual perception modules for multimodality.",
      "Implementing an autonomous background task execution engine."
    ],
    relatedProjects: ["arms", "gemini-lifeline"]
  },
  {
    slug: "ikshana",
    number: "02",
    title: "IKSHANA",
    subtitle: "AI-Powered Assistive Smart Glasses",
    description: "An assistive computer-vision system designed to help visually impaired users understand their surroundings.",
    category: ["Computer Vision", "Embedded AI"],
    featured: true,
    status: "Completed",
    year: "2025",
    tags: ["Embedded AI", "Computer Vision", "Assistive Tech", "Edge Inference"],
    technologies: ["Raspberry Pi", "ESP32", "YOLO", "TensorFlow Lite", "MobileNet-SSD", "Ultrasonic Sensors"],
    github: "YOUR_GITHUB_URL/ikshana",
    demo: "",
    thumbnail: "/images/projects/ikshana/thumbnail.jpg",
    heroImage: "/images/projects/ikshana/hero.jpg",
    problem: "Visually impaired individuals face daily navigation and hazard detection challenges in dynamic environments. Traditional canes cannot detect overhead obstacles, read text, or identify specific objects like crossing signs, vehicles, or personal items.",
    solution: "Ikshana combines lightweight smart glasses with edge-based computer vision. The system captures video frames via a glasses-mounted camera, passes them to a Raspberry Pi processing unit running TensorFlow Lite and YOLO models, runs spatial proximity calculations using ultrasonic sensors, and speaks description results through audio feedback.",
    architecture: {
      nodes: [
        { id: "camera", label: "Camera & Sensors", type: "sensor", description: "Collects real-time video frames and ultrasonic distance data." },
        { id: "detection", label: "Object Detection (YOLO/SSD)", type: "model", description: "Runs edge inference models to detect people, obstacles, and text." },
        { id: "spatial", label: "Spatial Understanding", type: "process", description: "Calculates bounding box size changes and computes proximity vectors." },
        { id: "context", label: "Contextual Interpreter", type: "reasoning", description: "Determines navigation risks and prioritized alerts based on proximity." },
        { id: "audio", label: "Audio Feedback (TTS)", type: "action", description: "Announces obstacles and spatial descriptions via Text-To-Speech to user earphones." }
      ],
      edges: [
        { from: "camera", to: "detection", animated: true },
        { from: "detection", to: "spatial", animated: true },
        { from: "spatial", to: "context", animated: false },
        { from: "context", to: "audio", animated: true }
      ]
    },
    challenges: [
      "Reducing edge computer vision model sizes to run smoothly at >15 FPS on a Raspberry Pi without overheating.",
      "Designing a non-intrusive, low-latency audio cue hierarchy that doesn't overwhelm the user's auditory senses."
    ],
    results: [
      "Achieved real-time object detection for common indoor/outdoor obstacles at 18 FPS.",
      "Integrated lightweight Text-To-Speech engine running entirely offline on edge hardware."
    ],
    learnings: [
      "Quantizing TensorFlow Lite weights down to INT8 results in massive CPU speedups with negligible accuracy drops.",
      "Sensor fusion between vision (YOLO) and distance (ultrasonic) provides much higher obstacle reliability than vision alone."
    ],
    future: [
      "Migrating to specialized Edge TPUs (Coral USB accelerator) for 40+ FPS inference speeds.",
      "Implementing custom optical character recognition (OCR) for reading documents on the fly."
    ],
    relatedProjects: ["helios-baja", "plant-disease-aid"]
  },
  {
    slug: "arms",
    number: "03",
    title: "ARMS",
    subtitle: "AI Reconstruction of Memory System",
    description: "An AI learning system designed to transform fragmented learning material into connected, queryable knowledge.",
    category: ["AI Systems", "Web"],
    featured: true,
    status: "Completed",
    year: "2025",
    tags: ["Knowledge Graphs", "LLMs", "EdTech", "OCR", "Semantic Search"],
    technologies: ["LLMs", "OCR", "Knowledge Systems", "Document Processing", "Knowledge Graphs"],
    github: "YOUR_GITHUB_URL/arms",
    demo: "",
    thumbnail: "/images/projects/arms/thumbnail.jpg",
    heroImage: "/images/projects/arms/hero.jpg",
    problem: "Students and researchers consume massive amounts of fragmented lecture slides, PDFs, notes, and web resources. Traditional search methods fail to connect cross-document concepts, resulting in rote learning rather than deep conceptual recall.",
    solution: "ARMS automates document ingestion, extracts central concepts and entities using OCR and LLMs, establishes semantic relationships between those concepts, maps them into an interactive Knowledge Graph, and provides a semantic Q&A interface for quick recall and study generation.",
    architecture: {
      nodes: [
        { id: "docs", label: "Source Documents", type: "database", description: "Uploaded PDFs, text files, and handwritten scanned notes." },
        { id: "extraction", label: "Concept Extraction & OCR", type: "process", description: "Extracts text and identifies key definitions and concepts." },
        { id: "concepts", label: "Concept Synthesizer", type: "reasoning", description: "Correlates similar concepts across different file uploads." },
        { id: "relations", label: "Relationship Mapper", type: "model", description: "Defines linkages like 'pre-requisite of', 'contrasts with', or 'example of'." },
        { id: "graph", label: "Interactive Knowledge Graph", type: "database", description: "Stores nodes and edges representing the complete syllabus." },
        { id: "recall", label: "Recall & Quiz Engine", type: "planner", description: "Generates custom quiz questions or study flashcards based on graph linkages." },
        { id: "qa", label: "Q&A System", type: "tool", description: "Allows conversational querying across the conceptual graph structure." }
      ],
      edges: [
        { from: "docs", to: "extraction", animated: true },
        { from: "extraction", to: "concepts", animated: true },
        { from: "concepts", to: "relations", animated: false },
        { from: "relations", to: "graph", animated: true },
        { from: "graph", to: "recall", animated: false },
        { from: "graph", to: "qa", animated: true }
      ]
    },
    challenges: [
      "Resolving coreference issues when different documents refer to the same concept using slightly different terminology.",
      "Developing a responsive, non-laggy visualization for web-based graph displays with over 1000 nodes."
    ],
    results: [
      "Engineered automated knowledge graph construction pipelines that successfully parse 50+ page PDFs in under 2 minutes.",
      "Created query mechanisms that retrieve concept definitions and parent nodes with high semantic accuracy."
    ],
    learnings: [
      "Neo4j or graph-structured JSON data structures map academic curriculums far more intuitively than simple vector databases.",
      "Providing visual node paths in answers significantly boosts user confidence and learning comprehension."
    ],
    future: [
      "Syncing with audio recordings to automatically transcribe lectures and place them on the knowledge timeline.",
      "Adding multi-player collaborative graph mapping for study groups."
    ],
    relatedProjects: ["jarvis", "cyberquest"]
  },
  {
    slug: "krishimitra",
    number: "04",
    title: "KRISHIMITRA",
    subtitle: "AI-Driven Agricultural Advisory Platform",
    description: "A farmer-focused advisory platform combining weather, seasonal, market, and government-scheme information into actionable guidance.",
    category: ["AI Systems", "Web"],
    featured: true,
    status: "Completed",
    year: "2024",
    tags: ["Agriculture AI", "API Integration", "Multilingual", "Flask"],
    technologies: ["Python", "Flask", "REST APIs", "Weather APIs", "Agricultural Advisory", "Multilingual UI"],
    github: "YOUR_GITHUB_URL/krishimitra",
    demo: "",
    thumbnail: "/images/projects/krishimitra/thumbnail.jpg",
    heroImage: "/images/projects/krishimitra/hero.jpg",
    problem: "Small-scale farmers in India often lack real-time local advisory. They have to navigate multiple disjoint sources to learn about local market price fluctuations, changing weather forecasts, government benefits, and pest outbreaks.",
    solution: "KrishiMitra (Farmer's Friend) integrates API feeds into a unified dashboard. It aggregates real-time weather metrics, agricultural commodity prices, regional cropping calendars, and active government scheme parameters, routing them through an advisory engine that generates simple, actionable, local-language farming tips.",
    architecture: {
      nodes: [
        { id: "weather", label: "Weather API", type: "sensor", description: "Fetches local humidity, precipitation probability, and temperatures." },
        { id: "market", label: "Market APIs", type: "database", description: "Pulls current crop commodity pricing indices from government portals." },
        { id: "schemes", label: "Govt Schemes DB", type: "database", description: "Catalogs state and national agriculture assistance programs." },
        { id: "engine", label: "Advisory Engine", type: "reasoning", description: "Correlates weather conditions and seasonal cycles to form agricultural suggestions." },
        { id: "farmer", label: "Farmer UI (Multilingual)", type: "user", description: "Presents guidance in regional languages via a lightweight web portal." }
      ],
      edges: [
        { from: "weather", to: "engine", animated: true },
        { from: "market", to: "engine", animated: false },
        { from: "schemes", to: "engine", animated: false },
        { from: "engine", to: "farmer", animated: true }
      ]
    },
    challenges: [
      "Standardizing disparate, unformatted public agricultural market data feeds into a clean relational structure.",
      "Optimizing load speeds for farmers accessing the site on slow, rural 3G networks."
    ],
    results: [
      "Deployed a lightweight Flask application with localized dashboards supporting multiple regional dialects.",
      "Created an automated advisory compiler that maps weather drops to pest alert warnings."
    ],
    learnings: [
      "User experience for agrarian applications must be visual-heavy and support text-to-speech due to literacy variances.",
      "Caching API responses locally is necessary to avoid API rate limits and keep dashboard loads sub-second."
    ],
    future: [
      "Integrating a WhatsApp bot interface to deliver notifications directly to mobile phones.",
      "Incorporating leaf disease photo uploads for on-site machine learning diagnostics."
    ],
    relatedProjects: ["plant-disease-aid", "solar-powered-awg"]
  },
  {
    slug: "healthcare-genomics",
    number: "05",
    title: "Healthcare & Computational Genomics",
    subtitle: "Research and Data-Driven Healthcare",
    description: "Research and analytical work spanning healthcare datasets, computational genomics, biological data pipelines, and statistical analysis.",
    category: ["Research", "Healthcare"],
    featured: true,
    status: "Research Phase",
    year: "2025",
    tags: ["Bioinformatics", "Computational Biology", "Statistical Modeling", "RDKit"],
    technologies: ["Python", "R", "Bioinformatics", "Computational Genomics", "Healthcare Analytics", "Statistical Modeling", "RDKit"],
    github: "YOUR_GITHUB_URL/genomics-research",
    demo: "",
    thumbnail: "/images/projects/healthcare/thumbnail.jpg",
    heroImage: "/images/projects/healthcare/hero.jpg",
    problem: "Biological datasets, particularly genomics sequences and chemical compound databases, are high-dimensional, noisy, and complex. Unearthing disease associations, understanding drug bindings, and creating reproducible processing pipelines requires rigorous statistical methods and domain-specific modeling.",
    solution: "Conducted computational genomics research at the CoE-CG (RVCE). Designed workflows to parse DNA/RNA expression configurations, integrated cheminformatics filters (using RDKit) to evaluate compound similarities, and applied multivariate statistical modeling to map phenotypic disease outcomes to genetic markers.",
    architecture: {
      nodes: [
        { id: "datasets", label: "Biological Datasets", type: "database", description: "Genomic sequence alignments and clinical medical registries." },
        { id: "pipelines", label: "Bioinformatics Pipelines (R/Python)", type: "process", description: "Normalizes raw read counts, applies quality filters, and maps genes." },
        { id: "rdkit", label: "Cheminformatics Engine (RDKit)", type: "model", description: "Profiles molecular SMILES descriptors and calculates binding metrics." },
        { id: "stats", label: "Statistical Analytics (PCA/ANOVA)", type: "reasoning", description: "Reduces dimensionality and evaluates significance of gene markers." },
        { id: "outcomes", label: "Clinical Insights", type: "action", description: "Identifies predictive gene targets and drug-repositioning candidates." }
      ],
      edges: [
        { from: "datasets", to: "pipelines", animated: true },
        { from: "pipelines", to: "stats", animated: true },
        { from: "rdkit", to: "stats", animated: false },
        { from: "stats", to: "outcomes", animated: true }
      ]
    },
    challenges: [
      "Handling severe class imbalances in genomic rare-disease datasets to avoid statistical errors.",
      "Ensuring biological interpretability of deep learning models applied to cell-line expression profiles."
    ],
    results: [
      "Developed robust R-based statistical testing scripts mapping sample groups with low p-value scores.",
      "Created compound clustering visualizations mapping chemical space distributions via RDKit properties."
    ],
    learnings: [
      "Computational research must prioritize pipeline reproducibility; containerizing data pipelines is as vital as the math itself.",
      "Statistical rigor (such as multiple-testing corrections like Bonferroni) is essential to prevent false discoveries in biology."
    ],
    future: [
      "Exploring single-cell RNA sequencing (scRNA-seq) trajectory analysis models.",
      "Developing graph neural network (GNN) models to analyze biological pathway networks."
    ],
    relatedProjects: ["plant-disease-aid", "gemini-lifeline"]
  },
  {
    slug: "helios-baja",
    number: "06",
    title: "Helios / BAJA SAE",
    subtitle: "Vehicle Intelligence & Embedded Systems",
    description: "Engineering work involving steer-by-wire, vehicle control, perception, sensor fusion, and planning.",
    category: ["Robotics", "Embedded", "Vehicle Systems"],
    featured: true,
    status: "In Development",
    year: "2025",
    tags: ["Embedded Systems", "Sensor Fusion", "Vehicle Control", "Path Planning", "BAJA SAE"],
    technologies: ["Embedded Systems", "Camera Perception", "Radar", "Sensor Fusion", "Vehicle Control", "Path Planning"],
    github: "YOUR_GITHUB_URL/baja-helios",
    demo: "",
    thumbnail: "/images/projects/helios/thumbnail.jpg",
    heroImage: "/images/projects/helios/hero.jpg",
    problem: "Off-road autonomous and assisted navigation requires highly robust sensor systems, low-latency microcontrollers, and controls capable of coping with unstructured, bumpy terrain. Traditional vehicle intelligence models fail when lane markings are missing and wheel traction changes dynamically.",
    solution: "Designed the vehicle intelligence stack for the Helios BAJA SAE vehicle. The system integrates multiple sensors (camera, radar, IMU) through a central sensor fusion script, runs state estimation to evaluate wheel-slip, plans navigation paths around physical obstacles, and issues steering commands to active actuators.",
    architecture: {
      nodes: [
        { id: "sensors", label: "Sensors (IMU/Radar/Ultrasonic)", type: "sensor", description: "Measures vehicle acceleration, obstacles distance, and telemetry." },
        { id: "camera", label: "Camera Perception", type: "sensor", description: "Captures high-resolution terrain visuals for road boundaries mapping." },
        { id: "fusion", label: "Sensor Fusion Engine", type: "process", description: "Synthesizes sensor feeds into a unified environmental state map." },
        { id: "planning", label: "Path Planner", type: "planner", description: "Calculates optimal collision-free trajectories on rough off-road terrain." },
        { id: "control", label: "Vehicle Control (PID)", type: "reasoning", description: "Computes motor actuation and steering angle corrections." },
        { id: "actuation", label: "Actuation Loop", type: "action", description: "Drives hardware servo motors and braking systems." }
      ],
      edges: [
        { from: "sensors", to: "fusion", animated: true },
        { from: "camera", to: "fusion", animated: true },
        { from: "fusion", to: "planning", animated: true },
        { from: "planning", to: "control", animated: true },
        { from: "control", to: "actuation", animated: true }
      ]
    },
    challenges: [
      "Dealing with high vibration levels in off-road vehicles causing physical sensor drift and noisy signals.",
      "Achieving sub-5ms control loops on microcontrollers for safety-critical steer-by-wire mechanics."
    ],
    results: [
      "Engineered a working sensor-fusion algorithm on an ESP32 micro-processor.",
      "Developed custom PID tuning curves that dynamically damp steering shocks."
    ],
    learnings: [
      "Hardware failsafes must be physically hardwired rather than relying purely on software loops.",
      "Visual road detection must be heavily augmented with distance sensors in dusty, outdoor environments."
    ],
    future: [
      "Implementing real-time telemetry streaming over LoRa to the pit lane dashboard.",
      "Developing a simulation environment to test vehicle models under virtual mud and sand conditions."
    ],
    relatedProjects: ["ikshana", "solar-analyzer"]
  },
  
  // ARCHIVED PROJECTS
  {
    slug: "solar-analyzer",
    number: "07",
    title: "Solar Analyzer / Self-Cleaning Solar Panel",
    subtitle: "Hardware Diagnostic & Maintenance Platform",
    description: "An embedded system designed to monitor solar cell efficiency and actuate automated mechanical dust wipers.",
    category: ["Embedded", "Robotics"],
    featured: false,
    status: "Completed",
    year: "2024",
    tags: ["Solar Energy", "ESP32", "Automation", "IoT"],
    technologies: ["Arduino", "ESP32", "LDR Sensors", "Servo Motors", "IoT Cloud"],
    github: "YOUR_GITHUB_URL/solar-cleaning",
    problem: "Dust accumulation on solar panels can degrade energy output by up to 30% in dry regions. Manual cleaning is labor-intensive and water-inefficient.",
    solution: "Built a solar panel fitted with Light Dependent Resistors (LDRs) to compare solar intensity. If dust blocking is detected, an ESP32 triggers a dry cleaning wiper mechanism to restore maximum efficiency."
  },
  {
    slug: "plant-disease-aid",
    number: "08",
    title: "Plant Disease Aid",
    subtitle: "Mobile Crop Diagnostics",
    description: "A machine learning-driven system designed to identify crop leaf diseases from image uploads and offer remedies.",
    category: ["Computer Vision", "AI Systems"],
    featured: false,
    status: "Completed",
    year: "2024",
    tags: ["MobileNet", "PyTorch", "Agriculture ML", "Inference"],
    technologies: ["Python", "PyTorch", "MobileNetV2", "Android Wrapper"],
    github: "YOUR_GITHUB_URL/plant-disease-aid",
    problem: "Fungal and bacterial crop diseases spread rapidly, destroying yields. Small farmers lack instant access to plant pathologists to diagnose leaves.",
    solution: "Trained a convolutional neural network (MobileNetV2) on the PlantVillage dataset to classify 38 plant-disease categories. Deployed a lightweight mobile app frontend for quick photography and offline leaf diagnostics."
  },
  {
    slug: "greenmeter",
    number: "09",
    title: "GreenMeter 2.0",
    subtitle: "Personal Sustainability & Carbon Tracker",
    description: "A web platform designed to estimate and gamify carbon footprint offsets from commuting and dietary behaviors.",
    category: ["Web", "Software"],
    featured: false,
    status: "Completed",
    year: "2024",
    tags: ["Carbon Footprint", "React", "Node.js", "Sustainability"],
    technologies: ["React.js", "Node.js", "Express", "MongoDB"],
    github: "YOUR_GITHUB_URL/greenmeter",
    problem: "Individuals want to reduce their carbon footprint but find calculating emissions complex and tracking progress boring.",
    solution: "Created an interactive carbon tracking tool with visual progress bars, community leaderboard elements, and localized carbon calculation algorithms."
  },
  {
    slug: "cuckoo-sandbox",
    number: "10",
    title: "Cuckoo Sandbox Malware Analysis Lab",
    subtitle: "Virtual Threat Detonation Lab",
    description: "An isolated malware analysis lab built using Cuckoo Sandbox to dynamically trace threat behavior in virtual machines.",
    category: ["Cybersecurity", "Software"],
    featured: false,
    status: "Completed",
    year: "2024",
    tags: ["Malware Analysis", "Sandbox", "Virtualization", "Security"],
    technologies: ["Python", "Cuckoo Sandbox", "VirtualBox", "Wireshark", "Linux"],
    github: "YOUR_GITHUB_URL/malware-sandbox",
    problem: "Analyzing dangerous executables directly on production networks exposes organizations to serious intrusion risks.",
    solution: "Configured an isolated sandbox network running VirtualBox guest VMs. Configured Python Cuckoo agents to record registry changes, memory dumps, and network traffic during sample detonation."
  },
  {
    slug: "rfid-attendance",
    number: "11",
    title: "RFID Attendance System",
    subtitle: "Smart Classroom Log",
    description: "An RFID-based student attendance system linking edge reader nodes to a central web database.",
    category: ["Embedded"],
    featured: false,
    status: "Completed",
    year: "2024",
    tags: ["RFID", "IoT", "Microcontrollers", "Database Log"],
    technologies: ["Arduino", "RFID RC522", "ESP8266 WiFi", "MySQL", "PHP"],
    github: "YOUR_GITHUB_URL/rfid-attendance",
    problem: "Manual role call in large lecture halls wastes valuable time and is prone to proxy logging.",
    solution: "Built swipe cards based on RFID RC522 sensor chips. Reader nodes connected to classroom doors transmit student IDs over ESP8266 WiFi to update MySQL records instantly."
  },
  {
    slug: "gemini-lifeline",
    number: "12",
    title: "Gemini Lifeline",
    subtitle: "AI Medical Triage Companion",
    description: "An AI triage companion leveraging large language models to assist medical responders in emergency categorization.",
    category: ["AI Systems", "Web"],
    featured: false,
    status: "Completed",
    year: "2025",
    tags: ["Gemini API", "Triage", "NLP", "Healthcare Systems"],
    technologies: ["React", "FastAPI", "Google Gemini Pro API", "Vercel"],
    github: "YOUR_GITHUB_URL/gemini-lifeline",
    problem: "Emergency hotlines suffer from overload, slowing critical responder sorting during disaster incidents.",
    solution: "Developed an AI system that translates voice reports, formats symptoms, and assigns standard clinical emergency priority tiers (Red, Yellow, Green) using LLM reasoning."
  },
  {
    slug: "cyberquest",
    number: "13",
    title: "CyberQuest",
    subtitle: "Cybersecurity Simulation Game",
    description: "A simulation game designed to teach children digital hygiene using a timeline replay forensics mode.",
    category: ["Cybersecurity", "Web"],
    featured: false,
    status: "Completed",
    year: "2024",
    tags: ["Cyber Hygiene", "Gamification", "Simulations", "React"],
    technologies: ["Next.js", "TypeScript", "Framer Motion", "Tailwind CSS"],
    github: "YOUR_GITHUB_URL/cyberquest",
    problem: "Conventional cybersecurity courses for teenagers rely on dry quizzes, failing to illustrate the delayed consequences of insecure digital choices.",
    solution: "Built a game showing realistic social engineering scenarios. Player choices (e.g. downloading cracked files) trigger delayed system events that players trace back later in 'Forensic Replay' mode."
  },
  {
    slug: "solar-powered-awg",
    number: "14",
    title: "Solar-Powered Atmospheric Water Generator",
    subtitle: "Sustainable Water Harvester",
    description: "A thermal condensation device using Peltier modules to extract water vapor from the atmosphere, powered by solar cells.",
    category: ["Embedded"],
    featured: false,
    status: "Completed",
    year: "2024",
    tags: ["Atmospheric Water", "Thermodynamics", "Renewable Energy", "Peltier"],
    technologies: ["Peltier Coolers", "Heatsinks", "Solar Panels", "12V Battery Regulator"],
    github: "YOUR_GITHUB_URL/solar-awg",
    problem: "Arid rural areas lack clean drinking water, but often have high solar exposure and reasonable relative humidity.",
    solution: "Constructed a solar harvester that routes charge to thermoelectric Peltier coolers. The cold plates condense atmospheric moisture into water droplets, filtered for output collection."
  }
];
