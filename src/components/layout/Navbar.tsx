
import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const smoothScroll = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ 
      behavior: 'smooth'
    });
    setMobileMenuOpen(false);
  };

  return (
    <nav 
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled ? 'bg-white/90 shadow-md backdrop-blur-md py-3' : 'bg-transparent py-5'
      }`}
      data-pendo-id="main-navigation"
    >
      <div className="container mx-auto flex items-center justify-between px-4 md:px-6">
        <div className="flex items-center">
          <a href="#" className="flex items-center">
            <span className="font-bold text-2xl text-acme-gray-dark">
              <span className="text-acme-purple">Acme</span>Travel
            </span>
          </a>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-6">
          <a 
            href="#onboarding" 
            onClick={(e) => { e.preventDefault(); smoothScroll('onboarding'); }}
            className="text-acme-gray-dark hover:text-acme-purple transition-colors duration-200"
            data-pendo-id="nav-onboarding"
          >
            Getting Started
          </a>
          <a 
            href="#support" 
            onClick={(e) => { e.preventDefault(); smoothScroll('support'); }}
            className="text-acme-gray-dark hover:text-acme-purple transition-colors duration-200"
            data-pendo-id="nav-support"
          >
            Getting Help
          </a>
          <a 
            href="#upsell" 
            onClick={(e) => { e.preventDefault(); smoothScroll('upsell'); }}
            className="text-acme-gray-dark hover:text-acme-purple transition-colors duration-200"
            data-pendo-id="nav-upsell"
          >
            Getting More
          </a>
          <Button 
            className="bg-acme-pink hover:bg-opacity-90 text-white"
            data-pendo-id="nav-contact-sales"
          >
            Contact Sales
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <Menu className="h-6 w-6" />
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white shadow-lg absolute top-full left-0 w-full py-4 px-6 flex flex-col space-y-4">
          <a 
            href="#onboarding" 
            onClick={(e) => { e.preventDefault(); smoothScroll('onboarding'); }}
            className="text-acme-gray-dark hover:text-acme-purple transition-colors duration-200"
          >
            Getting Started
          </a>
          <a 
            href="#support" 
            onClick={(e) => { e.preventDefault(); smoothScroll('support'); }}
            className="text-acme-gray-dark hover:text-acme-purple transition-colors duration-200"
          >
            Getting Help
          </a>
          <a 
            href="#upsell" 
            onClick={(e) => { e.preventDefault(); smoothScroll('upsell'); }}
            className="text-acme-gray-dark hover:text-acme-purple transition-colors duration-200"
          >
            Getting More
          </a>
          <Button 
            className="bg-acme-pink hover:bg-opacity-90 text-white w-full"
            data-pendo-id="mobile-nav-contact-sales"
          >
            Contact Sales
          </Button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
