'use client';

import Container from '@/components/Container';
import anime from 'animejs';
import clsx from 'clsx';
import localFont from 'next/font/local';
import Link from 'next/link';

import { useRef, useState } from 'react';
import GlitchEffectText from './GlitchEffectText';

const drukwide = localFont({
  src: '../public/fonts/DrukWide/Druk-Wide-Bold.ttf',
  variable: '--font-drukwide',
  display: 'swap',
});

const mockMenu = [
  {
    label: 'Projects',
    link: '/projects',
    iconType: 'browser' as const,
  },
  {
    label: 'About us',
    link: '/about-us',
    iconType: 'speechBubble' as const,
  },
  {
    label: 'Contact',
    link: '/contact',
    iconType: 'addressBook' as const,
  },
];

export default function NavBar() {
  const [menuIsOpen, setMenuIsOpen] = useState(false);
  const barRef = useRef<HTMLDivElement>(null);
  const hamburgerContentContainer = useRef<HTMLDivElement>(null);

  function handleBurgerClick() {
    const tl = anime.timeline({
      easing: 'easeInOutCubic',
      duration: 400,
      autoplay: false,
    });
    if (menuIsOpen) {
      tl.add({
        targets: hamburgerContentContainer.current,
        height: '0',
      }).add(
        {
          targets: barRef.current,
          paddingBottom: '0px',
        },
        250
      );
    } else {
      tl.add({
        targets: barRef?.current,
        paddingBottom: '4px',
      }).add(
        {
          targets: hamburgerContentContainer.current,
          height: ['0', hamburgerContentContainer.current?.scrollHeight],
        },
        250
      );
    }
    tl.play();
    setMenuIsOpen(!menuIsOpen);
  }

  return (
    <div className='fixed z-20 w-auto mx-auto -translate-x-1/2 left-1/2 top-6 bg-menu-backdrop clip-rounded'>
      <Container className='flex justify-center'>
        <div className='relative flex flex-col px-1 pt-1 gap-y-1 w-60' ref={barRef}>
          {/* Outer items */}
          <div className='relative flex items-center justify-between w-full px-3 py-2 gap-x-4 bg-menu rounded-xl'>
            <Link
              href='/'
              aria-label='Go to homepage'
              className={clsx(['uppercase text-white', drukwide.className])}
            >
              Liana
            </Link>
            <button
              className='flex flex-col items-center justify-center w-8 h-8 gap-y-1 clip-rounded'
              aria-label={`${menuIsOpen ? 'Close' : 'Open'} menu`}
              onClick={handleBurgerClick}
            >
              <span className='inline-block w-4 h-px bg-white rounded-3xl' />
              <span className='inline-block w-4 h-px bg-white rounded-3xl' />
              <span className='inline-block w-4 h-px bg-white rounded-3xl' />
            </button>
          </div>
          <div
            className={clsx('h-0 overflow-hidden w-full bg-menu-inner rounded-xl')}
            ref={hamburgerContentContainer}
          >
            <nav className='relative p-4'>
              <ul className='flex flex-col pl-4 gap-y-3 navbar-dots'>
                {/* TODO: Connect to Prismic */}
                {mockMenu.map((item) => {
                  return (
                    <li
                      key={item.link}
                      className='relative transition-all group text-menu-text hover:text-pink'
                    >
                      <GlitchEffectText
                        text={item.label}
                        link={item.link}
                        iconType={item.iconType}
                        iconClass={'fill-menu-text group-hover:fill-pink'}
                      />

                      <div className='absolute top-0 left-0 w-px h-full transition-opacity duration-150 -translate-x-4 opacity-0 bg-pink group-hover:opacity-100' />
                    </li>
                  );
                })}
              </ul>
            </nav>
          </div>
        </div>
      </Container>
    </div>
  );
}
