import React, { useState } from 'react';
import {
  Command,
  CommandItem,
  CommandList,
  // CommandInput,
  CommandEmpty,
} from '@/components/ui/command';
import TextInput from './TextInput';
import { useAutocompleteSuggestions } from '@/hooks/useAutocompleteSuggestions';

interface ComboboxProps {
  onSelect: (suggestion: google.maps.places.AutocompleteSuggestion) => void;
  label: string;
  currentAddress?: string;
}

export default function Combobox({
  onSelect,
  label,
  currentAddress
}: ComboboxProps) {
  const [location, setLocation] = useState('');
  const {suggestions} = useAutocompleteSuggestions(location, {})

  const placeholder = 'Select an option'

  if(currentAddress == location) {
    return (
      <Command>
        <TextInput
          placeholder={placeholder}
          type='text'
          label={label}
          value={location}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setLocation(e.target.value)}
        />
      </Command>
    );
  } else {
    return (
      <Command>
        <TextInput
          placeholder={placeholder}
          type='text'
          label={label}
          value={location}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setLocation(e.target.value)}
        />
        <CommandList>
          {suggestions.length === 0 ? (
            <CommandEmpty>No results found.</CommandEmpty>
          ) : (
            suggestions.map((suggestion, index) => {
              return (
              <CommandItem
                key={index}
                onSelect={(value) => {
                  setLocation(value)
                  onSelect(suggestion)
                }}
              >
                {suggestion.placePrediction?.text.text}
              </CommandItem>
            )})
          )}
        </CommandList>
      </Command>
    );
  }

}