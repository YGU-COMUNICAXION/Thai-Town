import { useEffect, useId, useMemo, useState } from "react";

import plato1 from "@assets/imgs/home/plato1.png";
import plato2 from "@assets/imgs/home/plato2.png";
import plato3 from "@assets/imgs/home/plato3.png";
import plato4 from "@assets/imgs/home/plato4.png";

const slides = [
  { title: "Pad Thai", image: plato1 },
  { title: "Curry Panang", image: plato2 },
  { title: "Tom Yum", image: plato3 },
  { title: "Khao Pad", image: plato4 },
];

const AUTO_PLAY_MS = 4000;

export default function HomeCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);
  const circleId = useId();

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % slides.length);
    }, AUTO_PLAY_MS);

    return () => window.clearInterval(intervalId);
  }, []);

  const activeSlide = useMemo(() => slides[activeIndex], [activeIndex]);

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % slides.length);
  };

  return (
    <div className="flex items-center justify-center gap-4 lg:gap-8">
      <button
        type="button"
        onClick={handlePrev}
        aria-label="Platillo anterior"
        className="hidden sm:flex items-center justify-center text-3xl text-primary-3 transition hover:text-primary-1"
      >
        <span className="text-2xl">‹</span>
      </button>

      <div className="relative flex items-center justify-center">
        <img
          src={activeSlide.image.src}
          alt={activeSlide.title}
          className="size-80 md:size-[24rem] lg:size-[28rem] rounded-full object-cover shadow-xl"
        />
        <svg
          className="absolute inset-0 h-full w-full rotate-[20deg]"
          viewBox="0 0 400 400"
          aria-hidden="true"
        >
          <defs>
            <path
              id={circleId}
              d="M200,200 m-155,0 a155,155 0 1,1 310,0 a155,155 0 1,1 -310,0"
            />
          </defs>
          <text className="fill-primary-2 text-[22px] font-semibold tracking-[0.32em] uppercase">
            <textPath href={`#${circleId}`} startOffset="66%">
              {activeSlide.title}
            </textPath>
          </text>
        </svg>
      </div>

      <button
        type="button"
        onClick={handleNext}
        aria-label="Siguiente platillo"
        className="hidden sm:flex items-center justify-center text-3xl text-primary-3 transition hover:text-primary-1"
      >
        <span className="text-2xl">›</span>
      </button>
    </div>
  );
}
