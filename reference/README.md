# The Brief
*What every AI is told before it talks to you.*

A system prompt is the text a model sees before any user turn. It defines persona, refusal patterns, tool access, formatting — the rules of the conversation. It does most of the work people call "alignment." And every major commercial AI hides it.

If you don't know what an AI was told to be, you don't really know what you're talking to. You're talking to a mask, and the mask was written by a committee.

The Brief is an attempt to document these prompts the way you'd document a primary source. Every entry is tagged by acquisition method — `self-extracted`, `community-leaked`, `official-disclosure`, `behavioral-inference` — dated, and versioned against prior captures. When a prompt changes, the diff is preserved. When the source is uncertain, the entry says so.

This is not comprehensive. The first months will be patchy, biased toward models we can probe most easily, and incomplete in ways we can't predict. That's fine. The standard is methodology, not volume. One verified capture is worth ten dubious dumps.

What's here so far lives in `entries/` — start with `entries/README.md` for the index of captures by vendor. The capture format and the meaning of each acquisition tag are documented in `STRUCTURE.md` and `CONTRIBUTING.md`.

If you want to contribute, read CONTRIBUTING.md before you open a PR. We decline submissions that can't explain how the prompt was obtained.
