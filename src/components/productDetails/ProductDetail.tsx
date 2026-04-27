// components/products/ProductDetails.tsx
"use client";

import { useState, useRef, useEffect } from "react";
import {
  ShoppingBag,
  Heart,
  Truck,
  Shield,
  RotateCcw,
} from "lucide-react";
import { Product, products } from "@/lib/constants";
import ProductsSlider from "./ProductsSlider";
import { useRouter } from "next/navigation";

type ProductDetailsProps = {
  product: Product;
};

const SIZES = ["XS", "S", "M", "L", "XL"] as const;
type Size = (typeof SIZES)[number];

const ProductDetails = ({ product }: ProductDetailsProps) => {
  const router = useRouter();

  const [activeIndex, setActiveIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState<Size | null>(null);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [quantity, setQuantity] = useState(1);

  const touchStartX = useRef<number | null>(null);

  const productImages = [
    product.image,
    product.image,
    product.image,
    product.image,
  ];

  const relatedProducts = products
    .filter((p) => p.category === product.category && p.slug !== product.slug)
    .slice(0, 8);

  /* ───────────── Smooth loop navigation ───────────── */
  const next = () =>
    setActiveIndex((i) =>
      i === productImages.length - 1 ? 0 : i + 1
    );

  const prev = () =>
    setActiveIndex((i) =>
      i === 0 ? productImages.length - 1 : i - 1
    );

  /* ───────────── Swipe (improved feel) ───────────── */
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;

    const diff = touchStartX.current - e.changedTouches[0].clientX;

    // threshold tuned for mobile feel
    if (Math.abs(diff) > 50) {
      diff > 0 ? next() : prev();
    }

    touchStartX.current = null;
  };

  /* ───────────── preload next image (important UX boost) ───────────── */
  useEffect(() => {
    const nextIndex = (activeIndex + 1) % productImages.length;
    const img = new Image();
    img.src = productImages[nextIndex];
  }, [activeIndex]);

  return (
    <section className="w-full min-h-screen bg-white">

      <div className="grid grid-cols-1 lg:grid-cols-2 min-h-screen">

        {/* ───────── LEFT IMAGE (UPGRADED UX) ───────── */}
        <div
          className="relative flex-1 bg-gray-50 overflow-hidden min-h-[420px] sm:min-h-[560px] lg:min-h-screen select-none"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >

          {/* Image track (smooth slide effect) */}
          <div
            className="flex h-full w-full transition-transform duration-500 ease-out"
            style={{
              transform: `translateX(-${activeIndex * 100}%)`,
            }}
          >
            {productImages.map((img, i) => (
              
              <img
                key={i}
                src={img}
                alt={product.title}
                className="w-full h-full object-cover flex-shrink-0"
                draggable={false}
              />
            ))}
          </div>

          {/* Category
          <div className="absolute top-4 left-4 z-10">
            <span className="bg-white/90 backdrop-blur-sm text-xs font-semibold uppercase tracking-widest px-3 py-1.5 rounded-full border border-gray-100 text-gray-700 shadow-sm">
              {product.category}
            </span>
          </div> */}

          {/* DOTS (UNCHANGED — YOUR REQUEST) */}
          <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-1.5">
            {productImages.map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveIndex(i)}
                className={`rounded-full transition-all duration-300 ${
                  activeIndex === i
                    ? "w-4 h-1.5 bg-black"
                    : "w-1.5 h-1.5 bg-black/30"
                }`}
              />
            ))}
          </div>
        </div>

        {/* ───────── RIGHT SIDE (UNCHANGED STRUCTURE) ───────── */}
        <div className="flex flex-col justify-center px-6 sm:px-10 lg:px-14 py-10 lg:py-16">

          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">
            {product.title}
          </h1>

          <div className="flex items-center gap-3 mt-3">
            <span className="text-2xl font-bold text-gray-900">
              ${product.price}
            </span>
            <span className="text-sm text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
              In Stock
            </span>
          </div>

          <div className="border-t border-gray-100 my-6" />

          <p className="text-gray-500 text-sm leading-relaxed max-w-md">
            Crafted with premium materials for modern comfort and timeless style.
          </p>

          {/* Size */}
          <div className="mt-8">
            <h3 className="text-sm font-semibold mb-3">Select Size</h3>

            <div className="flex gap-2 flex-wrap">
              {SIZES.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`w-12 h-12 rounded-xl border text-sm font-semibold transition ${
                    selectedSize === size
                      ? "bg-black text-white border-black"
                      : "bg-white border-gray-200 hover:border-gray-400"
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Quantity */}
          <div className="mt-6">
            <h3 className="text-sm font-semibold mb-3">Quantity</h3>

            <div className="flex items-center border rounded-xl w-fit overflow-hidden">
              <button
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                className="w-10 h-10"
              >
                −
              </button>
              <span className="w-10 text-center">{quantity}</span>
              <button
                onClick={() => setQuantity((q) => q + 1)}
                className="w-10 h-10"
              >
                +
              </button>
            </div>
          </div>

          {/* CTA */}
          <div className="mt-8 space-y-3">

            <button
              onClick={() => router.push(`/buy-now/${product.slug}`)}
              className="w-full bg-black text-white py-4 rounded-2xl font-semibold"
            >
              <Truck size={16} className="inline mr-2" />
              Buy Now
            </button>

            <div className="flex gap-3">

              <button className="flex-1 border border-black py-3 rounded-2xl font-semibold">
                <ShoppingBag size={16} className="inline mr-2" />
                Add to Cart
              </button>

              <button
                onClick={() => setIsWishlisted(!isWishlisted)}
                className={`w-14 h-14 rounded-2xl border flex items-center justify-center ${
                  isWishlisted
                    ? "bg-red-50 border-red-300 text-red-500"
                    : "border-gray-200"
                }`}
              >
                <Heart className={isWishlisted ? "fill-red-500" : ""} />
              </button>

            </div>
          </div>

          {/* Trust */}
          <div className="mt-8 grid grid-cols-3 gap-3 text-center text-xs">
            <div className="bg-gray-50 p-3 rounded-xl">
              <Truck size={14} className="mx-auto" />
              Free Shipping
            </div>
            <div className="bg-gray-50 p-3 rounded-xl">
              <RotateCcw size={14} className="mx-auto" />
              Returns
            </div>
            <div className="bg-gray-50 p-3 rounded-xl">
              <Shield size={14} className="mx-auto" />
              Quality
            </div>
          </div>

        </div>
      </div>

      {/* Related */}
      <div className="border-t mt-6 pt-10">
        <ProductsSlider products={relatedProducts} />
      </div>

    </section>
  );
};

export default ProductDetails;