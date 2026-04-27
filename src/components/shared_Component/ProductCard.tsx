import React from "react";
import { Plus } from "lucide-react";
import Link from "next/link";

export type Product = {
  id: number;
  title: string;
  price: number;
  image: string;
  slug:string
};

type ProductCardProps = {
  product: Product;
  onAddToCart?: (product: Product) => void;
};

const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onAddToCart,
}) => {
  return (
    <Link href={`/collections/category/${product.slug}`}>
    <div className="
  group
  max-w-[55vw] sm:max-w-[240px] md:max-w-[260px]
  transition-transform duration-300
  scale-100
  snap-center
">
      
      {/* Image Container */}
      <div className="relative w-full h-[290px] sm:h-[300px] md:h-[340px] overflow-hidden bg-gray-100">
        
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-full object-cover transition duration-500 group-hover:scale-105"
        />

        {/* + Icon overlay */}
        <button
          onClick={() => onAddToCart?.(product)}
          className="
            absolute bottom-3 right-3
            w-10 h-10 flex items-center justify-center
            rounded-full bg-white/90 backdrop-blur
            shadow-md
            opacity-100 sm:opacity-0 sm:group-hover:opacity-100
            transition duration-300
          "
        >
          <Plus size={18} className="text-black" />
        </button>
      </div>

      {/* Content */}
      <div className="pt-3 px-1 mt-2 text-center">
        <h3 className="text-base sm:text-[20px] font-medium text-foreground line-clamp-1">
          {product.title}
        </h3>

        <p className="text-sm text-muted mt-1">
          ${product.price}
        </p>
      </div>
    </div>
    </Link>
  );
};

export default ProductCard;