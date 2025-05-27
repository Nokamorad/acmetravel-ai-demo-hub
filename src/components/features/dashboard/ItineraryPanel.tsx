
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, MapPin, Plane, Clock, Users } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const ItineraryPanel = () => {
  const [selectedTrip, setSelectedTrip] = useState(0);
  
  const trips = [
    {
      id: 1,
      destination: "San Francisco",
      date: "May 15-19",
      status: "confirmed",
      details: {
        flight: "AC 304",
        departure: "8:15 AM",
        arrival: "11:45 AM",
        hotel: "Marriott Union Square",
        travelers: 1,
        savings: "$350"
      },
      activities: [
        { time: "9:00 AM", activity: "Arrive at SFO", location: "Airport" },
        { time: "11:00 AM", activity: "Hotel Check-in", location: "Union Square" },
        { time: "2:00 PM", activity: "Golden Gate Bridge", location: "Golden Gate" },
        { time: "6:00 PM", activity: "Fisherman's Wharf", location: "Pier 39" }
      ]
    },
    {
      id: 2,
      destination: "Austin",
      date: "Jun 3-7", 
      status: "pending",
      details: {
        flight: "UA 522",
        departure: "10:30 AM",
        arrival: "1:15 PM",
        hotel: "Hilton Downtown Austin",
        travelers: 2,
        savings: "$120"
      },
      activities: [
        { time: "1:15 PM", activity: "Arrive at AUS", location: "Airport" },
        { time: "3:00 PM", activity: "Hotel Check-in", location: "Downtown" },
        { time: "5:00 PM", activity: "South by Southwest", location: "Music District" },
        { time: "8:00 PM", activity: "BBQ Dinner", location: "Franklin BBQ" }
      ]
    }
  ];

  const currentTrip = trips[selectedTrip];

  return (
    <div className="w-80 space-y-6">
      {/* Trip Selector */}
      <Card className="shadow-sm border-0">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg">Trip Overview</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {trips.map((trip, index) => (
            <div 
              key={trip.id}
              onClick={() => setSelectedTrip(index)}
              className={`p-3 rounded-lg cursor-pointer transition-colors ${
                selectedTrip === index 
                  ? 'bg-sky-blue/10 border border-sky-blue/20' 
                  : 'bg-gray-50 hover:bg-gray-100'
              }`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-900">{trip.destination}</p>
                  <p className="text-sm text-gray-600">{trip.date}</p>
                </div>
                <Badge variant={trip.status === 'confirmed' ? 'default' : 'secondary'}>
                  {trip.status}
                </Badge>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Trip Details */}
      <Card className="shadow-sm border-0">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg">Trip Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <div className="flex items-center space-x-3">
              <Plane className="h-4 w-4 text-sky-blue" />
              <div className="flex-1">
                <p className="text-sm font-medium">Flight {currentTrip.details.flight}</p>
                <p className="text-xs text-gray-600">
                  {currentTrip.details.departure} - {currentTrip.details.arrival}
                </p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <MapPin className="h-4 w-4 text-sky-blue" />
              <div className="flex-1">
                <p className="text-sm font-medium">{currentTrip.details.hotel}</p>
                <p className="text-xs text-gray-600">Hotel accommodation</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <Users className="h-4 w-4 text-sky-blue" />
              <div className="flex-1">
                <p className="text-sm font-medium">{currentTrip.details.travelers} traveler(s)</p>
                <p className="text-xs text-green-600">Saved {currentTrip.details.savings}</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Daily Itinerary */}
      <Card className="shadow-sm border-0">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg">Day 1 Itinerary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {currentTrip.activities.map((activity, index) => (
              <div key={index} className="flex items-start space-x-3">
                <div className="flex-shrink-0 w-12 text-center">
                  <Clock className="h-3 w-3 text-gray-400 mx-auto mb-1" />
                  <p className="text-xs text-gray-600">{activity.time}</p>
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">{activity.activity}</p>
                  <p className="text-xs text-gray-600">{activity.location}</p>
                </div>
              </div>
            ))}
          </div>
          
          <Button className="w-full mt-4 bg-sky-blue hover:bg-sky-blue/90">
            View Full Itinerary
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default ItineraryPanel;
