import { create } from 'zustand';
import { Message } from '@/types/message';

interface MessageState {
  messages: Message[];
  addMessage: (msg: Message) => void;
  prependMessages: (msgs: Message[]) => void;
  resetMessages: () => void;
}

export const useMessageStore = create<MessageState>((set) => ({
  messages: [],
  addMessage: (msg) =>
    set((state) => ({ messages: [...state.messages, msg] })),
  prependMessages: (msgs) =>
    set((state) => ({ messages: [...msgs, ...state.messages] })),
  resetMessages: () => set({ messages: [] }),
}));
