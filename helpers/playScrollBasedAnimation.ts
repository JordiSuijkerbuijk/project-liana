import { AnimeTimelineInstance } from 'animejs';

export default function playScrollBasedAnimation(
  progress: number,
  timeline: AnimeTimelineInstance | null
) {
  console.log('timeline', timeline);
  if (!timeline) return;
  const reduceMotion = window.matchMedia(`(prefers-reduced-motion: reduce)`)?.matches === true;
  if (reduceMotion) return;
  timeline.seek(progress * timeline.duration);
}
