"use client";
import React from "react";
import { MdAdd } from "react-icons/md";
import MainModal from "../MainModal";
import { useDisclosure } from "@heroui/modal";
import ProjectForm from "./ProjectForm";
export default function ProjectActions() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <>
      <div className="flex items-center justify-around my-6">
        <button
          className="border dark:border-slate-700 w-52 h-auto rounded-lg flex items-end justify-between p-2 hover:bg-gray-basic dark:hover:bg-gray-800 transition"
          onClick={onOpen}
        >
          <span className="bg-slate-800 size-12 flex items-center justify-center rounded-xl">
            <MdAdd className="text-white text-3xl" />
          </span>
          <span className="font-semibold">Crear Proyecto</span>
        </button>
      </div>
      <MainModal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        title="Crear un proyecto"
        content={<ProjectForm />}
      />
    </>
  );
}
