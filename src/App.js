import React, { useState, useEffect, useRef, useCallback } from "react";
import "./App.css";

// Self-hosted fonts (no external CDN — better privacy & security)
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
} from "react-icons/si";
import {
  FaJava, FaAws, FaEnvelope, FaPhone, FaLinkedin, FaGithub, FaArrowUp,
  FaDownload, FaLocationDot, FaBriefcase, FaCode, FaPalette, FaGears,
  FaDatabase, FaCloud, FaTowerBroadcast, FaShieldHalved, FaServer,
  FaGraduationCap, FaAward, FaCircleCheck, FaArrowUpRightFromSquare,
  FaNetworkWired,
} from "react-icons/fa6";

/* ------------------------------------------------------------------ */
/*  DATA                                                               */
/* ------------------------------------------------------------------ */

const ROLES = [
  "Full Stack Developer",
  "Java & Spring Boot Engineer",
  "React / Angular Specialist",
  "Cloud & Microservices Builder",
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
  { value: 5, suffix: "+", label: "Years Experience" },
  { value: 3, suffix: "", label: "Global Companies" },
  { value: 50, suffix: "%", label: "Faster Delivery" },
  { value: 20, suffix: "+", label: "Technologies" },
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
      { Icon: FaJava, label: "Java (8 to 17)", color: "#f89820" },
      { Icon: SiSpringboot, label: "Spring Boot", color: "#6db33f" },
      { Icon: SiPython, label: "Python", color: "#3776ab" },
      { Icon: SiHibernate, label: "Hibernate", color: "#59666c" },
      { Icon: SiNodedotjs, label: "Node.js", color: "#5fa04e" },
      { Icon: SiExpress, label: "Express", color: "var(--icon-adaptive)" },
      { Icon: SiGraphql, label: "GraphQL", color: "#e10098" },
      { Icon: FaCode, label: "REST APIs", color: "#a78bfa" },
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
    Icon: FaTowerBroadcast,
    title: "Messaging",
    items: [
      { Icon: SiApachekafka, label: "Apache Kafka", color: "var(--icon-adaptive)" },
      { Icon: FaTowerBroadcast, label: "RabbitMQ", color: "#ff6600" },
      { Icon: FaCode, label: "WebSockets", color: "#a78bfa" },
    ],
  },
  {
    Icon: FaShieldHalved,
    title: "Security & Testing",
    items: [
      { Icon: SiSpringsecurity, label: "Spring Security", color: "#6db33f" },
      { Icon: SiJsonwebtokens, label: "JWT / OAuth2", color: "#d63aff" },
      { Icon: SiJest, label: "Jest", color: "#c21325" },
      { Icon: SiCypress, label: "Cypress", color: "#69d3a7" },
    ],
  },
];

