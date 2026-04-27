// components/products/ProductDetails.tsx
"use client";

// import Link from "next/link";
import { ShoppingBag, Heart, Truck } from "lucide-react";
import { Product } from "@/lib/constants";
import { products } from "@/lib/constants";
import ProductsSlider from "./ProductsSlider";
import { useRouter } from "next/navigation";

type ProductDetailsProps = {
  product: Product;
};

const ProductDetails = ({ product }: ProductDetailsProps) => {
  const router = useRouter();

  // Related products
  const relatedProducts = products
    .filter((p) => p.category === product.category && p.slug !== product.slug)
    .slice(0, 8);

  return (
    <section className="w-full min-h-screen ">
      {/* Breadcrumb */}
      {/* <div className="mb-6">
        <Link
          href="/collections"
          className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-black transition mt-2"
        >
          <ArrowLeft size={16} />
          Back to Collection
        </Link>
      </div> */}

      {/* Main Product Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 ">
        {/* Product Image */}
        <div className="w-full bg-gray-100  overflow-hidden">
          <img
            src={product.image}
            alt={product.title}
            className="w-full h-150 sm:h-137.5 object-cover"
          />
        </div>

        {/* Product Info */}
        <div className="flex flex-col justify-center px-4 sm:px-6 lg:px-12">
          {/* <p className="uppercase tracking-[0.2em] text-sm text-gray-500 mb-3">
            {product.category}
          </p> */}

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-semibold leading-tight">
            {product.title}
          </h1>

          <p className="text-2xl sm:text-3xl font-medium mt-4">
            ${product.price}
          </p>

          <p className="text-gray-600 mt-6 leading-relaxed text-sm sm:text-base max-w-xl">
            Crafted with premium quality materials for timeless style and
            everyday comfort. Designed to fit seamlessly into your wardrobe,
            whether casual or elevated.
          </p>

          {/* Size Selector */}
          <div className="mt-8">
            <h3 className="text-sm font-medium mb-3">Select Size</h3>
            <div className="flex gap-3">
              {["S", "M", "L", "XL"].map((size) => (
                <button
                  key={size}
                  className="w-12 h-12 rounded-full border border-gray-300 hover:border-black transition text-sm font-medium"
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="mt-10 flex flex-col gap-3 sm:gap-4">
            {/* Buy Now - Primary CTA */}
            <button
              onClick={() => router.push(`/buy-now/${product.slug}`)}
              className="w-full bg-foreground text-white py-4 rounded-full font-semibold hover:opacity-90 transition flex items-center justify-center gap-2"
            >
              <Truck className="font-semibold" size={20} />
              Buy Now
            </button>

            {/* Secondary Actions */}
            <div className="flex gap-3">
              {/* Add to Cart */}
              <button className="flex-1 bg-primary/40 border border-gray-300 text-secondary-background py-3 rounded-full font-medium hover:border-black transition flex items-center justify-center gap-2">
                <ShoppingBag size={18} />
                Add to Cart
              </button>

              {/* Wishlist */}
              <button className="w-12 sm:w-14 h-12 sm:h-14 flex items-center justify-center rounded-full bg-primary/60 text-secondary-background transition">
                <Heart size={20} />
              </button>
            </div>
          </div>

          {/* Extra Info */}
          <div className="border-t border-gray-200 mt-10 pt-6 space-y-3 text-sm text-gray-600">
            <p>✔ Free shipping on orders over $50</p>
            <p>✔ 7-day easy returns</p>
            <p>✔ Premium quality guarantee</p>
          </div>
        </div>
      </div>
      <div className="mt-20 text-center">Here will be more description</div>
      {/* Here we will also show more cards */}
      <ProductsSlider products={relatedProducts} />
    </section>
  );
};

export default ProductDetails;
