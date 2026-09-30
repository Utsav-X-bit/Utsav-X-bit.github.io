/* ═══════════ portfolio interactions ═══════════ */
(function () {
  "use strict";
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const $ = (s, c) => (c || document).querySelector(s);
  const $$ = (s, c) => Array.from((c || document).querySelectorAll(s));

  /* ── footer year ── */
  $("#year").textContent = new Date().getFullYear();

  /* ═══ BOOT LOADER ═══ */
  const loader = $("#loader"), log = $("#loader-log"), fill = $("#loader-fill");
  const bootLines = [
    ["$ ssh -i ~/.ssh/key visitor@utsav.dev", "cmd"],
    ["authenticating … <span class='ok'>OK</span>", ""],
    ["establishing secure connection … <span class='ok'>TLS 1.3</span>", ""],
    ["fetching profile.json … <span class='ok'>200</span>", ""],
    ["decrypting portfolio … <span class='ok'>done</span>", ""],
    ["<span class='ok'>ACCESS GRANTED</span> — welcome, visitor", ""]
  ];
  function finishLoad() {
    if (loader.classList.contains("done")) return;
    loader.classList.add("done");
    setTimeout(() => loader.remove(), 600);
    document.body.classList.add("booted");
    startHero();
  }
  if (reduced) { finishLoad(); }
  else {
    let li = 0;
    const tick = () => {
      if (li < bootLines.length) {
        const [html, cls] = bootLines[li];
        const div = document.createElement("div");
        div.className = "line " + cls;
        div.innerHTML = html + (li === bootLines.length - 1 ? "" : "");
        log.appendChild(div);
        fill.style.width = ((li + 1) / bootLines.length * 100) + "%";
        li++;
        setTimeout(tick, 300 + Math.random() * 260);
      } else setTimeout(finishLoad, 550);
    };
    const cur = document.createElement("div");
    cur.innerHTML = "<span class='cursor'></span>";
    log.appendChild(cur);
    setTimeout(() => { cur.remove(); tick(); }, 350);
    loader.addEventListener("click", finishLoad);
    setTimeout(finishLoad, 6000); // hard cap
  }

  /* ═══ TEXT SCRAMBLE / DECODE ═══ */
  const GLYPHS = "!<>-_\\/[]{}—=+*^?#01";
  function scramble(el, finalText, dur) {
    if (reduced) { el.textContent = finalText; return; }
    dur = dur || 900;
    const start = performance.now();
    const len = finalText.length;
    function frame(now) {
      const p = Math.min((now - start) / dur, 1);
      const reveal = Math.floor(p * len);
      let out = "";
      for (let i = 0; i < len; i++) {
        const ch = finalText[i];
        if (i < reveal || ch === " ") out += ch;
        else out += GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
      }
      el.textContent = out;
      if (p < 1) requestAnimationFrame(frame);
      else el.textContent = finalText;
    }
    requestAnimationFrame(frame);
  }

  /* hero name + section titles decode when visible */
  const scrambleObs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        const el = e.target;
        scramble(el, el.dataset.final || el.textContent.trim());
        scrambleObs.unobserve(el);
      }
    });
  }, { threshold: 0.4 });
  $$("[data-scramble]").forEach(el => {
    if (el.classList.contains("hero-name")) return; // decoded after boot
    el.dataset.final = el.textContent.trim();
    if (!reduced) el.textContent = el.dataset.final.replace(/[^ ]/g, "█");
    scrambleObs.observe(el);
  });
  const heroName = $(".hero-name");
  heroName.dataset.final = heroName.textContent.trim();
  if (!reduced) heroName.textContent = heroName.dataset.final.replace(/[^ ]/g, "█");

  /* ═══ TYPED ROLES (hero) ═══ */
  const roles = [
    "cybersecurity researcher",
    "cryptography engineer",
    "game developer",
    "competitive programmer"
  ];
  const typedEl = $("#typed-roles");
  let heroStarted = false;
  function startHero() {
    if (heroStarted) return; heroStarted = true;
    revealHero();
    scramble(heroName, heroName.dataset.final, 1100);
    if (reduced) { typedEl.textContent = roles.join(" · "); return; }
    let ri = 0, ci = 0, deleting = false;
    (function type() {
      const word = roles[ri];
      if (!deleting) {
        typedEl.textContent = word.slice(0, ++ci);
        if (ci === word.length) { deleting = true; return setTimeout(type, 1600); }
        setTimeout(type, 45 + Math.random() * 50);
      } else {
        typedEl.textContent = word.slice(0, --ci);
        if (ci === 0) { deleting = false; ri = (ri + 1) % roles.length; return setTimeout(type, 350); }
        setTimeout(type, 24);
      }
    })();
  }
  if (reduced) startHero();

  /* ═══ SCROLL REVEALS ═══ */
  const revObs = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add("in"); revObs.unobserve(e.target); } });
  }, { threshold: 0.12, rootMargin: "0px 0px -6% 0px" });
  $$(".reveal").forEach(el => { if (!el.closest(".hero")) revObs.observe(el); });
  function revealHero() { $$(".hero .reveal").forEach(el => revObs.observe(el)); }

  /* ═══ HEXFIELD CANVAS (hero background) ═══ */
  const canvas = $("#hexfield");
  if (canvas && !reduced) {
    const ctx = canvas.getContext("2d");
    let W, H, cols, drops;
    const HEX = "0123456789abcdef";
    function size() {
      W = canvas.width = canvas.offsetWidth;
      H = canvas.height = canvas.offsetHeight;
      cols = Math.floor(W / 22);
      drops = Array.from({ length: cols }, () => Math.random() * -40);
    }
    size(); window.addEventListener("resize", size);
    let last = 0;
    (function draw(t) {
      requestAnimationFrame(draw);
      if (t - last < 90) return; last = t;
      ctx.fillStyle = "rgba(15,23,42,0.14)";
      ctx.fillRect(0, 0, W, H);
      ctx.font = "15px 'JetBrains Mono', monospace";
      ctx.fillStyle = "rgba(34,197,94,0.5)";
      for (let i = 0; i < cols; i++) {
        const ch = HEX[Math.floor(Math.random() * HEX.length)] + HEX[Math.floor(Math.random() * HEX.length)];
        ctx.fillText(ch, i * 22, drops[i] * 22);
        if (drops[i] * 22 > H && Math.random() > 0.976) drops[i] = 0;
        drops[i]++;
      }
    })(0);
  }

  /* ═══ PROJECTS GRID ═══ */
  const langColors = { Python: "#3572A5", TypeScript: "#3178c6", C: "#8b8b8b", "C++": "#f34b7d", OpenBullet: "#22C55E" };
  const grid = $("#project-grid");
  DATA.projects.forEach(p => {
    const card = document.createElement("article");
    card.className = "proj reveal" + (p.featured ? " featured" : "");
    card.innerHTML =
      '<div class="proj-top"><span class="proj-tag">' + p.tag + '</span>' +
      '<span class="proj-links"><a href="' + p.url + '" target="_blank" rel="noopener">code ↗</a></span></div>' +
      '<h3>' + p.name + '</h3><p>' + p.desc + '</p>' +
      '<div class="proj-meta"><span><span class="lang-dot" style="background:' + (langColors[p.language] || "#94A3B8") + '"></span>' + p.language + '</span>' +
      '<span>updated ' + p.updated + '</span></div>';
    grid.appendChild(card);
    revObs.observe(card);
  });

  /* ═══ CERTS GRID ═══ */
  const cgrid = $("#cert-grid");
  DATA.certs.forEach(c => {
    const a = document.createElement("a");
    a.className = "cert reveal";
    a.href = c.file; a.target = "_blank"; a.rel = "noopener";
    a.innerHTML = '<span class="cert-issuer">' + c.issuer + '</span><h3>' + c.title + '</h3>' +
      '<span class="cert-year">' + c.year + '</span><span class="cert-view">view document ↗</span>';
    cgrid.appendChild(a);
    revObs.observe(a);
  });

  /* ═══ CODEFORCES CHART ═══ */
  const cf = DATA.cf;
  $("#cf-cur").textContent = cf.current;
  $("#cf-max").textContent = cf.max;
  $("#cf-n").textContent = cf.contests;
  const svg = $("#cf-chart"), tip = $("#cf-tip");
  const NS = "http://www.w3.org/2000/svg";
  function renderChart() {
    const w = svg.clientWidth || 600, h = 260, pad = { l: 44, r: 14, t: 16, b: 30 };
    svg.setAttribute("viewBox", "0 0 " + w + " " + h);
    svg.innerHTML = "";
    const pts = cf.history;
    const vals = pts.map(p => p.rating);
    let min = Math.min(...vals), max = Math.max(...vals);
    min = Math.floor((min - 60) / 100) * 100; max = Math.ceil((max + 60) / 100) * 100;
    const X = i => pad.l + (w - pad.l - pad.r) * (i / (pts.length - 1));
    const Y = v => pad.t + (h - pad.t - pad.b) * (1 - (v - min) / (max - min));

    // rank-band shading (newbie <1200)
    const band = document.createElementNS(NS, "rect");
    band.setAttribute("x", pad.l); band.setAttribute("width", w - pad.l - pad.r);
    band.setAttribute("y", Y(1200)); band.setAttribute("height", Y(min) - Y(1200));
    band.setAttribute("fill", "rgba(148,163,184,0.07)");
    svg.appendChild(band);
    const bandLbl = document.createElementNS(NS, "text");
    bandLbl.setAttribute("x", pad.l + 6); bandLbl.setAttribute("y", Y(1200) - 6);
    bandLbl.setAttribute("fill", "#5B6B84"); bandLbl.setAttribute("font-size", "10");
    bandLbl.textContent = "newbie band";
    svg.appendChild(bandLbl);

    // gridlines + y labels
    for (let v = min; v <= max; v += 200) {
      const ln = document.createElementNS(NS, "line");
      ln.setAttribute("x1", pad.l); ln.setAttribute("x2", w - pad.r);
      ln.setAttribute("y1", Y(v)); ln.setAttribute("y2", Y(v));
      ln.setAttribute("stroke", "rgba(148,163,184,0.12)");
      svg.appendChild(ln);
      const t = document.createElementNS(NS, "text");
      t.setAttribute("x", pad.l - 8); t.setAttribute("y", Y(v) + 4);
      t.setAttribute("fill", "#5B6B84"); t.setAttribute("font-size", "10"); t.setAttribute("text-anchor", "end");
      t.textContent = v; svg.appendChild(t);
    }
    // x labels (first / mid / last date)
    [0, Math.floor(pts.length / 2), pts.length - 1].forEach(i => {
      const t = document.createElementNS(NS, "text");
      t.setAttribute("x", X(i)); t.setAttribute("y", h - 8);
      t.setAttribute("fill", "#5B6B84"); t.setAttribute("font-size", "10"); t.setAttribute("text-anchor", "middle");
      t.textContent = pts[i].t.slice(0, 7); svg.appendChild(t);
    });

    // area + line
    const line = pts.map((p, i) => (i ? "L" : "M") + X(i).toFixed(1) + "," + Y(p.rating).toFixed(1)).join(" ");
    const defs = document.createElementNS(NS, "defs");
    defs.innerHTML = '<linearGradient id="cfgrad" x1="0" y1="0" x2="0" y2="1">' +
      '<stop offset="0" stop-color="#22C55E" stop-opacity="0.35"/>' +
      '<stop offset="1" stop-color="#22C55E" stop-opacity="0"/></linearGradient>';
    svg.appendChild(defs);
    const area = document.createElementNS(NS, "path");
    area.setAttribute("d", line + " L" + X(pts.length - 1).toFixed(1) + "," + (h - pad.b) + " L" + X(0).toFixed(1) + "," + (h - pad.b) + " Z");
    area.setAttribute("fill", "url(#cfgrad)");
    svg.appendChild(area);
    const path = document.createElementNS(NS, "path");
    path.setAttribute("d", line); path.setAttribute("fill", "none");
    path.setAttribute("stroke", "#22C55E"); path.setAttribute("stroke-width", "2.5");
    path.setAttribute("stroke-linejoin", "round"); path.setAttribute("stroke-linecap", "round");
    svg.appendChild(path);

    // max marker
    const mi = vals.indexOf(Math.max(...vals));
    const mc = document.createElementNS(NS, "circle");
    mc.setAttribute("cx", X(mi)); mc.setAttribute("cy", Y(vals[mi])); mc.setAttribute("r", 5);
    mc.setAttribute("fill", "#fbbf24"); mc.setAttribute("stroke", "#0F172A"); mc.setAttribute("stroke-width", "2");
    svg.appendChild(mc);

    // hover dots
    pts.forEach((p, i) => {
      const c = document.createElementNS(NS, "circle");
      c.setAttribute("cx", X(i)); c.setAttribute("cy", Y(p.rating)); c.setAttribute("r", 9);
      c.setAttribute("fill", "transparent"); c.style.cursor = "crosshair";
      c.addEventListener("mouseenter", () => {
        tip.hidden = false;
        tip.innerHTML = "<strong style='color:#22C55E'>" + p.rating + "</strong> · rank " + p.rank.toLocaleString() +
          "<span class='dim'>" + p.n + " — " + p.t + "</span>";
        const wrap = svg.parentElement.getBoundingClientRect();
        tip.style.left = (X(i) / w * 100) + "%";
        tip.style.top = (Y(p.rating) / h * wrap.height) + "px";
      });
      c.addEventListener("mouseleave", () => { tip.hidden = true; });
      // touch support
      c.addEventListener("click", () => {
        tip.hidden = false;
        tip.innerHTML = "<strong style='color:#22C55E'>" + p.rating + "</strong> · rank " + p.rank.toLocaleString() +
          "<span class='dim'>" + p.n + " — " + p.t + "</span>";
        const wrap = svg.parentElement.getBoundingClientRect();
        tip.style.left = (X(i) / w * 100) + "%";
        tip.style.top = (Y(p.rating) / h * wrap.height) + "px";
        clearTimeout(tip._t); tip._t = setTimeout(() => tip.hidden = true, 2500);
      });
      svg.appendChild(c);
    });
  }
  renderChart();
  let rsz; window.addEventListener("resize", () => { clearTimeout(rsz); rsz = setTimeout(renderChart, 200); });

  /* ═══ GITHUB LANG BARS ═══ */
  $("#gh-repos").textContent = DATA.github.repos;
  $("#gh-fol").textContent = DATA.github.followers;
  const lb = $("#langbars");
  DATA.github.languages.forEach(l => {
    const row = document.createElement("div");
    row.className = "langbar";
    row.innerHTML = "<span>" + l.name + "</span><span class='bar'><span class='fill' data-w='" + l.pct + "' style='background:" + l.color + "'></span></span><span class='pct'>" + l.pct + "%</span>";
    lb.appendChild(row);
  });
  const fillObs = new IntersectionObserver((es) => {
    es.forEach(e => { if (e.isIntersecting) { $$(".fill", lb).forEach(f => f.style.width = f.dataset.w + "%"); fillObs.disconnect(); } });
  }, { threshold: 0.3 });
  fillObs.observe(lb);

  /* ═══ MOBILE NAV ═══ */
  const toggle = $("#nav-toggle"), links = $("#nav-links");
  toggle.addEventListener("click", () => {
    const open = links.classList.toggle("open");
    toggle.classList.toggle("open", open);
    toggle.setAttribute("aria-expanded", open);
  });
  $$("#nav-links a").forEach(a => a.addEventListener("click", () => {
    links.classList.remove("open"); toggle.classList.remove("open"); toggle.setAttribute("aria-expanded", "false");
  }));

  /* ═══ ACTIVE NAV LINK ═══ */
  const secIds = ["about", "projects", "arena", "journey", "certs", "contact"];
  const navAs = $$("#nav-links a");
  const secObs = new IntersectionObserver((es) => {
    es.forEach(e => {
      if (e.isIntersecting) {
        navAs.forEach(a => a.style.color = a.getAttribute("href") === "#" + e.target.id ? "var(--accent)" : "");
      }
    });
  }, { rootMargin: "-40% 0px -55% 0px" });
  secIds.forEach(id => { const s = document.getElementById(id); if (s) secObs.observe(s); });
})();

