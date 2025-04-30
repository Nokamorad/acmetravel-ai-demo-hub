
import React, { useState, useEffect, useRef } from 'react';
import AppLayout from "@/components/layout/AppLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { MessageSquare, FileQuestion, Phone, Mail, Send, Smile, Calendar, User } from "lucide-react";
import { useUser } from "@/contexts/UserContext";

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'agent';
  timestamp: string;
  buttons?: {
    text: string;
    action: string;
    pendoId?: string;
  }[];
}

const Support = () => {
  const [activeTab, setActiveTab] = useState('chat');
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Welcome to AcmeTravel support! How can I help you today?",
      sender: 'agent',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { user } = useUser();

  // Function to generate a travel itinerary with dynamic dates
  const generateItinerary = () => {
    const today = new Date();
    const travelDate = new Date(today);
    travelDate.setDate(today.getDate() + 7); // Travel in a week
    
    const returnDate = new Date(travelDate);
    returnDate.setDate(travelDate.getDate() + 3); // 3-day trip
    
    const formatDate = (date: Date) => {
      return date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
    };
    
    return `Here's what I found for your trip from Chattanooga to New York:

**Outbound: ${formatDate(travelDate)}**
- Departure: Chattanooga (CHA) 7:15 AM
- Arrival: New York (LGA) 9:45 AM
- Flight: Delta DL4582
- Duration: 2h 30m

**Return: ${formatDate(returnDate)}**
- Departure: New York (LGA) 5:30 PM
- Arrival: Chattanooga (CHA) 8:05 PM
- Flight: Delta DL3921
- Duration: 2h 35m

**Price: $387.42**`;
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Auto-responder for predefined messages
  useEffect(() => {
    const lastMessage = messages[messages.length - 1];
    if (lastMessage?.sender === 'user') {
      // If the message contains a greeting, respond with the travel question
      if (lastMessage.text.toLowerCase().includes('hi') || 
          lastMessage.text.toLowerCase().includes('hello')) {
        setTimeout(() => {
          setMessages(prev => [...prev, {
            id: prev.length + 1,
            text: "Hi! I'd love to help you with that. What dates and which cities are you traveling to and from?",
            sender: 'agent',
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
          }]);
        }, 500);
      } 
      // If message contains booking help or travel keywords
      else if (lastMessage.text.toLowerCase().includes('help') && 
               (lastMessage.text.toLowerCase().includes('book') || 
                lastMessage.text.toLowerCase().includes('travel'))) {
        
        if (lastMessage.text.toLowerCase().includes('chattanooga') && 
            lastMessage.text.toLowerCase().includes('new york')) {
          setTimeout(() => {
            setMessages(prev => [...prev, {
              id: prev.length + 1,
              text: generateItinerary(),
              sender: 'agent',
              timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
              buttons: [
                {
                  text: "Book Now",
                  action: "book",
                  pendoId: "chat-book-now-button"
                }
              ]
            }]);
          }, 800);
        }
      }
    }
  }, [messages]);

  const handleSend = () => {
    if (message.trim() === '') return;
    
    // Add the user message
    setMessages(prev => [...prev, {
      id: prev.length + 1,
      text: message,
      sender: 'user',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }]);
    
    setMessage('');
  };

  const handleExampleClick = (exampleText: string) => {
    setMessages(prev => [...prev, {
      id: prev.length + 1,
      text: exampleText,
      sender: 'user',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }]);
  };
  
  const currentDate = new Date();
  const nextWeek = new Date();
  nextWeek.setDate(currentDate.getDate() + 7);
  const formattedDate = nextWeek.toLocaleDateString('en-US', { month: 'long', day: 'numeric' });

  // Show examples when chat starts
  const chatExamples = [
    { text: "Hi!" },
    { text: `I need help booking travel for ${formattedDate} from Chattanooga to New York.` },
    { text: "How do I cancel my booking?" }
  ];

  return (
    <AppLayout>
      <div className="max-w-6xl mx-auto px-4 py-6">
        <h1 className="text-2xl font-bold text-acme-gray-dark mb-6">Help & Support</h1>
        
        <div className="lg:flex gap-6">
          {/* Left sidebar */}
          <div className="lg:w-1/4 mb-6 lg:mb-0">
            <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
              <h2 className="font-semibold text-lg mb-4">Contact Options</h2>
              
              <div className="space-y-3">
                <div className="flex items-center p-2 rounded-md hover:bg-gray-50 cursor-pointer">
                  <div className="bg-acme-purple/10 p-2 rounded-full mr-3">
                    <MessageSquare className="h-4 w-4 text-acme-purple" />
                  </div>
                  <div>
                    <p className="font-medium text-sm">Live Chat</p>
                    <p className="text-xs text-gray-500">Available 24/7</p>
                  </div>
                </div>
                
                <div className="flex items-center p-2 rounded-md hover:bg-gray-50 cursor-pointer">
                  <div className="bg-blue-100 p-2 rounded-full mr-3">
                    <Phone className="h-4 w-4 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-medium text-sm">Phone Support</p>
                    <p className="text-xs text-gray-500">1-800-555-1234</p>
                  </div>
                </div>
                
                <div className="flex items-center p-2 rounded-md hover:bg-gray-50 cursor-pointer">
                  <div className="bg-green-100 p-2 rounded-full mr-3">
                    <Mail className="h-4 w-4 text-green-600" />
                  </div>
                  <div>
                    <p className="font-medium text-sm">Email Support</p>
                    <p className="text-xs text-gray-500">support@acmetravel.com</p>
                  </div>
                </div>
                
                <div className="flex items-center p-2 rounded-md hover:bg-gray-50 cursor-pointer">
                  <div className="bg-amber-100 p-2 rounded-full mr-3">
                    <FileQuestion className="h-4 w-4 text-amber-600" />
                  </div>
                  <div>
                    <p className="font-medium text-sm">Help Center</p>
                    <p className="text-xs text-gray-500">FAQs & guides</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-4 bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
              <h2 className="font-semibold text-lg mb-2">Quick Links</h2>
              <ul className="space-y-1 text-sm">
                <li className="text-acme-purple hover:underline cursor-pointer">Cancellation Policy</li>
                <li className="text-acme-purple hover:underline cursor-pointer">Baggage Information</li>
                <li className="text-acme-purple hover:underline cursor-pointer">Travel Insurance</li>
                <li className="text-acme-purple hover:underline cursor-pointer">COVID-19 Travel Updates</li>
                <li className="text-acme-purple hover:underline cursor-pointer">Manage My Booking</li>
              </ul>
            </div>
          </div>
          
          {/* Main chat area */}
          <div className="lg:w-3/4">
            <div className="bg-white rounded-lg border border-gray-200 shadow-sm h-[600px] flex flex-col">
              <div className="border-b border-gray-200 p-4">
                <Tabs defaultValue="chat" className="w-full" onValueChange={setActiveTab}>
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="chat">Travel Agent Chat</TabsTrigger>
                    <TabsTrigger value="faq">FAQ</TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>
              
              {activeTab === 'chat' && (
                <>
                  <div className="flex-1 overflow-y-auto p-4 space-y-4" data-pendo-id="support-chat-messages">
                    {messages.map((msg) => (
                      <div 
                        key={msg.id} 
                        className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                      >
                        <div className={`max-w-[80%] ${msg.sender === 'user' ? 'bg-acme-purple text-white' : 'bg-gray-100'} rounded-lg px-4 py-3`}>
                          {msg.sender === 'agent' && (
                            <div className="flex items-center mb-2">
                              <Avatar className="h-6 w-6 mr-2">
                                <AvatarFallback className="bg-acme-pink text-white text-xs">AT</AvatarFallback>
                              </Avatar>
                              <span className="text-sm font-medium">AcmeTravel Agent</span>
                            </div>
                          )}
                          <div className={`text-sm whitespace-pre-line ${msg.sender === 'user' ? 'text-white' : 'text-gray-800'}`}>
                            {msg.text}
                          </div>
                          {msg.buttons && (
                            <div className="mt-3 flex flex-wrap gap-2">
                              {msg.buttons.map((button, index) => (
                                <Button 
                                  key={index}
                                  data-pendo-id={button.pendoId || `chat-button-${index}`}
                                  className="bg-acme-purple hover:bg-acme-purple-dark text-white"
                                >
                                  {button.text}
                                </Button>
                              ))}
                            </div>
                          )}
                          <div className={`text-xs mt-1 ${msg.sender === 'user' ? 'text-white/70' : 'text-gray-500'}`}>
                            {msg.timestamp}
                          </div>
                        </div>
                        {msg.sender === 'user' && (
                          <Avatar className="h-6 w-6 ml-2 mt-1">
                            <AvatarFallback className="bg-gray-300 text-gray-800 text-xs">
                              {user.initials}
                            </AvatarFallback>
                          </Avatar>
                        )}
                      </div>
                    ))}
                    
                    {/* Chat examples shown when chat starts */}
                    {messages.length < 3 && (
                      <div className="mt-4">
                        <p className="text-xs text-gray-500 mb-2">Try asking:</p>
                        <div className="flex flex-wrap gap-2">
                          {chatExamples.map((example, index) => (
                            <Button 
                              key={index}
                              variant="outline"
                              size="sm"
                              className="text-xs"
                              onClick={() => handleExampleClick(example.text)}
                            >
                              {example.text}
                            </Button>
                          ))}
                        </div>
                      </div>
                    )}
                    
                    <div ref={messagesEndRef} />
                  </div>
                  
                  <div className="p-4 border-t border-gray-200">
                    <div className="flex gap-2">
                      <Input
                        className="flex-1"
                        placeholder="Type your message..."
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') handleSend();
                        }}
                      />
                      <Button 
                        onClick={handleSend}
                        className="bg-acme-purple hover:bg-acme-purple-dark text-white"
                      >
                        <Send className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </>
              )}
              
              {activeTab === 'faq' && (
                <div className="flex-1 overflow-y-auto p-4">
                  {/* FAQ content would go here */}
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-semibold mb-1">How do I change or cancel my reservation?</h3>
                      <p className="text-sm text-gray-600">You can modify or cancel your reservation by visiting the "Trip Summary" page and selecting the reservation you wish to change. Fees may apply depending on your fare type and timing.</p>
                    </div>
                    
                    <div>
                      <h3 className="font-semibold mb-1">What is your baggage policy?</h3>
                      <p className="text-sm text-gray-600">Baggage allowances vary by fare class and destination. Most economy tickets include one carry-on and one personal item. Checked baggage fees start at $30 for the first bag.</p>
                    </div>
                    
                    <div>
                      <h3 className="font-semibold mb-1">How do I apply travel credits or vouchers?</h3>
                      <p className="text-sm text-gray-600">During checkout, select "Apply Credits or Vouchers" and enter your voucher code. The system will automatically apply any valid credits to your purchase.</p>
                    </div>
                    
                    <div>
                      <h3 className="font-semibold mb-1">What COVID-19 restrictions are in place?</h3>
                      <p className="text-sm text-gray-600">COVID-19 restrictions vary by destination. Please check the travel requirements page for the most up-to-date information about your specific destination.</p>
                    </div>
                    
                    <div className="mt-6 text-center" data-pendo-id="faq-pendo-guide-target">
                      <p className="text-sm text-gray-500 mb-2">Can't find what you're looking for?</p>
                      <Button 
                        onClick={() => setActiveTab('chat')}
                        className="bg-acme-purple hover:bg-acme-purple-dark text-white"
                      >
                        Chat with an Agent
                      </Button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default Support;
