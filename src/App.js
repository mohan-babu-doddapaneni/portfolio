import React from "react";
import "./App.css";

export default function App() {
  return (
    <div className="App dark-theme">
      <nav className="navbar">
        <div className="nav-container">
          <h1 className="nav-logo">Mohan Babu</h1>
          <ul className="nav-links">
            <li><a href="#top">Home</a></li>
            <li><a href="#about">About</a></li>
            <li><a href="#skills">Skills</a></li>
            <li><a href="#experience">Experience</a></li>
            <li><a href="#projects">Projects</a></li>
            <li><a href="#contact">Contact</a></li>
          </ul>
        </div>
      </nav>

      <main className="main-content">
        <header id="top" className="header fade-in">
          <div className="container">
            <img
              src={process.env.PUBLIC_URL + "/assets/profile.jpg"}
              alt="Mohan Babu Doddapaneni"
              className="profile-img"
            />
            <h1>Mohan Babu Doddapaneni</h1>
            <p>Java Full Stack Developer | Angular, Java, Spring Boot</p>
            <div className="contact-links">
              <a href="mailto:doddapanenimohanbabu3@gmail.com">Gmail</a>
              <span> | </span>
              <a href="https://in.linkedin.com/in/mohan-babu-doddapaneni" target="_blank" rel="noreferrer">LinkedIn</a>
              <span> | </span>
              <a href="https://github.com/mohan-babu-doddapaneni/" target="_blank" rel="noreferrer">GitHub</a>
            </div>
          </div>
        </header>

        <section id="about" className="about container fade-in">
          <h2>About Me</h2>
          <p>
            Full Stack Developer with 3+ years of experience in building scalable,
            secure, and responsive web applications using Angular, Java, Spring
            Boot, and MySQL. Passionate about AI-driven development, REST APIs,
            microservices, and Agile methodologies.
          </p>
        </section>

        <section id="skills" className="skills container fade-in">
          <h2>Technical Skills</h2>
          <ul>
            <li><strong>Frontend:</strong> Angular, React, JavaScript, TypeScript, HTML5, CSS3, Bootstrap</li>
            <li><strong>Backend:</strong> Java, Spring Boot, Django, Node.js, REST APIs</li>
            <li><strong>Databases:</strong> MySQL, PostgreSQL, MongoDB</li>
            <li><strong>Programming:</strong> Java, Python, SQL</li>
            <li><strong>Tools:</strong> Git, GitHub, SVN, CVS, VS Code, Eclipse, STS, Postman</li>
            <li><strong>Cloud & Deployment:</strong> Render, Azure Fundamentals (AZ-900), CI/CD Basics</li>
            <li><strong>ML/NLP:</strong> Scikit-learn, pandas, NumPy, spaCy, Random Forest</li>
            <li><strong>Certifications:</strong> Azure Fundamentals, Java Cloud Native Developer (Lv 1 & 2)</li>
          </ul>
        </section>

        <section id="experience" className="experience container fade-in">
          <h2>Experience</h2>
          <div className="job">
            <h3>Capgemini – Associate Consultant (Oct 2022 – Jul 2023)</h3>
            <ul>
              <li>Built scalable Angular web apps with 90% reduction in vulnerabilities</li>
              <li>Integrated APIs and enhanced deployment efficiency by 45%</li>
              <li>Led mobile-first UI/UX and improved app performance by 25%</li>
              <li>Migrated all Java projects to Maven; recognized with PAT ON BACK award</li>
            </ul>
          </div>
          <div className="job">
            <h3>Senior Software Engineer (Oct 2021 – Sep 2022)</h3>
            <ul>
              <li>Designed Spring MVC applications and resolved 80+ issues</li>
              <li>Conducted security workshops and code reviews</li>
              <li>Mentored junior developers and modernized legacy stacks</li>
            </ul>
          </div>
          <div className="job">
            <h3>Software Engineer (Mar 2021 – Sep 2021)</h3>
            <ul>
              <li>Managed 80+ change requests and error-free deployments</li>
              <li>Trained in Git, CVS, SVN and Agile processes</li>
            </ul>
          </div>
          <div className="job">
            <h3>Analyst (Sep 2020 – Feb 2021)</h3>
            <ul>
              <li>Trained in Full Stack Java and certified in Python Automation</li>
              <li>Mastered frontend fundamentals: HTML, CSS, JavaScript</li>
            </ul>
          </div>
        </section>

        <section id="projects" className="projects container fade-in">
          <h2>Projects</h2>
          <div className="project">
            <h3>Career Path Recommendation System</h3>
            <p>AI-powered Django app that analyzes resumes and predicts career paths using NLP and Random Forest. Integrated with PostgreSQL and deployed on Render.</p>
          </div>
          <div className="project">
            <h3>Restaurant Ordering Portal</h3>
            <p>Angular and Java-based portal for 300+ concurrent orders. Designed fully responsive UI and seamless backend integration.</p>
          </div>
        </section>

        <section id="contact" className="contact-links">
          <h2>Contact</h2>
          <p>Email: <a href="mailto:doddapanenimohanbabu3@gmail.com">doddapanenimohanbabu3@gmail.com</a></p>
          <p>LinkedIn: <a href="https://in.linkedin.com/in/mohan-babu-doddapaneni" target="_blank" rel="noreferrer">@mohan-babu-doddapaneni</a></p>
          <p>Github: <a href="https://github.com/mohan-babu-doddapaneni/" target="_blank" rel="noreferrer">@mohan-babu-doddapaneni</a></p>
        </section>
      </main>

      <footer className="container">
        <p>&copy; 2025 Mohan Babu Doddapaneni. All rights reserved.</p>
      </footer>
    </div>
  );
}