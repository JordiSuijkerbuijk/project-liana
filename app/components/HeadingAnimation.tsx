'use client';

import { RefObject, useCallback, useEffect, useRef } from 'react';

import anime, { AnimeTimelineInstance } from 'animejs';

export default function HeadingAnimation({
  text = '',
  containerRef,
}: {
  text: string;
  containerRef: RefObject<HTMLDivElement>;
}) {
  const textRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<AnimeTimelineInstance | null>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  const scrollHandler = useCallback(() => {
    if (!containerRef.current || !textRef.current || !timelineRef.current) return;

    const scrollPercentage = Math.max(
      0,
      Math.min(
        1,
        (window.scrollY -
          (textRef.current.offsetTop + window.innerHeight + textRef.current.clientHeight)) /
          containerRef.current.clientHeight,
      ),
    );

    timelineRef.current.seek(timelineRef.current.duration * scrollPercentage);
  }, [containerRef]);

  useEffect(() => {
    if (!textRef.current || !containerRef.current) return;

    timelineRef.current = anime
      .timeline({
        targets: Array.from(textRef.current.children),
        easing: 'easeInQuad',
        delay: anime.stagger(175),
        duration: 1000,
        autoplay: false,
      })
      .add({ opacity: [0.2, 1] });

    observerRef.current = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          window.addEventListener('scroll', scrollHandler);
          return;
        }

        window.removeEventListener('scroll', scrollHandler);
      });
    });

    observerRef.current.observe(containerRef.current);

    return () => {
      window.removeEventListener('scroll', scrollHandler);
    };
  }, [containerRef, scrollHandler]);

  return (
    <div
      className="flex flex-wrap max-w-5xl px-12 py-12 font-bold text-black text-heading-5 gap-x-1"
      ref={textRef}
    >
      {text.split(' ').map((item, key) => (
        <p className="transition-opacity opacity-20 duration-400" key={key}>
          {item}
        </p>
      ))}
    </div>
  );
}
