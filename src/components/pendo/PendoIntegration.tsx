
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useUser } from '@/contexts/UserContext';

const PendoIntegration: React.FC = () => {
  const location = useLocation();
  const { user, updateUser } = useUser();
  
  // Track if Pendo has been initialized
  const [initialized, setInitialized] = useState(false);
  
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
      
      // Pendo snippet
      (function(apiKey){
        (function(p,e,n,d,o){var v,w,x,y,z;o=p[d]=p[d]||{};o._q=o._q||[];
        v=['initialize','identify','updateOptions','pageLoad','track'];for(w=0,x=v.length;w<x;++w)(function(m){
            o[m]=o[m]||function(){o._q[m==='initialize'?'unshift':'push']([m].concat([].slice.call(arguments,0)));};})(v[w]);
            y=e.createElement(n);y.async=!0;y.src='https://cdn.pendo.io/agent/static/'+apiKey+'/pendo.js';
            z=e.getElementsByTagName(n)[0];z.parentNode.insertBefore(y,z);})(window,document,'script','pendo');
      
     
        
        // Helper to generate a random demo user name
        const generateRandomName = () => {
          const names = [
            "Alex Johnson",
            "Taylor Smith",
            "Jordan Lee",
            "Casey Morgan",
            "Sam Cameron",
            "Jamie Parker",
            "Drew Adams",
            "Skyler Reese",
            "Riley Quinn",
            "Avery Blake"
          ];
          const randomIndex = Math.floor(Math.random() * names.length);
          return names[randomIndex];
        };
        
        
        
        (window as any).pendo.initialize({
          visitor: {
            id:'',
          
          },
          account: {
            id: ''
          }
        });
        
       
        
        // Make functions available globally
        
        (window as any).generateRandomName = generateRandomName;
        
        // On signup, reinitialize with permanent visitor metadata
        (window as any).onUserSignup = (travelFrequency: string) => {
          const name = generateRandomName();
          const cleanName = name.toLowerCase().replace(/\s+/g, '');
          let membertype = 'Free';
          
          switch (travelFrequency.toLowerCase()) {
            case 'daily':
              membertype = 'Platinum';
              break;
            case 'weekly':
              membertype = 'Gold';
              break;
            case 'monthly':
              membertype = 'Silver';
              break;
            case 'quarterly':
              membertype = 'Bronze';
              break;
            default:
              membertype = 'Free';
          }
          
          console.log('Reinitializing Pendo with user data:', {
            id: `demo.engineering+${cleanName}@email.io`,
            name: name,
            travel_frequency: travelFrequency,
            member_type: membertype
          });
          
          // Update user context
          if (updateUser) {
            updateUser({
              id: `demo.engineering+${cleanName}@email.io`,
    
              full_name: name,
              
                travelFrequency: travelFrequency,
                member_type: membertype
              
            });
          }
          
          (window as any).pendo.identify({
            visitor: {
              id: `demo.engineering+${cleanName}@email.io`,
              full_name: name,
              travel_frequency: travelFrequency,
              member_type: membertype,
              
            },
            account: {
              id: ''
            }
          });
          
          // Track signup event
          (window as any).pendo.track('User Signed Up', {
            name: name,
            travel_frequency: travelFrequency,
            member_type: membertype
          });
          
        
        };
        
        // Track booking events
        (window as any).trackBookingStarted = () => {
          (window as any).pendo.track('Started Booking', {
           
          });
        };
        
        (window as any).trackBookingAbandoned = () => {
          (window as any).pendo.track('Booking Abandoned', {
           
          });
        };
        
        (window as any).trackEmailViewed = () => {
          (window as any).pendo.track('Viewed Re-Engagement Email', {
           
          });
        };
        
        (window as any).trackBookingCompleted = () => {
          (window as any).pendo.track('Booking Completed', {
           
            destination: 'Munich'
          });
        };
      })(PENDO_API_KEY);
      
      setInitialized(true);
    };

    // Initialize Pendo when the component mounts
    initPendo();

   
    
    return () => {
      // Cleanup if necessary
    };
  }, [location, updateUser]);

  // Create a dropdown to toggle user segments for demo purposes
  return (
    <div className="fixed bottom-2 right-2 z-50 opacity-50 hover:opacity-100 transition-opacity">
      <select 
        className="text-xs bg-white border border-gray-200 rounded py-1 px-2 shadow-sm"
        value={user.preferences?.travelFrequency || 'occasional'}
        onChange={(e) => {
        
            (window as any).onUserSignup(e.target.value);
          
        }}
        data-pendo-id="user-segment-toggle"
      >
        <option value="daily">Frequent Traveler (Platinum)</option>
        <option value="weekly">Regular Traveler (Gold)</option>
        <option value="monthly">Semi-Regular Traveler (Silver)</option>
        <option value="quarterly">Occasional Traveler (Bronze)</option>
        <option value="yearly">Rare Traveler (Free)</option>
      </select>
    </div>
  );
};

export default PendoIntegration;
