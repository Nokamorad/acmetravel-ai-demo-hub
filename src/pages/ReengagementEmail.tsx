
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Plane } from 'lucide-react';

const ReengagementEmail = () => {
  const navigate = useNavigate();

  const handleResumeBooking = () => {
    // Track email CTA click in Pendo
    if ((window as any).pendo && (window as any).pendo.track) {
      (window as any).pendo.track('Email Opened', {
        email_type: 'booking_reengagement',
        action: 'resume_booking'
      });
    }
    
    // Navigate to booking page
    navigate('/book');
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white max-w-2xl w-full rounded-lg shadow-lg overflow-hidden" data-pendo-id="reengagement-email">
        {/* Email Header */}
        <div className="bg-sky-blue p-6 text-center text-white">
          <div className="flex items-center justify-center mb-2">
            <Plane className="h-8 w-8 mr-2" />
            <h1 className="text-3xl font-bold">Voyagr</h1>
          </div>
          <p className="text-lg mt-2">Still planning your Munich trip?</p>
        </div>

        {/* Email Body */}
        <div className="p-8 text-gray-700">
          <p className="text-lg mb-4">
            Hi there,
          </p>
          <p className="mb-4">
            We noticed you started planning a trip to Munich but didn't complete your booking.
            Don't worry - we've saved your information and can help you pick up where you left off.
          </p>
          
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 my-6">
            <h3 className="font-semibold text-lg mb-2">Your Trip Details:</h3>
            <p className="mb-1"><span className="font-medium">Destination:</span> Munich, Germany</p>
            <p><span className="font-medium">Purpose:</span> Business Travel</p>
          </div>
          
          <p className="mb-6">
            Munich has some of the best business accommodations in Europe, and our corporate rates can save your company up to 15% on your booking.
          </p>

          <div className="text-center mt-8">
            <Button 
              size="lg" 
              className="bg-sunset-coral hover:bg-sunset-coral/90 text-white font-semibold px-8 py-6 rounded-lg shadow hover:shadow-lg transition-all"
              onClick={handleResumeBooking}
              data-pendo-id="resume-booking-button"
            >
              Resume Your Booking
            </Button>
            
            <p className="text-sm text-gray-500 mt-4">
              Your partial booking will be held for 48 more hours
            </p>
          </div>

          <p className="mt-12 text-sm text-gray-400 text-center">
            © 2025 Voyagr Inc. · 123 Travel Avenue · Business District, CA 94103<br />
            <a href="#" className="text-blue-500 underline">Unsubscribe</a> · <a href="#" className="text-blue-500 underline">Privacy Policy</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ReengagementEmail;
