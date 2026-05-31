import React, { useState, useEffect, useRef, useCallback } from "react";
import "./App.css";

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

const SKILLS = [
  {
    icon: "🎨",
    title: "Frontend",
    items: ["React", "Redux", "Angular", "TypeScript", "JavaScript (ES6+)", "Next.js", "Tailwind", "Material-UI", "HTML5", "CSS3"],
  },
  {
    icon: "⚙️",
    title: "Backend",
    items: ["Java (8–17)", "Spring Boot", "Spring MVC", "Spring Data JPA", "Hibernate", "Microservices", "REST / GraphQL", "Node.js / Express"],
  },
  {
    icon: "🗄️",
    title: "Databases",
    items: ["PostgreSQL", "MySQL", "MongoDB", "DynamoDB", "Redis"],
  },
  {
    icon: "☁️",
    title: "Cloud & DevOps",
    items: ["AWS (EC2, S3, Lambda)", "API Gateway", "CloudFormation", "Docker", "Kubernetes", "Jenkins", "GitHub Actions", "Terraform"],
  },
  {
    icon: "📨",
    title: "Messaging",
    items: ["Apache Kafka", "RabbitMQ", "WebSockets"],
  },
  {
    icon: "🔐",
    title: "Security & Testing",
    items: ["Spring Security", "OAuth2", "JWT", "JUnit", "Mockito", "Jest", "Cypress"],
  },
];

const EXPERIENCE = [
  {
    company: "Adobe Inc.",
    role: "Full Stack Developer",
    period: "Sept 2024 – Present",
    points: [
      "Architected cloud-native asset & collaboration services using Java + Spring Boot microservices, accelerating feature delivery by ~50%.",
      "Built modern React / Next.js UIs with Tailwind; improved engagement and reduced UI errors via telemetry-driven fixes.",
      "Implemented event-driven workflows with Kafka / WebSockets for real-time notifications and collaboration.",
    ],
    tags: ["Java", "Spring Boot", "React", "Next.js", "Kafka"],
  },
  {
    company: "Capgemini",
    role: "Associate Consultant — Full Stack",
    period: "Sept 2020 – Jul 2023",
    points: [
      "Delivered REST APIs with Spring Boot & Node.js; cut API latency ~50% and created a Swagger-based API portal.",
      "Built React / Angular features and inventory modules; integrated SQL stores (PostgreSQL / MySQL).",
      "Deployed on AWS (EC2, Auto Scaling, Load Balancers); improved uptime by ~20% with CI/CD via Jenkins / GitHub Actions.",
    ],
    tags: ["Spring Boot", "Angular", "AWS", "CI/CD", "PostgreSQL"],
  },
  {
    company: "Wipro",
    role: "Jr. Full Stack Developer",
    period: "Jul 2019 – Aug 2020",
    points: [
      "Developed KYC onboarding modules in Angular + Spring Boot with RBAC; accelerated reviews by ~25%.",
      "Optimized PostgreSQL queries for AML trails and analyst workflows handling 10k+ transactions.",
      "Contributed across Agile ceremonies; strengthened foundations in Git, Maven, and REST integrations.",
    ],
    tags: ["Angular", "Spring Boot", "PostgreSQL", "Agile"],
  },
];

const PROJECTS = [
  {
    icon: "🧭",
    title: "Career Path Recommendation System",
    description:
      "AI-powered application built with Django and NLP that suggests ideal career paths by analyzing resumes. Deployed on Render with a PostgreSQL backend.",
    tags: ["Django", "NLP", "PostgreSQL", "Python"],
    accent: "linear-gradient(135deg, #6366f1, #8b5cf6)",
  },
  {
    icon: "🍽️",
    title: "Restaurant Ordering Portal",
    description:
      "Angular & Java food ordering portal handling 300+ concurrent users, featuring a responsive UI and a real-time backend for live order tracking.",
    tags: ["Angular", "Java", "Spring Boot", "Real-time"],
    accent: "linear-gradient(135deg, #f43f5e, #f59e0b)",
  },
];

