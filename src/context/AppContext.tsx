import { ReactNode, createContext, useState } from "react";

interface AppContextData {
  querySearch: string;
  setQuerySearch: any;
}

interface AppContextProviderProps {
  children: ReactNode;
}

export const AppContext = createContext<AppContextData>({} as AppContextData);

export function AppContextProvider({ children }: AppContextProviderProps) {
  const [querySearch, setQuerySearch] = useState("");

  return (
    <AppContext.Provider
      value={{
        querySearch,
        setQuerySearch,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}
