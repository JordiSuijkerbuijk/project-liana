'use client';

import { useEffect, useRef } from 'react';

import localFont from 'next/font/local';

import anime from 'animejs';
import clsx from 'clsx';

const drukwide = localFont({
  src: '../../public/fonts/DrukWide/Druk-Wide-Bold.ttf',
  variable: '--font-drukwide',
  display: 'swap',
});

export type HeroSliceProps = {
  title?: string;
};

export default function HeroSlice({ title }: HeroSliceProps): JSX.Element {
  const textRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (textRef?.current) {
      anime({
        targets: textRef.current.children,
        translateY: ['100%', 0],
        delay: anime.stagger(75),
        easing: 'easeInOutQuad',
        duration: 500,
        begin: () => {
          document.querySelector('body')?.classList.add('loaded');
        },
      });
    }
  }, []);

  return (
    <>
      <section className="flex justify-center w-full pb-12 pt-44">
        <div
          className={clsx([
            'flex leading-none uppercase text-accent text-[20vw] overflow-hidden',
            drukwide.className,
          ])}
          ref={textRef}
        >
          {title &&
            title.split('')?.map((item, key) => (
              <h2 key={`home-hero-${key}`} className="translate-y-full">
                {item}
              </h2>
            ))}
        </div>
      </section>
    </>
  );
}
