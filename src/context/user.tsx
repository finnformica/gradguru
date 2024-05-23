"use client";

import { useContext, createContext, useState } from "react";

import { IUser } from "types/user";

export interface SessionContextType {
  user: IUser | null;
  setUser: (user: IUser) => void;
}

const SessionContext = createContext<SessionContextType | null>(null);

export const SessionProvider = ({ children }: any) => {
  const [user, setUser] = useState<IUser | null>(null);
  const value = { user, setUser };

  return (
    <SessionContext.Provider value={value}>{children}</SessionContext.Provider>
  );
};

export const useSession = () => {
  return useContext(SessionContext) as SessionContextType;
};
