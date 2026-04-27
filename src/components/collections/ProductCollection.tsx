"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { SlidersHorizontal, ChevronDown } from "lucide-react";
import ProductCard, {
  Product as ProductCardType,
} from "../shared_Component/ProductCard";
import FilterPanel from "./FilterPanel";
import SortPanel from "./SortPanel";

// Categories
type Category = "all" | "men" | "women" | "kids";
type SortOption = "default" | "lowToHigh" | "highToLow" | "aToZ";

const categories: Category[] = ["all", "men", "women", "kids"];

// Extended product type
type ProductWithCategory = ProductCardType & {
  category: "men" | "women" | "kids";
};

// Props from server page
type ProductCollectionProps = {
  initialCategory?: Category;
  initialProducts: ProductWithCategory[];
};

const ProductCollection = ({
  initialCategory = "all",
  initialProducts,
}: ProductCollectionProps) => {
  const router = useRouter();

  const [filterOpen, setFilterOpen] = useState(false);
  const [sortOpen, setSortOpen] = useState(false);

  const [sortBy, setSortBy] = useState<SortOption>("default");

  // Server-driven category
  const activeCategory = initialCategory;

  // Change category
  const handleCategoryChange = (category: Category) => {
    if (category === "all") {
      router.push("/collections");
    } else {
      router.push(`/collections/${category}`);
    }
  };

  // Filter + Sort
  const filteredProducts = useMemo(() => {
    let filtered = [...initialProducts];

    switch (sortBy) {
      case "lowToHigh":
        return filtered.sort(
          (a, b) => Number(a.price) - Number(b.price)
        );

      case "highToLow":
        return filtered.sort(
          (a, b) => Number(b.price) - Number(a.price)
        );

      case "aToZ":
        return filtered.sort((a, b) =>
          a.title.localeCompare(b.title)
        );

      default:
        return filtered;
    }
  }, [initialProducts, sortBy]);

  return (
    <section className="w-full py-8 px-4 sm:px-6 lg:px-8">
      {/* Heading */}
      <div className="text-center mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold">Our Collection</h1>
        <p className="text-gray-500 mt-2 text-sm sm:text-base">
          Explore products by category
        </p>
      </div>

      {/* Filter + Category Bar */}
      <div className="mb-10">

        {/* Categories */}
        <div className="flex items-center gap-6 overflow-x-auto scrollbar-hide pb-0">
          {categories.map((category) => {
            const isActive = activeCategory === category;
            return (
              <button
                key={category}
                type="button"
                onClick={() => handleCategoryChange(category)}
                className={`relative whitespace-nowrap text-sm font-medium capitalize pb-3.5
                  transition-colors duration-200
                  ${isActive ? "text-black" : "text-gray-400 hover:text-gray-700"}`}
              >
                {category}
                <span
                  className={`absolute bottom-0 left-0 h-[2px] rounded-full transition-all duration-300
                    ${isActive ? "w-full bg-black" : "w-0 bg-transparent"}`}
                />
              </button>
            );
          })}
        </div>

        {/* Full-width divider + two equal buttons below */}
        <div className="border border-gray-200 rounded-sm mt-0">
          <div className="grid grid-cols-2 divide-x divide-gray-200">

            {/* Filter */}
            <button
              type="button"
              onClick={() => setFilterOpen(true)}
              className="flex items-center justify-center gap-2 py-3.5 text-xs font-medium
                tracking-widest uppercase text-gray-500 hover:text-black hover:bg-gray-50
                transition-all duration-200"
            >
              <SlidersHorizontal size={13} />
              Filter
            </button>

            {/* Sort By */}
            <button
              type="button"
              onClick={() => setSortOpen(true)}
              className="flex items-center justify-center gap-2 py-3.5 text-xs font-medium
                tracking-widest uppercase text-gray-500 hover:text-black hover:bg-gray-50
                transition-all duration-200"
            >
              Sort By
              <ChevronDown size={13} />
            </button>

          </div>
        </div>
      </div>

      {/* Panels */}
      <FilterPanel open={filterOpen} onClose={() => setFilterOpen(false)} />
      <SortPanel
        open={sortOpen}
        onClose={() => setSortOpen(false)}
        sortBy={sortBy}
        onSortChange={setSortBy}
      />

      {/* Products */}
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={{
                id: product.id,
                title: product.title,
                price: product.price,
                image: product.image,
                slug: product.slug,
              }}
              onAddToCart={(p) => console.log("Add to cart:", p)}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-10">
          <p className="text-gray-500 text-lg">
            No products found in this category.
          </p>
        </div>
      )}
    </section>
  );
};

export default ProductCollection;