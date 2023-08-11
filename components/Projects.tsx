'use client';

import { Content } from '@prismicio/client';
import Image from 'next/image';
import { useRef } from 'react';

export default function Projects(slice: Content.ProjectsSlice): JSX.Element {
  const items = slice.items || [];

  const elementRef = useRef<HTMLDivElement>(null);

  return (
    <div className='relative flex items-center h-full' ref={elementRef}>
      {items.map((item, key) => {
        const image = item.background_image;

        return (
          <div key={key}>
            {image.url && <Image {...image} src={image.url} alt={image.alt || ''} />}
          </div>
        );
      })}
    </div>
  );
}
