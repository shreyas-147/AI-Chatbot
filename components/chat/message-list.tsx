"use client";

import { Bot, User } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { Message } from "@/types/chat";
import { EmptyState } from "./empty-state";
import { useEffect, useRef } from "react";

interface MessageListProps {
  messages: Message[];
}

export function MessageList({ messages }: MessageListProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  return (
    <ScrollArea className="flex-1 rounded-lg border bg-background/50 backdrop-blur-sm p-4 mb-4">
      <div className="space-y-4">
        {messages.map((message, i) => (
          <div
            key={i}
            className={cn(
              "flex items-start gap-3 rounded-lg p-4 transition-colors",
              message.role === "assistant"
                ? "bg-secondary/50 backdrop-blur-sm"
                : "flex-row-reverse bg-primary/10 backdrop-blur-sm"
            )}
          >
            {message.role === "assistant" ? (
              <Bot className="h-6 w-6 text-primary" />
            ) : (
              <User className="h-6 w-6 text-primary" />
            )}
            <div className="flex-1 text-sm whitespace-pre-wrap">
              {message.content}
            </div>
          </div>
        ))}
        {messages.length === 0 && <EmptyState />}
        <div ref={scrollRef} />
      </div>
    </ScrollArea>
  );
}