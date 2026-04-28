"use client";

import {
  motion,
  useInView,
  useScroll,
  useTransform,
  useSpring,
  Variants,
  MotionValue,
} from "framer-motion";
import { useRef, ReactNode, CSSProperties } from "react";

// ─────────────────────────────────────────────────────────────────────────────
// SHARED EASINGS
// ─────────────────────────────────────────────────────────────────────────────
const ease = {
  out: [0.16, 1, 0.3, 1] as const,       // expo-out — snappy settle
  in: [0.4, 0, 1, 1] as const,           // ease-in — decisive exit
  inOut: [0.87, 0, 0.13, 1] as const,    // strong in-out
  spring: { type: "spring", stiffness: 80, damping: 20 } as const,
};

// ─────────────────────────────────────────────────────────────────────────────
// 1. FadeUp  — the universal "reveal on scroll" wrapper
//    Usage: <FadeUp><YourComponent /></FadeUp>
//    Use on: sections, cards, headings, any block content
// ─────────────────────────────────────────────────────────────────────────────
interface FadeUpProps {
  children: ReactNode;
  delay?: number;       // stagger manually: delay={0.1 * index}
  duration?: number;
  y?: number;
  className?: string;
  once?: boolean;       // re-animate on re-entry when false
}

export const FadeUp = ({
  children,
  delay = 0,
  duration = 0.7,
  y = 32,
  className,
  once = true,
}: FadeUpProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once, margin: "-80px 0px" });

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y }}
      transition={{ duration, delay, ease: ease.out }}
    >
      {children}
    </motion.div>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// 2. FadeIn  — pure opacity reveal, no movement
//    Use on: images, backgrounds, overlays, subtle content
// ─────────────────────────────────────────────────────────────────────────────
interface FadeInProps {
  children: ReactNode;
  delay?: number;
  duration?: number;
  className?: string;
  once?: boolean;
}

export const FadeIn = ({
  children,
  delay = 0,
  duration = 0.8,
  className,
  once = true,
}: FadeInProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once, margin: "-60px 0px" });

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0 }}
      animate={inView ? { opacity: 1 } : { opacity: 0 }}
      transition={{ duration, delay, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// 3. SlideIn  — directional entrance from any side
//    Use on: sidebars, drawers, banners, feature callouts
// ─────────────────────────────────────────────────────────────────────────────
type Direction = "left" | "right" | "up" | "down";

interface SlideInProps {
  children: ReactNode;
  from?: Direction;
  distance?: number;
  delay?: number;
  duration?: number;
  className?: string;
  once?: boolean;
}

const getSlideOffset = (from: Direction, distance: number) => ({
  x: from === "left" ? -distance : from === "right" ? distance : 0,
  y: from === "up" ? -distance : from === "down" ? distance : 0,
});

export const SlideIn = ({
  children,
  from = "left",
  distance = 60,
  delay = 0,
  duration = 0.75,
  className,
  once = true,
}: SlideInProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once, margin: "-60px 0px" });
  const offset = getSlideOffset(from, distance);

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, ...offset }}
      animate={inView ? { opacity: 1, x: 0, y: 0 } : { opacity: 0, ...offset }}
      transition={{ duration, delay, ease: ease.out }}
    >
      {children}
    </motion.div>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// 4. StaggerList  — staggers every direct child on scroll
//    Use on: grids, lists, card rows, feature sections
//    Usage:
//      <StaggerList>
//        {items.map(item => <Card key={item.id} {...item} />)}
//      </StaggerList>
// ─────────────────────────────────────────────────────────────────────────────
interface StaggerListProps {
  children: ReactNode;
  stagger?: number;
  childY?: number;
  duration?: number;
  className?: string;
  once?: boolean;
}

const staggerContainer: Variants = {
  hidden: {},
  show: (stagger: number) => ({
    transition: { staggerChildren: stagger },
  }),
};

const staggerChild = (y: number, duration: number): Variants => ({
  hidden: { opacity: 0, y },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration, ease: ease.out },
  },
});

