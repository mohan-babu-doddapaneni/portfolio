import React, { useState } from "react";
import "./App.css";

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [showImageModal, setShowImageModal] = useState(false);

  const handleMenuToggle = () => setMenuOpen(!menuOpen);
  const handleLinkClick = () => setMenuOpen(false);
  const toggleImageModal = () => setShowImageModal(!showImageModal);

  return (
    <div className="App dark-theme">
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
        </div>
      </nav>

      <main className="main-content">
        <header id="home" className="header fade-in">
          <div className="container">
            <img
              src={process.env.PUBLIC_URL + "/assets/profile.jpg"}
              alt="Mohan Babu"
              className="profile-img"
              onClick={toggleImageModal}
            />

            {showImageModal && (
              <div className="modal-overlay" onClick={toggleImageModal}>
                <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                  <button className="close-button" onClick={toggleImageModal}>✖</button>
                  <img
                    src={process.env.PUBLIC_URL + "/assets/profile.jpg"}
                    alt="Full Profile"
                    className="full-image"
                  />
                </div>
              </div>
            )}
            <h1>Mohan Babu Doddapaneni</h1>
            <p>Full Stack Developer | Java, Spring Boot, React, AWS</p>
            <div className="contact-links">
              <a href="mailto:doddapanenimohanbabu3@gmail.com">Gmail</a>
              <span> | </span>
              <a href="https://linkedin.com/in/mohan-babu-doddapaneni" target="_blank" rel="noreferrer">LinkedIn</a>
              <span> | </span>
              <a href="https://github.com/mohan-babu-doddapaneni" target="_blank" rel="noreferrer">GitHub</a>
            </div>
          </div>
        </header>

        <section id="about" className="about container fade-in">
          <h2>About Me</h2>
          <p>
            Full Stack Developer with 5+ years of experience building scalable, secure, and cloud-native web applications using Java, Spring Boot, React, and AWS. Strong focus on REST APIs, microservices, and DevOps with Docker and Jenkins.
          </p>
        </section>

        <section id="skills" className="skills container fade-in">
          <h2>Technical Skills</h2>
          <ul>
            <li><strong>Frontend:</strong> React.js, Angular, JavaScript, TypeScript, HTML5, CSS3, Tailwind CSS</li>
            <li><strong>Backend:</strong> Java, Spring Boot, REST APIs, GraphQL, Node.js</li>
            <li><strong>Databases:</strong> PostgreSQL, MySQL, MongoDB</li>
            <li><strong>Cloud/DevOps:</strong> AWS, Azure, Docker, Jenkins, GitHub Actions</li>
            <li><strong>Testing:</strong> JUnit, Cypress, Postman, Swagger</li>
            <li><strong>Other:</strong> Kafka, Redis, Git, GitHub, Linux</li>
          </ul>
        </section>

        <section id="experience" className="experience container fade-in">
          <h2>Experience</h2>
          <div className="job">
            <h3>Athenahealth – Full Stack Developer (Sep 2024 – Present)</h3>
            <ul>
              <li>Developed microservices with Spring Boot and React-based frontend for patient tracking</li>
              <li>Integrated Kafka and JWT auth, deployed on AWS with CI/CD using Jenkins</li>
            </ul>
          </div>
          <div className="job">
            <h3>Capgemini – Associate Consultant (Sep 2020 – Jul 2023)</h3>
            <ul>
              <li>Built Angular apps, implemented RxJS state management, optimized REST API handling</li>
              <li>Led CI/CD migrations and won “Pat on Back” award</li>
            </ul>
          </div>
          <div className="job">
            <h3>Birlasoft – Jr. Full Stack Developer (Jul 2019 – Aug 2020)</h3>
            <ul>
              <li>Contributed to KYC apps with Angular, Spring Boot, and PostgreSQL optimization</li>
            </ul>
          </div>
        </section>

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
          <p>Email: <a href="mailto:doddapanenimohanbabu3@gmail.com">doddapanenimohanbabu3@gmail.com</a></p>
          <p>LinkedIn: <a href="https://linkedin.com/in/mohan-babu-doddapaneni" target="_blank" rel="noreferrer">@mohan-babu-doddapaneni</a></p>
          <p>GitHub: <a href="https://github.com/mohan-babu-doddapaneni" target="_blank" rel="noreferrer">@mohan-babu-doddapaneni</a></p>
        </section>
      </main>

      <footer className="container">
        <p>&copy; 2025 Mohan Babu. All rights reserved.</p>
      </footer>
    </div>
  );
}