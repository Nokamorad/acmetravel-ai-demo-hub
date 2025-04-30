
import React from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import BookTrip from "./pages/BookTrip";
import TripSummary from "./pages/TripSummary";
import Profile from "./pages/Profile";
import Support from "./pages/Support";
import NotFound from "./pages/NotFound";
import PendoIntegration from "@/components/pendo/PendoIntegration";
import { UserProvider } from "@/contexts/UserContext";

// Create a client
const queryClient = new QueryClient();

const App = () => (
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <UserProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            {/* Pendo Integration at the app level ensures it's available on all routes */}
            <PendoIntegration />
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/landing" element={<Index />} />
              <Route path="/book" element={<BookTrip />} />
              <Route path="/trip" element={<TripSummary />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/support" element={<Support />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </UserProvider>
      </TooltipProvider>
    </QueryClientProvider>
  </React.StrictMode>
);

export default App;
