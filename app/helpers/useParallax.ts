"use client";

import anime, { AnimeTimelineInstance } from "animejs";
import { useEffect, useRef, RefObject } from "react";
import { useScroll } from "./useScroll";

interface Layer {
  targets: RefObject<HTMLElement> | null;
  movement: number
};

export default function useParallax(layers: Layer[]) {
  const timelineRef = useRef<AnimeTimelineInstance | null>(null);
  const elementRefs = useRef

  const section = useScroll(parallaxElements, {
    startTracking: 'bottom',
    stopTracking: 'bottom'
  });

  useEffect(() => {
    timelineRef.current = createTimeline();
  }, [layers]);

  function createTimeline() {
    const tl = anime.timeline({
      easing: "linear",
      duration: 100,
    });

    layers.forEach((layer) => {
      if(!layer.targets?.current) return;
      tl.add(
        {
          targets: layer.targets.current,
          translateY: [`${layer.movement}vh`, `-${layer.movement}`],
        },
        0
      );
    });
    return tl;
  }

  function parallaxElements(progress: number) {
    if (!timelineRef.current) return;
    const timelineDuration = timelineRef.current.duration;
    timelineRef.current.seek(timelineDuration * progress);
  }

  return section;
}
