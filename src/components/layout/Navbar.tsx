import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Menu, Compass } from "lucide-react";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [demoMode, setDemoMode] = useState(false);

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
  
  // Toggle demo mode to simulate different user states
  const toggleDemoMode = () => {
    setDemoMode(!demoMode);
    
    // This would trigger different Pendo behaviors in production
    if ((window as any).pendo) {
      console.log(`Demo mode ${!demoMode ? 'activated' : 'deactivated'}`);
    }
  };
  
  // Simulate launching a guide from the navigation
  const launchGuide = (guideId: string) => {
    if ((window as any).simulatePendoGuide) {
      (window as any).simulatePendoGuide(guideId);
    }
    console.log(`Launch guide: ${guideId}`);
  };

  return (
    <nav 
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled ? 'bg-white/90 shadow-md backdrop-blur-md py-4' : 'bg-transparent py-7'
      }`}
      data-pendo-id="main-navigation"
    >
      <div className="container mx-auto flex items-center justify-between px-4 md:px-6">
        <div className="flex items-center">
          <a href="#" className="flex items-center" data-pendo-id="nav-logo">
            <img 
              src="/placeholder.svg" 
              alt="Voyagr Logo" 
              className="h-8"
            />
          </a>
          
          {/* Demo mode indicator */}
          {demoMode && (
            <div className="ml-3 px-2 py-1 bg-sunset-coral/20 rounded text-xs text-sunset-coral font-medium">
              Demo Mode
            </div>
          )}
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-6">
          <a 
            href="#onboarding" 
            onClick={(e) => { e.preventDefault(); smoothScroll('onboarding'); }}
            className="text-midnight-navy hover:text-sky-blue transition-colors duration-200"
            data-pendo-id="nav-onboarding"
          >
            Getting Started
          </a>
          <a 
            href="#support" 
            onClick={(e) => { e.preventDefault(); smoothScroll('support'); }}
            className="text-midnight-navy hover:text-sky-blue transition-colors duration-200"
            data-pendo-id="nav-support"
          >
            Getting Help
          </a>
          <a 
            href="#upsell" 
            onClick={(e) => { e.preventDefault(); smoothScroll('upsell'); }}
            className="text-midnight-navy hover:text-sky-blue transition-colors duration-200"
            data-pendo-id="nav-upsell"
          >
            Getting More
          </a>
          <Button 
            className="text-white"
            data-pendo-id="nav-contact-sales"
            onClick={() => launchGuide('contact-sales')}
          >
            Start Exploring
          </Button>
          
          {/* Demo toggle - this would allow easy switching between demo states */}
          <Button
            variant="ghost"
            size="sm"
            onClick={toggleDemoMode}
            className="text-xs"
            data-pendo-id="toggle-demo-mode"
          >
            {demoMode ? 'Exit Demo Mode' : 'Enter Demo Mode'}
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
            data-pendo-id="mobile-menu-toggle"
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
            className="text-midnight-navy hover:text-sky-blue transition-colors duration-200"
            data-pendo-id="mobile-nav-onboarding"
          >
            Getting Started
          </a>
          <a 
            href="#support" 
            onClick={(e) => { e.preventDefault(); smoothScroll('support'); }}
            className="text-midnight-navy hover:text-sky-blue transition-colors duration-200"
            data-pendo-id="mobile-nav-support"
          >
            Getting Help
          </a>
          <a 
            href="#upsell" 
            onClick={(e) => { e.preventDefault(); smoothScroll('upsell'); }}
            className="text-midnight-navy hover:text-sky-blue transition-colors duration-200"
            data-pendo-id="mobile-nav-upsell"
          >
            Getting More
          </a>
          <Button 
            className="text-white w-full"
            data-pendo-id="mobile-nav-contact-sales"
            onClick={() => launchGuide('contact-sales')}
          >
            Start Exploring
          </Button>
          
          <Button
            variant="outline"
            size="sm"
            onClick={toggleDemoMode}
            className="text-xs w-full"
            data-pendo-id="mobile-toggle-demo-mode"
          >
            {demoMode ? 'Exit Demo Mode' : 'Enter Demo Mode'}
          </Button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
