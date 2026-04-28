"use client";

import {
  useState,
  useEffect,
  useRef,
  useCallback,
  ReactNode,
} from "react";
import { motion, AnimatePresence, PanInfo, Variants } from "framer-motion";

// ─────────────────────────────────────────────────────────────────────────────
// TYPES
// ─────────────────────────────────────────────────────────────────────────────
export interface SliderOptions {
  total: number;           // how many slides
  autoPlayMs?: number;     // auto-advance interval (default 5500)
  swipeThreshold?: number; // px drag needed to trigger slide (default 80)
}

export interface SliderState {
  current: number;
  direction: number;
  flash: boolean;
  paginate: (dir: number) => void;
  goTo: (index: number) => void;
  handleDragEnd: (_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => void;
}

// ─────────────────────────────────────────────────────────────────────────────
// HOOK — useImageSlider
// All state and logic. Use with any rendering approach.
//
// Usage:
//   const slider = useImageSlider({ total: images.length });
//   slider.current    → active index
//   slider.direction  → 1 | -1 (for variants)
//   slider.flash      → boolean (for flash overlay)
//   slider.paginate   → (dir) => void
//   slider.goTo       → (index) => void
//   slider.handleDragEnd → pass to onDragEnd
// ─────────────────────────────────────────────────────────────────────────────
export const useImageSlider = ({
  total,
  autoPlayMs = 5500,
  swipeThreshold = 80,
}: SliderOptions): SliderState => {
  const [[current, direction], setCurrent] = useState([0, 0]);
  const [flash, setFlash] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const triggerFlash = () => {
    setFlash(true);
    setTimeout(() => setFlash(false), 350);
  };

  const paginate = useCallback((dir: number) => {
    triggerFlash();
    setCurrent(([prev]) => [(prev + dir + total) % total, dir]);
  }, [total]);

  const goTo = useCallback((index: number) => {
    const dir = index > current ? 1 : -1;
    triggerFlash();
    setCurrent([index, dir]);
    // reset auto-play
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => paginate(1), autoPlayMs);
  }, [current, autoPlayMs, paginate]);

  const resetTimer = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => paginate(1), autoPlayMs);
  }, [autoPlayMs, paginate]);

  const handleDragEnd = useCallback((
    _: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo
  ) => {
    const { offset, velocity } = info;
    if (offset.x < -swipeThreshold || velocity.x < -400) {
      paginate(1);
      resetTimer();
    } else if (offset.x > swipeThreshold || velocity.x > 400) {
      paginate(-1);
      resetTimer();
    }
  }, [paginate, resetTimer, swipeThreshold]);

  useEffect(() => {
    timerRef.current = setInterval(() => paginate(1), autoPlayMs);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  return { current, direction, flash, paginate, goTo, handleDragEnd };
};

// ─────────────────────────────────────────────────────────────────────────────
// VARIANTS — exported so you can customise or extend
// ─────────────────────────────────────────────────────────────────────────────

// The exact variant from HomeHero — clip-path wipe + Ken Burns
export const kenBurnsVariants: Variants = {
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
      x:        { duration: 1.1, ease: [0.16, 1, 0.3, 1] },
      scale:    { duration: 7,   ease: [0.0, 0.0, 0.2, 1] },  // Ken Burns slow zoom
      opacity:  { duration: 0.55, ease: "easeOut" },
      clipPath: { duration: 1.0, ease: [0.16, 1, 0.3, 1] },
    },
  },
  exit: (d: number) => ({
    x: d > 0 ? "-3.5%" : "3.5%",
    scale: 1.04,
    opacity: 0,
    transition: { duration: 0.65, ease: [0.4, 0, 0.6, 1] },
  }),
};

// Simpler crossfade — no clip-path, just dissolve
export const crossfadeVariants: Variants = {
  enter:  { opacity: 0, scale: 1.03 },
  center: {
    opacity: 1,
    scale: 1.07,
    transition: {
      opacity: { duration: 0.8, ease: "easeOut" },
      scale:   { duration: 7,   ease: [0.0, 0.0, 0.2, 1] },
    },
  },
  exit:   {
    opacity: 0,
    scale: 1.02,
    transition: { duration: 0.6, ease: "easeIn" },
  },
};

// Hard push — no fade, strong directional slide (editorial/magazine feel)
export const pushVariants: Variants = {
  enter: (d: number) => ({
    x: d > 0 ? "100%" : "-100%",
    opacity: 1,
  }),
  center: {
    x: 0,
    opacity: 1,
    transition: { duration: 0.75, ease: [0.16, 1, 0.3, 1] },
  },
  exit: (d: number) => ({
    x: d > 0 ? "-100%" : "100%",
    opacity: 1,
    transition: { duration: 0.75, ease: [0.16, 1, 0.3, 1] },
  }),
};

