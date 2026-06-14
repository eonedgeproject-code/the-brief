# Methodology: behavioral-inference

Reference for the `behavioral-inference` acquisition tag. This is the method of last resort: the
prompt text is not in hand, and you are reconstructing what the model was likely told from how it
behaves. It is the weakest method in the archive, and an entry must wear that weakness openly.

This file documents the method as a category so a reader can judge an inference, and so the
archive's promised method tags have a defined meaning even where no entry yet uses this one.

## Working definition

Behavioral inference is concluding something about a model's hidden instructions purely from its
observable outputs — without extracting any instruction text. You never see the prompt; you see
its shadow. Every claim is therefore a hypothesis about a cause you cannot directly read, and the
entry must present it as inference, never as quotation.

## Probing without injection

The method relies on careful observation, not on getting the model to disclose anything. Useful
techniques:

- **Edge-case probing.** Pose requests near a suspected boundary and record exactly where
  behavior changes — what gets refused, softened, reframed, or appended. A consistent boundary
  implies an instruction shaping it.
- **A/B response comparison.** Send minimally different inputs and compare outputs. If one word
  flips a refusal into compliance, or changes tone or format, the difference localizes a likely
  rule. Hold everything else constant so the comparison is clean.
- **Tool-boundary probing.** Observe when the model searches, runs code, declines an action, or
  asks for confirmation. The conditions under which a capability fires or refuses reveal the
  instructions governing it, even when the tool definitions themselves are invisible.
- **Repetition and stability checks.** Re-run the same probe across sessions and dates. Behavior
  that reproduces is more plausibly instruction-driven than sampling noise.

The discipline is to change one variable at a time and write down what actually happened, not
what you expected.

## Inferring prompt structure from response patterns

Recurring surface features are evidence of underlying instructions:

- **Stock phrasings** that appear across unrelated conversations (the same disclaimer, the same
  refusal sentence, the same closing move) suggest a templated directive.
- **Formatting defaults** — when the model reaches for prose vs. bullets, how it handles lists,
  whether it ends with offers of further help — point to style rules.
- **Refusal taxonomy** — the categories it treats as off-limits, and the language it refuses in,
  outline the safety section of a prompt.
- **Persona constants** — identity claims, things it consistently won't say about itself, fixed
  self-descriptions — suggest an identity block.

From these you can propose a *structure* ("there is likely a section governing X") without ever
claiming the wording. Keep quoted model outputs and inferred instructions strictly separate.

## Why confidence is always medium or lower

Inference cannot reach `high`. The text is never observed, so even a strong, reproducible pattern
has competing explanations: post-training and RLHF rather than a prompt instruction, sampling
variance, classifier-side filtering applied after generation, or the contributor's own
expectations shaping which probes were run and how outputs were read. The best an inference entry
can honestly claim is `medium`, and only when the pattern is reproducible and the main
alternatives have been considered and ruled out as far as possible. Most inference entries should
sit at `low`.

## What an entry must document

A `behavioral-inference` capture must include:

- **Probes used** — the exact inputs, including the A/B pairs, so the work can be repeated.
- **Responses recorded** — the actual outputs (quoted as model output, clearly labeled as such),
  not summaries of them.
- **Conclusions inferred** — what you believe the underlying instruction is, stated explicitly as
  inference, with the quoted-vs-inferred line never blurred.
- **Strength of evidence** — how many trials, how consistently the pattern held, and which
  alternative explanations you considered and why you discounted them.
- **Date, product, and version** — as for any capture; behavior drifts, so the snapshot must be
  pinned in time.

An inference entry that reads like a transcript of fact, rather than a documented hypothesis, will
be sent back. See [../CONTRIBUTING.md](../CONTRIBUTING.md) for the entry rules and
[../STRUCTURE.md](../STRUCTURE.md) for the format.
