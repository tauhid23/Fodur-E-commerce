"use client";

import React from "react";
import { BadgeCheck, HeartHandshake, Truck, Home } from "lucide-react";

const features = [
  {
    icon: BadgeCheck,
    title: "PREMIUM FABRICS",
  },
  {
    icon: HeartHandshake,
    title: "ETHICALLY MADE",
  },
  {
    icon: Truck,
    title: "EXPRESS DELIVERY",
  },
  {
    icon: Home,
    title: "CRAFTED IN-HOUSE WITH LOVE AND EXPERTISE",
  },
];

const FeatureGrid = () => {
  return (
    <section className="w-full bg-secondary-background py-10 px-6">
      
      <div className="grid grid-cols-2 gap-y-10 gap-x-6 text-center max-w-md mx-auto md:max-w-4xl md:grid-cols-4">
        
        {features.map((item, i) => {
          const Icon = item.icon;

          return (
            <div key={i} className="flex flex-col items-center">
              
              {/* Icon */}
              <Icon className="w-12 h-12 md:w-14 md:h-14 text-black stroke-[1.5]" />

              {/* Text */}
              <p className="mt-4 text-[11px] md:text-xs tracking-wide text-black leading-snug max-w-[120px] md:max-w-[140px]">
                {item.title}
              </p>

            </div>
          );
        })}

      </div>

    </section>
  );
};

export default FeatureGrid;