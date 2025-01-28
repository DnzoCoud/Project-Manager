import { CommentService } from "@/services/comments/comments.service";
import { useCommentStore } from "@/stores/comment.store";
import { ApiErrorResponse } from "@/types/api-response";
import { CreateCommentDto } from "@/types/comments/create-comment.dto";
import { useState } from "react";
import { toast } from "sonner";

export const useComment = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<ApiErrorResponse | null>(null);
  const commentService = new CommentService();
  const { setComments, addComment } = useCommentStore();

  const getAllByTask = async (taskId: number) => {
    setLoading(true);
    setError(null);
    try {
      const data = await commentService.getAllByTask(taskId);
      if (data) {
        setComments(data.comments);
        return true;
      }
    } catch (error: any) {
      setError(error);
      toast.error(error.error);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const saveComment = async (
    taskId: number,
    createCommentDto: CreateCommentDto
  ) => {
    setLoading(true);
    setError(null);
    try {
      const data = await commentService.storeComment(taskId, createCommentDto);
      if (data) {
        addComment(data.comment);
        return true;
      }
    } catch (error: any) {
      setError(error);
      toast.error(error.error);
      return false;
    } finally {
      setLoading(false);
    }
  };

  return {
    getAllByTask,
    saveComment,
    loading,
    error,
  };
};
