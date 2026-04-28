"use client";

import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { AnimatePresence, motion, Variants } from "framer-motion";

const bannerTexts = [
  "Free shipping on all orders over $99",
  "New arrivals just dropped — shop now",
  "Exclusive summer sale up to 40% off",
  "Premium quality fashion for every season",
  "Limited stock — grab your favorites today",
];

const textVariants: Variants = {
  enter: {
    y: "60%",
    opacity: 0,
    filter: "blur(8px)",
  },
  center: {
    y: "0%",
    opacity: 1,
    filter: "blur(0px)",
    transition: {
      y:       { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
      opacity: { duration: 0.5, ease: "easeOut" },
      filter:  { duration: 0.5, ease: "easeOut" },
    },
  },
  exit: {
    y: "-60%",
    opacity: 0,
    filter: "blur(8px)",
    transition: {
      y:       { duration: 0.4, ease: [0.4, 0, 1, 1] },
      opacity: { duration: 0.3, ease: "easeIn" },
      filter:  { duration: 0.3, ease: "easeIn" },
    },
  },
};

const UpperBanner = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState<1 | -1>(1);

  const nextSlide = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % bannerTexts.length);
  };

  const prevSlide = () => {
    setDirection(-1);
    setCurrentIndex(
      (prev) => (prev - 1 + bannerTexts.length) % bannerTexts.length
    );
  };

  useEffect(() => {
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full font-sans bg-accent/90 text-white h-9 sm:h-12 flex items-center justify-between px-3 sm:px-6 overflow-hidden">
      <button
        onClick={prevSlide}
        className="shrink-0 p-1.5 rounded-full hover:bg-white/10 transition-colors duration-200"
        aria-label="Previous banner text"
      >
        <ChevronLeft size={18} />
      </button>

      <div className="relative flex-1 overflow-hidden h-full flex items-center justify-center">
        <AnimatePresence mode="wait">
          <motion.p
            key={currentIndex}
            variants={textVariants}
            initial="enter"
            animate="center"
            exit="exit"
            className="absolute text-xs sm:text-sm md:text-base font-medium tracking-wide text-center px-4 whitespace-nowrap"
            style={{ willChange: "transform, opacity, filter" }}
          >
            {bannerTexts[currentIndex]}
          </motion.p>
        </AnimatePresence>
      </div>

      <button
        onClick={nextSlide}
        className="shrink-0 p-1.5 rounded-full hover:bg-white/10 transition-colors duration-200"
        aria-label="Next banner text"
      >
        <ChevronRight size={18} />
      </button>
    </div>
  );
};

export default UpperBanner;












// "use client";

// import { useEffect, useState } from "react";
// import { ChevronLeft, ChevronRight } from "lucide-react";
// import { AnimatePresence, motion, Variants } from "framer-motion";

// const bannerTexts = [
//   "Free shipping on all orders over $99",
//   "New arrivals just dropped — shop now",
//   "Exclusive summer sale up to 40% off",
//   "Premium quality fashion for every season",
//   "Limited stock — grab your favorites today",
// ];

// const containerVariants: Variants = {
//   enter: {
//     transition: {
//       staggerChildren: 0.055,
//       delayChildren: 0.02,
//     },
//   },
//   center: {
//     transition: {
//       staggerChildren: 0.055,
//     },
//   },
//   exit: {
//     transition: {
//       staggerChildren: 0.02,
//       staggerDirection: -1,
//     },
//   },
// };

// // const wordVariants: Variants = {
// //   enter: (direction: number) => ({
// //     // y: direction > 0 ? 18 : -18,
// //     opacity: 0,
// //     // filter: "blur(10px)",
// //   }),
// //   center: {
// //     y: 0,
// //     opacity: 1,
// //     // filter: "blur(0px)",
// //     transition: {
// //       duration: 0.55,
// //       ease: [0.16, 1, 0.3, 1],
// //     },
// //   },
// //   exit: (direction: number) => ({
// //     // y: direction > 0 ? -10 : 10,
// //     opacity: 0,
// //     // filter: "blur(6px)",
// //     transition: {
// //       duration: 0.22,
// //       ease: [0.4, 0, 1, 1],
// //     },
// //   }),
// // };
// const wordVariants: Variants = {
//   enter: (_direction: number) => ({
//     opacity: 0,
//     scale: 0.82,
//   }),
//   center: {
//     opacity: 1,
//     scale: 1,
//     transition: {
//       duration: 0.5,
//       ease: [0.16, 1, 0.3, 1],
//     },
//   },
//   exit: (_direction: number) => ({
//     opacity: 0,
//     scale: 0.95,
//     transition: {
//       duration: 0.22,
//       ease: [0.4, 0, 1, 1],
//     },
//   }),
// };

// const UpperBanner = () => {
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [direction, setDirection] = useState<1 | -1>(1);

//   const nextSlide = () => {
//     setDirection(1);
//     setCurrentIndex((prev) => (prev + 1) % bannerTexts.length);
//   };

//   const prevSlide = () => {
//     setDirection(-1);
//     setCurrentIndex(
//       (prev) => (prev - 1 + bannerTexts.length) % bannerTexts.length
//     );
//   };

//   useEffect(() => {
//     const interval = setInterval(nextSlide, 5000);
//     return () => clearInterval(interval);
//   }, []);

//   const words = bannerTexts[currentIndex].split(" ");

//   return (
//     <div className="w-full bg-accent/90 text-white h-9 sm:h-12 flex items-center justify-between px-3 sm:px-6 overflow-hidden">
//       <button
//         onClick={prevSlide}
//         className="shrink-0 p-1.5 rounded-full hover:bg-white/10 transition-colors duration-200"
//         aria-label="Previous banner text"
//       >
//         <ChevronLeft size={18} />
//       </button>

//       <div className="relative flex-1 overflow-hidden h-full flex items-center justify-center">
//         <AnimatePresence mode="wait" custom={direction}>
//           <motion.div
//             key={currentIndex}
//             custom={direction}
//             variants={containerVariants}
//             initial="enter"
//             animate="center"
//             exit="exit"
//             className="absolute flex items-center gap-[0.32em] flex-wrap justify-center"
//           >
//             {words.map((word, i) => (
//               <motion.span
//                 key={i}
//                 custom={direction}
//                 variants={wordVariants}
//                 className="text-xs sm:text-sm md:text-base font-medium tracking-wide inline-block"
//                 style={{ willChange: "transform, opacity, filter" }}
//               >
//                 {word}
//               </motion.span>
//             ))}
//           </motion.div>
//         </AnimatePresence>
//       </div>

//       <button
//         onClick={nextSlide}
//         className="shrink-0 p-1.5 rounded-full hover:bg-white/10 transition-colors duration-200"
//         aria-label="Next banner text"
//       >
//         <ChevronRight size={18} />
//       </button>
//     </div>
//   );
// };

// export default UpperBanner;