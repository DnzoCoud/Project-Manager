"use client";
import UserActions from "@/components/users/UserActions";
import UserDatatable from "@/components/users/UserDatatable";
import React from "react";
import { Tabs, Tab } from "@heroui/tabs";
import TeamDatatable from "@/components/teams/TeamDatatable";

export default function UserPage() {
  return (
    <div className="flex w-full flex-col px-4">
      <UserActions />
      <Tabs aria-label="Options">
        <Tab key="users" title="Usuarios">
          <UserDatatable />
        </Tab>
        <Tab key="teams" title="Equipos">
          <TeamDatatable />
        </Tab>
      </Tabs>
    </div>
  );
}
