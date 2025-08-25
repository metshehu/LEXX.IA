import React, { useRef, useEffect } from "react";
import ChatInterface from "../chat/ChatInterface";

const ChatHome = () => {
  const animatedTextRef = useRef<HTMLSpanElement>(null);
  const jobTitles = [
    "Software Engineers",
    "Data Scientists",
    "Product Managers",
    "UX Designers",
    "DevOps Engineers",
  ];

  useEffect(() => {
    if (!animatedTextRef.current) return;

    let currentIndex = 0;
    const animateText = () => {
      if (!animatedTextRef.current) return;
      animatedTextRef.current.style.opacity = "0";
      setTimeout(() => {
        if (!animatedTextRef.current) return;
        currentIndex = (currentIndex + 1) % jobTitles.length;
        animatedTextRef.current.textContent = jobTitles[currentIndex];
        animatedTextRef.current.style.opacity = "1";
      }, 500);
    };

    const interval = setInterval(animateText, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="bg-[#FB3956] min-h-screen flex items-center">
      <div className="flex flex-col md:flex-row items-center justify-between max-w-7xl mx-auto px-6 gap-12">
        {/* Left Side (Chat) */}
        <div
          className="flex-1 flex justify-center animate-slide-up"
          style={{ animationDelay: "0.2s" }}
        >
          <div className="bg-white rounded-3xl shadow-lg border border-gray-200 w-full max-w-3xl overflow-hidden">
            <div className=" bg-[#FB3956] backdrop-blur-sm  p-1 flex items-center justify-center">
              <span className="text-black h-12 w-auto font-bold p-3">LEXX.iA</span>

           </div>

            <ChatInterface useInitialMessages={true} isFullScreen={true} />
          </div>
        </div>

        {/* Right Side (Text) */}
        <div
          className="flex-1 text-left animate-slide-up space-y-10"
          style={{ animationDelay: "0.4s" }}
        >
          {/* First Section */}
          <div>
            <h1 className="text-4xl md:text-5xl font-bold leading-tight">
              <span className="text-white">MEET </span>
              <span className="text-black">LEXX.iA</span>
            </h1>
            <p className="mt-4 text-white text-lg max-w-xl">
              Lexia is your dedicated legal assistant within Allures, equipped
              with powerful capabilities to draft, review, and provide legal
              guidance. With LEXIA, you gain access to seamless functionalities
              designed to enhance your legal capabilities, reduce costs, and
              elevate your legal processes.
            </p>
          </div>

          {/* Second Section */}
          <div>
            <h2 className="text-4xl md:text-5xl font-bold leading-tight">
              <span className="text-black">100X </span>
              <span className="text-white">Your Legal Workflow</span>
            </h2>
            <p className="mt-4 text-white text-lg max-w-xl">
              Unlock a new level of legal productivity with Lexia’s powerful AI
              tools. From intelligent document review and redlining, to instant
              legal opinions and risk detection, Lexia automates time-consuming
              tasks so you can focus on what matters most: strategy, clarity,
              and results.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ChatHome;
