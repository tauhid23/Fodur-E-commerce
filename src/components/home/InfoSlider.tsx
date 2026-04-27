"use client";

import React from "react";

const items = [
  {
    title: "TIMELESS ELEGANCE, PERFECTLY MODEST",
    desc: "Discover our collection of elegant Abayas and Modest dresses, thoughtfully designed with intricate hand embroidery to make every piece truly unique",
  },
  {
    title: "PROUDLY CRAFTED IN-HOUSE",
    desc: "Every piece is designed and manufactured under one roof to ensure unmatched quality and attention to detail.",
    link: "Read more",
  },
  {
    title: "ADORABLE STYLES FOR YOUR LITTLE ONES",
    desc: "Explore our charming collection of kids' abayas and baby dresses, designed for you to match effortlessly with your little one.",
  },
];

const InfoSlider = () => {
  return (
    <section className="w-full py-10">
      
      {/* Mobile Slider */}
      <div className="md:hidden flex overflow-x-auto snap-x snap-mandatory px-6 gap-6 scrollbar-hide">
        {items.map((item, i) => (
          <div
            key={i}
            className="snap-center shrink-0 w-[75%] text-center"
          >
            <h2 className="text-base font-semibold tracking-wide text-black">
              {item.title}
            </h2>

            <p className="text-sm text-gray-600 mt-4 leading-relaxed">
              {item.desc}
            </p>

            {item.link && (
              <button className="mt-4 text-sm underline underline-offset-4">
                {item.link}
              </button>
            )}
          </div>
        ))}
      </div>

      {/* Desktop Layout */}
      <div className="hidden md:grid grid-cols-3 gap-10 max-w-6xl mx-auto px-10 text-center">
        {items.map((item, i) => (
          <div key={i}>
            <h2 className="text-sm lg:text-base font-semibold tracking-wide text-black">
              {item.title}
            </h2>

            <p className="text-sm text-gray-600 mt-4 leading-relaxed">
              {item.desc}
            </p>

            {item.link && (
              <button className="mt-4 text-sm underline underline-offset-4">
                {item.link}
              </button>
            )}
          </div>
        ))}
      </div>

    </section>
  );
};

export default InfoSlider;