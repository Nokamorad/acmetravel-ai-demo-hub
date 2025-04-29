
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

// This component handles the Pendo script integration
const PendoIntegration: React.FC = () => {
  const location = useLocation();
  
  useEffect(() => {
    // Initialize Pendo with visitor and account data
    const initPendo = () => {
      if ((window as any).pendo) {
        console.log('Pendo already initialized');
        return;
      }
      
      // This is a placeholder for the actual Pendo initialization
      console.log('Pendo would initialize here in production');
      
      // In a real implementation, you'd add your Pendo snippet here
      /*
      (function(apiKey){
        (function(p,e,n,d,o){var v,w,x,y,z;o=p[d]=p[d]||{};o._q=o._q||[];
        v=['initialize','identify','updateOptions','pageLoad','track'];for(w=0,x=v.length;w<x;++w)(function(m){
            o[m]=o[m]||function(){o._q[m===v[0]?'unshift':'push']([m].concat([].slice.call(arguments,0)));};})(v[w]);
            y=e.createElement(n);y.async=!0;y.src='https://cdn.pendo.io/agent/static/'+apiKey+'/pendo.js';
            z=e.getElementsByTagName(n)[0];z.parentNode.insertBefore(y,z);})(window,document,'script','pendo');
            
        // Initialize Pendo with demo user data
        pendo.initialize({
          visitor: {
            id: 'demo-user-123',
            email: 'demo@acmetravel.com',
            full_name: 'Demo User',
            role: 'Business Traveler',
            travel_frequency: getUserTravelFrequency(),
            created_at: new Date().toISOString()
          },
          account: {
            id: 'acme-travel-demo',
            name: 'AcmeTravel Demo',
            is_paying: true,
            plan_level: 'enterprise',
            total_users: 150,
            industry: 'Travel'
          }
        });
      })('YOUR_API_KEY');
      */
    };

    // Initialize Pendo when the component mounts
    initPendo();

    // Track page views for Pendo analytics
    const trackPageView = () => {
      if ((window as any).pendo && (window as any).pendo.track) {
        console.log(`Pendo track page view: ${location.pathname}`);
        // In production: pendo.track('page_view', { page: location.pathname });
      }
    };
    
    // Track page view when location changes
    trackPageView();

    // Add data attributes to key elements for Pendo targeting
    const addPendoAttributes = () => {
      // Log all elements with data-pendo-id for debugging
      document.querySelectorAll('[data-pendo-id]').forEach(el => {
        console.log(`Pendo element found: ${el.getAttribute('data-pendo-id')}`);
      });
      
      // Simulate Pendo tracking events
      document.addEventListener('click', (e) => {
        const target = e.target as HTMLElement;
        const pendoElement = target.closest('[data-pendo-id]');
        
        if (pendoElement) {
          const pendoId = pendoElement.getAttribute('data-pendo-id');
          // This would be where Pendo track events happen in production
          console.log(`Pendo track event: ${pendoId} clicked`);
        }
      });
    };

    // Call after a short delay to ensure DOM is fully loaded
    setTimeout(addPendoAttributes, 1000);
    
    // Create helper for simulating Pendo guide launches
    (window as any).simulatePendoGuide = (guideId: string) => {
      console.log(`Launching Pendo guide: ${guideId}`);
      // In production, this would trigger a specific Pendo guide
    };
    
    // Helper to get user travel frequency from preferences
    const getUserTravelFrequency = () => {
      // In production, this would retrieve from user preferences in state management
      return localStorage.getItem('travelFrequency') || 'frequent';
    };
    
    // Helper to simulate Pendo frustration detection (rage clicks)
    const simulateFrustrationDetection = () => {
      document.addEventListener('click', (e) => {
        const target = e.target as HTMLElement;
        
        // Check if the same element was clicked multiple times in quick succession
        if (target.dataset.clickCount === undefined) {
          target.dataset.clickCount = '1';
          target.dataset.lastClickTime = Date.now().toString();
        } else {
          const lastClickTime = parseInt(target.dataset.lastClickTime || '0');
          const currentTime = Date.now();
          
          // If clicked again within 1 second
          if (currentTime - lastClickTime < 1000) {
            const clickCount = parseInt(target.dataset.clickCount || '0') + 1;
            target.dataset.clickCount = clickCount.toString();
            target.dataset.lastClickTime = currentTime.toString();
            
            // Simulate rage click detection at 3+ rapid clicks
            if (clickCount >= 3) {
              console.log(`Pendo frustration detected: Rage clicks on ${target.outerHTML.slice(0, 50)}...`);
              target.dataset.clickCount = '0';
            }
          } else {
            // Reset if time between clicks is too long
            target.dataset.clickCount = '1';
            target.dataset.lastClickTime = currentTime.toString();
          }
        }
      });
    };
    
    // Initialize frustration detection
    simulateFrustrationDetection();
    
    return () => {
      // Clean up event listeners if component unmounts
      document.removeEventListener('click', () => {});
    };
  }, [location]); // Re-run when location changes

  return null; // This component doesn't render anything visible
};

export default PendoIntegration;