export const StaggerList = ({
  children,
  stagger = 0.1,
  childY = 28,
  duration = 0.6,
  className,
  once = true,
}: StaggerListProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once, margin: "-60px 0px" });
  const childVariants = staggerChild(childY, duration);

  return (
    <motion.div
      ref={ref}
      className={className}
      variants={staggerContainer}
      custom={stagger}
      initial="hidden"
      animate={inView ? "show" : "hidden"}
    >
      {/* Wrap each child in a motion.div automatically */}
      {Array.isArray(children)
        ? children.map((child, i) => (
            <motion.div key={i} variants={childVariants}>
              {child}
            </motion.div>
          ))
        : <motion.div variants={childVariants}>{children}</motion.div>}
    </motion.div>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// 5. BlurReveal  — blur-to-sharp reveal (word-level or block-level)
//    Use on: hero headings, section titles, pull quotes
// ─────────────────────────────────────────────────────────────────────────────
interface BlurRevealProps {
  children: ReactNode;
  delay?: number;
  duration?: number;
  className?: string;
  once?: boolean;
}

export const BlurReveal = ({
  children,
  delay = 0,
  duration = 0.9,
  className,
  once = true,
}: BlurRevealProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once, margin: "-40px 0px" });

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, filter: "blur(12px)", y: 16 }}
      animate={
        inView
          ? { opacity: 1, filter: "blur(0px)", y: 0 }
          : { opacity: 0, filter: "blur(12px)", y: 16 }
      }
      transition={{ duration, delay, ease: ease.out }}
    >
      {children}
    </motion.div>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// 6. WordReveal  — word-by-word blur+stagger on a text string
//    Use on: hero h1, section headings, taglines
//    Usage: <WordReveal text="Premium fashion for every season" />
// ─────────────────────────────────────────────────────────────────────────────
interface WordRevealProps {
  text: string;
  delay?: number;
  stagger?: number;
  className?: string;         // applied to the wrapper
  wordClassName?: string;     // applied to each word span
  once?: boolean;
}

const wordContainerVariants: Variants = {
  hidden: {},
  show: (stagger: number) => ({
    transition: { staggerChildren: stagger, delayChildren: 0 },
  }),
};

const wordItemVariants: Variants = {
  hidden: { opacity: 0, y: 18, filter: "blur(10px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] },
  },
};

export const WordReveal = ({
  text,
  delay = 0,
  stagger = 0.06,
  className,
  wordClassName,
  once = true,
}: WordRevealProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once, margin: "-40px 0px" });
  const words = text.split(" ");

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{ display: "flex", flexWrap: "wrap", gap: "0.3em" }}
      variants={wordContainerVariants}
      custom={stagger}
      initial="hidden"
      animate={inView ? "show" : "hidden"}
      transition={{ delayChildren: delay }}
    >
      {words.map((word, i) => (
        <motion.span
          key={i}
          variants={wordItemVariants}
          className={wordClassName}
          style={{ display: "inline-block", willChange: "transform, opacity, filter" }}
        >
          {word}
        </motion.span>
      ))}
    </motion.div>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// 7. ScaleReveal  — scale up from slightly small
//    Use on: product images, hero images, cards with images
// ─────────────────────────────────────────────────────────────────────────────
interface ScaleRevealProps {
  children: ReactNode;
  delay?: number;
  duration?: number;
  from?: number;    // initial scale, default 0.88
  className?: string;
  once?: boolean;
}

export const ScaleReveal = ({
  children,
  delay = 0,
  duration = 0.85,
  from = 0.88,
  className,
  once = true,
}: ScaleRevealProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once, margin: "-60px 0px" });

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, scale: from }}
      animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: from }}
      transition={{ duration, delay, ease: ease.out }}
    >
      {children}
    </motion.div>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// 8. ParallaxScroll  — scroll-linked vertical parallax
//    Use on: hero images, background layers, decorative elements
//    Usage: <ParallaxScroll speed={0.3}><img ... /></ParallaxScroll>
//    speed: 0 = locked, 1 = moves at scroll speed, 0.3 = gentle parallax
// ─────────────────────────────────────────────────────────────────────────────
interface ParallaxScrollProps {
  children: ReactNode;
  speed?: number;
  className?: string;
}

