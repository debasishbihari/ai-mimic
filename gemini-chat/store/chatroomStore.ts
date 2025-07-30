import { create } from "zustand";

export interface Chatroom{
    id: string;
    title: string;
    createdAt: number;
}

interface ChatroomState{
    chatrooms: Chatroom[];
    createChatroom: (title: string)=> void;
    deleteChatroom: (id: string)=> void;
}

export const useChatroomStore = create<ChatroomState>((set) => ({
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
  }));