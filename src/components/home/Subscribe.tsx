"use client";


const SubscribeSection = () => {
  return (
    <section className="w-full px-5 py-10">

      {/* Subscribe */}
      <div className="text-center max-w-md mx-auto">
        
        <h2 className=" text-2xl font-mono font-extralight tracking-wide text-black">
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

          <button className="px-5 py-3 bg-black text-white text-sm font-body font-semibold">
            SUBSCRIBE
          </button>
        </div>
      </div>

      {/* Instagram Section */}
      <div className="mt-10 text-center">
        <h3 className="text-lg font-body font-semibold text-black">
          Follow us on Instagram: @treize
        </h3>

        {/* Images */}
        <div className="flex gap-4 mt-6 justify-center">
          
          <div className="w-[140px] h-[180px] overflow-hidden bg-white">
            <img
              src="https://i.ibb.co/qLRjrSvp/alireza-heidarpour-4x-IF4-R8t-Qls-unsplash.jpg"
              alt="insta1"
              className="w-full h-full object-cover"
            />
          </div>

          <div className="w-[140px] h-[180px] overflow-hidden bg-white">
            <img
              src="https://i.ibb.co/DH7Z8Y3S/hunters-race-h-No-SCx-PWYII-unsplash-1.jpg"
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