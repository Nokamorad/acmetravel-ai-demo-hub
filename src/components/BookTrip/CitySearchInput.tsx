
import React, { useState, useEffect, useRef } from 'react';
import { Input } from "@/components/ui/input";
import { Command, CommandInput, CommandList, CommandEmpty, CommandGroup, CommandItem } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { LucideIcon } from "lucide-react";

// Common airport data with codes
const airportData = [
  { city: "San Francisco", code: "SFO", country: "USA" },
  { city: "San Diego", code: "SAN", country: "USA" },
  { city: "San Antonio", code: "SAT", country: "USA" },
  { city: "San Jose", code: "SJC", country: "USA" },
  { city: "Sacramento", code: "SMF", country: "USA" },
  { city: "Seattle", code: "SEA", country: "USA" },
  { city: "New York", code: "JFK", country: "USA" },
  { city: "New York", code: "LGA", country: "USA" },
  { city: "Los Angeles", code: "LAX", country: "USA" },
  { city: "Chicago", code: "ORD", country: "USA" },
  { city: "Dallas", code: "DFW", country: "USA" },
  { city: "Denver", code: "DEN", country: "USA" },
  { city: "Boston", code: "BOS", country: "USA" },
  { city: "Atlanta", code: "ATL", country: "USA" },
  { city: "Miami", code: "MIA", country: "USA" },
  { city: "Washington", code: "DCA", country: "USA" },
  { city: "Washington", code: "IAD", country: "USA" },
  { city: "London", code: "LHR", country: "UK" },
  { city: "Paris", code: "CDG", country: "France" },
  { city: "Tokyo", code: "NRT", country: "Japan" },
];

interface CitySearchInputProps {
  placeholder: string;
  icon: LucideIcon;
  dataPendoId?: string;
  onSelect: (value: { city: string; code: string }) => void;
  initialValue?: string; // Add the initialValue prop to the interface
}

const CitySearchInput: React.FC<CitySearchInputProps> = ({
  placeholder,
  icon: Icon,
  dataPendoId,
  onSelect,
  initialValue = "", // Default to empty string if not provided
}) => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(initialValue); // Initialize with the initialValue
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredAirports, setFilteredAirports] = useState(airportData);
  const triggerRef = useRef<HTMLButtonElement>(null);

  // Update value when initialValue changes
  useEffect(() => {
    if (initialValue) {
      setValue(initialValue);
    }
  }, [initialValue]);

  useEffect(() => {
    if (searchQuery) {
      const filtered = airportData.filter(airport =>
        airport.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
        airport.code.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredAirports(filtered);
    } else {
      setFilteredAirports(airportData);
    }
  }, [searchQuery]);

  const handleSelect = (airport: typeof airportData[0]) => {
    setValue(`${airport.city} (${airport.code})`);
    onSelect({ city: airport.city, code: airport.code });
    setOpen(false);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild ref={triggerRef}>
        <button className="w-full relative" data-pendo-id={dataPendoId}>
          <div className="absolute left-3 top-2.5 text-gray-500">
            <Icon className="h-4 w-4" />
          </div>
          <Input
            placeholder={placeholder}
            className="pl-10 bg-white"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onClick={() => setOpen(true)}
          />
        </button>
      </PopoverTrigger>
      <PopoverContent className="p-0 w-[300px]" align="start">
        <Command>
          <CommandInput 
            placeholder={`Search ${placeholder.toLowerCase()}`}
            value={searchQuery}
            onValueChange={setSearchQuery}
            className="h-9"
          />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup>
              {filteredAirports.map((airport) => (
                <CommandItem
                  key={`${airport.city}-${airport.code}`}
                  value={`${airport.city} ${airport.code}`}
                  onSelect={() => handleSelect(airport)}
                  className="cursor-pointer"
                >
                  <span className="font-medium">{airport.city}</span>
                  <span className="text-gray-500 ml-1">({airport.code})</span>
                  <span className="text-xs text-gray-400 ml-auto">{airport.country}</span>
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default CitySearchInput;
