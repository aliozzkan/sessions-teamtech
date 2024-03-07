import { IUser } from "@/models/user.model";
import {
  Dispatch,
  PropsWithChildren,
  createContext,
  useContext,
  useReducer,
} from "react";

export type UsersCtxDataTypes = {
  selectedUser: IUser | null;
  prevUser: IUser | null;
};

export const SET_USER_TYPE = "SET_USER_TYPE";
export const CLEAR_USER_TYPE = "CLEAR_USER_TYPE";
export const CLEAR_SELECTED_USER_TYPE = "CLEAR_SELECTED_USER_TYPE";

function selectUserAction(payload: { user: IUser }) {
  return {
    type: SET_USER_TYPE,
    payload,
  } as const;
}

function clearSelectedUserAction() {
  return {
    type: CLEAR_SELECTED_USER_TYPE,
  } as const;
}

function clearUserAction() {
  return {
    type: CLEAR_USER_TYPE,
  } as const;
}

export type UsersCtxActionType =
  | ReturnType<typeof selectUserAction>
  | ReturnType<typeof clearSelectedUserAction>
  | ReturnType<typeof clearUserAction>;

function reducer(
  state: UsersCtxDataTypes,
  action: UsersCtxActionType
): UsersCtxDataTypes {
  switch (action.type) {
    case SET_USER_TYPE:
      return {
        ...state,
        prevUser: state.selectedUser,
        selectedUser: action.payload.user,
      };
    case CLEAR_SELECTED_USER_TYPE:
      return {
        ...state,
        prevUser: state.selectedUser,
        selectedUser: null,
      };
    case CLEAR_USER_TYPE:
      return {
        prevUser: null,
        selectedUser: null,
      };
    default:
      return {
        ...state,
      };
  }
}

export const usersCtx = createContext<{
  state: UsersCtxDataTypes;
  dispatch: Dispatch<UsersCtxActionType>;
}>({} as { state: UsersCtxDataTypes; dispatch: Dispatch<UsersCtxActionType> });

export const UsersCtxProvider = (props: PropsWithChildren) => {
  const [state, dispatch] = useReducer(reducer, {
    prevUser: null,
    selectedUser: null,
  } as UsersCtxDataTypes);

  return (
    <usersCtx.Provider value={{ state, dispatch }}>
      {props.children}
    </usersCtx.Provider>
  );
};

export const useUsersCtxState = () => {
  const { state } = useContext(usersCtx);
  return state;
};

export const useUsersCtxActions = () => {
  const { dispatch } = useContext(usersCtx);

  async function onClearUserAction() {
    console.log("OnClearUserAction");
    return new Promise((resolve) => {
      return resolve(dispatch(clearUserAction()));
    });
  }

  async function onSelectUserAction(user: IUser) {
    await onClearUserAction();
    console.log("OnSetUserAction");

    return new Promise((resolve) => {
      return resolve(dispatch(selectUserAction({ user })));
    });
  }

  return {
    selectUserAction: onSelectUserAction,
    clearSelectedUserAction: onClearUserAction,
    clearUserAction: () => dispatch(clearUserAction()),
  };
};
