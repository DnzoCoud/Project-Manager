import React from "react";
import { Input } from "@heroui/input";
import { Button } from "@heroui/button";
import { GrFormNext } from "react-icons/gr";

export default function LoginForm() {
  return (
    <form className=" h-auto flex flex-col p-2 justify-center items-center w-[60%] gap-4">
      <Input label="Correo electronico" type="email" />
      <Input label="Contraseña" type="password" />
      <Button
        color="primary"
        endContent={<GrFormNext />}
        className="w-full"
        isLoading={false}
      >
        Ingresar
      </Button>
    </form>
  );
}
