
import React, { useState, useRef, useEffect } from 'react';
import AppLayout from "@/components/layout/AppLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { 
  MessageSquare, 
  Phone, 
  Mail, 
  ChevronDown, 
  ChevronRight, 
  Send,
  ArrowRight,
  HelpCircle,
  Calendar,
  X,
  CreditCard,
  Shield,
  Award,
  Settings
} from "lucide-react";
import { toast } from "@/hooks/use-toast";

const Support = () => {
  const [chatOpen, setChatOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [faqs, setFaqs] = useState([
    { id: 1, question: "How do I cancel my booking?", answer: "You can cancel your booking by going to your dashboard and selecting the booking you wish to cancel. Click on the 'Cancel' button and follow the instructions.", expanded: false },
    { id: 2, question: "What's your refund policy?", answer: "Our refund policy varies depending on the type of booking. Generally, bookings can be refunded fully if canceled within 24 hours of booking. After that, a cancellation fee may apply.", expanded: false },
    { id: 3, question: "How do I change my flight dates?", answer: "To change your flight dates, navigate to the 'Reschedule' page from your dashboard. Select your booking and choose new travel dates.", expanded: false },
    { id: 4, question: "Can I add a hotel to my existing booking?", answer: "Yes! You can add a hotel to your existing booking by visiting the 'Hotels' page and selecting a hotel near your destination.", expanded: false },
  ]);
  
  const [chatMessages, setChatMessages] = useState([
    { id: 1, text: "Hello! How can I help you today?", fromUser: false, time: "Just now" }
  ]);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // Auto-scroll chat to bottom when new messages arrive
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [chatMessages]);
  
  const toggleFaq = (id: number) => {
    setFaqs(faqs.map(faq => 
      faq.id === id ? { ...faq, expanded: !faq.expanded } : faq
    ));
    
    // Track FAQ interaction with Pendo
    const clickedFaq = faqs.find(faq => faq.id === id);
    if (clickedFaq && (window as any).pendo && (window as any).pendo.track) {
      (window as any).pendo.track('FAQ Interaction', {
        question: clickedFaq.question,
        action: clickedFaq.expanded ? 'collapse' : 'expand'
      });
    }
  };
  
  const handleSendMessage = () => {
    if (!message.trim()) return;
    
    // Add user message
    setChatMessages(prev => [...prev, {
      id: Date.now(),
      text: message,
      fromUser: true,
      time: "Just now"
    }]);
    
    // Track message sent with Pendo
    if ((window as any).pendo && (window as any).pendo.track) {
      (window as any).pendo.track('Support Message Sent', {
        message_content: message
      });
    }
    
    // Clear input
    setMessage("");
    
    // Simulate bot response after a delay
    setTimeout(() => {
      let botResponse = "I'm sorry, but I'm just a demo bot. In a real application, I would provide helpful answers to your questions.";
      
      // Simple keyword matching for demo purposes
      if (message.toLowerCase().includes("refund")) {
        botResponse = "Our refund policy allows full refunds within 24 hours of booking. After that, cancellation fees may apply depending on the airline or hotel policies.";
      } else if (message.toLowerCase().includes("cancel")) {
        botResponse = "You can cancel your booking from your dashboard. Go to the booking you want to cancel and click the 'Cancel' button. Follow the instructions to complete the cancellation.";
      } else if (message.toLowerCase().includes("reschedule") || message.toLowerCase().includes("change")) {
        botResponse = "To reschedule your flight, go to the 'Reschedule' page from your dashboard and follow the instructions to select new travel dates.";
      }
      
      setChatMessages(prev => [...prev, {
        id: Date.now(),
        text: botResponse,
        fromUser: false,
        time: "Just now"
      }]);
    }, 1000);
  };
  
  return (
    <AppLayout>
      <div className="p-6 max-w-5xl mx-auto">
        <h1 className="text-2xl font-bold text-midnight-navy mb-2">Support Center</h1>
        <p className="text-gray-600 mb-6">Find answers to common questions or contact our team</p>
        
        {/* Contact Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <Card className="p-4" data-pendo-id="contact-chat">
            <div className="flex flex-col items-center p-4">
              <div className="bg-sky-blue/10 p-3 rounded-full mb-4">
                <MessageSquare className="h-6 w-6 text-sky-blue" />
              </div>
              <h3 className="font-medium text-lg mb-1">Chat Support</h3>
              <p className="text-sm text-gray-500 text-center mb-4">Chat with our virtual assistant</p>
              <Button 
                onClick={() => setChatOpen(true)} 
                className="w-full bg-sky-blue hover:bg-sky-blue/90"
                data-pendo-id="open-chat-button"
              >
                Start Chat
              </Button>
            </div>
          </Card>
          
          <Card className="p-4" data-pendo-id="contact-phone">
            <div className="flex flex-col items-center p-4">
              <div className="bg-amber-100 p-3 rounded-full mb-4">
                <Phone className="h-6 w-6 text-amber-600" />
              </div>
              <h3 className="font-medium text-lg mb-1">Phone Support</h3>
              <p className="text-sm text-gray-500 text-center mb-4">Call us 24/7 for assistance</p>
              <Button variant="outline" className="w-full" data-pendo-id="call-support-button">
                +1 (888) 555-1234
              </Button>
            </div>
          </Card>
          
          <Card className="p-4" data-pendo-id="contact-email">
            <div className="flex flex-col items-center p-4">
              <div className="bg-green-100 p-3 rounded-full mb-4">
                <Mail className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="font-medium text-lg mb-1">Email Support</h3>
              <p className="text-sm text-gray-500 text-center mb-4">Get help via email</p>
              <Button variant="outline" className="w-full" data-pendo-id="email-support-button">
                support@voyagr.example
              </Button>
            </div>
          </Card>
        </div>
        
        {/* FAQs */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Frequently Asked Questions</h2>
          
          <div className="space-y-3" data-pendo-id="faq-section">
            {faqs.map(faq => (
              <div 
                key={faq.id} 
                className="border rounded-md overflow-hidden"
                data-pendo-id={`faq-${faq.id}`}
              >
                <button 
                  className="w-full text-left p-4 flex justify-between items-center hover:bg-gray-50"
                  onClick={() => toggleFaq(faq.id)}
                >
                  <span className="font-medium">{faq.question}</span>
                  {faq.expanded ? 
                    <ChevronDown className="h-5 w-5 text-gray-500" /> : 
                    <ChevronRight className="h-5 w-5 text-gray-500" />
                  }
                </button>
                
                {faq.expanded && (
                  <div className="p-4 bg-gray-50 border-t">
                    <p className="text-gray-700">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
          
          <div className="mt-4 text-center">
            <Button 
              variant="link" 
              className="text-sky-blue"
              onClick={() => {
                toast({
                  title: "More FAQs",
                  description: "In a real app, this would load more FAQs or take you to a help center",
                });
                
                // Track with Pendo
                if ((window as any).pendo && (window as any).pendo.track) {
                  (window as any).pendo.track('More FAQs Requested');
                }
              }}
              data-pendo-id="more-faqs-button"
            >
              View More FAQs <ArrowRight className="ml-1 h-4 w-4" />
            </Button>
          </div>
        </div>
        
        {/* Help Topics */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Popular Help Topics</h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4" data-pendo-id="help-topics">
            {[
              { title: "Booking Process", icon: <Calendar className="h-5 w-5" /> },
              { title: "Cancellation Policy", icon: <X className="h-5 w-5" /> },
              { title: "Payment Issues", icon: <CreditCard className="h-5 w-5" /> },
              { title: "Travel Insurance", icon: <Shield className="h-5 w-5" /> },
              { title: "Loyalty Program", icon: <Award className="h-5 w-5" /> },
              { title: "Account Settings", icon: <Settings className="h-5 w-5" /> }
            ].map((topic, index) => (
              <Card 
                key={index}
                className="p-4 flex items-center cursor-pointer hover:bg-gray-50 transition-colors"
                onClick={() => {
                  // Track topic click with Pendo
                  if ((window as any).pendo && (window as any).pendo.track) {
                    (window as any).pendo.track('Help Topic Clicked', {
                      topic: topic.title
                    });
                  }
                  
                  toast({
                    title: topic.title,
                    description: "This would link to detailed help content in a real application",
                  });
                }}
                data-pendo-id={`help-topic-${topic.title.toLowerCase().replace(/\s+/g, '-')}`}
              >
                <div className="bg-sky-blue/10 p-2 rounded-full mr-3">
                  {topic.icon}
                </div>
                <span className="font-medium">{topic.title}</span>
              </Card>
            ))}
          </div>
        </div>
      </div>
      
      {/* Chat Widget */}
      {chatOpen && (
        <div className="fixed bottom-4 right-4 w-80 md:w-96 bg-white rounded-lg shadow-xl border border-gray-200 flex flex-col z-50" data-pendo-id="chat-widget">
          {/* Chat Header */}
          <div className="bg-sky-blue text-white p-4 rounded-t-lg flex justify-between items-center">
            <div className="flex items-center">
              <MessageSquare className="h-5 w-5 mr-2" />
              <span className="font-medium">Support Chat</span>
            </div>
            <button 
              onClick={() => setChatOpen(false)}
              className="text-white hover:text-gray-200"
              data-pendo-id="close-chat"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
          
          {/* Chat Messages */}
          <div className="flex-1 overflow-y-auto p-4 max-h-96 min-h-[300px]">
            {chatMessages.map((msg) => (
              <div 
                key={msg.id}
                className={`mb-4 flex ${msg.fromUser ? 'justify-end' : 'justify-start'}`}
              >
                <div 
                  className={`max-w-[80%] rounded-lg p-3 ${
                    msg.fromUser 
                      ? 'bg-sky-blue text-white' 
                      : 'bg-gray-100 text-gray-800'
                  }`}
                >
                  <p>{msg.text}</p>
                  <p className={`text-xs mt-1 ${msg.fromUser ? 'text-sky-100' : 'text-gray-500'}`}>
                    {msg.time}
                  </p>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
          
          {/* Chat Input */}
          <div className="border-t p-4">
            <div className="flex gap-2">
              <Input
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type your message..."
                className="flex-1"
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                data-pendo-id="chat-input"
              />
              <Button 
                onClick={handleSendMessage}
                className="bg-sky-blue hover:bg-sky-blue/90"
                data-pendo-id="send-chat-message"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
            <p className="text-xs text-gray-500 mt-2">
              <HelpCircle className="h-3 w-3 inline mr-1" />
              This is a demo chat. Messages are not saved or processed by a real agent.
            </p>
          </div>
        </div>
      )}
    </AppLayout>
  );
};

export default Support;
