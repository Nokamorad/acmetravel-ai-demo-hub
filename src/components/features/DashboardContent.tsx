
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
    <div className="space-y-8" data-pendo-id="dashboard-content">
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
      
      {/* Recommended Hotels Section */}
      <div>
        <h2 className="text-xl font-bold mb-4">Recommended Hotels</h2>
        
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <Card key={i} className="h-64 animate-pulse">
                <CardContent className="p-0 h-full bg-gray-100 rounded-md"></CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { name: "Grand Hotel", location: "New York", price: "$199", image: "/lovable-uploads/9f5098a3-c876-45be-a035-b556bfc2b4d1.png" },
              { name: "Ocean View Resort", location: "Miami", price: "$249", image: "/lovable-uploads/f2812308-776f-41b1-8b83-d0ead1af1f3a.png" },
              { name: "Mountain Retreat", location: "Denver", price: "$179", image: "/lovable-uploads/9b2112ab-cd15-4128-b9ee-bed226acc140.png" }
            ].map((hotel) => (
              <Card key={hotel.name} className="overflow-hidden">
                <div className="h-40 relative">
                  <img 
                    src={hotel.image} 
                    alt={hotel.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <CardContent className="pt-4">
                  <h3 className="font-bold">{hotel.name}</h3>
                  <p className="text-gray-600 text-sm">{hotel.location}</p>
                  <div className="flex justify-between items-center mt-2">
                    <span className="font-bold text-sky-blue">{hotel.price}/night</span>
                    <Button size="sm" variant="outline">View Details</Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardContent;
