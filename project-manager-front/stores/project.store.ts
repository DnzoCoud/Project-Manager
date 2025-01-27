import { ProjectDto } from "@/types/projects/project.dto";
import { create } from "zustand";

interface ProjectState {
  projects: ProjectDto[];
  setProjects: (projects: ProjectDto[]) => void;
  addProject: (project: ProjectDto) => void;
}

export const useProjectStore = create<ProjectState>()((set, get) => ({
  projects: [],
  setProjects: (projects) => {
    set({
      projects,
    });
  },
  addProject: (project) => {
    set((state) => ({
      projects: [...state.projects, project],
    }));
  },
}));
