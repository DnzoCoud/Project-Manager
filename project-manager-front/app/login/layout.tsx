"use client";
import { FormProvider } from "@/context/authContext";
import React from "react";

interface LoginlayoutProps {
  children: React.ReactNode;
}

export default function layout({ children }: LoginlayoutProps) {
  return (
    <FormProvider>
      <div className="w-screen h-screen gap-4 p-2 flex flex-col">
        {children}
      </div>
    </FormProvider>
  );
}
