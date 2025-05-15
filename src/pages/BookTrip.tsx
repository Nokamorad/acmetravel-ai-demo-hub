import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import AppLayout from "@/components/layout/AppLayout";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CitySearchInput from "@/components/BookTrip/CitySearchInput";
import SignUpModal from "@/components/modals/SignUpModal";
import { useUser } from "@/contexts/UserContext";
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

// List of major cities
const CITIES = [
  { city: "San Francisco", code: "SFO" },
  { city: "Munich", code: "MUC" },
  { city: "New York", code: "NYC" },
  { city: "Chicago", code: "ORD" },
  { city: "London", code: "LHR" },
  { city: "Paris", code: "CDG" },
  { city: "Berlin", code: "BER" },
  { city: "Tokyo", code: "HND" },
  { city: "Sydney", code: "SYD" }
];

const BookTrip = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useUser();
  
  const [tripType, setTripType] = useState('business');
  const [originCity, setOriginCity] = useState<CityData | null>(null);
  const [destinationCity, setDestinationCity] = useState<CityData | null>(null);
  const [isSignUpModalOpen, setIsSignUpModalOpen] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [departDate, setDepartDate] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  const [bookingStep, setBookingStep] = useState(1);
  const [formCompleted, setFormCompleted] = useState(false);
  
  // For resuming an abandoned booking
  const [isResuming, setIsResuming] = useState(false);
  
  useEffect(() => {
    // Check if user is logged in (has name other than default)
    if (user && user.name !== "Alex Johnson") {
      setIsUserLoggedIn(true);
    }
    
    // Check if we're resuming a booking
    const params = new URLSearchParams(location.search);
    if (params.has('resuming')) {
      setIsResuming(true);
      setFormCompleted(true);
      setBookingStep(3);
    }
    
    // Default origin city to San Francisco
    const originCity = CITIES.find(city => city.code === "SFO") || CITIES[0];
    setOriginCity(originCity);
    
    // Default destination city to Munich for the Munich demo
    const destinationCity = CITIES.find(city => city.code === "MUC") || { city: "Munich", code: "MUC" };
    setDestinationCity(destinationCity);
    
    // Set dates to 2 weeks in the future
    const today = new Date();
    const departureDate = new Date(today);
    departureDate.setDate(today.getDate() + 14);
    
    const returnDateObj = new Date(today);
    returnDateObj.setDate(today.getDate() + 21);
    
    setDepartDate(departureDate.toISOString().split('T')[0]);
    setReturnDate(returnDateObj.toISOString().split('T')[0]);
    
    // Parse UTM parameters if they exist
    const utmSource = params.get('utm_source');
    const utmMedium = params.get('utm_medium');
    const utmCampaign = params.get('utm_campaign');
    const utmTerm = params.get('utm_term');
    const utmContent = params.get('utm_content');
    
    // If UTM parameters exist, track them in Pendo
    if (utmSource || utmMedium || utmCampaign) {
      console.log('UTM Parameters detected:', { utmSource, utmMedium, utmCampaign, utmTerm, utmContent });
      // Update Pendo visitor metadata with UTM params
      if ((window as any).pendo && (window as any).pendo.updateOptions) {
        (window as any).pendo.updateOptions({
          visitor: {
            utm_source: utmSource,
            utm_medium: utmMedium,
            utm_campaign: utmCampaign,
            utm_term: utmTerm,
            utm_content: utmContent
          }
        });
      }
    }
    
    // Add event listener for page unload to track abandonment
    const handleUnload = () => {
      if (formCompleted && !showConfirmation && !isResuming) {
        if ((window as any).trackBookingAbandoned) {
          (window as any).trackBookingAbandoned();
        }
      }
    };

    window.addEventListener('beforeunload', handleUnload);
    
    // Track booking started
    if ((window as any).trackBookingStarted && !isResuming) {
      (window as any).trackBookingStarted();
    }
    
    return () => {
      window.removeEventListener('beforeunload', handleUnload);
    };
  }, [location.search, user, showConfirmation, formCompleted, isResuming]);
  
  // Handle form completion check for abandonment tracking
  useEffect(() => {
    // Consider the form completed if we have both cities selected and dates chosen
    if (originCity && destinationCity && departDate && returnDate) {
      setFormCompleted(true);
    }
  }, [originCity, destinationCity, departDate, returnDate]);
  
  const handleSearchFlights = () => {
    // Track flight search submitted
    if ((window as any).pendo && (window as any).pendo.track) {
      (window as any).pendo.track('Flight Search Submitted', {
        origin: originCity?.city,
        destination: destinationCity?.city,
        departDate,
        returnDate,
        tripType
      });
    }
    
    if (isResuming) {
      // If resuming, go straight to confirmation
      navigate("/booking-confirmation");
      
      if ((window as any).trackBookingCompleted) {
        (window as any).trackBookingCompleted();
      }
      return;
    }
    
    // If form is on first step, advance to next step
    if (bookingStep === 1) {
      setBookingStep(2);
      return;
    }
    
    // If form is on second step, trigger abandonment or completion
    if (bookingStep === 2) {
      // For demo: if destinationCity is Munich, simulate abandonment
      if (destinationCity?.code === "MUC" && !isResuming) {
        // Simulate user abandoning the form
        if ((window as any).trackBookingAbandoned) {
          (window as any).trackBookingAbandoned();
        }
        
        // Navigate to inbox with abandonment flag
        navigate("/inbox?abandoned=true");
      } else {
        // Otherwise continue to booking confirmation
        setBookingStep(3);
      }
      return;
    }
    
    // If final step, complete booking
    if (bookingStep === 3) {
      // If user is not logged in, open signup modal
      if (!isUserLoggedIn) {
        setIsSignUpModalOpen(true);
      } else {
        // User is logged in, show confirmation
        navigate("/booking-confirmation");
        
        if ((window as any).trackBookingCompleted) {
          (window as any).trackBookingCompleted();
        }
      }
    }
  };

  // Handle successful signup
  const handleSignupSuccess = () => {
    setIsUserLoggedIn(true);
    setIsSignUpModalOpen(false);
    // Show confirmation after successful signup
    navigate("/booking-confirmation");
    
    if ((window as any).trackBookingCompleted) {
      (window as any).trackBookingCompleted();
    }
  };
  
  const resetSearch = () => {
    setShowConfirmation(false);
    setBookingStep(1);
  };
  
  const getButtonText = () => {
    if (isResuming) {
      return "Complete Booking";
    }
    
    switch (bookingStep) {
      case 1:
        return "Continue to Passenger Details";
      case 2:
        return "Continue to Payment";
      case 3:
        return "Complete Booking";
      default:
        return "Search Flights";
    }
  };
  
  return (
    <AppLayout>
      <div className="max-w-5xl mx-auto px-4 py-6">
        <h1 className="text-2xl font-bold text-acme-gray-dark mb-6">
          {isResuming ? "Resume Your Booking" : "Book a trip"}
        </h1>
        
        {isResuming && (
          <div className="mb-6 bg-amber-50 border border-amber-200 rounded-md p-4">
            <p className="text-amber-800">
              Welcome back! We've saved your booking details for your trip to Munich.
            </p>
          </div>
        )}
        
        {/* Booking steps indicator */}
        <div className="mb-8">
          <div className="flex items-center">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${bookingStep >= 1 ? 'bg-sky-blue text-white' : 'bg-gray-200 text-gray-500'}`}>
              1
            </div>
            <div className={`h-1 flex-1 ${bookingStep >= 2 ? 'bg-sky-blue' : 'bg-gray-200'}`}></div>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${bookingStep >= 2 ? 'bg-sky-blue text-white' : 'bg-gray-200 text-gray-500'}`}>
              2
            </div>
            <div className={`h-1 flex-1 ${bookingStep >= 3 ? 'bg-sky-blue' : 'bg-gray-200'}`}></div>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${bookingStep >= 3 ? 'bg-sky-blue text-white' : 'bg-gray-200 text-gray-500'}`}>
              3
            </div>
          </div>
          <div className="flex justify-between mt-2 text-sm">
            <div className="text-center">Flight Details</div>
            <div className="text-center">Passenger Info</div>
            <div className="text-center">Payment</div>
          </div>
        </div>
        
        {/* Trip Type Selection */}
        <div className="mb-6">
          <div className="inline-flex rounded-md border border-gray-200 p-1 bg-white">
            <button
              onClick={() => setTripType('business')}
              className={`px-4 py-1.5 text-sm font-medium rounded-md ${
                tripType === 'business' ? 'bg-sky-blue text-white' : 'text-gray-700'
              }`}
              data-pendo-id="trip-type-business"
            >
              Business travel
            </button>
            <button
              onClick={() => setTripType('personal')}
              className={`px-4 py-1.5 text-sm font-medium rounded-md ${
                tripType === 'personal' ? 'bg-sky-blue text-white' : 'text-gray-700'
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
              className="data-[state=active]:border-b-2 data-[state=active]:border-sky-blue data-[state=active]:text-sky-blue data-[state=active]:shadow-none rounded-none px-6 py-3"
              data-pendo-id="travel-tab-flights"
            >
              <PlaneIcon className="h-4 w-4 mr-2" />
              Flights
            </TabsTrigger>
            <TabsTrigger 
              value="hotels" 
              className="data-[state=active]:border-b-2 data-[state=active]:border-sky-blue data-[state=active]:text-sky-blue data-[state=active]:shadow-none rounded-none px-6 py-3"
              data-pendo-id="travel-tab-hotels"
            >
              <HotelIcon className="h-4 w-4 mr-2" />
              Hotels
            </TabsTrigger>
            <TabsTrigger 
              value="trains" 
              className="data-[state=active]:border-b-2 data-[state=active]:border-sky-blue data-[state=active]:text-sky-blue data-[state=active]:shadow-none rounded-none px-6 py-3"
              data-pendo-id="travel-tab-trains"
            >
              <TrainIcon className="h-4 w-4 mr-2" />
              Trains
            </TabsTrigger>
            <TabsTrigger 
              value="cars" 
              className="data-[state=active]:border-b-2 data-[state=active]:border-sky-blue data-[state=active]:text-sky-blue data-[state=active]:shadow-none rounded-none px-6 py-3"
              data-pendo-id="travel-tab-cars"
            >
              <CarIcon className="h-4 w-4 mr-2" />
              Rental cars
            </TabsTrigger>
          </TabsList>
          
          {/* Booking step 1: Flight details */}
          {bookingStep === 1 && (
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
                      initialValue={originCity?.city || ""}
                    />
                  </div>
                  
                  <div className="lg:col-span-2">
                    <label className="block text-sm font-medium mb-1">To</label>
                    <CitySearchInput 
                      placeholder="Enter destination city or airport"
                      icon={PlaneIcon} 
                      dataPendoId="flight-destination"
                      onSelect={setDestinationCity}
                      initialValue={destinationCity?.city || ""}
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-1">Trip type</label>
                    <div className="relative">
                      <select className="w-full h-10 pl-3 pr-8 border border-gray-300 rounded-md bg-white text-sm focus:ring-2 focus:ring-sky-blue focus:border-sky-blue">
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
                        value={departDate}
                        onChange={(e) => setDepartDate(e.target.value)}
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
                        value={returnDate}
                        onChange={(e) => setReturnDate(e.target.value)}
                        className="pl-10 bg-white"
                        data-pendo-id="flight-return-date"
                      />
                    </div>
                  </div>
                  
                  <div className="lg:col-span-1">
                    <label className="block text-sm font-medium mb-1">Passengers</label>
                    <div className="relative">
                      <select className="w-full h-10 pl-3 pr-8 border border-gray-300 rounded-md bg-white text-sm focus:ring-2 focus:ring-sky-blue focus:border-sky-blue">
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
              </Card>
            </TabsContent>
          )}
          
          {/* Booking step 2: Passenger details */}
          {bookingStep === 2 && (
            <TabsContent value="flights" className="mt-4">
              <Card className="border shadow-sm p-6">
                <h3 className="font-medium text-lg mb-4">Passenger Information</h3>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Full Name (as on ID)</label>
                    <Input 
                      defaultValue={user.name} 
                      className="bg-white" 
                      data-pendo-id="passenger-name"
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">Date of Birth</label>
                      <Input type="date" className="bg-white" data-pendo-id="passenger-dob" />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium mb-1">Gender</label>
                      <select className="w-full h-10 pl-3 pr-8 border border-gray-300 rounded-md bg-white text-sm focus:ring-2 focus:ring-sky-blue focus:border-sky-blue">
                        <option>Male</option>
                        <option>Female</option>
                        <option>Non-binary</option>
                        <option>Prefer not to say</option>
                      </select>
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-1">Passport/ID Number</label>
                    <Input className="bg-white" data-pendo-id="passenger-id" />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-1">Contact Email</label>
                    <Input defaultValue={user.email} className="bg-white" data-pendo-id="passenger-email" />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-1">Phone Number</label>
                    <Input defaultValue="+1 (555) 123-4567" className="bg-white" data-pendo-id="passenger-phone" />
                  </div>
                </div>
              </Card>
            </TabsContent>
          )}
          
          {/* Booking step 3: Payment details */}
          {bookingStep === 3 && (
            <TabsContent value="flights" className="mt-4">
              <Card className="border shadow-sm p-6">
                <h3 className="font-medium text-lg mb-4">Payment Information</h3>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Card Holder Name</label>
                    <Input 
                      defaultValue={user.name} 
                      className="bg-white" 
                      data-pendo-id="payment-name"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-1">Card Number</label>
                    <Input 
                      defaultValue="•••• •••• •••• 4242" 
                      className="bg-white" 
                      data-pendo-id="payment-card"
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">Expiration Date</label>
                      <Input defaultValue="12/25" className="bg-white" data-pendo-id="payment-expiry" />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium mb-1">CVV</label>
                      <Input defaultValue="•••" className="bg-white" data-pendo-id="payment-cvv" />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-1">Billing Address</label>
                    <Input defaultValue="123 Business St" className="bg-white" data-pendo-id="payment-address" />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">City</label>
                      <Input defaultValue="San Francisco" className="bg-white" />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium mb-1">State/Province</label>
                      <Input defaultValue="CA" className="bg-white" />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium mb-1">Zip/Postal Code</label>
                      <Input defaultValue="94105" className="bg-white" />
                    </div>
                  </div>
                  
                  <div className="flex items-center mt-4">
                    <input type="checkbox" id="saveCard" className="mr-2" defaultChecked={true} />
                    <label htmlFor="saveCard" className="text-sm">Save card for future bookings</label>
                  </div>
                </div>
              </Card>
            </TabsContent>
          )}
          
          <TabsContent value="hotels">
            <Card className="border shadow-sm p-6">
              <p className="text-center text-gray-500">Hotel booking functionality would be implemented here.</p>
            </Card>
          </TabsContent>
          
          <TabsContent value="trains">
            <Card className="border shadow-sm p-6">
              <p className="text-center text-gray-500">Train booking functionality would be implemented here.</p>
            </Card>
          </TabsContent>
          
          <TabsContent value="cars">
            <Card className="border shadow-sm p-6">
              <p className="text-center text-gray-500">Car rental functionality would be implemented here.</p>
            </Card>
          </TabsContent>
        </Tabs>
        
        {/* Summary Card */}
        <Card className="border shadow-sm p-4 mb-6">
          <div className="flex flex-col md:flex-row justify-between">
            <div>
              <h3 className="font-medium">{originCity?.city || 'San Francisco'} to {destinationCity?.city || 'Munich'}</h3>
              <p className="text-sm text-gray-600">
                {departDate && new Date(departDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} - 
                {returnDate && new Date(returnDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
              </p>
            </div>
            <div className="mt-2 md:mt-0">
              <p className="text-sm text-gray-600">Estimated Price:</p>
              <p className="font-bold text-lg">€1,245</p>
            </div>
          </div>
        </Card>
        
        {/* Continue Button */}
        <div className="flex justify-end">
          <Button 
            variant="default"
            size="lg"
            className="text-white"
            onClick={handleSearchFlights}
            data-pendo-id="continue-booking"
          >
            <SearchIcon className="mr-2 h-4 w-4" />
            {getButtonText()}
          </Button>
        </div>
        
      </div>
      
      {/* Signup Modal */}
      <SignUpModal 
        isOpen={isSignUpModalOpen} 
        onClose={() => setIsSignUpModalOpen(false)}
        onSuccess={handleSignupSuccess}
      />
    </AppLayout>
  );
};

export default BookTrip;
