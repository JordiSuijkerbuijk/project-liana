'use client';

import Container from '@/components/Container';
import useParallax from '@/helpers/useParallax';
import clsx from 'clsx';
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

export default function ProjectsSliceItem({
  title,
  subtitle,
  image,
  image2,
  isFirstItem,
  isLastItem,
  isMiddleItem,
}: Props) {
  const imageRef = useRef<HTMLImageElement | null>(null);

  const container = useParallax([
    {
      targets: imageRef,
      movement: 5,
    },
  ]);

  if (!image || !title) return null;

  return (
    <div
      className={clsx('relative -mb-100vh [contain:paint]', isLastItem ? 'h-screen' : 'h-200vh')}
      ref={container as RefObject<HTMLDivElement>}
    >
      <div className='sticky top-0 w-full h-screen'>
        <div className='absolute inset-0 object-cover w-full h-full scale-125'>
          <img src={image} alt='' className='object-cover w-full h-full' ref={imageRef} />
        </div>
        <div className='absolute inset-0 z-10 w-full h-full bg-background/20' />
      </div>
      <div
        className={clsx(
          'absolute z-20 w-full',
          isFirstItem && 'h-200vh top-0',
          isMiddleItem && 'h-300vh -top-100vh',
          isLastItem && 'h-200vh -top-100vh'
        )}
      >
        <Container className='sticky top-0 z-10 flex flex-col justify-center h-100vh gap-y-10 md:flex-row md:gap-x-6 md:justify-between md:items-center'>
          <div className='flex flex-col text-white lg:gap-y-4'>
            <h2 className='font-bold text-heading-1'>{title}</h2>
            <span>{subtitle}</span>
          </div>
          <div className='w-full md:w-2/4 md:min-w-[50%] lg:w-1/4 lg:min-w-[25%] max-h-[80vh]'>
            <img
              src={image2}
              alt=''
              className='aspect-[1/0.5] object-cover w-full h-full rounded-xl lg:aspect-1/1.25'
            />
          </div>
        </Container>
      </div>

      <div className='absolute top-0 left-0 z-10 w-full h-full bg-black opacity-40' />
    </div>
  );
}
