import { useMessageStore } from '@/store/messageStore';
import { Message } from '@/types/message';

const dummyMessages: Message[] = Array.from({ length: 100 }).map((_, i) => ({
  id: `${i}`,
  sender: i % 2 === 0 ? 'user' : 'ai',
  content: `Dummy message ${i}`,
  timestamp: Date.now() - i * 100000,
}));

export function useChatMessages(chatId: string) {
  const { messages, addMessage, prependMessages, resetMessages } = useMessageStore();

  const loadInitialMessages = () => {
    const page = dummyMessages.slice(-20);
    resetMessages();
    prependMessages(page);
  };

  const loadOlderMessages = (page: number) => {
    const start = dummyMessages.length - 20 * (page + 1);
    const end = start + 20;
    if (start < 0) return;
    prependMessages(dummyMessages.slice(Math.max(0, start), end));
  };

  const sendMessage = (content: string, image?: string) => {
    const newMsg: Message = {
      id: Date.now().toString(),
      sender: 'user',
      content,
      timestamp: Date.now(),
      image,
    };
    addMessage(newMsg);

    // Simulate Gemini response after delay
    setTimeout(() => {
      addMessage({
        id: (Date.now() + 1).toString(),
        sender: 'ai',
        content: `Gemini: ${content} 🤖`,
        timestamp: Date.now(),
      });
    }, 1200 + Math.random() * 1500); // Throttle delay
  };

  return {
    messages,
    sendMessage,
    loadOlderMessages,
    loadInitialMessages,
  };
}
