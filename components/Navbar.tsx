"use client";

import Icon from "@/components/Icon/Icon";
import Link from "next/link";
import { useState } from "react";

const mockData = [
  {
    title: "Showreel",
    anchor: "showreel",
  },
  {
    title: "Project",
    anchor: "projects",
  },
  {
    title: "Contact",
    anchor: "contact",
  },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  function handleClick() {
    setTimeout(() => {
      setIsOpen((v) => !v);
    }, 200);
  }

  return (
    <nav className="fixed bottom-10 left-1/2 -translate-x-1/2 z-50">
      <div className="relative inline-flex gap-x-4 px-2 py-2 bg-background-tint/40 rounded-xl">
        {/* Span is separate to make it a couple pixels taller for nicer blur */}
        <span className="absolute w-full h-full inset-0 -z-10 backdrop-blur-md rounded-xl bg-background-tint/40" />

        <Link
          href="/"
          className="inline-flex items-center justify-center w-10 rounded bg-background aspect-square"
        >
          L
        </Link>
        <div className="flex items-center border px-4 h-10 border-white/20 rounded-[4px]">
          <div className="flex gap-x-2">
            {mockData.map((navItem) => (
              <Link href={navItem.anchor} key={navItem.anchor}>
                {navItem.title}
              </Link>
            ))}
          </div>
          {/* <button onClick={handleClick}>...</button> */}
        </div>
        <Link
          href="mailto:tristan.kirwan@dpdk.com"
          className="inline-flex items-center justify-center w-10 rounded border border-white/20 aspect-square"
        >
          <Icon type="phone" className="fill-white w-6" />
        </Link>
      </div>
    </nav>
  );
}
