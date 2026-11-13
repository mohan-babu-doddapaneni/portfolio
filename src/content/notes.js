/* =====================================================================
   NOTES
   Each note is plain Markdown in `body`. Supported syntax (see
   src/lib/markdown.js): ## / ### headings, paragraphs, - lists,
   1. lists, > quotes, ``` code blocks, **bold**, *italic*, `code`,
   and [links](https://…).

   To publish a new note, add an object to the TOP of this array:
   {
     slug: "url-friendly-id",          // becomes #/notes/url-friendly-id
     title: "Title",
     date: "2026-11-20",               // optional, ISO format
     context: "Where this came from",  // optional one-liner
     summary: "One or two sentences for the list.",
     tags: ["Architecture"],
     body: `Markdown here…`,
   }

   The four notes below are written up from incidents already described
   on the original site (Fenix Commerce, 2026). No details were added, and
   the employer is not named in the notes themselves.
   TODO(mohan): add your own "what I learned" paragraph to each if you like.
   ===================================================================== */

const ALL_NOTES = [
  {
    slug: "the-silent-ceiling",
    title: "The silent ceiling",
    context: "From a multi-tenant commerce platform I work on",
    summary: "Inventory totals were quietly wrong for our largest tenants. Nothing was failing — a default limit was doing exactly what it was told.",
    tags: ["Elasticsearch", "Data correctness"],
    body: `## Symptom

Tenants with large catalogs were seeing inventory totals that were quietly wrong. Nothing failed loudly; the numbers just didn't add up.

## Cause

The query path never set \`trackTotalHits\`, so Elasticsearch silently capped aggregations at its engine default. Every large-catalog tenant was reading a fraction of its own data.

## Fix

I rebuilt the query path on **heap-safe cursor traversal**: the full result set is streamed in constant memory instead of being collected in one request.

## Result

Accurate reporting above **6M products**.`,
  },
  {
    slug: "the-missing-stack-trace",
    title: "The missing stack trace",
    context: "From a multi-tenant commerce platform I work on",
    summary: "Real-time ingestion stalled in the middle of a 1.4M-event holiday surge, and the JVM was hiding the one clue that mattered.",
    tags: ["JVM", "Incidents"],
    body: `## Symptom

Real-time event ingestion stalled during a **1.4M-event holiday surge**. Retries piled up, but the logs didn't explain why.

## Cause

An unguarded parsing exception was being thrown repeatedly. After enough repetitions, the JVM's **fast-throw optimization** started reusing a pre-allocated exception without a stack trace — so the real failure was invisible exactly when it mattered most.

## Fix

- Hardened the parser.
- Added failure logging that survives the optimization.
- Drained the backlog.

## Result

Event flow restored under peak load.`,
  },
  {
    slug: "the-leak-in-the-inbox",
    // DRAFT — not published. Describes a data-exposure incident at a current
    // employer. TODO(mohan): confirm you're comfortable (and allowed) to
    // publish this before setting draft: false.
    draft: true,
    title: "The leak in the inbox",
    context: "From a multi-tenant commerce platform I work on",
    summary: "Internal data was showing up in merchant panels and customer emails. The fix was a boundary, not a patch.",
    tags: ["Multi-tenancy", "Caching"],
    body: `## Symptom

Internal data was surfacing in merchant panels and in customer emails.

## Cause

A limitation in a third-party API pushed internal fields onto tenant-facing surfaces.

## Fix

A server-side cache keyed on **SHA-256 composite hashes** sits at the boundary and walls internal data off from anything a tenant or customer can see.

## Result

**Sub-20 ms** lookups, with no measurable added latency.`,
  },
  {
    slug: "the-table-that-ate-the-browser",
    title: "The table that ate the browser",
    context: "From a multi-tenant commerce platform I work on",
    summary: "Screens for the largest tenants were unusable, because the browser was being asked to do the database's job.",
    tags: ["Architecture", "Performance"],
    body: `## Symptom

Console screens for the largest tenants were unusable.

## Cause

The console pulled whole tables into the browser and filtered them client-side. That works for a small tenant and fails completely for a big one.

## Fix

A **server-side pagination and filtering contract** across Spring Boot and Elasticsearch, with virtual scrolling and lazy loading on the client.

## Result

Views over **tens of millions of records** now open in seconds, inside a fixed memory budget.`,
  },
];

// Drafts are never rendered and their URLs don't resolve.
const NOTES = ALL_NOTES.filter((n) => !n.draft);

export default NOTES;

export function findNote(slug) {
  return NOTES.find((n) => n.slug === slug) || null;
}
