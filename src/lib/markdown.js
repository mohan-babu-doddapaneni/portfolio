import React from "react";

/* A deliberately small Markdown renderer for the Notes section.
   It produces React elements directly — no innerHTML — so note content
   can never inject markup or scripts, and the strict CSP stays intact.

   Blocks:  ## h2, ### h3, paragraphs, - / * lists, 1. lists, > quotes,
            ``` fenced code ```
   Inline:  **bold**, *italic*, `code`, [text](href)
   Links:   only http(s), mailto, tel and in-page (#) hrefs are kept.   */

const SAFE_HREF = /^(https?:\/\/|mailto:|tel:|#)/i;

function renderInline(text, keyBase) {
  const out = [];
  // order matters: code first so its contents are not parsed further
  const re = /(`[^`]+`)|(\*\*[^*]+\*\*)|(\*[^*\s][^*]*\*)|(\[[^\]]+\]\([^)\s]+\))/g;
  let last = 0;
  let m;
  let i = 0;
  while ((m = re.exec(text)) !== null) {
    if (m.index > last) out.push(text.slice(last, m.index));
    const tok = m[0];
    const key = `${keyBase}-${i++}`;
    if (m[1]) {
      out.push(<code key={key}>{tok.slice(1, -1)}</code>);
    } else if (m[2]) {
      out.push(<strong key={key}>{renderInline(tok.slice(2, -2), key)}</strong>);
    } else if (m[3]) {
      out.push(<em key={key}>{renderInline(tok.slice(1, -1), key)}</em>);
    } else if (m[4]) {
      const [, label, href] = tok.match(/^\[([^\]]+)\]\(([^)\s]+)\)$/);
      if (SAFE_HREF.test(href)) {
        const external = /^https?:/i.test(href);
        out.push(
          <a key={key} href={href} {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
            {renderInline(label, key)}
          </a>
        );
      } else {
        out.push(label);
      }
    }
    last = m.index + tok.length;
  }
  if (last < text.length) out.push(text.slice(last));
  return out;
}

export function renderMarkdown(source) {
  const lines = String(source || "").replace(/\r\n?/g, "\n").split("\n");
  const blocks = [];
  let i = 0;
  let k = 0;

  while (i < lines.length) {
    const line = lines[i];

    if (!line.trim()) {
      i++;
      continue;
    }

    // fenced code
    if (/^```/.test(line)) {
      const lang = line.slice(3).trim();
      const buf = [];
      i++;
      while (i < lines.length && !/^```/.test(lines[i])) buf.push(lines[i++]);
      i++; // closing fence
      blocks.push(
        <pre key={k++} data-lang={lang || undefined}>
          <code>{buf.join("\n")}</code>
        </pre>
      );
      continue;
    }

    // headings (## and ### only — the note title is the page's h1)
    const h = line.match(/^(#{2,3})\s+(.*)$/);
    if (h) {
      const Tag = h[1].length === 2 ? "h2" : "h3";
      blocks.push(<Tag key={k++}>{renderInline(h[2], `h${k}`)}</Tag>);
      i++;
      continue;
    }

    // lists
    if (/^\s*([-*]|\d+\.)\s+/.test(line)) {
      const ordered = /^\s*\d+\.\s+/.test(line);
      const items = [];
      while (i < lines.length && /^\s*([-*]|\d+\.)\s+/.test(lines[i])) {
        items.push(lines[i].replace(/^\s*([-*]|\d+\.)\s+/, ""));
        i++;
      }
      const Tag = ordered ? "ol" : "ul";
      const listKey = k++;
      blocks.push(
        <Tag key={listKey}>
          {items.map((it, j) => (
            <li key={j}>{renderInline(it, `l${listKey}-${j}`)}</li>
          ))}
        </Tag>
      );
      continue;
    }

    // blockquote
    if (/^>\s?/.test(line)) {
      const buf = [];
      while (i < lines.length && /^>\s?/.test(lines[i])) buf.push(lines[i++].replace(/^>\s?/, ""));
      blocks.push(<blockquote key={k++}>{renderInline(buf.join(" "), `q${k}`)}</blockquote>);
      continue;
    }

    // paragraph: gather until blank line or another block start
    const buf = [];
    while (
      i < lines.length &&
      lines[i].trim() &&
      !/^(#{2,3}\s|```|>\s?|\s*([-*]|\d+\.)\s+)/.test(lines[i])
    ) {
      buf.push(lines[i++].trim());
    }
    blocks.push(<p key={k++}>{renderInline(buf.join(" "), `p${k}`)}</p>);
  }

  return blocks;
}

/** Rough reading time, for the notes list. */
export function readingMinutes(source) {
  const words = String(source || "").trim().split(/\s+/).length;
  return Math.max(1, Math.round(words / 220));
}
