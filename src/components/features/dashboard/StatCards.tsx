
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, Users } from "lucide-react";

const StatCards = () => {
  return (
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
  );
};

export default StatCards;
