"use client";
import { useTeam } from "@/hooks/teams/useTeam";
import { useUser } from "@/hooks/users/useUser";
import { cn } from "@/lib/class-merge.util";
import { useUserStore } from "@/stores/user.store";
import { CreateTeamDto } from "@/types/teams/create-team.dto";
import { Avatar } from "@heroui/avatar";
import { Button } from "@heroui/button";
import { Input, Textarea } from "@heroui/input";
import { Select, SelectItem } from "@heroui/select";
import React, { useEffect, useState } from "react";
import { GrFormNext } from "react-icons/gr";
import { toast } from "sonner";

export default function TeamForm() {
  const [registerData, setRegisterData] = useState<CreateTeamDto>({
    name: "",
    description: "",
    assignedUserIds: [],
  });
  const { getAllUsers, loading: usersLoading } = useUser();
  const { loading, storeTeam } = useTeam();
  const { users } = useUserStore();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRegisterData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };
  useEffect(() => {
    getAllUsers();
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const state = await storeTeam(registerData);
    if (state) {
      toast.success("Se creo el equipo", {
        description: "Ya puedes usarlo :D",
      });
    }
  };

  return (
    <form
      className={cn(
        " h-auto flex flex-col p-2 justify-center items-center w-full gap-4"
      )}
      onSubmit={handleSubmit}
    >
      <Input
        label="Nombre"
        type="text"
        name="name"
        value={registerData.name}
        onChange={handleChange}
        isRequired
      />
      <Textarea
        label="Descripción"
        type="text"
        name="description"
        value={registerData.description}
        onChange={handleChange}
        isRequired
      />
      <Select
        label="Asignar personas"
        placeholder="Personas que estaran en el equipo"
        selectionMode="multiple"
        isLoading={usersLoading}
        items={users}
        onSelectionChange={(keys) => {
          setRegisterData({
            ...registerData,
            assignedUserIds: Array.from(keys).map((key) => Number(key)),
          });
        }}
      >
        {(user) => (
          <SelectItem key={user.id} textValue={user.firstName}>
            <div className="flex gap-2 items-center">
              <Avatar
                alt={user.firstName}
                className="flex-shrink-0"
                size="sm"
                name={user.firstName}
                color="secondary"
              />
              <div className="flex flex-col">
                <span className="text-small">{user.firstName}</span>
                <span className="text-tiny text-default-400">{user.email}</span>
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
        Guardar equipo
      </Button>
    </form>
  );
}
