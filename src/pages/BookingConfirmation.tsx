
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AppLayout from '@/components/layout/AppLayout';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useUser } from '@/contexts/UserContext';
import { CheckCircle, Calendar, HotelIcon, Car } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const BookingConfirmation: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useUser();
  const { toast } = useToast();
  
  useEffect(() => {
    // Track booking completed
    if ((window as any).trackBookingCompleted) {
      (window as any).trackBookingCompleted();
    }
    
    // Show notification toast for additional services
    setTimeout(() => {
      toast({
        title: "Complete your trip",
        description: "Add a hotel and car rental to your booking",
        action: (
          <Button 
            variant="outline"
            size="sm"
            onClick={() => navigate("/upsell")}
            data-pendo-id="add-services-toast-button"
          >
            View Options
          </Button>
        ),
      });
    }, 3000);
  }, [toast, navigate]);

  const formattedDepartDate = new Date().setDate(new Date().getDate() + 14);
  const formattedReturnDate = new Date().setDate(new Date().getDate() + 21);

  return (
    <AppLayout>
      <div className="max-w-4xl mx-auto px-4 py-12" data-pendo-id="booking-confirmation-page">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
            <CheckCircle className="h-8 w-8 text-green-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900">Booking Confirmed!</h1>
          <p className="text-lg text-gray-600 mt-2">Your trip to Munich has been booked successfully.</p>
        </div>
        
        {/* Booking Summary Card */}
        <Card className="border border-gray-200 rounded-xl overflow-hidden mb-8">
          <div className="bg-midnight-navy text-white px-6 py-4">
            <h2 className="text-xl font-semibold">Booking Summary</h2>
          </div>
          
          <div className="p-6">
            <div className="flex flex-col md:flex-row justify-between mb-6 pb-6 border-b border-gray-200">
              <div>
                <h3 className="text-lg font-medium text-gray-900">Flight Details</h3>
                <div className="mt-2">
                  <div className="flex items-start mb-2">
                    <div className="mr-2 bg-sky-blue/10 p-1 rounded">
                      <span className="text-xs font-medium text-sky-blue">SFO</span>
                    </div>
                    <div>
                      <p className="font-medium">San Francisco International Airport</p>
                      <p className="text-sm text-gray-500">
                        {new Date(formattedDepartDate).toLocaleDateString('en-US', { 
                          weekday: 'short', 
                          month: 'short', 
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center my-2">
                    <div className="border-t border-gray-300 flex-grow mx-2"></div>
                    <div className="text-sm text-gray-500">11h 25m</div>
                    <div className="border-t border-gray-300 flex-grow mx-2"></div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="mr-2 bg-sky-blue/10 p-1 rounded">
                      <span className="text-xs font-medium text-sky-blue">MUC</span>
                    </div>
                    <div>
                      <p className="font-medium">Munich International Airport</p>
                      <p className="text-sm text-gray-500">
                        {new Date(formattedDepartDate).toLocaleDateString('en-US', { 
                          weekday: 'short', 
                          month: 'short', 
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 md:mt-0">
                <h3 className="text-lg font-medium text-gray-900">Return Flight</h3>
                <div className="mt-2">
                  <div className="flex items-start mb-2">
                    <div className="mr-2 bg-sky-blue/10 p-1 rounded">
                      <span className="text-xs font-medium text-sky-blue">MUC</span>
                    </div>
                    <div>
                      <p className="font-medium">Munich International Airport</p>
                      <p className="text-sm text-gray-500">
                        {new Date(formattedReturnDate).toLocaleDateString('en-US', { 
                          weekday: 'short', 
                          month: 'short', 
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center my-2">
                    <div className="border-t border-gray-300 flex-grow mx-2"></div>
                    <div className="text-sm text-gray-500">12h 05m</div>
                    <div className="border-t border-gray-300 flex-grow mx-2"></div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="mr-2 bg-sky-blue/10 p-1 rounded">
                      <span className="text-xs font-medium text-sky-blue">SFO</span>
                    </div>
                    <div>
                      <p className="font-medium">San Francisco International Airport</p>
                      <p className="text-sm text-gray-500">
                        {new Date(formattedReturnDate).toLocaleDateString('en-US', { 
                          weekday: 'short', 
                          month: 'short', 
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex flex-col md:flex-row justify-between mb-6 pb-6 border-b border-gray-200">
              <div>
                <h3 className="text-lg font-medium text-gray-900">Passenger Information</h3>
                <p className="mt-1">{user.name}</p>
                <p className="text-gray-500">{user.email}</p>
              </div>
              
              <div className="mt-4 md:mt-0">
                <h3 className="text-lg font-medium text-gray-900">Booking Reference</h3>
                <p className="mt-1 font-mono font-bold text-lg">VOY-MUC-{Math.floor(Math.random() * 10000).toString().padStart(4, '0')}</p>
              </div>
            </div>
            
            <div className="flex flex-col md:flex-row justify-between">
              <div>
                <h3 className="text-lg font-medium text-gray-900">Payment Information</h3>
                <p className="mt-1">•••• •••• •••• 4242</p>
                <p className="text-gray-500">Paid in full</p>
              </div>
              
              <div className="mt-4 md:mt-0">
                <h3 className="text-lg font-medium text-gray-900">Total Amount</h3>
                <p className="mt-1 text-xl font-bold">€1,245.00</p>
                <p className="text-green-600 text-sm">Confirmed</p>
              </div>
            </div>
          </div>
        </Card>
        
        {/* Additional Services */}
        <div className="bg-sky-blue/5 rounded-xl p-6 mb-8" data-pendo-id="additional-services">
          <h2 className="text-xl font-semibold mb-4">Complete Your Trip</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-lg shadow-sm p-4 flex">
              <div className="bg-sky-blue/10 p-2 rounded-full h-12 w-12 flex items-center justify-center mr-4">
                <HotelIcon className="text-sky-blue h-6 w-6" />
              </div>
              <div className="flex-grow">
                <h3 className="font-medium">Add a Hotel</h3>
                <p className="text-sm text-gray-600 mb-3">Find accommodations near your destination.</p>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => navigate('/upsell')}
                  data-pendo-id="add-hotel-button"
                >
                  Browse Hotels
                </Button>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-sm p-4 flex">
              <div className="bg-sky-blue/10 p-2 rounded-full h-12 w-12 flex items-center justify-center mr-4">
                <Car className="text-sky-blue h-6 w-6" />
              </div>
              <div className="flex-grow">
                <h3 className="font-medium">Add a Rental Car</h3>
                <p className="text-sm text-gray-600 mb-3">Get around Munich with ease.</p>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => navigate('/upsell')}
                  data-pendo-id="add-car-button"
                >
                  Browse Cars
                </Button>
              </div>
            </div>
          </div>
        </div>
        
        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Button
            variant="outline"
            onClick={() => {
              navigate('/dashboard');
            }}
            data-pendo-id="go-to-dashboard-button"
          >
            Go to Dashboard
          </Button>
          
          <Button
            onClick={() => {
              // Show email toast notification
              toast({
                title: "Itinerary Sent",
                description: "A copy of your itinerary has been sent to your email",
              });
            }}
            data-pendo-id="email-itinerary-button"
          >
            Email Itinerary
          </Button>
          
          <Button
            variant="outline"
            onClick={() => {
              // Add calendar functionality
              if ((window as any).pendo && (window as any).pendo.track) {
                (window as any).pendo.track('Calendar Event Added');
              }
              toast({
                title: "Added to Calendar",
                description: "Your trip has been added to your calendar",
              });
            }}
            data-pendo-id="add-to-calendar-button"
          >
            <Calendar className="h-4 w-4 mr-2" />
            Add to Calendar
          </Button>
        </div>
      </div>
    </AppLayout>
  );
};

export default BookingConfirmation;
