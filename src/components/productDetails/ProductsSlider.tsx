"use client";

import ProductCard from "../shared_Component/ProductCard";
import { Product } from "@/lib/constants";

type ProductsSliderProps = {
  products: Product[];
};

const ProductsSlider = ({ products }: ProductsSliderProps) => {
  return (
    <div className="w-full mt-10">

      {/* Title (optional but nice UX) */}
      <h2 className="text-xl sm:text-2xl font-semibold mb-4 px-4">
        Related Products
      </h2>

      {/* Mobile Slider */}
      <div className="md:hidden">
        <div className="flex gap-4 overflow-x-auto snap-x snap-mandatory px-4 pb-4 scrollbar-hide scroll-smooth">
          {products.map((product) => (
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
      <div className="hidden md:grid grid-cols-2 lg:grid-cols-4 gap-6 px-10">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default ProductsSlider;