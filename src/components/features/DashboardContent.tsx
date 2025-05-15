
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Plus } from "lucide-react";
import { useUser } from "@/contexts/UserContext";
import { useNavigate } from "react-router-dom";
import { toast } from "@/hooks/use-toast";

const DashboardContent = () => {
  const { user } = useUser();
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  
  useEffect(() => {
    // Simulate data loading
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);

  const handleCreateItinerary = () => {
    navigate("/book");
    toast({
      title: "Create new itinerary",
      description: "Let's plan your next adventure!"
    });
  };
  
  return (
    <div className="space-y-6" data-pendo-id="dashboard-content">
      {/* Welcome Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-midnight-navy">
            Welcome back, {user.name}!
          </h1>
          <p className="text-gray-600 mt-1">
            Your travel assistant is ready to help you plan your next trip.
          </p>
        </div>
        
        <Button 
          className="bg-sky-blue hover:bg-sky-blue/90 flex items-center gap-2"
          data-pendo-id="create-itinerary-button"
          onClick={handleCreateItinerary}
        >
          <Plus className="h-4 w-4" />
          Create New Itinerary
        </Button>
      </div>
      
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-lg font-medium">Upcoming Trips</p>
              <p className="text-3xl font-bold text-sky-blue mt-2">2</p>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-lg font-medium">Past Trips</p>
              <p className="text-3xl font-bold text-midnight-navy mt-2">5</p>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-lg font-medium">Saved</p>
              <p className="text-3xl font-bold text-sunset-coral mt-2">$1,240</p>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Compact Pendo guide placeholder - embedded within the layout */}
      <Card className="border-dashed border-sky-blue/30 bg-transparent" data-pendo-id="recommended-hotels-section">
        <CardContent className="flex items-center justify-center p-4">
          <span className="text-sm text-gray-400">Personalized recommendations will appear here</span>
        </CardContent>
      </Card>
    </div>
  );
};

export default DashboardContent;
