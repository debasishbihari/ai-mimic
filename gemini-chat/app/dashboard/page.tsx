"use client";

import { useAuthStore } from "@/store/authStore";
import { useChatroomStore } from "@/store/chatroomStore";
import ChatroomForm from "@/components/ChatroomForm";
import ChatroomCard from "@/components/ChatroomCard";
import { useEffect, useState } from "react";
import { useDebounce } from "@/hooks/useDebounce";
import { useRouter } from "next/navigation";

export default function DashboardPage() {
  const { isAuthenticated } = useAuthStore();
  const { chatrooms } = useChatroomStore();
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 300);
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) router.push("/login");
  }, [isAuthenticated]);

  const filtered = chatrooms.filter((room) =>
    room.title.toLowerCase().includes(debouncedSearch.toLowerCase())
  );

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Your Chatrooms</h1>

      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search chatrooms..."
        className="border p-2 rounded w-full mb-4"
      />

      <ChatroomForm />

      <div className="space-y-3">
        {filtered.map((room) => (
          <ChatroomCard key={room.id} room={room} />
        ))}
        {filtered.length === 0 && (
          <p className="text-center text-gray-500">No chatrooms found</p>
        )}
      </div>
    </div>
  );
}
