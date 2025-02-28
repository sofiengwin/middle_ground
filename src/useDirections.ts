import { useMapsLibrary, useMap } from '@vis.gl/react-google-maps';

export function useDirections() {
  const map = useMap();
  const routesLibrary = useMapsLibrary('routes');

  return (direction: google.maps.DirectionsResult) => {
    if (!routesLibrary || !map) return;
    const directionsRenderer =  new routesLibrary.DirectionsRenderer({
      draggable: true,
      map,
    })
    directionsRenderer.setDirections(direction);
  }
}
