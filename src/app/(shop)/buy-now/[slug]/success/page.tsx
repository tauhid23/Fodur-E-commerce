// src/app/(shop)/buy-now/[slug]/success/page.tsx

import Link from "next/link";
import { CheckCircle2, ShoppingBag } from "lucide-react";

type Props = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function OrderSuccessPage({ params }: Props) {
  // Next.js dynamic params are async here
  const { slug } = await params;

  const productName = slug?.replace(/-/g, " ") || "your product";

  return (
    <div className="min-h-screen bg-[#f8f7f5] flex items-center justify-center px-4">
      <div className="w-full max-w-lg bg-white rounded-3xl border border-gray-200 shadow-sm p-8 text-center">
        
        {/* SUCCESS ICON */}
        <div className="w-20 h-20 rounded-full bg-green-50 flex items-center justify-center mx-auto mb-6">
          <CheckCircle2 className="w-10 h-10 text-green-600" />
        </div>

        {/* TITLE */}
        <h1 className="text-3xl font-semibold tracking-tight text-gray-900">
          Order Confirmed
        </h1>

        {/* DESCRIPTION */}
        <p className="text-gray-500 mt-3 leading-relaxed">
          Thank you for your purchase. Your order for{" "}
          <span className="font-medium text-gray-800 capitalize">
            {productName}
          </span>{" "}
          has been placed successfully.
        </p>

        {/* INFO BOX */}
        <div className="mt-6 rounded-2xl bg-gray-50 border border-gray-100 p-4 text-sm text-gray-600">
          <p>
            A confirmation message will be sent to your provided contact details.
          </p>
        </div>

        {/* BUTTONS */}
        <div className="mt-8 flex flex-col sm:flex-row gap-3">
          <Link
            href="/collections"
            className="flex-1 py-3 rounded-2xl border border-gray-200 text-sm font-medium hover:border-black transition"
          >
            Continue Shopping
          </Link>

          <Link
            href={`/collections/${slug}`}
            className="flex-1 py-3 rounded-2xl bg-black text-white text-sm font-medium hover:bg-gray-900 transition flex items-center justify-center gap-2"
          >
            <ShoppingBag size={16} />
            View Product
          </Link>
        </div>
      </div>
    </div>
  );
}