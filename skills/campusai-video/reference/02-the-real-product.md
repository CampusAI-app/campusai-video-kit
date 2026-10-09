# The real product

## Why this matters more than anything else in the skill

Every CampusAI video shows the actual platform. A hand-drawn mockup of a CampusAI screen, however
good it looks, cannot be posted: it shows a product we do not have and it is off brand. This has
been said plainly and more than once, so treat it as fixed.

What is allowed: recording the demo, capturing screens from the demo, and redrawing a real screen in
Raylight or Remotion using real captures, real copy read off the product, and real colours. What is
not: inventing a screen, inventing a feature, or inventing content to fill a screen.

## The demo

**https://campusai-demo.vercel.app** is where every screenshot and recording comes from. It is
public and needs no login. **https://campusai-stage.vercel.app** runs the same demo build, so use it
if the demo is down. It runs on a made-up student,
which is the whole reason it is safe to film. Real student records are legally protected, so never
film a real account, and check every frame anyway: the demo has been caught before with something
that should not have been on screen.

The student is **Maya Chen**, a Finance junior at the Smith School, aiming at an Investment Banking
Summer Analyst role. When a film needs a student, it is her, with her real details from the demo.
Do not give her a different major, GPA or internship than the demo shows.

Pages worth knowing (checked 2026-10-09):

| Page | Link | What is there |
|---|---|---|
| Dashboard | `/` | Your daily brief, Ask CampusAI, What's new |
| Career | `/career` | Resume optimization, career events this week, top matches |
| Job Match | `/career?view=jobs` | Jobs for you, each with why it fits her |
| Resume | `/career?view=resume` | Suggestions for her resume, her skills |
| Events | `/events` | What's happening on campus |
| Planner | `/academics/planner` | Maya's 4-year plan |
| Calendar | `/calendar` | Her week and month |
| Organizations | `/organizations` | Clubs, and orgs speaking for themselves |
| Dining | `/dining` | On and off campus dining |
| Notifications | `/notifications` | What she gets notified about |

An unknown path quietly shows the dashboard rather than an error, so if a page looks like the
dashboard you probably have the address wrong.

The demo changes as the team builds. Look at the page before planning a beat around it, and expect
captures older than a few weeks to be out of date. The sample captures inside `studio/` are from
September and the Job Match page has been redesigned since, so recapture before posting anything
built on them.

**Never assume the product does something because a film would like it to.** Two real examples
from September: the chat answered in text only and could not return a job card, and jobs show a
"Strong match" or "Good match" label rather than a percentage. A beat built on a job card in chat,
or on a match score, would have shown a feature that did not exist. These may have changed, which
is the point: open the page and do it before building a beat on it.

## Two ways to get footage

### Screen recording, for anything that moves

Use **Cap** (cap.so, free) in **Studio mode**, not Instant. Studio records locally at full quality.

Turn every beautify option off: no background, no padding, no rounded corners, no auto-zoom, no
shadow. Record the product raw and clean. The polish gets added in Raylight or Remotion, and if it is
burned into the pixels it cannot be worked around later.

Walk the flow slowly and pause a beat on anything worth pointing at. Do not narrate. Voice is a
separate pass. Use a clean browser window at a fixed size, with no bookmarks bar, no extensions
showing, and nothing personal in the tabs.

### Still captures, for anything that should look crisp

`studio/scripts/capture-demo.mjs` photographs a page or one element of the demo at three times
normal resolution, the same size every time:

```bash
cd studio
npm run capture -- "/career?view=jobs" public/captures/mine/board.png
npm run capture -- /events public/captures/mine/card.png --el "article"
```

It hides anything pinned on top of the page first (the chat bar and the Feedback button both used
to land across cards and ship in bad captures). Use `--keep "<selector>"` when the thing you want is
itself a pinned layer, like an open detail panel, and raise `--height` when a panel cuts off its own
content. Captures come out light, because that is what a visitor sees.

Stills are usually better than a recording for anything Raylight or Remotion will move with a
camera, because the camera move looks expensive and the text stays sharp.

## Reading the product for copy

On-screen words come from the product, verbatim, not paraphrased. If a beat quotes a job reason,
use the reason the demo actually shows for that job. If a heading appears, it is the heading the
page uses. Then every place the film differs from the product is a deliberate choice you can name.

Never invent a fact to fill a frame. If the real list is not available, show the count, or show
fewer real things, rather than a full screen of made-up ones.
