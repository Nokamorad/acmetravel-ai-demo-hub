
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Plus, ArrowRight, Calendar, MapPin } from "lucide-react";
import { useUser } from "@/contexts/UserContext";
import { useNavigate } from "react-router-dom";

const MainDashboard = () => {
  const { user } = useUser();
  const navigate = useNavigate();
  
  const firstName = user.name.split(' ')[0];
  const currentHour = new Date().getHours();
  
  let greeting = "Good morning";
  if (currentHour >= 12 && currentHour < 17) {
    greeting = "Good afternoon";
  } else if (currentHour >= 17) {
    greeting = "Good evening";
  }

  const scenicDestinations = [
    {
      name: "Swiss Alps",
      country: "Switzerland",
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&q=80&w=400&h=300",
      description: "Breathtaking mountain views"
    },
    {
      name: "Santorini",
      country: "Greece", 
      image: "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&q=80&w=400&h=300",
      description: "Stunning coastal beauty"
    },
    {
      name: "Kyoto",
      country: "Japan",
      image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&q=80&w=400&h=300", 
      description: "Traditional culture & gardens"
    }
  ];

  const upcomingTrips = [
    {
      id: 1,
      destination: "San Francisco",
      date: "May 15-19, 2025",
      hotel: "Marriott Union Square",
      image: "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?auto=format&fit=crop&q=80&w=300&h=200",
      status: "Confirmed"
    },
    {
      id: 2,
      destination: "Austin",
      date: "June 3-7, 2025", 
      hotel: "Hilton Downtown Austin",
      image: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0b/Austin_Downtown_2024_%28cropped%29_%28cropped%29.jpg/330px-Austin_Downtown_2024_%28cropped%29_%28cropped%29.jpg",
      status: "Pending"
    }
  ];

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {greeting}, {firstName}
          </h1>
          <p className="text-gray-600">Ready for your next adventure?</p>
        </div>
        <Button 
          onClick={() => navigate('/book')}
          className="bg-sky-blue hover:bg-sky-blue/90 flex items-center space-x-2"
        >
          <Plus className="h-4 w-4" />
          <span>Plan New Trip</span>
        </Button>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="bg-white shadow-sm border-0">
          <CardContent className="p-6">
            <div className="text-center">
              <p className="text-3xl font-bold text-sky-blue mb-1">3</p>
              <p className="text-sm text-gray-600">Upcoming Trips</p>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-white shadow-sm border-0">
          <CardContent className="p-6">
            <div className="text-center">
              <p className="text-3xl font-bold text-gray-900 mb-1">5</p>
              <p className="text-sm text-gray-600">Past Trips</p>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-white shadow-sm border-0">
          <CardContent className="p-6">
            <div className="text-center">
              <p className="text-3xl font-bold text-green-600 mb-1">$1,240</p>
              <p className="text-sm text-gray-600">Saved</p>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white shadow-sm border-0">
          <CardContent className="p-6">
            <div className="text-center">
              <p className="text-3xl font-bold text-orange-500 mb-1">24.5K</p>
              <p className="text-sm text-gray-600">Miles Earned</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Discover Section */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-900">Discover Amazing Places</h2>
          <Button variant="ghost" className="text-sky-blue hover:text-sky-blue/80">
            View all <ArrowRight className="h-4 w-4 ml-1" />
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {scenicDestinations.map((destination, index) => (
            <Card key={index} className="group cursor-pointer overflow-hidden shadow-sm border-0 hover:shadow-lg transition-all duration-300">
              <div className="relative">
                <img 
                  src={destination.image} 
                  alt={destination.name}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                <div className="absolute bottom-4 left-4 text-white">
                  <h3 className="font-semibold text-lg">{destination.name}</h3>
                  <p className="text-sm opacity-90">{destination.country}</p>
                </div>
              </div>
              <CardContent className="p-4">
                <p className="text-gray-600 text-sm">{destination.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Upcoming Trips */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-900">Your Upcoming Trips</h2>
          <Button variant="ghost" className="text-sky-blue hover:text-sky-blue/80">
            View all <ArrowRight className="h-4 w-4 ml-1" />
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {upcomingTrips.map((trip) => (
            <Card key={trip.id} className="shadow-sm border-0 hover:shadow-lg transition-shadow duration-300">
              <CardContent className="p-0">
                <div className="flex">
                  <img 
                    src={trip.image} 
                    alt={trip.destination}
                    className="w-24 h-24 object-cover rounded-l-lg"
                  />
                  <div className="flex-1 p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold text-gray-900">{trip.destination}</h3>
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        trip.status === 'Confirmed' 
                          ? 'bg-green-100 text-green-700' 
                          : 'bg-yellow-100 text-yellow-700'
                      }`}>
                        {trip.status}
                      </span>
                    </div>
                    <div className="space-y-1">
                      <div className="flex items-center text-sm text-gray-600">
                        <Calendar className="h-3 w-3 mr-2" />
                        {trip.date}
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <MapPin className="h-3 w-3 mr-2" />
                        {trip.hotel}
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MainDashboard;
