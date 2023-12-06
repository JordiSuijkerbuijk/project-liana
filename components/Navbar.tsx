"use client";

import Container from "@/components/Container";
import GlitchEffectText from "@/components/GlitchEffectText";
import Icon from "@/components/Icon/Icon";
import anime from "animejs";
import clsx from "clsx";
import Link from "next/link";

import { useRef, useState } from "react";

const mockMenu = [
  {
    label: "Projects",
    link: "/projects",
    iconType: "browser" as const,
  },
  {
    label: "About us",
    link: "/about-us",
    iconType: "speechBubble" as const,
  },
  {
    label: "Contact",
    link: "/contact",
    iconType: "addressBook" as const,
  },
];

export default function NavBar() {
  const [menuIsOpen, setMenuIsOpen] = useState(false);
  const barRef = useRef<HTMLDivElement>(null);
  const hamburgerContentContainer = useRef<HTMLDivElement>(null);

  function handleBurgerClick() {
    const tl = anime.timeline({
      easing: "easeInOutCubic",
      duration: 400,
      autoplay: false,
    });
    if (menuIsOpen) {
      tl.add({
        targets: hamburgerContentContainer.current,
        height: "0",
      }).add(
        {
          targets: barRef.current,
          width: "6rem",
        },
        250
      );
    } else {
      tl.add({
        targets: barRef?.current,
        width: "15.625rem",
      }).add(
        {
          targets: hamburgerContentContainer.current,
          height: ["0", hamburgerContentContainer.current?.scrollHeight],
        },
        250
      );
    }
    tl.play();
    setMenuIsOpen(!menuIsOpen);
  }

  function handleMouseMove(e: MouseEvent) {
    if (!barRef?.current) return;
    const menuPositioning = barRef.current.getBoundingClientRect();

    const x = e.clientX - menuPositioning.left;
    const y = e.clientY - menuPositioning.top;

    barRef.current.style.setProperty("--mouse-x", `${x}px`);
    barRef.current.style.setProperty("--mouse-y", `${y}px`);
  }

  return (
    <div className="fixed z-20 w-full top-6">
      <Container className="flex justify-center">
        <div
          className="relative w-24 px-4 py-2 clip-rounded"
          ref={barRef}
          onMouseMove={handleMouseMove}
        >
          {/* Hover circle */}
          <span className="inline-block absolute top-0 left-0 w-full h-full radial-gradient-white" />
          {/* Backdrop handling */}
          <span className="absolute inset-0 inline-block w-full h-full backdrop-blur-xl -z-10">
            <span className="absolute inset-0 inline-block w-full h-full bg-background-shade/80" />
          </span>
          {/* Outer items */}
          <div className="relative flex items-center justify-between w-full gap-x-4">
            <Link href="/" aria-label="Go to homepage">
              <Icon type="home" className="w-6 fill-white" />
            </Link>
            <button
              className="flex flex-col items-center justify-center w-8 h-8 gap-y-1 clip-rounded"
              aria-label={`${menuIsOpen ? "Close" : "Open"} menu`}
              onClick={handleBurgerClick}
            >
              <span className="inline-block w-6 h-0.5 rounded-3xl bg-white" />
              <span className="inline-block w-6 h-0.5 rounded-3xl bg-white" />
              <span className="inline-block w-6 h-0.5 rounded-3xl bg-white" />
            </button>
          </div>
          <div
            className={clsx(
              "h-0 -translate-x-4 overflow-hidden",
              menuIsOpen ? "w-[calc(100%_+_2rem)]" : "w-[15.625rem]"
            )}
            ref={hamburgerContentContainer}
          >
            <nav className="relative px-4 pt-5 pb-2">
              <ul className="flex flex-col gap-y-3">
                {/* TODO: Connect to Prismic */}
                {mockMenu.map((item) => {
                  return (
                    <li key={item.link}>
                      <GlitchEffectText
                        text={item.label}
                        link={item.link}
                        iconType={item.iconType}
                        iconClass={
                          item.iconType === "browser"
                            ? "stroke-white"
                            : "fill-white"
                        }
                      />
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
