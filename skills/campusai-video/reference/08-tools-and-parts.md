# Tools and parts

Everything here is free unless it says otherwise. `install.sh` in the kit sets up the skills and the
Claude Code connectors in one go. In the Claude app, add connectors by hand under Settings, then
Connectors, then Add custom connector, using the links below.

## Connectors (MCP servers)

**For video, in the order you will use them:**

| Connector | Link | What it is for |
|---|---|---|
| **Raylight** | `https://api.raylight.app/mcp` | The editor. Claude reads and edits your project and renders frames to check. Needs a Raylight account. See `03-raylight.md` |
| **Motion** | `https://mcp.motion.dev/mcp` | Motion's docs and examples. Its spring-to-CSS-easing tool turns a spring into an exact easing curve, which is the bridge between a Raylight beat sheet and code |
| **Context7** | `https://mcp.context7.com/mcp` | Current documentation for any library, Remotion included. Use it before trusting Claude's memory of an API |
| **DeepWiki** | `https://mcp.deepwiki.com/mcp` | Ask questions about any public GitHub repo, for example how `remotion-dev/remotion` handles something, without reading the code yourself |
| **Inspo** | `https://inspomcp.dev/api/mcp` | Screenshots, palettes and structure from real shipped websites. For references, not for copying |

**Useful, but need an account:**

| Connector | Link | Note |
|---|---|---|
| Mobbin | `https://api.mobbin.com/mcp` | Real app screens and flows as reference. Needs a paid Mobbin plan |
| OriginKit | `https://mcp.originkit.dev/mcp` | Animated web components. Needs an OriginKit account and key |
| 21st.dev | 21st.dev | Component previews. Free tier allows only two code downloads a day |

These last three are for web and app design more than video. Skip them until a job needs them.

Claude Code commands, if `install.sh` did not run:

```bash
claude mcp add --scope user --transport http raylight https://api.raylight.app/mcp
claude mcp add --scope user --transport http motion   https://mcp.motion.dev/mcp
claude mcp add --scope user --transport http context7 https://mcp.context7.com/mcp
claude mcp add --scope user --transport http deepwiki https://mcp.deepwiki.com/mcp
claude mcp add --scope user --transport http inspo    https://inspomcp.dev/api/mcp
```

Then run `/mcp` inside Claude Code once to sign in to the ones that ask (Raylight does).

## Skills

**Ours, included in this kit:**

- `campusai-video` this skill.
- `hook-retention-psychology` the first two seconds and the watch-through. Run it on the opening
  before building, and again on the near-final cut.

**Borrowed, installed fresh from GitHub by `install.sh` so they stay current:**

- `remotion-dev/skills` the official Remotion skills: best practices, create, captions, render,
  transitions, markup, docs, upgrade and more. These are the house rules of the tool itself.
- `emilkowalski/skills` design engineering and motion by Emil Kowalski. `animation-vocabulary` is
  the one to know: describe an effect in plain words and it gives you the name to ask for.

```bash
npx -y skills add remotion-dev/skills -g -a claude-code -s '*' -y
npx -y skills add emilkowalski/skills -g -a claude-code -s animation-vocabulary -y
```

## GitHub is the parts shelf

Almost every piece of a film (a text reveal, a counter, a transition, a particle field) has been
written well already and published free. Look before writing. Three rules: do not rebuild what
exists, free beats paid, look to the community first.

**Borrow the mechanism, never the look.** A borrowed component brings its own timings, springs and
colours, and they will fight ours. Read it for how it works, then rebuild it on our two easings, our
tokens and our reserved heights.

Set up the GitHub command line once:

```bash
brew install gh
gh auth login        # GitHub.com, HTTPS, log in with a browser
```

Read before you take anything. Reading is free and touches nothing:

```bash
# find
gh api "search/repositories?q=remotion+in:name&sort=stars&per_page=25" \
  --jq '.items[] | "\(.stargazers_count)\t\(.full_name)\t\(.description)"'
# read the README
gh repo view av/remotion-bits
# list a folder
gh api repos/av/remotion-bits/contents/src/components --jq '.[].name'
# read one file
gh api repos/av/remotion-bits/contents/src/components/TypeWriter.tsx --jq '.content' | base64 -d
# alive, and what licence
gh api repos/av/remotion-bits --jq '"\(.license.spdx_id // "NONE") | pushed \(.pushed_at[:10])"'
```

Only after that, clone into a scratch folder, never straight into the studio.

The shelf, last checked 2026-08-31 (re-check before leaning on any of it):

| Repo | What it gives |
|---|---|
| `remotion-dev/skills` | The official Remotion skills |
| `reactvideoeditor/remotion-templates` | 81 free single-file templates: text, transitions, charts, logos, intros |
| `av/remotion-bits` | AnimatedText, TypeWriter, StaggeredMotion, AnimatedCounter and more. MIT |
| `remotion-dev/template-*` | About twenty official starters. `template-tiktok` does Whisper captions |
| `remotion-dev/remotion` | The engine. Read how a built-in really behaves instead of guessing |

Before adopting anything: read it in place, check what it contains (scripts and servers get looked
at before they run), check it does not overlap something already here, and confirm it is free and
maintained. Then say what you found rather than installing it quietly.

## Licences, plainly

- **Remotion** is free for companies with up to three employees and paid above that. Ask Jacob
  before a Remotion render is meant to post.
- **Raylight Free** exports carry a badge. Posting needs a paid plan. Jacob's call.
- **ElevenLabs free tier** is non-commercial. No free-tier voice goes out.
- **Several template repos declare no licence.** Fine to read and learn from. Check before copying a
  file verbatim into something public.
