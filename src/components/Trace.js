import React, { useMemo } from "react";
import { prefersReducedMotion } from "../lib/hooks";

/* "Circuits to systems": a PCB-style trace that routes through every stop
   of the journey (data comes from JOURNEY in content/site.js). A signal
   pulse travels along it. With motion disabled it is a static diagram.  */

function subLabel(stop) {
  if (stop.period) {
    const y = stop.period.match(/\d{4}/);
    return y ? y[0] : "";
  }
  return stop.kind === "study" ? stop.role.split(",")[0] : "";
}

/** Build an orthogonal route with 45° chamfers between pads. */
function buildRoute(xs, y, jogs, inset, chamfer) {
  let d = `M ${xs[0] - inset * 1.4} ${y} H ${xs[0]}`;
  for (let i = 0; i < xs.length - 1; i++) {
    const a = xs[i];
    const b = xs[i + 1];
    const jy = y + jogs[i % jogs.length];
    const s1 = a + inset;
    const e2 = b - inset;
    d += ` H ${s1} L ${s1 + chamfer} ${jy} H ${e2 - chamfer} L ${e2} ${y} H ${b}`;
  }
  d += ` H ${xs[xs.length - 1] + inset * 0.9}`;
  return d;
}

function TraceSvg({ stops, variant }) {
  const desktop = variant === "desktop";
  const W = desktop ? 1200 : 360;
  const H = desktop ? 150 : 124;
  const y = desktop ? 58 : 62;
  const left = desktop ? 92 : 26;
  const right = W - left;
  const xs = stops.map((_, i) => left + ((right - left) * i) / (stops.length - 1));
  const route = useMemo(
    () => buildRoute(xs, y, desktop ? [-34, 34] : [-16, 16], desktop ? 52 : 14, desktop ? 26 : 9),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [variant, stops.length]
  );
  const pathId = `trace-route-${variant}`;
  const animate = !prefersReducedMotion();
  const padR = desktop ? 7 : 4.5;

  return (
    <svg
      className={`trace trace--${variant}`}
      viewBox={`0 0 ${W} ${H}`}
      preserveAspectRatio="xMidYMid meet"
      role={desktop ? "group" : undefined}
      aria-label={desktop ? "My journey at a glance. Each stop links to its place in My Journey." : undefined}
      aria-hidden={desktop ? undefined : "true"}
      focusable="false"
    >
      {/* faint underlay, then the drawn copper trace */}
      <path d={route} className="trace__bed" />
      <path id={pathId} d={route} className="trace__line" pathLength="1" />

      {/* a couple of stubs ending in vias, purely for texture */}
      {desktop && (
        <g className="trace__stubs" aria-hidden="true">
          <path d={`M ${(xs[1] + xs[2]) / 2} ${y + 34} V ${y + 62} H ${(xs[1] + xs[2]) / 2 + 30}`} />
          <rect x={(xs[1] + xs[2]) / 2 + 30} y={y + 58} width="8" height="8" />
          <path d={`M ${(xs[3] + xs[4]) / 2} ${y - 34} V ${y - 50} H ${(xs[3] + xs[4]) / 2 - 26}`} />
          <rect x={(xs[3] + xs[4]) / 2 - 34} y={y - 54} width="8" height="8" />
        </g>
      )}

      {animate && (
        <circle className="trace__pulse" r={desktop ? 4 : 3}>
          <animateMotion dur={desktop ? "9s" : "7s"} repeatCount="indefinite" rotate="auto" begin="1.6s">
            <mpath href={`#${pathId}`} />
          </animateMotion>
        </circle>
      )}

      {stops.map((s, i) => {
        const x = xs[i];
        const up = !desktop && i % 2 === 1; // mobile: alternate labels above/below
        const pad = (
          <>
            {s.current && <circle className="trace__ring" cx={x} cy={y} r={padR + 5} />}
            <circle className={`trace__pad ${s.kind === "study" ? "is-study" : ""}`} cx={x} cy={y} r={padR} />
            <text className="trace__label" x={x} y={desktop ? y + 44 : up ? y - 30 : y + 36} textAnchor="middle">
              {s.trace}
            </text>
            <text className="trace__sub" x={x} y={desktop ? y + 62 : up ? y - 19 : y + 47} textAnchor="middle">
              {subLabel(s)}
            </text>
          </>
        );
        return desktop ? (
          <a key={s.id} href={`#journey-${s.id}`} className="trace__stop">
            <title>{`${s.org} — ${s.role}${s.period ? `, ${s.period}` : ""}`}</title>
            {/* generous invisible hit area */}
            <rect x={x - 46} y={y - 22} width="92" height="94" className="trace__hit" />
            {pad}
          </a>
        ) : (
          <g key={s.id}>{pad}</g>
        );
      })}
    </svg>
  );
}

export default function Trace({ stops }) {
  return (
    <div className="trace-wrap">
      <TraceSvg stops={stops} variant="desktop" />
      <TraceSvg stops={stops} variant="mobile" />
    </div>
  );
}
