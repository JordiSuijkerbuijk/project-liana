'use client';

import Container from '@/components/Container';
import { Content } from '@prismicio/client';
import { SliceComponentProps } from '@prismicio/react';
import anime, { AnimeTimelineInstance } from 'animejs';
import clsx from 'clsx';
import localFont from 'next/font/local';
import { useCallback, useEffect, useRef } from 'react';

// If loading a variable font, you don't need to specify the font weight
const drukwide = localFont({
  src: '../../../../public/fonts/DrukWide/Druk-Wide-Bold.ttf',
  variable: '--font-drukwide',
  display: 'swap',
});

/**
 * Props for `Contact`.
 */
export type ContactProps = SliceComponentProps<Content.ContactSlice>;

const Contact = ({ slice }: ContactProps): JSX.Element => {
  const scrollingTextRef = useRef<HTMLDivElement | null>(null);
  const scrollingTextContainerRef = useRef<HTMLDivElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const scrollingTimelineRef = useRef<AnimeTimelineInstance | null>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  const scrollHandler = useCallback(() => {
    if (
      !containerRef.current ||
      !scrollingTextContainerRef.current ||
      !scrollingTimelineRef.current
    )
      return;

    const scrollPercentage = Math.max(
      0,
      Math.min(
        1,
        (window.scrollY - (containerRef.current.offsetTop - window.innerHeight)) /
          window.innerHeight
      )
    );

    scrollingTimelineRef.current.seek(scrollingTimelineRef.current.duration * scrollPercentage);
  }, [containerRef]);

  useEffect(() => {
    if (!scrollingTextRef?.current || !containerRef?.current) return;

    scrollingTimelineRef.current = anime
      .timeline({
        targets: scrollingTextContainerRef.current,
        easing: 'easeInOutQuad',
        duration: 1000,
      })
      .add({ translateX: ['-0%', '-100%'] });

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
    <section className='flex flex-col min-h-[50vh] py-32 overflow-hidden' ref={containerRef}>
      <div
        className='inline-flex font-medium tracking-tighter gap-x-20 text-accent'
        ref={scrollingTextContainerRef}
      >
        <div className='inline-flex whitespace-nowrap' ref={scrollingTextRef}>
          {Array.from({ length: 10 }, (_, i) => (
            <h1 className={clsx(['text-[9vw] px-10 stroke-text', drukwide.className])} key={`contact-scroll-item-${i}`}>
              Talk to us.
            </h1>
          ))}
        </div>
      </div>
      <Container className='flex flex-col w-full mt-4 gap-y-4'>
        <p className='max-w-sm'>
          We believe close collaboration is the key to creating exceptional products. If you do too,
          we’d love to hear from you.
        </p>
        <button className='flex px-6 py-3 transition-colors border border-2 rounded-xl border-text w-fit bg-background hover:border-white hover:text-black hover:bg-white'>
          Get in touch
        </button>
      </Container>
    </section>
  );
};

export default Contact;
