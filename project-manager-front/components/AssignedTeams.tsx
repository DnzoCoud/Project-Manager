import { TeamDto } from "@/types/teams/team.dto";
import { Avatar, AvatarGroup } from "@heroui/avatar";
import React from "react";

interface AssignedTeamsProps {
  teams: TeamDto[];
}
export default function AssignedTeams({ teams }: AssignedTeamsProps) {
  return (
    <AvatarGroup isBordered max={6}>
      {teams.map((team) => (
        <Avatar name={team.name} key={team.id} size="sm" color="secondary" />
      ))}
    </AvatarGroup>
  );
}
