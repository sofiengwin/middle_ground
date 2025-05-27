import { createContext, useContext } from "react";
export interface IUserLocation {
  name: string;
  address?: string;
  currentAddress?: string;
  location?: {  lat: number; lng: number; };
}

type IMainLocation = Omit<IUserLocation, 'name'>;

export interface IAppContext {
  mainAddress: IMainLocation;
  updateMainAddress: (suggestion: google.maps.places.AutocompleteSuggestion) => void;
  locations: Record<string, IUserLocation>;
  updateLocation: (name: string, suggestion: google.maps.places.AutocompleteSuggestion) => void;
  addLocation: (name: string, userLocation: IUserLocation) => void;
}

export const AppContext = createContext<IAppContext | null>(null);

export const useAppContext = () => {
  const context = useContext(AppContext)
  if (!context) {
    throw new Error("useAppContext must be used within a AppProvider")
  }
  return context
}