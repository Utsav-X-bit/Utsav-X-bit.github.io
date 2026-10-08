/* Baked-in site data — generated at build time, no runtime API calls needed */
const DATA = {
  profile: {
    name: "Utsav Gupta",
    handle: "Utsav-X-bit",
    tagline: "Cybersecurity enthusiast · Cryptography · Game dev",
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
      tag: "LLM red-teaming",
      desc: "Automated red-teaming framework for LLMs. A planner model picks attack strategies, a generator writes concise attack prompts, and a deterministic 4-signal ladder verifies extracted secrets with no LLM judge. Ships with CLI, FastAPI/React dashboard, FAISS-backed self-improving memory, and support for vLLM, Ollama, HuggingFace and cloud APIs — tuned with HPC practices for evaluation runs.",
      details: {
        features: ["Planner LLM selects attack strategies per target", "Generator writes concise attack prompts", "Deterministic 4-signal ladder verifies extracted secrets - no LLM judge", "CLI plus FastAPI/React dashboard", "FAISS-backed self-improving memory loop", "Backends: vLLM, Ollama, HuggingFace and cloud APIs", "Evaluation runs tuned with HPC practices on DGX A100 hardware"],
        stack: ["Python", "vLLM", "Ollama", "FastAPI", "React", "FAISS"],
        arch: { stages: [{ name: "interface", nodes: [{ id: "cli", label: "CLI", sub: "run red-team sessions", kind: "ui" }, { id: "dash", label: "dashboard", sub: "FastAPI + React", kind: "ui" }] }, { name: "orchestration", nodes: [{ id: "planner", label: "planner LLM", sub: "picks attack strategy", kind: "agent" }] }, { name: "execution", nodes: [{ id: "gen", label: "attack generator", sub: "writes concise prompts", kind: "agent" }, { id: "target", label: "target model", sub: "vLLM · Ollama · HF · cloud", kind: "ext" }] }, { name: "verification", nodes: [{ id: "ladder", label: "4-signal ladder", sub: "deterministic · no LLM judge", kind: "engine" }] }, { name: "memory", nodes: [{ id: "faiss", label: "FAISS memory", sub: "self-improving store", kind: "data" }] }], flows: [["cli","planner","start session"], ["dash","planner","start session"], ["planner","gen","strategy"], ["gen","target","attack prompts"], ["target","ladder","responses"], ["ladder","faiss","verified secrets"], ["faiss","planner","recall"]] },
        size: null
      }
    },
    {
      name: "SchemaForge",
      url: "https://github.com/ronakgupta03/schemaforge",
      language: "Python",
      updated: "Aug 2026",
      tag: "AI agent · databases",
      desc: "Autonomous, AST-aware, zero-downtime database migration & refactoring agent built on the TrueForge harness (Agent Harness Hackathon). A root agent spawns parallel db/code analysis subagents, a deterministic engine merges their facts into an impact graph (tables → ORM models → attributes → endpoints), the migration is proven inside a sandbox, and production is only touched after a human approval gate — applied in one transaction with full rollback.",
      details: {
        features: ["Root agent spawns parallel db-analysis + code-analysis subagents", "Deterministic impact graph: tables → ORM models → attributes → endpoints", "Sandbox verification: Alembic migration, data-parity checks, pytest, EXPLAIN ANALYZE", "Human approval gate — mechanical, enforced via destructiveHint on write tools", "Single-transaction apply with full rollback on any failure", "Two-phase expand/contract workflow for zero-downtime migrations", "Guarded downgrades that refuse to fabricate data", "MCP servers for Postgres and GitHub; Daytona sandbox execution", "Per-session evidence artifacts: graph, report, SQL, diff, verify.json"],
        stack: ["Python", "TrueForge", "MCP", "Daytona", "Alembic", "PostgreSQL", "DeepSeek"],
        arch: { stages: [{ name: "interface", nodes: [{ id: "prompt", label: "user prompt", sub: "e.g. split users table", kind: "ext" }, { id: "chat", label: "TrueForge chat UI", sub: "evidence tabs · :8790", kind: "ui" }] }, { name: "agent swarm", nodes: [{ id: "root", label: "root agent", sub: "deepseek-v4-flash", kind: "agent" }, { id: "dba", label: "db-analysis", sub: "postgres-prod MCP", kind: "agent" }, { id: "codea", label: "code-analysis", sub: "Daytona · AST parse", kind: "agent" }] }, { name: "deterministic engine", nodes: [{ id: "core", label: "schemaforge_core", sub: "ast + information_schema", kind: "engine" }, { id: "graph", label: "impact graph", sub: "JSON + Mermaid", kind: "data" }] }, { name: "sandbox verify", nodes: [{ id: "verify", label: "sf-pipeline verify", sub: "alembic · parity · pytest", kind: "engine" }] }, { name: "safety gate", nodes: [{ id: "gate", label: "human approval", sub: "destructiveHint pauses", kind: "gate" }] }, { name: "apply", nodes: [{ id: "prod", label: "prod postgres", sub: "one txn · rollback", kind: "ext" }, { id: "pr", label: "GitHub PR", sub: "migration + code", kind: "ext" }] }], flows: [["prompt","root","migration request"], ["root","dba","spawns"], ["root","codea","spawns"], ["dba","core","table facts"], ["codea","core","code facts"], ["core","graph","merge"], ["graph","verify","migration + code"], ["verify","gate","PASS ×4"], ["gate","prod","approve"], ["prod","pr","open PR"], ["graph","chat","Mermaid SVG"], ["verify","chat","evidence artifacts"]] },
        size: null
      }
    },
    {
      name: "CyberChakshu",
      url: "https://github.com/makunno/CyberChakshu",
      language: "Python",
      updated: "Sep 2026",
      tag: "SIEM · security analytics",
      desc: "SIEM + digital forensics platform I contributed to during my ISEA internship. It ingests logs across 56+ formats, detects attacks with a rule engine plus an ML classifier, maps everything to MITRE ATT&CK, correlates multi-source events into attack chains, and ships a forensic disk-analysis pipeline alongside an AI SOC analyst.",
      details: {
        features: ["56+ log parsers across FTP, web, DB, firewall, SSH and mail formats", "ML attack detection (Random Forest, 25 features) plus rule-based engine", "MITRE ATT&CK tactic/technique mapping with confidence scoring", "Multi-log correlation builds attack chains with risk scores", "SOC Analyst AI (Llama 3.1) for threat assessment with analyst feedback loop", "Digital forensics pipeline: disk images to IoCs to JSON/HTML/PDF reports", "Dual backends: FastAPI locally, Hono on Cloudflare Workers; React + PySide6 desktop GUIs"],
        stack: ["Python", "React", "FastAPI", "Cloudflare Workers", "scikit-learn"],
        arch: { stages: [{ name: "ingest", nodes: [{ id: "upload", label: "log upload", sub: "text \u00b7 file \u00b7 multi-file", kind: "ui" }, { id: "diskimg", label: "disk image", sub: "e01 \u00b7 dd \u00b7 raw \u00b7 img", kind: "data" }] }, { name: "parse", nodes: [{ id: "autodetect", label: "auto-detect", sub: "regex + structure", kind: "engine" }, { id: "parsers", label: "56+ log parsers", sub: "typed ParsedLogEntry", kind: "engine" }] }, { name: "detect", nodes: [{ id: "rules", label: "rule engine", sub: "SQLi \u00b7 XSS \u00b7 brute-force", kind: "engine" }, { id: "mlclf", label: "ML classifier", sub: "random forest \u00b7 25 feats", kind: "engine" }] }, { name: "enrich", nodes: [{ id: "mitre", label: "MITRE mapper", sub: "tactics \u00b7 techniques", kind: "data" }, { id: "risk", label: "risk scorer", sub: "severity \u00b7 confidence", kind: "engine" }] }, { name: "correlate", nodes: [{ id: "chains", label: "attack chains", sub: "cross-source correlation", kind: "engine" }] }, { name: "surface", nodes: [{ id: "dash", label: "React dashboard", sub: "alerts \u00b7 log viewer", kind: "ui" }, { id: "socai", label: "SOC analyst AI", sub: "llama 3.1 \u00b7 openrouter", kind: "agent" }, { id: "forpipe", label: "forensic pipeline", sub: "extract \u00b7 IoC hunt", kind: "engine" }, { id: "forreport", label: "forensic report", sub: "json \u00b7 html \u00b7 pdf", kind: "data" }] }], flows: [["upload","autodetect","log text"], ["autodetect","parsers","typed"], ["parsers","rules","entries"], ["parsers","mlclf","entries"], ["rules","mitre","hits"], ["mlclf","mitre","hits"], ["mitre","risk","tagged"], ["risk","chains","scored"], ["chains","dash","alerts"], ["chains","socai","investigate"], ["diskimg","forpipe","image"], ["forpipe","forreport","findings"]] },
        size: null
      }
    },
    {
      name: "MiniRelDB",
      url: "https://github.com/ronakgupta03/MiniRelDB",
      language: "Java",
      updated: "Apr 2026",
      tag: "database engine",
      desc: "From-scratch relational database engine in Java \u2014 no SQLite. Hand-written SQL parser, Volcano-iterator query plan tree, B+ tree indexes (in-memory + disk), WAL with an LSM memtable flushing to SSTables, 4KB slotted pages, an LRU buffer pool and a persisted catalog. I heavily optimized the engine: a single +3.8k/\u22120.3k diff across the query, index and storage layers.",
      details: {
        features: ["Real storage engine: 4KB pages, heap files, WAL, LSM memtable flushed to SSTables", "Hand-written top-down SQL parser (INSERT / SELECT / UPDATE / DELETE)", "Volcano iterator plan tree: scan, filter, index-nested-loop join, subqueries", "B+ tree indexes (in-memory + disk) with bloom-filter SSTable skips", "LRU buffer pool over a RandomAccessFile disk manager", "Catalog manager with persisted schemas; crash recovery replays the WAL", "benchmark.py harness for measuring engine performance"],
        stack: ["Java", "B+ Tree", "WAL", "LSM-tree", "Volcano iterators"],
        arch: { stages: [{ name: "interface", nodes: [{ id: "console", label: "db console", sub: "REPL \u00b7 USE db", kind: "ui" }] }, { name: "parse", nodes: [{ id: "parser", label: "SQL parser", sub: "hand-written top-down", kind: "engine" }] }, { name: "plan", nodes: [{ id: "plan", label: "plan tree", sub: "volcano iterators", kind: "engine" }] }, { name: "execute", nodes: [{ id: "executor", label: "executor", sub: "orchestrates all layers", kind: "engine" }] }, { name: "index", nodes: [{ id: "btree", label: "B+ tree", sub: "key \u2192 pageId", kind: "engine" }, { id: "diskbtree", label: "disk B+ tree", sub: "persistent index", kind: "engine" }, { id: "bloom", label: "bloom filter", sub: "sstable skip", kind: "data" }] }, { name: "storage", nodes: [{ id: "wal", label: "write-ahead log", sub: "crash-safe writes", kind: "data" }, { id: "memtable", label: "memtable", sub: "LSM treemap", kind: "data" }, { id: "heap", label: "heap pages", sub: "4kb slotted pages", kind: "engine" }, { id: "buffer", label: "buffer pool", sub: "LRU page cache", kind: "data" }, { id: "catalog", label: "catalog", sub: "persisted schemas", kind: "data" }] }], flows: [["console","parser","SQL text"], ["parser","plan","query objects"], ["plan","executor","open \u00b7 next \u00b7 close"], ["executor","btree","point lookup"], ["executor","diskbtree","range scan"], ["executor","bloom","mightContain"], ["bloom","heap","skip SSTables"], ["btree","heap","pageId"], ["executor","wal","log write"], ["wal","memtable","replay"], ["memtable","heap","flush \u2192 SSTable"], ["executor","buffer","cache pages"], ["executor","catalog","schemas"]] },
        size: null
      }
    },
    {
      name: "TuxPages",
      url: "https://github.com/Utsav-X-bit/TuxPages",
      language: "TypeScript",
      updated: "Apr 2026",
      tag: "full-stack web",
      desc: "Decoupled blog platform: Next.js 16 + TipTap rich-text editor frontend, Hono TypeScript API on Cloudflare Workers, PostgreSQL (Neon) with Drizzle ORM. OTP passwordless auth via Brevo, JWT cookie sessions, comments and post voting.",
      details: {
        features: ["Decoupled frontend/backend architecture", "Next.js 16 + TipTap rich-text editor", "Hono TypeScript API on Cloudflare Workers", "PostgreSQL (Neon) with Drizzle ORM", "OTP passwordless auth via Brevo", "JWT cookie sessions, comments and post voting"],
        stack: ["TypeScript", "Next.js 16", "TipTap", "Hono", "Cloudflare Workers", "PostgreSQL", "Drizzle"],
        arch: { stages: [{ name: "client", nodes: [{ id: "web", label: "Next.js frontend", sub: "TipTap rich-text editor", kind: "ui" }] }, { name: "edge", nodes: [{ id: "hono", label: "Hono API", sub: "TypeScript · on CF Workers", kind: "engine" }, { id: "brevo", label: "Brevo", sub: "OTP passwordless", kind: "ext" }] }, { name: "data", nodes: [{ id: "pg", label: "PostgreSQL", sub: "Neon · Drizzle ORM", kind: "data" }] }], flows: [["web","hono","REST · JWT cookie"], ["hono","pg","Drizzle ORM"], ["hono","brevo","OTP email"]] },
        size: null
      }
    },
    {
      name: "B3CTR-CSPRNG",
      url: "https://github.com/Utsav-X-bit/B3CTR-CSPRNG",
      language: "Python",
      updated: "Sep 2025",
      tag: "cryptography",
      desc: "Hybrid cryptographically-secure PRNG built on BLAKE3 with external entropy sources. Ships a NumPy/SciPy statistical validation suite (chi-square, runs test, autocorrelation) built around the NIST STS randomness battery.",
      details: {
        features: ["Hybrid CSPRNG built on BLAKE3", "External entropy sources (os.urandom, time)", "NumPy/SciPy statistical validation suite", "Chi-square, runs test and autocorrelation checks", "Passes all 17 NIST randomness tests"],
        stack: ["Python", "BLAKE3", "NumPy", "SciPy"],
        arch: { stages: [{ name: "entropy", nodes: [{ id: "urandom", label: "os.urandom", sub: "OS entropy", kind: "ext" }, { id: "clock", label: "time-based", sub: "auxiliary entropy", kind: "ext" }] }, { name: "core", nodes: [{ id: "pool", label: "entropy pool", sub: "accumulates seed", kind: "data" }, { id: "blake3", label: "BLAKE3 core", sub: "hash-based DRBG", kind: "engine" }, { id: "mixer", label: "reseed mixer", sub: "forward secrecy", kind: "engine" }] }, { name: "output", nodes: [{ id: "stream", label: "output stream", sub: "random bytes", kind: "data" }] }, { name: "validation", nodes: [{ id: "nist", label: "NIST STS", sub: "randomness battery", kind: "engine" }, { id: "stats", label: "SciPy suite", sub: "chi-square · runs", kind: "engine" }] }], flows: [["urandom","pool","seed"], ["clock","pool","seed"], ["pool","blake3","reseed"], ["blake3","mixer","hash"], ["mixer","stream","bytes"], ["stream","nist","test vectors"], ["stream","stats","test vectors"]] },
        size: "92 MB"
      }
    },
    {
      name: "Games_In_SDL2",
      url: "https://github.com/Utsav-X-bit/Games_In_SDL2",
      language: "C",
      updated: "Jun 2025",
      tag: "game engine",
      desc: "Two games in C with SDL2: a modular 2D platformer engine (input handling, gravity/collision physics, texture & font asset management, fixed-timestep game loop) plus a graphical Tic-Tac-Toe with an unbeatable Minimax AI.",
      details: {
        features: ["Modular 2D platformer engine in C", "Input handling, gravity/collision physics", "Texture and font asset management", "Fixed-timestep game loop", "Graphical Tic-Tac-Toe with unbeatable Minimax AI"],
        stack: ["C", "SDL2"],
        arch: { stages: [{ name: "game loop", nodes: [{ id: "tick", label: "fixed-timestep loop", sub: "60 Hz update", kind: "engine" }] }, { name: "simulation", nodes: [{ id: "input", label: "input handling", sub: "keyboard + mouse", kind: "engine" }, { id: "physics", label: "physics + collision", sub: "gravity · AABB", kind: "engine" }, { id: "ai", label: "minimax AI", sub: "tic-tac-toe", kind: "engine" }] }, { name: "presentation", nodes: [{ id: "assets", label: "asset manager", sub: "textures · fonts", kind: "data" }, { id: "sdl", label: "SDL2 renderer", sub: "presents frame", kind: "ext" }] }], flows: [["tick","input","poll"], ["tick","physics","step"], ["input","physics","actions"], ["physics","sdl","draw calls"], ["assets","sdl","blit"], ["tick","ai","compute move"]] },
        size: "377 MB"
      }
    },
    {
      name: "MultiFormat-Log-Parser",
      url: "https://github.com/Utsav-X-bit/MultiFormat-Log-Parser",
      language: "C++",
      updated: "Jan 2026",
      tag: "systems / SIEM",
      desc: "C++ tool that parses fields out of heterogeneous log files with regex rules and emits normalized CSV (e.g. Linux auth logs). The parsing core of a unified SIEM built during the ISEA internship.",
      details: {
        features: ["Parses heterogeneous log files via regex rules", "C++ parsing core", "Normalized CSV output (e.g. Linux auth logs)", "Sample logs and parsed outputs included in repo"],
        stack: ["C++", "regex"],
        arch: { stages: [{ name: "input", nodes: [{ id: "logs", label: "raw logs", sub: "auth.log · heterogeneous", kind: "data" }, { id: "rules", label: "regex rules", sub: "per-format patterns", kind: "data" }] }, { name: "parse", nodes: [{ id: "core", label: "C++ parse core", sub: "regex engine", kind: "engine" }] }, { name: "output", nodes: [{ id: "csv", label: "normalized CSV", sub: "unified schema", kind: "data" }, { id: "siem", label: "unified SIEM", sub: "ISEA internship core", kind: "ext" }] }], flows: [["logs","core","lines"], ["rules","core","patterns"], ["core","csv","rows"], ["csv","siem","ingest"]] },
        size: "274 KB"
      }
    },
    {
      name: "AutoClicker",
      url: "https://github.com/Utsav-X-bit/AutoClicker",
      language: "Python",
      updated: "Apr 2026",
      tag: "systems",
      desc: "Click-speed booster at the kernel input layer: reads the physical mouse via evdev, separates spam-clicking from holding with a sliding-window detector, and injects extra clicks through a uinput virtual device. Works on Wayland, X11 and TTY, with hotkey toggle and a systemd service.",
      details: {
        features: ["Operates at the Linux kernel input layer", "Reads the physical mouse via evdev", "Sliding-window detector distinguishes spam-clicking from holding", "Injects extra clicks through a uinput virtual device", "Boosts 3-4 CPS to 12-14 CPS", "Works on Wayland, X11 and TTY", "Hotkey toggle plus systemd service"],
        stack: ["Python", "evdev", "uinput", "systemd"],
        arch: { stages: [{ name: "capture", nodes: [{ id: "mouse", label: "physical mouse", sub: "evdev", kind: "ext" }] }, { name: "detect", nodes: [{ id: "window", label: "sliding window", sub: "spam vs hold", kind: "engine" }] }, { name: "inject", nodes: [{ id: "uinput", label: "uinput device", sub: "Wayland · X11 · TTY", kind: "ext" }] }, { name: "control", nodes: [{ id: "hotkey", label: "toggle hotkey", sub: "on / off", kind: "ui" }, { id: "svc", label: "systemd service", sub: "daemon", kind: "ext" }] }], flows: [["mouse","window","click events"], ["hotkey","window","toggle"], ["svc","window","supervises"], ["window","uinput","extra clicks"]] },
        size: "27 KB"
      }
    },
    {
      name: "Plant-Clasification-using-Machine-Learning",
      url: "https://github.com/Utsav-X-bit/Plant-Clasification-using-Machine-Learning",
      language: "Python",
      updated: "Jan 2025",
      tag: "machine learning",
      desc: "Custom-trained classifier for 40 medicinal plant species from images (~70% accuracy), with a Python inference script — end-to-end ML from data collection to a working model.",
      details: {
        features: ["Classifies 40 medicinal plant species from images", "200 training images per species", "~70% accuracy", "Python inference script included"],
        stack: ["Python", "machine learning"],
        arch: { stages: [{ name: "data", nodes: [{ id: "leaves", label: "leaf images", sub: "200 per species", kind: "data" }] }, { name: "train", nodes: [{ id: "cnn", label: "CNN classifier", sub: "custom-trained", kind: "engine" }] }, { name: "infer", nodes: [{ id: "model", label: "40-species model", sub: "~70% accuracy", kind: "data" }, { id: "script", label: "inference script", sub: "Python CLI", kind: "ui" }] }], flows: [["leaves","cnn","train"], ["cnn","model","weights"], ["model","script","load"]] },
        size: null
      }
    },
    {
      name: "Web-Automation-Scripts",
      url: "https://github.com/Utsav-X-bit/Web-Automation-Scripts",
      language: "OpenBullet",
      updated: "Jun 2025",
      tag: "web automation",
      desc: "Maintained collection of OpenBullet / OpenBullet2 / SilverBullet automation scripts with cookie and session handling, modular reusable workflows and documented usage.",
      details: {
        features: ["Maintained collection of web-automation scripts", "OpenBullet / OpenBullet2 / SilverBullet", "Cookie and session handling", "Modular, reusable workflows", "Documented usage"],
        stack: ["OpenBullet", "SilverBullet"],
        arch: { stages: [{ name: "author", nodes: [{ id: "tasks", label: "task scripts", sub: "OpenBullet2 · SilverBullet", kind: "data" }] }, { name: "session", nodes: [{ id: "sess", label: "session manager", sub: "cookies · state", kind: "engine" }] }, { name: "run", nodes: [{ id: "runners", label: "automation runners", sub: "modular workflows", kind: "engine" }] }], flows: [["tasks","runners","load"], ["sess","runners","attach"], ["runners","sess","persist"]] },
        size: "82 KB"
      }
    }
  ],

  /* Codeforces rating history: 23 rated contests, Sep 2025 → Sep 2026 (from API) */
  cf: {
    current: 979,
    max: 1014,
    contests: 23,
    rank: "newbie",
    history: [
      { n: "Codeforces Round 1050 (Div. 4)", rank: 11413, rating: 407, t: "2025-09-13" },
      { n: "Squarepoint Challenge (Codeforces Round 1055, Div. 1 + Div. 2)", rank: 11799, rating: 650, t: "2025-10-03" },
      { n: "Codeforces Round 1056 (Div. 2)", rank: 12193, rating: 793, t: "2025-10-05" },
      { n: "Educational Codeforces Round 183 (Rated for Div. 2)", rank: 13212, rating: 880, t: "2025-10-06" },
      { n: "Codeforces Round 1057 (Div. 2)", rank: 12078, rating: 959, t: "2025-10-10" },
      { n: "Codeforces Round 1058 (Div. 2)", rank: 8770, rating: 1014, t: "2025-10-12" },
      { n: "Codeforces Round 1059 (Div. 3)", rank: 14052, rating: 987, t: "2025-10-17" },
      { n: "Codeforces Round 1068 (Div. 2)", rank: 10665, rating: 973, t: "2025-12-05" },
      { n: "Codeforces Round 1075 (Div. 2)", rank: 13474, rating: 945, t: "2026-01-23" },
      { n: "Codeforces Round 1076 (Div. 3)", rank: 9861, rating: 1009, t: "2026-01-25" },
      { n: "Codeforces Round 1077 (Div. 2)", rank: 16809, rating: 941, t: "2026-01-29" },
      { n: "Codeforces Round 1079 (Div. 2)", rank: 14603, rating: 840, t: "2026-02-11" },
      { n: "Codeforces Round 1086 (Div. 2)", rank: 9344, rating: 879, t: "2026-03-14" },
      { n: "Nebius Round 2 (Codeforces Round 1088, Div. 1 + Div. 2)", rank: 7599, rating: 951, t: "2026-03-28" },
      { n: "Codeforces Round 1098 (Div. 2)", rank: 13704, rating: 857, t: "2026-05-16" },
      { n: "Codeforces Round 1099 (Div. 2)", rank: 10263, rating: 888, t: "2026-05-21" },
      { n: "Codeforces Round 1102 (Div. 2)", rank: 15034, rating: 833, t: "2026-06-07" },
      { n: "Educational Codeforces Round 192 (Rated for Div. 2)", rank: 14883, rating: 736, t: "2026-07-06" },
      { n: "Codeforces Round 1116 (Div. 2)", rank: 11008, rating: 725, t: "2026-08-09" },
      { n: "Codeforces Round 1119 (Div. 3)", rank: 13010, rating: 758, t: "2026-09-05" },
      { n: "Educational Codeforces Round 194 (Rated for Div. 2)", rank: 6922, rating: 878, t: "2026-09-08" },
      { n: "Codeforces Round 1120 (Div. 2)", rank: 7693, rating: 905, t: "2026-09-12" },
      { n: "Codeforces Round 1121 (Div. 2)", rank: 4730, rating: 979, t: "2026-09-13" }
    ]
  },

  /* ── activity heatmaps (snapshots fetched 2026-09-30) ── */
  /* GitHub: 421 contributions over the last year (public events) */
  ghActivity: [["2025-10-08",1],["2025-10-10",3],["2025-10-14",3],["2025-10-15",2],["2025-10-22",3],["2025-10-23",2],["2025-10-24",1],["2025-11-03",1],["2025-11-20",5],["2025-11-22",1],["2025-12-04",1],["2025-12-07",2],["2026-01-01",4],["2026-01-02",1],["2026-01-07",2],["2026-01-08",1],["2026-01-11",2],["2026-01-17",1],["2026-01-25",1],["2026-02-01",1],["2026-02-04",3],["2026-02-05",4],["2026-02-08",1],["2026-02-09",77],["2026-02-10",8],["2026-02-12",1],["2026-02-13",4],["2026-02-16",1],["2026-02-17",1],["2026-02-20",1],["2026-02-21",1],["2026-02-22",3],["2026-03-05",6],["2026-03-06",4],["2026-03-23",2],["2026-03-26",2],["2026-03-29",22],["2026-03-30",16],["2026-03-31",6],["2026-04-01",4],["2026-04-03",6],["2026-04-04",1],["2026-04-05",1],["2026-04-08",2],["2026-04-13",3],["2026-04-17",2],["2026-04-18",6],["2026-04-19",1],["2026-05-16",1],["2026-06-06",1],["2026-06-08",1],["2026-07-14",1],["2026-07-15",6],["2026-07-16",22],["2026-07-17",6],["2026-07-22",1],["2026-07-25",1],["2026-08-04",4],["2026-08-07",5],["2026-08-09",1],["2026-08-10",4],["2026-08-12",2],["2026-08-13",1],["2026-08-16",2],["2026-08-17",3],["2026-08-26",34],["2026-08-27",14],["2026-08-28",9],["2026-08-29",21],["2026-08-30",32],["2026-09-01",3],["2026-09-04",1],["2026-09-08",1],["2026-09-09",10],["2026-09-12",1],["2026-09-15",1],["2026-09-16",1],["2026-09-22",2],["2026-09-24",1],["2026-09-30",1]],
  /* Codeforces: 291 submissions, 78 active days */
  cfActivity: [["2025-08-12",4],["2025-08-13",1],["2025-08-15",2],["2025-08-24",8],["2025-08-28",1],["2025-08-29",1],["2025-08-31",3],["2025-09-08",7],["2025-09-13",5],["2025-09-16",6],["2025-09-18",4],["2025-09-19",1],["2025-09-20",5],["2025-09-21",1],["2025-09-25",4],["2025-09-27",4],["2025-10-03",1],["2025-10-05",2],["2025-10-06",3],["2025-10-07",4],["2025-10-08",16],["2025-10-09",2],["2025-10-10",14],["2025-10-11",3],["2025-10-12",4],["2025-10-14",2],["2025-10-15",7],["2025-10-16",1],["2025-10-17",3],["2025-11-03",5],["2025-12-05",1],["2026-01-17",2],["2026-01-20",3],["2026-01-21",13],["2026-01-23",2],["2026-01-25",5],["2026-01-27",8],["2026-01-29",7],["2026-01-30",2],["2026-01-31",7],["2026-02-11",5],["2026-02-13",2],["2026-03-14",4],["2026-03-15",2],["2026-03-28",3],["2026-05-13",8],["2026-05-15",7],["2026-05-16",9],["2026-05-19",11],["2026-05-20",1],["2026-05-21",7],["2026-05-23",2],["2026-05-24",6],["2026-05-26",3],["2026-05-27",3],["2026-05-28",2],["2026-05-29",3],["2026-05-30",1],["2026-05-31",1],["2026-06-07",1],["2026-06-09",5],["2026-06-11",1],["2026-06-12",1],["2026-06-13",2],["2026-07-03",1],["2026-07-04",1],["2026-07-06",2],["2026-08-09",1],["2026-09-03",1],["2026-09-04",5],["2026-09-05",3],["2026-09-08",2],["2026-09-09",1],["2026-09-11",3],["2026-09-12",2],["2026-09-13",3],["2026-09-15",1],["2026-09-16",1]],

  /* ── HPC environment used while developing SAAGA (from macchina) ── */
  hpc: {
    host: "isea31@login",
    machine: "NVIDIA DGX A100",
    cpu: "AMD EPYC 7742 64-Core (256 threads)",
    gpus: "8x NVIDIA A100 SXM4 40GB",
    memory: "1056 GB",
    distro: "Ubuntu 22.04.4 LTS",
    kernel: "5.15.0-1062-nvidia"
  },

  github: {
    repos: 29,
    followers: 10,
    following: 8,
    /* share of public repos by primary language (computed from repo list) */
    languages: [
      { name: "Python", pct: 41, color: "#3572A5" },
      { name: "TypeScript", pct: 9, color: "#3178c6" },
      { name: "C", pct: 9, color: "#555555" },
      { name: "C++", pct: 9, color: "#f34b7d" },
      { name: "HTML", pct: 9, color: "#e34c26" },
      { name: "Jupyter Notebook", pct: 5, color: "#DA5B0B" },
      { name: "Java", pct: 5, color: "#b07219" },
      { name: "Shell", pct: 5, color: "#89e051" },
      { name: "CSS", pct: 5, color: "#563d7c" },
      { name: "JavaScript", pct: 5, color: "#f1e05a" }
    ]
  },

  /* certificate titles/issuers verified by reading each document */
  certs: [
    { file: "assets/certs/cert-07.pdf", title: "Digital Forensics & Cybersecurity — 8-week Internship", issuer: "ISEA Phase-III · MeitY · IGDTUW", year: "2026" },
    { file: "assets/certs/cert-02.pdf", title: "Forensic Readiness & Investigation Skills — Bootcamp", issuer: "ISEA · IGDTUW", year: "2026" },
    { file: "assets/certs/cert-06.pdf", title: "Cyber Security and AI/ML — Summer Training", issuer: "IIT Roorkee · Continuing Education Centre", year: "2025" },
    { file: "assets/certs/cert-04.pdf", title: "Ethical Hacking", issuer: "NPTEL", year: "2025" },
    { file: "assets/certs/cert-01.pdf", title: "Cloud Computing", issuer: "NPTEL · IIT Kharagpur", year: "2025" },
    { file: "assets/certs/cert-08.pdf", title: "Mathematical Foundations for Machine Learning", issuer: "NPTEL", year: "2025" },
    { file: "assets/certs/cert-05.pdf", title: "Getting Started with Competitive Programming", issuer: "NPTEL", year: "2025" },
    { file: "assets/certs/cert-03.pdf", title: "Discrete Mathematics", issuer: "NPTEL", year: "2025" },
    { file: "assets/certs/cert-09.pdf", title: "Getting Started with Linux Fundamentals (RH104)", issuer: "Red Hat", year: "2025" }
  ],

  };
