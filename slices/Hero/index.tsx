'use client';

import { Content } from '@prismicio/client';
import { SliceComponentProps } from '@prismicio/react';
import { useEffect, useRef, useState } from 'react';

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
const Hero = ({ slice }: HeroProps): JSX.Element => {
  const [loaded, setLoaded] = useState(true);
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
      {/* {!loaded && <OnLoadAnimation callback={setLoaded} className='z-20' />} */}
      <section className='flex justify-center w-full pb-12 pt-44'>
        <div
          className={clsx([
            'flex leading-none uppercase text-accent text-[20vw] overflow-hidden',
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
