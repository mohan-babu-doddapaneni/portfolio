import React, { useCallback, useEffect, useRef, useState } from "react";
import "./App.css";

// Self-hosted fonts — no third-party CDN requests (privacy + strict CSP).
import "@fontsource-variable/fraunces/full.css";
import "@fontsource-variable/fraunces/full-italic.css";
import "@fontsource-variable/instrument-sans/index.css";
import "@fontsource/jetbrains-mono/400.css";
import "@fontsource/jetbrains-mono/500.css";

import { FaGithub, FaLinkedinIn } from "react-icons/fa6";

/* ================================================================== */
/*  CONTENT                                                            */
/* ================================================================== */

const EMAIL = "mohanbabud25@gmail.com";
const PHONE_DISPLAY = "+1 (774) 701-0382";
const PHONE_HREF = "tel:+17747010382";
const LINKEDIN = "https://www.linkedin.com/in/mohan-babu-doddapaneni";
const GITHUB = "https://github.com/mohan-babu-doddapaneni";
const RESUME = `${process.env.PUBLIC_URL}/Mohan_Babu_Doddapaneni.pdf`;

const NAV = [
  { id: "work", label: "Work" },
  { id: "notes", label: "Field notes" },
  { id: "stack", label: "Stack" },
  { id: "projects", label: "Projects" },
  { id: "contact", label: "Contact" },
];

const TICKER = [
  "2.5M+ orders a month",
  "40+ enterprise retailers",
  "6M+ products indexed",
  "Sub-20 ms cache lookups",
  "12 platform modules",
  "Java 8 → 21",
  "Weekly releases, not quarterly",
  "1.4M-event holiday peak",
];

const STATS = [
  { value: 6, suffix: "+", label: "Years shipping production software" },
  { value: 40, suffix: "+", label: "Enterprise retailers on the platform" },
  { value: 2.5, suffix: "M", label: "Orders processed every month", decimals: 1 },
  { value: 12, suffix: "", label: "Platform modules I build across" },
];

