"use client";

import { USER_DUMMY } from "@/data/dummies/user-dummy-data";
import {
  UsersCtxProvider,
  useUsersCtxActions,
  useUsersCtxState,
} from "../context/user-list-ctx-with-reducer";
import { UserListItem } from "./user-list-item";

const UserListInner = () => {
  const { prevUser, selectedUser } = useUsersCtxState();
  const { clearSelectedUserAction, clearUserAction } = useUsersCtxActions();
  return (
    <div>
      <h1>
        User List - {selectedUser?.name} - {prevUser?.name} -{" "}
        <button onClick={() => void clearUserAction()}>Clear</button> - 
        <button onClick={() => void clearSelectedUserAction()}>Remove Current User</button>
      </h1>
      <ul>
        {USER_DUMMY.map((user) => (
          <UserListItem key={user.id.toString()} user={user} />
        ))}
      </ul>
    </div>
  );
};

export const UserList = () => {
  return (
    <UsersCtxProvider>
      <UserListInner />
    </UsersCtxProvider>
  );
};
