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
} from "react-icons/si";
import {
  FaJava, FaAws, FaEnvelope, FaPhone, FaLinkedin, FaGithub, FaArrowUp,
  FaDownload, FaLocationDot, FaBriefcase, FaCode, FaPalette, FaGears,
  FaDatabase, FaCloud, FaTowerBroadcast, FaShieldHalved, FaServer,
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
  { Icon: SiNextdotjs, name: "Next.js", color: "#ffffff" },
  { Icon: FaAws, name: "AWS", color: "#ff9900" },
  { Icon: SiDocker, name: "Docker", color: "#2496ed" },
  { Icon: SiKubernetes, name: "Kubernetes", color: "#326ce5" },
  { Icon: SiApachekafka, name: "Kafka", color: "#ffffff" },
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
      { Icon: SiTypescript, label: "TypeScript", color: "#3178c6" },
      { Icon: SiJavascript, label: "JavaScript", color: "#f7df1e" },
      { Icon: SiNextdotjs, label: "Next.js", color: "#ffffff" },
      { Icon: SiTailwindcss, label: "Tailwind", color: "#38bdf8" },
    ],
  },
  {
    Icon: FaGears,
    title: "Backend",
    items: [
      { Icon: FaJava, label: "Java (8–17)", color: "#f89820" },
      { Icon: SiSpringboot, label: "Spring Boot", color: "#6db33f" },
      { Icon: SiNodedotjs, label: "Node.js", color: "#5fa04e" },
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
      { Icon: SiRedis, label: "Redis", color: "#ff4438" },
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
      { Icon: SiApachekafka, label: "Apache Kafka", color: "#ffffff" },
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
    period: "Sept 2024 – Present",
    location: "United States",
    summary:
      "Building cloud-native asset management & real-time collaboration services at scale.",
    points: [
      "Architected cloud-native asset & collaboration services using Java + Spring Boot microservices, accelerating feature delivery by ~50%.",
      "Built modern React / Next.js UIs with Tailwind; improved engagement and reduced UI errors via telemetry-driven fixes.",
      "Implemented event-driven workflows with Kafka / WebSockets for real-time notifications and live collaboration.",
      "Championed code quality with unit/integration testing, code reviews, and CI/CD automation.",
    ],
    tags: ["Java", "Spring Boot", "React", "Next.js", "Kafka", "AWS"],
  },
  {
    company: "Capgemini",
    role: "Associate Consultant — Full Stack",
    period: "Sept 2020 – Jul 2023",
    location: "India",
    summary:
      "Delivered enterprise web platforms and cloud-deployed REST services for global clients.",
    points: [
      "Delivered REST APIs with Spring Boot & Node.js; cut API latency ~50% and built a Swagger-based API portal.",
      "Developed React / Angular features and inventory modules; integrated SQL stores (PostgreSQL / MySQL).",
      "Deployed on AWS (EC2, Auto Scaling, Load Balancers); improved uptime by ~20% with CI/CD via Jenkins / GitHub Actions.",
      "Collaborated in Agile/Scrum teams, mentoring juniors and driving sprint deliverables.",
    ],
    tags: ["Spring Boot", "Angular", "AWS", "CI/CD", "PostgreSQL", "Node.js"],
  },
  {
    company: "Wipro",
    role: "Jr. Full Stack Developer",
    period: "Jul 2019 – Aug 2020",
    location: "India",
    summary:
      "Built banking KYC/AML onboarding and compliance workflows for financial services.",
    points: [
      "Developed KYC onboarding modules in Angular + Spring Boot with role-based access control; accelerated reviews by ~25%.",
      "Optimized PostgreSQL queries for AML audit trails and analyst workflows handling 10k+ transactions.",
      "Contributed across Agile ceremonies; strengthened foundations in Git, Maven, and REST integrations.",
    ],
    tags: ["Angular", "Spring Boot", "PostgreSQL", "RBAC", "Agile"],
  },
];

