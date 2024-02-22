import { IUser } from "@/models/user.model";
import { useUserListCtx } from "../context/user-list-ctx";

interface IUserListItemProps {
  user: IUser;
}

export const UserListItem = (props: IUserListItemProps) => {
  const {
    data: { prevUser, selectedUser },
    setData,
    fromParent: { secretInfo },
  } = useUserListCtx();
  return (
    <li
      style={{
        color:
          selectedUser?.id === props.user.id
            ? "red"
            : prevUser?.id === props.user.id
            ? "gray"
            : "black",
      }}
      onClick={() => {
        setData((prev) => ({
          ...prev,
          prevUser: selectedUser,
          selectedUser: props.user,
        }));
      }}
    >
      {props.user.id} - {props.user.name} - {secretInfo}
    </li>
  );
};
