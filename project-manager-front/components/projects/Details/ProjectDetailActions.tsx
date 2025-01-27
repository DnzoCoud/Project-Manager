import MainModal from "@/components/MainModal";
import TaskForm from "@/components/tasks/TaskForm";
import { useDisclosure } from "@heroui/modal";
import React from "react";
import { MdAdd } from "react-icons/md";

export default function ProjectDetailActions() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  return (
    <>
      <div className="flex items-center justify-around my-6">
        <button
          className="bg-white border w-52 h-auto rounded-lg flex items-end justify-between p-2 hover:bg-gray-basic active:bg-gray-300 transition"
          onClick={onOpen}
        >
          <span className="bg-slate-800 size-12 flex items-center justify-center rounded-xl">
            <MdAdd className="text-white text-3xl" />
          </span>
          <span className="font-semibold">Crear Tarea</span>
        </button>
      </div>
      <MainModal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        title="Crear una tarea"
        content={<TaskForm />}
      />
    </>
  );
}
