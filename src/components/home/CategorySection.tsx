"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import ProductCard from "../shared_Component/ProductCard";
import { products, Product as ProductType } from "@/lib/constants";

type Category = "all" | "men" | "women" | "kids";

const categories: Category[] = ["all", "men", "women", "kids"];

const CategorySection = () => {
  const [activeCategory, setActiveCategory] = useState<Category>("all");
  const router = useRouter();

  // FILTER REAL DATA (NO dummy)
  const filteredProducts = useMemo(() => {
    if (activeCategory === "all") return products;

    return products.filter(
      (product) => product.category === activeCategory
    );
  }, [activeCategory]);

  // Navigate to collections page
  const handleViewAll = () => {
    const query =
      activeCategory === "all"
        ? ""
        : `?category=${activeCategory}`;

    router.push(`/collections${query}`);
  };

  return (
    <section className="w-full py-6">

      {/* Categories */}
      <div className="flex gap-3 justify-center overflow-x-auto px-4 mb-6">
        {categories.map((cat) => {
          const isActive = activeCategory === cat;

          return (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-1.5 text-sm sm:text-base capitalize rounded-full transition
                ${
                  isActive
                    ? "text-black underline underline-offset-4"
                    : "text-gray-500 hover:text-black"
                }`}
            >
              {cat}
            </button>
          );
        })}
      </div>

      {/* Mobile Slider */}
      <div className="md:hidden">
        <div className="flex gap-4 overflow-x-auto snap-x snap-mandatory px-4 pb-4 scrollbar-hide">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="snap-center shrink-0"
            >
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>

      {/* Desktop Grid */}
      <div className="hidden md:grid grid-cols-2 lg:grid-cols-4 gap-6 px-10 mt-10">
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {/* View All */}
      <div className="flex justify-center mt-6">
        <button
          onClick={handleViewAll}
          className="px-6 py-2 bg-black text-white rounded-full text-sm hover:opacity-90 transition"
        >
          View All
        </button>
      </div>
    </section>
  );
};

export default CategorySection;