"use client";

import { useUser } from "@/hooks/users/useUser";
import { cn } from "@/lib/class-merge.util";
import { useUserStore } from "@/stores/user.store";
import { CreateUserDto, RolePrefix } from "@/types/users/create-user.dto";
import { Avatar } from "@heroui/avatar";
import { Button } from "@heroui/button";
import { Input } from "@heroui/input";
import { Select, SelectItem } from "@heroui/select";
import React, { useEffect, useState } from "react";
import { GrFormNext } from "react-icons/gr";
import { toast } from "sonner";

interface RegisterFormProps {
  className?: string;
}

export default function RegisterForm({ className }: RegisterFormProps) {
  const [registerData, setRegisterData] = useState<CreateUserDto>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    role: RolePrefix.ADMIN,
  });
  const { createUser, loading, getAllRoles } = useUser();
  const { roles } = useUserStore();
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
    }
  };

  useEffect(() => {
    getAllRoles();
  }, []);

  return (
    <form
      className={cn(
        " h-auto flex flex-col p-2 justify-center items-center w-[60%] gap-4",
        className
      )}
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
      <Select
        label="Asignar el rol"
        placeholder="Asigna un rol al usuario"
        selectionMode="single"
        isRequired
        isLoading={loading}
        items={roles}
        onChange={(e) => {
          setRegisterData({
            ...registerData,
            role: e.target.value,
          });
        }}
      >
        {(role) => (
          <SelectItem key={role.prefix} textValue={role.name}>
            <div className="flex gap-2 items-center">
              <Avatar
                alt={role.name}
                className="flex-shrink-0"
                size="sm"
                name={role.name}
                color="secondary"
              />
              <div className="flex flex-col">
                <span className="text-small">{role.name}</span>
                <span className="text-tiny text-default-400">
                  {role.prefix}
                </span>
              </div>
            </div>
          </SelectItem>
        )}
      </Select>
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
