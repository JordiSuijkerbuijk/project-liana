import { useCallback, useEffect, useRef } from 'react';

import { useEvent } from './useEvent';

const defaultOptions = { top: true, bottom: false, alternativeFunction: false };

function clamp(value: number): number {
  return Math.min(Math.max(value, 0), 1);
}

/**
 * Runs the callback with updated progress value based on how much of the referenced element has been in view.
 * @param callback - The function that is called when progress changes. The progress value is always between 0 and 1.
 * @param options - Adjustable values that influence the scroll logic.
 * @param {('bottom' | 'top')} options.startTracking - When to start tracking progress through a slice. Bottom will start progress when the top of the slice hits the bottom of the viewport. Top will start progress when the top of the slice hits the top of the viewport.
 * @param {('bottom' | 'top')} options.stopTracking - When to start tracking progress through a slice. Bottom will start progress when the top of the slice hits the bottom of the viewport. Top will start progress when the top of the slice hits the top of the viewport.
 * @returns A ref object that should be assigned to element that view progress is tracked for.
 */
export function useScroll<T extends HTMLElement>(
  callback: (progress: number) => void,
  options: { startTracking: 'bottom' | 'top'; stopTracking: 'bottom' | 'top' },
) {
  options = { ...defaultOptions, ...options };
  const slice = useRef<T | null>(null);
  const previous = useRef(0);

  const onScroll = useCallback(() => {
    if (!slice.current) return;

    const scrollTop = document.documentElement.scrollTop; // Amount scrollled on page
    const offsetTop = slice.current.getBoundingClientRect()?.top + scrollTop; // Top of element compared to top of page (has to use getBoundingClientRect because it can be nested inside another element)
    const sliceHeight = slice.current.clientHeight; // Height of element
    const screenHeight = document.documentElement.clientHeight; // 100vh

    const progressStartValue =
      options.startTracking === 'bottom' ? offsetTop : offsetTop + screenHeight;

    const endCalculation =
      options.stopTracking === 'bottom'
        ? offsetTop + sliceHeight
        : offsetTop + sliceHeight + screenHeight;

    const pixelsThroughCalcArea = Math.max(scrollTop + screenHeight - progressStartValue, 0);
    const endValueForCalculation = endCalculation - progressStartValue;

    const progress = clamp(pixelsThroughCalcArea / endValueForCalculation);

    if (previous.current !== progress) {
      callback((previous.current = progress));
    }
  }, [slice, options, callback]);

  useEvent('scroll', onScroll);
  useEvent('resize', onScroll);
  useEffect(onScroll, [onScroll]);

  return slice;
}
