# Start here

**If you are Claude and you were just handed this link or folder, this file is for you.** Set the kit
up, then tell her plainly what you turned on. If you are a person, open `Read me first.docx` instead.

## What this is

The CampusAI video kit: how the team makes videos with Claude, the tools, and our working Remotion
project as a template. Everything she films comes from the demos (see `README.md`).

- `skills/campusai-video/` the method. `SKILL.md` is the front door, `reference/` holds the depth.
- `skills/hook-retention-psychology/` the first two seconds and the watch-through.
- `studio/` our Remotion project. It renders today.
- `learning-starter/` what the team has learned so far. `install.sh` copies it to `learning/`, which
  is hers and grows with every video. Updates never overwrite `learning/`.
- `CLAUDE.md` the always-on instructions for video work.
- `.claude-plugin/` and `.mcp.json` make this repo a Claude Code plugin: one install gives her both
  skills and the video connectors, and updates arrive with one command.

## First, which Claude is she using?

Ask, or work it out. It decides the setup.

### Claude Code (the full kit)

This is what the kit is built for, because the Remotion studio and the capture script need a
terminal.

1. Check the basics: `node -v` (18 or newer), Google Chrome, and Homebrew for `ffmpeg` and `gh` if she
   wants them. Install what is missing, explaining each one in a line.
2. Get the folder. `git clone https://github.com/CampusAI-app/campusai-video-kit.git "CampusAI Video"`
   needs no GitHub account. Without git, download the ZIP from the repo page and unzip it.
3. Run `bash install.sh` from that folder. It installs the plugin, creates `learning/`, installs the
   official Remotion skills and `animation-vocabulary` from GitHub, and runs `npm install` in
   `studio/`.
4. Have her make a Raylight account at raylight.app if she has not, restart Claude Code, run `/mcp`,
   and approve the Raylight sign-in.
5. She should always start Claude Code from inside this folder, so `CLAUDE.md` and `learning/` load.
6. Prove it works: `cd studio && npm run dev`, open the preview and click through the films. Then
   `npm run capture -- /events public/captures/test.png` and open the image.
7. Tell her which skills and connectors landed.

### The Claude app (desktop or web)

Raylight and the method work here. The Remotion studio does not, because it needs a terminal.

1. Download the ZIP from the repo page. Zip `skills/campusai-video` and
   `skills/hook-retention-psychology` separately and have her upload each under Settings, then
   Capabilities, then Skills. Code execution needs to be on.
2. Add connectors under Settings, then Connectors, then Add custom connector. Raylight first:
   `https://api.raylight.app/mcp`. Then, if she wants them, the others in `.mcp.json`.
3. Have her make a Project called CampusAI Video and paste `CLAUDE.md` into its instructions, so the
   method is always on.
4. Add the files in `learning-starter/` to the Project's files. The app cannot save to them, so after
   each video give her the updated text of any file that changed and have her replace it.

## What to tell her when you are done

In plain words: what got set up, that she can just describe the video she wants, and that it always
starts with the idea, the flow and the point before any video gets made. Tell her every screenshot
and recording comes from https://campusai-demo.vercel.app. Mention the three things that stop a video
from posting (free Raylight badge, Remotion licence, free-tier voice) so none is a surprise later.
Everything public is cleared by Jacob first.

Then open https://campusai-demo.vercel.app together so she has seen the real product before making
anything about it.

Do not read her this file.
