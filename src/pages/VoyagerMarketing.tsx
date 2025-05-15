
import React, { useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Plane, Building, Headphones, CheckCircle } from 'lucide-react';

const VoyagerMarketing: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  useEffect(() => {
    // Track page visit with Pendo
    if ((window as any).pendo && (window as any).pendo.track) {
      (window as any).pendo.track('Visited Voyager Site', {
        page: location.pathname,
        referrer: document.referrer
      });
    }
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col" data-pendo-id="voyager-marketing-page">
      {/* Navigation Bar */}
      <header className="bg-white py-4 px-6 shadow-sm sticky top-0 z-10">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center">
            <Plane className="h-8 w-8 text-sky-blue mr-2" />
            <span className="text-2xl font-bold text-midnight-navy">Voyagr</span>
          </div>
          <nav className="hidden md:flex space-x-6">
            <Link to="#" className="text-gray-700 hover:text-sky-blue">Business Travel</Link>
            <Link to="#" className="text-gray-700 hover:text-sky-blue">Solutions</Link>
            <Link to="#" className="text-gray-700 hover:text-sky-blue">About</Link>
            <Link to="#" className="text-gray-700 hover:text-sky-blue">Contact</Link>
          </nav>
          <div className="flex items-center space-x-4">
            <Button 
              variant="outline" 
              onClick={() => navigate('/signin')}
              data-pendo-id="marketing-signin-button"
            >
              Sign In
            </Button>
            <Button 
              onClick={() => navigate('/signup')}
              data-pendo-id="marketing-signup-button"
            >
              Sign Up Free
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-midnight-navy to-sky-blue text-white py-20">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-10 md:mb-0">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Business Travel, <span className="text-amber-300">Simplified.</span>
              </h1>
              <p className="text-xl mb-8">
                Book, manage, and analyze all your business travel in one platform.
                Discover why companies choose Voyagr for their travel needs.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  size="lg" 
                  className="bg-amber-500 hover:bg-amber-600 text-white px-8"
                  onClick={() => navigate('/book')}
                  data-pendo-id="marketing-book-trip-button"
                >
                  Book Your Trip
                </Button>
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="bg-white/10 hover:bg-white/20 text-white border-white"
                  onClick={() => navigate('/signup')}
                  data-pendo-id="marketing-request-demo-button"
                >
                  Request Demo
                </Button>
              </div>
            </div>
            <div className="md:w-1/2 pl-0 md:pl-10">
              <img 
                src="https://images.unsplash.com/photo-1512453979798-5ea266f8880c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1050&q=80" 
                alt="Business Travel" 
                className="rounded-lg shadow-xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Featured Destinations */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">Popular Business Destinations</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Munich Card */}
            <div 
              className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow"
              data-pendo-id="destination-munich"
            >
              <img 
                src="https://images.unsplash.com/photo-1599982890963-3aabd60b27b9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1050&q=80" 
                alt="Munich" 
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="font-bold text-xl mb-2">Munich, Germany</h3>
                <p className="text-gray-700 mb-4">
                  Business hub with perfect blend of work and leisure.
                </p>
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => navigate('/book')}
                  data-pendo-id="book-munich-button"
                >
                  Explore Munich
                </Button>
              </div>
            </div>
            
            {/* New York Card */}
            <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow">
              <img 
                src="https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1050&q=80" 
                alt="New York" 
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="font-bold text-xl mb-2">New York, USA</h3>
                <p className="text-gray-700 mb-4">
                  Financial capital with endless business opportunities.
                </p>
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => navigate('/book')}
                >
                  Explore New York
                </Button>
              </div>
            </div>
            
            {/* London Card */}
            <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow">
              <img 
                src="https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?ixlib=rb-4.0.3&auto=format&fit=crop&w=1050&q=80" 
                alt="London" 
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="font-bold text-xl mb-2">London, UK</h3>
                <p className="text-gray-700 mb-4">
                  Global business center with historical charm.
                </p>
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => navigate('/book')}
                >
                  Explore London
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose Voyagr</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center" data-pendo-id="feature-booking">
              <div className="bg-sky-blue/10 p-4 rounded-full inline-flex justify-center items-center mb-4">
                <Plane className="h-8 w-8 text-sky-blue" />
              </div>
              <h3 className="text-xl font-bold mb-2">Seamless Booking</h3>
              <p className="text-gray-600">
                Book flights, hotels, and transport in one unified platform.
              </p>
            </div>
            
            <div className="text-center" data-pendo-id="feature-policy">
              <div className="bg-sky-blue/10 p-4 rounded-full inline-flex justify-center items-center mb-4">
                <Building className="h-8 w-8 text-sky-blue" />
              </div>
              <h3 className="text-xl font-bold mb-2">Policy Compliance</h3>
              <p className="text-gray-600">
                Ensure all bookings align with your company's travel policies.
              </p>
            </div>
            
            <div className="text-center" data-pendo-id="feature-support">
              <div className="bg-sky-blue/10 p-4 rounded-full inline-flex justify-center items-center mb-4">
                <Headphones className="h-8 w-8 text-sky-blue" />
              </div>
              <h3 className="text-xl font-bold mb-2">24/7 Support</h3>
              <p className="text-gray-600">
                Access our dedicated support team anytime, anywhere.
              </p>
            </div>
            
            <div className="text-center" data-pendo-id="feature-insights">
              <div className="bg-sky-blue/10 p-4 rounded-full inline-flex justify-center items-center mb-4">
                <CheckCircle className="h-8 w-8 text-sky-blue" />
              </div>
              <h3 className="text-xl font-bold mb-2">Travel Insights</h3>
              <p className="text-gray-600">
                Get valuable analytics to optimize your travel budget.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-sky-blue text-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to transform your business travel?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Join thousands of businesses that trust Voyagr for their corporate travel needs.
          </p>
          <Button 
            size="lg" 
            className="bg-white text-sky-blue hover:bg-gray-100 px-10"
            onClick={() => navigate('/signup')}
            data-pendo-id="marketing-bottom-signup-button"
          >
            Get Started Today
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-midnight-navy text-white py-12">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="font-bold text-lg mb-4">Voyagr</h3>
              <p className="text-gray-300">
                Making business travel effortless since 2022.
              </p>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-4">Product</h3>
              <ul className="space-y-2">
                <li><Link to="#" className="text-gray-300 hover:text-white">Features</Link></li>
                <li><Link to="#" className="text-gray-300 hover:text-white">Solutions</Link></li>
                <li><Link to="#" className="text-gray-300 hover:text-white">Integrations</Link></li>
                <li><Link to="#" className="text-gray-300 hover:text-white">Pricing</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-4">Company</h3>
              <ul className="space-y-2">
                <li><Link to="#" className="text-gray-300 hover:text-white">About Us</Link></li>
                <li><Link to="#" className="text-gray-300 hover:text-white">Careers</Link></li>
                <li><Link to="#" className="text-gray-300 hover:text-white">Partners</Link></li>
                <li><Link to="#" className="text-gray-300 hover:text-white">Blog</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-4">Support</h3>
              <ul className="space-y-2">
                <li><Link to="#" className="text-gray-300 hover:text-white">Help Center</Link></li>
                <li><Link to="#" className="text-gray-300 hover:text-white">Contact Us</Link></li>
                <li><Link to="#" className="text-gray-300 hover:text-white">Privacy Policy</Link></li>
                <li><Link to="#" className="text-gray-300 hover:text-white">Terms of Service</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-700 pt-8 text-center text-gray-400">
            <p>&copy; 2025 Voyagr, Inc. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default VoyagerMarketing;
