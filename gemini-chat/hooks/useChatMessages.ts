import { useState } from 'react';
import { useMessageStore } from '@/store/messageStore';
import { Message } from '@/types/message';

const dummyMessages: Message[] = Array.from({ length: 100 }).map((_, i) => ({
  id: `${i}`,
  sender: i % 2 === 0 ? 'user' : 'ai',
  content: `Dummy message ${i}`,
  timestamp: Date.now() - i * 100000,
}));

const GEMINI_API_KEY = 'AIzaSyCHIHINjFtb1FcU-onHWDlhF3VtiSzt0LE'; 

export function useChatMessages(chatId: string) {
  const { messages, addMessage, prependMessages, resetMessages } = useMessageStore();
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const PAGE_SIZE = 20;

  const loadInitialMessages = () => {
    resetMessages();
    const initialPage = dummyMessages.slice(-PAGE_SIZE);
    prependMessages(initialPage);
    setPage(1);
    setHasMore(dummyMessages.length > PAGE_SIZE);
  };

  const loadOlderMessages = () => {
    if (!hasMore) return;

    const start = dummyMessages.length - PAGE_SIZE * (page + 1);
    const end = start + PAGE_SIZE;

    if (start < 0) {
      setHasMore(false);
      return;
    }

    const newMessages = dummyMessages.slice(Math.max(0, start), end);
    prependMessages(newMessages);

    setPage((prev) => prev + 1);
    if (start <= 0) setHasMore(false);
  };

  const sendMessage = async (content: string, image?: string) => {
    const newMsg: Message = {
      id: Date.now().toString(),
      sender: 'user',
      content,
      timestamp: Date.now(),
      image,
    };
    addMessage(newMsg);

    try {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            contents: [
              {
                parts: [{ text: content }],
              },
            ],
          }),
        }
      );

      const data = await response.json();
      const aiReply =
        data?.candidates?.[0]?.content?.parts?.[0]?.text || 'Sorry, no response';

      const aiMsg: Message = {
        id: (Date.now() + 1).toString(),
        sender: 'ai',
        content: aiReply,
        timestamp: Date.now(),
      };

      addMessage(aiMsg);
    } catch (error) {
      console.error('Gemini API Error:', error);
      addMessage({
        id: (Date.now() + 2).toString(),
        sender: 'ai',
        content: 'Something went wrong. Please try again.',
        timestamp: Date.now(),
      });
    }
  };

  return {
    messages,
    sendMessage,
    loadOlderMessages,
    loadInitialMessages,
    hasMore,
  };
}
