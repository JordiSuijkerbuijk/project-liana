'use client';

import { useEffect, useRef } from 'react';

import clsx from 'clsx';

type onLoad = {
  callback: (v: boolean) => void;
  className: string;
};

export default function OnLoadAnimation({ callback, className }: onLoad) {
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    // TODO: add toggle body scrolling so scrolling is unavailable before
    // loading in all the way.
    //TODO: some animation not sure what
  }, [callback]);

  return (
    <div
      className={clsx(['fixed top-0 left-0 flex w-screen h-screen bg-[red] z-20', className])}
      ref={wrapperRef}
    ></div>
  );
}
