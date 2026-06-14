# Spec vs. prompt: OpenAI's stated intent and a leaked ChatGPT reality

This note compares two OpenAI artifacts in the archive: the [Model Spec](../entries/openai/model-spec/2025-12-18-official-disclosure.md)
(official-disclosure, 2025-12-18) and a [community-leaked ChatGPT (GPT-5) system prompt](../entries/openai/chatgpt/2025-08-07-community-leaked.md)
(2025-08-07). They are the same vendor at two layers: a public statement of intended behavior,
and an unofficial copy of what the running product was allegedly told. Reading them side by side
shows how much of "alignment" lives below the layer a lab chooses to publish.

**Read the caveats first, not last.** The leaked prompt is tagged confidence `low`: nobody
documents how it was extracted and the archive cannot verify it. The two documents are different
*kinds* — a deliberately public spec vs. an instruction set never meant to be seen — and are four
months apart. Divergence between them is not, by itself, evidence of bad faith. Treat what follows
as a structured observation, not an exposé.

## Where they align

**Priority ordering.** The Model Spec's organizing idea is a [chain of command](../entries/openai/model-spec/2025-12-18-official-disclosure.md#prompt).
The leaked prompt operationalizes a compatible hierarchy, closing with priorities where
["User safety and policy compliance come first"](../entries/openai/chatgpt/2025-08-07-community-leaked.md#prompt),
then accuracy, then tone. The abstract principle and the concrete ranking point the same way.

**Privacy.** The spec treats protecting people's privacy as in-bounds behavior; the leaked
prompt instantiates it in detail, instructing the memory tool to
["Never store ... sensitive data"](../entries/openai/chatgpt/2025-08-07-community-leaked.md#prompt)
spanning race, religion, health, and political affiliation. Same value, made executable.

## Where they diverge

**Altitude.** The spec speaks in principles ("Stay in bounds," "Seek the truth together"). The
leaked prompt is overwhelmingly *mechanics* the spec never mentions: a memory tool's storage
rules, a freshness scale for web search, canvas/code formatting, tool-routing conditions. This is
not contradiction — it is the spec's own admission made visible, that
["the public version ... may not include every detail."](../entries/openai/model-spec/2025-12-18-official-disclosure.md#notes)

**Product-tuned style with no spec analog.** The leaked prompt opens with a "v2" personality and a
hard rule to ["not end with opt-in questions or hedging closers"](../entries/openai/chatgpt/2025-08-07-community-leaked.md#prompt).
There is no corresponding directive in the Model Spec. Behavior users actually feel — how every
reply ends — is shaped at the prompt layer, invisibly to anyone reading only the spec.

**Disclosure posture.** The spec is published "to increase transparency." The artifact that
governs the live product, if the leak is genuine, is not published at all. The transparency of the
constitution coexists with the opacity of the operating instructions.

## Verdict

If the leak is broadly accurate, the picture is a layered one. The Model Spec functions as a
constitution: durable principles, openly published, aspirational by OpenAI's own statement that
["production models do not yet fully reflect"](../entries/openai/model-spec/2025-12-18-official-disclosure.md#prompt)
it. The system prompt is the statute and regulation: where the abstract values get turned into
specific, product-shaped, frequently-changing rules — and where a lot of the behavior users
encounter is actually decided.

The practical takeaway is not hypocrisy but *incompleteness of the public record*. Reading the
Model Spec tells you what OpenAI says it intends; it does not tell you what ChatGPT is told. The
gap between the two is exactly the territory this archive exists to document — and it is why an
official spec, however welcome, is not a substitute for the prompt itself.

## Caveats (restated)

- The leaked prompt's confidence is `low` and unverified; every claim drawn from it inherits that
  weakness.
- The comparison is asymmetric: a verified public document against an unverified leak, captured
  ~4 months apart. Alignment or divergence could reflect version drift, not intent.
- Quotations are short excerpts; read each in the linked entry for full context.

---

*Capture dates: Model Spec 2025-12-18 (official-disclosure); ChatGPT leak 2025-08-07
(community-leaked, confidence low). Analysis written 2026-06-14. Source disclaimer: this note
relies in part on a community-leaked artifact the archive cannot independently verify; conclusions
are provisional and should be revised if a verified ChatGPT capture becomes available.*
