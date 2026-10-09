# CampusAI video kit

How the CampusAI team makes video with Claude: the process, the tools, our Remotion studio as a
template, and a learning loop that makes every video better than the last.

**If you are Claude and someone sent you this link, read `START-HERE.md` and set it up for them.**

## Screenshots and footage come from the demos

Every CampusAI video shows the real product, and the real product for video is the demo:

- **https://campusai-demo.vercel.app** is where every screenshot and screen recording comes from.
  It is public, needs no login, and runs on a made-up student (Maya Chen, Finance junior at the Smith
  School), which is what makes it safe to film.
- **https://campusai-stage.vercel.app** runs the same demo build. Use it if the demo is down.

Never film a real student's account, and never draw or invent a CampusAI screen. A mockup cannot be
posted. `studio/scripts/capture-demo.mjs` takes crisp, same-size screenshots of any demo page, and
`skills/campusai-video/reference/02-the-real-product.md` lists the pages and what is on each.

## Set up

**Claude Code** (the full kit):

```bash
git clone https://github.com/CampusAI-app/campusai-video-kit.git "CampusAI Video"
cd "CampusAI Video"
bash install.sh
```

No GitHub account is needed. If `git` is not installed, use **Code, then Download ZIP** on this page
and unzip it instead. `install.sh` installs the plugin (our skills plus the Raylight, Motion,
Context7, DeepWiki and Inspo connectors), creates your `learning/` folder, pulls the official Remotion
skills from GitHub, and sets up the studio. Then restart Claude Code, run `/mcp`, approve the Raylight
sign-in, and always start Claude Code from this folder.

**The Claude app** (desktop or web): Raylight and the method work there, the Remotion studio does
not. `START-HERE.md` has the steps.

## Get updates

```bash
claude plugin marketplace update campusai-video-kit
claude plugin update campusai-video@campusai-video-kit
git pull
```

Your `learning/` folder is never touched by an update.

## What is in here

| Path | What it is |
|---|---|
| `skills/campusai-video/` | The method. `SKILL.md` is the front door |
| `skills/hook-retention-psychology/` | The first two seconds and the watch-through |
| `studio/` | Our Remotion project, as a working template |
| `learning-starter/` | What the team has learned so far. Copied to your `learning/` on install |
| `CLAUDE.md` | Always-on instructions for video work in this folder |
| `Read me first.docx` | The short version, for people rather than Claude |

Everything public is cleared by Jacob before it posts.
