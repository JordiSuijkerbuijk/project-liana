'use client';

import { useRef } from 'react';

import Link from 'next/link';

import { AnimeTimelineInstance } from 'animejs';
import clsx from 'clsx';

import { iconsMap } from '@/components/Icon/Icon';

import DisappearingArrow from './DisappearingArrow';

export default function GlitchEffectText({
  text,
  link = '',
  iconType,
  iconClass,
}: {
  text: string;
  link: string;
  iconType: keyof typeof iconsMap;
  iconClass?: string;
}) {
  const wrapper = useRef<HTMLSpanElement>(null);
  const timeline = useRef<AnimeTimelineInstance | null>(null);
  const splitText = text.split('');

  // useEffect(() => {
  //   if (!wrapper?.current?.children) return;
  //   timeline.current = createGlitchHover(wrapper.current);
  // }, []);

  // function animateLetters() {
  //   if (
  //     !timeline?.current ||
  //     !(timeline?.current.progress === 0 || timeline?.current?.progress === 100)
  //   )
  //     return;
  //   timeline.current.play();
  // }

  if (!Array.isArray(splitText) || splitText.length === 0) return null;
  return (
    <Link
      href={link}
      className="relative inline-flex items-center w-full text-xs leading-none tracking-wide gap-x-2 group"
      // onMouseEnter={animateLetters}
    >
      {/* {iconType && (
        <Icon
          type={iconType}
          className={clsx("aspect-square w-6", iconClass)}
        />
      )} */}
      <span ref={wrapper}>
        {splitText.map((letter, i) => (
          <span key={`glitch-effect-text-${text}-${i}`} data-original={`${letter}`}>
            {letter}
          </span>
        ))}
      </span>
      <span className="ml-auto">
        <DisappearingArrow arrowClass={clsx(['h-4', iconClass])} />
      </span>
    </Link>
  );
}
