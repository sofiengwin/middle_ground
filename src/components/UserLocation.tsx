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
  onSelect: (value: string) => void;
  label: string;
}

export default function Combobox({
  onSelect,
  label
}: ComboboxProps) {
  const [location, setLocation] = useState('');
  const {suggestions, isLoading, resetSession} = useAutocompleteSuggestions(location, {})
  console.log({suggestions, isLoading, resetSession})

  const filteredSuggestions = Array(10).fill(1)
  // const filteredSuggestions = suggestions.filter((item) =>
  //   item.toLowerCase().includes(filter.toLowerCase())
  // );
  const placeholder = 'Select an option'

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
        {filteredSuggestions.length === 0 ? (
          <CommandEmpty>No results found.</CommandEmpty>
        ) : (
          suggestions.map((suggestion, index) => (
            <CommandItem
              key={index}
              onSelect={(value) => {
                console.log('Selected value:', value);
                onSelect(value)
              }}
            >
              {suggestion.placePrediction?.text.text}
            </CommandItem>
          ))
        )}
      </CommandList>
    </Command>
  );
}