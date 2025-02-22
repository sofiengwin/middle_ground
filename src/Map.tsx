import {APIProvider, Map, AdvancedMarker, useAdvancedMarkerRef, Pin} from '@vis.gl/react-google-maps';
import {useCallback, useEffect, useState} from 'react';
import Directions from './Directions';

const API_KEY: string = "AIzaSyCC-eTNbPrglZ_DviSFac6Qi-Mep6vI6gs"
const george = {lat: 49.204542571381296, lng: -122.90846930109086}
const sofien = {lat: 49.107051518586125, lng: -122.80181147410804}
const bodunde = {lat: 49.200849440419006, lng: -122.91437387225514}
const tj = {lat: 49.276060472781246, lng: -122.82504594341755}
const endurance = {lat: 49.19354056002209, lng: -122.79310430109112}
const center = {lat: 49.18140440608156, lng: -122.84811819468837}

// Array of colors for different routes
// const ROUTE_COLORS = [
//   "#FF0000",
//   "#00FF00",
//   "#0000FF",
//   "#FFA500",
//   "#800080",
//   "#008080",
//   "#FF69B4",
//   "#4B0082",
//   "#FF4500",
//   "#2E8B57",
// ]

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
  const [otherAddresses, setOtherAddresses] = useState<Location[]>(Array(10).fill({ address: "", lat: 0, lng: 0 }))
  const [isCalculating, setIsCalculating] = useState(false)
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

    const validAddresses = otherAddresses.filter((addr) => addr.address)
    if (validAddresses.length === 0) {
      setIsCalculating(false)
      return
    }

    try {
      // Calculate distances
      const result = await service.getDistanceMatrix({
        origins: validAddresses.map((addr) => ({ lat: addr.lat, lng: addr.lng })),
        destinations: [{ lat: selectedPlace.lat, lng: selectedPlace.lng }],
        travelMode: window.google.maps.TravelMode.DRIVING,
      })

      // Calculate directions for each valid address
      const newAddresses = [...otherAddresses]
      const directionsPromises = validAddresses.map((addr, index) => calculateDirections(addr, selectedPlace, index))

      const directionsResults = await Promise.all(directionsPromises)

      let validIndex = 0
      newAddresses.forEach((addr, index) => {
        if (addr.address) {
          if (result.rows[validIndex].elements[0].status === "OK") {
            newAddresses[index] = {
              ...newAddresses[index],
              distance: result.rows[validIndex].elements[0].distance.text,
              directions: directionsResults[validIndex],
            }
          }
          validIndex++
        }
      })

      setOtherAddresses(newAddresses)
    } catch (error) {
      console.error("Error calculating distances and directions:", error)
    }

    setIsCalculating(false)
  }, [otherAddresses, calculateDirections])



  // const markerIcon = (color: string) => ({
  //   path: "M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5S10.62 6.5 12 6.5s2.5 1.12 2.5 2.5S13.38 11.5 12 11.5z",
  //   fillColor: color,
  //   fillOpacity: 1,
  //   strokeWeight: 0,
  //   scale: 2,
  // });
  console.log({isCalculating, otherAddresses })

  return (
    <>
      <button onClick={calculateDistances}>Calculate</button>
      <APIProvider apiKey={API_KEY}>
        <Map
          zoom={12}
          center={center}
          style={{width: '100vw', height: '100vh'}}
          mapId="map"
        >
          <AdvancedMarker ref={markerRef} position={endurance}>
            <Pin background={'#FBBC04'} glyphColor={'#000'} borderColor={'#000'} />
          </AdvancedMarker>
          <AdvancedMarker ref={markerRef} position={george} />
          <AdvancedMarker ref={markerRef} position={sofien} />
          <AdvancedMarker ref={markerRef} position={bodunde} />
          <AdvancedMarker ref={markerRef} position={tj} />
          <Directions origin={george} destination={center} />
        </Map>

        {/* <InfoWindow
          anchor={marker}
          pixelOffset={[0, -2]}
          onCloseClick={() => {}}>
          <h2>Marker {}</h2>
          <p>Some arbitrary html to be rendered into the InfoWindow.</p>
        </InfoWindow> */}
      </APIProvider>
    </>
  );
};


export default CustomMap;


