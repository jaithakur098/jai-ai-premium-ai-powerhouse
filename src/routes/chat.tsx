import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/chat")({
  head: () => ({
    meta: [
      { title: "JAI AI Chat — Your Personal AI Assistant" },
      { name: "description", content: "Chat with JAI AI. Streaming replies, threaded history, code highlighting." },
    ],
  }),
  component: () => <Outlet />,
});
