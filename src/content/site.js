/* =====================================================================
   SITE CONTENT
   Everything a visitor reads lives here, separate from layout code.
   Edit freely — components render whatever is in these structures.

   Rule for this file: only verified facts. Anything that needs Mohan's
   input is marked with  TODO(mohan)  and is NOT rendered until filled.
   ===================================================================== */

export const PERSON = {
  name: "Mohan Babu Doddapaneni",
  first: "Mohan Babu",
  last: "Doddapaneni",
  short: "Mohan Babu D.",
  place: "Worcester, Massachusetts",
  placeShort: "Worcester, MA",
  timeZone: "America/New_York",
};

export const LINKS = {
  email: "mohanbabud25@gmail.com",
  phoneDisplay: "+1 (774) 701-0382",
  phoneHref: "tel:+17747010382",
  linkedin: "https://www.linkedin.com/in/mohan-babu-doddapaneni",
  linkedinHandle: "mohan-babu-doddapaneni",
  github: "https://github.com/mohan-babu-doddapaneni",
  githubHandle: "mohan-babu-doddapaneni",
  resume: `${process.env.PUBLIC_URL}/Mohan_Babu_Doddapaneni.pdf`,
};

export const NAV = [
  { id: "about", label: "About" },
  { id: "built", label: "Built" },
  { id: "journey", label: "Journey" },
  { id: "notes", label: "Notes" },
  { id: "connect", label: "Connect" },
];

/* ---------------------------------------------------------------- home */
export const HERO = {
  line: "I build software, explore ideas, and enjoy understanding how things work.",
  intro:
    "I’m a software engineer in Worcester, Massachusetts. Most of my work happens underneath products — data layers, APIs and the tools people use to run a platform — in Java, Spring Boot, Angular and React.",
  links: [
    { href: "#about", label: "About me" },
    { href: "#built", label: "Things I’ve built" },
    { href: "#notes", label: "Notes" },
  ],
};

/* ---------------------------------------------------------------- about */
export const ABOUT = {
  lead: "I started with circuits and signals, and ended up in the parts of software most people never see.",
  paragraphs: [
    // Every sentence below restates something from the original site.
    "My degree is in electronics and communication engineering. My first software role was at Wipro, on a compliance platform for a bank. Since then I’ve spent more than six years building production systems in Java, Spring Boot, Angular and React — at Capgemini, at Adobe on Creative Cloud, and now at Fenix Commerce, where I own the admin and data-access layer of a multi-tenant commerce platform.",
    "The work I’m strongest at is the kind that keeps a platform trustworthy at scale: pagination and caching that hold up at tens of millions of records, tenant isolation enforced in one place, and the quiet data bugs that dashboards never surface.",
  ],
  now: {
    label: "Day to day",
    text: "I use AI coding tools — Claude Code, GitHub Copilot and Cursor — every day, without letting speed cost quality. Every AI-assisted change still goes through code review, SonarQube and tests, and I wrote the prompt and review patterns my team follows.",
  },
  // TODO(mohan): how you got into technology, what you enjoy building outside
  // work, what you're exploring now. Add as extra paragraphs above.
};

/* ---------------------------------------------------------------- things I've built */
export const BUILT = [
  {
    id: "career-path",
    name: "Career Path Recommendation System",
    idea: "Read a résumé, predict where a career could go, and name the skills missing on the way.",
    about:
      "Parses résumés with NLP, predicts likely career paths, and names the skill gaps between where someone is and where they could go. Results are served over REST APIs, with profiles and scoring kept in PostgreSQL.",
    interesting:
      "It takes unstructured résumé text and turns it into structured data, then into predicted career paths and specific skill gaps.",
    flow: ["Résumé", "NLP parsing", "Path prediction", "Skill gaps", "REST API"],
    tech: ["Python", "Django", "NLP", "PostgreSQL", "REST"],
    link: { href: LINKS.github, kind: "profile" }, // TODO(mohan): replace with { href: "<repo url>", kind: "repo" }
  },
  {
    id: "restaurant-portal",
    name: "Restaurant Ordering Portal",
    idea: "An order should happen completely or not at all — even if a request is dropped or sent twice.",
    about:
      "An ordering portal with a normalized schema for menus, modifiers and orders. Built on Java, Angular and MySQL; it processed 300+ orders.",
    interesting:
      "Transactional placement means a dropped or duplicate request never leaves a partial order behind.",
    flow: ["Menu + modifiers", "Order request", "One transaction", "MySQL"],
    tech: ["Java", "Angular", "MySQL", "Transactions"],
    link: { href: LINKS.github, kind: "profile" }, // TODO(mohan): replace with { href: "<repo url>", kind: "repo" }
  },
];

