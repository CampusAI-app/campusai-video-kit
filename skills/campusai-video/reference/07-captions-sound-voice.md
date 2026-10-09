# Captions, sound and voice

## Captions

**Placement.** Captions sit in a band reserved below the product, never on top of live UI. Text
over a busy interface is never reliably readable, and it hides the thing the film is showing. In
9:16, use the safe areas in `studio/src/lib/safeArea.ts` so captions clear the platform's own
buttons and text.

**Words.** Short, spoken, one idea per line. Same rules as all on-screen copy: no em dashes, no
all-caps labels, nothing the product would not say.

**Timing, when there is a voice.** Use word-level timestamps, not sentence-level. Sentence timing is
what makes captions drift and land late. Word timing is what makes them hit on the word, and it is
most of the difference between captions that look produced and captions that look automatic.

The tool is **WhisperX** (`github.com/m-bain/whisperX`, free): transcription with a timestamp on
every word. Its output feeds the `remotion-captions` skill, which already expects word-level input.

```bash
pip install whisperx
whisperx voice.wav --model large-v3 --output_format json --compute_type int8
```

Running on a Mac without an NVIDIA card needs `--compute_type int8` (and `--device cpu` if it
complains). For a film with no voice, captions are timed to the beats in the script instead.

## Sound

The chat film carries a soundtrack of interface sounds (a click on send, a soft whoosh on a cut, a
ding on completion) from `@remotion/sfx`, cued from the same timeline the picture uses so the two
cannot drift apart. See `studio/src/ChatSoundtrack.tsx` and `src/lib/chat-timeline.ts`.

Two things to know:

- Only about eight of its sounds are usable interface sounds. The rest are novelty sounds.
- Every sound is fetched from `remotion.media` at render time. **A render without internet quietly
  comes out silent.** Listen to every export.

Most social video is watched with the sound off. The film has to work silent, with sound as a bonus.
The clubs loop is silent by design.

Music: nothing has been picked or licensed. Do not put music under anything meant to post without
checking the licence first. A platform's in-app sound library, added at posting time, is usually
the simplest legal route.

## Voiceover

No voice files ship with this kit. Free-tier AI voices (ElevenLabs' free plan, for example) are
non-commercial, so a voiced cut that goes public needs a voice on a paid plan or a real person
recording it, and that is Jacob's call. The studio's `vo` field in `script.ts` still works when a
properly licensed voice line is added.

Better still, consider whether the film needs a voice at all. Most of ours do not.