export const ParallaxScroll = ({
  children,
  speed = 0.25,
  className,
}: ParallaxScrollProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const rawY = useTransform(scrollYProgress, [0, 1], [`${speed * -100}px`, `${speed * 100}px`]);
  const y = useSpring(rawY, { stiffness: 80, damping: 30 });

  return (
    <div ref={ref} className={className} style={{ overflow: "hidden" }}>
      <motion.div style={{ y }}>{children}</motion.div>
    </div>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// 9. CountUp  — animated number counter on scroll
//    Use on: stat sections, metrics, product counts
//    Usage: <CountUp to={4800} suffix="+" />
// ─────────────────────────────────────────────────────────────────────────────
interface CountUpProps {
  to: number;
  from?: number;
  duration?: number;
  delay?: number;
  prefix?: string;
  suffix?: string;
  className?: string;
  decimals?: number;
}

export const CountUp = ({
  to,
  from = 0,
  duration = 1.8,
  delay = 0,
  prefix = "",
  suffix = "",
  className,
  decimals = 0,
}: CountUpProps) => {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px 0px" });
  const motionValue = useSpring(from, {
    stiffness: 60,
    damping: 30,
    duration,
  });

  useRef(() => {
    if (inView) {
      setTimeout(() => motionValue.set(to), delay * 1000);
    }
  });

  // We use a manual approach for the display
  const displayRef = useRef<HTMLSpanElement>(null);

  motionValue.on("change", (v) => {
    if (displayRef.current) {
      displayRef.current.textContent =
        prefix + v.toFixed(decimals) + suffix;
    }
  });

  if (inView) {
    motionValue.set(to);
  }

  return (
    <span ref={ref} className={className}>
      <span ref={displayRef}>{prefix}{from.toFixed(decimals)}{suffix}</span>
    </span>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// 10. HoverLift  — subtle lift + shadow on hover
//     Use on: product cards, buttons, clickable tiles
// ─────────────────────────────────────────────────────────────────────────────
interface HoverLiftProps {
  children: ReactNode;
  y?: number;
  scale?: number;
  className?: string;
  style?: CSSProperties;
}

export const HoverLift = ({
  children,
  y = -6,
  scale = 1.02,
  className,
  style,
}: HoverLiftProps) => (
  <motion.div
    className={className}
    style={style}
    whileHover={{ y, scale }}
    whileTap={{ scale: 0.98 }}
    transition={{ duration: 0.3, ease: ease.out }}
  >
    {children}
  </motion.div>
);

// ─────────────────────────────────────────────────────────────────────────────
// 11. ClipReveal  — clip-path wipe reveal (cinematic)
//     Use on: section images, full-bleed photos, banners
//     direction: "up" wipes from bottom, "left" wipes from right, etc.
// ─────────────────────────────────────────────────────────────────────────────
const clipPaths: Record<Direction, { hidden: string; visible: string }> = {
  up:    { hidden: "inset(100% 0% 0% 0%)", visible: "inset(0% 0% 0% 0%)" },
  down:  { hidden: "inset(0% 0% 100% 0%)", visible: "inset(0% 0% 0% 0%)" },
  left:  { hidden: "inset(0% 100% 0% 0%)", visible: "inset(0% 0% 0% 0%)" },
  right: { hidden: "inset(0% 0% 0% 100%)", visible: "inset(0% 0% 0% 0%)" },
};

interface ClipRevealProps {
  children: ReactNode;
  from?: Direction;
  delay?: number;
  duration?: number;
  className?: string;
  once?: boolean;
}

export const ClipReveal = ({
  children,
  from = "up",
  delay = 0,
  duration = 0.9,
  className,
  once = true,
}: ClipRevealProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once, margin: "-60px 0px" });
  const clip = clipPaths[from];

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ clipPath: clip.hidden, opacity: 0 }}
      animate={
        inView
          ? { clipPath: clip.visible, opacity: 1 }
          : { clipPath: clip.hidden, opacity: 0 }
      }
      transition={{ duration, delay, ease: ease.out }}
    >
      {children}
    </motion.div>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// 12. ScrollProgress  — thin top bar that fills as you scroll the page
//     Use on: layout root or any long-form page
//     Usage: <ScrollProgress /> at the top of your page/layout
// ─────────────────────────────────────────────────────────────────────────────
export const ScrollProgress = ({ color = "#000" }: { color?: string }) => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  return (
    <motion.div
      style={{
        scaleX,
        transformOrigin: "left",
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        height: "2px",
        background: color,
        zIndex: 9999,
      }}
    />
  );
};