"use client";
import { useEffect } from "react";

interface RealEventListenerOptions extends EventListenerOptions {
  passive: boolean;
}

export default function FontResizer() {
  const options: RealEventListenerOptions = { passive: true };

  useEffect(() => {
    if (!window) return;
    handleResize();
    window.addEventListener("resize", handleResize, options);
    return () => {
      window.removeEventListener("resize", handleResize, options);
    };
  });

  function handleResize() {
    let fontSizeRatio = 1;
    let windowSizeBase = 768;
    if (window.innerWidth >= 1024) {
      windowSizeBase = 1024;
    } else if (window.innerWidth >= 768) {
      windowSizeBase = 768;
    } else {
      windowSizeBase = 320;
    }

    fontSizeRatio = window.innerWidth / windowSizeBase;
    const newFontSize = fontSizeRatio * 16;
    document.documentElement.style.fontSize = `${newFontSize}px`;
  }

  return null;
}
