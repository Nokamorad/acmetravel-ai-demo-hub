
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, MapPin, Star, Wifi, UtensilsCrossed, Coffee } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import AppLayout from "@/components/layout/AppLayout";
import { useUser } from "@/contexts/UserContext";

const HotelCard = ({ hotel, onViewDetails }) => (
  <Card className="mb-6 overflow-hidden hover:shadow-lg transition-shadow" data-pendo-id={`hotel-card-${hotel.id}`}>
    <div className="flex flex-col md:flex-row">
      <div className="relative w-full md:w-64 h-48">
        <img src={hotel.image} alt={hotel.name} className="w-full h-full object-cover" />
        {hotel.price && (
          <Badge className="absolute top-3 left-3 bg-green-600 hover:bg-green-700">GREAT PRICE</Badge>
        )}
      </div>
      <CardContent className="flex-1 p-4">
        <div className="flex flex-col md:flex-row justify-between">
          <div>
            <h3 className="text-xl font-semibold mb-1">{hotel.name}</h3>
            <div className="flex items-center mb-2">
              <Star className="w-4 h-4 text-yellow-500 fill-yellow-500 mr-1" />
              <span className="text-sm font-medium">{hotel.rating}</span>
              {hotel.reviews && (
                <span className="text-sm text-gray-500 ml-1">({hotel.reviews})</span>
              )}
            </div>
            
            <div className="grid grid-cols-2 gap-2 mt-3">
              {hotel.amenities.map((amenity, index) => (
                <div key={index} className="flex items-center text-sm text-gray-600">
                  {amenity.icon}
                  <span className="ml-1">{amenity.name}</span>
                </div>
              ))}
            </div>
          </div>
          
          <div className="mt-4 md:mt-0 text-right">
            <div className="text-2xl font-bold text-green-600">${hotel.price}</div>
            <div className="text-sm text-gray-500 mb-4">{hotel.priceDescription}</div>
            <Button onClick={() => onViewDetails(hotel)} data-pendo-id={`view-hotel-${hotel.id}`}>
              View details
            </Button>
          </div>
        </div>
      </CardContent>
    </div>
  </Card>
);

const HotelDetailsDialog = ({ hotel, isOpen, onClose }) => {
  if (!hotel) return null;
  
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle className="text-2xl">Hotel details</DialogTitle>
        </DialogHeader>
        
        <div className="mt-6">
          <h2 className="text-xl font-semibold mb-4">Key amenities</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-y-4">
            <div className="flex items-center">
              <Wifi className="mr-2 h-5 w-5" />
              <span>Free Wi-Fi</span>
            </div>
            <div className="flex items-center">
              <UtensilsCrossed className="mr-2 h-5 w-5" />
              <span>Restaurant</span>
            </div>
            <div className="flex items-center">
              <Coffee className="mr-2 h-5 w-5" />
              <span>Bar/Lounge</span>
            </div>
            {hotel.extendedAmenities.map((amenity, index) => (
              <div key={index} className="flex items-center">
                {amenity.icon}
                <span className="ml-2">{amenity.name}</span>
              </div>
            ))}
          </div>
        </div>
        
        <div className="mt-6">
          <h2 className="text-xl font-semibold mb-4">Other amenities</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-y-4">
            {hotel.otherAmenities.map((amenity, index) => (
              <div key={index} className="flex items-center">
                {amenity.icon}
                <span className="ml-2">{amenity.name}</span>
              </div>
            ))}
          </div>
        </div>
        
        <div className="mt-6 bg-blue-50 p-4 rounded-lg flex items-start">
          <div className="text-blue-600 mr-3 mt-1">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="12" y1="16" x2="12" y2="12"></line>
              <line x1="12" y1="8" x2="12.01" y2="8"></line>
            </svg>
          </div>
          <p className="text-blue-600">
            Amenities are subject to changes or additional charges, at the property's
            discretion. Please contact the hotel directly to confirm availability or fees.
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};

