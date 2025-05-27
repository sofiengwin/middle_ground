import { AppContext, IUserLocation } from "@/contexts/AppContext";
import { useState } from "react";


export default function AppProvider({children}: {children: React.ReactNode}) {
  const [locations, setLocations] = useState<Record<string, IUserLocation>>({});
  const [mainAddress, setMainAddress] = useState({});

  const updateLocation = async (name: string, suggestion: google.maps.places.AutocompleteSuggestion) => {
    const {address, location} = await getLocationFromSuggestion(suggestion);

    setLocations((prev) => {
      return {...prev, [name]: {name: name, address: address, location: location}}
    })
  }

  const addLocation = (name: string, userLocation: IUserLocation) => {
    setLocations((userLocations) => {
      return {...userLocations, [name]: userLocation}
    })
  }

  const updateMainAddress = async (suggestion: google.maps.places.AutocompleteSuggestion) => {
    const {address, location} = await getLocationFromSuggestion(suggestion);
    console.log("updateMainAddress", {address, location})

    setMainAddress((prev) => {
      return {...prev, address: address, location: location}
    })
  }

  const getLocationFromSuggestion = async (suggestion: google.maps.places.AutocompleteSuggestion) => {
    let lat, lng;
    if (suggestion.placePrediction) {
      const {place} = await suggestion.placePrediction.toPlace().fetchFields({ fields: ['location'] })
      lng = place?.location?.lng();
        
      lat = place?.location?.lat();
    }

    return {
      address: suggestion.placePrediction?.text.text,
      location: lat && lng ? {lng: lng, lat: lat} : undefined
    }
  }



  return (
    <AppContext.Provider value={{locations, updateLocation, updateMainAddress, addLocation, mainAddress}}>
      {children}
    </AppContext.Provider>
  )
}