import { NavItemProps } from "@/components/main/NavItem";
import { create } from "zustand";

interface SidebarState {
  isOpen: boolean;
  openMenu: VoidFunction;
  closeMenu: VoidFunction;
  activeLink: NavItemProps | null;
  setActiveLink: (navItemProps: NavItemProps) => void;
}

export const useSidebarStore = create<SidebarState>()((set) => ({
  isOpen: false,
  activeLink: null,
  openMenu: () => {
    set({
      isOpen: true,
    });
  },
  closeMenu: () => {
    set({
      isOpen: false,
    });
  },
  setActiveLink: (navItemProps: NavItemProps) => {
    set({
      activeLink: navItemProps,
    });
  },
}));
