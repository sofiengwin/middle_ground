import {AdvancedMarker, useAdvancedMarkerRef, Pin} from '@vis.gl/react-google-maps';
import {useCallback, useEffect, useState} from 'react';
// import Directions from './Directions';
import { useDirections } from './useDirections';
// import Directions from './Directions';
import useSearchPlaces from './hooks/useSearchPlaces';
// 
const george = {lat: 49.204542571381296, lng: -122.90846930109086, address: ''}
const sofien = {lat: 49.107051518586125, lng: -122.80181147410804, address: ''}
const bodunde = {lat: 49.200849440419006, lng: -122.91437387225514, address: ''}
const tj = {lat: 49.276060472781246, lng: -122.82504594341755, address: ''}
const endurance = {lat: 49.19354056002209, lng: -122.79310430109112, address: ''}
const center = {lat: 49.18140440608156, lng: -122.84811819468837, address: ''}

// Array of colors for different routes
const ROUTE_COLORS = [
  "#FF0000",
  "#00FF00",
  "#0000FF",
  "#FFA500",
  "#800080",
  "#008080",
  "#FF69B4",
  "#4B0082",
  "#FF4500",
  "#2E8B57",
]

interface Location {
  address: string
  lat: number
  lng: number
  distance?: string
  directions?: google.maps.DirectionsResult | null
  placeId?: string
  name?: string
  rating?: number
  vicinity?: string
}

const CustomMap = () => {
  // const [searchQuery, setSearchQuery] = useState("")
  // const [searchResults, setSearchResults] = useState<Location[]>([])
  // const [selectedPlace, setSelectedPlace] = useState<Location | null>(null)
  const [otherAddresses, setOtherAddresses] = useState<Location[]>([george, sofien, bodunde, tj, endurance])
  const [isCalculating, setIsCalculating] = useState(false)
  const setDirections = useDirections();
  // const [isSearching, setIsSearching] = useState(false)
  // const [mapCenter, setMapCenter] = useState({ lat: 40.7128, lng: -74.006 }) // Default to NYC
  // const [mapZoom, setMapZoom] = useState(12)
  // <APIProvider apiKey={}>
  //   <Map
  //     style={{width: '100vw', height: '100vh'}}
  //     defaultCenter={{lat: 22.54992, lng: 0}}
  //     defaultZoom={3}
  //     gestureHandling={'greedy'}
  //     disableDefaultUI={true}
  //   />
  // </APIProvider>

  const performSearch = useSearchPlaces()
  const [markerRef, marker] = useAdvancedMarkerRef();
  useEffect(() => {
    if (!marker) {
      return;
    }
    

    // do something with marker instance here
  }, [marker]);

  const calculateDirections = useCallback(async (origin: Location, destination: Location, index: number) => {
    if (!window.google) return null

    const directionsService = new window.google.maps.DirectionsService()

    try {
      const result = await directionsService.route({
        origin: { lat: origin.lat, lng: origin.lng },
        destination: { lat: destination.lat, lng: destination.lng },
        travelMode: window.google.maps.TravelMode.DRIVING,
      })

      return result
    } catch (error) {
      console.error(`Error calculating directions for address ${index + 1}:`, error)
      return null
    }
  }, [])

  const calculateDistances = useCallback(async () => {
    // if (!selectedPlace || !window.google) return

    setIsCalculating(true)
    const service = new window.google.maps.DistanceMatrixService()

    // const validAddresses = otherAddresses.filter((addr) => addr.address)
    const validAddresses = otherAddresses
    console.log({validAddresses})
    // if (validAddresses.length === 0) {
    //   setIsCalculating(false)
    //   return
    // }

    try {
      // Calculate distances
      const result = await service.getDistanceMatrix({
        origins: validAddresses.map((addr) => ({ lat: addr.lat, lng: addr.lng })),
        destinations: [{ lat: center.lat, lng: center.lng }],
        travelMode: window.google.maps.TravelMode.DRIVING,
      })

      // Calculate directions for each valid address
      const newAddresses = [...otherAddresses]
      const directionsPromises = validAddresses.map((addr, index) => calculateDirections(addr, center, index))

      const directionsResults = await Promise.all(directionsPromises)
      console.log({directionsResults, result})

      if(directionsResults) {
        for(let i = 0; i < directionsResults.length; i++) {
          const direction = directionsResults[i]
          console.log({direction})
          if (direction) {
            setDirections({routes: direction.routes, request: direction.request}, ROUTE_COLORS[i]);
          }
        }
      }

      setOtherAddresses(newAddresses)
    } catch (error) {
      console.error("Error calculating distances and directions:", error)
    }

    setIsCalculating(false)
  }, [otherAddresses, calculateDirections])

  console.log({isCalculating, otherAddresses })

  return (
    <>
      <button onClick={calculateDistances}>Calculate</button>
      <button onClick={() => performSearch('brunch')}>Search</button>
      <AdvancedMarker ref={markerRef} position={endurance}>
        <Pin background={'#FBBC04'} glyphColor={'#000'} borderColor={'#000'} />
      </AdvancedMarker>
      <AdvancedMarker ref={markerRef} position={george} />
      <AdvancedMarker ref={markerRef} position={sofien} />
      <AdvancedMarker ref={markerRef} position={bodunde} />
      <AdvancedMarker ref={markerRef} position={tj} />
      {/* <Directions origin={george} destination={center} /> */}
      {/* <Directions origin={endurance} destination={center} />
      <Directions origin={tj} destination={center} /> */}
    </>
  );
};


export default CustomMap;