const EXPERIENCE = [
  {
    company: "Fenix Commerce",
    role: "Product Development Engineer",
    period: "Jan 2026 — Present",
    location: "Worcester, MA",
    summary:
      "I own the multi-tenant Business Console on a Java, Spring Boot, Angular, Elasticsearch and AWS commerce platform serving 40+ retailers across 12 modules at 2.5M+ orders per month.",
    points: [
      "Rebuilt a six-year-old Angular console into a modular component architecture with a shared design system and lazy-loaded features. The team now ships console features weekly instead of quarterly.",
      "Defined a server-side pagination and filtering contract across Spring Boot and Elasticsearch, with virtual scrolling and lazy loading. Views over tens of millions of records now open in seconds inside a fixed memory budget.",
      "Traced wrong inventory numbers to an unset Elasticsearch trackTotalHits ceiling, then rebuilt the query path on heap-safe cursor traversal. Reporting is accurate again above 6M products.",
      "Root-caused a real-time ingestion outage during a 1.4M-event holiday surge to a JVM fast-throw optimization hiding the real exception. Hardened the parser and brought event flow back under peak load.",
      "Closed a data-exposure gap with a server-side cache keyed on SHA-256 composite hashes: sub-20 ms lookups, internal data walled off from tenant-facing surfaces.",
      "Modeled the permission and access-provisioning scheme in Spring Security, turning dozens of release-gated settings into a self-serve admin layer.",
      "Use Claude Code, GitHub Copilot and Cursor daily. Refactors that took days land the same day, and every AI-assisted change still clears human review, SonarQube gates and tests. I wrote the prompt and review patterns the team follows.",
    ],
    tags: ["Angular", "Spring Boot", "Elasticsearch", "GraphQL", "AWS ECS", "Multi-tenant"],
  },
  {
    company: "Adobe",
    role: "Full Stack Developer",
    period: "Sep 2024 — Jan 2026",
    location: "Massachusetts, USA",
    summary:
      "Built a cloud-native asset management and real-time collaboration platform inside Adobe Creative Cloud on Java, Spring Boot, React, Next.js, Kafka and AWS.",
    points: [
      "Led the design of a cloud-native asset management and collaboration platform for Creative Cloud: horizontal scaling, high availability, and integration with Adobe Sensei AI services.",
      "Broke a monolithic delivery path into Spring Boot microservices so teams could deploy independently, supporting 50% faster feature delivery across Photoshop and Illustrator.",
      "Shipped adaptive interfaces in React, Next.js and Tailwind. Engagement rose 10% and interface errors dropped 30%; tighter Redux state handling cut validation errors 25%.",
      "Built real-time alerting on WebSockets and Kafka so users stopped losing work to silent overwrites, and connected styluses and tablets through secure, event-driven APIs.",
      "Shipped AI-driven layout suggestions built from user history and asset metadata, speeding up design creation for new users by 30%.",
      "Cut query response times 18% by partitioning and indexing the PostgreSQL tables behind large asset searches, and secured assets and session data end to end with TLS and OAuth 2.0.",
    ],
    tags: ["Java", "Spring Boot", "React", "Next.js", "Kafka", "AWS", "PostgreSQL"],
  },
  {
    company: "Capgemini",
    role: "Associate Consultant, Full Stack",
    period: "Sep 2020 — Jul 2023",
    location: "Hyderabad, India",
    summary:
      "Built enterprise Java, Spring Boot and React applications for financial-services and product-engineering clients.",
    points: [
      "Built the microservices behind a financial application: accounts, transactions, customer profiles and fraud detection, with the isolation sensitive data requires.",
      "Rebuilt the backend on modular Spring Boot services with Hibernate, cutting API latency 50% and feature development time 40%.",
      "Cut reported security vulnerabilities 90% by hardening Spring Security: RBAC, token auth, method-level access control, CSRF protection and secure sessions.",
      "Migrated 18 Java projects to Maven in under 30 days and remediated log4j across the portfolio ahead of the client deadline.",
      "Delivered client dashboards in React over Node.js REST services, and replaced always-on batch jobs with AWS Lambda for event-driven processing, lifting uptime 20%.",
      "Cut post-deployment defects 30% with JUnit coverage and profiling, and stood up a Swagger API portal documenting every endpoint.",
    ],
    tags: ["Spring Boot", "React", "Node.js", "AWS", "Spring Security"],
  },
  {
    company: "Wipro",
    role: "Junior Full Stack Developer",
    period: "Jul 2019 — Aug 2020",
    location: "India",
    summary:
      "Built a KYC and AML compliance platform for a banking client on Angular, Spring Boot, Thymeleaf and PostgreSQL.",
    points: [
      "Built KYC onboarding in Angular Reactive Forms with dynamic validation, supporting 5,000+ customer profiles.",
      "Reshaped Spring Boot JSON responses around what analysts actually needed, cutting AML alert review time 30%.",
      "Configured Spring Security across four KYC modules and designed review screens that made flagging suspicious activity 25% faster.",
      "Wrote the PostgreSQL queries behind analyst comments, risk scores and audit trails across 10,000+ transaction records.",
    ],
    tags: ["Angular", "Spring Boot", "Spring Security", "PostgreSQL"],
  },
];

const NOTES = [
  {
    title: "The silent ceiling",
    symptom: "Large-catalog tenants saw inventory totals that were quietly wrong.",
    cause: "An unset trackTotalHits capped Elasticsearch aggregations at the engine default — every big tenant was reading a fraction of its data.",
    fix: "Rebuilt the query path on heap-safe cursor traversal that streams full result sets in constant memory.",
    result: "Accurate reporting above 6M products",
  },
  {
    title: "The missing stack trace",
    symptom: "Real-time ingestion stalled in the middle of a 1.4M-event holiday surge.",
    cause: "The JVM's fast-throw optimization was stripping stack traces from an unguarded parsing exception, hiding the real failure while retries piled up.",
    fix: "Hardened the parser, added failure logging that survives the optimization, and drained the backlog.",
    result: "Event flow restored under peak load",
  },
  {
    title: "The leak in the inbox",
    symptom: "Internal data was surfacing in merchant panels and customer emails.",
    cause: "A third-party API limitation pushed internal fields onto tenant-facing surfaces.",
    fix: "A server-side cache keyed on SHA-256 composite hashes walls internal data off at the boundary.",
    result: "Sub-20 ms lookups, no added latency",
  },
  {
    title: "The table that ate the browser",
    symptom: "Big tenants' console screens froze or crashed outright.",
    cause: "The console pulled whole tables into the browser and filtered them client-side.",
    fix: "A server-side pagination and filtering contract across Spring Boot and Elasticsearch, plus virtual scrolling.",
    result: "Tens of millions of rows, open in seconds",
  },
];

