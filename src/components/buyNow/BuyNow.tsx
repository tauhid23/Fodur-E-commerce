"use client";

import { useState } from "react";
import Image from "next/image";
import { Product } from "@/lib/constants";
import { ChevronRight, Lock, ShieldCheck, Truck, Tag, X } from "lucide-react";

type Props = {
  product: Product;
};

type Step = "information" | "shipping" | "payment";

const steps: { id: Step; label: string }[] = [
  { id: "information", label: "Information" },
  { id: "shipping", label: "Shipping" },
  { id: "payment", label: "Payment" },
];

export default function BuyNow({ product }: Props) {
  const [step, setStep] = useState<Step>("information");
  const [coupon, setCoupon] = useState("");
  const [couponApplied, setCouponApplied] = useState(false);
  const [showCoupon, setShowCoupon] = useState(false);

  const shipping = 4.99;
  const discount = couponApplied ? product.price * 0.1 : 0;
  const total = product.price + shipping - discount;

  const currentIndex = steps.findIndex((s) => s.id === step);

  return (
    <div className="min-h-screen bg-[#f8f7f5] font-sans">
      {/* Header */}
      <header className="bg-white border-b border-gray-100 px-4 py-4">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <span className="text-xl font-semibold tracking-tight">YourStore</span>
          <div className="flex items-center gap-1.5 text-xs text-gray-400">
            <Lock size={11} />
            <span>Secure checkout</span>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-8 lg:py-12">
        <div className="grid lg:grid-cols-[1fr_380px] gap-8 lg:gap-12 items-start">

          {/* LEFT — Form */}
          <div>
            {/* Breadcrumb steps */}
            <nav className="flex items-center gap-2 mb-8">
              {steps.map((s, i) => (
                <div key={s.id} className="flex items-center gap-2">
                  <button
                    onClick={() => i < currentIndex && setStep(s.id)}
                    className={`text-sm font-medium transition-colors ${
                      s.id === step
                        ? "text-black"
                        : i < currentIndex
                        ? "text-gray-500 hover:text-black cursor-pointer"
                        : "text-gray-300 cursor-default"
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

            {/* Step: Information */}
            {step === "information" && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-lg font-semibold mb-4">Contact</h2>
                  <input
                    type="email"
                    placeholder="Email address"
                    className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-sm
                      placeholder:text-gray-400 focus:outline-none focus:border-black transition-colors"
                  />
                </div>

                <div>
                  <h2 className="text-lg font-semibold mb-4">Delivery address</h2>
                  <div className="space-y-3">
                    <div className="grid grid-cols-2 gap-3">
                      <input
                        placeholder="First name"
                        className="px-4 py-3 bg-white border border-gray-200 rounded-xl text-sm
                          placeholder:text-gray-400 focus:outline-none focus:border-black transition-colors"
                      />
                      <input
                        placeholder="Last name"
                        className="px-4 py-3 bg-white border border-gray-200 rounded-xl text-sm
                          placeholder:text-gray-400 focus:outline-none focus:border-black transition-colors"
                      />
                    </div>
                    <input
                      placeholder="Address"
                      className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-sm
                        placeholder:text-gray-400 focus:outline-none focus:border-black transition-colors"
                    />
                    <input
                      placeholder="Apartment, suite, etc. (optional)"
                      className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-sm
                        placeholder:text-gray-400 focus:outline-none focus:border-black transition-colors"
                    />
                    <div className="grid grid-cols-3 gap-3">
                      <input
                        placeholder="City"
                        className="px-4 py-3 bg-white border border-gray-200 rounded-xl text-sm
                          placeholder:text-gray-400 focus:outline-none focus:border-black transition-colors"
                      />
                      <input
                        placeholder="State"
                        className="px-4 py-3 bg-white border border-gray-200 rounded-xl text-sm
                          placeholder:text-gray-400 focus:outline-none focus:border-black transition-colors"
                      />
                      <input
                        placeholder="ZIP"
                        className="px-4 py-3 bg-white border border-gray-200 rounded-xl text-sm
                          placeholder:text-gray-400 focus:outline-none focus:border-black transition-colors"
                      />
                    </div>
                    <input
                      placeholder="Phone number"
                      className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-sm
                        placeholder:text-gray-400 focus:outline-none focus:border-black transition-colors"
                    />
                  </div>
                </div>

                <button
                  onClick={() => setStep("shipping")}
                  className="w-full bg-black text-white py-4 rounded-full text-sm font-medium
                    hover:bg-gray-900 active:scale-[0.99] transition-all duration-150"
                >
                  Continue to shipping
                </button>
              </div>
            )}

            {/* Step: Shipping */}
            {step === "shipping" && (
              <div className="space-y-6">
                <h2 className="text-lg font-semibold">Shipping method</h2>

                <div className="space-y-3">
                  {[
                    { id: "standard", label: "Standard delivery", sub: "5–7 business days", price: 4.99 },
                    { id: "express", label: "Express delivery", sub: "2–3 business days", price: 12.99 },
                    { id: "overnight", label: "Overnight delivery", sub: "Next business day", price: 24.99 },
                  ].map((opt) => (
                    <label
                      key={opt.id}
                      className="flex items-center justify-between bg-white border border-gray-200
                        rounded-xl px-4 py-4 cursor-pointer has-[:checked]:border-black transition-colors group"
                    >
                      <div className="flex items-center gap-3">
                        <input
                          type="radio"
                          name="shipping"
                          defaultChecked={opt.id === "standard"}
                          className="accent-black w-4 h-4"
                        />
                        <div>
                          <p className="text-sm font-medium">{opt.label}</p>
                          <p className="text-xs text-gray-400 mt-0.5">{opt.sub}</p>
                        </div>
                      </div>
                      <span className="text-sm font-medium">${opt.price.toFixed(2)}</span>
                    </label>
                  ))}
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={() => setStep("information")}
                    className="px-6 py-4 rounded-full text-sm font-medium border border-gray-200
                      hover:border-gray-400 transition-colors"
                  >
                    Back
                  </button>
                  <button
                    onClick={() => setStep("payment")}
                    className="flex-1 bg-black text-white py-4 rounded-full text-sm font-medium
                      hover:bg-gray-900 active:scale-[0.99] transition-all duration-150"
                  >
                    Continue to payment
                  </button>
                </div>
              </div>
            )}

            {/* Step: Payment */}
            {step === "payment" && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-lg font-semibold mb-4">Payment</h2>
                  <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
                    <div className="px-4 py-3 border-b border-gray-100 flex items-center justify-between">
                      <span className="text-sm font-medium">Card details</span>
                      <div className="flex gap-1.5">
                        {["visa", "mc", "amex"].map((c) => (
                          <div key={c} className="w-9 h-6 bg-gray-100 rounded border border-gray-200" />
                        ))}
                      </div>
                    </div>
                    <div className="p-4 space-y-3">
                      <input
                        placeholder="Card number"
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm
                          placeholder:text-gray-400 focus:outline-none focus:border-black transition-colors"
                      />
                      <input
                        placeholder="Name on card"
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm
                          placeholder:text-gray-400 focus:outline-none focus:border-black transition-colors"
                      />
                      <div className="grid grid-cols-2 gap-3">
                        <input
                          placeholder="MM / YY"
                          className="px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm
                            placeholder:text-gray-400 focus:outline-none focus:border-black transition-colors"
                        />
                        <input
                          placeholder="CVV"
                          className="px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm
                            placeholder:text-gray-400 focus:outline-none focus:border-black transition-colors"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Billing */}
                <div>
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input type="checkbox" defaultChecked className="accent-black w-4 h-4" />
                    <span className="text-sm text-gray-600">Same as shipping address</span>
                  </label>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={() => setStep("shipping")}
                    className="px-6 py-4 rounded-full text-sm font-medium border border-gray-200
                      hover:border-gray-400 transition-colors"
                  >
                    Back
                  </button>
                  <button
                    className="flex-1 bg-black text-white py-4 rounded-full text-sm font-medium
                      hover:bg-gray-900 active:scale-[0.99] transition-all duration-150 flex items-center justify-center gap-2"
                  >
                    <Lock size={14} />
                    Pay ${total.toFixed(2)}
                  </button>
                </div>
              </div>
            )}

            {/* Trust badges */}
            <div className="flex flex-wrap items-center gap-5 mt-8 pt-6 border-t border-gray-200">
              {[
                { icon: ShieldCheck, label: "Secure payment" },
                { icon: Truck, label: "Free returns" },
                { icon: Lock, label: "Data protected" },
              ].map(({ icon: Icon, label }) => (
                <div key={label} className="flex items-center gap-2 text-xs text-gray-400">
                  <Icon size={13} />
                  <span>{label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT — Order summary */}
          <div className="lg:sticky lg:top-8">
            <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden">
              <div className="p-5 border-b border-gray-100">
                <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">
                  Order summary
                </h3>
              </div>

              {/* Product */}
              <div className="p-5 flex gap-4 border-b border-gray-100">
                <div className="relative">
                  <Image
                    src={product.image}
                    alt={product.title}
                    width={72}
                    height={72}
                    className="w-18 h-18 object-cover rounded-xl bg-gray-100"
                  />
                  <span className="absolute -top-2 -right-2 w-5 h-5 bg-gray-500 text-white
                    text-[10px] font-semibold rounded-full flex items-center justify-center">
                    1
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium leading-snug truncate">{product.title}</p>
                  {product.category && (
                    <p className="text-xs text-gray-400 mt-0.5">{product.category}</p>
                  )}
                  <p className="text-sm font-semibold mt-2">${product.price.toFixed(2)}</p>
                </div>
              </div>

              {/* Coupon */}
              <div className="p-5 border-b border-gray-100">
                {!showCoupon ? (
                  <button
                    onClick={() => setShowCoupon(true)}
                    className="flex items-center gap-2 text-sm text-gray-500 hover:text-black transition-colors"
                  >
                    <Tag size={13} />
                    <span>Add coupon code</span>
                  </button>
                ) : (
                  <div className="flex gap-2">
                    <input
                      value={coupon}
                      onChange={(e) => setCoupon(e.target.value.toUpperCase())}
                      placeholder="COUPON10"
                      className="flex-1 px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm
                        placeholder:text-gray-300 focus:outline-none focus:border-black transition-colors"
                    />
                    {couponApplied ? (
                      <button
                        onClick={() => { setCouponApplied(false); setCoupon(""); }}
                        className="px-3 py-2 text-xs text-red-500 hover:text-red-700 transition-colors"
                      >
                        <X size={14} />
                      </button>
                    ) : (
                      <button
                        onClick={() => coupon.length > 2 && setCouponApplied(true)}
                        className="px-4 py-2 bg-black text-white rounded-lg text-xs font-medium
                          hover:bg-gray-900 transition-colors disabled:opacity-40"
                        disabled={coupon.length < 3}
                      >
                        Apply
                      </button>
                    )}
                  </div>
                )}
                {couponApplied && (
                  <p className="text-xs text-green-600 mt-2 flex items-center gap-1">
                    <ShieldCheck size={11} /> 10% discount applied
                  </p>
                )}
              </div>

              {/* Totals */}
              <div className="p-5 space-y-2.5">
                <div className="flex justify-between text-sm text-gray-500">
                  <span>Subtotal</span>
                  <span>${product.price.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm text-gray-500">
                  <span>Shipping</span>
                  <span>${shipping.toFixed(2)}</span>
                </div>
                {couponApplied && (
                  <div className="flex justify-between text-sm text-green-600">
                    <span>Discount (10%)</span>
                    <span>−${discount.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between text-base font-semibold pt-3 border-t border-gray-100">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}