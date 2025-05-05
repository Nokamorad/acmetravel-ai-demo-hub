import React, { useState } from 'react';
import AppLayout from "@/components/layout/AppLayout";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CitySearchInput from "@/components/BookTrip/CitySearchInput";
import { 
  PlaneIcon, 
  HotelIcon, 
  CalendarIcon, 
  SearchIcon,
  TrainIcon,
  CarIcon,
  InfoIcon,
  ChevronDownIcon
} from "lucide-react";

interface CityData {
  city: string;
  code: string;
}

const BookTrip = () => {
  const [tripType, setTripType] = useState('business');
  const [originCity, setOriginCity] = useState<CityData | null>(null);
  const [destinationCity, setDestinationCity] = useState<CityData | null>(null);
  
  return (
    <AppLayout>
      <div className="max-w-5xl mx-auto px-4 py-6">
        <h1 className="text-2xl font-bold text-acme-gray-dark mb-6">Book a trip</h1>
        
        {/* Trip Type Selection */}
        <div className="mb-6">
          <div className="inline-flex rounded-md border border-gray-200 p-1 bg-white">
            <button
              onClick={() => setTripType('business')}
              className={`px-4 py-1.5 text-sm font-medium rounded-md ${
                tripType === 'business' ? 'bg-acme-purple text-white' : 'text-gray-700'
              }`}
              data-pendo-id="trip-type-business"
            >
              Business travel
            </button>
            <button
              onClick={() => setTripType('personal')}
              className={`px-4 py-1.5 text-sm font-medium rounded-md ${
                tripType === 'personal' ? 'bg-acme-purple text-white' : 'text-gray-700'
              }`}
              data-pendo-id="trip-type-personal"
            >
              Personal travel
            </button>
          </div>
        </div>
        
        {/* Travel Options Tabs */}
        <Tabs defaultValue="flights" className="mb-6">
          <TabsList className="bg-white border-b border-gray-200 w-full justify-start mb-0 p-0 h-auto rounded-none gap-0">
            <TabsTrigger 
              value="flights" 
              className="data-[state=active]:border-b-2 data-[state=active]:border-acme-purple data-[state=active]:text-acme-purple data-[state=active]:shadow-none rounded-none px-6 py-3"
              data-pendo-id="travel-tab-flights"
            >
              <PlaneIcon className="h-4 w-4 mr-2" />
              Flights
            </TabsTrigger>
            <TabsTrigger 
              value="hotels" 
              className="data-[state=active]:border-b-2 data-[state=active]:border-acme-purple data-[state=active]:text-acme-purple data-[state=active]:shadow-none rounded-none px-6 py-3"
              data-pendo-id="travel-tab-hotels"
            >
              <HotelIcon className="h-4 w-4 mr-2" />
              Hotels
            </TabsTrigger>
            <TabsTrigger 
              value="trains" 
              className="data-[state=active]:border-b-2 data-[state=active]:border-acme-purple data-[state=active]:text-acme-purple data-[state=active]:shadow-none rounded-none px-6 py-3"
              data-pendo-id="travel-tab-trains"
            >
              <TrainIcon className="h-4 w-4 mr-2" />
              Trains
            </TabsTrigger>
            <TabsTrigger 
              value="cars" 
              className="data-[state=active]:border-b-2 data-[state=active]:border-acme-purple data-[state=active]:text-acme-purple data-[state=active]:shadow-none rounded-none px-6 py-3"
              data-pendo-id="travel-tab-cars"
            >
              <CarIcon className="h-4 w-4 mr-2" />
              Rental cars
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="flights" className="mt-4">
            <Card className="border shadow-sm p-6">
              <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
                <div className="lg:col-span-2">
                  <label className="block text-sm font-medium mb-1">From</label>
                  <CitySearchInput 
                    placeholder="Enter origin city or airport"
                    icon={PlaneIcon} 
                    dataPendoId="flight-origin"
                    onSelect={setOriginCity}
                  />
                </div>
                
                <div className="lg:col-span-2">
                  <label className="block text-sm font-medium mb-1">To</label>
                  <CitySearchInput 
                    placeholder="Enter destination city or airport"
                    icon={PlaneIcon} 
                    dataPendoId="flight-destination"
                    onSelect={setDestinationCity}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">Trip type</label>
                  <div className="relative">
                    <select className="w-full h-10 pl-3 pr-8 border border-gray-300 rounded-md bg-white text-sm focus:ring-2 focus:ring-acme-purple focus:border-acme-purple">
                      <option>Round-trip</option>
                      <option>One-way</option>
                      <option>Multi-city</option>
                    </select>
                    <ChevronDownIcon className="absolute right-3 top-2.5 h-4 w-4 text-gray-500" />
                  </div>
                </div>
                
                <div className="lg:col-span-2">
                  <label className="block text-sm font-medium mb-1">Depart date</label>
                  <div className="relative">
                    <CalendarIcon className="absolute left-3 top-2.5 h-4 w-4 text-gray-500" />
                    <Input 
                      type="date" 
                      placeholder="mm/dd/yyyy"
                      className="pl-10 bg-white"
                      data-pendo-id="flight-depart-date"
                    />
                  </div>
                </div>
                
                <div className="lg:col-span-2">
                  <label className="block text-sm font-medium mb-1">Return date</label>
                  <div className="relative">
                    <CalendarIcon className="absolute left-3 top-2.5 h-4 w-4 text-gray-500" />
                    <Input 
                      type="date" 
                      placeholder="mm/dd/yyyy"
                      className="pl-10 bg-white"
                      data-pendo-id="flight-return-date"
                    />
                  </div>
                </div>
                
                <div className="lg:col-span-1">
                  <label className="block text-sm font-medium mb-1">Passengers</label>
                  <div className="relative">
                    <select className="w-full h-10 pl-3 pr-8 border border-gray-300 rounded-md bg-white text-sm focus:ring-2 focus:ring-acme-purple focus:border-acme-purple">
                      <option>1 passenger</option>
                      <option>2 passengers</option>
                      <option>3 passengers</option>
                      <option>4 passengers</option>
                    </select>
                    <ChevronDownIcon className="absolute right-3 top-2.5 h-4 w-4 text-gray-500" />
                  </div>
                </div>
              </div>
              
              <div className="flex items-center mt-4">
                <input type="checkbox" id="nonstop" className="mr-2" />
                <label htmlFor="nonstop" className="text-sm">Nonstop flights only</label>
              </div>
              
              <div className="mt-6 flex justify-end">
                <Button 
                  className="bg-sky-blue hover:bg-sky-blue/90 text-white px-8"
                  data-pendo-id="search-flights"
                >
                  <SearchIcon className="mr-2 h-4 w-4" />
                  Search flights
                </Button>
              </div>
            </Card>
            
            {/* Policy Information */}
            <div className="mt-4 bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex items-start">
                <InfoIcon className="h-5 w-5 text-blue-500 mr-3 mt-0.5" />
                <div>
                  <h3 className="font-medium text-blue-800">Your flight booking policy</h3>
                  <p className="text-sm text-blue-700 mt-1">
                    Business class is allowed for flights over 6 hours. For all other flights, economy class is required by your company policy.
                  </p>
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="hotels">
            <Card className="border shadow-sm p-6">
              <p className="text-center text-gray-500">Hotel booking functionality would be implemented here.</p>
              <div className="mt-6 flex justify-end">
                <Button 
                  className="bg-sky-blue hover:bg-sky-blue/90 text-white px-8"
                  data-pendo-id="search-hotels"
                >
                  <SearchIcon className="mr-2 h-4 w-4" />
                  Search hotels
                </Button>
              </div>
            </Card>
          </TabsContent>
          
          <TabsContent value="trains">
            <Card className="border shadow-sm p-6">
              <p className="text-center text-gray-500">Train booking functionality would be implemented here.</p>
              <div className="mt-6 flex justify-end">
                <Button 
                  className="bg-sky-blue hover:bg-sky-blue/90 text-white px-8"
                  data-pendo-id="search-trains"
                >
                  <SearchIcon className="mr-2 h-4 w-4" />
                  Search trains
                </Button>
              </div>
            </Card>
          </TabsContent>
          
          <TabsContent value="cars">
            <Card className="border shadow-sm p-6">
              <p className="text-center text-gray-500">Car rental functionality would be implemented here.</p>
              <div className="mt-6 flex justify-end">
                <Button 
                  className="bg-sky-blue hover:bg-sky-blue/90 text-white px-8"
                  data-pendo-id="search-cars"
                >
                  <SearchIcon className="mr-2 h-4 w-4" />
                  Search cars
                </Button>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
        
        {/* Recent Searches Section */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-acme-gray-dark mb-3">Your recent searches</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card className="border shadow-sm p-4">
              <div className="flex justify-between items-center">
                <div>
                  <div className="flex items-center">
                    <span className="text-sm font-medium">SFO → NYC</span>
                    <span className="mx-2 text-gray-400">•</span>
                    <span className="text-xs text-gray-500">May 15 - May 20</span>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">1 passenger, Economy</p>
                </div>
                <Button 
                  variant="outline" 
                  size="sm"
                  className="text-xs"
                >
                  Search again
                </Button>
              </div>
            </Card>
            
            <Card className="border shadow-sm p-4">
              <div className="flex justify-between items-center">
                <div>
                  <div className="flex items-center">
                    <span className="text-sm font-medium">LAX → MIA</span>
                    <span className="mx-2 text-gray-400">•</span>
                    <span className="text-xs text-gray-500">Apr 5 - Apr 10</span>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">1 passenger, Economy</p>
                </div>
                <Button 
                  variant="outline" 
                  size="sm"
                  className="text-xs"
                >
                  Search again
                </Button>
              </div>
            </Card>
          </div>
        </div>
        
        {/* Travel Agent Help Card */}
        <Card className="border shadow-sm p-4 bg-acme-purple/5">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="bg-acme-purple rounded-full p-2 mr-3">
                <PlaneIcon className="h-4 w-4 text-white" />
              </div>
              <div>
                <h3 className="font-medium text-acme-gray-dark">Need help with your booking?</h3>
                <p className="text-sm text-gray-600">Travel Agent can assist with finding the best flights and accommodations.</p>
              </div>
            </div>
            <Button 
              className="bg-acme-pink hover:bg-opacity-90 text-white whitespace-nowrap"
              data-pendo-id="chat-with-travel-agent"
            >
              Ask Travel Agent
            </Button>
          </div>
        </Card>
      </div>
    </AppLayout>
  );
};

export default BookTrip;
