"use client";

import playScrollBasedAnimation from "@/helpers/playScrollBasedAnimation";
import { useScroll } from "@/helpers/useScroll";
import anime, { AnimeTimelineInstance } from "animejs";
import { RefObject, useEffect, useRef } from "react";

export default function OnScrollLine() {
  const timelineRef = useRef<AnimeTimelineInstance | null>(null);
  const svgRef = useRef<SVGPathElement | null>(null);

  useEffect(() => {
    if (!svgRef.current) return;

    timelineRef.current = anime
      .timeline({
        easing: "linear",
        autoplay: false,
      })
      .add({ targets: svgRef.current, strokeDashoffset: [1, 0] }, 0);
  }, []);

  const sectionContainer = useScroll(
    (progress) => {
      playScrollBasedAnimation(progress * 2, timelineRef.current);
    },
    {
      top: false,
      bottom: false,
    }
  );

  return (
    <div className="absolute top-0 left-0 w-full overflow-hidden aspect-square">
      <div
        className="absolute w-[calc(100%_+_2.5rem)] -left-4 top-16"
        ref={sectionContainer as RefObject<HTMLDivElement>}
      >
        <svg viewBox="0 0 2000 2000" className="lineAnimation">
          <defs>
            <linearGradient id="linear" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#c295d8" />
              <stop offset="100%" stopColor="#f1c6d3" />
            </linearGradient>
          </defs>
          <path
            d="M0,163.475S562.8,728.329,529.694,1235.953c-26.9,344.249-535.212,353.129-369.682,44.141,231.741-357.549,717.294-314.506,899.376-148.976s192.219,207.336,422.106,54.078,199.235,567.055,485.317,541.512"
            ref={svgRef}
            fill="none"
            strokeLinecap="round"
            stroke="url(#linear)"
            strokeWidth="35"
            pathLength="1"
            strokeDashoffset="1"
            style={{ strokeDashoffset: 1 }}
          />
        </svg>
      </div>
    </div>
  );
}
