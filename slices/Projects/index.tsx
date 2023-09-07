'use client';

import HeadingAnimation from '@/components/HeadingAnimation';
import { Content } from '@prismicio/client';
import anime from 'animejs';
import Image from 'next/image';
import { useCallback, useEffect, useRef } from 'react';

export default function Projects(slice: Content.ProjectsSlice): JSX.Element {
  const items = slice.items || [];
  const cardHeight = 600;

  const elementRef = useRef<HTMLDivElement>(null);
  const backgroundImageRef = useRef<HTMLDivElement>(null);
  const middleImageRef = useRef<HTMLDivElement>(null);

  const observerRef = useRef<IntersectionObserver | null>(null);

  const currentAnimationKey = useRef<number>(0);

  const scrollHandler = useCallback(() => {
    if (!elementRef.current || !backgroundImageRef.current) return;

    const startingOffsetTop = (window.innerHeight - cardHeight) / 2;
    const startingPointWithScrollPosition = startingOffsetTop + window.scrollY;

    if (startingPointWithScrollPosition > elementRef.current.offsetTop) {
      const rawScrollPercentage =
        ((window.scrollY - elementRef.current.offsetTop + startingOffsetTop) /
          (elementRef.current.clientHeight +
            cardHeight / 2 +
            startingOffsetTop / 2 -
            window.innerHeight)) *
        100;

      const scrollPercentage = Math.max(0, Math.min(100, rawScrollPercentage));
      const dividedPercentage = 100 / slice.items.length;
      const currentKey = Math.min(
        slice.items.length - 1,
        Math.floor(scrollPercentage / dividedPercentage)
      );

      if (currentAnimationKey.current !== currentKey) {
        anime({
          targets: backgroundImageRef.current,
          translateY: `-${dividedPercentage * currentKey}%`,
          easing: 'easeOutCubic',
          duration: 1000,
        });

        anime({
          targets: Array.from(backgroundImageRef.current.children)[
            currentAnimationKey.current < currentKey
              ? currentAnimationKey.current
              : currentAnimationKey.current - 1
          ],
          scale: currentAnimationKey.current < currentKey ? 1.15 : 1,
          rotate: `${currentAnimationKey.current < currentKey ? 5 : 0}deg`,
          easing: 'easeOutCubic',
          duration: 1000,
        });

        if (middleImageRef.current) {
          const imageArray = Array.from(middleImageRef.current.children);

          const firstImage =
            currentAnimationKey.current < currentKey
              ? imageArray[currentAnimationKey.current]
              : imageArray[currentAnimationKey.current - 1];

          if (firstImage) {
            anime({
              targets: firstImage,
              height: currentAnimationKey.current < currentKey ? 144 : 288,
              easing: 'easeOutCubic',
              duration: 1000,
            });
          }

          const secondImage =
            currentAnimationKey.current < currentKey
              ? imageArray[currentAnimationKey.current + 1]
              : imageArray[currentAnimationKey.current];

          if (secondImage) {
            anime({
              targets: secondImage,
              height: 288,
              translateY: currentAnimationKey.current < currentKey ? '0%' : '-100%',
              easing: 'easeOutCubic',
              duration: 1000,
            });
          }
        }

        currentAnimationKey.current = currentKey;
      }
    }
  }, [slice.items.length]);

  useEffect(() => {
    if (!elementRef.current || !backgroundImageRef.current || !middleImageRef.current) return;

    scrollHandler();

    observerRef.current = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          window.addEventListener('scroll', scrollHandler);
          return;
        }

        window.removeEventListener('scroll', scrollHandler);
      });
    });

    observerRef.current.observe(elementRef.current);

    return () => {
      window.removeEventListener('scroll', scrollHandler);
    };
  }, [scrollHandler]);

  return (
    <section
      className='relative flex flex-col w-full h-full max-w-6xl [contain:paint]'
      style={{ height: `3500px` }}
      ref={elementRef}
    >
      <div className='sticky top-0'>
        <HeadingAnimation
          text='Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
          containerRef={elementRef}
        />
      </div>
      <div className='h-[600px] overflow-hidden sticky z-10' style={{ top: `calc(50% - 200px)` }}>
        <div className='flex flex-col' ref={backgroundImageRef}>
          {items.map((item, key) => {
            const image = item.background_image;

            return (
              image.url && (
                <Image
                  className='z-10 object-cover object-top w-full'
                  width={image.dimensions.width}
                  height={image.dimensions.height}
                  src={image.url}
                  alt={image.alt || ''}
                  key={key}
                  loading='eager'
                />
              )
            );
          })}
        </div>
        <div className='absolute top-0 left-0 z-20 flex items-center justify-center w-full h-full'>
          <div className='relative w-56 overflow-hidden h-72' ref={middleImageRef}>
            {items.map((item, key) => {
              const hoverImage = item.hover_image;

              return (
                hoverImage.url && (
                  <div
                    className='absolute bottom-0 left-0 w-56 h-72'
                    key={key}
                    style={{
                      height: `288px`,
                      transform: `translateY(-${currentAnimationKey.current < key ? 100 : 0}%)`,
                    }}
                  >
                    <Image
                      className='z-20 object-cover object-top w-56 h-72 aspect-[5/9]'
                      width={hoverImage.dimensions.width}
                      height={hoverImage.dimensions.height}
                      src={hoverImage.url}
                      alt={hoverImage.alt || ''}
                    />
                  </div>
                )
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
