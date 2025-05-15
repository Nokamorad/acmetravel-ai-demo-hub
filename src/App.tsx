
import React from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Homepage from "./pages/Homepage";
import Dashboard from "./pages/Dashboard";
import SignUp from "./pages/SignUp";
import NotFound from "./pages/NotFound";
import IconSettings from "./pages/IconSettings";
import BookTrip from "./pages/BookTrip";
import HelpCenter from "./pages/HelpCenter";
import BoogleSearch from "./pages/BoogleSearch";
import SearchResults from "./pages/SearchResults";
import PendoIntegration from "@/components/pendo/PendoIntegration";
import { UserProvider } from "@/contexts/UserContext";

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
              {/* Pendo Integration at the app level ensures it's available on all routes */}
              <PendoIntegration />
              <Routes>
                <Route path="/" element={<BoogleSearch />} />
                <Route path="/search-results" element={<SearchResults />} />
                <Route path="/homepage" element={<Homepage />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/book" element={<BookTrip />} />
                <Route path="/help" element={<HelpCenter />} />
                <Route path="/icon-settings" element={<IconSettings />} />
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
