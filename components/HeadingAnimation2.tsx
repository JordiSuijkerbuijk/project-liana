'use client';

import anime, { AnimeTimelineInstance } from 'animejs';
import { useEffect, useRef } from 'react';

export default function HeadingAnimation2({ text = '' }: { text: string }) {
  const elementRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<AnimeTimelineInstance | null>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const testText =
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.';

  useEffect(() => {
    if (!textRef.current || !elementRef.current) return;

    timelineRef.current = anime.timeline({
      // targets: Array.from(textRef.current.children),
      easing: 'easeInQuad',
      // delay: anime.stagger(100),
      autoplay: false,
    });

    Array.from(textRef.current.children).map((item) => {
      if (timelineRef.current) {
        timelineRef.current.add({ targets: item, opacity: [0.2, 1], duration: 400 });
      }
    });

    observerRef.current = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          window.addEventListener('scroll', scrollHandler);
          return;
        }

        window.removeEventListener('scroll', scrollHandler);
      });
    });

    observerRef.current.observe(elementRef.current);

    return () => {
      window.removeEventListener('scroll', scrollHandler);
    };
  }, []);

  function scrollHandler() {
    if (!elementRef.current || !textRef.current || !timelineRef.current) return;

    const scrollPercentage = Math.max(
      0,
      Math.min(
        1,
        (window.scrollY -
          elementRef.current.offsetTop +
          (textRef.current.offsetTop + textRef.current.clientHeight / 2)) /
          window.innerHeight
      ) * 1.4
    );

    timelineRef.current.seek(timelineRef.current.duration * scrollPercentage);
  }

  return (
    <div className='relative flex items-center h-full' ref={elementRef}>
      <div
        className='flex flex-wrap max-w-5xl px-12 py-12 text-3xl font-bold text-white gap-x-1'
        ref={textRef}
      >
        {testText.split(' ').map((item, key) => (
          <p className='opacity-20' key={key}>
            {item}
          </p>
        ))}
      </div>
    </div>
  );
}
