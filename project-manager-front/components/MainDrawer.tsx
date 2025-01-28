import {
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
} from "@heroui/drawer";
import React from "react";

interface MainDrawerProps {
  isOpen: boolean;
  onOpenChange: VoidFunction;
  title: string;
  content: React.ReactElement;
}
export default function MainDrawer({
  isOpen,
  onOpenChange,
  title,
  content,
}: MainDrawerProps) {
  return (
    <Drawer isOpen={isOpen} onOpenChange={onOpenChange}>
      <DrawerContent>
        <DrawerHeader className="flex flex-col gap-1">{title}</DrawerHeader>
        <DrawerBody>{content}</DrawerBody>
      </DrawerContent>
    </Drawer>
  );
}
