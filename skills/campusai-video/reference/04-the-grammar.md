# The grammar

How a CampusAI film is put together beat by beat, and how text moves inside it. Everything here
applies in Raylight and in Remotion alike. The numbers come from the signed-off films.

## Beats

**Smooth and focused is a spec, not a style.** Four rules, in order:

1. **One subject per beat.** One idea on screen at a time. If two things are moving for two
   different reasons, one of them is a separate beat.
2. **Arrive early.** Frame the subject BEFORE it happens. In the thinking trace the camera starts
   moving to a row 420ms before that row lands, so it is already there when the step arrives. A
   camera that travels to find its subject eats the subject.
3. **Hold while the one thing happens.** Do not move for a second reason mid-event.
4. **Release on completion, not on a timer.** The camera pulls back when the streaming finishes,
   not at a round number of seconds.

### The films, beat for beat

These two are 1920 x 1080 at 30fps, drawn end to end with no footage. Both are in `studio/` and
render today. Copy these shapes before inventing a new one.

**`ChatAsk-16x9`, 17.3s, launch film, drawn end to end, zero footage.**

| Beat | Length | What happens |
|---|---|---|
| hook | 2.0s | "Ask CampusAI anything." Word by word, on a 2.034 to 1.0 pull-open |
| ask | 3.6s | Composer settles, placeholder fades in, question types, send button presses |
| think | 3.7s | Four steps land one at a time at 800ms, camera walks each row, then a gather |
| answer | 5.0s | Lead line, then block one streams word by word while the camera holds close, then it releases and blocks two and three land |
| breadth | 2.6s | Other questions scatter in at 130ms apart |
| cta | 2.2s | "Ask CampusAI." |

**`ClubsFair-16x9`, silent seamless loop for a fair table.**

| Beat | Length | What happens |
|---|---|---|
| field | 3.4s | 27 tiles drift, the headline lands |
| narrow | 2.2s | Converging lines close, the field collapses to centre |
| ask | 3.2s | The composer types the question |
| answer | 8.6s | Four real clubs accumulate, camera opens out from 1.16 to 1.0 |
| tail | 0.8s | Bare ground, so the loop point is ground to ground with no seam |

The tail beat is the whole trick of a looping film. A call to action card would break the loop. At a
booth the QR code is on the table and a person is standing next to it, so the film does not need one.

**`JobMatchFilm`, the September rebuild, 4:5 first, also 9:16 and 16:9.** Built from real captures of
the Job Match page rather than drawn, and the source of most of the newer lessons:

- **Open on the product.** The first cut opened on two lines of copy over black. Frame one is the
  feed cover, so it now opens on a job card with those same lines in a caption band underneath.
- **A camera walk down a card is a geometry question before it is a taste question.** A tall card
  in a 4:5 frame is already mostly in view, so there is nothing to travel through. Pushing in crops
  the words, and dimming the rest is the highlighting that was already rejected. What worked was
  the card's own scroll, which is how a person reads it anyway. Before planning a walk, check the
  frame is meaningfully shorter than the card.
- **Check readability at phone size.** One beat spent nine seconds on body copy that came out around
  seven point type on a real phone. Shrink the frame to about 430 pixels wide and look before
  trusting a detail beat. If the captions are doing the work, cut the beat shorter.

### Transitions

Two only. Nothing else.

- **Between registers** (text to UI, UI to graphic): a 9 frame (300ms) fade that dips through the
  dark ground, with `shouldFadeOutExitingScene: true`. Cross-dissolving two dense UI screens reads
  as mush for the whole length of the dissolve. Dipping through ground does not.
- **Within one screen** (composer to trace to answer): the same fade at 14 frames, so it reads as a
  softer cut rather than a scene change.

No GL transitions. See `06-the-remotion-studio.md`, render rules, for why, and do not go looking for a nicer one.

---

## How text moves

There are exactly four text engines in these films. Pick the one that matches what the text IS.

### 1. Headline: word stagger with blur

For any film-register line, hook or call to action. Each word fades in, unblurs and slides, 80ms
apart, 620ms each, blurring from 10px, sliding 0.025 world units. Ease is out-expo. This is the
single most recognisable thing in our films, so use it for headlines and nothing else.

### 2. Composer: typewriter, per character

45ms per character. Placeholder fades in over 300ms to 900ms, then out just before typing starts at
1000ms. Caret blinks on a 520ms cycle in brand red and stops when the line is done. Then the send
button presses: scale 1 to 0.9 to 1 across 180ms, 300ms, 480ms after the last character, and picks
up a red glow. **The press matters.** Without it the film cuts away from a full text box, which
reads as an unfinished thought.

### 3. Answer: word-chunked streaming, 48ms per word

Not per character. Real server-sent events arrive in token chunks, so word at a time is both truer
and far calmer at film type size. A per-character typewriter on a paragraph looks frantic.

**Reserve a fixed height on any line being typed or streamed.** If the block reflows as words
arrive, every frame during the stream is a reflow frame and some of them render incomplete.

### 4. Accumulation: blocks mount one at a time

The message grows by MOUNTING children, never by animating a clipped height. Each block fades in
over roughly 520ms.

**And the timing shrinks as the travel grows.** In the clubs film the four blocks arrive at 500,
2000, 3320 and 4520ms with durations of 983, 897, 826 and 766ms. Later blocks have further to fall,
so shortening their duration keeps the visual speed constant. Equal durations make a stack feel like
it is slowing down.

### Anchoring, which is not optional

**Top-anchor anything that grows.** A centred card moves all of its earlier content every time a new
block mounts, and for about 300ms after each mount the frame captures mid-reflow with the card and
everything above the new block missing. Anchored to the top, growth only ever adds below, which is
also how a real chat message grows.

### The copy itself

- Casual, spoken, short. "Yeah, three of them. All worth your time for different reasons." Not
  "Here are three recommended events."
- One idea per line. Three same-weight lines stacked read as a wall at film type size, so drop one
  of them to the muted token.
- **No em dashes.** Anywhere, including on-screen text.
- **No all-caps wide-tracked eyebrow labels.** Ever.
- **No monospace.** Ever. Inter or system sans, always.
- Never invent a fact to fill a frame. If the real roster is not published, show the count, not 27
  made up names.

---
