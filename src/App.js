import React, { useState, useEffect, useRef, useCallback } from "react";
import "./App.css";

// Self-hosted fonts (no external CDN, better privacy & security)
import "@fontsource/inter/300.css";
import "@fontsource/inter/400.css";
import "@fontsource/inter/500.css";
import "@fontsource/inter/600.css";
import "@fontsource/inter/700.css";
import "@fontsource/sora/600.css";
import "@fontsource/sora/700.css";
import "@fontsource/sora/800.css";

// Bundled, crisp SVG icons (no runtime network requests)
import {
  SiSpringboot, SiReact, SiAngular, SiTypescript, SiJavascript, SiNodedotjs,
  SiDocker, SiKubernetes, SiPostgresql, SiMysql, SiMongodb, SiRedis,
  SiApachekafka, SiGraphql, SiNextdotjs, SiTailwindcss, SiRedux, SiGit,
  SiTerraform, SiJenkins, SiSpringsecurity, SiJsonwebtokens, SiJest, SiCypress,
  SiPython, SiVuedotjs, SiHibernate, SiMui, SiExpress, SiElasticsearch,
  SiClaude, SiOpenai,
} from "react-icons/si";
import {
  FaJava, FaAws, FaEnvelope, FaPhone, FaLinkedin, FaGithub, FaArrowUp,
  FaDownload, FaLocationDot, FaBriefcase, FaCode, FaPalette, FaGears,
  FaDatabase, FaCloud, FaShieldHalved, FaServer,
  FaGraduationCap, FaAward, FaCircleCheck, FaArrowUpRightFromSquare,
  FaSun, FaMoon, FaRobot, FaWandMagicSparkles, FaMagnifyingGlass,
} from "react-icons/fa6";

/* ------------------------------------------------------------------ */
/*  DATA                                                               */
/* ------------------------------------------------------------------ */

const ROLES = [
  "Full Stack Developer",
  "Java & Spring Boot Engineer",
  "Angular & React Developer",
  "AI-Assisted Development",
];

const NAV_LINKS = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "experience", label: "Experience" },
  { id: "education", label: "Education" },
  { id: "projects", label: "Projects" },
  { id: "contact", label: "Contact" },
];

const STATS = [
  { value: 6, suffix: "+", label: "Years Experience" },
  { value: 40, suffix: "+", label: "Enterprise Retailers" },
  { value: 2.5, suffix: "M+", label: "Orders / Month", decimals: 1 },
  { value: 12, suffix: "", label: "Platform Modules" },
];

// Brand-colored tech icons for the marquee
const TECH = [
  { Icon: FaJava, name: "Java", color: "#f89820" },
  { Icon: SiSpringboot, name: "Spring Boot", color: "#6db33f" },
  { Icon: SiReact, name: "React", color: "#61dafb" },
  { Icon: SiAngular, name: "Angular", color: "#dd0031" },
  { Icon: SiTypescript, name: "TypeScript", color: "#3178c6" },
  { Icon: SiNextdotjs, name: "Next.js", color: "var(--icon-adaptive)" },
  { Icon: FaAws, name: "AWS", color: "#ff9900" },
  { Icon: SiDocker, name: "Docker", color: "#2496ed" },
  { Icon: SiKubernetes, name: "Kubernetes", color: "#326ce5" },
  { Icon: SiApachekafka, name: "Kafka", color: "var(--icon-adaptive)" },
  { Icon: SiPostgresql, name: "PostgreSQL", color: "#4169e1" },
  { Icon: SiMongodb, name: "MongoDB", color: "#47a248" },
  { Icon: SiGit, name: "Git", color: "#f05032" },
  { Icon: SiTerraform, name: "Terraform", color: "#7b42bc" },
];