const EXPERIENCE = [
  {
    company: "Adobe Inc.",
    role: "Full Stack Developer",
    period: "Sept 2024 - Present",
    location: "MA, USA",
    summary:
      "Architecting a cloud-native asset management and real-time collaboration platform within Adobe Creative Cloud.",
    points: [
      "Architected and led the design of a cloud-native asset management and real-time collaboration platform with horizontal scalability, high availability, and seamless integration with Adobe Sensei AI services.",
      "Built a robust microservices architecture in Java and Spring Boot, enabling modular development and 50% faster delivery of new features across suites like Photoshop and Illustrator.",
      "Developed responsive, intuitive UIs with React (Redux, Hooks), Next.js, and Tailwind CSS, lifting user engagement by 10% and reducing interface errors by 30% (Adobe Analytics telemetry).",
      "Built a real-time alerting and notification system over WebSockets and Kafka for asset status changes, collaborative edits, and version conflicts.",
      "Engineered end-to-end encryption and secure protocols (TLS/SSL, OAuth 2.0) to safeguard digital assets and collaborative work across distributed systems.",
      "Optimized large-scale asset queries via PostgreSQL table partitioning and indexing, improving response times by 18% for high-volume Creative Cloud projects.",
    ],
    tags: ["Java", "Spring Boot", "React", "Next.js", "Kafka", "AWS", "PostgreSQL"],
  },
  {
    company: "Capgemini",
    role: "Associate Consultant, Full Stack Developer",
    period: "Sept 2020 - Jul 2023",
    location: "India",
    summary:
      "Delivered enterprise web platforms, financial microservices, and cloud-deployed REST services.",
    points: [
      "Built RESTful APIs with Spring Boot for authentication, storage, and retrieval, cutting development time by 40% versus traditional approaches.",
      "Developed microservices for a financial application handling account management, transactions, customer profiles, and fraud detection with a focus on scalability and security.",
      "Leveraged the Spring Framework for modular backend architecture, streamlining data processing and reducing API latency by 50%.",
      "Built React and Vue.js dashboards plus a Java-based inventory system for product catalog, orders, and reporting.",
      "Deployed on AWS EC2 with Auto Scaling and Load Balancing for a 20% improvement in uptime, and used AWS Lambda for serverless event-driven tasks.",
      "Created a centralized Swagger API portal with interactive docs, and reduced post-deployment issues by 30% through JUnit testing.",
    ],
    tags: ["Spring Boot", "React", "Node.js", "AWS", "Microservices", "PostgreSQL"],
  },
  {
    company: "Wipro",
    role: "Jr. Full Stack Developer",
    period: "Jul 2019 - Aug 2020",
    location: "India",
    summary:
      "Built banking KYC/AML onboarding and compliance workflows for financial services.",
    points: [
      "Developed KYC onboarding modules with Angular and Reactive Forms, enabling accurate registration of 5,000+ customer profiles with dynamic validation.",
      "Built RESTful backend services in Spring Boot, optimizing JSON responses and reducing AML alert review time by 30%.",
      "Implemented Spring Security for login, logout, and role-based access control across 4 KYC functional modules.",
      "Authored optimized PostgreSQL queries for analyst comments, risk scores, and AML audit trails across 10,000+ transaction records, accelerating reviews by 25%.",
      "Participated in Agile standups, sprint reviews, and backlog grooming; gained hands-on Git, Maven, and REST integration experience.",
    ],
    tags: ["Angular", "Spring Boot", "Spring Security", "PostgreSQL", "Agile"],
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
  "Microsoft Certified: Azure Fundamentals",
  "Java Cloud Native (Level 1 & 2)",
];

// NOTE: replace `code`/`demo` with the real repo & live URLs when ready.
const GITHUB_PROFILE = "https://github.com/mohan-babu-doddapaneni";

const PROJECTS = [
  {
    Icon: FaNetworkWired,
    title: "Real-Time Event-Driven Order Platform",
    description:
      "Cloud-native microservices platform processing high-volume orders in real time. Built with Java/Spring Boot services communicating over Apache Kafka, a React dashboard with live WebSocket updates, and deployed on AWS EKS (Kubernetes) with CI/CD. Sustains 10k+ events/min with sub-200ms latency.",
    tags: ["Java", "Spring Boot", "Kafka", "React", "Kubernetes", "AWS"],
    accent: "linear-gradient(135deg, #8b5cf6, #6366f1, #22d3ee)",
    code: GITHUB_PROFILE,
    demo: "",
  },
  {
    Icon: FaCode,
    title: "Career Path Recommendation System",
    description:
      "AI-powered web app that analyzes resumes with NLP to recommend ideal career paths and skill gaps. Built with Django and Python ML pipelines, a clean responsive UI, and a PostgreSQL backend for profiles and scoring. Deployed on Render with automated builds, delivering tailored guidance from a single resume upload.",
    tags: ["Django", "Python", "NLP", "Machine Learning", "PostgreSQL", "REST API"],
    accent: "linear-gradient(135deg, #6366f1, #a855f7)",
    code: GITHUB_PROFILE,
    demo: "",
  },
  {
    Icon: FaServer,
    title: "Restaurant Ordering Portal",
    description:
      "Full-stack food-ordering portal handling 300+ concurrent users with a responsive Angular UI and a Java/Spring Boot backend. Features real-time order tracking, role-based access for staff and customers, secure REST APIs, and a relational data model for menus, carts, and live order status updates.",
    tags: ["Angular", "Java", "Spring Boot", "REST API", "Real-time", "MySQL"],
    accent: "linear-gradient(135deg, #06b6d4, #6366f1)",
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

function CountUp({ end, suffix = "", duration = 1800 }) {
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
              setCount(Math.round(eased * end));
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
      {count}
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
              {isDarkTheme ? "☀" : "☾"}
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
                I build scalable, high-performance web applications with{" "}
                <strong>Java / Spring Boot</strong> microservices and modern{" "}
                <strong>React / Angular</strong> front-ends, deployed on{" "}
                <strong>AWS</strong> with event-driven architectures.
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
              I'm a <strong>Full Stack Developer</strong> with 5 years of experience
              delivering scalable, high-performance applications using{" "}
              <strong>Java 8 to 17, Spring Boot microservices</strong>,{" "}
              <strong>Python (Flask / Django)</strong>, and{" "}
              <strong>React / Angular</strong> UIs. I have deep expertise in{" "}
              <strong>AWS</strong> (EC2, Lambda, API Gateway, S3, CloudFormation),
              CI/CD pipelines, and containerization with Docker & Kubernetes,
              enabling 99.9% uptime across distributed microservices.
            </p>
            <p>
              I design <strong>event-driven systems</strong> with Kafka and RabbitMQ,
              build <strong>REST & GraphQL APIs</strong> that cut latency by 50%, and
              apply indexing and partitioning across PostgreSQL, MySQL, MongoDB, and
              DynamoDB to reduce query times by 30%. Grounded in strong{" "}
              <strong>Data Structures & Algorithms</strong>, I care about clean
              architecture, great UX, and shipping value fast.
            </p>
          </div>

          <div className="stats-grid reveal">
            {STATS.map((s) => (
              <div className="stat-card" key={s.label}>
                <div className="stat-value">
                  <CountUp end={s.value} suffix={s.suffix} />
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
              I'm open to full-time roles and exciting collaborations. Let's build something great.
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
