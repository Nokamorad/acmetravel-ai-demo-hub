
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, ChevronRight } from "lucide-react";
import { 
  Pagination, 
  PaginationContent, 
  PaginationEllipsis, 
  PaginationItem, 
  PaginationLink, 
  PaginationNext, 
  PaginationPrevious 
} from "@/components/ui/pagination";
import { Card, CardContent } from "@/components/ui/card";

const SearchResults = () => {
  const navigate = useNavigate();
  
  const handleVoyagrClick = () => {
    // Add UTM parameters to the URL
    const utmParams = new URLSearchParams({
      utm_source: 'boogle',
      utm_medium: 'search',
      utm_campaign: 'corporate-travel',
      utm_term: 'company travel flights to new york',
      utm_content: 'top-result'
    });
    
    // Track click event in Pendo
    if ((window as any).pendo && (window as any).pendo.track) {
      (window as any).pendo.track('Clicked Voyagr Link');
    }
    
    navigate(`/book?${utmParams.toString()}`);
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Header */}
      <header className="w-full py-3 px-6 border-b flex items-center sticky top-0 bg-white z-10">
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
        <div className="ml-4 hidden sm:flex space-x-4">
          <Button variant="ghost" size="sm">Images</Button>
          <Button variant="ghost" size="sm">Videos</Button>
          <Button variant="ghost" size="sm">News</Button>
          <Button variant="ghost" size="sm">Maps</Button>
        </div>
      </header>

      {/* Filters */}
      <div className="border-b py-2 px-6">
        <div className="flex flex-wrap gap-2 text-sm text-gray-600">
          <Button variant="ghost" size="sm" className="text-blue-500">All</Button>
          <Button variant="ghost" size="sm">Business</Button>
          <Button variant="ghost" size="sm">Travel</Button>
          <Button variant="ghost" size="sm">Flights</Button>
          <Button variant="ghost" size="sm">Hotels</Button>
          <Button variant="ghost" size="sm">News</Button>
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-grow py-6 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
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

            {/* Standard Results */}
            <div className="py-2">
              <div className="text-sm text-green-700 mb-1">travelbiz.example › business-travel</div>
              <h3 className="text-xl font-medium text-blue-700 mb-1">Business Flights to NYC | TravelBiz</h3>
              <p className="text-sm text-gray-700">
                Find the best deals on business class flights to New York. Exclusive corporate rates available for registered businesses. We offer special discounts for corporate customers.
              </p>
            </div>

            <div className="py-2">
              <div className="text-sm text-green-700 mb-1">flightmaster.example › destinations › new-york</div>
              <h3 className="text-xl font-medium text-blue-700 mb-1">Cheap Flights to New York from San Francisco | FlightMaster</h3>
              <p className="text-sm text-gray-700">
                Book affordable flights to New York from San Francisco. Compare prices from all major airlines and find the best deal. Last-minute bookings available with special rates.
              </p>
            </div>

            <div className="py-2">
              <div className="text-sm text-green-700 mb-1">corporatetraveler.example › us › nyc</div>
              <h3 className="text-xl font-medium text-blue-700 mb-1">Corporate Traveler | New York Business Flights</h3>
              <p className="text-sm text-gray-700">
                Specialized solutions for business travel to New York. Our travel experts help you find the most convenient flights at competitive rates. 24/7 support for business travelers.
              </p>
            </div>
            
            {/* Added more search results */}
            <div className="py-2">
              <div className="text-sm text-green-700 mb-1">nyctrips.example › flights › from-sf</div>
              <h3 className="text-xl font-medium text-blue-700 mb-1">NYC Trips | Fly Direct from San Francisco to New York</h3>
              <p className="text-sm text-gray-700">
                Direct flights from SFO to all New York airports (JFK, LGA, EWR). Premium economy and business class options available with extra legroom and priority boarding.
              </p>
            </div>
            
            <div className="py-2">
              <div className="text-sm text-green-700 mb-1">flyair.example › routes › sf-ny</div>
              <h3 className="text-xl font-medium text-blue-700 mb-1">FlyAir - San Francisco to New York Daily Flights</h3>
              <p className="text-sm text-gray-700">
                Multiple daily flights between San Francisco and New York. Choose from morning, afternoon, or red-eye options. Free Wi-Fi and in-flight entertainment included.
              </p>
            </div>
            
            <div className="py-2">
              <div className="text-sm text-green-700 mb-1">businesstravel.example › north-america › usa</div>
              <h3 className="text-xl font-medium text-blue-700 mb-1">BusinessTravel.com | Corporate Flights to Major US Cities</h3>
              <p className="text-sm text-gray-700">
                Comprehensive business travel solutions for companies of all sizes. Specialized in high-volume corporate bookings with negotiated rates. Dedicated account managers available.
              </p>
            </div>
            
            {/* People also ask section */}
            <Card className="p-2 my-6">
              <CardContent className="p-2">
                <h3 className="text-lg font-medium mb-2">People also ask</h3>
                <div className="space-y-2">
                  <div className="border-b pb-2">
                    <Button variant="ghost" className="w-full justify-between">
                      <span>What is the best time to book flights to New York?</span>
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="border-b pb-2">
                    <Button variant="ghost" className="w-full justify-between">
                      <span>How long is the flight from San Francisco to New York?</span>
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="border-b pb-2">
                    <Button variant="ghost" className="w-full justify-between">
                      <span>Which airlines offer direct flights to NYC?</span>
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="pb-2">
                    <Button variant="ghost" className="w-full justify-between">
                      <span>What's the best airport to fly into for Manhattan?</span>
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <div className="py-2">
              <div className="text-sm text-green-700 mb-1">skyhigh.example › business › premium-cabins</div>
              <h3 className="text-xl font-medium text-blue-700 mb-1">SkyHigh Airlines | Premium Business Class to NYC</h3>
              <p className="text-sm text-gray-700">
                Experience luxury travel with our premium business class service. Fully-reclining seats, gourmet meals, and exclusive lounge access. Corporate discount programs available.
              </p>
            </div>
            
            <div className="py-2">
              <div className="text-sm text-green-700 mb-1">easybooking.example › domestic › ny</div>
              <h3 className="text-xl font-medium text-blue-700 mb-1">EasyBooking | Affordable Flights to New York</h3>
              <p className="text-sm text-gray-700">
                Simple and fast booking process for flights to all New York airports. No booking fees, free date changes, and transparent pricing. Best price guarantee on all bookings.
              </p>
            </div>
          </div>
          
          {/* Pagination */}
          <div className="mt-10">
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious href="#" />
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#" isActive>1</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#">2</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#">3</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#">4</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#">5</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationEllipsis />
                </PaginationItem>
                <PaginationItem>
                  <PaginationNext href="#" />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
          
          {/* Related searches */}
          <div className="mt-8">
            <h3 className="text-lg font-medium mb-4">Related searches</h3>
            <div className="flex flex-wrap gap-2">
              <Button variant="outline" size="sm">Flights from SFO to JFK</Button>
              <Button variant="outline" size="sm">Business class to New York</Button>
              <Button variant="outline" size="sm">Direct flights to NYC</Button>
              <Button variant="outline" size="sm">Last minute flights to New York</Button>
              <Button variant="outline" size="sm">Corporate travel management</Button>
              <Button variant="outline" size="sm">Best time to visit NYC</Button>
              <Button variant="outline" size="sm">Travel packages to New York</Button>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full bg-gray-100 py-4 px-6 text-sm text-gray-600 mt-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <p className="font-medium mb-2">Search</p>
              <div className="space-y-1">
                <p>How Search works</p>
                <p>Privacy</p>
                <p>Terms</p>
              </div>
            </div>
            <div>
              <p className="font-medium mb-2">Business</p>
              <div className="space-y-1">
                <p>Advertising</p>
                <p>Business Solutions</p>
                <p>About Boogle</p>
              </div>
            </div>
            <div>
              <p className="font-medium mb-2">Settings</p>
              <div className="space-y-1">
                <p>Search Settings</p>
                <p>Advanced Search</p>
                <p>Your Data in Search</p>
              </div>
            </div>
          </div>
          <div className="mt-6 pt-4 border-t">
            <div className="flex justify-between items-center">
              <p>© 2025 Boogle</p>
              <div className="flex space-x-4">
                <p>Help</p>
                <p>Send feedback</p>
                <p>Settings</p>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default SearchResults;
