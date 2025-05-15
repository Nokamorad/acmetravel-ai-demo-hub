
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";

const BoogleSearch = () => {
  const [searchQuery, setSearchQuery] = useState("Company Travel: Flights to New York");
  const navigate = useNavigate();
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Track the search event in Pendo
    if ((window as any).pendo && (window as any).pendo.track) {
      (window as any).pendo.track('Search Performed', {
        query: searchQuery
      });
    }
    navigate('/search-results');
  };

  // Randomly generate anonymous visitor ID on page load
  useEffect(() => {
    const anonymousId = `anonymous-${Math.floor(Math.random() * 1000000)}`;
    
    if ((window as any).pendo) {
      console.log('Initializing Pendo with anonymous visitor:', anonymousId);
      (window as any).pendo.initialize({
        visitor: {
          id: anonymousId
        },
        account: {
          id: "demo-account"
        }
      });
    }
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center bg-white">
      {/* Header */}
      <header className="w-full py-4 px-6 flex justify-between items-center border-b">
        <div className="flex-1">
          <a href="#" className="text-sm text-gray-600">About</a>
        </div>
        <div className="flex-1 flex justify-end">
          <a href="#" className="text-sm text-gray-600 mr-4">Mail</a>
          <a href="#" className="text-sm text-gray-600">Images</a>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow flex flex-col items-center justify-center w-full px-4 max-w-3xl mx-auto -mt-20">
        {/* Logo */}
        <div className="mb-8 text-center">
          <h1 className="text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-sky-blue">
            Boogle
          </h1>
        </div>

        {/* Search Form */}
        <form onSubmit={handleSearch} className="w-full max-w-2xl">
          <div className="relative">
            <Input 
              type="text" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-12 pl-10 pr-12 border border-gray-300 rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              data-pendo-id="boogle-search-input"
            />
            <Search className="absolute left-3 top-3 h-6 w-6 text-gray-400" />
            <Button 
              type="submit"
              className="absolute right-2 top-2 bg-transparent hover:bg-gray-100 text-gray-500 p-2 rounded-full"
              data-pendo-id="boogle-search-button"
            >
              <Search className="h-4 w-4" />
            </Button>
          </div>
          
          <div className="flex justify-center mt-8">
            <Button 
              type="submit"
              variant="outline" 
              className="mx-2 bg-gray-50 text-gray-700 border-gray-300"
              data-pendo-id="boogle-search-button-1"
            >
              Boogle Search
            </Button>
            <Button 
              type="submit"
              variant="outline" 
              className="mx-2 bg-gray-50 text-gray-700 border-gray-300"
              data-pendo-id="boogle-search-button-2"
            >
              I'm Feeling Lucky
            </Button>
          </div>
        </form>
      </main>

      {/* Footer */}
      <footer className="w-full bg-gray-100 py-3 px-6 text-sm text-gray-600 mt-auto">
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

export default BoogleSearch;