// ─────────────────────────────────────────────────────────────────────────────
// COMPONENTS
// ─────────────────────────────────────────────────────────────────────────────

// SliderTrack — AnimatePresence wrapper, handles mode + custom
interface SliderTrackProps {
  current: number;
  direction: number;
  variants: Variants;
  children: ReactNode;    // should be a single motion.img / motion.div keyed to current
  className?: string;
}

export const SliderTrack = ({
  current,
  direction,
  variants,
  children,
  className,
}: SliderTrackProps) => (
  <AnimatePresence mode="sync" initial={false} custom={direction}>
    <motion.div
      key={current}
      custom={direction}
      variants={variants}
      initial="enter"
      animate="center"
      exit="exit"
      className={className}
    >
      {children}
    </motion.div>
  </AnimatePresence>
);

// FlashOverlay — the white flash on cut
interface FlashOverlayProps {
  flash: boolean;
  color?: string;         // default white
  intensity?: number;     // opacity at peak, default 0.18
}

export const FlashOverlay = ({
  flash,
  color = "white",
  intensity = 0.18,
}: FlashOverlayProps) => (
  <motion.div
    animate={{ opacity: flash ? intensity : 0 }}
    transition={{ duration: flash ? 0.05 : 0.3 }}
    style={{
      position: "absolute",
      inset: 0,
      background: color,
      pointerEvents: "none",
      zIndex: 10,
    }}
  />
);

// DotIndicators — animated pill dots
interface DotIndicatorsProps {
  total: number;
  current: number;
  goTo: (index: number) => void;
  color?: string;        // dot color, default white
  activePillWidth?: number;
  dotSize?: number;
}

export const DotIndicators = ({
  total,
  current,
  goTo,
  color = "white",
  activePillWidth = 24,
  dotSize = 6,
}: DotIndicatorsProps) => (
  <div
    style={{
      position: "absolute",
      bottom: 16,
      left: "50%",
      transform: "translateX(-50%)",
      display: "flex",
      gap: 8,
      zIndex: 20,
    }}
  >
    {Array.from({ length: total }).map((_, i) => (
      <button
        key={i}
        onClick={() => goTo(i)}
        aria-label={`Go to slide ${i + 1}`}
      >
        <motion.div
          animate={{
            width: i === current ? activePillWidth : dotSize,
            opacity: i === current ? 1 : 0.45,
          }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          style={{
            height: 5,
            borderRadius: 9999,
            background: color,
          }}
        />
      </button>
    ))}
  </div>
);

// ─────────────────────────────────────────────────────────────────────────────
// ImageSlider — full turnkey component (drop-in replacement for HomeHero core)
//
// Usage:
//   <ImageSlider
//     images={[img1.src, img2.src, img3.src]}
//     aspectRatio="aspect-video"
//     variant="kenBurns"          // "kenBurns" | "crossfade" | "push"
//   />
// ─────────────────────────────────────────────────────────────────────────────
type VariantName = "kenBurns" | "crossfade" | "push";

const variantMap: Record<VariantName, Variants> = {
  kenBurns: kenBurnsVariants,
  crossfade: crossfadeVariants,
  push: pushVariants,
};

interface ImageSliderProps {
  images: string[];
  aspectRatio?: string;   // tailwind class, default "aspect-video"
  variant?: VariantName;
  autoPlayMs?: number;
  dots?: boolean;
  dotColor?: string;
  className?: string;
  alt?: string;
}

export const ImageSlider = ({
  images,
  aspectRatio = "aspect-video",
  variant = "kenBurns",
  autoPlayMs = 5500,
  dots = true,
  dotColor = "white",
  className = "",
  alt = "Slide",
}: ImageSliderProps) => {
  const { current, direction, flash, goTo, handleDragEnd } = useImageSlider({
    total: images.length,
    autoPlayMs,
  });

  const variants = variantMap[variant];

  return (
    <div className={`relative w-full overflow-hidden ${aspectRatio} ${className}`}>
      <AnimatePresence mode="sync" initial={false} custom={direction}>
        <motion.img
          key={current}
          src={images[current]}
          alt={`${alt} ${current + 1}`}
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.6}
          onDragEnd={handleDragEnd}
        />
      </AnimatePresence>

      <FlashOverlay flash={flash} />

      {dots && (
        <DotIndicators
          total={images.length}
          current={current}
          goTo={goTo}
          color={dotColor}
        />
      )}
    </div>
  );
};