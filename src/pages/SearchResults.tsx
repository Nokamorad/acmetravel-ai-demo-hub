
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";

const SearchResults = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState("Best Munich business hotel");
  
  // Parse query parameter
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const query = params.get('q');
    if (query) {
      setSearchQuery(query);
    }
    
    // Track search results page view in Pendo
    if ((window as any).pendo && (window as any).pendo.track) {
      (window as any).pendo.track('Viewed Search Results', {
        query: query || searchQuery,
        page: 'search_results'
      });
    }
  }, [location.search]);
  
  const handleAdClick = () => {
    // Track the ad click in Pendo
    if ((window as any).pendo && (window as any).pendo.track) {
      (window as any).pendo.track('Clicked Voyager Ad', {
        query: searchQuery,
        source: 'search_results'
      });
    }
    
    // Navigate to marketing site with UTM parameters
    navigate('/voyager-marketing?utm_source=google&utm_medium=search&utm_campaign=munichtrip&utm_term=business%20hotel&utm_content=top-link');
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Update the URL with the new search query
    navigate(`/search-results?q=${encodeURIComponent(searchQuery)}`);
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Header */}
      <header className="border-b border-gray-200 py-3 px-6 sticky top-0 bg-white z-10">
        <div className="flex items-center">
          <Link to="/search" className="text-2xl font-bold text-blue-500 mr-4">
            Boogle
          </Link>
          <form onSubmit={handleSearch} className="flex-grow max-w-2xl">
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full h-10 pl-10 pr-4 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                data-pendo-id="search-results-input"
              />
              <Search className="absolute left-3 top-2 h-6 w-6 text-gray-400" />
              <Button 
                type="submit"
                className="absolute right-2 top-1 bg-transparent hover:bg-gray-100 text-gray-500 p-2 rounded-full"
                data-pendo-id="search-results-button"
              >
                <Search className="h-4 w-4" />
              </Button>
            </div>
          </form>
        </div>
      </header>

      {/* Search Results */}
      <main className="py-4 px-6 md:px-32">
        <div className="mb-2 text-sm text-gray-600">
          About 1,230,000 results (0.42 seconds)
        </div>
        
        {/* Ad Result */}
        <div className="border rounded-lg p-4 mb-6 bg-gray-50" data-pendo-id="voyager-ad-container">
          <div className="flex items-start">
            <div className="flex-1">
              <div className="flex items-center">
                <span className="text-xs bg-blue-100 text-blue-800 px-2 py-0.5 rounded mr-2">Ad</span>
                <span className="text-sm text-green-700">voyagr.com</span>
              </div>
              <h2 className="text-xl font-semibold text-blue-700 mt-1">
                Voyagr - Book Your Business Trip to Munich | Top Rated Business Hotels
              </h2>
              <p className="text-sm text-gray-700 mt-1">
                Find the perfect Munich business hotel. Exclusive corporate rates, flexible booking, 
                and 24/7 travel support for business professionals.
              </p>
              <Button 
                variant="link" 
                className="p-0 h-auto mt-2 text-blue-700" 
                onClick={handleAdClick}
                data-pendo-id="voyager-ad-button"
              >
                Book Your Munich Trip Now
              </Button>
            </div>
            <div className="hidden md:block">
              <img 
                src="https://images.unsplash.com/photo-1599982890963-3aabd60b27b9?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80" 
                alt="Munich Skyline" 
                className="w-32 h-24 object-cover rounded"
              />
            </div>
          </div>
        </div>
        
        {/* Organic Results */}
        <div className="space-y-6">
          <div className="mb-4">
            <a href="#" className="text-xl text-blue-700 font-medium hover:underline">
              Top 10 Business Hotels in Munich - TravelAdvisor
            </a>
            <div className="text-sm text-green-700">www.traveladvisor.com › Europe › Germany › Munich</div>
            <p className="text-sm text-gray-700 mt-1">
              May 5, 2025 — Our expert-compiled list of the best business hotels in Munich. 
              Compare prices, facilities, and business amenities including meeting rooms...
            </p>
          </div>
          
          <div className="mb-4">
            <a href="#" className="text-xl text-blue-700 font-medium hover:underline">
              Munich Business Hotels | Booking.com
            </a>
            <div className="text-sm text-green-700">booking.com › City › Germany › Munich</div>
            <p className="text-sm text-gray-700 mt-1">
              Great selection of business hotels in Munich. Read hotel reviews from real guests and 
              book the perfect hotel for your business trip.
            </p>
          </div>
          
          <div className="mb-4">
            <a href="#" className="text-xl text-blue-700 font-medium hover:underline">
              5-Star Business Hotels in Munich - HotelFinder
            </a>
            <div className="text-sm text-green-700">hotelfinder.com › munich-business-hotels</div>
            <p className="text-sm text-gray-700 mt-1">
              Luxury business accommodations in Munich city center. Perfect for corporate travelers 
              with high-speed WiFi, conference facilities, and premium service.
            </p>
          </div>
          
          <div className="mb-4">
            <a href="#" className="text-xl text-blue-700 font-medium hover:underline">
              Munich Business Travel Guide 2025 - BusinessTraveller
            </a>
            <div className="text-sm text-green-700">businesstraveller.com › guides › munich</div>
            <p className="text-sm text-gray-700 mt-1">
              Everything you need to know for your business trip to Munich. Hotel recommendations, 
              transportation tips, dining options, and more.
            </p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-auto border-t border-gray-200 py-4 px-6">
        <div className="flex justify-between text-sm text-gray-600">
          <div>
            <span className="mr-4">Privacy</span>
            <span className="mr-4">Terms</span>
            <span>Settings</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default SearchResults;
