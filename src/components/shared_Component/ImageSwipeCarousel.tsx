"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

type Props = {
  images: string[];
  height?: string;
};

const swipeConfidenceThreshold = 10000;

const variants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 300 : -300,
    opacity: 0,
    scale: 0.98,
  }),
  center: {
    x: 0,
    opacity: 1,
    scale: 1,
  },
  exit: (direction: number) => ({
    x: direction < 0 ? 300 : -300,
    opacity: 0,
    scale: 0.98,
  }),
};

export default function ImageSwipeCarousel({
  images,
  height = "h-[500px]",
}: Props) {
  const [[page, direction], setPage] = useState([0, 0]);

  const imageIndex = ((page % images.length) + images.length) % images.length;

  const paginate = (newDirection: number) => {
    setPage([page + newDirection, newDirection]);
  };

  const dragEnd = (_: any, info: any) => {
    const offset = info.offset.x;
    const velocity = info.velocity.x;

    if (offset > swipeConfidenceThreshold || velocity > 500) {
      paginate(-1);
    } else if (offset < -swipeConfidenceThreshold || velocity < -500) {
      paginate(1);
    }
  };

  return (
    <div className={`relative w-full overflow-hidden bg-gray-50 ${height}`}>

      {/* Image slider */}
      <AnimatePresence initial={false} custom={direction}>
        <motion.img
          key={page}
          src={images[imageIndex]}
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            x: { type: "spring", stiffness: 300, damping: 30 },
            opacity: { duration: 0.2 },
            scale: { duration: 0.2 },
          }}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.8}
          onDragEnd={dragEnd}
          className="absolute w-full h-full object-cover cursor-grab active:cursor-grabbing"
        />
      </AnimatePresence>

      {/* Dots */}
      <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
        {images.map((_, i) => (
          <button
            key={i}
            onClick={() => setPage([i, i > imageIndex ? 1 : -1])}
            className={`transition-all duration-300 rounded-full ${
              i === imageIndex
                ? "w-4 h-1.5 bg-black"
                : "w-1.5 h-1.5 bg-black/30"
            }`}
          />
        ))}
      </div>
    </div>
  );
}