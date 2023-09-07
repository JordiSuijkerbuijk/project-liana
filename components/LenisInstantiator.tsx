"use client";

import Lenis from "@studio-freight/lenis";
import { useEffect } from "react";

export default function LenisInstantiator({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    const lenis = new Lenis();

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);
  });

  return <>{children}</>;
}
