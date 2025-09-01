import React from "react";

const FeatureGrid = () => {
  return (
    <section className="bg-[#FB3956] min-h-screen flex items-center">

      <div className="flex flex-col md:flex-row items-center md:items-center justify-between max-w-7xl mx-auto px-6 md:px-12 gap-16 w-full">
        {/* Left Image with circular background */}
<div className="relative flex justify-center items-start animate-slide-up" style={{ animationDelay: "0.6s" }}>
  {/* Container for the logo */}







<div className="relative w-[320px] h-[320px]">
  {/* Lexia logo */}
  <img
    src="/lexia-logo-white-with-text.png"
    alt="AI Recruitment Assistant"
    className="w-full h-full object-cover rounded-full"
  />

  {/* Floating documents */}
  {/* Left side */}
  <div className="absolute top-[0px] left-[30%] w-[70px] h-[70px] opacity-70 transform -rotate-12">
    <img src="/dochope.png" alt="Document" className="w-full h-full object-cover" />
  </div>
  <div className="absolute top-[50px] left-[20%] w-[60px] h-[60px] opacity-60 transform rotate-6">
    <img src="/dochope.png" alt="Document" className="w-full h-full object-cover" />
  </div>

  {/* Right side */}
  <div className="absolute top-[0px] right-[20%] w-[70px] h-[70px] opacity-70 transform rotate-12">
    <img src="/dochope.png" alt="Document" className="w-full h-full object-cover" />
  </div>
  <div className="absolute top-[45px] right-[10%] w-[60px] h-[60px] opacity-60 transform -rotate-6">
    <img src="/dochope.png" alt="Document" className="w-full h-full object-cover" />
  </div>

  {/* Center / flying upward */}
  <div className="absolute top-[-30px] left-1/2 -translate-x-1/2 w-[65px] h-[65px] opacity-80 transform rotate-[20deg]">
    <img src="/dochope.png" alt="Document" className="w-full h-full object-cover" />
  </div>
</div>


                    <div className="absolute top-[5%] left-[-30%] w-[100px] h-[200px] opacity-60 rotate-[-15deg]">

  {/* Document */}
  <img
    src="/lens.png"
    alt="Lens"
    className="absolute bottom-[15%] left-[60%] w-[50px] h-[50px]  opacity-60"

  />

  <img
    src="/File.png"
    alt="Document"
    className="w-full h-full object-cover"
  />

  {/* Lens in bottom-right */}
</div>
                    <div className="absolute top-[5%] right-[-15%] w-[100px] h-[200px] opacity-60 rotate-[15deg]">

  {/* Document */}
  <img
    src="/dochope.png"
    alt="Lens"
    className="absolute bottom-[8%] left-[60%] w-[100px] h-[100px]  opacity-60 rotate-[30deg]"

  />
  <img
    src="/dochope.png"
    alt="Lens"
    className="absolute bottom-[11%] left-[60%] w-[100px] h-[100px]  opacity-80 rotate-[15deg]"

  />


  <img
    src="/dochope.png"
    alt="Lens"
    className="absolute bottom-[15%] left-[50%] w-[100px] h-[100px]  rotate-[-15deg]"

  />

  {/* Lens in bottom-right */}
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