const TECH_ICONS = [
  { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg", title: "Java" },
  { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/spring/spring-original.svg", title: "Spring Boot" },
  { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg", title: "React" },
  { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/angularjs/angularjs-original.svg", title: "Angular" },
  { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg", title: "TypeScript" },
  { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original-wordmark.svg", title: "AWS", invertOnDark: true },
  { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg", title: "Docker" },
  { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kubernetes/kubernetes-plain.svg", title: "Kubernetes" },
  { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg", title: "PostgreSQL" },
];

const CONTACTS = [
  { icon: "✉️", label: "Email", value: "mohanbabud25@gmail.com", href: "mailto:mohanbabud25@gmail.com" },
  { icon: "📞", label: "Phone", value: "+1 (978) 208-4167", href: "tel:+19782084167" },
  { icon: "💼", label: "LinkedIn", value: "/mohan-babu-doddapaneni", href: "https://linkedin.com/in/mohan-babu-doddapaneni" },
  { icon: "💻", label: "GitHub", value: "/mohan-babu-doddapaneni", href: "https://github.com/mohan-babu-doddapaneni" },
];

/* ------------------------------------------------------------------ */
/*  HOOKS & HELPERS                                                    */
/* ------------------------------------------------------------------ */

// Reveal-on-scroll: adds `.visible` to elements with `.reveal`
function useScrollReveal() {
  useEffect(() => {
    const els = document.querySelectorAll(".reveal");
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

// Animated rotating role text (typewriter effect)
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

// Count-up animation for the stat numbers
function CountUp({ end, suffix = "", duration = 1800 }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const started = useRef(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !started.current) {
            started.current = true;
            const startTime = performance.now();
            const tick = (now) => {
              const progress = Math.min((now - startTime) / duration, 1);
              const eased = 1 - Math.pow(1 - progress, 3); // ease-out-cubic
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

  // Theme class on <body>
  useEffect(() => {
    document.body.className = isDarkTheme ? "dark-theme" : "light-theme";
  }, [isDarkTheme]);

  // Lock background scroll while the image modal is open
  useEffect(() => {
    document.body.style.overflow = showImageModal ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [showImageModal]);

  // Close modal on Escape
  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && setShowImageModal(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // Scroll-driven UI: progress bar, back-to-top, active section
  const handleScroll = useCallback(() => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    setScrollProgress(docHeight > 0 ? (scrollTop / docHeight) * 100 : 0);
    setShowScrollTop(scrollTop > 400);

    let current = "home";
    for (const link of NAV_LINKS) {
      const section = document.getElementById(link.id);
      if (section && section.getBoundingClientRect().top <= 120) {
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
      {/* Decorative animated background blobs */}
      <div className="bg-decor" aria-hidden="true">
        <span className="blob blob-1" />
        <span className="blob blob-2" />
        <span className="blob blob-3" />
      </div>

      {/* Scroll progress bar */}
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
            <button
              className="theme-toggle"
              onClick={toggleTheme}
              aria-label="Toggle color theme"
            >
              {isDarkTheme ? "☀️" : "🌙"}
            </button>
            <button
              className={`menu-icon ${menuOpen ? "open" : ""}`}
              onClick={() => setMenuOpen((v) => !v)}
              aria-label="Toggle menu"
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
              <p className="hero-greeting">👋 Hello, I'm</p>
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
                  📄 Download Resume
                </button>
              </div>

              <div className="hero-socials">
                {CONTACTS.map((c) => (
                  <a
                    key={c.label}
                    href={c.href}
                    target={c.href.startsWith("http") ? "_blank" : undefined}
                    rel="noreferrer"
                    title={c.label}
                    aria-label={c.label}
                  >
                    {c.icon}
                  </a>
                ))}
              </div>
            </div>

            <div className="hero-visual">
              <div className="profile-ring">
                <img
                  src={process.env.PUBLIC_URL + "/assets/profile.png"}
                  alt="Mohan Babu Doddapaneni"
                  className="profile-img"
                  onClick={toggleImageModal}
                />
              </div>
            </div>
          </div>

          <a href="#about" className="scroll-hint" aria-label="Scroll down">
            <span className="mouse"><span className="wheel" /></span>
          </a>
        </header>

        {/* IMAGE MODAL */}
        {showImageModal && (
          <div className="modal-overlay" onClick={toggleImageModal}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <button className="close-button" onClick={toggleImageModal} aria-label="Close">
                ✖
              </button>
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
              <strong>AWS</strong> (EC2, Lambda, API Gateway, S3), CI/CD pipelines
              (Jenkins, GitHub Actions), and containerization with Docker & Kubernetes.
            </p>
            <p>
              I love designing <strong>event-driven systems</strong> with Kafka and
              RabbitMQ, and I bring a data-driven mindset across PostgreSQL, MySQL, and
              MongoDB — applying indexing and partitioning strategies to dramatically cut
              query times. I care about clean architecture, great UX, and shipping value fast.
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
              {[...TECH_ICONS, ...TECH_ICONS].map((t, i) => (
                <img
                  key={i}
                  src={t.src}
                  alt={t.title}
                  title={t.title}
                  className={t.invertOnDark ? "tech-invert" : ""}
                />
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
            {SKILLS.map((group, i) => (
              <div className="skill-card reveal" key={group.title} style={{ transitionDelay: `${i * 80}ms` }}>
                <div className="skill-card-head">
                  <span className="skill-icon">{group.icon}</span>
                  <h3>{group.title}</h3>
                </div>
                <div className="skill-tags">
                  {group.items.map((item) => (
                    <span className="skill-tag" key={item}>{item}</span>
                  ))}
                </div>
              </div>
            ))}
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
                <div className="timeline-dot" />
                <div className="timeline-card">
                  <div className="timeline-top">
                    <h3>{job.role}</h3>
                    <span className="timeline-period">{job.period}</span>
                  </div>
                  <h4 className="timeline-company">{job.company}</h4>
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
            {PROJECTS.map((p, i) => (
              <article className="project-card reveal" key={p.title} style={{ transitionDelay: `${i * 100}ms` }}>
                <div className="project-banner" style={{ background: p.accent }}>
                  <span className="project-icon">{p.icon}</span>
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
            ))}
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
            {CONTACTS.map((c, i) => (
              <a
                key={c.label}
                href={c.href}
                target={c.href.startsWith("http") ? "_blank" : undefined}
                rel="noreferrer"
                className="contact-card reveal"
                style={{ transitionDelay: `${i * 80}ms` }}
              >
                <span className="contact-icon">{c.icon}</span>
                <span className="contact-meta">
                  <span className="contact-label">{c.label}</span>
                  <span className="contact-value">{c.value}</span>
                </span>
              </a>
            ))}
          </div>
          <div className="contact-cta reveal">
            <a href="mailto:mohanbabud25@gmail.com" className="btn btn-primary">
              ✉️ Say Hello
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

      {/* Floating helpers */}
      {showScrollTop && (
        <button className="scroll-to-top" onClick={scrollToTop} aria-label="Back to top">
          ↑
        </button>
      )}
      <a href="tel:+19782084167" className="contact-float" aria-label="Call me">
        📞<span>Call Me</span>
      </a>
    </div>
  );
}
