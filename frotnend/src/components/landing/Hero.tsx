import React, { useRef, useEffect } from "react";
import {
  ArrowRight,
  Search,
  Users,
  FileText,
  BrainCircuit,
} from "lucide-react";
import { CustomButton } from "@/components/ui/custom-button";
import { Link } from "react-router-dom";
import ChatInterface from "../chat/ChatInterface";
import CandidateDetails from "../chat/CandidateDetails";

const Hero = () => {
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

      // Fade out
      animatedTextRef.current.style.opacity = "0";

      setTimeout(() => {
        if (!animatedTextRef.current) return;

        // Change text
        currentIndex = (currentIndex + 1) % jobTitles.length;
        animatedTextRef.current.textContent = jobTitles[currentIndex];

        // Fade in
        animatedTextRef.current.style.opacity = "1";
      }, 500);
    };

    const interval = setInterval(animateText, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="bg-[#A62538] min-h-screen flex items-center">
      <div className="flex flex-col md:flex-row items-center justify-between max-w-7xl mx-auto px-6 gap-12">
        {/* Left Text */}
        <div className="flex-1 text-left">
          <h1
            className="text-3xl md:text-5xl font-bold leading-tight animate-slide-up"
            style={{ animationDelay: "0.2s" }}
          >
            <span className="text-white">Revolutionize Your </span>
            <span className="text-black">Legal Services </span>
            <span className="text-white">with </span>
            <span className="text-black">AI</span>
          </h1>
          <p
            className="mt-4 text-[#ffbdbd] text-lg max-w-xl animate-slide-up"
            style={{ animationDelay: "0.4s" }}
          >
            <span className="text-black font-semibold">AI-Powered</span>{" "}
            drafting, review, and strategic advice anytime you need it — faster,
            smarter, and always on.
          </p>
        </div>

        {/* Right Image */}
        <div
          className="flex-1 flex justify-center animate-slide-up"
          style={{ animationDelay: "0.6s" }}
        >
                        <div className="w-[550px] h-[450px] overflow-hidden shadow-lg [clip-path:ellipse(50%_40%_at_50%_50%)] rotate-[-40deg]">



            <img
              src="/lawwoman.jpg"
              alt="AI Recruitment Assistant"
              className="w-full h-full object-cover rotate-[40deg]"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
