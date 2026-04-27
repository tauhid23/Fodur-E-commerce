"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Product } from "@/lib/constants";
import {
  ChevronRight,
  Lock,
  ShieldCheck,
  Truck,
  Tag,
  X,
  MapPin,
  Banknote,
  CreditCard,
} from "lucide-react";
import CouponSection from "./Coupon";

type Props = {
  product: Product;
};

type Step = "information" | "shipping" | "payment";

const shippingRates = {
  dhaka: 2.99,
  outside: 6.99,
};

const steps: { id: Step; label: string }[] = [
  { id: "information", label: "Information" },
  { id: "shipping", label: "Shipping" },
  { id: "payment", label: "Payment" },
];

export default function BuyNoww({ product }: Props) {
  const router = useRouter();

  const [step, setStep] = useState<Step>("information");
  const [coupon, setCoupon] = useState("");
  const [couponApplied, setCouponApplied] = useState(false);
  const [showCoupon, setShowCoupon] = useState(false);

  // NEW
  const [deliveryZone, setDeliveryZone] =
    useState<keyof typeof shippingRates>("dhaka");

  const [paymentMethod, setPaymentMethod] = useState<"card" | "cod">("card");

  // FIX PRICE
  const price = Number(product.price);

  // Dynamic shipping
  const shipping = shippingRates[deliveryZone];

  const discount = couponApplied ? price * 0.1 : 0;
  const total = price + shipping - discount;

  const currentIndex = steps.findIndex((s) => s.id === step);

  // COD DIRECT SUCCESS
  const handleCompleteOrder = () => {
    router.push(`/buy-now/${product.slug}/success`);
  };

  return (
    <div className="min-h-screen bg-[#f8f7f5] font-sans">
      {/* Header */}
      <header className="bg-white border-b border-gray-100 px-4 py-4">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <span className="text-xl font-semibold tracking-tight">
            YourStore
          </span>
          <div className="flex items-center gap-1.5 text-xs text-gray-400">
            <Lock size={11} />
            <span>Secure checkout</span>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-8 lg:py-12">
        <div className="grid lg:grid-cols-[1fr_380px] gap-8 lg:gap-12 items-start">
          {/* LEFT */}
          <div>
            {/* Breadcrumb */}
            <nav className="flex items-center gap-2 mb-8 flex-wrap">
              {steps.map((s, i) => (
                <div key={s.id} className="flex items-center gap-2">
                  <button
                    onClick={() => i < currentIndex && setStep(s.id)}
                    className={`text-sm font-medium transition-colors ${
                      s.id === step
                        ? "text-black"
                        : i < currentIndex
                        ? "text-gray-500 hover:text-black"
                        : "text-gray-300"
                    }`}
                  >
                    {s.label}
                  </button>
                  {i < steps.length - 1 && (
                    <ChevronRight size={14} className="text-gray-300" />
                  )}
                </div>
              ))}
            </nav>

            {/* STEP 1 */}
            {/* STEP 1 */}
{step === "information" && (
  <div className="space-y-6">
    {/* CONTACT INFO */}
    <div>
      <h2 className="text-lg font-semibold mb-4">Contact Info</h2>

      <div className="space-y-3">
        {/* Full Name - Required */}
        <div>
          <label className="block text-sm font-medium mb-2">
            Full Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            required
            placeholder="Enter your full name"
            className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl
              placeholder:text-gray-400 focus:outline-none focus:border-black transition"
          />
        </div>

        {/* Phone Number - Required */}
        <div>
          <label className="block text-sm font-medium mb-2">
            Phone Number <span className="text-red-500">*</span>
          </label>
          <input
            type="tel"
            required
            placeholder="01XXXXXXXXX"
            className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl
              placeholder:text-gray-400 focus:outline-none focus:border-black transition"
          />
        </div>

        {/* Email - Optional */}
        <div>
          <label className="block text-sm font-medium mb-2">
            Email <span className="text-gray-400">(Optional)</span>
          </label>
          <input
            type="email"
            placeholder="you@example.com"
            className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl
              placeholder:text-gray-400 focus:outline-none focus:border-black transition"
          />
        </div>
      </div>
    </div>

    {/* DELIVERY ADDRESS */}
    <div>
      <h2 className="text-lg font-semibold mb-4">Delivery Address</h2>

      <div className="space-y-4">
        {/* Full Address - Required */}
        <div>
          <label className="block text-sm font-medium mb-2">
            Full Address <span className="text-red-500">*</span>
          </label>
          <textarea
            required
            rows={4}
            placeholder="House no, Road no, Area, Thana, District"
            className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl
              placeholder:text-gray-400 focus:outline-none focus:border-black transition resize-none"
          />
        </div>

        {/* DELIVERY ZONE */}
        <div>
          <h3 className="text-sm font-medium mb-3 flex items-center gap-2">
            <MapPin size={14} />
            Delivery Zone <span className="text-red-500">*</span>
          </h3>

          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => setDeliveryZone("dhaka")}
              className={`p- rounded-xl border text-sm font-medium transition ${
                deliveryZone === "dhaka"
                  ? "border-black bg-black text-white"
                  : "border-gray-200 bg-white hover:border-gray-400"
              }`}
            >
              <div className="flex flex-col">
                <span>Inside Dhaka</span>
                <span className="text-xs opacity-80 mt-1">
                  ${shippingRates.dhaka.toFixed(2)}
                </span>
              </div>
            </button>

            <button
              type="button"
              onClick={() => setDeliveryZone("outside")}
              className={`p-2 rounded-xl border text-sm font-medium transition ${
                deliveryZone === "outside"
                  ? "border-black bg-black text-white"
                  : "border-gray-200 bg-white hover:border-gray-400"
              }`}
            >
              <div className="flex flex-col">
                <span>Outside Dhaka</span>
                <span className="text-xs opacity-80 mt-1">
                  ${shippingRates.outside.toFixed(2)}
                </span>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>

    {/* CONTINUE BUTTON */}
    <button
      onClick={() => setStep("shipping")}
      className="w-full bg-black text-white py-4 rounded-full font-medium
        hover:bg-gray-900 active:scale-[0.99] transition-all"
    >
      Continue to shipping
    </button>
  </div>
)}

            {/* STEP 2 */}
            {step === "shipping" && (
              <div className="space-y-6">
                <h2 className="text-lg font-semibold">Payment method</h2>

                <div className="space-y-3">
                  {/* CARD */}
                  <label
                    className={`flex items-center justify-between p-4 rounded-xl border cursor-pointer ${
                      paymentMethod === "card"
                        ? "border-black"
                        : "border-gray-200"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <input
                        type="radio"
                        checked={paymentMethod === "card"}
                        onChange={() => setPaymentMethod("card")}
                      />
                      <div className="flex items-center gap-2">
                        <CreditCard size={18} />
                        <span>Pay Online</span>
                      </div>
                    </div>
                  </label>

                  {/* COD */}
                  <label
                    className={`flex items-center justify-between p-4 rounded-xl border cursor-pointer ${
                      paymentMethod === "cod"
                        ? "border-black"
                        : "border-gray-200"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <input
                        type="radio"
                        checked={paymentMethod === "cod"}
                        onChange={() => setPaymentMethod("cod")}
                      />
                      <div className="flex items-center gap-2">
                        <Banknote size={18} />
                        <span>Cash on Delivery</span>
                      </div>
                    </div>
                  </label>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={() => setStep("information")}
                    className="px-6 py-4 rounded-full border border-gray-200"
                  >
                    Back
                  </button>

                  <button
                    onClick={() => {
                      if (paymentMethod === "cod") {
                        handleCompleteOrder();
                      } else {
                        setStep("payment");
                      }
                    }}
                    className="flex-1 bg-black text-white py-4 rounded-full"
                  >
                    {paymentMethod === "cod"
                      ? "Complete Order"
                      : "Continue to payment"}
                  </button>
                </div>
              </div>
            )}

            {/* STEP 3 */}
            {step === "payment" && (
              <div className="space-y-6">
                <h2 className="text-lg font-semibold">Card Payment</h2>

                <div className="bg-white border border-gray-200 rounded-xl p-4 space-y-3">
                  <input
                    placeholder="Card number"
                    className="w-full px-4 py-3 bg-gray-50 border rounded-xl"
                  />
                  <input
                    placeholder="Name on card"
                    className="w-full px-4 py-3 bg-gray-50 border rounded-xl"
                  />

                  <div className="grid grid-cols-2 gap-3">
                    <input
                      placeholder="MM / YY"
                      className="px-4 py-3 bg-gray-50 border rounded-xl"
                    />
                    <input
                      placeholder="CVV"
                      className="px-4 py-3 bg-gray-50 border rounded-xl"
                    />
                  </div>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={() => setStep("shipping")}
                    className="px-6 py-4 rounded-full border border-gray-200"
                  >
                    Back
                  </button>

                  <button
                    onClick={handleCompleteOrder}
                    className="flex-1 bg-black text-white py-4 rounded-full flex items-center justify-center gap-2"
                  >
                    <Lock size={14} />
                    Pay ${total.toFixed(2)}
                  </button>
                </div>
              </div>
            )}

            {/* Trust */}
            <div className="flex flex-wrap items-center gap-5 mt-8 pt-6 border-t border-gray-200">
              {[
                { icon: ShieldCheck, label: "Secure payment" },
                { icon: Truck, label: "Fast delivery" },
                { icon: Lock, label: "Protected data" },
              ].map(({ icon: Icon, label }) => (
                <div
                  key={label}
                  className="flex items-center gap-2 text-xs text-gray-400"
                >
                  <Icon size={13} />
                  <span>{label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT SUMMARY */}
          <div className="lg:sticky lg:top-8">
  <div className="bg-white border border-gray-200 rounded-3xl overflow-hidden shadow-[0_8px_30px_rgba(0,0,0,0.04)]">
    {/* HEADER */}
    <div className="px-5 py-4 border-b border-gray-100 bg-gradient-to-b from-gray-50 to-white">
      <h3 className="text-sm font-semibold tracking-[0.2em] uppercase text-gray-500">
        Order Summary
      </h3>
    </div>

    {/* PRODUCT */}
    <div className="p-5 flex gap-4 border-b border-gray-100">
      <div className="relative w-[78px] h-[78px] rounded-2xl overflow-hidden bg-gray-50 border border-gray-100 shrink-0">
        <Image
          src={product.image}
          alt={product.title}
          fill
          className="object-cover"
        />

        <span
          className="absolute -top-2 -right-2 min-w-[22px] h-[22px]
          px-1 bg-black text-white text-[11px] font-semibold
          rounded-full flex items-center justify-center shadow-sm"
        >
          1
        </span>
      </div>

      <div className="flex-1 min-w-0">
        <p className="font-semibold text-sm leading-snug text-gray-900 line-clamp-2">
          {product.title}
        </p>

        <p className="text-xs text-gray-400 capitalize mt-1">
          {product.category}
        </p>

        <div className="mt-3 flex items-center justify-between">
          <span className="text-xs text-gray-400">Price</span>
          <p className="font-semibold text-base text-gray-900">
            ${price.toFixed(2)}
          </p>
        </div>
      </div>
    </div>

    {/* COUPON */}
    {/* <div className="p-5 border-b border-gray-100">
      {!showCoupon ? (
        <button
          onClick={() => setShowCoupon(true)}
          className="w-full flex items-center justify-center gap-2 py-3 rounded-2xl
            border border-dashed border-gray-300 text-sm font-medium text-gray-600
            hover:border-black hover:text-black transition"
        >
          <Tag size={14} />
          Add coupon code
        </button>
      ) : (
        <div className="space-y-3">
          <div className="flex gap-2">
            <input
              value={coupon}
              onChange={(e) => setCoupon(e.target.value.toUpperCase())}
              placeholder="COUPON10"
              className="flex-1 px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl
                text-sm uppercase placeholder:text-gray-400
                focus:outline-none focus:border-black transition"
            />

            {couponApplied ? (
              <button
                onClick={() => {
                  setCouponApplied(false);
                  setCoupon("");
                }}
                className="w-12 flex items-center justify-center rounded-xl
                  border border-red-100 text-red-500 hover:bg-red-50 transition"
              >
                <X size={16} />
              </button>
            ) : (
              <button
                onClick={() =>
                  coupon.length > 2 && setCouponApplied(true)
                }
                className="px-5 py-3 bg-black text-white rounded-xl text-sm font-medium
                  hover:bg-gray-900 active:scale-[0.98] transition"
              >
                Apply
              </button>
            )}
          </div>

          {couponApplied && (
            <p className="text-xs text-green-600 font-medium flex items-center gap-1.5">
              ✓ Coupon applied successfully
            </p>
          )}
        </div>
      )}
    </div> */}
    <CouponSection
  showCoupon={showCoupon}
  setShowCoupon={setShowCoupon}
  coupon={coupon}
  setCoupon={setCoupon}
  couponApplied={couponApplied}
  setCouponApplied={setCouponApplied}
/>

    {/* TOTALS */}
    <div className="p-5 space-y-4">
      <div className="space-y-3">
        <div className="flex justify-between items-center text-sm">
          <span className="text-gray-500">Subtotal</span>
          <span className="font-medium text-gray-900">
            ${price.toFixed(2)}
          </span>
        </div>

        <div className="flex justify-between items-start text-sm">
          <div className="flex flex-col">
            <span className="text-gray-500">Shipping</span>
            <span className="text-xs text-gray-400 mt-0.5">
              {deliveryZone === "dhaka"
                ? "Inside Dhaka"
                : "Outside Dhaka"}
            </span>
          </div>

          <span className="font-medium text-gray-900">
            ${shipping.toFixed(2)}
          </span>
        </div>

        {couponApplied && (
          <div className="flex justify-between items-center text-sm">
            <span className="text-green-600">Discount</span>
            <span className="font-medium text-green-600">
              - ${discount.toFixed(2)}
            </span>
          </div>
        )}
      </div>

      {/* TOTAL */}
      <div className="pt-4 border-t border-dashed border-gray-200">
        <div className="flex justify-between items-center">
          <div>
            <span className="text-sm text-gray-500">Total</span>
            <p className="text-xs text-gray-400 mt-1">
              Including shipping
            </p>
          </div>

          <span className="text-2xl font-semibold tracking-tight text-gray-900">
            ${total.toFixed(2)}
          </span>
        </div>
      </div>
    </div>

    {/* FOOTER TRUST */}
    <div className="px-5 py-4 bg-gray-50 border-t border-gray-100">
      <div className="flex items-center justify-center gap-2 text-xs text-gray-500">
        <ShieldCheck size={14} />
        Secure checkout protected
      </div>
    </div>
  </div>
</div>
        </div>
      </main>
    </div>
  );
}