"use client";

import { useState } from "react";
import { motion, AnimatePresence, Variants, Transition } from "framer-motion";
import { X, Check } from "lucide-react";

type Category    = "All" | "Men" | "Women" | "Kids";
type Availability = "In stock" | "Out of stock";

type FilterState = {
  category:     Category[];
  minPrice:     string;
  maxPrice:     string;
  availability: Availability[];
};

type Props = {
  open:     boolean;
  onClose:  () => void;
  onApply?: (filters: FilterState) => void;
};

//  Fix: explicit Transition type narrows `ease` from string → Easing
const exitTransition: Transition = { duration: 0.25, ease: "easeInOut" };

const panelVariants: Variants = {
  hidden:  { x: "100%", opacity: 0 },
  visible: { x: 0, opacity: 1, transition: { type: "spring", stiffness: 300, damping: 30 } },
  exit:    { x: "100%", opacity: 0, transition: exitTransition },
};

const backdropVariants: Variants = {
  hidden:  { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.2 } },
  exit:    { opacity: 0, transition: { duration: 0.2 } },
};

const listVariants: Variants = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.07, delayChildren: 0.08 } },
};

const itemVariants: Variants = {
  hidden:  { opacity: 0, x: 20 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.42, ease: "easeOut" } },
};

const CATEGORIES:    Category[]    = ["All", "Men", "Women", "Kids"];
const AVAILABILITIES: Availability[] = ["In stock", "Out of stock"];

const DEFAULT_FILTERS: FilterState = {
  category:     [],
  minPrice:     "",
  maxPrice:     "",
  availability: [],
};

