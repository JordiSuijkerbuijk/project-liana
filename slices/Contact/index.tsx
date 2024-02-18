"use client";

import Container from "@/components/Container";
import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import anime, { AnimeTimelineInstance } from "animejs";
import clsx from "clsx";
import localFont from "next/font/local";
import { useCallback, useEffect, useRef } from "react";

/**
 * Props for `Contact`.
 */
export type ContactProps = SliceComponentProps<Content.ContactSlice>;

const drukwide = localFont({
  src: "../../public/fonts/DrukWide/Druk-Wide-Bold.ttf",
  variable: "--font-drukwide",
  display: "swap",
});

/**
 * Component for "Contact" Slices.
 */
const Contact = ({ slice }: ContactProps): JSX.Element => {
  const scrollingTextRef = useRef<HTMLDivElement | null>(null);
  const scrollingTextContainerRef = useRef<HTMLDivElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const timelineRef = useRef<AnimeTimelineInstance | null>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  const scrollHandler = useCallback(() => {
    if (
      !containerRef.current ||
      !scrollingTextContainerRef.current ||
      !timelineRef.current
    )
      return;

    const scrollPercentage = Math.max(
      0,
      Math.min(
        1,
        (window.scrollY -
          (scrollingTextContainerRef.current.offsetTop -
            containerRef.current.clientHeight * 0.8)) /
          containerRef.current.clientHeight
      )
    );

    timelineRef.current.seek(timelineRef.current.duration * scrollPercentage);
  }, [containerRef]);

  useEffect(() => {
    if (!scrollingTextRef?.current || !containerRef?.current) return;

    anime({
      targets: scrollingTextRef.current,
      loop: true,
      duration: 10000,
      translateX: [0, "-25%"],
      autoplay: true,
      easing: "linear",
    });

    timelineRef.current = anime
      .timeline({
        targets: scrollingTextContainerRef.current,
        easing: "easeInOutQuad",
        duration: 100,
      })
      .add({ translateX: ["-25%", "-40%"] });

    observerRef.current = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          window.addEventListener("scroll", scrollHandler);
          return;
        }

        window.removeEventListener("scroll", scrollHandler);
      });
    });

    observerRef.current.observe(containerRef.current);

    return () => {
      window.removeEventListener("scroll", scrollHandler);
    };
  }, [scrollHandler]);

  return (
    <section
      className="flex flex-col min-h-[50vh] pt-32 pb-10 overflow-hidden"
      ref={containerRef}
    >
      <div
        className="inline-flex font-medium tracking-tighter gap-x-20 text-accent"
        ref={scrollingTextContainerRef}
      >
        <div
          className={clsx([
            "inline-flex whitespace-nowrap gap-x-20",
            drukwide.className,
          ])}
          ref={scrollingTextRef}
        >
          <h1 className="text-[9vw]">Talk to us.</h1>
          <h1 className="text-[9vw]">Talk to us.</h1>
          <h1 className="text-[9vw]">Talk to us.</h1>
          <h1 className="text-[9vw]">Talk to us.</h1>
        </div>
      </div>
      <Container className="flex flex-col gap-y-4 w-full mt-4">
        <p className="max-w-sm">
          We believe close collaboration is the key to creating exceptional
          products. If you do too, we’d love to hear from you.
        </p>
        <button className="flex px-6 py-3 transition-colors border border-white rounded-full border-1 w-fit text- hover:text-black hover:bg-white">
          Get in touch
        </button>
      </Container>
    </section>
  );
};

export default Contact;
