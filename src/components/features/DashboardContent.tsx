
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Plus, Building, MapPin } from "lucide-react";
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
  
  const handleViewHotels = () => {
    // Track hotel recommendation click with Pendo
    if ((window as any).pendo && (window as any).pendo.track) {
      (window as any).pendo.track('Hotel Recommendations Viewed');
    }
    
    navigate("/hotels");
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
        
        <div className="flex gap-2 w-full md:w-auto">
          <Button 
            className="bg-sky-blue hover:bg-sky-blue/90 flex items-center gap-2 flex-grow md:flex-grow-0"
            data-pendo-id="create-itinerary-button"
            onClick={handleCreateItinerary}
          >
            <Plus className="h-4 w-4" />
            Create New Itinerary
          </Button>
          
          <Button 
            variant="outline" 
            className="flex items-center gap-2 flex-grow md:flex-grow-0"
            data-pendo-id="view-hotels-button"
            onClick={handleViewHotels}
          >
            <Building className="h-4 w-4" />
            View Hotels
          </Button>
        </div>
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
      
      {/* Hotel Recommendations Section */}
      <Card className="border-sky-blue/30 overflow-hidden" data-pendo-id="recommended-hotels-section">
        <div className="bg-sky-blue/10 p-4 border-b border-sky-blue/20">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-semibold text-midnight-navy">Recommended Hotels</h2>
            <Button 
              variant="link" 
              className="text-sky-blue p-0"
              onClick={handleViewHotels}
              data-pendo-id="see-all-hotels-link"
            >
              See all
            </Button>
          </div>
        </div>
        <CardContent className="p-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white rounded-lg shadow overflow-hidden" data-pendo-id="hotel-card-1">
              <img 
                src="https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
                alt="Holiday Inn Raleigh" 
                className="w-full h-32 object-cover"
              />
              <div className="p-3">
                <h3 className="font-medium text-gray-800">Holiday Inn Raleigh Downtown</h3>
                <div className="flex items-center mt-1 text-sm text-gray-500">
                  <MapPin className="h-3 w-3 mr-1" />
                  <span>Downtown Raleigh</span>
                </div>
                <div className="mt-2 flex justify-between items-center">
                  <span className="font-bold text-green-600">$143</span>
                  <Button 
                    size="sm" 
                    className="bg-sky-blue hover:bg-sky-blue/90"
                    onClick={handleViewHotels}
                    data-pendo-id="view-hotel-1"
                  >
                    View
                  </Button>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow overflow-hidden" data-pendo-id="hotel-card-2">
              <img 
                src="https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
                alt="The Casso" 
                className="w-full h-32 object-cover"
              />
              <div className="p-3">
                <h3 className="font-medium text-gray-800">The Casso, Raleigh</h3>
                <div className="flex items-center mt-1 text-sm text-gray-500">
                  <MapPin className="h-3 w-3 mr-1" />
                  <span>Glenwood South</span>
                </div>
                <div className="mt-2 flex justify-between items-center">
                  <span className="font-bold text-green-600">$219</span>
                  <Button 
                    size="sm" 
                    className="bg-sky-blue hover:bg-sky-blue/90"
                    onClick={handleViewHotels}
                    data-pendo-id="view-hotel-2"
                  >
                    View
                  </Button>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow overflow-hidden" data-pendo-id="hotel-card-3">
              <img 
                src="https://images.unsplash.com/photo-1551632436-cbf8dd35adfa?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
                alt="Residence Inn" 
                className="w-full h-32 object-cover"
              />
              <div className="p-3">
                <h3 className="font-medium text-gray-800">Residence Inn by Marriott</h3>
                <div className="flex items-center mt-1 text-sm text-gray-500">
                  <MapPin className="h-3 w-3 mr-1" />
                  <span>North Hills</span>
                </div>
                <div className="mt-2 flex justify-between items-center">
                  <span className="font-bold text-green-600">$179</span>
                  <Button 
                    size="sm" 
                    className="bg-sky-blue hover:bg-sky-blue/90"
                    onClick={handleViewHotels}
                    data-pendo-id="view-hotel-3"
                  >
                    View
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DashboardContent;
