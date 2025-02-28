import { useMapsLibrary, useMap } from '@vis.gl/react-google-maps';

export function useDirections() {
  const map = useMap();
  const routesLibrary = useMapsLibrary('routes');

  return (direction: google.maps.DirectionsResult, color: string) => {
    if (!routesLibrary || !map) return;
    const directionsRenderer =  new routesLibrary.DirectionsRenderer({
      draggable: true,
      map,
      polylineOptions: {
        strokeColor: color,
        strokeWeight: 10
      }
    })
    directionsRenderer.setDirections(direction);
  }
}
