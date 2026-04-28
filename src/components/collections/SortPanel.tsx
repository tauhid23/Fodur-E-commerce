"use client";

import { motion, AnimatePresence, Variants, Transition } from "framer-motion";
import { X, Check } from "lucide-react";

type SortOption = "default" | "lowToHigh" | "highToLow" | "aToZ";

const sortOptions: { value: SortOption; label: string; description: string }[] = [
  { value: "default",   label: "Featured",           description: "Our top picks for you"     },
  { value: "lowToHigh", label: "Price: Low to High",  description: "Start from the lowest"     },
  { value: "highToLow", label: "Price: High to Low",  description: "Start from the highest"    },
  { value: "aToZ",      label: "Name: A–Z",           description: "Alphabetical order"        },
];

type Props = {
  open: boolean;
  onClose: () => void;
  sortBy: SortOption;
  onSortChange: (val: SortOption) => void;
};

// ✅ Fix: extract transition with explicit Transition type so `ease` is narrowed correctly
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
  visible: { transition: { staggerChildren: 0.06, delayChildren: 0.1 } },
};

const itemVariants: Variants = {
  hidden:  { opacity: 0, x: 20 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.32, ease: "easeOut" } },
};

export default function SortPanel({ open, onClose, sortBy, onSortChange }: Props) {
  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            key="sort-backdrop"
            variants={backdropVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={onClose}
            className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm"
          />

          {/* Panel */}
          <motion.aside
            key="sort-panel"
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
                  Sort By
                </h2>
                <p className="text-[11px] text-accent/40 mt-0.5">
                  {sortOptions.find((o) => o.value === sortBy)?.label ?? "Featured"}
                </p>
              </div>
              <motion.button
                type="button"
                whileTap={{ scale: 0.88 }}
                onClick={onClose}
                className="flex h-9 w-9 items-center justify-center rounded-full
                  text-accent hover:bg-white/10 transition"
                aria-label="Close sort"
              >
                <X size={18} />
              </motion.button>
            </div>

            {/* Options */}
            <motion.div
              variants={listVariants}
              initial="hidden"
              animate="visible"
              className="flex-1 overflow-y-auto px-4 py-5 space-y-1"
            >
              <p className="text-[10px] font-semibold uppercase tracking-widest text-accent/30 px-2 mb-3">
                Select order
              </p>

              {sortOptions.map(({ value, label, description }) => {
                const isActive = sortBy === value;
                return (
                  <motion.button
                    key={value}
                    type="button"
                    variants={itemVariants}
                    onClick={() => { onSortChange(value); onClose(); }}
                    className={`w-full flex items-center justify-between px-4 py-4 rounded-xl
                      text-left transition-all duration-150 group
                      ${isActive
                        ? "bg-white/[0.08] text-accent"
                        : "text-accent/60 hover:bg-white/5 hover:text-accent"
                      }`}
                  >
                    <div className="flex flex-col gap-0.5">
                      <span className="text-sm font-medium">{label}</span>
                      <span className={`text-[11px] transition-colors
                        ${isActive ? "text-accent/50" : "text-accent/30 group-hover:text-accent/40"}`}>
                        {description}
                      </span>
                    </div>

                    {/* Active indicator */}
                    <motion.span
                      initial={{ scale: 0, opacity: 0 }}
                      animate={isActive ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
                      transition={{ duration: 0.18 }}
                      className="flex h-6 w-6 items-center justify-center rounded-full bg-primary shrink-0"
                    >
                      <Check size={13} className="text-white" />
                    </motion.span>
                  </motion.button>
                );
              })}
            </motion.div>

            {/* Footer */}
            <div className="px-6 py-5 border-t border-white/10">
              <button
                type="button"
                onClick={() => { onSortChange("default"); onClose(); }}
                className="w-full py-3 rounded-full border border-white/15 text-sm font-medium
                  text-accent hover:bg-white/5 transition"
              >
                Reset to default
              </button>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}