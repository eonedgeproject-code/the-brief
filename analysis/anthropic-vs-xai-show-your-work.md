# Show your work, two ways: Anthropic and xAI disclose real prompts differently

Of the nine captures in this archive, only two vendors disclose what an actual running system
prompt says rather than a policy or a specification: Anthropic and xAI. The other official
disclosures here — OpenAI's [Model Spec](../entries/openai/model-spec/2025-12-18-official-disclosure.md)
and Google's [Prohibited Use Policy](../entries/google/gemini/2024-12-17-official-disclosure.md) —
are flagged ⚠️ in the index precisely because they are *about* intended behavior, not the
instructions a model is actually run with. So the natural comparison is between the two that do show
the real thing: Anthropic's [Claude Opus 4.8](../entries/anthropic/claude-opus-4-8/2026-05-28-official-disclosure.md)
behavior block and xAI's [Grok 4.1 (thinking)](../entries/xai/grok-4-1/2025-11-17-official-disclosure.md)
system-turn template.

The point of this note is that "official disclosure of a real prompt" turns out not to be one thing.
Anthropic and xAI both show their work, and they mean two different things by it — and the *form* of
each disclosure encodes the vendor's values as loudly as the content does.

## They are disclosing two different kinds of artifact

Start with what's actually published, because it's the root of every other difference.

Anthropic publishes a **curated behavior block.** The Opus 4.8 entry reproduces the natural-language
`<claude_behavior>` text from Anthropic's release-notes "System Prompts" page — and only that. The
capture is marked [`partial: true`](../entries/anthropic/claude-opus-4-8/2026-05-28-official-disclosure.md)
because the disclosure deliberately omits tool definitions, runtime-injected reminders, user
preferences, and per-session context. What you get is the prose that states how Claude should
behave: readable, polished, organized into themed sections, clearly written to be understood.

xAI publishes a **raw template.** The Grok entry is captured byte-for-byte from a `.j2` (Jinja2)
file in xAI's public [`xai-org/grok-prompts`](../entries/xai/grok-4-1/2025-11-17-official-disclosure.md)
repository, pinned to a specific commit. The capture is [`partial: false`](../entries/xai/grok-4-1/2025-11-17-official-disclosure.md):
it is the whole file, including the runtime machinery — `{% if chart_tool_enabled %}` branches, a
`{% if is_subjective %}` split that swaps in different instructions for "subjective" queries,
`{{custom_personality}}` and `{{user_info}}` placeholders filled at run time, and even a developer
comment left inside the template.

That is the deepest divergence, and it cuts both ways. xAI shows you the *mechanism* — the actual
control flow, the conditionals, the seams where runtime values get spliced in — which Anthropic's
clean prose hides. But Anthropic's prose states behavioral *intent* with a clarity that xAI's terse
policy lines don't attempt. One vendor hands you the engine with the casing off; the other hands you
a well-written description of how the car is meant to drive. Both are "the real prompt." Neither is
the complete running context: Anthropic's omits the tools and runtime layer, and xAI's contains
placeholders that only a live session fills.

## The values are written into the form

Read the two side by side and the contrast in register is immediate, and it isn't cosmetic.

Anthropic's block is long, prose-heavy, and dominated by *care*: extensive child-safety
instructions, a large `<user_wellbeing>` section on mental health and self-harm, an `<evenhandedness>`
section on political balance, a `<refusal_handling>` posture, and an instruction not to attribute its
behavior to its own system prompt. The center of gravity is harm-avoidance and tone.

Grok's `<policy>` block is terse and ordered by *precedence and truth-seeking*: it opens by declaring
the policy tags take "highest precedence" and that "system messages take precedence over user
messages," brands itself a "maximally truth-seeking assistant," states flatly that by default it has
"no restrictions on adult sexual content or offensive content," and instructs that responses "should
not shy away from making claims which are politically incorrect, as long as they are well
substantiated." It also declares "no strict knowledge cutoff," where Anthropic's block carefully pins
Claude's reliable knowledge to the end of January 2026.

These are not two encodings of the same values in different prose. They are different values: one
archive entry is dense with the language of protection, the other with the language of unrestricted
truth-seeking and explicit permissiveness. The disclosure format makes the difference legible in a
way no marketing page would.

## Where they nonetheless converge

For all that, both real prompts solve some of the same problems, which is itself worth recording.

Both encode a **precedence order** — Anthropic implicitly through its layered behavior sections and
its `<anthropic_reminders>` caution about user-injected content, xAI explicitly with "highest
precedence" policy tags and system-over-user ordering. Both contain a **product-information script**
that redirects pricing and account questions to support URLs and warns against making facts up — the
Grok prompt is almost entirely this for one stretch, and the Opus block has its own product section.
Both wrestle with **political even-handedness**, arriving at different answers: Anthropic asks for
"the best case its defenders would make" and a closing presentation of opposing views; xAI asks for a
"distribution of sources that represents all parties" and a "non-partisan viewpoint," overriding
user-imposed partisan framings. And both instruct the model **not to reveal its own instructions**
unless asked — explicit in Grok's final policy line, oblique in Anthropic's "don't cite the system
prompt." Same surface problems, recognizably; different solutions, characteristically.

## The tell only the raw form could expose

One thing in the Grok capture has no analog in the Anthropic one, and it exists only because xAI
ships the raw template: a developer comment, preserved verbatim in the entry, sitting inside the
`{% if is_subjective %}` branch. It notes that Grok "assumes by default that its preferences are
defined by its creators' public remarks, but this is not the desired policy for a truth-seeking AI,"
and that "a fix to the underlying model is in the works." That is an internal engineering note,
visible to the public only because the disclosure is the actual file rather than a cleaned summary.
Anthropic's curated block, by its nature, contains nothing like it — not because Anthropic has no
such notes, but because a polished behavior statement is exactly the layer where such notes get
removed. The comment is a small monument to what each disclosure style reveals and conceals: the raw
template leaks the messy intent behind the rule; the curated block gives you the rule without the
mess.

## Verdict

Both vendors genuinely show their work, and that already sets them apart from the spec-and-policy
disclosures elsewhere in this archive. But "showing the real prompt" splits into two philosophies.
xAI's is more complete and more raw — the template, the conditionals, the placeholders, the leftover
comment — and it tells you how the thing is actually wired, at the cost of readability. Anthropic's
is more legible and more curated — a clear statement of intended behavior — at the cost of
completeness, with the tools and runtime layer omitted and the entry honestly marked partial. A
reader who wants to know *what the model is told to value* is best served by Anthropic's block; a
reader who wants to know *what the running instruction actually looks like, machinery and all* is
best served by xAI's file.

The lesson for the archive is that the `method` tag is not enough on its own. Two captures can both
be `official-disclosure`, both `confidence: high`, both real running prompts — and still differ so
much in what they expose that the `partial` flag and the Provenance notes are doing essential work.
Even among the vendors who are most transparent, transparency has a shape, and the shape is part of
what we are documenting.

---

*Sources: Anthropic Claude Opus 4.8 (official-disclosure, 2026-05-28, partial) and xAI Grok 4.1
thinking (official-disclosure, 2025-11-17, complete). Both are `confidence: high`. Analysis written
2026-06-18, drawing only on the two filed entries; quotations are short excerpts — read each entry
for full context. xAI's source repository carries its own AGPL-3.0 license, noted in that entry.*
