---
subject:
  vendor:                 # required — company, e.g. Anthropic
  product:                # required — product/surface name as marketed, e.g. Claude.ai
  model:                  # required — model name in slug form, e.g. claude-3-5-sonnet
  surface:                # required — web-app | api | mobile | desktop | ide-extension | other
  model_id: null          # exact version string if exposed, else null

method:                   # required — self-extracted | community-leaked | official-disclosure | behavioral-inference
captured:                 # required — ISO 8601 date this capture was produced, e.g. 2026-06-14
accessed: null            # required for community-leaked / official-disclosure — date retrieved

confidence:               # required — high | medium | low
reproduced: null          # true | false | null
attempts: null            # integer for self-extracted, else null

supersedes: null          # filename of prior capture, or null for a first capture
partial: false            # true if the prompt is incomplete / excerpted / redacted

sources: []               # required for community-leaked & official-disclosure; [] otherwise
  # - url:
  #   author: null
  #   original_date: null
---

# <Vendor> <Model> — <surface>

## Provenance

<!--
Document exactly how this capture was obtained. The required evidence depends on `method`
(see CONTRIBUTING.md). At minimum:

- self-extracted:      the exact elicitation prompt/technique, interface, model id,
                       date, and whether it reproduced (and over how many attempts).
- community-leaked:    link to the original source, original + access dates, author,
                       and any reason to doubt it.
- official-disclosure: direct link to the official source, publication date, and the
                       exact scope disclosed (full / excerpt / paraphrase).
- behavioral-inference: the experiments and behaviors, which parts are quoted vs inferred,
                       confidence, and ruled-out alternatives.

If you cannot explain how this was obtained, do not submit it.
-->

## Prompt

<!--
Verbatim. Do not clean up, reformat, or "fix" anything. Preserve whitespace, typos, and
ordering. Mark redactions as [REDACTED: reason] and omissions as […omitted: reason].
If `partial: true`, say what's missing.
-->

```text

```

## Confidence

<!--
Your honest assessment. What's solid, what isn't, what didn't reproduce, what you're
unsure about. Do not overstate — an entry that claims more certainty than the evidence
supports will be sent back.
-->

## Changes from previous capture

<!--
REQUIRED only when `supersedes` is non-null. Delete this whole section for a first capture.
Show what changed since the prior capture as a diff (or prose if a diff is unreadable).
-->

```diff

```
