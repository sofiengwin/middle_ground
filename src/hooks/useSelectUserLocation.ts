import { useMapsLibrary } from "@vis.gl/react-google-maps";
import { useCallback } from "react";


export default function useSelectUserLocation() {
  const places = useMapsLibrary('places');
  return useCallback(
    async (suggestion: google.maps.places.AutocompleteSuggestion, resetSession: () => void) => {
      if (!places) return;
      if (!suggestion.placePrediction) return;

      const place = suggestion.placePrediction.toPlace();

      await place.fetchFields({
        fields: [
          'location'
        ]
      });

      // setInputValue('');

      // calling fetchFields invalidates the session-token, so we now have to call
      // resetSession() so a new one gets created for further search
      resetSession();

      // onPlaceSelect(place);
    },
    [places]
  );
}