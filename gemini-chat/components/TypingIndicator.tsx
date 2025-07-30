'use client';

import { useMessageStore } from '@/store/messageStore';

export default function TypingIndicator() {
  const lastMsg = useMessageStore((s) => s.messages.at(-1));
  const isTyping = lastMsg?.sender === 'user';

  if (!isTyping) return null;

  return (
    <div className="text-gray-500 text-sm italic">Gemini is typing...</div>
  );
}
