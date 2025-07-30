'use client';

import { useState, useRef } from 'react';
import { Plus } from 'lucide-react';

export default function ChatInput({ onSend }: { onSend: (text: string, image?: string) => void }) {
  const [text, setText] = useState('');
  const [image, setImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

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

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="flex p-4 border-t gap-2 items-center w-2xl rounded-2xl bg-white dark:bg-gray-800">
      {/* Hidden File Input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFile}
        className="hidden"
      />

      {/* Plus Icon Button */}
      <button onClick={triggerFileInput} className="p-2 rounded-full bg-gray-200 hover:bg-gray-300 cursor-pointer">
        <Plus className="text-gray-700" />
      </button>

      {/* Text Input */}
      <input
        type="text"
        className="flex-1 border rounded p-2"
        placeholder="Type your message..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && handleSend()}
      />

      {/* Send Button */}
      <button onClick={handleSend} className="bg-blue-600 text-white px-4 py-2 rounded cursor-pointer">
        Send
      </button>
    </div>
  );
}
