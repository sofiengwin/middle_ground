import {useEffect, useState} from 'react';

import {
  useMapsLibrary,
  useMap
} from '@vis.gl/react-google-maps';


const endurance = {lat: 49.19354056002209, lng: -122.79310430109112}
const center = {lat: 49.18140440608156, lng: -122.84811819468837}

function Directions({origin, destination}: {origin: google.maps.LatLngLiteral; destination: google.maps.LatLngLiteral}) {
  const map = useMap();
  const routesLibrary = useMapsLibrary('routes');
  const [directionsService, setDirectionsService] =
    useState<google.maps.DirectionsService>();
  const [directionsRenderer, setDirectionsRenderer] =
    useState<google.maps.DirectionsRenderer>();
  const [routes, setRoutes] = useState<google.maps.DirectionsRoute[]>([]);
  const [routeIndex, setRouteIndex] = useState(0);
  const selected = routes[routeIndex];
  const leg = selected?.legs[0];

  // Initialize directions service and renderer
  useEffect(() => {
    if (!routesLibrary || !map) return;
    setDirectionsService(new routesLibrary.DirectionsService());
    setDirectionsRenderer(
      new routesLibrary.DirectionsRenderer({
        draggable: true, // Only necessary for draggable markers
        map
      })
    );
  }, [routesLibrary, map]);

  // Add the following useEffect to make markers draggable
  useEffect(() => {
    if (!directionsRenderer) return;

    // Add the listener to update routes when directions change
    const listener = directionsRenderer.addListener(
      'directions_changed',
      () => {
        const result = directionsRenderer.getDirections();
        if (result) {
          setRoutes(result.routes);
        }
      }
    );

    return () => google.maps.event.removeListener(listener);
  }, [directionsRenderer]);

  // Use directions service
  useEffect(() => {
    if (!directionsService || !directionsRenderer) return;

    directionsService
      .route({
        origin: origin,
        destination: destination,
        travelMode: google.maps.TravelMode.DRIVING,
      })
      .then(response => {
        console.log({response});
        directionsRenderer.setDirections(response);
        setRoutes(response.routes);
      });

    // Second
    directionsService
      .route({
        origin: endurance,
        destination: center,
        travelMode: google.maps.TravelMode.DRIVING,
      })
      .then(response => {
        directionsRenderer.setDirections(response);
        setRoutes([...response.routes, ...routes]);
      });

    return () => directionsRenderer.setMap(null);
  }, [directionsService, directionsRenderer]);

  if (!leg) return null;

  return (
    <div className="directions">
      <h2>{selected.summary}</h2>
      <p>
        {leg.start_address.split(',')[0]} to {leg.end_address.split(',')[0]}
      </p>
      <p>Distance: {leg.distance?.text}</p>
      <p>Duration: {leg.duration?.text}</p>

      <h2>Other Routes</h2>
      <ul>
        {routes.map((route, index) => (
          <li key={route.summary}>
            <button onClick={() => setRouteIndex(index)}>
              {route.summary}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Directions;