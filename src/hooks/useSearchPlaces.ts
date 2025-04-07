import { useMapsLibrary } from "@vis.gl/react-google-maps";
import { useMemo } from "react";

export default function useSearchPlaces(searchQuery: string) {
  // const placesLibrary = useMapsLibrary('places');
  // console.log("Places library:", placesLibrary)
  // if (!placesLibrary) {
  //   throw("Places library not loaded")
  // }

  // const service = new placesLibrary.PlacesService(x)

  const placesLibrary = useMapsLibrary('places');
  const placesService = useMemo(
    () => placesLibrary && new placesLibrary.PlacesService(document.createElement("div")),
    [placesLibrary]
  );

  const performSearch = (location = null) => {
    
    const request = location
      ? {
          location,
          radius: 5000, // 5km radius
          query: searchQuery,
        }
      : { query: searchQuery }

    if (!placesService) {
      console.error("PlacesService not initialized")
      return
    }

    placesService.textSearch(request, (results, status) => {
      console.log({results, status})
      if (status === window.google.maps.places.PlacesServiceStatus.OK && results) {
        const topResults = results.slice(0, 10).map((place) => ({
          address: place.formatted_address || "",
          lat: place.geometry?.location?.lat() || 0,
          lng: place.geometry?.location?.lng() || 0,
          placeId: place.place_id,
          name: place.name,
          rating: place.rating,
          vicinity: place.vicinity,
        }))
        console.log("Search results:", topResults)
        // setSearchResults(topResults)

        // Don't change the map center, just adjust zoom if needed
        // if (topResults.length > 0) {
        //   setMapZoom(13) // Adjust zoom to show results better
        // }
      } else {
        console.error("Places search failed:", status)
        // setSearchResults([])
      }
      // setIsSearching(false)
    })
  }

  return { performSearch }
}


// const { library: placesLibrary, loading, error } = useMapsLibrary('places');

// React.useEffect(() => {
//     if (!loading && placesLibrary) {
//         console.log('Places library loaded:', placesLibrary);
//     }
// }, [loading, placesLibrary]);