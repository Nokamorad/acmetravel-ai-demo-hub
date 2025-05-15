import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Search, ArrowRight } from "lucide-react";
import { Input } from "@/components/ui/input";

const SearchResults = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState("");
  
  useEffect(() => {
    // Extract search query from URL
    const params = new URLSearchParams(location.search);
    const query = params.get('q') || "Company Travel: Flights to New York";
    setSearchQuery(query);
    
    // Track search results page view in Pendo
    if ((window as any).pendo && (window as any).pendo.track) {
      (window as any).pendo.track('Page View', {
        page: 'search_results',
        search_query: query
      });
    }
  }, [location.search]);
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Track new search event
    if ((window as any).pendo && (window as any).pendo.track) {
      (window as any).pendo.track('Search Performed', {
        query: searchQuery,
        page: 'search_results'
      });
    }
    
    // Update URL with new search query
    navigate(`/search-results?q=${encodeURIComponent(searchQuery)}`);
  };
  
  const navigateToVoyagr = () => {
    // Add UTM parameters as requested
    const utmParams = new URLSearchParams({
      utm_source: 'boogle',
      utm_medium: 'search',
      utm_campaign: 'corporate-travel',
      utm_term: encodeURIComponent('company travel flights to new york'),
      utm_content: 'top-result'
    });
    
    // Track the click event
    if ((window as any).pendo && (window as any).pendo.track) {
      (window as any).pendo.track('Search Result Clicked', {
        name: 'Voyagr Travel Booking',
        utm_source: 'boogle',
        utm_medium: 'search',
        utm_campaign: 'corporate-travel',
        position: 1
      });
    }
    
    // Navigate to book page with UTM parameters
    navigate(`/book?${utmParams.toString()}`);
  };
  
  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Header with Search */}
      <header className="border-b bg-white sticky top-0 z-10">
        <div className="container mx-auto py-4 px-4 flex items-center">
          <div className="mr-6">
            <h1 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-sky-blue">
              <a href="/" className="flex items-center">Boogle</a>
            </h1>
          </div>
          
          <form onSubmit={handleSearch} className="flex-grow max-w-3xl">
            <div className="relative">
              <Input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full border border-gray-300 rounded-full pl-10 pr-4 py-2"
                data-pendo-id="search-results-input"
              />
              <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
              <Button 
                type="submit"
                className="absolute right-2 top-1.5 bg-transparent hover:bg-gray-100 text-gray-500 p-2 rounded-full"
                data-pendo-id="search-results-button"
              >
                <Search className="h-4 w-4" />
              </Button>
            </div>
          </form>
        </div>
        
        <div className="container mx-auto px-4 pb-2">
          <div className="flex space-x-6 text-sm">
            <a href="#" className="text-blue-500 border-b-2 border-blue-500 pb-1">All</a>
            <a href="#" className="text-gray-500 hover:text-gray-700">Images</a>
            <a href="#" className="text-gray-500 hover:text-gray-700">Maps</a>
            <a href="#" className="text-gray-500 hover:text-gray-700">News</a>
            <a href="#" className="text-gray-500 hover:text-gray-700">Shopping</a>
            <a href="#" className="text-gray-500 hover:text-gray-700">More</a>
          </div>
        </div>
      </header>
      
      {/* Main Content */}
      <main className="container mx-auto px-4 py-4 flex-grow">
        <p className="text-sm text-gray-500 mb-4">About 946,000 results (0.42 seconds)</p>
        
        {/* Voyagr Result - Main Featured Result */}
        <div className="border border-gray-200 rounded-lg p-4 bg-blue-50 mb-6" data-pendo-id="voyagr-search-result">
          <div className="flex items-start">
            <div className="mr-4">
              <div className="w-10 h-10 bg-sky-blue rounded-full flex items-center justify-center text-white font-bold">
                V
              </div>
            </div>
            <div className="flex-grow">
              <h2 className="text-xl font-medium text-blue-800">
                <button onClick={navigateToVoyagr} className="hover:underline">Voyagr Travel Booking</button>
              </h2>
              <p className="text-green-700 text-sm">www.voyagr.acme.com › business-travel</p>
              <div className="bg-white mt-2 rounded border border-gray-200 p-3">
                <p className="font-medium">Book your business flight to New York - Fast & easy corporate booking</p>
                <p className="text-sm text-gray-600 mt-1">
                  Streamlined corporate travel management with policy compliance and reporting. Used by 500+ businesses worldwide. Book flights, hotels, and car rentals in one place.
                </p>
                <div className="mt-3 flex">
                  <Button 
                    onClick={navigateToVoyagr}
                    className="bg-sky-blue hover:bg-sky-blue/90"
                    data-pendo-id="voyagr-book-flight-button"
                  >
                    Book Your Flight <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Other search results */}
        {Array(5).fill(0).map((_, i) => (
          <div key={i} className="mb-6" data-pendo-id={`search-result-${i+2}`}>
            <div className="text-sm text-green-700">www.{['corporatetravel', 'businessflights', 'nyc-travel', 'flightbooking', 'travelmanagement'][i]}.com</div>
            <h3 className="text-xl text-blue-700 hover:underline cursor-pointer">{[
              'Corporate Travel Solutions | Business Flights to NYC',
              'Business Class Flights to New York | Special Corporate Rates',
              'New York City Business Travel Guide 2025',
              'Cheap Flights to New York for Business Travelers',
              'Enterprise Travel Management | Corporate Portal'
            ][i]}</h3>
            <p className="text-sm text-gray-600">
              {[
                'Find the best corporate travel options for your business needs. We specialize in business flights to major cities including New York...',
                'Book business class flights to New York with our corporate discount program. Save up to 25% on business travel...',
                'Everything you need to know about business travel to New York City. Hotels, meeting spaces, restaurants and local transportation...',
                'Compare and book affordable flight options to New York airports. Corporate discounts available with registered account...',
                'Complete travel management solution for enterprises. Policy compliance, expense tracking, and centralized booking...'
              ][i]}
            </p>
          </div>
        ))}
        
        {/* Related searches */}
        <div className="mt-10">
          <h3 className="text-xl mb-4">Related searches</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              'business travel management',
              'corporate flight booking',
              'new york business hotels',
              'travel policy compliance',
              'corporate travel expenses',
              'business class vs economy',
              'jfk airport transfers',
              'nyc meeting spaces'
            ].map((term, i) => (
              <div key={i} className="bg-gray-100 rounded-lg p-3 hover:bg-gray-200 cursor-pointer">
                <Search className="h-4 w-4 inline-block mr-2 text-gray-500" />
                <span className="text-sm">{term}</span>
              </div>
            ))}
          </div>
        </div>
      </main>
      
      {/* Footer */}
      <footer className="bg-gray-100 py-4 border-t">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between text-sm text-gray-500">
            <div className="mb-2 md:mb-0">
              <span className="mr-4">Help</span>
              <span className="mr-4">Privacy</span>
              <span>Terms</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default SearchResults;
