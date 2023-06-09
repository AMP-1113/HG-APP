import React, { createContext, useReducer } from "react";
import { Song } from "../models/Song";
import { HGUser, SavedSong } from "../models/HGUser";

export interface AppState {
  user: HGUser;
  selectedSong: Song;
  loadedSong: Song;
  songs: Song[];
  savedSongs: SavedSong[];
  playLoadedSong: boolean;
}

export interface AppActionPayloads {
  User: HGUser;
  SelectedSong: Song;
  LoadedSong: Song;
  Songs: Song[];
  SavedSongs: SavedSong[];
  PlayLoadedSong: boolean;
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
          userEmail: action.payload.userEmail,
        },
      };
    case "SelectedSong":
      return {
        ...state,
        selectedSong: action.payload,
      };
    case "LoadedSong":
      return {
        ...state,
        loadedSong: action.payload,
      };
    case "PlayLoadedSong":
      return {
        ...state,
        playLoadedSong: action.payload,
      };
    case "Songs":
      return {
        ...state,
        songs: action.payload,
      };
    case "SavedSongs":
      return {
        ...state,
        savedSongs: action.payload,
      };
    default:
      return state;
  }
};

const initialValue = {
  state: {
    user: {
      userDisplayName: "Guest",
      userEmail: "",
    },
    selectedSong: undefined,
    loadedSong: undefined,
    songs: undefined,
    savedSongs: undefined,
    playLoadedSong: false,
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
