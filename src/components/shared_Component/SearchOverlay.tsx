"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, X, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { products } from "@/lib/constants";

// ─── Types ───
type Tab = "collections" | "pages";

const PAGES = [
  { label: "Home",        href: "/" },
  { label: "Collections", href: "/collections" },
//   { label: "About",       href: "/about" },
  { label: "Contact",     href: "/contact" },
];

const COLLECTIONS = [
  { label: "Women",       href: "/collections/women" },
  { label: "Men",         href: "/collections/men" },
  { label: "Kids",        href: "/collections/kids" },
];

// ─── Component ───
export default function SearchOverlay({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [query, setQuery]   = useState("");
  const [tab, setTab]       = useState<Tab>("collections");
  const inputRef            = useRef<HTMLInputElement>(null);

  // Focus input when overlay opens
  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 120);
    } else {
      setQuery("");
      setTab("collections");
    }
  }, [open]);

  // Close on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  // ── Derived search results ──
  const q = query.trim().toLowerCase();

  const matchedProducts = q.length > 1
    ? products
        .filter((p) => p.title.toLowerCase().includes(q))
        .slice(0, 6)
    : [];

  const suggestions = q.length > 0
    ? products
        .filter((p) => p.title.toLowerCase().startsWith(q))
        .slice(0, 3)
        .map((p) => p.title)
    : [];

  const filteredCollections = q.length > 0
    ? COLLECTIONS.filter((c) => c.label.toLowerCase().includes(q))
    : COLLECTIONS;

  const filteredPages = q.length > 0
    ? PAGES.filter((p) => p.label.toLowerCase().includes(q))
    : PAGES;

  // ── Highlight matched query in text ────────────────────────────────
  const highlight = (text: string) => {
    if (!q) return <>{text}</>;
    const idx = text.toLowerCase().indexOf(q);
    if (idx === -1) return <>{text}</>;
    return (
      <>
        {text.slice(0, idx)}
        <strong className="font-semibold text-foreground">
          {text.slice(idx, idx + q.length)}
        </strong>
        {text.slice(idx + q.length)}
      </>
    );
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            key="search-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
            onClick={onClose}
            className="fixed inset-0 z-40 bg-black/20 backdrop-blur-[2px]"
          />

          {/* Panel — drops from below the navbar */}
          <motion.div
            key="search-panel"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
            className="fixed top-[75px] lg:top-[89px] inset-x-0 z-50
              bg-secondary-background border-b border-border shadow-xl"
          >
            {/* ── Search Input Row ── */}
            <div className="mx-auto max-w-7xl px-4 md:px-6">
              <div className="flex items-center gap-4 py-4 border-b border-border">
                <Search size={18} className="text-accent/50 shrink-0" />
                <input
                  ref={inputRef}
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search products, collections…"
                  className="flex-1 bg-transparent text-base text-accent
                    placeholder:text-accent/30 outline-none tracking-wide"
                />
                {query && (
                  <button
                    onClick={() => setQuery("")}
                    className="text-accent/40 hover:text-accent transition-colors"
                    aria-label="Clear"
                  >
                    <X size={16} />
                  </button>
                )}
                <button
                  onClick={onClose}
                  className="text-accent/40 hover:text-accent transition-colors ml-1"
                  aria-label="Close search"
                >
                  <X size={20} />
                </button>
              </div>
            </div>

            {/* ── Body ── */}
            <div className="mx-auto max-w-7xl px-4 md:px-6 py-6
              max-h-[70vh] overflow-y-auto">

              {/* ── Product Results (when query matches products) ── */}
              {matchedProducts.length > 0 ? (
                <div className="space-y-6">
                  <p className="text-[10px] tracking-[0.25em] uppercase
                    text-accent/40 font-semibold">
                    Products
                  </p>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
                    {matchedProducts.map((product) => (
                      <Link
                        key={product.slug}
                        href={`/collections/category/${product.slug}`}
                        onClick={onClose}
                        className="group space-y-2"
                      >
                        <div className="aspect-[3/4] rounded-xl overflow-hidden bg-gray-100">
                          <img
                            src={product.image}
                            alt={product.title}
                            className="w-full h-full object-cover
                              group-hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                        <div>
                          <p className="text-xs font-medium text-accent
                            truncate group-hover:underline underline-offset-2">
                            {highlight(product.title)}
                          </p>
                          <p className="text-xs text-accent/50 mt-0.5">
                            ${product.price}
                          </p>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              ) : (
                /* ── Default / Fallback view ── */
                <div className="space-y-8">

                  {/* Suggestions */}
                  {suggestions.length > 0 && (
                    <div className="space-y-3">
                      <p className="text-[10px] tracking-[0.25em] uppercase
                        text-accent/40 font-semibold">
                        Suggestions
                      </p>
                      <div className="space-y-1">
                        {suggestions.map((s) => (
                          <button
                            key={s}
                            onClick={() => setQuery(s)}
                            className="flex items-center gap-3 w-full text-left
                              text-sm text-accent/70 hover:text-accent
                              py-1.5 transition-colors group"
                          >
                            <Search size={13} className="text-accent/30
                              group-hover:text-accent/60 transition-colors" />
                            {highlight(s)}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Tabs: Collections / Pages */}
                  <div className="space-y-4">
                    {/* Tab bar */}
                    <div className="flex items-center gap-6 border-b border-border">
                      {(["collections", "pages"] as Tab[]).map((t) => (
                        <button
                          key={t}
                          onClick={() => setTab(t)}
                          className={`pb-2.5 text-[11px] tracking-[0.2em] uppercase
                            font-semibold transition-colors relative
                            ${tab === t
                              ? "text-accent border-b-2 border-accent -mb-px"
                              : "text-accent/40 hover:text-accent/70"
                            }`}
                        >
                          {t}
                        </button>
                      ))}
                    </div>

                    {/* Tab content */}
                    <div className="grid grid-cols-2 gap-x-8 gap-y-1">
                      {(tab === "collections" ? filteredCollections : filteredPages).map(
                        ({ label, href }) => (
                          <Link
                            key={label}
                            href={href}
                            onClick={onClose}
                            className="flex items-center justify-between py-2.5
                              text-sm text-accent/60 hover:text-accent
                              border-b border-border/50 transition-colors group"
                          >
                            <span>{highlight(label)}</span>
                            <ArrowUpRight
                              size={13}
                              className="opacity-0 group-hover:opacity-100
                                transition-opacity text-accent/40"
                            />
                          </Link>
                        )
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* No results */}
              {q.length > 1 &&
                matchedProducts.length === 0 &&
                suggestions.length === 0 && (
                  <div className="py-10 text-center">
                    <p className="text-sm text-accent/40">
                      No results for{" "}
                      <span className="text-accent font-medium">"{query}"</span>
                    </p>
                    <p className="text-xs text-accent/30 mt-1">
                      Try searching for something else
                    </p>
                  </div>
                )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}