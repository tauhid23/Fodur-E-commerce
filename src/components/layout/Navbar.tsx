"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { Menu, Search, ShoppingBag, User, X } from "lucide-react";
import { LOGO } from "@/lib/nav-config";
import { useNavLinks } from "@/lib/hooks/useNavLinks";
import SearchOverlay from "../shared_Component/SearchOverlay";

// ─── Variants ─────────────────────────────────────────────────────────
const drawerVariants: Variants = {
  hidden: { x: "-100%", opacity: 0 },
  visible: { x: 0, opacity: 1, transition: { type: "spring", stiffness: 320, damping: 34 } },
  exit:   { x: "-100%", opacity: 0, transition: { duration: 0.22, ease: "easeInOut" } },
};

const backdropVariants: Variants = {
  hidden:  { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.2 } },
  exit:    { opacity: 0, transition: { duration: 0.2 } },
};

// ─── Navbar ───────────────────────────────────────────────────────────
export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [cartCount]                 = useState(2);
  const { links, loading }          = useNavLinks();
  const [searchOpen, setSearchOpen] = useState(false);

  // Lock body scroll when drawer is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  const close = () => setMobileOpen(false);

  return (
    <>
      <header className="sticky top-0 z-50 w-full bg-secondary-background shadow-sm">
        <nav className="mx-auto max-w-7xl px-4 md:px-6">

          {/* ── Mobile bar ── */}
          <div className="flex h-16 items-center justify-between lg:hidden">
            <motion.button
              type="button"
              whileTap={{ scale: 0.9 }}
              onClick={() => setMobileOpen(true)}
              className="flex h-10 w-10 items-center justify-center rounded-full text-accent hover:bg-white/10 transition"
              aria-label="Open menu"
            >
              <Menu size={22} />
            </motion.button>

            <Link href="/" className="text-[22px] font-heading italic font-bold tracking-[0.2em] text-accent">
              {LOGO}
            </Link>

            <div className="flex items-center">
              <motion.button
                type="button"
                whileTap={{ scale: 0.6 }}
                onClick={() => setSearchOpen(true)}
                className="flex h-8 w-8 items-center justify-center rounded-full text-accent hover:bg-white/10 transition"
                aria-label="Search"
              >
                <Search size={20} />
              </motion.button>

              <CartButton count={cartCount} />
            </div>
          </div>

          {/* ── Desktop bar ── */}
          <div className="hidden h-[72px] items-center justify-between lg:flex">
            <Link href="/" className="text-xl font-bold tracking-[0.2em] text-accent hover:opacity-80 transition">
              {LOGO}
            </Link>

            {/* Nav links */}
            <div className="flex items-center gap-1">
              {loading
                ? <NavSkeleton />
                : links.map((item) => (
                    <Link
                      key={item.label}
                      href={item.href}
                      className={`flex items-center gap-1.5 px-2 py-2 rounded-full text-sm font-medium
                        transition-all duration-150
                        ${item.highlight
                          ? "text-red-400 hover:text-red-300"
                          : "text-accent hover:text-accent/70 hover:bg-white/5"
                        }`}
                    >
                      {item.label}
                      {item.badge && <Badge label={item.badge} />}
                    </Link>
                  ))
              }
            </div>

            {/* Actions */}
            <div className="flex items-center gap-1">
              {([{ icon: Search, label: "Search" }, { icon: User, label: "Account" }] as const).map(
                ({ icon: Icon, label }) => (
                  <motion.button
                    key={label}
                    type="button"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.92 }}
                    className="flex h-10 w-10 items-center justify-center rounded-full text-accent hover:bg-white/10 transition"
                    aria-label={label}
                  >
                    <Icon size={20} />
                  </motion.button>
                )
              )}
              <CartButton count={cartCount} />
            </div>
          </div>
        </nav>
      </header>

      {/* ── Mobile backdrop ── */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            key="backdrop"
            variants={backdropVariants}
            initial="hidden" animate="visible" exit="exit"
            onClick={close}
            className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm lg:hidden"
          />
        )}
      </AnimatePresence>

      {/* ── Mobile drawer ── */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.aside
            key="drawer"
            variants={drawerVariants}
            initial="hidden" animate="visible" exit="exit"
            className="fixed inset-y-0 left-0 z-50 flex w-[82vw] max-w-sm flex-col
              bg-secondary-background lg:hidden overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-white/10">
              <Link href="/" onClick={close} className="text-lg font-bold tracking-[0.2em] text-accent">
                {LOGO}
              </Link>
              <motion.button
                type="button"
                whileTap={{ scale: 0.88 }}
                onClick={close}
                className="flex h-9 w-9 items-center justify-center rounded-full text-accent hover:bg-white/10 transition"
                aria-label="Close menu"
              >
                <X size={20} />
              </motion.button>
            </div>

            {/* Search */}
            <div className="px-5 py-3 border-b border-white/10">
              <div className="flex items-center gap-3 bg-white/5 rounded-full px-4 py-2.5">
                <Search size={15} className="text-white/50 shrink-0" />
                <input
                  placeholder="Search products…"
                  className="flex-1 bg-transparent text-sm text-accent placeholder:text-white/40 outline-none"
                />
              </div>
            </div>

            {/* Links */}
            <div className="flex-1 overflow-y-auto py-3 px-3">
              {loading
                ? <MobileNavSkeleton />
                : links.map((item, i) => (
                    <motion.div
                      key={item.label}
                      initial={{ opacity: 0, x: -16 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.04, duration: 0.2 }}
                    >
                      <Link
                        href={item.href}
                        onClick={close}
                        className={`flex items-center justify-between w-full px-4 py-3.5 rounded-xl
                          text-sm font-medium transition-all hover:bg-white/5
                          ${item.highlight ? "text-red-400" : "text-accent hover:text-accent/70"}`}
                      >
                        <span className="flex items-center gap-2">
                          {item.label}
                          {item.badge && <Badge label={item.badge} />}
                        </span>
                      </Link>
                    </motion.div>
                  ))
              }
            </div>

            {/* Footer */}
            <div className="px-5 py-5 border-t border-white/10 space-y-1">
              {([
                { icon: User,        label: "My Account", href: "/account" },
                { icon: ShoppingBag, label: "My Orders",  href: "/orders"  },
              ] as const).map(({ icon: Icon, label, href }) => (
                <Link
                  key={label}
                  href={href}
                  onClick={close}
                  className="flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-medium
                    text-accent hover:text-accent/70 hover:bg-white/5 transition"
                >
                  <Icon size={17} />
                  {label}
                </Link>
              ))}
            </div>
          </motion.aside>
        )}
      </AnimatePresence>
        <SearchOverlay open={searchOpen} onClose={() => setSearchOpen(false)} />
      
    </>
  );
}

