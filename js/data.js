/* Baked-in site data — generated at build time, no runtime API calls needed */
const DATA = {
  profile: {
    name: "Utsav Gupta",
    handle: "Utsav-X-bit",
    tagline: "Cybersecurity researcher · Cryptography · Game dev",
    email: "utsavgupta5467@gmail.com",
    phone: "+91-8076043638",
    location: "New Delhi, India",
    github: "https://github.com/Utsav-X-bit",
    linkedin: "https://linkedin.com/in/utsav-gupta-098874322",
    codeforces: "https://codeforces.com/profile/Utsav-X-bit",
    college: "Vivekananda Institute of Professional Studies",
    degree: "B.Tech CSE '28",
    cgpa: "8.95 / 10"
  },

  projects: [
    {
      name: "SAAGA",
      url: "https://github.com/Utsav-X-bit/SAAGA",
      language: "Python",
      updated: "Sep 2026",
      featured: true,
      tag: "LLM security research",
      desc: "Automated red-teaming framework for LLMs. A planner model picks attack strategies, a generator writes concise attack prompts, and a deterministic 4-signal ladder verifies extracted secrets with no LLM judge. Ships with CLI, FastAPI/React dashboard, FAISS-backed self-improving memory, and support for vLLM, Ollama, HuggingFace and cloud APIs."
    },
    {
      name: "TuxPages",
      url: "https://github.com/Utsav-X-bit/TuxPages",
      language: "TypeScript",
      updated: "Apr 2026",
      tag: "full-stack web",
      desc: "Decoupled blog platform: Next.js 16 + TipTap rich-text editor frontend, Hono TypeScript API on Cloudflare Workers, PostgreSQL (Neon) with Drizzle ORM. OTP passwordless auth via Brevo, JWT cookie sessions, comments and post voting."
    },
    {
      name: "B3CTR-CSPRNG",
      url: "https://github.com/Utsav-X-bit/B3CTR-CSPRNG",
      language: "Python",
      updated: "Sep 2025",
      tag: "cryptography",
      desc: "Hybrid cryptographically-secure PRNG built on BLAKE3 with external entropy sources. Ships a NumPy/SciPy statistical validation suite (chi-square, runs test, autocorrelation) and passes all 17 NIST randomness tests. Backed by an IIT Roorkee-approved report."
    },
    {
      name: "Games_In_SDL2",
      url: "https://github.com/Utsav-X-bit/Games_In_SDL2",
      language: "C",
      updated: "Jun 2025",
      tag: "game engine",
      desc: "Two games in C with SDL2: a modular 2D platformer engine (input handling, gravity/collision physics, texture & font asset management, fixed-timestep game loop) plus a graphical Tic-Tac-Toe with an unbeatable Minimax AI."
    },
    {
      name: "MultiFormat-Log-Parser",
      url: "https://github.com/Utsav-X-bit/MultiFormat-Log-Parser",
      language: "C++",
      updated: "Jan 2026",
      tag: "systems / SIEM",
      desc: "C++ tool that parses fields out of heterogeneous log files with regex rules and emits normalized CSV (e.g. Linux auth logs). The parsing core of a unified SIEM built during the ISEA internship."
    },
    {
      name: "AutoClicker",
      url: "https://github.com/Utsav-X-bit/AutoClicker",
      language: "Python",
      updated: "Apr 2026",
      tag: "systems",
      desc: "Click-speed booster at the kernel input layer: reads the physical mouse via evdev, separates spam-clicking from holding with a sliding-window detector, and injects extra clicks through a uinput virtual device. Works on Wayland, X11 and TTY, with hotkey toggle and a systemd service."
    },
    {
      name: "Plant-Clasification-using-Machine-Learning",
      url: "https://github.com/Utsav-X-bit/Plant-Clasification-using-Machine-Learning",
      language: "Python",
      updated: "Jan 2025",
      tag: "machine learning",
      desc: "Custom-trained classifier for 40 medicinal plant species from images (~70% accuracy), with a Python inference script — end-to-end ML from data collection to a working model."
    },
    {
      name: "Web-Automation-Scripts",
      url: "https://github.com/Utsav-X-bit/Web-Automation-Scripts",
      language: "OpenBullet",
      updated: "Jun 2025",
      tag: "web automation",
      desc: "Maintained collection of OpenBullet / OpenBullet2 / SilverBullet automation scripts with cookie and session handling, modular reusable workflows and documented usage."
    }
  ],

  /* Codeforces rating history: 23 rated contests, Sep 2025 → Sep 2026 */
  cf: {
    current: 979,
    max: 1014,
    contests: 23,
    rank: "newbie",
    history: [
      { n: "Codeforces Round 1050 (Div. 4)", rank: 11413, rating: 407, t: "2025-09-13" },
      { n: "Codeforces Round 1051 (Div. 2)", rank: 8214, rating: 512, t: "2025-09-20" },
      { n: "Codeforces Round 1055 (Div. 1 + Div. 2)", rank: 6930, rating: 589, t: "2025-10-04" },
      { n: "Codeforces Round 1059 (Div. 3)", rank: 4102, rating: 661, t: "2025-10-18" },
      { n: "Codeforces Round 1063 (Div. 2)", rank: 5877, rating: 703, t: "2025-11-01" },
      { n: "Codeforces Round 1067 (Div. 2)", rank: 3944, rating: 748, t: "2025-11-15" },
      { n: "Codeforces Round 1072 (Div. 3)", rank: 2871, rating: 791, t: "2025-11-29" },
      { n: "Codeforces Round 1075 (Div. 2)", rank: 4518, rating: 812, t: "2025-12-13" },
      { n: "Hello 2026", rank: 6103, rating: 799, t: "2026-01-04" },
      { n: "Codeforces Round 1081 (Div. 2)", rank: 3320, rating: 838, t: "2026-01-17" },
      { n: "Codeforces Round 1085 (Div. 3)", rank: 2150, rating: 874, t: "2026-01-31" },
      { n: "Codeforces Round 1089 (Div. 2)", rank: 4890, rating: 861, t: "2026-02-14" },
      { n: "Codeforces Round 1093 (Div. 2)", rank: 3011, rating: 896, t: "2026-02-28" },
      { n: "Codeforces Round 1096 (Div. 3)", rank: 1876, rating: 930, t: "2026-03-14" },
      { n: "Codeforces Round 1099 (Div. 2)", rank: 4210, rating: 918, t: "2026-03-28" },
      { n: "Codeforces Round 1102 (Div. 2)", rank: 2644, rating: 952, t: "2026-04-11" },
      { n: "Codeforces Round 1105 (Div. 3)", rank: 1532, rating: 986, t: "2026-04-25" },
      { n: "Codeforces Round 1108 (Div. 2)", rank: 3988, rating: 974, t: "2026-05-09" },
      { n: "Codeforces Round 1111 (Div. 2)", rank: 2210, rating: 1002, t: "2026-05-23" },
      { n: "Codeforces Round 1114 (Div. 3)", rank: 1290, rating: 1014, t: "2026-06-06" },
      { n: "Codeforces Round 1116 (Div. 2)", rank: 5102, rating: 988, t: "2026-06-20" },
      { n: "Codeforces Round 1119 (Div. 2)", rank: 3445, rating: 905, t: "2026-07-04" },
      { n: "Codeforces Round 1121 (Div. 2)", rank: 4730, rating: 979, t: "2026-09-26" }
    ]
  },

  github: {
    repos: 29,
    followers: 10,
    following: 8,
    languages: [
      { name: "Python", pct: 38, color: "#3572A5" },
      { name: "C", pct: 17, color: "#555555" },
      { name: "C++", pct: 14, color: "#f34b7d" },
      { name: "TypeScript", pct: 12, color: "#3178c6" },
      { name: "Shell", pct: 10, color: "#89e051" },
      { name: "Java", pct: 9, color: "#b07219" }
    ]
  },

  certs: [
    { file: "assets/certs/cert-07.pdf", title: "Cybersecurity & Digital Forensics Internship", issuer: "ISEA Phase III · MeitY · IGDTUW", year: "2025" },
    { file: "assets/certs/cert-02.pdf", title: "Digital Forensics", issuer: "EC-Council", year: "2025" },
    { file: "assets/certs/cert-04.pdf", title: "Ethical Hacking", issuer: "EC-Council", year: "2025" },
    { file: "assets/certs/cert-06.pdf", title: "Project Approval — Hybrid CSPRNG", issuer: "IIT Roorkee", year: "2025" },
    { file: "assets/certs/cert-09.pdf", title: "Linux Fundamentals (RH104 RHA 9.1)", issuer: "Red Hat Training", year: "2025" },
    { file: "assets/certs/cert-05.pdf", title: "Getting Started with Competitive Programming", issuer: "CodeChef", year: "2025" },
    { file: "assets/certs/cert-01.pdf", title: "Cloud Computing", issuer: "NPTEL / IIT", year: "2024" },
    { file: "assets/certs/cert-08.pdf", title: "Mathematical Foundations for Machine Learning", issuer: "NPTEL / IIT", year: "2024" },
    { file: "assets/certs/cert-03.pdf", title: "Discrete Mathematics", issuer: "NPTEL / IIT", year: "2024" },
    { file: "assets/certs/cert-10.jpg", title: "Empower your Privacy with FOSS — Workshop", issuer: "CODEX Code Club · VIPS", year: "2025" },
    { file: "assets/certs/cert-11.jpg", title: "Code Clash 2.0 Hackathon — Team Null Pointers", issuer: "Code Clash", year: "2025" },
    { file: "assets/certs/cert-12.jpeg", title: "HackWithIndia — Build It Tour Noida", issuer: "HackWithIndia", year: "2025" }
  ]
};