/* ---------------------------------------------------------------- journey
   Ordered oldest → newest. `trace` is the short label used on the hero
   circuit. Dates are only shown when verified.                         */
export const JOURNEY = [
  {
    id: "jntu",
    kind: "study",
    trace: "JNTU",
    org: "JNTU Ananthapur",
    role: "B.Tech., Electronics & Communication Engineering",
    period: null, // TODO(mohan): graduation year
    place: "Andhra Pradesh, India",
    story: "Where it started: electronics and communication engineering, before software.",
  },
  {
    id: "wipro",
    kind: "work",
    trace: "Wipro",
    org: "Wipro",
    role: "Junior Full Stack Developer",
    period: "Jul 2019 — Aug 2020",
    place: "India",
    story: "A KYC and AML compliance platform for a banking client, built on Angular, Spring Boot and PostgreSQL.",
    highlights: [
      "Built KYC onboarding in Angular Reactive Forms with dynamic validation, supporting 5,000+ customer profiles.",
      "Reshaped Spring Boot JSON responses around what analysts actually needed, cutting AML alert review time 30%.",
      "Configured Spring Security across four KYC modules and designed review screens that made flagging suspicious activity 25% faster.",
      "Wrote the PostgreSQL queries behind analyst comments, risk scores and audit trails across 10,000+ transaction records.",
    ],
    tags: ["Angular", "Spring Boot", "Spring Security", "PostgreSQL"],
  },
  {
    id: "capgemini",
    kind: "work",
    trace: "Capgemini",
    org: "Capgemini",
    role: "Associate Consultant, Full Stack",
    period: "Sep 2020 — Jul 2023",
    place: "Hyderabad, India",
    story: "Enterprise Java, Spring Boot and React for financial-services and product-engineering clients — including security hardening and an 18-project migration ahead of a client deadline.",
    highlights: [
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
    id: "clark",
    kind: "study",
    trace: "Clark",
    org: "Clark University",
    role: "M.S., Computer Science",
    period: null, // TODO(mohan): dates (likely 2023 — 2024?) — confirm before showing
    place: "Worcester, Massachusetts",
    story: "A master’s degree in computer science.",
  },
  {
    id: "adobe",
    kind: "work",
    trace: "Adobe",
    org: "Adobe",
    role: "Full Stack Developer",
    period: "Sep 2024 — Jan 2026",
    place: "Massachusetts, USA",
    story: "Asset management and real-time collaboration inside Creative Cloud, on Spring Boot, React, Next.js and Kafka.",
    highlights: [
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
    id: "fenix",
    kind: "work",
    current: true,
    trace: "Fenix",
    org: "Fenix Commerce",
    role: "Product Development Engineer",
    period: "Jan 2026 — Present",
    place: "Worcester, MA",
    story: "I own the Business Console of a multi-tenant commerce platform — 40+ retailers, 12 modules, 2.5M+ orders a month.",
    highlights: [
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
];

/* ---------------------------------------------------------------- what I work with */
export const STACK = [
  { title: "Backend & systems", items: ["Java 8 / 17 / 21", "Spring Boot", "Spring Data JPA · Hibernate", "Spring Security · OAuth 2.0 / JWT", "REST & GraphQL", "Microservices", "Node.js · Express", "Python"] },
  { title: "Frontend & interfaces", items: ["Angular", "React", "Next.js", "TypeScript", "Redux", "Tailwind CSS", "Material UI"] },
  { title: "Cloud & infrastructure", items: ["AWS (ECS, Lambda, EC2)", "Docker", "Kubernetes", "Terraform", "Jenkins", "Git"] },
  { title: "Databases & data", items: ["PostgreSQL", "MySQL", "Elasticsearch", "MongoDB", "DynamoDB", "Redis", "Apache Kafka"] },
  { title: "Tools & experimentation", items: ["Claude Code", "GitHub Copilot", "Cursor", "OpenAI Codex", "SonarQube", "JUnit · Jest · Cypress"] },
];

export const CERTIFICATIONS = [
  "AWS Cloud Essentials",
  "Microsoft Azure Fundamentals (AZ-900)",
  "Java Cloud Native Developer, L1 & L2",
  "Python Automation Practitioner",
];

/* ---------------------------------------------------------------- beyond the code
   TODO(mohan): add real interests here, e.g.
   { title: "Photography", text: "…", href: "…" }
   While this list is empty, the section shows a clearly-marked
   "still being written" state instead of invented content.            */
export const BEYOND = [];

/* ---------------------------------------------------------------- connect */
export const CONNECT = {
  title: "Say hello.",
  text: "Have an interesting idea, something to share, or just want to say hello? I’d love to hear from you.",
};
