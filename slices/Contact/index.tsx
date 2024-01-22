'use client';

import { Content } from '@prismicio/client';
import { SliceComponentProps } from '@prismicio/react';
import anime, { AnimeTimelineInstance } from 'animejs';
import localFont from 'next/font/local';
import { useCallback, useEffect, useRef } from 'react';

/**
 * Props for `Contact`.
 */
export type ContactProps = SliceComponentProps<Content.ContactSlice>;

const drukwide = localFont({
  src: '../../public/fonts/DrukWide/Druk-Wide-Bold.ttf',
  variable: '--font-drukwide',
  display: 'swap',
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
    if (!containerRef.current || !scrollingTextContainerRef.current || !timelineRef.current) return;

    const scrollPercentage = Math.max(
      0,
      Math.min(
        1,
        (window.scrollY -
          (scrollingTextContainerRef.current.offsetTop - containerRef.current.clientHeight * 1)) /
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
      translateX: [0, '-25%'],
      autoplay: true,
      easing: 'linear',
    });

    timelineRef.current = anime
      .timeline({
        targets: scrollingTextContainerRef.current,
        easing: 'easeInOutQuad',
        duration: 100,
      })
      .add({ translateX: ['-25%', '-35%'] });

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
  }, [scrollHandler]);

  return (
    <section className='h-screen overflow-hidden' ref={containerRef}>
      <div
        className='inline-flex font-medium tracking-tighter gap-x-20 text-purple/80'
        ref={scrollingTextContainerRef}
      >
        <div className='inline-flex whitespace-nowrap' ref={scrollingTextRef}>
          <h1 className='text-[13vw]'>Talk to us.</h1>
          <h1 className='text-[13vw]'>Talk to us.</h1>
          <h1 className='text-[13vw]'>Talk to us.</h1>
          <h1 className='text-[13vw]'>Talk to us.</h1>
        </div>
      </div>
    </section>
  );
};

export default Contact;
