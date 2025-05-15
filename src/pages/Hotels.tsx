
import React from "react";
import AppLayout from "@/components/layout/AppLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Star, Calendar, Users } from "lucide-react";

const Hotels = () => {
  const handleBookHotel = (hotelName: string) => {
    // Track hotel booking in Pendo
    if ((window as any).pendo && (window as any).pendo.track) {
      (window as any).pendo.track('Hotel Selected', {
        hotel_name: hotelName,
        page: 'hotels_upsell'
      });
    }
    
    // Navigate to booking confirmation
    window.location.href = '/booking-confirmation?type=hotel&hotel=' + encodeURIComponent(hotelName);
  };

  return (
    <AppLayout>
      <div className="p-6 space-y-6">
        <div className="bg-gradient-to-r from-sky-blue to-midnight-navy text-white rounded-lg p-6 flex flex-col md:flex-row items-center justify-between shadow-lg">
          <div className="mb-4 md:mb-0">
            <h1 className="text-2xl font-bold">Complete Your Munich Trip</h1>
            <p className="mt-2">Your flight is booked! Now find the perfect hotel for your business stay.</p>
          </div>
          <div className="flex space-x-4">
            <div className="flex flex-col items-center bg-white/10 rounded px-3 py-2">
              <Calendar className="h-5 w-5" />
              <span className="text-sm mt-1">Jun 15-20</span>
            </div>
            <div className="flex flex-col items-center bg-white/10 rounded px-3 py-2">
              <Users className="h-5 w-5" />
              <span className="text-sm mt-1">1 Person</span>
            </div>
          </div>
        </div>

        <h2 className="text-xl font-semibold mt-6">Recommended Hotels in Munich</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" data-pendo-id="hotel-recommendation-container">
          {/* Hotel Card 1 */}
          <Card className="overflow-hidden hover:shadow-lg transition-shadow" data-pendo-id="hotel-card-premium">
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=1080&q=80" 
                alt="Luxury Munich Hotel" 
                className="w-full h-48 object-cover"
              />
              <div className="absolute top-2 right-2 bg-white rounded-full px-2 py-1 text-xs font-semibold text-gray-700">
                Premium Partner
              </div>
            </div>
            <CardContent className="p-5">
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-bold text-lg">Grand Bavarian Hotel</h3>
                <div className="flex items-center">
                  <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                  <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                  <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                  <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                  <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                </div>
              </div>
              <p className="text-sm text-gray-600 mb-3">City Center · 0.4 mi from Conference Center</p>
              <ul className="text-sm text-gray-700 mb-4 space-y-1">
                <li>• Executive Business Lounge</li>
                <li>• High-Speed Wi-Fi</li>
                <li>• On-site Meeting Rooms</li>
              </ul>
              <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                <div>
                  <span className="text-2xl font-bold">€219</span>
                  <span className="text-gray-600 text-sm">/night</span>
                </div>
                <Button 
                  onClick={() => handleBookHotel("Grand Bavarian Hotel")}
                  data-pendo-id="book-hotel-1-button"
                >
                  Book Now
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Hotel Card 2 */}
          <Card className="overflow-hidden hover:shadow-lg transition-shadow">
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1578683010236-d716f9a3f461?ixlib=rb-4.0.3&auto=format&fit=crop&w=1080&q=80" 
                alt="Munich Business Hotel" 
                className="w-full h-48 object-cover"
              />
              <div className="absolute top-2 right-2 bg-sky-blue text-white rounded-full px-2 py-1 text-xs font-semibold">
                Corporate Rate
              </div>
            </div>
            <CardContent className="p-5">
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-bold text-lg">TechExec Suites</h3>
                <div className="flex items-center">
                  <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                  <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                  <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                  <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                  <Star className="h-4 w-4 text-gray-300" />
                </div>
              </div>
              <p className="text-sm text-gray-600 mb-3">Business District · 1.2 mi from Conference Center</p>
              <ul className="text-sm text-gray-700 mb-4 space-y-1">
                <li>• Business Center 24/7</li>
                <li>• Free Airport Shuttle</li>
                <li>• Complimentary Breakfast</li>
              </ul>
              <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                <div>
                  <span className="text-2xl font-bold">€175</span>
                  <span className="text-gray-600 text-sm">/night</span>
                </div>
                <Button 
                  onClick={() => handleBookHotel("TechExec Suites")}
                  data-pendo-id="book-hotel-2-button"
                >
                  Book Now
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Hotel Card 3 */}
          <Card className="overflow-hidden hover:shadow-lg transition-shadow">
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?ixlib=rb-4.0.3&auto=format&fit=crop&w=1080&q=80" 
                alt="Munich Boutique Hotel" 
                className="w-full h-48 object-cover"
              />
              <div className="absolute top-2 right-2 bg-amber-400 text-white rounded-full px-2 py-1 text-xs font-semibold">
                Best Value
              </div>
            </div>
            <CardContent className="p-5">
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-bold text-lg">Boutique Munich Inn</h3>
                <div className="flex items-center">
                  <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                  <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                  <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                  <Star className="h-4 w-4 text-gray-300" />
                  <Star className="h-4 w-4 text-gray-300" />
                </div>
              </div>
              <p className="text-sm text-gray-600 mb-3">University Area · 2.5 mi from Conference Center</p>
              <ul className="text-sm text-gray-700 mb-4 space-y-1">
                <li>• Cozy Work Areas</li>
                <li>• Craft Coffee Bar</li>
                <li>• Local Transit Pass</li>
              </ul>
              <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                <div>
                  <span className="text-2xl font-bold">€129</span>
                  <span className="text-gray-600 text-sm">/night</span>
                </div>
                <Button 
                  onClick={() => handleBookHotel("Boutique Munich Inn")}
                  data-pendo-id="book-hotel-3-button"
                >
                  Book Now
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AppLayout>
  );
};

export default Hotels;
