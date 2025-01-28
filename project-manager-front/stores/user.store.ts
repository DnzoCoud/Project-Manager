import { SelectData } from "@/types/selects";
import { RoleDto, UserDto } from "@/types/users/user.dto";
import { create } from "zustand";

interface UserState {
  users: UserDto[];
  roles: RoleDto[];
  setRoles: (roles: RoleDto[]) => void;
  setUsers: (users: UserDto[]) => void;
  usersSelects: SelectData[];
  getUsersSelectData: () => SelectData[];
  addUser: (user: UserDto) => void;
}

export const useUserStore = create<UserState>()((set, get) => ({
  users: [],
  roles: [],
  usersSelects: [],
  setUsers: (users) =>
    set({
      users,
    }),
  setRoles: (roles) =>
    set({
      roles,
    }),
  getUsersSelectData: () => {
    const users = get().users.map(
      (user) =>
        ({
          key: user.id.toString(),
          label: user.firstName,
        }) as SelectData
    );

    return users;
  },
  addUser: (user) =>
    set((state) => ({
      users: [...state.users, user],
    })),
}));
