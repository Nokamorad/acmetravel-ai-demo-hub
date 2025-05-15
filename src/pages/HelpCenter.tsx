
import React from 'react';
import AppLayout from "@/components/layout/AppLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Search,
  MessageCircle,
  Phone,
  Mail,
  File,
  HelpCircle,
  ChevronRight
} from "lucide-react";

const HelpCenter = () => {
  return (
    <AppLayout>
      <div className="max-w-5xl mx-auto px-4 py-6">
        <h1 className="text-2xl font-bold text-acme-gray-dark mb-2">Help Center</h1>
        <p className="text-gray-600 mb-6">Find answers to your questions or contact our support team</p>
        
        {/* Search Bar */}
        <div className="relative mb-8">
          <Input 
            placeholder="What can we help you with?"
            className="h-12 pl-10 pr-4 bg-white"
            data-pendo-id="help-search-input"
          />
          <Search className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
          <Button 
            className="absolute right-2 top-2 bg-sky-blue hover:bg-sky-blue/90 text-white"
            size="sm"
            data-pendo-id="help-search-button"
          >
            Search
          </Button>
        </div>
        
        {/* Tabs */}
        <Tabs defaultValue="faq" className="mb-8">
          <TabsList className="bg-white border-b border-gray-200 w-full justify-start mb-6 p-0 h-auto rounded-none gap-0">
            <TabsTrigger 
              value="faq" 
              className="data-[state=active]:border-b-2 data-[state=active]:border-sky-blue data-[state=active]:text-sky-blue data-[state=active]:shadow-none rounded-none px-6 py-3"
              data-pendo-id="help-tab-faq"
            >
              Frequently Asked Questions
            </TabsTrigger>
            <TabsTrigger 
              value="contact" 
              className="data-[state=active]:border-b-2 data-[state=active]:border-sky-blue data-[state=active]:text-sky-blue data-[state=active]:shadow-none rounded-none px-6 py-3"
              data-pendo-id="help-tab-contact"
            >
              Contact Support
            </TabsTrigger>
            <TabsTrigger 
              value="guides" 
              className="data-[state=active]:border-b-2 data-[state=active]:border-sky-blue data-[state=active]:text-sky-blue data-[state=active]:shadow-none rounded-none px-6 py-3"
              data-pendo-id="help-tab-guides"
            >
              User Guides
            </TabsTrigger>
          </TabsList>
          
          {/* FAQ Content */}
          <TabsContent value="faq" className="mt-0">
            <div className="space-y-4">
              {[
                { title: "How do I cancel or change my flight?", id: "cancel-flight" },
                { title: "What's your refund policy?", id: "refund-policy" },
                { title: "How do I add frequent flyer numbers?", id: "frequent-flyer" },
                { title: "How much luggage can I bring?", id: "luggage-allowance" },
                { title: "Do you offer corporate discounts?", id: "corporate-discounts" },
                { title: "How do I download my invoice?", id: "download-invoice" }
              ].map((faq) => (
                <div 
                  key={faq.id} 
                  className="p-4 border border-gray-200 rounded-md bg-white hover:bg-gray-50 cursor-pointer"
                  data-pendo-id={`faq-${faq.id}`}
                >
                  <div className="flex justify-between items-center">
                    <h3 className="font-medium">{faq.title}</h3>
                    <ChevronRight className="h-5 w-5 text-gray-400" />
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
          
          {/* Contact Support Content */}
          <TabsContent value="contact" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white border border-gray-200 rounded-lg p-6 text-center">
                <div className="bg-sky-blue/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <MessageCircle className="h-8 w-8 text-sky-blue" />
                </div>
                <h3 className="font-medium text-lg mb-2">Chat with Us</h3>
                <p className="text-gray-600 text-sm mb-4">
                  Get instant help from our Travel Agent AI or live agents.
                </p>
                <Button 
                  className="w-full bg-sky-blue hover:bg-sky-blue/90"
                  data-pendo-id="contact-chat-button"
                >
                  Start Chat
                </Button>
              </div>
              
              <div className="bg-white border border-gray-200 rounded-lg p-6 text-center">
                <div className="bg-sky-blue/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Phone className="h-8 w-8 text-sky-blue" />
                </div>
                <h3 className="font-medium text-lg mb-2">Call Support</h3>
                <p className="text-gray-600 text-sm mb-4">
                  Speak with a travel specialist 24/7 for urgent issues.
                </p>
                <Button 
                  className="w-full bg-sky-blue hover:bg-sky-blue/90"
                  data-pendo-id="contact-call-button"
                >
                  +1 (800) 555-0123
                </Button>
              </div>
              
              <div className="bg-white border border-gray-200 rounded-lg p-6 text-center">
                <div className="bg-sky-blue/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Mail className="h-8 w-8 text-sky-blue" />
                </div>
                <h3 className="font-medium text-lg mb-2">Email Us</h3>
                <p className="text-gray-600 text-sm mb-4">
                  For non-urgent inquiries, send us an email.
                </p>
                <Button 
                  className="w-full bg-sky-blue hover:bg-sky-blue/90"
                  data-pendo-id="contact-email-button"
                >
                  support@voyagr.co
                </Button>
              </div>
            </div>
          </TabsContent>
          
          {/* Guides Content */}
          <TabsContent value="guides" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { title: "Getting Started with Voyagr", icon: File, id: "getting-started" },
                { title: "Booking Your First Trip", icon: File, id: "first-trip" },
                { title: "Managing Your Travel Policy", icon: File, id: "travel-policy" },
                { title: "Understanding Loyalty Benefits", icon: File, id: "loyalty-benefits" }
              ].map((guide) => (
                <div 
                  key={guide.id}
                  className="flex bg-white border border-gray-200 rounded-lg p-4 hover:bg-gray-50 cursor-pointer"
                  data-pendo-id={`guide-${guide.id}`}
                >
                  <div className="bg-sky-blue/10 w-10 h-10 rounded flex items-center justify-center mr-4">
                    <guide.icon className="h-5 w-5 text-sky-blue" />
                  </div>
                  <div>
                    <h3 className="font-medium mb-1">{guide.title}</h3>
                    <p className="text-sm text-gray-600">
                      Read our comprehensive guide to learn more.
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
        
        {/* Travel Agent Assistant */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 flex flex-col md:flex-row items-center justify-between">
          <div className="flex items-center mb-4 md:mb-0">
            <div className="bg-sky-blue rounded-full p-3 mr-4">
              <HelpCircle className="h-6 w-6 text-white" />
            </div>
            <div>
              <h3 className="font-medium text-lg mb-1">Need personalized help?</h3>
              <p className="text-gray-600">
                Our AI Travel Agent can assist with specific questions about your bookings.
              </p>
            </div>
          </div>
          <Button 
            className="bg-sky-blue hover:bg-sky-blue/90"
            data-pendo-id="travel-agent-help-button"
          >
            Ask Travel Agent
          </Button>
        </div>
      </div>
    </AppLayout>
  );
};

export default HelpCenter;
