"use client";

import React from "react";

const SubscribeSection = () => {
  return (
    <section className="w-full px-5 py-10">

      {/* Subscribe */}
      <div className="text-center max-w-md mx-auto">
        
        <h2 className="font-body text-xl font-semibold tracking-wide text-black">
          SUBSCRIBE
        </h2>

        <p className="text-sm text-gray-700 mt-3 leading-relaxed">
          Subscribe to access exclusive deals, receive updates and more
        </p>

        {/* Big % */}
        <div className="text-[80px] font-light text-black mt-4 leading-none">
          %
        </div>

        <p className="text-sm text-gray-700 mt-4">
          Unlock a special offer on your first order!
        </p>

        {/* Input + Button */}
        <div className="flex gap-3 mt-6">
          <input
            type="email"
            placeholder="Email"
            className="flex-1 px-4 py-3 border border-gray-400 rounded-md text-sm outline-none"
          />

          <button className="px-5 py-3 bg-black text-white text-sm font-semibold">
            SUBSCRIBE
          </button>
        </div>
      </div>

      {/* Instagram Section */}
      <div className="mt-10 text-center">
        <h3 className="text-lg font-semibold text-black">
          Follow us on Instagram: @treize
        </h3>

        {/* Images */}
        <div className="flex gap-4 mt-6 justify-center">
          
          <div className="w-[140px] h-[180px] overflow-hidden bg-white">
            <img
              src="https://images.unsplash.com/photo-1581044777550-4cfa60707c03?auto=format&fit=crop&w=600&q=80"
              alt="insta1"
              className="w-full h-full object-cover"
            />
          </div>

          <div className="w-[140px] h-[180px] overflow-hidden bg-white">
            <img
              src="https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=600&q=80"
              alt="insta2"
              className="w-full h-full object-cover"
            />
          </div>

        </div>
      </div>

    </section>
  );
};

export default SubscribeSection;