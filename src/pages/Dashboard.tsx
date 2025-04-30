import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  CalendarIcon, 
  MapPinIcon, 
  PlusCircleIcon, 
  PlaneIcon,
  SearchIcon,
  FilterIcon,
  HotelIcon,
  CarIcon,
  CheckIcon,
  ChevronRightIcon,
  MessageSquareIcon
} from "lucide-react";
import AppLayout from "@/components/layout/AppLayout";
import PendoExperiment from "@/components/pendo/PendoExperiment";
import { generateUniqueTrips, generateUniqueTransactions } from '@/utils/dataGenerator';

const Dashboard = () => {
  const navigate = useNavigate();
  const [upcomingTrips, setUpcomingTrips] = useState([]);
  const [recentTransactions, setRecentTransactions] = useState([]);
  
  // Generate unique travel data for visitor
  useEffect(() => {
    const visitorId = localStorage.getItem('acmetravel_visitor') 
      ? JSON.parse(localStorage.getItem('acmetravel_visitor')).visitor_id 
      : null;
    
    // Generate unique data based on visitor ID
    setUpcomingTrips(generateUniqueTrips(visitorId));
    setRecentTransactions(generateUniqueTransactions(visitorId));
  }, []);
  
  return (
    <AppLayout>
      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Dashboard Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-5">
          <div>
            <h1 className="text-2xl font-bold text-acme-gray-dark">Dashboard</h1>
          </div>
          <Button 
            size="sm"
            className="mt-2 sm:mt-0 bg-acme-purple hover:bg-acme-purple-dark text-white"
            onClick={() => navigate('/book')}
          >
            <PlusCircleIcon className="mr-1 h-4 w-4" />
            New Trip
          </Button>
        </div>
        
        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <Card className="bg-white border shadow-sm">
            <CardContent className="p-4">
              <div className="flex items-center gap-3" data-pendo-id="quick-action-search">
                <div className="bg-blue-100 rounded p-2">
                  <SearchIcon className="h-4 w-4 text-blue-600" />
                </div>
                <div className="flex-1">
                  <h3 className="font-medium">Search Flights</h3>
                  <p className="text-xs text-gray-500">Find available flights for your next trip</p>
                </div>
                <ChevronRightIcon className="h-4 w-4 text-gray-400" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-white border shadow-sm">
            <CardContent className="p-4">
              <div className="flex items-center gap-3" data-pendo-id="quick-action-hotels">
                <div className="bg-purple-100 rounded p-2">
                  <HotelIcon className="h-4 w-4 text-purple-600" />
                </div>
                <div className="flex-1">
                  <h3 className="font-medium">Book Hotels</h3>
                  <p className="text-xs text-gray-500">Find accommodations near your destination</p>
                </div>
                <ChevronRightIcon className="h-4 w-4 text-gray-400" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-white border shadow-sm">
            <CardContent className="p-4">
              <div className="flex items-center gap-3" data-pendo-id="quick-action-cars">
                <div className="bg-green-100 rounded p-2">
                  <CarIcon className="h-4 w-4 text-green-600" />
                </div>
                <div className="flex-1">
                  <h3 className="font-medium">Rental Cars</h3>
                  <p className="text-xs text-gray-500">Compare and book rental cars</p>
                </div>
                <ChevronRightIcon className="h-4 w-4 text-gray-400" />
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Upcoming Trips Section */}
        <section className="mb-6">
          <div className="flex justify-between items-center mb-3">
            <h2 className="text-lg font-semibold text-acme-gray-dark">Your Upcoming Trips</h2>
            <Button 
              variant="ghost" 
              size="sm" 
              className="text-xs text-acme-purple"
              onClick={() => navigate('/trip')}
            >
              View all trips
            </Button>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {upcomingTrips.map((trip) => (
              <Card 
                key={trip.id} 
                className="overflow-hidden border shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex h-full">
                  <div className="w-1/3 h-auto">
                    <img 
                      src={trip.image} 
                      alt={trip.destination} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="w-2/3 p-4">
                    <div className="flex justify-between">
                      <h3 className="font-medium text-base">{trip.destination}</h3>
                      <span className={`text-xs px-2 py-0.5 rounded-full ${
                        trip.status === 'Confirmed' 
                          ? 'bg-green-100 text-green-800' 
                          : trip.status === 'Pending'
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-blue-100 text-blue-800'
                      }`}>
                        {trip.status}
                      </span>
                    </div>
                    
                    <div className="flex items-center text-gray-500 mt-1">
                      <CalendarIcon className="h-3 w-3 mr-1" />
                      <span className="text-xs">{trip.dates}</span>
                    </div>
                    
                    <div className="mt-3">
                      <Button 
                        variant="outline" 
                        size="sm"
                        className="text-xs"
                        onClick={() => navigate('/trip')}
                      >
                        Manage
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </section>
        
        {/* Recent Transactions / Expenses */}
        <section className="mb-6">
          <div className="flex justify-between items-center mb-3">
            <h2 className="text-lg font-semibold text-acme-gray-dark">Recent Transactions</h2>
          </div>
          
          <Card className="border shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 text-gray-700 text-xs">
                  <tr>
                    <th className="text-left py-3 px-4 font-medium">Vendor</th>
                    <th className="text-left py-3 px-4 font-medium">Date</th>
                    <th className="text-left py-3 px-4 font-medium">Category</th>
                    <th className="text-left py-3 px-4 font-medium">Status</th>
                    <th className="text-right py-3 px-4 font-medium">Amount</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {recentTransactions.map((transaction) => (
                    <tr key={transaction.id} className="text-sm">
                      <td className="py-3 px-4">{transaction.vendor}</td>
                      <td className="py-3 px-4 text-gray-500 text-xs">{transaction.date}</td>
                      <td className="py-3 px-4">{transaction.category}</td>
                      <td className="py-3 px-4">
                        <span className={`text-xs px-2 py-0.5 rounded-full ${
                          transaction.status === 'Approved' ? 'bg-green-100 text-green-800' :
                          transaction.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                          transaction.status === 'Submitted' ? 'bg-blue-100 text-blue-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {transaction.status}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-right font-medium">${transaction.amount.toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </section>
        
        {/* Suggested Hotels (Pendo Experiment Zone) */}
        <section className="mb-6" data-pendo-id="suggested-hotels-section">
          <div className="flex justify-between items-center mb-3">
            <h2 className="text-lg font-semibold text-acme-gray-dark">Suggested Hotels</h2>
          </div>
          
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
        
        {/* Travel Assistant Section */}
        <section className="bg-gray-50 border border-gray-200 rounded-lg p-4 flex items-center justify-between">
          <div>
            <h3 className="font-medium text-acme-gray-dark mb-1">Need help planning your next trip?</h3>
            <p className="text-sm text-gray-600">Ask Travel Agent for recommendations, policy questions, or booking assistance.</p>
          </div>
          <Button 
            className="bg-acme-pink hover:bg-opacity-90 text-white whitespace-nowrap"
          >
            <MessageSquareIcon className="mr-2 h-4 w-4" />
            Chat with Travel Agent
          </Button>
        </section>
      </div>
    </AppLayout>
  );
};

export default Dashboard;
