
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  CalendarIcon, 
  MapPinIcon, 
  PlusCircleIcon, 
  PlaneIcon
} from "lucide-react";
import AppLayout from "@/components/layout/AppLayout";
import PendoExperiment from "@/components/pendo/PendoExperiment";

const Dashboard = () => {
  const [showWelcomeGuide, setShowWelcomeGuide] = useState(true);
  const navigate = useNavigate();
  
  // Sample upcoming trips data
  const upcomingTrips = [
    {
      id: "sf-2023",
      destination: "San Francisco",
      dates: "May 15-20, 2025",
      status: "Confirmed",
      image: "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=300"
    },
    {
      id: "nyc-2023",
      destination: "New York",
      dates: "June 5-10, 2025",
      status: "Pending",
      image: "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=300"
    }
  ];
  
  // Dismiss welcome guide (would trigger Pendo guide completion in production)
  const dismissWelcomeGuide = () => {
    setShowWelcomeGuide(false);
    console.log("Welcome guide dismissed - Pendo guide would be marked as completed");
  };
  
  return (
    <AppLayout>
      <div className="max-w-6xl mx-auto">
        {/* Welcome Banner - Pendo Guide Target */}
        {showWelcomeGuide && (
          <div 
            className="bg-acme-purple/10 border border-acme-purple/30 rounded-lg p-4 mb-6 flex items-center justify-between"
            data-pendo-id="welcome-banner"
          >
            <div className="flex items-center">
              <div className="bg-acme-purple rounded-full p-2 mr-4">
                <MapPinIcon className="h-5 w-5 text-white" />
              </div>
              <div>
                <h3 className="font-medium text-acme-purple">Welcome to AcmeTravel!</h3>
                <p className="text-gray-600">Let Travel Agent help you book your first business trip.</p>
              </div>
            </div>
            <Button 
              variant="outline" 
              onClick={dismissWelcomeGuide}
              data-pendo-id="dismiss-welcome-banner"
            >
              Dismiss
            </Button>
          </div>
        )}
        
        {/* Dashboard Header - Pendo Guide Target */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6" data-pendo-id="dashboard-header">
          <div>
            <h1 className="text-2xl font-bold text-acme-gray-dark">Welcome back, Alex</h1>
            <p className="text-gray-500">Your travel dashboard is ready</p>
          </div>
          <Button 
            className="mt-4 md:mt-0 bg-acme-purple hover:bg-acme-purple-dark text-white"
            data-pendo-id="dashboard-new-trip"
            onClick={() => navigate('/book')}
          >
            <PlusCircleIcon className="mr-2 h-4 w-4" />
            Plan a New Trip
          </Button>
        </div>
        
        {/* Upcoming Trips Section - Pendo Guide Target */}
        <section className="mb-8" data-pendo-id="upcoming-trips-section">
          <h2 className="text-xl font-semibold text-acme-gray-dark mb-4">Your Upcoming Trips</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {upcomingTrips.map((trip) => (
              <Card 
                key={trip.id} 
                className="overflow-hidden hover:shadow-md transition-shadow"
                data-pendo-id={`trip-card-${trip.id}`}
              >
                <div className="h-36 overflow-hidden">
                  <img 
                    src={trip.image} 
                    alt={trip.destination} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <CardContent className="pt-4">
                  <h3 className="font-medium text-lg">{trip.destination}</h3>
                  <div className="flex items-center text-gray-500 mt-1">
                    <CalendarIcon className="h-4 w-4 mr-1" />
                    <span className="text-sm">{trip.dates}</span>
                  </div>
                  <div className="mt-2">
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      trip.status === 'Confirmed' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {trip.status}
                    </span>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between pt-0">
                  <Button 
                    variant="outline" 
                    size="sm"
                    data-pendo-id={`trip-modify`}
                  >
                    Modify
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="text-red-600 hover:bg-red-50"
                    data-pendo-id={`trip-cancel`}
                  >
                    Cancel
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </section>
        
        {/* Quick Actions - Pendo Guide Target */}
        <section className="mb-8" data-pendo-id="quick-actions-section">
          <h2 className="text-xl font-semibold text-acme-gray-dark mb-4">Quick Actions</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Button 
              variant="outline" 
              className="h-auto py-6 flex flex-col items-center justify-center border-2"
              data-pendo-id="quick-book-flight"
              onClick={() => navigate('/book')}
            >
              <PlaneIcon className="h-6 w-6 mb-2 text-acme-purple" />
              <span>Book a Flight</span>
            </Button>
            
            <Button 
              variant="outline" 
              className="h-auto py-6 flex flex-col items-center justify-center border-2"
              data-pendo-id="quick-book-hotel"
              onClick={() => navigate('/book')}
            >
              <MapPinIcon className="h-6 w-6 mb-2 text-acme-purple" />
              <span>Book a Hotel</span>
            </Button>
          </div>
        </section>
        
        {/* Suggested Hotels (Pendo Experiment Zone) */}
        <section className="mb-8" data-pendo-id="suggested-hotels-section">
          <h2 className="text-xl font-semibold text-acme-gray-dark mb-4">
            Suggested Hotels Near Your Destinations
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <PendoExperiment
              experimentId="suggested-hotels-upsell"
              variants={[
                {
                  id: "variant-a",
                  title: "Premium 5-Star Hotel in San Francisco",
                  description: "Enjoy luxury accommodations near your upcoming meeting",
                  buttonText: "Add to Itinerary",
                  buttonColor: "purple",
                  imageUrl: "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=300"
                },
                {
                  id: "variant-b",
                  title: "Limited Time Offer: San Francisco",
                  description: "Save 25% on premium hotels when you book with your flight",
                  buttonText: "View Special Offer",
                  buttonColor: "pink",
                  imageUrl: "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=300"
                }
              ]}
            />
          </div>
        </section>
        
        {/* Tips and Instructions (Pendo Target Area) */}
        <section 
          className="bg-gray-100 rounded-lg p-5 border border-gray-200"
          data-pendo-id="tips-section"
        >
          <h3 className="font-medium text-gray-800 mb-2 flex items-center">
            <svg className="w-5 h-5 mr-2 text-acme-purple" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2h-1V9a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            Travel Agent Tips
          </h3>
          <p className="text-gray-600 mb-4">
            Ask Travel Agent to help you plan your next business trip, modify bookings, or find nearby services.
          </p>
          <div className="flex space-x-2">
            <Button 
              size="sm" 
              className="bg-acme-purple hover:bg-acme-purple-dark text-white"
              data-pendo-id="explore-features"
            >
              Explore Features
            </Button>
            <Button 
              size="sm" 
              variant="ghost" 
              className="text-gray-500"
              data-pendo-id="dismiss-tip"
            >
              Dismiss
            </Button>
          </div>
        </section>
      </div>
    </AppLayout>
  );
};

export default Dashboard;
