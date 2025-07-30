"use client";

import { useEffect, useRef, useState } from "react";
import { useChatMessages } from "@/hooks/useChatMessages";
import ChatInput from "@/components/ChatInput";
import ChatMessage from "@/components/ChatMessage";
import TypingIndicator from "@/components/TypingIndicator";
import ChatSkeleton from "@/components/ChatSkeleton";

export default function ChatPage({ params }: { params: { id: string } }) {
  const {
    messages,
    sendMessage,
    loadOlderMessages,
    loadInitialMessages,
    loading,
  } = useChatMessages(params.id);
  const [page, setPage] = useState(0);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const chatRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const prevScrollHeight = useRef<number>(0);

  useEffect(() => {
    loadInitialMessages();
  }, []);

  const handleScroll = () => {
    if (!containerRef.current) return;

    const scrollTop = containerRef.current.scrollTop;

    // If at top, fetch older messages
    if (scrollTop === 0 && !isLoadingMore) {
      setIsLoadingMore(true);
      const nextPage = page + 1;
      prevScrollHeight.current = containerRef.current.scrollHeight; // Save before loading
      loadOlderMessages().then(() => {
        // Wait for DOM to update and restore scroll
        requestAnimationFrame(() => {
          if (containerRef.current) {
            const newScrollHeight = containerRef.current.scrollHeight;
            containerRef.current.scrollTop =
              newScrollHeight - prevScrollHeight.current;
          }
        });
      });
      setPage(nextPage);
      setIsLoadingMore(false);
    }
  };

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") window.history.back();
    };
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (container) container.addEventListener("scroll", handleScroll);
    return () => container?.removeEventListener("scroll", handleScroll);
  }, [page]);

  useEffect(() => {
    // Scroll to bottom only on new messages (not loading older)
    if (page === 0 && messages.length > 0) {
      chatRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages.length, page]);

  return (
    <div className="h-screen flex flex-col bg-white dark:bg-black">
      <div ref={containerRef} className="flex-1 overflow-y-auto p-4 space-y-2">
      {loading && (
          <>
            {[...Array(6)].map((_, i) => (
              <ChatSkeleton key={i} isUser={i % 2 === 0} />
            ))}
          </>
        )}
        {messages.map((msg) => (
          <ChatMessage key={msg.id} message={msg} />
        ))}
        <TypingIndicator />
        <div ref={chatRef} />
      </div>
      <div className="flex justify-center p-2">
        <ChatInput onSend={sendMessage} />
      </div>
    </div>
  );
}
