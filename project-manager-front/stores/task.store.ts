import { TaskDto } from "@/types/tasks/task.dto";
import { create } from "zustand";

interface TaskState {
  tasks: TaskDto[];
  setTasks: (tasks: TaskDto[]) => void;
  addTask: (task: TaskDto) => void;
}

export const useTaskStore = create<TaskState>()((set, get) => ({
  tasks: [],
  setTasks: (tasks) => {
    set({ tasks });
  },
  addTask: (task) => {
    set((state) => ({
      tasks: [...state.tasks, task],
    }));
  },
}));
