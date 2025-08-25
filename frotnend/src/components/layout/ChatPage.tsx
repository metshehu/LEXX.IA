import React from "react";
import ChatInterface from "../chat/ChatInterface";
import CandidateDetails from "../chat/CandidateDetails";
import Header from "./Header";
import FileDetails from "../chat/FileDetails";

interface IndexProps {
  isSignInOpen: boolean;
  setIsSignInOpen: (open: boolean) => void;
}

const ChatPage: React.FC<IndexProps> = ({ isSignInOpen, setIsSignInOpen }) => {
  return (
    <>
      <Header isSignInOpen={isSignInOpen} setIsSignInOpen={setIsSignInOpen} />
      <section className="bg-[#FB3956] min-h-screen h-screen w-screen pt-16">
        {/* Flex container for left & right columns */}
        <div className="flex h-full">
          {/* Left side */}
          <div className="bg-white w-[30%] ">
            <FileDetails />
          </div>
          {/* Right side */}
          <div className="bg-white flex-1 overflow-y-auto">
            <ChatInterface isFullScreen={false} />
          </div>
        </div>
      </section>
    </>
  );
};

export default ChatPage;
