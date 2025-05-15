
import React, { useState, useEffect } from 'react';
import AppLayout from "@/components/layout/AppLayout";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Building, Car, ArrowRight, X } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";

const Upsell = () => {
  const [activeOption, setActiveOption] = useState<'hotel' | 'ride' | null>(null);
  const [showDialog, setShowDialog] = useState(false);
  const [testGroup, setTestGroup] = useState<'A' | 'B'>('A');
  const navigate = useNavigate();
  
  // Determine A/B test group on mount
  useEffect(() => {
    const group = Math.random() < 0.5 ? 'A' : 'B';
    setTestGroup(group);
    
    // Track A/B test assignment with Pendo
    if ((window as any).pendo && (window as any).pendo.track) {
      (window as any).pendo.track('Upsell AB Test Assignment', {
        test_group: group
      });
    }
  }, []);
  
  const handleSelect = (option: 'hotel' | 'ride') => {
    setActiveOption(option);
    
    // Track selection with Pendo
    if ((window as any).pendo && (window as any).pendo.track) {
      (window as any).pendo.track('Upsell Option Selected', {
        option: option,
        test_group: testGroup
      });
    }
    
    // For hotel option, navigate to hotels page
    if (option === 'hotel') {
      navigate('/hotels');
    } else {
      // For ride option, show dialog
      setShowDialog(true);
    }
  };
  
  return (
    <AppLayout>
      <div className="p-6 max-w-3xl mx-auto">
        <div className="mb-8 text-center">
          <h1 className="text-2xl font-bold text-midnight-navy">Complete Your Travel Experience</h1>
          <p className="text-gray-600 mt-2">
            Add these travel essentials to make your trip smoother and more enjoyable
          </p>
        </div>
        
        {testGroup === 'A' ? (
          // Option A: Side by side cards
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6" data-pendo-id="upsell-test-a">
            <Card 
              className={`p-6 border-2 hover:shadow-md transition-shadow ${
                activeOption === 'hotel' ? 'border-sky-blue' : 'border-gray-200'
              }`}
              onClick={() => handleSelect('hotel')}
              data-pendo-id="upsell-hotel-card"
            >
              <div className="flex flex-col h-full">
                <div className="mb-4 flex justify-between items-center">
                  <div className="bg-sky-blue/10 p-3 rounded-full">
                    <Building className="h-6 w-6 text-sky-blue" />
                  </div>
                  <span className="text-sm font-medium bg-green-100 text-green-800 px-2 py-0.5 rounded">
                    Save 15%
                  </span>
                </div>
                
                <h2 className="text-xl font-semibold mb-2">Book a Hotel</h2>
                <p className="text-gray-600 mb-4 flex-grow">
                  Find the perfect place to stay near your destination with special traveler discounts.
                </p>
                
                <Button 
                  className="mt-auto bg-sky-blue hover:bg-sky-blue/90 w-full"
                  onClick={() => handleSelect('hotel')}
                  data-pendo-id="book-hotel-button"
                >
                  Browse Hotels <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </Card>
            
            <Card 
              className={`p-6 border-2 hover:shadow-md transition-shadow ${
                activeOption === 'ride' ? 'border-sunset-coral' : 'border-gray-200'
              }`}
              onClick={() => handleSelect('ride')}
              data-pendo-id="upsell-ride-card"
            >
              <div className="flex flex-col h-full">
                <div className="mb-4 flex justify-between items-center">
                  <div className="bg-sunset-coral/10 p-3 rounded-full">
                    <Car className="h-6 w-6 text-sunset-coral" />
                  </div>
                  <span className="text-sm font-medium bg-blue-100 text-blue-800 px-2 py-0.5 rounded">
                    $10 Credit
                  </span>
                </div>
                
                <h2 className="text-xl font-semibold mb-2">Schedule a Ride</h2>
                <p className="text-gray-600 mb-4 flex-grow">
                  Book your airport pickup with Zyft and enjoy a seamless arrival experience.
                </p>
                
                <Button 
                  className="mt-auto bg-sunset-coral hover:bg-sunset-coral/90 w-full"
                  onClick={() => handleSelect('ride')}
                  data-pendo-id="book-ride-button"
                >
                  Schedule Ride <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </Card>
          </div>
        ) : (
          // Option B: Single prominent card with tabs
          <Card className="overflow-hidden border-2 border-gray-200" data-pendo-id="upsell-test-b">
            <div className="flex border-b">
              <button 
                className={`flex-1 py-4 font-medium text-center ${
                  activeOption !== 'ride' ? 'bg-sky-blue text-white' : 'bg-gray-100'
                }`}
                onClick={() => setActiveOption('hotel')}
                data-pendo-id="hotel-tab"
              >
                <Building className="h-4 w-4 inline mr-2" />
                Hotel
              </button>
              <button 
                className={`flex-1 py-4 font-medium text-center ${
                  activeOption === 'ride' ? 'bg-sunset-coral text-white' : 'bg-gray-100'
                }`}
                onClick={() => setActiveOption('ride')}
                data-pendo-id="ride-tab"
              >
                <Car className="h-4 w-4 inline mr-2" />
                Ride
              </button>
            </div>
            
            <div className="p-6">
              {activeOption !== 'ride' ? (
                <div>
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-2xl font-bold">Book Your Hotel</h2>
                    <span className="text-sm font-medium bg-green-100 text-green-800 px-2 py-0.5 rounded">
                      Special Rate
                    </span>
                  </div>
                  
                  <p className="text-gray-600 mb-6">
                    We've found several hotels near your destination in New York. 
                    Book now to secure our special corporate rates and earn extra rewards points.
                  </p>
                  
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="bg-gray-100 rounded-lg p-3">
                      <p className="text-sm text-gray-500">Average Nightly Rate</p>
                      <p className="font-bold text-lg">$195</p>
                    </div>
                    <div className="bg-gray-100 rounded-lg p-3">
                      <p className="text-sm text-gray-500">Recommended Stay</p>
                      <p className="font-bold text-lg">3 nights</p>
                    </div>
                  </div>
                  
                  <Button 
                    className="w-full bg-sky-blue hover:bg-sky-blue/90"
                    onClick={() => handleSelect('hotel')}
                    data-pendo-id="view-hotels-button"
                  >
                    View Available Hotels <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              ) : (
                <div>
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-2xl font-bold">Schedule Airport Transfer</h2>
                    <span className="text-sm font-medium bg-blue-100 text-blue-800 px-2 py-0.5 rounded">
                      $10 Credit
                    </span>
                  </div>
                  
                  <p className="text-gray-600 mb-6">
                    Skip the taxi line and travel in comfort with Zyft. 
                    Your driver will meet you at the arrival gate and help with your luggage.
                  </p>
                  
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="bg-gray-100 rounded-lg p-3">
                      <p className="text-sm text-gray-500">Estimated Fare</p>
                      <p className="font-bold text-lg">$65</p>
                    </div>
                    <div className="bg-gray-100 rounded-lg p-3">
                      <p className="text-sm text-gray-500">Travel Time</p>
                      <p className="font-bold text-lg">~45 min</p>
                    </div>
                  </div>
                  
                  <Button 
                    className="w-full bg-sunset-coral hover:bg-sunset-coral/90"
                    onClick={() => handleSelect('ride')}
                    data-pendo-id="schedule-ride-button"
                  >
                    Schedule Ride <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              )}
            </div>
          </Card>
        )}
        
        <div className="mt-6 text-center">
          <Button 
            variant="link" 
            onClick={() => {
              // Track skip with Pendo
              if ((window as any).pendo && (window as any).pendo.track) {
                (window as any).pendo.track('Upsell Skipped', {
                  test_group: testGroup
                });
              }
              
              navigate('/dashboard');
            }}
            data-pendo-id="skip-upsell"
          >
            Skip for now
          </Button>
        </div>
      </div>
      
      {/* Ride Booking Dialog */}
      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Schedule Your Ride</DialogTitle>
          </DialogHeader>
          
          <div className="py-4">
            <p className="mb-4">
              This is a demo integration with Zyft ride service. In a real application,
              you would be able to book your airport transfer here.
            </p>
            
            <div className="bg-amber-50 border border-amber-200 rounded-md p-3">
              <p className="text-sm text-amber-800">
                For the purposes of this demo, clicking "Book Ride" will simulate a 
                successful booking and redirect you to the dashboard.
              </p>
            </div>
          </div>
          
          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => setShowDialog(false)}
              data-pendo-id="cancel-ride"
            >
              Cancel
            </Button>
            <Button 
              onClick={() => {
                setShowDialog(false);
                
                // Track ride booking with Pendo
                if ((window as any).pendo && (window as any).pendo.track) {
                  (window as any).pendo.track('Ride Booked', {
                    test_group: testGroup
                  });
                }
                
                toast({
                  title: "Ride scheduled!",
                  description: "Your Zyft ride has been confirmed",
                });
                
                navigate('/dashboard');
              }}
              className="bg-sunset-coral hover:bg-sunset-coral/90"
              data-pendo-id="book-ride"
            >
              Book Ride
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </AppLayout>
  );
};

export default Upsell;
