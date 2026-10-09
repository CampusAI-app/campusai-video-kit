import "./index.css";
import React from "react";
import { CalculateMetadataFunction, Composition, staticFile } from "remotion";
import { DemoVideo, DemoVideoProps } from "./DemoVideo";
import { ChatVideo, chatVideoFrames } from "./ChatVideo";
import { JobMatchFilm, jobMatchFrames } from "./JobMatchFilm";

/* The chat film's frame rate, in ONE place. Every beat in ChatVideo is authored
   in milliseconds and every sequence boundary is derived from this number, so
   raising it to 60 (where X caps) re-renders the same film with twice the
   samples and needs no other edit. Do not hand-double constants in a scene. */
const CHAT_FPS = 30;

/* The Job Match rebuild's frame rate, in ONE place, same contract. */
const JOBMATCH_FPS = 30;
import { ClubsVideo, CLUBS_VIDEO_FRAMES } from "./ClubsVideo";
import { getVideoDuration } from "./lib/getVideoDuration";
import {
  JOB_MATCH_11,
  JOB_MATCH_169,
  JOB_MATCH_45,
  JOB_MATCH_916,
  RESUME_COACH_916,
  RESUME_COACH_45,
  RESUME_COACH_169,
  JOB_MATCH_916_FRAMES,
  SCRIPT,
} from "./script";

/**
 * Resolves every scene's length, then the total, accounting for the fact that
 * a crossfade overlaps two scenes and therefore shortens the timeline.
 */
const calculateMetadata: CalculateMetadataFunction<DemoVideoProps> = async ({
  props,
}) => {
  const { script } = props;

  const resolvedDurations = await Promise.all(
    script.scenes.map(async (scene) => {
      if (scene.type !== "footage") return scene.durationInFrames;
      if (scene.durationInFrames !== "auto") return scene.durationInFrames;

      try {
        const seconds = await getVideoDuration(
          staticFile(`footage/${scene.src}`),
        );
        const total = Math.floor(seconds * script.fps);
        const usable = total - (scene.trimStart ?? 0);
        // Guard against a bad probe returning something nonsensical.
        return usable > 1 ? usable : script.fallbackFootageFrames;
      } catch {
        return script.fallbackFootageFrames;
      }
    }),
  );

  const sum = resolvedDurations.reduce((a, b) => a + b, 0);
  const overlap = script.transitionFrames * Math.max(0, script.scenes.length - 1);

  return {
    durationInFrames: Math.max(1, sum - overlap),
    fps: script.fps,
    width: script.width,
    height: script.height,
    props: { ...props, resolvedDurations },
  };
};

export const RemotionRoot: React.FC = () => {
  return (
    <>
      {/* Post 1 — Job Match. 4:5 is the primary: it is the tallest an Instagram
          feed post can be without being a Reel, and it gives the card a natural
          band underneath for the caption. The other two render from the same
          script and the same captures at no extra authoring cost, because we
          are composing card-shaped art rather than cropping a screen capture. */}
      {(
        [
          ["ResumeCoach-9x16", RESUME_COACH_916],
          ["ResumeCoach-4x5", RESUME_COACH_45],
          ["ResumeCoach-16x9", RESUME_COACH_169],
          ["JobMatch-9x16", JOB_MATCH_916],
          ["JobMatch-4x5", JOB_MATCH_45],
          ["JobMatch-16x9", JOB_MATCH_169],
          ["JobMatch-1x1", JOB_MATCH_11],
          // Frame export only, never rendered to video.
          ["JobMatch-9x16-Frames", JOB_MATCH_916_FRAMES],
        ] as const
      ).map(([id, script]) => (
        <Composition
          key={id}
          id={id}
          component={DemoVideo}
          durationInFrames={300}
          fps={script.fps}
          width={script.width}
          height={script.height}
          defaultProps={{ script, resolvedDurations: [] }}
          calculateMetadata={calculateMetadata}
        />
      ))}
      {/* CampusAI "ask anything" chat film. Its own composition rather than a
          script.ts scene: it is full-bleed footage under a camera chain, not
          the card-shaped scene model the other posts use, and folding it in
          would have dragged their script around for no gain. */}
      {(
        [
          ["ChatAsk-16x9", 1920, 1080, "dark"],
          ["ChatAsk-16x9-Light", 1920, 1080, "light"],
        ] as const
      ).map(([id, cw, ch, mode]) => (
        <Composition
          key={id}
          id={id}
          component={ChatVideo}
          durationInFrames={chatVideoFrames(CHAT_FPS)}
          fps={CHAT_FPS}
          width={cw}
          height={ch}
          defaultProps={{ mode }}
        />
      ))}
      {/* The hero stills that used to sit here were removed from this kit: they
          showed an invented CampusAI screen, which was rejected because it
          could not be posted. A still is just a one-frame composition
          (durationInFrames={1}) exported with `npm run still <id>`; build one
          from real captures. */}
      {/* CampusAI Job Match, 2026-09 rebuild. Its own composition rather than a
          script.ts scene, for the same reason the chat film is: this one
          composites captured product pixels under a light-and-camera model, not
          the card-shaped art the older posts compose. The August JobMatch-*
          compositions above are untouched and still render.
          4:5 is the primary — the tallest an Instagram feed post can be without
          being a Reel. 9:16 places its content through safeArea.ts. */}
      {(
        [
          ["JobMatchFilm-4x5", 1080, 1350],
          ["JobMatchFilm-9x16", 1080, 1920],
          ["JobMatchFilm-16x9", 1920, 1080],
        ] as const
      ).map(([id, cw, ch]) => (
        <Composition
          key={id}
          id={id}
          component={JobMatchFilm}
          durationInFrames={jobMatchFrames(JOBMATCH_FPS)}
          fps={JOBMATCH_FPS}
          width={cw}
          height={ch}
        />
      ))}
      {/* CampusAI clubs loop, for the SUSA Involvement Fair table. Silent and
          seamless by design.
          NO 9:16 YET, deliberately. The composer bar and the answer bubble are
          fixed at 1370 / 1290px and the reason lines have fixed heights so that
          streaming text cannot reflow them. Squeezing that into a 1080-wide
          frame overflows the bar and breaks every reserved height. Vertical
          needs its own layout pass, not a scale factor. */}
      <Composition
        id="ClubsFair-16x9"
        component={ClubsVideo}
        durationInFrames={CLUBS_VIDEO_FRAMES}
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="DemoVideo"
        component={DemoVideo}
        durationInFrames={300}
        fps={SCRIPT.fps}
        width={SCRIPT.width}
        height={SCRIPT.height}
        defaultProps={{ script: SCRIPT, resolvedDurations: [] }}
        calculateMetadata={calculateMetadata}
      />
    </>
  );
};
