"use client";

import { IUser } from "@/models/user.model";
import {
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  createContext,
  useContext,
} from "react";

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
