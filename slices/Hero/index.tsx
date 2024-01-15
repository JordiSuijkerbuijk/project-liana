'use client';

import { Content } from '@prismicio/client';
import { SliceComponentProps } from '@prismicio/react';
import { useEffect, useRef, useState } from 'react';

import OnLoadAnimation from '@/components/OnLoadAnimation';
import anime from 'animejs';
import clsx from 'clsx';
import localFont from 'next/font/local';

/**
 * Props for `Hero`.
 */
export type HeroProps = SliceComponentProps<Content.HeroSlice>;

const drukwide = localFont({
  src: '../../public/fonts/DrukWide/Druk-Wide-Bold.ttf',
  variable: '--font-drukwide',
  display: 'swap',
});

/**
 * Component for "Hero" Slices.
 */
const Hero = (slice: Content.HeroSlice): JSX.Element => {
  const [loaded, setLoaded] = useState(false);
  const textRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (textRef?.current && loaded) {
      anime({
        targets: textRef.current.children,
        translateY: ['100%', 0],
        delay: anime.stagger(75),
        easing: 'easeInOutQuad',
        duration: 500,
      });
    }
  }, [loaded]);

  return (
    <>
      {!loaded && slice?.primary?.left_image && slice?.primary?.right_image && (
        <OnLoadAnimation
          image1={slice.primary.left_image}
          image2={slice.primary.right_image}
          callback={setLoaded}
          className='z-20'
        />
      )}
      <section className='flex w-full justify-center pt-44 pb-12'>
        <div
          className={clsx([
            'flex leading-none tracking-wide uppercase text-[15rem] overflow-hidden',
            drukwide.className,
          ])}
          ref={textRef}
        >
          <h2 className='translate-y-full'>L</h2>
          <h2 className='translate-y-full'>I</h2>
          <h2 className='translate-y-full'>A</h2>
          <h2 className='translate-y-full'>N</h2>
          <h2 className='translate-y-full'>A</h2>
        </div>
      </section>
    </>
  );
};

export default Hero;
