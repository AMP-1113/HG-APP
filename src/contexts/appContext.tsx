import React, { Key, createContext, useReducer } from "react";

export interface AppState {
  user: {
    userDisplayName: string;
  };
}

export interface AppActionPayloads {
  User: { userDisplayName: string };
}

export type AppAction = {
  [Key in keyof AppActionPayloads]: {
    type: Key;
    payload: AppActionPayloads[Key];
  };
}[keyof AppActionPayloads];

const appReducer = (state: AppState, action: AppAction) => {
  switch (action.type) {
    case "User":
      return {
        ...state,
        user: {
          userDisplayName: action.payload.userDisplayName,
        },
      };
    default:
      return state;
  }
};

const initialValue = {
  state: {
    user: {
      userDisplayName: "",
    },
  },
  dispatch: () => null,
};

interface AppContextType {
  state: AppState;
  dispatch: React.Dispatch<AppAction>;
}

export const AppContext = createContext<AppContextType>(initialValue);

export const AppProvider = ({ children }: { children: JSX.Element }) => {
  const [state, dispatch] = useReducer(appReducer, initialValue.state);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};