const STACK = [
  { title: "Backend", items: ["Java 8 / 17 / 21", "Spring Boot", "Spring Data JPA", "Hibernate", "REST & GraphQL", "Node.js / Express", "Python"] },
  { title: "Frontend", items: ["Angular", "React", "Next.js", "TypeScript", "Redux", "Tailwind CSS", "Material UI"] },
  { title: "Data", items: ["PostgreSQL", "MySQL", "Elasticsearch", "MongoDB", "DynamoDB", "Redis", "Apache Kafka"] },
  { title: "Cloud & delivery", items: ["AWS (ECS, Lambda, EC2)", "Docker", "Kubernetes", "Terraform", "Jenkins", "Git"] },
  { title: "Security & quality", items: ["Spring Security", "OAuth 2.0 / JWT", "OWASP & CVE remediation", "SonarQube", "JUnit / Jest", "Cypress"] },
  { title: "AI-assisted", items: ["Claude Code", "GitHub Copilot", "Cursor", "OpenAI Codex", "AI code review"] },
];

const PROJECTS = [
  {
    title: "Career Path Recommendation System",
    description:
      "Parses résumés with NLP, predicts likely career paths and names the skill gaps in the way, then serves the results over REST. Python and Django over PostgreSQL.",
    tags: ["Python", "Django", "NLP", "PostgreSQL"],
    href: GITHUB,
  },
  {
    title: "Restaurant Ordering Portal",
    description:
      "A normalized schema for menus, modifiers and orders, with transactional placement so a dropped or duplicated request never leaves half an order behind. Processed 300+ real orders.",
    tags: ["Java", "Angular", "MySQL", "Transactions"],
    href: GITHUB,
  },
];

const EDUCATION = [
  { degree: "M.S. Computer Science", school: "Clark University", place: "Worcester, MA" },
  { degree: "B.Tech. Electronics & Communication", school: "JNTU Ananthapur", place: "Andhra Pradesh, India" },
];

const CERTIFICATIONS = [
  "AWS Cloud Essentials",
  "Microsoft Azure Fundamentals (AZ-900)",
  "Java Cloud Native Developer, L1 & L2",
  "Python Automation Practitioner",
];

/* ================================================================== */
/*  HELPERS                                                            */
/* ================================================================== */

const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const safeStorage = {
  get(key) {
    try {
      return window.localStorage.getItem(key);
    } catch {
      return null;
    }
  },
  set(key, value) {
    try {
      window.localStorage.setItem(key, value);
    } catch {
      /* storage unavailable (private mode etc.) — ignore */
    }
  },
};

function initialTheme() {
  const saved = safeStorage.get("theme");
  if (saved === "light" || saved === "dark") return saved;
  if (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) return "dark";
  return "light";
}

