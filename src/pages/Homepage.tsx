
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Navigation } from "lucide-react";
const Homepage = () => {
  return <div className="min-h-screen flex flex-col bg-white">
      {/* Navigation Bar */}
      <header className="bg-white py-4 px-6 shadow-sm border-b border-gray-100">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-left h-100">
            <img src="/lovable-uploads/f345156a-d089-4d2e-a5c1-793bf54fad80.png" alt="Voyagr Logo" className="h-20 w-auto mr-2" />
          </div>
          <div className="flex items-center gap-6">
            <a href="#features" className="text-gray-700 hover:text-sky-blue transition-colors">Features</a>
            <a href="#about" className="text-gray-700 hover:text-sky-blue transition-colors">About</a>
            <Link to="/dashboard" className="bg-sky-blue text-white py-2 px-4 rounded-md hover:bg-sky-blue/90 transition-colors">
              Sign In
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 flex-grow hero-gradient">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center">
            <div className="lg:w-1/2 mb-10 lg:mb-0 lg:pr-12">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-header text-midnight-navy mb-6">
                Smarter, Faster Travel Starts Here.
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                Meet Travel Agent, your AI-powered assistant that makes booking flights, hotels, and cars effortless. Save time and reduce company travel costs with intelligent recommendations tailored to your preferences.
              </p>
              <Link to="/dashboard">
                <Button className="bg-sky-blue hover:bg-sky-blue/90 text-white text-lg py-6 px-8 rounded-lg shadow-md hover:shadow-lg transition-all flex items-center gap-2">
                  Get Started <ArrowRight className="h-5 w-5" />
                </Button>
              </Link>
            </div>
            <div className="lg:w-1/2">
              <div className="flex justify-center px-4">
                <div className="w-full max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl p-4 sm:p-6 bg-indigo-50 rounded-xl shadow-lg">
                  <img alt="Travel booking interface" className="w-full h-auto rounded-lg transform transition-transform duration-300 hover:scale-105" src="/lovable-uploads/9a16b421-e932-4cd6-bbb5-aa5df638ad1f.png" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-midnight-navy">Simplify Your Business Travel</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 - Updated with the custom itinerary icon */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="bg-sky-blue/10 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                <img src="https://img.icons8.com/pulsar-color/48/itinerary.png" alt="itinerary" className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-midnight-navy">Smart Itineraries</h3>
              <p className="text-gray-600">AI-powered recommendations that match your travel preferences and company policies.</p>
            </div>
            
            {/* Feature 2 - Updated with credit card expense tracking icon */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="bg-sky-blue/10 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                <img src="https://img.icons8.com/pulsar-color/48/card-in-use-1.png" alt="expense-tracking" className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-midnight-navy">Expense Tracking</h3>
              <p className="text-gray-600">Automatically capture and categorize travel expenses for seamless reporting.</p>
            </div>
            
            {/* Feature 3 - Updated with 24/7 support icon */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="bg-sky-blue/10 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                <img src="https://img.icons8.com/plasticine/100/24-hours-day-support.png" alt="24-hours-support" className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-midnight-navy">24/7 Support</h3>
              <p className="text-gray-600">Access live support anytime, anywhere during your business trips.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-midnight-navy text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Transform Business Travel?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Join thousands of companies optimizing their travel experience with Voyagr.
          </p>
          <Link to="/dashboard">
            <Button className="bg-white text-midnight-navy hover:bg-cloud-gray transition-colors text-lg py-6 px-8 rounded-lg">
              Get Started Today
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center mb-4 md:mb-0">
              <img src="/lovable-uploads/f345156a-d089-4d2e-a5c1-793bf54fad80.png" alt="Voyagr Logo" className="h-8 w-auto mr-2" />
              <span className="text-lg font-bold">by AcmeCorp</span>
            </div>
            
            <div className="flex gap-6">
              <a href="#" className="text-gray-600 hover:text-sky-blue transition-colors">Privacy</a>
              <a href="#" className="text-gray-600 hover:text-sky-blue transition-colors">Terms</a>
              <a href="#" className="text-gray-600 hover:text-sky-blue transition-colors">Contact</a>
            </div>
            
            <p className="text-sm text-gray-500 mt-4 md:mt-0">
              &copy; 2025 AcmeCorp. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>;
};
export default Homepage;
