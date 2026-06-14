# Repository structure

How The Brief is laid out, how an entry file is named, and the frontmatter schema every entry must use. Read this alongside [CONTRIBUTING.md](CONTRIBUTING.md) — that document covers *what makes a capture acceptable*; this one covers *where it goes and what shape it takes*.

---

## Layout

```
The Brief/
├── README.md              # what the project is
├── CONTRIBUTING.md        # how to contribute, acquisition methods
├── STRUCTURE.md           # this file
├── reference/             # project-internal notes and source material
└── entries/
    ├── TEMPLATE.md        # copy this to start a new capture
    └── <vendor>/
        └── <model>/
            ├── 2026-01-10-self-extracted.md
            ├── 2026-03-22-self-extracted.md
            └── 2026-05-04-community-leaked.md
```

One file = one capture. A model accumulates files over time; the newest does not replace the oldest.

### Slugs

- `<vendor>` and `<model>` are lowercase kebab-case: `anthropic`, `openai`, `claude-3-5-sonnet`, `gpt-4o`.
- Use the **product/model name as marketed**, not an internal codename, unless the codename is all that's known.
- If a vendor ships the same model on multiple surfaces (web app, API, mobile) with different prompts, those are **different captures**, distinguished by the `surface` field — not different model folders.

### File names

```
<YYYY-MM-DD>-<method>.md
```

- `<YYYY-MM-DD>` — the capture date (ISO 8601). For `community-leaked`, use the **original** capture date when known; record the access date in frontmatter.
- `<method>` — the full acquisition tag: `self-extracted`, `community-leaked`, `official-disclosure`, `behavioral-inference`.
- If two captures share a date and method, append `-2`, `-3`, etc.: `2026-05-04-self-extracted-2.md`.

The filename is greppable on its own: you can see the date and the method without opening the file.

---

## Frontmatter schema

Every entry begins with a YAML frontmatter block. Required keys are marked **required**; use `null` for an optional value you genuinely don't have rather than omitting the key.

```yaml
---
subject:
  vendor: Anthropic              # required — company
  product: Claude.ai             # required — product/surface name as marketed
  model: claude-3-5-sonnet       # required — model name, slug form
  surface: web-app               # required — web-app | api | mobile | desktop | ide-extension | other
  model_id: claude-3-5-sonnet-20241022   # exact version string if the surface exposes one, else null

method: self-extracted           # required — one of the four acquisition tags
captured: 2026-06-14             # required — ISO 8601 date this capture was produced
accessed: null                   # required for community-leaked / official-disclosure — date you retrieved it

confidence: high                 # required — high | medium | low
reproduced: true                 # did the capture reproduce across attempts? true | false | null
attempts: 3                      # how many elicitation attempts (self-extracted), else null

supersedes: 2026-03-22-self-extracted.md   # prior capture this one follows, or null
partial: false                   # true if the prompt is incomplete / excerpted

sources:                         # required for community-leaked & official-disclosure; [] otherwise
  - url: https://example.com/post
    author: handle-or-name       # null if unknown
    original_date: 2026-05-01    # when the source captured it, null if unknown
---
```

### Field notes

- **`method`** is the single most important field. It must match exactly one of the four tags and must be consistent with the body's provenance section.
- **`confidence`** is your honest assessment, not a default. `high` requires either reproduction or an official source. Inference is rarely above `medium`.
- **`reproduced` / `attempts`** apply mainly to `self-extracted`. A `false` or low-`attempts` capture is allowed — it just must say so here and in the body.
- **`supersedes`** links the chronological chain. The first capture of a model has `supersedes: null`. Each later capture points to the immediately prior one by filename.
- **`partial`** must be `true` if any part of the prompt is missing, redacted, or uncertain. Mark the gaps in the body too.
- **`sources`** is mandatory for `community-leaked` and `official-disclosure`. An empty list (`[]`) is only valid for `self-extracted` and `behavioral-inference`.

---

## Body sections

After the frontmatter, an entry uses these sections in this order. See [entries/TEMPLATE.md](entries/TEMPLATE.md) for the copyable skeleton.

1. **`# <Vendor> <Model> — <surface>`** — title line.
2. **`## Provenance`** — the method-specific evidence required by CONTRIBUTING.md. This is what reviewers read first.
3. **`## Prompt`** — the captured text, verbatim, in a fenced block. No cleanup. Mark redactions as `[REDACTED: reason]` and omissions as `[…omitted: reason]`.
4. **`## Confidence`** — what's solid, what isn't, what didn't reproduce.
5. **`## Changes from previous capture`** — required when `supersedes` is non-null. A fenced `diff` block (or prose, if a diff is unreadable) showing what changed since the prior capture. Omit this section entirely for a first capture.
6. **`## Notes`** — optional, trailing. Use for caveats a reader needs up front: most importantly, when an `official-disclosure` is a policy or specification rather than an actual system prompt, flag that here in plain terms. Also handy for cross-references to related captures.

---

## Diffs and history

The history of a prompt is part of the record (see README). Two mechanisms preserve it:

- **The chronological file chain** — every capture is its own dated file; `supersedes` links them in order. Nothing is overwritten.
- **The `## Changes from previous capture` section** — the human-readable diff lives *inside* the newer entry, so the change is visible even outside version control.

If this repository is under git, commit history is a third layer — but the diff section must still exist in-file, because the record should be readable without git.
