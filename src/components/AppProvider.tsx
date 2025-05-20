import { AppContext, IUserLocation } from "@/contexts/AppContext";
import { useState } from "react";


export default function AppProvider({children}: {children: React.ReactNode}) {
  const [locations, setLocations] = useState<Record<string, IUserLocation>>({});
  const [llll, setLlll] = useState<IUserLocation[]>([]);

  const updateLocation = (name: string, userLocation: IUserLocation) => {
    setLocations((userLocations) => {
      return {...userLocations, [name]: userLocation}
    })
  }
  
  return (
    <AppContext.Provider value={{locations, updateLocation, llll, setLlll}}>
      {children}
    </AppContext.Provider>
  )
}