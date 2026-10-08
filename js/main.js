/* ═══════════ portfolio interactions ═══════════ */
(function () {
  "use strict";
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const $ = (s, c) => (c || document).querySelector(s);
  const $$ = (s, c) => Array.from((c || document).querySelectorAll(s));

  /* accent helpers — phosphor themes recolor canvas/SVG chrome */
  const accentCss = () => getComputedStyle(document.documentElement).getPropertyValue("--accent").trim() || "#22C55E";
  const accentRgb = () => { const m = accentCss().match(/\w\w/g); return m ? m.slice(0, 3).map(x => parseInt(x, 16)).join(",") : "34,197,94"; };

  /* ── footer year ── */
  $("#year").textContent = new Date().getFullYear();
  $("#proj-count").textContent = DATA.projects.length;

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
    "llm inferencer",
    "cybersecurity enthusiast",
    "cryptography tinkerer",
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
    let last = 0, ACC_RGB = accentRgb();
    addEventListener("portfolio:theme", () => { ACC_RGB = accentRgb(); });
    (function draw(t) {
      requestAnimationFrame(draw);
      if (t - last < 90) return; last = t;
      ctx.fillStyle = "rgba(15,23,42,0.14)";
      ctx.fillRect(0, 0, W, H);
      ctx.font = "15px 'JetBrains Mono', monospace";
      ctx.fillStyle = "rgba(" + ACC_RGB + ",0.5)";
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
      '<span>updated ' + p.updated + '</span></div>' +
      '<span class="proj-deep">▸ click for deep dive</span>';
    card.setAttribute("tabindex", "0");
    card.setAttribute("role", "button");
    card.setAttribute("aria-label", p.name + " — open project deep dive");
    card.querySelector(".proj-links a").addEventListener("click", e => e.stopPropagation());
    const launch = () => openModal(p);
    card.addEventListener("click", launch);
    card.addEventListener("keydown", e => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); launch(); } });
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
    const acc = accentCss();
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
    bandLbl.setAttribute("fill", "#8695AD"); bandLbl.setAttribute("font-size", "10");
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
      t.setAttribute("fill", "#8695AD"); t.setAttribute("font-size", "10"); t.setAttribute("text-anchor", "end");
      t.textContent = v; svg.appendChild(t);
    }
    // x labels (first / mid / last date)
    [0, Math.floor(pts.length / 2), pts.length - 1].forEach(i => {
      const t = document.createElementNS(NS, "text");
      t.setAttribute("x", X(i)); t.setAttribute("y", h - 8);
      t.setAttribute("fill", "#8695AD"); t.setAttribute("font-size", "10"); t.setAttribute("text-anchor", "middle");
      t.textContent = pts[i].t.slice(0, 7); svg.appendChild(t);
    });

    // area + line
    const line = pts.map((p, i) => (i ? "L" : "M") + X(i).toFixed(1) + "," + Y(p.rating).toFixed(1)).join(" ");
    const defs = document.createElementNS(NS, "defs");
    defs.innerHTML = '<linearGradient id="cfgrad" x1="0" y1="0" x2="0" y2="1">' +
      '<stop offset="0" stop-color="' + acc + '" stop-opacity="0.35"/>' +
      '<stop offset="1" stop-color="' + acc + '" stop-opacity="0"/></linearGradient>';
    svg.appendChild(defs);
    const area = document.createElementNS(NS, "path");
    area.setAttribute("d", line + " L" + X(pts.length - 1).toFixed(1) + "," + (h - pad.b) + " L" + X(0).toFixed(1) + "," + (h - pad.b) + " Z");
    area.setAttribute("fill", "url(#cfgrad)");
    svg.appendChild(area);
    const path = document.createElementNS(NS, "path");
    path.setAttribute("d", line); path.setAttribute("fill", "none");
    path.setAttribute("stroke", acc); path.setAttribute("stroke-width", "2.5");
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
        tip.innerHTML = "<strong style='color:" + acc + "'>" + p.rating + "</strong> · rank " + p.rank.toLocaleString() +
          "<span class='dim'>" + p.n + " — " + p.t + "</span>";
        const wrap = svg.parentElement.getBoundingClientRect();
        tip.style.left = (X(i) / w * 100) + "%";
        tip.style.top = (Y(p.rating) / h * wrap.height) + "px";
      });
      c.addEventListener("mouseleave", () => { tip.hidden = true; });
      // touch support
      c.addEventListener("click", () => {
        tip.hidden = false;
        tip.innerHTML = "<strong style='color:" + acc + "'>" + p.rating + "</strong> · rank " + p.rank.toLocaleString() +
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
  addEventListener("portfolio:theme", renderChart);
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

  /* ═══ ACTIVITY HEATMAPS ═══ */
  const NS2 = "http://www.w3.org/2000/svg";
  function renderHeatmap(elId, data, prefix, noun) {
    const el = document.getElementById(elId);
    if (!el || !data) return;
    const counts = {};
    let max = 1, total = 0;
    data.forEach(([d, c]) => { counts[d] = c; if (c > max) max = c; total += c; });
    const lvl = c => c === 0 ? 0 : c <= max * 0.25 ? 1 : c <= max * 0.5 ? 2 : c <= max * 0.75 ? 3 : 4;
    const end = new Date(); end.setHours(0, 0, 0, 0);
    const start = new Date(end); start.setDate(start.getDate() - (53 * 7 - 1));
    start.setDate(start.getDate() - start.getDay());
    // ponytail: cell size picked once at load (fits a full year to the card width; no re-render on rotate/resize)
    const top = 20, left = 8;
    const avail = Math.max(280, (el.parentElement.clientWidth || 525) - 48); // .heatmap-scroll side padding
    const pitch = Math.min(14, Math.max(5, Math.floor((avail - left * 2) / 54)));
    const gap = pitch >= 7 ? 2 : 1;
    const cell = pitch - gap;
    const rx = Math.min(2.5, cell * 0.25);
    const dense = pitch < 7; // crowded months: label every other one
    const weeks = [];
    for (let w = new Date(start); w <= end; w.setDate(w.getDate() + 7)) weeks.push(new Date(w));
    const W = left * 2 + weeks.length * (cell + gap), H = top + 7 * (cell + gap) + 6;
    const svg = document.createElementNS(NS2, "svg");
    svg.setAttribute("width", W); svg.setAttribute("height", H);
    svg.setAttribute("viewBox", "0 0 " + W + " " + H);
    const iso = dt => dt.getFullYear() + "-" + String(dt.getMonth() + 1).padStart(2, "0") + "-" + String(dt.getDate()).padStart(2, "0");
    let lastMonth = -1, labelN = 0;
    weeks.forEach((w, wi) => {
      if (w.getMonth() !== lastMonth) {
        lastMonth = w.getMonth();
        if (wi > 0 && (!dense || labelN++ % 2 === 0)) {
          const t = document.createElementNS(NS2, "text");
          t.setAttribute("x", left + wi * (cell + gap)); t.setAttribute("y", 13);
          t.setAttribute("fill", "#8695AD"); t.setAttribute("font-size", "10");
          t.textContent = w.toLocaleString("en", { month: "short" });
          svg.appendChild(t);
        }
      }
      for (let d = 0; d < 7; d++) {
        const dt = new Date(w); dt.setDate(dt.getDate() + d);
        if (dt > end) break;
        const key = iso(dt), c = counts[key] || 0;
        const r = document.createElementNS(NS2, "rect");
        r.setAttribute("x", left + wi * (cell + gap)); r.setAttribute("y", top + d * (cell + gap));
        r.setAttribute("width", cell); r.setAttribute("height", cell); r.setAttribute("rx", rx);
        r.setAttribute("class", prefix + lvl(c));
        const tt = document.createElementNS(NS2, "title");
        tt.textContent = c + " " + noun + (c === 1 ? "" : "s") + " on " + key;
        r.appendChild(tt); svg.appendChild(r);
      }
    });
    el.appendChild(svg);
    return { total, days: data.length };
  }
  const ghS = renderHeatmap("gh-heatmap", DATA.ghActivity, "hl", "contribution");
  const cfS = renderHeatmap("cf-heatmap", DATA.cfActivity, "c", "submission");
  if (ghS) { $("#gh-total").textContent = ghS.total; $("#gh-days").textContent = ghS.days; }
  if (cfS) { $("#cf-total").textContent = cfS.total; $("#cf-days").textContent = cfS.days; }

  /* ═══ HPC SPECS (macchina) ═══ */
  const hpcEl = $("#hpc-specs");
  if (hpcEl && DATA.hpc) {
    const rows = [["Host", DATA.hpc.host], ["Machine", DATA.hpc.machine], ["CPU", DATA.hpc.cpu],
      ["GPU", DATA.hpc.gpus], ["Memory", DATA.hpc.memory], ["Distro", DATA.hpc.distro], ["Kernel", DATA.hpc.kernel]];
    hpcEl.innerHTML = rows.map(([k, v]) => '<span class="hk">' + k + "</span><span class='hv'>" + v + "</span>").join("") +
      '<p class="hpc-note">live specs from the DGX A100 box used while developing SAAGA — HPC runs for LLM evaluation.</p>';
  }

  /* ═══ PROJECT DEEP-DIVE MODAL ═══ */
  const modal = $("#proj-modal"), pmBox = modal.querySelector(".pmodal-box");
  let lastFocus = null;
  /* ═══ STAGED ARCHITECTURE DIAGRAMS ═══
     spec: { stages:[{name, nodes:[{id,label,sub,kind}]}], flows:[[fromId,toId,label?]] }
     kinds: agent · engine · data · ext · gate · ui  (color-coded, legend included) */
  const KIND_C = { agent: "#22C55E", engine: "#22d3ee", data: "#a78bfa", ext: "#f59e0b", gate: "#fb7185", ui: "#60a5fa" };
  const KIND_N = { agent: "LLM agent", engine: "deterministic tool", data: "data / artifact", ext: "external system", gate: "human gate", ui: "interface" };
  const esc = s => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  function archDiagram(spec) {
    if (Array.isArray(spec)) return archSVG(spec, false);
    const NW = 172, NH = 70, GX = 52, PAD = 28, BGAP = 62, LBLH = 26;
    const stages = spec.stages || [], flows = spec.flows || [];
    const pos = {};
    let maxN = 1;
    const used = [];
    stages.forEach(st => {
      maxN = Math.max(maxN, st.nodes.length);
      st.nodes.forEach(n => { if (n.kind && used.indexOf(n.kind) < 0) used.push(n.kind); });
    });
    const bandW = maxN * (NW + GX) - GX;
    const legendW = used.map(k => KIND_N[k].length * 6.4 + 26).reduce((a, b) => a + b, 0);
    const W = Math.max(PAD * 2 + bandW, legendW + PAD * 2);
    stages.forEach((st, si) => {
      const y = PAD + si * (NH + LBLH + BGAP) + LBLH;
      const rowW = st.nodes.length * (NW + GX) - GX, x0 = (W - rowW) / 2;
      st.nodes.forEach((n, ni) => {
        const x = x0 + ni * (NW + GX);
        pos[n.id] = { x, y, cx: x + NW / 2, cy: y + NH / 2, n };
      });
    });
    const H = PAD * 2 + stages.length * (NH + LBLH + BGAP) - BGAP + 40;
    const tri = (x, y, d) => {
      const p = { down: [[x - 6, y - 9], [x + 6, y - 9], [x, y]], up: [[x - 6, y + 9], [x + 6, y + 9], [x, y]],
                  right: [[x - 9, y - 6], [x - 9, y + 6], [x, y]], left: [[x + 9, y - 6], [x + 9, y + 6], [x, y]] }[d];
      return '<polygon points="' + p.map(q => q.join(",")).join(" ") + '" fill="#94a3b8"/>';
    };
    const wrap2 = label => {
      const words = String(label).split(" "), lines = [];
      let cur = "";
      words.forEach(w => { if ((cur + " " + w).trim().length > 20 && cur) { lines.push(cur.trim()); cur = w; } else cur += " " + w; });
      if (cur.trim()) lines.push(cur.trim());
      return lines.slice(0, 2);
    };
    let s = '<svg width="' + W + '" viewBox="0 0 ' + W + " " + H + '" role="img" aria-label="project architecture diagram">';
    // stage bands
    stages.forEach((st, si) => {
      const y = PAD + si * (NH + LBLH + BGAP), bx = (W - bandW) / 2 - 14;
      s += '<rect x="' + bx + '" y="' + y + '" width="' + (bandW + 28) + '" height="' + (NH + LBLH + 22) + '" rx="12" fill="none" stroke="#1e293b" stroke-width="1" stroke-dasharray="5 5"/>';
      s += '<text x="' + (bx + 10) + '" y="' + (y + 16) + '" fill="#22C55E" font-size="11" font-family="monospace">' + esc("0" + (si + 1) + " · " + st.name) + "</text>";
    });
    // edges (under nodes)
    flows.forEach(fl => {
      const A = pos[fl[0]], B = pos[fl[1]];
      if (!A || !B) return;
      let d, mx, my, dir;
      if (B.y > A.y + 1) {          // downward
        const y1 = A.y + NH, y2 = B.y;
        d = "M" + A.cx + "," + y1 + " C" + A.cx + "," + (y1 + 38) + " " + B.cx + "," + (y2 - 38) + " " + B.cx + "," + (y2 - 2);
        mx = (A.cx + B.cx) / 2; my = (y1 + y2) / 2; dir = "down";
        s += '<path d="' + d + '" fill="none" stroke="#475569" stroke-width="1.6"/>' + tri(B.cx, B.y - 2, "down");
      } else if (B.y < A.y - 1) {   // upward: route around the left margin
        const x0 = 12, x1 = A.x, y1 = A.cy, x2 = B.x, y2 = B.cy;
        d = "M" + x1 + "," + y1 + " C" + x0 + "," + y1 + " " + x0 + "," + y2 + " " + (x2 - 2) + "," + y2;
        mx = x0 + 2; my = (y1 + y2) / 2; dir = "right";
        s += '<path d="' + d + '" fill="none" stroke="#475569" stroke-width="1.6" stroke-dasharray="7 5"/>' + tri(x2 - 2, y2, "right");
      } else {                       // same band: arc over the top (labels never clip)
        const sx = A.x + NW - 24, ex = B.x + 24, ty = A.y, peak = ty - 38;
        d = "M" + sx + "," + ty + " C" + sx + "," + peak + " " + ex + "," + peak + " " + ex + "," + (ty - 2);
        mx = (sx + ex) / 2; my = peak + 18; dir = "down";
        s += '<path d="' + d + '" fill="none" stroke="#475569" stroke-width="1.6"/>' + tri(ex, ty - 2, "down");
      }
      if (fl[2]) {
        const lb = esc(fl[2]), wpx = lb.length * 6.4 + 16;
        const lx = dir === "right" && B.y < A.y - 1 ? mx + wpx / 2 + 4 : mx; // nudge loop labels off the margin line
        s += '<rect x="' + (lx - wpx / 2) + '" y="' + (my - 10) + '" width="' + wpx + '" height="20" rx="10" fill="#0b1220" stroke="#334155" stroke-width="1"/>';
        s += '<text x="' + lx + '" y="' + (my + 4) + '" text-anchor="middle" fill="#94a3b8" font-size="10.5" font-family="monospace">' + lb + "</text>";
      }
    });
    // nodes
    Object.keys(pos).forEach(id => {
      const P = pos[id], n = P.n, c = KIND_C[n.kind] || "#22C55E";
      s += '<rect x="' + P.x + '" y="' + P.y + '" width="' + NW + '" height="' + NH + '" rx="10" fill="#0d1526" stroke="' + c + '" stroke-width="1.5"/>';
      s += '<rect x="' + P.x + '" y="' + P.y + '" width="4" height="' + NH + '" rx="2" fill="' + c + '"/>';
      const lines = wrap2(n.label);
      lines.forEach((ln, li) => {
        s += '<text x="' + P.cx + '" y="' + (P.y + 26 + li * 16) + '" text-anchor="middle" fill="#e2e8f0" font-size="12.5" font-family="monospace">' + esc(ln) + "</text>";
      });
      if (n.sub) {
        let sub = String(n.sub);
        if (sub.length > 27) sub = sub.slice(0, 26) + "…";
        s += '<text x="' + P.cx + '" y="' + (P.y + NH - 12) + '" text-anchor="middle" fill="#8695AD" font-size="10" font-family="monospace">' + esc(sub) + "</text>";
      }
    });
    // legend
    let lx = W / 2 - legendW / 2;
    used.forEach(k => {
      const wpx = KIND_N[k].length * 6.4 + 26;
      s += '<circle cx="' + (lx + 8) + '" cy="' + (H - 16) + '" r="5" fill="' + KIND_C[k] + '"/>';
      s += '<text x="' + (lx + 19) + '" y="' + (H - 12) + '" fill="#8695AD" font-size="10.5" font-family="monospace">' + KIND_N[k] + "</text>";
      lx += wpx;
    });
    return s + "</svg>";
  }
  function archSVG(nodes, loop) {
    const nW = 148, nH = 56, gapX = 52, padX = 24, topY = 24;
    const W = padX * 2 + nodes.length * nW + (nodes.length - 1) * gapX;
    const H = topY * 2 + nH + (loop ? 72 : 0);
    const triR = (x, y) => '<polygon points="' + x + "," + (y - 5.5) + " " + x + "," + (y + 5.5) + " " + (x + 9) + "," + y + '" fill="#22C55E"/>';
    const triL = (x, y) => '<polygon points="' + x + "," + (y - 5.5) + " " + x + "," + (y + 5.5) + " " + (x - 9) + "," + y + '" fill="#22C55E"/>';
    let s = '<svg width="' + W + '" viewBox="0 0 ' + W + " " + H + '" role="img" aria-label="project architecture diagram">';
    nodes.forEach((label, i) => {
      const x = padX + i * (nW + gapX), y = topY;
      s += '<rect x="' + x + '" y="' + y + '" width="' + nW + '" height="' + nH + '" rx="10" fill="rgba(34,197,94,.06)" stroke="#22C55E" stroke-width="1.4"/>';
      const words = label.split(" "), mid = Math.ceil(words.length / 2);
      const lines = words.length > 2 ? [words.slice(0, mid).join(" "), words.slice(mid).join(" ")] : [label];
      lines.forEach((ln, li) => {
        s += '<text x="' + (x + nW / 2) + '" y="' + (y + nH / 2 + (li - (lines.length - 1) / 2) * 16 + 5) + '" text-anchor="middle" fill="#e2e8f0" font-size="12.5" font-family="monospace">' + ln + "</text>";
      });
      if (i < nodes.length - 1) {
        const x1 = x + nW, x2 = x + nW + gapX, cy = y + nH / 2;
        s += '<line x1="' + x1 + '" y1="' + cy + '" x2="' + (x2 - 13) + '" y2="' + cy + '" stroke="#22C55E" stroke-width="1.6"/>' + triR(x2 - 13, cy);
      }
    });
    if (loop && nodes.length > 1) {
      const sx = padX + nodes.length * nW + (nodes.length - 1) * gapX - 12, sy = topY + nH;
      const ex = padX + 12, ey = topY + nH;
      s += '<path d="M' + sx + "," + sy + " C" + (sx + 44) + "," + (sy + 62) + " " + (ex + 44) + "," + (ey + 62) + " " + (ex + 10) + "," + ey + '" fill="none" stroke="#22C55E" stroke-width="1.4" stroke-dasharray="6 5"/>';
      s += triL(ex + 10, ey);
      s += '<text x="' + (W / 2) + '" y="' + (H - 6) + '" text-anchor="middle" fill="#8695AD" font-size="11" font-family="monospace">self-improving loop</text>';
    }
    return s + "</svg>";
  }
  function openModal(p) {
    const d = p.details || {};
    $("#pm-tag").textContent = p.tag;
    $("#pm-title").textContent = p.name;
    $("#pm-desc").textContent = p.desc;
    $("#pm-code").href = p.url;
    const stats = [["primary language", p.language], ["last updated", p.updated]];
    if (d.size) stats.push(["repo size", d.size]);
    if (d.features) stats.push(["key features", d.features.length]);
    $("#pm-stats").innerHTML = stats.map(([k, v]) => '<div class="pm-stat"><b>' + v + "</b><span>" + k + "</span></div>").join("");
    $("#pm-arch").innerHTML = d.arch ? archDiagram(d.arch) : "<p class='dim'>no diagram</p>";
    $("#pm-feats").innerHTML = (d.features || []).map(f => "<li>" + f + "</li>").join("");
    $("#pm-stack").innerHTML = (d.stack || []).map(t => "<span>" + t + "</span>").join("");
    lastFocus = document.activeElement;
    modal.hidden = false;
    document.body.classList.add("pm-open");
    ["a.skip-link", "header", "main", "footer"].forEach(el => $(el).setAttribute("inert", ""));
    $("#pm-close").focus();
  }
  function closeModal() {
    modal.hidden = true;
    document.body.classList.remove("pm-open");
    ["a.skip-link", "header", "main", "footer"].forEach(el => $(el).removeAttribute("inert"));
    if (lastFocus && lastFocus.focus) lastFocus.focus();
  }
  $("#pm-close").addEventListener("click", closeModal);
  $("#pm-backdrop").addEventListener("click", closeModal);
  document.addEventListener("keydown", e => { if (e.key === "Escape" && !modal.hidden) closeModal(); });

  /* ═══ ACTIVE NAV LINK ═══ */
  const secIds = ["about", "projects", "arena", "journey", "certs", "shell", "contact"];
  const navAs = $$("#nav-links a");
  const secObs = new IntersectionObserver((es) => {
    es.forEach(e => {
      if (e.isIntersecting) {
        navAs.forEach(a => a.style.color = a.getAttribute("href") === "#" + e.target.id ? "var(--accent)" : "");
      }
    });
  }, { rootMargin: "-40% 0px -55% 0px" });
  secIds.forEach(id => { const s = document.getElementById(id); if (s) secObs.observe(s); });

  /* ═══════════ LIVE ARENA — CF / GitHub / Codolio (CORS-open APIs) ═══════════
     Static DATA above is the fallback; each fetch below overwrites on success.
     All endpoints verified ACAO:* — no proxy, no Actions build, always current. */
  const API = { cache: "no-store" };
  const dayKey = t => { const d = new Date(t); return d.getFullYear() + "-" + String(d.getMonth() + 1).padStart(2, "0") + "-" + String(d.getDate()).padStart(2, "0"); };
  const windowCut = () => dayKey(Date.now() - 370 * 864e5); // matches renderHeatmap's 53-week grid
  function setStat(sel, v) {
    const el = $(sel);
    if (!el || typeof v !== "number" || isNaN(v)) return;
    el.dataset.count = v;               // count-up target (observed in the WOW layer)
    if (el.textContent !== "0") el.textContent = String(v); // already animated → write directly
  }
  function redrawHeat(elId, pairs, prefix, noun, totalSel, daysSel) {
    const el = document.getElementById(elId);
    if (!el || !pairs.length) return;
    el.innerHTML = "";                  // renderHeatmap appends; clear the static SVG first
    const s = renderHeatmap(elId, pairs, prefix, noun);
    if (s) { $(totalSel).textContent = s.total; $(daysSel).textContent = s.days; }
  }
  function renderCodolio(total, rows) {
    const t = $("#cod-total"); if (t) t.textContent = total;
    const box = $("#cod-plats");
    if (box) box.innerHTML = rows.map(r => "<span>" + esc(r[0]) + " <b>" + r[1] + "</b></span>").join("");
  }
  renderCodolio(DATA.codolio.total, DATA.codolio.plats); // paints instantly, live refresh follows

  // Codeforces — rating stats, contest count, rating chart, submission heatmap
  fetch("https://codeforces.com/api/user.info?handles=Utsav-X-bit", API).then(r => r.json()).then(j => {
    const u = (j.result || [])[0]; if (!u) return;
    setStat("#cf-cur", u.rating); setStat("#cf-max", u.maxRating);
    cf.current = u.rating; cf.max = u.maxRating;
  }).catch(() => {});
  fetch("https://codeforces.com/api/user.rating?handle=Utsav-X-bit", API).then(r => r.json()).then(j => {
    const list = j.result || []; if (list.length < 2) return;
    setStat("#cf-n", list.length); cf.contests = list.length;
    cf.history = list.map(r => ({ n: r.contestName, rank: r.rank, rating: r.newRating, t: dayKey(r.ratingUpdateTimeSeconds * 1000) }));
    renderChart();
  }).catch(() => {});
  fetch("https://codeforces.com/api/user.status?handle=Utsav-X-bit&from=1&count=100000", API).then(r => r.json()).then(j => {
    const byDay = new Map(), c = windowCut();
    for (const s of j.result || []) {
      const d = dayKey(s.creationTimeSeconds * 1000); if (d < c) continue;
      byDay.set(d, (byDay.get(d) || 0) + 1);
    }
    redrawHeat("cf-heatmap", [...byDay], "c", "submission", "#cf-total", "#cf-days");
  }).catch(() => {});

  // GitHub — repo/follower stats + contribution heatmap
  fetch("https://api.github.com/users/Utsav-X-bit", API).then(r => r.json()).then(j => {
    setStat("#gh-repos", j.public_repos); setStat("#gh-fol", j.followers);
  }).catch(() => {});
  fetch("https://github-contributions-api.jogruber.de/v4/Utsav-X-bit", API).then(r => r.json()).then(j => {
    const c = windowCut();
    const pairs = (j.contributions || []).filter(x => x.count > 0 && x.date >= c).map(x => [x.date, x.count]);
    redrawHeat("gh-heatmap", pairs, "hl", "contribution", "#gh-total", "#gh-days");
  }).catch(() => {});

  // Codolio — questions solved across linked platforms
  fetch("https://api.codolio.com/profile?userKey=Utsav-X-bit", API).then(r => r.json()).then(j => {
    const pl = (((j.data || {}).platformProfiles || {}).platformProfiles) || [];
    const rows = pl.filter(p => p.totalQuestionStats && p.totalQuestionStats.totalQuestionCounts > 0)
      .map(p => [p.platform, p.totalQuestionStats.totalQuestionCounts]);
    if (rows.length) renderCodolio(rows.reduce((a, r) => a + r[1], 0), rows);
  }).catch(() => {});
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
  const items = ["LLM inference", "vLLM · llama.cpp · ollama", "CUDA programming", "LLM red-teaming", "BLAKE3 CSPRNG", "HPC", "game engines", "digital forensics", "competitive programming", "agent harnessing"];
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
  addEventListener("portfolio:hack", triggerBreach);
  // hint in console for the curious
  console.log("%cpsst — type 'hack' anywhere on this page. ↑↑↓↓←→←→BA works too. you didn't hear it from me.", "color:#22C55E;font-family:monospace");
})();

