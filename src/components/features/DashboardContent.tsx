
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Calendar, MapPin, Plane, Plus, TrendingUp, User, Users } from "lucide-react";

const DashboardContent = () => {
  return (
    <div className="p-4 md:p-6 space-y-6" data-pendo-id="dashboard-content">
      {/* Welcome Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-semibold text-midnight-navy mb-1">Welcome back, Taylor</h1>
          <p className="text-gray-600">Your upcoming trips and travel information</p>
        </div>
        <div className="flex gap-3">
          <Button className="bg-sky-blue hover:bg-sky-blue/90 text-white" data-pendo-id="new-trip-button">
            <Plus className="h-4 w-4 mr-2" /> New Trip
          </Button>
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" className="border-sky-blue text-sky-blue hover:bg-sky-blue/10">
                <User className="h-4 w-4 mr-2" /> Travel Profile
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
      
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card data-pendo-id="stats-card-trips">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Upcoming Trips</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-baseline justify-between">
              <span className="text-3xl font-bold text-midnight-navy">3</span>
              <span className="text-xs px-2 py-1 rounded-full bg-green-100 text-green-800 flex items-center">
                <TrendingUp className="h-3 w-3 mr-1" /> +1 from last month
              </span>
            </div>
          </CardContent>
        </Card>
        
        <Card data-pendo-id="stats-card-savings">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Travel Savings</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-baseline justify-between">
              <span className="text-3xl font-bold text-midnight-navy">$1,275</span>
              <span className="text-xs px-2 py-1 rounded-full bg-green-100 text-green-800 flex items-center">
                <TrendingUp className="h-3 w-3 mr-1" /> 12% below budget
              </span>
            </div>
          </CardContent>
        </Card>
        
        <Card data-pendo-id="stats-card-miles">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Reward Miles</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-baseline justify-between">
              <span className="text-3xl font-bold text-midnight-navy">24,500</span>
              <span className="text-xs px-2 py-1 rounded-full bg-sky-blue/20 text-sky-blue flex items-center">
                <Users className="h-3 w-3 mr-1" /> Team total
              </span>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Recent and Upcoming Trips */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Upcoming Trips */}
        <Card className="border-sky-blue/10" data-pendo-id="upcoming-trips-card">
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
                      <img 
                        src="https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?auto=format&fit=crop&q=80&w=200&h=200" 
                        alt="New York" 
                        className="w-full h-full object-cover"
                      />
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
                      <img 
                        src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/0b/Austin_Downtown_2024_%28cropped%29_%28cropped%29.jpg/330px-Austin_Downtown_2024_%28cropped%29_%28cropped%29.jpg" 
                        alt="Austin" 
                        className="w-full h-full object-cover"
                      />
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
                      <img 
                        src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e8/Denver_skyline.jpg/960px-Denver_skyline.jpg?20121103225711" 
                        alt="Denver" 
                        className="w-full h-full object-cover"
                      />
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
            <Button variant="outline" className="w-full text-sky-blue hover:bg-sky-blue/10" data-pendo-id="view-all-trips">
              View All Trips
            </Button>
          </CardFooter>
        </Card>
        
        {/* Quick Actions */}
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
      </div>

      {/* Featured Destinations */}
      <div>
        <h2 className="text-xl font-semibold text-midnight-navy mb-4">Featured Destinations</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {[
            { 
              city: "New York", 
              country: "USA", 
              image: "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?auto=format&fit=crop&q=80&w=300&h=200"
            },
            { 
              city: "Munich", 
              country: "Germany", 
              image: "https://images.unsplash.com/photo-1595867818082-083862f3d630?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            },
            { 
              city: "Tokyo", 
              country: "Japan", 
              image: "https://images.unsplash.com/photo-1513407030348-c983a97b98d8?auto=format&fit=crop&q=80&w=300&h=200"
            },
            { 
              city: "Paris", 
              country: "France", 
              image: "https://plus.unsplash.com/premium_photo-1661919210043-fd847a58522d?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            }
          ].map((destination, index) => (
            <div key={index} className="relative rounded-lg overflow-hidden group h-48 shadow-md">
              <img 
                src={destination.image} 
                alt={destination.city} 
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-3">
                <h3 className="text-white font-semibold">{destination.city}</h3>
                <p className="text-white/80 text-sm">{destination.country}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DashboardContent;
