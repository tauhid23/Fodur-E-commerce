"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { SlidersHorizontal, ChevronDown } from "lucide-react";
import { motion, AnimatePresence, Variants } from "framer-motion";

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

// ─────────────────────────────────────────────
// Animation Variants (Luxury / Industry-level)
// ─────────────────────────────────────────────
const containerVariants: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
};

const productCardVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 24,
    scale: 0.96,
  },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.55,
      ease: [0.22, 1, 0.36, 1],
    },
  },
  exit: {
    opacity: 0,
    y: 18,
    scale: 0.97,
    transition: {
      duration: 0.3,
      ease: "easeInOut",
    },
  },
};

const fadeUp: Variants = {
  hidden: {
    opacity: 0,
    y: 18,
  },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.55,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const categoryVariants: Variants = {
  hidden: { opacity: 0, y: 10 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.06,
      duration: 0.4,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
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
    const filtered = [...initialProducts];

    switch (sortBy) {
      case "lowToHigh":
        return filtered.sort((a, b) => Number(a.price) - Number(b.price));

      case "highToLow":
        return filtered.sort((a, b) => Number(b.price) - Number(a.price));

      case "aToZ":
        return filtered.sort((a, b) => a.title.localeCompare(b.title));

      default:
        return filtered;
    }
  }, [initialProducts, sortBy]);

  return (
    <motion.section
      className="w-full py-8 px-4 sm:px-6 lg:px-8"
      initial="hidden"
      animate="show"
      variants={containerVariants}
    >
      {/* Heading */}
      <motion.div
        variants={fadeUp}
        className="text-center mb-8"
      >
        <h1 className="text-2xl sm:text-3xl font-bold">Our Collection</h1>
        <p className="text-gray-500 mt-2 text-sm sm:text-base">
          Explore products by category
        </p>
      </motion.div>

      {/* Filter + Category Bar */}
      <motion.div variants={fadeUp} className="mb-10">
        {/* Categories */}
        <div className="flex items-center gap-6 overflow-x-auto scrollbar-hide pb-0">
          {categories.map((category, index) => {
            const isActive = activeCategory === category;

            return (
              <motion.button
                custom={index}
                variants={categoryVariants}
                whileTap={{ scale: 0.96 }}
                whileHover={{ y: -1 }}
                key={category}
                type="button"
                onClick={() => handleCategoryChange(category)}
                className={`relative whitespace-nowrap text-sm font-medium capitalize pb-1
                  transition-colors duration-200
                  ${
                    isActive
                      ? "text-black"
                      : "text-gray-400 hover:text-gray-700"
                  }`}
              >
                {category}

                {/* Animated underline */}
                <motion.span
                  layoutId="activeCategoryUnderline"
                  className={`absolute bottom-0 left-0 h-[2px] rounded-full
                    ${isActive ? "w-full bg-black" : "w-0 bg-transparent"}`}
                  transition={{
                    type: "spring",
                    stiffness: 380,
                    damping: 30,
                  }}
                />
              </motion.button>
            );
          })}
        </div>

        {/* Full-width divider + two equal buttons below */}
        <motion.div
          whileHover={{
            boxShadow: "0 4px 18px rgba(0,0,0,0.04)",
          }}
          transition={{ duration: 0.25 }}
          className="border border-gray-200 rounded-sm mt-3"
        >
          <div className="grid grid-cols-2 divide-x divide-gray-200">
            {/* Filter */}
            <motion.button
              type="button"
              whileTap={{ scale: 0.98 }}
              onClick={() => setFilterOpen(true)}
              className="flex items-center justify-center gap-2 py-3.5 text-xs font-medium
                tracking-widest uppercase text-gray-500 hover:text-black hover:bg-gray-50
                transition-all duration-200"
            >
              <motion.div
                whileHover={{ rotate: 12 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <SlidersHorizontal size={13} />
              </motion.div>
              Filter
            </motion.button>

            {/* Sort By */}
            <motion.button
              type="button"
              whileTap={{ scale: 0.98 }}
              onClick={() => setSortOpen(true)}
              className="flex items-center justify-center gap-2 py-3.5 text-xs font-medium
                tracking-widest uppercase text-gray-500 hover:text-black hover:bg-gray-50
                transition-all duration-200"
            >
              Sort By
              <motion.div
                animate={{ rotate: sortOpen ? 180 : 0 }}
                transition={{ duration: 0.28, ease: "easeInOut" }}
              >
                <ChevronDown size={13} />
              </motion.div>
            </motion.button>
          </div>
        </motion.div>
      </motion.div>

      {/* Panels */}
      <FilterPanel open={filterOpen} onClose={() => setFilterOpen(false)} />

      <SortPanel
        open={sortOpen}
        onClose={() => setSortOpen(false)}
        sortBy={sortBy}
        onSortChange={setSortBy}
      />

      {/* Products */}
      <AnimatePresence mode="wait">
        {filteredProducts.length > 0 ? (
          <motion.div
            key={activeCategory + sortBy}
            variants={containerVariants}
            initial="hidden"
            animate="show"
            exit="hidden"
            className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-7 sm:gap-6"
          >
            {filteredProducts.map((product) => (
              <motion.div
                key={product.id}
                variants={productCardVariants}
                layout
              >
                <ProductCard
                  product={{
                    id: product.id,
                    title: product.title,
                    price: product.price,
                    image: product.image,
                    slug: product.slug,
                  }}
                  onAddToCart={(p) => console.log("Add to cart:", p)}
                />
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <motion.div
            key="empty"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="text-center py-10"
          >
            <p className="text-gray-500 text-lg">
              No products found in this category.
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.section>
  );
};

export default ProductCollection;