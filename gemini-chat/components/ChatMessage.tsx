"use client";

import { Message } from "@/types/message";

export default function ChatMessage({ message }: { message: Message }) {
  const isUser = message.sender === "user";

  const copyToClipboard = () => {
    navigator.clipboard.writeText(message.content);
  };

  return (
    <div
      onDoubleClick={copyToClipboard}
      className={`max-w-md p-2 rounded shadow text-sm ${
        isUser ? "bg-blue-100 ml-auto" : "bg-gray-200"
      }`}
    >
      {message.image && (
        <img src={message.image} alt="img" className="rounded mb-1" />
      )}
      <p>{message.content}</p>
      <p className="text-xs text-right text-gray-500">
        {new Date(message.timestamp).toLocaleTimeString()}
      </p>
    </div>
  );
}