/** Adds `.is-in` to every [data-reveal] element once it scrolls into view. */
function useReveal() {
  useEffect(() => {
    const els = Array.from(document.querySelectorAll("[data-reveal]"));
    if (!("IntersectionObserver" in window) || prefersReducedMotion()) {
      els.forEach((el) => el.classList.add("is-in"));
      return undefined;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-in");
            io.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.12 }
    );
    els.forEach((el) => io.observe(el));

    // Safety net: anything already above the fold line (anchor jumps, fast
    // flings, momentum scrolling on iOS) is revealed even if IO missed it.
    let raf = 0;
    const sweep = () => {
      raf = 0;
      const limit = window.innerHeight * 0.92;
      els.forEach((el) => {
        if (!el.classList.contains("is-in") && el.getBoundingClientRect().top < limit) {
          el.classList.add("is-in");
          io.unobserve(el);
        }
      });
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(sweep);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("hashchange", onScroll);
    return () => {
      io.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("hashchange", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);
}

/** Buttons/links with [data-magnetic] lean slightly toward the pointer. */
function useMagnetic() {
  useEffect(() => {
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches || prefersReducedMotion()) {
      return undefined;
    }
    const els = Array.from(document.querySelectorAll("[data-magnetic]"));
    const cleanups = els.map((el) => {
      const move = (e) => {
        const r = el.getBoundingClientRect();
        const x = (e.clientX - (r.left + r.width / 2)) * 0.22;
        const y = (e.clientY - (r.top + r.height / 2)) * 0.32;
        el.style.transform = `translate(${x.toFixed(1)}px, ${y.toFixed(1)}px)`;
      };
      const leave = () => {
        el.style.transform = "";
      };
      el.addEventListener("pointermove", move);
      el.addEventListener("pointerleave", leave);
      return () => {
        el.removeEventListener("pointermove", move);
        el.removeEventListener("pointerleave", leave);
      };
    });
    return () => cleanups.forEach((fn) => fn());
  }, []);
}

/** Local time in Worcester, MA — a small human detail in the nav and footer. */
function useLocalTime() {
  const format = () =>
    new Intl.DateTimeFormat("en-US", {
      hour: "numeric",
      minute: "2-digit",
      timeZone: "America/New_York",
    }).format(new Date());
  const [time, setTime] = useState(format);
  useEffect(() => {
    const id = setInterval(() => setTime(format()), 20000);
    return () => clearInterval(id);
  }, []);
  return time;
}

function useActiveSection(ids) {
  const [active, setActive] = useState("");
  useEffect(() => {
    if (!("IntersectionObserver" in window)) return undefined;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, [ids]);
  return active;
}

function CountUp({ end, suffix = "", decimals = 0, duration = 1600 }) {
  const ref = useRef(null);
  // Start at the final value: correct for no-JS crawlers, reduced motion, and
  // anyone who flings past the section before it could animate.
  const [value, setValue] = useState(end);
  useEffect(() => {
    const node = ref.current;
    if (!node || !("IntersectionObserver" in window) || prefersReducedMotion()) return undefined;
    if (node.getBoundingClientRect().top < window.innerHeight) return undefined; // already on screen
    setValue(0);
    let raf;
    let started = false;
    const finish = () => {
      started = true;
      setValue(end);
    };
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || started) return;
        started = true;
        io.disconnect();
        const start = performance.now();
        const tick = (now) => {
          const p = Math.min((now - start) / duration, 1);
          setValue(end * (1 - Math.pow(1 - p, 4)));
          if (p < 1) raf = requestAnimationFrame(tick);
        };
        raf = requestAnimationFrame(tick);
      },
      { threshold: 0, rootMargin: "0px 0px -12% 0px" }
    );
    io.observe(node);
    const onScroll = () => {
      if (!started && node.getBoundingClientRect().bottom < window.innerHeight * 0.88) {
        io.disconnect();
        finish();
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      io.disconnect();
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, [end, duration]);
  return (
    <span ref={ref} className="tabular">
      {decimals ? value.toFixed(decimals) : Math.round(value)}
      {suffix}
    </span>
  );
}

const Arrow = ({ className = "" }) => (
  <svg className={`arrow ${className}`} viewBox="0 0 24 24" aria-hidden="true" focusable="false">
    <path d="M6 18 18 6M8 6h10v10" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="square" />
  </svg>
);

function SectionHead({ index, label, title, children }) {
  return (
    <div className="section-head">
      <div className="section-rule" data-reveal>
        <span className="mono">§ {index}</span>
        <span className="mono">{label}</span>
      </div>
      <h2 className="section-title" data-reveal>
        {title}
      </h2>
      {children}
    </div>
  );
}

/* ================================================================== */
/*  APP                                                                */
/* ================================================================== */

export default function App() {
  const [theme, setTheme] = useState(initialTheme);
  const [menuOpen, setMenuOpen] = useState(false);
  const [openJob, setOpenJob] = useState(0);
  const [copied, setCopied] = useState(false);
  const [showTop, setShowTop] = useState(false);
  const menuBtnRef = useRef(null);
  const menuRef = useRef(null);
  const progressRef = useRef(null);

  const time = useLocalTime();
  const active = useActiveSection(NAV.map((n) => n.id));
  useReveal();
  useMagnetic();

  // Apply theme to <html> so CSS variables cascade everywhere.
  useEffect(() => {
    const root = document.documentElement;
    root.dataset.theme = theme;
    root.style.colorScheme = theme;
    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute("content", theme === "dark" ? "#141210" : "#efe9de");
  }, [theme]);

  const toggleTheme = (e) => {
    const next = theme === "dark" ? "light" : "dark";
    safeStorage.set("theme", next);
    if (!document.startViewTransition || prefersReducedMotion()) {
      setTheme(next);
      return;
    }
    // Circular "ink spill" reveal from the toggle button.
    const r = e.currentTarget.getBoundingClientRect();
    const x = r.left + r.width / 2;
    const y = r.top + r.height / 2;
    const radius = Math.hypot(Math.max(x, window.innerWidth - x), Math.max(y, window.innerHeight - y));
    const vt = document.startViewTransition(() => {
      // flushSync-free: set the attribute directly so the snapshot is correct.
      document.documentElement.dataset.theme = next;
      setTheme(next);
    });
    vt.ready
      .then(() => {
        document.documentElement.animate(
          { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${radius}px at ${x}px ${y}px)`] },
          { duration: 650, easing: "cubic-bezier(.7,0,.2,1)", pseudoElement: "::view-transition-new(root)" }
        );
      })
      .catch(() => {});
  };

  // Scroll progress + back-to-top, written straight to the DOM (no re-render per frame).
  useEffect(() => {
    let ticking = false;
    const update = () => {
      ticking = false;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const p = max > 0 ? window.scrollY / max : 0;
      if (progressRef.current) progressRef.current.style.transform = `scaleX(${p})`;
      setShowTop(window.scrollY > 900);
    };
    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  // Mobile menu: lock scroll, close on Escape, move focus in and back out.
  const closeMenu = useCallback((returnFocus = false) => {
    setMenuOpen(false);
    if (returnFocus && menuBtnRef.current) menuBtnRef.current.focus();
  }, []);

  useEffect(() => {
    document.body.classList.toggle("menu-open", menuOpen);
    if (!menuOpen) return undefined;
    const first = menuRef.current && menuRef.current.querySelector("a");
    if (first) first.focus({ preventScroll: true });
    const onKey = (e) => {
      if (e.key === "Escape") closeMenu(true);
      if (e.key === "Tab" && menuRef.current) {
        const focusables = [menuBtnRef.current, ...menuRef.current.querySelectorAll("a")];
        const idx = focusables.indexOf(document.activeElement);
        if (e.shiftKey && idx <= 0) {
          e.preventDefault();
          focusables[focusables.length - 1].focus();
        } else if (!e.shiftKey && idx === focusables.length - 1) {
          e.preventDefault();
          focusables[0].focus();
        }
      }
    };
    const onResize = () => window.innerWidth > 900 && closeMenu();
    window.addEventListener("keydown", onKey);
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("resize", onResize);
    };
  }, [menuOpen, closeMenu]);

  const copyEmail = async () => {
    let ok = false;
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(EMAIL);
        ok = true;
      }
    } catch {
      ok = false;
    }
    if (!ok) {
      // Fallback for older browsers / non-secure contexts.
      const ta = document.createElement("textarea");
      ta.value = EMAIL;
      ta.setAttribute("readonly", "");
      ta.style.position = "fixed";
      ta.style.opacity = "0";
      document.body.appendChild(ta);
      ta.select();
      try {
        ok = document.execCommand("copy");
      } catch {
        ok = false;
      }
      document.body.removeChild(ta);
    }
    if (ok) {
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2200);
    } else {
      window.location.href = `mailto:${EMAIL}`;
    }
  };

  const year = new Date().getFullYear();

  return (
    <>
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <div className="grain" aria-hidden="true" />
      <div className="progress" ref={progressRef} aria-hidden="true" />

      {/* ------------------------------------------------ NAV */}
      <header className={`nav ${menuOpen ? "nav--open" : ""}`}>
        <div className="nav__inner">
          <a href="#top" className="wordmark" onClick={() => closeMenu()} aria-label="Mohan Babu D. — back to top">
            <span className="wordmark__mark" aria-hidden="true" />
            <span className="wordmark__text">
              Mohan Babu<span className="wordmark__dim"> D.</span>
            </span>
          </a>

          <nav className="nav__links" aria-label="Primary">
            {NAV.map((n, i) => (
              <a key={n.id} href={`#${n.id}`} className={active === n.id ? "is-active" : ""} aria-current={active === n.id ? "true" : undefined}>
                <span className="mono nav__num">0{i + 1}</span>
                {n.label}
              </a>
            ))}
          </nav>

          <div className="nav__tools">
            <span className="nav__clock mono" title="My local time">
              Worcester, MA · {time}
            </span>
            <button
              type="button"
              className="theme-btn"
              onClick={toggleTheme}
              aria-label={theme === "dark" ? "Switch to light theme" : "Switch to dark theme"}
            >
              <span className="theme-btn__disc" aria-hidden="true" />
            </button>
            <button
              type="button"
              ref={menuBtnRef}
              className="menu-btn"
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              onClick={() => setMenuOpen((v) => !v)}
            >
              <span className="sr-only">{menuOpen ? "Close menu" : "Open menu"}</span>
              <span className="menu-btn__label mono" aria-hidden="true">
                {menuOpen ? "Close" : "Menu"}
              </span>
            </button>
          </div>
        </div>
      </header>

      <div id="mobile-menu" className={`sheet ${menuOpen ? "is-open" : ""}`} ref={menuRef} aria-hidden={!menuOpen} inert={!menuOpen}>
        <nav aria-label="Mobile">
          <ol>
            {NAV.map((n, i) => (
              <li key={n.id} style={{ "--i": i }}>
                <a href={`#${n.id}`} onClick={() => closeMenu()}>
                  <span className="mono">0{i + 1}</span>
                  {n.label}
                </a>
              </li>
            ))}
          </ol>
        </nav>
        <div className="sheet__foot mono">
          <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
          <a href={PHONE_HREF}>{PHONE_DISPLAY}</a>
        </div>
      </div>

      <main id="main">
        {/* ------------------------------------------------ HERO */}
        <section id="top" className="hero" aria-labelledby="hero-name">
          <div className="wrap">
            <div className="hero__meta mono">
              <span className="load load--1">Full-stack engineer · Worcester, MA</span>
              <span className="load load--2 status">
                <span className="status__dot" aria-hidden="true" />
                Open to senior full-stack &amp; backend roles
              </span>
            </div>

            <h1 id="hero-name" className="hero__name">
              <span className="line">
                <span className="line__in">Mohan Babu</span>
              </span>
              <span className="line">
                <span className="line__in">
                  <em>Doddapaneni</em>
                </span>
              </span>
            </h1>

            <div className="hero__grid">
              <p className="hero__lede load load--3">
                I build full-stack products in Java, Spring Boot, Angular and React — six years of keeping multi-tenant
                platforms fast, correct and reliable at scale.
              </p>

              <div className="hero__side load load--4">
                <dl className="facts">
                  <div>
                    <dt className="mono">Currently</dt>
                    <dd>Product Development Engineer, Fenix Commerce</dd>
                  </div>
                  <div>
                    <dt className="mono">Before</dt>
                    <dd>Adobe · Capgemini · Wipro</dd>
                  </div>
                  <div>
                    <dt className="mono">Based in</dt>
                    <dd>Worcester, Massachusetts</dd>
                  </div>
                </dl>
                <div className="hero__cta">
                  <a href="#work" className="btn btn--solid" data-magnetic>
                    See the work
                    <span aria-hidden="true" className="btn__down">↓</span>
                  </a>
                  <a href={RESUME} className="btn btn--line" download="Mohan_Babu_Doddapaneni.pdf" data-magnetic>
                    Résumé <span className="mono btn__small">PDF</span>
                  </a>
                </div>
              </div>

              <figure className="portrait load load--5">
                <div className="portrait__frame">
                  <img
                    src={`${process.env.PUBLIC_URL}/assets/portrait.webp`}
                    srcSet={`${process.env.PUBLIC_URL}/assets/portrait-sm.webp 320w, ${process.env.PUBLIC_URL}/assets/portrait.webp 640w`}
                    sizes="(max-width: 900px) 40vw, 230px"
                    width="640"
                    height="800"
                    alt="Portrait of Mohan Babu Doddapaneni"
                    decoding="async"
                    fetchPriority="high"
                  />
                </div>
              </figure>
            </div>
          </div>

          <div className="ticker" aria-hidden="true">
            <div className="ticker__track">
              {[0, 1].map((k) => (
                <span className="ticker__group" key={k}>
                  {TICKER.map((t) => (
                    <span className="ticker__item" key={t}>
                      {t}
                      <span className="ticker__sep">✳</span>
                    </span>
                  ))}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* ------------------------------------------------ PROFILE */}
        <section id="profile" className="section" aria-labelledby="profile-title">
          <div className="wrap">
            <div className="section-rule" data-reveal>
              <span className="mono">§ 01</span>
              <span className="mono">Profile</span>
            </div>
            <div className="profile">
              <h2 className="pull" data-reveal id="profile-title">
                I do my best work on the problems <em>dashboards don’t show</em>: data that is quietly wrong, screens
                that slow down as tenants grow, and failures that hide their real cause.
              </h2>
              <div className="profile__body" data-reveal>
                <p>
                  I ship production systems on Java (8 to 21), Spring Boot microservices, Angular and React. Today I own
                  the admin and data-access layer of a multi-tenant SaaS commerce platform serving 40+ enterprise
                  retailers, from the data model through REST and GraphQL APIs to the screens on top.
                </p>
                <p>
                  I focus on the work that keeps a platform trustworthy: pagination and caching
                  contracts that hold at tens of millions of records, tenant isolation enforced in one place, and data
                  bugs that are easy to miss. I use AI coding tools every day, and every change still goes through
                  code review, SonarQube and tests.
                </p>
              </div>
            </div>

            <ul className="ledger" aria-label="At a glance">
              {STATS.map((s, i) => (
                <li key={s.label} data-reveal style={{ "--i": i }}>
                  <span className="ledger__value">
                    <CountUp end={s.value} suffix={s.suffix} decimals={s.decimals || 0} />
                  </span>
                  <span className="ledger__label">{s.label}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* ------------------------------------------------ WORK */}
        <section id="work" className="section" aria-labelledby="work-title">
          <div className="wrap">
            <SectionHead index="02" label="2019 — Present" title={<span id="work-title">Experience</span>} />

            <ol className="jobs">
              {EXPERIENCE.map((job, i) => {
                const open = openJob === i;
                return (
                  <li key={job.company} className={`job ${open ? "is-open" : ""}`} data-reveal style={{ "--i": i }}>
                    <h3 className="job__h">
                      <button
                        type="button"
                        className="job__head"
                        aria-expanded={open}
                        aria-controls={`job-${i}`}
                        id={`job-btn-${i}`}
                        onClick={() => setOpenJob(open ? -1 : i)}
                      >
                        <span className="job__period mono">{job.period}</span>
                        <span className="job__company">{job.company}</span>
                        <span className="job__role">{job.role}</span>
                        <span className="job__loc mono">{job.location}</span>
                        <span className="job__toggle" aria-hidden="true" />
                      </button>
                    </h3>
                    <div className="job__panel" id={`job-${i}`} role="region" aria-labelledby={`job-btn-${i}`}>
                      <div className="job__inner">
                        <div className="job__content" inert={!open}>
                          <p className="job__summary">{job.summary}</p>
                          <ul className="job__points">
                            {job.points.map((p) => (
                              <li key={p.slice(0, 40)}>{p}</li>
                            ))}
                          </ul>
                          <ul className="tags" aria-label="Technologies">
                            {job.tags.map((t) => (
                              <li key={t}>{t}</li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ol>
          </div>
        </section>

        {/* ------------------------------------------------ FIELD NOTES */}
        <section id="notes" className="section section--ink" aria-labelledby="notes-title">
          <div className="wrap">
            <SectionHead index="03" label="Field notes" title={<span id="notes-title">Notes from production</span>}>
              <p className="section-sub" data-reveal>
                Four real incidents, written up the way I’d write a post-mortem. The fix is rarely the hard part —
                finding the cause is.
              </p>
            </SectionHead>

            <div className="notes">
              {NOTES.map((n, i) => (
                <article className="note" key={n.title} data-reveal style={{ "--i": i }}>
                  <header className="note__head">
                    <span className="mono">No. {String(i + 1).padStart(2, "0")}</span>
                    <h3>{n.title}</h3>
                  </header>
                  <dl className="note__body">
                    <div>
                      <dt className="mono">Symptom</dt>
                      <dd>{n.symptom}</dd>
                    </div>
                    <div>
                      <dt className="mono">Cause</dt>
                      <dd>{n.cause}</dd>
                    </div>
                    <div>
                      <dt className="mono">Fix</dt>
                      <dd>{n.fix}</dd>
                    </div>
                  </dl>
                  <p className="note__result">
                    <span className="mono">Result →</span> {n.result}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ------------------------------------------------ STACK */}
        <section id="stack" className="section" aria-labelledby="stack-title">
          <div className="wrap">
            <SectionHead index="04" label="Technical skills" title={<span id="stack-title">Skills &amp; tools</span>} />
            <div className="stack">
              {STACK.map((g, i) => (
                <div className="stack__col" key={g.title} data-reveal style={{ "--i": i }}>
                  <h3 className="mono">
                    {g.title}
                    <span className="stack__count">{String(g.items.length).padStart(2, "0")}</span>
                  </h3>
                  <ul>
                    {g.items.map((it) => (
                      <li key={it}>{it}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            <p className="aside" data-reveal>
              <span className="mono">On AI tools —</span> I use Claude Code, GitHub Copilot and Cursor daily for
              scaffolding, migrations and reading unfamiliar code. Every AI-assisted change still goes through code review,
              SonarQube quality gates and tests before it merges.
            </p>
          </div>
        </section>

        {/* ------------------------------------------------ PROJECTS */}
        <section id="projects" className="section" aria-labelledby="projects-title">
          <div className="wrap">
            <SectionHead index="05" label="Selected projects" title={<span id="projects-title">Projects</span>} />
            <ul className="projects">
              {PROJECTS.map((p, i) => (
                <li key={p.title} data-reveal style={{ "--i": i }}>
                  <a className="project" href={p.href} target="_blank" rel="noopener noreferrer">
                    <span className="project__num mono">0{i + 1}</span>
                    <span className="project__main">
                      <span className="project__title">{p.title}</span>
                      <span className="project__desc">{p.description}</span>
                      <span className="tags tags--inline" aria-hidden="true">
                        {p.tags.map((t) => (
                          <span key={t}>{t}</span>
                        ))}
                      </span>
                    </span>
                    <span className="project__meta mono">
                      <span className="project__go">
                        GitHub profile <Arrow />
                      </span>
                    </span>
                    <span className="sr-only"> (opens in a new tab)</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* ------------------------------------------------ EDUCATION */}
        <section id="education" className="section" aria-labelledby="edu-title">
          <div className="wrap">
            <SectionHead index="06" label="Education & certifications" title={<span id="edu-title">Education</span>} />
            <div className="edu">
              <ul className="edu__list">
                {EDUCATION.map((e, i) => (
                  <li key={e.degree} data-reveal style={{ "--i": i }}>
                    <span className="edu__degree">{e.degree}</span>
                    <span className="edu__school">{e.school}</span>
                    <span className="mono edu__place">{e.place}</span>
                  </li>
                ))}
              </ul>
              <div className="certs" data-reveal>
                <h3 className="mono">Certifications</h3>
                <ul>
                  {CERTIFICATIONS.map((c) => (
                    <li key={c}>{c}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* ------------------------------------------------ CONTACT */}
        <section id="contact" className="contact" aria-labelledby="contact-title">
          <div className="wrap">
            <div className="section-rule section-rule--light" data-reveal>
              <span className="mono">§ 07</span>
              <span className="mono">Contact</span>
            </div>
            <h2 id="contact-title" className="contact__title" data-reveal>
              Let’s build something that <em>lasts.</em>
            </h2>
            <p className="contact__lede" data-reveal>
              I’m looking for senior full-stack and backend roles where the systems are big and the details matter. The
              fastest way to reach me is email.
            </p>

            <div className="contact__email" data-reveal>
              <a href={`mailto:${EMAIL}`} className="email-link">
                {EMAIL}
              </a>
              <button type="button" className="copy-btn mono" onClick={copyEmail} data-magnetic>
                {copied ? "Copied ✓" : "Copy"}
              </button>
              <span className="sr-only" role="status" aria-live="polite">
                {copied ? "Email address copied to clipboard" : ""}
              </span>
            </div>

            <ul className="contact__list" data-reveal>
              <li>
                <span className="mono">Phone</span>
                <a href={PHONE_HREF}>{PHONE_DISPLAY}</a>
              </li>
              <li>
                <span className="mono">LinkedIn</span>
                <a href={LINKEDIN} target="_blank" rel="noopener noreferrer">
                  <FaLinkedinIn aria-hidden="true" /> mohan-babu-doddapaneni
                  <span className="sr-only"> (opens in a new tab)</span>
                </a>
              </li>
              <li>
                <span className="mono">GitHub</span>
                <a href={GITHUB} target="_blank" rel="noopener noreferrer">
                  <FaGithub aria-hidden="true" /> mohan-babu-doddapaneni
                  <span className="sr-only"> (opens in a new tab)</span>
                </a>
              </li>
              <li>
                <span className="mono">Résumé</span>
                <a href={RESUME} download="Mohan_Babu_Doddapaneni.pdf">
                  Download PDF
                </a>
              </li>
            </ul>
          </div>

          <footer className="footer wrap">
            <span className="mono">© {year} Mohan Babu Doddapaneni</span>
                        <span className="mono">Worcester, MA · {time}</span>
          </footer>
        </section>
        <a href="#top" className={`to-top ${showTop ? "is-shown" : ""}`} aria-label="Back to top" tabIndex={showTop ? 0 : -1}>
        <span aria-hidden="true">↑</span>
      </a>
      </main>


    </>
  );
}