/* ═══════════ DOWNLOADS & DOC FALLBACKS ═══════════ */
(function () {
  "use strict";
  const $$ = (s, c) => Array.from((c || document).querySelectorAll(s));

  /* résumé: embedded base64 chunks (single CLI arg capped at 128KB) */
  try {
    const rb64 = (typeof DATA !== "undefined" && DATA.resumeB64) ? DATA.resumeB64
      : ((window.__RB64_A || "") + (window.__RB64_B || "") + (window.__RB64_C || ""));
    if (rb64) {
      const uri = "data:application/pdf;base64," + rb64;
      $$('a[href="assets/resume/Utsav-Gupta-Resume.pdf"]').forEach(a => {
        a.href = uri;
        a.setAttribute("download", "Utsav-Gupta-Resume.pdf");
      });
    }
  } catch (e) { /* leave static links as-is */ }

  /* toast */
  let toastEl = null, toastT = null;
  function toast(msg) {
    if (!toastEl) {
      toastEl = document.createElement("div");
      toastEl.className = "toast";
      toastEl.setAttribute("role", "status");
      document.body.appendChild(toastEl);
    }
    toastEl.textContent = msg;
    toastEl.classList.add("on");
    clearTimeout(toastT);
    toastT = setTimeout(() => toastEl.classList.remove("on"), 3400);
  }

  /* cert cards: verify the document exists before opening */
  document.addEventListener("click", e => {
    const a = e.target.closest && e.target.closest("a.cert");
    if (!a) return;
    const url = a.getAttribute("href");
    if (!url || url.indexOf("data:") === 0) return;
    e.preventDefault();
    fetch(url, { method: "HEAD" }).then(r => {
      if (r.ok) window.open(url, "_blank", "noopener");
      else toast("document syncing — this certificate file is being uploaded, check back soon.");
    }).catch(() => window.open(url, "_blank", "noopener"));
  });
})();

