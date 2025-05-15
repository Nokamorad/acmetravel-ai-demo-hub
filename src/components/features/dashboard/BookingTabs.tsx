import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PlaneIcon, HotelIcon, CarIcon, TrainIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { toast } from "@/hooks/use-toast";
import CitySearchInput from "@/components/BookTrip/CitySearchInput";
interface CityData {
  city: string;
  code: string;
}
const BookingTabs = () => {
  const [departDate, setDepartDate] = useState<Date>();
  const [returnDate, setReturnDate] = useState<Date>();
  const [originCity, setOriginCity] = useState<CityData | null>(null);
  const [destinationCity, setDestinationCity] = useState<CityData | null>(null);
  const handleFlightSearch = () => {
    if (!originCity || !destinationCity) {
      toast({
        title: "Missing Information",
        description: "Please select both origin and destination cities.",
        variant: "destructive"
      });
      return;
    }
    if (!departDate) {
      toast({
        title: "Missing Information",
        description: "Please select a departure date.",
        variant: "destructive"
      });
      return;
    }
    toast({
      title: "Searching for flights",
      description: `Looking for flights from ${originCity.city} to ${destinationCity.city}`
    });
  };
  return <Tabs defaultValue="flights" className="w-full">
      <CardHeader className="pb-0">
        <CardTitle className="text-lg">Book Travel</CardTitle>
        <TabsList className="mt-2 bg-white border-b w-full justify-start p-0 h-auto rounded-none gap-0">
          <TabsTrigger value="flights" className="data-[state=active]:border-b-2 data-[state=active]:border-sky-blue data-[state=active]:text-sky-blue data-[state=active]:shadow-none rounded-none px-4 py-2">
            <PlaneIcon className="h-4 w-4 mr-2" />
            Flights
          </TabsTrigger>
          <TabsTrigger value="hotels" className="data-[state=active]:border-b-2 data-[state=active]:border-sky-blue data-[state=active]:text-sky-blue data-[state=active]:shadow-none rounded-none px-4 py-2">
            <HotelIcon className="h-4 w-4 mr-2" />
            Hotels
          </TabsTrigger>
          <TabsTrigger value="cars" className="data-[state=active]:border-b-2 data-[state=active]:border-sky-blue data-[state=active]:text-sky-blue data-[state=active]:shadow-none rounded-none px-4 py-2">
            <CarIcon className="h-4 w-4 mr-2" />
            Cars
          </TabsTrigger>
          
        </TabsList>
      </CardHeader>

      <CardContent className="pt-4">
        <TabsContent value="flights" className="mt-0">
          <div className="space-y-3">
            <div>
              <label className="block text-sm font-medium mb-1">From</label>
              <CitySearchInput placeholder="Origin city or airport" icon={PlaneIcon} dataPendoId="dash-flight-origin" onSelect={setOriginCity} />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">To</label>
              <CitySearchInput placeholder="Destination city or airport" icon={PlaneIcon} dataPendoId="dash-flight-destination" onSelect={setDestinationCity} />
            </div>
            
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm font-medium mb-1">Depart</label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className={cn("w-full justify-start text-left font-normal", !departDate && "text-muted-foreground")}>
                      <PlaneIcon className="mr-2 h-4 w-4" />
                      {departDate ? format(departDate, "PPP") : <span>Select date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar mode="single" selected={departDate} onSelect={setDepartDate} initialFocus className="p-3 pointer-events-auto" />
                  </PopoverContent>
                </Popover>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Return</label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className={cn("w-full justify-start text-left font-normal", !returnDate && "text-muted-foreground")}>
                      <PlaneIcon className="mr-2 h-4 w-4" />
                      {returnDate ? format(returnDate, "PPP") : <span>Select date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar mode="single" selected={returnDate} onSelect={setReturnDate} initialFocus className="p-3 pointer-events-auto" />
                  </PopoverContent>
                </Popover>
              </div>
            </div>
            
            <Button onClick={handleFlightSearch} className="w-full mt-2">
              <PlaneIcon className="mr-2 h-4 w-4" />
              Search Flights
            </Button>
          </div>
        </TabsContent>
        
        <TabsContent value="hotels" className="mt-0">
          <div className="space-y-3">
            <div>
              <label className="block text-sm font-medium mb-1">Destination</label>
              <CitySearchInput placeholder="City or destination" icon={HotelIcon} dataPendoId="dash-hotel-destination" onSelect={setDestinationCity} />
            </div>
            
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm font-medium mb-1">Check-in</label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="w-full justify-start text-left font-normal">
                      <Calendar className="mr-2 h-4 w-4" />
                      <span>Select date</span>
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar mode="single" className="p-3 pointer-events-auto" />
                  </PopoverContent>
                </Popover>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Check-out</label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="w-full justify-start text-left font-normal">
                      <Calendar className="mr-2 h-4 w-4" />
                      <span>Select date</span>
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar mode="single" className="p-3 pointer-events-auto" />
                  </PopoverContent>
                </Popover>
              </div>
            </div>
            
            <Button className="w-full mt-2">
              <HotelIcon className="mr-2 h-4 w-4" />
              Search Hotels
            </Button>
          </div>
        </TabsContent>
        
        <TabsContent value="cars" className="mt-0">
          <div className="p-4 text-center">
            <CarIcon className="h-12 w-12 mx-auto text-gray-400" />
            <p className="mt-2">Car rental booking coming soon</p>
          </div>
        </TabsContent>
        
        <TabsContent value="trains" className="mt-0">
          <div className="p-4 text-center">
            <TrainIcon className="h-12 w-12 mx-auto text-gray-400" />
            <p className="mt-2">Train booking coming soon</p>
          </div>
        </TabsContent>
      </CardContent>
    </Tabs>;
};
export default BookingTabs;