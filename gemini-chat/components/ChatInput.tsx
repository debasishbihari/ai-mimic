'use client';

import { useState } from 'react';

export default function ChatInput({ onSend }: { onSend: (text: string, image?: string) => void }) {
  const [text, setText] = useState('');
  const [image, setImage] = useState<string | null>(null);

  const handleSend = () => {
    if (!text && !image) return;
    onSend(text, image || undefined);
    setText('');
    setImage(null);
  };

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => setImage(reader.result as string);
    reader.readAsDataURL(file);
  };

  return (
    <div className="flex p-4 border-t gap-2 items-center bg-white dark:bg-gray-800">
      <input
        type="file"
        accept="image/*"
        onChange={handleFile}
        className="w-1/5"
      />
      <input
        type="text"
        className="flex-1 border rounded p-2"
        placeholder="Type your message..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && handleSend()}
      />
      <button onClick={handleSend} className="bg-blue-600 text-white px-4 py-2 rounded">
        Send
      </button>
    </div>
  );
}
