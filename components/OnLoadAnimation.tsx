'use client';

import { ImageField } from '@prismicio/types';
import anime from 'animejs';
import clsx from 'clsx';
import Image from 'next/image';
import { useEffect, useRef } from 'react';

type onLoad = {
  image1: ImageField;
  image2: ImageField;
  callback: (v: boolean) => void;
  className: string;
};

export default function OnLoadAnimation({ image1, image2, callback, className }: onLoad) {
  const image1RevealRef = useRef<HTMLDivElement | null>(null);
  const image1RevealRef2 = useRef<HTMLDivElement | null>(null);
  const image1Ref = useRef<HTMLImageElement | null>(null);

  const image2RevealRef = useRef<HTMLDivElement | null>(null);
  const image2RevealRef2 = useRef<HTMLDivElement | null>(null);
  const image2Ref = useRef<HTMLImageElement | null>(null);

  useEffect(() => {
    if (!image1RevealRef.current) return;
    console.log('image1Ref', image1Ref);

    anime
      .timeline({ easing: 'cubicBezier(.5, .05, .1, .3)' })
      .add({
        targets: [image1RevealRef.current, image1Ref.current],
        height: ['0%', '100%'],
        duration: 750,
        complete: () => {
          if (image1RevealRef?.current) {
            image1RevealRef.current.style.top = 'auto';
            image1RevealRef.current.style.bottom = '0px';
            image1RevealRef.current.style.transformOrigin = 'bottom';
          }
        },
      })
      .add({
        targets: [image1RevealRef.current],
        height: ['100%', '0%'],
        duration: 750,
      })
      .add({
        targets: [image1RevealRef2.current],
        height: ['0%', '100%'],
        delay: 1000,
        duration: 750,
        complete: () => {
          if (image1RevealRef2?.current && image1Ref?.current) {
            image1RevealRef2.current.style.top = 'auto';
            image1RevealRef2.current.style.bottom = '0px';
            image1RevealRef2.current.style.transformOrigin = 'bottom';
            image1Ref.current.style.top = 'auto';
            image1Ref.current.style.bottom = '0px';
          }
        },
      })
      .add({
        targets: [image1RevealRef2.current, image1Ref.current],
        height: ['100%', '0%'],
        duration: 750,
      });

    anime
      .timeline({ easing: 'easeOutQuad' })
      .add({
        targets: [image2RevealRef.current, image2Ref.current],
        height: ['0%', '100%'],
        duration: 750,
        complete: () => {
          if (image2RevealRef?.current) {
            image2RevealRef.current.style.top = '0px';
            image2RevealRef.current.style.bottom = 'auto';
            image2RevealRef.current.style.transformOrigin = 'top';
          }
        },
      })
      .add({
        targets: [image2RevealRef.current],
        height: ['100%', '0%'],
        duration: 750,
      })
      .add({
        targets: [image2RevealRef2.current],
        height: ['0%', '100%'],
        delay: 1000,
        duration: 750,
        complete: () => {
          if (image2RevealRef2?.current && image2Ref?.current) {
            image2RevealRef2.current.style.top = '0px';
            image2RevealRef2.current.style.bottom = 'auto';
            image2RevealRef2.current.style.transformOrigin = 'top';
            image2Ref.current.style.top = '0px';
            image2Ref.current.style.bottom = 'auto';
          }
        },
      })
      .add({
        targets: [image2RevealRef2.current, image2Ref.current],
        height: ['100%', '0%'],
        duration: 750,
        complete: () => {
          callback(true);
          document.querySelector('body')?.classList.add('loaded');
        },
      });
  }, [callback]);

  return (
    <div className={clsx(['fixed top-0 left-0 flex w-screen h-screen', className])}>
      <div className='relative w-1/2 h-screen overflow-hidden z-20'>
        <div ref={image1Ref} className='h-0 absolute top-0 overflow-hidden'>
          <Image
            src={image1?.url || ''}
            alt={image1?.alt || ''}
            width={image1?.dimensions?.width || 0}
            height={image1?.dimensions?.height || 0}
            className='object-cover w-full h-screen'
          />
        </div>
        <div className='absolute top-0 left-0 z-10 w-full h-0 bg-pink' ref={image1RevealRef} />
        <div className='absolute top-0 left-0 z-10 w-full h-0 bg-pink' ref={image1RevealRef2} />
      </div>
      <div className='relative w-1/2 h-screen overflow-hidden z-20'>
        <div ref={image2Ref} className='h-0 absolute bottom-0 overflow-hidden'>
          <Image
            src={image2?.url || ''}
            alt={image2?.alt || ''}
            width={image2?.dimensions?.width || 0}
            height={image2?.dimensions?.height || 0}
            className='object-cover w-full h-screen'
          />
        </div>
        <div className='absolute bottom-0 left-0 z-10 w-full h-0 bg-pink' ref={image2RevealRef} />
        <div className='absolute bottom-0 left-0 z-10 w-full h-0 bg-pink' ref={image2RevealRef2} />
      </div>

      <div className='bg-background absolute left-0 top-0 w-full h-full z-10' />
    </div>
  );
}
