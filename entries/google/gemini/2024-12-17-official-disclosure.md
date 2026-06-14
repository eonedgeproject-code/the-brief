---
subject:
  vendor: Google
  product: Google Generative AI (Gemini)
  model: gemini
  surface: other
  model_id: null

method: official-disclosure
captured: 2024-12-17
accessed: 2026-06-14

confidence: high
reproduced: null
attempts: null

supersedes: null
partial: true

sources:
  - url: https://policies.google.com/terms/generative-ai/use-policy
    author: Google
    original_date: 2024-12-17
---

# Google Generative AI Prohibited Use Policy — usage policy (not a system prompt)

## Provenance

This is an `official-disclosure` capture from Google's published policy pages.

- **Source:** https://policies.google.com/terms/generative-ai/use-policy — Google's "Generative AI Prohibited Use Policy," last updated **December 17, 2024**.
- **Retrieved:** 2026-06-14.
- **Scope — IMPORTANT, see Notes:** Google does not publish a verbatim system prompt for Gemini. This is the public usage *policy* that governs Google's generative AI products. `partial` is `true` and the text below is a verbatim excerpt of the policy's top-level structure, not a complete reproduction and not a system prompt. The Gemini API "Safety and factuality guidance" page (https://ai.google.dev/gemini-api/docs/safety-guidance) was also reviewed and is likewise developer guidance, not a system prompt.

## Prompt

Verbatim excerpt of the policy (introduction, the four prohibited-use category statements, and
the exceptions note). The policy elaborates each category with sub-bullets at the source; those
elaborations are summarized by category here and not reproduced bullet-by-bullet, so this is an
excerpt. This is a *policy* document, not a system prompt — see Notes.

```text
Generative AI models can help you explore, learn, and create. We expect you to engage with them in a responsible, legal, and safe manner.

[Prohibited uses — top-level categories, verbatim category statements; per-category sub-bullets omitted, see source:]

Do not engage in dangerous or illegal activities, or otherwise violate applicable law or regulations.

Do not compromise the security of others' or Google's services.

Do not engage in sexually explicit, violent, hateful, or harmful activities.

Do not engage in misinformation, misrepresentation, or misleading activities.

We may make exceptions to these policies based on educational, documentary, scientific, or artistic considerations.
```

## Confidence

**High** as to authenticity and the verbatim accuracy of the excerpt — it comes directly from
Google's published policy page. As with the OpenAI Model Spec entry, the confidence rating is
about the source and text, not a claim that this is the model's actual prompt.

`partial: true` because only the introduction, the four category statements, and the exceptions
note are reproduced; each category's detailed sub-bullets are at the source.

## Notes

**This is not a system prompt.** It is Google's public usage policy for its generative AI
products. Google does not, as of this capture, publish the actual system prompt or system
instructions that Gemini runs with; the closest official, authoritative primary sources are this
Prohibited Use Policy and the Gemini API safety guidance, both of which describe rules and
developer expectations rather than the verbatim instructions injected at inference time.

It is included because, for a vendor that discloses no actual system prompt, the official usage
policy is the best authoritative primary source available — and the absence of any official
verbatim Gemini system prompt is itself a fact worth recording. For comparison, contrast this
with the xAI entry (an actual disclosed system prompt) and any `community-leaked` Gemini capture
that may be added later.
