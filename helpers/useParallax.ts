"use client";

import anime, { AnimeTimelineInstance } from "animejs";
import { useEffect, useRef } from "react";
import { useScroll } from "./useScroll";

type Layer = {
  targets: HTMLElement | HTMLElement[] | NodeList;
  layerNumber: number;
};

type Options = {
  viewportDelta: number;
  layers: Layer[];
};

export default function useParallax({ viewportDelta, layers }: Options) {
  const timelineRef = useRef<AnimeTimelineInstance | null>(null);

  const section = useScroll(parallaxElements, {
    top: true,
    bottom: true,
    offsetViewPort: true,
  });

  useEffect(() => {
    timelineRef.current = createTimeline();
  }, []);

  function createTimeline() {
    const tl = anime.timeline({
      easing: "linear",
      duration: 100,
    });

    layers.forEach((layer) => {
      const ratio = layers.length / layer.layerNumber;
      const movementAmount = viewportDelta * ratio;
      tl.add(
        {
          targets: layer.targets,
          translateY: [`${movementAmount}vh`, `-${movementAmount}`],
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
