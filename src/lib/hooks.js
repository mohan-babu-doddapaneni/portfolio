import { useEffect, useState } from "react";

export const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  !!window.matchMedia &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export const safeStorage = {
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
      /* storage unavailable (private mode, blocked cookies) — ignore */
    }
  },
};

export function initialTheme() {
  // theme-init.js has usually set this already, before first paint
  const preset = document.documentElement.dataset.theme;
  if (preset === "light" || preset === "dark") return preset;
  const saved = safeStorage.get("theme");
  if (saved === "light" || saved === "dark") return saved;
  return window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

/** Adds `.is-in` to [data-reveal] elements as they enter the viewport.
 *  `dep` re-scans the DOM when the page view changes (home ↔ note).      */
export function useReveal(dep) {
  useEffect(() => {
    const els = Array.from(document.querySelectorAll("[data-reveal]:not(.is-in)"));
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

    // Safety net for anchor jumps, flings and iOS momentum scrolling:
    // anything already above the fold line is revealed even if IO missed it.
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
    onScroll();
    return () => {
      io.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("hashchange", onScroll);
      cancelAnimationFrame(raf);
    };
  }, [dep]);
}

/** Elements with [data-magnetic] lean slightly toward a fine pointer. */
export function useMagnetic(dep) {
  useEffect(() => {
    if (!window.matchMedia || !window.matchMedia("(hover: hover) and (pointer: fine)").matches || prefersReducedMotion()) {
      return undefined;
    }
    const els = Array.from(document.querySelectorAll("[data-magnetic]"));
    const cleanups = els.map((el) => {
      const move = (e) => {
        const r = el.getBoundingClientRect();
        const x = (e.clientX - (r.left + r.width / 2)) * 0.2;
        const y = (e.clientY - (r.top + r.height / 2)) * 0.3;
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
        el.style.transform = "";
      };
    });
    return () => cleanups.forEach((fn) => fn());
  }, [dep]);
}

export function useLocalTime(timeZone) {
  const format = () =>
    new Intl.DateTimeFormat("en-US", { hour: "numeric", minute: "2-digit", timeZone }).format(new Date());
  const [time, setTime] = useState(format);
  useEffect(() => {
    const id = setInterval(() => setTime(format()), 20000);
    return () => clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timeZone]);
  return time;
}

export function useActiveSection(ids, dep) {
  const [active, setActive] = useState("");
  useEffect(() => {
    setActive("");
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
  }, [ids, dep]);
  return active;
}

/** Tiny hash router: "#/notes/<slug>" opens a note, anything else is home. */
function parseHash() {
  const m = window.location.hash.match(/^#\/notes\/([a-z0-9-]+)\/?$/i);
  return m ? { view: "note", slug: m[1].toLowerCase() } : { view: "home", slug: null };
}

export function useHashRoute() {
  const [route, setRoute] = useState(parseHash);
  useEffect(() => {
    const onHash = () => setRoute(parseHash());
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);
  return route;
}

/** Easter egg: type "blueprint" anywhere to toggle the layout grid.
 *  A multi-key sequence (not a single key) so it can't collide with
 *  screen-reader or browser shortcuts. Escape turns it off.          */
export function useBlueprint() {
  const [on, setOn] = useState(false);
  useEffect(() => {
    const word = "blueprint";
    let buffer = "";
    const onKey = (e) => {
      const t = e.target;
      if (t && (t.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(t.tagName))) return;
      if (e.key === "Escape") {
        setOn(false);
        return;
      }
      if (e.key.length !== 1 || e.metaKey || e.ctrlKey || e.altKey) return;
      buffer = (buffer + e.key.toLowerCase()).slice(-word.length);
      if (buffer === word) {
        buffer = "";
        setOn((v) => !v);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);
  useEffect(() => {
    document.documentElement.classList.toggle("blueprint", on);
  }, [on]);
  return [on, setOn];
}

/** In-page anchor links, done reliably.
 *  Safari can cut a long smooth scroll short when the page updates styles
 *  mid-scroll (our timeline does). We scroll ourselves, then verify where we
 *  landed and correct once it settles. Focus moves to the target section so
 *  keyboard and screen-reader users land in the right place too.          */
export function useAnchorScrolling(enabled) {
  useEffect(() => {
    if (!enabled) return undefined;
    let timer = 0;

    const offsetFor = (el) => parseFloat(getComputedStyle(el).scrollMarginTop) || 0;
    const targetY = (el) => window.scrollY + el.getBoundingClientRect().top - offsetFor(el);

    const go = (el, behavior) => {
      window.clearTimeout(timer);
      window.scrollTo({ top: targetY(el), behavior });
      let last = -1;
      let stable = 0;
      let tries = 0;
      const check = () => {
        tries++;
        const y = window.scrollY;
        stable = Math.abs(y - last) < 1 ? stable + 1 : 0;
        last = y;
        if (stable >= 2) {
          // settled: correct if we stopped short (or the layout moved)
          if (Math.abs(el.getBoundingClientRect().top - offsetFor(el)) > 4) {
            window.scrollTo({ top: targetY(el), behavior: "auto" });
          }
          return;
        }
        if (tries < 60) timer = window.setTimeout(check, 80);
      };
      timer = window.setTimeout(check, 120);
    };

    const onClick = (e) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const a = e.target.closest && e.target.closest('a[href^="#"]');
      if (!a) return;
      const href = a.getAttribute("href");
      if (href.length < 2 || href.startsWith("#/")) return; // routes are handled by the hash router
      const el = document.getElementById(href.slice(1));
      if (!el) return; // not on this view — let the router take it
      e.preventDefault();
      if (window.location.hash !== href) window.history.pushState(null, "", href);
      go(el, prefersReducedMotion() ? "auto" : "smooth");
      if (!el.hasAttribute("tabindex")) el.setAttribute("tabindex", "-1");
      el.focus({ preventScroll: true });
    };

    document.addEventListener("click", onClick);
    return () => {
      document.removeEventListener("click", onClick);
      window.clearTimeout(timer);
    };
  }, [enabled]);
}
