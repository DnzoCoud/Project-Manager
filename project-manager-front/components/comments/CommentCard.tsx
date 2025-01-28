"use client";
import { cn } from "@/lib/class-merge.util";
import { useAuthStore } from "@/stores/auth.store";
import { CommentDto } from "@/types/comments/comment.dto";
import { Avatar } from "@heroui/avatar";
import React, { useEffect, useState } from "react";
import { useStore } from "zustand";

interface CommentCardProps {
  comment: CommentDto;
}
export default function CommentCard({ comment }: CommentCardProps) {
  const authUserId = useStore(useAuthStore, (state) => state.authUser?.id);
  const [itsMe, setItsMe] = useState(false);
  useEffect(() => {
    if (authUserId) {
      if (authUserId === comment.user.id) {
        setItsMe(true);
      }
    }
  }, [comment]);

  return (
    <div className={cn("flex items-start gap-4", itsMe && "flex-row-reverse")}>
      <Avatar
        name={comment.user.firstName}
        size="sm"
        color="secondary"
        isBordered
      />
      <div
        className={cn(
          "w-auto rounded-tl-none bg-gray-300 text-black dark:text-white dark:bg-slate-900 p-2 rounded-xl",
          itsMe && "rounded-tr-none"
        )}
      >
        {comment.comment}
      </div>
    </div>
  );
}
