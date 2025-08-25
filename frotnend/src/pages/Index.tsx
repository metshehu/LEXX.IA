import React from "react";
import { Link } from "react-router-dom";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/landing/Hero";
import Features from "@/components/landing/Features";
import { CustomButton } from "@/components/ui/custom-button";
import { ArrowRight, ChevronRight } from "lucide-react";
import FeatureGrid from "@/components/landing/FeatureGrid";
import ChatInterface from "@/components/chat/ChatInterface";
import CandidateDetails from "@/components/chat/CandidateDetails";
import ChatHome from "@/components/landing/ChatHome";
interface IndexProps {
  isSignInOpen: boolean;
  setIsSignInOpen: (open: boolean) => void;
}

const Index: React.FC<IndexProps> = ({ isSignInOpen, setIsSignInOpen }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header isSignInOpen={isSignInOpen} setIsSignInOpen={setIsSignInOpen} />
      <main className="flex-1">
        <Hero />

        <FeatureGrid />
        <Features />
        <ChatHome/>
      </main>
      <Footer />
    </div>
  );
};

export default Index;
