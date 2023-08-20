"use client";

import Container from "@/app/components/Container";
// import lerp from "@/helpers/lerp";
import playScrollBasedAnimation from "@/helpers/playScrollBasedAnimation";
import { useScroll } from "@/helpers/useScroll";
import anime, { AnimeTimelineInstance } from "animejs";
import { useEffect, useRef } from "react";

export default function VideoSlice() {
  const timelineRef = useRef<AnimeTimelineInstance | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const originalStartValue = useRef<number>(7.5);
  const currentClipVal = useRef<number>(7.5);
  const targetClipVal = useRef<number>(7.5);
  const animFrame = useRef<number | null>(0);

  useEffect(() => {
    const tl = anime
      .timeline({
        duration: 100,
        easing: "linear",
      })
      .add({
        targets: videoRef.current,
        clipPath: ["inset(0% 7.5% 0% 7.5%)", "inset(0% 0% 0% 0%)"],
      });
    timelineRef.current = tl;
  }, []);

  // Scroll-based zoom animation
  const sectionContainer = useScroll(
    (progress) => {
      console.log("progress", progress);
      // Use progress to calculate the target and use that to animate lerped val
      // so animation isn't so choppy. Especially with small progress container
      // targetClipVal.current =
      //   originalStartValue.current - originalStartValue.current * progress;
      // if (animFrame?.current) cancelAnimationFrame(animFrame.current);
      // animFrame.current = requestAnimationFrame(animateClipPath);
      playScrollBasedAnimation(progress, timelineRef.current);
    },
    {
      top: false,
      bottom: false,
    }
  );

  // function animateClipPath() {
  //   if (!videoRef?.current) return null;
  //   const lerpedVal = lerp(currentClipVal.current, targetClipVal.current, 0.25);

  //   if (isWithinRange(lerpedVal, targetClipVal.current)) {
  //     videoRef.current.style.clipPath = `inset(0% ${targetClipVal.current} 0% ${targetClipVal.current})`;
  //     currentClipVal.current = targetClipVal.current;
  //     if (animFrame.current) cancelAnimationFrame(animFrame.current);
  //     return null;
  //   }

  //   videoRef.current.style.clipPath = `inset(0% ${lerpedVal}% 0% ${lerpedVal}%)`;
  //   currentClipVal.current = lerpedVal;
  //   animFrame.current = requestAnimationFrame(animateClipPath);
  // }

  // function isWithinRange(val: number, target: number) {
  //   return val >= target - 0.01 && val <= target + 0.01;
  // }

  return (
    <section className="flex flex-col gap-y-12 py-24">
      <div ref={sectionContainer}>
        <Container className="flex justify-center">
          <h2 className="text-bold text-8xl text-center">
            Create Stunning Websites Effortlessly with Liana
          </h2>
        </Container>
      </div>
      <video
        muted
        disablePictureInPicture
        disableRemotePlayback
        loop
        playsInline
        className="h-screen object-cover clip-path-video-element"
        ref={videoRef}
      >
        <source src="https://terrazabalear.com/wp-content/uploads/2023/03/terraza_balear-awakening_senses_-_loop-1.mp4-1080p-1.mp4" />
      </video>
    </section>
  );
}
