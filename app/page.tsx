"use client";

import { useState, useEffect } from "react";
import { Bot } from "lucide-react";
import { Message } from "@/types/chat";
import { MessageList } from "@/components/chat/message-list";
import { ChatForm } from "@/components/chat/chat-form";
import { sendMessage } from "@/lib/chat";
import { useToast } from "@/components/ui/use-toast";

export default function Home() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: -100, y: -100 });
  const { toast } = useToast();

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    
    const handleMouseMove = (e: MouseEvent) => {
      // Clear the previous timeout
      clearTimeout(timeoutId);
      
      setMousePosition({ x: e.clientX, y: e.clientY });
      
      // Set a new timeout to hide the gradient
      timeoutId = setTimeout(() => {
        setMousePosition({ x: -100, y: -100 });
      }, 3000);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      clearTimeout(timeoutId);
    };
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = input.trim();
    setInput("");
    setIsLoading(true);

    setMessages((prev) => [...prev, { role: "user", content: userMessage }]);

    try {
      const { message } = await sendMessage(userMessage);
      setMessages((prev) => [...prev, { role: "assistant", content: message }]);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to send message. Please try again.",
      });
      console.error("Error:", error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <main className="relative min-h-screen overflow-hidden">
      <div 
        className="mouse-gradient" 
        style={{ 
          left: mousePosition.x,
          top: mousePosition.y,
          opacity: mousePosition.x === -100 ? 0 : 1,
          transition: "opacity 0.3s ease-out",
        }} 
      />
      <div className="background-gradient" />
      <div className="mesh-gradient" />
      
      <div className="container flex flex-col max-w-4xl min-h-screen p-4 relative">
        <div className="flex items-center justify-center gap-2 py-8">
          <Bot className="h-8 w-8 text-primary animate-pulse" />
          <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-blue-500">
            AI Chat Assistant
          </h1>
        </div>

        <MessageList messages={messages} />
        <ChatForm
          input={input}
          isLoading={isLoading}
          onSubmit={handleSubmit}
          onInputChange={(e) => setInput(e.target.value)}
        />
        
        <footer className="text-center py-4 text-sm text-muted-foreground">
          © {new Date().getFullYear()} Shreyas Kolte. Built with ❤️ using Next.js
        </footer>
      </div>
    </main>
  );
}