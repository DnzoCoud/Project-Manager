"use client";

import { useFormContext } from "@/context/authContext";
import { useUser } from "@/hooks/users/useUser";
import { CreateUserDto } from "@/types/users/create-user.dto";
import { Button } from "@heroui/button";
import { Input } from "@heroui/input";
import React, { useState } from "react";
import { GrFormNext } from "react-icons/gr";
import { toast } from "sonner";

export default function RegisterForm() {
  const { showLoginForm } = useFormContext();

  const [registerData, setRegisterData] = useState<CreateUserDto>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    roles: [],
  });
  const { createUser, loading } = useUser();
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRegisterData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const state = await createUser(registerData);
    if (state) {
      toast.success("Te has registrado con exito", {
        description: "Ahora puedes iniciar sesion",
      });
      showLoginForm();
    }
  };
  return (
    <form
      className=" h-auto flex flex-col p-2 justify-center items-center w-[60%] gap-4"
      onSubmit={handleSubmit}
    >
      <Input
        label="Nombre"
        type="text"
        name="firstName"
        value={registerData.firstName}
        onChange={handleChange}
        isRequired
      />
      <Input
        label="Apellido"
        type="text"
        name="lastName"
        value={registerData.lastName}
        onChange={handleChange}
        isRequired
      />
      <Input
        label="Correo electronico"
        type="email"
        name="email"
        value={registerData.email}
        onChange={handleChange}
        isRequired
      />
      <Input
        label="Contraseña"
        type="password"
        name="password"
        value={registerData.password}
        onChange={handleChange}
        isRequired
      />
      <Button
        color="primary"
        endContent={<GrFormNext />}
        className="w-full"
        isLoading={loading}
        type="submit"
      >
        Registrarse
      </Button>
    </form>
  );
}
