import { create } from "zustand";

interface SidebarState {
  isOpen: boolean;
  openMenu: VoidFunction;
  closeMenu: VoidFunction;
}

export const useSidebarStore = create<SidebarState>()((state) => ({
  isOpen: false,
  openMenu: () => {
    state({
      isOpen: true,
    });
  },
  closeMenu: () => {
    state({
      isOpen: false,
    });
  },
}));
