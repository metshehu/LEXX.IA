
import { useState, useCallback } from 'react';
import { useToast } from "@/hooks/use-toast";

interface UseChatCompletionOptions {
  initialMessages?: { role: 'user' | 'assistant'; content: string }[];
  onResponse?: (response: string) => void;
}

export const useChatCompletion = (options: UseChatCompletionOptions = {}) => {
  const { initialMessages = [], onResponse } = options;
  const [messages, setMessages] = useState(initialMessages);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const sendMessage = useCallback(async (userMessage: string) => {
    if (!userMessage.trim()) return;

    // Add user message to state
    const newUserMessage = { role: 'user' as const, content: userMessage };
    setMessages((prev) => [...prev, newUserMessage]);
    setIsLoading(true);
    setError(null);

    try {
      // In a real implementation, this would call an API endpoint
      // For now, we'll simulate a response with a timeout
      await new Promise((resolve) => setTimeout(resolve, 1500));
      
      // Simulate a response based on the input
      let responseText = "";
      
      if (userMessage.toLowerCase().includes('help') || userMessage.length < 10) {
        responseText = "I'm your AI recruitment assistant. Describe a job position in detail and I'll extract key requirements and find matching candidates.";
      } else if (userMessage.toLowerCase().includes('developer') || userMessage.toLowerCase().includes('engineer')) {
        responseText = "I've analyzed your job description and extracted these key requirements:\n\n- Role: Software Developer\n- Experience: 3-5 years\n- Skills: React, TypeScript, Node.js\n- Location: Remote\n\nIs this correct? I can modify any of these details.";
      } else {
        responseText = "Thank you for providing that information. Could you provide more specific details about the technical requirements and experience level needed for this position?";
      }
      
      // Add assistant response to state
      const assistantMessage = { role: 'assistant' as const, content: responseText };
      setMessages((prev) => [...prev, assistantMessage]);
      
      // Call the onResponse callback if provided
      if (onResponse) {
        onResponse(responseText);
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to get response';
      setError(errorMessage);
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }, [onResponse, toast]);

  const clearMessages = useCallback(() => {
    setMessages([]);
    setError(null);
  }, []);

  return {
    messages,
    isLoading,
    error,
    sendMessage,
    clearMessages,
  };
};

export default useChatCompletion;