const SKILLS = [
  {
    Icon: FaPalette,
    title: "Frontend",
    items: [
      { Icon: SiReact, label: "React", color: "#61dafb" },
      { Icon: SiRedux, label: "Redux", color: "#764abc" },
      { Icon: SiAngular, label: "Angular", color: "#dd0031" },
      { Icon: SiVuedotjs, label: "Vue.js", color: "#42b883" },
      { Icon: SiTypescript, label: "TypeScript", color: "#3178c6" },
      { Icon: SiJavascript, label: "JavaScript", color: "#f7df1e" },
      { Icon: SiNextdotjs, label: "Next.js", color: "var(--icon-adaptive)" },
      { Icon: SiTailwindcss, label: "Tailwind", color: "#38bdf8" },
      { Icon: SiMui, label: "Material-UI", color: "#007fff" },
    ],
  },
  {
    Icon: FaGears,
    title: "Backend",
    items: [
      { Icon: FaJava, label: "Java (8 / 17 / 21)", color: "#f89820" },
      { Icon: SiSpringboot, label: "Spring Boot", color: "#6db33f" },
      { Icon: SiHibernate, label: "Spring Data JPA", color: "#59666c" },
      { Icon: SiGraphql, label: "GraphQL", color: "#e10098" },
      { Icon: FaCode, label: "REST APIs", color: "#a78bfa" },
      { Icon: SiNodedotjs, label: "Node.js", color: "#5fa04e" },
      { Icon: SiExpress, label: "Express", color: "var(--icon-adaptive)" },
      { Icon: SiPython, label: "Python", color: "#3776ab" },
    ],
  },
  {
    Icon: FaDatabase,
    title: "Databases",
    items: [
      { Icon: SiPostgresql, label: "PostgreSQL", color: "#4169e1" },
      { Icon: SiMysql, label: "MySQL", color: "#4479a1" },
      { Icon: SiMongodb, label: "MongoDB", color: "#47a248" },
      { Icon: FaAws, label: "DynamoDB", color: "#4053d6" },
      { Icon: SiRedis, label: "Redis", color: "#ff4438" },
      { Icon: SiElasticsearch, label: "Elasticsearch", color: "#43c5a6" },
    ],
  },
  {
    Icon: FaCloud,
    title: "Cloud & DevOps",
    items: [
      { Icon: FaAws, label: "AWS", color: "#ff9900" },
      { Icon: SiDocker, label: "Docker", color: "#2496ed" },
      { Icon: SiKubernetes, label: "Kubernetes", color: "#326ce5" },
      { Icon: SiJenkins, label: "Jenkins", color: "#d33833" },
      { Icon: SiTerraform, label: "Terraform", color: "#7b42bc" },
      { Icon: SiGit, label: "Git", color: "#f05032" },
    ],
  },
  {
    Icon: FaRobot,
    title: "AI-Assisted Development",
    items: [
      { Icon: SiClaude, label: "Claude Code", color: "#d97757" },
      { Icon: FaGithub, label: "GitHub Copilot", color: "var(--icon-adaptive)" },
      { Icon: FaWandMagicSparkles, label: "Cursor", color: "#a78bfa" },
      { Icon: SiOpenai, label: "OpenAI Codex", color: "var(--icon-adaptive)" },
      { Icon: FaMagnifyingGlass, label: "AI Code Review", color: "#38bdf8" },
    ],
  },
  {
    Icon: FaShieldHalved,
    title: "Security & Quality",
    items: [
      { Icon: SiSpringsecurity, label: "Spring Security", color: "#6db33f" },
      { Icon: SiJsonwebtokens, label: "OAuth2 / JWT", color: "#d63aff" },
      { Icon: FaShieldHalved, label: "OWASP / CVE", color: "#f59e0b" },
      { Icon: FaCircleCheck, label: "SonarQube", color: "#4e9bcd" },
      { Icon: SiJest, label: "Jest / JUnit", color: "#c21325" },
      { Icon: SiCypress, label: "Cypress", color: "#69d3a7" },
    ],
  },
];

