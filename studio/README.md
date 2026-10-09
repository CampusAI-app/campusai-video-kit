# CampusAI video studio

Our Remotion project, handed over as a working template. The method behind it is in the
`campusai-video` skill that came with this kit; read that before changing anything here.

```bash
npm install
npx playwright install chromium   # only if the capture script cannot find Google Chrome
npm run dev                        # Remotion Studio, live preview at localhost:3000
npm run capture -- /career?view=jobs public/captures/mine/board.png
npm run film JobMatchFilm-4x5      # the real export: PNG frames, crf 12, colour-tagged
npm run still JobMatchFilm-4x5     # one frame
npm run probe -- footage.mov       # exact seconds and frames of a recording
```

Remotion needs a paid company licence for CampusAI. Check with Jacob before rendering anything
that will be posted.
