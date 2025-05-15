
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, MapPin, Plane, Clock, CreditCard, Phone, Users } from "lucide-react";
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from "@/components/ui/accordion";

const UpcomingTrips = () => {
  // Trip data - in a real app this would come from an API
  const trips = [
    {
      id: 1,
      from: "New York",
      to: "San Francisco",
      date: "May 15-19, 2025",
      hotel: "Marriott Union Square",
      status: "Upcoming",
      statusClass: "bg-sky-blue/10 text-sky-blue",
      image: "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?auto=format&fit=crop&q=80&w=200&h=200",
      details: {
        flightNumber: "AC 304",
        departureTime: "8:15 AM ET",
        arrivalTime: "11:45 AM PT", 
        confirmation: "XRTZ789",
        travelPolicy: "Business Class Approved",
        costSavings: "$350",
        travelers: "1 person"
      }
    },
    {
      id: 2,
      from: "Chicago",
      to: "Austin",
      date: "June 3-7, 2025",
      hotel: "Hilton Downtown Austin",
      status: "Pending",
      statusClass: "bg-gray-100 text-gray-600",
      image: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0b/Austin_Downtown_2024_%28cropped%29_%28cropped%29.jpg/330px-Austin_Downtown_2024_%28cropped%29_%28cropped%29.jpg",
      details: {
        flightNumber: "UA 522",
        departureTime: "10:30 AM CT",
        arrivalTime: "1:15 PM CT", 
        confirmation: "PEND244",
        travelPolicy: "Economy Plus",
        costSavings: "$120",
        travelers: "2 people"
      }
    },
    {
      id: 3,
      from: "Seattle",
      to: "Denver",
      date: "June 22-25, 2025",
      hotel: "The Crawford Hotel",
      status: "Booked",
      statusClass: "bg-sky-blue/10 text-sky-blue",
      image: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e8/Denver_skyline.jpg/960px-Denver_skyline.jpg?20121103225711",
      details: {
        flightNumber: "DL 1233",
        departureTime: "6:45 AM PT",
        arrivalTime: "10:20 AM MT", 
        confirmation: "CNFM456",
        travelPolicy: "Economy",
        costSavings: "$230",
        travelers: "1 person"
      }
    }
  ];

  return (
    <Card className="border-sky-blue/10" data-pendo-id="upcoming-trips-card">
      <CardHeader className="bg-sky-blue/5">
        <CardTitle className="flex items-center">
          <Plane className="h-5 w-5 mr-2 text-sky-blue" />
          Upcoming Trips
        </CardTitle>
        <CardDescription>Your scheduled travel plans</CardDescription>
      </CardHeader>
      <CardContent className="p-0">
        <Accordion type="single" collapsible className="w-full">
          {trips.map((trip) => (
            <AccordionItem key={trip.id} value={`trip-${trip.id}`} className="border-b last:border-b-0">
              <AccordionTrigger className="px-4 py-2 hover:no-underline hover:bg-gray-50 transition-colors">
                <div className="flex items-start w-full">
                  <div className="w-16 h-16 rounded-md overflow-hidden flex-shrink-0 mr-3">
                    <img src={trip.image} alt={trip.to} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium text-left">{trip.from} → {trip.to}</h4>
                      <span className={`px-2 py-1 ${trip.statusClass} text-xs rounded-full ml-2`}>
                        {trip.status}
                      </span>
                    </div>
                    <div className="flex items-center text-sm text-gray-600 mt-1">
                      <Calendar className="h-3 w-3 mr-1" />
                      {trip.date}
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <MapPin className="h-3 w-3 mr-1" />
                      {trip.hotel}
                    </div>
                  </div>
                </div>
              </AccordionTrigger>
              <AccordionContent className="px-4 pt-2 pb-4 bg-gray-50">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <h4 className="font-medium text-midnight-navy">Flight Details</h4>
                    <div className="flex items-center text-sm text-gray-600">
                      <Plane className="h-3 w-3 mr-1 text-sky-blue" />
                      <span>Flight: {trip.details.flightNumber}</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <Clock className="h-3 w-3 mr-1 text-sky-blue" />
                      <span>Departs: {trip.details.departureTime}</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <Clock className="h-3 w-3 mr-1 text-sky-blue" />
                      <span>Arrives: {trip.details.arrivalTime}</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <CreditCard className="h-3 w-3 mr-1 text-sky-blue" />
                      <span>Confirmation: {trip.details.confirmation}</span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-medium text-midnight-navy">Trip Information</h4>
                    <div className="flex items-center text-sm text-gray-600">
                      <Users className="h-3 w-3 mr-1 text-sky-blue" />
                      <span>Travelers: {trip.details.travelers}</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <Plane className="h-3 w-3 mr-1 text-sky-blue" />
                      <span>Travel Policy: {trip.details.travelPolicy}</span>
                    </div>
                    <div className="flex items-center text-sm text-green-600 font-medium">
                      <span>You saved: {trip.details.costSavings}</span>
                    </div>
                    <div className="mt-4">
                      <Button variant="outline" size="sm" className="text-xs">
                        View Full Itinerary
                      </Button>
                    </div>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </CardContent>
    </Card>
  );
};

export default UpcomingTrips;
