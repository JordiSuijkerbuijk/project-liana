import { useCallback, useEffect, useRef } from "react";
import { useEvent } from "./useEvent";

const defaultOptions = { top: true, bottom: false };

function clamp(value: number): number {
  return Math.min(Math.max(value, 0), 1);
}

export function useScroll(
  callback: (progress: number) => void,
  options: { top?: boolean; bottom?: boolean }
) {
  options = { ...defaultOptions, ...options };
  const slice = useRef<HTMLElement>(null);
  const previous = useRef(0);

  const onScroll = useCallback(() => {
    if (!slice.current) return;

    const scrollTop = document.documentElement.scrollTop;
    const clientHeight = document.documentElement.clientHeight;
    const offsetTop = slice.current.offsetTop;
    const sliceHeight = slice.current.clientHeight;

    const adjustedTop = options.top ? clientHeight : 0;
    const adjustedBottom = options.bottom ? clientHeight : 0;

    const progress = clamp(
      (scrollTop + adjustedTop - offsetTop) /
        (sliceHeight - adjustedTop + adjustedBottom)
    );

    if (previous.current !== progress) {
      callback((previous.current = progress));
    }
  }, [slice, options, callback]);

  useEvent("scroll", onScroll);
  useEvent("resize", onScroll);
  useEffect(onScroll, [onScroll]);

  return slice;
}
