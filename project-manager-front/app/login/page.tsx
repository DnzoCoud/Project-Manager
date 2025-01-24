import LoginForm from "@/components/login/LoginForm";
import React from "react";
import { AiOutlineProduct } from "react-icons/ai";
export default function page() {
  return (
    <div className="grid grid-cols-2 flex-1">
      <div className="flex flex-col items-center justify-center gap-8">
        <span className="text-center">
          <AiOutlineProduct className="text-5xl" />
          <h1 className="font-extrabold text-2xl text-center">
            Bienvenido a [Project MANAGER]
          </h1>
          <p className="text-gray-400 text-sm">
            Ingresa con tu correo y contraseña
          </p>
        </span>
        <LoginForm />
      </div>
      <div className="flex-1 bg-slate-900 rounded-2xl"></div>
    </div>
  );
}