const EXPERIENCE = [
  {
    company: "Fenix Commerce",
    role: "Product Development Engineer",
    period: "Jan 2026 - Present",
    location: "Worcester, MA",
    summary:
      "I own the multi-tenant Business Console on a Java, Spring Boot, Angular, Elasticsearch, and AWS commerce platform serving 40+ retailers across 12 modules at 2.5M+ orders per month.",
    points: [
      "Own the Business Console, the surface every retailer and internal team works in across 12 modules. Rebuilt a six-year-old Angular app into a modular component architecture with a shared design system and lazy-loaded features, and the team now ships console features weekly instead of quarterly.",
      "Fixed large-tenant screens that were unusable because the console pulled full tables into the browser. Defined a server-side pagination and filtering contract across Spring Boot and Elasticsearch with virtual scrolling and lazy loading, so views over tens of millions of records now open in seconds inside a fixed memory budget.",
      "Traced wrong inventory numbers to an unset Elasticsearch trackTotalHits ceiling that silently capped aggregations at the engine default, leaving every large-catalog tenant reading a fraction of its data. Rebuilt the query path on heap-safe cursor traversal that streams full result sets in constant memory, restoring accurate reporting above 6M products.",
      "Root-caused a real-time ingestion outage during a 1.4M-event holiday surge, where a JVM fast-throw optimization was stripping stack traces from an unguarded parsing exception and hiding the real failure while retries piled up. Hardened the parser, added failure logging, and brought event flow back under peak load.",
      "Closed a data-exposure gap where a third-party API limitation pushed internal data into merchant panels and customer emails. Built a server-side cache keyed on SHA-256 composite hashes with sub-20ms lookups, walling internal data off from tenant-facing surfaces with no measurable added latency.",
      "Modeled the permission and access-provisioning scheme enforced centrally in Spring Security, turning dozens of settings that used to need a backend release into a self-serve admin layer.",
      "Use Claude Code, GitHub Copilot, and Cursor daily to scaffold Spring Boot services and JUnit suites, migrate legacy Angular components, and read unfamiliar stack traces. Refactors that took days now land the same day, and every AI-assisted change still clears human review, SonarQube gates, and tests before merge. I wrote the prompt and review patterns the team follows.",
    ],
    tags: ["Angular", "Spring Boot", "Elasticsearch", "GraphQL", "AWS ECS", "AI Tools", "Multi-Tenant"],
  },
  {
    company: "Adobe Inc.",
    role: "Full Stack Developer",
    period: "Sept 2024 - Jan 2026",
    location: "MA, USA",
    summary:
      "Built a cloud-native asset management and real-time collaboration platform inside Adobe Creative Cloud on Java, Spring Boot, React, Next.js, Kafka, and AWS.",
    points: [
      "Led the design of a cloud-native asset management and collaboration platform for Creative Cloud, covering horizontal scaling, high availability, and integration with third-party tools and Adobe Sensei AI services.",
      "Broke a monolithic delivery path into Java and Spring Boot microservices so teams could build and deploy independently, supporting 50% faster feature delivery across suites including Photoshop and Illustrator.",
      "Shipped adaptive interfaces in React (Redux, Hooks), Next.js, and Tailwind CSS. Engagement rose 10% and interface errors dropped 30% against Adobe Analytics telemetry, helped by tighter Redux state handling that cut validation errors 25%.",
      "Connected creative peripherals like styluses and tablets through secure APIs and an event-driven pipeline, and built real-time alerting on WebSockets and Kafka so users stopped losing work to silent overwrites.",
      "Shipped AI-driven layout suggestions from user history and asset metadata, speeding up design creation for new users by 30%.",
      "Cut query response times 18% by partitioning and indexing the PostgreSQL tables behind large asset searches, and secured assets and session data end to end with TLS/SSL and OAuth 2.0.",
    ],
    tags: ["Java", "Spring Boot", "React", "Next.js", "Kafka", "AWS", "PostgreSQL"],
  },
  {
    company: "Capgemini Technology Services",
    role: "Associate Consultant, Full Stack Developer",
    period: "Sept 2020 - Jul 2023",
    location: "Hyderabad, India",
    summary:
      "Built enterprise Java, Spring Boot, and React applications for financial services and product-engineering clients.",
    points: [
      "Built the microservices behind a financial application covering account management, transactions, customer profiles, and fraud detection, with the isolation and access controls sensitive data requires.",
      "Rebuilt the backend on modular Spring Boot services with Hibernate over PostgreSQL and MySQL, cutting API latency 50% and feature development time 40%.",
      "Cut reported security vulnerabilities 90% across the client portfolio by hardening Spring Security: role-based authorization, token-based authentication, method-level access control, CSRF protection, and secure session management.",
      "Migrated 18 Java projects to Maven in under 30 days and remediated vulnerable log4j dependencies across the portfolio, bringing every project back into CVE compliance ahead of the client deadline.",
      "Delivered client dashboards in React over Node.js REST services, and replaced always-on batch jobs with AWS Lambda for event-driven processing on EC2 behind Auto Scaling, lifting uptime 20%.",
      "Cut post-deployment defects 30% with JUnit coverage and profiling, and stood up a Swagger API portal with interactive docs and auth details for every endpoint.",
    ],
    tags: ["Spring Boot", "React", "Node.js", "AWS", "Spring Security", "PostgreSQL"],
  },
  {
    company: "Wipro",
    role: "Junior Full Stack Developer",
    period: "Jul 2019 - Aug 2020",
    location: "India",
    summary:
      "Built a KYC and AML compliance platform for a banking client on Angular, Spring Boot, Thymeleaf, and PostgreSQL.",
    points: [
      "Built KYC onboarding modules in Angular with Reactive Forms and dynamic validation, supporting accurate registration of 5,000+ customer profiles.",
      "Restructured JSON responses from Spring Boot services so analysts saw the fields they actually needed, cutting AML alert review time 30%.",
      "Configured Spring Security login, logout, and role-based access control across four KYC modules, and designed Thymeleaf and Bootstrap review screens that made flagging suspicious activity 25% faster.",
      "Wrote the PostgreSQL queries behind analyst comments, risk scores, and audit trails across 10,000+ transaction records.",
    ],
    tags: ["Angular", "Spring Boot", "Spring Security", "Thymeleaf", "PostgreSQL"],
  },
];

