#!/usr/bin/env bash
# Sets up this folder as a CampusAI video workspace for Claude Code. Safe to run again.
#   bash install.sh
# Our skills and the video connectors come from the plugin (see README.md). This script does the
# rest: your learning folder, the borrowed skills, and the Remotion studio.
set -u
KIT="$(cd "$(dirname "$0")" && pwd)"
ok() { printf '  done  %s\n' "$1"; }
skip() { printf '  skip  %s\n' "$1"; }

echo "1. The plugin (our skills and the video connectors)"
if command -v claude >/dev/null 2>&1; then
  if claude plugin list 2>/dev/null | grep -q "campusai-video@campusai-video-kit"; then
    ok "already installed"
  else
    claude plugin marketplace add CampusAI-app/campusai-video-kit >/dev/null 2>&1
    claude plugin install campusai-video@campusai-video-kit >/dev/null 2>&1 \
      && ok "campusai-video plugin" || skip "plugin install failed, see README.md"
  fi
else
  skip "claude command not found, see README.md"
fi

echo "2. Your learning folder"
if [ -d "$KIT/learning" ]; then
  ok "learning/ already exists, left as it is"
else
  cp -R "$KIT/learning-starter" "$KIT/learning" && rm -f "$KIT/learning/README.md" && ok "learning/ created from the starter"
fi

echo "3. Borrowed skills, fresh from GitHub"
if command -v npx >/dev/null 2>&1; then
  npx -y skills add remotion-dev/skills -g -a claude-code -s '*' -y >/dev/null 2>&1 \
    && ok "remotion-dev/skills (official Remotion skills)" || skip "remotion-dev/skills, install by hand later"
  npx -y skills add emilkowalski/skills -g -a claude-code -s animation-vocabulary -y >/dev/null 2>&1 \
    && ok "animation-vocabulary" || skip "animation-vocabulary, install by hand later"
else
  skip "npx not found. Install Node 18 or newer, then run this again"
fi

echo "4. The Remotion studio"
if command -v npm >/dev/null 2>&1; then
  (cd "$KIT/studio" && npm install --silent >/dev/null 2>&1) && ok "studio dependencies" || skip "npm install failed, run it inside studio/"
else
  skip "npm not found"
fi

echo "5. Optional tools"
for t in ffmpeg gh; do
  command -v "$t" >/dev/null 2>&1 && ok "$t is installed" || echo "  note  $t is missing: brew install $t"
done
[ -d "/Applications/Google Chrome.app" ] && ok "Google Chrome" || echo "  note  Google Chrome is missing. The capture script uses it."

echo
echo "Next: restart Claude Code, run /mcp and approve the Raylight sign-in,"
echo "then always start Claude Code from this folder so CLAUDE.md loads."
