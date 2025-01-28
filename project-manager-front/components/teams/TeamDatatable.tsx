"use client";
import { useTeam } from "@/hooks/teams/useTeam";
import { useTeamStore } from "@/stores/team.store";
import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@heroui/table";
import { User } from "@heroui/user";
import React, { useEffect } from "react";

export default function TeamDatatable() {
  const { getAllTeams } = useTeam();
  const { teams } = useTeamStore();

  useEffect(() => {
    getAllTeams();
  }, []);
  return (
    <div className="px-4">
      <Table aria-label="Example static collection table ">
        <TableHeader>
          <TableColumn>Equipo</TableColumn>
        </TableHeader>
        <TableBody>
          {teams.map((team) => (
            <TableRow key={team.id}>
              <TableCell>
                <User
                  avatarProps={{
                    name: team.name,
                    color: "primary",
                    isBordered: true,
                  }}
                  description={team.description}
                  name={team.name}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
