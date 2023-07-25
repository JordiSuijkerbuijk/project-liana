'use client';

import { Content, asHTML, asText } from '@prismicio/client';
import { SliceComponentProps } from '@prismicio/react';
import anime from 'animejs';
import Image from 'next/image';
import { useCallback, useEffect, useRef } from 'react';

/**
 * Props for `Projects`.
 */
export type ProjectsProps = SliceComponentProps<Content.ProjectsSlice>;

const Projects = (slice: Content.ProjectsSlice): JSX.Element => {
  const projectsContainerRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const imagesRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const inAnimationObserverRef = useRef<IntersectionObserver | undefined>(undefined);
  const mouseMoveObserverRef = useRef<IntersectionObserver | undefined>(undefined);

  const title = asText(slice.primary.title);
  const description = asHTML(slice.primary.description);
  const items = slice.items;

  const imageSize = 144;
  const currentAnimationFrame = useRef(0);

  const pos = useRef({ x: 0, y: 0 });

  const animate = useCallback((event: MouseEvent) => {
    if (!sectionRef.current || !imagesRef.current) return;

    const targetY = event.y + window.scrollY - sectionRef.current.offsetTop - imageSize / 2;
    const targetX = event.x - sectionRef.current.offsetLeft - imageSize / 2;

    const y = lerp(pos.current.y, targetY, 0.075);
    const x = lerp(pos.current.x, targetX, 0.075);

    imagesRef.current.animate(
      { transform: `translate(${x}px, ${y}px)` },
      { duration: 50, fill: 'forwards' }
    );
    pos.current.x = targetX;
    pos.current.y = targetY;
  }, []);

  const mouseMoveHandler = useCallback(
    (event: MouseEvent) => {
      if (currentAnimationFrame.current) cancelAnimationFrame(currentAnimationFrame.current);
      currentAnimationFrame.current = requestAnimationFrame(() => animate(event));
    },
    [animate]
  );

  const resizeHandler = useCallback(() => {
    if (!sectionRef.current) return;

    if (window.innerWidth > 1024) {
      sectionRef.current.addEventListener('mousemove', mouseMoveHandler, { passive: true });
      return;
    }

    sectionRef.current.removeEventListener('mousemove', mouseMoveHandler);
  }, [mouseMoveHandler]);

  useEffect(() => {
    if (!projectsContainerRef.current || !sectionRef.current) return;

    const projectsArray = Array.from(projectsContainerRef.current.children);

    inAnimationObserverRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            anime({
              targets: entry.target,
              opacity: [0, 1],
              translateX: ['5rem', '0rem'],
              easing: 'easeInOutQuad',
              duration: 500,
            });

            if (inAnimationObserverRef.current) {
              inAnimationObserverRef.current.unobserve(entry.target);
            }

            return;
          }
        });
      },
      { rootMargin: '-10%' }
    );

    projectsArray.map((item) => {
      if (inAnimationObserverRef.current) {
        inAnimationObserverRef.current.observe(item);
      }
    });

    if (window.innerWidth > 1024) {
      if (!sectionRef.current) return;

      mouseMoveObserverRef.current = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (!sectionRef.current) return;
          if (entry.isIntersecting) {
            sectionRef.current.addEventListener('mousemove', mouseMoveHandler);
            return;
          }

          sectionRef.current.removeEventListener('mousemove', mouseMoveHandler);
        });
      });

      mouseMoveObserverRef.current.observe(sectionRef.current);
    }

    window.addEventListener('resize', resizeHandler);

    return () => {
      projectsArray.map((item) => {
        if (inAnimationObserverRef.current) {
          inAnimationObserverRef.current.unobserve(item);
        }
      });

      if (sectionRef.current && mouseMoveObserverRef.current) {
        mouseMoveObserverRef.current.unobserve(sectionRef.current);
      }

      window.removeEventListener('resize', resizeHandler);
    };
  }, [resizeHandler, mouseMoveHandler]);

  function lerp(start: number, end: number, amt: number) {
    return (1 - amt) * start + amt * end;
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

  function onClickHandler(projectIndex: number) {
    if (!projectsContainerRef.current) return;

    if (sectionRef.current && mouseMoveObserverRef.current) {
      mouseMoveObserverRef.current.unobserve(sectionRef.current);
      sectionRef.current.removeEventListener('mousemove', mouseMoveHandler);

      imagesRef.current.style.display = 'none';
    }

    window.removeEventListener('resize', resizeHandler);

    let targets = Array.from(projectsContainerRef.current.children);

    targets.map((item) => {
      if (inAnimationObserverRef.current) {
        inAnimationObserverRef.current.unobserve(item);
      }
    });

    const currentProject = targets[projectIndex];

    targets = targets.filter((item, key) => {
      if (key !== projectIndex) {
        return item;
      }
    });

    if (contentRef.current) {
      targets.push(contentRef.current);
    }

    const sideSpace = (sectionRef.current.clientWidth - currentProject.clientWidth) / 2;

    const currentPosition =
      currentProject.offsetTop + sectionRef.current?.offsetTop - window.scrollY;

    const verticalSpace = (window.innerHeight - currentProject.clientHeight) / 2;

    anime({
      targets,
      opacity: 0,
      easing: 'easeInOutSine',
      complete: function (anim) {
        currentProject.style.pointerEvents = 'none';
      },
    });

    const transitionTimeline = anime.timeline({
      easing: 'easeInOutSine',
    });

    transitionTimeline.add({
      targets: currentProject,
      translateX: `-${currentProject.offsetLeft - sideSpace}px`,
      translateY: `${(currentPosition - verticalSpace) * -1}px`,
    });

    const scale = window.innerHeight / currentProject.clientHeight;

    transitionTimeline.add({
      targets: currentProject,
      scale,
    });
  }

  return (
    <div
      className='relative grid grid-cols-4 gap-8 p-6 max-w-screen-2xl lg:p-24 lg:grid-cols-12'
      ref={sectionRef}
    >
      <div
        className='flex flex-col col-span-4 gap-y-4 h-fit lg:top-8 lg:sticky lg:left-0'
        ref={contentRef}
      >
        <h2 className='text-2xl'>{title}</h2>
        <div className='max-w-lg' dangerouslySetInnerHTML={{ __html: description }} />
      </div>
      <div
        className='flex flex-col items-end col-span-4 gap-y-8 lg:col-span-7 lg:col-start-6'
        ref={projectsContainerRef}
      >
        {/* project card */}
        {items.map((item, key) => {
          const title = asText(item.title);
          const description = asText(item.description);

          return (
            <div
              className='relative flex items-end w-full max-w-3xl overflow-hidden translate-x-20 opacity-0 aspect-video group hover:shadow-xl transform-center'
              key={key}
              onMouseEnter={() => mouseEnterHandler(key)}
              onMouseLeave={() => mouseLeaveHandler(key)}
              onClick={() => onClickHandler(key)}
            >
              <div
                className='absolute top-0 left-0 z-10 w-full h-full bg-bottom bg-cover rounded-lg'
                style={{ backgroundImage: `url(${item.background_image.url})` }}
              />
              <div className='relative z-30 flex flex-col p-6 text-white transition-all duration-300 ease-in-out translate-y-2 opacity-0 gap-y-2 group-hover:opacity-100 group-hover:translate-y-0'>
                <h2 className='text-lg'>{title}</h2>
                <p className='text-xs'>{description}</p>
              </div>
              <div className='absolute bottom-0 left-0 z-20 w-full transition-opacity duration-300 ease-in-out rounded-lg opacity-0 h-3/4 bg-gradient-to-t from-black/80 to-transparent group-hover:opacity-100' />
            </div>
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
