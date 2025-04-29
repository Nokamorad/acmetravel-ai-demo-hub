
import React, { useState } from 'react';
import AppLayout from "@/components/layout/AppLayout";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  PlaneIcon, 
  HotelIcon, 
  CalendarIcon, 
  MapPinIcon,
  UserIcon,
  ClockIcon,
  CreditCardIcon,
  PrinterIcon,
  ShareIcon,
  BellIcon,
  MessageSquareIcon,
  SearchIcon
} from "lucide-react";

const TripSummary = () => {
  const [activeTab, setActiveTab] = useState('upcoming');
  
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
          {/* Trip Card - San Francisco */}
          <Card className="border shadow-sm overflow-hidden" data-pendo-id="trip-sf-2023">
            <div className="lg:flex">
              <div className="lg:w-1/4">
                <img 
                  src="https://images.unsplash.com/photo-1501594907352-04cda38ebc29?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=300" 
                  alt="San Francisco" 
                  className="w-full h-40 lg:h-full object-cover"
                />
              </div>
              
              <div className="p-5 lg:w-3/4">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4">
                  <div>
                    <div className="flex items-center mb-1">
                      <span className="text-xs px-2 py-0.5 rounded-full bg-acme-purple/10 text-acme-purple mr-2">Business</span>
                      <span className="text-xs px-2 py-0.5 rounded-full bg-green-100 text-green-800">Confirmed</span>
                    </div>
                    <h2 className="text-lg font-bold text-acme-gray-dark">San Francisco Trip</h2>
                    <div className="flex items-center text-sm text-gray-600 mt-1">
                      <CalendarIcon className="h-3.5 w-3.5 mr-1" />
                      <span>May 15 - May 20, 2025</span>
                    </div>
                  </div>
                  
                  <div className="mt-3 sm:mt-0">
                    <Button 
                      data-pendo-id="trip-manage-btn"
                    >
                      Manage
                    </Button>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  {/* Flight Details */}
                  <div className="flex items-start space-x-3">
                    <div className="bg-blue-50 p-2 rounded-full">
                      <PlaneIcon className="h-4 w-4 text-blue-600" />
                    </div>
                    <div>
                      <h4 className="font-medium text-sm">United Airlines UA287</h4>
                      <div className="flex items-center text-sm text-gray-600 mt-1">
                        <span className="font-semibold">JFK</span>
                        <svg className="h-3 w-3 mx-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                        <span className="font-semibold">SFO</span>
                      </div>
                      <div className="text-xs text-gray-500 mt-1">May 15, 7:30 AM - 10:45 AM</div>
                    </div>
                  </div>
                  
                  {/* Hotel Details */}
                  <div className="flex items-start space-x-3">
                    <div className="bg-purple-50 p-2 rounded-full">
                      <HotelIcon className="h-4 w-4 text-purple-600" />
                    </div>
                    <div>
                      <h4 className="font-medium text-sm">Hilton San Francisco</h4>
                      <div className="text-xs text-gray-500 mt-1">May 15 - May 20 (5 nights)</div>
                      <div className="flex items-center text-xs text-gray-500 mt-1">
                        <MapPinIcon className="h-3 w-3 mr-1" />
                        <span>333 O'Farrell St, San Francisco</span>
                      </div>
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
                      data-pendo-id="trip-modify-btn"
                    >
                      Modify
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="text-xs text-red-600 hover:bg-red-50"
                      data-pendo-id="trip-cancel-btn"
                    >
                      Cancel
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </Card>
          
          {/* Trip Card - New York */}
          <Card className="border shadow-sm overflow-hidden" data-pendo-id="trip-nyc-2023">
            <div className="lg:flex">
              <div className="lg:w-1/4">
                <img 
                  src="https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=300" 
                  alt="New York" 
                  className="w-full h-40 lg:h-full object-cover"
                />
              </div>
              
              <div className="p-5 lg:w-3/4">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4">
                  <div>
                    <div className="flex items-center mb-1">
                      <span className="text-xs px-2 py-0.5 rounded-full bg-acme-purple/10 text-acme-purple mr-2">Business</span>
                      <span className="text-xs px-2 py-0.5 rounded-full bg-yellow-100 text-yellow-800">Pending</span>
                    </div>
                    <h2 className="text-lg font-bold text-acme-gray-dark">New York Conference</h2>
                    <div className="flex items-center text-sm text-gray-600 mt-1">
                      <CalendarIcon className="h-3.5 w-3.5 mr-1" />
                      <span>June 5 - June 10, 2025</span>
                    </div>
                  </div>
                  
                  <div className="mt-3 sm:mt-0">
                    <Button 
                      data-pendo-id="trip-manage-btn"
                    >
                      Manage
                    </Button>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  {/* Flight Details */}
                  <div className="flex items-start space-x-3">
                    <div className="bg-blue-50 p-2 rounded-full">
                      <PlaneIcon className="h-4 w-4 text-blue-600" />
                    </div>
                    <div>
                      <h4 className="font-medium text-sm">Delta Airlines DL342</h4>
                      <div className="flex items-center text-sm text-gray-600 mt-1">
                        <span className="font-semibold">SFO</span>
                        <svg className="h-3 w-3 mx-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                        <span className="font-semibold">JFK</span>
                      </div>
                      <div className="text-xs text-gray-500 mt-1">June 5, 6:15 AM - 2:45 PM</div>
                    </div>
                  </div>
                  
                  {/* Hotel Details */}
                  <div className="flex items-start space-x-3">
                    <div className="bg-gray-100 p-2 rounded-full">
                      <HotelIcon className="h-4 w-4 text-gray-500" />
                    </div>
                    <div>
                      <h4 className="font-medium text-sm">Hotel not yet booked</h4>
                      <div className="text-xs text-gray-500 mt-1">Need to book accommodation</div>
                      <Button 
                        variant="link" 
                        size="sm" 
                        className="text-xs text-acme-purple p-0 h-auto mt-1"
                      >
                        Book hotel now
                      </Button>
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
                      data-pendo-id="trip-modify-btn"
                    >
                      Modify
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="text-xs text-red-600 hover:bg-red-50"
                      data-pendo-id="trip-cancel-btn"
                    >
                      Cancel
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </Card>
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
