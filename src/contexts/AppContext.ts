import { createContext, useContext } from "react";
export interface IUserLocation {
  name: string;
  address?: string;
}

export interface IAppContext {
  llll: IUserLocation[];
  setLlll: (locations: IUserLocation[]) => void;
  locations: Record<string, IUserLocation>;
  updateLocation: (name: string, userLocation: IUserLocation) => void;
}

export const AppContext = createContext<IAppContext | null>(null);

export const useAppContext = () => {
  const context = useContext(AppContext)
  if (!context) {
    throw new Error("useAppContext must be used within a AppProvider")
  }
  return context
}