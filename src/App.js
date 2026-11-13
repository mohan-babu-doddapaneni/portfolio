import React, { useCallback, useEffect, useRef, useState } from "react";
import "./App.css";

// Self-hosted fonts — no third-party requests (privacy + strict CSP).
import "@fontsource-variable/fraunces/full.css";
import "@fontsource-variable/fraunces/full-italic.css";
import "@fontsource-variable/instrument-sans/index.css";
import "@fontsource/jetbrains-mono/400.css";
import "@fontsource/jetbrains-mono/500.css";

import {
  PERSON, LINKS, NAV, HERO, ABOUT, BUILT, JOURNEY, STACK, CERTIFICATIONS, BEYOND, CONNECT,
} from "./content/site";
import NOTES, { findNote } from "./content/notes";
import { renderMarkdown, readingMinutes } from "./lib/markdown";
import {
  prefersReducedMotion, safeStorage, initialTheme, useReveal, useMagnetic,
  useLocalTime, useActiveSection, useHashRoute, useBlueprint, useAnchorScrolling,
} from "./lib/hooks";
import Trace from "./components/Trace";

const SOURCE_URL = "https://github.com/mohan-babu-doddapaneni/portfolio";
const NAV_IDS = NAV.map((n) => n.id);
const pad2 = (n) => String(n).padStart(2, "0");

/* ------------------------------------------------------------------ bits */

const Arrow = ({ dir = "ne" }) => (
  <svg className={`arrow arrow--${dir}`} viewBox="0 0 24 24" aria-hidden="true" focusable="false">
    {dir === "ne" && <path d="M6 18 18 6M8 6h10v10" />}
    {dir === "e" && <path d="M4 12h15M13 6l6 6-6 6" />}
    {dir === "w" && <path d="M20 12H5M11 6l-6 6 6 6" />}
  </svg>
);

function SectionHead({ index, label, title, id, children }) {
  return (
    <div className="section-head">
      <div className="section-rule" data-reveal>
        <span className="mono">§ {index}</span>
        <span className="mono">{label}</span>
      </div>
      <h2 className="section-title" id={id} data-reveal>
        {title}
      </h2>
      {children}
    </div>
  );
}

/* ------------------------------------------------------------------ journey */

