"use client";

import { useAuth } from "@/hooks/auth/useAuth";
import { LoginDto } from "@/types/auth/login.dto";
import { Button } from "@heroui/button";
import { Input } from "@heroui/input";
import { Link } from "@heroui/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { GrFormNext } from "react-icons/gr";
import { LuExternalLink } from "react-icons/lu";

export default function LoginForm() {
  const [loginData, setLoginData] = useState<LoginDto>({
    email: "",
    password: "",
  });
  const { loading, login, error } = useAuth();
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoginData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const state = await login(loginData);
    if(state){
      router.push("/main")
    }
  };

  return (
    <form
      className=" h-auto flex flex-col p-2 justify-center items-center w-[60%] gap-4"
      onSubmit={handleSubmit}
    >
      <Input
        label="Correo electronico"
        type="email"
        name="email"
        value={loginData.email}
        onChange={handleChange}
        required
      />
      <Input
        label="Contraseña"
        type="password"
        name="password"
        value={loginData.password}
        onChange={handleChange}
        required
      />
      <Button
        color="primary"
        endContent={<GrFormNext />}
        className="w-full"
        isLoading={loading}
        type="submit"
      >
        Ingresar
      </Button>
      <span>
        <span>
          No tienes cuenta?,{" "}
          <Link href="#" color="secondary">
            registrate aqui <LuExternalLink className="p-0.5" />
          </Link>
        </span>
      </span>
    </form>
  );
}
