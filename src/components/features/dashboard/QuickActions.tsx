
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, MapPin, Plane, Users } from "lucide-react";

const QuickActions = () => {
  return (
    <Card data-pendo-id="quick-actions-card">
      <CardHeader>
        <CardTitle>Quick Actions</CardTitle>
        <CardDescription>Common tasks and shortcuts</CardDescription>
      </CardHeader>
      <CardContent className="grid grid-cols-2 gap-4">
        <Button variant="outline" className="h-24 flex flex-col items-center justify-center space-y-2 relative overflow-hidden group">
          <div className="absolute inset-0 opacity-10 group-hover:opacity-20 transition-opacity">
            <img 
              src="https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&q=80&w=300" 
              alt="Airplane" 
              className="w-full h-full object-cover"
            />
          </div>
          <Plane className="h-6 w-6 text-sky-blue relative z-10" />
          <span className="relative z-10">Book Flight</span>
        </Button>
        
        <Button variant="outline" className="h-24 flex flex-col items-center justify-center space-y-2 relative overflow-hidden group">
          <div className="absolute inset-0 opacity-10 group-hover:opacity-20 transition-opacity">
            <img 
              src="https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?auto=format&fit=crop&q=80&w=300" 
              alt="Hotel" 
              className="w-full h-full object-cover"
            />
          </div>
          <MapPin className="h-6 w-6 text-sunset-coral relative z-10" />
          <span className="relative z-10">Book Hotel</span>
        </Button>
        
        <Button variant="outline" className="h-24 flex flex-col items-center justify-center space-y-2 relative overflow-hidden group">
          <div className="absolute inset-0 opacity-10 group-hover:opacity-20 transition-opacity">
            <img 
              src="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&q=80&w=300" 
              alt="Calendar" 
              className="w-full h-full object-cover"
            />
          </div>
          <Calendar className="h-6 w-6 text-midnight-navy relative z-10" />
          <span className="relative z-10">Schedule Meeting</span>
        </Button>
        
        <Button variant="outline" className="h-24 flex flex-col items-center justify-center space-y-2 relative overflow-hidden group">
          <div className="absolute inset-0 opacity-10 group-hover:opacity-20 transition-opacity">
            <img 
              src="https://images.unsplash.com/photo-1600880292089-90a7e086ee0c?auto=format&fit=crop&q=80&w=300" 
              alt="Team" 
              className="w-full h-full object-cover"
            />
          </div>
          <Users className="h-6 w-6 text-green-500 relative z-10" />
          <span className="relative z-10">Team Travel</span>
        </Button>
      </CardContent>
    </Card>
  );
};

export default QuickActions;
