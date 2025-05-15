import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useUser } from '@/contexts/UserContext';
import { useToast } from '@/hooks/use-toast';

const Inbox: React.FC = () => {
  const { user } = useUser();
  const { toast } = useToast();
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedEmail, setSelectedEmail] = useState<string | null>(null);
  
  // Track if the user has viewed the welcome email
  const [viewedWelcome, setViewedWelcome] = useState(false);
  const [showReengagementEmail, setShowReengagementEmail] = useState(false);
  
  useEffect(() => {
    // Check if we should show the re-engagement email based on URL params
    const params = new URLSearchParams(location.search);
    if (params.has('showReengagement')) {
      setShowReengagementEmail(true);
    }
    
    // If we're coming from booking page with abandonment flag, show re-engagement email with delay
    if (params.has('abandoned')) {
      setTimeout(() => {
        setShowReengagementEmail(true);
        toast({
          title: "New Email Received",
          description: "You have a new email about your Munich trip",
          action: (
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => {
                setSelectedEmail('reengagement');
              }}
            >
              View Email
            </Button>
          ),
        });
      }, 1500);
    }
  }, [location.search, toast]);
  
  // Sample emails
  const emails = [
    {
      id: 'welcome',
      subject: 'Welcome to Voyagr — Start Your Journey!',
      sender: 'Voyagr Travel',
      time: '2 minutes ago',
      content: `
        <div class="bg-white max-w-2xl w-full rounded-lg shadow-lg overflow-hidden">
          <!-- Email Header -->
          <div class="bg-blue-600 p-6 text-center text-white">
            <h1 class="text-3xl font-bold">Welcome to Voyagr!</h1>
            <p class="text-lg mt-2">Your journey starts now.</p>
          </div>

          <!-- Email Body -->
          <div class="p-8 text-gray-700">
            <p class="text-lg mb-4">
              Hi <span class="font-semibold">${user.name}</span>,
            </p>
            <p class="mb-4">
              Thanks for signing up for Voyagr. We're excited to help you plan and book your travel stress-free.
            </p>
            <p class="mb-4">
              Ready to find your next adventure?
            </p>

            <div class="text-center mt-8">
              <button class="sign-in-btn inline-block bg-blue-600 text-white font-semibold px-6 py-3 rounded-lg shadow hover:bg-blue-700 transition-all">
                Sign In to Your Dashboard
              </button>
            </div>

            <p class="mt-8 text-sm text-gray-400 text-center">
              © 2025 Voyagr Inc. · 123 Anywhere Street · Travel City, TX 54321
            </p>
          </div>
        </div>
      `
    },
    {
      id: 'booking',
      subject: 'Your Flight to New York is Confirmed — Book a Hotel?',
      sender: 'Voyagr Travel',
      time: '1 minute ago',
      content: `
        <div class="bg-white max-w-2xl w-full rounded-lg shadow-lg overflow-hidden">
          <!-- Email Header -->
          <div class="bg-green-600 p-6 text-center text-white">
            <h1 class="text-3xl font-bold">Booking Confirmed!</h1>
            <p class="text-lg mt-2">Your flight to New York is all set.</p>
          </div>

          <!-- Email Body -->
          <div class="p-8 text-gray-700">
            <p class="text-lg mb-4">
              Hi <span class="font-semibold">${user.name}</span>,
            </p>
            <p class="mb-4">
              Great news! Your flight from San Francisco to New York has been confirmed.
            </p>
            <p class="mb-4">
              Would you like to book a hotel for your stay?
            </p>

            <div class="text-center mt-8">
              <button class="book-hotel-btn inline-block bg-green-600 text-white font-semibold px-6 py-3 rounded-lg shadow hover:bg-green-700 transition-all">
                Book a Hotel
              </button>
            </div>

            <p class="mt-8 text-sm text-gray-400 text-center">
              © 2025 Voyagr Inc. · 123 Anywhere Street · Travel City, TX 54321
            </p>
          </div>
        </div>
      `
    },
    {
      id: 'reengagement',
      subject: 'Still planning that Munich trip? We saved your seat.',
      sender: 'Voyagr Travel',
      time: 'Just now',
      content: `
        <div class="bg-white max-w-2xl w-full rounded-lg shadow-lg overflow-hidden">
          <!-- Email Header -->
          <div class="bg-amber-600 p-6 text-center text-white">
            <h1 class="text-3xl font-bold">Your Munich Trip Awaits!</h1>
            <p class="text-lg mt-2">We've saved your booking details</p>
          </div>

          <!-- Email Body -->
          <div class="p-8 text-gray-700">
            <p class="text-lg mb-4">
              Hi <span class="font-semibold">${user.name}</span>,
            </p>
            <p class="mb-4">
              We noticed you started planning a trip to Munich but didn't complete your booking.
            </p>
            <p class="mb-4">
              Good news! We've saved all your details so you can pick up right where you left off.
            </p>
            <p class="mb-4">
              Munich is booking up fast for those dates. Don't miss out on the best rates!
            </p>

            <div class="text-center mt-8">
              <button class="resume-booking-btn inline-block bg-amber-600 text-white font-semibold px-6 py-3 rounded-lg shadow hover:bg-amber-700 transition-all">
                Resume Your Booking
              </button>
            </div>

            <p class="mt-8 text-sm text-gray-400 text-center">
              © 2025 Voyagr Inc. · 123 Anywhere Street · Travel City, TX 54321
            </p>
          </div>
        </div>
      `
    },
    {
      id: 'deals',
      subject: 'Travel Deals: Save 30% on Hotels',
      sender: 'Travel Weekly',
      time: 'Today',
      content: 'Special deals content'
    },
    {
      id: 'lounge',
      subject: 'Airport Lounge Membership Promo',
      sender: 'AirClub',
      time: '2 days ago',
      content: 'Lounge membership content'
    }
  ];

  // If re-engagement email is showing, move it to the top of the list
  const displayEmails = [...emails];
  if (showReengagementEmail) {
    const reengagementEmail = displayEmails.find(email => email.id === 'reengagement');
    if (reengagementEmail) {
      const filteredEmails = displayEmails.filter(email => email.id !== 'reengagement');
      displayEmails.splice(0, displayEmails.length, reengagementEmail, ...filteredEmails);
    }
  } else {
    // Remove the re-engagement email if it's not supposed to be shown
    const filteredEmails = displayEmails.filter(email => email.id !== 'reengagement');
    displayEmails.splice(0, displayEmails.length, ...filteredEmails);
  }

  const handleEmailClick = (emailId: string) => {
    setSelectedEmail(emailId);
    
    // If it's the welcome email, mark it as viewed
    if (emailId === 'welcome') {
      setViewedWelcome(true);
    }
  };
  
  const handleSignInClick = () => {
    toast({
      title: "Signing in...",
      description: "Taking you to your dashboard",
    });
    
    // Navigate to dashboard after a short delay
    setTimeout(() => {
      navigate('/dashboard');
    }, 1000);
  };
  
  const handleBookHotelClick = () => {
    toast({
      title: "Finding hotels...",
      description: "Checking availability near your destination",
    });
    
    // Navigate to upsell page after a short delay
    setTimeout(() => {
      navigate('/upsell');
    }, 1000);
  };
  
  const handleResumeBookingClick = () => {
    toast({
      title: "Resuming your booking...",
      description: "Taking you back to your Munich trip details",
    });
    
    // Navigate to book page after a short delay with completion flag
    setTimeout(() => {
      navigate('/book?resuming=true');
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex" data-pendo-id="inbox-page">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-200 p-6">
        <h2 className="text-2xl font-bold mb-6 text-blue-600">Voyagr Mail</h2>
        <nav className="flex flex-col gap-4">
          <Link to="#" className="text-blue-600 font-semibold flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs">
              {showReengagementEmail ? 3 : 2}
            </span>
            <span>Inbox</span>
          </Link>
          <Link to="#" className="text-gray-600 hover:text-gray-900">Sent</Link>
          <Link to="#" className="text-gray-600 hover:text-gray-900">Trash</Link>
          <div className="border-t border-gray-200 my-4"></div>
          <Link to="/dashboard" className="text-gray-600 hover:text-gray-900">Dashboard</Link>
        </nav>
      </aside>

      {/* Main Email Panel */}
      <main className="flex-1 p-4 md:p-8">
        {selectedEmail ? (
          <div className="bg-white shadow rounded-lg overflow-hidden">
            <div className="p-4 border-b flex justify-between items-center">
              <button 
                onClick={() => setSelectedEmail(null)}
                className="text-gray-600 hover:text-gray-900"
                data-pendo-id="back-to-inbox-button"
              >
                ← Back to inbox
              </button>
              <div className="text-gray-500 text-sm">
                {emails.find(email => email.id === selectedEmail)?.time}
              </div>
            </div>
            
            <div className="p-4">
              <h1 className="text-xl font-bold">{emails.find(email => email.id === selectedEmail)?.subject}</h1>
              <div className="text-sm text-gray-500 mb-4">From: {emails.find(email => email.id === selectedEmail)?.sender}</div>
              
              <div 
                className="email-content mt-6"
                dangerouslySetInnerHTML={{ __html: emails.find(email => email.id === selectedEmail)?.content || '' }}
              />
            </div>
          </div>
        ) : (
          <>
            <h1 className="text-2xl font-bold mb-6">Inbox</h1>

            <div className="bg-white shadow rounded-lg overflow-hidden">
              {displayEmails.map((email) => (
                <div 
                  key={email.id}
                  className="flex items-center justify-between p-4 border-b hover:bg-gray-50 transition cursor-pointer"
                  onClick={() => handleEmailClick(email.id)}
                  data-pendo-id={`email-${email.id}`}
                >
                  <div>
                    <h2 className="text-lg font-semibold">{email.subject}</h2>
                    <p className="text-sm text-gray-500">{email.sender} • {email.time}</p>
                  </div>
                  <div className="text-gray-400">›</div>
                </div>
              ))}
            </div>
          </>
        )}
      </main>
      
      {/* Event listeners for buttons in email content */}
      <script dangerouslySetInnerHTML={{ __html: `
        document.addEventListener('click', function(event) {
          if (event.target && event.target.classList.contains('sign-in-btn')) {
            ${handleSignInClick.toString()}();
          }
          if (event.target && event.target.classList.contains('book-hotel-btn')) {
            ${handleBookHotelClick.toString()}();
          }
          if (event.target && event.target.classList.contains('resume-booking-btn')) {
            ${handleResumeBookingClick.toString()}();
          }
        });
      `}} />
    </div>
  );
};

export default Inbox;
