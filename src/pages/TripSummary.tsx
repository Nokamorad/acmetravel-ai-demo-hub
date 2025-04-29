
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  PlaneIcon, 
  HotelIcon, 
  MapPinIcon, 
  CalendarIcon, 
  InfoIcon,
  ShareIcon,
  PrinterIcon,
  DownloadIcon
} from "lucide-react";
import AppLayout from "@/components/layout/AppLayout";
import PendoSurvey from "@/components/pendo/PendoSurvey";

const TripSummary = () => {
  const [showSurvey, setShowSurvey] = useState(true);
  
  // Sample trip data
  const tripDetails = {
    id: "NYC-MAY2025",
    destination: "New York City",
    dates: "May 15-20, 2025",
    status: "Confirmed",
    bookingRef: "ACME-54321",
    flightDetails: {
      airline: "AcmeAir",
      flightNumber: "AA1234",
      departure: "SFO - May 15, 6:30 AM",
      arrival: "JFK - May 15, 2:45 PM",
      class: "Economy",
      seat: "14A"
    },
    hotelDetails: {
      name: "Midtown Business Hotel",
      address: "123 Park Avenue, New York, NY",
      checkIn: "May 15, 2025",
      checkOut: "May 20, 2025",
      roomType: "Executive King",
      confirmation: "HTL-98765"
    }
  };
  
  return (
    <AppLayout>
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold text-acme-gray-dark">Trip Summary</h1>
            <p className="text-gray-500">Your complete itinerary for {tripDetails.destination}</p>
          </div>
          
          <div className="mt-4 md:mt-0 flex flex-wrap gap-2">
            <Button 
              variant="outline" 
              size="sm"
              data-pendo-id="share-itinerary"
            >
              <ShareIcon className="h-4 w-4 mr-1" />
              Share
            </Button>
            <Button 
              variant="outline" 
              size="sm"
              data-pendo-id="print-itinerary"
            >
              <PrinterIcon className="h-4 w-4 mr-1" />
              Print
            </Button>
            <Button 
              variant="outline" 
              size="sm"
              data-pendo-id="download-itinerary"
            >
              <DownloadIcon className="h-4 w-4 mr-1" />
              Download
            </Button>
          </div>
        </div>
        
        {/* Trip Overview Card - Pendo Target */}
        <Card className="mb-6" data-pendo-id="trip-overview-card">
          <CardHeader className="pb-2">
            <div className="flex justify-between items-start">
              <div>
                <CardTitle>{tripDetails.destination}</CardTitle>
                <p className="text-gray-500 text-sm mt-1">{tripDetails.dates}</p>
              </div>
              <Badge className="bg-green-600">{tripDetails.status}</Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex items-center text-sm text-gray-700">
              <InfoIcon className="h-4 w-4 mr-1 text-gray-400" />
              Booking Reference: <span className="font-medium ml-1">{tripDetails.bookingRef}</span>
            </div>
          </CardContent>
        </Card>
        
        {/* Flight Details - Pendo Target for Frustration Detection */}
        <Card className="mb-6 relative overflow-hidden" data-pendo-id="flight-details-card">
          <div className="absolute top-0 left-0 w-1 h-full bg-acme-purple"></div>
          <CardHeader>
            <CardTitle className="text-lg flex items-center">
              <PlaneIcon className="h-5 w-5 mr-2 text-acme-purple" />
              Flight Details
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-start flex-col md:flex-row">
                <div>
                  <h3 className="font-medium">{tripDetails.flightDetails.airline} {tripDetails.flightDetails.flightNumber}</h3>
                  <p className="text-sm text-gray-500">Confirmation #: {tripDetails.bookingRef}</p>
                </div>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="text-acme-purple hover:text-acme-purple-dark hover:bg-acme-purple/10 mt-2 md:mt-0"
                  data-pendo-id="modify-flight"
                >
                  Change Flight
                </Button>
              </div>
              
              <div className="flex flex-col md:flex-row md:items-center gap-4">
                <div className="bg-gray-100 p-3 rounded-full">
                  <PlaneIcon className="h-4 w-4 text-acme-purple rotate-45" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full">
                  <div>
                    <h4 className="text-xs text-gray-500 uppercase">Departure</h4>
                    <p className="font-medium">{tripDetails.flightDetails.departure}</p>
                  </div>
                  <div>
                    <h4 className="text-xs text-gray-500 uppercase">Arrival</h4>
                    <p className="font-medium">{tripDetails.flightDetails.arrival}</p>
                  </div>
                  <div>
                    <h4 className="text-xs text-gray-500 uppercase">Seat</h4>
                    <p className="font-medium">{tripDetails.flightDetails.class}, {tripDetails.flightDetails.seat}</p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Hotel Details - Pendo Target for Experiment */}
        <Card className="mb-8 relative overflow-hidden" data-pendo-id="hotel-details-card">
          <div className="absolute top-0 left-0 w-1 h-full bg-acme-pink"></div>
          <CardHeader>
            <CardTitle className="text-lg flex items-center">
              <HotelIcon className="h-5 w-5 mr-2 text-acme-pink" />
              Hotel Details
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-start flex-col md:flex-row">
                <div>
                  <h3 className="font-medium">{tripDetails.hotelDetails.name}</h3>
                  <div className="flex items-center text-sm text-gray-500 mt-1">
                    <MapPinIcon className="h-3 w-3 mr-1" />
                    {tripDetails.hotelDetails.address}
                  </div>
                </div>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="text-acme-pink hover:text-acme-pink hover:bg-acme-pink/10 mt-2 md:mt-0"
                  data-pendo-id="modify-hotel"
                >
                  Change Hotel
                </Button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <h4 className="text-xs text-gray-500 uppercase">Check-in</h4>
                  <p className="font-medium">{tripDetails.hotelDetails.checkIn}</p>
                </div>
                <div>
                  <h4 className="text-xs text-gray-500 uppercase">Check-out</h4>
                  <p className="font-medium">{tripDetails.hotelDetails.checkOut}</p>
                </div>
                <div>
                  <h4 className="text-xs text-gray-500 uppercase">Room Type</h4>
                  <p className="font-medium">{tripDetails.hotelDetails.roomType}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* NPS or PMF Survey - Pendo Target */}
        {showSurvey && (
          <div className="mb-8" data-pendo-id="trip-survey-container">
            <PendoSurvey 
              type="pmf" 
              title="Help us improve Travel Agent" 
              description="How would you feel if you could no longer use AcmeTravel with Travel Agent?"
              pendoId="trip-summary-pmf-survey"
            />
          </div>
        )}
        
        {/* Related Offers - Pendo Target for A/B Testing */}
        <div data-pendo-id="related-offers">
          <h2 className="text-xl font-semibold mb-4">Related Offers</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card className="border hover:shadow-md transition-shadow">
              <div className="h-32 overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=500"
                  alt="New York City Tour"
                  className="w-full h-full object-cover"
                />
              </div>
              <CardContent className="p-4">
                <h3 className="font-medium">New York City Tours</h3>
                <p className="text-sm text-gray-600 mt-1">
                  Explore the best of NYC during your stay with exclusive guided tours.
                </p>
                <Button 
                  className="mt-3 w-full bg-acme-purple hover:bg-acme-purple-dark text-white"
                  data-pendo-id="offer-tours-cta"
                >
                  View Tours
                </Button>
              </CardContent>
            </Card>
            
            <Card className="border hover:shadow-md transition-shadow">
              <div className="h-32 overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1468818438311-4bab781ab9b8?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=500"
                  alt="Airport Transfer"
                  className="w-full h-full object-cover"
                />
              </div>
              <CardContent className="p-4">
                <h3 className="font-medium">Airport Transfer Service</h3>
                <p className="text-sm text-gray-600 mt-1">
                  Book your private airport transfer between JFK and your hotel.
                </p>
                <Button 
                  className="mt-3 w-full bg-acme-purple hover:bg-acme-purple-dark text-white"
                  data-pendo-id="offer-transfer-cta"
                >
                  Book Transfer
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default TripSummary;
