import { AppContext, IUserLocation } from "@/contexts/AppContext";
import { useEffect, useState } from "react";


export default function AppProvider({children}: {children: React.ReactNode}) {
  const [locations, setLocations] = useState<Record<string, IUserLocation>>({});
  const [mainAddress, setMainAddress] = useState({});

  useEffect(() => {
    const savedLocations = JSON.parse(localStorage.getItem('locationsKey') ?? '[]')
    setLocations(savedLocations)
  }, [])

  const updateLocation = async (name: string, suggestion: google.maps.places.AutocompleteSuggestion) => {
    const {address, location} = await getLocationFromSuggestion(suggestion);

    setLocations((prev) => {
      return {...prev, [name]: {name: name, address: address, location: location}}
    })
    console.log('updating locations')
    saveLocations();
  }

  const addLocation = (name: string, userLocation: IUserLocation) => {
    setLocations((userLocations) => {
      return {...userLocations, [name]: userLocation}
    })
    console.log('setting Location')
    saveLocations();
  }

  const updateMainAddress = async (suggestion: google.maps.places.AutocompleteSuggestion) => {
    const {address, location} = await getLocationFromSuggestion(suggestion);
    // console.log("updateMainAddress", {address, location})

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

  const saveLocations = () => {
    console.log({locations})
    localStorage.setItem('locationsKey', JSON.stringify(locations))
  }



  return (
    <AppContext.Provider value={{locations, updateLocation, updateMainAddress, addLocation, mainAddress}}>
      {children}
    </AppContext.Provider>
  )
}