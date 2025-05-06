
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { useUser } from "@/contexts/UserContext";

interface WelcomeHeaderProps {
  userName?: string;
}

const WelcomeHeader: React.FC<WelcomeHeaderProps> = () => {
  const { user } = useUser();
  const navigate = useNavigate();
  
  // Extract the first name
  const firstName = user.name.split(' ')[0];
  
  // Get current time
  const currentHour = new Date().getHours();
  
  // Determine greeting based on time of day
  let greeting = "Good morning";
  if (currentHour >= 12 && currentHour < 17) {
    greeting = "Good afternoon";
  } else if (currentHour >= 17) {
    greeting = "Good evening";
  }
  
  return (
    <div className="flex flex-col md:flex-row gap-4 justify-between items-start md:items-center mb-8">
      <div>
        <h1 className="text-2xl font-bold text-midnight-navy">
          {greeting}, {firstName}
        </h1>
        <p className="text-gray-600 mt-1">Welcome to your travel dashboard</p>
      </div>
      <Button 
        onClick={() => navigate('/book')} 
        className="bg-sky-blue hover:bg-sky-blue/90 text-white"
        data-pendo-id="new-trip-button"
      >
        New Trip
      </Button>
    </div>
  );
};

export default WelcomeHeader;
