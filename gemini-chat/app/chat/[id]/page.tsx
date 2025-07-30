'use client';

import { useEffect, useRef, useState } from 'react';
import { useChatMessages } from '@/hooks/useChatMessages';
import ChatInput from '@/components/ChatInput';
import ChatMessage from '@/components/ChatMessage';
import TypingIndicator from '@/components/TypingIndicator';

export default function ChatPage({ params }: { params: { id: string } }) {
  const { messages, sendMessage, loadOlderMessages, loadInitialMessages } = useChatMessages(params.id);
  const [page, setPage] = useState(0);
  const chatRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    loadInitialMessages();
  }, []);

  const handleScroll = () => {
    if (containerRef.current?.scrollTop === 0) {
      const nextPage = page + 1;
      loadOlderMessages(nextPage);
      setPage(nextPage);
    }
  };

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        window.history.back();
      }
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, []);
  

  useEffect(() => {
    const c = containerRef.current;
    c?.addEventListener('scroll', handleScroll);
    return () => c?.removeEventListener('scroll', handleScroll);
  }, [page]);

  useEffect(() => {
    chatRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages.length]);

  return (
    <div className="h-screen flex flex-col">
      <div ref={containerRef} className="flex-1 overflow-y-auto p-4 space-y-2">
        {messages.map((msg) => (
          <ChatMessage key={msg.id} message={msg} />
        ))}
        <TypingIndicator />
        <div ref={chatRef} />
      </div>
      <ChatInput onSend={sendMessage} />
    </div>
  );
}
