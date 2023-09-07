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

  useEffect(() => {
    if (!firstImageContainer.current || !secondImageContainer.current) return;

    anime({
      targets: firstImageContainer.current,
      translateY: 0,
      easing: 'easeInOutExpo',
    });

    anime({
      targets: secondImageContainer.current,
      translateY: 0,
      easing: 'easeInOutExpo',
    });
  }, []);

  return (
    <section className='flex flex-col w-full h-screen justify-around'>
      <div className='pt-16 pr-16 flex justify-between items-end'>
        <div className='text-3xl w-5/12 max-w-2xl pl-4'>
          <p>We help elevate your brand by creating exceptional digital products</p>
        </div>
        <div className='flex w-3/5 max-w-5xl justify-center overflow-hidden rounded-[325px] before:pt-[50%] max-h-[500px] z-10'>
          <div className='relative w-full overflow-hidden -skew-x-12 -translate-x-2'>
            <div
              className='absolute left-2 w-full top-0 translate-y-[calc(100%_+_5px)] transition-transform duration-500'
              ref={firstImageContainer}
            >
              <Image
                src={slice?.primary?.left_image?.url || ''}
                alt={slice?.primary?.left_image.alt || ''}
                width={slice?.primary?.left_image?.dimensions?.width || 0}
                height={slice?.primary?.left_image?.dimensions?.height || 0}
                className='translate-y-12 skew-x-12 scale-125'
              />
            </div>
          </div>
          <div className='relative w-full overflow-hidden -skew-x-12 translate-x-2'>
            <div
              className='absolute right-0 w-full top-0 translate-y-[calc(-100%_+_-65px)] transition-transform duration-500'
              ref={secondImageContainer}
            >
              <Image
                src={slice?.primary?.right_image?.url || ''}
                alt={slice?.primary?.right_image.alt || ''}
                width={slice?.primary?.right_image?.dimensions?.width || 0}
                height={slice?.primary?.right_image?.dimensions?.height || 0}
                className='translate-y-0 -translate-x-8 skew-x-12 scale-125'
              />
            </div>
          </div>
        </div>
      </div>
      <div className='flex gap-x-32 tracking-tighter leading-tight'>
        <h1 className='uppercase text-[16rem]'>Project</h1>
        <h1 className='uppercase text-[16rem]'>liana</h1>
      </div>
    </section>
  );
};

export default Hero;
