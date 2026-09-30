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
    { file: "assets/certs/cert-09.pdf", title: "Getting Started with Linux Fundamentals (RH104)", issuer: "Red Hat", year: "2025" },
    { file: "assets/certs/cert-10.jpg", title: "Empower your Privacy with FOSS — Workshop", issuer: "CODEX Code Club · VIPS", year: "2025" },
    { file: "assets/certs/cert-11.jpg", title: "Code Clash 2.0 Hackathon — Team Null Pointers", issuer: "CodeClash", year: "2025" },
    { file: "assets/certs/cert-12.jpeg", title: "HackWithIndia — Build It Tour Noida", issuer: "HackWithIndia", year: "2025" }
  ],

  /* résumé PDF embedded as base64 (binary upload unavailable via API) */
  resumeB64: "JVBERi0xLjMKJenr8b8KMSAwIG9iago8PAovQ291bnQgMQovS2lkcyBbMyAwIFJdCi9NZWRpYUJveCBbMCAwIDU5NS4yOCA4NDEuODldCi9UeXBlIC9QYWdlcwo+PgplbmRvYmoKMiAwIG9iago8PAovT3BlbkFjdGlvbiBbMyAwIFIgL0ZpdEggbnVsbF0KL1BhZ2VMYXlvdXQgL09uZUNvbHVtbgovUGFnZXMgMSAwIFIKL1R5cGUgL0NhdGFsb2cKPj4KZW5kb2JqCjMgMCBvYmoKPDwKL0NvbnRlbnRzIDQgMCBSCi9QYXJlbnQgMSAwIFIKL1Jlc291cmNlcyA4IDAgUgovVHlwZSAvUGFnZQo+PgplbmRvYmoKNCAwIG9iago8PAovRmlsdGVyIC9GbGF0ZURlY29kZQovTGVuZ3RoIDI3OTIKPj4Kc3RyZWFtCnicrVrbctrIFn3PV+yXSSUVkHWXcF4OxtgmAZsBZZKp8ksjGtBESBpdsJmamm8/q1vYZmwhQZ2TKpcQqLv3de21t6LTl3eqYjn08O7Co7MrjXRDUVXyFtT33v1J+NIyFNcmp2MpBr6fk6qoluuKS0fVcdFs06F0SR++edPub3T9bex1P5L3BzagX5921dTqXV1875S7ir10y+zgYuCf3LK3nfE0436RBvmWJjzjLPVXPCX6m6iXbpM8XqYsWW3lF9dszemSb3gYJ2se5a+k0MlVrCohbEuxzVIIo6MLOcxSDsu0NCnHp47WdlXHVk3DNlx5WJFnbLMskpxZpu38Z7lmQaj48frlx/ZjexbkyjLIV8VMCWL5y+4OD559kw/9EA/Jn8Ig+snnQSR/DKKzchN5RFvtuK5jGrr+olOlHybX7zSl48Kdlqbga8dyFd2hNVmmqej2031I0z3PVBrFMBVHq/V3//Jbr+sN7m73ZXI6toaHXMMyxMXVTSETPlkvMukdxbD2ZCrv/y1TZbRouLi1Ml0oHvdXLerF66TIEShTP+CRz+k99aNlEHGeBtHyVWAYbwLDMBADHRxoIhZrI0NXoWGbcHHfBH2nWgtVUzTzcMz/Fmz4TxaxaM5oEGV5kEMRihc0TuMFz7IgjhhslRfzgGctuuUPiPlwFRC120iK63EX6nSsM009Ngtt14Z6tXbthSzL6MdgQPcfehfT/v1HKO26v5CMXNr9vP9jR/ul2cy2rjjl+W59AsK+emlm80gz246h2NZhM1/AxFm+YmFA42IWBj5CZRXH4Z5Fq+xXlSu2ZcFu9bnyY9yfDPq3vf7LpmU22GZHcdSXbNjdN2eDjQzVjXqv/Qs+39NlAPhB8FzFKY+ywM8QYEiSqNFReseEL+SRtlvrqC9FJLxkwVlfilB+PNZhuiZy7qDDBtN+l8YrlnEayDgc8SD/HbH2Nw2uL71v3w97TiC/W3WkClHcw0e2X/aRq1AodLVx1SDacKTtkuV8Tv840PX6QuTvYmd1CtZsyTNapKgW8HjGg7/w5M3lZUZBRPmK020fh+qq5pAv9C0ygBb1bq4GbcTrMsLTa56v4nkcxsut8krKUjerYyu2eqpuDas0xXF18h6QPkUQ5sSoiIJFAHmmg/6IHlDcaDRszyD0nFgUr1m4pTnPuZ8Dts6p9+kTpXzJHwmCtxOWSsV8GKZF4y00irAKa3LEZovmLFvNYpbOKY6qpXVNRTNq6EMYF/NFyFJO3+P0J3LhgK0cTbHtk23VsErUoJCLIJgI97KchkFUPNKiALQLfsLCDGE8udFUE2EMwKd+r92Li8gPQprvcnXxnKvvCT4PfHy3Yv5PYbg8ZUGED8qxSGVZQAenFjPGk7sv/Z43fY1TAp7g+2ec2t0345RVlve6M6fd7nUXiNEtcoSMsNhwOBJWa3ucrYWmVyks9gAfNkKVqeqK6cpTXbWppthHAoWlIS1qeOqBAKlfpSm6wDsk0zhkUQSyIrTOeIhsyYjlObxMGXyc86Us9UuOh1gep/QAQAeC+DFCBfiwezYBoCR59hlpKXIuheUCAJFPZjsDaiBwQjaf45wNWBCyNquWWkVS1eAwf4RIvnASKkvKIapM+yiW4v9RzJe8OsvMDuBDP9WIDasscClDGnFaJEmcQpwN5GjRXRiyNWvRTbEE71teMZBAkWK+wATqjgewU7YKkox6w0GLrkAG8OXZhEO3F+TBD93BdApE88HNqwV0OhDqsFpw6KIdrOGcjYjkNV/H6bYyY6uyx7QNkX112XOznaXBnC6G3a99g3rT8eT2mgAsg4FHk1jgHjRPxPl8fv+xmZSh1mvlwabTlECvi/uhBDIBPEYN6T3g+4ZVex2gwMVw25Zkh5M0AdqomYTHJ9PIOEX4gvEgFwDAaZxsKYuL1OeIhgQcFkmFfQgYeTuYepQiYuJ1BNZNyLf8QPkwDUdcTlWuYdVUBiej22I93p6hjxlD1pzlMqUh/wZUYM5EXaWsABzA4/4qaGd/FkyU07SISqFbxACrqLEpD+Xj9x+Pjz5wMrueY3rF41jSmTZdFWHYnkooukB9J8BajvK1PqLdQtNq4jT9mVj975htqqINOtkr9as0ob+Em0vuxwXqO3hOCrsLioPIOwcHfcyVPzJCCn0iL0g8lhC6eoHaIHyg29H8M93EgEtvm/CpnwZJLuAIHIfe8pXPNI6zfJny6a/DSnkNEDazhozef7jlwuUQ5jIN/vor5HQ3GVXHsQE6pWqnWqxp1Z03lqmF6j0PRSYhHFe0CRhdpHwTt+jLdw+5Gv8MOCqK7G9R65C8giJlErMT2IA2cX6I6lSFrmE7ilNPdfTLcmRUTgbAr7qyvT2bXg71Y4BStZWOgYNcRdf/X0BpiF6ypvoe8EHDqlE8LxBWBI2TXVKCBnCp9zmajqTIQSqjeQgLg2ekbIOG8cyPwzAQ/qBktc0kJRcQmdMaJH3JhX9atAgewdPyYA2o4QkthUHDOE4OhJipK/bJHKBp1fVTBUDC+W2P4S/mJdyzCC3KjLOczRD6I9SDNXuEo4+PI71xOPIVBYWH7aGYPEoO2wsD0IVySvmdz554rbBkmfBZc3C5uqK58vTm0YhVjkaORUZDM55neyc4oX6VqtimKZGRb+Z8c1aUUeULU9AsRgbDINIlGeoW4qz9EKC4PlCWsHV7k7VXcTh/6RU/k2D7mUDF72wLfgwq9kPTJBx43u8751K2xb7ramJmqNrzgKSamKWbwD9AVnXXFaOpE23UtGqEfi3HH6qGSK5SVTEbuEt4dIHyyfOzaRCCn5c39MBnbfYSPVkZPTs7lmD5nLhHd4E6oFGvn6P27kbjvjfwBr/1Qaburifd0Whwe/26KdRtFO69pnB3/9wUHopA3XQU4+TBS9OqXjzngDaQuXMSWY5eSbA/TdVMQY4KMKAop47Tuf/YIkRGKltNXxRlcDuZrf7zFnIKD9K8CEK+P6qvjhbDVDonD1uaVnURHhsu2jpg1xpEVQSGGBH1Pn06R4+SM9EeFpJ4ZBK2kxWuUbGe4bl8xQ81GpVBgfQ26xsNr9+7uR30ukOafh0Mh29GBDq4k2rvRUN5vzciqI4GrWMoVv3RQxYtC0Ezz6kR5DTDFWbd37XKuuW8qUW9lrBna4+OgZKwDVpHcK4WXaAVfGPDA3q4WtMceLobxp6gxt6mVWpcvpkTgcLsTQpFrIvhXEu256mo1eVMBRxr7wVa6/Vw6VidwX6sepr1PLs5xXl721ZpvWPZLZL9eksS6ucmvlVBpGEEsLoWXQd4Ws7hjlXQshWt/sWnHKILCDlBv71dK1N/cHY7HLf2G9D3Tx1rqyRZJXuDYmUNzAROwJfrdZXzDiS9hh7UrI/YXn/iDa4G5Zu+NymvGbogns8pv7vfKwDVw35NjMbq5gFEct5/7BsMMcl5eiVwVr4O2GfwO76uionGEUe/PeX+w8to9s3GO5XE4LFuRkjU36XYzW5+W7vrk7jN25Zj5av9sbIcKovhcjl5PiAy2Ipe12sQXfNc1lB09akolpJ4iME2zwNZnMYvQSeAB+Wzt+KLQ8o0Hygzd/f6ttzzduz1hwcUcExFq+smiEYMdVCwJ1/6U9hIMKlM4CWNhgf33wncfMBlkIkpKN87Kava9Znn/zsdNBecxiFkk1NP8yd8AZCJfF62xAvwQ/J5mgcLqIbj57FfyI75vPp/H7xI8l/Bvs6jCmVuZHN0cmVhbQplbmRvYmoKNSAwIG9iago8PAovQmFzZUZvbnQgL0hlbHZldGljYS1Cb2xkCi9FbmNvZGluZyAvV2luQW5zaUVuY29kaW5nCi9TdWJ0eXBlIC9UeXBlMQovVHlwZSAvRm9udAo+PgplbmRvYmoKNiAwIG9iago8PAovQmFzZUZvbnQgL0hlbHZldGljYQovRW5jb2RpbmcgL1dpbkFuc2lFbmNvZGluZwovU3VidHlwZSAvVHlwZTEKL1R5cGUgL0ZvbnQKPj4KZW5kb2JqCjcgMCBvYmoKPDwKL0Jhc2VGb250IC9IZWx2ZXRpY2EtT2JsaXF1ZQovRW5jb2RpbmcgL1dpbkFuc2lFbmNvZGluZwovU3VidHlwZSAvVHlwZTEKL1R5cGUgL0ZvbnQKPj4KZW5kb2JqCjggMCBvYmoKPDwKL0ZvbnQgPDwvRjEgNSAwIFIKL0YyIDYgMCBSCi9GMyA3IDAgUj4+Ci9Qcm9jU2V0IFsvUERGIC9UZXh0IC9JbWFnZUIgL0ltYWdlQyAvSW1hZ2VJXQo+PgplbmRvYmoKOSAwIG9iago8PAovQ3JlYXRpb25EYXRlIChEOjIwMjYwOTMwMDkwNDE2WikKPj4KZW5kb2JqCnhyZWYKMCAxMAowMDAwMDAwMDAwIDY1NTM1IGYgCjAwMDAwMDAwMTUgMDAwMDAgbiAKMDAwMDAwMDEwMiAwMDAwMCBuIAowMDAwMDAwMjA1IDAwMDAwIG4gCjAwMDAwMDAyODUgMDAwMDAgbiAKMDAwMDAwMzE1MCAwMDAwMCBuIAowMDAwMDAzMjUyIDAwMDAwIG4gCjAwMDAwMDMzNDkgMDAwMDAgbiAKMDAwMDAwMzQ1NCAwMDAwMCBuIAowMDAwMDAzNTYxIDAwMDAwIG4gCnRyYWlsZXIKPDwKL1NpemUgMTAKL1Jvb3QgMiAwIFIKL0luZm8gOSAwIFIKL0lEIFs8MDBCNDM0MTQ3QzRENkJDNkVGQkRBREM1OUZCOTQxRDc+PDAwQjQzNDE0N0M0RDZCQzZFRkJEQURDNTlGQjk0MUQ3Pl0KPj4Kc3RhcnR4cmVmCjM2MTYKJSVFT0YK"
};
