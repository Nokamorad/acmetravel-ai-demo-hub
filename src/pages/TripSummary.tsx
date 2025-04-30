import React, { useState, useEffect } from 'react';
import AppLayout from "@/components/layout/AppLayout";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Plane as PlaneIcon, 
  Hotel as HotelIcon, 
  Calendar as CalendarIcon, 
  MapPin as MapPinIcon,
  User as UserIcon,
  Clock as ClockIcon,
  CreditCard as CreditCardIcon,
  Printer as PrinterIcon,
  Share as ShareIcon,
  Bell as BellIcon,
  MessageSquare as MessageSquareIcon,
  Search as SearchIcon
} from "lucide-react";
import { generateUniqueTrips } from '@/utils/dataGenerator';

const TripSummary = () => {
  const [activeTab, setActiveTab] = useState('upcoming');
  const [trips, setTrips] = useState([]);
  
  useEffect(() => {
    const visitorId = localStorage.getItem('acmetravel_visitor') 
      ? JSON.parse(localStorage.getItem('acmetravel_visitor')).visitor_id 
      : null;
    
    // Generate unique trip data based on visitor ID
    setTrips(generateUniqueTrips(visitorId));
  }, []);
  
  return (
    <AppLayout>
      <div className="max-w-6xl mx-auto px-4 py-6">
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
          <h1 className="text-2xl font-bold text-acme-gray-dark">Your Trips</h1>
          <div className="mt-2 sm:mt-0 flex flex-wrap gap-2">
            <Button 
              variant="outline" 
              size="sm"
              className="text-gray-700"
              data-pendo-id="search-trips"
            >
              <SearchIcon className="h-4 w-4 mr-1" />
              Search trips
            </Button>
            <Button 
              className="bg-acme-purple text-white"
              size="sm"
              onClick={() => window.location.href = '/book'}
              data-pendo-id="new-trip-button"
            >
              New trip
            </Button>
          </div>
        </div>
        
        {/* Trip Status Tabs */}
        <div className="mb-6 border-b border-gray-200">
          <div className="flex space-x-6">
            <button
              onClick={() => setActiveTab('upcoming')}
              className={`py-2 px-1 text-sm font-medium border-b-2 ${
                activeTab === 'upcoming' ? 'border-acme-purple text-acme-purple' : 'border-transparent text-gray-600 hover:text-acme-purple'
              }`}
              data-pendo-id="trip-tab-upcoming"
            >
              Upcoming
            </button>
            <button
              onClick={() => setActiveTab('past')}
              className={`py-2 px-1 text-sm font-medium border-b-2 ${
                activeTab === 'past' ? 'border-acme-purple text-acme-purple' : 'border-transparent text-gray-600 hover:text-acme-purple'
              }`}
              data-pendo-id="trip-tab-past"
            >
              Past
            </button>
            <button
              onClick={() => setActiveTab('canceled')}
              className={`py-2 px-1 text-sm font-medium border-b-2 ${
                activeTab === 'canceled' ? 'border-acme-purple text-acme-purple' : 'border-transparent text-gray-600 hover:text-acme-purple'
              }`}
              data-pendo-id="trip-tab-canceled"
            >
              Canceled
            </button>
          </div>
        </div>
        
        {/* Trip Listing */}
        <div className="space-y-6">
          {trips.map((trip) => (
            <Card 
              key={trip.id}
              className="border shadow-sm overflow-hidden"
            >
              <div className="lg:flex">
                <div className="lg:w-1/4">
                  <img 
                    src={trip.image} 
                    alt={trip.destination} 
                    className="w-full h-40 lg:h-full object-cover"
                  />
                </div>
                
                <div className="p-5 lg:w-3/4">
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4">
                    <div>
                      <div className="flex items-center mb-1">
                        <span className="text-xs px-2 py-0.5 rounded-full bg-acme-purple/10 text-acme-purple mr-2">Business</span>
                        <span className={`text-xs px-2 py-0.5 rounded-full ${
                          trip.status === 'Confirmed' ? 'bg-green-100 text-green-800' :
                          trip.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                          trip.status === 'Draft' ? 'bg-blue-100 text-blue-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>{trip.status}</span>
                      </div>
                      <h2 className="text-lg font-bold text-acme-gray-dark">{trip.destination} Trip</h2>
                      <div className="flex items-center text-sm text-gray-600 mt-1">
                        <CalendarIcon className="h-3.5 w-3.5 mr-1" />
                        <span>{trip.dates}</span>
                      </div>
                    </div>
                    
                    <div className="mt-3 sm:mt-0">
                      <Button>
                        Manage
                      </Button>
                    </div>
                  </div>
                  
                  {/* Trip details would be added dynamically based on trip */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    {/* Flight Details - Generic placeholder */}
                    <div className="flex items-start space-x-3">
                      <div className="bg-blue-50 p-2 rounded-full">
                        <PlaneIcon className="h-4 w-4 text-blue-600" />
                      </div>
                      <div>
                        <h4 className="font-medium text-sm">{
                          trip.destination === "San Francisco" ? "United Airlines UA287" :
                          trip.destination === "New York" ? "Delta Airlines DL342" :
                          trip.destination === "Chicago" ? "American Airlines AA189" :
                          trip.destination === "Seattle" ? "Alaska Airlines AS522" :
                          trip.destination === "Boston" ? "JetBlue Airways B6801" :
                          "Southwest Airlines WN445"
                        }</h4>
                        <div className="text-xs text-gray-500 mt-1">Departs on {trip.dates.split(' - ')[0]}</div>
                      </div>
                    </div>
                    
                    {/* Hotel Details - Generic placeholder */}
                    <div className="flex items-start space-x-3">
                      <div className="bg-purple-50 p-2 rounded-full">
                        <HotelIcon className="h-4 w-4 text-purple-600" />
                      </div>
                      <div>
                        <h4 className="font-medium text-sm">{
                          trip.destination === "San Francisco" ? "Hilton San Francisco" :
                          trip.destination === "New York" ? "Marriott Times Square" :
                          trip.destination === "Chicago" ? "Hyatt Regency Chicago" :
                          trip.destination === "Seattle" ? "Sheraton Seattle" :
                          trip.destination === "Boston" ? "Westin Boston" :
                          "Four Seasons Austin"
                        }</h4>
                        <div className="text-xs text-gray-500 mt-1">{trip.dates}</div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap items-center justify-between border-t border-gray-100 pt-3">
                    <div className="flex items-center text-sm text-gray-600">
                      <UserIcon className="h-3.5 w-3.5 mr-1" />
                      <span>Alex Morgan</span>
                    </div>
                    
                    <div className="flex space-x-2 mt-2 sm:mt-0">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="text-xs"
                      >
                        Modify
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="text-xs text-red-600 hover:bg-red-50"
                      >
                        Cancel
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
        
        {/* Travel Assistant Section */}
        <div className="mt-8 bg-acme-purple/5 border border-acme-purple/20 rounded-lg p-4 flex items-center justify-between">
          <div>
            <h3 className="font-medium text-acme-gray-dark mb-1">Need help with your trips?</h3>
            <p className="text-sm text-gray-600">Travel Agent can help you modify bookings or answer any questions about your itinerary.</p>
          </div>
          <Button 
            className="bg-acme-pink hover:bg-opacity-90 text-white whitespace-nowrap"
            data-pendo-id="chat-with-travel-agent"
          >
            <MessageSquareIcon className="mr-2 h-4 w-4" />
            Chat with Travel Agent
          </Button>
        </div>
      </div>
    </AppLayout>
  );
};

export default TripSummary;
