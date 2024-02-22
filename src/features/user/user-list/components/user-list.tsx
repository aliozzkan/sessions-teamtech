"use client";

import { USER_DUMMY } from "@/data/dummies/user-dummy-data";
import { UserListItem } from "./user-list-item";
import {
  UserListCtxDataTypes,
  UserListCtxProvider,
  useUserListCtx,
} from "../context/user-list-ctx";
import { IUser } from "@/models/user.model";
import { useState } from "react";

const UserList = () => {
  const [state, setState] = useState<UserListCtxDataTypes>({
    prevUser: null,
    selectedUser: null,
  });

  const secretInfo = "This is a secret info.";

  return (
    <UserListCtxProvider
      data={{
        data: state,
        setData: setState,
        fromParent: { secretInfo },
      }}
    >
      <div>
        <h1>
          User List - {state.selectedUser?.name} - {state.prevUser?.name}
        </h1>
        <ul>
          {USER_DUMMY.map((user) => (
            <UserListItem key={user.id.toString()} user={user} />
          ))}
        </ul>
      </div>
    </UserListCtxProvider>
  );
};

export { UserList };
