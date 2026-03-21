import React, { useState, useEffect } from "react";
import "./App.css";

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [showImageModal, setShowImageModal] = useState(false);
  const [isDarkTheme, setIsDarkTheme] = useState(true);
  const [showScrollTop, setShowScrollTop] = useState(false);

  const handleMenuToggle = () => setMenuOpen(!menuOpen);
  const handleLinkClick = () => setMenuOpen(false);
  const toggleImageModal = () => setShowImageModal(!showImageModal);
  const toggleTheme = () => setIsDarkTheme(!isDarkTheme);

  useEffect(() => {
    document.body.className = isDarkTheme ? "" : "light-theme";
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isDarkTheme]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className={`App ${isDarkTheme ? "dark-theme" : "light-theme"}`}>
      <nav className="navbar">
        <div className="nav-container">
          <h1 className="nav-logo">
            <a href="#" onClick={handleLinkClick}>Mohan Babu Doddapaneni</a>
          </h1>
          <div className="menu-icon" onClick={handleMenuToggle}>
            <span>{menuOpen ? "✖" : "☰"}</span>
          </div>
          <ul className={`nav-links ${menuOpen ? "active" : ""}`}>
            <li><a href="#home" onClick={handleLinkClick}>Home</a></li>
            <li><a href="#about" onClick={handleLinkClick}>About</a></li>
            <li><a href="#skills" onClick={handleLinkClick}>Skills</a></li>
            <li><a href="#experience" onClick={handleLinkClick}>Experience</a></li>
            <li><a href="#projects" onClick={handleLinkClick}>Projects</a></li>
            <li><a href="#contact" onClick={handleLinkClick}>Contact</a></li>
          </ul>
          <button className="theme-toggle" onClick={toggleTheme}>
            {isDarkTheme ? "☀️ Light" : "🌙 Dark"}
          </button>
        </div>
      </nav>

      <main className="main-content">
        <header id="home" className="header fade-in">
          <div className="container">
            <img
              src={process.env.PUBLIC_URL + "/assets/profile.png"}
              alt="Mohan Babu"
              className="profile-img"
              onClick={toggleImageModal}
            />

            {showImageModal && (
              <div className="modal-overlay" onClick={toggleImageModal}>
                <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                  <button className="close-button" onClick={toggleImageModal}>✖</button>
                  <img
                    src={process.env.PUBLIC_URL + "/assets/profile.png"}
                    alt="Full Profile"
                    className="full-image"
                  />
                </div>
              </div>
            )}
            <h1>Mohan Babu Doddapaneni</h1>
            <p className="headline">Full Stack Developer (5+ yrs) · Java, Spring Boot, React/Angular, AWS · Microservices & Event‑Driven Systems</p>
            <div className="icon-row">
              <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg" alt="Java" title="Java" />
              <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" alt="React" title="React" />
              <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/spring/spring-original.svg" alt="Spring Boot" title="Spring Boot" />
              <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg" alt="Docker" title="Docker" />
              <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg" className={`github-icon ${isDarkTheme ? "dark-mode" : ""}`} alt="GitHub" />
              <img
                src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original-wordmark.svg"
                alt="AWS"
                className={`aws-icon ${isDarkTheme ? 'dark-mode' : ''}`}
              />
            </div>
            <div className="contact-links">
              <a href="mailto:mohanbabud25@gmail.com">Gmail</a>
              <span> | </span>
              <a href="tel:+19782084167">+1 (978) 208-4167</a>
              <span> | </span>
              <a href="https://linkedin.com/in/mohan-babu-doddapaneni" target="_blank" rel="noreferrer">LinkedIn</a>
              <span> | </span>
              <a href="https://github.com/mohan-babu-doddapaneni" target="_blank" rel="noreferrer">GitHub</a>
            </div>
            <button
              className="resume-download"
              onClick={() => {
                const link = document.createElement("a");
                link.href = `${process.env.PUBLIC_URL}/Mohan_Babu_Doddapaneni.pdf`;
                link.download = "Mohan_Babu_Doddapaneni.pdf";
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
              }}
            >
              📄 Download Resume
            </button>
          </div>
        </header>

        <section id="about" className="about container fade-in">
          <h2>About Me</h2>
          <p>
            Full Stack Developer delivering scalable, high‑performance apps with Java/Spring Boot microservices and React/Angular UIs. Strong with AWS (EC2, Lambda, API Gateway, S3), CI/CD (Jenkins, GitHub Actions), containers (Docker, Kubernetes), and event‑driven patterns (Kafka, RabbitMQ). Data‑driven mindset across PostgreSQL/MySQL/MongoDB with indexing & partitioning to cut query times.
          </p>
        </section>

        <section id="skills" className="skills container fade-in">
          <h2>Technical Skills</h2>
          <ul>
            <li><strong>Frontend:</strong> React, Redux, Angular, TypeScript, JavaScript (ES6+), HTML5, CSS3, Tailwind, Material‑UI, Next.js</li>
            <li><strong>Backend:</strong> Java (8–17), Spring Boot, Spring MVC, Spring Data JPA, Hibernate, Microservices, REST/GraphQL, Node.js/Express</li>
            <li><strong>Databases:</strong> PostgreSQL, MySQL, MongoDB, DynamoDB, Redis</li>
            <li><strong>Cloud/DevOps:</strong> AWS (EC2, S3, API Gateway, Lambda, CloudFormation), Docker, Kubernetes, CI/CD (Jenkins, GitHub Actions), Terraform</li>
            <li><strong>Messaging:</strong> Kafka, RabbitMQ</li>
            <li><strong>Security & Testing:</strong> Spring Security, OAuth2, JWT · JUnit, Mockito, Jest, Cypress</li>
            <li><strong>Tools:</strong> Git/GitHub/Bitbucket, Postman, IntelliJ, VS Code, Jira, Agile/Scrum</li>
          </ul>
        </section>

        <section id="experience" className="experience container fade-in">
          <h2>Experience</h2>
          <div className="job">
            <h3>Adobe Inc — Full Stack Developer (Sept 2024 – Present)</h3>
            <ul>
              <li>Architected cloud‑native asset & collaboration services using Java + Spring Boot microservices; accelerated feature delivery by ~50%.</li>
              <li>Built modern React/Next.js UIs with Tailwind; improved engagement and reduced UI errors via telemetry‑driven fixes.</li>
              <li>Implemented event‑driven workflows with Kafka/WebSockets for real‑time notifications and collaboration.</li>
            </ul>
          </div>
          <div className="job">
            <h3>Capgemini — Associate Consultant, Full Stack (Sept 2020 – Jul 2023)</h3>
            <ul>
              <li>Delivered REST APIs with Spring Boot & Node.js; cut API latency ~50% and created Swagger‑based API portal.</li>
              <li>Built React/Angular features and inventory modules; integrated SQL stores (PostgreSQL/MySQL).</li>
              <li>Deployed on AWS (EC2, Auto Scaling, LB); improved uptime by ~20% with CI/CD via Jenkins/GitHub Actions.</li>
            </ul>
          </div>
          <div className="job">
            <h3>Wipro — Jr. Full Stack Developer (Jul 2019 – Aug 2020)</h3>
            <ul>
              <li>Developed KYC onboarding modules in Angular + Spring Boot with RBAC; accelerated reviews by ~25%.</li>
              <li>Optimized PostgreSQL queries for AML trails and analyst workflows handling 10k+ transactions.</li>
              <li>Contributed across Agile ceremonies; strengthened foundations in Git, Maven, and REST integrations.</li>
            </ul>
          </div>
        </section>

        {/* Projects section intentionally unchanged as requested */}
        <section id="projects" className="projects container fade-in">
          <h2>Projects</h2>
          <div className="project">
            <h3>Career Path Recommendation System</h3>
            <p>AI-powered app built with Django and NLP to suggest careers from resumes. Deployed on Render with PostgreSQL.</p>
          </div>
          <div className="project">
            <h3>Restaurant Ordering Portal</h3>
            <p>Angular & Java food order portal handling 300+ concurrent users. Built responsive UI and real-time backend.</p>
          </div>
        </section>

        <section id="contact" className="contact-links">
          <h2>Contact</h2>
          <p>Email: <a href="mailto:mohanbabud25@gmail.com">mohanbabud25@gmail.com</a></p>
          <p>Phone: <a href="tel:+19782084167">+1 (978) 208-4167</a></p>
          <p>LinkedIn: <a href="https://linkedin.com/in/mohan-babu-doddapaneni" target="_blank" rel="noreferrer">@mohan-babu-doddapaneni</a></p>
          <p>GitHub: <a href="https://github.com/mohan-babu-doddapaneni" target="_blank" rel="noreferrer">@mohan-babu-doddapaneni</a></p>
        </section>

        {showScrollTop && (
          <button className="scroll-to-top" onClick={scrollToTop}>↑</button>
        )}

        <a href="tel:+19782084167" className="contact-float" aria-label="Call Me">
          📞 <span>Call Me</span>
        </a>
      </main>

      <footer className="container">
        <p>&copy; {new Date().getFullYear()} Mohan Babu. All rights reserved.</p>
      </footer>
    </div>
  );
}
