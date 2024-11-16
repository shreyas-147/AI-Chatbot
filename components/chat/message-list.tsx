"use client";

import { Bot, User } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { Message } from "@/types/chat";
import { EmptyState } from "./empty-state";

interface MessageListProps {
  messages: Message[];
}

export function MessageList({ messages }: MessageListProps) {
  return (
    <ScrollArea className="flex-1 rounded-lg border bg-background p-4 mb-4">
      <div className="space-y-4">
        {messages.map((message, i) => (
          <div
            key={i}
            className={cn(
              "flex items-start gap-3 rounded-lg p-4",
              message.role === "assistant"
                ? "bg-muted"
                : "flex-row-reverse bg-primary/5"
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
      </div>
    </ScrollArea>
  );
}