const EDUCATION = [
  {
    degree: "Master of Science in Computer Science",
    school: "Clark University",
    location: "Worcester, MA, USA",
  },
  {
    degree: "Bachelor of Technology in Electronics & Communication Engineering",
    school: "JNTU Ananthapur",
    location: "AP, India",
  },
];

const CERTIFICATIONS = [
  "AWS Cloud Essentials",
  "Microsoft Certified: Azure Fundamentals (AZ-900)",
  "Java Cloud Native Developer L1 & L2",
  "Python Automation Practitioner",
];

// NOTE: replace `code`/`demo` with the real repo & live URLs when ready.
const GITHUB_PROFILE = "https://github.com/mohan-babu-doddapaneni";

const PROJECTS = [
  {
    Icon: FaCode,
    title: "Career Path Recommendation System",
    description:
      "A recommendation engine that parses resumes with NLP, predicts career paths, and names the skill gaps standing in the way, then serves the results over REST APIs. Built with Python, Django, and a PostgreSQL backend for profiles and scoring.",
    tags: ["Python", "Django", "NLP", "PostgreSQL", "REST API"],
    accent: "linear-gradient(135deg, #059669, #10b981, #2dd4bf)",
    code: GITHUB_PROFILE,
    demo: "",
  },
  {
    Icon: FaServer,
    title: "Restaurant Ordering Portal",
    description:
      "An ordering portal with a normalized schema for menus, modifiers, and orders, and transactional placement so a dropped or duplicate request never leaves a partial order. Built on Java, Angular, and MySQL, and processed 300+ orders.",
    tags: ["Java", "Angular", "MySQL", "REST API", "Transactional"],
    accent: "linear-gradient(135deg, #2dd4bf, #059669)",
    code: GITHUB_PROFILE,
    demo: "",
  },
];

const CONTACTS = [
  { Icon: FaEnvelope, label: "Email", value: "mohanbabud25@gmail.com", href: "mailto:mohanbabud25@gmail.com", color: "#ea4335" },
  { Icon: FaPhone, label: "Phone", value: "+1 (978) 208-4167", href: "tel:+19782084167", color: "#22c55e" },
  { Icon: FaLinkedin, label: "LinkedIn", value: "/mohan-babu-doddapaneni", href: "https://linkedin.com/in/mohan-babu-doddapaneni", color: "#0a66c2" },
  { Icon: FaGithub, label: "GitHub", value: "/mohan-babu-doddapaneni", href: "https://github.com/mohan-babu-doddapaneni", color: "var(--icon-adaptive)" },
];

