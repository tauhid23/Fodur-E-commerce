// src/components/shared/CouponSection.tsx
"use client";

import { Tag, X } from "lucide-react";

type CouponSectionProps = {
  showCoupon: boolean;
  setShowCoupon: (value: boolean) => void;

  coupon: string;
  setCoupon: (value: string) => void;

  couponApplied: boolean;
  setCouponApplied: (value: boolean) => void;
};

export default function CouponSection({
  showCoupon,
  setShowCoupon,
  coupon,
  setCoupon,
  couponApplied,
  setCouponApplied,
}: CouponSectionProps) {
  return (
    <div className="p-5 border-b border-gray-100">
      {!showCoupon ? (
        <button
          type="button"
          onClick={() => setShowCoupon(true)}
          className="w-full flex items-center justify-center gap-2 py-3 rounded-2xl
            border border-dashed border-gray-300 text-sm font-medium text-gray-600
            hover:border-black hover:text-black hover:bg-gray-50 transition-all"
        >
          <Tag size={14} />
          Add coupon code
        </button>
      ) : (
        <div className="space-y-3">
          {/* TOP BAR */}
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-gray-700">
              Enter coupon code
            </p>

            {!couponApplied && (
              <button
                type="button"
                onClick={() => {
                  setShowCoupon(false);
                  setCoupon("");
                }}
                className="text-xs text-gray-400 hover:text-black transition"
              >
                Cancel
              </button>
            )}
          </div>

          {/* INPUT */}
          <div className="flex gap-2">
            <input
              value={coupon}
              onChange={(e) =>
                setCoupon(e.target.value.toUpperCase())
              }
              placeholder="COUPON10"
              className="flex-1 px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl
                text-sm uppercase placeholder:text-gray-400
                focus:outline-none focus:border-black transition"
            />

            {couponApplied ? (
              <button
                type="button"
                onClick={() => {
                  setCouponApplied(false);
                  setCoupon("");
                  setShowCoupon(false);
                }}
                className="w-12 flex items-center justify-center rounded-xl
                  border border-red-100 text-red-500 hover:bg-red-50 transition"
              >
                <X size={16} />
              </button>
            ) : (
              <button
                type="button"
                onClick={() =>
                  coupon.length > 2 && setCouponApplied(true)
                }
                disabled={coupon.length < 3}
                className="px-5 py-3 bg-black text-white rounded-xl text-sm font-medium
                  hover:bg-gray-900 active:scale-[0.98] transition
                  disabled:opacity-40 disabled:cursor-not-allowed"
              >
                Apply
              </button>
            )}
          </div>

          {/* SUCCESS */}
          {couponApplied && (
            <div className="flex items-center justify-between rounded-xl bg-green-50 border border-green-100 px-3 py-2">
              <p className="text-xs text-green-700 font-medium flex items-center gap-1.5">
                ✓ Coupon applied successfully
              </p>

              <button
                type="button"
                onClick={() => {
                  setCouponApplied(false);
                  setCoupon("");
                  setShowCoupon(false);
                }}
                className="text-xs text-green-700 hover:text-green-900 transition"
              >
                Remove
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}