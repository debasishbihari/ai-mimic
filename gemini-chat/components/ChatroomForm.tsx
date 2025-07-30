"use client";

import { useForm } from "react-hook-form";
import { useChatroomStore } from "@/store/chatroomStore";
import { toast } from 'sonner';

const ChatroomForm = () => {
  const { register, handleSubmit, reset } = useForm<{ title: string }>();
  const createChatroom = useChatroomStore((s) => s.createChatroom);

  const onSubmit = ({ title }: { title: string }) => {
    createChatroom(title);
    toast.success("Chatroom created");
    reset();
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex gap-2 mb-4">
      <input
        {...register("title", { required: true })}
        className="border p-2 rounded w-full"
        placeholder="New chatroom title"
      />
      <button type="submit" className="bg-blue-600 text-white px-4 rounded">
        Create
      </button>
    </form>
  );
};

export default ChatroomForm;
