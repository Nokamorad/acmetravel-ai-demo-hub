import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";

const SearchResults = () => {
  const navigate = useNavigate();
  
  const handleVoyagrClick = () => {
    // Track click event in Pendo
    if ((window as any).pendo && (window as any).pendo.track) {
      (window as any).pendo.track('Clicked Voyagr Link');
    }
    navigate('/book');
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Header */}
      <header className="w-full py-3 px-6 border-b flex items-center">
        <div className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-sky-blue mr-6">
          Boogle
        </div>
        <div className="flex-grow max-w-2xl">
          <div className="relative">
            <Input 
              type="text" 
              defaultValue="Company Travel: Flights to New York"
              className="w-full h-10 pl-10 pr-12 border border-gray-300 rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <Search className="absolute left-3 top-2 h-5 w-5 text-gray-400" />
            <Button 
              className="absolute right-2 top-1 bg-transparent hover:bg-gray-100 text-gray-500 p-2 rounded-full"
            >
              <Search className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow py-6 px-4 max-w-3xl mx-auto">
        <div className="text-sm text-gray-600 mb-4">
          About 128,000,000 results (0.42 seconds)
        </div>

        <div className="space-y-8">
          {/* Featured Result - Voyagr */}
          <div className="border border-gray-200 rounded-lg p-4 bg-blue-50" data-pendo-id="voyagr-search-result">
            <div className="flex items-center mb-1">
              <span className="text-xs text-gray-500 border border-gray-300 rounded px-1 mr-2">Ad</span>
              <span className="text-sm text-green-700">voyagr.co › business › travel</span>
            </div>
            <h3 className="text-xl font-medium text-blue-700 mb-1 cursor-pointer" onClick={handleVoyagrClick}>
              Voyagr: Smart Business Travel Management | Find Flights to New York
            </h3>
            <p className="text-sm text-gray-700 mb-2">
              The intelligent travel platform that helps businesses save time and money. Book flights, hotels, and car rentals all in one place. Special discounts for corporate accounts.
            </p>
            <div className="flex flex-wrap">
              <Button 
                variant="link" 
                className="text-blue-700 p-0 h-auto text-sm mr-6"
                onClick={handleVoyagrClick}
              >
                Book Flights to New York
              </Button>
              <Button 
                variant="link" 
                className="text-blue-700 p-0 h-auto text-sm mr-6"
                onClick={handleVoyagrClick}
              >
                Business Travel Solutions
              </Button>
              <Button 
                variant="link" 
                className="text-blue-700 p-0 h-auto text-sm"
                onClick={handleVoyagrClick}
              >
                Corporate Rates
              </Button>
            </div>
          </div>

          {/* Other Results */}
          <div className="py-2">
            <div className="text-sm text-green-700 mb-1">travelbiz.example › business-travel</div>
            <h3 className="text-xl font-medium text-blue-700 mb-1">Business Flights to NYC | TravelBiz</h3>
            <p className="text-sm text-gray-700">
              Find the best deals on business class flights to New York. Exclusive corporate rates available for registered businesses.
            </p>
          </div>

          <div className="py-2">
            <div className="text-sm text-green-700 mb-1">flightmaster.example › destinations › new-york</div>
            <h3 className="text-xl font-medium text-blue-700 mb-1">Cheap Flights to New York from San Francisco | FlightMaster</h3>
            <p className="text-sm text-gray-700">
              Book affordable flights to New York from San Francisco. Compare prices from all major airlines and find the best deal.
            </p>
          </div>

          <div className="py-2">
            <div className="text-sm text-green-700 mb-1">corporatetraveler.example › us › nyc</div>
            <h3 className="text-xl font-medium text-blue-700 mb-1">Corporate Traveler | New York Business Flights</h3>
            <p className="text-sm text-gray-700">
              Specialized solutions for business travel to New York. Our travel experts help you find the most convenient flights at competitive rates.
            </p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full bg-gray-100 py-3 px-6 text-sm text-gray-600">
        <div className="flex justify-between items-center">
          <div>
            <span>Advertising</span>
            <span className="mx-4">Business</span>
            <span>How Search works</span>
          </div>
          <div>
            <span>Privacy</span>
            <span className="mx-4">Terms</span>
            <span>Settings</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default SearchResults;
