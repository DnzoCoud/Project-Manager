"use client";
import { Button } from "@heroui/button";
import { AiOutlineProduct } from "react-icons/ai";
import { IoMdArrowBack } from "react-icons/io";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
import { useFormContext } from "@/context/authContext";

export default function FormSwticher() {
  const { isLoginForm, isRegisterForm, showLoginForm } = useFormContext();

  return (
    <div className="flex flex-col items-center justify-center gap-8">
      <span className="text-center">
        <AiOutlineProduct className="text-5xl" />
        <h1 className="font-extrabold text-2xl text-center">
          Bienvenido a [Project MANAGER]
        </h1>
        {isLoginForm && (
          <p className="text-gray-400 text-sm">
            Ingresa con tu correo y contraseña
          </p>
        )}
        {isRegisterForm && (
          <p className="text-gray-400 text-sm">
            Para esta prueba por defecto seras admin
          </p>
        )}
      </span>
      {isRegisterForm && (
        <Button
          onPress={showLoginForm}
          startContent={<IoMdArrowBack />}
          variant="ghost"
          color="secondary"
        >
          Ir a inicio
        </Button>
      )}
      {isLoginForm && <LoginForm />}
      {isRegisterForm && <RegisterForm />}
    </div>
  );
}