const RecommendedHotels = () => {
  const navigate = useNavigate();
  const { user } = useUser();
  const [location, setLocation] = useState("Downtown, Raleigh, NC");
  const [selectedHotel, setSelectedHotel] = useState(null);
  const [showDetails, setShowDetails] = useState(false);
  
  // Demo hotel data
  const hotels = [
    {
      id: 1,
      name: "Holiday Inn Raleigh Downtown by IHG",
      rating: 3.7,
      reviews: "1.8K",
      image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      price: 143,
      priceDescription: "for a 3-star hotel",
      amenities: [
        { name: "3-star hotel", icon: <Star className="h-4 w-4 text-yellow-500" /> },
        { name: "Breakfast ($)", icon: <Coffee className="h-4 w-4" /> },
        { name: "Free Wi-Fi", icon: <Wifi className="h-4 w-4" /> },
        { name: "Air conditioning", icon: <svg className="h-4 w-4" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m3.314-5.686l-.707-.707M17.686 6.314l.707-.707M6.314 17.69l-.707.7M16.95 18.393l.707.707M8 12a4 4 0 1 1 8 0a4 4 0 0 1-8 0Z" /></svg> },
      ],
      extendedAmenities: [
        { name: "Non-smoking", icon: <svg className="h-5 w-5" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 4a1 1 0 1 1 2 0v5m-2 5a1 1 0 1 0 2 0v-5m3-4a2 2 0 0 0-2 2v9.5m-8 0a2 2 0 0 0 2-2v-1m0 0V9.25A2.25 2.25 0 0 1 9.25 7h.5M18 14v1a2 2 0 0 1-2 2H8.5M3 3l18 18" /></svg> },
        { name: "Accessible", icon: <svg className="h-5 w-5" viewBox="0 0 24 24"><circle cx="12" cy="7" r="4" fill="none" stroke="currentColor" strokeWidth="2" /><path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 11v4m0 0l-3 4m3-4l3 4" /></svg> },
        { name: "Business center", icon: <svg className="h-5 w-5" viewBox="0 0 24 24"><rect x="4" y="4" width="16" height="16" rx="2" fill="none" stroke="currentColor" strokeWidth="2" /><line x1="4" y1="9" x2="20" y2="9" stroke="currentColor" strokeWidth="2" /><line x1="4" y1="14" x2="20" y2="14" stroke="currentColor" strokeWidth="2" /></svg> },
      ],
      otherAmenities: [
        { name: "Dry cleaning", icon: <svg className="h-5 w-5" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 2v6m0-6l4 4m-4-4L8 6m10 10v-1a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v1m0 4v1a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2v-1" /></svg> },
        { name: "24/7 front desk", icon: <svg className="h-5 w-5" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" strokeWidth="2" d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10s-4.477 10-10 10Zm0-9V7m0 6l-3.5 3.5" /></svg> },
        { name: "Room service", icon: <svg className="h-5 w-5" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" d="M3 12h2a2 2 0 0 1 2 2v1a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-1Zm7 0h10m-10 4h10m-10-8h10m-12 0H4m0 4h1" /></svg> },
        { name: "Safe", icon: <svg className="h-5 w-5" viewBox="0 0 24 24"><rect x="3" y="5" width="18" height="14" rx="2" fill="none" stroke="currentColor" strokeWidth="2" /><path fill="none" stroke="currentColor" strokeWidth="2" d="M7 10h4m2 4a1 1 0 1 0 2 0a1 1 0 0 0-2 0Z" /></svg> },
      ],
      recommended: true,
      location: "Downtown Raleigh",
    },
    {
      id: 2,
      name: "The Casso, Raleigh, a Tribute Portfolio Hotel",
      rating: 4.5,
      reviews: "405",
      image: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      price: 219,
      priceDescription: "with excellent reviews",
      amenities: [
        { name: "3-star hotel", icon: <Star className="h-4 w-4 text-yellow-500" /> },
        { name: "Free Wi-Fi", icon: <Wifi className="h-4 w-4" /> },
        { name: "Parking ($)", icon: <svg className="h-4 w-4" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" strokeWidth="2" d="M9 17h6m-6-4h6m-6-4h6M7 21h10a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2Z" /></svg> },
        { name: "Pet-friendly", icon: <svg className="h-4 w-4" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 5.172C10 3.782 8.423 2.679 6.5 3c-2.823.47-4.113 6.006-4 7c.08.703 1.725 1.722 3.656 1C7.856 10.302 10 8.503 10 7.5m4 .672c0-1.39 1.577-2.493 3.5-2.172c2.823.47 4.113 6.006 4 7c-.08.703-1.725 1.722-3.656 1c-1.7-.699-3.844-2.498-3.844-3.5m-8 9.828c2 0 4-1 4-4c0 3 2 4 4 4s4-1 4-4c0-3.5-5-10-8-10c-3 0-8 6.5-8 10c0 3 2 4 4 4Z" /></svg> },
      ],
      extendedAmenities: [
        { name: "Non-smoking", icon: <svg className="h-5 w-5" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 4a1 1 0 1 1 2 0v5m-2 5a1 1 0 1 0 2 0v-5m3-4a2 2 0 0 0-2 2v9.5m-8 0a2 2 0 0 0 2-2v-1m0 0V9.25A2.25 2.25 0 0 1 9.25 7h.5M18 14v1a2 2 0 0 1-2 2H8.5M3 3l18 18" /></svg> },
        { name: "Accessible", icon: <svg className="h-5 w-5" viewBox="0 0 24 24"><circle cx="12" cy="7" r="4" fill="none" stroke="currentColor" strokeWidth="2" /><path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 11v4m0 0l-3 4m3-4l3 4" /></svg> },
        { name: "Business center", icon: <svg className="h-5 w-5" viewBox="0 0 24 24"><rect x="4" y="4" width="16" height="16" rx="2" fill="none" stroke="currentColor" strokeWidth="2" /><line x1="4" y1="9" x2="20" y2="9" stroke="currentColor" strokeWidth="2" /><line x1="4" y1="14" x2="20" y2="14" stroke="currentColor" strokeWidth="2" /></svg> },
      ],
      otherAmenities: [
        { name: "Dry cleaning", icon: <svg className="h-5 w-5" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 2v6m0-6l4 4m-4-4L8 6m10 10v-1a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v1m0 4v1a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2v-1" /></svg> },
        { name: "24/7 front desk", icon: <svg className="h-5 w-5" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" strokeWidth="2" d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10s-4.477 10-10 10Zm0-9V7m0 6l-3.5 3.5" /></svg> },
        { name: "Room service", icon: <svg className="h-5 w-5" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" d="M3 12h2a2 2 0 0 1 2 2v1a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-1Zm7 0h10m-10 4h10m-10-8h10m-12 0H4m0 4h1" /></svg> },
        { name: "Safe", icon: <svg className="h-5 w-5" viewBox="0 0 24 24"><rect x="3" y="5" width="18" height="14" rx="2" fill="none" stroke="currentColor" strokeWidth="2" /><path fill="none" stroke="currentColor" strokeWidth="2" d="M7 10h4m2 4a1 1 0 1 0 2 0a1 1 0 0 0-2 0Z" /></svg> },
      ],
      recommended: false,
      location: "Glenwood South",
    },
    {
      id: 3,
      name: "Residence Inn by Marriott Raleigh",
      rating: 4.3,
      reviews: "623",
      image: "https://images.unsplash.com/photo-1551632436-cbf8dd35adfa?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      price: 179,
      priceDescription: "special business rate",
      amenities: [
        { name: "4-star hotel", icon: <Star className="h-4 w-4 text-yellow-500" /> },
        { name: "Free Breakfast", icon: <Coffee className="h-4 w-4" /> },
        { name: "Free Wi-Fi", icon: <Wifi className="h-4 w-4" /> },
        { name: "Fitness center", icon: <svg className="h-4 w-4" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6.5 6.5h11m-11 11h11M7 10.5a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1H8a1 1 0 0 1-1-1v-3Z" /></svg> },
      ],
      extendedAmenities: [
        { name: "Non-smoking", icon: <svg className="h-5 w-5" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 4a1 1 0 1 1 2 0v5m-2 5a1 1 0 1 0 2 0v-5m3-4a2 2 0 0 0-2 2v9.5m-8 0a2 2 0 0 0 2-2v-1m0 0V9.25A2.25 2.25 0 0 1 9.25 7h.5M18 14v1a2 2 0 0 1-2 2H8.5M3 3l18 18" /></svg> },
        { name: "Accessible", icon: <svg className="h-5 w-5" viewBox="0 0 24 24"><circle cx="12" cy="7" r="4" fill="none" stroke="currentColor" strokeWidth="2" /><path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 11v4m0 0l-3 4m3-4l3 4" /></svg> },
        { name: "Business center", icon: <svg className="h-5 w-5" viewBox="0 0 24 24"><rect x="4" y="4" width="16" height="16" rx="2" fill="none" stroke="currentColor" strokeWidth="2" /><line x1="4" y1="9" x2="20" y2="9" stroke="currentColor" strokeWidth="2" /><line x1="4" y1="14" x2="20" y2="14" stroke="currentColor" strokeWidth="2" /></svg> },
      ],
      otherAmenities: [
        { name: "Dry cleaning", icon: <svg className="h-5 w-5" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 2v6m0-6l4 4m-4-4L8 6m10 10v-1a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v1m0 4v1a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2v-1" /></svg> },
        { name: "24/7 front desk", icon: <svg className="h-5 w-5" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" strokeWidth="2" d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10s-4.477 10-10 10Zm0-9V7m0 6l-3.5 3.5" /></svg> },
        { name: "Room service", icon: <svg className="h-5 w-5" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" d="M3 12h2a2 2 0 0 1 2 2v1a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-1Zm7 0h10m-10 4h10m-10-8h10m-12 0H4m0 4h1" /></svg> },
        { name: "Safe", icon: <svg className="h-5 w-5" viewBox="0 0 24 24"><rect x="3" y="5" width="18" height="14" rx="2" fill="none" stroke="currentColor" strokeWidth="2" /><path fill="none" stroke="currentColor" strokeWidth="2" d="M7 10h4m2 4a1 1 0 1 0 2 0a1 1 0 0 0-2 0Z" /></svg> },
      ],
      recommended: user.id === "demo-alexjohnson",
      location: "North Hills",
    }
  ];

  const suggestedDestinations = [
    { name: "Asheville", image: "https://images.unsplash.com/photo-1583394295922-ae5224af9141?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&h=200&q=80" },
    { name: "Charlotte", image: "https://images.unsplash.com/photo-1611254108710-3b6d36e30596?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&h=200&q=80" },
    { name: "Wilmington", image: "https://images.unsplash.com/photo-1617859047452-8510bcf207fd?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&h=200&q=80" },
    { name: "Outer Banks", image: "https://images.unsplash.com/photo-1626296084708-d5e1d91dafbc?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&h=200&q=80" },
    { name: "Greensboro", image: "https://images.unsplash.com/photo-1558025137-0d841582f7b7?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&h=200&q=80" },
  ];

  const handleHotelClick = (hotel) => {
    setSelectedHotel(hotel);
    setShowDetails(true);
    
    // Track with Pendo
    if ((window as any).pendo && (window as any).pendo.track) {
      (window as any).pendo.track('Hotel Details Viewed', {
        hotel_name: hotel.name,
        hotel_id: hotel.id,
      });
    }
  };

  const handleBookHotel = (hotel) => {
    // Track hotel booking with Pendo
    if ((window as any).pendo && (window as any).pendo.track) {
      (window as any).pendo.track('Hotel Booking Started', {
        hotel_name: hotel.name,
        hotel_id: hotel.id,
      });
    }
    
    // Navigate to booking page with hotel info
    navigate('/book', { 
      state: { 
        hotelPreselected: true, 
        hotel: {
          name: hotel.name,
          location: hotel.location,
          price: hotel.price
        } 
      } 
    });
  };

  return (
    <AppLayout>
      <div className="container mx-auto px-4 py-6" data-pendo-id="hotel-recommendations-page">
        {/* Search Section */}
        <div className="bg-white p-4 rounded-lg shadow-md mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-grow">
              <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <Input
                className="pl-10 pr-4 py-2"
                placeholder="Search destination"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                data-pendo-id="hotel-search-input"
              />
            </div>
            <div className="flex gap-2">
              <Button variant="outline" className="flex-grow md:flex-grow-0" data-pendo-id="hotel-search-date-btn">
                May 19 - 20
              </Button>
              <Button variant="outline" className="flex-grow md:flex-grow-0" data-pendo-id="hotel-search-guests-btn">
                2 guests
              </Button>
              <Button 
                className="flex-grow md:flex-grow-0 bg-sky-blue hover:bg-sky-blue/90" 
                data-pendo-id="hotel-search-btn"
              >
                Search
              </Button>
            </div>
          </div>
        </div>

        {/* Filter pills */}
        <div className="flex flex-wrap gap-2 mb-6">
          <Button variant="outline" size="sm" data-pendo-id="filter-all">All filters</Button>
          <Button variant="outline" size="sm" data-pendo-id="filter-price">Under $50</Button>
          <Button variant="outline" size="sm" data-pendo-id="filter-pool">Pool</Button>
          <Button variant="outline" size="sm" data-pendo-id="filter-rating">4+ rating</Button>
          <Button variant="outline" size="sm" data-pendo-id="filter-star">4- or 5-star</Button>
          <Button variant="outline" size="sm" data-pendo-id="filter-fitness">Fitness center</Button>
        </div>

        {/* Suggested Destinations */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Suggested destinations</h2>
          <p className="text-gray-600 mb-4">Based on your location</p>
          
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {suggestedDestinations.map((destination, index) => (
              <div 
                key={index} 
                className="relative rounded-lg overflow-hidden h-40 cursor-pointer group"
                data-pendo-id={`destination-${destination.name.toLowerCase()}`}
              >
                <img 
                  src={destination.image} 
                  alt={destination.name} 
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-3">
                  <h3 className="text-white font-medium">{destination.name}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Hotel Results */}
        <div>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-semibold">Hotels near {location}</h2>
            <span className="text-gray-600">{hotels.length} results</span>
          </div>
          
          <div className="space-y-6">
            {hotels.map(hotel => (
              <div key={hotel.id} className="relative">
                {hotel.recommended && (
                  <div className="absolute -top-3 left-4 z-10 bg-sky-blue text-white px-3 py-1 rounded-full text-sm font-medium" data-pendo-id={`hotel-recommended-${hotel.id}`}>
                    Recommended for you
                  </div>
                )}
                <HotelCard 
                  hotel={hotel} 
                  onViewDetails={() => handleHotelClick(hotel)} 
                />
                
                {hotel.recommended && (
                  <div className="bg-sky-blue/10 border border-sky-blue/20 rounded-lg p-4 -mt-4 mb-8" data-pendo-id={`hotel-recommendation-reason-${hotel.id}`}>
                    <div className="flex items-start">
                      <div className="bg-sky-blue rounded-full p-1 mr-3">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"></path><path d="m9 12 2 2 4-4"></path></svg>
                      </div>
                      <div>
                        <p className="font-medium text-gray-800">Personalized recommendation</p>
                        <p className="text-sm text-gray-600">This hotel matches your preferences based on your previous bookings and search history.</p>
                        <Button 
                          size="sm" 
                          className="mt-2 bg-sky-blue hover:bg-sky-blue/90"
                          onClick={() => handleBookHotel(hotel)}
                          data-pendo-id={`book-recommended-hotel-${hotel.id}`}
                        >
                          Book this hotel
                        </Button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
        
        {/* Hotel Details Dialog */}
        <HotelDetailsDialog 
          hotel={selectedHotel} 
          isOpen={showDetails} 
          onClose={() => setShowDetails(false)} 
        />
      </div>
    </AppLayout>
  );
};

export default RecommendedHotels;
