"use client";

import Link from "next/link";
// import { Facebook, Instagram, Pinterest } from "lucide-react";

/* ── Payment brand SVG icons (inline, no external deps) ── */
const TikTokIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.75a4.85 4.85 0 0 1-1.01-.06z" />
  </svg>
);

/* Payment method logos as simple colored badge components */
const paymentMethods = [
  { name: "American Express", bg: "#2557D6", text: "AMEX", textColor: "white", w: "w-10" },
  { name: "Apple Pay", bg: "#000", text: "Pay", textColor: "white", w: "w-12", prefix: "" },
  { name: "Bancontact", bg: "#005498", text: "BC", textColor: "white", w: "w-10" },
  { name: "Diners Club", bg: "#fff", text: "DC", textColor: "#231F20", w: "w-10", border: true },
  { name: "Discover", bg: "#FF6600", text: "discover", textColor: "white", w: "w-14" },
  { name: "Google Pay", bg: "#fff", text: "GPay", textColor: "#5F6368", w: "w-12", border: true },
  { name: "iDEAL", bg: "#CC0066", text: "iDEAL", textColor: "white", w: "w-12" },
  { name: "Klarna", bg: "#FFB3C7", text: "Klarna", textColor: "#000", w: "w-14" },
  { name: "Maestro", bg: "#EB001B", text: "M", textColor: "white", w: "w-10" },
  { name: "Mastercard", bg: "#fff", text: "MC", textColor: "#EB001B", w: "w-10", border: true },
  { name: "Shop Pay", bg: "#5A31F4", text: "Shop", textColor: "white", w: "w-12" },
  { name: "Union Pay", bg: "#E21836", text: "UP", textColor: "white", w: "w-10" },
  { name: "Visa", bg: "#1A1F71", text: "VISA", textColor: "white", w: "w-10" },
];

function PaymentBadge({ method }: { method: typeof paymentMethods[0] }) {
  return (
    <span
      className={`inline-flex items-center justify-center h-7 ${method.w} rounded text-[9px] font-bold tracking-tight px-1 flex-shrink-0 ${
        method.border ? "border border-gray-200" : ""
      }`}
      style={{ backgroundColor: method.bg, color: method.textColor }}
      title={method.name}
    >
      {method.name === "Apple Pay" ? (
        <span className="flex items-center gap-0.5 text-white text-[9px] font-semibold">
          <svg viewBox="0 0 814 1000" className="w-3 h-3 fill-white">
            <path d="M788.1 340.9c-5.8 4.5-108.2 62.2-108.2 190.5 0 148.4 130.3 200.9 134.2 202.2-.6 3.2-20.7 71.9-68.7 141.9-42.8 61.6-87.5 123.1-155.5 123.1s-85.5-39.5-164-39.5c-76 0-103.7 40.8-165.9 40.8s-105-57.8-155.5-127.4C46 790.7 0 663 0 541.8c0-207.5 135.4-317.3 269-317.3 70.1 0 128.4 46.4 172.5 46.4 42.8 0 109.6-49 192.7-49 31.1 0 108.2 2.6 159.4 95.1zm-234-181.5c31.1-36.9 53.1-88.1 53.1-139.3 0-7.1-.6-14.3-1.9-20.1-50.6 1.9-110.8 33.7-147.1 75.8-28.5 32.4-55.1 83.6-55.1 135.5 0 7.8 1.3 15.6 1.9 18.1 3.2.6 8.4 1.3 13.6 1.3 45.4 0 102.5-30.4 135.5-71.3z" />
          </svg>
          Pay
        </span>
      ) : (
        method.text
      )}
    </span>
  );
}

