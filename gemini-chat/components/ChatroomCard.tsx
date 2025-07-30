'use client';

import { Chatroom } from '@/store/chatroomStore';
import { toast } from 'sonner';
import { useChatroomStore } from '@/store/chatroomStore';

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
        <h3 className="text-lg font-semibold">{room.title}</h3>
        <p className="text-sm text-gray-500">
          {new Date(room.createdAt).toLocaleString()}
        </p>
      </div>
      <button
        onClick={handleDelete}
        className="text-red-600 hover:underline"
      >
        Delete
      </button>
    </div>
  );
}
