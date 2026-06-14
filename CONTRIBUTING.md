# Contributing to The Brief

Thank you for wanting to add to the record. Before you open a PR, read this in full. We decline submissions that can't explain how the prompt was obtained — that rule is not negotiable, and most rejected PRs are rejected for it.

This document covers: the one rule that matters most, how to classify your acquisition method, what an entry must contain, how we handle versions and diffs, and what we will not accept.

---

## The one rule

**Every capture must document how it was obtained.** Provenance is the product. A perfectly accurate prompt with no explanation of where it came from is worth less to us than a partial prompt with a clear, reproducible acquisition story.

If you cannot or will not explain the method, do not submit. We would rather have a gap in the record than an unverifiable entry that looks authoritative.

---

## Acquisition methods

Every entry is tagged with exactly one primary method. Pick the one that describes how *this specific capture* was produced. If your capture combined methods, tag the primary one and describe the rest in the provenance notes.

### `self-extracted`
You obtained the prompt yourself by interacting with the model — prompting it to reveal its instructions, exploiting a leak, or otherwise eliciting the text directly from the system under study.

For techniques, ethics, and limitations of this method, see [methodology/self-extraction.md](methodology/self-extraction.md).

You must include:
- The exact prompt(s) / technique used to elicit it
- The interface and model identifier (e.g. web app vs. API, model version string if shown)
- Date and, where possible, time zone of capture
- Whether the output reproduced across multiple attempts, and how many

Self-extraction is the strongest method when it reproduces. A single un-reproduced extraction is acceptable but must say so.

### `community-leaked`
The prompt was obtained by someone else and you are transcribing or citing their capture. You did not produce it yourself.

You must include:
- A link to the original source (post, gist, repo, thread)
- The original capture date if known, and the date you accessed it
- The original author/handle where attribution is possible
- Any reason to doubt the source, stated plainly

You are responsible for the credibility of a source you cite. "Someone posted it" is not provenance. If the original source itself has no acquisition story, treat it as `behavioral-inference` at best, or don't submit it.

### `official-disclosure`
The vendor published the prompt themselves — in documentation, a blog post, a paper, a release, or an in-product disclosure.

You must include:
- A direct link to the official source
- The publication date
- The exact scope of what was disclosed (full prompt? excerpt? paraphrase?), because vendors often disclose partials

This is the highest-confidence method, but note that an official disclosure may not match what the model is *actually* run with. Flag any discrepancy you can observe.

### `behavioral-inference`
The prompt text is not directly available; you are reconstructing it from observed model behavior. This is the weakest method and the entry must say so loudly.

For probing techniques and how to gauge evidence strength, see [methodology/behavioral-inference.md](methodology/behavioral-inference.md).

You must include:
- The behaviors observed and the experiments that produced them
- Which parts are quoted/extracted vs. inferred — never present inference as quotation
- Confidence level and the main alternative explanations you ruled out

Inference entries are documented as inference. Never blur the line between "the model said this" and "the model behaves as if told this."

---

## What an entry must contain

The repository layout, file-naming convention, and full frontmatter schema live in [STRUCTURE.md](STRUCTURE.md). Start every new capture by copying [entries/TEMPLATE.md](entries/TEMPLATE.md). Check [entries/README.md](entries/README.md) first for what's already captured, so you don't duplicate a model and date already on file. This section covers the substance reviewers check; STRUCTURE.md covers the exact format.

Each entry is a single document for one model/version/capture. At minimum:

1. **Subject** — the model and the surface it was running on (vendor, product name, interface, model identifier if known).
2. **Acquisition method** — one of the four tags above.
3. **Date** — capture date in ISO 8601 (`YYYY-MM-DD`). For `community-leaked`, both original and access dates.
4. **Provenance notes** — the method-specific evidence listed above. This is the part reviewers scrutinize first.
5. **The prompt** — verbatim. Use a fenced block. Do not clean up, reformat, or "fix" the text; preserve whitespace, typos, and ordering as captured. Mark any redactions or omissions explicitly.
6. **Confidence statement** — your honest assessment, including anything that didn't reproduce or that you're unsure about.

When the source is uncertain, the entry says so. An entry that overstates its own confidence will be sent back regardless of how interesting the prompt is.

---

## Versions and diffs

System prompts change. The history is part of the record.

- If you are capturing a model that already has an entry, **do not overwrite it.** Add a new dated capture and preserve the prior one.
- When a prompt changes between captures, the **diff is preserved** — show what changed, not just the new text.
- Captures of the same subject are ordered by date so the evolution is readable.

A later capture never erases an earlier one. We are documenting change over time, not maintaining a single "current" snapshot.

---

## What we will not accept

- Submissions with no acquisition story.
- Inference presented as direct quotation.
- Cited leaks whose original source has no provenance.
- Prompts "cleaned up," paraphrased, or partially reconstructed without saying so.
- Bulk dumps of many prompts with one shared, vague explanation. One verified capture is worth ten dubious dumps — submit accordingly.
- Overconfident confidence statements that the evidence doesn't support.

---

## Review

Expect reviewers to push on provenance before anything else. The most common request is "explain how you got this, specifically." If your PR description already answers that question completely, review will be fast.

The standard is methodology, not volume. Help us keep it that way.
