import { SelectData } from "@/types/selects";
import { UserDto } from "@/types/users/user.dto";
import { create } from "zustand";

interface UserState {
  users: UserDto[];
  setUsers: (users: UserDto[]) => void;
  usersSelects: SelectData[];
  getUsersSelectData: () => SelectData[];
}

export const useUserStore = create<UserState>()((set, get) => ({
  users: [],
  usersSelects: [],
  setUsers: (users) =>
    set({
      users,
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
}));
