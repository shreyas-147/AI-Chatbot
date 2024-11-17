"use client";

import { useState } from "react";
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
  const { toast } = useToast();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = input.trim();
    setInput("");
    setIsLoading(true);

    // Add user message to chat
    setMessages((prev) => [...prev, { role: "user", content: userMessage }]);

    try {
      const { message } = await sendMessage(userMessage);
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: message },
      ]);
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
    <main className="flex min-h-screen flex-col items-center bg-gradient-to-b from-neutral-50 to-neutral-100 dark:from-neutral-950 dark:to-neutral-900">
      <div className="container flex flex-col max-w-4xl min-h-screen p-4">
        <div className="flex items-center justify-center gap-2 py-8">
          <Bot className="h-8 w-8 text-primary" />
          <h1 className="text-2xl font-bold text-primary">AI Chat Assistant</h1>
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