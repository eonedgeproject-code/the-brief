# Entries index

Every capture in the archive, grouped by vendor. New here? Each row links to one entry; the
**method** and **confidence** columns tell you how the prompt was obtained and how much to trust
it before you open anything.

- **Method** — `self-extracted`, `community-leaked`, `official-disclosure`, `behavioral-inference`. See [../CONTRIBUTING.md](../CONTRIBUTING.md).
- **Confidence** — the contributor's honest assessment (`high` / `medium` / `low`), not a quality score.
- ⚠️ flags an `official-disclosure` that is a **policy or specification, not an actual system prompt** — still useful, but read the entry's Notes.

Format, schema, and conventions: [../STRUCTURE.md](../STRUCTURE.md). Start a new capture from [TEMPLATE.md](TEMPLATE.md).

## Anthropic

| Model | Date | Method | Confidence | Entry |
|---|---|---|---|---|
| Claude Fable 5 | 2026-06-09 | official-disclosure | high | [link](anthropic/claude-fable-5/2026-06-09-official-disclosure.md) |
| Claude Opus 4.8 | 2026-05-28 | official-disclosure | high | [link](anthropic/claude-opus-4-8/2026-05-28-official-disclosure.md) |
| Claude Opus 4.7 | 2026-04-16 | official-disclosure | high | [link](anthropic/claude-opus-4-7/2026-04-16-official-disclosure.md) |
| Claude Sonnet 4.6 | 2026-02-17 | official-disclosure | high | [link](anthropic/claude-sonnet-4-6/2026-02-17-official-disclosure.md) |
| Claude Opus 4.6 | 2026-02-05 | official-disclosure | medium | [link](anthropic/claude-opus-4-6/2026-02-05-official-disclosure.md) |

## OpenAI

| Model | Date | Method | Confidence | Entry |
|---|---|---|---|---|
| ChatGPT (GPT-5) | 2025-08-07 | community-leaked | low | [link](openai/chatgpt/2025-08-07-community-leaked.md) |
| Model Spec ⚠️ | 2025-12-18 | official-disclosure | high | [link](openai/model-spec/2025-12-18-official-disclosure.md) |

## xAI

| Model | Date | Method | Confidence | Entry |
|---|---|---|---|---|
| Grok 4.1 (thinking) | 2025-11-17 | official-disclosure | high | [link](xai/grok-4-1/2025-11-17-official-disclosure.md) |

## Google

| Model | Date | Method | Confidence | Entry |
|---|---|---|---|---|
| Gemini — Prohibited Use Policy ⚠️ | 2024-12-17 | official-disclosure | high | [link](google/gemini/2024-12-17-official-disclosure.md) |

---

*9 entries across 4 vendors. The only actual, fully-verbatim running system prompts disclosed by
their vendors are the Anthropic captures and xAI Grok; OpenAI and Google publish specifications
and policies rather than their live prompts (⚠️), and the one ChatGPT system prompt here is a
community leak we cannot independently verify (low confidence). The contrast is the point.*