/* ═══════════ INTERACTIVE SHELL · CLOCK · PHOSPHOR · KONAMI ═══════════ */
(function () {
  "use strict";
  const $ = s => document.querySelector(s);
  const esc = s => String(s).replace(/[&<>"']/g, m => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[m]));

  /* ── live clock (IST) ── */
  const clockEl = $("#clock");
  const tick = () => {
    try { clockEl.textContent = new Date().toLocaleTimeString("en-GB", { timeZone: "Asia/Kolkata", hour12: false }); } catch (e) {}
  };
  if (clockEl) { tick(); setInterval(tick, 1000); }

  /* ── phosphor themes ── */
  const THEMES = ["green", "amber", "ice"];
  let theme = "green";
  try { theme = localStorage.getItem("portfolio-theme") || "green"; } catch (e) {}
  if (!THEMES.includes(theme)) theme = "green";
  function setTheme(name) {
    theme = name;
    if (name === "green") delete document.documentElement.dataset.theme;
    else document.documentElement.dataset.theme = name;
    try { localStorage.setItem("portfolio-theme", name); } catch (e) {}
    dispatchEvent(new CustomEvent("portfolio:theme"));
  }

  /* ── the shell ── */
  const out = $("#cli-out"), form = $("#cli-form"), input = $("#cli-in");
  if (!out || !form || !input) return;

  const hist = []; let hIdx = 0, rooted = false;
  const PROMPT = '<span class="prompt">utsav@x</span><span class="dim">:</span><span class="path">~/portfolio</span><span class="dim">$</span>';
  function print(html, cls) {
    const d = document.createElement("div");
    d.className = "cli-line" + (cls ? " " + cls : "");
    d.innerHTML = html;
    out.appendChild(d);
    out.scrollTop = out.scrollHeight;
  }

  const projects = (typeof DATA !== "undefined" && DATA.projects) || [];

  const cmds = {
    help() {
      print([
        "available commands:",
        "  ls                list featured projects",
        "  open &lt;n|name&gt;     open a project deep-dive",
        "  whoami            who is utsav",
        "  theme &lt;name&gt;      phosphor: green · amber · ice",
        "  resume            download the résumé",
        "  contact           jump to contact",
        "  date              current time (IST)",
        "  hack              you'll see",
        "  sudo              requires elevation…",
        "  clear             clear the screen"
      ].join("\n"), "dim-line");
    },
    ls() {
      projects.forEach((p, i) =>
        print(String(i + 1).padStart(2, " ") + "  <span class=\"cli-ok\">" + esc(p.name) + "</span>  <span class=\"dim\">" + esc(p.tag) + "</span>"));
      print(projects.length + " projects — `open &lt;n&gt;` to dive in", "dim-line");
    },
    open(arg) {
      if (!arg) return print("usage: open &lt;n|name&gt;", "cli-err");
      let i = parseInt(arg, 10) - 1;
      if (isNaN(i) || i < 0 || i >= projects.length) i = projects.findIndex(p => p.name.toLowerCase().includes(arg.toLowerCase()));
      if (i < 0) return print("open: no project matches '" + esc(arg) + "'", "cli-err");
      const cards = document.querySelectorAll("#project-grid .proj");
      const target = document.getElementById("projects");
      if (target) target.scrollIntoView({ behavior: "instant", block: "start" });
      print("opening " + esc(projects[i].name) + " …", "cli-ok");
      setTimeout(() => { if (cards[i]) cards[i].click(); }, 200);
    },
    whoami() {
      const p = (typeof DATA !== "undefined" && DATA.profile) || {};
      print("<span class=\"cli-ok\">" + esc(p.name || "Utsav Gupta") + "</span> — " + esc(p.tagline || ""));
      print("b.tech cse '28 · vips, new delhi · security · crypto · games", "dim-line");
      print("email " + esc(p.email || "") + " · github " + esc(p.handle || ""), "dim-line");
    },
    theme(arg) {
      if (!arg) return print("phosphor: " + theme + " — themes: green · amber · ice (usage: theme amber)", "dim-line");
      arg = arg.toLowerCase();
      if (!THEMES.includes(arg)) return print("theme '" + esc(arg) + "' not found — try: green · amber · ice", "cli-err");
      setTheme(arg);
      print("phosphor set to " + arg, "cli-ok");
    },
    resume() {
      const a = document.querySelector('a[download]') || document.querySelector('a[href*="Resume.pdf"]');
      if (a) { a.click(); print("sending résumé …", "cli-ok"); }
      else print("résumé link not found — try the contact section.", "cli-err");
    },
    contact() { location.hash = "contact"; print("opening handshake …", "cli-ok"); },
    date() { print(esc(new Date().toLocaleString("en-GB", { timeZone: "Asia/Kolkata", hour12: false })) + " IST", "dim-line"); },
    hack() { print("nice try — running the trace locally…", "cli-warn"); dispatchEvent(new CustomEvent("portfolio:hack")); },
    sudo() {
      if (rooted) print("sudo: you are already root, operator.", "cli-ok");
      else print("sudo: permission denied — earn it first.", "cli-err");
    },
    clear() { out.innerHTML = ""; }
  };

  print("portfolio shell — type <span class=\"cli-ok\">help</span> to get started.", "dim-line");

  form.addEventListener("submit", e => {
    e.preventDefault();
    const raw = input.value.trim();
    print(PROMPT + " " + esc(raw), "cmd");
    input.value = "";
    if (!raw) return;
    hist.push(raw); hIdx = hist.length;
    const parts = raw.split(/\s+/);
    const fn = cmds[parts[0].toLowerCase()];
    if (fn) fn(parts.slice(1).join(" "));
    else print("command not found: " + esc(parts[0]) + " — try 'help'", "cli-err");
  });

  input.addEventListener("keydown", e => {
    if (e.key === "ArrowUp") {
      if (hIdx > 0) { hIdx--; input.value = hist[hIdx]; }
      e.preventDefault();
    } else if (e.key === "ArrowDown") {
      if (hIdx < hist.length - 1) { hIdx++; input.value = hist[hIdx]; }
      else { hIdx = hist.length; input.value = ""; }
      e.preventDefault();
    }
  });
  out.addEventListener("click", () => input.focus());

  /* ── konami → ACCESS GRANTED (earns sudo) ── */
  const gEl = $("#granted"), gLog = $("#granted-log");
  const seq = ["ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown", "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight", "b", "a"];
  const gLines = ["> validating sequence … [OK]", "> elevating privileges … [OK]", "> sudo: root granted — welcome back, operator."];
  let k = 0;
  function grant() {
    if (rooted || !gEl) return;
    rooted = true;
    if (document.activeElement === input) input.value = "";
    gLog.innerHTML = "";
    gEl.classList.add("on"); gEl.setAttribute("aria-hidden", "false");
    let i = 0;
    const step = () => {
      if (i < gLines.length) {
        const d = document.createElement("div"); d.textContent = gLines[i++];
        gLog.appendChild(d); setTimeout(step, 550);
      } else setTimeout(() => { gEl.classList.remove("on"); gEl.setAttribute("aria-hidden", "true"); }, 2200);
    };
    setTimeout(step, 400);
    gEl.addEventListener("click", () => { gEl.classList.remove("on"); gEl.setAttribute("aria-hidden", "true"); }, { once: true });
  }
  addEventListener("keydown", e => {
    const key = e.key.length === 1 ? e.key.toLowerCase() : e.key;
    k = (key === seq[k]) ? k + 1 : (key === seq[0] ? 1 : 0);
    if (k === seq.length) { k = 0; grant(); }
  });
})();