export default function Footer() {
  return (
    <footer className="w-full bg-white border-t border-gray-100 pt-10 pb-6 px-4 sm:px-8 lg:px-12">
      {/* ── Top grid: 4 columns ── */}
      <div className="max-w-7xl mx-auto grid grid-cols-2 gap-y-10 gap-x-4 sm:grid-cols-2 lg:grid-cols-4 mb-10">
        {/* Column 1: Company */}
        <div>
          <p className="text-[10px] sm:text-xs font-semibold tracking-widest text-gray-900 uppercase mb-4">
            Company
          </p>
          <ul className="space-y-2.5">
            {[
              { label: "Join PODUR Rewards", href: "#" },
              { label: "Verified Reviews", href: "#" },
              { label: "Our Story", href: "#" },
              { label: "Blog", href: "#" },
              { label: "Contact us", href: "#" },
            ].map((item) => (
              <li key={item.label}>
                <Link
                  href={item.href}
                  className="text-xs sm:text-sm text-gray-600 hover:text-gray-900 transition-colors"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Column 2: Good to Know */}
        <div>
          <p className="text-[10px] sm:text-xs font-semibold tracking-widest text-gray-900 uppercase mb-4">
            Good to Know
          </p>
          <ul className="space-y-2.5">
            {[
              { label: "Returns & Exchanges", href: "#" },
              { label: "Shipping information", href: "#" },
              { label: "Your benefits", href: "#" },
              { label: "FAQ", href: "#" },
              { label: "Sitemap", href: "#" },
            ].map((item) => (
              <li key={item.label}>
                <Link
                  href={item.href}
                  className="text-xs sm:text-sm text-gray-600 hover:text-gray-900 transition-colors"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Column 3: Our Collections */}
        <div>
          <p className="text-[10px] sm:text-xs font-semibold tracking-widest text-gray-900 uppercase mb-4">
            Our Collections
          </p>
          <ul className="space-y-2.5">
            {[
              { label: "Eid Collections", href: "#" },
              { label: "Woman's Collections", href: "#" },
              { label: "Hijab Collections", href: "#" },
              { label: "Kids Collections", href: "#" },
              { label: "Baby Collections", href: "#" },
            ].map((item) => (
              <li key={item.label}>
                <Link
                  href={item.href}
                  className="text-xs sm:text-sm text-gray-600 hover:text-gray-900 transition-colors"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Column 4: Social Media */}
        <div>
          <p className="text-[10px] sm:text-xs font-semibold tracking-widest text-gray-900 uppercase mb-4">
            Social Media
          </p>
          <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
            Connect with us on{" "}
            <Link href="#" className="underline text-gray-800 hover:text-gray-900">
              Facebook
            </Link>
            ,{" "}
            <Link href="#" className="underline text-gray-800 hover:text-gray-900">
              Instagram
            </Link>
            ,{" "}
            <Link href="#" className="underline text-gray-800 hover:text-gray-900">
              TikTok
            </Link>{" "}
            and{" "}
            <Link href="#" className="underline text-gray-800 hover:text-gray-900">
              Pinterest
            </Link>
          </p>
        </div>
      </div>

      {/* ── Social icons row ── */}
      {/* <div className="max-w-7xl mx-auto flex items-center gap-5 mb-8">
        <Link href="#" aria-label="Facebook" className="text-gray-700 hover:text-gray-900 transition-colors">
          <Facebook className="w-4 h-4" strokeWidth={1.5} />
        </Link>
        <Link href="#" aria-label="Instagram" className="text-gray-700 hover:text-gray-900 transition-colors">
          <Instagram className="w-4 h-4" strokeWidth={1.5} />
        </Link>
        <Link href="#" aria-label="Pinterest" className="text-gray-700 hover:text-gray-900 transition-colors">
          <Pinterest className="w-4 h-4" strokeWidth={1.5} />
        </Link>
        <Link href="#" aria-label="TikTok" className="text-gray-700 hover:text-gray-900 transition-colors">
          <TikTokIcon />
        </Link>
      </div> */}

      {/* ── Divider ── */}
      <div className="max-w-7xl mx-auto border-t border-gray-100 pt-5">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          {/* Copyright */}
          <p className="text-[10px] text-gray-400 tracking-wide uppercase order-2 lg:order-1">
            © 2026 – TREIZE POWERED BY Tauhid
          </p>

          {/* Payment icons */}
          <div className="flex flex-wrap gap-1.5 order-1 lg:order-2 lg:justify-end">
            {paymentMethods.map((method) => (
              <PaymentBadge key={method.name} method={method} />
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}