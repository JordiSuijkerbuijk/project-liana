'use client';

import { Content, asHTML, asText } from '@prismicio/client';
import { SliceComponentProps } from '@prismicio/react';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

/**
 * Props for `Projects`.
 */
export type ProjectsProps = SliceComponentProps<Content.ProjectsSlice>;

const Projects = (slice: Content.ProjectsSlice): JSX.Element => {
  const projectsContainerRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const imagesRef = useRef<HTMLElement[]>();
  const [currentProject, setCurrentProject] = useState(0);

  const title = asText(slice.primary.title);
  const description = asHTML(slice.primary.description);
  const items = slice.items;

  // TODO: maybe mouse always follows and on mouseEnter we only change opacity
  // (fixes position on mouse enter issue)

  //TODO: create in animation when slice is in view for first time

  //Create text overlay on card

  useEffect(() => {
    if (!projectsContainerRef.current || !sectionRef.current) return;

    if (!imagesRef.current) {
      imagesRef.current = Array.from(projectsContainerRef.current.querySelectorAll('img'));
    }
  }, []);

  function mouseMoveHandler(event: MouseEvent, projectKey: number) {
    const element = event.target as HTMLElement;
    const image = element.querySelector('img');

    if (!projectsContainerRef.current || !sectionRef.current || !image) return;

    image.animate(
      {
        transform: `translate(${event.layerX - image.clientWidth / 2}px, ${
          event.layerY - image.clientWidth / 2
        }px)`,
      },
      { duration: 300, fill: 'forwards', composite: 'replace' }
    );
  }

  function mouseHandlerEvent(event: MouseEvent) {
    mouseMoveHandler(event, currentProject);
  }

  function mouseEnterHandler(event: MouseEvent) {
    if (!projectsContainerRef.current || !imagesRef.current || !sectionRef.current) return;

    const element = event.target as HTMLElement;
    const image = element.querySelector('img');

    if (image) {
      image.animate(
        { opacity: 1 },

        { duration: 200, fill: 'forwards' }
      );
    }

    window.addEventListener('mousemove', mouseHandlerEvent, true);
  }

  function mouseLeaveHandler(event: MouseEvent) {
    if (!projectsContainerRef.current || !imagesRef.current || !sectionRef.current) return;

    window.removeEventListener('mousemove', mouseHandlerEvent, true);

    const element = event.target as HTMLElement;
    const image = element.querySelector('img');

    if (image) {
      image.animate(
        {
          opacity: 0,
        },
        { duration: 200, fill: 'forwards' }
      );
    }
  }

  return (
    <div className='grid grid-cols-4 p-24 overflow-hidden lg:grid-cols-12 gap-x-8' ref={sectionRef}>
      <div className='sticky left-0 flex flex-col col-span-4 gap-y-4 top-8 h-fit'>
        <h2 className='text-2xl'>{title}</h2>
        <div className='max-w-lg text-sm' dangerouslySetInnerHTML={{ __html: description }} />
      </div>
      <div className='flex flex-col items-end col-span-8 gap-y-8' ref={projectsContainerRef}>
        {/* project card */}
        {items.map((item, key) => {
          return (
            <div
              className='relative w-full max-w-4xl bg-white bg-bottom bg-cover rounded-lg h-96'
              id={`${key}`}
              key={key}
              style={{ backgroundImage: `url(${item.background_image.url})` }}
              onMouseEnter={mouseEnterHandler}
              onMouseLeave={mouseLeaveHandler}
            >
              {item.hover_image && (
                <Image
                  src={item.hover_image.url || ''}
                  alt={item.hover_image.alt || ''}
                  width={item.hover_image.dimensions?.width || 144}
                  height={item.hover_image.dimensions?.height || 144}
                  className='relative z-20 origin-center rounded-lg opacity-0 pointer-events-none linear h-36 w-36'
                  loading='lazy'
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Projects;

// 'use client';

// import { Content, asHTML, asText } from '@prismicio/client';
// import { SliceComponentProps } from '@prismicio/react';
// import Image from 'next/image';
// import { useEffect, useRef } from 'react';

// /**
//  * Props for `Projects`.
//  */
// export type ProjectsProps = SliceComponentProps<Content.ProjectsSlice>;

// const Projects = (slice: Content.ProjectsSlice): JSX.Element => {
//   const title = asText(slice.primary.title);
//   const description = asHTML(slice.primary.description);
//   const items = slice.items;

//   //TODO: type cleanup
//   //TODO: code cleanup
//   //TODO: on scroll it doesn't animate and looks kinda wonky fix that
//   //TODO: on hover op description
//   //TODO: replace images
//   //TODO: connect prismic;

//   const projects = [1, 2, 3];
//   const projectsContainerRef = useRef<HTMLDivElement>(null);
//   const sectionRef = useRef<HTMLDivElement>(null);
//   const imagesRef = useRef<HTMLElement[]>();

//   function mouseMoveHandler(event: MouseEvent) {
//     if (!imagesRef.current) return;

//     imagesRef.current.map((image, key) => {
//       if (!projectsContainerRef.current || !sectionRef.current) return;
//       const x =
//         event.x -
//         (sectionRef.current.offsetLeft +
//           projectsContainerRef.current.offsetLeft -
//           image.clientWidth / 2);

//       const element = projectsContainerRef.current.children[key] as HTMLElement;
//       const y =
//         event.pageY -
//         (sectionRef.current.offsetTop + element.offsetTop + image.clientHeight / 2) +
//         window.scrollY;

//       image.animate(
//         { transform: `translate(${x}px, ${y}px)` },
//         { duration: 300, fill: 'forwards' }
//       );
//     });
//   }

//   useEffect(() => {
//     if (!projectsContainerRef.current || !sectionRef.current) return;

//     if (!imagesRef.current) {
//       imagesRef.current = Array.from(projectsContainerRef.current.querySelectorAll('img'));
//     }

//     // Rebuild once i know what useAnimate does @tristan
//     const observer = new IntersectionObserver((entries: IntersectionObserverEntry[]) => {
//       entries.forEach(function (entry: IntersectionObserverEntry): void {
//         if (entry.isIntersecting) {
//           window.addEventListener('mousemove', mouseMoveHandler);
//           return;
//         }

//         window.removeEventListener('mousemove', mouseMoveHandler);
//       });
//     });

//     observer.observe(sectionRef.current);
//   }, []);

//   return (
//     <div className='grid grid-cols-4 lg:grid-cols-12 gap-x-8 [contain:paint]' ref={sectionRef}>
//       <div className='sticky left-0 flex flex-col col-span-4 gap-y-4 top-8 h-fit'>
//         <h2 className='text-2xl'>{title}</h2>
//         <p className='max-w-lg text-sm' dangerouslySetInnerHTML={{ __html: description }} />
//       </div>
//       <div className='flex flex-col items-end col-span-8 gap-y-8' ref={projectsContainerRef}>
//         {/* project card */}
//         {items.map((item, key) => {
//           return (
//             <div
//               className='relative w-full max-w-4xl overflow-hidden bg-black rounded-lg h-96'
//               key={key}
//             >
//               {item.hover_image && (
//                 <Image
//                   src={item.hover_image.url || ''}
//                   alt={item.hover_image.alt || ''}
//                   width={item.hover_image.dimensions?.width || 144}
//                   height={item.hover_image.dimensions?.height || 144}
//                   className='z-10 transition-transform duration-150 rounded-lg linear h-36 w-36'
//                   style={{ transform: `translate(-100%, -${key * 24}rem` }}
//                   loading='lazy'
//                 />
//               )}
//             </div>
//           );
//         })}
//       </div>
//     </div>
//   );
// };

// export default Projects;
