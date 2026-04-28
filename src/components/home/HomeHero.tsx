"use client";

import hero_image from "../../../public/images/hero_image2.png";
import hero_image2 from "../../../public/images/hero_image.png";
import hero_image3 from "../../../public/images/hero_image3.png";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, PanInfo, Variants } from "framer-motion";

const images = [hero_image.src, hero_image2.src,hero_image3.src];
const SWIPE_THRESHOLD = 80;
const INTERVAL_MS = 5500;

const slideVariants: Variants = {
  enter: (d: number) => ({
    x: d > 0 ? "5%" : "-5%",
    scale: 1.0,
    opacity: 0,
    clipPath: d > 0 ? "inset(0 100% 0 0)" : "inset(0 0 0 100%)",
  }),
  center: {
    x: 0,
    scale: 1.07,
    opacity: 1,
    clipPath: "inset(0 0% 0 0)",
    transition: {
      x: { duration: 1.1, ease: [0.16, 1, 0.3, 1] },
      scale: { duration: 7, ease: [0.0, 0.0, 0.2, 1] },
      opacity: { duration: 0.55, ease: "easeOut" },
      clipPath: { duration: 1.0, ease: [0.16, 1, 0.3, 1] },
    },
  },
  exit: (d: number) => ({
    x: d > 0 ? "-3.5%" : "3.5%",
    scale: 1.04,
    opacity: 0,
    transition: {
      duration: 0.65,
      ease: [0.4, 0, 0.6, 1],
    },
  }),
};

const HomeHero = () => {
  const [[current, direction], setCurrent] = useState([0, 0]);
  const [flash, setFlash] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const paginate = (newDirection: number) => {
    setFlash(true);
    setTimeout(() => setFlash(false), 350);
    setCurrent(([prev]) => [
      (prev + newDirection + images.length) % images.length,
      newDirection,
    ]);
  };

  const resetTimer = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => paginate(1), INTERVAL_MS);
  };

  useEffect(() => {
    timerRef.current = setInterval(() => paginate(1), INTERVAL_MS);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  const handleDragEnd = (
    _: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo
  ) => {
    const { offset, velocity } = info;
    if (offset.x < -SWIPE_THRESHOLD || velocity.x < -400) {
      paginate(1);
      resetTimer();
    } else if (offset.x > SWIPE_THRESHOLD || velocity.x > 400) {
      paginate(-1);
      resetTimer();
    }
  };

  return (
    <section className="w-screen max-w-full bg-background overflow-hidden">
      <div className="relative w-full aspect-video">
        <AnimatePresence mode="sync" initial={false} custom={direction}>
          <motion.img
            key={current}
            src={images[current]}
            alt="Hero banner"
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            className="absolute inset-0 w-full h-full object-cover"
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.6}
            onDragEnd={handleDragEnd}
          />
        </AnimatePresence>

        {/* Flash overlay */}
        <motion.div
          animate={{ opacity: flash ? 0.18 : 0 }}
          transition={{ duration: flash ? 0.05 : 0.3 }}
          className="absolute inset-0 bg-white pointer-events-none z-10"
        />

        {/* Dot indicators */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-20">
          {images.map((_, i) => (
            <button
              key={i}
              onClick={() => {
                const d = i > current ? 1 : -1;
                setCurrent([i, d]);
                setFlash(true);
                setTimeout(() => setFlash(false), 350);
                resetTimer();
              }}
              aria-label={`Go to slide ${i + 1}`}
            >
              <motion.div
                animate={{
                  width: i === current ? 24 : 6,
                  opacity: i === current ? 1 : 0.45,
                }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="h-[5px] rounded-full bg-white"
              />
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HomeHero;