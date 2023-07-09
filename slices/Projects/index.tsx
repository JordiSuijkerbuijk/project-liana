'use client';

import { Content, asHTML, asText } from '@prismicio/client';
import { SliceComponentProps } from '@prismicio/react';
import anime from 'animejs';
import Image from 'next/image';
import { useEffect, useRef } from 'react';

/**
 * Props for `Projects`.
 */
export type ProjectsProps = SliceComponentProps<Content.ProjectsSlice>;

const Projects = (slice: Content.ProjectsSlice): JSX.Element => {
  const projectsContainerRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const imagesRef = useRef<HTMLDivElement>(null);

  const title = asText(slice.primary.title);
  const description = asHTML(slice.primary.description);
  const items = slice.items;

  const imageWidth = 144;

  //TODO: add resize listener when mobile it shouldn't show to hover animation

  //Create text overlay on card

  useEffect(() => {
    if (!projectsContainerRef.current || !sectionRef.current) return;

    const projectsArray = Array.from(projectsContainerRef.current.children);

    const inAnimationObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          console.log('entry.intersectionRatio', entry.intersectionRatio);
          if (entry.isIntersecting) {
            anime({
              targets: entry.target,
              opacity: [0, 1],
              translateX: ['5rem', '0rem'],
              easing: 'easeInOutQuad',
              duration: 500,
            });

            inAnimationObserver.unobserve(entry.target);

            return;
          }
        });
      },
      { rootMargin: '-10%' }
    );

    projectsArray.map((item) => {
      inAnimationObserver.observe(item);
    });

    const mouseMoveObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!sectionRef.current) return;
        if (entry.isIntersecting) {
          sectionRef.current.addEventListener('mousemove', mouseMoveHandler);
          return;
        }

        sectionRef.current.removeEventListener('mousemove', mouseMoveHandler);
      });
    });

    mouseMoveObserver.observe(sectionRef.current);

    return () => {
      projectsArray.map((item) => {
        inAnimationObserver.unobserve(item);
      });

      if (sectionRef.current) {
        mouseMoveObserver.unobserve(sectionRef.current);
      }
    };
  }, []);

  function mouseMoveHandler(event: MouseEvent) {
    if (!sectionRef.current || !imagesRef.current) return;

    const y = event.y + window.scrollY - sectionRef.current.offsetTop - imageWidth / 2;
    const x = event.x - sectionRef.current.offsetLeft - imageWidth / 2;

    imagesRef.current.animate(
      { transform: `translate(${x}px, ${y}px)` },
      { duration: 200, fill: 'forwards' }
    );
  }

  function mouseEnterHandler(key: number) {
    if (imagesRef.current && imagesRef.current.children[key]) {
      imagesRef.current.children[key].animate({ opacity: 1 }, { duration: 200, fill: 'forwards' });
    }
  }

  function mouseLeaveHandler(key: number) {
    if (imagesRef.current && imagesRef.current.children[key]) {
      imagesRef.current.children[key].animate({ opacity: 0 }, { duration: 200, fill: 'forwards' });
    }
  }

  return (
    <div
      className='relative grid grid-cols-4 p-24 gap-8 max-w-screen-2xl lg:grid-cols-12'
      ref={sectionRef}
    >
      <div className='flex flex-col col-span-4 gap-y-4 h-fit lg:top-8 lg:sticky lg:left-0'>
        <h2 className='text-2xl'>{title}</h2>
        <div className='max-w-lg text-sm' dangerouslySetInnerHTML={{ __html: description }} />
      </div>
      <div
        className='flex flex-col items-end gap-y-8 col-span-4 lg:col-span-7 lg:col-start-6'
        ref={projectsContainerRef}
      >
        {/* project card */}
        {items.map((item, key) => {
          return (
            <div
              className='relative w-full max-w-3xl bg-white bg-bottom bg-cover rounded-lg h-96 translate-x-20 opacity-0'
              key={key}
              style={{ backgroundImage: `url(${item.background_image.url})` }}
              onMouseEnter={() => mouseEnterHandler(key)}
              onMouseLeave={() => mouseLeaveHandler(key)}
              id={`${key}`}
            />
          );
        })}
      </div>
      <div className='absolute top-0 left-0 pointer-events-none' ref={imagesRef}>
        {items.map(
          (item, key) =>
            item.hover_image && (
              <Image
                src={item.hover_image.url || ''}
                alt={item.hover_image.alt || ''}
                width={item.hover_image.dimensions?.width || 144}
                height={item.hover_image.dimensions?.height || 144}
                className='rounded-lg opacity-0 linear h-36 w-36'
                style={{ transform: `translateY(-${key * 100}%)` }}
                loading='lazy'
                key={key}
              />
            )
        )}
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