export default function FilterPanel({ open, onClose, onApply }: Props) {
  const [filters, setFilters] = useState<FilterState>(DEFAULT_FILTERS);

  const toggleCategory = (cat: Category) => {
    setFilters((prev) => ({
      ...prev,
      category: prev.category.includes(cat)
        ? prev.category.filter((c) => c !== cat)
        : [...prev.category, cat],
    }));
  };

  const toggleAvailability = (opt: Availability) => {
    setFilters((prev) => ({
      ...prev,
      availability: prev.availability.includes(opt)
        ? prev.availability.filter((a) => a !== opt)
        : [...prev.availability, opt],
    }));
  };

  const handleClear = () => setFilters(DEFAULT_FILTERS);

  const handleApply = () => {
    onApply?.(filters);
    onClose();
  };

  const activeCount =
    filters.category.length +
    filters.availability.length +
    (filters.minPrice ? 1 : 0) +
    (filters.maxPrice ? 1 : 0);

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            key="filter-backdrop"
            variants={backdropVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={onClose}
            className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm"
          />

          {/* Panel */}
          <motion.aside
            key="filter-panel"
            variants={panelVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed top-0 right-0 z-50 flex h-full w-full flex-col bg-secondary-background shadow-2xl sm:w-1/2"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-white/10">
              <div>
                <h2 className="text-base font-semibold tracking-wide text-accent uppercase">
                  Filter
                </h2>
                <p className="text-[11px] text-accent/40 mt-0.5">
                  {activeCount > 0 ? `${activeCount} active filter${activeCount > 1 ? "s" : ""}` : "No filters applied"}
                </p>
              </div>
              <motion.button
                type="button"
                whileTap={{ scale: 0.88 }}
                onClick={onClose}
                className="flex h-9 w-9 items-center justify-center rounded-full
                  text-accent hover:bg-white/10 transition"
                aria-label="Close filter"
              >
                <X size={18} />
              </motion.button>
            </div>

            {/* Body */}
            <motion.div
              variants={listVariants}
              initial="hidden"
              animate="visible"
              className="flex-1 overflow-y-auto px-6 py-6 space-y-8"
            >

              {/* Category */}
              <motion.div variants={itemVariants}>
                <p className="text-[10px] font-semibold uppercase tracking-widest text-accent/30 mb-3">
                  Category
                </p>
                <div className="flex flex-wrap gap-2">
                  {CATEGORIES.map((cat) => {
                    const isActive = filters.category.includes(cat);
                    return (
                      <motion.button
                        key={cat}
                        type="button"
                        whileTap={{ scale: 0.94 }}
                        onClick={() => toggleCategory(cat)}
                        className={`flex items-center gap-1.5 px-4 py-1.5 rounded-full border text-sm
                          font-medium transition-all duration-150 capitalize
                          ${isActive
                            ? "border-primary bg-primary/10 text-accent"
                            : "border-white/15 text-accent/60 hover:border-white/30 hover:text-accent"
                          }`}
                      >
                        {isActive && <Check size={11} />}
                        {cat}
                      </motion.button>
                    );
                  })}
                </div>
              </motion.div>

              {/* Price range */}
              <motion.div variants={itemVariants}>
                <p className="text-[10px] font-semibold uppercase tracking-widest text-accent/30 mb-3">
                  Price range
                </p>
                <div className="flex items-center gap-3">
                  <div className="flex-1 relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs text-accent/30">$</span>
                    <input
                      type="number"
                      placeholder="Min"
                      value={filters.minPrice}
                      onChange={(e) => setFilters((prev) => ({ ...prev, minPrice: e.target.value }))}
                      className="w-full pl-7 pr-3 py-2.5 rounded-xl bg-white/5 border border-foreground/10
                        text-sm text-accent placeholder:text-accent/25 outline-none
                        focus:border-foreground/30 transition"
                    />
                  </div>
                  <span className="text-accent/20 shrink-0 text-lg">—</span>
                  <div className="flex-1 relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs text-accent/30">$</span>
                    <input
                      type="number"
                      placeholder="Max"
                      value={filters.maxPrice}
                      onChange={(e) => setFilters((prev) => ({ ...prev, maxPrice: e.target.value }))}
                      className="w-full pl-7 pr-3 py-2.5 rounded-xl bg-white/5 border border-foreground/10
                        text-sm text-accent placeholder:text-accent/25 outline-none
                        focus:border-foreground/30 transition"
                    />
                  </div>
                </div>
              </motion.div>

              {/* Availability */}
              <motion.div
  variants={itemVariants}
  className="relative"
>
  {/* Section Header */}
  <div className="flex items-center justify-between mb-4">
    <p
      className="text-[10px] font-semibold uppercase tracking-[0.28em]
      text-accent/35"
    >
      Availability
    </p>

    {filters.availability.length > 0 && (
      <motion.span
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="text-[10px] font-medium text-primary"
      >
        {filters.availability.length} Selected
      </motion.span>
    )}
  </div>

  {/* Options */}
  <div className="space-y-2.5">
    {AVAILABILITIES.map((opt, index) => {
      const isActive = filters.availability.includes(opt);

      return (
        <motion.label
          key={opt}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            delay: index * 0.04,
            duration: 0.28,
          }}
          whileHover={{
            y: -1,
            transition: { duration: 0.18 },
          }}
          whileTap={{ scale: 0.985 }}
          onClick={() => toggleAvailability(opt)}
          className={`group relative flex items-center justify-between
            px-4 py-3.5 rounded-2xl cursor-pointer overflow-hidden
            border backdrop-blur-sm
            transition-all duration-300
            ${
              isActive
                ? "border-primary/40 bg-primary/[0.08] shadow-[0_0_0_1px_rgba(255,255,255,0.03)]"
                : "border-primary/10 hover:border-primary/25 hover:bg-white/[0.03]"
            }`}
        >
          {/* Soft active glow */}
          {isActive && (
            <motion.div
              layoutId="availabilityGlow"
              className="absolute inset-0 bg-gradient-to-r
                from-primary/[0.10] via-transparent to-primary/[0.05]"
            />
          )}

          {/* Text */}
          <span
            className={`relative z-10 text-sm font-medium transition-all duration-200
              ${
                isActive
                  ? "text-accent"
                  : "text-accent/65 group-hover:text-accent/90"
              }`}
          >
            {opt}
          </span>

          {/* Custom Checkbox */}
          <motion.div
            animate={
              isActive
                ? {
                    scale: 1,
                    borderColor: "rgba(var(--primary),1)",
                  }
                : {
                    scale: 1,
                  }
            }
            transition={{
              type: "spring",
              stiffness: 320,
              damping: 22,
            }}
            className={`relative z-10 flex h-5 w-5 items-center justify-center
              rounded-full border-[1.5px] transition-all duration-300
              ${
                isActive
                  ? "border-primary bg-primary shadow-md"
                  : "border-white/20 group-hover:border-primary/40"
              }`}
          >
            <AnimatePresence mode="wait">
              {isActive && (
                <motion.div
                  key="check"
                  initial={{ scale: 0, rotate: -20, opacity: 0 }}
                  animate={{ scale: 1, rotate: 0, opacity: 1 }}
                  exit={{ scale: 0, opacity: 0 }}
                  transition={{
                    type: "spring",
                    stiffness: 500,
                    damping: 20,
                  }}
                >
                  <Check size={11} className="text-accent" />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </motion.label>
      );
    })}
  </div>
</motion.div>
            </motion.div>

            {/* Footer */}
            <div className="px-6 py-5 border-t border-white/10 flex items-center gap-3">
              <button
                type="button"
                onClick={handleClear}
                className="flex-1 py-3 rounded-full border border-white/15 text-sm font-medium
                  text-accent hover:bg-white/5 transition"
              >
                Clear all
                {activeCount > 0 && (
                  <span className="ml-1.5 text-accent/40">({activeCount})</span>
                )}
              </button>
              <motion.button
                type="button"
                whileTap={{ scale: 0.97 }}
                onClick={handleApply}
                className="flex-1 py-3 rounded-full bg-primary text-white text-sm font-medium
                  hover:opacity-90 transition"
              >
                Apply filters
              </motion.button>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}