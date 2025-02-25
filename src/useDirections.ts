import { useEffect, useState } from 'react';
import { useMapsLibrary, useMap } from '@vis.gl/react-google-maps';

export function useDirections() {
  const map = useMap();
  const routesLibrary = useMapsLibrary('routes');
  const [directionsRenderer, setDirectionsRenderer] = useState<google.maps.DirectionsRenderer>();

  useEffect(() => {
    if (!routesLibrary || !map) return;
    setDirectionsRenderer(
      new routesLibrary.DirectionsRenderer({
        draggable: true,
        map,
      })
    );
  }, [routesLibrary, map]);

  return { directionsRenderer };
}

// directionsRenderer.setDirections(response);