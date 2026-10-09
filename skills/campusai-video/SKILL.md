---
name: campusai-video
description: How CampusAI makes its videos, end to end. The plan-first process, recording and capturing the real product from the demo, Raylight for motion design, the Remotion studio for coded films, the beat grammar, how text moves, the palette and camera, captions, sound, export, and the checks before a cut is finished. Use whenever making or editing any CampusAI video, film, reel, TikTok, launch cut, booth loop, animated social post, hero still, or motion graphic, when working in Raylight or Remotion for CampusAI, or when judging whether a cut is ready.
---

# Making CampusAI videos

This is how the CampusAI team makes video with Claude. It is the method behind every film we have
signed off, written down so you do not have to rediscover it. Most of the numbers in here were
measured off real renders, and most of the rules exist because something broke first.

## The four ideas everything else follows from

**1. Idea, flow, point, then build.** The idea first. Then the flow: how the video moves and what
each part is hitting. Then the point: what the viewer should take away and the call to action. Only
then make it, and then get feedback on it. Agree each of the first three before moving on, because
changing a plan costs minutes and changing a finished video costs days. Full process:
`reference/01-the-process.md`.

**2. The product on screen is always the real product.** Footage and screenshots come from the
CampusAI demo, never from a mockup somebody drew. A made-up screen does not just look worse, it
makes the video unpostable, because it shows a product we do not have. Redrawing a real screen from
real captures and real copy is fine. Inventing a screen or inventing content is not. Where to get
the real thing: `reference/02-the-real-product.md`.

**3. Borrow over build.** For most of the work, someone has already made the part, the template,
the tool or the technique, often better than we would and for free. Find it and use it before making
anything. Building from scratch is the exception, kept for adapting what you borrowed to CampusAI (our
colours, our timing, our copy) or for the rare thing nobody has made. Where to look and how to judge
it: `reference/08-tools-and-parts.md` and `reference/11-getting-better.md`.

The same goes for a film itself: it is assembled, not authored. A good film is several sources
brought together, never one stretched. Motion comes from templates (Raylight's measured beat sheets). Words, structure and colour
come from the product itself. How it really reads comes from captures of the live demo. The build
tool (Raylight or Remotion) is where they meet, and where every beat gets looked at. Templates alone
give beautiful motion around invented content. The product alone gives an accurate, flat recording.
The value is in the seam. Never start a film by designing a screen.

**4. Every video makes the next one better.** Before a video, read the `learning/` folder in the
workspace: Jacob's taste, past lessons, every video made so far, and the tools already found. After
each round of feedback, write down what was learned. When a lesson repeats, move it into this skill.
And when you hit a cost, a limit, or are about to build something from scratch, look for a better or
free option first, record what you find either way, and bring it to Jacob. How:
`reference/11-getting-better.md`.

## Which tool for which job

| You are making | Reach for | Why |
|---|---|---|
| A product video, social cut, launch teaser, anything with camera moves and polish | **Raylight** | Visual editor with a connector Claude can drive. Template craft comes built in. Start here. |
| A film that needs exact control, many aspect ratios from one script, streaming text, data-driven beats, a loop | **Remotion** (the `studio/` folder) | Code, so one script renders 4:5, 9:16 and 16:9, and every frame renders headlessly so it can be checked |
| A quick reference for timing, easing, camera | `learning/raylight-guide/` in the workspace | Raylight's own craft rules and template beat sheets, fetched once and saved so they cost nothing to reread |
| Naming an effect you can describe but cannot name | the `animation-vocabulary` skill | Turns "the bouncy thing" into the word you can ask for |
| The hook and the first two seconds | the `hook-retention-psychology` skill | Scores an opening on the real levers of attention |

Raylight and Remotion are not rivals. Raylight's numbers are the spec for Remotion work too: read
the beat sheet, then implement it in code. Details: `reference/03-raylight.md` and
`reference/06-the-remotion-studio.md`.

## Where everything lives

- `reference/01-the-process.md` the plan-first sequence and what gets brought back when
- `reference/02-the-real-product.md` the demo, what is on each page, recording with Cap, the capture script, facts that are easy to get wrong
- `reference/03-raylight.md` setup, the free-tier budget, the working loop, templates, the craft guide
- `reference/04-the-grammar.md` beats, transitions, the four ways text moves, the copy
- `reference/05-the-look.md` palette, ground, grade, camera, easings
- `reference/06-the-remotion-studio.md` the studio template, its films, commands, export, render rules
- `reference/07-captions-sound-voice.md` word-timed captions, sound effects, voiceover and what can ship
- `reference/08-tools-and-parts.md` every connector and skill in this kit, GitHub as the parts shelf, licences
- `reference/09-before-its-finished.md` the checks before anything is called done
- `reference/10-campusai.md` what CampusAI is, who it is for, how it talks, and the lines that do not move
- `reference/11-getting-better.md` looking for better tools, and learning from every video

Read 01, 02, 10 and 11 before the first video, and the `learning/` folder before every video. Read the rest when the work reaches them.

## The lines that do not move

Short on purpose. Everything else in this skill is judgement.

- No em dashes in any on-screen text, caption or script. Rewrite the sentence.
- No monospace type. Inter Tight for display, Inter for everything else.
- No all-caps, wide-letter-spaced labels above headlines.
- The logo is the placed file (`studio/public/brand/`), never typed out.
- Never invent a number, a user count, a testimonial or a student. If a slot wants a number we do not have, the slot is wrong.
- Every screenshot and recording comes from the demo, https://campusai-demo.vercel.app (or
  https://campusai-stage.vercel.app, the same build). It runs on a made-up student. Never film a
  real student's account.
- Captions sit in a band below the product, never on top of live UI.
- Everything public is cleared by Jacob before it posts.
