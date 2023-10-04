'use client';

import { Content } from '@prismicio/client';
import { SliceComponentProps } from '@prismicio/react';
import anime from 'animejs';
import Image from 'next/image';
import { useEffect, useRef } from 'react';

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
  const headingRefPart1 = useRef<HTMLDivElement>(null);
  const headingRefPart2 = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (
      !firstImageContainer.current ||
      !secondImageContainer.current ||
      !headingRefPart1.current ||
      !headingRefPart2.current
    )
      return;

    anime({
      targets: [
        firstImageContainer.current,
        secondImageContainer.current,
        headingRefPart1.current,
        headingRefPart2.current,
      ],
      translateY: 0,
      easing: 'easeInOutExpo',
    });

    // init();
    // initPattern();
  }, []);

  return (
    <section className='flex flex-col justify-around w-full h-screen'>
      <div className='relative z-20 flex items-end justify-between pt-16 pr-16'>
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
      <div className='z-20 flex items-center justify-center overflow-hidden leading-tight tracking-tighter gap-x-28'>
        <h1
          className='uppercase text-[7.5vw] translate-y-full transition-transform duration-500'
          ref={headingRefPart1}
        >
          Project
        </h1>
        <h1
          className='uppercase text-[7.5vw] -translate-y-full transition-transform duration-500'
          ref={headingRefPart2}
        >
          liana
        </h1>
      </div>
    </section>
  );
};

export default Hero;
