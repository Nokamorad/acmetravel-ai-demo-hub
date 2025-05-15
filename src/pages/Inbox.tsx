
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useUser } from "@/contexts/UserContext";
import { Inbox as InboxIcon, Mail, Trash, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import AppLayout from "@/components/layout/AppLayout";

// Email interface for type safety
interface Email {
  id: string;
  subject: string;
  sender: string;
  senderEmail: string;
  content: string;
  time: string;
  read: boolean;
  actionLink?: string;
  viewOnly?: boolean;
}

const Inbox = () => {
  const { user } = useUser();
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedEmail, setSelectedEmail] = useState<Email | null>(null);
  const [emails, setEmails] = useState<Email[]>([
    {
      id: 'welcome-email',
      subject: 'Welcome to Voyagr — Start Your Journey!',
      sender: 'Voyagr Travel',
      senderEmail: 'noreply@voyagr.acme.com',
      content: `
        <div>
          <p>Hi ${user.name || 'Traveler'},</p>
          <p>Thanks for signing up for Voyagr. We're excited to help you plan and book your travel stress-free.</p>
          <p>Ready to find your next adventure?</p>
          <p>The Voyagr Team</p>
        </div>
      `,
      time: '2 minutes ago',
      read: false,
      actionLink: '/dashboard'
    },
    {
      id: 'booking-confirmed',
      subject: 'Your Flight to New York is Confirmed! Book a Hotel?',
      sender: 'Voyagr Bookings',
      senderEmail: 'bookings@voyagr.acme.com',
      content: `
        <div>
          <p>Hi ${user.name || 'Traveler'},</p>
          <p>Great news! Your flight to New York has been confirmed.</p>
          <p>Would you like to complete your trip by booking a hotel near your destination?</p>
          <p>The Voyagr Bookings Team</p>
        </div>
      `,
      time: '1 minute ago',
      read: false,
      actionLink: '/hotels'
    },
    {
      id: 'travel-deals',
      subject: 'Travel Deals: Save 30% on Hotels',
      sender: 'Travel Weekly',
      senderEmail: 'deals@travelweekly.com',
      content: `
        <div>
          <p>Hi ${user.name || 'Traveler'},</p>
          <p>Check out these amazing hotel deals for your next trip!</p>
          <p>- Luxury in Paris: 30% off</p>
          <p>- Beach Resort in Bali: 25% off</p>
          <p>- City Center in Tokyo: 20% off</p>
          <p>Travel Weekly Deals Team</p>
        </div>
      `,
      time: 'Today',
      read: true,
      viewOnly: true
    },
    {
      id: 'lounge-promo',
      subject: 'Airport Lounge Membership Promo',
      sender: 'AirClub',
      senderEmail: 'membership@airclub.com',
      content: `
        <div>
          <p>Hi ${user.name || 'Traveler'},</p>
          <p>As a valued traveler, we'd like to offer you a special discount on our premium lounge membership.</p>
          <p>Enjoy complimentary drinks, snacks, and Wi-Fi at over 500 airport lounges worldwide.</p>
          <p>The AirClub Team</p>
        </div>
      `,
      time: '2 days ago',
      read: true,
      viewOnly: true
    }
  ]);
  
  // Update email list based on URL parameters or login state
  useEffect(() => {
    // Track page view
    if ((window as any).pendo && (window as any).pendo.track) {
      (window as any).pendo.track('Inbox Viewed', {
        email_count: emails.length,
        unread_count: emails.filter(email => !email.read).length
      });
    }
    
    // Check for URL params to see if we need to highlight a specific email
    const params = new URLSearchParams(location.search);
    const highlightEmailId = params.get('highlight');
    
    if (highlightEmailId) {
      const emailToHighlight = emails.find(email => email.id === highlightEmailId);
      if (emailToHighlight) {
        setSelectedEmail(emailToHighlight);
      }
    }
  }, [location.search, emails]);
  
  const handleEmailClick = (email: Email) => {
    // Track email interaction with Pendo
    if ((window as any).pendo && (window as any).pendo.track) {
      (window as any).pendo.track('Email Opened', {
        email_id: email.id,
        email_subject: email.subject
      });
    }
    
    // Mark email as read
    const updatedEmails = emails.map(e => 
      e.id === email.id ? { ...e, read: true } : e
    );
    setEmails(updatedEmails);
    
    // Set selected email
    setSelectedEmail(email);
  };
  
  const handleActionClick = (email: Email) => {
    // Track action click
    if ((window as any).pendo && (window as any).pendo.track) {
      (window as any).pendo.track('Email Action Clicked', {
        email_id: email.id,
        email_subject: email.subject,
        destination: email.actionLink
      });
    }
    
    // Navigate to action link
    if (email.actionLink) {
      navigate(email.actionLink);
    }
  };
  
  return (
    <AppLayout>
      <div className="min-h-screen bg-gray-50 flex">
        {/* Sidebar */}
        <aside className="w-64 bg-white border-r border-gray-200 p-6 hidden md:block">
          <h2 className="text-xl font-bold mb-6 text-midnight-navy">Voyagr Mail</h2>
          <nav className="flex flex-col gap-4">
            <a href="#" className="flex items-center gap-2 text-sky-blue font-semibold" data-pendo-id="inbox-nav">
              <InboxIcon className="h-4 w-4" />
              <span>Inbox</span>
              <span className="ml-auto bg-sky-blue text-white text-xs rounded-full px-2 py-0.5">
                {emails.filter(email => !email.read).length}
              </span>
            </a>
            <a href="#" className="flex items-center gap-2 text-gray-600" data-pendo-id="sent-nav">
              <Mail className="h-4 w-4" />
              <span>Sent</span>
            </a>
            <a href="#" className="flex items-center gap-2 text-gray-600" data-pendo-id="trash-nav">
              <Trash className="h-4 w-4" />
              <span>Trash</span>
            </a>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 overflow-auto">
          {selectedEmail ? (
            /* Email View */
            <div className="bg-white shadow-sm min-h-full p-6" data-pendo-id={`email-view-${selectedEmail.id}`}>
              <div className="max-w-4xl mx-auto">
                <div className="flex justify-between items-center mb-6">
                  <button 
                    onClick={() => setSelectedEmail(null)}
                    className="text-gray-500 hover:text-gray-700"
                    data-pendo-id="back-to-inbox"
                  >
                    ← Back to Inbox
                  </button>
                </div>
                
                {/* Email Header */}
                <div className="mb-8">
                  <h1 className="text-2xl font-bold mb-2">{selectedEmail.subject}</h1>
                  <div className="flex items-center text-sm text-gray-500">
                    <span className="font-medium">From: {selectedEmail.sender}</span>
                    <span className="mx-2">•</span>
                    <span>{selectedEmail.senderEmail}</span>
                    <span className="mx-2">•</span>
                    <span>{selectedEmail.time}</span>
                  </div>
                </div>
                
                {/* Email Content */}
                <div 
                  className="prose prose-sm max-w-none mb-8 p-4 bg-gray-50 rounded-lg"
                  dangerouslySetInnerHTML={{ __html: selectedEmail.content }}
                />
                
                {/* Action Button */}
                {selectedEmail.actionLink && !selectedEmail.viewOnly && (
                  <div className="text-center my-8">
                    <Button 
                      onClick={() => handleActionClick(selectedEmail)}
                      className="bg-sky-blue text-white px-6 py-2 rounded"
                      data-pendo-id={`email-action-${selectedEmail.id}`}
                    >
                      {selectedEmail.id === 'welcome-email' 
                        ? 'Sign In to Your Dashboard' 
                        : 'Book a Hotel Near Your Destination'}
                    </Button>
                  </div>
                )}
                
                <div className="text-sm text-center text-gray-400 mt-12">
                  © 2025 Voyagr Inc. · 123 Anywhere Street · Travel City, TX 54321
                </div>
              </div>
            </div>
          ) : (
            /* Inbox List View */
            <div className="p-6 max-w-6xl mx-auto">
              <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-midnight-navy">Inbox</h1>
                
                {/* Mobile menu button - only visible on small screens */}
                <button className="md:hidden text-gray-600" data-pendo-id="mobile-menu">
                  <InboxIcon className="h-5 w-5" />
                </button>
              </div>
              
              <div className="bg-white shadow rounded-lg overflow-hidden" data-pendo-id="inbox-list">
                {emails.map((email, index) => (
                  <React.Fragment key={email.id}>
                    <button
                      className={`w-full text-left flex items-center justify-between p-4 hover:bg-gray-50 transition ${!email.read ? 'bg-blue-50' : ''}`}
                      onClick={() => handleEmailClick(email)}
                      data-pendo-id={`email-${email.id}`}
                    >
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center">
                          {!email.read && (
                            <div className="h-2 w-2 bg-sky-blue rounded-full mr-2" />
                          )}
                          <h2 className={`text-base ${!email.read ? 'font-bold' : 'font-medium'} truncate`}>
                            {email.subject}
                          </h2>
                        </div>
                        <p className="text-sm text-gray-500 mt-1">
                          {email.sender} • {email.time}
                        </p>
                      </div>
                      <ChevronRight className="h-4 w-4 text-gray-400 flex-shrink-0" />
                    </button>
                    {index < emails.length - 1 && <Separator />}
                  </React.Fragment>
                ))}
                
                {emails.length === 0 && (
                  <div className="p-8 text-center text-gray-500">
                    <InboxIcon className="h-12 w-12 mx-auto text-gray-300 mb-2" />
                    <p>Your inbox is empty</p>
                  </div>
                )}
              </div>
            </div>
          )}
        </main>
      </div>
    </AppLayout>
  );
};

export default Inbox;
