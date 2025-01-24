import React from "react";

interface LoginlayoutProps {
  children: React.ReactNode;
}

export default function layout({ children }: LoginlayoutProps) {
  return (
    <div className="w-screen h-screen gap-4 p-2 flex flex-col">{children}</div>
  );
}
