import { TaskDto } from "@/types/tasks/task.dto";
import { create } from "zustand";

interface TaskState {
  tasks: TaskDto[];
  setTasks: (tasks: TaskDto[]) => void;
  addTask: (task: TaskDto) => void;
  updateTask: (updatedTask: TaskDto) => void;
  removeTask: (taskId: number) => void;
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
  updateTask: (updatedTask) => {
    set((state) => ({
      tasks: state.tasks.map((task) =>
        task.id === updatedTask.id ? updatedTask : task
      ),
    }));
  },
  removeTask: (taskId) => {
    set((state) => ({
      tasks: state.tasks.filter((task) => task.id !== taskId),
    }));
  },
}));
