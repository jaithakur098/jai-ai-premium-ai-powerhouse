import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
import { loadThreads, saveThreads, newThreadId, type ChatThread } from "@/lib/chat-threads";

export const Route = createFileRoute("/chat/")({
  component: ChatIndex,
});

function ChatIndex() {
  const navigate = useNavigate();
  useEffect(() => {
    if (typeof window === "undefined") return;
    const threads = loadThreads();
    let target: string;
    if (threads.length === 0) {
      const t: ChatThread = {
        id: newThreadId(),
        title: "New chat",
        updatedAt: Date.now(),
        messages: [],
      };
      saveThreads([t]);
      target = t.id;
    } else {
      target = threads.sort((a, b) => b.updatedAt - a.updatedAt)[0].id;
    }
    navigate({ to: "/chat/$threadId", params: { threadId: target }, replace: true });
  }, [navigate]);
  return (
    <div className="grid min-h-screen place-items-center bg-background text-muted-foreground text-sm">
      Loading chat…
    </div>
  );
}
