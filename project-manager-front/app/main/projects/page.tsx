import ProjectActions from "@/components/projects/ProjectActions";
import ProjectList from "@/components/projects/ProjectList";
import { ProjectService } from "@/services/projects/project.service";

export default function ProjectPage() {
  return (
    <div className="flex w-full flex-col">
      <ProjectActions />
      <ProjectList />
    </div>
  );
}
