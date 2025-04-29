import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { 
  MessageSquare as MessageSquareIcon, 
  Search as SearchIcon, 
  HelpCircle as HelpCircleIcon, 
  Play as PlayIcon, 
  AlertCircle as AlertCircleIcon, 
  Info as InfoIcon
} from "lucide-react";
import AppLayout from "@/components/layout/AppLayout";
import PendoSurvey from "@/components/pendo/PendoSurvey";

const Support = () => {
  const [message, setMessage] = useState('');
  
  // Sample FAQ data
  const faqs = [
    {
      question: "How do I modify or cancel a booking?",
      answer: "You can modify or cancel bookings directly from your trip summary page. Navigate to Dashboard > select the trip > click Modify or Cancel. Changes or cancellations may be subject to airline, hotel, or car rental policies."
    },
    {
      question: "Is Travel Agent available 24/7?",
      answer: "Yes! Travel Agent is available 24/7 to assist with booking needs, answer questions, or help troubleshoot issues with your travel arrangements."
    },
    {
      question: "How can I get a receipt for my booking?",
      answer: "Receipts are automatically sent to your email after booking. You can also access them by going to your Trip Summary page and clicking on 'Download' or 'Print' to get a PDF copy."
    },
    {
      question: "What happens if my flight is delayed or cancelled?",
      answer: "Travel Agent will automatically notify you of any changes to your itinerary. For flight delays or cancellations, you'll receive alternatives directly in the app, where you can select your preferred rebooking option."
    },
    {
      question: "Can I book for multiple travelers?",
      answer: "Yes, you can add multiple travelers during the booking process. You can save frequent travelers in your profile for quicker booking in the future."
    }
  ];
  
  // Handle sending a message to Travel Agent
  const sendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;
    
    console.log("Message sent to Travel Agent:", message);
    setMessage('');
    
    // In a real app, this would communicate with a chatbot service
    // For now we'll just clear the input
  };
  
  return (
    <AppLayout>
      <div className="max-w-6xl mx-auto">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-acme-gray-dark">Help & Support</h1>
          <p className="text-gray-500">Get assistance with your travel needs</p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Help Resources */}
          <div className="lg:col-span-2 space-y-6">
            <Tabs defaultValue="faq" className="w-full" data-pendo-id="help-tabs">
              <TabsList className="grid grid-cols-3 mb-4 w-full">
                <TabsTrigger value="faq" data-pendo-id="tab-faq">
                  <HelpCircleIcon className="h-4 w-4 mr-2" />
                  FAQs
                </TabsTrigger>
                <TabsTrigger value="videos" data-pendo-id="tab-videos">
                  <PlayIcon className="h-4 w-4 mr-2" />
                  How-to Videos
                </TabsTrigger>
                <TabsTrigger value="troubleshoot" data-pendo-id="tab-troubleshoot">
                  <AlertCircleIcon className="h-4 w-4 mr-2" />
                  Troubleshooting
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="faq" data-pendo-id="faq-content">
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle>Frequently Asked Questions</CardTitle>
                    <CardDescription>
                      Find quick answers to common questions
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="relative">
                        <SearchIcon className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <Input 
                          placeholder="Search FAQs..." 
                          className="pl-9"
                          data-pendo-id="faq-search"
                        />
                      </div>
                      
                      <Accordion type="single" collapsible className="mt-4 w-full">
                        {faqs.map((faq, index) => (
                          <AccordionItem key={index} value={`faq-${index}`}>
                            <AccordionTrigger
                              className="text-left hover:text-acme-purple"
                              data-pendo-id={`faq-question-${index}`}
                            >
                              {faq.question}
                            </AccordionTrigger>
                            <AccordionContent className="text-gray-600">
                              {faq.answer}
                            </AccordionContent>
                          </AccordionItem>
                        ))}
                      </Accordion>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="videos" data-pendo-id="videos-content">
                <Card>
                  <CardHeader>
                    <CardTitle>How-to Videos</CardTitle>
                    <CardDescription>Watch step-by-step guides</CardDescription>
                  </CardHeader>
                  <CardContent>
                    {/* Video Tutorials - Pendo Session Replay Simulation */}
                    <div className="space-y-4">
                      <Card className="overflow-hidden">
                        <div className="aspect-video bg-gray-100 relative" data-pendo-id="video-rebooking">
                          <div className="absolute inset-0 flex items-center justify-center">
                            <div className="text-center px-4">
                              <PlayIcon className="h-12 w-12 text-acme-purple mx-auto mb-2" />
                              <h3 className="font-medium text-gray-800">
                                How to Rebook a Flight
                              </h3>
                              <p className="text-sm text-gray-500 mt-1">
                                This would be a session replay showing rebooking process
                              </p>
                            </div>
                          </div>
                        </div>
                        <CardContent className="py-3">
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-gray-500">2:45</span>
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              className="text-acme-purple hover:text-acme-purple-dark"
                              data-pendo-id="watch-video-rebooking"
                            >
                              Watch Video
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                      
                      <Card className="overflow-hidden">
                        <div className="aspect-video bg-gray-100 relative" data-pendo-id="video-travel-agent">
                          <div className="absolute inset-0 flex items-center justify-center">
                            <div className="text-center px-4">
                              <PlayIcon className="h-12 w-12 text-acme-purple mx-auto mb-2" />
                              <h3 className="font-medium text-gray-800">
                                Using Travel Agent to Plan Your Trip
                              </h3>
                              <p className="text-sm text-gray-500 mt-1">
                                Learn how to get the most from our AI assistant
                              </p>
                            </div>
                          </div>
                        </div>
                        <CardContent className="py-3">
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-gray-500">3:12</span>
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              className="text-acme-purple hover:text-acme-purple-dark"
                              data-pendo-id="watch-video-travel-agent"
                            >
                              Watch Video
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="troubleshoot" data-pendo-id="troubleshoot-content">
                <Card>
                  <CardHeader>
                    <CardTitle>Common Issues</CardTitle>
                    <CardDescription>Solve problems with your bookings</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {/* Rage Click Test Area - Pendo Frustration Metric Target */}
                      <Card className="border border-red-100" data-pendo-id="flight-rebooking-issue">
                        <CardContent className="p-4">
                          <div className="flex items-start gap-3">
                            <div className="bg-red-50 p-2 rounded-full">
                              <AlertCircleIcon className="h-5 w-5 text-red-500" />
                            </div>
                            <div>
                              <h3 className="font-medium">Issues with Flight Rebooking</h3>
                              <p className="text-sm text-gray-600 mt-1">
                                Some users experience errors when trying to rebook flights within 24 hours of departure.
                              </p>
                              <div className="mt-3">
                                <Button
                                  variant="outline"
                                  size="sm"
                                  className="mr-2"
                                  data-pendo-id="troubleshoot-rebooking"
                                >
                                  View Solution
                                </Button>
                                <Button
                                  size="sm"
                                  className="bg-acme-pink hover:bg-opacity-90 text-white"
                                  data-pendo-id="contact-support-rebooking"
                                >
                                  Contact Support
                                </Button>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                      
                      <Card className="border border-amber-100" data-pendo-id="payment-processing-issue">
                        <CardContent className="p-4">
                          <div className="flex items-start gap-3">
                            <div className="bg-amber-50 p-2 rounded-full">
                              <InfoIcon className="h-5 w-5 text-amber-500" />
                            </div>
                            <div>
                              <h3 className="font-medium">Payment Processing Delays</h3>
                              <p className="text-sm text-gray-600 mt-1">
                                Occasionally, payment confirmations may be delayed by up to 15 minutes.
                              </p>
                              <div className="mt-3">
                                <Button
                                  variant="outline"
                                  size="sm"
                                  className="mr-2"
                                  data-pendo-id="troubleshoot-payment"
                                >
                                  View Solution
                                </Button>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
            
            {/* CSAT Survey - Pendo Survey Target */}
            <div data-pendo-id="support-satisfaction-survey">
              <PendoSurvey 
                type="csat" 
                title="How was your support experience?" 
                description="Please rate your recent experience with our support resources."
                pendoId="support-csat-survey"
              />
            </div>
          </div>
          
          {/* Right Column - Travel Agent Chat */}
          <div className="space-y-4">
            <Card className="h-[500px] flex flex-col" data-pendo-id="travel-agent-chat">
              <CardHeader className="pb-3 border-b">
                <CardTitle className="flex items-center">
                  <MessageSquareIcon className="h-5 w-5 mr-2 text-acme-purple" />
                  Chat with Travel Agent
                </CardTitle>
                <CardDescription>
                  Ask questions or get help with your bookings
                </CardDescription>
              </CardHeader>
              
              <CardContent className="flex-grow p-4 overflow-auto flex flex-col">
                {/* Simulated chat history would go here */}
                <div className="flex-grow">
                  <div className="mb-4">
                    <div className="bg-acme-purple/10 p-3 rounded-lg rounded-tl-none max-w-[80%] inline-block">
                      <p className="text-sm">
                        Hello! I'm Travel Agent. How can I help with your travel plans today?
                      </p>
                    </div>
                  </div>
                </div>
                
                {/* Chat input */}
                <form onSubmit={sendMessage} className="mt-auto">
                  <div className="relative">
                    <Input
                      placeholder="Type your message..."
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className="pr-20"
                      data-pendo-id="chat-input"
                    />
                    <Button
                      type="submit"
                      size="sm"
                      className="absolute right-1 top-1 bg-acme-purple hover:bg-acme-purple-dark text-white h-8"
                      data-pendo-id="send-message"
                    >
                      Send
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
            
            <Card data-pendo-id="contact-options">
              <CardHeader>
                <CardTitle className="text-base">Need More Help?</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button 
                  variant="outline" 
                  className="w-full justify-start"
                  data-pendo-id="email-support"
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  Email Support
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full justify-start"
                  data-pendo-id="phone-support"
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  Call Support
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default Support;
