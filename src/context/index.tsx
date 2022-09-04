import React, { createContext, useReducer } from "react";
import { Action, AppContextInterface } from "../types/context";

type AppState = typeof initialState;

interface ProviderProps {
  children: React.ReactNode;
}

const initialState: AppContextInterface = {
  authToken: "",
  selectedState: "",
  selectedCity: "",
};

const appReducer = (state: AppState, action: Action) => {
  switch (action.type) {
    case "SET_TOKEN":
      return { ...state, authToken: action.payload };
    case "SET_CITY":
      return { ...state, selectedCity: action.payload };
    case "SET_STATE":
      return { ...state, selectedState: action.payload };
  }
};

const AppContext = createContext<{
  state: AppState;
  dispatch: React.Dispatch<Action>;
}>({ state: initialState, dispatch: () => {} });

const AppProvider = ({ children }: ProviderProps) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};

export { AppProvider, AppContext };
