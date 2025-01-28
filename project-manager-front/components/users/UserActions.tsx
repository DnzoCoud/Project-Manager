"use client";
import { useDisclosure } from "@heroui/modal";
import React, { useState } from "react";
import { MdAdd } from "react-icons/md";
import MainModal from "../MainModal";
import RegisterForm from "../login/RegisterForm";
import TeamForm from "../teams/TeamForm";

export default function UserActions() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [isTeamOpen, setIsTeamOpen] = useState(false);
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
          <span className="font-semibold">Crear Usuario</span>
        </button>
        <button
          className="border dark:border-slate-700 w-52 h-auto rounded-lg flex items-end justify-between p-2 hover:bg-gray-basic dark:hover:bg-gray-800 transition"
          onClick={() => setIsTeamOpen(true)}
        >
          <span className="bg-slate-800 size-12 flex items-center justify-center rounded-xl">
            <MdAdd className="text-white text-3xl" />
          </span>
          <span className="font-semibold">Crear Equipo</span>
        </button>
      </div>
      <MainModal
        isOpen={isTeamOpen}
        onOpenChange={() => setIsTeamOpen(false)}
        title="Crear un equipo"
        content={<TeamForm />}
      />
      <MainModal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        title="Crear un usuario"
        content={<RegisterForm className="w-full" />}
      />
    </>
  );
}
