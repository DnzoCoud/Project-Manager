import { UserDto } from "@/types/users/user.dto";
import { Avatar, AvatarGroup } from "@heroui/avatar";

interface AssignedGroupsProps {
  users: UserDto[];
}
export default function AssignedGroups({ users }: AssignedGroupsProps) {
  return (
    <AvatarGroup isBordered max={6}>
      {users.map((user) => (
        <Avatar
          name={user.firstName}
          key={user.id}
          size="sm"
          color="secondary"
        />
      ))}
    </AvatarGroup>
  );
}
