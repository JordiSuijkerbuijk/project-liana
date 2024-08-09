'use client';

import { useEffect, useRef } from 'react';

import localFont from 'next/font/local';

import anime from 'animejs';
import clsx from 'clsx';

// If loading a variable font, you don't need to specify the font weight
const drukwide = localFont({
  src: '../../public/fonts/DrukWide/Druk-Wide-Bold.ttf',
  variable: '--font-drukwide',
  display: 'swap',
});

export default function Footer() {
  const textRef = useRef<HTMLDivElement>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const title = 'Liana';
  const currentYear = new Date().getFullYear();

  useEffect(() => {
    if (!containerRef?.current) return;

    observerRef.current = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          if (textRef?.current) {
            anime({
              targets: textRef.current.children,
              translateY: ['100%', 0],
              delay: anime.stagger(75),
              easing: 'easeInOutQuad',
              duration: 500,
            });
          }
          return;
        }
      });
    });

    observerRef.current.observe(containerRef.current);

    return () => {
      observerRef?.current?.disconnect();
    };
  }, []);

  return (
    <div
      className="relative z-20 mx-auto mb-padding bg-menu-backdrop w-full-without-padding clip-rounded"
      ref={containerRef}
    >
      <div className="p-1">
        <div className="w-full h-full bg-menu rounded-xl">
          <div className="flex flex-col px-8">
            <div className="py-20">
              <div
                className={clsx([
                  'flex leading-none uppercase text-accent text-[12vw] overflow-hidden',
                  drukwide.className,
                ])}
                ref={textRef}
              >
                {title &&
                  title.split('')?.map((item, key) => (
                    <h2 key={`home-hero-${key}`} className="translate-y-full">
                      {item}
                    </h2>
                  ))}
              </div>
            </div>
            <div className="w-full h-px bg-white/20" />
            <div className="flex justify-between py-4 gap-x-4">
              <span>Liana © {currentYear}</span>
              <a href="mailto:info@liana.com">agencyprojectliana@gmail.com</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
