# The Remotion studio

`studio/` in this kit is our working Remotion project, the same one the coded films were made in,
handed over as the template. It renders today. Start from it rather than from a blank Remotion
project, because the tokens, the export pipeline and the render fixes are already in it.

Remotion is React that renders to video. Every frame is a function of the frame number, so a film
can be rendered headlessly, checked frame by frame, and re-rendered in any aspect ratio from one
script.

## Setup

Needs Node 18 or newer (checked on Node 24) and Google Chrome.

```bash
cd studio
npm install
npm run dev                          # Remotion Studio, live preview at localhost:3000
```

**Licence.** Remotion is free for individuals and for companies with up to three employees, and
needs a paid company licence above that. Whether a CampusAI render needs one is Jacob's call. Learning and drafting are fine. Ask before a Remotion render is meant to go out.

## What is in it

| Path | Holds |
|---|---|
| `src/Root.tsx` | Every composition (film) and its size, frame rate and length |
| `src/script.ts` | The scene model for the card-shaped posts: scenes, zooms, callouts, captions. The file that changes between those videos |
| `src/theme.ts` | Brand tokens, read from the real design system |
| `src/ChatVideo.tsx` | The "Ask CampusAI anything" chat film, drawn end to end. Dark and light versions |
| `src/ClubsVideo.tsx` | The silent looping clubs film for the involvement fair table |
| `src/JobMatchFilm.tsx` | The September Job Match film, built from real captures |
| `src/DemoVideo.tsx` + `src/scenes/` | The scene engine behind the JobMatch and ResumeCoach posts: title, footage, card, evidence, statement, wall, brand and end scenes |
| `src/components/` | Callout, Caption, PunchCaption, Highlight, Atmosphere (the background room every beat sits in, with the grain), Chrome (browser and phone frames), Watermark |
| `src/lib/` | Timing, easing helpers, safe areas for 9:16, the chat film's shared timeline |
| `src/ChatSoundtrack.tsx` | Sound effect cues for the chat film |
| `scripts/render.mjs` | The real export (see below) |
| `scripts/capture-demo.mjs` | Crisp captures of the live demo (see `02-the-real-product.md`) |
| `scripts/still.mjs`, `scripts/probe.mjs` | One frame out; exact length of a recording |
| `public/captures/` | Sample captures from September. Recapture before posting |
| `public/footage/` | Screen recordings go here |

Compositions you can render now: `ChatAsk-16x9`, `ChatAsk-16x9-Light`, `ClubsFair-16x9`,
`JobMatchFilm-4x5`, `JobMatchFilm-9x16`, `JobMatchFilm-16x9`, the August `JobMatch-*` and `ResumeCoach-*` posts, and `DemoVideo` (a sample
recording through the scene engine). The August posts are silent in this kit: their draft voice
lines were removed because they were made on a non-commercial voice plan. Open `npm run dev` and click through them before building
anything new. Most new films should start as a copy of the closest one.

## Commands

```bash
npm run dev                                   # preview
npm run film JobMatchFilm-4x5                 # export, the right way, to out/
npm run still JobMatchFilm-4x5                # one frame (a still is just a one-frame composition)
npx remotion still ChatAsk-16x9 out/f.png --frame=130   # any frame of any film
npm run probe -- public/footage/take1.mov     # exact seconds and frames of a recording
npm run capture -- /events public/captures/mine/events.png
npm run lint                                  # eslint and TypeScript
```

## The export, and why it is a script

`npm run film <id>` does what a plain `remotion render` does not:

- PNG frames instead of JPEG, so fine UI text does not pick up artefacts before the encoder ever
  sees it. This one matters most, because every film here is type-led.
- crf 12 with a slow encoder preset, so quality goes into encode time rather than file size.
- A second, lossless pass that tags the colour information. Untagged video is the usual reason a
  dark film looks washed out or crushed on someone else's screen.
- 320k audio, so quiet sound cues do not sit on codec noise.

It needs `ffmpeg` for the tagging pass (`brew install ffmpeg`). Without it, `--no-tag` still gives
a valid file.

