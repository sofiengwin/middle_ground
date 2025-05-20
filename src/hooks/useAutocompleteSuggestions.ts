import {useEffect, useRef, useState} from 'react';
import { useMapsLibrary } from "@vis.gl/react-google-maps";

export type UseAutocompleteSuggestionsReturn = {
  suggestions: google.maps.places.AutocompleteSuggestion[];
  isLoading: boolean;
  resetSession: () => void;
};

export function useAutocompleteSuggestions(
  inputString: string,
  requestOptions: Partial<google.maps.places.AutocompleteRequest> = {}
): UseAutocompleteSuggestionsReturn {
  const placesLib = useMapsLibrary('places');

  // stores the current sessionToken
  const sessionTokenRef =
    useRef<google.maps.places.AutocompleteSessionToken | null>(null);

  // the suggestions based on the specified input
  const [suggestions, setSuggestions] = useState<
    google.maps.places.AutocompleteSuggestion[]
  >([]);

  // indicates if there is currently an incomplete request to the places API
  const [isLoading, setIsLoading] = useState(false);

  // once the PlacesLibrary is loaded and whenever the input changes, a query
  // is sent to the Autocomplete Data API.
  useEffect(() => {
    if (!placesLib) return;

    const {AutocompleteSessionToken, AutocompleteSuggestion} = placesLib;

    // Create a new session if one doesn't already exist. This has to be reset
    // after `fetchFields` for one of the returned places is called by calling
    // the `resetSession` function returned from this hook.
    if (!sessionTokenRef.current) {
      sessionTokenRef.current = new AutocompleteSessionToken();
    }

    const request: google.maps.places.AutocompleteRequest = {
      ...requestOptions,
      input: inputString,
      sessionToken: sessionTokenRef.current
    };

    if (inputString === '') {
      if (suggestions.length > 0) setSuggestions([]);
      return;
    }

    setIsLoading(true);
    AutocompleteSuggestion.fetchAutocompleteSuggestions(request).then(res => {
      setSuggestions(res.suggestions);
      setIsLoading(false);
    });
  }, [placesLib, inputString]);

  return {
    suggestions,
    isLoading,
    resetSession: () => {
      sessionTokenRef.current = null;
      setSuggestions([]);
    }
  };
}