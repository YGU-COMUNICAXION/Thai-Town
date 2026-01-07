import { useEffect, useId, useMemo, useState } from "react";

import plato1 from "@assets/imgs/home/plato1.png";
import plato2 from "@assets/imgs/home/plato2.png";
import plato3 from "@assets/imgs/home/plato3.png";
import plato4 from "@assets/imgs/home/plato4.png";

const slides = [
  { title: "Buñuelos Thai", image: plato1 },
  { title: "Pad Thai", image: plato2 },
  { title: "Edamames", image: plato3 },
  { title: "Tom KhaGa", image: plato4 },
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
        className="hidden sm:flex items-center justify-center text-3xl text-primary-3 transition hover:text-primary-1  hover:cursor-pointer"
      >
        <span className="text-2xl lg:text-5xl font-semibold">‹</span>
      </button>

      <div className="relative flex items-center justify-center">
        <img
          src={activeSlide.image.src}
          alt={activeSlide.title}
          className="size-80 md:size-[24rem] lg:size-[28rem] rounded-full object-cover shadow-xl z-10"
        />

        <svg
          className="absolute inset-0 h-full w-full rotate-[0deg] z-20 top-12 left-12 lg:top-14 lg:left-14"
          viewBox="0 0 400 400"
          aria-hidden="true"
        >
          <defs>
            <path
              id={circleId}
              d="
                M200,200
                m-180,0
                a180,180 0 1,0 360,0
                a180,180 0 1,0 -360,0
              "
            />
          </defs>

          <text className="fill-primary-2 text-2xl lg:text-3xl font-bold tracking-[0.3em]">
            <textPath
              href={`#${circleId}`}
              startOffset="40%"
              textAnchor="middle"
            >
              {activeSlide.title}
            </textPath>
          </text>
        </svg>
      </div>

      <button
        type="button"
        onClick={handleNext}
        aria-label="Siguiente platillo"
        className="hidden sm:flex items-center justify-center text-3xl text-primary-3 transition hover:text-primary-1 hover:cursor-pointer z-20"
      >
        <span className="text-2xl lg:text-5xl font-semibold">›</span>
      </button>
    </div>
  );
}
