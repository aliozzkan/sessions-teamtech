import { IUser } from "@/models/user.model";
import {
  useUsersCtxActions,
  useUsersCtxState,
} from "../context/user-list-ctx-with-reducer";

interface IUserListItemProps {
  user: IUser;
}

export const UserListItem = (props: IUserListItemProps) => {
  const { selectedUser, prevUser } = useUsersCtxState();
  const { selectUserAction } = useUsersCtxActions();

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
        selectUserAction(props.user);
      }}
    >
      {props.user.id} - {props.user.name}
    </li>
  );
};
