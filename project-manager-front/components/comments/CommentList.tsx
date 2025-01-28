"use client";
import { useComment } from "@/hooks/comments/useComment";
import { useAuthStore } from "@/stores/auth.store";
import { useCommentStore } from "@/stores/comment.store";
import useStore from "@/stores/useStore";
import { CreateCommentDto } from "@/types/comments/create-comment.dto";
import { Button } from "@heroui/button";
import { Textarea } from "@heroui/input";
import React, { ChangeEvent, useEffect, useState } from "react";
import { FiSend } from "react-icons/fi";
import CommentCard from "./CommentCard";
import { CommentDto } from "@/types/comments/comment.dto";

interface CommentListProps {
  taskId: number;
}

export default function CommentList({ taskId }: CommentListProps) {
  const comments = useStore(useCommentStore, (state) => state.comments);
  const authUserId = useStore(useAuthStore, (state) => state.authUser?.id);
  const { saveComment, getAllByTask, loading } = useComment();
  const [commentsByTask, setCommentsByTask] = useState<CommentDto[]>([]);
  useEffect(() => {
    getAllByTask(taskId);
  }, [taskId]);

  useEffect(() => {
    const groupedComments = comments?.reduce(
      (acc, comment) => {
        if (!acc[comment.taskId]) {
          acc[comment.taskId] = [];
        }
        acc[comment.taskId].push(comment);
        return acc;
      },
      {} as Record<number, CommentDto[]>
    );
    if (groupedComments && groupedComments[taskId]) {
      setCommentsByTask(groupedComments[taskId]);
    }
  }, [comments]);

  const [commentData, setCommentData] = useState<CreateCommentDto>({
    comment: "",
    parentCommentId: null,
    taskId: 0,
    userId: 0,
  });

  const handleSubmit = async (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (authUserId) {
      commentData.userId = authUserId;
      commentData.taskId = taskId;
      await saveComment(taskId, commentData);
      setCommentData({
        comment: "",
        parentCommentId: null,
        taskId: 0,
        userId: 0,
      });
    }
  };

  return (
    <div className="w-full h-[30rem] bg-gray-basic dark:bg-slate-700 rounded-xl flex flex-col justify-between overflow-hidden">
      <div className="flex-1 overflow-auto flex flex-col p-4 space-y-4">
        {commentsByTask.map((comment) => (
          <CommentCard comment={comment} key={comment.id} />
        ))}
      </div>
      <form
        className="border-t w-full h-16 flex items-center py-2 px-4"
        onSubmit={handleSubmit}
      >
        <Textarea
          variant="faded"
          className="h-full"
          placeholder="Agregar comentarios"
          maxLength={80}
          rows={1}
          isRequired
          value={commentData.comment}
          onChange={(e) => {
            setCommentData((prevData) => ({
              ...prevData,
              comment: e.target.value,
            }));
          }}
        />
        <Button
          className="h-full rounded-l-none"
          variant="bordered"
          color="secondary"
          isIconOnly
          isLoading={loading}
          type="submit"
        >
          <FiSend />
        </Button>
      </form>
    </div>
  );
}
