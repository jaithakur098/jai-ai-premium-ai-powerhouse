import { createFileRoute, Link, useNavigate, useParams } from "@tanstack/react-router";
import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport, type UIMessage } from "ai";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  Crown, Plus, Trash2, Copy, RotateCcw, Mic, Paperclip, ArrowUp, Menu, X, Check,
} from "lucide-react";
import { toast, Toaster } from "sonner";
import {
  Conversation, ConversationContent, ConversationScrollButton, ConversationEmptyState,
} from "@/components/ai-elements/conversation";
import { Message, MessageContent, MessageResponse } from "@/components/ai-elements/message";
import {
  PromptInput, PromptInputTextarea, PromptInputFooter, PromptInputSubmit,
} from "@/components/ai-elements/prompt-input";
import { Shimmer } from "@/components/ai-elements/shimmer";
import {
  loadThreads, saveThreads, newThreadId, deriveTitle, type ChatThread,
} from "@/lib/chat-threads";

export const Route = createFileRoute("/chat/$threadId")({
  component: ChatThreadPage,
});

const SUGGESTIONS = [
  "Explain quantum tunneling like I'm 12",
  "Write a 5-question MCQ on Rajasthan history",
  "Generate a React useDebounce hook",
  "Draft a confident PTI cover letter intro",
];

