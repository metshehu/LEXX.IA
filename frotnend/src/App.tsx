import React, { useState, useCallback } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/NotFound";
import { AuthProvider } from "@/components/auth/AuthProvider";
import DashboardAccess from "@/components/layout/DashboardAccess";
import About from "./components/about/About";
import ChatInterface from "./components/chat/ChatInterface";
import ChatPage from "./components/layout/ChatPage";
const queryClient = new QueryClient();

function App() {
  const [isSignInOpen, setIsSignInOpen] = useState(false);
  const openSignIn = useCallback(() => setIsSignInOpen(true), []);
  const closeSignIn = useCallback(() => setIsSignInOpen(false), []);

  return (
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <div className="min-h-screen bg-[#190026]">
              <Routes>
                <Route
                  path="/"
                  element={
                    <Index
                      isSignInOpen={isSignInOpen}
                      setIsSignInOpen={setIsSignInOpen}
                    />
                  }
                />

                <Route
                  path="/chat"
                  element={
                    <ChatPage
                      isSignInOpen={isSignInOpen}
                      setIsSignInOpen={setIsSignInOpen}
                    />
                  }
                />

                <Route path="/about" element={<About />} />

                <Route
                  path="/dashboard"
                  element={
                    <DashboardAccess onRequireSignIn={openSignIn}>
                      <Dashboard
                        isSignInOpen={isSignInOpen}
                        setIsSignInOpen={setIsSignInOpen}
                      />
                    </DashboardAccess>
                  }
                />
                {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </div>
          </BrowserRouter>
        </TooltipProvider>
      </QueryClientProvider>
    </AuthProvider>
  );
}

export default App;
