import { Input, Textarea } from "@heroui/input";
import React, { ChangeEvent, useState } from "react";
import { Button } from "@heroui/button";
import { GoPackageDependents } from "react-icons/go";
import { CreateProjectDto } from "@/types/projects/create-project.dto";
import { useProject } from "@/hooks/projects/useProject";

export default function ProjectForm() {
  const [projectData, setProjectData] = useState<CreateProjectDto>({
    name: "",
    description: "",
  });

  const { storeProject, loading } = useProject();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProjectData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    await storeProject(projectData);
    setProjectData({
      name: "",
      description: "",
    });
  };
  return (
    <form className="w-full flex flex-col gap-4" onSubmit={handleSubmit}>
      <Input
        label="Nombre del royecto"
        name="name"
        isRequired
        value={projectData.name}
        onChange={handleChange}
      />
      <Textarea
        label="Descripción"
        name="description"
        placeholder="Escribe una breve descripción del proyecto"
        isRequired
        value={projectData.description}
        onChange={handleChange}
      />
      <Button
        color="success"
        className="text-white"
        endContent={<GoPackageDependents />}
        isLoading={loading}
        type="submit"
      >
        Crear
      </Button>
    </form>
  );
}