function Journey() {
  const listRef = useRef(null);
  const [open, setOpen] = useState(() => new Set());

  // Fill the trace and light up each pad as the reader moves down the timeline.
  useEffect(() => {
    const list = listRef.current;
    if (!list) return undefined;
    let raf = 0;
    const update = () => {
      raf = 0;
      const r = list.getBoundingClientRect();
      const mark = window.innerHeight * 0.55;
      const p = Math.min(1, Math.max(0, (mark - r.top) / r.height));
      list.style.setProperty("--fill", p.toFixed(4));
      list.querySelectorAll(".stop").forEach((li) => {
        const pad = li.querySelector(".stop__pad");
        if (pad) li.classList.toggle("is-passed", pad.getBoundingClientRect().top < mark);
      });
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  const toggle = (id) =>
    setOpen((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });

  // newest first reads better in a personal timeline
  const stops = [...JOURNEY].reverse();

  return (
    <ol className="timeline" ref={listRef}>
      {stops.map((s) => {
        const isOpen = open.has(s.id);
        const hasMore = s.highlights && s.highlights.length > 0;
        return (
          <li key={s.id} id={`journey-${s.id}`} className={`stop stop--${s.kind} ${s.current ? "is-current" : ""}`} data-reveal>
            <div className="stop__when mono">
              <span>{s.period || (s.kind === "study" ? "Study" : "")}</span>
              <span className="stop__place">{s.place}</span>
            </div>
            <span className="stop__pad" aria-hidden="true" />
            <div className="stop__body">
              <h3 className="stop__org">
                {s.org}
                {s.current && <span className="stop__now mono">Now</span>}
              </h3>
              <p className="stop__role">{s.role}</p>
              <p className="stop__story">{s.story}</p>
              {hasMore && (
                <>
                  <button
                    type="button"
                    className="stop__toggle mono"
                    aria-expanded={isOpen}
                    aria-controls={`stop-more-${s.id}`}
                    onClick={() => toggle(s.id)}
                  >
                    <span className="stop__plus" aria-hidden="true" />
                    {isOpen ? "Hide details" : `Details · ${pad2(s.highlights.length)}`}
                    <span className="sr-only"> for {s.org}</span>
                  </button>
                  <div className="stop__more" id={`stop-more-${s.id}`}>
                    <div className="stop__more-inner" inert={!isOpen}>
                      <ul className="stop__points">
                        {s.highlights.map((h) => (
                          <li key={h.slice(0, 48)}>{h}</li>
                        ))}
                      </ul>
                      <ul className="tags" aria-label="Technologies">
                        {s.tags.map((t) => (
                          <li key={t}>{t}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </>
              )}
            </div>
          </li>
        );
      })}
    </ol>
  );
}

/* ------------------------------------------------------------------ note reader */

function NoteView({ slug }) {
  const note = findNote(slug);
  const headingRef = useRef(null);
  const idx = NOTES.findIndex((n) => n.slug === slug);
  const prev = idx > 0 ? NOTES[idx - 1] : null;
  const next = idx >= 0 && idx < NOTES.length - 1 ? NOTES[idx + 1] : null;

  useEffect(() => {
    window.scrollTo(0, 0);
    if (headingRef.current) headingRef.current.focus({ preventScroll: true });
    const prevTitle = document.title;
    document.title = note ? `${note.title} — ${PERSON.name}` : `Note not found — ${PERSON.name}`;
    return () => {
      document.title = prevTitle;
    };
  }, [slug, note]);

  if (!note) {
    return (
      <article className="note-page wrap">
        <a href="#notes" className="back mono">
          <Arrow dir="w" /> All notes
        </a>
        <h1 className="note-page__title" tabIndex={-1} ref={headingRef}>
          That note doesn’t exist.
        </h1>
        <p className="note-page__lede">It may have been renamed. The full list is on the home page.</p>
      </article>
    );
  }

  return (
    <article className="note-page wrap" aria-labelledby="note-title">
      <a href="#notes" className="back mono">
        <Arrow dir="w" /> All notes
      </a>
      <header className="note-page__head">
        {note.context && <p className="mono note-page__context">{note.context}</p>}
        <h1 className="note-page__title" id="note-title" tabIndex={-1} ref={headingRef}>
          {note.title}
        </h1>
        <p className="note-page__lede">{note.summary}</p>
        <p className="note-page__meta mono">
          {note.date && (
            <>
              <time dateTime={note.date}>
                {new Date(`${note.date}T12:00:00`).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })}
              </time>
              {" · "}
            </>
          )}
          {readingMinutes(note.body)} min read · {note.tags.join(" · ")}
        </p>
      </header>
      <div className="prose">{renderMarkdown(note.body)}</div>
      <nav className="note-page__nav" aria-label="More notes">
        {prev ? (
          <a href={`#/notes/${prev.slug}`} className="pager pager--prev">
            <span className="mono">Previous</span>
            <span className="pager__title">{prev.title}</span>
          </a>
        ) : (
          <span />
        )}
        {next && (
          <a href={`#/notes/${next.slug}`} className="pager pager--next">
            <span className="mono">Next</span>
            <span className="pager__title">{next.title}</span>
          </a>
        )}
      </nav>
    </article>
  );
}

/* ------------------------------------------------------------------ home */

function Home() {
  return (
    <>
      {/* ---------------------------------------------- HERO */}
      <section id="top" className="hero" aria-labelledby="hero-name">
        <div className="wrap">
          <p className="hero__meta mono load load--1">Software engineer · {PERSON.placeShort}</p>

          <h1 id="hero-name" className="hero__name">
            <span className="line">
              <span className="line__in">{PERSON.first}</span>
            </span>
            <span className="line">
              <span className="line__in">
                <em>{PERSON.last}</em>
              </span>
            </span>
          </h1>

          <div className="hero__grid">
            <div className="hero__text">
              <p className="hero__line load load--2">{HERO.line}</p>
              <p className="hero__intro load load--3">{HERO.intro}</p>
              <ul className="hero__links load load--4">
                {HERO.links.map((l) => (
                  <li key={l.href}>
                    <a href={l.href} className="textlink" data-magnetic>
                      {l.label} <Arrow dir="e" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <figure className="portrait load load--5">
              <div className="portrait__frame">
                <img
                  src={`${process.env.PUBLIC_URL}/assets/portrait.webp`}
                  srcSet={`${process.env.PUBLIC_URL}/assets/portrait-sm.webp 320w, ${process.env.PUBLIC_URL}/assets/portrait.webp 640w`}
                  sizes="(max-width: 640px) 34vw, 230px"
                  width="640"
                  height="800"
                  alt={`Portrait of ${PERSON.name}`}
                  decoding="async"
                  fetchPriority="high"
                />
              </div>
            </figure>
          </div>
        </div>

        <div className="hero__trace load load--6">
          <div className="wrap">
            <div className="trace-caption mono">
              <span>Circuits → systems</span>
              <span className="trace-caption__hint">Select a stop to jump to it</span>
            </div>
            <Trace stops={JOURNEY} />
          </div>
        </div>
      </section>

      {/* ---------------------------------------------- ABOUT */}
      <section id="about" className="section" aria-labelledby="about-title">
        <div className="wrap">
          <SectionHead index="01" label="About" title={ABOUT.lead} id="about-title" />
          <div className="about">
            <div className="about__body" data-reveal>
              {ABOUT.paragraphs.map((p) => (
                <p key={p.slice(0, 32)}>{p}</p>
              ))}
            </div>
            <aside className="about__now" data-reveal aria-label={ABOUT.now.label}>
              <p className="mono">{ABOUT.now.label}</p>
              <p>{ABOUT.now.text}</p>
            </aside>
          </div>
        </div>
      </section>

      {/* ---------------------------------------------- BUILT */}
      <section id="built" className="section" aria-labelledby="built-title">
        <div className="wrap">
          <SectionHead index="02" label="Projects" title="Things I’ve built" id="built-title" />
          <div className="builds">
            {BUILT.map((b, i) => (
              <article key={b.id} className={`build ${i % 2 ? "build--flip" : ""}`} data-reveal aria-labelledby={`build-${b.id}`}>
                <div className="build__main">
                  <span className="build__num mono">{pad2(i + 1)}</span>
                  <h3 className="build__name" id={`build-${b.id}`}>
                    {b.name}
                  </h3>
                  <p className="build__idea">
                    <span className="mono">The idea</span>
                    {b.idea}
                  </p>
                  <p className="build__about">{b.about}</p>
                  <p className="build__interesting">
                    <span className="mono">Why it’s interesting</span>
                    {b.interesting}
                  </p>
                  <ul className="tags" aria-label="Technologies">
                    {b.tech.map((t) => (
                      <li key={t}>{t}</li>
                    ))}
                  </ul>
                  <a className="textlink build__link" href={b.link.href} target="_blank" rel="noopener noreferrer">
                    {b.link.label} <Arrow />
                    <span className="sr-only"> (opens in a new tab)</span>
                  </a>
                </div>
                <figure className="build__flow" aria-label={`How it works: ${b.flow.join(", then ")}`}>
                  <figcaption className="mono">How it flows</figcaption>
                  <ol>
                    {b.flow.map((step, j) => (
                      <li key={step} style={{ "--j": j }}>
                        <span className="mono build__step">{pad2(j + 1)}</span>
                        {step}
                      </li>
                    ))}
                  </ol>
                </figure>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------------------------------------- JOURNEY */}
      <section id="journey" className="section" aria-labelledby="journey-title">
        <div className="wrap">
          <SectionHead index="03" label="2019 — now" title="My journey" id="journey-title">
            <p className="section-sub" data-reveal>
              From electronics to enterprise software to platform engineering. Newest first — open any stop for the details.
            </p>
          </SectionHead>
          <Journey />
        </div>
      </section>

      {/* ---------------------------------------------- WORK WITH */}
      <section id="stack" className="section" aria-labelledby="stack-title">
        <div className="wrap">
          <SectionHead index="04" label="Tools" title="What I work with" id="stack-title" />
          <div className="stack">
            {STACK.map((g, i) => (
              <div className="stack__col" key={g.title} data-reveal style={{ "--i": i }}>
                <h3 className="mono">{g.title}</h3>
                <ul>
                  {g.items.map((it) => (
                    <li key={it}>{it}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="certs" data-reveal>
            <h3 className="mono">Certifications</h3>
            <ul>
              {CERTIFICATIONS.map((c) => (
                <li key={c}>{c}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ---------------------------------------------- NOTES */}
      <section id="notes" className="section section--ink" aria-labelledby="notes-title">
        <div className="wrap">
          <SectionHead index="05" label="Writing" title="Notes" id="notes-title">
            <p className="section-sub" data-reveal>
              Short write-ups of problems worth remembering. The first ones come from production; new notes will appear
              here as I write them.
            </p>
          </SectionHead>
          {NOTES.length > 0 ? (
            <ol className="notes-list">
              {NOTES.map((n, i) => (
                <li key={n.slug} data-reveal style={{ "--i": i }}>
                  <a href={`#/notes/${n.slug}`} className="note-row">
                    <span className="note-row__num mono">No. {pad2(i + 1)}</span>
                    <span className="note-row__main">
                      <span className="note-row__title">{n.title}</span>
                      <span className="note-row__summary">{n.summary}</span>
                    </span>
                    <span className="note-row__meta mono">
                      {readingMinutes(n.body)} min read
                      <span className="note-row__go">
                        Read <Arrow dir="e" />
                      </span>
                    </span>
                  </a>
                </li>
              ))}
            </ol>
          ) : (
            <p className="empty" data-reveal>
              Nothing published yet — the first note is on its way.
            </p>
          )}
        </div>
      </section>

      {/* ---------------------------------------------- BEYOND */}
      <section id="beyond" className="section" aria-labelledby="beyond-title">
        <div className="wrap">
          <SectionHead index="06" label="Off the clock" title="Beyond the code" id="beyond-title" />
          {BEYOND.length > 0 ? (
            <ul className="beyond">
              {BEYOND.map((b) => (
                <li key={b.title} data-reveal>
                  <h3>{b.title}</h3>
                  <p>{b.text}</p>
                </li>
              ))}
            </ul>
          ) : (
            <div className="beyond-empty" data-reveal>
              <p className="mono beyond-empty__tag">Under construction</p>
              <p className="beyond-empty__text">
                This corner is still being written. It will hold the things that don’t fit on a résumé — and I’d rather
                leave it blank than fill it with something that isn’t true.
              </p>
            </div>
          )}
        </div>
      </section>
    </>
  );
}

/* ------------------------------------------------------------------ app */

let greeted = false;

export default function App() {
  const [theme, setTheme] = useState(initialTheme);
  const [menuOpen, setMenuOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [showTop, setShowTop] = useState(false);
  const menuBtnRef = useRef(null);
  const menuRef = useRef(null);
  const progressRef = useRef(null);

  const route = useHashRoute();
  const routeKey = route.view === "note" ? `note:${route.slug}` : "home";
  const time = useLocalTime(PERSON.timeZone);
  const active = useActiveSection(NAV_IDS, routeKey);
  const [blueprint] = useBlueprint();
  useReveal(routeKey);
  useMagnetic(routeKey);
  useAnchorScrolling(route.view === "home");

  // A hello for anyone who opens the console.
  useEffect(() => {
    if (greeted) return;
    greeted = true;
    // eslint-disable-next-line no-console
    console.info(
      "%cHello, curious engineer.%c\nType “blueprint” anywhere on the page to see the grid this site is built on (Esc to exit).\nSource: " +
        SOURCE_URL,
      "font: 600 14px Georgia, serif; color: #d9441f",
      "font: 12px ui-monospace, monospace; color: inherit"
    );
  }, []);

  // Apply theme to <html> so CSS variables cascade everywhere.
  useEffect(() => {
    const root = document.documentElement;
    root.dataset.theme = theme;
    root.style.colorScheme = theme;
    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute("content", theme === "dark" ? "#141210" : "#efe9de");
  }, [theme]);

  // Returning from a note to "#about" etc.: scroll once the home view exists.
  useEffect(() => {
    if (route.view !== "home") return;
    const id = window.location.hash.slice(1);
    if (!id) return;
    const el = document.getElementById(id);
    if (el) requestAnimationFrame(() => el.scrollIntoView({ behavior: "instant", block: "start" }));
  }, [route.view]);

  const toggleTheme = (e) => {
    const next = theme === "dark" ? "light" : "dark";
    safeStorage.set("theme", next);
    if (!document.startViewTransition || prefersReducedMotion()) {
      setTheme(next);
      return;
    }
    const r = e.currentTarget.getBoundingClientRect();
    const x = r.left + r.width / 2;
    const y = r.top + r.height / 2;
    const radius = Math.hypot(Math.max(x, window.innerWidth - x), Math.max(y, window.innerHeight - y));
    const vt = document.startViewTransition(() => {
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

  // Scroll progress + back-to-top (progress written to the DOM, no re-render per frame).
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

  // Mobile menu: lock scroll, close on Escape, trap focus, restore focus.
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
        await navigator.clipboard.writeText(LINKS.email);
        ok = true;
      }
    } catch {
      ok = false;
    }
    if (!ok) {
      const ta = document.createElement("textarea");
      ta.value = LINKS.email;
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
      window.location.href = `mailto:${LINKS.email}`;
    }
  };

  const year = new Date().getFullYear();
  const onNote = route.view === "note";

  return (
    <>
      <a
        href="#main"
        className="skip-link"
        onClick={(e) => {
          // don't change the hash — that would leave an open note
          e.preventDefault();
          const main = document.getElementById("main");
          if (main) main.focus();
        }}
      >
        Skip to content
      </a>
      <div className="grain" aria-hidden="true" />
      <div className="progress" ref={progressRef} aria-hidden="true" />

      {/* ------------------------------------------------ NAV */}
      <header className={`nav ${menuOpen ? "nav--open" : ""}`}>
        <div className="nav__inner">
          <a href="#top" className="wordmark" onClick={() => closeMenu()} aria-label={`${PERSON.short} — home`}>
            <span className="wordmark__mark" aria-hidden="true" />
            <span className="wordmark__text">
              {PERSON.first}
              <span className="wordmark__dim"> D.</span>
            </span>
          </a>

          <nav className="nav__links" aria-label="Primary">
            {NAV.map((n, i) => (
              <a
                key={n.id}
                href={`#${n.id}`}
                className={!onNote && active === n.id ? "is-active" : ""}
                aria-current={!onNote && active === n.id ? "true" : undefined}
              >
                <span className="mono nav__num">{pad2(i + 1)}</span>
                {n.label}
              </a>
            ))}
          </nav>

          <div className="nav__tools">
            <span className="nav__clock mono" title="My local time">
              {PERSON.placeShort} · {time}
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
                  <span className="mono">{pad2(i + 1)}</span>
                  {n.label}
                </a>
              </li>
            ))}
          </ol>
        </nav>
        <div className="sheet__foot mono">
          <a href={`mailto:${LINKS.email}`}>{LINKS.email}</a>
          <a href={LINKS.phoneHref}>{LINKS.phoneDisplay}</a>
        </div>
      </div>

      <main id="main" tabIndex={-1}>
        {onNote ? <NoteView slug={route.slug} /> : <Home />}

        {/* ------------------------------------------------ CONNECT */}
        <section id="connect" className="connect" aria-labelledby="connect-title">
          <div className="wrap">
            <div className="section-rule" data-reveal>
              <span className="mono">§ 07</span>
              <span className="mono">Connect</span>
            </div>
            <h2 id="connect-title" className="connect__title" data-reveal>
              {CONNECT.title}
            </h2>
            <p className="connect__lede" data-reveal>
              {CONNECT.text}
            </p>

            <div className="connect__email" data-reveal>
              <a href={`mailto:${LINKS.email}`} className="email-link">
                {LINKS.email}
              </a>
              <button type="button" className="copy-btn mono" onClick={copyEmail} data-magnetic>
                {copied ? "Copied ✓" : "Copy"}
              </button>
              <span className="sr-only" role="status" aria-live="polite">
                {copied ? "Email address copied to clipboard" : ""}
              </span>
            </div>

            <ul className="connect__list" data-reveal>
              <li>
                <span className="mono">LinkedIn</span>
                <a href={LINKS.linkedin} target="_blank" rel="noopener noreferrer">
                  {LINKS.linkedinHandle}
                  <span className="sr-only"> (opens in a new tab)</span>
                </a>
              </li>
              <li>
                <span className="mono">GitHub</span>
                <a href={LINKS.github} target="_blank" rel="noopener noreferrer">
                  {LINKS.githubHandle}
                  <span className="sr-only"> (opens in a new tab)</span>
                </a>
              </li>
              <li>
                <span className="mono">Phone</span>
                <a href={LINKS.phoneHref}>{LINKS.phoneDisplay}</a>
              </li>
              <li>
                <span className="mono">Résumé</span>
                <a href={LINKS.resume} download="Mohan_Babu_Doddapaneni.pdf">
                  PDF download
                </a>
              </li>
            </ul>
          </div>

          <footer className="footer wrap">
            <span className="mono">© {year} {PERSON.name}</span>
            <a className="mono footer__src" href={SOURCE_URL} target="_blank" rel="noopener noreferrer">
              View source<span className="sr-only"> (opens in a new tab)</span>
            </a>
            <span className="mono">
              {PERSON.placeShort} · {time}
            </span>
          </footer>
        </section>

        <button
          type="button"
          className={`to-top ${showTop ? "is-shown" : ""}`}
          aria-label="Back to top"
          tabIndex={showTop ? 0 : -1}
          onClick={() => {
            window.scrollTo({ top: 0, behavior: prefersReducedMotion() ? "auto" : "smooth" });
            const target = document.querySelector(".wordmark");
            if (target) target.focus({ preventScroll: true });
          }}
        >
          <span aria-hidden="true">↑</span>
        </button>
      </main>

      {blueprint && (
        <div className="blueprint-layer" aria-hidden="true">
          <div className="wrap blueprint-cols">
            {Array.from({ length: 12 }, (_, i) => (
              <span key={i} />
            ))}
          </div>
        </div>
      )}
      <p className="sr-only" role="status" aria-live="polite">
        {blueprint ? "Blueprint mode on. Press Escape to exit." : ""}
      </p>
      {blueprint && <p className="blueprint-badge mono">Blueprint · 12 cols · Esc to exit</p>}
    </>
  );
}
