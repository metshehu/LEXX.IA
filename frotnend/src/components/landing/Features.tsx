import React from "react";
import {
  MessageSquare,
  Users,
  FileText,
  Search,
  Filter,
  Bell,
  Brain,
  Lock,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { CustomButton } from "@/components/ui/custom-button";

const features = [
  {
    icon: <Users className="h-6 w-6" />,
    title: "AI Candidate Matching",
    description:
      "Automatically rank candidates based on skills, experience, and cultural fit.",
    color:
      "bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400",
  },
  {
    icon: <FileText className="h-6 w-6" />,
    title: "Resume Parsing & Summary",
    description:
      "AI scans resumes and generates concise, structured summaries highlighting key qualifications.",
    color:
      "bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400",
  },
  {
    icon: <Search className="h-6 w-6" />,
    title: "AI-Powered Search",
    description:
      "Refine candidate searches using natural language commands without complex filters.",
    color:
      "bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400",
  },
  {
    icon: <Filter className="h-6 w-6" />,
    title: "Advanced Filtering",
    description:
      "Powerful filters for experience level, programming languages, location, and more.",
    color: "bg-rose-100 text-rose-600 dark:bg-rose-900/30 dark:text-rose-400",
  },
];

const Features = () => {
  return (
    <section className="bg-[#A62538] min-h-screen flex items-center">
      <div className="flex flex-col md:flex-row items-center justify-between max-w-7xl mx-auto px-6 gap-12">
        {/* Left Text */}
        <div className="flex-1 text-left">
          <h1
            className="text-3xl md:text-5xl font-bold leading-tight animate-slide-up"
            style={{ animationDelay: "0.2s" }}
          >
            <span className="text-white">Integrate and </span>
            <span className="text-black">Streamline Legal</span>
            <span className="text-white"> process with </span>
            <span className="text-black">AI</span>
          </h1>
          <p
            className="mt-4 text-[#ffbdbd] text-lg max-w-xl animate-slide-up"
            style={{ animationDelay: "0.4s" }}
          >
            <span className="text-black font-semibold">Lexxia Legal AI </span> 
            automates the organization of contracts, agreements, and
            supporting files, creating a unified repository for your legal data
            and making compliance and review simpler than ever.
          </p>
        </div>

        {/* Right Image */}
        <div
          className="flex-1 flex justify-center animate-slide-up"
          style={{ animationDelay: "0.6s" }}
        >
          <div className="w-[350px] h-[350px] overflow-hidden rounded-[50%_50%_50%_50%/60%_40%_60%_40%] shadow-lg">
            <img
              src="/lawwoman.jpg"
              alt="AI Recruitment Assistant"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
