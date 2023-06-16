'use client';

import BackgroundTransition from '@/helpers/BackgroundTransition';
import { useEffect } from 'react';

export type SectionType = {
  color?: string;
  children?: React.ReactNode;
};

export default function Section({ children, color = '' }: SectionType) {
  useEffect(() => {
    BackgroundTransition();
  });

  return (
    <section className='relative w-full h-screen' data-color={color}>
      <div className='relative z-10'>{children}</div>
      <div className='absolute top-0 left-0 w-full h-full opacity-0' style={{ color: color }} />
    </section>
  );
}
