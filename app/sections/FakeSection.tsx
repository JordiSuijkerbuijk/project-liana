"use client";

import useParallax from "@/helpers/useParallax";
import clsx from "clsx";
import { useRef } from "react";

export default function FakeSection() {
  const layer1Refs = useRef<HTMLElement[]>([]);
  const layer2Refs = useRef<HTMLElement[]>([]);

  const layers = [
    {
      layerNumber: 1,
      targets: layer1Refs.current,
    },
    {
      layerNumber: 2,
      targets: layer2Refs.current,
    },
  ];
  const section = useParallax({ viewportDelta: 10, layers: layers });

  return (
    <section className="w-full py-28" ref={section}>
      <div className="relative w-full">
        <div className="relative max-w-[1280px] mx-auto px-5 min-h-screen flex items-center">
          <h1 className="text-6xl font-bold">
            Get your website made with Love
          </h1>
        </div>
        {images.slice(0, 2).map((img, index) => (
          <Card
            img={img}
            index={index}
            key={img}
            refArray={index % 2 === 0 ? layer2Refs : layer1Refs}
          />
        ))}
        {images.slice(2).map((img, index) => (
          <Card
            img={img}
            index={index + 2}
            refArray={index % 2 === 0 ? layer2Refs : layer1Refs}
            key={img}
          />
        ))}
      </div>
    </section>
  );
}

const images = [
  "https://images.pexels.com/photos/9829615/pexels-photo-9829615.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  "https://images.pexels.com/photos/4348401/pexels-photo-4348401.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  "https://images.pexels.com/photos/8657665/pexels-photo-8657665.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  "https://images.pexels.com/photos/7911758/pexels-photo-7911758.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
];

function Card({
  img,
  index,
  refArray,
}: {
  img: string;
  index: number;
  refArray: any;
}) {
  return (
    <div
      className={clsx(
        "absolute",
        index === 0 && "left-[10%] top-[25%]",
        index === 1 && "left-[13%] top-[50%]",
        index === 2 && "right-[10%] top-[20%]",
        index === 3 && " right-[13%] top-[40%]"
      )}
      ref={(element) => refArray.current.push(element)}
    >
      <div className="relative bg-white rounded-2xl text-black w-[320px] h-[320px]">
        <img
          src={img}
          alt=""
          className="absolute inset-0 w-full h-full object-cover rounded-2xl"
        />
      </div>
    </div>
  );
}
