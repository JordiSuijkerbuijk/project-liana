'use client';

import { Content } from '@prismicio/client';
import { SliceComponentProps } from '@prismicio/react';
import anime from 'animejs';
import Image from 'next/image';
import { useEffect, useRef } from 'react';
import perlinNoise from './test';

/**
 * Props for `Hero`.
 */
export type HeroProps = SliceComponentProps<Content.HeroSlice>;

/**
 * Component for "Hero" Slices.
 */
const Hero = (slice: any): JSX.Element => {
  const firstImageContainer = useRef<HTMLDivElement>(null);
  const secondImageContainer = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!firstImageContainer.current || !secondImageContainer.current || !headingRef.current)
      return;

    anime({
      targets: [firstImageContainer.current, secondImageContainer.current, headingRef.current],
      translateY: 0,
      easing: 'easeInOutExpo',
    });

    // init();
    if (typeof window !== undefined) {
      perlinNoise();
    }

    //TODO: make this animation random forever loop

    anime({
      targets: [canvasRef.current],
      translateX: [0, -5000],
      translateY: [0, -5000],
      opacity: [100, 25, 100],
      loop: true,
      duration: 1000000,
    });
    // initPattern();
  }, []);

  return (
    <section className='flex flex-col justify-end w-full h-screen'>
      <div className='relative z-20 flex items-end justify-between pr-4'>
        <div className='w-5/12 max-w-2xl pl-4 text-3xl'>
          <p>We help elevate your brand by creating exceptional digital products</p>
        </div>
        <div className='flex w-3/5 max-w-5xl justify-center overflow-hidden rounded-[325px] before:pt-[50%] max-h-[500px] z-10'>
          <div className='relative w-full overflow-hidden -translate-x-2 -skew-x-12'>
            <div
              className='absolute left-2 w-full top-0 translate-y-[calc(100%_+_6px)] transition-transform duration-500'
              ref={firstImageContainer}
            >
              <Image
                src={slice?.primary?.left_image?.url || ''}
                alt={slice?.primary?.left_image.alt || ''}
                width={slice?.primary?.left_image?.dimensions?.width || 0}
                height={slice?.primary?.left_image?.dimensions?.height || 0}
                className='scale-125 translate-y-4 skew-x-12 sm:translate-y-6 md:translate-y-8 lg:translate-y-10 xl:translate-y-12'
              />
            </div>
          </div>
          <div className='relative w-full overflow-hidden translate-x-2 -skew-x-12'>
            <div
              className='absolute right-0 w-full top-0 translate-y-[calc(-100%_+_-65px)] transition-transform duration-500'
              ref={secondImageContainer}
            >
              <Image
                src={slice?.primary?.right_image?.url || ''}
                alt={slice?.primary?.right_image.alt || ''}
                width={slice?.primary?.right_image?.dimensions?.width || 0}
                height={slice?.primary?.right_image?.dimensions?.height || 0}
                className='scale-125 -translate-x-8 translate-y-0 skew-x-12'
              />
            </div>
          </div>
        </div>
      </div>
      <div className='relative z-20 flex items-center justify-center overflow-hidden tracking-tighter'>
        <h1
          className='relative uppercase text-[21vw] leading-none z-20 translate-y-full transition-transform duration-500 bg-clip-text text-transparent bg-gradient-to-r from-purple via-purple to-pink'
          ref={headingRef}
        >
          liana
        </h1>
      </div>
      <canvas id='canvas' className='fixed top-0 left-0 blur-2xl' ref={canvasRef} />
    </section>
  );
};

export default Hero;
