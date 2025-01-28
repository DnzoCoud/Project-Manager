"use client";
import LoginForm from "@/components/login/LoginForm";
import RegisterForm from "@/components/login/RegisterForm";
import { useFormContext } from "@/context/authContext";
import { Button } from "@heroui/button";
import Image from "next/image";
import { AiOutlineProduct } from "react-icons/ai";
import { IoMdArrowBack } from "react-icons/io";

export default function page() {
  const { isLoginForm, isRegisterForm, showLoginForm } = useFormContext();
  return (
    <div className="grid grid-cols-2 flex-1">
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
      <div className="flex-1 bg-slate-900 rounded-2xl flex items-center justify-center">
        <Image
          src={"/login_banner.svg"}
          alt="First Banner for login"
          width={520}
          height={600}
          priority={true}
          fetchPriority="high"
        />
      </div>
    </div>
  );
}