const PROJECTS = [
  {
    Icon: FaCode,
    title: "Career Path Recommendation System",
    description:
      "AI-powered application built with Django and NLP that analyzes resumes to suggest ideal career paths. Deployed on Render with a PostgreSQL backend.",
    tags: ["Django", "NLP", "PostgreSQL", "Python"],
    accent: "linear-gradient(135deg, #6366f1, #a855f7)",
  },
  {
    Icon: FaServer,
    title: "Restaurant Ordering Portal",
    description:
      "Angular & Java food-ordering portal handling 300+ concurrent users, featuring a responsive UI and a real-time backend for live order tracking.",
    tags: ["Angular", "Java", "Spring Boot", "Real-time"],
    accent: "linear-gradient(135deg, #06b6d4, #6366f1)",
  },
];

const CONTACTS = [
  { Icon: FaEnvelope, label: "Email", value: "mohanbabud25@gmail.com", href: "mailto:mohanbabud25@gmail.com", color: "#ea4335" },
  { Icon: FaPhone, label: "Phone", value: "+1 (978) 208-4167", href: "tel:+19782084167", color: "#22c55e" },
  { Icon: FaLinkedin, label: "LinkedIn", value: "/mohan-babu-doddapaneni", href: "https://linkedin.com/in/mohan-babu-doddapaneni", color: "#0a66c2" },
  { Icon: FaGithub, label: "GitHub", value: "/mohan-babu-doddapaneni", href: "https://github.com/mohan-babu-doddapaneni", color: "#ffffff" },
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

      <main>
        {/* HERO */}
        <header id="home" className="hero">
          <div className="hero-inner container">
            <div className="hero-text">
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
            <span className="section-kicker">01 — Introduction</span>
            <h2 className="section-title">About Me</h2>
          </div>
          <div className="about-body reveal">
            <p>
              I'm a <strong>Full Stack Developer</strong> with 5+ years of experience
              delivering scalable, high-performance applications. I specialize in{" "}
              <strong>Java / Spring Boot microservices</strong> and{" "}
              <strong>React / Angular</strong> front-ends, with deep expertise in{" "}
              <strong>AWS</strong> (EC2, Lambda, API Gateway, S3), CI/CD pipelines,
              and containerization with Docker & Kubernetes.
            </p>
            <p>
              I love designing <strong>event-driven systems</strong> with Kafka and
              RabbitMQ, and I bring a data-driven mindset across PostgreSQL, MySQL, and
              MongoDB — applying indexing and partitioning to dramatically cut query
              times. I care about clean architecture, great UX, and shipping value fast.
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
            <span className="section-kicker">02 — Toolbox</span>
            <h2 className="section-title">Technical Skills</h2>
          </div>
          <div className="skills-grid">
            {SKILLS.map((group, i) => {
              const Head = group.Icon;
              return (
                <div className="skill-card reveal" key={group.title} style={{ transitionDelay: `${i * 70}ms` }}>
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
            <span className="section-kicker">03 — Career</span>
            <h2 className="section-title">Experience</h2>
          </div>
          <div className="timeline">
            {EXPERIENCE.map((job) => (
              <div className="timeline-item reveal" key={job.company}>
                <div className="timeline-dot"><FaBriefcase /></div>
                <div className="timeline-card">
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

        {/* PROJECTS */}
        <section id="projects" className="section projects container">
          <div className="section-head reveal">
            <span className="section-kicker">04 — Selected Work</span>
            <h2 className="section-title">Projects</h2>
          </div>
          <div className="projects-grid">
            {PROJECTS.map((p, i) => {
              const PIcon = p.Icon;
              return (
                <article className="project-card reveal" key={p.title} style={{ transitionDelay: `${i * 100}ms` }}>
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
                  </div>
                </article>
              );
            })}
          </div>
        </section>

        {/* CONTACT */}
        <section id="contact" className="section contact container">
          <div className="section-head reveal">
            <span className="section-kicker">05 — Get In Touch</span>
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
