import React from "react";

const FeatureGrid = () => {
  return (
    <section className="bg-[#FB3956] min-h-screen flex items-center">

      <div className="flex flex-col md:flex-row items-center md:items-center justify-between max-w-7xl mx-auto px-6 md:px-12 gap-16 w-full">
        {/* Left Image with circular background */}

        <div
          className=" flex justify-center animate-slide-up"
          style={{ animationDelay: "0.6s" }}
        >
          <div className="w-[350px] h-[350px] overflow-hidden rounded-[50%_50%_50%_50%/60%_40%_60%_40%] shadow-lg">
            <img
              src="/lexia-logo-white.png"
              alt="AI Recruitment Assistant"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Right Text */}
        <div className="text-left">
          <h1 className="text-[2.8rem] md:text-[3.2rem] font-bold leading-tight max-w-xl">
            <span className="text-white">Turn </span>
            <span className="text-black">Legal Complexity </span>

            <span className="text-white">into Clear Action with </span>
            <span className="text-black">LEXX.iA</span>
          </h1>

          <p className=" text-lg text-gray-100 max-w-lg">
            <span className="font-bold text-black">LEXX.IA </span>reviews your 
            <span className="font-bold text-black">Legal </span>
            documents and delivers Focused,
            <br />
            real-time insights . empowering smarter decisions, every step of the
            way.
          </p>
        </div>
      </div>
    </section>
  );
};

export default FeatureGrid;
