# tools/

Small utilities for maintaining the archive. No build step, no dependencies — these run on a
stock Node.js (≥ 18).

## `validate-entries.mjs`

Checks every capture under `entries/` against the frontmatter schema defined in
[../STRUCTURE.md](../STRUCTURE.md), so an entry can't drift out of spec without someone noticing.

```
node tools/validate-entries.mjs
```

Exit code `0` if every entry is valid, `1` if any entry has an **error**. Warnings are advisory
and never fail the run on their own.

### What it checks (errors)

- `subject.vendor`, `subject.product`, `subject.model`, `subject.surface` are present.
- `subject.surface` is one of `web-app | api | mobile | desktop | ide-extension | other`.
- `method` is one of the four acquisition tags.
- `captured` is present and ISO 8601 (`YYYY-MM-DD`).
- `accessed` is present and a valid date for `community-leaked` / `official-disclosure`.
- `confidence` is one of `high | medium | low`, and **not** `high` for `behavioral-inference`
  (the methodology forbids it).
- `reproduced` is `true | false | null`; `attempts` is an integer or `null`; `partial` is boolean.
- `sources` is present, and **non-empty** for `community-leaked` / `official-disclosure`; each
  listed source has a `url`.
- The body contains the required `## Provenance`, `## Prompt`, and `## Confidence` sections, plus
  `## Changes from previous capture` whenever `supersedes` is set.

### What it only warns about

- `subject.model_id` absent (should be `null` when unknown rather than omitted).
- Filename not matching `<YYYY-MM-DD>-<method>.md`, or filename method disagreeing with the
  frontmatter `method`.
- `accessed: null` on a method that should record an access date.

### What it deliberately does **not** check

It does not judge the *content* — whether a prompt is real, whether the provenance story is
convincing, whether the confidence is honest. Those are review questions for a human, and they are
the whole point of [../CONTRIBUTING.md](../CONTRIBUTING.md). The validator only enforces that an
entry is well-formed, so reviewers can spend their attention on the part that actually matters.

The parser is a small purpose-built reader for the constrained YAML subset the schema uses, not a
general YAML implementation; if the schema grows more complex, swap it for a real parser.
