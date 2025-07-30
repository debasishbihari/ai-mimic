'use client';

import { Chatroom } from '@/store/chatroomStore';
import { toast } from 'sonner';
import { useChatroomStore } from '@/store/chatroomStore';
import Link from 'next/link';
import { Trash } from 'lucide-react';

export default function ChatroomCard({ room }: { room: Chatroom }) {
  const deleteChatroom = useChatroomStore((s) => s.deleteChatroom);

  const handleDelete = () => {
    if (confirm(`Delete "${room.title}"?`)) {
      deleteChatroom(room.id);
      toast.success('Chatroom deleted!');
    }
  };

  return (
    <div className="p-4 border rounded flex justify-between items-center">
      <div>
        <Link href={`/chat/${room.id}`}>
          <h3 className="text-lg font-semibold hover:underline cursor-pointer">{room.title}</h3>
        </Link>
        <p className="text-sm text-gray-500">
          {new Date(room.createdAt).toLocaleString()}
        </p>
      </div>
      <Trash size={20} className="text-red-600 hover:underline cursor-pointer" onClick={handleDelete} />
    </div>
  );
}