## How a footage scene's camera works

In `script.ts`, a footage scene declares focus keyframes:

```ts
focus: [
  { at: 0,   x: 0.5,  y: 0.5, scale: 1 },    // wide
  { at: 70,  x: 0.32, y: 0.4, scale: 1.6 },  // push in on a card
  { at: 150, x: 0.5,  y: 0.5, scale: 1 },    // back out
]
```

`at` is a frame from the start of that scene. `x` and `y` are the point of interest as a fraction of
the recording. `scale` 1 is the whole screen. Callouts use the same coordinates and stay glued to
what they point at through a zoom while staying crisp, because they are drawn outside the zoom
rather than magnified with the footage.

## Frame rate

Every film's beats are written in milliseconds, and each film's frame rate lives in one constant in
`Root.tsx`. Moving a film to 60fps is a one-line change. Never hand-double numbers inside a scene.

## Checking your work

- **Render frame-exact stills to check timing.** Sampling an mp4 with ffmpeg does not land on exact
  times, and a contact sheet built that way can make a correctly timed beat look broken by up to
  half a second. Remotion's own stills are exact.
- **Check frame zero.** It is the cover in a feed. If it is nearly black, the film opens on nothing.
- **Look at it at phone size.** Shrink a still to about 430 pixels wide. Anything unreadable there
  is unreadable to the viewer.
- Remotion's bundled ffmpeg has no `tile` or `select` filters, so build contact sheets with Python
  and PIL if you need them.

## Render rules that are not optional

These are the ones that cost days.

**1. ANGLE stays off, so there are no GL transitions.**
`Config.setChromiumOpenGlRenderer("angle")` is what every WebGL-backed transition needs (linear-blur,
cross-zoom, dissolve, dreamy-zoom, film-burn, ripple, zoom-blur). Under that renderer this project
dropped whole layers out of individual frames: first the page gradient, then the message card, then a
text line, always on the frames just after a layout change. It presented as the red flickering off
and on. With ANGLE off every frame renders complete. If a future film genuinely needs a GL
transition, turn it on for that composition only and check every frame of any beat whose layout moves
mid-shot.

**2. Avoid compositing triggers in any beat that animates layout.**
`transform: scale()`, `zoom`, and `overflow: hidden` combined with `border-radius` each promote a
composited layer, and each one cost us frames.
- A camera push is a layout resize, not a transform.
- A container grows by mounting children, not by animating a clipped height.
- Reserve a fixed height on any line being typed.

**3. When a visual bug moves to a different element each time you fix it, stop editing markup.**
That pattern means the variable is the renderer, not the CSS. Five rewrites of where the gradient
lived changed nothing. One config line fixed it.

**4. Verify by number, not by eye.** A contact sheet finds composition problems. It does not find
dropped frames. Sample the actual pixel at fixed points across many timestamps before claiming a
visual bug is fixed, and never judge a beat off a tile that might be mid-dissolve.

**5. Subtract your transitions from the total.** A transition overlaps two scenes, so the timeline is
the sum of the beats minus the sum of the transitions. Getting this wrong silently truncates the
last beat.

---

### The usual suspects in borrowed code

Before a component from elsewhere goes into a film, search it:

```bash
grep -nE "transform:|scale\(|overflow: *hidden|Math\.random|zoom" src/borrowed/*.tsx
```

- `transform: scale()` or `zoom` in a beat that animates layout: rewrite as a layout resize.
- `overflow: hidden` with a `border-radius`: rewrite as mounted children.
- `Math.random()` anywhere: replace with jitter derived from the index, or it strobes, because
  Remotion renders frames out of order and in parallel.
- Any WebGL transition: it will fail, because ANGLE is off.

### Two capture traps

- **An element screenshot photographs whatever is painted over the element**, not the element.
  That is why the capture script hides pinned layers first.
- **Tailwind's reset gives every image `max-width: 100%`**, which beats an inline width. A cropped
  copy of a capture needs `maxWidth: "none"` or it squeezes into its box as scrambled text.
