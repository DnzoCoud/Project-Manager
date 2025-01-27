import { cn } from "@/lib/class-merge.util";
import { Listbox, ListboxItem } from "@heroui/listbox";
import React from "react";

export const ListboxWrapper = ({
  children,
}: {
  children: React.ReactElement;
}) => (
  <div className="w-full max-w-[260px] border-small px-1 py-2 rounded-small border-default-200 dark:border-default-100">
    {children}
  </div>
);
export interface ListProps {
  label: string;
  key: string;
  className?: string;
  color:
    | "danger"
    | "default"
    | "primary"
    | "secondary"
    | "success"
    | "warning"
    | undefined;
  onPress?: VoidFunction;
}

interface MainListProps {
  items: ListProps[];
}

export default function MainList({ items }: MainListProps) {
  return (
    <ListboxWrapper>
      <Listbox aria-label="Actions">
        {items.map((item) => (
          <ListboxItem
            key={item.key}
            className={cn(item.className)}
            color={item.color}
            onPress={item.onPress}
          >
            {item.label}
          </ListboxItem>
        ))}
      </Listbox>
    </ListboxWrapper>
  );
}
