# Methodology: self-extraction

Reference for the `self-extracted` acquisition tag. This documents the method as a category —
what it is, how it is typically attempted, what it can and cannot establish, and what an entry
must record to be credible. It is written to let a reader *evaluate* a capture, not as an
operational guide to breaking a specific model.

## Working definition

Self-extraction is obtaining a model's system prompt by interacting with the model yourself and
eliciting the instruction text directly from it. The defining property is not the trick used but
the chain of custody: you ran the session, you saw the output appear, and you can show how it
was produced. A capture is self-extracted only if the contributor is the one who elicited it. If
you are copying someone else's elicitation, that is `community-leaked`.

No apology is owed for the method. System prompts shape every answer a model gives; documenting
them is ordinary primary-source work. The discipline is in the evidence, not in the permission.

## Common techniques

These are the families of approaches that show up in practice. Each is described at the level of
what it exploits and how reliably it works, because that is what a reviewer needs to judge a
capture — not a polished payload.

- **Prompt continuation.** Asking the model to continue, complete, or "keep going from" text
  that begins where its hidden instructions would. Exploits next-token tendencies rather than an
  explicit request to disclose.
- **Repeat-verbatim requests.** Directly asking the model to output everything above the user's
  first message, or to repeat its instructions word for word. The most honest technique and the
  easiest for a model to refuse; when it works, it tends to produce the cleanest text.
- **Role-play / instruction override.** Framing a fictional or game context in which the model
  adopts a persona whose "rules" are the real ones, or in which disclosing instructions is part
  of the scene. Reliability has fallen sharply as models learned to hold identity across frames.
- **Debug / maintenance framing.** Posing as a developer, evaluator, or the system itself doing
  a configuration check, so that printing the prompt reads as a legitimate operation.
- **Character break.** Pushing a persona until it "drops," on the premise that the underlying
  instructions surface in the seam. Often produces paraphrase rather than verbatim text.
- **Recursion via translation.** Asking the model to translate, summarize, or re-encode its
  instructions, then reversing the transform. Can leak content past a filter that watches for
  direct reproduction, but distorts wording — a translation round-trip is not verbatim.
- **Encoding tricks.** Requesting the prompt in base64, rot13, with separators between
  characters, or similar, to evade surface-level reproduction checks. Same caveat: what comes
  back must be decoded and is easy to corrupt, so authenticity is harder to establish.

A capture's value is inversely related to how much the technique distorts the text. Verbatim
reproduction is worth more than anything that round-trips the content through a transform.

## Ethics

Self-extraction sits in a gray area, and the entry should be honest about it rather than pretend
otherwise.

- **Legality is unsettled.** Eliciting a system prompt is not obviously illegal in most places,
  but it is not clearly sanctioned either, and the answer varies by jurisdiction. This project
  does not give legal advice; contributors are responsible for their own exposure.
- **Terms of service.** Many providers' terms prohibit attempts to discover or extract system
  prompts, prompt-injection, or circumventing safeguards. A successful extraction may breach the
  TOS of the product it came from. That is a real cost and the contributor bears it.
- **Why open documentation is still worth it.** A system prompt is the operative governance layer
  of a deployed model — it decides refusals, tone, and tool access for millions of conversations.
  Leaving that layer undocumented means the public can only see the mask, not the instructions
  behind it. Open, sourced, verbatim documentation lets researchers, journalists, and users
  reason about what they are actually talking to. The aim is transparency about systems already
  in wide use, not enabling abuse of them.

## Limitations

- **Modern models detect and refuse.** Current frontier models are trained against extraction.
  They recognize repeat-verbatim and override framings and decline, sometimes while stating they
  cannot share their instructions. A refusal is not evidence the prompt does not exist.
- **Success does not guarantee completeness.** An extraction that returns *some* instruction text
  may be missing tool definitions, injected reminders, user-specific context, or later sections.
  Models can also produce a confident *paraphrase* or an outright confabulation that looks like a
  prompt but isn't. Treat any single extraction as partial until it reproduces.
- **Drift.** Prompts change without notice. An extraction is a snapshot of one session on one
  date, not a stable fact about the product.

## What an entry must document

A `self-extracted` capture is only as trustworthy as its record. The entry must include:

- **Technique used** — which family above (or what combination), described plainly.
- **Exact prompt(s) sent** — the literal input that produced the disclosure, not a summary.
- **Full transcript** — a link or screenshot showing the elicitation and the model's response in
  context. Cropped or paraphrased transcripts substantially weaken a capture.
- **Evidence of authenticity** — why this is the real prompt and not a confabulation: e.g. it
  reproduced across attempts, matches structural markers, or is internally consistent. State how
  many attempts and how many reproduced.
- **Date** — capture date in ISO 8601, with time zone where it matters.
- **Product and version** — the surface (web app, API, mobile, etc.) and any model/version
  identifier the interface exposed.
- **Session details** — anything that affects reproducibility: enabled features or tools,
  account type, custom instructions or memory in play, region.

If you cannot show how you got it, it is not a self-extraction worth filing. See
[../CONTRIBUTING.md](../CONTRIBUTING.md) for the entry rules and [../STRUCTURE.md](../STRUCTURE.md)
for the format.
