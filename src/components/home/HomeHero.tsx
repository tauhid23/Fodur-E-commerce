"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence, PanInfo } from "framer-motion";

const images = [
  "https://i.ibb.co/tMmSFcZT/charlesdeluvio-FK81rxil-UXg-unsplash.jpg",
  "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=1600&q=80",
  "https://images.unsplash.com/photo-1503602642458-232111445657?auto=format&fit=crop&w=1600&q=80",
];

const swipeConfidenceThreshold = 100;

const HomeHero = () => {
  const [[current, direction], setCurrent] = useState([0, 0]);

  // // Auto slide every 4 seconds
  // useEffect(() => {
  //   const timer = setInterval(() => {
  //     setCurrent(([prev]) => [(prev + 1) % images.length, 1]);
  //   }, 6000);

  //   return () => clearInterval(timer);
  // }, []);

  const paginate = (newDirection: number) => {
    setCurrent(([prev]) => [
      (prev + newDirection + images.length) % images.length,
      newDirection,
    ]);
  };

  const handleDragEnd = (_: any, info: PanInfo) => {
    const offset = info.offset.x;
    const velocity = info.velocity.x;

    if (offset < -swipeConfidenceThreshold || velocity < -500) {
      paginate(1);
    } else if (offset > swipeConfidenceThreshold || velocity > 500) {
      paginate(-1);
    }
  };

  return (
    <section className="w-full bg-background overflow-hidden">

      {/* Full width hero */}
      <div className="relative w-full">

        <AnimatePresence mode="wait" initial={false}>
          <motion.img
            key={current}
            src={images[current]}
            alt="Hero banner"
            className="w-full h-[260px] md:h-[500px] object-cover"
            
           initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -30 }}
                transition={{ duration: 0.4 }}
           

            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.8}
            onDragEnd={handleDragEnd}
          />
        </AnimatePresence>

        {/* Dark overlay for text readability
        <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-transparent flex items-end p-6 md:p-12">
          <div className="max-w-2xl">
            <h1 className="text-white text-2xl md:text-5xl font-bold">
              Premium Collection
            </h1>

            <p className="text-white/80 text-sm md:text-base mt-3">
              Discover high quality products at best price with modern shopping experience
            </p>

            <button className="mt-5 bg-primary text-primary-foreground px-6 py-2 rounded-xl">
              Shop Now
            </button>
          </div>
        </div> */}

      </div>
    </section>
  );
};

export default HomeHero;