import React from "react";
import Dashboard from "@/components/dashboard/Dashboard";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

interface DashboardPageProps {
  isSignInOpen: boolean;
  setIsSignInOpen: (open: boolean) => void;
}

const DashboardPage: React.FC<DashboardPageProps> = ({ isSignInOpen, setIsSignInOpen }) => {
  return (
      <div className="min-h-screen flex flex-col relative">
        {/* Background gradient and effects */}
        <div className="fixed inset-0 bg-[#230047] overflow-hidden -z-10">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#7700ff]/20 rounded-full filter blur-3xl animate-float opacity-70" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#7700ff]/20 rounded-full filter blur-3xl animate-float opacity-70" style={{ animationDelay: '2s' }} />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#7700ff]/10 rounded-full filter blur-3xl animate-pulse-slow opacity-50" />
        </div>

        <Header isSignInOpen={isSignInOpen} setIsSignInOpen={setIsSignInOpen} />
        <main className="flex-1 pt-24 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full relative">
          <Dashboard />
        </main>
        <Footer />
      </div>
  );
};

export default DashboardPage;
