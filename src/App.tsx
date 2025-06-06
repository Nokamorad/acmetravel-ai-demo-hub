
import React from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Homepage from "./pages/Homepage";
import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/NotFound";
import BookTrip from "./pages/BookTrip";
import HelpCenter from "./pages/HelpCenter";
import BoogleSearch from "./pages/BoogleSearch";
import SearchResults from "./pages/SearchResults";
import RecommendedHotels from "./pages/RecommendedHotels";
import { UserProvider } from "@/contexts/UserContext";
import Inbox from "./pages/Inbox";
import Reschedule from "./pages/Reschedule";
import Support from "./pages/Support";
import Upsell from "./pages/Upsell";
import VoyagerMarketing from "./pages/VoyagerMarketing";
import BookingConfirmation from "./pages/BookingConfirmation";
import Hotels from "./pages/Hotels";

// Create a client
const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <React.StrictMode>
        <TooltipProvider>
          <UserProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<BoogleSearch />} />
                <Route path="/search" element={<BoogleSearch />} />
                <Route path="/search-results" element={<SearchResults />} />
                <Route path="/homepage" element={<Homepage />} />
                <Route path="/voyager-marketing" element={<VoyagerMarketing />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/book" element={<BookTrip />} />
                <Route path="/help" element={<HelpCenter />} />
                <Route path="/hotels" element={<Hotels />} />
                <Route path="/inbox" element={<Inbox />} />
                <Route path="/reschedule" element={<Reschedule />} />
                <Route path="/support" element={<Support />} />
                <Route path="/upsell" element={<Upsell />} />
                <Route path="/booking-confirmation" element={<BookingConfirmation />} />
                {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          </UserProvider>
        </TooltipProvider>
      </React.StrictMode>
    </QueryClientProvider>
  );
};

export default App;
