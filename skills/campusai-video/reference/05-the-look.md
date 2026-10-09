# The look

## Two palettes, and which one you are in

**Film register (this file).** The signed-off films use the product's dark tokens below. That is a
choice for film, not what a visitor sees: the demo shows light by default. `ChatAsk-16x9-Light` in
the studio is the light version of the chat film, and light captures sit on a light ground.

**Social register.** Posts and graphics use the brand palette: ground `#0b0708`, raised `#1c1516`,
ink `#f6f0ef`, coral `#f0435c`, brand red `#e21833`, with coral used as light (a glow, a wash, a
hairline) rather than as ink, plus grain on flat surfaces. See `10-campusai.md`. A video made
mainly of type and graphics, with little product on screen, belongs in this register.

Either way: warmed near-black and near-white, never pure `#000` and `#fff`, and one accent.

## The film palette

These are the product's own dark tokens read out of its stylesheet, not eyeballed. Put them in one
object and use nothing else.

```ts
export const UI = {
  bg: "#070709",                    // page background
  card: "#171012",                  // card surface
  cardGlass: "rgba(23,16,18,0.72)", // the real bubble is TRANSLUCENT, see below
  rule: "rgba(255,255,255,0.08)",
  ink: "#F2F1EF",
  mute: "rgba(255,255,255,0.45)",
  red: "#E21833",
  redDim: "rgba(226,24,51,0.12)",   // user bubble fill
  redEdge: "rgba(226,24,51,0.22)",  // user bubble border
  link: "#FF4050",                  // the accessible red on dark
  green: "#34D399",                 // completed step check
  radius: 34,                       // 15px product radius, scaled to film type
  shadow: "0 0 0 1px rgba(255,255,255,0.04), 0 10px 30px rgba(0,0,0,0.22)",
};
```

**The cards are translucent, and this is load bearing.** A solid 1250px card centred in a 1920 frame
masks the page gradient almost entirely and the shot comes back grey. Glass over the gradient is
what keeps the red on screen.

### The ground

The page gradient is the product's own, copied literally, with the top right red pushed up and given
reach toward the centre because the product's stack lights the corners, which works on a tall page
and leaves a 16:9 centre unlit.

```ts
export const PRODUCT_BG = [
  "radial-gradient(ellipse 95% 85% at 82% 2%, rgba(217,32,46,0.44) 0%, transparent 62%)",
  "radial-gradient(ellipse 90% 80% at 50% 45%, rgba(200,16,46,0.20) 0%, transparent 62%)",
  "radial-gradient(ellipse at 0% 100%, rgba(245,200,66,0.09) 0%, transparent 48%)",
  "radial-gradient(ellipse at 50% 30%, rgba(23,16,18,0.8) 0%, transparent 70%)",
  "#070709",
].join(", ");
```

**Paint it once, at the composition root, never inside a beat.** Inside a beat it flickers.

The film's own beats (hook, breadth, call to action) lay a warmer ground over the top:
`radial-gradient(120% 90% at 50% 42%, #2C1017 0%, #140A0D 46%, #08070A 100%)`.

### The grade

Bloom 0.85, vignette 0.53, grain 0.02. Static SVG turbulence for the grain, overlay blend.

**Product beats and film beats hold different registers.** On any beat showing the product: vignette
at half strength, no warm bloom, no grain. Two reasons, both learned the hard way. The demo's red
lives in the corners, which is exactly where a full vignette darkens hardest, so a full vignette
squeezes the brand red out of frame. And the grain layer, on the answer beat specifically, made the
page gradient render as flat grey no matter where the gradient was placed.

---

## The camera

**The camera is a layout resize, not a transform.** Pick a scale factor `k` and multiply every
dimension by it: width, padding, radius, font sizes, gaps, reserved heights. The type genuinely
grows instead of being scaled up.

```ts
const k = CAM_CLOSE + (CAM_WIDE - CAM_CLOSE) * progress;
const z = (v: number) => v * k;
// then: width: z(1250), fontSize: z(32), padding: z(34), borderRadius: z(34)
```

`transform: scale()` would be one line and it is wrong. See `06-the-remotion-studio.md`, render rules.

Values that work:

- Opening pull, film register: 2.034 to 1.0 over 850ms, out-expo.
- Answer beat, chat film: 1.45 close, releasing to 1.0 over 1400ms starting 150ms after the stream
  finishes.
- Answer beat, clubs film: 1.16 close, opening out across the whole accumulation.
- Step trace: 1.3 close per row, camera leading each row by 420ms, then a gather back to 1.0 over
  550ms while the rows compress upward.

Keep the close modest. The step column is 1150px wide rather than the composer's 1370px precisely
because 1370 x 1.5 overflows a 1920 frame and pushes the spinners off the left edge.

### Easings

Two, and only two.

```ts
export const EASE = {
  outExpo: Easing.bezier(0.16, 1, 0.3, 1), // everything that arrives
  inOut:   Easing.bezier(0.45, 0, 0.55, 1), // the few things that swap
};
```

---