/* ------------------------------------------------------------------ */
/*  HOOKS & HELPERS                                                    */
/* ------------------------------------------------------------------ */

function useScrollReveal() {
  useEffect(() => {
    const els = document.querySelectorAll(".reveal");
    if (!("IntersectionObserver" in window)) {
      els.forEach((el) => el.classList.add("visible"));
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);
}

// Cursor-following spotlight: tracks the pointer over any `.spotlight` element
// and writes its local coordinates to CSS vars (--mx, --my) for a glow effect.
function useSpotlight() {
  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return; // skip on touch
    const onMove = (e) => {
      const card = e.target.closest(".spotlight");
      if (!card) return;
      const rect = card.getBoundingClientRect();
      card.style.setProperty("--mx", `${e.clientX - rect.left}px`);
      card.style.setProperty("--my", `${e.clientY - rect.top}px`);
    };
    document.addEventListener("pointermove", onMove);
    return () => document.removeEventListener("pointermove", onMove);
  }, []);
}

function useTypewriter(words, typeSpeed = 90, deleteSpeed = 45, pause = 1600) {
  const [text, setText] = useState("");
  const [wordIndex, setWordIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = words[wordIndex % words.length];
    let timeout;
    if (!deleting && text === current) {
      timeout = setTimeout(() => setDeleting(true), pause);
    } else if (deleting && text === "") {
      setDeleting(false);
      setWordIndex((i) => i + 1);
    } else {
      timeout = setTimeout(() => {
        setText(
          deleting
            ? current.substring(0, text.length - 1)
            : current.substring(0, text.length + 1)
        );
      }, deleting ? deleteSpeed : typeSpeed);
    }
    return () => clearTimeout(timeout);
  }, [text, deleting, wordIndex, words, typeSpeed, deleteSpeed, pause]);

  return text;
}

function CountUp({ end, suffix = "", duration = 1800, decimals = 0 }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const started = useRef(false);

  useEffect(() => {
    const node = ref.current;
    if (!node || !("IntersectionObserver" in window)) {
      setCount(end);
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !started.current) {
            started.current = true;
            const startTime = performance.now();
            const tick = (now) => {
              const progress = Math.min((now - startTime) / duration, 1);
              const eased = 1 - Math.pow(1 - progress, 3);
              setCount(eased * end);
              if (progress < 1) requestAnimationFrame(tick);
            };
            requestAnimationFrame(tick);
          }
        });
      },
      { threshold: 0.5 }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [end, duration]);

  return (
    <span ref={ref}>
      {decimals > 0 ? count.toFixed(decimals) : Math.round(count)}
      {suffix}
    </span>
  );
}

