"use client";

import {
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  createContext,
  useContext,
} from "react";

import { IUser } from "@/models/user.model";


export type UserListCtxDataTypes = {
  selectedUser: IUser | null;
  prevUser: IUser | null;
};

type UserListCtxTypes = {
  data: UserListCtxDataTypes;
  setData: Dispatch<SetStateAction<UserListCtxDataTypes>>;
  fromParent: {
    secretInfo: string;
  };
};

interface UserListCtxProviderProps extends PropsWithChildren {
  data: UserListCtxTypes;
}

const userListCtx = createContext<UserListCtxTypes>({} as UserListCtxTypes);

export const UserListCtxProvider = (props: UserListCtxProviderProps) => {
  return (
    <userListCtx.Provider value={props.data}>
      {props.children}
    </userListCtx.Provider>
  );
};

export const useUserListCtx = () => {
  return useContext(userListCtx);
};

export const useUserListCtxActions = () => {
  const ctx = useContext(userListCtx);

  function selectUserAction(user: IUser) {
    ctx.setData((prev) => ({
      ...prev,
      prevUser: prev.selectedUser,
      selectedUser: user,
    }));
  }

  function clearSelectedUserAction() {
    ctx.setData((prev) => ({
      ...prev,
      prevUser: prev.selectedUser,
      selectedUser: null,
    }));
  }

  function clearAction() {
    ctx.setData((prev) => ({
      ...prev,
      prevUser: null,
      selectedUser: null,
    }));
  }

  return {
    selectUserAction,
    clearSelectedUserAction,
    clearAction,
  };
};
