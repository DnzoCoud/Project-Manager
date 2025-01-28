import { CommentDto } from "@/types/comments/comment.dto";
import { create } from "zustand";

interface CommentState {
  comments: CommentDto[];
  setComments: (comments: CommentDto[]) => void;
  addComment: (comment: CommentDto) => void;
}

export const useCommentStore = create<CommentState>()((set) => ({
  comments: [],
  setComments: (comments) => {
    set({ comments });
  },
  addComment: (comment) =>
    set((state) => ({
      comments: [...state.comments, comment],
    })),
}));
