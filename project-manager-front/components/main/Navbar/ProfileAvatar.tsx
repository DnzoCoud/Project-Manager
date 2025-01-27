import React from "react";
import { Avatar } from "@heroui/avatar";

export interface ProfileAvatarProps {
  userId: number;
  fullName: string;
}

export default function ProfileAvatar({ fullName }: ProfileAvatarProps) {
  return (
    <Avatar name={fullName} color="primary" isBordered radius="sm" size="sm" />
  );
}
