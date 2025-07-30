'use client';

import { Message } from '@/types/message';
import { ClipboardCopy } from 'lucide-react'; // optional: install `lucide-react` icons
import { toast } from 'sonner'; // optional: for nice notification

export default function ChatMessage({ message }: { message: Message }) {
  const isUser = message.sender === 'user';

  const copyToClipboard = () => {
    navigator.clipboard.writeText(message.content);
    toast.success('Message copied!');
  };

  return (
    <div
      className={`relative max-w-md p-2 rounded shadow text-sm ${
        isUser ? 'bg-blue-100 ml-auto' : 'bg-gray-200'
      }`}
    >
      {message.image && (
        <img src={message.image} alt="img" className="rounded mb-1" />
      )}

      <p className="text-black pr-6">{message.content}</p>

      <button
        onClick={copyToClipboard}
        className="absolute top-1 right-1 p-1 text-gray-500 hover:text-black"
        aria-label="Copy to clipboard"
      >
        <ClipboardCopy size={16} />
      </button>

      <p className="text-xs text-right text-gray-500 mt-1">
        {new Date(message.timestamp).toLocaleTimeString()}
      </p>
    </div>
  );
}
