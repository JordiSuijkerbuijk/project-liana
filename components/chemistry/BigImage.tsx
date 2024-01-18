'use client';
import playScrollBasedAnimation from '@/helpers/playScrollBasedAnimation';
import { useScroll } from '@/helpers/useScroll';
import anime, { AnimeTimelineInstance } from 'animejs';
import { useEffect, useRef } from 'react';

interface Props {
  src: string;
}

export default function BigImage({ src } : Props){
  const timelineRef = useRef<AnimeTimelineInstance | null>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!timelineRef?.current) createTimeline();
    initializeSize();
  }, []);


  function initializeSize(){
    if(!wrapperRef.current) return;
    const target = containerRef.current?.parentNode.querySelector('.big-image-target');
    if(!target) return;
    const { height } = target.getBoundingClientRect();

    const heightToUse = height;

    // wrapperRef.current.style.height = `${heightToUse}px`;
  }


  function createTimeline() {
    if(!containerRef?.current) return;
    const target = containerRef.current?.parentNode.querySelector('.big-image-target');

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
      easing: 'linear',
      duration: 100
    }).add({
      targets: '',
      duration: 25,
      translateX: ['0px', '0px']
    }).add({
      targets: imageRef.current,
      duration: 25,
      clipPath: [
        'inset(0px round)',
        `inset(${deltaHeight}px ${targetRight}px ${deltaHeight}px ${targetLeft}px round 2rem)`,
      ],
    })
    .add({
      duration: 50,
      targets: '',
      translateX: 0
    })
  }

  const containerRef = useScroll<HTMLDivElement>(
    (progress) => {
      playScrollBasedAnimation(progress, timelineRef?.current);
    },
    {
      startTracking: 'top',
      stopTracking: 'bottom',
    }
  );

  return <div className="absolute top-0 left-0 w-full h-full pointer-events-none" ref={containerRef}>
    <div className="sticky top-0 flex flex-col justify-end h-screen">

    <div className="w-full h-full" ref={wrapperRef}>
      <img src={src} alt="" className="w-full h-full" width="1109" height="739" ref={imageRef} />
    </div>
    </div>
  </div>
}