
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CalendarIcon, PlaneIcon, SearchIcon, MapPinIcon, ClockIcon } from "lucide-react";
import AppLayout from "@/components/layout/AppLayout";
import { useToast } from "@/hooks/use-toast";

const BookTrip = () => {
  const { toast } = useToast();
  const [searchCompleted, setSearchCompleted] = useState(false);
  const [selectedTab, setSelectedTab] = useState("flights");
  const [searchParams, setSearchParams] = useState({
    origin: "",
    destination: "",
    departDate: "",
    returnDate: ""
  });
  
  // Handle input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSearchParams({
      ...searchParams,
      [name]: value
    });
  };
  
  // Simulate search functionality
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Frustration test - clicking search button multiple times fast
    if (searchCompleted) {
      toast({
        title: "Searching...",
        description: "Please wait while we find options for you.",
      });
      return;
    }
    
    // Basic validation
    if (!searchParams.origin || !searchParams.destination || !searchParams.departDate) {
      toast({
        title: "Missing information",
        description: "Please fill out all required fields.",
        variant: "destructive"
      });
      return;
    }
    
    toast({
      title: "Finding the best options",
      description: "Searching across multiple airlines...",
    });
    
    // Simulate search delay
    setTimeout(() => {
      setSearchCompleted(true);
    }, 1500);
  };
  
  // Book selected option and go to trip summary
  const bookFlight = () => {
    toast({
      title: "Flight booked successfully!",
      description: "Your flight has been added to your itinerary.",
    });
    
    // In production, this would use a proper router push
    setTimeout(() => {
      window.location.href = "/trip";
    }, 1500);
  };
  
  return (
    <AppLayout>
      <div className="max-w-6xl mx-auto">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-acme-gray-dark">Book Your Trip</h1>
          <p className="text-gray-500">Search for flights, hotels, and more</p>
        </div>
        
        {/* Search Form - Pendo Target Area */}
        <Card className="mb-8" data-pendo-id="booking-search-card">
          <CardHeader className="pb-3">
            <Tabs 
              defaultValue="flights" 
              onValueChange={setSelectedTab}
              className="w-full"
            >
              <TabsList className="grid grid-cols-2 mb-4">
                <TabsTrigger value="flights" data-pendo-id="tab-flights">
                  <PlaneIcon className="w-4 h-4 mr-2" />
                  Flights
                </TabsTrigger>
                <TabsTrigger value="hotels" data-pendo-id="tab-hotels">
                  <MapPinIcon className="w-4 h-4 mr-2" />
                  Hotels
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="flights">
                <form onSubmit={handleSearch} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="origin">Origin</Label>
                      <Input
                        id="origin"
                        name="origin"
                        value={searchParams.origin}
                        onChange={handleInputChange}
                        placeholder="City or airport code"
                        data-pendo-id="input-origin"
                      />
                    </div>
                    <div>
                      <Label htmlFor="destination">Destination</Label>
                      <Input
                        id="destination"
                        name="destination"
                        value={searchParams.destination}
                        onChange={handleInputChange}
                        placeholder="City or airport code"
                        data-pendo-id="input-destination"
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="departDate">Departure Date</Label>
                      <div className="relative">
                        <Input
                          id="departDate"
                          name="departDate"
                          type="date"
                          value={searchParams.departDate}
                          onChange={handleInputChange}
                          data-pendo-id="input-depart-date"
                        />
                        <CalendarIcon className="absolute right-3 top-3 h-4 w-4 text-gray-400" />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="returnDate">Return Date (Optional)</Label>
                      <div className="relative">
                        <Input
                          id="returnDate"
                          name="returnDate"
                          type="date"
                          value={searchParams.returnDate}
                          onChange={handleInputChange}
                          data-pendo-id="input-return-date"
                        />
                        <CalendarIcon className="absolute right-3 top-3 h-4 w-4 text-gray-400" />
                      </div>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <Button 
                      type="submit"
                      className="bg-acme-purple hover:bg-acme-purple-dark text-white"
                      data-pendo-id="search-flights-button"
                    >
                      <SearchIcon className="mr-2 h-4 w-4" />
                      Search Flights
                    </Button>
                  </div>
                </form>
              </TabsContent>
              
              <TabsContent value="hotels">
                <form onSubmit={handleSearch} className="space-y-4">
                  <div>
                    <Label htmlFor="destination">Destination</Label>
                    <Input
                      id="destination"
                      name="destination"
                      value={searchParams.destination}
                      onChange={handleInputChange}
                      placeholder="City or hotel name"
                      data-pendo-id="input-hotel-destination"
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="checkIn">Check-in Date</Label>
                      <div className="relative">
                        <Input
                          id="checkIn"
                          name="departDate"
                          type="date"
                          value={searchParams.departDate}
                          onChange={handleInputChange}
                          data-pendo-id="input-checkin-date"
                        />
                        <CalendarIcon className="absolute right-3 top-3 h-4 w-4 text-gray-400" />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="checkOut">Check-out Date</Label>
                      <div className="relative">
                        <Input
                          id="checkOut"
                          name="returnDate"
                          type="date"
                          value={searchParams.returnDate}
                          onChange={handleInputChange}
                          data-pendo-id="input-checkout-date"
                        />
                        <CalendarIcon className="absolute right-3 top-3 h-4 w-4 text-gray-400" />
                      </div>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <Button 
                      type="submit"
                      className="bg-acme-purple hover:bg-acme-purple-dark text-white"
                      data-pendo-id="search-hotels-button"
                    >
                      <SearchIcon className="mr-2 h-4 w-4" />
                      Search Hotels
                    </Button>
                  </div>
                </form>
              </TabsContent>
            </Tabs>
          </CardHeader>
        </Card>
        
        {/* Search Results - Pendo Target Area for Upsell */}
        {searchCompleted && (
          <div data-pendo-id="search-results">
            <h2 className="text-xl font-semibold mb-4">
              {selectedTab === 'flights' ? 'Available Flights' : 'Available Hotels'}
            </h2>
            
            <div className="space-y-4">
              {/* Flight Result Card - Rage Click Test Zone */}
              <Card 
                className="border hover:border-acme-purple transition-colors"
                data-pendo-id="flight-result-1"
              >
                <CardContent className="pt-6">
                  <div className="flex flex-col md:flex-row justify-between">
                    <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
                      <div className="bg-gray-100 p-3 rounded-full">
                        <PlaneIcon className="h-6 w-6 text-acme-purple" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg">San Francisco to New York</h3>
                        <div className="flex flex-col sm:flex-row sm:items-center text-sm text-gray-500 gap-2 sm:gap-4 mt-1">
                          <div className="flex items-center">
                            <CalendarIcon className="h-4 w-4 mr-1" />
                            May 15, 2025
                          </div>
                          <div className="flex items-center">
                            <ClockIcon className="h-4 w-4 mr-1" />
                            6:30 AM - 2:45 PM
                          </div>
                          <div>
                            Non-stop · 5h 15m
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-4 md:mt-0 flex flex-col items-end">
                      <span className="text-2xl font-bold text-acme-gray-dark">$549</span>
                      <span className="text-sm text-gray-500">Economy</span>
                      <Button 
                        className="mt-3 bg-acme-purple hover:bg-acme-purple-dark text-white"
                        onClick={bookFlight}
                        data-pendo-id="book-flight-button"
                      >
                        Book Now
                      </Button>
                    </div>
                  </div>
                  
                  {/* Optional Upsell Area for Pendo Experiments */}
                  {selectedTab === 'flights' && (
                    <div 
                      className="mt-6 pt-4 border-t border-gray-100"
                      data-pendo-id="flight-upsell-area"
                    >
                      <p className="text-sm text-acme-pink flex items-center">
                        <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v3.586L7.707 9.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 10.586V7z" clipRule="evenodd" />
                        </svg>
                        Find a hotel near your destination?
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
              
              {/* Additional Result Cards */}
              <Card 
                className="border opacity-60"
                data-pendo-id="flight-result-2"
              >
                <CardContent className="pt-6">
                  <div className="flex flex-col md:flex-row justify-between">
                    <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
                      <div className="bg-gray-100 p-3 rounded-full">
                        <PlaneIcon className="h-6 w-6 text-gray-400" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg">San Francisco to New York</h3>
                        <div className="flex flex-col sm:flex-row sm:items-center text-sm text-gray-500 gap-2 sm:gap-4 mt-1">
                          <div className="flex items-center">
                            <CalendarIcon className="h-4 w-4 mr-1" />
                            May 15, 2025
                          </div>
                          <div className="flex items-center">
                            <ClockIcon className="h-4 w-4 mr-1" />
                            8:15 AM - 5:20 PM
                          </div>
                          <div>
                            1 stop · 7h 05m
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-4 md:mt-0 flex flex-col items-end">
                      <span className="text-2xl font-bold text-acme-gray-dark">$489</span>
                      <span className="text-sm text-gray-500">Economy</span>
                      <Button 
                        variant="outline"
                        className="mt-3"
                        data-pendo-id="book-flight-button-2"
                      >
                        Book Now
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </div>
    </AppLayout>
  );
};

export default BookTrip;
