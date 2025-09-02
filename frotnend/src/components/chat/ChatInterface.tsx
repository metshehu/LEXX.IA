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
    reviewFile?: string | null; // 👈 new
    setreviewFile: (fileName: string) => void;
}

const ChatInterface: React.FC<ChatInterfaceProps> = ({
    onJobExtracted,
    initialMessages = mockChatMessages,
    useInitialMessages = false,
    isFullScreen = false,
    reviewFile,
    setreviewFile,
}) => {
    const messagesToUse = useInitialMessages
        ? (initialMessages ?? mockChatMessages)
        : [];

    const [messages, setMessages] = useState<ChatMessage[]>(messagesToUse);
    const [input, setInput] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [showDownloadButton, setShowDownloadButton] = useState(false);

    const messagesEndRef = useRef<HTMLDivElement>(null);
    const { toast } = useToast();

    // Fetch history from Django API if not using mock data
    useEffect(() => {
        const fetchHistory = async () => {
            if (useInitialMessages) return;

            let username = localStorage.getItem("name");
            if (!username) {
                username = "NardiTest";
                localStorage.setItem("name", username);
            }

            try {
                const response = await fetch(
                    `https://lexx-ia.onrender.com/history/${username}`,
                );

                if (!response.ok) throw new Error("Failed to fetch history");

                const data = await response.json();
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

    // Scroll down on messages change
    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    useEffect(() => {
        if (reviewFile) {
            // 1️⃣ Create a user message (file review request)
            const userMessage: ChatMessage = {
                id: `msg-${Date.now()}`,
                role: "user",
                content: `Please review the file: ${reviewFile}`,
                timestamp: new Date().toISOString(),
            };

            setMessages((prev) => [...prev, userMessage]);
            setIsLoading(true);

            // 2️⃣ Call your API
            const fetchReview = async () => {
                let username = localStorage.getItem("name");
                try {
                    const response = await fetch(
                        `https://lexx-ia.onrender.com/api/review/${username}/${reviewFile}`,
                    );

                    const data = await response.json();

                    // 3️⃣ Add assistant message
                    const aiMessage: ChatMessage = {
                        id: `msg-${Date.now()}-review`,
                        role: "assistant",
                        content: data?.result || "✅ File reviewed successfully.",
                        timestamp: new Date().toISOString(),
                    };

                    setMessages((prev) => [...prev, aiMessage]);
                } catch (error) {
                    const errorMessage: ChatMessage = {
                        id: `msg-${Date.now()}-error`,
                        role: "assistant",
                        content: "⚠️ Failed to review file. Please try again.",
                        timestamp: new Date().toISOString(),
                    };
                    setMessages((prev) => [...prev, errorMessage]);
                } finally {
                    setIsLoading(false);
                }
            };

            // Simulate delay (like your input flow)
            setTimeout(fetchReview, 1500);

            setreviewFile("");
        }
    }, [reviewFile]);
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
            const response = await AIResponse(input);
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

    const AIResponse = async (userInput: string): Promise<ChatMessage> => {
        const encodedQuery = encodeURIComponent(userInput);
        let username = localStorage.getItem("name");

        if (!username) {
            username = "NardiTest";
            localStorage.setItem("name", username);
        }

        const url = "https://lexx-ia.onrender.com/api/questions/"; // new POST endpoint


       try {
            const response = await fetch(url, {
                method: "POST",
                body: JSON.stringify({
                    user: username,
                    query: encodedQuery, // send original text (or decoded) here
                }),
            });

            const data = await response.json();

            console.log("yoooo wtf ");
            console.log(data);

            if (data.Generted) {
                console.log("✅ CONTRACT GENERATED READY — SHOWING BUTTON");
                setShowDownloadButton(true); // show button instead of auto download
            }
            let content = "";

            if (data.type === "Review" && Array.isArray(data.answer)) {
                // Join batches with "-----" separator
                content = data.answer
                    .map((batch: any) => {
                        const filesList = batch.files.join(", ");
                        return `Batch ${batch.batch}:\nFiles: ${filesList}\n\n${batch.review}`;
                    })
                    .join("\n-----\n"); // separator between batches
            } else {
                content = data.answer;
            }
            return {
                id: `msg-${Date.now()}-ai`,
                role: "assistant",
                content: content,
                timestamp: new Date().toISOString(),
            };
        } catch (error) {
            console.error("❌ Error fetching chat response:", error);
            return {
                id: `msg-${Date.now()}-error`,
                role: "assistant",
                content: "Something went wrong while processing your request.",
                timestamp: new Date().toISOString(),
            };
        }
    };

    const handleDownload = () => {
        console.log("CONTRACT GENERATED TRIGGERED THANK YOU METI");
        const link = document.createElement("a");
        let username = localStorage.getItem("name");
        link.href = `https://lexx-ia.onrender.com/dow/${username}`;
        link.download = ""; // backend decides filename
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        setShowDownloadButton(false);
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

            {/* Show download button if contract generated */}
            {showDownloadButton && (
                <div className="p-4 border-t border-gray-200 bg-white flex items-center justify-between space-x-2">
                    <CustomButton
                        onClick={handleDownload}
                        className="flex-1 bg-[#f5474e] hover:bg-[#d93c44] text-white"
                    >
                        Download Contract
                    </CustomButton>
                    <button
                        onClick={() => setShowDownloadButton(false)}
                        className="px-16 py-2 bg-gray-200 text-gray-700 border-t rounded hover:bg-gray-300"
                    >
                        X
                    </button>
                </div>
            )}

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
