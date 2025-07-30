import { create } from "zustand";
import { persist } from 'zustand/middleware';

export interface Chatroom{
    id: string;
    title: string;
    createdAt: number;
}


export const useChatroomStore = create(
  persist(
    (set) => ({
      chatrooms: [],
      createChatroom: (title) =>
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
      deleteChatroom: (id) =>
        set((state) => ({
          chatrooms: state.chatrooms.filter((c) => c.id !== id),
        })),
    }),
    { name: 'chatrooms' }
  )
);
