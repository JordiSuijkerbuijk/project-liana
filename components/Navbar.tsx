'use client';

import Link from 'next/link';
import Icon from '@/components/Icon/Icon';
import Container from '@/components/Container';
import anime from 'animejs';
import clsx from 'clsx';

import { useState, useRef } from 'react'


const mockMenu = [
  {
    label: "Projects",
    link: '/projects',
    iconType: "home" 
  },
  {
    label: 'About us',
    link: '/about-us',
    iconType: "home"
  },
  {
    label: 'Contact',
    link: '/contact',
    iconType: "home"
  }
]

export default function NavBar(){
  const [menuIsOpen, setMenuIsOpen] = useState(false);
  const barRef = useRef<HTMLDivElement>(null)
  const hamburgerContentContainer = useRef<HTMLDivElement>(null)
  
  function handleBurgerClick(){
    const tl = anime.timeline({
      easing: 'easeInOutCubic',
      duration: 400,
      autoplay: false
    });
    if(menuIsOpen) {
      tl.add({
        targets: hamburgerContentContainer.current,
        height: '0'
      }).add({
        targets: barRef.current,
        width: '6rem'
      }, 250)
      
    } else {
      tl.add({
        targets: barRef?.current,
        width: '15.625rem',
      }).add({
        targets: hamburgerContentContainer.current,
        height: ['0', hamburgerContentContainer.current?.scrollHeight]
      }, 250)
    }
    tl.play();
    setMenuIsOpen(!menuIsOpen);
  }

return (<div className="fixed z-20 w-full top-6">
      <Container className="flex justify-center">
        <div className="w-24 px-4 py-2 clip-rounded" ref={barRef}>
          <span className="absolute inset-0 inline-block w-full h-full bg-background-tint/80 blur-xl -z-10"/>
          {/* Outer items */}
            <div className="relative flex items-center justify-between w-full gap-x-4">
              <Link href="/" aria-label="Go to homepage">
                <Icon type="home" className="w-6 fill-white" />
              </Link>
              <button className="flex flex-col items-center justify-center w-8 h-8 gap-y-1 clip-rounded" aria-label={`${menuIsOpen ? "Close" : "Open"} menu`} onClick={handleBurgerClick}>
                <span className="inline-block w-6 h-0.5 rounded-3xl bg-white" />
                <span className="inline-block w-6 h-0.5 rounded-3xl bg-white" />
                <span className="inline-block w-6 h-0.5 rounded-3xl bg-white" />
              </button>
            </div>
            <div className={clsx("h-0 -translate-x-4 overflow-hidden", menuIsOpen ? "w-[calc(100%_+_2rem)]" : "w-[15.625rem]")} ref={hamburgerContentContainer}>
              <nav className="px-4 py-2">
                <ul>
                  {/* TODO: Connect to Prismic */}
                  {mockMenu.map((item) => {
                    return <li key={item.link}>
                      <Link href={item.link} className="relative inline-flex justify-between w-full gap-x-2 text-body group">
                        <span className="absolute inset-0 w-[calc(100%_+_1rem)] -translate-x-2 transition-opacity opacity-0 bg-gradient-to-br from-gradient-purple to-gradient-pink rounded-xl -z-10 group-hover:opacity-100"/>
                        {/* <span className="inline-block w-2 h-2 translate-y-1.5 rounded-full bg-gradient-to-br from-gradient-purple to to-gradient-pink" /> */}
                        {item.label}
                        <Icon type={item.iconType} className="w-6" />
                      </Link>
                    </li>
                  })}
                </ul>
              </nav>
            </div>
          </div>
        </Container>
    </div>
  )
}