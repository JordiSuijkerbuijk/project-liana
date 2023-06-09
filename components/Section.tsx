'use client';

import BackgroundTransition from '@/helpers/BackgroundTransition';
import { useEffect } from 'react';

export default function Section({ color = '' }: { color?: string }) {
  useEffect(() => {
    BackgroundTransition();
  });

  return (
    <section className='w-full h-screen relative' data-color={color}>
      <div className='absolute left-0 top-0 h-full w-full opacity-0' style={{ color: color }} />
    </section>
  );
}
