
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { ChevronRight, Plus, User } from "lucide-react";
import { useUser } from "@/contexts/UserContext";

const WelcomeHeader = () => {
  const { user } = useUser();

  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
      <div>
        <h1 className="text-2xl md:text-3xl font-semibold text-midnight-navy mb-1">Welcome back, {user.name.split(' ')[0]}</h1>
        <p className="text-gray-600">Your upcoming trips and travel information</p>
      </div>
      <div className="flex gap-3">
        <Button className="bg-sky-blue hover:bg-sky-blue/90 text-white" data-pendo-id="new-trip-button">
          <Plus className="h-4 w-4 mr-2" /> New Trip
        </Button>
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" className="border-sky-blue text-sky-blue hover:bg-sky-blue/10 flex items-center justify-between">
              <div className="flex items-center">
                <User className="h-4 w-4 mr-2" /> Travel Profile
              </div>
              <ChevronRight className="h-4 w-4 ml-2" />
            </Button>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>Travel Profile</SheetTitle>
              <SheetDescription>
                Your travel preferences and information.
              </SheetDescription>
            </SheetHeader>
            <div className="py-4">
              <div className="space-y-4">
                <div className="border rounded-md p-4">
                  <h4 className="text-sm font-medium mb-2">Preferred Seating</h4>
                  <p className="text-sm text-gray-600">Window, Front of plane</p>
                </div>
                <div className="border rounded-md p-4">
                  <h4 className="text-sm font-medium mb-2">Loyalty Programs</h4>
                  <p className="text-sm text-gray-600">Delta SkyMiles: Gold</p>
                  <p className="text-sm text-gray-600">Marriott Bonvoy: Silver</p>
                </div>
                <div className="border rounded-md p-4">
                  <h4 className="text-sm font-medium mb-2">Dietary Restrictions</h4>
                  <p className="text-sm text-gray-600">Vegetarian</p>
                </div>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </div>
  );
};

export default WelcomeHeader;
