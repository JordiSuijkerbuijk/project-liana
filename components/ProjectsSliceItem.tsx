'use client'

import clsx from 'clsx';
import Container from './Container';
import useParallax from '@/helpers/useParallax';
import { RefObject, useRef } from 'react';

interface Props {
  image: string;
  title: string;
  subtitle: string;
  isLastItem: boolean;
  isFirstItem: boolean;
  isMiddleItem: boolean;
  image2: string;
}

export default function CoolSectionItem({title, subtitle, image, image2, isFirstItem, isLastItem, isMiddleItem} : Props){
  const imageRef = useRef<HTMLImageElement | null>(null);
  
  const container = useParallax([{
    targets: imageRef,
    movement: 5
  }]);

  if(!image || !title) return null;

  return <div className={clsx("relative -mb-100vh [contain:paint]", isLastItem ? "h-screen" : "h-200vh")} ref={container as RefObject<HTMLDivElement>}>
  <div className="sticky top-0 w-full h-screen">
    <div className="absolute inset-0 object-cover w-full h-full scale-125">
      <img src={image} alt="" className="w-full h-full" ref={imageRef} />
    </div>
    <div className="absolute inset-0 w-full h-full bg-black/30" />
  </div>
  <div className={clsx("absolute z-10 w-full", isFirstItem && "h-200vh top-0", isMiddleItem && "h-300vh -top-100vh", isLastItem && "h-200vh -top-100vh")}>
  <Container className="sticky top-0 z-10 flex items-center justify-between h-100vh">
    <div className="flex flex-col gap-y-4">
      <h2 className="font-bold text-8xl">{title}</h2>
      <span>{subtitle}</span>
    </div>
      <div className="aspect-1/1.25 w-1/4">
        <img src={image2} alt="" className="object-cover w-full h-full"/>
      </div>
    </Container>
  </div>
  </div>
}