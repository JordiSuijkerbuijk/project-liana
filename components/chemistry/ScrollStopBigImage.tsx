'use client'
import { useRef, useEffect } from 'react';
import anime, { AnimeTimelineInstance, timeline } from 'animejs';

export default function ScrollTopBigImage({ src } : {src: string}){
  const observerRef = useRef<IntersectionObserver | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const timelineRef = useRef<AnimeTimelineInstance | null>(null);

  useEffect(() => {
    if(!containerRef.current) return;
    observerRef.current = new IntersectionObserver(handleIntersection);
    createTimeline();
    observerRef.current.observe(containerRef.current);
  }, []);


  function handleIntersection(entries: IntersectionObserverEntry[]){
    entries.forEach((entry) => {
      if(entry.isIntersecting){
        if(!timelineRef.current) return;
        console.log('intersecting')
        timelineRef.current.play();
      }
    });
  }

  function createTimeline() {
    if(!containerRef?.current) return;
    const target = containerRef.current?.parentNode?.querySelector('.big-image-target');

    if(!target) return;

    const {
      height: targetHeight,
      left: targetLeft,
      right: targetEndPosition,
    } = target.getBoundingClientRect();

    // Because the image isn't always  centered we need to calculate left and
    // right. We assume the image will be centered vertically.
    const deltaHeight = (window.innerHeight - targetHeight) / 2;
    // We can't use innerWidth because scrollbar messes with it.
    const targetRight = containerRef.current.getBoundingClientRect().width - targetEndPosition;

    timelineRef.current = anime.timeline({
      autoplay: false,
      easing: 'easeInOutQuad',
      duration: 800
    }).add({
      targets: imageRef.current,
      duration: 25,
      clipPath: [
        'inset(0px round)',
        `inset(${deltaHeight}px ${targetRight}px ${deltaHeight}px ${targetLeft}px round 2rem)`,
      ],
      begin: () => {
        window.addEventListener('scroll', preventScroll)
      },
      complete: () => { 
        window.removeEventListener('scroll', preventScroll)
      },
    })
  }

  function preventScroll(e: Event){
    e.preventDefault();
  }
  
  return <div ref={containerRef} className="absolute inset-0 w-full h-screen">
    <img src={src} alt="" className="object-cover w-full h-full" ref={imageRef} />
    </div>
}