import { Bot } from "lucide-react";

export function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center h-[50vh] text-muted-foreground">
      <Bot className="h-12 w-12 mb-4" />
      <p className="text-lg font-medium">Start a conversation!</p>
      <p className="text-sm">Type your message below to begin.</p>
    </div>
  );
}