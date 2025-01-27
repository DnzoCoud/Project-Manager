import { usePathname } from "next/navigation";

/**
 * Custom hook para saber en que pesteñaa se encuentra el usuario
 * @param path
 * @returns
 */
export const useActiveLink = (path: string) => {
  const pathname = usePathname();
  return pathname === path;
};
