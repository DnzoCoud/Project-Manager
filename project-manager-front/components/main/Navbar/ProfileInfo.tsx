"use client";

import { useAuthStore } from "@/stores/auth.store";
import { useStore } from "zustand";
import ProfileAvatar from "./ProfileAvatar";

export default function ProfileInfo() {
  const fullName = useStore(useAuthStore, (state) => state.getFullName);
  const authUser = useStore(useAuthStore, (state) => state.authUser);
  return (
    <div className="flex items-center justify-center gap-2">
      {authUser && (
        <>
          <span className="flex flex-col items-end justify-center">
            <h1 className="font-semibold text-sm">{fullName()}</h1>
            <p className="text-muted-foreground text-xs">{authUser.email}</p>
          </span>
          <ProfileAvatar fullName={fullName()} userId={authUser.id} />
        </>
      )}
    </div>
  );
}