/* ═══════════ WOW LAYER ═══════════ */
(function () {
  "use strict";
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const finePointer = window.matchMedia("(pointer: fine)").matches;
  const $ = (s, c) => (c || document).querySelector(s);
  const $$ = (s, c) => Array.from((c || document).querySelectorAll(s));
  if (reduced) return;

  /* ── custom cursor ── */
  if (finePointer) {
    const dot = $("#cursor-dot"), ring = $("#cursor-ring");
    let mx = -100, my = -100, rx = -100, ry = -100;
    addEventListener("mousemove", e => { mx = e.clientX; my = e.clientY; });
    (function loop() {
      rx += (mx - rx) * 0.16; ry += (my - ry) * 0.16;
      dot.style.transform = `translate(${mx}px,${my}px) translate(-50%,-50%)`;
      ring.style.transform = `translate(${rx}px,${ry}px) translate(-50%,-50%)`;
      requestAnimationFrame(loop);
    })();
    const hoverables = "a, button, .proj, .cert, .scroll-cue";
    document.addEventListener("mouseover", e => { if (e.target.closest(hoverables)) ring.classList.add("hovering"); });
    document.addEventListener("mouseout", e => { if (e.target.closest(hoverables)) ring.classList.remove("hovering"); });
  }

  /* ── scroll progress ── */
  const prog = $("#progress");
  addEventListener("scroll", () => {
    const h = document.documentElement;
    prog.style.width = (h.scrollTop / (h.scrollHeight - h.clientHeight) * 100) + "%";
  }, { passive: true });

  /* ── marquee content (duplicated for seamless loop) ── */
  const items = ["LLM red-teaming", "BLAKE3 CSPRNG", "game engines", "digital forensics", "competitive programming", "full-stack", "systems hacking"];
  const half = items.map(t => `<span><b>✦</b>&nbsp; ${t}</span>`).join("");
  $("#marquee-track").innerHTML = half + half;

  /* ── magnetic buttons ── */
  if (finePointer) $$(".hero-ctas .btn, .contact-ctas .btn").forEach(btn => {
    btn.addEventListener("mousemove", e => {
      const r = btn.getBoundingClientRect();
      const x = e.clientX - r.left - r.width / 2, y = e.clientY - r.top - r.height / 2;
      btn.style.transform = `translate(${x * 0.22}px, ${y * 0.28}px)`;
    });
    btn.addEventListener("mouseleave", () => { btn.style.transform = ""; });
  });

  /* ── 3D tilt on cards ── */
  if (finePointer) $$(".proj, .cert").forEach(card => {
    card.addEventListener("mousemove", e => {
      const r = card.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width - 0.5;
      const py = (e.clientY - r.top) / r.height - 0.5;
      card.style.transform = `perspective(900px) rotateX(${(-py * 7).toFixed(2)}deg) rotateY(${(px * 9).toFixed(2)}deg) translateY(-4px)`;
    });
    card.addEventListener("mouseleave", () => { card.style.transform = ""; });
  });

  /* ── hero glow follows mouse ── */
  const glow = $("#glow"), hero = $(".hero");
  if (finePointer && glow) hero.addEventListener("mousemove", e => {
    const r = hero.getBoundingClientRect();
    glow.style.left = (e.clientX - r.left) + "px";
    glow.style.top = (e.clientY - r.top) + "px";
  });

  /* ── hero parallax on scroll ── */
  const heroInner = $(".hero-inner");
  addEventListener("scroll", () => {
    const y = scrollY;
    if (y < innerHeight) {
      heroInner.style.transform = `translateY(${y * 0.22}px)`;
      heroInner.style.opacity = Math.max(0, 1 - y / (innerHeight * 0.85));
    }
  }, { passive: true });

  /* ── periodic glitch on hero name ── */
  const name = $(".hero-name");
  name.setAttribute("data-text", "UTSAV GUPTA");
  setInterval(() => {
    if (document.hidden) return;
    name.classList.add("glitching");
    setTimeout(() => name.classList.remove("glitching"), 340);
  }, 5200);
  name.addEventListener("mouseenter", () => {
    name.classList.add("glitching");
    setTimeout(() => name.classList.remove("glitching"), 340);
  });

  /* ── count-up stats ── */
  function countUp(el, target, dur) {
    const t0 = performance.now();
    (function f(t) {
      const p = Math.min((t - t0) / dur, 1);
      el.textContent = Math.round(target * (1 - Math.pow(1 - p, 3)));
      if (p < 1) requestAnimationFrame(f);
    })(t0);
  }
  const statObs = new IntersectionObserver(es => {
    es.forEach(e => {
      if (!e.isIntersecting) return;
      const el = e.target, target = +el.dataset.count;
      if (target) countUp(el, target, 1200);
      statObs.unobserve(el);
    });
  }, { threshold: 0.5 });
  [["#cf-cur", DATA.cf.current], ["#cf-max", DATA.cf.max], ["#cf-n", DATA.cf.contests],
   ["#gh-repos", DATA.github.repos], ["#gh-fol", DATA.github.followers]].forEach(([sel, v]) => {
    const el = $(sel); el.dataset.count = v; el.textContent = "0"; statObs.observe(el);
  });

  /* ── timeline draw ── */
  const tl = $(".timeline");
  new IntersectionObserver((es, o) => {
    es.forEach(e => { if (e.isIntersecting) { tl.classList.add("drawn"); o.disconnect(); } });
  }, { threshold: 0.15 }).observe(tl);

  /* ── BREACH MODE easter egg: type "hack" ── */
  const breach = $("#breach"), blog = $("#breach-log");
  let keys = "", cooling = false;
  const traceLines = [
    "> resolving origin … 203.0.113.42 [OK]",
    "> hopping proxy … 198.51.100.7 [OK]",
    "> hopping proxy … 192.0.2.99 [OK]",
    "> deanonymizing … <span style='color:#fca5a5'>FAILED</span>",
    "> trace failed — nice try, visitor."
  ];
  function triggerBreach() {
    if (cooling || breach.classList.contains("on")) return;
    cooling = true; setTimeout(() => cooling = false, 30000);
    document.body.classList.add("scanlines");
    breach.classList.add("on"); breach.setAttribute("aria-hidden", "false");
    blog.innerHTML = "";
    let i = 0;
    const step = () => {
      if (i < traceLines.length) {
        const d = document.createElement("div"); d.innerHTML = traceLines[i++];
        blog.appendChild(d); setTimeout(step, 650);
      } else setTimeout(() => {
        breach.classList.remove("on"); breach.setAttribute("aria-hidden", "true");
        document.body.classList.remove("scanlines");
      }, 1400);
    };
    setTimeout(step, 500);
    breach.addEventListener("click", () => {
      breach.classList.remove("on"); document.body.classList.remove("scanlines");
    }, { once: true });
  }
  addEventListener("keydown", e => {
    if (e.key.length !== 1) return;
    keys = (keys + e.key.toLowerCase()).slice(-4);
    if (keys === "hack") { keys = ""; triggerBreach(); }
  });
  // hint in console for the curious
  console.log("%cpsst — type 'hack' anywhere on this page. you didn't hear it from me.", "color:#22C55E;font-family:monospace");
})();
