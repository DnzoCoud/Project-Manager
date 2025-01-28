"use client";
import React, { useEffect } from "react";
import {
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
} from "@heroui/table";
import { useUser } from "@/hooks/users/useUser";
import { useUserStore } from "@/stores/user.store";
import { Chip } from "@heroui/chip";
import { User } from "@heroui/user";

export default function UserDatatable() {
  const { getAllUsers } = useUser();
  const { users } = useUserStore();
  useEffect(() => {
    getAllUsers();
  }, []);
  return (
    <div className="px-4">
      <Table aria-label="Example static collection table ">
        <TableHeader>
          <TableColumn>Usuario</TableColumn>
          <TableColumn>ROLE</TableColumn>
        </TableHeader>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.id}>
              <TableCell>
                <User
                  avatarProps={{
                    name: user.firstName,
                    color: "primary",
                    isBordered: true,
                  }}
                  description={user.role.name}
                  name={`${user.firstName} ${user.lastName}`}
                />
              </TableCell>
              <TableCell>
                <Chip color="secondary" variant="bordered">
                  {user.role.name}
                </Chip>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
