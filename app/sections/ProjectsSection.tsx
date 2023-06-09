'use client';

import Image from 'next/image';
import { MouseEvent as MouseEventReact, useEffect, useRef, useState } from 'react';
import image from '../../public/images/hover.jpg';

export default function ProjectsSection() {
  // TODO: Voeg intersection observer toe
  // TODO: check met tristan of er andere manieren zijn om deze section cleaner
  // te maken?
  // TODO: Uitzoeken of er een manier is voor mousemove met animejs (vergeten
  // hoe dit zit)
  // TODO: Is er een manier om de kleine image uit te scalen als soort out
  // animation (misschien met cancel animation frame en dan scalen)
  const projects = [1, 2, 3];
  const projectsContainerRef = useRef<HTMLInputElement>(null);
  const sectionRef = useRef<HTMLInputElement>(null);
  const [images, setImages] = useState<HTMLImageElement[]>([]);

  let scaled = false;
  let ticking = false;

  function mouseMoveHandler(
    event: MouseEvent,
    currentImage: HTMLImageElement,
    currentProject: HTMLElement
  ) {
    if (!currentImage) return;

    if (!ticking) {
      requestAnimationFrame(() => {
        if (projectsContainerRef.current && sectionRef.current) {
          currentImage.style.transform = `translateX(${
            event.x -
            projectsContainerRef.current.offsetLeft -
            sectionRef.current.offsetLeft -
            currentImage.clientWidth / 2
          }px) translateY(${
            event.y -
            sectionRef.current.offsetTop -
            currentProject.offsetTop +
            window.scrollY -
            currentImage.clientHeight / 2
          }px)`;
        }

        ticking = false;
      });

      ticking = true;
    }
  }

  function mouseEnterHandler(e: MouseEventReact, key: number) {
    if (projectsContainerRef.current) {
      const currentProject = Array.from(projectsContainerRef.current.children)[key] as HTMLElement;
      const currentImage = images[key];

      if (!scaled && currentImage) {
        currentImage.style.opacity = '100';
        scaled = true;
      }

      currentProject.addEventListener('mousemove', (event) =>
        mouseMoveHandler(event, currentImage, currentProject)
      );
    }
  }

  function mouseLeaveHandler(e: MouseEventReact, key: number) {
    if (projectsContainerRef.current) {
      const currentProject = Array.from(projectsContainerRef.current.children)[key] as HTMLElement;
      const currentImage = images[key];

      if (scaled && currentImage) {
        currentImage.style.opacity = '0';
        scaled = false;
      }

      currentProject.removeEventListener('mousemove', (event) =>
        mouseMoveHandler(event, currentImage, currentProject)
      );
    }
  }

  useEffect(() => {
    if (projectsContainerRef.current) {
      setImages(Array.from(projectsContainerRef.current.querySelectorAll('img')));
    }
  }, []);

  return (
    <div className='grid grid-cols-4 lg:grid-cols-12 gap-x-8 [contain:paint]' ref={sectionRef}>
      <div className='sticky left-0 flex flex-col col-span-4 gap-y-4 top-8 h-fit'>
        <h2 className='text-2xl'>Animated text</h2>
        <p className='max-w-lg text-sm'>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
          ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation
          ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur
          sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id
          est laborum
        </p>
      </div>
      <div className='flex flex-col items-end col-span-8 gap-y-8' ref={projectsContainerRef}>
        {/* project card */}
        {projects.map((item, key) => (
          <div
            className='relative w-full max-w-4xl overflow-hidden bg-black rounded-lg h-96'
            onMouseOver={(e) => mouseEnterHandler(e, key)}
            onMouseLeave={(e) => mouseLeaveHandler(e, key)}
            key={key}
          >
            <Image
              {...image}
              alt='hover image'
              className='z-10 transition-opacity duration-150 rounded-lg opacity-0 h-36 w-36 scale-25'
            />
          </div>
        ))}
      </div>
    </div>
  );
}