function ChatThreadPage() {
  const { threadId } = useParams({ from: "/chat/$threadId" });
  const navigate = useNavigate();
  const [threads, setThreads] = useState<ChatThread[]>([]);
  const [hydrated, setHydrated] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Hydrate threads + ensure current threadId exists
  useEffect(() => {
    const existing = loadThreads();
    let list = existing;
    if (!existing.some((t) => t.id === threadId)) {
      list = [
        { id: threadId, title: "New chat", updatedAt: Date.now(), messages: [] },
        ...existing,
      ];
      saveThreads(list);
    }
    setThreads(list);
    setHydrated(true);
  }, [threadId]);

  const activeThread = useMemo(
    () => threads.find((t) => t.id === threadId),
    [threads, threadId],
  );

  if (!hydrated || !activeThread) {
    return (
      <div className="grid min-h-screen place-items-center bg-background text-muted-foreground text-sm">
        Loading chat…
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-background text-foreground">
      <Toaster theme="dark" position="top-center" />
      {/* Sidebar — overlay on mobile */}
      <Sidebar
        threads={threads}
        activeId={threadId}
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        onNewChat={() => {
          const id = newThreadId();
          const next: ChatThread = { id, title: "New chat", updatedAt: Date.now(), messages: [] };
          const list = [next, ...threads];
          saveThreads(list);
          setThreads(list);
          setSidebarOpen(false);
          navigate({ to: "/chat/$threadId", params: { threadId: id } });
        }}
        onSelect={(id) => {
          setSidebarOpen(false);
          navigate({ to: "/chat/$threadId", params: { threadId: id } });
        }}
        onDelete={(id) => {
          const list = threads.filter((t) => t.id !== id);
          saveThreads(list);
          setThreads(list);
          if (id === threadId) {
            if (list.length) {
              navigate({ to: "/chat/$threadId", params: { threadId: list[0].id }, replace: true });
            } else {
              navigate({ to: "/chat", replace: true });
            }
          }
        }}
      />

      <main className="flex min-w-0 flex-1 flex-col">
        <header className="sticky top-0 z-10 flex items-center gap-2 border-b border-border/60 bg-background/70 px-4 py-3 backdrop-blur-xl">
          <button
            className="grid h-9 w-9 place-items-center rounded-md border border-border/60 lg:hidden"
            onClick={() => setSidebarOpen(true)}
            aria-label="Open chats"
          >
            <Menu className="h-4 w-4" />
          </button>
          <Link to="/" className="flex items-center gap-2">
            <span className="grid h-8 w-8 place-items-center rounded-full gradient-gold text-primary-foreground">
              <Crown className="h-4 w-4" />
            </span>
            <span className="font-display text-lg">
              <span className="text-gradient-gold">JAI</span> AI
            </span>
          </Link>
          <div className="ml-auto truncate text-xs text-muted-foreground hidden sm:block">
            {activeThread.title}
          </div>
        </header>

        <ChatWindow
          key={threadId}
          threadId={threadId}
          initialMessages={activeThread.messages}
          onPersist={(messages) => {
            const title = deriveTitle(messages) || activeThread.title;
            const list = threads.map((t) =>
              t.id === threadId ? { ...t, messages, title, updatedAt: Date.now() } : t,
            );
            saveThreads(list);
            setThreads(list);
          }}
        />
      </main>
    </div>
  );
}

function Sidebar({
  threads, activeId, open, onClose, onNewChat, onSelect, onDelete,
}: {
  threads: ChatThread[];
  activeId: string;
  open: boolean;
  onClose: () => void;
  onNewChat: () => void;
  onSelect: (id: string) => void;
  onDelete: (id: string) => void;
}) {
  return (
    <>
      {open && (
        <div className="fixed inset-0 z-20 bg-black/60 lg:hidden" onClick={onClose} />
      )}
      <aside
        className={`fixed inset-y-0 left-0 z-30 w-72 transform border-r border-border/60 bg-sidebar transition-transform lg:static lg:translate-x-0 ${
          open ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        <div className="flex items-center justify-between p-4">
          <Link to="/" className="flex items-center gap-2">
            <span className="grid h-7 w-7 place-items-center rounded-full gradient-gold text-primary-foreground">
              <Crown className="h-3.5 w-3.5" />
            </span>
            <span className="font-display text-base">
              <span className="text-gradient-gold">JAI</span> AI
            </span>
          </Link>
          <button className="lg:hidden" onClick={onClose} aria-label="Close">
            <X className="h-4 w-4" />
          </button>
        </div>
        <div className="px-4">
          <button
            onClick={onNewChat}
            className="flex w-full items-center justify-center gap-2 rounded-lg gradient-gold px-3 py-2 text-sm font-medium text-primary-foreground glow-gold hover:opacity-95"
          >
            <Plus className="h-4 w-4" /> New chat
          </button>
        </div>
        <p className="px-4 pt-5 pb-2 text-[10px] uppercase tracking-widest text-muted-foreground">History</p>
        <nav className="flex-1 space-y-1 overflow-y-auto px-2 pb-6">
          {threads.length === 0 && (
            <p className="px-3 text-xs text-muted-foreground">No chats yet.</p>
          )}
          {threads
            .slice()
            .sort((a, b) => b.updatedAt - a.updatedAt)
            .map((t) => {
              const active = t.id === activeId;
              return (
                <div
                  key={t.id}
                  className={`group flex items-center gap-1 rounded-md px-2 ${
                    active ? "bg-white/[0.06]" : "hover:bg-white/[0.04]"
                  }`}
                >
                  <button
                    onClick={() => onSelect(t.id)}
                    className={`flex-1 min-w-0 truncate py-2 text-left text-sm ${
                      active ? "text-foreground" : "text-muted-foreground"
                    }`}
                  >
                    {t.title || "New chat"}
                  </button>
                  <button
                    onClick={(e) => { e.stopPropagation(); onDelete(t.id); }}
                    className="grid h-7 w-7 place-items-center rounded text-muted-foreground opacity-0 hover:text-destructive group-hover:opacity-100"
                    aria-label="Delete"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </div>
              );
            })}
        </nav>
      </aside>
    </>
  );
}

function ChatWindow({
  threadId, initialMessages, onPersist,
}: {
  threadId: string;
  initialMessages: UIMessage[];
  onPersist: (messages: UIMessage[]) => void;
}) {
  const transport = useMemo(() => new DefaultChatTransport({ api: "/api/chat" }), []);
  const { messages, sendMessage, status, regenerate, error } = useChat({
    id: threadId,
    messages: initialMessages,
    transport,
    onError: (err) => {
      console.error(err);
      toast.error("Chat error: " + (err?.message || "request failed"));
    },
  });

  // Persist on stream completion (or after each change with debounce-ish guard)
  const lastSavedRef = useRef<number>(0);
  useEffect(() => {
    if (status === "streaming" || status === "submitted") return;
    if (messages.length === lastSavedRef.current) return;
    lastSavedRef.current = messages.length;
    onPersist(messages);
  }, [messages, status, onPersist]);

  // Focus textarea on mount + after sends (best-effort)
  useEffect(() => {
    const ta = document.querySelector<HTMLTextAreaElement>('textarea[name="message"]');
    ta?.focus();
  }, [threadId, status]);

  const [input, setInput] = useState("");
  const [recording, setRecording] = useState(false);
  const recognitionRef = useRef<any>(null);
  const fileRef = useRef<HTMLInputElement | null>(null);

  const handleSuggestion = (text: string) => {
    void sendMessage({ text });
  };


  const handleVoice = () => {
    const W = window as any;
    const SR = W.SpeechRecognition || W.webkitSpeechRecognition;
    if (!SR) {
      toast.error("Voice input not supported in this browser");
      return;
    }
    if (recording) {
      recognitionRef.current?.stop();
      setRecording(false);
      return;
    }
    const rec = new SR();
    rec.lang = "en-US";
    rec.interimResults = true;
    rec.continuous = false;
    rec.onresult = (e: any) => {
      const transcript = Array.from(e.results).map((r: any) => r[0].transcript).join("");
      setInput(transcript);
    };
    rec.onend = () => setRecording(false);
    rec.onerror = () => setRecording(false);
    recognitionRef.current = rec;
    rec.start();
    setRecording(true);
  };

  const handleFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (!f) return;
    setInput((prev) => `${prev}${prev ? "\n\n" : ""}[Attached file: ${f.name}]`);
    toast.success(`Attached "${f.name}" — describe what to do with it.`);
    e.target.value = "";
  };

  const isLoading = status === "submitted" || status === "streaming";
  const empty = messages.length === 0;

  return (
    <Conversation className="relative flex-1">
      <ConversationContent className="mx-auto w-full max-w-3xl px-4 py-6">
        {empty ? (
          <EmptyState onSuggest={handleSuggestion} />
        ) : (
          <div className="space-y-1">
            {messages.map((m) => {
              const text = m.parts
                .map((p) => (p.type === "text" ? p.text : ""))
                .join("");
              const isAssistant = m.role === "assistant";
              return (
                <div key={m.id} className="group">
                  <Message from={m.role}>
                    {isAssistant ? (
                      <MessageContent className="!bg-transparent !text-foreground !p-0">
                        {text ? (
                          <MessageResponse>{text}</MessageResponse>
                        ) : (
                          <Shimmer>JAI is thinking…</Shimmer>
                        )}
                      </MessageContent>
                    ) : (
                      <MessageContent className="bg-gradient-to-br from-gold to-[oklch(0.62_0.13_70)] text-primary-foreground">
                        <p className="whitespace-pre-wrap text-sm">{text}</p>
                      </MessageContent>
                    )}
                  </Message>

                  {isAssistant && text && (
                    <div className="mt-1 ml-12 flex gap-1 opacity-0 transition group-hover:opacity-100">
                      <CopyButton text={text} />
                      <button
                        onClick={() => regenerate()}
                        className="inline-flex items-center gap-1 rounded-md px-2 py-1 text-xs text-muted-foreground hover:bg-white/[0.06] hover:text-foreground"
                      >
                        <RotateCcw className="h-3 w-3" /> Regenerate
                      </button>
                    </div>
                  )}
                </div>
              );
            })}
            {status === "submitted" && (
              <Message from="assistant">
                <MessageContent className="!bg-transparent !p-0">
                  <Shimmer>JAI is thinking…</Shimmer>
                </MessageContent>
              </Message>
            )}
          </div>
        )}
        {error && (
          <p className="mx-auto mt-4 max-w-xl text-center text-xs text-destructive">
            {error.message}
          </p>
        )}
      </ConversationContent>

      <ConversationScrollButton />

      <div className="sticky bottom-0 border-t border-border/60 bg-background/80 backdrop-blur-xl">
        <div className="mx-auto w-full max-w-3xl p-3 sm:p-4">
          <PromptInput
            onSubmit={(_msg, e) => { e.preventDefault(); void handleSubmit(); }}
            className="glass-strong rounded-2xl"
          >
            <PromptInputTextarea
              ref={textareaRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask JAI AI anything…"
              className="min-h-[56px] !bg-transparent !border-0 px-4 py-3 text-sm placeholder:text-muted-foreground focus-visible:!ring-0"
            />
            <PromptInputFooter className="justify-between gap-2 px-3 pb-3">
              <div className="flex gap-1">
                <input
                  ref={fileRef}
                  type="file"
                  accept="image/*,application/pdf,.txt,.md,.csv,.json"
                  className="hidden"
                  onChange={handleFile}
                />
                <ToolButton onClick={() => fileRef.current?.click()} label="Attach">
                  <Paperclip className="h-4 w-4" />
                </ToolButton>
                <ToolButton onClick={handleVoice} label="Voice" active={recording}>
                  <Mic className="h-4 w-4" />
                </ToolButton>
              </div>
              <PromptInputSubmit
                status={status}
                disabled={!input.trim() || isLoading}
                className="!h-9 !w-9 rounded-full gradient-gold !text-primary-foreground hover:opacity-95"
              >
                <ArrowUp className="h-4 w-4" />
              </PromptInputSubmit>
            </PromptInputFooter>
          </PromptInput>
          <p className="mt-2 text-center text-[10px] text-muted-foreground">
            JAI AI can make mistakes. Verify important info.
          </p>
        </div>
      </div>
    </Conversation>
  );
}

function ToolButton({
  children, onClick, label, active,
}: { children: React.ReactNode; onClick?: () => void; label: string; active?: boolean }) {
  return (
    <button
      type="button"
      onClick={onClick}
      title={label}
      aria-label={label}
      className={`grid h-9 w-9 place-items-center rounded-full border border-border/60 text-muted-foreground hover:text-gold hover:border-gold/50 transition ${
        active ? "text-gold border-gold/60 bg-gold/10" : ""
      }`}
    >
      {children}
    </button>
  );
}

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(text);
          setCopied(true);
          setTimeout(() => setCopied(false), 1500);
        } catch {
          toast.error("Copy failed");
        }
      }}
      className="inline-flex items-center gap-1 rounded-md px-2 py-1 text-xs text-muted-foreground hover:bg-white/[0.06] hover:text-foreground"
    >
      {copied ? <><Check className="h-3 w-3" /> Copied</> : <><Copy className="h-3 w-3" /> Copy</>}
    </button>
  );
}

function EmptyState({ onSuggest }: { onSuggest: (text: string) => void }) {
  return (
    <ConversationEmptyState
      className="mx-auto max-w-2xl py-16"
      title=""
      description=""
    >
      <div className="text-center">
        <span className="mx-auto grid h-14 w-14 place-items-center rounded-2xl gradient-gold text-primary-foreground glow-gold">
          <Crown className="h-7 w-7" />
        </span>
        <h2 className="mt-5 font-display text-3xl">How may I help, my friend?</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Ask anything — study, write, code, brainstorm. JAI is listening.
        </p>
      </div>
      <div className="mt-8 grid w-full gap-3 sm:grid-cols-2">
        {SUGGESTIONS.map((s) => (
          <button
            key={s}
            onClick={() => onSuggest(s)}
            className="rounded-xl glass px-4 py-3 text-left text-sm text-muted-foreground hover:glass-strong hover:text-foreground"
          >
            <span className="text-gold mr-2">›</span>
            {s}
          </button>
        ))}
      </div>
    </ConversationEmptyState>
  );
}
