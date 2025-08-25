import React, { useState, useRef, useEffect } from "react";
import { Send, Bot, Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { CustomButton } from "@/components/ui/custom-button";
import { useToast } from "@/hooks/use-toast";
import { mockChatMessages, ChatMessage } from "@/utils/mockData";
import { cn } from "@/lib/utils";

interface ChatInterfaceProps {
  onJobExtracted?: (jobData: any) => void;
  initialMessages?: ChatMessage[];
  useInitialMessages?: boolean;
  isFullScreen?: boolean;
}

const ChatInterface: React.FC<ChatInterfaceProps> = ({
  onJobExtracted,
  initialMessages = mockChatMessages,
  useInitialMessages = false,
  isFullScreen = false,
}) => {
  const messagesToUse = useInitialMessages
    ? (initialMessages ?? mockChatMessages)
    : [];

  const [messages, setMessages] = useState<ChatMessage[]>(messagesToUse);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  // 🔹 Fetch history from Django API if not using mock data
  useEffect(() => {
    const fetchHistory = async () => {
      console.log("before useinit");
      if (useInitialMessages) return; // skip if using mock data

      console.log("after §useinit");
      let username = localStorage.getItem("name");
      if (!username) {
        username = "NardiTest";
        localStorage.setItem("name", username);
      }

      try {
        //const response = await fetch(`http://127.0.0.1:8000/history/${username}`);
        const response = await fetch(
          `http://127.0.0.1:8000/history/qerimqerimAi`,
        );

        if (!response.ok) throw new Error("Failed to fetch history");

        const data = await response.json();

        console.log("THIS IS DATA ->", data);
        // Map Django history format -> ChatMessage[]
        const historyMessages: ChatMessage[] = data.history.flatMap(
          (item: { question: string; answer: string }, index: number) => [
            {
              id: `msg-${index}-user`,
              role: "user",
              content: item.question,
              timestamp: new Date().toISOString(),
            },
            {
              id: `msg-${index}-ai`,
              role: "assistant",
              content: item.answer,
              timestamp: new Date().toISOString(),
            },
          ],
        );

        setMessages(historyMessages);
      } catch (err) {
        console.error("Error fetching chat history:", err);
      }
    };

    fetchHistory();
  }, [useInitialMessages]);

  // Always scroll down on message change
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    const container = messagesEndRef.current?.parentElement;
    if (container) {
      container.scrollBy({
        top: container.scrollHeight,
        behavior: "auto",
      });
    }
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage: ChatMessage = {
      id: `msg-${Date.now()}`,
      role: "user",
      content: input,
      timestamp: new Date().toISOString(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    setTimeout(async () => {
      const response = await simulateAIResponse(input);
      setMessages((prev) => [...prev, response]);
      setIsLoading(false);

      if (
        (input.length > 50 && input.toLowerCase().includes("developer")) ||
        input.toLowerCase().includes("engineer")
      ) {
        const mockJobData = {
          title: "Senior React Developer",
          requiredSkills: ["React", "TypeScript", "Redux", "GraphQL"],
          preferredSkills: ["Next.js"],
          experienceRequired: "4+ years",
          remote: true,
        };

        onJobExtracted && onJobExtracted(mockJobData);

        toast({
          title: "Job details extracted",
          description:
            "Successfully parsed job requirements and found matching candidates.",
        });
      }
    }, 1500);
  };

  const simulateAIResponse = async (
    userInput: string,
  ): Promise<ChatMessage> => {
    const encodedQuery = encodeURIComponent(userInput);
    let username = localStorage.getItem("name");

    if (!username) {
      username = "NardiTest";
      localStorage.setItem("name", username);
    }
    //const url = `http://127.0.0.1:8000/questions/${username}/${encodedQuery}`;
    const url = `http://127.0.0.1:8000/questions/qerimqerimAi/${encodedQuery}`;

    console.log(url);

    try {
      const response = await fetch(url);
      const data = await response.json();
      console.log(data.answer);
      return {
        id: `msg-${Date.now()}-ai`,
        role: "assistant",
        content: data.answer,
        timestamp: new Date().toISOString(),
      };
    } catch (error) {
      console.error("Error talking to AI:", error);
      return {
        id: `msg-${Date.now()}-error`,
        role: "assistant",
        content: "Sorry, something went wrong while fetching the response.",
        timestamp: new Date().toISOString(),
      };
    }
  };

  const formatMessageContent = (content: string) =>
    content.split("\n").map((line, i) => (
      <React.Fragment key={i}>
        {line}
        <br />
      </React.Fragment>
    ));

  return (
    <Card
      className={cn(
        "flex flex-col overflow-hidden",
        isFullScreen
          ? "h-screen max-h-screen rounded-none shadow-none border-0"
          : "h-full w-full rounded-md shadow-md border border-border/40",
      )}
    >
      {/* Header */}
        {/*      <div className=" bg-[#FB3956] backdrop-blur-sm  p-1 flex items-center justify-center">
        <img src="/lexia-logo-white.png" alt="Lexia Logo" className="h-12 w-auto" />
      </div>*/}


      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={cn(
              "flex max-w-[85%] animate-slide-up transition-all",
              message.role === "user"
                ? "ml-auto justify-end"
                : "mr-auto justify-start",
            )}
            style={{ animationDuration: "0.3s" }}
          >
            <div className="flex items-start  space-x-2">
              {message.role === "assistant" && (
                <img
                  src="/lexia-logo-white.png"
                  alt="LEXIA"
                  className="h-7 w-7 flex-shrink-0 bg-[#fb3956] rounded-full "
                />
              )}
              <div
                className={cn(
                  "px-4 py-3 shadow-sm text-sm leading-relaxed",
                  message.role === "user"
                    ? "bg-[#f5474e] text-white rounded-2xl "
                    : "bg-white  text-black border border-gray-200 rounded-2xl ",
                )}
              >
                {formatMessageContent(message.content)}
              </div>
            </div>
          </div>
        ))}

        {isLoading && (
          <div className="flex max-w-[85%] mr-auto animate-slide-up transition-all">
            <div className="bg-white border border-gray-200 rounded-2xl rounded-bl-none px-4 py-3 shadow-sm flex items-center space-x-2">
              <Bot className="h-4 w-4 text-[#f5474e]" />
              <Loader2 className="h-4 w-4 animate-spin text-[#f5474e]" />
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="p-4 border-t border-border/40 bg-gray-50">
        <form onSubmit={handleSendMessage} className="flex space-x-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 border-gray-300 focus:border-[#f5474e] focus:ring-[#f5474e]"
            disabled={isLoading}
          />
          <CustomButton
            type="submit"
            disabled={!input.trim() || isLoading}
            size="icon"
            className="bg-[#f5474e] hover:bg-[#d93c44]"
          >
            <Send className="h-4 w-4" />
          </CustomButton>
        </form>
      </div>
    </Card>
  );
};

export default ChatInterface;
