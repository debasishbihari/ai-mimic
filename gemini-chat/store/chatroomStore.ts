import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface Chatroom {
  id: string;
  title: string;
  createdAt: number;
}

interface ChatroomState {
  chatrooms: Chatroom[];
  createChatroom: (title: string) => void;
  deleteChatroom: (id: string) => void;
}

export const useChatroomStore = create<ChatroomState>()(
  persist(
    (set) => ({
      chatrooms: [],
      createChatroom: (title: string) =>
        set((state) => ({
          chatrooms: [
            {
              id: Date.now().toString(),
              title,
              createdAt: Date.now(),
            },
            ...state.chatrooms,
          ],
        })),
      deleteChatroom: (id: string) =>
        set((state) => ({
          chatrooms: state.chatrooms.filter((c) => c.id !== id),
        })),
    }),
    { name: "chatrooms" }
  )
);
