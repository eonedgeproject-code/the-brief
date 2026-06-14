---
subject:
  vendor: OpenAI
  product: OpenAI Model Spec
  model: model-spec
  surface: other
  model_id: null

method: official-disclosure
captured: 2025-12-18
accessed: 2026-06-14

confidence: high
reproduced: null
attempts: null

supersedes: null
partial: true

sources:
  - url: https://model-spec.openai.com
    author: OpenAI
    original_date: 2025-12-18
---

# OpenAI Model Spec — behavior specification (not a system prompt)

## Provenance

This is an `official-disclosure` capture from OpenAI's published Model Spec.

- **Source:** https://model-spec.openai.com — the canonical page, which at time of access served version **2025-12-18**. Also mirrored at https://github.com/openai/model_spec. The document is dedicated to the public domain under Creative Commons CC0 1.0.
- **Retrieved:** raw markdown via `raw.githubusercontent.com/openai/model_spec/main/model_spec.md` on 2026-06-14; version date confirmed against the canonical site.
- **Scope — IMPORTANT, see Notes:** the Model Spec is OpenAI's statement of *intended* model behavior, not the verbatim system prompt any OpenAI model is run with. By OpenAI's own statement it is not fully reflected in production models. `partial` is `true` and the excerpt below is the verbatim Overview section plus the top-level principle structure, not the full document.

## Prompt

The text below is the verbatim Overview section of the Model Spec, followed by its top-level
structure. The full document is long; the body of each principle is omitted here and lives at
the source. This is a verbatim *excerpt* of a specification document — see Notes for why it is
included despite not being a system prompt.

```text
# Overview

The Model Spec outlines the intended behavior for the models that power OpenAI's products, including the API platform. Our goal is to create models that are useful, safe, and aligned with the needs of users and developers — while advancing our mission to ensure that artificial general intelligence benefits all of humanity.

To realize this vision, we need to:

- Iteratively deploy models that empower developers and users.
- Prevent our models from causing serious harm to users or others.
- Maintain OpenAI's license to operate by protecting it from legal and reputational harm.

These goals can sometimes conflict, and the Model Spec helps navigate these trade-offs by instructing the model to adhere to a clearly defined chain of command.

We are training our models to align to the principles in the Model Spec. While the public version of the Model Spec may not include every detail, it is fully consistent with our intended model behavior. Our production models do not yet fully reflect the Model Spec, but we are continually refining and updating our systems to bring them into closer alignment with these guidelines.

The Model Spec is just one part of our broader strategy for building and deploying AI responsibly. It is complemented by our usage policies, which outline our expectations for how people should use the API and ChatGPT, as well as our safety protocols, which include testing, monitoring, and mitigating potential safety issues.

By publishing the Model Spec, we aim to increase transparency around how we shape model behavior and invite public discussion on ways to improve it. Like our models, the spec will be continuously updated based on feedback and lessons from serving users across the world. To encourage wide use and collaboration, the Model Spec is dedicated to the public domain and marked with the Creative Commons CC0 1.0 deed.

[…top-level structure, bodies omitted — see source:]
- Definitions
- The chain of command
- Stay in bounds
- Take extra care in risky situations
```

## Confidence

**High** as to authenticity and the verbatim accuracy of the excerpt — it comes directly from
OpenAI's published, public-domain document. The confidence rating is about the source and text,
not a claim that this is what the model is actually prompted with (it isn't; see Notes).

`partial: true` because only the Overview and section headings are reproduced; the full
principle bodies are at the source. Inline hyperlinks present in the original Overview were
flattened to plain text in this excerpt; wording is otherwise verbatim.

## Notes

**This is not a verbatim system prompt.** The Model Spec is OpenAI's published specification of
*intended* behavior. OpenAI explicitly states that "the public version of the Model Spec may not
include every detail" and that "our production models do not yet fully reflect the Model Spec."
So this document describes the target, not the instructions actually injected at inference time.

It is included in this archive anyway because, for a vendor that does not publish its actual
system prompts, the official behavior specification is the closest authoritative primary source
for "what the model is told to be" — and knowing that the public spec is an aspirational target
rather than the live prompt is itself valuable information for a reader. For an actual OpenAI
system prompt, see the `community-leaked` ChatGPT capture in this archive, and contrast its
confidence level with this one.