// ─── Sub-components ───────────────────────────────────────────────────
function CartButton({ count }: { count: number }) {
  return (
    <motion.button
      type="button"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.90 }}
      className="relative flex h-8 w-8 items-center justify-center rounded-full text-accent hover:bg-white/10 transition"
      aria-label="Cart"
    >
      <ShoppingBag size={20} />
      {count > 0 && (
        <motion.span
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="absolute -right-1 -top-0.5 flex h-4 w-4 items-center justify-center
            rounded-full bg-primary text-[10px] font-bold text-white"
        >
          {count}
        </motion.span>
      )}
    </motion.button>
  );
}

function Badge({ label }: { label: string }) {
  return (
    <span className="px-1.5 py-0.5 text-[9px] font-bold rounded-full bg-primary text-white uppercase tracking-wide">
      {label}
    </span>
  );
}

// Skeleton shown while links are loading
function NavSkeleton() {
  return (
    <div className="flex items-center gap-3">
      {Array.from({ length: 5 }).map((_, i) => (
        <div key={i} className="h-4 w-12 rounded-full bg-white/10 animate-pulse" />
      ))}
    </div>
  );
}

function MobileNavSkeleton() {
  return (
    <div className="px-4 py-3 space-y-3">
      {Array.from({ length: 5 }).map((_, i) => (
        <div key={i} className="h-5 w-32 rounded-full bg-white/10 animate-pulse" />
      ))}
    </div>
  );
}