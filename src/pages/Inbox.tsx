
import React, { useState } from 'react';
import AppLayout from "@/components/layout/AppLayout";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useUser } from "@/contexts/UserContext";
import { useNavigate } from "react-router-dom";
import { Inbox as InboxIcon, Clock, Mail, ArrowRight, Hotel, Calendar } from "lucide-react";

const Inbox = () => {
  const { user } = useUser();
  const navigate = useNavigate();
  const [emails, setEmails] = useState([
    {
      id: 'welcome-email',
      subject: 'Welcome to Voyagr!',
      sender: 'Voyagr Team',
      content: 'Thanks for signing up! Click to Sign In.',
      time: '2 hours ago',
      read: false,
      action: 'Sign In',
      actionLink: '/dashboard'
    },
    {
      id: 'booking-confirmed',
      subject: 'Your Booking is Confirmed!',
      sender: 'Voyagr Bookings',
      content: 'Booking Confirmed! Ready to add a hotel?',
      time: '1 hour ago',
      read: false,
      action: 'Book Hotel',
      actionLink: '/hotels'
    }
  ]);
  
  const handleEmailAction = (email: any, index: number) => {
    // Mark email as read
    const updatedEmails = [...emails];
    updatedEmails[index].read = true;
    setEmails(updatedEmails);
    
    // Track email interaction with Pendo
    if ((window as any).pendo && (window as any).pendo.track) {
      (window as any).pendo.track('Email Interaction', {
        email_id: email.id,
        email_subject: email.subject,
        action: email.action
      });
    }
    
    // Navigate to the action link
    navigate(email.actionLink);
  };
  
  return (
    <AppLayout>
      <div className="p-6 max-w-5xl mx-auto">
        <div className="mb-6 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-midnight-navy">Inbox</h1>
            <p className="text-gray-600">View and manage your travel notifications</p>
          </div>
          
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="flex items-center gap-2" data-pendo-id="refresh-inbox">
              <Clock className="h-4 w-4" />
              <span>Refresh</span>
            </Button>
            <Button size="sm" className="flex items-center gap-2 bg-sky-blue hover:bg-sky-blue/90" data-pendo-id="compose-email">
              <Mail className="h-4 w-4" />
              <span>Compose</span>
            </Button>
          </div>
        </div>
        
        <div className="space-y-4">
          {emails.map((email, index) => (
            <Card 
              key={email.id}
              className={`p-4 ${email.read ? 'bg-gray-50' : 'bg-white border-l-4 border-l-sky-blue'}`}
              data-pendo-id={`email-${email.id}`}
            >
              <div className="flex justify-between">
                <div>
                  <h3 className={`text-lg ${email.read ? 'font-medium' : 'font-bold'}`}>
                    {email.subject}
                  </h3>
                  <p className="text-sm text-gray-500">From: {email.sender} • {email.time}</p>
                  <p className="mt-2">{email.content}</p>
                </div>
                <Button 
                  onClick={() => handleEmailAction(email, index)}
                  className="bg-sky-blue hover:bg-sky-blue/90 h-10 self-end"
                  data-pendo-id={`email-action-${email.id}`}
                >
                  {email.action} <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </Card>
          ))}
          
          {emails.length === 0 && (
            <div className="text-center py-12">
              <InboxIcon className="h-12 w-12 mx-auto text-gray-300" />
              <p className="mt-4 text-gray-500">Your inbox is empty</p>
              <Button 
                variant="outline"
                className="mt-4"
                onClick={() => navigate('/dashboard')}
                data-pendo-id="empty-inbox-action"
              >
                Return to Dashboard
              </Button>
            </div>
          )}
        </div>
        
        {/* Suggested Actions */}
        <div className="mt-8 border-t pt-6">
          <h2 className="text-lg font-medium mb-4">Recommended Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card className="p-4 flex items-center gap-3 cursor-pointer" onClick={() => navigate('/hotels')} data-pendo-id="recommended-action-hotel">
              <div className="p-2 bg-sky-blue/10 rounded-full">
                <Hotel className="h-5 w-5 text-sky-blue" />
              </div>
              <div>
                <h3 className="font-medium">Book a Hotel</h3>
                <p className="text-sm text-gray-500">Complete your travel plans</p>
              </div>
            </Card>
            
            <Card className="p-4 flex items-center gap-3 cursor-pointer" onClick={() => navigate('/reschedule')} data-pendo-id="recommended-action-reschedule">
              <div className="p-2 bg-sky-blue/10 rounded-full">
                <Calendar className="h-5 w-5 text-sky-blue" />
              </div>
              <div>
                <h3 className="font-medium">Manage Flight</h3>
                <p className="text-sm text-gray-500">Change or cancel your booking</p>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default Inbox;
