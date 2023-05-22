'use client';

import Image from 'next/image';
import { useEffect, useRef } from 'react';
import image from '../public/images/hover.jpg';

export default function Home() {
  const projectsContainerRef = useRef<HTMLInputElement>(null);

  function handleMouseMoveListener(event: MouseEvent) {
    if (projectsContainerRef?.current === null) return;
    const images = projectsContainerRef.current.querySelectorAll<HTMLElement>('img');
    console.log('event', event);
    for (let i = 0; i < images.length; i++) {
      const image = images[i];
      if (image && image !== null) {
        // image.style.transform = `translateX(${event.x}px)
        // translateY(${event.y}px)`;
        image.style.top = `${event.y}px`;
        image.style.left = `${event.x}px`;
      }
    }
  }

  function intersectionHandler(entries: IntersectionObserverEntry[]) {
    entries.forEach(function (entry: IntersectionObserverEntry): void {
      if (entry.isIntersecting) {
        window.addEventListener('mousemove', handleMouseMoveListener);
      } else {
        window.removeEventListener('mousemove', handleMouseMoveListener);
      }
    });
  }

  useEffect(() => {
    const observer = new IntersectionObserver(intersectionHandler);
    const ref = projectsContainerRef.current;
    if (ref !== null) {
      observer.observe(ref);
    }

    return () => {
      if (ref !== null) {
        observer.unobserve(ref);
        window.removeEventListener('mousemove', handleMouseMoveListener);
      }
    };
  });

  return (
    <main className='flex min-h-screen py-96 flex-col items-center justify-between p-24'>
      {/* The projects section */}
      <div className='grid grid-cols-4 lg:grid-cols-12 [contain:paint] gap-x-8'>
        <div className='col-span-4 gap-y-4 flex flex-col sticky top-8 left-0 h-fit'>
          <h2 className='text-2xl'>Animated text</h2>
          <p className='max-w-lg text-sm'>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
            incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
            exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure
            dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
            Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt
            mollit anim id est laborum
          </p>
        </div>
        <div className='col-span-8 flex flex-col items-end gap-y-8' ref={projectsContainerRef}>
          {/* project card */}
          <div className='h-96 w-full max-w-4xl bg-black relative overflow-hidden'>
            <Image
              {...image}
              alt='hover image'
              className='h-36 w-36 absolute -top-full rounded-lg'
            />
          </div>
          <div className='h-96 w-full max-w-4xl bg-black'></div>
          <div className='h-96 w-full max-w-4xl bg-black'></div>
        </div>
      </div>
    </main>
  );
}