/* ------------------------------------------------------------------ */
/*  MAIN COMPONENT                                                     */
/* ------------------------------------------------------------------ */

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [showImageModal, setShowImageModal] = useState(false);
  const [isDarkTheme, setIsDarkTheme] = useState(true);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeSection, setActiveSection] = useState("home");

  const role = useTypewriter(ROLES);
  useScrollReveal();
  useSpotlight();

  const closeMenu = () => setMenuOpen(false);
  const toggleTheme = () => setIsDarkTheme((v) => !v);
  const toggleImageModal = () => setShowImageModal((v) => !v);

  useEffect(() => {
    document.body.className = isDarkTheme ? "dark-theme" : "light-theme";
  }, [isDarkTheme]);

  useEffect(() => {
    document.body.style.overflow = showImageModal ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [showImageModal]);

  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && setShowImageModal(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const handleScroll = useCallback(() => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    setScrollProgress(docHeight > 0 ? (scrollTop / docHeight) * 100 : 0);
    setShowScrollTop(scrollTop > 400);
    let current = "home";
    for (const link of NAV_LINKS) {
      const section = document.getElementById(link.id);
      if (section && section.getBoundingClientRect().top <= 130) {
        current = link.id;
      }
    }
    setActiveSection(current);
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  const downloadResume = () => {
    const link = document.createElement("a");
    link.href = `${process.env.PUBLIC_URL}/Mohan_Babu_Doddapaneni.pdf`;
    link.download = "Mohan_Babu_Doddapaneni.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="App">
      <a href="#main-content" className="skip-link">Skip to content</a>
      {/* Layered designed background */}
      <div className="bg-layer" aria-hidden="true">
        <div className="bg-aurora" />
        <div className="bg-grid" />
        <div className="bg-noise" />
      </div>

      <div className="scroll-progress" style={{ width: `${scrollProgress}%` }} />

      {/* NAVBAR */}
      <nav className="navbar">
        <div className="nav-container">
          <a href="#home" className="nav-logo" onClick={closeMenu}>
            <span className="logo-mark">MB</span>
            <span className="logo-text">Mohan Babu</span>
          </a>

          <ul className={`nav-links ${menuOpen ? "active" : ""}`}>
            {NAV_LINKS.map((link) => (
              <li key={link.id}>
                <a
                  href={`#${link.id}`}
                  className={activeSection === link.id ? "active" : ""}
                  onClick={closeMenu}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="nav-actions">
            <button className="theme-toggle" onClick={toggleTheme} aria-label="Toggle color theme">
              {isDarkTheme ? <FaSun /> : <FaMoon />}
            </button>
            <button
              className={`menu-icon ${menuOpen ? "open" : ""}`}
              onClick={() => setMenuOpen((v) => !v)}
              aria-label="Toggle menu"
              aria-expanded={menuOpen}
            >
              <span />
              <span />
              <span />
            </button>
          </div>
        </div>
      </nav>

      <main id="main-content">
        {/* HERO */}
        <header id="home" className="hero">
          <div className="hero-inner container">
            <div className="hero-text">
              <span className="availability-pill">
                <span className="status-dot" /> Available for opportunities
              </span>
              <p className="hero-greeting">
                <span className="wave">👋</span> Hello, I'm
              </p>
              <h1 className="hero-name">Mohan Babu Doddapaneni</h1>
              <h2 className="hero-role">
                <span className="role-text">{role}</span>
                <span className="cursor-blink">|</span>
              </h2>
              <p className="hero-tagline">
                I ship production systems on <strong>Java, Spring Boot</strong>,{" "}
                <strong>Angular, and React</strong>. Right now I own the admin and
                data-access layer of a multi-tenant SaaS commerce platform serving{" "}
                <strong>40+ retailers</strong> at 2.5M+ orders a month, and I lean on{" "}
                <strong>AI coding tools</strong> without letting speed cost quality.
              </p>

              <div className="hero-cta">
                <a href="#projects" className="btn btn-primary">View My Work</a>
                <button className="btn btn-ghost" onClick={downloadResume}>
                  <FaDownload /> Download Resume
                </button>
              </div>

              <div className="hero-socials">
                {CONTACTS.map(({ Icon, label, href }) => (
                  <a
                    key={label}
                    href={href}
                    target={href.startsWith("http") ? "_blank" : undefined}
                    rel="noopener noreferrer"
                    title={label}
                    aria-label={label}
                  >
                    <Icon />
                  </a>
                ))}
              </div>
            </div>

            <div className="hero-visual">
              <div className="profile-ring">
                <div className="profile-glow" />
                <img
                  src={process.env.PUBLIC_URL + "/assets/profile.png"}
                  alt="Mohan Babu Doddapaneni"
                  className="profile-img"
                  onClick={toggleImageModal}
                />
              </div>
              <span className="badge badge-1"><FaJava style={{ color: "#f89820" }} /> Java</span>
              <span className="badge badge-2"><SiReact style={{ color: "#61dafb" }} /> React</span>
              <span className="badge badge-3"><FaAws style={{ color: "#ff9900" }} /> AWS</span>
            </div>
          </div>

          <a href="#about" className="scroll-hint" aria-label="Scroll down">
            <span className="mouse"><span className="wheel" /></span>
          </a>
        </header>

        {showImageModal && (
          <div className="modal-overlay" onClick={toggleImageModal}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <button className="close-button" onClick={toggleImageModal} aria-label="Close">✖</button>
              <img
                src={process.env.PUBLIC_URL + "/assets/profile.png"}
                alt="Mohan Babu Doddapaneni"
                className="full-image"
              />
            </div>
          </div>
        )}

        {/* ABOUT */}
        <section id="about" className="section about container">
          <div className="section-head reveal">
            <span className="section-kicker">01 · Introduction</span>
            <h2 className="section-title">About Me</h2>
          </div>
          <div className="about-body reveal">
            <p>
              I'm a <strong>Full Stack Developer</strong> with 6+ years shipping
              production systems on <strong>Java (8 to 21), Spring Boot microservices</strong>,{" "}
              <strong>Angular, and React</strong>. Today I own the admin and data-access
              layer of a multi-tenant SaaS commerce platform serving{" "}
              <strong>40+ enterprise retailers</strong> at 2.5M+ orders a month, from the
              data model through REST and GraphQL APIs to the front end on top.
            </p>
            <p>
              I'm strongest at the work that keeps a platform trustworthy at scale:
              pagination and caching contracts that hold at tens of millions of records,
              tenant isolation enforced in one place, and the quiet data bugs dashboards
              never surface. I use <strong>AI coding tools</strong> (Claude Code, GitHub
              Copilot, Cursor) daily alongside code review, SonarQube gates, and JUnit
              coverage, so speed does not cost quality. M.S. in Computer Science from
              Clark University, and grounded in strong Data Structures & Algorithms.
            </p>
          </div>

          <div className="stats-grid reveal">
            {STATS.map((s) => (
              <div className="stat-card" key={s.label}>
                <div className="stat-value">
                  <CountUp end={s.value} suffix={s.suffix} decimals={s.decimals || 0} />
                </div>
                <div className="stat-label">{s.label}</div>
              </div>
            ))}
          </div>

          <div className="tech-marquee reveal" aria-hidden="true">
            <div className="tech-track">
              {[...TECH, ...TECH].map(({ Icon, name, color }, i) => (
                <span className="tech-chip" key={i}>
                  <Icon style={{ color }} />
                  <span>{name}</span>
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* SKILLS */}
        <section id="skills" className="section skills container">
          <div className="section-head reveal">
            <span className="section-kicker">02 · Toolbox</span>
            <h2 className="section-title">Technical Skills</h2>
          </div>
          <div className="skills-grid">
            {SKILLS.map((group, i) => {
              const Head = group.Icon;
              return (
                <div className="skill-card spotlight reveal" key={group.title} style={{ transitionDelay: `${i * 70}ms` }}>
                  <div className="skill-card-head">
                    <span className="skill-icon"><Head /></span>
                    <h3>{group.title}</h3>
                  </div>
                  <div className="skill-tags">
                    {group.items.map(({ Icon, label, color }) => (
                      <span className="skill-tag" key={label}>
                        <Icon style={{ color }} /> {label}
                      </span>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* EXPERIENCE */}
        <section id="experience" className="section experience container">
          <div className="section-head reveal">
            <span className="section-kicker">03 · Career</span>
            <h2 className="section-title">Experience</h2>
          </div>
          <div className="timeline">
            {EXPERIENCE.map((job) => (
              <div className="timeline-item reveal" key={job.company}>
                <div className="timeline-dot"><FaBriefcase /></div>
                <div className="timeline-card spotlight">
                  <div className="timeline-top">
                    <h3>{job.role}</h3>
                    <span className="timeline-period">{job.period}</span>
                  </div>
                  <div className="timeline-meta">
                    <span className="timeline-company">{job.company}</span>
                    <span className="timeline-location"><FaLocationDot /> {job.location}</span>
                  </div>
                  <p className="timeline-summary">{job.summary}</p>
                  <ul>
                    {job.points.map((p, i) => (
                      <li key={i}>{p}</li>
                    ))}
                  </ul>
                  <div className="timeline-tags">
                    {job.tags.map((t) => (
                      <span key={t}>{t}</span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* EDUCATION & CERTIFICATIONS */}
        <section id="education" className="section education container">
          <div className="section-head reveal">
            <span className="section-kicker">04 · Background</span>
            <h2 className="section-title">Education & Certifications</h2>
          </div>
          <div className="edu-grid">
            <div className="edu-col reveal">
              <h3 className="edu-col-title"><FaGraduationCap /> Education</h3>
              {EDUCATION.map((e) => (
                <div className="edu-card" key={e.degree}>
                  <h4>{e.degree}</h4>
                  <p className="edu-school">{e.school}</p>
                  <p className="edu-loc"><FaLocationDot /> {e.location}</p>
                </div>
              ))}
            </div>
            <div className="edu-col reveal">
              <h3 className="edu-col-title"><FaAward /> Certifications</h3>
              <div className="edu-card">
                <ul className="cert-list">
                  {CERTIFICATIONS.map((c) => (
                    <li key={c}><FaCircleCheck /> {c}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* PROJECTS */}
        <section id="projects" className="section projects container">
          <div className="section-head reveal">
            <span className="section-kicker">05 · Selected Work</span>
            <h2 className="section-title">Projects</h2>
          </div>
          <div className="projects-grid">
            {PROJECTS.map((p, i) => {
              const PIcon = p.Icon;
              return (
                <article className="project-card spotlight reveal" key={p.title} style={{ transitionDelay: `${i * 100}ms` }}>
                  <div className="project-banner" style={{ background: p.accent }}>
                    <span className="project-icon"><PIcon /></span>
                  </div>
                  <div className="project-body">
                    <h3>{p.title}</h3>
                    <p>{p.description}</p>
                    <div className="project-tags">
                      {p.tags.map((t) => (
                        <span key={t}>{t}</span>
                      ))}
                    </div>
                    {(p.code || p.demo) && (
                      <div className="project-links">
                        {p.code && (
                          <a href={p.code} target="_blank" rel="noopener noreferrer" className="project-link">
                            <FaGithub /> View Code
                          </a>
                        )}
                        {p.demo && (
                          <a href={p.demo} target="_blank" rel="noopener noreferrer" className="project-link primary">
                            <FaArrowUpRightFromSquare /> Live Demo
                          </a>
                        )}
                      </div>
                    )}
                  </div>
                </article>
              );
            })}
          </div>
        </section>

        {/* CONTACT */}
        <section id="contact" className="section contact container">
          <div className="section-head reveal">
            <span className="section-kicker">06 · Get In Touch</span>
            <h2 className="section-title">Let's Work Together</h2>
            <p className="section-sub">
              I'm open to <strong>Senior Full-Stack &amp; Backend Engineering</strong> roles and
              exciting collaborations. Let's build something great.
            </p>
          </div>
          <div className="contact-grid">
            {CONTACTS.map(({ Icon, label, value, href, color }, i) => (
              <a
                key={label}
                href={href}
                target={href.startsWith("http") ? "_blank" : undefined}
                rel="noopener noreferrer"
                className="contact-card reveal"
                style={{ transitionDelay: `${i * 70}ms` }}
              >
                <span className="contact-icon" style={{ color }}><Icon /></span>
                <span className="contact-meta">
                  <span className="contact-label">{label}</span>
                  <span className="contact-value">{value}</span>
                </span>
              </a>
            ))}
          </div>
          <div className="contact-cta reveal">
            <a href="mailto:mohanbabud25@gmail.com" className="btn btn-primary">
              <FaEnvelope /> Say Hello
            </a>
          </div>
        </section>
      </main>

      <footer className="footer">
        <p className="footer-name">Mohan Babu Doddapaneni</p>
        <p className="footer-note">
          Designed &amp; built with React · &copy; {new Date().getFullYear()} · All rights reserved.
        </p>
      </footer>

      {showScrollTop && (
        <button className="scroll-to-top" onClick={scrollToTop} aria-label="Back to top">
          <FaArrowUp />
        </button>
      )}
      <a href="tel:+19782084167" className="contact-float" aria-label="Call me">
        <FaPhone /><span>Call Me</span>
      </a>
    </div>
  );
}
