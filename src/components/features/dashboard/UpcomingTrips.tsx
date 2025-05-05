import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, MapPin, Plane } from "lucide-react";
const UpcomingTrips = () => {
  return <Card className="border-sky-blue/10" data-pendo-id="upcoming-trips-card">
      <CardHeader className="bg-sky-blue/5">
        <CardTitle className="flex items-center">
          <Plane className="h-5 w-5 mr-2 text-sky-blue" />
          Upcoming Trips
        </CardTitle>
        <CardDescription>Your scheduled travel plans</CardDescription>
      </CardHeader>
      <CardContent className="p-0">
        <div className="divide-y">
          {/* Trip 1 */}
          <div className="p-4 hover:bg-gray-50 transition-colors">
            <div className="flex items-start justify-between mb-2">
              <div className="flex gap-3">
                <div className="w-16 h-16 rounded-md overflow-hidden flex-shrink-0">
                  <img src="https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?auto=format&fit=crop&q=80&w=200&h=200" alt="New York" className="w-full h-full object-cover" />
                </div>
                <div>
                  <h4 className="font-medium mb-1">New York → San Francisco</h4>
                  <div className="flex items-center text-sm text-gray-600">
                    <Calendar className="h-3 w-3 mr-1" />
                    May 15-19, 2025
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <MapPin className="h-3 w-3 mr-1" />
                    Marriott Union Square
                  </div>
                </div>
              </div>
              <span className="px-2 py-1 bg-sky-blue/10 text-sky-blue text-xs rounded-full">
                Upcoming
              </span>
            </div>
          </div>
          
          {/* Trip 2 */}
          <div className="p-4 hover:bg-gray-50 transition-colors">
            <div className="flex items-start justify-between mb-2">
              <div className="flex gap-3">
                <div className="w-16 h-16 rounded-md overflow-hidden flex-shrink-0">
                  <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/0b/Austin_Downtown_2024_%28cropped%29_%28cropped%29.jpg/330px-Austin_Downtown_2024_%28cropped%29_%28cropped%29.jpg" alt="Austin" className="w-full h-full object-cover" />
                </div>
                <div>
                  <h4 className="font-medium mb-1">Chicago → Austin</h4>
                  <div className="flex items-center text-sm text-gray-600">
                    <Calendar className="h-3 w-3 mr-1" />
                    June 3-7, 2025
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <MapPin className="h-3 w-3 mr-1" />
                    Hilton Downtown Austin
                  </div>
                </div>
              </div>
              <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                Pending Approval
              </span>
            </div>
          </div>
          
          {/* Trip 3 */}
          <div className="p-4 hover:bg-gray-50 transition-colors">
            <div className="flex items-start justify-between mb-2">
              <div className="flex gap-3">
                <div className="w-16 h-16 rounded-md overflow-hidden flex-shrink-0">
                  <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e8/Denver_skyline.jpg/960px-Denver_skyline.jpg?20121103225711" alt="Denver" className="w-full h-full object-cover" />
                </div>
                <div>
                  <h4 className="font-medium mb-1">Seattle → Denver</h4>
                  <div className="flex items-center text-sm text-gray-600">
                    <Calendar className="h-3 w-3 mr-1" />
                    June 22-25, 2025
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <MapPin className="h-3 w-3 mr-1" />
                    The Crawford Hotel
                  </div>
                </div>
              </div>
              <span className="px-2 py-1 bg-sky-blue/10 text-sky-blue text-xs rounded-full">
                Booked
              </span>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="border-t bg-gray-50">
        
      </CardFooter>
    </Card>;
};
export default UpcomingTrips;