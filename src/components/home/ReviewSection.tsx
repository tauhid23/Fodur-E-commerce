"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface Review {
  id: number;
  title: string;
  body: string;
  reviewer: string;
  rating: number;
}

const reviews: Review[] = [
  {
    id: 1,
    title: "Lovely colour, good quality",
    body: "I love the hijab. The colour is lovely and the material is of good quality. Matches with the dress I've bought",
    reviewer: "Alliya",
    rating: 5,
  },
  {
    id: 2,
    title: "Perfect!",
    body: "Mashallah my princess looked like a doll! Loved everything about it! Thank u podur for matching baby outfits… 🩷🩷🩷",
    reviewer: "Farhat Abdul",
    rating: 5,
  },
  {
    id: 3,
    title: "Love!!!",
    body: "Mashallah me and my 2 year old wore it in Doha! We loved everything about it! Looked lovely, and loads of compliments! 🧡🩷",
    reviewer: "Farhat Abdul",
    rating: 5,
  },
  {
    id: 4,
    title: "Absolutely stunning!",
    body: "The fabric quality is exceptional and the colours are so vibrant. Will definitely be ordering again soon! 🩷",
    reviewer: "Nadia Rahman",
    rating: 5,
  },
  {
    id: 5,
    title: "Amazing quality",
    body: "Fast delivery and the product exceeded my expectations. My daughter loved it so much! Highly recommend. 🩷🩷",
    reviewer: "Sara Ahmed",
    rating: 5,
  },
];

function StarRating({
  count = 5,
  size = "md",
}: {
  count?: number;
  size?: "sm" | "md" | "lg";
}) {
  const sizeClass =
    size === "lg" ? "w-7 h-7" : size === "sm" ? "w-4 h-4" : "w-5 h-5";

  return (
    <div className="flex items-center justify-center gap-0.5">
      {Array.from({ length: count }).map((_, i) => (
        <svg
          key={i}
          className={`${sizeClass} text-[#1a7a4a]`}
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

export default function ReviewSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const total = reviews.length;

  const paginate = (dir: number) => {
    setDirection(dir);
    setCurrentIndex((prev) => (prev + dir + total) % total);
  };

  // Always prepare 3 reviews (wrapping)
  const visibleReviews = [
    reviews[currentIndex % total],
    reviews[(currentIndex + 1) % total],
    reviews[(currentIndex + 2) % total],
  ];

  const slideVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 80 : -80,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
      transition: { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] as const },
    },
    exit: (dir: number) => ({
      x: dir > 0 ? -80 : 80,
      opacity: 0,
      transition: { duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] as const },
    }),
  };

  return (
    <section className="w-full py-4 sm:py-14 px-2 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="text-center mb-5 sm:mb-10">
        <h2 className="text-lg sm:text-2xl font-bold text-gray-900 tracking-tight mb-1.5">
          Our Latest 5-Star Reviews
        </h2>
        <StarRating count={5} size="lg" />
        <p className="mt-1 text-xs sm:text-sm text-gray-500">Over 1000 reviews</p>
      </div>

      {/* Carousel row */}
      <div className="relative max-w-5xl mx-auto flex items-start gap-1 sm:gap-3">
        {/* Prev button */}
        <button
          onClick={() => paginate(-1)}
          aria-label="Previous reviews"
          className="shrink-0 mt-5 p-1 sm:p-2 text-gray-300 hover:text-gray-500 transition-colors duration-200"
        >
          <ChevronLeft strokeWidth={1.5} className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>

        {/* Cards */}
        <div className="flex-1 overflow-hidden">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={currentIndex}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6"
            >
              {visibleReviews.map((review, i) => (
                <ReviewCard
                  key={`${review.id}-slot${i}`}
                  review={review}
                  // slot 1 hidden on mobile, slot 2 hidden on mobile+tablet
                  className={
                    i === 1
                      ? "hidden sm:flex"
                      : i === 2
                      ? "hidden lg:flex"
                      : "flex"
                  }
                />
              ))}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Next button */}
        <button
          onClick={() => paginate(1)}
          aria-label="Next reviews"
          className="shrink-0 mt-5 p-1 sm:p-2 text-gray-300 hover:text-gray-500 transition-colors duration-200"
        >
          <ChevronRight strokeWidth={1.5} className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>
      </div>

      {/* Dot indicators — mobile only */}
      <div className="flex justify-center gap-1.5 mt-6 sm:hidden">
        {reviews.map((_, i) => (
          <button
            key={i}
            onClick={() => {
              setDirection(i > currentIndex ? 1 : -1);
              setCurrentIndex(i);
            }}
            aria-label={`Go to review ${i + 1}`}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              i === currentIndex ? "w-5 bg-[#1a7a4a]" : "w-1.5 bg-gray-300"
            }`}
          />
        ))}
      </div>
    </section>
  );
}

/* ── Single Review Card ── */
function ReviewCard({
  review,
  className = "",
}: {
  review: Review;
  className?: string;
}) {
  return (
    <div
      className={`flex-col items-center text-center px-3 sm:px-6 py-2 min-h-44 ${className}`}
    >
      <StarRating count={review.rating} size="md" />

      <h3 className="mt-3 text-sm font-bold text-gray-900 leading-snug">
        {review.title}
      </h3>

      <p className="mt-2 text-sm text-gray-600 leading-relaxed">{review.body}</p>

      {/* Push reviewer name to bottom */}
      <div className="flex-1" />

      <p className="mt-1 text-sm text-gray-400">{review.reviewer}</p>
    </div>
  );
}