import { useEffect, useState } from 'react';
import { useMapsLibrary, useMap } from '@vis.gl/react-google-maps';

export function useDirections() {
  const map = useMap();
  const routesLibrary = useMapsLibrary('routes');
  // const [directionsRenderer, setDirectionsRenderer] = useState<google.maps.DirectionsRenderer>();

  // useEffect(() => {
  //   if (!routesLibrary || !map) return;
  //   setDirectionsRenderer(
  //     new routesLibrary.DirectionsRenderer({
  //       draggable: true,
  //       map,
  //     })
  //   );
  // }, [routesLibrary, map]);

  return (direction: google.maps.DirectionsResult) => {
    if (!routesLibrary || !map) return;
    const directionsRenderer =  new routesLibrary.DirectionsRenderer({
      draggable: true,
      map,
    })
    directionsRenderer.setDirections(direction);
  }
}

// directionsRenderer.setDirections(response);