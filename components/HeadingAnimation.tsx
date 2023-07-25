'use client';

import { useCallback, useEffect, useRef } from 'react';

export default function HeadingAnimation({ text = '' }: { text: string }) {
  const element = useRef<HTMLHeadingElement | null>(null);
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const originalWord = text;

  const randomizeLetters = useCallback(
    (string: string, offset: number): string => {
      return string
        .split('')
        .map((item, key) => {
          if (key < offset) {
            return originalWord.split('')[key];
          }

          return characters[Math.floor(Math.random() * 26)];
        })
        .join('');
    },
    [originalWord]
  );

  useEffect(() => {
    let iterations = 0;
    const interval = setInterval(() => {
      if (!element.current) return;

      const randomString = randomizeLetters(text, iterations);
      element.current.innerText = randomString;

      if (randomString === originalWord) {
        clearInterval(interval);
      }

      iterations += 1 / 1.5;
    }, 50);

    return () => {
      clearInterval(interval);
    };
  }, [text, randomizeLetters, originalWord]);

  return (
    <h1 className="text-black text-8xl font-ppmori-regular" ref={element} />
  );
}
