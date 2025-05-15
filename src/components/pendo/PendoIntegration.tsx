
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { useUser } from '@/contexts/UserContext';

// Interface for visitor metadata types
interface VisitorMetadata {
  visitor_id: string;
  visitor_type: 'commuter' | 'occasional' | 'manager';
  utm_source: string | null;
  first_booking_complete: boolean;
  language: string;
  travel_frequency: string;
  tier: 'standard' | 'premium' | 'executive';
  annual_travel_spend: number;
  full_name?: string;
  email?: string;
}

// This component handles the Pendo script integration
const PendoIntegration: React.FC = () => {
  const location = useLocation();
  const { user } = useUser();
  
  const [metadata, setMetadata] = useState<VisitorMetadata>(() => {
    // Try to load existing metadata from localStorage
    const savedMetadata = localStorage.getItem('acmetravel_visitor');
    if (savedMetadata) {
      return JSON.parse(savedMetadata);
    }
    
    // Generate anonymous visitor ID for initial visit
    const anonymousId = `anonymous-${Math.floor(Math.random() * 1000000)}`;
    console.log('Generated anonymous visitor ID:', anonymousId);
    
    // Generate new visitor metadata if none exists
    const visitorType = Math.random() < 0.33 ? 'commuter' : 
                        Math.random() < 0.66 ? 'occasional' : 'manager';
    
    // Determine tier and spend based on visitor type
    let tier: 'standard' | 'premium' | 'executive';
    let annualSpend: number;
    
    switch (visitorType) {
      case 'commuter':
        tier = Math.random() < 0.7 ? 'premium' : 'executive';
        annualSpend = Math.floor(Math.random() * 50000) + 30000;
        break;
      case 'manager':
        tier = 'executive';
        annualSpend = Math.floor(Math.random() * 100000) + 75000;
        break;
      default: // occasional
        tier = 'standard';
        annualSpend = Math.floor(Math.random() * 15000) + 5000;
    }
    
    const newMetadata: VisitorMetadata = {
      visitor_id: anonymousId, // Anonymous visitor ID
      visitor_type: visitorType,
      utm_source: new URLSearchParams(window.location.search).get('utm_source'),
      first_booking_complete: false,
      language: navigator.language || 'en-US',
      travel_frequency: visitorType === 'commuter' ? 'frequent' : 
                        visitorType === 'occasional' ? 'occasional' : 'regular',
      tier: tier,
      annual_travel_spend: annualSpend
    };
    
    // Save to localStorage
    localStorage.setItem('acmetravel_visitor', JSON.stringify(newMetadata));
    return newMetadata;
  });
  
  useEffect(() => {
    // Initialize Pendo with visitor and account data
    const initPendo = () => {
      // Reset the API key for the demo
      const PENDO_API_KEY = '2d9ca49c-d4fd-4132-59ea-72018c9e5d77';
      
      // Only initialize once per page load
      if ((window as any).pendo && (window as any).pendo._apiKey) {
        console.log('Pendo already initialized, not reinitializing');
        return;
      }
      
      console.log('Initializing Pendo with visitor data:', metadata);
      console.log('User data:', user);
      
      // Pendo snippet
      (function(apiKey){
        (function(p,e,n,d,o){var v,w,x,y,z;o=p[d]=p[d]||{};o._q=o._q||[];
        v=['initialize','identify','updateOptions','pageLoad','track'];for(w=0,x=v.length;w<x;++w)(function(m){
            o[m]=o[m]||function(){o._q[m===v[0]?'unshift':'push']([m].concat([].slice.call(arguments,0)));};})(v[w]);
            y=e.createElement(n);y.async=!0;y.src='https://cdn.pendo.io/agent/static/'+apiKey+'/pendo.js';
            z=e.getElementsByTagName(n)[0];z.parentNode.insertBefore(y,z);})(window,document,'script','pendo');
            
        // Initialize Pendo with visitor data
        (window as any).pendo.initialize({
          visitor: {
            id: metadata.visitor_id,
            user_id: user.id,
            user_name: user.name,
            email: user.email || metadata.email,
            full_name: metadata.full_name || user.name,
            visitor_type: metadata.visitor_type,
            utm_source: metadata.utm_source,
            first_booking_complete: metadata.first_booking_complete,
            language: metadata.language,
            travel_frequency: metadata.travel_frequency,
            tier: metadata.tier,
            annual_travel_spend: metadata.annual_travel_spend
          },
          account: {
            id: 'demo-account',
            name: 'AcmeTravel Demo',
            is_paying: true,
            plan_level: 'enterprise',
            total_users: 150,
            industry: 'Travel'
          }
        });
      })(PENDO_API_KEY);
    };

    // Initialize Pendo when the component mounts
    initPendo();

    // Track page views for Pendo analytics
    const trackPageView = () => {
      if ((window as any).pendo && (window as any).pendo.track) {
        console.log(`Pendo track page view: ${location.pathname}`);
        (window as any).pendo.track('page_view', { page: location.pathname });
      }
    };
    
    // Track page view when location changes
    trackPageView();
    
    // Expose function to update anonymous visitor to identified visitor
    (window as any).onUserSignup = (name: string, email: string) => {
      const cleanName = name.toLowerCase().replace(/\s+/g, '');
      const visitorId = `demo-${cleanName}`;
      
      // Update metadata with user info
      const updatedMetadata = { 
        ...metadata, 
        visitor_id: visitorId,
        full_name: name,
        email: email
      };
      
      setMetadata(updatedMetadata);
      localStorage.setItem('acmetravel_visitor', JSON.stringify(updatedMetadata));
      
      // Update Pendo visitor
      if ((window as any).pendo) {
        console.log('Reinitializing Pendo with user data:', updatedMetadata);
        (window as any).pendo.initialize({
          visitor: {
            id: visitorId,
            email: email,
            full_name: name,
            visitor_type: metadata.visitor_type,
            utm_source: metadata.utm_source,
            first_booking_complete: metadata.first_booking_complete,
            language: metadata.language,
            travel_frequency: metadata.travel_frequency,
            tier: metadata.tier,
            annual_travel_spend: metadata.annual_travel_spend
          },
          account: {
            id: 'demo-account'
          }
        });
      }
      
      // Track signup completed event
      if ((window as any).pendo && (window as any).pendo.track) {
        (window as any).pendo.track('Signup Completed', {
          user_name: name,
          user_email: email
        });
      }
      
      console.log('Updated visitor metadata after signup:', updatedMetadata);
      return updatedMetadata;
    };
    
    // Helper for simulating Pendo guide launches (for demo purposes)
    (window as any).simulatePendoGuide = (guideId: string) => {
      console.log(`Launching Pendo guide: ${guideId}`);
      // In production, this would trigger a specific Pendo guide
    };
    
    return () => {
      // Cleanup if necessary
    };
  }, [location, metadata, user]);

  // Create a dropdown to toggle user segments for demo purposes
  return (
    <div className="fixed bottom-2 right-2 z-50 opacity-50 hover:opacity-100 transition-opacity">
      <select 
        className="text-xs bg-white border border-gray-200 rounded py-1 px-2 shadow-sm"
        value={metadata.visitor_type}
        onChange={(e) => {
          const value = e.target.value as 'commuter' | 'occasional' | 'manager';
          let tier: 'standard' | 'premium' | 'executive';
          let annualSpend: number;
          
          switch (value) {
            case 'commuter':
              tier = 'premium';
              annualSpend = 45000;
              break;
            case 'manager':
              tier = 'executive';
              annualSpend = 120000;
              break;
            default: // occasional
              tier = 'standard';
              annualSpend = 8000;
          }
          
          const updatedMetadata = {
            ...metadata,
            visitor_type: value,
            travel_frequency: value === 'commuter' ? 'frequent' : 
                              (value === 'occasional' ? 'occasional' : 'regular'),
            tier: tier,
            annual_travel_spend: annualSpend
          };
          
          setMetadata(updatedMetadata);
          localStorage.setItem('acmetravel_visitor', JSON.stringify(updatedMetadata));
          
          // Update Pendo visitor metadata
          if ((window as any).pendo && (window as any).pendo.updateOptions) {
            (window as any).pendo.updateOptions({ 
              visitor: updatedMetadata
            });
          }
        }}
      >
        <option value="commuter">Frequent Traveler (Premium)</option>
        <option value="occasional">Occasional Traveler (Standard)</option>
        <option value="manager">Travel Manager (Executive)</option>
      </select>
    </div>
  );
};

export default PendoIntegration;
