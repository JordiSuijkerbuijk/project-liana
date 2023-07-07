'use client';

import { Content } from '@prismicio/client';
import { SliceComponentProps } from '@prismicio/react';
import Image from 'next/image';
import { useEffect, useRef } from 'react';
import image from '../../public/images/hover.jpg';

/**
 * Props for `Projects`.
 */
export type ProjectsProps = SliceComponentProps<Content.ProjectsSlice>;

const Projects = (): JSX.Element => {
  //TODO: type cleanup
  //TODO: code cleanup
  //TODO: on scroll it doesn't animate and looks kinda wonky fix that
  //TODO: on hover op description
  //TODO: replace images
  //TODO: connect prismic;

  const projects = [1, 2, 3];
  const projectsContainerRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const imagesRef = useRef<HTMLElement[]>();

  function mouseMoveHandler(event: MouseEvent) {
    if (!imagesRef.current) return;

    imagesRef.current.map((image, key) => {
      if (!projectsContainerRef.current || !sectionRef.current) return;
      const x =
        event.x -
        (sectionRef.current.offsetLeft +
          projectsContainerRef.current.offsetLeft +
          image.clientWidth / 2);

      const element = projectsContainerRef.current.children[key] as HTMLElement;
      const y =
        event.pageY -
        (sectionRef.current.offsetTop +
          element.offsetTop +
          image.clientHeight / 2) +
        window.scrollY;

      image.animate(
        { transform: `translate(${x}px, ${y}px)` },
        { duration: 300, fill: 'forwards' }
      );
    });
  }

  useEffect(() => {
    if (!projectsContainerRef.current || !sectionRef.current) return;

    if (!imagesRef.current) {
      imagesRef.current = Array.from(
        projectsContainerRef.current.querySelectorAll('img')
      );
    }

    // Rebuild once i know what useAnimate does @tristan
    const observer = new IntersectionObserver(
      (entries: IntersectionObserverEntry[]) => {
        entries.forEach(function (entry: IntersectionObserverEntry): void {
          if (entry.isIntersecting) {
            window.addEventListener('mousemove', mouseMoveHandler);
            return;
          }

          window.removeEventListener('mousemove', mouseMoveHandler);
        });
      }
    );

    observer.observe(sectionRef.current);
  }, []);

  return (
    <div
      className="grid grid-cols-4 lg:grid-cols-12 gap-x-8 [contain:paint]"
      ref={sectionRef}
    >
      <div className="sticky left-0 flex flex-col col-span-4 gap-y-4 top-8 h-fit">
        <h2 className="text-2xl">Animated text</h2>
        <p className="max-w-lg text-sm">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum
        </p>
      </div>
      <div
        className="flex flex-col items-end col-span-8 gap-y-8"
        ref={projectsContainerRef}
      >
        {/* project card */}
        {projects.map((item, key) => {
          console.log('item', item);
          return (
            <div
              className="relative w-full max-w-4xl overflow-hidden bg-black rounded-lg h-96"
              key={key}
            >
              <Image
                {...image}
                alt="hover image"
                className="z-10 transition-transform duration-150 rounded-lg linear h-36 w-36"
                style={{ transform: `translate(-100%, -${key * 24}rem` }}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Projects;
