
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CheckCircle, Calendar, Download, Share2, Home } from 'lucide-react';
import { useUser } from '@/contexts/UserContext';

interface BookingConfirmationProps {
  origin?: string;
  destination?: string;
  departDate?: string;
  returnDate?: string;
  onClose?: () => void;
}

const BookingConfirmation: React.FC<BookingConfirmationProps> = ({ 
  origin = "San Francisco (SFO)",
  destination = "New York (NYC)",
  departDate,
  returnDate,
  onClose
}) => {
  const navigate = useNavigate();
  const { user } = useUser();
  const bookingReference = "VYG" + Math.floor(1000000 + Math.random() * 9000000);
  const formattedDepartDate = departDate ? new Date(departDate).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' }) : 'N/A';
  const formattedReturnDate = returnDate ? new Date(returnDate).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' }) : 'N/A';
  
  const handleGoToDashboard = () => {
    // Track event in Pendo
    if ((window as any).pendo && (window as any).pendo.track) {
      (window as any).pendo.track('Viewed Dashboard After Booking');
    }
    navigate('/dashboard');
  };

  return (
    <Card className="p-8 max-w-3xl mx-auto">
      <div className="text-center mb-8">
        <div className="flex justify-center mb-4">
          <div className="bg-green-100 rounded-full p-3">
            <CheckCircle className="h-12 w-12 text-green-500" />
          </div>
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Booking Confirmed!</h2>
        <p className="text-gray-600">
          Your trip to {destination} has been successfully booked.
          We've sent the confirmation details to {user.email}.
        </p>
      </div>

      <div className="bg-sky-blue/5 border border-sky-blue/20 rounded-lg p-6 mb-8">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-medium text-lg">Trip Details</h3>
          <span className="text-sm font-medium bg-sky-blue/10 text-sky-blue px-2 py-1 rounded">
            Ref: {bookingReference}
          </span>
        </div>

        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-500">Traveler</p>
              <p className="font-medium">{user.name}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Trip Type</p>
              <p className="font-medium">Round Trip, Business</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-500">Outbound</p>
              <div className="flex items-center">
                <Calendar className="h-4 w-4 mr-2 text-gray-600" />
                <p className="font-medium">{formattedDepartDate}</p>
              </div>
              <p className="mt-1">
                <span className="font-medium">{origin}</span> → <span className="font-medium">{destination}</span>
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Return</p>
              <div className="flex items-center">
                <Calendar className="h-4 w-4 mr-2 text-gray-600" />
                <p className="font-medium">{formattedReturnDate}</p>
              </div>
              <p className="mt-1">
                <span className="font-medium">{destination}</span> → <span className="font-medium">{origin}</span>
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        <Button variant="outline" className="flex items-center justify-center gap-2">
          <Download className="h-4 w-4" />
          Download Confirmation
        </Button>
        <Button variant="outline" className="flex items-center justify-center gap-2">
          <Share2 className="h-4 w-4" />
          Share Itinerary
        </Button>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        {onClose && (
          <Button variant="outline" onClick={onClose}>
            Back to Search
          </Button>
        )}
        <Button className="bg-sky-blue text-white" onClick={handleGoToDashboard}>
          <Home className="h-4 w-4 mr-2" />
          Go to Dashboard
        </Button>
      </div>
    </Card>
  );
};

export default BookingConfirmation;
