'use client';

import Container from '@/components/Container';
import anime, { AnimeTimelineInstance } from 'animejs';
import { useCallback, useEffect, useRef } from 'react';

export type HighlightedTextSliceProps = {
  description?: string;
  splitDescription?: Array<string>;
};

export default function HighlightedTextSlice({
  description,
  splitDescription,
}: HighlightedTextSliceProps) {
  const textRef = useRef<HTMLDivElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const timelineRef = useRef<AnimeTimelineInstance | null>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  const scrollHandler = useCallback(() => {
    if (!containerRef.current || !textRef.current || !timelineRef.current) return;

    const scrollPercentage = Math.max(
      0,
      Math.min(
        1,
        (window.scrollY - (textRef.current.offsetTop - containerRef.current.clientHeight * 1.25)) /
          containerRef.current.clientHeight
      )
    );

    timelineRef.current.seek(timelineRef.current.duration * scrollPercentage);
  }, [containerRef]);

  useEffect(() => {
    if (!containerRef.current || !textRef.current) return;

    timelineRef.current = anime
      .timeline({
        targets: Array.from(textRef.current.children),
        easing: 'easeInQuad',
        delay: anime.stagger(100),
        duration: 100,
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
    <section ref={containerRef} className='py-60'>
      <Container className='flex lg:max-w-5xl text-[6vw] lg:text-[3vw]'>
        <div ref={textRef} className='flex flex-wrap gap-x-2'>
          {splitDescription && splitDescription.map((item, key) => <span key={key}>{item}</span>)}
        </div>
      </Container>
    </section>
  );
}
