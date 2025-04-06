
export default function useSearchPlaces(searchQuery: string) {
  const service = new window.google.maps.places.PlacesService(document.createElement("div"))

  const performSearch = (location = null) => {
    const request = location
      ? {
          location,
          radius: 5000, // 5km radius
          query: searchQuery,
        }
      : { query: searchQuery }

    service.textSearch(request, (results, status) => {
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
