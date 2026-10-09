# Raylight

Raylight (raylight.app) is a motion design editor for product videos: screenshots and footage in,
camera moves, text animation and effects out. It has a connector, so Claude can read a project, make
edits, and render frames to check its own work while you watch the canvas change.

It is the first tool to reach for on most CampusAI videos. Its templates are recreations of top-tier
work (Linear, Apple, Fey, Revolut and others), so the motion craft comes built in.

## Setting it up

1. Make an account at raylight.app.
2. Connect it to Claude.
   - **Claude app (desktop or web):** Settings, then Connectors, then Add custom connector. Paste
     `https://api.raylight.app/mcp`, click Add, then Connect, and approve the Raylight sign-in.
   - **Claude Code:** `claude mcp add --transport http raylight https://api.raylight.app/mcp`, then
     run `/mcp` once in a Claude Code session and approve the sign-in.
3. Open your project at raylight.app in a browser and leave that tab open while Claude works. It
   does not need to be the front tab, but if it closes, sleeps with the laptop, or the browser
   discards it after a long idle, calls time out. Reopen it and retry.

## The plan question, before anything is posted

Checked on raylight.app/pricing, 2026-10-09:

| Plan | Price | Connector calls | Export |
|---|---|---|---|
| Free | $0 | 50 a week | 1080p, with a "Made in Raylight" badge |
| Hobby | $9 a month | 1,000 a week | 4K, no badge |
| Pro | $18 a month | 5,000 a week | 4K, no badge |

Two consequences. **A Free export carries a badge, so it is fine for drafts and not for posting.**
Ask Jacob before a Raylight cut is meant to go out. And **50 calls a week runs out fast.** Every
read, edit batch and render counts as one. Spend them well:

- Fetch Raylight's design guide once and save it to `learning/raylight-guide/` (that folder's README
  says how). After that, read the saved files instead of calling `get_design_guide` again.
- Batch edits. One `apply_edits` call takes up to 200 edits. Create and animate in the same batch:
  give a new layer `ref: "name"` and use `"$name"` in later edits instead of a second round trip.
- Render a filmstrip (several frames in one call) rather than stills one at a time.
- Plan the scene fully in chat before the first edit. Thinking is free, calls are not.

## The working loop

1. `get_editor_status`. If no tab is connected, open the project link it gives you.
2. Starting fresh: `list_templates`, then `start_from_template`. Swapping our captures and copy into
   an official template beats building from an empty canvas, because the motion is already right.
3. `get_project_overview` to see the whole project: shots, coordinate system, style.
4. Write a one-paragraph storyboard: scenes, pacing, palette, type. Agree it before editing.
5. For each shot: `get_shot_details`, then `apply_edits` in one batch, then `render_filmstrip` or
   `render_stills` and look. When reviewing a render, read the numbers it returns for each layer's
   position rather than judging pixels by eye. Fix what reads wrong, then move to the next shot.
6. `upload_media` brings our captures and recordings into the project (from a public link, or a
   local file through the upload link it returns). Then place them with `add_image` or `add_shot`.
7. `save_as_video` exports. `list_videos` finds exports later.

To give one existing shot a template's motion, use the `apply_template_motion` edit with the
template's slug and scene number. The scene numbers in a saved template guide are the same numbers
it expects.

## Craft that matters most here

The full ruleset is Raylight's `craft-rules` guide (saved in `learning/raylight-guide/`). The parts
that come up on every CampusAI
film:

- A scene runs about 3.9 seconds on average. Anything much longer needs a reason.
- Text arrives word by word with a short stagger and a slight blur, and the stagger can shrink
  across a sentence so it feels like it is gathering speed.
- The camera arrives at its subject before the thing happens, holds while it happens, and releases
  when it finishes, not on a timer.
- One subject per scene. If two things move for two reasons, one of them is another scene.
- Real product captures on a soft, warm ground with light behind them look expensive. Invented UI
  looks like a template.

The templates closest to CampusAI's needs: `linear-agent` (a chat or agent working), `raylight-agent-launch`
(a prompt typing itself, an interface assembling), `revolut-app` and `3d-mobile-app` (an app on a
device), `apple-news` (the most used template, a clean editorial product walk), and
`raylight-marketplace` (cards filling a grid, a counter).

## Raylight and Remotion together

Raylight's numbers are the spec for Remotion work too. Read a beat sheet, then implement the same
timings and easings in code. That is how the coded films got their motion.
